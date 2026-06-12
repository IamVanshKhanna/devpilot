"""GitHub webhook receiver — handles PR events and triggers AI reviews."""
from fastapi import APIRouter, Request, HTTPException, Depends
import hmac
import hashlib
import json
import httpx
from app.core.config import settings as _settings
from app.core.database import get_db
from app.services.ai_review import AIReviewService
from sqlalchemy.orm import Session

router = APIRouter()
ai_review = AIReviewService()


def get_settings():
    """Get current settings - overridable in tests."""
    return _settings


def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    """Verify GitHub webhook HMAC signature."""
    if not secret:
        return True  # Dev mode: skip verification
    expected = "sha256=" + hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)


async def fetch_pr_diff(repo_full_name: str, pr_number: int, installation_token: str = None) -> str:
    """Fetch the full PR diff from GitHub API."""
    headers = {
        "Accept": "application/vnd.github.v3.diff",
        "User-Agent": "DevPilot/1.0",
    }
    if installation_token:
        headers["Authorization"] = f"Bearer {installation_token}"
    
    url = f"https://api.github.com/repos/{repo_full_name}/pulls/{pr_number}"
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.get(url, headers=headers)
        if response.status_code == 200:
            return response.text
        return ""


async def post_github_review(
    repo_full_name: str,
    pr_number: int,
    review_data: dict,
    installation_token: str
) -> bool:
    """Post a review to GitHub PR."""
    headers = {
        "Authorization": f"Bearer {installation_token}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "DevPilot/1.0",
    }
    
    url = f"https://api.github.com/repos/{repo_full_name}/pulls/{pr_number}/reviews"
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(url, headers=headers, json=review_data)
        return response.status_code in (200, 201)


async def get_installation_token(app_id: str, private_key: str, installation_id: int) -> str | None:
    """Generate a GitHub App installation token."""
    import jwt
    import time
    
    now = int(time.time())
    payload = {
        "iat": now - 60,
        "exp": now + 600,  # 10 min
        "iss": app_id,
    }
    
    encoded_jwt = jwt.encode(payload, private_key, algorithm="RS256")
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"https://api.github.com/app/installations/{installation_id}/access_tokens",
            headers={
                "Authorization": f"Bearer {encoded_jwt}",
                "Accept": "application/vnd.github+json",
            }
        )
        
        if response.status_code == 201:
            return response.json().get("token")
    return None


@router.post("/github")
async def github_webhook(request: Request, db: Session = Depends(get_db)):
    """Receive and process GitHub webhook events."""
    body = await request.body()
    
    # Verify HMAC signature
    signature = request.headers.get("X-Hub-Signature-256")
    if not verify_signature(body, signature, get_settings().GITHUB_WEBHOOK_SECRET or ""):
        raise HTTPException(status_code=403, detail="Invalid signature")
    
    event_type = request.headers.get("X-GitHub-Event")
    payload = json.loads(body)
    
    # Handle different events
    if event_type == "ping":
        return {"status": "ok", "message": "Webhook verified"}
    
    if event_type == "pull_request":
        return await handle_pull_request(payload, db)
    
    if event_type == "installation":
        return await handle_installation(payload, db)
    
    return {"status": "ignored", "event": event_type}


async def handle_pull_request(payload: dict, db: Session):
    """Handle pull_request events: opened, synchronize, reopened."""
    action = payload.get("action")
    pr = payload.get("pull_request", {})
    repo = payload.get("repository", {})
    installation = payload.get("installation", {})
    
    if action not in ("opened", "synchronize", "reopened"):
        return {"status": "ignored", "action": action}
    
    pr_number = pr.get("number")
    repo_full_name = repo.get("full_name")
    installation_id = installation.get("id")
    
    if not all([pr_number, repo_full_name, installation_id]):
        return {"status": "error", "message": "Missing required fields"}
    
    # Get installation token for GitHub API access
    token = await get_installation_token(
        get_settings().GITHUB_APP_ID,
        get_settings().GITHUB_PRIVATE_KEY,
        installation_id
    )
    
    if not token:
        return {"status": "error", "message": "Failed to get installation token"}
    
    # Fetch PR diff
    diff = await fetch_pr_diff(repo_full_name, pr_number, token)
    
    if not diff:
        return {"status": "error", "message": "Could not fetch PR diff"}
    
    # Run AI review
    comments = await ai_review.analyze_diff(diff)
    
    # Format and post review
    review_data = ai_review.format_github_review(comments, repo_full_name, pr_number)
    
    success = await post_github_review(repo_full_name, pr_number, review_data, token)
    
    if success:
        # TODO: Store in database for analytics
        # review = Review(repo_id=..., pr_number=pr_number, comments_count=len(comments), ...)
        # db.add(review); db.commit()
        pass
    
    return {
        "status": "completed" if success else "error",
        "pr": pr_number,
        "repo": repo_full_name,
        "comments": len(comments),
    }


async def handle_installation(payload: dict, db: Session):
    """Handle GitHub App installation events."""
    action = payload.get("action")
    installation = payload.get("installation", {})
    repos = payload.get("repositories", [])
    
    installation_id = installation.get("id")
    account = installation.get("account", {})
    
    if action == "created":
        # App installed on new account/org
        # Store installation_id for each repo
        for repo in repos:
            full_name = repo.get("full_name")
            # TODO: Create Repo records in DB
            pass
        return {"status": "installed", "installation_id": installation_id}
    
    if action == "deleted":
        # App uninstalled
        # TODO: Mark repos as inactive
        return {"status": "uninstalled", "installation_id": installation_id}
    
    return {"status": "ignored", "action": action}


@router.get("/health")
async def health():
    return {"status": "healthy"}