import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "how-brokers-use-your-csa-score")!;
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
      name: "Can brokers see my CSA score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your public BASIC percentiles, authority status, and insurance are visible through FMCSA's SMS and through broker-facing tools like Carrier411, MyCarrierPortal, and RMIS. Two BASICs — Crash Indicator and HazMat — are not shown publicly.",
      },
    },
    {
      "@type": "Question",
      name: "Which BASICs do brokers care about most?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unsafe Driving, Hours-of-Service Compliance, and the Crash Indicator tend to worry brokers and shippers the most, because they map most directly to the risk and liability of a load going wrong.",
      },
    },
    {
      "@type": "Question",
      name: "Can bad CSA scores actually cost me loads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many brokers set internal thresholds and alerts; an elevated BASIC or an 'alert' flag can get you screened out of freight or dropped from an approved-carrier list before anyone calls you.",
      },
    },
    {
      "@type": "Question",
      name: "How do I improve how brokers see me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monitor your BASICs monthly, bank clean inspections, dispute inaccurate records through DataQs, and fix the driver or unit patterns driving violations — so your public profile is clean the moment a broker pulls it.",
      },
    },
  ],
};

export default function BrokersPostPage() {
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
            · May 22, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader motif="network" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            Brokers and shippers pull your CSA BASICs — often through tools like Carrier411,
            MyCarrierPortal, and RMIS — before they tender you a load. Weak scores or an
            &ldquo;alert&rdquo; flag can quietly cost you freight and contracts, because the broker
            shares in the liability if something goes wrong.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              You may never hear why a broker went quiet. Often it&apos;s not your rate — it&apos;s your
              safety profile, checked in seconds against a threshold you didn&apos;t know they had.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What brokers see
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              When a broker vets you, they pull your public FMCSA profile: your BASIC percentiles, your
              operating authority status, and your insurance on file. They usually do it through a
              carrier-monitoring service — Carrier411, MyCarrierPortal, RMIS and similar — that watches
              your profile continuously and alerts them to changes. Note that two BASICs, Crash Indicator
              and HazMat, aren&apos;t displayed publicly, so brokers lean on what they can see.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Why they care: negligent selection
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              This isn&apos;t brokers being picky. If they tender freight to a carrier with a visibly
              poor safety record and that carrier is in a serious crash, the broker can be sued for
              <em> negligent selection</em> — they chose an unsafe carrier when the data was right there.
              Your CSA scores are, to a broker, a record of the diligence they can prove they did. A bad
              profile makes you a liability they&apos;d rather route around.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Which BASICs scare them most
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Not all BASICs carry equal weight in a broker&apos;s eyes. Unsafe Driving and
              Hours-of-Service Compliance are the two they watch hardest — they correlate most directly
              with crash risk — and anything touching the Crash Indicator is a red flag. A Vehicle
              Maintenance issue might raise an eyebrow; an Unsafe Driving alert can end the conversation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How to protect your scores
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              The defense is the same work that improves your CSA generally: monitor your BASICs every
              month so nothing surprises you, bank clean roadside inspections, dispute inaccurate records
              through DataQs, and fix the handful of drivers or units behind most of your violations. The
              goal is a clean public profile on the day — any day — a broker decides to look.
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
              FleetFalcon monitors your CSA standing every month, surfaces exactly which violations are
              dragging each BASIC down, and helps you resolve them — clean inspections, DataQs-eligible
              disputes, repeat-offender coaching — before a broker ever pulls your profile. The number a
              broker sees is the number you&apos;ve already been working on.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
