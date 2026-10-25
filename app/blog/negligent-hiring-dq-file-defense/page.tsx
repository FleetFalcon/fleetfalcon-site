import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "negligent-hiring-dq-file-defense")!;
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
      name: "What is negligent hiring in trucking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Negligent hiring is a claim that a carrier failed to exercise reasonable care when it put a driver on the road — for example, hiring despite a disqualifying record it should have discovered. A complete, documented DQ file is the carrier's evidence that it did the required diligence.",
      },
    },
    {
      "@type": "Question",
      name: "How is negligent retention different?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Negligent hiring looks at the decision to hire; negligent retention looks at keeping a driver after warning signs appeared — violations, failed tests, incidents — without acting. Related theories include negligent entrustment and negligent supervision.",
      },
    },
    {
      "@type": "Question",
      name: "What records do plaintiffs request after a crash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expect discovery demands for the full DQ file, Clearinghouse query records, MVRs, prior violation history, drug-and-alcohol testing, and any training and corrective-action records — essentially proof of what you knew and what you did about it.",
      },
    },
    {
      "@type": "Question",
      name: "Can a good DQ file actually change a lawsuit's outcome?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It can shift it significantly. A complete, time-stamped file demonstrates diligence and undercuts a negligence narrative; a file with holes does the opposite and can become the plaintiff's central exhibit.",
      },
    },
  ],
};

export default function NegligentHiringPostPage() {
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
            · June 26, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader slug="negligent-hiring-dq-file-defense"
                    alt="Trucks in service — every one of them driven by someone whose file has to hold up" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            After a serious crash, plaintiffs&apos; attorneys reliably pursue negligent hiring and
            retention claims against the carrier. A complete, time-stamped driver qualification file is
            often the strongest defense you have — and if it has holes, it becomes the plaintiff&apos;s
            smoking gun.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              This article is general information, not legal advice. But the pattern is consistent
              enough that every safety manager should understand it: in trucking litigation, your
              paperwork is a defendant.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Hiring, retention, entrustment, supervision
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Plaintiffs plead several related theories. <strong className="font-semibold text-foreground">Negligent
              hiring</strong> attacks the decision to put the driver on at all. <strong className="font-semibold text-foreground">Negligent
              retention</strong> attacks keeping them after warning signs. <strong className="font-semibold text-foreground">Negligent
              entrustment</strong> attacks handing a specific truck to a driver you knew (or should have
              known) was unfit, and <strong className="font-semibold text-foreground">negligent
              supervision</strong> attacks failing to manage them on the job. Each one turns on what the
              carrier knew and documented.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Nuclear verdicts and the reptile theory
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Trucking is a prime target for <em>nuclear verdicts</em> — awards in the tens of millions.
              A common tactic is the <em>reptile theory</em>: reframe a single crash as the carrier
              endangering the whole community through sloppy safety practices. Missing records feed that
              narrative perfectly. A complete file starves it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What plaintiffs demand in discovery
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Expect requests for the entire DQ file, Clearinghouse queries, every MVR, the driver&apos;s
              prior violation and inspection history, drug-and-alcohol testing, and all training and
              corrective-action records. They&apos;re building a timeline of what you knew and when — and
              whether you acted on it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              &ldquo;We checked him out&rdquo; vs &ldquo;we can prove it&rdquo;
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The case is won or lost in that gap. Saying you ran the MVR, verified the prior employer, or
              coached the driver after a violation is worth nothing without the dated record to back it.
              Undocumented diligence, in a courtroom, is indistinguishable from no diligence at all.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What a defensible file looks like
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Every §391 element present and current; MVRs at hire and annually; the previous-employer
              safety checks with the three documented good-faith attempts; Clearinghouse queries;
              and — just as important — the ongoing record of training and corrective actions, each
              time-stamped with who did what and when. A file like that doesn&apos;t just pass an audit;
              it tells a jury a story of a careful carrier.
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
              FleetFalcon builds and <strong className="font-semibold text-foreground">time-stamps</strong>{" "}
              the complete §391 DQ file through <strong className="font-semibold text-foreground">Rapid
              Onboarding</strong> and keeps it current with <strong className="font-semibold text-foreground">DocPulse</strong>
              — and it logs the training and corrective-action record alongside it. So when a lawyer asks
              for everything you knew and everything you did, the documentation already exists, dated, the
              day they ask for it.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
