import { NextResponse } from "next/server";

/**
 * Free safety check — a REAL pull of FMCSA's public open data (no API key required).
 *
 * What's public (and additive over a plain SAFER lookup):
 *   - identity, fleet size, safety rating, roadside-inspection + OOS counts, crashes   (census + inspection file)
 *   - per-BASIC measures + the carrier's percentile vs every carrier with roadside data (SMS "AB pass" file)
 *   - the CONCRETE violations dragging the score — "Tires", "Brakes", "False log",
 *     "Operating a CMV without a CDL" — ranked by FMCSA's own severity weight          (SMS "Violation" file)
 *
 * What is NOT in the public data (this is the product, pitched honestly — not faked):
 *   - which of *your* drivers / trucks each violation belongs to (the file names a unit, not a person)
 *   - which violations are erroneous and DataQs-challengeable off your record
 *   - the official SMS percentile within your safety-event group, continuous alerting, and the fix/resolve loop
 *
 * Sources (FMCSA on data.transportation.gov; same datasets the main platform uses):
 *   census      az4n-8mr2  — carrier registration / SAFER
 *   inspections rbkj-cgst  — SMS roadside inspections (per-inspection OOS)
 *   basics      4y6x-dmck  — SMS BASIC measures per carrier (716k+ carriers)
 *   violations  8mt8-2mdr  — SMS violation file: concrete violation, BASIC, OOS + severity weight
 *   crashes     aayw-vxb3  — crash file
 */

const CENSUS = "https://data.transportation.gov/resource/az4n-8mr2.json";
const INSPECTIONS = "https://data.transportation.gov/resource/rbkj-cgst.json";
const BASICS = "https://data.transportation.gov/resource/4y6x-dmck.json";
const VIOLATIONS = "https://data.transportation.gov/resource/8mt8-2mdr.json";
const CRASHES = "https://data.transportation.gov/resource/aayw-vxb3.json";

const RATING: Record<string, string> = {
  S: "Satisfactory",
  C: "Conditional",
  U: "Unsatisfactory",
};

// FMCSA-published national average out-of-service rates (SAFER "Nat'l Average %"). Stable
// quarter-to-quarter; used only as the comparison anchor next to the carrier's own rate.
const NATL_VEHICLE_OOS = 22.3;
const NATL_DRIVER_OOS = 6.7;

const round1 = (n: number) => Math.round(n * 10) / 10;

// The five SMS BASICs, mapped to their columns in the measure file (4y6x-dmck).
const BASIC_DEFS = [
  { key: "unsafe", label: "Unsafe Driving", m: "unsafe_driv_measure", v: "unsafe_driv_insp_w_viol", ac: "unsafe_driv_ac" },
  { key: "hos", label: "Hours of Service", m: "hos_driv_measure", v: "hos_driv_insp_w_viol", ac: "hos_driv_ac" },
  { key: "fit", label: "Driver Fitness", m: "driv_fit_measure", v: "driv_fit_insp_w_viol", ac: "driv_fit_ac" },
  { key: "subst", label: "Controlled Substances", m: "contr_subst_measure", v: "contr_subst_insp_w_viol", ac: "contr_subst_ac" },
  { key: "veh", label: "Vehicle Maintenance", m: "veh_maint_measure", v: "veh_maint_insp_w_viol", ac: "veh_maint_ac" },
] as const;

// Groups that make a fleet hard to defend in a lawsuit / audit — surfaced in red.
const SEVERE = /false log|licens|cdl|alcohol|drug|dangerous|reckless/i;

function sodaHeaders(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" };
  const token = process.env.SOCRATA_APP_TOKEN; // optional — raises Socrata's anon rate limit
  if (token) h["X-App-Token"] = token;
  return h;
}

async function soda<T = Record<string, string>>(url: string, revalidate = 3600): Promise<T[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { headers: sodaHeaders(), signal: controller.signal, next: { revalidate } });
    if (!res.ok) throw new Error(`Socrata ${res.status}`);
    return (await res.json()) as T[];
  } finally {
    clearTimeout(timeout);
  }
}

