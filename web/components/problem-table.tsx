"type strict";
import React from "react";

type Problem = {
  id: string;
  name: string;
  rating: number | null;
  contestName: string;
  url: string;
};

function ratingColor(rating: number | null) {
  if (!rating) return "#9ca3af";
  if (rating < 1200) return "#9ca3af";
  if (rating < 1400) return "#22c55e";
  if (rating < 1600) return "#06b6d4";
  if (rating < 1900) return "#3b82f6";
  if (rating < 2100) return "#a855f7";
  return "#f97316";
}

export default function ProblemTable({
  problems,
  solvedSet,
  dark,
}: {
  problems: Problem[];
  solvedSet: Set<string>;
  dark: boolean;
}) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr
          style={{
            background: dark ? "#1f2937" : "#0f172a",
          }}
        >
          <th style={th}>Problem</th>
          <th style={th}>Contest</th>
          <th style={th}>Rating</th>
        </tr>
      </thead>

      <tbody>
        {problems.map((p) => {
          const solved = solvedSet.has(p.id);

          return (
            <tr
              key={p.id}
              style={{
                backgroundColor: solved
                  ? (dark ? "#064e3b" : "#0f766e")
                  : (dark ? "#0b0f19" : "#1e293b"),
                borderBottom: dark
                  ? "1px solid #27303a"
                  : "1px solid #1e293b",
              }}
            >
              <td style={td}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: solved
                      ? "#4ade80"
                      : dark
                        ? "#e5e7eb"
                        : "#f8fafc",
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
          );
        })}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 14px",
  fontSize: 14,
  fontWeight: 600,
  color: "#cbd5e1",
};

const td: React.CSSProperties = {
  padding: "12px 14px",
  fontSize: 14,
  color: "#e5e7eb",
};
