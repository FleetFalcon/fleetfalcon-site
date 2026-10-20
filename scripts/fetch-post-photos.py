#!/usr/bin/env python3
"""
Fetch a distinct, topical photograph for each blog post from Pexels.

Reads PEXELS_API_KEY from .env.local (gitignored) and never prints it. Downloads into
public/blog/ and writes public/blog/credits.json, which app/components/post-header.tsx reads
so a photo cannot exist without a recorded licence and photographer.

Two rules this encodes, both learned the hard way on the Wikimedia pass:

  * One query PER POST, about that post's subject — not one generic "truck" search reused
    thirteen times. A tanker on the interstate is a fine photo and says nothing about why a
    J.J. Keller alternative might suit you better.
  * No photo is used twice. Repeats are obvious to anyone reading two posts in a row, and the
    previous set had the same tanker heading both "How to improve your CSA score" and
    "FleetFalcon vs. the alternatives".

Run:  python3 scripts/fetch-post-photos.py          # fetch + write credits
      python3 scripts/fetch-post-photos.py --dry    # show what it would pick, download nothing
"""
import json, os, pathlib, sys, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "blog"

# Query per post. Written to describe the SUBJECT, not the industry.
POSTS = {
    "what-is-a-dq-file":                  "truck driver paperwork documents folder",
    "negligent-hiring-dq-file-defense":   "lawyer courtroom legal documents desk",
    "how-to-improve-your-csa-score":      "truck inspection mechanic checking vehicle",
    "how-brokers-use-your-csa-score":     "freight broker logistics office phone",
    "what-is-dataqs":                     "person reviewing paperwork disputing form",
    "dot-compliance-canada-cvor-nsc":     "canada highway truck snow",
    "new-carrier-compliance-mistakes":    "small business owner truck startup",
    "compliance-problems-scaling-fleets": "large truck fleet parked aerial",
    "can-your-tms-handle-dot-compliance": "logistics software dashboard computer screen",
    "fleetfalcon-vs-alternatives":        "two trucks side by side comparison road",
    "jj-keller-encompass-alternatives":   "office filing cabinet binders compliance",
    "human-in-the-loop-compliance-ai":    "person working laptop reviewing screen office",
    "safety-and-compliance-overlap":      "safety vest hard hat worker inspection",
}


def api_key() -> str:
    env = ROOT / ".env.local"
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("PEXELS_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    key = os.environ.get("PEXELS_API_KEY", "")
    if not key:
        sys.exit("No PEXELS_API_KEY in .env.local or the environment.")
    return key


def search(key: str, query: str, used: set) -> dict | None:
    url = "https://api.pexels.com/v1/search?" + urllib.parse.urlencode(
        {"query": query, "per_page": 12, "orientation": "landscape", "size": "large"}
    )
    req = urllib.request.Request(url, headers={"Authorization": key})
    with urllib.request.urlopen(req, timeout=40) as r:
        data = json.load(r)
    for p in data.get("photos", []):
        if p["id"] in used:
            continue
        if p["width"] < 1600:
            continue
        return p
    return None


def main() -> None:
    dry = "--dry" in sys.argv
    key = api_key()
    OUT.mkdir(parents=True, exist_ok=True)
    credits, used = {}, set()

    for slug, query in POSTS.items():
        try:
            photo = search(key, query, used)
        except Exception as e:  # noqa: BLE001 - surface the failure per post, keep going
            print(f"  {slug:36} FAILED {type(e).__name__}")
            continue
        if not photo:
            print(f"  {slug:36} no usable result for {query!r}")
            continue

        used.add(photo["id"])
        name = slug
        credits[name] = {
            "license": "Pexels License",
            "artist": photo["photographer"],
            "source": photo["url"],
            # Pexels does not require attribution, so nothing renders — but the record stays so
            # nobody has to reverse-engineer where these came from in a year.
            "needsAttribution": False,
            "query": query,
        }
        print(f"  {slug:36} {photo['photographer'][:22]:24} {photo['alt'][:40]}")

        if not dry:
            src = photo["src"]["large2x"]
            with urllib.request.urlopen(urllib.request.Request(src), timeout=90) as r:
                (OUT / f"{name}.jpg").write_bytes(r.read())

    if not dry:
        (OUT / "credits.json").write_text(json.dumps(credits, indent=2))
    print(f"\n{len(credits)} photos, {len(used)} distinct{' (dry run)' if dry else ''}")


if __name__ == "__main__":
    main()
