import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "safety-and-compliance-overlap")!;
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
      name: "What's the difference between safety and compliance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Safety is the real work — coaching drivers, maintaining equipment, preventing crashes. Compliance is the documentation and regulatory layer that proves that work happened. One is the substance; the other is the record of it.",
      },
    },
    {
      "@type": "Question",
      name: "Why does documentation matter so much?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because in a DOT audit or a negligent-hiring lawsuit, the record is what counts. The documentation is your audit and lawsuit defense — undocumented safety work can't be credited no matter how good it was.",
      },
    },
    {
      "@type": "Question",
      name: "What should I document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Trainings, corrective actions, incidents, roadside inspections, and signed policy acknowledgments — each with who did what and when. Those are the records that turn safety practice into provable compliance.",
      },
    },
    {
      "@type": "Question",
      name: "Can a fleet with good safety practices still fail an audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If the safety work isn't documented, an auditor has nothing to credit — a genuinely safe fleet can fail on recordkeeping alone. The gap between doing the right thing and proving it is where audits are lost.",
      },
    },
  ],
};

export default function SafetyComplianceOverlapPostPage() {
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
            · July 30, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader slug="safety-and-compliance-overlap"
                    alt="Trucks in service, where the safety job and the compliance job stop being separable" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            Safety is the work — coaching drivers and preventing crashes. Compliance is the proof.
            They overlap wherever safety work gets documented, because in an audit or a lawsuit,
            undocumented safety work doesn&apos;t count: if it hasn&apos;t been tracked, it may as
            well never happened.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              Most fleets run safety and compliance as two different jobs. Safety is the real
              work — coaching drivers, catching a bad habit, preventing the crash that never happens.
              Compliance is the paperwork layer — the files, the forms, the records a regulator
              wants to see. Treated as separate, one feels like the mission and the other feels like
              a tax. They&apos;re actually two sides of the same coin.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Safety is the work. Compliance is the proof.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Here&apos;s the thesis that ties them together: in a DOT audit or a negligent-hiring
              lawsuit, undocumented safety work does not exist.{" "}
              <strong className="font-semibold text-foreground">If it hasn&apos;t been tracked, it
              may as well never happened.</strong> The investigator and the plaintiff&apos;s attorney
              don&apos;t see your intentions or your hallway conversations. They see the record. No
              record, no credit — no matter how good the underlying work was.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The gap is where the danger lives
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Picture the everyday version. You coached a driver after a hard-braking event — but you
              logged nothing. You noticed a speeding pattern and had a word with the driver — verbally,
              with no corrective-action record. You have a safety policy everyone genuinely follows —
              but no signed acknowledgments on file. In each case the safety work happened and the
              compliance record didn&apos;t. That space between &ldquo;we do the right thing&rdquo;
              and &ldquo;we can prove we did the right thing&rdquo; is exactly where audits fail and
              lawsuits land.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Two sides of one coin
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Flip it around and the relationship gets useful. Good safety practice{" "}
              <em>becomes</em> compliance the moment it&apos;s recorded — the coaching note, the
              signed acknowledgment, the dated corrective action are the safety work, captured. And
              the reverse holds: compliance paperwork is hollow without the safety substance behind
              it. A perfect-looking file for a fleet that doesn&apos;t actually coach its drivers is
              just a well-organized liability. You want both, and the cheapest way to get both is to
              record the safety work as you do it.
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
              FleetFalcon turns the safety work you already do into a tracked, time-stamped record.
              Every training, corrective action, incident, and roadside inspection is logged with
              who did what and when — so the coaching conversation, the policy acknowledgment, and
              the repair all leave a trail. Your safety program stops being a thing you hope to
              remember and starts doubling as your audit defense and your answer in a lawsuit.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
