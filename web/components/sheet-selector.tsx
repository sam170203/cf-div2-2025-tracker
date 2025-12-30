"use client";

type Sheet = "A" | "B" | "C" | "D";

export default function SheetSelector({
  sheet,
  setSheet,
  division,
  dark,
}: {
  sheet: "A" | "B" | "C" | "D";
  setSheet: (s: "A" | "B" | "C" | "D") => void;
  division: "div2" | "div3";
  dark: boolean;
}) {
  const options: Sheet[] = ["A", "B", "C", "D"];

  const colors: Record<Sheet, string> = {
    A: "#22c55e",
    B: "#3b82f6",
    C: "#a855f7",
    D: "#f97316",
  };

  return (
    <div
      style={{
        marginTop: 30,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 18,
      }}
    >
      {options.map((s) => {
        const active = sheet === s;
        const color = colors[s];

        return (
          <button
            key={s}
            onClick={() => setSheet(s)}
            style={{
              padding: "18px",
              borderRadius: "14px",
              fontSize: "18px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "0.25s ease",
              transform: active ? "translateY(-3px)" : "translateY(0)",

              /** 🌙 DARK MODE — looks same as before */
              ...(dark && {
                border: active
                  ? `2px solid ${color}`
                  : "2px solid rgba(255,255,255,0.15)",
                background: active
                  ? `${color}15`
                  : "rgba(255,255,255,0.08)",
                color: active ? "#ffffff" : "#d1d5db",
                boxShadow: active
                  ? `0 0 12px ${color}55`
                  : "none",
              }),

              /** ☀️ LIGHT MODE — darker buttons for visibility */
              ...(!dark && {
                border: active ? `2px solid ${color}` : "2px solid #1e293b",
                background: active ? `${color}20` : "#1e293b",
                color: active ? "#ffffff" : "#e2e8f0",
                boxShadow: active
                  ? `0 0 10px ${color}66`
                  : "0 2px 6px rgba(0,0,0,0.15)",
              }),
            }}
          >
            {division.toUpperCase()} {s}
          </button>
        );
      })}
    </div>
  );
}
