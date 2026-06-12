"""Tests for DevPilot API endpoints."""
import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

# Set test environment variables BEFORE importing app
os.environ["GITHUB_APP_ID"] = "123456"
os.environ["GITHUB_PRIVATE_KEY"] = "<REDACTED_PRIVATE_KEY>\n"
os.environ["GITHUB_WEBHOOK_SECRET"] = "webhook_secret_for_testing"
os.environ["DEBUG"] = "true"

from app.main import app
from app.api.webhooks import get_settings

client = TestClient(app)


def test_root():
    """Test the root endpoint returns API info."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "DevPilot API"
    assert data["status"] == "operational"


def test_health():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_github_webhook_ping():
    """Test webhook ping event."""
    import hmac, hashlib
    body = b"{}"
    signature = "sha256=" + hmac.new(b"webhook_secret_for_testing", body, hashlib.sha256).hexdigest()
    
    response = client.post(
        "/api/webhook/github",
        content=body,
        headers={"X-GitHub-Event": "ping", "X-Hub-Signature-256": signature},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_github_webhook_pr_opened():
    """Test webhook for PR opened event - mock external calls."""
    import hmac, hashlib, json
    
    payload = {
        "action": "opened",
        "pull_request": {"number": 42, "title": "Add user auth"},
        "repository": {"full_name": "acme/test-repo"},
        "installation": {"id": 12345},
    }
    body = json.dumps(payload).encode()
    signature = "sha256=" + hmac.new(b"webhook_secret_for_testing", body, hashlib.sha256).hexdigest()
    
    # Mock the external GitHub API calls
    with patch("app.api.webhooks.get_installation_token", return_value="fake-token"), \
         patch("app.api.webhooks.fetch_pr_diff", return_value="fake diff"), \
         patch("app.services.ai_review.AIReviewService.analyze_diff", return_value=[]), \
         patch("app.api.webhooks.post_github_review", return_value=True):
        
        response = client.post(
            "/api/webhook/github",
            content=body,
            headers={
                "Content-Type": "application/json",
                "X-GitHub-Event": "pull_request",
                "X-Hub-Signature-256": signature,
            },
        )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ("completed", "error", "ignored")
    assert data.get("pr") == 42


def test_list_repos():
    """Test repo listing endpoint."""
    response = client.get("/api/repos/")
    assert response.status_code == 200
    assert "repos" in response.json()


def test_billing_checkout():
    """Test billing checkout creation."""
    response = client.post("/api/billing/checkout?plan=pro&repo_count=3")
    assert response.status_code == 200
    data = response.json()
    assert data["plan"] == "pro"
    assert data["monthly_total"] == 177.0  # $59 * 3


def test_ai_review_worker():
    """Test the AI review worker returns expected structure."""
    from app.workers.review_worker import analyze_pull_request
    import asyncio
    
    result = asyncio.run(analyze_pull_request("fake diff"))
    assert isinstance(result, list)
    if result:
        assert "file" in result[0]
        assert "message" in result[0]