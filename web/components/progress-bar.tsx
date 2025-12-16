"use client"

export default function ProgressBar({
  total,
  solved,
  sheet,
}: {
  total: number
  solved: number
  sheet: "A" | "B" | "C"
}) {
  const percent = total === 0 ? 0 : Math.round((solved / total) * 100)

  const color =
    sheet === "A"
      ? "#22c55e"
      : sheet === "B"
      ? "#06b6d4"
      : "#3b82f6"

  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{ marginBottom: 6, fontSize: 14, opacity: 0.8 }}>
        Solved {solved} / {total} ({percent}%)
      </div>

      <div
        style={{
          height: 10,
          borderRadius: 6,
          background: "#1e293b",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: color,
            transition: "0.3s",
          }}
        />
      </div>
    </div>
  )
}
