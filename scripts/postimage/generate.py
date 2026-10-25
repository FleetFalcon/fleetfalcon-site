"""
Making the image when no photograph of the subject exists to be found.

This began as the fallback and the evidence made it the main path. Run against all fifteen
posts, the keyless Creative Commons libraries produced nothing shippable for any of them: the
best candidates were "Food Trucks" for a post on improving a CSA score and "Filing Taxes - 1040
Form" for the J.J. Keller comparison. Free photography of DOT compliance, as a subject, does not
exist — the libraries hold government fleet photos, museum scans and holiday snapshots.

So the prompt matters, and two rules shape it:

  * **Photographic, not illustrative.** The site tried drawn motifs once and they read as clip
    art. The brief here is a photograph that could plausibly have been taken, not an artist's
    impression of compliance.
  * **No text, no logos, no faces that could be a real person.** Generated text comes out as
    nonsense glyphs, a generated logo is somebody else's trademark by accident, and a synthetic
    face on a blog about negligent hiring is a liability nobody needs.

Every generated image is recorded as `origin: "generated"` so that the page can label it and
nobody has to guess later which pictures are real.
"""
from __future__ import annotations

import base64
import json
import os
import pathlib
import urllib.request

API = "https://openrouter.ai/api/v1/chat/completions"

# Google's image model via OpenRouter. Chosen because FleetFalcon already routes through
# OpenRouter for document extraction, so there is one vendor relationship and one key to rotate
# rather than two.
MODEL = os.environ.get("IMAGE_MODEL", "google/gemini-3.1-flash-image")

STYLE = (
    "Editorial photograph for a trucking-compliance article. Natural daylight, realistic depth "
    "of field, muted colour, documentary rather than advertising. Shot on a 35mm lens. "
    "No text, no signage, no logos, no brand marks, no readable documents, no identifiable faces. "
    "Wide 16:9 composition with room at the top for a headline."
)


def api_key() -> str | None:
    key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if key:
        return key
    env = pathlib.Path(__file__).resolve().parent.parent.parent / ".env.local"
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None


def prompt_for(title: str, subject: str | None) -> str:
    """
    What to draw.

    The subject from the lexicon when there is one, the title when there is not — a post with no
    photographic subject still has a topic, and the model can work from it where a search engine
    could not.
    """
    scene = subject or f"a scene that could illustrate an article titled '{title}'"
    return f"{scene}. {STYLE}"


def generate(title: str, subject: str | None, dest: pathlib.Path) -> bool:
    """
    One image, written to `dest`. False when the model is unavailable or returns nothing.

    Failures are quiet and non-fatal on purpose: a post without a header is a worse outcome than
    a slow pipeline, but it is a much better outcome than a wrong picture, and the caller
    reports the gap rather than papering over it.
    """
    key = api_key()
    if not key:
        return False

    body = json.dumps({
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt_for(title, subject)}],
        "modalities": ["image", "text"],
    }).encode()

    req = urllib.request.Request(API, data=body, headers={
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.fleetfalcon.io",
        "X-Title": "fleetfalcon-site post images",
    })

    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.load(r)
    except Exception as e:
        print(f"      generation failed: {str(e)[:110]}")
        return False

    for choice in data.get("choices", []):
        for image in (choice.get("message") or {}).get("images") or []:
            url = ((image or {}).get("image_url") or {}).get("url", "")
            if url.startswith("data:"):
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(base64.b64decode(url.split(",", 1)[1]))
                return True
    print("      model returned no image")
    return False
