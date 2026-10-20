import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-tools "N Issues" badge reads as a leaked error state — off (matches the
  // sibling violation-radar project).
  devIndicators: false,
  async redirects() {
    return [
      // "Book a demo" everywhere points at /demo; send it straight to the booking calendar
      // (same destination the live lp-fleetfalcon site uses).
      {
        source: "/demo",
        destination: "https://calendar.app.google/dgdaybcBiwWUDThQ6",
        permanent: false,
      },

      // --- Cutover redirects from the site this one replaces --------------------
      // Every path below is a real, INDEXED page on the current fleetfalcon.io (it is in
      // that site's sitemap.ts) that has no standalone route here — the modules became
      // sections of the home page. Without these, going live would 404 nine indexed URLs
      // and drop the inbound links and search ranking attached to them.
      //
      // 301 (permanent: true) on purpose: these moves are not temporary, and a permanent
      // redirect is what passes the existing link equity to the new location.
      //
      // The destinations are the real per-module anchors rendered on the home page
      // (see `slug(f.name)` in app/page.tsx), so each one still lands on that module's
      // own content rather than dumping everyone at the top of the page.
      { source: "/docpulse", destination: "/#docpulse", permanent: true },
      { source: "/driver-qualifications", destination: "/#driver-qualifications", permanent: true },
      { source: "/rapid-onboarding", destination: "/#rapid-onboarding", permanent: true },
      { source: "/incident-control", destination: "/#incident-control", permanent: true },
      { source: "/citation-watch", destination: "/#citation-watch", permanent: true },
      { source: "/carrier-profile", destination: "/#carrier-profile", permanent: true },
      { source: "/about", destination: "/#mission", permanent: true },
      { source: "/mission", destination: "/#mission", permanent: true },

      // Legacy internal routes on the old site, never in its sitemap — swept to home so
      // any stray bookmark still lands somewhere real.
      { source: "/home-old", destination: "/", permanent: true },
      { source: "/storybrand", destination: "/", permanent: true },

      // NOTE: /violation-radar and /english-testing are NOT redirected — they exist here
      // as real pages, so those URLs keep working unchanged. /contact is a real page too
      // (an indexed URL deserves a destination, not a redirect to a mailto: link).
    ];
  },
};

export default nextConfig;
