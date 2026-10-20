"use client";

import { useEffect } from "react";

/**
 * Reliable #hash scrolling. Next's App Router scroll handling is flaky for same-page anchors,
 * and images/fonts settling after first paint shift the target's position — so a one-shot
 * browser scroll lands in the wrong place. This re-scrolls to the target a few times as the
 * layout settles, and on every hash change. Honors reduced-motion (instant, not smooth).
 */
export function HashScroll() {
  useEffect(() => {
    // Stop the browser/Next from restoring scroll to the top and fighting our hash scroll.
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const scrollToHash = (smooth: boolean) => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ block: "start", behavior: smooth && !prefersReduced ? "smooth" : "auto" });
    };

    // On load, re-correct as images/fonts settle (reserved aspect-ratios keep this cheap).
    const timers = [0, 120, 400, 800].map((ms) =>
      window.setTimeout(() => scrollToHash(false), ms)
    );

    // User clicks a hash link while already on the page → smooth-scroll to it.
    const onHashChange = () => scrollToHash(true);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
