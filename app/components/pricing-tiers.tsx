"use client";

import Link from "next/link";
import { Check, GraduationCap } from "lucide-react";
import { Reveal } from "./reveal";
import { planRegisterUrl } from "../signup";
import { pricingTiers, includedInEveryPlan, englishTestingAddOn } from "../content";

// The register URL, its optional `?plan=` and the reasons behind both live in `app/signup.ts`.
// They were local to this file, which is why seven trial buttons elsewhere on this site were
// pointing at /pricing: a rule kept inside one component is one the rest of the site cannot follow.
// English testing is a standalone product with its OWN signup page — the same register URL the
// existing ELP landing page uses. The ?source=english_test param must be preserved.
const ELP_URL = "https://app.fleetfalcon.io/register?source=english_test";

export function PricingTiers() {
  return (
    <div className="space-y-6">
      {/* Compact tier cards — same features everywhere, so these carry only fleet size + price. */}
      <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-2">
        {pricingTiers.map((t, i) => (
          <Reveal
            key={t.code}
            delay={i * 0.05}
            className={`flex flex-col rounded-xl border bg-surface p-6 transition-shadow hover:shadow-lg ${
              t.featured ? "border-accent ring-1 ring-accent" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg">{t.name}</h3>
              {t.featured && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  Popular
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-semibold text-foreground-muted">{t.trucks}</p>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-data font-display text-4xl">{t.price}</span>
              {t.selfServe && <span className="font-mono text-xs text-foreground-faint">/mo</span>}
            </div>
            {t.selfServe ? (
              /* 1-month free trial, front and center on every self-serve card. */
              <p className="mt-1 text-xs font-bold text-accent">1 month free, then {t.price}/mo</p>
            ) : (
              <p className="mt-1 text-xs font-semibold text-foreground-faint">Quoted per deal</p>
            )}

            <p className="mt-3 flex-1 text-sm leading-snug text-foreground-muted">{t.blurb}</p>

            {t.selfServe ? (
              <a
                href={planRegisterUrl(t.code)}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent-strong px-4 py-2.5 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Start your free month
              </a>
            ) : (
              <Link
                href="/demo"
                className="mt-6 inline-flex items-center justify-center rounded-lg border-2 border-border-strong px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-foreground"
              >
                Book a demo
              </Link>
            )}
          </Reveal>
        ))}
      </div>

      {/* Every plan includes the ENTIRE platform — the tiers differ only by truck count. */}
      <Reveal className="rounded-xl border border-border bg-surface-2 p-6 sm:p-8">
        <p className="font-display text-xl">
          Every plan includes <span className="text-accent">everything</span>.
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          No feature gates. You pick the tier by how many trucks you run — not by which tools you need.
        </p>
        <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {includedInEveryPlan.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={3} aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* English Testing — standalone, pay-per-test. Deliberately NOT a subscription feature. */}
      <Reveal className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-faint">
            <GraduationCap className="h-5 w-5 text-accent" aria-hidden />
          </span>
          <div>
            <p className="font-display text-lg">
              {englishTestingAddOn.name} — a standalone product
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-foreground-muted">
              {englishTestingAddOn.blurb}
            </p>
          </div>
        </div>
        <div className="shrink-0 text-left sm:text-right">
          <p className="whitespace-nowrap">
            <span className="text-data font-display text-3xl">{englishTestingAddOn.price}</span>{" "}
            <span className="font-mono text-xs text-foreground-faint">{englishTestingAddOn.unit}</span>
          </p>
          <p className="mt-0.5 text-xs font-semibold text-foreground-faint">pay as you go · no subscription</p>
          <a
            href={ELP_URL}
            className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg bg-accent-strong px-4 py-2 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Start English testing →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
