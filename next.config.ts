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
    ];
  },
};

export default nextConfig;
