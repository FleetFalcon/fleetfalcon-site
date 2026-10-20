import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radar, ScanLine, ShieldAlert, FileCheck2, Sparkles } from "lucide-react";
import { SafetyCheck } from "../components/safety-check";
import { Reveal } from "../components/reveal";
import { Shot } from "../components/shot";

export const metadata: Metadata = {
  title: "Violation Radar — see the violations your green CSA score is hiding",
  description:
    "Run a free check on your USDOT number against FMCSA's public data: roadside inspections, out-of-service rate vs the national average, and the concrete violations dragging your BASICs. No signup.",
  alternates: { canonical: "/violation-radar" },
};

/**
 * Violation Radar has its OWN funnel, deliberately different from the main site's.
 *
 * The homepage sells a subscription: "start your free month". That is the wrong first ask here,
 * because this product's whole pitch is a claim about the buyer's own record — "a green score is
 * hiding things from you" — and a claim like that is cheap until you prove it on their numbers.
 *
 * So the flow is: PROVE IT FIRST (free check, no signup, their real FMCSA data) → explain what
 * the public data cannot tell them → ask for the trial. The safety check is the hero, not a
 * footnote; the subscription CTA deliberately sits below it.
 */

const STEPS = [
  {
    icon: ScanLine,
    title: "Every inspection lands automatically",
    body: "Roadside inspections flow straight into your Events section — no re-keying, no waiting for a driver to hand in paperwork. Still get a paper CVSA? Snap a photo and it is read the same way.",
  },
  {
    icon: Radar,
    title: "Each violation is tied to the right driver or unit",
    body: "The federal file names a unit, not a person. Violation Radar attributes each violation to the driver or the truck it actually belongs to, so coaching lands on the right person.",
  },
  {
    icon: ShieldAlert,
    title: "Out-of-service and repeat offenders surface first",
    body: "Severity-first, not newest-first. An OOS order or a repeat-offending unit is at the top of the feed the morning it matters — not buried under routine paperwork.",
  },
  {
    icon: FileCheck2,
    title: "Fixing it leaves a paper trail",
    body: "Marking something fixed records who fixed it, when, what they did and the proof they attached — the corrective-action record an auditor asks for.",
  },
];

export default function ViolationRadarPage() {
  return (
    <>
      {/* 1 — PROVE IT ON THEIR OWN NUMBERS, before asking for anything ------ */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-faint px-3 py-1">
            <Radar className="h-4 w-4 text-accent" aria-hidden />
            <span className="text-sm font-bold text-accent">Violation Radar</span>
          </div>

          <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
            Your CSA score is green.
            <br />
            That is not the same as <span className="text-accent">safe</span>.
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-foreground-muted">
            Every BASIC can sit under threshold while a driver is cited for operating without a
            valid CDL, a unit racks up two out-of-service defects in one inspection, and a log
            falsification goes unanswered. A score is an average. Averages hide things.
          </p>
          <p className="measure mt-4 text-lg font-semibold leading-relaxed text-foreground">
            Don&apos;t take our word for it — run your own DOT number.
          </p>

          <div className="mt-10">
            <SafetyCheck />
          </div>

          {/* No trust line here on purpose — SafetyCheck prints its own
              "Free · live FMCSA data · no account" directly under the input. */}
        </div>
      </section>

      {/* 1.5 — THE PRODUCT ITSELF ------------------------------------------
          Carrier name and USDOT are anonymised in this capture ("Northstar Carriers",
          masked DOT). The demo this was shot from is seeded off one real carrier's FMCSA
          export, and its identity has no business on a public marketing page. */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
          <h2 className="mx-auto max-w-2xl text-center font-display text-3xl leading-tight tracking-tight sm:mx-0 sm:text-left sm:text-4xl">
            Monday morning, ranked by what actually bites
          </h2>
          <p className="measure mx-auto mt-4 text-center text-lg leading-relaxed text-foreground-muted sm:mx-0 sm:text-left">
            Severity first, not newest first. The driver who should not be in a truck sits at the
            top; the paperwork waits its turn. Each row says what it costs you in CSA points and
            what to do about it.
          </p>
          <div className="mt-8">
            <Shot
              src="/screenshots/violation-radar-pulse.png"
              alt="Violation Radar's Pulse feed: critical items first — two out-of-service defects on one unit, a licence-restriction violation, a driver operating without a valid CDL — each with its CSA point cost and a one-click corrective action"
            />
          </div>
        </div>
      </section>

      {/* 2 — WHAT THE PUBLIC DATA CANNOT TELL THEM (the honest gap = product) */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="font-display max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            What that free check <em className="not-italic text-accent">can&apos;t</em> tell you
          </h2>
          <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">
            Everything above comes from public federal files. They are genuinely useful — and they
            stop exactly where the work starts. This is the honest line between the free check and
            the product.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                h: "Whose violation it is",
                b: "The public file names a unit, not a person. It cannot tell you which of your drivers was behind the wheel — so it cannot tell you who to coach.",
              },
              {
                h: "Which ones are wrong",
                b: "Some violations on your record are erroneous and challengeable through DataQs. The public file will not flag them, and the clock to contest them is already running.",
              },
              {
                h: "What changed this morning",
                b: "A snapshot is a photograph. Monitoring is a feed: new inspections, new OOS orders, and the fix-and-prove loop that closes them out.",
              },
            ].map((c) => (
              <Reveal key={c.h} className="rounded-xl border border-border bg-background p-6">
                <h3 className="font-display text-lg">{c.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{c.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — HOW IT WORKS --------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Inspection in. Corrective action out.
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">
              Violation Radar runs inside FleetFalcon, so a roadside event becomes a tracked,
              closed-out record instead of a PDF in someone&apos;s inbox.
            </p>
            {/* Steps run two-up now that this section carries no image. What sat here was the
                portal's "Add Roadside Inspection" form — the wrong screen for this page twice
                over: it is manual data entry, shown beside copy promising inspections arrive
                without re-keying. The Pulse screenshot further up already shows the product. */}
            <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {STEPS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-faint text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4 — THE ASK (deliberately last) ------------------------------------ */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-faint px-3 py-1">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              <span className="text-sm font-bold text-accent">1 month free · all features</span>
            </div>
            <h2 className="font-display mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Saw something in your check you didn&apos;t know about?
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">
              That is the point. Violation Radar comes with every FleetFalcon plan — along with
              driver qualification files, document tracking and the rest of the 90%.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/pricing"
                className="lift inline-flex items-center justify-center gap-2 rounded-lg bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg"
              >
                Start your free month
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-7 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground"
              >
                Book a walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
