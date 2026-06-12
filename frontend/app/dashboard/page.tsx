'use client'

import Link from "next/link"
import { useState } from "react"

interface Repo {
  name: string
  fullName: string
  prsReviewed: number
  issuesFound: number
  acceptanceRate: number
  plan: string
}

const mockRepos: Repo[] = [
  { name: "api-server", fullName: "acme/api-server", prsReviewed: 142, issuesFound: 37, acceptanceRate: 82, plan: "Pro" },
  { name: "web-app", fullName: "acme/web-app", prsReviewed: 98, issuesFound: 24, acceptanceRate: 76, plan: "Pro" },
  { name: "auth-service", fullName: "acme/auth-service", prsReviewed: 56, issuesFound: 12, acceptanceRate: 91, plan: "Starter" },
  { name: "shared-libs", fullName: "acme/shared-libs", prsReviewed: 203, issuesFound: 45, acceptanceRate: 79, plan: "Pro" },
]

export default function DashboardPage() {
  const [repos] = useState<Repo[]>(mockRepos)

  const totalPRs = repos.reduce((s, r) => s + r.prsReviewed, 0)
  const totalIssues = repos.reduce((s, r) => s + r.issuesFound, 0)
  const avgAcceptance = Math.round(repos.reduce((s, r) => s + r.acceptanceRate, 0) / repos.length)

  return (
    <div className="min-h-screen bg-[#0A0E27] text-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0E27]/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold">
            Dev<span className="text-[#22D3EE]">Pilot</span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center text-sm text-[#94A3B8]">
            <Link href="/dashboard" className="text-white font-semibold">Dashboard</Link>
            <Link href="/pricing" className="hover:text-white">Pricing</Link>
            <Link href="#" className="hover:text-white">Settings</Link>
            <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-sm font-semibold">V</div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {[
            { label: "Repositories", value: repos.length },
            { label: "PRs Reviewed", value: totalPRs },
            { label: "Issues Found", value: totalIssues },
            { label: "Acceptance Rate", value: `${avgAcceptance}%` },
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 text-center">
              <div className="text-3xl font-extrabold text-[#6366F1]">{stat.value}</div>
              <div className="text-xs text-[#94A3B8] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Connected Repositories</h2>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-[#94A3B8]">
                  <th className="text-left py-3 px-4 font-medium">Repository</th>
                  <th className="text-center py-3 px-4 font-medium">PRs Reviewed</th>
                  <th className="text-center py-3 px-4 font-medium">Issues Found</th>
                  <th className="text-center py-3 px-4 font-medium">Acceptance</th>
                  <th className="text-center py-3 px-4 font-medium">Plan</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((repo) => (
                  <tr key={repo.name} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition">
                    <td className="py-3 px-4">
                      <div className="font-medium">{repo.name}</div>
                      <div className="text-xs text-[#64748B]">{repo.fullName}</div>
                    </td>
                    <td className="py-3 px-4 text-center">{repo.prsReviewed}</td>
                    <td className="py-3 px-4 text-center">{repo.issuesFound}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        repo.acceptanceRate >= 85 ? "bg-green-400/10 text-green-400" :
                        repo.acceptanceRate >= 70 ? "bg-yellow-400/10 text-yellow-400" :
                        "bg-red-400/10 text-red-400"
                      }`}>
                        {repo.acceptanceRate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#6366F1]/10 text-[#6366F1]">
                        {repo.plan}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-5">
          <button className="bg-[#6366F1] text-white rounded-xl p-6 text-left hover:bg-indigo-500 transition">
            <div className="text-lg font-semibold mb-1">Add Repository</div>
            <div className="text-sm text-white/70">Install DevPilot on more repos</div>
          </button>
          <button className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-left hover:border-white/20 transition">
            <div className="text-lg font-semibold mb-1">View Review Rules</div>
            <div className="text-sm text-[#94A3B8]">Customize your team's standards</div>
          </button>
          <button className="bg-white/[0.03] border border-white/10 rounded-xl p-6 text-left hover:border-white/20 transition">
            <div className="text-lg font-semibold mb-1">Team Analytics</div>
            <div className="text-sm text-[#94A3B8]">Insights & improvement trends</div>
          </button>
        </div>
      </main>
    </div>
  )
}