import logging
import os
from collections.abc import Iterable
from datetime import datetime, timezone
from typing import Any

import httpx

from app.models.github import GitHubRepository

logger = logging.getLogger(__name__)

GITHUB_API_URL = "https://api.github.com"
REQUEST_TIMEOUT_SECONDS = 10.0


class GitHubServiceError(Exception):
    """A safe, frontend-ready error from the GitHub API integration."""

    def __init__(self, status_code: int, detail: str) -> None:
        self.status_code = status_code
        self.detail = detail
        super().__init__(detail)


class GitHubService:
    """Fetch and normalize public repository metadata from GitHub."""

    def __init__(self, token: str | None = None) -> None:
        self._token = token if token is not None else os.getenv("GITHUB_TOKEN")

    async def fetch_public_repositories(self, username: str) -> list[GitHubRepository]:
        try:
            async with httpx.AsyncClient(
                base_url=GITHUB_API_URL,
                headers=self._headers(),
                timeout=REQUEST_TIMEOUT_SECONDS,
            ) as client:
                response = await client.get(
                    f"/users/{username}/repos",
                    params={"page": 1, "per_page": 100, "sort": "updated"},
                )
        except httpx.RequestError:
            logger.exception("Unable to reach GitHub while loading repositories for %s", username)
            raise GitHubServiceError(
                status_code=503,
                detail="Unable to reach GitHub right now. Please try again.",
            ) from None

        self._raise_for_error(response, username)

        try:
            repositories = response.json()
        except (OSError, OverflowError, ValueError):
            logger.error("GitHub returned a non-JSON repository response for %s", username)
            raise GitHubServiceError(
                status_code=502,
                detail="GitHub returned an unexpected response. Please try again.",
            ) from None

        if not isinstance(repositories, list):
            logger.error("GitHub returned an invalid repository payload for %s", username)
            raise GitHubServiceError(
                status_code=502,
                detail="GitHub returned an unexpected response. Please try again.",
            )

        return [
            self._to_repository(repository)
            for repository in repositories
            if isinstance(repository, dict) and not repository.get("private", False)
        ]

    def _headers(self) -> dict[str, str]:
        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": "GitCV/0.1.0",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        if self._token:
            headers["Authorization"] = f"Bearer {self._token}"
        return headers

    @staticmethod
    def _raise_for_error(response: httpx.Response, username: str) -> None:
        if response.status_code == 404:
            raise GitHubServiceError(
                status_code=404,
                detail=f"GitHub user '{username}' was not found.",
            )

        rate_limit_remaining = response.headers.get("X-RateLimit-Remaining")
        if response.status_code == 429 or (
            response.status_code == 403 and rate_limit_remaining == "0"
        ):
            reset_at = GitHubService._rate_limit_reset_time(response.headers.get("X-RateLimit-Reset"))
            retry_message = f" Try again after {reset_at}." if reset_at else " Try again later."
            raise GitHubServiceError(
                status_code=429,
                detail=(
                    "GitHub API rate limit exceeded. Configure GITHUB_TOKEN for a higher limit."
                    f"{retry_message}"
                ),
            )

        if response.is_error:
            logger.error(
                "GitHub returned status %s while loading repositories for %s",
                response.status_code,
                username,
            )
            raise GitHubServiceError(
                status_code=502,
                detail="GitHub could not load repositories right now. Please try again.",
            )

    @staticmethod
    def _rate_limit_reset_time(value: str | None) -> str | None:
        if value is None:
            return None

        try:
            return datetime.fromtimestamp(int(value), tz=timezone.utc).isoformat()
        except ValueError:
            return None

    @staticmethod
    def _to_repository(repository: dict[str, Any]) -> GitHubRepository:
        language = repository.get("language")
        normalized_language = language if isinstance(language, str) else None
        description = repository.get("description")
        tags = GitHubService._strings(repository.get("topics", []))
        tech = GitHubService._unique_strings([normalized_language, *tags])

        return GitHubRepository(
            name=str(repository.get("name", "")),
            description=description if isinstance(description, str) else "",
            language=normalized_language,
            tags=tags,
            tech=tech,
            stars=GitHubService._non_negative_int(repository.get("stargazers_count")),
            forks=GitHubService._non_negative_int(repository.get("forks_count")),
        )

    @staticmethod
    def _strings(values: object) -> list[str]:
        if not isinstance(values, Iterable) or isinstance(values, (str, bytes)):
            return []
        return [value for value in values if isinstance(value, str) and value]

    @staticmethod
    def _unique_strings(values: Iterable[str | None]) -> list[str]:
        return list(dict.fromkeys(value for value in values if value))

    @staticmethod
    def _non_negative_int(value: object) -> int:
        return value if isinstance(value, int) and value >= 0 else 0
