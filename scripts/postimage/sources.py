"""
Where the photographs come from, and what we are allowed to do with them.

Two libraries, both keyless, queried in order of how likely they are to hold a usable modern
photograph:

  * **Openverse** aggregates Creative Commons images across Flickr and others. It is the better
    of the two for contemporary subjects — a mechanic at work, an office desk — and it can be
    filtered to licences that permit commercial use, which is the only kind we may ship.
  * **Wikimedia Commons** is the fallback. Its trucking holdings skew archival and institutional;
    a search for "truck inspection" returns a 1918 Army motor pool and a Digital Public Library
    scan before it returns anything from this decade. Useful, but not first.

Unsplash is deliberately absent. Its API needs a key this project does not have, and its licence
terms carry obligations (hotlinking their CDN, firing a download ping) that a static marketing
site should not have to honour correctly forever.

Every result carries its licence. A photograph whose licence we cannot read is discarded rather
than used and sorted out later — the site already renders attribution under each image, and that
only works if the data is there.
"""
from __future__ import annotations

import json
import urllib.parse
import urllib.request
from dataclasses import dataclass

UA = {"User-Agent": "fleetfalcon-site/1.0 (+https://www.fleetfalcon.io)"}

# Licences that permit commercial use. CC BY-NC and friends are absent on purpose: this is a
# commercial site, and "nobody will notice" is not a licence.
COMMERCIAL = {"cc0", "pdm", "by", "by-sa", "public domain", "cc by", "cc by-sa", "cc by 2.0",
              "cc by 3.0", "cc by 4.0", "cc by-sa 2.0", "cc by-sa 3.0", "cc by-sa 4.0"}

# Licences that legally require a credit line. The rest may be credited anyway; these must be.
NEEDS_CREDIT = {"by", "by-sa", "cc by", "cc by-sa"}


@dataclass
class Candidate:
    url: str
    title: str
    license: str
    artist: str
    source: str
    provider: str
    width: int

    @property
    def needs_attribution(self) -> bool:
        lic = self.license.lower().strip()
        return any(lic.startswith(p) for p in NEEDS_CREDIT)


def _get(url: str) -> dict:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.load(r)


def openverse(query: str, limit: int = 12) -> list[Candidate]:
    """
    Creative Commons images, commercial-use only.

    The query is kept short on purpose. Openverse treats extra words as additional constraints,
    so a five-word subject plus a licence filter returns zero results where three words return
    hundreds — which is exactly how the first attempt at this concluded, wrongly, that the API
    was broken.
    """
    short = " ".join(query.split()[:3])
    params = urllib.parse.urlencode({
        "q": short, "license_type": "commercial", "page_size": limit,
        "mature": "false", "aspect_ratio": "wide",
    })
    try:
        data = _get("https://api.openverse.org/v1/images/?" + params)
    except Exception:
        return []

    out = []
    for r in data.get("results", []):
        lic = (r.get("license") or "").lower()
        if lic not in COMMERCIAL:
            continue
        url = r.get("url")
        if not url:
            continue
        out.append(Candidate(
            url=url,
            title=(r.get("title") or "").strip(),
            license=f"CC {lic.upper()}" if lic not in ("cc0", "pdm") else lic.upper(),
            artist=(r.get("creator") or "Unknown").strip(),
            source=r.get("foreign_landing_url") or url,
            provider="Openverse",
            width=int(r.get("width") or 0),
        ))
    return out


def wikimedia(query: str, limit: int = 12) -> list[Candidate]:
    """Commons, as the fallback. Archival-heavy, but free and well-labelled."""
    params = urllib.parse.urlencode({
        "action": "query", "format": "json", "generator": "search",
        "gsrsearch": f"filetype:bitmap {query}", "gsrnamespace": "6", "gsrlimit": limit,
        "prop": "imageinfo", "iiprop": "url|extmetadata|size", "iiurlwidth": "1600",
    })
    try:
        data = _get("https://commons.wikimedia.org/w/api.php?" + params)
    except Exception:
        return []

    out = []
    for page in ((data.get("query") or {}).get("pages") or {}).values():
        info = (page.get("imageinfo") or [{}])[0]
        meta = info.get("extmetadata") or {}
        lic = ((meta.get("LicenseShortName") or {}).get("value") or "").strip()
        if lic.lower() not in COMMERCIAL:
            continue
        url = info.get("thumburl") or info.get("url")
        if not url:
            continue
        artist = ((meta.get("Artist") or {}).get("value") or "Unknown")
        # Commons stores the artist as HTML. Strip it rather than render a link into a credit.
        artist = " ".join(part for part in _strip_tags(artist).split() if part) or "Unknown"
        out.append(Candidate(
            url=url,
            title=(page.get("title") or "")[5:],
            license=lic,
            artist=artist[:80],
            source=f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(page.get('title',''))}",
            provider="Wikimedia Commons",
            width=int(info.get("thumbwidth") or info.get("width") or 0),
        ))
    return out


def _strip_tags(html: str) -> str:
    out, depth = [], 0
    for ch in html:
        if ch == "<":
            depth += 1
        elif ch == ">":
            depth = max(0, depth - 1)
        elif depth == 0:
            out.append(ch)
    return "".join(out)
