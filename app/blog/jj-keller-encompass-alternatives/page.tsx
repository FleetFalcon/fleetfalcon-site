import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "jj-keller-encompass-alternatives")!;
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
      name: "What is J.J. Keller Encompass?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Encompass is J.J. Keller's fleet management and DOT-compliance platform, combining compliance recordkeeping with ELD. J.J. Keller is the long-standing incumbent in DOT compliance, with deep regulatory pedigree.",
      },
    },
    {
      "@type": "Question",
      name: "Why do fleets look for Encompass alternatives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common reasons are an enterprise-oriented, dated user experience, à-la-carte and quote-based pricing, and a heavier adoption process than modern self-serve platforms. Smaller and mid-size fleets often want something faster to adopt.",
      },
    },
    {
      "@type": "Question",
      name: "What's the best Encompass alternative for a small fleet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your priority. For an all-in-one, modern, self-serve compliance system with transparent pricing, FleetFalcon fits well; for deep MVR monitoring look at SambaSafety; for an outsourced-services model look at Foley; for telematics-first needs look at Motive.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to replace my ELD to switch compliance platforms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not with an integration-friendly platform. FleetFalcon integrates with existing ELDs (Samsara, Motive, Geotab) rather than replacing your hardware, so switching your compliance layer doesn't mean ripping out telematics.",
      },
    },
  ],
};

export default function KellerAlternativesPostPage() {
  return (
    <article>
      <JsonLd data={[articleSchema, faqSchema]} />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        {/* Header */}
        <p className="text-eyebrow text-accent">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          · Comparison
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-eyebrow text-foreground-faint">{post.author}</span>
          <time className="text-eyebrow text-foreground-faint" dateTime={post.published}>
            · September 4, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader photo="warehouse"
                    alt="The operation a legacy compliance platform was built around" />

        {/* Lead answer (AEO) */}
        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            J.J. Keller&apos;s Encompass is the long-standing DOT-compliance and ELD incumbent. Fleets
            shopping for alternatives are usually after something more modern, self-serve, and
            integrated — and the right pick depends on whether you want all-in-one compliance, deep
            MVR monitoring, outsourced services, or telematics-first.
          </p>
        </div>

        {/* Body */}
        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              Encompass earned its place — J.J. Keller has been the name in DOT compliance for decades.
              But &ldquo;the incumbent&rdquo; and &ldquo;the best fit for your fleet&rdquo; aren&apos;t
              always the same thing. Here&apos;s an honest map of the alternatives and who each one suits.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What Encompass is
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Encompass is a broad, enterprise-grade platform pairing compliance recordkeeping with ELD,
              backed by J.J. Keller&apos;s deep regulatory expertise. The trade-offs fleets cite are a
              dated interface, à-la-carte and quote-based pricing, and a heavier lift to adopt than a
              modern self-serve tool. If regulatory depth and a one-vendor enterprise relationship are
              what you want, it&apos;s formidable; if you want to sign up this afternoon, less so.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              The alternatives, and who each fits
            </h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground-muted">
              <li>
                <strong className="font-semibold text-foreground">FleetFalcon</strong> — a modern,
                AI-driven, all-in-one compliance system with self-serve signup, flat pricing from
                $99/month, and ELD integrations. Fits small and mid-size fleets that want their whole
                compliance program in one place without an enterprise rollout.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Foley</strong> — DOT compliance paired
                with background and MVR services. Fits fleets that want to outsource the legwork to a
                services team rather than drive software themselves.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Fleetworthy</strong> — an
                enterprise-grade compliance and safety suite. Fits larger carriers with the budget and
                scale to match.
              </li>
              <li>
                <strong className="font-semibold text-foreground">SambaSafety</strong> — best-in-class
                continuous MVR and driver-risk monitoring. Fits fleets whose top priority is ongoing
                license and violation monitoring.
              </li>
              <li>
                <strong className="font-semibold text-foreground">DOTReady / Superdocu</strong> — focused
                DQ-file and document-management tools. Fit fleets that mainly need to get driver
                qualification files in order.
              </li>
              <li>
                <strong className="font-semibold text-foreground">Motive</strong> — a telematics-first
                platform with safety add-ons. Fits fleets that lead with hardware and ELD and treat
                compliance recordkeeping as secondary.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How to choose
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground-muted">
              Weigh five things: <strong className="font-semibold text-foreground">depth vs breadth</strong>{" "}
              (one deep specialty or the whole program), <strong className="font-semibold text-foreground">user
              experience</strong>, <strong className="font-semibold text-foreground">pricing
              transparency</strong>, whether you can <strong className="font-semibold text-foreground">self-serve</strong>{" "}
              or need a sales cycle, and <strong className="font-semibold text-foreground">integrations</strong>{" "}
              with the ELD and tools you already run. A point-solution wins on depth; an all-in-one wins on
              not having four logins and a binder.
            </p>
          </section>

          <section>
            {/* PLACEHOLDER: marketing/legal to verify every competitor claim before publishing (Lanham Act — comparative claims must be accurate) */}
            <p className="rounded-lg border border-border bg-surface-2 p-4 text-xs leading-relaxed text-foreground-faint">
              This comparison reflects FleetFalcon&apos;s understanding of publicly available information
              as of September 2026; competitor capabilities change — verify before relying. Product names
              are trademarks of their respective owners.
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
              If you want off Encompass without an enterprise migration, FleetFalcon is the modern,
              self-serve alternative: <strong className="font-semibold text-foreground">no
              rip-and-replace</strong> (it integrates with your existing ELD), all-in-one compliance from
              DQ files to CSA, flat pricing from $99/month, and a free month to try it on your own
              fleet&apos;s data before you commit.
            </p>
          </section>

          <BlogCta />
        </div>
      </div>
    </article>
  );
}
