#!/usr/bin/env python3
"""
One header image for every blog post, chosen automatically.

Reads the posts out of `app/content.ts`, so adding an article to that list is the whole of what
an author has to do — there is no second place to register it. The previous version kept a
hardcoded dictionary of thirteen slugs, and by the time anyone looked, two published posts had
drifted out of it and had no image at all.

For each post, in order:

  1. Turn the title into a photographable subject (`postimage/subjects.py`). Abstract posts —
     "What is DataQs" — have no photographic subject, and saying so is the point.
  2. Search the keyless Creative Commons libraries for something commercial-licensed
     (`postimage/sources.py`).
  3. Score it against the post and reject institutional, archival and off-topic results
     (`postimage/score.py`). Most free results fail this, by design.
  4. Where nothing survives, generate an image instead (`--generate`, needs OPENROUTER_API_KEY).

The result is written to `app/post-images.ts` with the licence and credit for every entry, and
the images land in `public/blog/`. Nothing is overwritten unless `--force` is passed, so a
picture somebody chose by hand stays chosen.

    python3 scripts/post-images.py --dry        # report what each post would get
    python3 scripts/post-images.py              # search and write; leaves gaps where it fails
    python3 scripts/post-images.py --generate   # fill those gaps with generated images
    python3 scripts/post-images.py --check      # exit 1 if any post has no image (for CI)
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys
import urllib.request

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent / "postimage"))

from score import best                      # noqa: E402
from sources import Candidate, openverse, wikimedia   # noqa: E402
from generate import generate, api_key      # noqa: E402
from subjects import query_for              # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "app" / "content.ts"
OUT_TS = ROOT / "app" / "post-images.ts"
IMAGES = ROOT / "public" / "blog"


def posts() -> list[dict]:
    """
    Every post, read from the same list the site renders from.

    Parsed with a regex rather than by running TypeScript, because this script is the thing that
    has to work on a machine with nothing installed. The shape it depends on — a `blogPosts`
    array of objects with `slug`, `title` and `description` — is the shape the site itself
    depends on, so it cannot drift silently without the site breaking first.
    """
    src = CONTENT.read_text()
    start = src.index("export const blogPosts")
    body = src[start : src.index("\n];", start)]
    out = []
    for block in re.findall(r"\{(.*?)\n  \}", body, re.S):
        def field(name: str) -> str:
            m = re.search(rf'{name}:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block, re.S)
            return (m.group(1).replace('\\"', '"') if m else "").strip()
        slug = field("slug")
        if slug:
            out.append({"slug": slug, "title": field("title"), "description": field("description")})
    return out


def existing() -> dict:
    """
    What has already been chosen, read back out of the generated file.

    The trailing `as const` matters: the first version of this matched `= {...};` and the file
    ends `} as const;`, so the pattern never matched and the function silently returned nothing.
    Every run then believed no post had an image — which meant `--check` failed with all fifteen
    present, and an unforced run would have regenerated all fifteen and paid for them again.
    A parser that returns empty on a mismatch has to be read carefully for exactly this reason.
    """
    if not OUT_TS.exists():
        return {}
    text = OUT_TS.read_text()
    m = re.search(r"postImages:\s*Record<[^>]*>\s*=\s*(\{.*?\})\s*(?:as const)?\s*;\s*$",
                  text, re.S)
    if not m:
        return {}
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError as e:
        print(f"  warning: could not read {OUT_TS.name} ({e}); treating it as empty")
        return {}


def download(url: str, dest: pathlib.Path) -> bool:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "fleetfalcon-site/1.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 15_000:          # a thumbnail or an error page, not a header image
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(data)
        return True
    except Exception:
        return False


def write_ts(entries: dict) -> None:
    """
    The map the site reads, with the licence beside every entry.

    Generated, and says so — but the licence data is the point of it existing as a file rather
    than being looked up at render time. A photograph whose credit lives only in the API
    response that fetched it is a photograph nobody can prove the right to use.
    """
    OUT_TS.write_text(
        "// Generated by scripts/post-images.py — do not edit by hand.\n"
        "//\n"
        "// One header image per blog post. `credit` is rendered under the image when the licence\n"
        "// requires it; `source` is the page the image came from, kept so the claim is checkable.\n"
        "// Entries with origin \"generated\" were produced because no commercially-licensed\n"
        "// photograph of the subject could be found.\n\n"
        "export type PostImage = {\n"
        "  file: string;\n"
        "  alt: string;\n"
        "  origin: \"stock\" | \"generated\";\n"
        "  license: string;\n"
        "  artist: string;\n"
        "  source: string;\n"
        "  attribute: boolean;\n"
        "};\n\n"
        "export const postImages: Record<string, PostImage> = "
        + json.dumps(entries, indent=2, sort_keys=True)
        + " as const;\n"
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry", action="store_true", help="report, write nothing")
    ap.add_argument("--generate", action="store_true", help="generate where search found nothing")
    ap.add_argument("--check", action="store_true", help="exit 1 if any post lacks an image")
    ap.add_argument("--force", action="store_true", help="replace images already chosen")
    args = ap.parse_args()

    all_posts = posts()
    have = existing()

    if args.generate and not api_key():
        print("No OPENROUTER_API_KEY in the environment or .env.local — "
              "searching only, gaps will be left unfilled.\n")

    if args.check:
        # Both halves, because they drift apart: the manifest can name a file that was deleted,
        # and a file can sit in public/blog with nothing pointing at it. Checking only the
        # manifest reported fifteen of fifteen while five images were missing from disk.
        missing, orphaned = [], []
        for p in all_posts:
            slug = p["slug"]
            entry = have.get(slug)
            if not entry:
                missing.append(f"{slug}: not in the manifest")
            elif not (ROOT / "public" / entry["file"].lstrip("/")).exists():
                missing.append(f"{slug}: manifest names {entry['file']}, which is not on disk")
        for f in sorted(IMAGES.glob("*.jpg")):
            if not any(e["file"].endswith(f.name) for e in have.values()):
                orphaned.append(f.name)
        for m in missing:
            print(f"  {m}")
        for o in orphaned:
            print(f"  unused image on disk: {o}")
        print(f"{len(all_posts) - len(missing)}/{len(all_posts)} posts have a header image"
              + (f" · {len(orphaned)} unused" if orphaned else ""))
        return 1 if missing else 0

    used = {e["source"] for e in have.values()}
    found = generated = skipped = 0

    for p in all_posts:
        slug, title = p["slug"], p["title"]
        on_disk = slug in have and (ROOT / "public" / have[slug]["file"].lstrip("/")).exists()
        if on_disk and not args.force:
            skipped += 1
            continue

        query = query_for(title, p["description"])
        if not query:
            print(f"  {slug:<42} no photographic subject → generate")
            if args.generate and not args.dry:
                dest = IMAGES / f"{slug}.jpg"
                if generate(title, None, dest, slug):
                    generated += 1
                    have[slug] = {
                        "file": f"/blog/{slug}.jpg", "alt": title, "origin": "generated",
                        "license": "Generated image", "artist": "FleetFalcon",
                        "source": "", "attribute": False,
                    }
                    print(f"      generated {dest.name}")
            continue

        cands: list[Candidate] = openverse(query) + wikimedia(query)
        pick = best(cands, title, query, used)

        if not pick:
            print(f"  {slug:<42} {len(cands):>2} candidates, none usable → generate")
            if args.generate and not args.dry:
                dest = IMAGES / f"{slug}.jpg"
                if generate(title, query, dest, slug):
                    generated += 1
                    have[slug] = {
                        "file": f"/blog/{slug}.jpg", "alt": query, "origin": "generated",
                        "license": "Generated image", "artist": "FleetFalcon",
                        "source": "", "attribute": False,
                    }
                    print(f"      generated {dest.name}")
            continue

        c = pick.candidate
        print(f"  {slug:<42} {c.provider:<17} {pick.score:>4.1f}  {c.title[:38]}")
        found += 1
        if args.dry:
            continue

        dest = IMAGES / f"{slug}.jpg"
        if not download(c.url, dest):
            print(f"      download failed, leaving {slug} without an image")
            found -= 1
            continue
        used.add(c.source)
        have[slug] = {
            "file": f"/blog/{slug}.jpg", "alt": c.title or query, "origin": "stock",
            "license": c.license, "artist": c.artist, "source": c.source,
            "attribute": c.needs_attribution,
        }

    if not args.dry:
        write_ts(have)

    total = len(all_posts)
    print(f"\n{found} found · {generated} generated · {skipped} already set · "
          f"{total - len(have)} still without an image, of {total} posts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
