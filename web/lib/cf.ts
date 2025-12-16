// web/lib/cf.ts

// Fetch all solved problem IDs for a user
export async function fetchSolvedSet(handle: string): Promise<Set<string>> {
    const res = await fetch(
      `https://codeforces.com/api/user.status?handle=${handle}&from=1`
    )
    const data = await res.json()
  
    if (data.status !== "OK") {
      return new Set()
    }
  
    const solved = new Set<string>()
  
    for (const sub of data.result) {
      if (sub.verdict === "OK") {
        solved.add(`${sub.problem.contestId}${sub.problem.index}`)
      }
    }
  
    return solved
  }
  
  // Fetch basic user info (profile card)
  export async function fetchUserInfo(handle: string) {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    )
    const data = await res.json()
  
    if (data.status !== "OK") return null
  
    const u = data.result[0]
    return {
      handle: u.handle,
      rating: u.rating,
      rank: u.rank,
      avatar: u.avatar,
    }
  }
  