"""
Deciding whether a candidate photograph is actually about the post.

The keyless Creative Commons libraries are dominated by United States government work, because
federal photographs are public domain by statute. Search them for "truck mechanic" and the first
page is BLM firetrucks, an Army motor pool and a Marine Corps workshop. All free, all legal, all
wrong on a blog about DOT compliance for commercial carriers — and this is precisely how the
earlier pass ended up with a FEMA supply depot heading a J.J. Keller comparison.

So a candidate has to earn its place. The score rewards overlap with the post's own vocabulary
and penalises the tells of institutional and archival photography. Anything that does not clear
{@link THRESHOLD} is rejected, and a post with no surviving candidate goes to generation — which
is the right outcome, not a failure.
"""
from __future__ import annotations

import re
from dataclasses import dataclass

from sources import Candidate
from subjects import keywords

# Subjects that are free, legal and not what a commercial-carrier blog should show.
OFF_DOMAIN = re.compile(
    r"\b(army|navy|marine|air force|soldier|military|corps|usmc|nato|"
    r"blm|bureau of land|forest service|nasa|fema|national guard|"
    r"fire ?truck|fire department|ambulance|police|sheriff|"
    r"museum|vintage|antique|historic|wwi|wwii|locomotive|tractor pull)\b",
    re.I,
)

# A four-digit year before 2000 in the title, which Commons uses heavily on scans.
ARCHIVAL = re.compile(r"\b(1[89]\d{2})\b")

# Below this a candidate is not worth shipping, and the post goes to generation instead.
#
# Set at 3.5, which requires two subject words rather than one. At 2.0 — a single keyword —
# the run returned "Food Trucks" for a post on improving your CSA score, "Filing Taxes - 1040
# Form" for the J.J. Keller comparison, and "My NYC cab driver" for the English-language
# proficiency rule. All free, all commercially licensed, all embarrassing. One matched word is
# not evidence that a photograph is about anything.
THRESHOLD = 3.5

# Narrower than this and it cannot fill a post header without upscaling artefacts.
MIN_WIDTH = 1000


@dataclass
class Scored:
    candidate: Candidate
    score: float
    why: str


def score(c: Candidate, title: str, query: str) -> Scored:
    text = f"{c.title} {c.artist}".lower()
    reasons = []
    total = 0.0

    if c.width and c.width < MIN_WIDTH:
        return Scored(c, -10.0, f"only {c.width}px wide")

    if OFF_DOMAIN.search(text):
        return Scored(c, -10.0, "government, emergency-services or museum subject")

    if ARCHIVAL.search(c.title):
        return Scored(c, -10.0, "archival scan")

    # Overlap with the search subject is the main signal.
    hits = sum(1 for w in query.lower().split() if len(w) > 3 and w in text)
    total += hits * 1.5
    if hits:
        reasons.append(f"{hits} subject words")

    # Overlap with the post's own title is a bonus, not a requirement — titles are abstract.
    post_hits = sum(1 for w in keywords(title) if w in text)
    total += post_hits * 0.5
    if post_hits:
        reasons.append(f"{post_hits} title words")

    # An untitled photo tells us nothing, and we cannot verify it is on topic.
    if not c.title.strip():
        total -= 1.0
        reasons.append("untitled")

    # Openverse skews modern; Commons skews archival. A small nudge, not a verdict.
    if c.provider == "Openverse":
        total += 0.5

    return Scored(c, total, ", ".join(reasons) or "nothing matched")


def best(cands: list[Candidate], title: str, query: str, used: set) -> Scored | None:
    """
    The strongest candidate that clears the bar and has not been used on another post.

    Reuse is tracked across the whole run because the same photograph heading two posts is the
    single most obvious tell that the images were automated — the previous set had one tanker on
    two different articles.
    """
    ranked = sorted((score(c, title, query) for c in cands), key=lambda s: -s.score)
    for s in ranked:
        if s.score >= THRESHOLD and s.candidate.url not in used:
            return s
    return None
