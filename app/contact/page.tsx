import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, CalendarDays, Radar } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact FleetFalcon",
  description:
    "Talk to FleetFalcon about DOT and FMCSA compliance for your fleet — book a walkthrough, email the team, or run a free safety check on your USDOT number first.",
  alternates: { canonical: "/contact" },
};

/**
 * /contact exists as a real page rather than a redirect.
 *
 * It is an indexed URL on the site this one replaces, and the nav here turned "Contact" into a
 * `mailto:` link. Redirecting an indexed page to a mailto: is a dead end for a crawler and a
 * surprise for a human (it fires their mail client instead of loading a page), so the URL keeps
 * a destination and the link equity attached to it.
 */
export default function ContactPage() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          Talk to us.
        </h1>
        <p className="measure mt-5 text-lg leading-relaxed text-foreground-muted">
          Whether you run 8 trucks or 800, the fastest way to see whether FleetFalcon fits is to
          put your own fleet in front of it.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <div className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-faint text-accent">
              <CalendarDays className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-display mt-4 text-lg">Book a walkthrough</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
              30 minutes, screen-shared, against your actual compliance setup — not a slide deck.
            </p>
            <Link
              href="/demo"
              className="lift mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-strong px-5 py-3 text-sm font-bold text-accent-foreground"
            >
              Pick a time
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-faint text-accent">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-display mt-4 text-lg">Email us</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
              Questions about coverage, pricing, or whether we handle a specific requirement —
              a real person answers.
            </p>
            <a
              href="mailto:val@fleetfalcon.io"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground"
            >
              val@fleetfalcon.io
            </a>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-surface p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-faint text-accent">
              <Radar className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-display mt-4 text-lg">Or skip the conversation</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
              Run your USDOT number against FMCSA&rsquo;s public data and see what your record
              already says. Free, no account.
            </p>
            <Link
              href="/violation-radar"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-foreground"
            >
              Run a free safety check
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
