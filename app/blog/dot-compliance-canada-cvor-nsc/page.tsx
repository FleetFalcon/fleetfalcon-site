import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "dot-compliance-canada-cvor-nsc")!;
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
      name: "What is Canada's equivalent of FMCSA and CSA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Canada regulates carriers under the National Safety Code (NSC), a federal framework administered by each province and territory. It plays the role FMCSA and CSA play in the US, with its own safety fitness ratings, carrier profiles, and audits.",
      },
    },
    {
      "@type": "Question",
      name: "What is a CVOR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Commercial Vehicle Operator's Registration is Ontario's carrier-safety system. It tracks your collisions, convictions, and inspections, assigns points, and issues threshold warning letters and interventions as your record worsens. Quebec's equivalent is the PEVL.",
      },
    },
    {
      "@type": "Question",
      name: "Do US carriers need Canadian compliance to run cross-border?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Running into Canada means meeting the relevant provincial NSC requirements (like a CVOR for Ontario) in addition to your US FMCSA/CSA obligations — you're accountable in both systems.",
      },
    },
    {
      "@type": "Question",
      name: "Are Canadian hours-of-service rules different from US rules?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Canada uses its own duty cycles and daily limits that differ from US HOS, and Canada has its own ELD mandate with its own device certification. Cross-border drivers have to operate correctly under both regimes.",
      },
    },
  ],
};

export default function CanadaPostPage() {
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
            · July 10, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader slug="dot-compliance-canada-cvor-nsc"
                    alt="The Trans-Canada Highway in Ontario, where CVOR and NSC rules apply instead of FMCSA's" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            Canadian carriers are regulated under the National Safety Code (NSC), administered
            province by province — Ontario&apos;s CVOR, Quebec&apos;s PEVL, and their counterparts
            elsewhere. It&apos;s the rough equivalent of FMCSA and CSA, with its own safety ratings,
            points, and audits — and cross-border fleets have to satisfy both systems.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              If you only run in the US, CSA is the whole story. The moment a truck crosses into Canada,
              a parallel compliance world opens up — similar in spirit, different in the particulars, and
              administered by the provinces rather than one federal agency.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The National Safety Code
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The NSC is Canada&apos;s federal framework of safety standards for commercial carriers, but
              it&apos;s <em>administered by each province and territory</em>. Carriers get a safety fitness
              certificate and a carrier profile that accumulates their collisions, convictions, and
              inspections — the record a regulator uses to decide whether to intervene or audit you. Think
              of the NSC as the CSA layer, with the province playing FMCSA&apos;s role.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Ontario&apos;s CVOR
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Ontario&apos;s Commercial Vehicle Operator&apos;s Registration is the one US carriers meet
              most often. Your CVOR record accrues points from collisions, convictions, and inspections;
              cross a threshold and you get a warning letter, then interventions — an interview, an audit,
              and ultimately sanctions on your ability to operate. It behaves a lot like a BASIC with a
              points ledger attached.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Quebec&apos;s PEVL and the other provinces
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Quebec runs the PEVL (Programme d&apos;évaluation des propriétaires et exploitants de
              véhicules lourds), its own heavy-vehicle owner/operator evaluation program. Other provinces
              administer their own NSC profiles. The common thread: wherever you operate, that province is
              keeping score, and the rules aren&apos;t perfectly uniform across the country.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Cross-border fleets need both
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              A carrier running the border isn&apos;t choosing between systems — it owes compliance to
              both. You keep your USDOT number and CSA record in the US <em>and</em> satisfy the relevant
              provincial NSC requirements (a CVOR for Ontario, for instance) in Canada. Two profiles, two
              sets of thresholds, one fleet.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Hours, ELDs, and border documents
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Canadian hours-of-service use different duty cycles and daily limits than US HOS, and Canada
              has its own ELD mandate with separate device certification — a US-only ELD setup isn&apos;t
              automatically sufficient. And drivers crossing the border need their documents in order:
              valid identification, work authorization where applicable, and any load-specific paperwork.
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
              FleetFalcon supports both US and Canadian carriers — <strong className="font-semibold text-foreground">CSA
              and CVOR</strong> — including Canadian carrier profiles, provincial requirements, and
              US/Canada document rules. For a cross-border fleet, that means one platform tracking both
              safety records and both document sets, instead of two disconnected systems and a border in
              between.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
