# DevPilot

A pre-launch prototype for AI-assisted GitHub pull-request review. The repository contains a Next.js frontend, a FastAPI backend and local Docker Compose configuration. It is not a production-ready GitHub App or a live paid service.

## Implemented in this repository

- A FastAPI webhook route for GitHub pull-request events, with a path for fetching a PR diff, requesting AI analysis and posting a GitHub review when configured with an installation token.
- An AI review service that sends a diff to a configured model API and parses structured review comments. It returns no findings when an API key is absent or the upstream call fails.
- A Next.js landing page and dashboard shell, plus GitHub sign-in wiring.
- Docker Compose configuration for the frontend, backend, PostgreSQL, Redis and nginx, and a backend health route.

These are code paths, not a claim that a public GitHub App installation, end-to-end review flow or deployment has been verified. There are no screenshots or live demo linked here.

## Planned or incomplete

- Repository listing, review history and per-repository rules are placeholder endpoints. The dashboard cannot show real connected repositories from these endpoints yet.
- The review worker is a stub; despite the Compose Redis service, a working queued review pipeline is not shown here.
- Billing calculates plan totals but does not create a Stripe checkout session or a working customer portal. Email notifications are not shown as a working feature.
- The landing page labels the project as a prototype and links to its source rather than an installation flow. Team-pattern learning and automatic convention enforcement are product goals, not demonstrated features.
- The webhook route rejects requests if its signing secret or signature is missing and checks HMAC signatures when configured. Before any public deployment, configure a real signing secret, validate the end-to-end GitHub App flow and CI, and audit the remaining product claims.

## Run locally

```bash
git clone https://github.com/IamVanshKhanna/devpilot.git
cd devpilot
cp .env.example .env
# Configure your own GitHub App and model API credentials in .env.
docker compose up -d
```

The frontend is configured for `http://localhost:3000` and FastAPI documentation for `http://localhost:8000/docs`. The local setup and webhook integration require your own credentials and have not been independently verified by this README.

## Stack

Next.js, TypeScript, Tailwind CSS, FastAPI, PostgreSQL, Redis, Docker Compose, and a configurable AI model API. Stripe and email settings appear in the configuration, but working billing and notifications are not claimed.

## License

See [LICENSE](LICENSE) for the repository's actual license terms.
