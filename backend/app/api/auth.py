"""GitHub OAuth and authentication routes."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/callback")
async def github_callback(code: str, state: str = None):
    """Handle GitHub OAuth callback."""
    # TODO: Exchange code for access token
    # TODO: Create/update user in database
    # TODO: Generate session JWT
    return {
        "status": "authenticated",
        "message": "GitHub OAuth successful",
    }