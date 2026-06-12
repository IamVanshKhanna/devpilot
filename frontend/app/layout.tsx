import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DevPilot — AI Code Review That Learns Your Team",
  description: "DevPilot installs in 2 clicks. Reviews every PR. Learns your team's patterns.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}