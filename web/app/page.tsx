import fs from "fs"
import path from "path"
import ClientPage from "@/components/client-page"

type Problem = {
  id: string
  index: "A" | "B" | "C"
  rating: number | null
  name: string
  contestName: string
  url: string
}

async function getProblems(): Promise<Problem[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "2025.json"
  )

  const raw = fs.readFileSync(filePath, "utf-8")
  const data = JSON.parse(raw)

  return data.problems   // ✅ THIS IS THE FIX
}

export default async function Home() {
  const problems = await getProblems()

  return (
    <main className="min-h-screen bg-black text-white">
      <ClientPage problems={problems} />
    </main>
  )
}
