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
        color: dark ? "#e5e7eb" : "#1e293b",
      }}
    >
      {/* 🔥 Logo Added */}
      <div style={{ marginBottom: 22 }}>
        <Logo size={85} />
      </div>

      <h1
        style={{
          fontSize: 42,
          fontWeight: 800,
          fontFamily: "monospace",
          marginBottom: 6,
          color: dark ? "#fff" : "#0f172a",
        }}
      >
        CF CodeClimb ’26
      </h1>

      <p
        style={{
          opacity: 0.9,
          fontSize: 18,
          fontWeight: 500,
          marginBottom: 35,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        Select your battleground 🚀
      </p>

      <div
        style={{
          display: "flex",
          gap: 18,
          marginTop: 8,
        }}
      >
        {/* Div2 Card */}
        <Link
          href="/div2"
          style={{
            padding: "24px 38px",
            fontSize: 22,
            fontWeight: 700,
            borderRadius: 14,
            background: dark ? "#1a1d23" : "#334155",
            border: "2px solid rgba(255,255,255,0.17)",
            cursor: "pointer",
            transition: "0.25s ease",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0px 0px 18px rgba(59,130,246,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Div2 Sheet
        </Link>

        {/* Div3 Card */}
        <Link
          href="/div3"
          style={{
            padding: "24px 38px",
            fontSize: 22,
            fontWeight: 700,
            borderRadius: 14,
            background: dark ? "#1a1d23" : "#334155",
            border: "2px solid rgba(255,255,255,0.17)",
            cursor: "pointer",
            transition: "0.25s ease",
            transform: "translateY(0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0px 0px 18px rgba(59,130,246,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Div3 Sheet
        </Link>
      </div>

      {/* Current Theme Button - Optional Keep It Clean Here */}
    </main>
  );
}
