import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "green-csa-score-hiding-violations")!;
const BASE_URL = "https://www.fleetfalcon.io";
const URL = `${BASE_URL}/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    url: URL,
    publishedTime: post.published,
    authors: [post.author],
  },
};

// BlogPosting / Article structured data for this post.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${URL}/#article`,
  headline: post.title,
  description: post.description,
  datePublished: post.published,
  dateModified: post.published,
  author: { "@type": "Organization", name: post.author, url: BASE_URL },
  publisher: { "@id": `${BASE_URL}/#organization` },
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  inLanguage: "en-US",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "What does a “green” BASIC actually mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means that BASIC's percentile is below FMCSA's intervention threshold relative to your peer group. It is a ranking against similar carriers, not a statement that your fleet is free of serious violations.",
      },
    },
    {
      "@type": "Question",
      name: "If my scores are under threshold, am I safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Percentiles are averages across your inspections, so a small number of severe or indefensible violations can be diluted by otherwise clean inspections and never push a BASIC over threshold.",
      },
    },
    {
      "@type": "Question",
      name: "Why don't some serious violations move my score much?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A single event — a no-CDL stop, a falsified log, one unit's repeat brake OOS — is one data point among many. The percentile math can absorb it, even though that violation is exactly what an auditor, insurer, or plaintiff would focus on.",
      },
    },
    {
      "@type": "Question",
      name: "Why do score-mirroring tools miss these?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tools that just re-display your BASIC percentiles inherit the same blind spot: if the number is green, they show green. They don't rank by severity or legal defensibility, so the dangerous individual violations stay buried.",
      },
    },
  ],
};

export default function GreenScorePostPage() {
  return (
    <article>
      <JsonLd data={[articleSchema, faqSchema]} />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Header */}
        <p className="text-eyebrow text-accent">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          · Guide
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-eyebrow text-foreground-faint">{post.author}</span>
          <time className="text-eyebrow text-foreground-faint" dateTime={post.published}>
            · May 7, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader image="/screenshots/violation-radar-pulse.png"
                    alt="Violation Radar's feed, ranking a fleet's violations by severity rather than by date" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            A BASIC can sit comfortably under threshold — &ldquo;green&rdquo; — while still hiding
            dangerous violations. The CSA score is a relative percentile ranking you against peer
            carriers, not a measure of your worst or least-defensible events, so serious individual
            violations can get averaged into invisibility.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              A green dashboard feels like permission to relax. But &ldquo;under threshold&rdquo; and
              &ldquo;safe&rdquo; are not the same claim, and the difference is exactly where the risk a
              carrier should care about tends to live.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How percentiles actually work
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Each BASIC ranks you as a percentile against a peer group of carriers with a similar
              number of inspections. It&apos;s a measurement of relative position, aggregated across
              all your inspections and time-weighted. Because it&apos;s an average against peers, a
              fleet with lots of clean inspections can carry a few bad ones and still land under the
              intervention threshold. Under threshold means &ldquo;not currently flagged for
              intervention&rdquo; — not &ldquo;no serious problems.&rdquo;
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Violations a green score can swallow
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Consider three real examples that may never push a BASIC over threshold on their own:
            </p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground-muted">
              <li>
                <strong className="font-semibold text-foreground">A driver operating without a valid CDL</strong>{" "}
                — suspended, expired, or wrong class. Indefensible in a courtroom, but a single
                inspection among hundreds.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Log falsification (§395.8(e))</strong>{" "}
                — a driver falsifying a record of duty status. One of the hardest violations to defend,
                yet statistically just one more data point.
              </li>
              <li>
                <strong className="font-semibold text-foreground">A unit with repeat brake out-of-service</strong>{" "}
                — the same trailer flagged OOS for brakes more than once. A pattern that screams
                negligence, buried in a Vehicle Maintenance percentile that still reads green.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Severity and defensibility vs percentile
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The percentile answers &ldquo;how do I rank?&rdquo; It does not answer &ldquo;which of my
              violations would end me in a deposition?&rdquo; Those are different questions. The ones
              that matter for a lawsuit or an insurance renewal are the high-severity, low-defensibility
              events — and they need to be surfaced by severity, not by whether the aggregate number
              crossed a line.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Why score-mirroring tools miss them
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              A lot of &ldquo;CSA monitoring&rdquo; just re-displays your public BASIC percentiles with a
              nicer chart. If the number is green, the tool is green — it inherits the exact blind spot
              the percentile has. To catch the no-CDL stop or the repeat OOS unit, you have to look at the
              individual violations and rank them by severity and defensibility, not by color.
            </p>
          </section>

          {/* FAQ (AEO) */}
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-6">
              {faqSchema.mainEntity.map((qa) => (
                <div key={qa.name}>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{qa.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">
                    {qa.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How FleetFalcon helps */}
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How FleetFalcon helps
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              FleetFalcon&apos;s <strong className="font-semibold text-foreground">Violation Radar</strong>{" "}
              doesn&apos;t just mirror your percentile. It pulls your inspections into Events and surfaces
              the high-severity, indefensible violations a &ldquo;green&rdquo; score hides — the no-CDL
              stop, the falsified log, the repeat out-of-service unit — ranked by how much they actually
              put you at risk, so you fix the dangerous thing instead of trusting the color.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
