import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "compliance-problems-scaling-fleets")!;
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

// FAQPage structured data (answer-engine optimization) — mirrors the visible FAQ below.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}/#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "At what fleet size do you need dedicated compliance software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no single number — it's the point where manual tracking starts to slip, usually when one person can no longer hold every expiration, DQ file, and inspection in their head or in one spreadsheet. For many carriers that pressure shows up somewhere between a dozen and a few dozen trucks.",
      },
    },
    {
      "@type": "Question",
      name: "Why do DQ files degrade as a fleet grows?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Faster hiring means more files created under time pressure, and more drivers means more renewals to chase. Without a system, incomplete files and missed annual MVRs or reviews accumulate quietly — and the exposure compounds with headcount.",
      },
    },
    {
      "@type": "Question",
      name: "Does adding trucks hurt my CSA score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "More trucks means more roadside exposure, so more inspections and more chances for violations — but also more chances to bank clean inspections. What hurts you is unmanaged patterns: repeat-offender drivers and units whose violations pile into a BASIC faster than you notice.",
      },
    },
    {
      "@type": "Question",
      name: "What is a single source of truth for compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's one system where every driver, asset, document, inspection, and corrective action lives together and reconciles — so an audit, broker, or insurer request is a query, not a scramble across a TMS, an ELD portal, a spreadsheet, and a filing cabinet.",
      },
    },
  ],
};

export default function ScalingFleetsPostPage() {
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
            · September 25, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            As a fleet scales, compliance stops being something one person tracks in their head and
            becomes a systems problem. The failures that recur are process that doesn&apos;t scale,
            visibility gaps across more drivers and assets, and fragmented tools that don&apos;t
            reconcile with each other.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              At ten trucks, a sharp safety manager and a good spreadsheet can keep a fleet compliant.
              By fifty — and certainly by eighty or a hundred — the same approach quietly breaks, not
              because anyone got worse at the job, but because the job changed shape. Here are the
              failures that compound as you grow, and how to get ahead of them before they bite.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What worked at 10 trucks breaks at 50, 80, 100
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Manual tracking has a ceiling. One spreadsheet and a calendar reminder work when you can
              picture every driver; past a certain size you can&apos;t, and expirations start slipping
              through. The failure isn&apos;t dramatic — it&apos;s a med card that lapsed three weeks
              ago that nobody caught until the driver got pulled into a scale.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Hiring velocity vs onboarding compliance
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Growth means hiring faster, and fast hiring is where DQ files get rushed. A missing MVR
              here, an un-run Clearinghouse query there, a previous-employer check nobody finished — each
              feels minor in the moment. But negligent-hiring and audit risk scale with headcount: more
              drivers hired quickly means more files with holes, and more holes to be found.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              More trucks, more roadside exposure, more CSA volatility
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Every additional truck is additional roadside exposure. More inspections can mean more
              clean ones — good for your percentiles — but also more violations, and a few repeat-offender
              drivers or units can drag a BASIC down fast. At scale, the patterns that matter get harder
              to spot by eyeballing, precisely when they matter most.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Tool sprawl
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Growing fleets accumulate systems — a TMS for operations, an ELD for hours, a maintenance
              platform, a training vendor. Each is good at its job and none of them reconcile. Compliance
              data ends up scattered across four logins, and the gaps live in the seams where no single
              tool is responsible for the whole picture.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              No single source of truth
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              When the data is scattered, every outside request becomes a fire drill. An audit, a
              broker&apos;s carrier-vetting check, an insurer&apos;s underwriting review — each one sends
              someone digging through spreadsheets and portals to assemble an answer that should have been
              one query. A single source of truth turns those scrambles into a lookup.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Growth attracts scrutiny
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Getting bigger makes you more visible. More trucks draw more inspections; more revenue draws
              closer insurance underwriting; more freight draws broker vetting. Thresholds you cleared
              comfortably as a small carrier start to bite when the volume — and the attention — goes up.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Keeping the safety culture as you grow
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The hardest thing to scale isn&apos;t paperwork — it&apos;s culture. The coaching habit and
              the &ldquo;we do it right&rdquo; instinct that come naturally in a small shop dilute as you
              add drivers and managers, unless you systematize them into repeatable, documented process.
              Otherwise safety becomes something that used to happen.
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
              FleetFalcon moves the compliance system out of one person&apos;s head and into one record
              across every driver and asset. <strong className="font-semibold text-foreground">Rapid
              Onboarding</strong> keeps DQ files complete even at hiring velocity,{" "}
              <strong className="font-semibold text-foreground">DocPulse</strong> tracks every expiration
              so nothing slips, and <strong className="font-semibold text-foreground">Violation Radar</strong>{" "}
              surfaces the repeat-offender patterns before they tank a BASIC. It integrates with the TMS
              and ELD you added as you grew — no rip-and-replace — so the single source of truth scales
              with the fleet.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
