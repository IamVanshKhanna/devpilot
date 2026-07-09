# DevPilot — Product Requirements Document (PRD)

## Overview
DevPilot is an AI code review agent delivered as a GitHub App. Automatically reviews pull requests, leaves inline comments, learns team patterns.

**Type:** B2B SaaS Developer Tool | **Platform:** GitHub App | **MVP:** 3 weeks solo

## MVP Features (V1.0)

### P0 — Must Have (Week 1-2)
1. **GitHub OAuth App** — 2-click install, repo selection
2. **PR Webhook Receiver** — Listen to pull_request.opened, .synchronize events
3. **Diff Analysis Engine** — Parse PR diff, extract changed files with context
4. **AI Review Pipeline** — Send diff+context to AI model, get structured review
5. **Inline PR Comments** — Post comments on specific lines via GitHub Review API

### P1 — Should Have (Week 2-3)
6. **Dashboard** — Simple UI: repos, PRs reviewed, issues found, team stats
7. **Stripe Billing** — Self-serve checkout, plan management, invoices
8. **Email Notifications** — Weekly summary, billing alerts via Resend

## User Stories

**Developer:** "I want AI review on my PR within 2 minutes of opening"
**Team Lead:** "I want code quality metrics and consistent reviews across all PRs"
**OSS Maintainer:** "I want free AI review for my public repos to reduce my burden"

## System Architecture

```
Developer opens PR → GitHub webhook → DevPilot API (FastAPI)
→ Redis queue → AI Worker picks up
→ Fetches PR diff + file context (GitHub API)
→ AI pipeline: preprocess → analyze → format comments
→ Posts review via GitHub Review API
→ Developer sees comments → accepts/rejects → feedback loop
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| API Server | Python FastAPI |
| Worker Queue | Redis + BullMQ |
| Database | PostgreSQL |
| AI Engine | Python + LLM API (OpenRouter/Claude) |
| Frontend | Next.js 14 + TypeScript |
| Billing | Stripe |
| Email | Resend |
| Infra | Docker Compose, Hetzner VPS |

## Review Categories

**Tier 1 (Free):** Bug patterns, security vulnerabilities, type safety
**Tier 2 (Starter $29/mo):** Code style, best practices, performance anti-patterns
**Tier 3 (Pro $59/mo):** Team convention learning, architecture review, test coverage
**Tier 4 (Enterprise $99/mo):** Custom rules, compliance checks, custom model training

## Success Metrics

| Metric | Month 1 | Month 6 |
|--------|---------|---------|
| GitHub installs | 50 | 700 |
| PRs reviewed | 500 | 15,000 |
| Free→Paid conversion | 10% | 8.5% |
| Review acceptance rate | 70% | 80% |
| Avg review time | <120s | <60s |

## Non-Functional Requirements

- PR review posted within 120 seconds of push
- 99.5% uptime
- No source code stored (diffs in-memory only)
- OAuth tokens encrypted at rest
- Handle 100 concurrent PR reviews