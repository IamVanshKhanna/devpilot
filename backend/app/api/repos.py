"""Repository management routes."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_repos():
    """List connected repositories with review stats."""
    # TODO: Query database for user's repos
    return {"repos": [], "total": 0}


@router.get("/{repo_id}/reviews")
async def get_reviews(repo_id: str):
    """Get review history for a repo."""
    # TODO: Query review history
    return {"repo_id": repo_id, "reviews": []}


@router.post("/{repo_id}/config")
async def update_config(repo_id: str, config: dict):
    """Update review rules for a repo."""
    # TODO: Save custom rules
    return {"repo_id": repo_id, "config": config, "status": "updated"}