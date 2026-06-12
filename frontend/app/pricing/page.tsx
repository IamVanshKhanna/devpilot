'use client'

import { useState } from "react"

const plans = [
  {
    name: "Open Source",
    price: "Free",
    unit: "",
    desc: "Public repositories",
    features: ["Unlimited PRs", "Basic AI review", "Bug detection", "Security checks"],
    featured: false,
    cta: "Get Started",
    planKey: "free",
  },
  {
    name: "Starter",
    price: "$29",
    unit: "/repo/mo",
    desc: "Private repos, up to 10",
    features: [
      "Everything in Free",
      "Style consistency",
      "Best practice suggestions",
      "Performance analysis",
      "Email support",
    ],
    featured: true,
    cta: "Start Free Trial",
    planKey: "pro",
  },
  {
    name: "Pro",
    price: "$59",
    unit: "/repo/mo",
    desc: "Team learning + custom rules",
    features: [
      "Everything in Starter",
      "Team pattern learning",
      "Custom rules engine",
      "Slack integration",
      "Priority support",
    ],
    featured: false,
    cta: "Start Free Trial",
    planKey: "team",
  },
  {
    name: "Enterprise",
    price: "$99",
    unit: "/repo/mo",
    desc: "Self-hosted + custom models",
    features: [
      "Everything in Pro",
      "Self-hosted option",
      "Custom model training",
      "SSO + audit logs",
      "Dedicated support",
    ],
    featured: false,
    cta: "Contact Us",
    planKey: "enterprise",
  },
]

type PlanKey = (typeof plans)[number]["planKey"]

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async (planKey: PlanKey) => {
    if (planKey === "free") {
      window.location.href = "https://github.com/apps/devpilot"
      return
    }

    setSelectedPlan(planKey)
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:8000/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, repo_count: 1 }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Checkout failed")
      }

      // Checkout succeeds in production when Stripe is configured.
      // Until then, show a summary.
      alert(
        `Checkout ready for ${data.plan_name}: $${data.monthly_total}/mo\n\nConnect Stripe to enable live payments.`
      )
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-extrabold">Simple Pricing</h1>
        <p className="text-dp-muted mt-3 max-w-md mx-auto">Free for open source. Affordable for teams.</p>

        {error && <div className="mt-6 text-sm text-red-400">{error}</div>}

        <div className="grid md:grid-cols-4 gap-5 mt-12 text-left">
          {plans.map((plan) => (
            <div
              key={plan.planKey}
              className={`relative bg-white/[0.03] border rounded-2xl p-8 text-center transition hover:-translate-y-1 ${
                plan.featured ? "border-dp-accent border-2" : "border-white/10 hover:border-dp-accent/30"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dp-accent text-xs font-semibold px-4 py-1 rounded-full">
                  Popular
                </span>
              )}
              <div className="text-xs font-semibold uppercase tracking-wider text-dp-accent">{plan.name}</div>
              <div className="text-4xl font-extrabold mt-3">
                {plan.price}
                {plan.unit && <span className="text-base font-normal text-dp-muted">{plan.unit}</span>}
              </div>
              <div className="text-sm text-dp-muted mt-1 mb-4">{plan.desc}</div>
              <ul className="text-left text-sm text-dp-muted space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className="before:content-['✓_'] before:text-green-400">{f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.planKey)}
                disabled={loading}
                className={`block w-full py-2.5 rounded-lg font-semibold text-sm transition ${
                  plan.featured
                    ? "bg-dp-accent text-white hover:bg-indigo-500"
                    : "border border-dp-accent text-dp-accent hover:bg-dp-accent/10"
                } ${loading && selectedPlan === plan.planKey ? "opacity-60" : ""}`}
              >
                {loading && selectedPlan === plan.planKey ? "Processing..." : plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