function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Equipment make codes are entered free-hand on inspection reports (MCMIS), so one maker shows up
// as many spellings (VOLV/VOLVO, MACK/MACM/MACL, EAST/EADU/EASTON CAR) alongside pure data-entry
// garbage (ESMC, MTLM, TRLR). Map the real makers to a canonical name; bucket everything we don't
// recognize into "Other" rather than surfacing the raw junk code.
function normalizeMake(raw: string): string {
  const s = raw.toUpperCase().trim();
  if (!s) return "";
  const has = (...k: string[]) => k.some((x) => s.includes(x));
  // Tractors
  if (has("VOLV")) return "Volvo";
  if (has("FRHT", "FREIGHT", "FTL", "FRTL")) return "Freightliner";
  if (has("MACK", "MACM", "MACL")) return "Mack";
  if (has("INTL", "INTERNAT", "IHC")) return "International";
  if (s === "KW" || has("KENW", "KNWR")) return "Kenworth";
  if (has("PETE", "PTRB", "PETB")) return "Peterbilt";
  if (has("WSTR", "WESTERN STAR", "WEST STAR")) return "Western Star";
  // Trailers
  if (has("HYUN", "HYTR", "HYUT", "HUND", "HYT")) return "Hyundai Translead";
  if (s === "WAB" || has("WABA", "WABASH")) return "Wabash";
  if (has("GRDT", "GDAN", "GREAT DANE", "GRTD", "GDN")) return "Great Dane";
  if (has("UTIL", "UTLT")) return "Utility";
  if (has("VANG", "VANR", "VNGD")) return "Vanguard";
  if (has("STOU", "STGH")) return "Stoughton";
  if (has("EAST", "EASTON")) return "East"; // East Mfg (dump/flatbed); EADU etc. fall through to Other
  if (has("DOON")) return "Doonan";
  if (has("STRK", "STRICK")) return "Strick";
  if (has("DORS")) return "Dorsey";
  if (has("MANA")) return "Manac";
  if (has("TIMP")) return "Timpte";
  if (has("FONT")) return "Fontaine";
  if (has("WILS")) return "Wilson";
  if (has("REIT")) return "Reitnouer";
  if (has("TRANSCRAFT", "TRNS")) return "Transcraft";
  if (has("OTHR", "UNPUB", "UNKN", "OTHER", "NONE")) return "Other";
  // A spelled-out name we didn't enumerate (has a space, or 5+ letters with a vowel) is probably a
  // real maker → title-case it. Short unrecognized codes (ESMC, MTLM, EADU, TRLR) are garbage → Other.
  if (s.includes(" ")) return s.split(/\s+/).map((w) => w.charAt(0) + w.slice(1).toLowerCase()).join(" ");
  if (s.length >= 5 && /[AEIOU]/.test(s)) return s.charAt(0) + s.slice(1).toLowerCase();
  return "Other";
}

// Build a make breakdown from distinct (VIN, make) pairs. A single unit can be logged under
// several make spellings across inspections, so we assign each VIN ONE canonical make (the one
// seen most often) and count distinct VINs — never summing per-spelling counts, which double-counts.
function makeBreakdown(rows: Record<string, string>[], vinKey: string, makeKey: string) {
  // vin -> canonical make -> how many times that canonical make was seen for this vin
  const vinMakes = new Map<string, Map<string, number>>();
  for (const r of rows) {
    const vin = String(r[vinKey] ?? "").trim();
    const canon = normalizeMake(String(r[makeKey] ?? ""));
    if (!vin || !canon) continue;
    const mm = vinMakes.get(vin) ?? new Map<string, number>();
    mm.set(canon, (mm.get(canon) ?? 0) + 1);
    vinMakes.set(vin, mm);
  }
  // Each distinct VIN counts once, toward its most-frequently-recorded canonical make.
  const perMake = new Map<string, number>();
  for (const mm of vinMakes.values()) {
    let best = "";
    let bestN = -1;
    for (const [mk, n] of mm) {
      if (n > bestN) {
        best = mk;
        bestN = n;
      }
    }
    perMake.set(best, (perMake.get(best) ?? 0) + 1);
  }
  const total = vinMakes.size;
  const sorted = [...perMake.entries()].map(([make, count]) => ({ make, count })).sort((a, b) => b.count - a.count);
  const top = sorted.slice(0, 5);
  const other = sorted.slice(5).reduce((s, x) => s + x.count, 0);
  if (other > 0) top.push({ make: "Other", count: other });
  return { total, makes: top.map((m) => ({ ...m, pct: total > 0 ? Math.round((m.count / total) * 100) : 0 })) };
}

