import type { Metadata } from "next";
import Link from "next/link";
import { BlogCta } from "../../components/blog-cta";
import { JsonLd } from "../../components/json-ld";
import { PostHeader } from "../../components/post-header";
import { blogPosts } from "../../content";

const post = blogPosts.find((p) => p.slug === "violations-that-score-zero")!;
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
      name: "Which violations carry no CSA severity weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Registration and tag violations, IRP and fuel-tax (IFTA) violations, state insurance and operating-authority violations, excessive weight and excessive dimension, UCR fees, and speeding 1–5 mph over the limit. None of them appear in FMCSA's weighted-violation file, so none of them add a point to any BASIC.",
      },
    },
    {
      "@type": "Question",
      name: "Does speeding 1–5 mph over count against my CSA score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. FMCSA removed speeding 1–5 mph over from CSA scoring, so it carries a severity weight of zero. It is still recorded on the inspection report, and roughly one in five of those violations carries an actual citation the driver has to answer.",
      },
    },
    {
      "@type": "Question",
      name: "How much of a carrier's citation volume is unscored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In FleetFalcon's analysis of three real carriers over a 24-month window, between 20% and 46% of all citations carried zero CSA severity weight. The share varies with what a fleet gets stopped for: a carrier with registration and fuel-tax problems can have nearly half its tickets invisible to its score.",
      },
    },
    {
      "@type": "Question",
      name: "Why does this matter if my score is unaffected?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because the ticket is real. It reaches the driver's motor vehicle record, it carries a court date and a fine, and it affects insurability and driver retention. A compliance tool built around CSA scores treats these as nothing, which is exactly why they go unmanaged.",
      },
    },
  ],
};

