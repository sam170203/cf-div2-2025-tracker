"use client"

type Props = {
  user: {
    handle: string
    rating?: number
    rank?: string
    avatar?: string
  } | null
}

export default function CFProfileCard({ user }: Props) {
  if (!user) return null

  return (
    <div
      style={{
        marginTop: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#0f172a",
        border: "1px solid #1e293b",
      }}
    >
      <img
        src={user.avatar || "https://codeforces.com/favicon.ico"}
        alt="avatar"
        width={48}
        height={48}
        style={{ borderRadius: "50%" }}
      />

      <div>
        <div style={{ fontWeight: 600 }}>{user.handle}</div>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          {user.rank ?? "unrated"}{" "}
          {user.rating ? `• ${user.rating}` : ""}
        </div>
      </div>
    </div>
  )
}
