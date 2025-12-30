import requests
import json
from datetime import datetime

CONTEST_LIST_URL = "https://codeforces.com/api/contest.list"
PROBLEMSET_URL = "https://codeforces.com/api/problemset.problems"

OUTPUT_FILE = "../public/data/div2.json"

LIMIT = {"A": 100, "B": 100, "C": 100, "D": 100}

ALLOWED_KEYWORDS = [
    "div. 2",
    "rated for div. 2",
    "div. 1 + div. 2",
    "global round"
]

def is_div2_related(name: str) -> bool:
    n = name.lower()
    return any(keyword in n for keyword in ALLOWED_KEYWORDS)

def get_contests():
    res = requests.get(CONTEST_LIST_URL).json()
    return [
        {"id": c["id"], "name": c["name"]}
        for c in res["result"]
        if c.get("phase") == "FINISHED" and is_div2_related(c["name"])
    ]

def main():
    contests = get_contests()
    contest_map = {c["id"]: c["name"] for c in contests}

    res = requests.get(PROBLEMSET_URL).json()
    problems = res["result"]["problems"]

    sheet = []

    for p in problems:
        cid = p.get("contestId")
        idx = p.get("index")

        if cid not in contest_map:
            continue
        if idx not in LIMIT:
            continue
        if LIMIT[idx] == 0:
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

        LIMIT[idx] -= 1
        if all(v == 0 for v in LIMIT.values()):
            break

    output = {
        "division": "Div. 2 Mixed Pool",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "problems": sheet
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print(f"Saved {len(sheet)} problems to {OUTPUT_FILE}")
    print("Remaining count:", LIMIT)


if __name__ == "__main__":
    main()
