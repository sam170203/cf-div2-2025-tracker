"use client";
import { useEffect, useState } from "react";
import ClientPage from "@/components/client-page";

export default function Div3Page() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const res = await fetch("/data/div3.json");
      const data = await res.json();
      setProblems(data.problems);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <main className="min-h-screen text-white p-6">Loading...</main>;
  }

  return <ClientPage problems={problems} division="div3" />;
}