// % of carriers (with any measure in this BASIC) that score LOWER — i.e. "worse than X%".
// National denominators change slowly, so cache them for a day.
async function percentile(measureCol: string, value: number): Promise<number | null> {
  if (!(value > 0)) return null;
  const lowerQ = new URLSearchParams({ $select: "count(*)", $where: `${measureCol}::number < ${value} AND ${measureCol}::number > 0` });
  const totalQ = new URLSearchParams({ $select: "count(*)", $where: `${measureCol}::number > 0` });
  const [lower, total] = await Promise.all([
    soda(`${BASICS}?${lowerQ}`).catch(() => [] as Record<string, string>[]),
    soda(`${BASICS}?${totalQ}`, 86400).catch(() => [] as Record<string, string>[]),
  ]);
  const l = num(lower[0]?.count);
  const t = num(total[0]?.count);
  return t > 0 ? Math.round((l / t) * 100) : null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const digits = (searchParams.get("dot") || "").replace(/[^0-9]/g, "").slice(0, 8);
  if (digits.length < 2) {
    return NextResponse.json({ found: false, error: "Enter a USDOT or MC number." }, { status: 400 });
  }

  try {
    // Look up by USDOT first; fall back to MC docket (the input accepts either).
    let census = await soda(`${CENSUS}?dot_number=${digits}&$limit=1`);
    if (census.length === 0) {
      census = await soda(`${CENSUS}?$where=docket1prefix='MC' AND docket1='${digits}'&$limit=1`);
    }
    if (census.length === 0) return NextResponse.json({ found: false });

    const c = census[0];
    const dot = String(c.dot_number);

    // 24-month cutoff (YYYYMMDD, matching the crash file's string dates).
    const since = new Date();
    since.setFullYear(since.getFullYear() - 2);
    const cutoff = `${since.getFullYear()}${String(since.getMonth() + 1).padStart(2, "0")}${String(since.getDate()).padStart(2, "0")}`;

    const inspQ = new URLSearchParams({ $select: "count(*) as insp, sum(oos_total::number) as oos", $where: `dot_number='${dot}'` });
    const crashQ = new URLSearchParams({ $select: "count(*) as crashes", $where: `dot_number='${dot}' AND report_date >= '${cutoff}'` });
    const problemsQ = new URLSearchParams({
      $select: "group_desc,basic_desc,count(*) as n,sum(total_severity_wght::number) as sev,sum(case(oos_indicator='Y',1,true,0)) as oos",
      $where: `dot_number='${dot}' AND group_desc IS NOT NULL`,
      $group: "group_desc,basic_desc",
      $order: "sev desc",
      $limit: "6",
    });

    // Service map — every roadside inspection is stamped with the state it happened in.
    const stateQ = new URLSearchParams({
      $select: "report_state, count(*) as n",
      $where: `dot_number='${dot}' AND report_state IS NOT NULL`,
      $group: "report_state",
      $order: "n desc",
      $limit: "60",
    });
    // Equipment — distinct (VIN, make) pairs per unit (tractor = unit 1, trailer = unit 2).
    // Dedup to one make per VIN happens in makeBreakdown, so we fetch the raw distinct pairs.
    const truckMakeQ = new URLSearchParams({
      $select: "vin, unit_make",
      $where: `dot_number='${dot}' AND (unit_type_desc like '%TRACTOR%' OR unit_type_desc='TRUCK') AND vin IS NOT NULL AND unit_make IS NOT NULL`,
      $group: "vin, unit_make",
      $limit: "20000",
    });
    const trailerMakeQ = new URLSearchParams({
      $select: "vin2, unit_make2",
      $where: `dot_number='${dot}' AND vin2 IS NOT NULL AND unit_make2 IS NOT NULL`,
      $group: "vin2, unit_make2",
      $limit: "20000",
    });

    const [inspAgg, crashAgg, basicRows, problemRows, stateRows, truckRows, trailerRows] = await Promise.all([
      soda(`${INSPECTIONS}?${inspQ}`).catch(() => [] as Record<string, string>[]),
      soda(`${CRASHES}?${crashQ}`).catch(() => [] as Record<string, string>[]),
      soda(`${BASICS}?dot_number=${dot}&$limit=1`).catch(() => [] as Record<string, string>[]),
      soda(`${VIOLATIONS}?${problemsQ}`).catch(() => [] as Record<string, string>[]),
      soda(`${INSPECTIONS}?${stateQ}`).catch(() => [] as Record<string, string>[]),
      soda(`${INSPECTIONS}?${truckMakeQ}`).catch(() => [] as Record<string, string>[]),
      soda(`${INSPECTIONS}?${trailerMakeQ}`).catch(() => [] as Record<string, string>[]),
    ]);

    // Per-BASIC measures + percentile-vs-every-carrier (only for BASICs with a measure).
    const b = basicRows[0] ?? {};

    // Out-of-service: compute the REAL rate = OOS *inspections* ÷ inspections, split by type, from
    // the SMS file (vehicle and driver have different denominators). NEVER OOS violations ÷ total
    // inspections — that's a category error that can exceed 100%. The raw violation count is kept
    // separately as its own honest stat.
    const inspTotal = num(b.insp_total) || num(inspAgg[0]?.insp);
    const oosViolations = num(inspAgg[0]?.oos); // sum(oos_total) — units/violations placed OOS
    const vehInsp = num(b.vehicle_insp_total);
    const vehOos = num(b.vehicle_oos_insp_total);
    const drvInsp = num(b.driver_insp_total);
    const drvOos = num(b.driver_oos_insp_total);
    const vehicleOos = vehInsp > 0 ? { insp: vehInsp, oos: vehOos, rate: round1((100 * vehOos) / vehInsp) } : null;
    const driverOos = drvInsp > 0 ? { insp: drvInsp, oos: drvOos, rate: round1((100 * drvOos) / drvInsp) } : null;
    const basics = await Promise.all(
      BASIC_DEFS.map(async (d) => {
        const measure = num((b as Record<string, string>)[d.m]);
        return {
          key: d.key,
          label: d.label,
          measure,
          inspWithViol: num((b as Record<string, string>)[d.v]),
          alert: (b as Record<string, string>)[d.ac] === "Y",
          pctWorseThan: await percentile(d.m, measure),
        };
      })
    );
    // Weakest = the BASIC the carrier ranks worst on (highest percentile).
    const ranked = basics.filter((x) => x.pctWorseThan != null);
    const worstBasic = ranked.length ? ranked.reduce((a, x) => (x.pctWorseThan! > a.pctWorseThan! ? x : a)).label : null;

    const topProblems = problemRows.map((r) => ({
      group: r.group_desc,
      basic: r.basic_desc,
      count: num(r.n),
      severity: num(r.sev),
      oos: num(r.oos),
      severe: SEVERE.test(`${r.group_desc} ${r.basic_desc}`),
    }));

    return NextResponse.json({
      found: true,
      dot,
      name: (c.legal_name || c.dba_name || null) as string | null,
      dba: c.dba_name && c.dba_name !== c.legal_name ? (c.dba_name as string) : null,
      city: (c.phy_city as string) || null,
      state: (c.phy_state as string) || null,
      // Use truck_units, NOT power_units: the Socrata `power_units` field sums CMV power units +
      // non-CMV units (e.g. Apex = 90 + 89 = 179), while SAFER's real "Power Units" = truck_units (90).
      powerUnits: num(c.truck_units || c.power_units),
      drivers: num(c.total_drivers),
      safetyRating: RATING[String(c.safety_rating)] ?? "Not rated",
      hazmat: c.hm_ind === "Y",
      active: c.status_code === "A",
      mc: c.docket1prefix === "MC" ? String(c.docket1) : null,
      inspections: inspTotal,
      oosViolations,
      vehicleOos,
      driverOos,
      oosNational: { vehicle: NATL_VEHICLE_OOS, driver: NATL_DRIVER_OOS },
      crashes: num(crashAgg[0]?.crashes),
      basics,
      worstBasic,
      topProblems,
      serviceMap: stateRows.map((r) => ({ state: String(r.report_state), count: num(r.n) })),
      equipment: {
        trucks: makeBreakdown(truckRows, "vin", "unit_make"),
        trailers: makeBreakdown(trailerRows, "vin2", "unit_make2"),
      },
    });
  } catch {
    return NextResponse.json(
      { found: false, error: "FMCSA lookup is temporarily unavailable — try again in a moment." },
      { status: 502 }
    );
  }
}
