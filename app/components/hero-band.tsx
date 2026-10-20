"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed cinematic brand band at the very top of the page.
 *
 * This is the BRAND moment — falcon flying beside the truck at sunrise — not the product
 * explainer. It sits above the conversion hero rather than replacing it: the headline, CTA and
 * proof bar below are what actually convert, and burying them under a full-viewport video is the
 * classic way to make a page feel grand and perform worse. So this band is deliberately short
 * (never more than ~60vh, and it shrinks on phones), and the hero stays visible right under it.
 *
 * Degrades honestly in both directions:
 *  - No video file yet? It renders the still, full-bleed, and looks deliberate — never an empty
 *    <video>, a dead play button or a "coming soon" card. `hasVideo` is computed on the server at
 *    build time (see page.tsx), so dropping `hero-falcon-truck.mp4` into /public upgrades this to
 *    motion with no code change.
 *  - Reduced motion? The still is kept and the video is never started, because this is decorative
 *    footage and nobody should have to watch a loop they asked the OS not to show them.
 */
export function HeroBand({ hasVideo }: { hasVideo: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Start from "still" and only move to video after mount: the server has no matchMedia, and
  // guessing wrong would flash motion at someone who asked for none.
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!hasVideo) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPlayVideo(!reduced.matches);
    apply();
    reduced.addEventListener("change", apply);
    return () => reduced.removeEventListener("change", apply);
  }, [hasVideo]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playVideo) {
      // Autoplay can still be refused (data saver, battery saver). The poster is the same still,
      // so a refusal looks identical to the no-video case rather than like a broken player.
      void el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [playVideo]);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-border bg-foreground"
      aria-label="FleetFalcon"
    >
      <div className="relative h-[42vh] min-h-[260px] w-full sm:h-[52vh] lg:h-[58vh] lg:max-h-[620px]">
        {playVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            // Poster is cut from this video's OWN first frame, not the separate falcon still:
            // the two are different compositions, so posting the still would snap to a visibly
            // different shot the moment playback starts.
            poster="/hero-falcon-poster.jpg"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          >
            {/* mp4 only. A VP9 webm of this footage encoded LARGER than the h264 (4.3MB vs
                2.0MB) — all the motion blur and foliage detail — so a <source> for it would
                just serve the heavier file to the browsers that prefer it. */}
            <source src="/hero-falcon-truck.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            // Same frame the video posts, so reduced-motion users see the identical shot
            // rather than a different one. Falls back to the original still only when there
            // is no video at all (hasVideo === false).
            src={hasVideo ? "/hero-falcon-poster.jpg" : "/hero-falcon-truck.png"}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden
          />
        )}

        {/* Scrim: the footage is bright at sunrise, so the line below needs its own contrast
            rather than relying on whatever frame happens to be showing. Anchored bottom-left,
            where the road is — it keeps the falcon and the truck clear. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8 sm:pb-10">
            <p className="max-w-2xl font-display text-2xl leading-tight text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
              Compliance that flies with you.
            </p>
            <p className="mt-2 max-w-xl text-sm font-medium text-white/80 sm:text-base">
              Every driver qualified. Every file audit-ready. Every mile.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
