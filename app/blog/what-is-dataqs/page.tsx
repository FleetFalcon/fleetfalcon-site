import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "what-is-dataqs")!;
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
      name: "What is a Request for Data Review (RDR)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An RDR is the challenge you file in FMCSA's DataQs system asking for a specific inspection, violation, or crash record to be reviewed. It's routed to the agency that issued the record, which adjudicates and can correct or remove it.",
      },
    },
    {
      "@type": "Question",
      name: "Does a dismissed ticket automatically remove the CSA violation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A citation and a roadside violation are separate records. Even if a court dismisses or reduces the ticket, the inspection violation stays on your CSA record until you file a DataQs RDR with proof of the adjudication.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a DataQs challenge take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies by the issuing state or jurisdiction — some respond in a couple of weeks, others take longer. Outcomes aren't guaranteed; clear factual errors with documentation tend to resolve fastest.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a crash removed from my record?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only certain crash types are eligible under FMCSA's Crash Preventability Determination Program (CPDP). If a crash qualifies and is found not preventable, it's noted as such in your SMS profile rather than counting against you the same way.",
      },
    },
  ],
};

export default function DataQsPostPage() {
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
            · June 11, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader motif="stamp" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            DataQs is FMCSA&apos;s online system for filing a Request for Data Review (RDR) to
            challenge inaccurate inspection, violation, and crash records that feed your CSA scores.
            If a record is wrong, DataQs is how you get it corrected or removed.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              FMCSA&apos;s data is frequently wrong, and wrong data drags down real carriers&apos;
              scores. DataQs is the official channel to fix it — but it rewards carriers who know what&apos;s
              challengeable and which fights are worth the effort.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">How DataQs works</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              You file an RDR through the DataQs portal, attach your evidence, and the request is
              <em> routed to the state or jurisdiction that issued the record</em> — not to FMCSA
              headquarters. That issuing agency reviews it and decides whether to uphold, correct, or
              remove the record. Because the adjudicator is the original issuer, who issued the citation
              matters as much as what you file.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What you can challenge
            </h2>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-foreground-muted">
              <li>• A violation or inspection attributed to the <strong className="font-semibold text-foreground">wrong carrier or wrong driver</strong>.</li>
              <li>• <strong className="font-semibold text-foreground">Duplicate</strong> records of the same inspection.</li>
              <li>• <strong className="font-semibold text-foreground">Factual errors</strong> — a miscoded violation, wrong VIN, incorrect date or weight.</li>
              <li>• A citation that was later <strong className="font-semibold text-foreground">dismissed or reduced</strong> in court (with the disposition as evidence).</li>
              <li>• A crash that qualifies as <strong className="font-semibold text-foreground">not preventable</strong> under the Crash Preventability Determination Program (CPDP).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Evidence and realistic outcomes
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The stronger and more objective your evidence — a court disposition, a photo, a document
              that contradicts the record — the better your odds. Timelines vary by jurisdiction, and you
              won&apos;t win every challenge; some states are stricter than others. Treat it as a process
              with a hit rate, not a guaranteed delete button.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              ROI-rank which ones to fight
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              You have limited time, so fight the records that move the needle. Rank candidates by{" "}
              <strong className="font-semibold text-foreground">time-weight</strong> (recent violations
              count 3× in their first six months) and <strong className="font-semibold text-foreground">severity</strong>,
              and prioritize a BASIC where you&apos;re near an intervention threshold. Removing one recent,
              high-severity violation can do more than clearing three old, low-weight ones.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Two important caveats</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              First: a dismissed ticket does <em>not</em> automatically remove the CSA violation — the
              citation and the inspection violation are separate records, and you still have to file the
              RDR. Second: only certain crash types are CPDP-eligible, so not every crash you feel was
              &ldquo;not your fault&rdquo; can be removed through that program.
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
              reads your inspections, flags the violations that look DataQs-eligible — wrong-carrier
              attributions, duplicates, citations you reported as dismissed — and ROI-ranks the disputes
              by time-weight and severity, so you spend your challenge effort where it actually moves a
              BASIC.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
