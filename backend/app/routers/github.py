from fastapi import APIRouter, HTTPException

from app.models.github import GitHubRepository
from app.services.github import GitHubService, GitHubServiceError

router = APIRouter(prefix="/api/github", tags=["github"])


@router.get("/{username}/repos", response_model=list[GitHubRepository])
async def get_public_repositories(username: str) -> list[GitHubRepository]:
    """Return the first page of a GitHub user's public repositories."""

    try:
        return await GitHubService().fetch_public_repositories(username)
    except GitHubServiceError as error:
        raise HTTPException(status_code=error.status_code, detail=error.detail) from error
