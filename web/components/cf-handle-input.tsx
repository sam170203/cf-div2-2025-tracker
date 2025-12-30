"use client";

import { useState } from "react";

export default function CFHandleInput({
  onLoad,
  dark,
}: {
  onLoad: (h: string) => void;
  dark: boolean;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  async function load() {
    if (!value.trim()) return;

    setError("");

    try {
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${value}`);
      const json = await res.json();
      if (json.status !== "OK") throw new Error();
      onLoad(value);
    } catch {
      setError("⚠ No such Codeforces user");
    }
  }

  return (
    <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={value}
          placeholder="Enter CF Handle"
          onChange={(e) => setValue(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.15)",
            background: dark ? "rgba(255,255,255,0.05)" : "#ffffff",
            color: dark ? "white" : "#000",
            outline: "none",
            minWidth: 200,
          }}
        />
        <button
          className="btn-dark"
          onClick={load}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Load
        </button>
      </div>

      {error && (
        <p style={{ color: "#ff5555", fontSize: 13, marginTop: -4 }}>{error}</p>
      )}
    </div>
  );
}
