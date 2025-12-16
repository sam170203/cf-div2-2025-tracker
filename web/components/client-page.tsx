"use client"

import { useEffect, useState } from "react"
import ProblemTable from "@/components/problem-table"
import SheetSelector from "@/components/sheet-selector"
import CFHandleInput from "@/components/cf-handle-input"
import ProgressBar from "@/components/progress-bar"
import CFProfileCard from "@/components/cf-profile-card"
import { fetchSolvedSet, fetchUserInfo } from "@/lib/cf"

type Problem = {
  id: string
  index: "A" | "B" | "C"
  rating: number | null
  name: string
  contestName: string
  url: string
}

export default function ClientPage({ problems }: { problems: Problem[] }) {
  const [sheet, setSheet] = useState<"A" | "B" | "C">("A")
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set())
  const [user, setUser] = useState<any>(null)
  const [dark, setDark] = useState(true)

  async function loadSolved(handle: string) {
    const solved = await fetchSolvedSet(handle)
    setSolvedSet(solved)

    const info = await fetchUserInfo(handle)
    setUser(info)

    localStorage.setItem("cf-handle", handle)
  }

  useEffect(() => {
    const saved = localStorage.getItem("cf-handle")
    if (saved) loadSolved(saved)

    const theme = localStorage.getItem("theme")
    if (theme === "light") setDark(false)
  }, [])

  function toggleTheme() {
    setDark((prev) => {
      localStorage.setItem("theme", prev ? "light" : "dark")
      return !prev
    })
  }

  const filtered = problems
    .filter((p) => p.index === sheet)
    .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0))

  const solvedCount = filtered.filter((p) =>
    solvedSet.has(p.id)
  ).length

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: dark ? "#020617" : "#f8fafc",
        color: dark ? "#e5e7eb" : "#020617",
        transition: "0.2s",
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* HEADER */}
        <header style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700 }}>
                Codeforces Div2 2025 Sheet
              </h1>
              <p style={{ opacity: 0.7 }}>
                Track solved problems automatically
              </p>
            </div>

            <button
              onClick={toggleTheme}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: 18,
                background: dark ? "#1e293b" : "#e5e7eb",
                cursor: "pointer",
                border: "none",
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          <CFHandleInput onLoad={loadSolved} />
          <CFProfileCard user={user} />
          <SheetSelector sheet={sheet} setSheet={setSheet} />
        </header>

        {/* PROGRESS */}
        <ProgressBar
          total={filtered.length}
          solved={solvedCount}
          sheet={sheet}
        />

        {/* TABLE */}
        <div
          style={{
            background: dark ? "#020617" : "#ffffff",
            borderRadius: 10,
            border: dark ? "1px solid #1e293b" : "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <ProblemTable problems={filtered} solvedSet={solvedSet} />
        </div>
      </div>
    </div>
  )
}
