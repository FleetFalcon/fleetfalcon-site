"""
Turning a post title into something a photo library can actually find.

This is the part the previous attempt solved by hand, and the reason it needed a hardcoded
dictionary of thirteen queries. The titles are abstract — "What is DataQs", "Why compliance AI
needs a human in the loop" — and a photo search for those words returns nothing, or worse,
returns something confidently irrelevant. The old Wikimedia pass put a FEMA supply depot on a
J.J. Keller comparison that way.

So the lexicon below maps the vocabulary these posts actually use onto things that exist in
front of a camera. "DataQs" is not photographable; a person reviewing a document is. Each entry
is a deliberate editorial decision about what a subject looks like, which is why it is a table
somebody can read and argue with rather than a cleverness.

A post whose title matches nothing here produces no usable query, and that is a useful answer:
it routes straight to generation instead of to a search that would return a truck at sunset.
"""
from __future__ import annotations

# Matched in order against the lowercased title and description, so **the order is the
# priority**: named regulatory terms first, generic trucking vocabulary last.
#
# This is a hand-ordering and it has to be, because the right precedence is specificity and
# nothing measurable stands in for it. Sorting by phrase length was tried and is worse —
# "violation" is longer than "dataqs", so the DataQs post got a photograph of a brake drum.
# A post naming a specific rule is about that rule, even when it also says "violation".
LEXICON: list[tuple[str, str]] = [
    ("driver qualification file", "employee personnel file folder documents desk"),
    ("negligent hiring", "courtroom gavel legal documents"),
    ("human in the loop", "person reviewing documents laptop office"),
    ("english language proficiency", "driver cab conversation officer roadside"),
    ("elp rule", "truck driver talking to inspector roadside"),
    ("out of service", "commercial truck stopped roadside inspection"),
    ("roadside inspection", "dot officer inspecting semi truck roadside"),
    ("dataqs", "person reviewing paperwork magnifying glass desk"),
    # Enforcement vocabulary. Absent at first, so a post about citations and speeding matched
    # the generic "violation" and was handed a mechanic at a wheel hub.
    ("citation", "police officer writing ticket beside truck roadside"),
    ("ticket", "police officer writing ticket beside truck roadside"),
    ("speeding", "truck on highway seen from patrol car roadside"),
    ("registration", "vehicle paperwork documents clipboard truck cab"),
    ("fuel tax", "fuel pump truck stop diesel receipt"),
    ("clearinghouse", "database server records archive"),
    ("csa score", "truck safety inspection clipboard mechanic"),
    ("violation", "truck brake wheel inspection mechanic hands"),
    ("audit", "accountant desk documents review office"),
    ("broker", "freight dispatch office computer logistics"),
    ("scaling", "large truck fleet parking lot aerial"),
    ("tms", "logistics software dashboard computer screen office"),
    ("eld", "truck dashboard electronic device cab"),
    ("mvr", "driving record document paperwork desk"),
    ("drug and alcohol", "laboratory sample testing clinical"),
    ("canada", "canadian highway trucking winter road"),
    ("new carrier", "small trucking business owner van"),
    ("maintenance", "truck mechanic workshop repair garage"),
    ("safety", "worker high visibility vest hard hat inspection"),
    ("compliance", "office documents filing organised desk"),
    ("fleet", "semi trucks parked fleet yard"),
    ("driver", "truck driver portrait cab professional"),
    ("truck", "semi truck highway transport"),
]

# Words that describe a feeling rather than a thing. A photo search for these returns stock
# clichés — handshakes, sunsets, arrows going up — so they are stripped before matching.
NOISE = {
    "best", "guide", "complete", "ultimate", "why", "what", "how", "your", "the", "and", "for",
    "with", "that", "this", "from", "actually", "really", "need", "needs", "biggest", "problems",
    "mistakes", "alternatives", "comparison", "honest", "wrong", "right", "better",
}


def query_for(title: str, description: str = "") -> str | None:
    """
    The photographic subject of a post, or None when it has none.

    Returning None is a real answer and the pipeline depends on it: a post about an abstract
    regulatory process should go to generation rather than to a search that will cheerfully
    return a truck at golden hour.
    """
    haystack = f"{title} {description}".lower()
    for phrase, subject in LEXICON:
        if phrase in haystack:
            return subject
    return None


def keywords(title: str) -> set[str]:
    """Content words from a title, for scoring how well a photo's own text matches it."""
    words = "".join(c if c.isalnum() or c.isspace() else " " for c in title.lower()).split()
    return {w for w in words if len(w) > 3 and w not in NOISE}
