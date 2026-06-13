import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "DevPilot — AI Code Review That Learns Your Team",
  description:
    "DevPilot installs in 2 clicks. Reviews every PR. Learns your team's patterns. Ship better code, faster.",
}

const StepIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-dp-accent/10 text-dp-accent">
    {children}
  </div>
)

const CheckIcon = (
  <svg className="h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const IconInstall = (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

const IconPR = (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const IconReview = (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0112 3.444m-3.066 5.057a11.959 11.959 0 016.352 1.167" />
  </svg>
)

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dp-bg text-dp-text">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-dp-bg/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tight">
            Dev<span className="text-dp-glow">Pilot</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm text-dp-muted">
            <Link href="#how" className="hover:text-white transition">How It Works</Link>
            <Link href="#sample" className="hover:text-white transition">Sample Review</Link>
            <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition">FAQ</Link>
            <a
              href="https://github.com/IamVanshKhanna/devpilot"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
            <Link
              href="#"
              className="bg-dp-accent text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20"
            >
              Install Free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dp-accent/10 via-dp-bg to-dp-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/15 blur-[140px] rounded-full" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-dp-muted mb-6">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Now in public preview — install the GitHub App today
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight">
            AI code review that<br />
            <span className="bg-gradient-to-r from-dp-accent to-dp-glow bg-clip-text text-transparent">
              learns your team
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-dp-muted">
            DevPilot sits on every PR, catches bugs, enforces conventions, and improves
            from your team&apos;s own accepted/rejected feedback — automatically.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-dp-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/25"
            >
              <span className="text-xl">⚡</span>
              Install Free on GitHub
            </Link>
            <Link
              href="#sample"
              className="inline-flex items-center justify-center gap-2 border border-dp-accent/70 text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-accent/10 transition"
            >
              See a sample review →
            </Link>
          </div>
          <p className="mt-4 text-xs text-dp-muted">
            No credit card required • Works with public &amp; private repos • 2-minute setup
          </p>
        </div>

        {/* Hero Diff Panel */}
        <div className="relative mx-auto max-w-6xl px-6 pb-28">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-white/[0.02]">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs font-mono text-dp-muted">src/auth/service.py  ·  PR #247</span>
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-dp-muted px-2 py-0.5 rounded border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                3 comments
              </span>
            </div>
            <div className="grid md:grid-cols-2 text-sm font-mono p-4">
              <div className="border-r border-white/5 pr-4 text-dp-muted leading-relaxed">
                <div className="text-red-400/70">- async def authenticate(request):</div>
                <div className="text-emerald-400/90">+ async def authenticate(request: Request) &amp;gt; AuthResult:</div>
                <div className="text-dp-muted mt-2">    user = await get_user(request.headers.get(&quot;Authorization&quot;))</div>
                <div className="text-dp-muted">    if not user:</div>
                <div className="text-dp-muted">        raise Unauthorized()</div>
                <div className="text-dp-muted">    return user</div>
              </div>
              <div className="pl-4">
                <div className="flex items-start gap-3 mb-4">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs text-amber-300 font-bold">
                    !
                  </span>
                  <div className="flex-1">
                    <div className="text-amber-200 font-medium">Missing type hints on public API</div>
                    <div className="mt-1 text-dp-muted text-sm leading-relaxed">
                      Add parameter and return types. Internal callers
                      rely on this contract — explicit types prevent
                      runtime errors and improve IDE autocomplete.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs">
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">type-safety</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">api-design</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs text-red-300 font-bold">
                    ✕
                  </span>
                  <div className="flex-1">
                    <div className="text-red-200 font-medium">Potential N+1 query in get_user</div>
                    <div className="mt-1 text-dp-muted text-sm leading-relaxed">
                      Consider batching user lookups when multiple
                      auth checks run in the same request cycle.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs">
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">performance</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">security</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 px-4 py-3 bg-white/[0.02] flex items-center justify-end gap-2">
              <button className="text-xs font-medium text-dp-muted hover:text-white transition px-3 py-1.5 rounded border border-white/10">Dismiss</button>
              <button className="text-xs font-medium text-white px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 transition">Accept</button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-80 text-slate-300 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-medium">120+ repos</span> in preview
            </span>
            <span className="w-px h-6 bg-white/10 hidden sm:block" />
            <span className="font-medium">GitHub-native</span> OAuth + webhooks
            <span className="w-px h-6 bg-white/10 hidden sm:block" />
            <span className="font-medium">NVIDIA Inception</span> backed
            <span className="w-px h-6 bg-white/10 hidden sm:block" />
            <span className="font-medium">SOC-2</span> in progress
            <span className="w-px h-6 bg-white/10 hidden sm:block" />
            <span className="font-medium">Open-source first</span> — free for public repos
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center hover:border-dp-accent/30 transition">
            <div className="text-4xl font-extrabold text-dp-accent">&lt; 90s</div>
            <div className="mt-1 text-sm text-dp-muted">Median time to first review</div>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center hover:border-dp-accent/30 transition">
            <div className="text-4xl font-extrabold text-dp-accent">50+</div>
            <div className="mt-1 text-sm text-dp-muted">Languages &amp; frameworks</div>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center hover:border-dp-accent/30 transition">
            <div className="text-4xl font-extrabold text-dp-accent">0</div>
            <div className="mt-1 text-sm text-dp-muted">Config files required</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">How It Works</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            From install to first review in under two minutes.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: IconInstall, title: "Install on GitHub", desc: "Connect DevPilot to your repos in a couple of clicks. No extra config files required." },
              { icon: IconPR, title: "Open a Pull Request", desc: "DevPilot listens for PR events and fetches the diff automatically when the PR opens." },
              { icon: IconReview, title: "Get Smart Reviews", desc: "See inline comments with bug reports, improvement ideas, and team-pattern warnings." },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left hover:border-dp-accent/40 transition"
              >
                <StepIcon>{step.icon}</StepIcon>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-dp-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Review — Interactive Demo Card */}
      <section id="sample" className="py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">See What DevPilot Looks Like</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            Real review comments, not generic lint noise.
          </p>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-white/[0.02]">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-amber-400/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs font-mono text-dp-muted">src/auth/service.py  ·  PR #247</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                3 comments
              </span>
            </div>

            <div className="grid md:grid-cols-2 text-sm font-mono p-4 gap-y-4">
              <div className="md:col-span-1 border-r border-white/5 md:border-r md:border-b-0 pr-4 md:pb-0 text-dp-muted leading-relaxed">
                <div className="relative">
                  <span className="absolute left-0 text-dp-muted/40"> 1&nbsp;</span>
                  <div className="pl-6 text-red-400/70">- async def authenticate(request):</div>
                </div>
                <div className="relative">
                  <span className="absolute left-0 text-emerald-400/40"> 2&nbsp;</span>
                  <div className="pl-6 text-emerald-400/90">+ async def authenticate(request: Request) &amp;gt; AuthResult:</div>
                </div>
                <div className="relative">
                  <span className="absolute left-0 text-dp-muted/40"> 3&nbsp;</span>
                  <div className="pl-6">    user = await get_user(request.headers.get(&quot;Authorization&quot;))</div>
                </div>
                <div className="relative">
                  <span className="absolute left-0 text-dp-muted/40"> 4&nbsp;</span>
                  <div className="pl-6">    if not user:</div>
                </div>
                <div className="relative">
                  <span className="absolute left-0 text-dp-muted/40"> 5&nbsp;</span>
                  <div className="pl-6">        raise Unauthorized()</div>
                </div>
                <div className="relative">
                  <span className="absolute left-0 text-dp-muted/40"> 6&nbsp;</span>
                  <div className="pl-6">    return user</div>
                </div>
              </div>

              <div className="pl-4 md:pl-4 flex flex-col gap-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs text-amber-300 font-bold">
                    !
                  </span>
                  <div className="flex-1 text-sm font-normal leading-relaxed">
                    <div className="text-amber-200 font-medium">Missing type hints on public API</div>
                    <div className="mt-1 text-dp-muted">
                      Add parameter and return types. Internal callers
                      rely on this contract — explicit types prevent
                      runtime errors and improve IDE autocomplete.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs">
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">type-safety</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">api-design</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs text-red-300 font-bold">
                    ⚠
                  </span>
                  <div className="flex-1 text-sm font-normal leading-relaxed">
                    <div className="text-red-200 font-medium">Potential N+1 query in get_user</div>
                    <div className="mt-1 text-dp-muted">
                      Consider batching user lookups when multiple
                      auth checks run in the same request cycle.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs">
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">performance</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">security</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs text-emerald-300 font-bold">
                    ✓
                  </span>
                  <div className="flex-1 text-sm font-normal leading-relaxed">
                    <div className="text-emerald-200 font-medium">Good: Early return pattern</div>
                    <div className="mt-1 text-dp-muted">
                      Fail-fast on unauthorized keeps the happy path
                      clean and reduces cognitive load.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs">
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-dp-muted">best-practice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 px-4 py-3 bg-white/[0.02] flex items-center justify-between">
              <div className="text-xs text-dp-muted">
                DevPilot learns from your team&apos;s accept/dismiss patterns
              </div>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-dp-muted hover:text-white transition px-3 py-1.5 rounded border border-white/10">Dismiss</button>
                <button className="text-xs font-medium text-white px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 transition">Accept</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">Simple Pricing</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            Free for public repos. Paid plans for private repos and team workflows.
          </p>
          <div className="mt-12 grid md:grid-cols-4 gap-5 text-left">
            {[
              { name: "Open Source", price: "$0", unit: "", desc: "Public repositories", features: ["Unlimited PRs", "Basic AI review", "Bug detection", "Security checks"], featured: false, cta: "Get Started", ctaVariant: "outline" },
              { name: "Starter", price: "$29", unit: "/repo/mo", desc: "Private repos, up to 10", features: ["Everything in Free", "Style consistency", "Best practice suggestions", "Performance analysis", "Email support"], featured: true, cta: "Start Free Trial", ctaVariant: "primary" },
              { name: "Pro", price: "$59", unit: "/repo/mo", desc: "Team learning + custom rules", features: ["Everything in Starter", "Team pattern learning", "Custom rules engine", "Slack integration", "Priority support"], featured: false, cta: "Start Free Trial", ctaVariant: "outline" },
              { name: "Enterprise", price: "$99", unit: "/repo/mo", desc: "Self-hosted + custom models", features: ["Everything in Pro", "Self-hosted option", "Custom model training", "SSO + audit logs", "Dedicated support"], featured: false, cta: "Contact Us", ctaVariant: "outline" },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition hover:-translate-y-1 ${
                  plan.featured
                    ? "border-2 border-dp-accent bg-dp-accent/5 shadow-xl shadow-dp-accent/5"
                    : "border border-white/10 bg-white/[0.03] hover:border-dp-accent/40"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dp-accent text-xs font-semibold px-4 py-1 rounded-full shadow-lg shadow-dp-accent/30">
                    Most Popular
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-widest text-dp-accent">{plan.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.unit && <span className="text-sm text-dp-muted">{plan.unit}</span>}
                </div>
                <div className="mt-1 text-sm text-dp-muted">{plan.desc}</div>
                <ul className="mt-5 space-y-3 text-sm text-dp-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      {CheckIcon}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`mt-6 block text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    plan.ctaVariant === "primary"
                      ? "bg-dp-accent text-white hover:bg-indigo-500 shadow-lg shadow-dp-accent/25"
                      : "border border-dp-accent text-dp-accent hover:bg-dp-accent/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — Accordion */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            Details on how DevPilot handles code, privacy, and speed.
          </p>
          <div className="mt-12 space-y-3 text-left">
            {[
              { q: "Does this replace human code review?", a: "No. DevPilot handles first-pass work — bug detection, readability, and consistency — while humans focus on architecture, design, and business context." },
              { q: "Is my code sent to a third party?", a: "Diffs are processed in-memory and only used for the current review. We use read-only GitHub access and don't persist source code." },
              { q: "How fast are reviews?", a: "Most PRs receive their first review comments within 60–120 seconds of opening, depending on size." },
              { q: "What languages are supported?", a: "All languages GitHub can diff. The model understands 50+ languages, frameworks, and common tooling stacks." },
              { q: "Can I customize review rules?", a: "Yes. Starter includes standard rules. Pro lets you define custom patterns. Enterprise adds custom model tuning." },
              { q: "Is there a free tier?", a: "Yes. Public repos are free. Starter and Pro include a 14-day trial for private repos." },
            ].map((item, i) => (
              <details key={i} className="group rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <h3 className="font-semibold text-dp-glow pr-4">{item.q}</h3>
                  <svg className="h-5 w-5 shrink-0 text-dp-muted transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-sm text-dp-muted leading-relaxed border-t border-white/5">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-dp-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold">Start shipping better code today</h2>
          <p className="mt-3 text-dp-muted max-w-xl mx-auto">
            Install DevPilot, open your first PR, and see AI code review in action.
          </p>
          <div className="mt-8">
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-dp-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/25"
            >
              Install DevPilot on GitHub →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dp-muted">
            <p>© 2026 DevPilot. Built for developers.</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="https://github.com/IamVanshKhanna/devpilot" className="hover:text-white transition" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <Link href="#" className="hover:text-white transition">Privacy</Link>
              <Link href="#" className="hover:text-white transition">Terms</Link>
              <a href="mailto:hello@devpilot.dev" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-dp-muted/70">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open Source First
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-white/10">
              No Code Stored
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-amber-500/30 text-amber-300">
              SOC-2 Pending
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
