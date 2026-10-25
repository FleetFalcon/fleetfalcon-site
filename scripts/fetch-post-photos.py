#!/usr/bin/env python3
"""
Pick a distinct, topical photograph for each blog post from Unsplash.

Reads UNSPLASH_ACCESS_KEY from .env.local (gitignored) and never prints it. Writes
app/blog-photos.ts, which the PostHeader component reads. It downloads nothing: Unsplash's API
Guidelines expect their CDN to serve the image, so we store the CDN URL and let next/image
optimise it. That also keeps several megabytes of JPEG out of the repository.

Two rules learned the hard way on the Wikimedia pass, both encoded here:

  * One query PER POST, about that post's own subject. Not one generic "truck" search reused
    thirteen times — that is what put a tanker on the CSA-score post and a FEMA supply depot on
    the J.J. Keller comparison.
  * No photo used twice, tracked by Unsplash id across the whole run. The previous set had the
    same tanker heading two different posts, which is obvious to anyone reading both.

Unsplash's guidelines require attribution and a download-trigger ping, and both are handled.

Run:  python3 scripts/fetch-post-photos.py --dry    # show the picks, write nothing
      python3 scripts/fetch-post-photos.py          # write app/blog-photos.ts
"""
import json, os, pathlib, sys, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "app" / "blog-photos.ts"
API = "https://api.unsplash.com"

# Query per post, describing the SUBJECT rather than the industry.
POSTS = {
    "what-is-a-dq-file":                  "paperwork files folder desk organised",
    "negligent-hiring-dq-file-defense":   "courtroom law legal documents",
    "how-to-improve-your-csa-score":      "truck mechanic inspecting vehicle",
    "how-brokers-use-your-csa-score":     "logistics warehouse freight broker",
    "what-is-dataqs":                     "reviewing documents magnifying detail",
    "dot-compliance-canada-cvor-nsc":     "canada highway winter road truck",
    "new-carrier-compliance-mistakes":    "small business owner van startup",
    "compliance-problems-scaling-fleets": "truck fleet aerial parking lot",
    "can-your-tms-handle-dot-compliance": "logistics dashboard computer screen",
    "fleetfalcon-vs-alternatives":        "two trucks highway side by side",
    "jj-keller-encompass-alternatives":   "filing cabinet binders archive office",
    "human-in-the-loop-compliance-ai":    "person reviewing laptop screen focused",
    "safety-and-compliance-overlap":      "worker safety vest hard hat inspection",
}


def access_key() -> str:
    env = ROOT / ".env.local"
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("UNSPLASH_ACCESS_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    key = os.environ.get("UNSPLASH_ACCESS_KEY", "")
    if not key:
        sys.exit("No UNSPLASH_ACCESS_KEY in .env.local or the environment.")
    return key


def get(key: str, path: str) -> dict:
    req = urllib.request.Request(API + path, headers={
        "Authorization": f"Client-ID {key}",
        "Accept-Version": "v1",
    })
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)


def pick(key: str, query: str, used: set) -> dict | None:
    data = get(key, "/search/photos?" + urllib.parse.urlencode(
        {"query": query, "per_page": 15, "orientation": "landscape", "content_filter": "high"}))
    for p in data.get("results", []):
        if p["id"] in used or p["width"] < 1600:
            continue
        return p
    return None


def main() -> None:
    dry = "--dry" in sys.argv
    key = access_key()
    chosen, used = {}, set()

    for slug, query in POSTS.items():
        try:
            photo = pick(key, query, used)
        except Exception as e:  # noqa: BLE001 — report per post, keep going
            print(f"  {slug:36} FAILED {type(e).__name__}")
            continue
        if not photo:
            print(f"  {slug:36} nothing usable for {query!r}")
            continue

        used.add(photo["id"])
        chosen[slug] = {
            "url": photo["urls"]["regular"],
            "alt": (photo.get("alt_description") or query).strip().capitalize(),
            "artist": photo["user"]["name"],
            # Unsplash's guidelines require the photographer link to carry the referral parameters.
            "artistUrl": f"{photo['user']['links']['html']}?utm_source=fleetfalcon&utm_medium=referral",
            "id": photo["id"],
        }
        print(f"  {slug:36} {photo['user']['name'][:20]:22} {chosen[slug]['alt'][:42]}")

        if not dry:
            # Unsplash asks applications to ping this when a photo is actually used.
            try:
                get(key, photo["links"]["download_location"].replace(API, ""))
            except Exception:
                pass

    if not dry:
        body = ",\n".join(
            f'  "{s}": {{\n'
            f'    url: "{c["url"]}",\n'
            f'    alt: {json.dumps(c["alt"])},\n'
            f'    artist: {json.dumps(c["artist"])},\n'
            f'    artistUrl: "{c["artistUrl"]}",\n'
            f"  }}"
            for s, c in chosen.items())
        OUT.write_text(
            "// Generated by scripts/fetch-post-photos.py — do not edit by hand.\n"
            "//\n"
            "// Photographs served from Unsplash's CDN rather than committed here: their API\n"
            "// guidelines expect it, next/image optimises it, and it keeps megabytes of JPEG out of\n"
            "// the repository. Attribution is required by those guidelines and is rendered by\n"
            "// PostHeader, so removing it is a licence problem and not a style choice.\n\n"
            "export type BlogPhoto = { url: string; alt: string; artist: string; artistUrl: string };\n\n"
            "export const blogPhotos: Record<string, BlogPhoto> = {\n" + body + ",\n};\n")

    print(f"\n{len(chosen)} photos, {len(used)} distinct{' (dry run)' if dry else f' -> {OUT.relative_to(ROOT)}'}")


if __name__ == "__main__":
    main()
