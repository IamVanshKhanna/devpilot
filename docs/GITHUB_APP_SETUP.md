# GitHub App Registration Guide for DevPilot

## Overview
DevPilot installs as a GitHub App. This guide walks through creating and registering the app.

## Prerequisites
- GitHub organization or user account where you'll create the app
- Existing DevPilot repo: `github.com/IamVanshKhanna/devpilot`
- Production domain (for webhooks): `https://your-domain.com` or use ngrok for dev

---

## Step 1: Create the GitHub App

1. Go to: **Settings → Developer settings → GitHub Apps → New GitHub App**
2. Fill in:

### Basic Info
| Field | Value |
|-------|-------|
| GitHub App name | `DevPilot` |
| Homepage URL | `https://github.com/IamVanshKhanna/devpilot` |
| Callback URL (OAuth) | `https://your-domain.com/api/auth/callback` |
| Webhook URL | `https://your-domain.com/api/webhook/github` |
| Webhook secret | Generate a secure random string (save it!)

### Permissions
**Repository permissions:**
- Repository metadata: **Read-only**
- Pull requests: **Read & Write** (to post review comments)
- Contents: **Read-only** (to fetch diffs)
- Commit statuses: **Read & Write** (optional: show check runs)
- Issues: **Read-only** (optional: create issues for critical findings)

**Organization permissions:**
- Members: **Read-only** (optional: team settings)
- Administration: **No access**

### Events to Subscribe
- ✅ Pull request
- ✅ Pull request review
- ✅ Pull request review comment
- ✅ Push (optional: for branch monitoring)
- ✅ Installation (required: know when app is installed on repos)

---

## Step 2: Save Credentials

After creation, note:
- **App ID** → `GITHUB_APP_ID`
- **Client ID** → `GITHUB_CLIENT_ID`
- **Client Secret** → `GITHUB_CLIENT_SECRET` (generate on Client secrets page)
- **Private Key** → Generate on Private keys page (download `.pem` file)
- **Webhook Secret** → Your generated string from Step 1

---

## Step 3: Configure Environment Variables

Add to your `.env` (never commit!):

```bash
# GitHub App
GITHUB_APP_ID=123456
GITHUB_CLIENT_ID=Iv1.xxxxxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
GITHUB_WEBHOOK_SECRET=your-webhook-secret-here

# OAuth callback URL (must match GitHub App settings)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# AI
NVIDIA_API_KEY=your-nvidia-key
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
AI_MODEL=deepseek-ai/deepseek-v4-pro

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
RESEND_API_KEY=re_...

# Database
DATABASE_URL=postgresql://devpilot:password@localhost:5432/devpilot
```

---

## Step 4: Development Setup (using ngrok)

For local development:

```bash
# Terminal 1: Start ngrok
ngrok http 8000

# Terminal 2: Update GitHub App webhook URL to ngrok URL
# e.g., https://abc123-8000.ngrok-free.app/api/webhook/github

# Terminal 3: Run DevPilot
docker compose up
```

---

## Step 5: Test Installation

1. Go to: `https://github.com/apps/devpilot`
2. Click **Install** → select repositories
3. Open a PR on an installed repo
4. Check: DevPilot should post a review comment within 60-120s

---

## Step 6: Production Deployment

For VPS deployment:

1. **Domain**: Point `devpilot.yourdomain.com` to VPS IP
2. **SSL**: Use Let's Encrypt via nginx/certbot
3. **Environment**: Store all secrets in VPS `.env`
4. **Process manager**: Run `docker compose up -d`
5. **Monitoring**: Check logs with `docker compose logs -f`

---

## Webhook Signature Verification

Incoming webhooks are verified using the secret:

```python
# In webhook handler
import hmac, hashlib

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid signature" | Check webhook secret matches exactly |
| "App not installed on repo" | Verify Installation event handler creates Repo records |
| OAuth fails | Callback URL must match exactly (no trailing slash) |
| Private key errors | Ensure PEM format, newlines escaped in `.env` |

---

## Quick Reference: Required Scopes Summary

| Scope | Permission | Why |
|-------|------------|-----|
| `repo` | Read/Write | Access private repos, post review comments |
| `read:org` | Read | Team membership for org plans |
| `admin:repo_hook` | Write | Manage webhook subscriptions |

---

*Generated for DevPilot — update as scopes/permissions change*