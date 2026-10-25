import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, UserCheck, Mic, FileCheck2, ShieldAlert } from "lucide-react";
import { Reveal } from "../components/reveal";
import { Shot } from "../components/shot";
import { englishTestingAddOn } from "../content";

export const metadata: Metadata = {
  title: "English Language Proficiency testing — $10 per test, no subscription",
  description:
    "Run and record FMCSA English Language Proficiency checks on any driver. Text the test, they take it on any phone, AI scores it consistently, and the recording is stored as evidence. Pay per test — no subscription.",
  alternates: { canonical: "/english-testing" },
};

/**
 * ELP has its OWN funnel, and it is NOT the subscription funnel.
 *
 * English testing is a standalone, credit-billed product: $10 a test, no plan required (see
 * `englishTestingAddOn`, and Billing:EnglishTestPriceCents server-side). Pushing these buyers at
 * "start your free month" would be selling them a monthly subscription they did not come for and
 * may not need — a carrier that needs eight drivers tested before next week wants to buy eight
 * tests, today.
 *
 * So every primary CTA here goes to the dedicated signup (`?source=english_test`, the same entry
 * the existing ELP landing page uses — that param must be preserved, it tags the signup source
 * and tailors the register page's copy). The subscription is mentioned once, at the bottom, as
 * context rather than as the ask.
 */
const ELP_SIGNUP = "https://app.fleetfalcon.io/register?source=english_test";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Text the driver a link",
    body: "Pick a driver and send the test to their phone. They take it on any phone, in the cab or at home — nothing to install.",
  },
  {
    icon: UserCheck,
    title: "Confirm it is really them",
    body: "A selfie plus a CDL photo, face-matched — so the score belongs to the driver it says it does, which is the first thing anyone challenging it will question.",
  },
  {
    icon: Mic,
    title: "A real spoken and reading check",
    body: "The driver speaks and reads FMCSA-style prompts. Every answer is recorded, so the result is evidence and not just a number.",
  },
  {
    icon: FileCheck2,
    title: "Scored consistently, stored as proof",
    body: "AI scores every test the same way, then files it against the driver with the date, score and recording — ready if it is ever contested.",
  },
];

export default function EnglishTestingPage() {
  return (
    <>
      {/* 1 — HERO: the regulation, then the ask (buy tests, not a plan) ----- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-faint px-3 py-1">
            <ShieldAlert className="h-4 w-4 text-accent" aria-hidden />
            <span className="text-sm font-bold text-accent">
              ELP is an out-of-service offence again
            </span>
          </div>

          <div className="mt-6 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="font-display text-4xl font-semibold leading-[1.03] tracking-tight sm:text-5xl lg:text-6xl">
                Prove your drivers can read the road.
              </h1>
              <p className="measure mt-5 text-lg leading-relaxed text-foreground-muted">
                FMCSA enforcement of English Language Proficiency puts a driver out of service at
                the roadside. Test every driver, record it properly, and keep the evidence on file
                — before an inspector makes the decision for you.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={ELP_SIGNUP}
                  className="lift inline-flex items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg"
                >
                  Start testing drivers
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link
                  href="/blog/elp-rule-out-of-service"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-7 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground"
                >
                  What the rule says
                </Link>
              </div>

              {/* The commercial shape IS the differentiator here — say it in the hero. */}
              <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-data font-mono text-3xl font-bold text-accent">
                  {englishTestingAddOn.price}
                </span>
                <span className="text-base font-semibold text-foreground">
                  {englishTestingAddOn.unit}
                </span>
                <span className="text-sm font-medium text-foreground-muted">
                  · no subscription required
                </span>
              </div>
            </div>

            {/* The driver's own view, mid-test. The previous image here was the generic
                driver-profile screenshot — documents and risk flags, nothing to do with ELP —
                under alt text claiming it showed a test result. It did not. */}
            <Shot
              src="/screenshots/elp-test-in-progress.png"
              alt="A driver partway through an English Language Proficiency test on their phone: question 13 of 18, a recording indicator, a bill of lading to read aloud, and a button to hear the question again"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2 — HOW IT WORKS --------------------------------------------------- */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="font-display max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Four steps, and the driver never leaves the cab
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                delay={i * 0.05}
                className="rounded-xl border border-border bg-background p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-faint text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display mt-4 text-lg leading-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{body}</p>
              </Reveal>
            ))}
          </div>

          {/* Identity verification and the pass summary in one view: the selfie face-matched
              against the CDL, and the score that follows from it. The licence itself is
              pixelated beyond recovery — what matters here is that the check happened and at
              what confidence, not what is printed on the card. */}
          <div className="mt-10">
            <Shot
              src="/screenshots/elp-identity-verified.png"
              alt="An ELP result: 18 correct answers with a Success verdict, above an identity-verification panel showing the driver's selfie matched against their CDL at 98.6% similarity, with the licence details obscured"
            />
          </div>
        </div>
      </section>

      {/* 3 — WHY THE RECORDING MATTERS -------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="font-display max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A score nobody can challenge is worth more than a score
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                h: "Fight an out-of-service order",
                b: "A dated recording of the driver reading and answering FMCSA-style prompts is concrete proof to contest a roadside ELP call — not an assertion that they speak English.",
              },
              {
                h: "Defend your hiring",
                b: "Showing you tested every driver, the same way, on a date you can produce is exactly the pattern a negligent-hiring claim tries to find missing.",
              },
              {
                h: "Same test, every driver",
                b: "AI scores every test identically. No manager grading a driver they like, and no inconsistency for a lawyer to pull on.",
              },
            ].map((c) => (
              <Reveal key={c.h} className="rounded-xl border border-border bg-surface p-6">
                <h3 className="font-display text-lg">{c.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{c.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — THE ASK: buy tests. Subscription is context, not the pitch. ---- */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
            <h2 className="font-display max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Pay for the tests you run. That&apos;s it.
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-foreground-muted">
              {englishTestingAddOn.blurb}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={ELP_SIGNUP}
                className="lift inline-flex items-center justify-center gap-2 rounded-lg border-2 border-transparent bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg"
              >
                Start testing drivers
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-7 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground"
              >
                See full platform pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
