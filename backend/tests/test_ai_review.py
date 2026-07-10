"""Tests for the AI review service — mock backend + response parsing.

These run with NO API key, NO network, NO database (AI_BACKEND unset -> mock
falls back when no paid key and Ollama unreachable, but we force mock explicitly).
"""
import os

os.environ.setdefault("AI_BACKEND", "mock")
os.environ.setdefault("GITHUB_APP_ID", "123456")
os.environ.setdefault("GITHUB_PRIVATE_KEY", "test")
os.environ.setdefault("GITHUB_WEBHOOK_SECRET", "webhook_secret_for_testing")

from app.services.ai_review import AIReviewService


SAMPLE_DIFF = """diff --git a/src/auth.py b/src/auth.py
index 1111111..2222222 100644
--- a/src/auth.py
+++ b/src/auth.py
@@ -10,6 +10,12 @@ def login(user, pw):
     conn = connect()
-    cur = conn.execute("SELECT * FROM users WHERE name = '" + user + "'")
+    db_password = "supersecret123"
+    cur = conn.execute("SELECT * FROM users WHERE name = '" + user + "'")
+    try:
+        print("logged in", user)
+    except:
+        pass
     return cur.fetchone()
"""


def test_mock_review_returns_list():
    svc = AIReviewService()
    out = svc._mock_review(SAMPLE_DIFF)
    assert isinstance(out, list)
    assert len(out) >= 1


def test_mock_review_flags_security_issues():
    svc = AIReviewService()
    out = svc._mock_review(SAMPLE_DIFF)
    categories = {c["category"] for c in out}
    severities = {c["severity"] for c in out}
    # SQL concatenation + bare except + print should all be caught
    assert "security" in categories
    assert "best_practice" in categories
    # every comment has the required shape
    for c in out:
        assert {"file", "line", "severity", "category", "message", "suggestion"} <= c.keys()
        assert c["message"]


def test_mock_review_empty_diff():
    svc = AIReviewService()
    assert svc._mock_review("") == []


def test_parse_model_response_valid_array():
    svc = AIReviewService()
    body = '```json\n[{"file":"a.py","line":3,"severity":"error","category":"bug","message":"x","suggestion":"y"}]\n```'
    out = svc._parse_model_response(body)
    assert len(out) == 1
    assert out[0]["severity"] == "error"
    assert out[0]["file"] == "a.py"


def test_parse_model_response_malformed_falls_back():
    svc = AIReviewService()
    # Not valid JSON at all -> single info comment with raw text
    out = svc._parse_model_response("here is some free text, not json")
    assert len(out) == 1
    assert out[0]["severity"] == "info"


def test_parse_model_response_extracts_embedded_array():
    svc = AIReviewService()
    body = 'Sure! Here are the issues:\n[{"file":"b.py","line":1,"severity":"warning","category":"style","message":"m"}]\nHope that helps.'
    out = svc._parse_model_response(body)
    assert len(out) == 1
    assert out[0]["file"] == "b.py"


def test_format_github_review_builds_payload():
    svc = AIReviewService()
    comments = [{"file": "a.py", "line": 2, "severity": "warning",
                 "category": "bug", "message": "m", "suggestion": "s"}]
    payload = svc.format_github_review(comments, "acme/repo", 7)
    assert payload["event"] == "COMMENT"
    assert len(payload["comments"]) == 1
    assert "a.py" in payload["comments"][0]["path"]
    assert "suggestion" in payload["comments"][0]["body"]


def test_analyze_diff_empty_returns_empty():
    import asyncio
    svc = AIReviewService()
    assert asyncio.run(svc.analyze_diff("")) == []
    assert asyncio.run(svc.analyze_diff("   ")) == []
