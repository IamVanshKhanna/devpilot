"""Tests for GitHub webhook HMAC verification (no network, no DB)."""
import os
import hmac
import hashlib

os.environ.setdefault("GITHUB_APP_ID", "123456")
os.environ.setdefault("GITHUB_PRIVATE_KEY", "test")
os.environ.setdefault("GITHUB_WEBHOOK_SECRET", "webhook_secret_for_testing")

from app.api.webhooks import verify_signature


def _sign(body: bytes, secret: str) -> str:
    return "sha256=" + hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()


def test_verify_signature_valid():
    body = b'{"action":"opened"}'
    sig = _sign(body, "webhook_secret_for_testing")
    assert verify_signature(body, sig, "webhook_secret_for_testing") is True


def test_verify_signature_tampered():
    body = b'{"action":"opened"}'
    sig = _sign(body, "webhook_secret_for_testing")
    assert verify_signature(b'{"action":"reopened"}', sig, "webhook_secret_for_testing") is False


def test_verify_signature_wrong_secret():
    body = b'{"action":"opened"}'
    sig = _sign(body, "attacker_secret")
    assert verify_signature(body, sig, "webhook_secret_for_testing") is False


def test_verify_signature_empty_secret_dev_mode():
    # Dev mode: empty secret skips verification
    assert verify_signature(b"x", "anything", "") is True
