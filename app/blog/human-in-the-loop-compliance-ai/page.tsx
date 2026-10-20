import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "human-in-the-loop-compliance-ai")!;
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
      name: "Can AI handle DOT compliance on its own?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI can run the repetitive work — reading documents, tracking expirations, flagging issues — but the decisions with legal and safety consequences need a human. An algorithm can't hold a CDL, testify, or be the party that exercised due diligence.",
      },
    },
    {
      "@type": "Question",
      name: "Who is liable if compliance software makes a mistake?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The carrier is. FMCSA and the courts hold the motor carrier and its officers accountable, not the software vendor or the algorithm. That's exactly why consequential decisions should route through a human who approves them.",
      },
    },
    {
      "@type": "Question",
      name: "Which compliance decisions should a human make?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The judgment calls: whether to fight or pay a citation, whether to pull a driver off dispatch, which DataQs disputes to file, and how to handle a borderline medical certificate. These need context and accountability, not blind automation.",
      },
    },
    {
      "@type": "Question",
      name: "Does FleetFalcon use AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — to run the repetitive 90%: reading and filing documents, parsing inspections and citations, and surfacing the decisions that matter. A human approves the consequential 10%, and every decision is logged with who decided and when.",
      },
    },
  ],
};

export default function HumanInTheLoopPostPage() {
  return (
    <article>
      <JsonLd data={[articleSchema, faqSchema]} />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Header */}
        <p className="text-eyebrow text-accent">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          · Perspective
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-eyebrow text-foreground-faint">{post.author}</span>
          <time className="text-eyebrow text-foreground-faint" dateTime={post.published}>
            · October 1, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            AI can run the repetitive 90% of compliance, but the decisions with legal and safety
            consequences — which violation to fight, whether to pull a driver, what you&apos;ll tell a
            plaintiff&apos;s lawyer — need a human. An AI agent won&apos;t sit for your deposition or
            carry your liability.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              &ldquo;An AI agent runs your back office&rdquo; is a great pitch for scheduling emails. It&apos;s
              the wrong model for compliance, where a wrong automated decision isn&apos;t a typo — it&apos;s
              an out-of-service order, a fine, or a lawsuit. The useful question isn&apos;t whether to use AI;
              it&apos;s where the human has to stay.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The carrier is accountable, not the algorithm
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              FMCSA and the courts hold the motor carrier — and often its officers personally —
              responsible for compliance. An AI can&apos;t hold a CDL, can&apos;t testify, and can&apos;t be
              the party that &ldquo;exercised due diligence&rdquo; in front of an auditor or a jury.
              Accountability doesn&apos;t transfer to software, so the final say can&apos;t either.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Compliance is full of judgment calls
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The consequential work is rarely mechanical. Do you fight or drop a DataQs dispute? Do you
              pull a driver off dispatch today? Is a borderline medical certificate good enough to run on?
              Do you fight or pay a citation? Each depends on context and carries accountability — exactly
              the kind of decision you don&apos;t hand to blind automation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              AI makes mistakes — and here the stakes are real
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Every automated system gets things wrong sometimes. In most software a wrong guess is a minor
              annoyance. In compliance, a wrong auto-decision can mean a driver stranded out of service, a
              preventable fine, or a hole in your defense when a lawsuit comes. The consequential calls need
              a human to approve them before they happen, not an apology after.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Auditability: who decided, not just what
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              When an auditor or a plaintiff&apos;s attorney asks &ldquo;who made this decision?&rdquo; the
              answer has to be a person, with a record — not a black box that can&apos;t explain itself. A
              decision trail that names a human and a timestamp is part of your defense; an opaque automated
              action is a liability waiting to be cross-examined.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The right model: AI runs the 90%, humans own the 10%
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The model that works isn&apos;t &ldquo;automate everything&rdquo; or &ldquo;do it all by
              hand&rdquo; — it&apos;s a division of labor. Let AI run the repetitive 90%: reading documents,
              tracking expirations, parsing inspections, surfacing what needs attention. Keep the human on the
              10% of decisions that carry legal and safety weight. And document all of it, so the record shows
              both the work and the judgment.
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
              FleetFalcon keeps the human in the loop by design. The software runs the repetitive 90% and
              surfaces the decisions that matter — but <strong className="font-semibold text-foreground">you</strong>{" "}
              approve the corrective actions, the fight-or-pay calls, and the pull-a-driver calls. Every
              decision is logged with who made it and when, so when a lawyer or an auditor asks &ldquo;who
              decided this?&rdquo; the answer is a person, with a record.
            </p>
            <p className="mt-5 text-[15px] font-semibold text-foreground">
              The calls FleetFalcon routes to you — never the model:
            </p>
            <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-foreground-muted">
              <li>— Approve or edit a corrective action before it&apos;s issued</li>
              <li>— Fight or pay a citation</li>
              <li>— Pull a driver off dispatch, or clear them to roll</li>
              <li>— File or drop a DataQs dispute</li>
              <li>— Accept a borderline medical certificate, or send the driver back</li>
            </ul>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
              And what an auditor or a plaintiff&apos;s attorney sees isn&apos;t a black box — it&apos;s a
              decision log: the action, the person who approved it, the timestamp, and the record behind
              it.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
