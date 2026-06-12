"""Tests for DevPilot API endpoints."""
import pytest
from fastapi.testclient import TestClient
from app.main import app

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
    response = client.post(
        "/api/webhook/github",
        json={},
        headers={"X-GitHub-Event": "ping"},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_github_webhook_pr_opened():
    """Test webhook for PR opened event."""
    payload = {
        "action": "opened",
        "pull_request": {"number": 42, "title": "Add user auth"},
        "repository": {"full_name": "acme/test-repo"},
    }
    response = client.post(
        "/api/webhook/github",
        json=payload,
        headers={"X-GitHub-Event": "pull_request"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "queued"
    assert data["pr"] == 42


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
    # Placeholder returns the sample comment
    if result:
        assert "file" in result[0]
        assert "message" in result[0]