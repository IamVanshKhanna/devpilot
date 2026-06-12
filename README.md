# DevPilot

AI-powered code review agent that installs as a GitHub App. Automatically reviews pull requests, catches bugs, enforces conventions, and learns your team's patterns.

**Status:** Pre-launch MVP | **Stack:** Next.js + FastAPI + PostgreSQL + Redis

## Quick Start

```bash
# Clone
git clone https://github.com/IamVanshKhanna/devpilot.git
cd devpilot

# Copy env template
cp .env.example .env
# Edit .env with your GitHub App credentials and API keys

# Start all services
docker compose up -d

# Access
# Frontend: http://localhost:3000
# API docs: http://localhost:8000/docs
```

## Architecture

```
GitHub PR → Webhook → FastAPI → Redis Queue → AI Worker
                                     ↓
                    GitHub Review API ← AI Analysis
                                     ↓
                         PR Comment (inline review)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind CSS |
| Backend | Python FastAPI |
| Database | PostgreSQL 16 |
| Queue/Cache | Redis 7 + BullMQ |
| AI | OpenRouter API (Claude, GPT-4, DeepSeek) |
| Billing | Stripe |
| Email | Resend |
| Infra | Docker Compose |

## Project Structure

```
devpilot/
├── frontend/          # Next.js 14 app (landing page + dashboard)
├── backend/           # FastAPI application
│   └── app/
│       ├── api/       # Route handlers
│       ├── core/      # Config, security
│       ├── models/    # SQLAlchemy models
│       ├── services/  # Business logic
│       └── workers/   # BullMQ consumers
├── nginx/             # Reverse proxy config
├── scripts/           # Deployment scripts
└── docker-compose.yml # Local dev environment
```

## Environment Variables

See `.env.example` for all required variables. Key ones:

- `GITHUB_APP_ID` / `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub App credentials
- `GITHUB_PRIVATE_KEY` — GitHub App private key (PEM)
- `GITHUB_WEBHOOK_SECRET` — Webhook HMAC secret
- `OPENROUTER_API_KEY` — AI model API key
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` — Billing
- `RESEND_API_KEY` — Email notifications

## Development

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# Webhook testing (local)
ngrok http 8000
# Set webhook URL in GitHub App settings to ngrok URL
```

## Business

- **Website:** devpilot.dev
- **Docs:** docs.devpilot.dev
- **Pricing:** Free (public repos) | $29-99/repo/mo (private repos)
- **Status:** Bootstrapped, solo founder

## License

Core review engine: MIT
Team-learning model & enterprise features: Proprietary