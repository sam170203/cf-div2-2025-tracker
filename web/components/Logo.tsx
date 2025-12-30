"use client";

export default function Logo({ size = 46 }: { size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontWeight: 900,
        fontSize: size * 0.45,
        background: "linear-gradient(90deg,#38bdf8,#3b82f6)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        letterSpacing: "-0.8px",
        transition: "0.25s ease",
      }}
    >
      {/* Minimal CC Logo */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        style={{
          filter: "drop-shadow(0 0 8px rgba(59,130,246,0.6))",
        }}
      >
        <circle cx="50" cy="50" r="45" stroke="#38bdf8" strokeWidth="7" />
        <path
          d="M35 50 C35 35 50 28 65 38"
          stroke="#3b82f6"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M35 50 C35 65 50 72 65 62"
          stroke="#3b82f6"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      CodeClimb
    </div>
  );
}
