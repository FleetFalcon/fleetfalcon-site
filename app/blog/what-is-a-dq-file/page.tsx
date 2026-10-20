import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "what-is-a-dq-file")!;
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
      name: "What regulation defines the DQ file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "49 CFR §391.51 lists the records a motor carrier must keep in each driver's qualification file. Related sections (§391.21, §391.23, §391.25, §391.27, §391.31, §391.43) define the individual records themselves.",
      },
    },
    {
      "@type": "Question",
      name: "Do non-CDL drivers need a DQ file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Any driver of a commercial motor vehicle subject to Part 391 needs a DQ file, CDL or not. The difference is scope: CDL-only requirements like FMCSA Clearinghouse queries and Part 382 drug-and-alcohol testing don't apply to non-CDL drivers.",
      },
    },
    {
      "@type": "Question",
      name: "How long must a DQ file be kept?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The qualification file must be retained for as long as the driver is employed and for three years afterward. Individual records like the annual MVR and the annual review of driving record are kept on a rolling basis while the driver is employed.",
      },
    },
    {
      "@type": "Question",
      name: "What are the most common DQ-file gaps in an audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Missing annual MVRs, an expired or absent medical examiner's certificate, no annual review of driving record, no PSP report, and incomplete previous-employer safety history — especially missing documentation of the three good-faith attempts to reach a prior employer.",
      },
    },
  ],
};

export default function DqFilePostPage() {
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
            · April 9, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            A Driver Qualification (DQ) file is the set of records a motor carrier must keep to prove
            a driver is legally qualified to operate a commercial motor vehicle. The contents are
            defined by 49 CFR §391.51, and the file must be kept for as long as the driver is
            employed plus three years after.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              The DQ file is the first thing an FMCSA investigator opens, and the first thing a
              plaintiff&apos;s attorney subpoenas after a crash. It isn&apos;t a formality — it&apos;s
              the paper trail that shows you did your due diligence before putting a driver behind the
              wheel. Here&apos;s everything that belongs in it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What §391.51 requires
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Section 391.51 is the master checklist. Each item below is its own record with its own
              rule:
            </p>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground-muted">
              <li>
                <strong className="font-semibold text-foreground">Employment application (§391.21)</strong>{" "}
                — the driver&apos;s completed application, including the three-year address and
                employment history and the ten-year CDL employment history.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Motor vehicle record (§391.23 / §391.25)</strong>{" "}
                — an MVR from each state that licensed the driver in the past three years, pulled at
                hire, then refreshed with a new MVR at least once a year.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Road test or equivalent (§391.31 / §391.33)</strong>{" "}
                — a road-test certificate, or an acceptable substitute such as a valid CDL or a prior
                road-test certificate.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Medical examiner&apos;s certificate (§391.43)</strong>{" "}
                — a current med card from a certified examiner, with verification against the National
                Registry of Certified Medical Examiners.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Clearinghouse query records</strong>{" "}
                — for CDL drivers, the pre-employment full query and subsequent limited queries from
                the FMCSA Drug &amp; Alcohol Clearinghouse.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Safety-performance history</strong>{" "}
                — PSP data plus the previous-employer safety history for the last three years, with{" "}
                <strong className="font-semibold text-foreground">three documented good-faith
                attempts</strong> to reach each prior employer when they don&apos;t respond.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Annual review &amp; list of violations (§391.25 / §391.27)</strong>{" "}
                — the carrier&apos;s annual review of the driving record, and the driver&apos;s annual
                certification/list of any moving violations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              CDL vs non-CDL drivers
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Both CDL and non-CDL drivers who operate CMVs under Part 391 need a DQ file — the core
              records are the same. The difference is scope: Clearinghouse queries and Part 382
              random drug-and-alcohol testing apply to CDL drivers only. A good system scopes those
              automatically so a non-CDL driver isn&apos;t flagged for a rule that doesn&apos;t apply
              — and so a CDL driver isn&apos;t missing one that does.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How long to keep it
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Keep the qualification file for the duration of employment plus three years after the
              driver leaves. Some records cycle while employed — the MVR and the annual review refresh
              yearly — but the file as a whole doesn&apos;t get thrown out the day someone quits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Why the gaps matter
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              A hole in the DQ file is both an audit finding and a liability exposure. In a New Entrant
              audit or a compliance review, missing records are written up directly. In a
              negligent-hiring lawsuit after a crash, the same gap becomes the plaintiff&apos;s
              exhibit — proof you didn&apos;t verify what the regulations required. The file is cheap
              to keep complete and expensive to have incomplete.
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
              FleetFalcon&apos;s <strong className="font-semibold text-foreground">Rapid
              Onboarding</strong> builds a complete §391 DQ file from a single link — capturing the
              application, consents, Clearinghouse and PSP authorizations, and running
              previous-employer checks with documented attempts.{" "}
              <strong className="font-semibold text-foreground">DocPulse</strong> then tracks every
              renewal — MVRs, medical cards, annual reviews — so the file stays complete for the whole
              employment-plus-three-years window instead of quietly developing holes.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
