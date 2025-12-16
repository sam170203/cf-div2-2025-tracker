type Problem = {
    id: string
    rating: number | null
    name: string
    tags: string[]
    contestName: string
    url: string
  }
  
  export default function ProblemSheet({ problems }: { problems: Problem[] }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted sticky top-0 z-10">
            <tr className="border-b">
              <th className="px-3 py-2 text-left">Solved</th>
              <th className="px-3 py-2 text-left">Rating</th>
              <th className="px-3 py-2 text-left">Problem</th>
              <th className="px-3 py-2 text-left">Tags</th>
              <th className="px-3 py-2 text-left">Contest</th>
            </tr>
          </thead>
  
          <tbody>
            {problems.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-muted/50 transition"
              >
                <td className="px-3 py-2">
                  <input type="checkbox" disabled />
                </td>
  
                <td className="px-3 py-2">
                  {p.rating ?? "—"}
                </td>
  
                <td className="px-3 py-2">
                  <a
                    href={p.url}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {p.name}
                  </a>
                </td>
  
                <td className="px-3 py-2 space-x-1">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 text-xs rounded bg-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
  
                <td className="px-3 py-2 text-muted-foreground">
                  {p.contestName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  