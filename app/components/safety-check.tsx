"use client";

import { useState } from "react";
import { registerUrl } from "../signup";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ArrowRight, AlertTriangle, Loader2, ShieldAlert } from "lucide-react";
import { EquipmentCharts } from "./equipment-charts";

// Lazy — the inline US map geometry is ~110KB and only needed once a result renders.
const UsChoropleth = dynamic(() => import("./us-choropleth").then((m) => m.UsChoropleth), {
  ssr: false,
  loading: () => <div className="h-44 animate-pulse rounded-md bg-border/40" />,
});

type Make = { make: string; count: number; pct: number };
type Category = { total: number; makes: Make[] };
type Oos = { insp: number; oos: number; rate: number } | null;

type Basic = {
  key: string;
  label: string;
  measure: number;
  inspWithViol: number;
  alert: boolean;
  pctWorseThan: number | null;
};

type Problem = {
  group: string;
  basic: string;
  count: number;
  severity: number;
  oos: number;
  severe: boolean;
};

type Result = {
  found: boolean;
  dot?: string;
  name?: string | null;
  dba?: string | null;
  city?: string | null;
  state?: string | null;
  powerUnits?: number;
  drivers?: number;
  safetyRating?: string;
  hazmat?: boolean;
  mc?: string | null;
  inspections?: number;
  oosViolations?: number;
  vehicleOos?: Oos;
  driverOos?: Oos;
  oosNational?: { vehicle: number; driver: number };
  crashes?: number;
  basics?: Basic[];
  worstBasic?: string | null;
  topProblems?: Problem[];
  serviceMap?: { state: string; count: number }[];
  equipment?: { trucks: Category; trailers: Category };
  error?: string;
};

const fmt = (n: number | undefined) => (typeof n === "number" ? n.toLocaleString("en-US") : "—");

// Turn a severe violation group into plain English for the TL;DR.
function humanizeSevere(group: string): string {
  const g = group.toLowerCase();
  if (/licens|cdl/.test(g)) return "a driver operating without a valid CDL";
  if (/false log|log/.test(g)) return "a falsified logbook";
  if (/dangerous|reckless/.test(g)) return "dangerous-driving citations";
  if (/alcohol|drug|substance/.test(g)) return "a drug or alcohol violation";
  return g;
}

// A BASIC percentile reads as "worse than X% of carriers". A LOW number is good — so flip the good
// half to "better than (100−X)%" to avoid the "worse than 35% sounds bad but is good" trap.
function basicRank(pct: number | null): { text: string; tone: string } {
  if (pct == null) return { text: "clean", tone: "text-success" };
  if (pct >= 75) return { text: `worse than ${pct}%`, tone: "text-accent" };
  if (pct >= 50) return { text: `worse than ${pct}%`, tone: "text-foreground" };
  return { text: `better than ${100 - pct}%`, tone: "text-foreground-faint" };
}

type Risk = { level: "high" | "med"; text: string };

// The TL;DR — the most dangerous few signals, ordered worst-first. Stays empty (→ a clean
// bill of health) when there genuinely aren't red flags, so it never manufactures alarm.
function topRisks(r: Result): Risk[] {
  const out: Risk[] = [];
  const problems = r.topProblems ?? [];

  const severe = problems.filter((p) => p.severe);
  if (severe.length) {
    const phrases = [...new Set(severe.slice(0, 2).map((p) => humanizeSevere(p.group)))];
    out.push({ level: "high", text: `Hard-to-defend violations on record — ${phrases.join(" and ")}.` });
  }
  if ((r.crashes ?? 0) > 0) {
    out.push({
      level: (r.crashes ?? 0) >= 5 ? "high" : "med",
      text: `${r.crashes} DOT-reportable crash${r.crashes === 1 ? "" : "es"} in the past 24 months.`,
    });
  }
  const vOos = r.vehicleOos;
  const natlVeh = r.oosNational?.vehicle ?? 22.3;
  if (vOos && vOos.rate >= natlVeh) {
    const mult = vOos.rate / natlVeh;
    out.push({
      level: vOos.rate >= 40 ? "high" : "med",
      text: `Vehicle out-of-service rate ${vOos.rate}% — ${mult >= 1.5 ? `${mult.toFixed(1)}× ` : "above "}the ${natlVeh}% national average.`,
    });
  }
  const top = problems[0];
  if (top && out.length < 3) {
    out.push({ level: "med", text: `${top.group} is your biggest score drag — ${top.count}× under ${top.basic}.` });
  }
  if (r.worstBasic && out.length < 3) {
    const wb = (r.basics ?? []).find((b) => b.label === r.worstBasic);
    if (wb?.pctWorseThan != null)
      out.push({ level: "med", text: `Weakest BASIC: ${r.worstBasic} — worse than ${wb.pctWorseThan}% of carriers.` });
  }
  return out.slice(0, 3);
}

