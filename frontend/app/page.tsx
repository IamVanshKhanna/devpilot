import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "DevPilot — AI Code Review Prototype",
  description:
    "DevPilot is a pre-launch AI code review prototype. Explore the source and planned features on GitHub.",
}

const StepIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-dp-accent/10 text-dp-accent">
    {children}
  </div>
)

const IconInstall = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
)

const IconPR = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const IconReview = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
            <a
              href="https://github.com/IamVanshKhanna/devpilot"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dp-accent/10 via-dp-bg to-dp-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/15 blur-[140px] rounded-full" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-dp-muted mb-6">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />
            Pre-launch prototype — not available to install yet
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight">
            A prototype for AI code review<br />
            <span className="bg-gradient-to-r from-dp-accent to-dp-glow bg-clip-text text-transparent">
              with team feedback in mind
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-dp-muted">
            An early code review project exploring GitHub PR webhooks and AI-generated feedback.
            Several core flows are still incomplete; see the source for what works today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://github.com/IamVanshKhanna/devpilot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-dp-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/25"
            >
              View source on GitHub
            </a>
            <Link
              href="#sample"
              className="inline-flex items-center justify-center gap-2 border border-dp-accent/70 text-dp-accent px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dp-accent/10 transition"
            >
              See a sample review →
            </Link>
          </div>
          <p className="mt-4 text-xs text-dp-muted">
            Prototype only • No public install or paid plans
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
                <div className="text-emerald-400/90">+ async def authenticate(request: Request) &gt; AuthResult:</div>
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
              <span className="text-xs font-medium text-dp-muted px-3 py-1.5 rounded border border-white/10">Dismiss</span>
              <span className="text-xs font-medium text-white px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30">Accept</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-white/[0.01]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">How It Works</h2>
          <p className="mt-3 text-dp-muted max-w-md mx-auto">
            The intended flow. Installation and automated review are not ready for public use.
          </p>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: IconInstall, title: "Connect GitHub (planned)", desc: "Planned: connect a GitHub App to a repository. Public installation is not available." },
              { icon: IconPR, title: "Open a Pull Request", desc: "The backend has a PR webhook handler and diff-fetching code; integration is unfinished." },
              { icon: IconReview, title: "AI reviews (planned)", desc: "Planned: post AI review comments. The worker and feedback-learning flow are incomplete." },
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
            Illustrative mockup only, not an actual review generated by DevPilot.
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
                  <div className="pl-6 text-emerald-400/90">+ async def authenticate(request: Request) &gt; AuthResult:</div>
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
                Feedback-learning controls are a mockup
              </div>
              <div className="flex gap-2">
                <span className="text-xs font-medium text-dp-muted px-3 py-1.5 rounded border border-white/10">Dismiss</span>
                <span className="text-xs font-medium text-white px-3 py-1.5 rounded bg-emerald-500/20 border border-emerald-500/30">Accept</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-t from-dp-accent/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold">Explore the DevPilot prototype</h2>
          <p className="mt-3 text-dp-muted max-w-xl mx-auto">
            See the code, current limitations, and planned features in the README. Not ready for installation.
          </p>
          <div className="mt-8">
            <a
              href="https://github.com/IamVanshKhanna/devpilot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-dp-accent text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/25"
            >
              View source on GitHub →
            </a>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
