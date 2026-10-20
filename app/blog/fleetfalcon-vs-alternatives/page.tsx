import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { ComparisonTable } from "../../components/comparison-table";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "fleetfalcon-vs-alternatives")!;
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
      name: "Is FleetFalcon an ELD?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. FleetFalcon is a compliance platform, not an ELD. It integrates with the ELDs you already run — Motive, Samsara, Geotab — and reconciles the safety events they produce into your compliance record rather than replacing the hardware.",
      },
    },
    {
      "@type": "Question",
      name: "Does FleetFalcon replace my TMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. It sits alongside your transportation management system. The TMS runs operations like dispatch and billing; FleetFalcon adds the DOT-compliance layer — DQ files, onboarding, inspections, citations, and CSA — that a TMS isn't built for.",
      },
    },
    {
      "@type": "Question",
      name: "How is FleetFalcon different from SambaSafety?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SambaSafety specializes in continuous MVR and driver-risk monitoring. FleetFalcon is a full compliance system — DQ files, driver onboarding, roadside inspections, incidents, citations, and CSA monitoring — covering the whole program rather than one specialty.",
      },
    },
    {
      "@type": "Question",
      name: "Does FleetFalcon do MVR monitoring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Partially, and it's an area we continue to build out — continuous MVR monitoring is where SambaSafety is deeper today. If ongoing license monitoring is your single top priority, that's their specialty; if you want it as part of an all-in-one compliance system, that's ours.",
      },
    },
  ],
};

export default function ComparisonPostPage() {
  return (
    <article>
      <JsonLd data={[articleSchema, faqSchema]} />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Header */}
        <p className="text-eyebrow text-accent">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          · Comparison
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-eyebrow text-foreground-faint">{post.author}</span>
          <time className="text-eyebrow text-foreground-faint" dateTime={post.published}>
            · October 3, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader photo="highway"
                    alt="The road every DOT-compliance vendor claims to keep you legal on" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            FleetFalcon competes with four kinds of DOT-compliance tools — the legacy incumbent
            (J.J. Keller), the MVR-monitoring leader (SambaSafety), the compliance-services firm
            (Foley), and the ELD vendor (Motive). Each is strong in its lane; FleetFalcon&apos;s edge
            is all-in-one compliance with modern self-serve UX, AI, and integrations.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              If you run a trucking fleet, the software that keeps you DOT-compliant is spread across
              a fragmented market. There are driver-risk <em>monitoring</em> tools, ELD and
              telematics vendors, compliance-<em>services</em> firms that do the paperwork for you,
              and one legacy incumbent that tries to do a bit of everything. Most fleets end up
              stitching two or three of them together.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
              FleetFalcon sits in a different spot: the all-in-one compliance{" "}
              <strong className="font-semibold text-foreground">system of record</strong> for small
              and mid-size fleets. Documents, driver qualification files, onboarding, roadside
              inspections, incidents, and citations live in one place, with AI doing the repetitive
              reading and filing. Below is an honest look at the main alternatives — including the
              places where a competitor genuinely does something better than we do.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              J.J. Keller (Encompass)
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The incumbent, and the one with the deepest regulatory pedigree — J.J. Keller has
              written the book on DOT compliance for decades. Encompass is comprehensive, covering
              compliance recordkeeping and ELD, and few vendors match its regulatory depth. The
              trade-offs are that it&apos;s enterprise-oriented, the interface feels dated, pricing is
              à-la-carte and quote-based, and it&apos;s a heavier lift to adopt than a modern
              self-serve platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">SambaSafety</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              SambaSafety is the leader in continuous MVR and driver-risk monitoring, and it&apos;s
              genuinely best-in-class there — if ongoing license and violation monitoring is your top
              priority, they do it better than we do. But it&apos;s a monitoring point-solution: it
              isn&apos;t building your DQ files, running driver onboarding, or managing incidents and
              citations. Pricing is per-driver plus state fees, and there&apos;s no self-serve signup.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Foley</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Foley combines DOT compliance with background and MVR services, and has solid driver
              qualification support. The difference is the model: Foley is largely a
              services/outsourcing firm rather than a modern self-serve software platform — you lean
              on their team to run things — and pricing is quote-based. That suits some fleets and
              frustrates others who&apos;d rather drive the software themselves.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Motive (ex-KeepTruckin)
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Motive is a telematics and ELD leader with a growing set of safety add-ons, and the
              hardware is excellent. Compliance recordkeeping — DQ files, documents, onboarding,
              citations — is secondary to the telematics core, though. Importantly, FleetFalcon{" "}
              <strong className="font-semibold text-foreground">integrates</strong> with ELDs
              (Samsara, Motive, Geotab); we don&apos;t replace your hardware, we reconcile the safety
              events it produces into your compliance record.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Side-by-side comparison
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Here&apos;s how the capabilities line up. We&apos;ve kept the rows where a competitor
              wins, on purpose — a comparison you can&apos;t lose isn&apos;t worth reading.
            </p>
            <div className="mt-6">
              <ComparisonTable />
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Where FleetFalcon wins — and where it doesn&apos;t
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Let&apos;s be straight about it. We are{" "}
              <strong className="font-semibold text-foreground">not</strong> an MVR-monitoring
              specialist like SambaSafety, and we&apos;re{" "}
              <strong className="font-semibold text-foreground">not</strong> an ELD hardware vendor
              like Motive. If either of those is the single thing you care about most, those are the
              specialists.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
              Where FleetFalcon wins is breadth plus modernity: one all-in-one, AI-driven compliance
              system that covers documents, DQ files, onboarding, roadside inspections, incidents and
              citations together — with a modern self-serve experience, flat transparent pricing from{" "}
              <strong className="font-semibold text-foreground">$99/month</strong> (not per-driver,
              not quote-only), and a free month to try it on your own fleet&apos;s data. For a small
              or mid-size carrier that wants its whole compliance program in one place without an
              enterprise rollout, that combination is hard to match.
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

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
