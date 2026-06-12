'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/repos/", {
        headers: {
          Authorization: `Bearer ${(session as any).accessToken}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          setRepos(data.repos || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else if (status === "unauthenticated") {
      setLoading(false)
    }
  }, [status])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-white mb-4">DevPilot Dashboard</h1>
        <p className="text-slate-400 mb-8">Sign in with GitHub to manage your repositories.</p>
        <button
          onClick={() => signIn("github")}
          className="bg-white text-black font-medium px-6 py-2.5 rounded hover:bg-slate-200 transition"
        >
          Sign in with GitHub
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-400">{session?.user?.name}</span>
          {session?.user?.image && (
            <img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full" />
          )}
          <button
            onClick={() => signOut()}
            className="text-sm bg-slate-800 text-slate-300 px-3 py-1.5 rounded hover:bg-slate-700"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {repos.length === 0 ? (
          <div className="bg-slate-900/50 rounded-lg p-6 border border-white/10">
            <p className="text-slate-400">No repositories installed yet.</p>
            <p className="text-sm text-slate-500 mt-1">Install the DevPilot GitHub App to get started.</p>
          </div>
        ) : (
          repos.map((repo) => (
            <div key={repo.id} className="bg-slate-900/50 rounded-lg p-4 border border-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-medium text-white">{repo.fullName}</h3>
                <p className="text-xs text-slate-500">Plan: {repo.plan} | Status: {repo.active ? "Active" : "Inactive"}</p>
              </div>
              <a
                href={`https://github.com/${repo.fullName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                View Repo
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  )
}