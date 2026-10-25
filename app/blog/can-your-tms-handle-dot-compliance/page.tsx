import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "can-your-tms-handle-dot-compliance")!;
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
      name: "Does a TMS replace a DQ-file system?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A TMS may store a few driver fields like a license or med-card date, but it is not built to assemble and maintain a complete §391 driver qualification file with MVRs, road tests, annual reviews, and previous-employer history.",
      },
    },
    {
      "@type": "Question",
      name: "Can my TMS run FMCSA Clearinghouse queries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally no. Clearinghouse pre-employment and annual queries, med-cert National Registry verification, and random drug-and-alcohol consortium management live outside most TMS platforms and need dedicated compliance tooling.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to replace my TMS to add compliance software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A dedicated compliance platform sits alongside your TMS and ELD rather than replacing them — it adds the DQ files, onboarding, Clearinghouse, incident/citation, and CSA layer the TMS was never designed for.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between a TMS and a compliance platform?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A TMS runs operations — dispatch, billing, driver pay, IFTA, maintenance. A compliance platform proves you meet DOT/FMCSA requirements — driver qualification, testing, inspections, and safety recordkeeping. A single date field is not a compliance program.",
      },
    },
  ],
};

export default function TmsPostPage() {
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
            · April 24, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader slug="can-your-tms-handle-dot-compliance"
                    alt="The load your TMS tracks — and the compliance obligation it does not" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            Most transportation management systems can store a few compliance fields — like a
            med-card expiry date — but they aren&apos;t built to run a DOT compliance program. Full
            DQ-file management, Clearinghouse queries, driver onboarding, and CSA monitoring sit
            outside what a TMS does.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              &ldquo;Our TMS already tracks that&rdquo; is one of the most common things we hear — and
              it&apos;s usually half true. A TMS is excellent at the job it was built for. The trouble
              starts when a date field gets mistaken for a compliance program.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What a TMS does well
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              A transportation management system runs your operation: dispatch and load management,
              billing and settlements, driver pay, IFTA fuel-tax reporting, and often vehicle
              maintenance scheduling. That&apos;s real, valuable work, and a good TMS is the backbone
              of a fleet&apos;s day-to-day. None of what follows is a knock on the category — it&apos;s
              about scope.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What a TMS misses
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Compliance is a different discipline, and most TMS platforms only brush its surface:
            </p>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-foreground-muted">
              <li>• A complete §391 driver qualification file — not just a license field, but MVRs, road tests, annual reviews, and previous-employer safety history.</li>
              <li>• Medical certificate verification against the National Registry of Certified Medical Examiners.</li>
              <li>• Structured driver onboarding workflows with consent capture and e-signatures.</li>
              <li>• FMCSA Drug &amp; Alcohol Clearinghouse queries and random-testing consortium management.</li>
              <li>• CSA / BASIC monitoring and roadside-inspection tracking.</li>
              <li>• Incident and citation case management with corrective-action records.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The fragmentation reality
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              In practice, most fleets end up with an ELD for hours, a TMS for operations, and a binder
              (or a spreadsheet) for compliance — and none of the three talk to each other. The med-card
              date lives in the TMS, the inspection sits in the ELD provider&apos;s portal, and the DQ
              file is a folder nobody has opened since the driver was hired. The gaps hide in the seams.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              TMS vs dedicated compliance vs all-in-one
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              There are three honest options. Push the TMS to do more than it&apos;s designed for and
              accept the gaps. Bolt on a single-purpose tool (an MVR monitor, a Clearinghouse service)
              for each need and manage the sprawl. Or run one compliance platform that covers the whole
              program and connects to the systems you already use. The right answer depends on your size
              and risk tolerance — but a lone date field in the TMS is rarely enough.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              When a date field isn&apos;t enough
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The moment that matters is an audit or a lawsuit. An investigator doesn&apos;t want to see
              that you knew a med card&apos;s expiry — they want the certificate, the National Registry
              verification, the annual review, and the rest of the file. A plaintiff&apos;s attorney
              wants the same. &ldquo;It&apos;s in the TMS&rdquo; isn&apos;t an answer when the TMS only
              held the date.
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
              FleetFalcon is the compliance layer that sits <strong className="font-semibold text-foreground">alongside</strong>{" "}
              your TMS — no rip-and-replace. It integrates with your ELD (Samsara, Motive, Geotab) and
              training providers, uses <strong className="font-semibold text-foreground">DocPulse</strong>{" "}
              and <strong className="font-semibold text-foreground">Rapid Onboarding</strong> to build and
              maintain complete §391 DQ files, and pulls Clearinghouse, inspections, incidents, and CSA
              into one record — so the thing your TMS only stored a date for becomes an actual, provable
              compliance program.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
