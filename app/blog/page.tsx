import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "../content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "FleetFalcon's blog — honest takes on DOT compliance, FMCSA rules, CSA scores, and how the fleet-compliance tooling landscape actually compares.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-eyebrow text-accent">Blog</p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Notes on staying audit-ready
        </h1>
        <p className="measure mt-5 text-lg leading-relaxed text-foreground-muted">
          Plain-English writing on DOT compliance, FMCSA rules, CSA scores, and the tools fleets
          actually use.
        </p>

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-6 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-3">
                  <time className="text-eyebrow text-foreground-faint" dateTime={post.published}>
                    {formatDate(post.published)}
                  </time>
                  <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
                </div>
                <h2 className="font-display mt-3 text-2xl font-semibold leading-snug text-foreground">
                  {post.title}
                </h2>
                <p className="measure mt-2 text-[15px] leading-relaxed text-foreground-muted">
                  {post.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read the post
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
