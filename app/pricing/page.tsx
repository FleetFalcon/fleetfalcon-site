import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles, Check } from "lucide-react";
import { PricingTiers } from "../components/pricing-tiers";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly FleetFalcon pricing by fleet size — from $99/mo for 1–10 trucks. Every self-serve plan starts with a free month. No per-driver, per-seat math.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      {/* 1-month free trial, front and center */}
      {/* NOTE: backend EntitlementService.TrialDays is currently 14; site says 1 month (30d) per founder — backend must bump 14→30 to match */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-faint px-3 py-1">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
            <span className="text-sm font-medium text-foreground">
              1 month free — all features, cancel anytime
            </span>
          </div>
          <h1 className="font-display mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Flat monthly pricing. No per-driver math.
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-foreground-muted">
            One price per tier, chosen by how many trucks you run. Start any self-serve plan with a
            free month — we&apos;ll recommend the tier that matches your fleet. Over 100 trucks, or a
            multi-carrier consortium? Enterprise is quoted per deal.
          </p>

          <div className="mt-12">
            <PricingTiers />
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {[
              "Flat monthly — not per driver, no per-seat math",
              "1 month free on every self-serve plan",
              "Cancel anytime",
            ].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-foreground-muted">
                <Check className="h-4 w-4 text-accent" aria-hidden />
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-8">
            <Link
              href="/blog/fleetfalcon-vs-alternatives"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
            >
              See how FleetFalcon compares to J.J. Keller, Samba, Foley &amp; Motive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            Not sure which tier fits?
          </h2>
          <p className="measure mx-auto mt-4 text-[15px] leading-relaxed text-foreground-muted">
            We map your fleet&apos;s exact requirements by jurisdiction and asset type on the demo,
            so you see your gaps — and the right plan — on day one.
          </p>
          <Link
            href="/demo"
            className="lift mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg"
          >
            Book a demo
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
