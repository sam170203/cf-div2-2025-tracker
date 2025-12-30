"use client";
import Logo from "@/components/Logo";

import { useEffect, useState } from "react";
import ProblemTable from "@/components/problem-table";
import SheetSelector from "@/components/sheet-selector";
import CFHandleInput from "@/components/cf-handle-input";
import ProgressBar from "@/components/progress-bar";
import CFProfileCard from "@/components/cf-profile-card";
import { fetchSolvedSet, fetchUserInfo } from "@/lib/cf";

type Problem = {
  id: string;
  index: "A" | "B" | "C" | "D";
  rating: number | null;
  name: string;
  contestName: string;
  url: string;
};

export default function ClientPage({
  problems,
  division,
}: {
  problems: Problem[];
  division: "div2" | "div3";
}) {
  const [sheet, setSheet] = useState<"A" | "B" | "C" | "D">("A");
  const [solvedSet, setSolvedSet] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<any>(null);
  const [dark, setDark] = useState(true);

  async function loadSolved(handle: string) {
    try {
      const solved = await fetchSolvedSet(handle);
      setSolvedSet(solved);

      const info = await fetchUserInfo(handle);
      if (!info || !info.handle) throw new Error();

      setUser(info);
      localStorage.setItem("cf-handle", handle);
    } catch {
      alert("❌ No such Codeforces user exists!");
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("cf-handle");
    if (saved) loadSolved(saved);

    const theme = localStorage.getItem("theme");
    if (theme === "light") setDark(false);
  }, []);

  const filtered = problems
    .filter((p) => p.index === sheet)
    .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));

  const solvedCount = filtered.filter((p) => solvedSet.has(p.id)).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark ? "#0e1116" : "#e2e8f0",
        color: dark ? "#e5e7eb" : "#1e293b",
        transition: "0.25s ease",
      }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">

        {/* HEADER */}
        <header style={{ marginBottom: 36, textAlign: "center" }}>

          {/* ⭐ Added Sleek Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Logo size={60} />
          </div>

          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: dark ? "#fff" : "#0f172a",
              marginBottom: 10,
              fontFamily: "monospace",
            }}
          >
            CF CodeClimb ’26
          </h1>

          <p style={{ opacity: 0.88, fontSize: 18, fontWeight: 500 }}>
            The hard part is showing up everyday… and here you are again ;)
          </p>

          {/* Handle + Theme */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 25 }}>
            <CFHandleInput onLoad={loadSolved} dark={dark} />

            <button
              onClick={() => {
                setDark((prev) => {
                  const theme = !prev ? "dark" : "light";
                  localStorage.setItem("theme", theme);
                  return !prev;
                });
              }}
              style={{
                padding: "10px 14px",
                fontSize: 18,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.25)",
                background: dark ? "#1a1d23" : "#334155",
                cursor: "pointer",
              }}
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Profile */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
            <CFProfileCard user={user} dark={dark} />
          </div>

          {/* ⭐ Added Division Label */}
          <h3 style={{ marginTop: 28, fontSize: 22, fontWeight: 700, opacity: 0.9 }}>
            {division.toUpperCase()} Sheets
          </h3>

          {/* Sheets */}
          <div style={{ marginTop: 18 }}>
            <SheetSelector sheet={sheet} setSheet={setSheet} division={division} dark={dark} />
          </div>
        </header>

        <ProgressBar total={filtered.length} solved={solvedCount} sheet={sheet} dark={dark} />

        {/* TABLE */}
        <div
          style={{
            background: dark ? "#13161c" : "#1e293b",
            borderRadius: 14,
            border: dark ? "1px solid #2d323b" : "1px solid #0f172a",
            overflow: "hidden",
            marginTop: 25,
          }}
        >
          <ProblemTable problems={filtered} solvedSet={solvedSet} dark={dark} />
        </div>
      </div>
    </div>
  );
}
