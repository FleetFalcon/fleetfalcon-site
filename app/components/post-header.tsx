import Image from "next/image";

import { postImages } from "../post-images";

/**
 * Header images come from `app/post-images.ts`, which `scripts/post-images.py` writes.
 *
 * This used to be a hand-maintained table of seven Wikimedia photographs shared across thirteen
 * posts — `highway` and `truck-cab` and `warehouse` each heading two articles, and a FEMA supply
 * depot on a vendor comparison. The generated manifest carries one image per post plus the
 * licence each one needs, so a new article gets a header by being added to `content.ts` and
 * nothing else.
 */

/**
 * The image at the top of a blog post.
 *
 * Two kinds, and the choice is deliberate rather than decorative. Where a real product screenshot
 * genuinely illustrates the subject, we use it — a post about what a green CSA score hides should
 * show the screen that surfaces what it hides. Everywhere else we draw an on-brand motif rather
 * than reaching for stock photography, because a stock photo of a truck at golden hour says nothing
 * about DataQs and every compliance vendor's blog already has one.
 *
 * The motifs are flat SVG in the site's own palette — a single red held for the thing that matters
 * in each drawing, neutrals for everything else — so they read as part of the product rather than
 * as clip art, and they cost no network request.
 */
export function PostHeader({
  slug,
  image,
  alt,
}: {
  /** The post, used to find its header image in the generated manifest. */
  slug?: string;
  /**
   * A real product screenshot, where one genuinely illustrates the subject.
   *
   * Takes priority over the manifest on purpose: a post about what a green CSA score hides
   * should show the screen that surfaces what it hides, and no photograph beats that.
   */
  image?: string;
  alt?: string;
}) {
  if (image) {
    return (
      <div className="relative mt-8 aspect-[16/7] w-full overflow-hidden rounded-xl border border-border bg-surface-2">
        <Image src={image} alt={alt ?? ""} fill sizes="(max-width: 768px) 100vw, 720px"
               className="object-cover object-top" priority />
      </div>
    );
  }

  const entry = slug ? postImages[slug] : undefined;
  if (entry) {
    return (
      <figure className="mt-8">
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl border border-border bg-surface-2">
          <Image
            src={entry.file}
            alt={alt ?? entry.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>
        {/* Credit where the licence requires it, and a quiet note where the image is not a
            photograph — a reader is entitled to know which is which. */}
        {entry.attribute ? (
          <figcaption className="mt-2 text-xs text-foreground-faint">
            Photo:{" "}
            <a href={entry.source} className="underline" rel="noopener nofollow">
              {entry.artist}
            </a>{" "}
            · {entry.license}
          </figcaption>
        ) : entry.origin === "generated" ? (
          <figcaption className="mt-2 text-xs text-foreground-faint">Illustration</figcaption>
        ) : null}
      </figure>
    );
  }

  // Every post has either a product screenshot or an entry in the manifest, and
  // `npm run images:check` fails the build if one does not. Reaching here means the manifest
  // and the pages disagree, which is worth seeing in development rather than papering over
  // with decoration.
  if (process.env.NODE_ENV !== "production") {
    throw new Error(
      `PostHeader: no image for ${slug ?? "(no slug passed)"}. ` +
      "Run `npm run images` to generate one, or pass `image` for a product screenshot.",
    );
  }
  return null;
}
