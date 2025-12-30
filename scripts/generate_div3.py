import requests
import json
from datetime import datetime

CONTEST_LIST_URL = "https://codeforces.com/api/contest.list"
PROBLEMSET_URL = "https://codeforces.com/api/problemset.problems"

OUTPUT_FILE = "../web/public/data/div3.json"
TOTAL_PER_LETTER = 100  # A/B/C/D each

def fetch_div3_contests():
    res = requests.get(CONTEST_LIST_URL).json()
    contests = []

    for c in res["result"]:
        if c.get("phase") != "FINISHED":
            continue

        name = c["name"].lower()
        if "div. 3" not in name:
            continue

        contests.append({"id": c["id"], "name": c["name"]})

    return contests


def fetch_problems():
    res = requests.get(PROBLEMSET_URL).json()
    return res["result"]["problems"]


def main():
    contests = fetch_div3_contests()
    contest_ids = {c["id"]: c["name"] for c in contests}

    problems = fetch_problems()
    result = []

    counts = {"A": 0, "B": 0, "C": 0, "D": 0}

    for p in problems:
        cid = p.get("contestId")
        idx = p.get("index")

        if cid not in contest_ids:
            continue
        if idx not in counts:
            continue
        if counts[idx] >= TOTAL_PER_LETTER:
            continue

        result.append({
            "id": f"{cid}{idx}",
            "contestId": cid,
            "contestName": contest_ids[cid],
            "index": idx,
            "name": p["name"],
            "rating": p.get("rating"),
            "url": f"https://codeforces.com/contest/{cid}/problem/{idx}"
        })

        counts[idx] += 1

        if all(v >= TOTAL_PER_LETTER for v in counts.values()):
            break

    result.sort(key=lambda x: (x["rating"] or 9999, x["contestId"], x["index"]))

    output = {
        "category": "Div3",
        "lastUpdated": datetime.utcnow().strftime("%Y-%m-%d"),
        "problems": result,
    }

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2)

    print("Saved problems to div3.json")
    print("Counts:", counts)


if __name__ == "__main__":
    main()
