import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "DevPilot — AI Code Review That Learns Your Team",
  description:
    "DevPilot installs in 2 clicks. Reviews every PR. Learns your team's patterns. Ship better code, faster.",
}

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
        <div className="absolute inset-0 bg-gradient-to-b from-dp-accent/20 via-dp-bg to-dp-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/20 blur-[140px] rounded-full" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 text-center">
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
            from your team’s own accepted/rejected feedback — automatically.
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
            No credit card required • Works with public & private repos • 2-minute setup
          </p>
        </div>
      </section>

      {/* Trust / social proof */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-center text-xs uppercase tracking-widest text-dp-muted">
            Developer experience engineers shipping with
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-70 text-slate-300">
            <span className="text-sm font-semibold tracking-wide">GitHub Native</span>
            <span className="text-sm font-semibold tracking-wide">Next.js</span>
            <span className="text-sm font-semibold tracking-wide">PostgreSQL</span>
            <span className="text-sm font-semibold tracking-wide">Docker</span>
            <span className="text-sm font-semibold tracking-wide">Redis</span>
            <span className="text-sm font-semibold tracking-wide">NVIDIA AI</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-4xl font-extrabold text-dp-accent">&lt; 2min</div>
            <div className="mt-1 text-sm text-dp-muted">Time to first review on a typical PR</div>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-4xl font-extrabold text-dp-accent">50+</div>
            <div className="mt-1 text-sm text-dp-muted">Languages and frameworks understood</div>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div className="text-4xl font-extrabold text-dp-accent">0 Config</div>
            <div className="mt-1 text-sm text-dp-muted">Complex setup or YAML files required</div>
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
              { num: "01", title: "Install on GitHub", desc: "Connect DevPilot to your repos in a couple of clicks. No extra config files required." },
              { num: "02", title: "Open a Pull Request", desc: "DevPilot listens for PR events and fetches the diff automatically when the PR opens." },
              { num: "03", title: "Get Smart Reviews", desc: "See inline comments with bug reports, improvement ideas, and team-pattern warnings." },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left hover:border-dp-accent/40 transition"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-dp-accent">
                  Step {step.num}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-dp-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Review */}
      <section id="sample" className="py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">See What DevPilot Looks Like</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            Real review comments, not generic lint noise.
          </p>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] text-left overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-xs text-dp-muted">auth/service.py · PR #128</span>
            </div>
            <div className="grid md:grid-cols-2 text-sm">
              <div className="border-r border-white/5 px-4 py-3 font-mono text-dp-muted">
                <div>- def login(username, password):</div>
                <div>+ def login(username: str, password: str) -&gt; Token:</div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs text-amber-300">
                    !
                  </span>
                  <div>
                    <div className="text-amber-200">Missing type hints</div>
                    <div className="mt-1 text-dp-muted">
                      Add return type and parameter types so the contract is explicit and
                      reviewers can reason about callers faster.
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 text-xs text-dp-muted">
                      <span className="rounded-full border border-white/10 px-2 py-0.5">type-safety</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5">readability</span>
                    </div>
                  </div>
                </div>
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
              { name: "Open Source", price: "$0", unit: "", desc: "Public repositories", features: ["Unlimited PRs", "Basic AI review", "Bug detection", "Security checks"], featured: false, cta: "Get Started" },
              { name: "Starter", price: "$29", unit: "/repo/mo", desc: "Private repos, up to 10", features: ["Everything in Free", "Style consistency", "Best practice suggestions", "Performance analysis", "Email support"], featured: true, cta: "Start Free Trial" },
              { name: "Pro", price: "$59", unit: "/repo/mo", desc: "Team learning + custom rules", features: ["Everything in Starter", "Team pattern learning", "Custom rules engine", "Slack integration", "Priority support"], featured: false, cta: "Start Free Trial" },
              { name: "Enterprise", price: "$99", unit: "/repo/mo", desc: "Self-hosted + custom models", features: ["Everything in Pro", "Self-hosted option", "Custom model training", "SSO + audit logs", "Dedicated support"], featured: false, cta: "Contact Us" },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 transition hover:-translate-y-1 ${
                  plan.featured ? "border-dp-accent border-2 bg-dp-accent/5" : "border-white/10 hover:border-dp-accent/40 bg-white/[0.03]"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dp-accent text-xs font-semibold px-4 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-widest text-dp-accent">{plan.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  {plan.unit && <span className="text-sm text-dp-muted">{plan.unit}</span>}
                </div>
                <div className="mt-1 text-sm text-dp-muted">{plan.desc}</div>
                <ul className="mt-5 space-y-2 text-sm text-dp-muted">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-emerald-400">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`mt-6 block text-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    plan.featured ? "bg-dp-accent text-white hover:bg-indigo-500" : "border border-dp-accent text-dp-accent hover:bg-dp-accent/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            Details on how DevPilot handles code, privacy, and speed.
          </p>
          <div className="mt-12 grid md:grid-cols-2 gap-5 text-left">
            {[
              { q: "Does this replace human code review?", a: "No. DevPilot handles first-pass work — bug detection, readability, and consistency — while humans focus on architecture, design, and business context." },
              { q: "Is my code sent to a third party?", a: "Diffs are processed in-memory and only used for the current review. We use read-only GitHub access and don’t persist source code." },
              { q: "How fast are reviews?", a: "Most PRs receive their first review comments within 60–120 seconds of opening, depending on size." },
              { q: "What languages are supported?", a: "All languages GitHub can diff. The model understands 50+ languages, frameworks, and common tooling stacks." },
              { q: "Can I customize review rules?", a: "Yes. Starter includes standard rules. Pro lets you define custom patterns. Enterprise adds custom model tuning." },
              { q: "Is there a free tier?", a: "Yes. Public repos are free. Starter and Pro include a 14-day trial for private repos." },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="font-semibold text-dp-glow">{item.q}</h3>
                <p className="mt-2 text-sm text-dp-muted leading-relaxed">{item.a}</p>
              </div>
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
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dp-muted">
          <p>© 2026 DevPilot. Built for developers.</p>
          <div className="flex gap-6">
            <a href="https://github.com/IamVanshKhanna/devpilot" className="hover:text-white transition" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <a href="mailto:hello@devpilot.dev" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
