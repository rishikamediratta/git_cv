from pydantic import BaseModel, Field


class GitHubRepository(BaseModel):
    """Repository metadata returned to the GitCV frontend."""

    name: str
    description: str
    language: str | None = None
    tags: list[str] = Field(default_factory=list)
    # `tech` is the existing repository-card field. It includes the primary
    # language followed by repository topics, without duplicates.
    tech: list[str] = Field(default_factory=list)
    stars: int
    forks: int
