# Post header images

One image per blog post, chosen automatically from `app/content.ts`. Adding a post to that list
is the whole of what an author does — there is no second register to update. The previous
version kept a hardcoded dictionary of thirteen slugs and two published posts had already
drifted out of it.

```sh
python3 scripts/post-images.py --dry        # what each post would get
python3 scripts/post-images.py              # search and write
python3 scripts/post-images.py --generate   # fill the gaps (needs OPENROUTER_API_KEY)
python3 scripts/post-images.py --check      # exit 1 if any post has no image
```

Output: `app/post-images.ts` (the map the site reads, with licence and credit per entry) and
the files in `public/blog/`. Existing entries are never replaced without `--force`, so an image
somebody chose by hand stays chosen.

## Why generation is the main path, not the fallback

It was designed as a fallback. Measured against all fifteen posts, it is the only path.

Searching the keyless Creative Commons libraries — Openverse and Wikimedia Commons — produced
**nothing shippable for any post**. At a threshold loose enough to return something, the picks
were "Food Trucks" for improving a CSA score, "Filing Taxes - 1040 Form" for the J.J. Keller
comparison, and "My NYC cab driver" for the English-language proficiency rule. Raise the
threshold to require more than a single matched keyword and the yield is zero out of fifteen.

The reason is structural. Free commercially-licensed photography is dominated by US government
work, which is public domain by statute — search "truck mechanic" and you get BLM firetrucks, an
Army motor pool and a Marine Corps workshop. Everything else is archival scans and Flickr
holiday snapshots. Photography of DOT compliance as a subject does not exist for free, which is
the same wall the earlier Wikimedia pass hit when it put a FEMA supply depot on a vendor
comparison.

The search path is kept anyway: it costs nothing, it will occasionally find something genuinely
good, and it is the part that would start working if a paid library were added.

## Where the key comes from

`OPENROUTER_API_KEY` from the environment, then `.env.local`, then **AWS Secrets Manager** —
`/fleetfalcon/<env>/secrets`, key `openrouter`, the same blob `backend/Services/SecretsService.cs`
reads. Nothing needs copying into a second file. The AWS credentials come from the environment
(`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) or from the backend's own
`appsettings.Development.json`, found via `FLEETFALCON_BACKEND_CONFIG`.

Needs `pip install boto3` for that path. Without it the search half still runs.

## If you want real photographs

**Pexels and Pixabay both issue free API keys**, both permit commercial use with no attribution,
and both hold modern commercial stock rather than government archives. Either would likely move
the yield from zero to most posts. They are not wired up because they need a key and nobody has
decided to get one; `sources.py` takes a new provider in about twenty lines.
