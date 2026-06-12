import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "DevPilot — AI Code Review That Learns Your Team",
  description: "DevPilot installs in 2 clicks. Reviews every PR. Learns your team's patterns. Ship better code, faster.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dp-bg text-dp-text">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-dp-bg/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold tracking-tight">
            Dev<span className="text-dp-glow">Pilot</span>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm text-dp-muted">
            <Link href="#how" className="hover:text-white transition">How It Works</Link>
            <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition">FAQ</Link>
            <a href="https://github.com/IamVanshKhanna/devpilot" target="_blank" className="hover:text-white transition">GitHub</a>
            <Link href="#" className="bg-dp-accent text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-500 transition">
              Install Free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          AI Code Review That<br />
          <span className="bg-gradient-to-r from-dp-accent to-dp-glow bg-clip-text text-transparent">
            Learns Your Team
          </span>
        </h1>
        <p className="text-xl text-dp-muted mt-6 max-w-xl mx-auto">
          DevPilot installs in 2 clicks. Reviews every PR. Learns your team&apos;s patterns. Ship better code, faster.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="#" className="bg-dp-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500 transition">
            Install Free on GitHub →
          </Link>
          <Link href="#how" className="border border-dp-accent text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-accent/10 transition">
            See How It Works
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-16">
        <div className="mx-auto max-w-4xl grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-extrabold text-dp-accent">&lt; 2min</div>
            <div className="text-sm text-dp-muted mt-1">First Review</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-dp-accent">50+</div>
            <div className="text-sm text-dp-muted mt-1">Languages Supported</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-dp-accent">0 Config</div>
            <div className="text-sm text-dp-muted mt-1">Setup Required</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold">How It Works</h2>
          <p className="text-dp-muted mt-3 max-w-md mx-auto">Three steps to automated, intelligent code review.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { num: 1, title: "Install on GitHub", desc: "Connect DevPilot to your repos in 2 clicks. No configuration needed." },
              { num: 2, title: "Open a Pull Request", desc: "DevPilot automatically analyzes every new PR and code change." },
              { num: 3, title: "Get Smart Reviews", desc: "See inline comments that catch bugs, enforce conventions, and suggest improvements." },
            ].map((step) => (
              <div key={step.num} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center hover:border-dp-accent/30 transition">
                <div className="w-12 h-12 bg-dp-accent rounded-full inline-flex items-center justify-center text-lg font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-dp-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold">Simple Pricing</h2>
          <p className="text-dp-muted mt-3 max-w-md mx-auto">Free for open source. Affordable for teams.</p>
          <div className="grid md:grid-cols-4 gap-5 mt-12">
            {[
              { name: "Open Source", price: "Free", desc: "Public repositories", features: ["Unlimited PRs", "Basic AI review", "Bug detection", "Security checks"], featured: false, cta: "Get Started" },
              { name: "Starter", price: "$29", unit: "/repo/mo", desc: "Private repos, up to 10", features: ["Everything in Free", "Style consistency", "Best practice suggestions", "Performance analysis", "Email support"], featured: true, cta: "Start Free Trial" },
              { name: "Pro", price: "$59", unit: "/repo/mo", desc: "Team learning + custom rules", features: ["Everything in Starter", "Team pattern learning", "Custom rules engine", "Slack integration", "Priority support"], featured: false, cta: "Start Free Trial" },
              { name: "Enterprise", price: "$99", unit: "/repo/mo", desc: "Self-hosted + custom models", features: ["Everything in Pro", "Self-hosted option", "Custom model training", "SSO + audit logs", "Dedicated support"], featured: false, cta: "Contact Us" },
            ].map((plan, i) => (
              <div key={i} className={`relative bg-white/[0.03] border rounded-2xl p-8 text-center transition hover:-translate-y-1 ${plan.featured ? "border-dp-accent border-2" : "border-white/10 hover:border-dp-accent/30"}`}>
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dp-accent text-xs font-semibold px-4 py-1 rounded-full">Popular</span>
                )}
                <div className="text-xs font-semibold uppercase tracking-wider text-dp-accent">{plan.name}</div>
                <div className="text-4xl font-extrabold mt-3">{plan.price}{plan.unit && <span className="text-base font-normal text-dp-muted">{plan.unit}</span>}</div>
                <div className="text-sm text-dp-muted mt-1 mb-4">{plan.desc}</div>
                <ul className="text-left text-sm text-dp-muted space-y-2 mb-6">
                  {plan.features.map((f, j) => <li key={j} className="before:content-['✓_'] before:text-green-400">{f}</li>)}
                </ul>
                <Link href="#" className={`block w-full py-2.5 rounded-lg font-semibold text-sm transition ${plan.featured ? "bg-dp-accent text-white hover:bg-indigo-500" : "border border-dp-accent text-dp-accent hover:bg-dp-accent/10"}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
          <p className="text-dp-muted mt-3 max-w-md mx-auto">Everything you need to know about DevPilot.</p>
          <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
            {[
              { q: "Does DevPilot replace human code review?", a: "No. DevPilot handles the first pass — catching bugs, style issues, and anti-patterns. Humans still review for architecture, design, and business logic." },
              { q: "Is my source code safe?", a: "Yes. Diffs are processed in-memory and never stored. We use read-only GitHub OAuth with minimal permissions." },
              { q: "What languages does it support?", a: "All languages that GitHub supports. The AI model understands 50+ programming languages." },
              { q: "Can I customize the review rules?", a: "Yes. Starter includes standard rules. Pro lets you define custom patterns. Enterprise includes custom model training." },
              { q: "How fast are the reviews?", a: "Most PRs receive their first review comments within 60-120 seconds of opening." },
              { q: "Is there a free trial?", a: "Yes. Starter and Pro plans include a 14-day free trial. Open source repos are always free." },
            ].map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
                <h3 className="font-semibold text-dp-glow mb-2">{item.q}</h3>
                <p className="text-sm text-dp-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dp-muted">
          <p>&copy; 2026 DevPilot. Built with ♥ for developers.</p>
          <div className="flex gap-6">
            <a href="https://github.com/IamVanshKhanna/devpilot" className="hover:text-white transition">GitHub</a>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
            <a href="mailto:hello@devpilot.dev" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}