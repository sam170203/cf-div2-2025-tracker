import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contestsRes = await fetch("https://codeforces.com/api/contest.list?gym=false");
    const contestsData = await contestsRes.json();

    const div2Contests = contestsData.result
      .filter((c: any) => c.name.includes("Div. 2"))
      .slice(0, 50);

    const problems: any[] = [];
    const needed = { A: 100, B: 100, C: 100, D: 100 };

    for (const contest of div2Contests) {
      if (Object.values(needed).every(v => v === 0)) break;

      const standingsUrl = `https://codeforces.com/api/contest.standings?contestId=${contest.id}&from=1&count=4`;
      const standRes = await fetch(standingsUrl);
      const standData = await standRes.json();

      for (const p of standData.result.problems) {
        const idx = p.index as "A" | "B" | "C" | "D";
        if (needed[idx] > 0) {
          problems.push({
            contestId: contest.id,
            index: p.index,
            name: p.name,
            rating: p.rating,
          });
          needed[idx]--;
        }
      }
    }

    return NextResponse.json({ problems });
  } catch (error) {
    return NextResponse.json({ problems: [], error: "API Failed" });
  }
}
