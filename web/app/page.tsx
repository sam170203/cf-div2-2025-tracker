"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") setDark(false);
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: dark ? "#0e1116" : "#e2e8f0",
        transition: "0.25s ease",
        color: dark ? "#e5e7eb" : "#0f172a",
        padding: "0 20px",
      }}
    >
      {/* 🔥 Logo — Visible on First Page */}
      <div style={{ marginBottom: 28 }}>
        <Logo size={110} />
      </div>

      <h1
        style={{
          fontSize: 48,
          fontWeight: 900,
          fontFamily: "monospace",
          marginBottom: 10,
          textAlign: "center",
          color: dark ? "#ffffff" : "#0f172a",
        }}
      >
        CF CodeClimb ’26
      </h1>

      <p
        style={{
          fontSize: 18,
          opacity: 0.88,
          textAlign: "center",
          marginBottom: 20,
          maxWidth: 500,
          fontWeight: 500,
        }}
      >
        Choose your battleground 💪
      </p>

      {/* Select Buttons */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 12,
        }}
      >
        {/* Div2 */}
        <Link
          href="/div2"
          style={getButtonStyle(dark)}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          Div2 Sheet
        </Link>

        {/* Div3 */}
        <Link
          href="/div3"
          style={getButtonStyle(dark)}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          Div3 Sheet
        </Link>
      </div>
    </main>
  );
}

// 🔹 Reusable clean button style
function getButtonStyle(dark: boolean): React.CSSProperties {
  return {
    padding: "24px 40px",
    fontSize: 20,
    fontWeight: 700,
    borderRadius: 14,
    cursor: "pointer",
    textDecoration: "none",
    background: dark ? "#1a1d23" : "#334155",
    color: "#e5e7eb",
    border: "2px solid rgba(255,255,255,0.18)",
    transition: "0.25s ease",
  };
}

// 🔹 Hover Animation
function hoverEffect(e: any, hovering: boolean) {
  e.currentTarget.style.transform = hovering ? "translateY(-4px)" : "translateY(0)";
  e.currentTarget.style.boxShadow = hovering
    ? "0 0 18px rgba(59,130,246,0.55)"
    : "none";
}
