type Sheet = "A" | "B" | "C"

export default function SheetSelector({
  sheet,
  setSheet,
}: {
  sheet: Sheet
  setSheet: (s: Sheet) => void
}) {
  const styles: Record<Sheet, { border: string; bg: string; text: string }> = {
    A: {
      border: "#22c55e", // green
      bg: "rgba(34, 197, 94, 0.15)",
      text: "#22c55e",
    },
    B: {
      border: "#22d3ee", // cyan
      bg: "rgba(34, 211, 238, 0.15)",
      text: "#22d3ee",
    },
    C: {
      border: "#3b82f6", // blue
      bg: "rgba(59, 130, 246, 0.15)",
      text: "#3b82f6",
    },
  }

  return (
    <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {(["A", "B", "C"] as Sheet[]).map((s) => {
        const active = sheet === s

        return (
          <button
            key={s}
            onClick={() => setSheet(s)}
            style={{
              padding: "20px",
              borderRadius: "10px",
              border: `2px solid ${active ? styles[s].border : "#27272a"}`,
              backgroundColor: active ? styles[s].bg : "#09090b",
              color: active ? styles[s].text : "#e5e7eb",
              fontSize: "18px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Div 2 {s}
          </button>
        )
      })}
    </div>
  )
}
