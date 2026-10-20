import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Shot } from "./components/shot";
import { SafetyCheck } from "./components/safety-check";
import { Reveal } from "./components/reveal";
import { Faq } from "./components/faq";
import { PricingTiers } from "./components/pricing-tiers";
import { HeroBand } from "./components/hero-band";
import { problems, features, secondaryModules } from "./content";

const HERO_CHECKS = ["Live in days", "No rip-and-replace", "Cancel anytime"];
const INTEGRATIONS: { name: string; logo: string | null }[] = [
  { name: "Samsara", logo: null }, // TODO: real Samsara logo still needed
  { name: "Motive", logo: "/integrations/motive-v2.png" },
  { name: "Geotab", logo: "/integrations/geotab-v2.png" },
  { name: "CarriersEdge", logo: "/integrations/carriersedge-v2.png" },
];
// First three modules become the big visual "beats"; the rest go in the compact grid.
const BEATS = features.slice(0, 3);
const GRID = [
  ...features.slice(3).map((f) => ({ name: f.name, body: f.intro, icon: f.icon })),
  ...secondaryModules,
];
// Per-module anchor slug so footer "Platform" links jump to the exact module, not the whole section.
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// The Plan (StoryBrand element 4) — a simple 3-step path that removes "how does this even work?"
const STEPS = [
  { n: "01", title: "Start your free month", body: "Create your account in minutes — no rip-and-replace, no IT project." },
  { n: "02", title: "We build your fleet's profile", body: "Import drivers and vehicles; FleetFalcon maps every requirement by jurisdiction and asset type. Live in days." },
  { n: "03", title: "It runs the 90%", body: "Tracking, renewals, inspections, incidents and citations run themselves. You make the 10% of calls that matter." },
];