// Real FMCSA pull via /api/safety-check (public SAFER + SMS BASIC + violation open data, no key).
export function SafetyCheck() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const cleaned = value.replace(/[^0-9]/g, "").slice(0, 8);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cleaned.length < 2) {
      setError("Enter a USDOT or MC number.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/safety-check?dot=${cleaned}`);
      const data: Result = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Lookup failed — try again.");
      } else if (!data.found) {
        setError(`No carrier found for ${cleaned}. Double-check the USDOT or MC number.`);
      } else {
        setResult(data);
      }
    } catch {
      setError("Couldn't reach FMCSA just now — try again in a moment.");
    }
    setLoading(false);
  }

  const problems = result?.topProblems ?? [];
  const maxSev = problems.reduce((m, p) => Math.max(m, p.severity), 0) || 1;
  const severeHit = problems.find((p) => p.severe);
  const risks = result?.found ? topRisks(result) : [];

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="dot" className="sr-only">
          Enter your USDOT or MC number
        </label>
        <div className="flex flex-1 items-center gap-2 rounded-lg border-2 border-border-strong bg-surface px-3 focus-within:border-accent">
          <Search className="h-4 w-4 shrink-0 text-foreground-faint" aria-hidden />
          <input
            id="dot"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your USDOT or MC number"
            className="w-full bg-transparent py-3 font-mono text-sm text-foreground outline-none placeholder:text-foreground-faint"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="lift inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-strong px-5 py-3 text-sm font-bold text-accent-foreground shadow-sm hover:shadow-lg disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Checking FMCSA…
            </>
          ) : (
            <>
              Run my free safety check
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
      <p className="text-eyebrow mt-3 text-foreground-faint">Free · live FMCSA data · no account</p>

      {error && <p className="mt-4 text-sm font-medium text-accent">{error}</p>}

      <AnimatePresence>
        {result?.found && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-5 rounded-lg border border-border bg-surface p-5 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-eyebrow text-foreground-faint">Your FMCSA record</span>
                <span className="text-eyebrow rounded-sm border border-success/40 bg-success/10 px-1.5 py-0.5 text-success">
                  Live
                </span>
              </div>

              <p className="mt-2 font-display text-lg leading-tight">{result.name}</p>
              <p className="text-sm text-foreground-muted">
                USDOT {result.dot}
                {result.mc ? ` · MC-${result.mc}` : ""}
                {result.city ? ` · ${result.city}, ${result.state}` : ""}
                {result.powerUnits ? ` · ${fmt(result.powerUnits)} trucks` : ""}
                {result.drivers ? ` · ${fmt(result.drivers)} drivers` : ""}
              </p>

              {/* TL;DR — the most dangerous few signals, worst-first. Empty = genuinely clean. */}
              {risks.length > 0 ? (
                <div className="mt-4 rounded-lg border border-accent/30 bg-accent-faint px-4 py-3">
                  <p className="text-eyebrow flex items-center gap-1.5 text-accent">
                    <ShieldAlert className="h-3.5 w-3.5" aria-hidden /> Biggest risks
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {risks.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                        <span
                          className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${r.level === "high" ? "bg-accent" : "bg-foreground-faint"}`}
                          aria-hidden
                        />
                        <span className={r.level === "high" ? "font-medium text-foreground" : "text-foreground-muted"}>
                          {r.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-success/30 bg-success/10 px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    No critical red flags in the public record. Here&apos;s the full breakdown.
                  </p>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Readout label="Safety rating" value={result.safetyRating || "Not rated"} muted />
                <Readout label="Inspections (24mo)" value={fmt(result.inspections)} />
                <Readout
                  label="Vehicle OOS"
                  value={result.vehicleOos ? `${result.vehicleOos.rate}%` : "—"}
                  danger={!!result.vehicleOos && result.vehicleOos.rate > (result.oosNational?.vehicle ?? 22.3)}
                />
                <Readout label="Crashes (24mo)" value={fmt(result.crashes)} danger={(result.crashes ?? 0) > 0} />
              </div>

              {/* Out-of-service detail — the REAL per-type rate (OOS inspections ÷ inspections of that
                  type), anchored to the national average. Never OOS violations ÷ total inspections. */}
              {(result.vehicleOos || result.driverOos) && (
                <div className="mt-3 rounded-md border border-border bg-background/40 px-3 py-2.5">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-8">
                    {result.vehicleOos && (
                      <OosLine label="Vehicle OOS" o={result.vehicleOos} natl={result.oosNational?.vehicle ?? 22.3} />
                    )}
                    {result.driverOos && (
                      <OosLine label="Driver OOS" o={result.driverOos} natl={result.oosNational?.driver ?? 6.7} />
                    )}
                  </div>
                  {result.oosViolations != null && (
                    <p className="mt-1.5 text-xs text-foreground-faint">
                      {fmt(result.oosViolations)} out-of-service violations recorded across{" "}
                      {fmt(result.inspections)} inspections.
                    </p>
                  )}
                </div>
              )}

              {/* What's actually dragging the score — concrete violation groups, ranked by FMCSA's own
                  severity weighting. We show the plain-English count + rank; the bar carries the weight
                  (the raw weighted sum is jargon to a fleet owner and nonstandard to an expert). */}
              {problems.length > 0 && (
                <div className="mt-6">
                  <p className="text-eyebrow text-foreground-faint">What&apos;s dragging your score</p>
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {problems.map((p, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`truncate text-sm font-semibold ${p.severe ? "text-accent" : "text-foreground"}`}
                            >
                              {p.group}
                            </span>
                            {p.severe && <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />}
                            {i === 0 && (
                              <span className="text-eyebrow rounded-sm bg-foreground/10 px-1 py-0.5 text-foreground-muted">
                                biggest drag
                              </span>
                            )}
                            {p.oos > 0 && (
                              <span className="text-eyebrow rounded-sm bg-accent-faint px-1 py-0.5 text-accent">
                                {p.oos} OOS
                              </span>
                            )}
                          </div>
                          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                            <div
                              className={`h-full rounded-full ${p.severe ? "bg-accent" : "bg-foreground-muted"}`}
                              style={{ width: `${Math.max(8, Math.round((p.severity / maxSev) * 100))}%` }}
                            />
                          </div>
                          <p className="mt-1 text-xs text-foreground-faint">
                            {fmt(p.count)} violation{p.count === 1 ? "" : "s"} · {p.basic}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-faint">
                    Ranked by FMCSA severity weight — bar length shows how hard each group is pulling your score
                    down, not just how many violations.
                  </p>
                </div>
              )}

              {/* Per-BASIC standing vs every carrier with roadside data. Good scores read "better than
                  X%" (a low "worse than" number is actually good and confuses people). */}
              {result.basics && result.basics.some((b) => b.pctWorseThan != null) && (
                <div className="mt-6">
                  <p className="text-eyebrow text-foreground-faint">
                    By BASIC · your rank vs all carriers{result.worstBasic ? ` · weakest: ${result.worstBasic}` : ""}
                  </p>
                  <ul className="mt-2.5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {result.basics.map((b) => {
                      const rank = basicRank(b.pctWorseThan);
                      return (
                        <li key={b.key} className="flex items-center justify-between gap-3 text-sm">
                          <span
                            className={`truncate ${b.label === result.worstBasic ? "font-semibold text-foreground" : "text-foreground-muted"}`}
                          >
                            {b.label}
                          </span>
                          <span className={`shrink-0 font-mono text-xs ${rank.tone}`}>{rank.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-faint">
                    Ranked against every carrier with public roadside data — <span className="font-medium">not</span>{" "}
                    the official SMS percentile within your safety-event-group peer set, which is carrier-view-only.
                  </p>
                </div>
              )}

              {/* Service map — roadside inspections by state, straight from the inspection file. */}
              {result.serviceMap && result.serviceMap.length > 0 && (
                <div className="mt-6">
                  <p className="text-eyebrow text-foreground-faint">Service map · where your trucks get inspected</p>
                  <div className="mt-2 rounded-md border border-border bg-background/40 p-2">
                    <UsChoropleth data={result.serviceMap} />
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2 text-xs text-foreground-faint">
                    <span>Fewer</span>
                    <span
                      className="h-2 w-24 rounded-full"
                      style={{ background: "linear-gradient(to right, var(--surface), var(--accent))" }}
                      aria-hidden
                    />
                    <span>More</span>
                  </div>
                </div>
              )}

              {/* Equipment — tractor/trailer make mix, reconstructed + de-duped from inspection units. */}
              {result.equipment && (result.equipment.trucks.total > 0 || result.equipment.trailers.total > 0) && (
                <div className="mt-6">
                  <p className="text-eyebrow text-foreground-faint">Equipment mix · from units seen in inspections</p>
                  <div className="mt-3">
                    <EquipmentCharts trucks={result.equipment.trucks} trailers={result.equipment.trailers} />
                  </div>
                </div>
              )}

              {/* Honest reframe: the public data is the WHAT. The product is the WHO + the fix. */}
              <div className="mt-6 flex items-start gap-2 rounded-md bg-accent-faint px-3 py-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <p className="text-sm leading-snug text-foreground">
                  This is your <span className="font-semibold">public</span> record — the violations, not the people.
                  {severeHit ? (
                    <>
                      {" "}
                      It already shows a <span className="font-semibold">{severeHit.group.toLowerCase()}</span> flag.
                    </>
                  ) : null}{" "}
                  FleetFalcon ties each one to the <span className="font-semibold">driver and truck</span> behind it,
                  flags the ones you can <span className="font-semibold">challenge off your record</span> via DataQs, and
                  runs the fix — corrective action, training, documentation. That&apos;s Violation Radar.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href={registerUrl("safety_check")}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
                >
                  Fix what&apos;s on your record — start your free month
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/demo" className="text-sm font-semibold text-foreground-muted hover:text-foreground">
                  or book a demo
                </Link>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-foreground-faint">
                Live from FMCSA public data (SAFER census, SMS roadside inspections, violation file with severity
                weights, crash file). Percentiles rank you against every carrier with roadside data. Driver-level
                attribution and the official SMS percentile within your safety-event group need the authorized pull.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// One OOS line: the real per-type rate (OOS inspections ÷ inspections of that type) with its
// denominator shown, anchored to the national average. Red when above national.
function OosLine({ label, o, natl }: { label: string; o: { insp: number; oos: number; rate: number }; natl: number }) {
  const above = o.rate > natl;
  return (
    <div className="flex items-baseline gap-1.5 text-sm">
      <span className="text-foreground-muted">{label}</span>
      <span className={`text-data font-semibold ${above ? "text-accent" : "text-foreground"}`}>{o.rate}%</span>
      <span className="text-xs text-foreground-faint">
        ({fmt(o.oos)}/{fmt(o.insp)} insp · vs {natl}% nat&apos;l)
      </span>
    </div>
  );
}

function Readout({
  label,
  value,
  danger,
  muted,
}: {
  label: string;
  value: string;
  danger?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="text-eyebrow text-foreground-faint">{label}</p>
      <p
        className={`text-data mt-1 text-xl font-semibold ${
          danger ? "text-accent" : muted ? "text-foreground-muted" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
