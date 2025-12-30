"use client"

export default function ProgressBar({
  total,
  solved,
  sheet,
  dark,
}: {
  total: number
  solved: number
  sheet: "A" | "B" | "C" | "D"
  dark: boolean
}) {
  const percent = total === 0 ? 0 : Math.round((solved / total) * 100)

  const barColor =
    sheet === "A"
      ? "#16a34a" // green
      : sheet === "B"
      ? "#0ea5e9" // cyan
      : sheet === "C"
      ? "#3b82f6" // blue
      : "#a855f7" // purple

  return (
    <div style={{ margin: "28px 0" }}>
      
      {/* Apple Style Label */}
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: dark ? "#cbd5e1" : "#334155",
          marginBottom: 10,
          letterSpacing: "-0.25px",
        }}
      >
        Sheet {sheet} — {percent}% complete 🚀
      </div>

      {/* Glass Bar */}
      <div
        style={{
          height: 14,
          background: dark ? "rgba(255,255,255,0.05)" : "#e2e8f0",
          borderRadius: 20,
          overflow: "hidden",
          border: dark
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: `${barColor}`,
            transition: "width .35s ease",
            boxShadow: `0 0 14px ${barColor}90`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 8,
          fontSize: 14,
          opacity: 0.75,
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {solved} solved / {total} — Keep climbing 💪
      </div>

    </div>
  )
}
