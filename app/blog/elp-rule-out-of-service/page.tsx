import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "elp-rule-out-of-service")!;
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
      name: "Is English proficiency actually required by FMCSA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. 49 CFR §391.11(b)(2) has long required a driver to read and speak English well enough to converse with the public, understand highway traffic signs and signals, respond to officials, and make entries on records and reports.",
      },
    },
    {
      "@type": "Question",
      name: "What changed with English proficiency in 2025?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 2016 guidance memo had stopped treating an English-proficiency failure as an out-of-service condition. In 2025, following an executive order and updated FMCSA and CVSA guidance, an ELP violation was restored as an out-of-service offense, effective around June 2025.",
      },
    },
    {
      "@type": "Question",
      name: "What happens during a roadside ELP assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An inspector typically conducts a driver interview and a highway-sign recognition check to gauge whether the driver meets the standard. Under the restored CVSA out-of-service criteria, a driver who can't demonstrate sufficient proficiency is placed out of service.",
      },
    },
    {
      "@type": "Question",
      name: "How should carriers prepare?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Assess and document each driver's English proficiency as part of driver qualification, before the roadside does. A recorded ELP result on file demonstrates diligence and reduces the risk of a surprise out-of-service event.",
      },
    },
  ],
};

export default function ElpPostPage() {
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
            · August 7, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader image="/screenshots/elp-test-in-progress.png"
                    alt="A driver partway through an English Language Proficiency test on their phone" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            As of 2025, a driver who can&apos;t demonstrate sufficient English proficiency is placed
            out of service — reversing the 2016 guidance that had stopped treating 49 CFR
            §391.11(b)(2) as an out-of-service condition. English proficiency was always a
            qualification standard; now it carries roadside teeth again.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              For nearly a decade, English Language Proficiency (ELP) was a rule on the books that
              rarely stopped a truck. That changed in 2025. Here&apos;s what the standard is, what moved,
              and what carriers should actually do about it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The standard was always there
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Under <strong className="font-semibold text-foreground">49 CFR §391.11(b)(2)</strong>, a
              driver must be able to read and speak English well enough to converse with the public,
              understand highway traffic signs and signals, respond to official inquiries, and make
              entries on reports and records. That qualification requirement has been part of Part 391
              for a long time — ELP is not a new rule.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What changed in 2025
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              In 2016, a guidance memo instructed inspectors to stop placing drivers out of service for
              an ELP failure — the standard stayed, but the roadside consequence effectively went away.
              In 2025, following an executive order and updated FMCSA and CVSA guidance, an ELP violation
              was <strong className="font-semibold text-foreground">restored as an out-of-service
              offense</strong>, effective around June 2025. The rule didn&apos;t change so much as its
              enforcement teeth came back.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What a roadside ELP assessment looks like
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              In practice an inspector assesses proficiency through a <strong className="font-semibold text-foreground">driver
              interview</strong> and a <strong className="font-semibold text-foreground">highway-sign
              recognition</strong> check — can the driver hold a basic conversation and correctly
              identify signs. Under the restored CVSA out-of-service criteria, a driver who can&apos;t
              demonstrate sufficient proficiency is placed out of service on the spot.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What carriers should do
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Treat ELP like any other qualification element: assess it and document it before a driver
              is on the road, as part of the DQ process. A recorded result shows you took the standard
              seriously, and it lets you address a borderline case in the yard rather than discovering it
              at a scale house three states from home.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">The risk if you don&apos;t</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              An out-of-service driver is a stranded load, a stranded truck, and a scramble for coverage —
              plus a Driver Fitness hit on your record. One roadside ELP failure can turn into a delivery
              failure and a CSA ding at the same time. Knowing where your drivers stand ahead of time
              turns a surprise into a non-event.
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
              FleetFalcon&apos;s <strong className="font-semibold text-foreground">English Testing
              (ELP)</strong> — a standalone product at <strong className="font-semibold text-foreground">$10
              per test</strong> — lets you assess and record a driver&apos;s English proficiency before
              the roadside does, with a documented result saved to the driver&apos;s qualification record.
              You find the borderline case in the yard, not at the scale.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
