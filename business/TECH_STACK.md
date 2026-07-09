# DevPilot — Technology Stack & Architecture

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    GitHub.com                        │
│  PR opened → Webhook → OAuth flow                   │
└──────────────────┬──────────────────────────────────┘
                   │ HTTPS
                   ▼
┌─────────────────────────────────────────────────────┐
│              Nginx Reverse Proxy                      │
│              (SSL termination, rate limiting)         │
└──────────────────┬──────────────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    ▼                             ▼
┌────────────┐           ┌─────────────────┐
│  Next.js   │           │  FastAPI Server  │
│  Frontend  │──────────▶│  (API Gateway)   │
│  :3000     │  REST     │  :8000           │
└────────────┘           └────────┬────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
          ┌──────────┐   ┌──────────┐    ┌──────────────┐
          │PostgreSQL│   │  Redis   │    │ AI Workers    │
          │:5432     │   │  :6379   │    │ (BullMQ       │
          │          │   │          │    │  consumers)   │
          └──────────┘   └──────────┘    └──────────────┘
```

## Technology Choices

### Frontend: Next.js 14 + TypeScript

| Why | Alternative Considered |
|-----|----------------------|
| React ecosystem (largest dev community) | SvelteKit (smaller ecosystem) |
| Server components reduce API calls | Remix (less mature) |
| Vercel free tier for initial hosting | Nuxt (Vue, smaller market) |
| App Router for clean routing | Plain React (no SSR) |

**Key libraries:** Tailwind CSS, shadcn/ui, next-auth, Stripe.js, React Query

### Backend: Python FastAPI

| Why | Alternative Considered |
|-----|----------------------|
| AI/ML ecosystem (Python is the language of AI) | Node.js Express (weaker AI libs) |
| Async native (perfect for webhook processing) | Django (heavier, overkill) |
| Auto-generated OpenAPI docs | Go (harder AI integration) |
| Pydantic for request validation | Rust (longer dev time) |

**Key libraries:** FastAPI, SQLAlchemy, Alembic, httpx, GitHub App SDK (gidgethub), Stripe Python

### Database: PostgreSQL

| Why | Alternative Considered |
|-----|----------------------|
| Relational (users, repos, reviews, billing) | MongoDB (unstructured, harder joins) |
| JSONB for flexible config per repo | SQLite (won't scale past 1 server) |
| Full-text search for review history | MySQL (ecosystem, PG is standard now) |
| Supabase free tier initially | PlanetScale (pricing at scale) |

### Queue/Cache: Redis

| Why | Alternative Considered |
|-----|----------------------|
| BullMQ for job queues (PR reviews are jobs) | RabbitMQ (overkill for solo dev) |
| Cache AI responses (same diff = same review) | In-memory cache (lost on restart) |
| Rate limit tracking (GitHub API limits) | PostgreSQL queue (slower, heavier) |

### AI/LLM Integration

**Primary:** OpenRouter API (access to Claude, GPT-4, DeepSeek — pick best model per task)

**Strategy:**
1. Route requests to cheapest capable model for simple reviews
2. Route to Claude/DeepSeek for complex analysis
3. Cache identical diffs (same PR, same file, same version = cached response)
4. Fine-tune on team patterns (accepted = reinforce, rejected = deprioritize)

**Key libraries:** openai (compatible with OpenRouter), tiktoken (token counting), langfuse (observability)

### Infrastructure: Docker Compose → K8s

| Stage | Infrastructure | Cost |
|-------|---------------|------|
| Dev | Docker Compose (local) | $0 |
| MVP | Single Hetzner VPS (4 vCPU, 8GB) | $30/mo |
| Growth | 2 VPS + managed DB (Supabase) | $100/mo |
| Scale | K3s cluster + CDN | $300/mo |

### CI/CD

- **Code:** GitHub (hosts the repo and the product!)
- **CI:** GitHub Actions (free for public repos)
- **CD:** Docker Compose pull + restart on VPS via GH Actions SSH
- **Monitoring:** Grafana Cloud free tier + Sentry for errors

### Development Tools

| Tool | Purpose |
|------|---------|
| VS Code / Cursor | IDE |
| Docker Desktop | Local dev environment |
| ngrok | Webhook testing during development |
| Postman / Hoppscotch | API testing |
| Stripe CLI | Webhook testing for billing |
| pnpm | Package manager (faster than npm) |

## Repository Structure

```
devpilot/
├── frontend/           # Next.js 14 app
│   ├── app/            # App Router pages
│   ├── components/     # React components
│   └── lib/            # API client, utils
├── backend/            # FastAPI application
│   ├── app/
│   │   ├── api/        # Route handlers
│   │   ├── core/       # Config, security
│   │   ├── models/     # SQLAlchemy models
│   │   ├── services/   # Business logic
│   │   └── workers/    # BullMQ consumers
│   ├── alembic/        # DB migrations
│   └── tests/          # pytest
├── docker-compose.yml  # Local dev + prod
├── nginx/              # Reverse proxy config
├── scripts/            # Deployment scripts
└── docs/               # Documentation
```

## Security Considerations

| Concern | Implementation |
|---------|---------------|
| GitHub OAuth tokens | Encrypted at rest (AES-256), transmitted over HTTPS only |
| Source code | Never persisted to disk — diffs processed in-memory, discarded after review |
| API keys | Stored in environment variables, never in code. Rotated quarterly. |
| Webhook verification | HMAC signature validation on every GitHub webhook |
| Rate limiting | Token bucket per user/IP. 60 requests/min for API. |
| CORS | Strict origin whitelist (devpilot.dev only) |
| Dependencies | Dependabot auto-updates. Trivy container scanning in CI. |

## Performance Targets

| Metric | Target |
|--------|--------|
| Webhook → review posted | < 120 seconds |
| Dashboard page load | < 2 seconds |
| AI analysis (simple) | < 30 seconds |
| AI analysis (complex) | < 90 seconds |
| Concurrent PR reviews | 50 simultaneous |
| API response (non-AI) | < 200ms |

## Cost Optimization

1. **AI caching:** Same file version + same diff = cached response (50%+ cache hit rate expected)
2. **Model routing:** Bug checks on Haiku, architecture review on Sonnet
3. **Free tiers everywhere:** GitHub free, Supabase free, Vercel free, Grafana free, Sentry free
4. **Scale-to-zero dev:** Docker Compose stops when not in use. VPS always-on but minimal.

## Future Architecture (Year 2)

- **K3s on Hetzner:** Auto-scaling worker pods for PR review spikes
- **CDN:** Cloudflare for dashboard assets and API caching
- **Multi-region:** EU + US deployments for latency (GDPR compliance)
- **On-prem appliance:** Docker image for enterprise self-hosting