export default function ZeroScoreViolationsPostPage() {
  return (
    <article>
      <JsonLd data={[articleSchema, faqSchema]} />
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-eyebrow text-accent">
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{" "}
          · Analysis
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-eyebrow text-foreground-faint">{post.author}</span>
          <time className="text-eyebrow text-foreground-faint" dateTime={post.published}>
            · October 25, 2026
          </time>
          <span className="text-eyebrow text-foreground-faint">· {post.readingTime}</span>
        </div>

        <PostHeader slug="violations-that-score-zero"
                    alt="A roadside inspection in progress, the officer writing up a report" />

        <div className="mt-10 rounded-lg border-l-4 border-accent bg-surface-2 p-5">
          <p className="text-lg font-bold leading-relaxed text-foreground">
            Some violations carry no CSA severity weight at all — registration, fuel tax,
            excessive weight, and speeding 1&ndash;5 mph over the limit. They add nothing to any
            BASIC. Across three real carriers we analysed, between 20% and 46% of every citation
            they received was one of these. Your score never moves, and your drivers still have a
            court date.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <p className="text-lg leading-relaxed text-foreground-muted">
              Every CSA tool on the market is built around the same assumption: that the number
              measures the problem. Points go up, you have a problem; points stay flat, you do
              not. It is a reasonable assumption and it has a hole in it, because FMCSA does not
              weight every violation. A great many of them score exactly zero, and a zero-point
              violation is invisible to anything that watches your score.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              It is not invisible to your driver, who still has to answer the ticket.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What carries no weight
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              FMCSA publishes a severity weight for every violation code it scores, from 1 to 10.
              A code absent from that table carries no weight at all. Pull the whole public
              violation file and the unscored Part 392 codes are dominated by administrative and
              size-and-weight offences:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-foreground-faint">
                    <th className="py-2 font-semibold">Violation</th>
                    <th className="py-2 font-semibold">Code</th>
                    <th className="py-2 text-right font-semibold">In the public file</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {[
                    ["State registration / tag", "392.2-SLLSR", "296,184"],
                    ["Vehicle registration or plate", "392.2RG", "230,909"],
                    ["Excessive weight, 1–2,500 lbs over", "392.2-SLLEWA1", "133,010"],
                    ["Equipment violation of state law", "392.2-SLLEQP", "104,559"],
                    ["Fuel tax (IFTA)", "392.2-SLLIFTA", "83,684"],
                    ["IRP apportioned tag", "392.2-SLLIRP", "78,649"],
                    ["Excessive dimension", "392.2-SLLED", "56,235"],
                    ["Speeding 1–5 mph over", "392.2-SLLS1", "53,671"],
                    ["Failure to pay UCR fee", "392.2-SLLUCR", "48,913"],
                    ["State insurance violation", "392.2-SLLSIV", "38,921"],
                  ].map(([name, code, n]) => (
                    <tr key={code} className="border-b border-border-faint">
                      <td className="py-2">{name}</td>
                      <td className="py-2 font-mono text-xs">{code}</td>
                      <td className="py-2 text-right tabular-nums">{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground-faint">
              Counts are violations recorded in FMCSA&rsquo;s public inspection file. None of these
              codes appears in the agency&rsquo;s weighted-violation data, so each one scores zero
              in every BASIC.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Speeding 1&ndash;5 is the one that surprises people
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              The administrative violations above are unsurprising — a lapsed IRP tag is a
              paperwork failure, not a safety event, and it is reasonable that CSA ignores it.
              Speeding is different. FMCSA scores speeding 6&ndash;10 mph over at severity 4,
              11&ndash;14 at 7, and 15 or more at 10. Speeding 1&ndash;5 over was removed from
              scoring entirely and sits at zero.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              It is still written up. We counted how often each speeding tier produces an actual
              citation rather than a warning or nothing:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-foreground-faint">
                    <th className="py-2 font-semibold">Speeding</th>
                    <th className="py-2 text-right font-semibold">CSA severity</th>
                    <th className="py-2 text-right font-semibold">Carries a ticket</th>
                    <th className="py-2 text-right font-semibold">No outcome recorded</th>
                  </tr>
                </thead>
                <tbody className="text-foreground-muted">
                  {[
                    ["1–5 mph over", "0", "21.9%", "72.2%"],
                    ["6–10 mph over", "4", "26.0%", "66.4%"],
                    ["11–14 mph over", "7", "38.9%", "52.4%"],
                    ["15+ mph over", "10", "47.6%", "44.8%"],
                  ].map(([tier, sev, ticket, blank]) => (
                    <tr key={tier} className="border-b border-border-faint">
                      <td className="py-2">{tier}</td>
                      <td className="py-2 text-right tabular-nums">{sev}</td>
                      <td className="py-2 text-right tabular-nums">{ticket}</td>
                      <td className="py-2 text-right tabular-nums">{blank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              Roughly one in five of the zero-point speeding violations carries a real citation.
              That is close to 11,700 tickets in the public file that cost their carriers nothing
              on any BASIC.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              The last column is worth sitting with. On most of these stops the officer recorded
              no outcome at all — the citation field is simply blank, and the public record cannot
              tell you whether a ticket was written. Where an outcome <em>is</em> recorded it is a
              ticket about four times in five, consistently across every tier. What changes with
              severity is not how often officers ticket, but how often they write it down.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              How much of a real carrier&rsquo;s citations this is
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              We pulled 24 months of public data for three carriers of different sizes and
              counted what share of their citations carried no CSA weight:
            </p>
            <ul className="mt-4 space-y-2 text-lg leading-relaxed text-foreground-muted">
              <li>
                <strong className="text-foreground">A 304-truck dry-van carrier:</strong> 56
                citations, 26 of them unscored &mdash; <strong>46%</strong>.
              </li>
              <li>
                <strong className="text-foreground">A 90-truck general-freight carrier:</strong> 28
                citations, 10 unscored &mdash; <strong>36%</strong>.
              </li>
              <li>
                <strong className="text-foreground">A regional carrier with heavy maintenance
                findings:</strong> 150 citations, 30 unscored &mdash; <strong>20%</strong>.
              </li>
            </ul>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              The share moves with what a fleet gets stopped for. A carrier whose problems are
              mechanical sees most of its citations scored, because brakes and tyres and lamps all
              carry weight. A carrier with registration and permitting problems can have close to
              half its tickets land nowhere near its score.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Why it matters anyway
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              A zero-point citation is not a free one. It reaches the driver&rsquo;s motor vehicle
              record, where an insurer and a prospective employer will both see it. It carries a
              fine and a date somebody has to answer. Enough of them on one driver is a retention
              problem and an insurability problem long before it is a CSA problem.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              And the pattern matters more than any single ticket. A fleet collecting registration
              and IRP violations does not have a driver problem, it has a back-office problem, and
              no amount of coaching will fix it. That signal is sitting in the public data and no
              score-based tool will ever surface it, because the score it watches never moves.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              This is a different blind spot from the one we wrote about in{" "}
              <Link href="/blog/green-csa-score-hiding-violations" className="text-accent hover:underline">
                why a green CSA score can hide dangerous violations
              </Link>
              . That one is about percentile maths diluting violations that <em>do</em> carry
              weight. This one is about violations that carry none at all — they are not diluted,
              they are simply absent.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              What to do about it
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              Read your inspection reports, not just your score. Every violation on a roadside
              report is in the public file within about a week, with its citation field filled in
              or left blank. Count the unscored ones. If they cluster around registration, IRP or
              fuel tax, that is an administrative fix and a cheap one. If they cluster around
              speeding at any tier, that is a driver conversation that your BASIC percentiles will
              not prompt you to have.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
              And check the blanks. On a majority of stops nobody recorded whether a ticket was
              issued, which means the only way to know is to ask the driver. That is a question
              worth asking within the first week, while the answer is still useful.
            </p>
          </section>
        </div>

        <BlogCta />
      </div>
    </article>
  );
}
