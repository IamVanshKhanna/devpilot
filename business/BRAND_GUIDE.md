# DevPilot — Brand Guide

## Brand Identity

**Brand Name:** DevPilot
**Tagline:** "AI Code Review, Trained on Your Team"
**Alternative Taglines:**
- "Your AI Co-Pilot for Code Review"
- "Automate Code Review. Amplify Your Team."
- "Code Review That Learns"

## Mission

Make every code review fast, consistent, and insightful — so developers can ship with confidence.

## Brand Personality

| Trait | Description |
|-------|-------------|
| **Competent** | Knows code deeply. Suggests real improvements, not noise. |
| **Efficient** | Fast reviews. No fluff. Developers' time is respected. |
| **Humble** | "I suggest. You decide." Never replaces human judgment. |
| **Evolving** | Gets better with every PR. The bot that learns. |

## Voice & Tone

### Technical but approachable

- **DO:** "Consider extracting this logic into a separate function to reduce duplication."
- **DON'T:** "This code is bad. Fix it."

- **DO:** "This pattern could lead to a race condition. Here's how to fix it..."
- **DON'T:** "LGTM!" (never rubber-stamp)

### Concise but contextual

Every comment includes:
1. **What** the issue is (1 line)
2. **Why** it matters (1 line)
3. **How** to fix it (code suggestion)

### Developer-native

Uses developer vocabulary naturally. No marketing-speak. Developers can smell BS.

## Visual Identity

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Space Blue | `#0A0E27` | Primary background |
| Electric Indigo | `#6366F1` | Primary accent, CTAs |
| Cyan Glow | `#22D3EE` | Secondary accent, highlights |
| Success Green | `#10B981` | Passed checks, positive feedback |
| Warning Amber | `#F59E0B` | Suggestions, improvements |
| Error Red | `#EF4444` | Critical issues, errors |
| Text White | `#F8FAFC` | Primary text |
| Text Muted | `#94A3B8` | Secondary text |

### Typography

- **Headings:** Inter (sans-serif, clean, modern)
- **Body:** JetBrains Mono (code) + Inter (prose)
- **Code Blocks:** JetBrains Mono, 14px, syntax highlighted

### Logo Concept

A stylized paper plane (pilot) merged with angle brackets `</>` (code). The paper plane represents guidance, direction, and speed. The brackets ground it in code.

```
  ✈️ + </>
  = DevPilot mark
```

Colors: Electric Indigo plane with Cyan Glow trail.

## Brand Assets

### DevPilot Comment Signature

Every AI review comment ends with:

```
---
🤖 **DevPilot** — [Accept] [Dismiss]
```
Or minimal:
```
🤖 DevPilot — AI review suggestion
```

### Social Media Handles

| Platform | Handle |
|----------|--------|
| GitHub | github.com/IamVanshKhanna/devpilot |
| Twitter/X | @DevPilotAI |
| dev.to | dev.to/devpilot |
| Product Hunt | producthunt.com/products/devpilot |

### Hashtags

`#DevPilot` `#AICodeReview` `#DevTools` `#CodeReview` `#GitHubApp`

---

## Competitor Brand Positioning

| Brand | Vibe | DevPilot vs Them |
|-------|------|-----------------|
| CodeRabbit | Enterprise, feature-heavy | DevPilot = simpler, team-learning |
| GitHub Copilot | Microsoft, corporate | DevPilot = indie, open-source friendly |
| SonarQube | Compliance, static analysis | DevPilot = AI-native, PR-focused |

## Brand Promise

**"DevPilot reviews your code so your team can focus on what matters — building great software."**

---

## Landing Page Copy

### Hero

**Headline:** "AI Code Review That Learns Your Team"
**Subheadline:** "DevPilot installs in 2 clicks. Reviews every PR. Learns your patterns. Ship better code, faster."
**CTA:** "Install Free on GitHub" → GitHub App installation URL

### How It Works

1. **Install on GitHub** — Connect DevPilot to your repos in 2 clicks. No configuration needed.
2. **Open a Pull Request** — DevPilot automatically analyzes every new PR and code change.
3. **Get Smart Reviews** — See inline comments that catch bugs, enforce conventions, and suggest improvements.

### Pricing Section

| Open Source | Starter | Pro | Enterprise |
|-------------|---------|-----|------------|
| **Free** | **$29/repo/mo** | **$59/repo/mo** | **$99/repo/mo** |
| Public repos | Private repos | Everything in Starter | Everything in Pro |
| Unlimited PRs | 10 repos | Team pattern learning | Self-hosted option |
| Basic AI review | Standard rules | Custom rules engine | Custom model training |
| | | Slack integration | SSO + audit logs |

### Social Proof (Early Adopters)

> "DevPilot caught a null-pointer bug in our PR that 3 senior engineers missed. It's like having an extra senior dev on the team." — Early adopter

### FAQ

**Q: Does DevPilot replace human code review?**
A: No. DevPilot handles the first pass — catching bugs, style issues, and anti-patterns. Humans still review for architecture, design, and business logic.

**Q: Is my source code safe?**
A: Yes. Diffs are processed in-memory and never stored. We use read-only GitHub OAuth with minimal permissions.

**Q: What languages does it support?**
A: All languages that GitHub supports. The AI model understands 50+ programming languages.

**Q: Can I customize the review rules?**
A: Yes. Starter includes standard rules. Pro lets you define custom patterns. Enterprise includes custom model training.