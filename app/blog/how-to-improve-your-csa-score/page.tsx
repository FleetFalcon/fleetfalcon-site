import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "how-to-improve-your-csa-score")!;
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
      name: "How often do CSA scores update?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FMCSA refreshes the Safety Measurement System data monthly, so your BASIC percentiles can change every month as new inspections and violations come in and old ones age out.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a violation affect my score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Violations stay in the 24-month SMS window and are time-weighted: roughly 3× in the first six months, 2× from months 7–12, 1× from months 13–24, then they drop off entirely.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a violation removed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if it's inaccurate or otherwise eligible — you file a Request for Data Review through FMCSA's DataQs system. Certain crashes can be addressed through the Crash Preventability Determination Program (CPDP).",
      },
    },
    {
      "@type": "Question",
      name: "How fast can my scores improve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "With consistent work — banking clean inspections, disputing bad records, coaching repeat offenders, and letting time-weighting decay old violations — carriers typically see a BASIC move on the order of 10–20 percentile points over three to six months. That's a range, not a guarantee.",
      },
    },
  ],
};

export default function CsaScorePostPage() {
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
            · September 18, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader photo="highway"
                    alt="A tanker on the interstate, accumulating the roadside inspections a CSA score is built from" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            You improve a CSA score by lowering your BASIC percentiles — accumulate clean roadside
            inspections, dispute inaccurate violations through DataQs, coach repeat offenders, and
            let old violations time-decay. With consistent work, carriers typically see 10–20-point
            drops over three to six months.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              Your CSA score isn&apos;t a mystery and it isn&apos;t luck. It&apos;s the output of a
              formula, and once you understand what feeds that formula you can work the levers that
              actually move it. The honest news is there&apos;s no overnight fix — but with
              consistent work over a few months, the number comes down.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What a CSA score really is
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              CSA (Compliance, Safety, Accountability) scores you across seven BASICs —
              Unsafe Driving, Hours-of-Service, Driver Fitness, Controlled Substances/Alcohol,
              Vehicle Maintenance, Hazardous Materials, and Crash Indicator. You aren&apos;t graded
              on a raw count; you&apos;re ranked as a <strong className="font-semibold text-foreground">percentile</strong>{" "}
              against a peer group of carriers with a similar number of inspections. The data is
              refreshed <strong className="font-semibold text-foreground">monthly</strong>.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground-muted">
              The key mechanic is the 24-month window with{" "}
              <strong className="font-semibold text-foreground">time-weighting</strong>: a violation
              counts roughly 3× in its first six months, 2× from months 7–12, 1× from months 13–24,
              and then drops off entirely. So your recent record matters most — which cuts both ways.
              It matters because brokers and insurers pull your BASICs before they hand you freight
              or quote a premium; a bad percentile costs you loads and money long before it costs you
              an intervention.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Know your number</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              You can&apos;t improve what you don&apos;t watch. Check your BASICs every month when the
              data updates, so a new violation doesn&apos;t surprise you at renewal. Note that two
              BASICs aren&apos;t publicly displayed — Crash Indicator and HazMat — but they still
              exist, still get used in interventions, and you should track them from your own records
              even when the public SMS site hides the percentile.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Win clean inspections
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              This is the most reliable lever you own. Percentiles are relative, so every clean
              roadside inspection you bank pulls your standing <em>down</em> and dilutes the weight of
              past violations. Coach the basics that get caught at the scale: thorough pre-trips,
              in-order paperwork, and clean ELD logs. A fleet that consistently passes inspections
              clean will watch its percentiles fall on that alone.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Dispute the wrong violations via DataQs
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              FMCSA&apos;s data is frequently wrong — a violation attributed to the wrong carrier, a
              citation that was later dismissed, a duplicate, a miscoded entry. The{" "}
              <strong className="font-semibold text-foreground">DataQs</strong> system lets you
              challenge those records, and removing a heavily time-weighted violation can move a
              BASIC noticeably. You won&apos;t win every dispute, so rank them by return: fight the
              recent, high-severity entries in a BASIC where you&apos;re near an intervention
              threshold first.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Target repeat offenders
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Violations are rarely spread evenly. In most fleets a handful of drivers and a few
              problem units generate the bulk of the points. Find them in your inspection history and
              address them directly — targeted coaching, a maintenance fix, retraining — and you
              stop the bleeding at the source instead of chasing symptoms across the whole roster.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Let time work for you
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Because of time-weighting, old violations fade on their own — their weight halves after
              six months, halves again after a year, and they fall out of the window entirely at 24
              months. The job is simply to not pile on new ones. Clean months are quietly doing work
              in the background; the carriers that improve are the ones that stop adding and let the
              decay run.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Resolve out-of-service fast — with proof of repair
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              An out-of-service violation is a severe, heavily weighted event. Fix it quickly, and
              keep the proof-of-repair documentation — it&apos;s what you&apos;ll need for a DataQs
              challenge or an audit, and it demonstrates the corrective action a safety investigator
              looks for. Letting an OOS item sit unresolved is one of the fastest ways to keep a
              BASIC elevated.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              A realistic timeline
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Put those levers together — banking clean inspections, disputing bad records, coaching
              repeat offenders, and letting time-weighting decay the rest — and a focused carrier can
              typically move a BASIC on the order of <strong className="font-semibold text-foreground">10–20
              percentile points over three to six months</strong>. That&apos;s a range, not a
              guarantee: it falls out of the mechanics (recent violations weigh most, clean
              inspections dilute, old violations decay), and your mileage depends on your starting
              point and how disciplined the work is.
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
              pulls your roadside inspections into Events automatically and surfaces the specific
              violations dragging down each BASIC — including the dangerous ones a &ldquo;green&rdquo;
              overall score can hide. It flags which violations look DataQs-eligible so you can
              dispute the wrong ones, tracks repeat offenders across drivers and units, and monitors
              your standing every month so you can actually watch the number move.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
