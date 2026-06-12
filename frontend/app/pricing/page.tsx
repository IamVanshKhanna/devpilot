'use client'

import Link from "next/link"
import { useState } from "react"

const plans = [
  {
    name: "Open Source",
    price: "Free",
    period: "",
    desc: "For public repositories",
    features: ["Unlimited PRs", "Basic AI review", "Bug detection", "Security vulnerability checks", "Community support"],
    cta: "Get Started",
    href: "#",
    featured: false,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/repo/month",
    desc: "For small private teams",
    features: ["Everything in Free", "Up to 10 private repos", "Style consistency", "Best practice suggestions", "Performance analysis", "Email support", "14-day free trial"],
    cta: "Start Free Trial",
    href: "#",
    featured: true,
  },
  {
    name: "Pro",
    price: "$59",
    period: "/repo/month",
    desc: "For growing engineering teams",
    features: ["Everything in Starter", "Team pattern learning", "Custom rules engine", "Architecture review", "Test coverage analysis", "Slack integration", "Priority support"],
    cta: "Start Free Trial",
    href: "#",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/repo/month",
    desc: "For organizations needing control",
    features: ["Everything in Pro", "Self-hosted deployment", "Custom model training", "SSO + SAML", "Audit logs", "Dedicated support", "Custom SLAs"],
    cta: "Contact Sales",
    href: "mailto:enterprise@devpilot.dev",
    featured: false,
  },
]

const faqs = [
  {
    q: "Does DevPilot replace human code review?",
    a: "No. DevPilot handles the first pass — catching bugs, style issues, and anti-patterns. Humans still review for architecture, design, and business logic. Think of it as an automated first reviewer that makes the human review faster and more focused.",
  },
  {
    q: "Is my source code safe?",
    a: "Absolutely. Diffs are processed entirely in-memory and never written to disk. We use read-only GitHub OAuth tokens with the minimum permissions needed. No source code leaves the processing pipeline. After review, all diff data is discarded.",
  },
  {
    q: "What languages does DevPilot support?",
    a: "DevPilot supports all languages that GitHub recognizes — over 50 programming languages including Python, JavaScript, TypeScript, Go, Rust, Java, C++, Ruby, PHP, Swift, Kotlin, and many more. The AI model has been trained on a broad corpus of code.",
  },
  {
    q: "Can I customize the review rules?",
    a: "Yes. Starter includes standard rules for bugs, security, and style. Pro lets you define custom patterns using YAML configuration. Enterprise includes custom model training on your proprietary codebase for maximum relevance.",
  },
  {
    q: "How fast are reviews?",
    a: "Most PRs receive their first review comments within 60-120 seconds of opening. Complex PRs or very large diffs may take up to 3 minutes. We're constantly optimizing the AI pipeline for speed.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes! Starter and Pro plans include a 14-day free trial with no credit card required for the first 7 days. Open source repositories are always free — no limits, no catches.",
  },
  {
    q: "How does team learning work?",
    a: "When your team accepts or dismisses DevPilot's suggestions, the system learns. Accepted patterns are reinforced. Rejected ones are deprioritized. Over time, DevPilot's reviews align more closely with your team's actual conventions.",
  },
  {
    q: "What permissions does the GitHub App need?",
    a: "Read-only access to pull requests and repository metadata. Write access to post review comments. That's it. DevPilot cannot read your source code outside of pull requests or modify any repository settings.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0E27]/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold">
            Dev<span className="text-[#22D3EE]">Pilot</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center text-sm text-[#94A3B8]">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/pricing" className="text-white font-semibold">Pricing</Link>
            <Link href="/#how" className="hover:text-white">How It Works</Link>
            <a href="https://github.com/IamVanshKhanna/devpilot" target="_blank" className="hover:text-white">GitHub</a>
          </nav>
        </div>
      </header>

      {/* Pricing Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold">Simple, Transparent Pricing</h1>
        <p className="text-lg text-[#94A3B8] mt-4 max-w-xl mx-auto">
          Free for open source. Affordable for teams. Start reviewing code in 2 minutes.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white/[0.03] border rounded-2xl p-6 flex flex-col transition hover:-translate-y-1 ${
                plan.featured ? "border-[#6366F1] border-2 shadow-lg shadow-[#6366F1]/10" : "border-white/10 hover:border-white/20"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6366F1] text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="text-xs font-semibold uppercase tracking-wider text-[#6366F1] mb-2">{plan.name}</div>
              <div className="text-4xl font-extrabold mt-2">
                {plan.price}
                {plan.period && <span className="text-base font-normal text-[#94A3B8]">{plan.period}</span>}
              </div>
              <p className="text-sm text-[#94A3B8] mt-1 mb-5">{plan.desc}</p>
              <ul className="text-sm text-[#94A3B8] space-y-2.5 mb-6 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full py-2.5 rounded-lg font-semibold text-sm text-center transition ${
                  plan.featured
                    ? "bg-[#6366F1] text-white hover:bg-indigo-500"
                    : "border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/10"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-extrabold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-6">
                <h3 className="font-semibold text-[#22D3EE] mb-2">{item.q}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-white/5">
        <h2 className="text-3xl font-extrabold">Ready to Ship Better Code?</h2>
        <p className="text-[#94A3B8] mt-3 mb-6">Install DevPilot in 2 clicks. First review in under 2 minutes.</p>
        <Link href="#" className="inline-block bg-[#6366F1] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500 transition">
          Install Free on GitHub →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#64748B]">
          <p>&copy; 2026 DevPilot. Built for developers.</p>
          <div className="flex gap-6">
            <a href="https://github.com/IamVanshKhanna/devpilot" className="hover:text-white transition">GitHub</a>
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <a href="mailto:hello@devpilot.dev" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}