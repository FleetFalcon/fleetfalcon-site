import { MetadataRoute } from "next";

const baseUrl = "https://www.fleetfalcon.io";

// Public, indexable routes only. /demo is a redirect (see next.config). Mostly a single
// scrolling page plus pricing/legal routes; the two products with their own funnels
// (Violation Radar, English testing) have real pages because they convert differently.
const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "pricing", priority: 0.9, changeFrequency: "monthly" },
  // Product pages with their own conversion flows (free safety check / per-test signup),
  // so they are real indexable destinations rather than home-page anchors.
  { path: "violation-radar", priority: 0.9, changeFrequency: "monthly" },
  { path: "english-testing", priority: 0.9, changeFrequency: "monthly" },
  // Indexed on the site this replaces, so it keeps a real route (see next.config redirects).
  { path: "contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "blog/fleetfalcon-vs-alternatives", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/human-in-the-loop-compliance-ai", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/compliance-problems-scaling-fleets", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/how-to-improve-your-csa-score", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/jj-keller-encompass-alternatives", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/new-carrier-compliance-mistakes", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/elp-rule-out-of-service", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/safety-and-compliance-overlap", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/dot-compliance-canada-cvor-nsc", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/negligent-hiring-dq-file-defense", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/what-is-dataqs", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/how-brokers-use-your-csa-score", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/green-csa-score-hiding-violations", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/can-your-tms-handle-dot-compliance", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog/what-is-a-dq-file", priority: 0.7, changeFrequency: "monthly" },
  { path: "terms", priority: 0.4, changeFrequency: "yearly" },
  { path: "privacy", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: route.path ? `${baseUrl}/${route.path}` : baseUrl,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
