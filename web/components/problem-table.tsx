type Problem = {
    id: string
    name: string
    rating: number | null
    contestName: string
    url: string
  }
  
  function ratingColor(rating: number | null) {
    if (!rating) return "#a1a1aa" // gray
    if (rating < 1200) return "#a1a1aa"
    if (rating < 1400) return "#22c55e" // green
    if (rating < 1600) return "#22d3ee" // cyan
    if (rating < 1900) return "#3b82f6" // blue
    if (rating < 2100) return "#a855f7" // violet
    return "#f97316" // orange
  }
  
  export default function ProblemTable({
    problems,
    solvedSet,
  }: {
    problems: Problem[]
    solvedSet: Set<string>
  }) {
    return (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#18181b" }}>
            <th style={th}>Problem</th>
            <th style={th}>Contest</th>
            <th style={th}>Rating</th>
          </tr>
        </thead>
  
        <tbody>
          {problems.map((p) => {
            const solved = solvedSet.has(p.id)
  
            return (
              <tr
                key={p.id}
                style={{
                  backgroundColor: solved ? "#064e3b" : "#09090b",
                  borderBottom: "1px solid #27272a",
                }}
              >
                <td style={td}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: solved ? "#4ade80" : "#e5e7eb",
                      fontWeight: 500,
                    }}
                  >
                    {p.name}
                  </a>
                </td>
  
                <td style={td}>{p.contestName}</td>
  
                <td
                  style={{
                    ...td,
                    color: ratingColor(p.rating),
                    fontWeight: 600,
                  }}
                >
                  {p.rating ?? "-"}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  
  /* ---------- styles ---------- */
  
  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "12px 14px",
    fontSize: 14,
    color: "#a1a1aa",
    fontWeight: 600,
  }
  
  const td: React.CSSProperties = {
    padding: "12px 14px",
    fontSize: 14,
    color: "#e5e7eb",
  }
  