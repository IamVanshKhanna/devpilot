"""GitHub webhook receiver."""
from fastapi import APIRouter, Request, HTTPException
import hmac
import hashlib

router = APIRouter()


@router.post("/github")
async def github_webhook(request: Request):
    """Receive GitHub webhook events."""
    body = await request.body()

    # TODO: Verify HMAC signature
    # signature = request.headers.get("X-Hub-Signature-256")
    # if not verify_signature(body, signature):
    #     raise HTTPException(status_code=403, detail="Invalid signature")

    event_type = request.headers.get("X-GitHub-Event")

    if event_type == "ping":
        return {"status": "ok", "message": "Webhook verified"}

    if event_type == "pull_request":
        payload = await request.json()
        action = payload.get("action")

        if action in ("opened", "synchronize"):
            # Queue for AI review
            # TODO: Push to Redis queue for async processing
            return {
                "status": "queued",
                "pr": payload.get("pull_request", {}).get("number"),
                "repo": payload.get("repository", {}).get("full_name"),
            }

    return {"status": "ignored", "event": event_type}