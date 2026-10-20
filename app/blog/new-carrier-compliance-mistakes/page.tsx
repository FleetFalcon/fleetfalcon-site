import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "new-carrier-compliance-mistakes")!;
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
      name: "What is the New Entrant Safety Audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's the FMCSA safety audit every new carrier must pass during its first period of operation — generally within roughly the first 12 months. It reviews your safety management controls and records, and failing it puts your new-entrant authority at risk.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a written safety program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FMCSA expects documented safety policies — hours-of-service, drug and alcohol, vehicle maintenance, accident procedures — not just practices kept in your head. In an audit, an undocumented program is treated as no program.",
      },
    },
    {
      "@type": "Question",
      name: "Are Clearinghouse queries required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, for CDL drivers. You owe a pre-employment full Drug & Alcohol Clearinghouse query before a driver operates, and an annual limited query every year thereafter — plus enrollment in a random testing consortium under Part 382.",
      },
    },
    {
      "@type": "Question",
      name: "How long must I keep compliance records?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Driver qualification files are kept for the duration of employment plus three years after. Drug-and-alcohol testing records follow the retention periods set out in Part 40. Keeping records too briefly is itself a common audit finding.",
      },
    },
  ],
};

export default function NewCarrierMistakesPostPage() {
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
            · August 21, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader motif="checklist" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            The most common compliance mistakes new carriers make are operating without a written
            safety policy, keeping incomplete DQ files, skipping Drug &amp; Alcohol Clearinghouse
            queries, and letting credentials lapse — any of which can sink a New Entrant Safety
            Audit.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              Getting your authority is the easy part. Staying compliant is where new carriers
              stumble — usually not from bad intent, but from not knowing what the regulations
              actually expect in writing. The stakes are real: a failed New Entrant Safety Audit,
              out-of-service orders, revoked authority, and in a crash, negligent-hiring exposure
              that reaches the owner personally. Here are the mistakes we see most, and how to avoid
              each one.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              1. No written safety policy or program
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              FMCSA expects documented safety policies — hours-of-service, drug and alcohol, vehicle
              maintenance, accident procedures. Many new carriers have the practices in their heads
              and nothing on paper. When the auditor asks to see the program, &ldquo;we just know how
              we do things&rdquo; isn&apos;t an answer. Write it down before you need it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              2. A policy you don&apos;t follow — or can&apos;t prove you follow
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              A binder on a shelf with no training records, no signed driver acknowledgments, and no
              corrective-action history is almost worse than having nothing. In a negligent-hiring
              lawsuit, an unenforced policy becomes evidence against you: it shows you knew the
              standard and didn&apos;t hold to it. Enforcement has to be documented — who was
              trained, who signed, what you did when something went wrong.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              3. DQ files with holes
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The driver qualification file is the first thing an audit opens, and it&apos;s where
              gaps hide: a missing MVR, an expired or absent medical certificate, no annual review of
              driving record, no PSP report, no previous-employer safety history. That last one trips
              up everyone — you must make and document{" "}
              <strong className="font-semibold text-foreground">three good-faith attempts</strong> to
              reach each prior employer from the last three years, and keep the record of those
              attempts even when nobody calls back.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              4. Skipping Clearinghouse and drug &amp; alcohol testing
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              For CDL drivers you owe a pre-employment{" "}
              <strong className="font-semibold text-foreground">full Clearinghouse query</strong> and
              an <strong className="font-semibold text-foreground">annual limited query</strong>{" "}
              thereafter — and you must be enrolled in a random drug-and-alcohol testing consortium
              under Part 382 before a driver ever turns a wheel. New carriers routinely forget the
              annual query or delay consortium enrollment, and both are standard audit findings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              5. Letting credentials quietly expire
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Medical cards, CDLs, UCR registration, IRP and IFTA, and the biennial{" "}
              <strong className="font-semibold text-foreground">MCS-150 update</strong> all lapse on
              their own schedules, and nobody sends you a reminder. An expired med card can ground a
              driver on the spot; a missed MCS-150 can deactivate your authority. Without a system
              watching dates, expirations are a matter of when, not if.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              6. Ignoring CSA from day one
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              New carriers often assume CSA is a &ldquo;later&rdquo; problem. It isn&apos;t —
              violations compound through time-weighting, and a small fleet&apos;s percentiles move
              fast because they&apos;re measured against few inspections. Start watching your BASICs
              with your first inspection, not after your first bad one.
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
              Onboarding</strong> builds a complete §391 DQ file from a single link — capturing
              Clearinghouse and PSP consent and running the previous-employer reference checks with
              documented attempts. <strong className="font-semibold text-foreground">DocPulse</strong>{" "}
              tracks every expiration (med cards, CDLs, UCR, IRP/IFTA, the MCS-150 cycle) and chases
              them before they lapse. The safety-policy tooling records acknowledgments and
              enforcement so your program is provable, and CSA monitoring starts on day one — so your
              first audit finds a complete file, not a pile of holes.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
