import requests
import json
from datetime import datetime

CONTEST_LIST_URL = "https://codeforces.com/api/contest.list"
PROBLEMSET_URL = "https://codeforces.com/api/problemset.problems"

YEAR = 2025
OUTPUT_FILE = "../data/2025.json"


def get_div2_contests_2025():
    res = requests.get(CONTEST_LIST_URL).json()
    contests = []

    for c in res["result"]:
        if c.get("phase") != "FINISHED":
            continue

        start = datetime.fromtimestamp(c["startTimeSeconds"])
        if start.year != YEAR:
            continue

        name = c["name"].lower()
        if "div. 2" not in name:
            continue

        contests.append({
            "id": c["id"],
            "name": c["name"]
        })

    return contests


def get_problems():
    res = requests.get(PROBLEMSET_URL).json()
    return res["result"]["problems"]


def main():
    contests = get_div2_contests_2025()
    contest_map = {c["id"]: c["name"] for c in contests}

    problems = get_problems()
    sheet = []

    for p in problems:
        cid = p.get("contestId")
        idx = p.get("index")

        if cid not in contest_map:
            continue
        if idx not in {"A", "B", "C"}:
            continue

        sheet.append({
            "id": f"{cid}{idx}",
            "contestId": cid,
            "contestName": contest_map[cid],
            "index": idx,
            "name": p["name"],
            "rating": p.get("rating"),
            "tags": p.get("tags", []),
            "url": f"https://codeforces.com/contest/{cid}/problem/{idx}"
        })

    sheet.sort(key=lambda x: (x["rating"] or 9999, x["contestId"], x["index"]))

    output = {
        "year": YEAR,
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "problems": sheet
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print(f"Generated {len(sheet)} problems into data/2025.json")


if __name__ == "__main__":
    main()
