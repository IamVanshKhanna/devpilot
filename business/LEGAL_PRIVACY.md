# DevPilot — Legal & Privacy

## Terms of Service (Template)

**Last Updated:** June 2026

### 1. Acceptance of Terms

By installing the DevPilot GitHub App ("the Service"), you agree to these Terms of Service. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization.

### 2. Description of Service

DevPilot is an AI-powered code review agent that:
- Analyzes pull request diffs on connected repositories
- Posts automated review comments on pull requests
- Learns coding patterns from accepted and rejected suggestions

### 3. User Responsibilities

You agree to:
- Use the Service in compliance with GitHub's Terms of Service
- Not use the Service to review code containing illegal content
- Not attempt to reverse engineer the AI model
- Maintain the security of your GitHub account

### 4. Data Handling

**What we access:**
- Pull request diffs (code changes between branches)
- File names and paths within connected repositories
- Pull request metadata (title, description, author)

**What we DO NOT store:**
- Your source code (processed in-memory, discarded after review)
- Your GitHub credentials (we use OAuth tokens only)
- Private repository contents beyond the active PR diff

**What we DO store:**
- Anonymized review metadata (PR ID, review categories triggered, acceptance rate)
- Team learning patterns (derived statistics, not source code)
- Account information (email, plan, billing)

### 5. Intellectual Property

- You retain all rights to your source code
- DevPilot's AI model, review algorithms, and generated comments are proprietary
- Aggregated, anonymized review data may be used to improve the Service

### 6. Service Level

- Target availability: 99.5% uptime
- No SLA for Free tier. Starter+ tiers: 99% uptime SLA
- Maintenance windows announced 24 hours in advance

### 7. Limitation of Liability

DevPilot provides automated code review suggestions. These are advisory only. DevPilot is not liable for:
- Bugs or vulnerabilities not caught by the AI review
- Incorrect suggestions made by the AI
- Any damages arising from use or inability to use the Service

THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.

### 8. Termination

- You may uninstall the Service at any time from GitHub
- We may terminate accounts that violate these terms
- Upon termination, all stored data is deleted within 30 days

### 9. Pricing & Payment

- Free tier: Public repositories only, unlimited PRs
- Paid plans: Billed monthly or annually via Stripe
- 14-day free trial for Starter and Pro plans
- Refunds: Pro-rated for annual plans within 30 days

### 10. Changes to Terms

We will notify users of material changes 30 days in advance via email. Continued use after changes constitutes acceptance.

---

## Privacy Policy (Template)

### Information We Collect

**From GitHub OAuth:**
- GitHub username and user ID
- Email address (for billing and notifications)
- Organization memberships
- Repository list (only repos where DevPilot is installed)

**From usage:**
- PR review metadata (repo ID, PR number, review categories triggered)
- Acceptance/rejection rates (aggregated, anonymized)
- Feature usage analytics (which rules trigger most often)

### Information We DO NOT Collect

- Your source code (diffs are processed in-memory and discarded)
- Passwords or credentials
- Personal data from your codebase (PII in code is not extracted)
- Browsing history or activity outside DevPilot

### How We Use Information

- To provide the code review service
- To improve AI model accuracy
- To send billing and service notifications
- To generate aggregated analytics (e.g., "most common bug types across all users")

### Data Sharing

We do NOT sell your data. We share data only:
- With GitHub (to post review comments via their API)
- With Stripe (for payment processing)
- With our infrastructure providers (Hetzner, Supabase) to operate the service
- When required by law

### Data Retention

| Data Type | Retention Period |
|-----------|-----------------|
| PR review results | 30 days (for dashboard access) |
| Team learning patterns | Indefinite (anonymized) |
| Account information | Duration of account + 30 days |
| Billing records | 7 years (legal requirement) |
| AI model training data | Anonymized, aggregated only |

### Data Security

- All data transmitted over HTTPS/TLS 1.3
- OAuth tokens encrypted at rest (AES-256)
- Database encrypted at rest (Supabase/PostgreSQL TDE)
- Regular security audits (annual penetration testing after $5K MRR)

### Your Rights (GDPR Compliance)

You have the right to:
- Access your personal data
- Correct inaccurate data
- Delete your account and associated data
- Export your data in machine-readable format
- Object to processing of your data

To exercise these rights, email privacy@devpilot.dev.

### Cookie Policy

DevPilot uses:
- Essential cookies: Authentication session (no third-party cookies)
- Analytics cookies: PostHog (self-hosted, anonymous) — optional, opt-out in settings

### Children's Privacy

DevPilot is not intended for users under 16. We do not knowingly collect data from children.

### Contact

**Data Protection Officer:** Vansh Khanna
**Email:** privacy@devpilot.dev
**Response time:** Within 72 hours

---

## Data Processing Agreement (Enterprise)

Available for Enterprise tier customers ($99/repo/month). Covers:
- Sub-processing agreements with infrastructure providers
- Data residency options (EU/US)
- Custom retention policies
- Right to audit (annual, with 30 days notice)
- Breach notification within 48 hours

---

## Open Source License

DevPilot's core review engine is MIT licensed (open source). The team-learning AI model and enterprise features are proprietary.

GitHub: github.com/IamVanshKhanna/devpilot

---

## Business Registration (Planned)

- **Entity:** Sole Proprietorship → LLC (at $5K MRR)
- **Jurisdiction:** India (founder location) / Delaware LLC (US customers)
- **Tax:** GST (India) + self-reported US sales tax via Stripe Tax
- **Trademark:** DevPilot™ (file after public launch)
- **Insurance:** Tech E&O insurance (at $5K MRR)

---

*This is a template. Consult a lawyer before going live with paying customers.*