export default function Home() {
  // Checked on the server at build time so the band can show the brand video the moment a file
  // exists, without a code change or a client-side probe that would flash a broken player.
  // Drop `hero-falcon-truck.mp4` (and optionally .webm) into /public and it goes live.
  const hasHeroVideo = ["hero-falcon-truck.mp4", "hero-falcon-truck.webm"].some((f) =>
    existsSync(path.join(process.cwd(), "public", f)),
  );

  return (
    <>
      {/* 0 — BRAND BAND: the majestic moment. Short on purpose — the converting hero sits
             directly below it and must not be pushed off the fold. */}
      <HeroBand hasVideo={hasHeroVideo} />

      {/* 1 — HERO (TPC pattern) -------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
          {/* proof bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              ["100+", "fleets"],
              ["2,000+", "drivers onboarded"],
              ["7", "compliance frameworks covered"],
            ].map(([n, l]) => (
              <div key={l} className="flex items-baseline gap-1.5">
                <span className="text-data font-mono text-lg font-semibold text-accent">{n}</span>
                <span className="text-sm font-medium text-foreground-muted">{l}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Protect your drivers.
                <br />
                And your <span className="text-accent">contracts</span>.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-foreground-muted">
                FleetFalcon runs the repetitive 90% of DOT compliance on autopilot, so your safety
                team gets back to coaching drivers — before a missed file turns into a lawsuit or a
                lost broker contract.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/pricing"
                  className="lift inline-flex items-center justify-center gap-2 rounded-lg bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg"
                >
                  Start your free month
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#safety-check"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-7 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground"
                >
                  Run a free safety check
                </a>
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-faint px-3 py-1">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                <span className="text-sm font-bold text-accent">1 month free · all features</span>
              </div>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {HERO_CHECKS.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Check className="h-4 w-4 text-success" strokeWidth={3} aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* real dashboard + bold red stat-callout card overlay (TPC style).
                Plain div, NOT Reveal — it's above the fold, so it must paint on load
                (whileInView can fail to fire for content already in view at mount). */}
            <div className="relative">
              <Shot
                src="/screenshots/dash.png"
                alt="FleetFalcon compliance dashboard showing driver and vehicle status, expiring documents, and open work items"
                priority
              />
              <div className="lift absolute -bottom-5 -left-3 rounded-xl bg-accent-strong px-5 py-4 text-accent-foreground shadow-xl sm:-left-5">
                <p className="text-data font-mono text-3xl font-bold leading-none">2,000+</p>
                <p className="mt-1.5 text-sm font-semibold leading-tight">
                  drivers onboarded
                  <br />&amp; audit-ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — FRAGMENTATION → one record (the integration story) ------------- */}
      {/* PLACEHOLDER: real partner logos (Samsara/Motive/Geotab/CarriersEdge) */}
      <section id="integrations" className="scroll-mt-24 border-b border-border bg-surface-2">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="text-eyebrow text-accent">One record, not five logins</p>
            <h2 className="mt-2 font-display text-2xl leading-tight sm:text-3xl">
              Your compliance is scattered across systems that were never built to talk.
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground-muted">
              Hours in your ELD. Training in another login. Driver files in a binder. FleetFalcon
              integrates with the tools you already run and pulls them into one audit-ready record —
              no rip-and-replace.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-foreground-faint">
              Integrates with
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {INTEGRATIONS.map((i) => (
                <span
                  key={i.name}
                  className="flex h-12 items-center justify-center rounded-lg border border-border bg-white px-5"
                >
                  {i.logo ? (
                    <span className="relative block h-7 w-24">
                      <Image
                        src={i.logo}
                        alt={`${i.name} logo`}
                        fill
                        sizes="96px"
                        className="object-contain object-center"
                      />
                    </span>
                  ) : (
                    <span className="text-sm font-bold tracking-tight text-[#15263f]">{i.name}</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm text-foreground-muted">
              ELD telematics (Motive, Samsara, Geotab) and training (CarriersEdge) — and it sits
              alongside your TMS.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — PROBLEM (tight) + stakes one-liner ---------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h2 className="font-display max-w-2xl text-3xl leading-tight sm:text-4xl">
            Compliance shouldn&apos;t feel like this
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.06} className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-lg">
                <p.icon className="h-6 w-6 text-accent" aria-hidden strokeWidth={2} />
                <p className="mt-4 font-bold text-foreground">{p.label}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-lg font-bold leading-snug text-foreground">
            Miss one file and it&apos;s not just a fine — it&apos;s an{" "}
            <span className="text-accent">out-of-service violation, a CSA score that scares off brokers, and a lawsuit you can&apos;t defend</span>.
          </p>
        </div>
      </section>

      {/* 4 — 90 / 10 (near-black block) ------------------------------------ */}
      <section id="mission" className="scroll-mt-20 bg-contrast text-contrast-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="text-data font-mono text-7xl font-bold text-white sm:text-8xl">90%</p>
              <p className="mt-3 text-xl font-bold">We run the boring part.</p>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/70">
                Tracking, renewals, inspections, onboarding, incidents and citations — the repetitive
                work that eats your week runs itself.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="md:border-l md:border-white/15 md:pl-10">
              <p className="text-data font-mono text-7xl font-bold text-accent sm:text-8xl">10%</p>
              <p className="mt-3 text-xl font-bold">You make the calls.</p>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-white/70">
                Which violation to fight. When to pull a unit. The safety decisions that actually
                matter — with the time back to make them well.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4.5 — TESTIMONIAL (Guide / social proof) -------------------------- */}
      {/* PLACEHOLDER quote — fictional, pending a real signed-off customer. The company name is
          deliberately a VERY common one: "Eagle Transport" is shared by 26+ carriers across 22
          states in the FMCSA census, so it identifies no single real entity. Do NOT swap in a
          rare/unique carrier name (that pins a fake quote on a real company — legally dangerous). */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
          <p className="text-eyebrow text-accent">Safety teams on FleetFalcon</p>
          <blockquote className="mt-5 font-display text-2xl leading-snug sm:text-3xl">
            &ldquo;Our TMS tracked the loads — it never chased a medical card. FleetFalcon flags
            them weeks ahead, pulls our ELD and training into one record, and turns a roadside
            violation into a documented fix instead of a surprise.&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
              MD
            </span>
            <span className="text-left text-sm">
              <span className="block font-bold text-foreground">Marcus Delgado</span>
              <span className="block text-foreground-muted">Director of Safety, Eagle Transport</span>
            </span>
          </figcaption>
        </div>
      </section>

      {/* 5 — FEATURES: 3 beats + compact grid ------------------------------ */}
      <section id="platform" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h2 className="font-display max-w-2xl text-3xl leading-tight sm:text-4xl">
            One platform for the whole compliance stack
          </h2>

          <div className="mt-12 space-y-14">
            {BEATS.map((f, i) => {
              const imageLeft = i % 2 === 1;
              return (
                <div key={f.name} id={slug(f.name)} className="scroll-mt-24">
                  <Reveal>
                  <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className={imageLeft ? "lg:order-2" : ""}>
                      <div className="flex items-center gap-2.5">
                        <f.icon className="h-6 w-6 text-accent" aria-hidden strokeWidth={2} />
                        <h3 className="font-display text-2xl">{f.name}</h3>
                      </div>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-foreground-muted">
                        {f.intro}
                      </p>
                      <p className="mt-3 flex items-start gap-2 text-[15px] font-semibold text-foreground">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-success" strokeWidth={3} aria-hidden />
                        {f.points[0].title}
                      </p>
                    </div>
                    <div className={imageLeft ? "lg:order-1" : ""}>
                      <Shot src={f.shot} alt={f.alt} />
                    </div>
                  </div>
                  </Reveal>
                </div>
              );
            })}
          </div>

          {/* everything else, in one place */}
          <div className="mt-16">
            <p className="font-display text-xl">Everything else, in one place</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GRID.map((m) => (
                <div key={m.name} id={slug(m.name)} className="lift scroll-mt-24 rounded-xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-2.5">
                    <m.icon className="h-5 w-5 text-accent" aria-hidden strokeWidth={2} />
                    <h3 className="text-base font-bold text-foreground">{m.name}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 — HOW IT WORKS: the Plan (3 steps) ---------------------------- */}
      <section id="how-it-works" className="scroll-mt-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <h2 className="font-display max-w-2xl text-3xl leading-tight sm:text-4xl">
            Up and running in three steps
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground-muted">
            From spreadsheets to a fleet that runs itself — no rip-and-replace, live in days.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="border-t-2 border-accent pt-5">
                  <p className="text-data font-mono text-sm font-bold text-accent">{s.n}</p>
                  <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-foreground-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — FREE SAFETY CHECK (compact) ----------------------------------- */}
      <section id="safety-check" className="scroll-mt-20 border-b border-border bg-surface-2">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            See what a green score is hiding
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-foreground-muted">
            Enter your USDOT or MC number — we&apos;ll surface the dangerous violations a clean BASIC
            score can mask. No account needed.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <SafetyCheck />
          </div>
        </div>
      </section>

      {/* 7 — PRICING + trial + final CTA ----------------------------------- */}
      <section id="pricing" className="scroll-mt-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Flat monthly. No per-driver math.
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-foreground-muted">
                Pick the tier that fits your truck count. Every self-serve plan starts with a free
                month.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-accent-faint px-3 py-1 md:self-auto">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              <span className="text-sm font-bold text-accent">1 month free · cancel anytime</span>
            </div>
          </div>

          <div className="mt-10">
            <PricingTiers />
          </div>

          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
            >
              Full pricing detail
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog/fleetfalcon-vs-alternatives"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
            >
              See how FleetFalcon compares to J.J. Keller, Samba, Foley &amp; Motive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8 — FINAL CTA ----------------------------------------------------- */}
      <section className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <h2 className="font-display mx-auto max-w-2xl text-4xl leading-[1.05] sm:text-5xl">
            Become the fleet that&apos;s never caught off guard
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Let the software handle the paperwork. You keep the fleet safe, audit-ready, and moving.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="lift inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg sm:w-auto"
            >
              Start your free month
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-border-strong px-7 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground sm:w-auto"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      {/* 9 — FAQ ----------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
