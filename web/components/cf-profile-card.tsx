"use client"

export default function CFProfileCard({ user, dark }: { user: any; dark: boolean }) {
  if (!user) return null

  const rating = user.rating || 0

  // Determine rank color like Codeforces
  function getRankColor(rt: number) {
    if (rt < 1200) return "#9CA3AF" // gray
    if (rt < 1400) return "#22c55e" // green
    if (rt < 1600) return "#0ea5e9" // cyan
    if (rt < 1900) return "#3b82f6" // blue
    if (rt < 2100) return "#a855f7" // purple
    if (rt < 2400) return "#f59e0b" // orange
    return "#ef4444" // red / big boss 😂
  }

  const rc = getRankColor(rating)
  const percent = Math.min((rating / 2400) * 100, 100)

  return (
    <div
      className="card-hover"
      style={{
        padding: "14px 20px",
        borderRadius: 18,
        display: "flex",
        alignItems: "center",
        gap: 16,
        cursor: "default",
        background: dark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.06)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"}`,
        backdropFilter: "blur(14px)",
        transform: "translateY(0)",
        transition: "all .25s ease",
        boxShadow: `0 0 18px ${rc}50`,
      }}
    >
      <img
        src={user.titlePhoto || user.avatar}
        alt="pfp"
        width={50}
        height={50}
        style={{
          borderRadius: "50%",
          border: `2px solid ${rc}`,
        }}
      />

      <div style={{ lineHeight: 1.2 }}>
        <p style={{ fontWeight: 800, fontSize: 18, color: rc }}>
          {user.handle}
        </p>
        <p style={{ fontSize: 14, opacity: 0.75 }}>
          {user.rank || "Loading…"} • {rating}
        </p>

        {/* Rating Power Bar */}
        <div
          style={{
            width: 120,
            height: 6,
            background: dark ? "#1e293b" : "#cbd5e1",
            borderRadius: 6,
            marginTop: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              background: rc,
              transition: "width .35s ease",
              boxShadow: `0 0 10px ${rc}`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
