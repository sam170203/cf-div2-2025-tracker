"use client"

import { useState } from "react"

export default function CFHandleInput({
  onLoad,
}: {
  onLoad: (handle: string) => void
}) {
  const [handle, setHandle] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("cf-handle") ?? ""
      : ""
  )

  function load() {
    if (!handle.trim()) return
    localStorage.setItem("cf-handle", handle.trim())
    onLoad(handle.trim())
  }

  return (
    <div className="flex gap-2 items-center mt-4">
      <input
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        placeholder="Enter Codeforces handle"
        className="border px-3 py-2 rounded-md w-64"
      />
      <button
        onClick={load}
        className="px-4 py-2 rounded-md bg-blue-600 text-white"
      >
        Load
      </button>
    </div>
  )
}

