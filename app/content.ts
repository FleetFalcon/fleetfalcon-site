import type { LucideIcon } from "lucide-react";
import {
  FileText,
  ShieldAlert,
  Compass,
  Activity,
  Zap,
  AlertTriangle,
  Ticket,
  ShieldCheck,
  FileSearch,
  AlertCircle,
  Calendar,
  Truck,
  Bot,
  FileCheck2,
  Building2,
  Languages,
  TrendingDown,
  Gavel,
  Ban,
} from "lucide-react";

/* ---------------------------------------------------------------------------
 * All marketing copy is the founder-approved StoryBrand (SB7) content, ported
 * verbatim from lp-fleetfalcon/app/storybrand/StoryBrandClient.tsx.
 * ------------------------------------------------------------------------- */

export type Problem = { icon: LucideIcon; label: string; body: string };

export const problems: Problem[] = [
  {
    icon: FileText,
    label: "The external problem",
    body: "Documents expire, roadside inspections pile up on paper, onboarding drags across 11 signatures, and tickets slip through the cracks.",
  },
  {
    icon: ShieldAlert,
    label: "The internal problem",
    body: "You're always one missed renewal away from an out-of-service order — and you feel that weight every time a truck rolls out.",
  },
  {
    icon: Compass,
    label: "The deeper problem",
    body: "You got into trucking to move freight and keep drivers safe — not to babysit spreadsheets and dread the next audit.",
  },
];

// The full real task list — the "90%" of repetitive compliance work.
export const complianceTasks: string[] = [
  "Prepare corrective action documents for fleet violations",
  "Schedule safety or compliance trainings for each driver",
  "Schedule repairs for CVSA roadside inspection violations",
  "Pull Drug & Alcohol Clearinghouse report for each driver",
  "Store safety incident witness statements",
  "Make sure each driver's compliance docs are not expiring",
  "Make sure border-crossing drivers have passports and visas",
  "Track driver and vehicle doc expirations with calendar reminders",
  "Chase drivers by text, call, or email when a compliance doc expires",
  "Chase drivers for new DLs, MVRs, and passports",
  "Verify every driver/fleet document meets DOT regulatory standards",
  "Store, send, and validate driver onboarding documents",
  "Chase signatures on 11 different driver onboarding documents",
  "Collect driver employment application and consent for ref checks",
  "Collect driver certs, Clearinghouse consent, PSP consent",
  "Collect a reference check from each previous employer (5 years)",
  "Make 3 documented attempts when an employer doesn't respond",
  "Manually track which docs are required by jurisdiction and asset",
  "Review and classify every uploaded document so nothing is mislabeled",
  "Pull PSP (Pre-Employment Screening Program) reports for drivers",
  "Track licenses, medical certificates, MVRs, work authorization",
  "Track truck and trailer registrations, inspections, insurance, permits",
  "Keep spreadsheets and shared drives for fleet compliance docs",
  "Capture and log every driver citation (photo or manual entry)",
  "Parse violation, jurisdiction, deadlines, and fine amounts from tickets",
  "Decide fight or pay for each driver citation",
  "Assign a lawyer and collect the court date when fighting a citation",
  "Remind the responsible person for every citation deadline",
  "Record a driver statement after a safety incident",
  "Collect witness contacts and photos immediately after an incident",
  "Build a safety incident packet for manager review",
  "Notify insurance of safety incidents and store the proof",
  "Collect CVSA roadside inspections (photo or paper) from drivers",
  "Detect and chase missing or unreported roadside inspections",
  "Mark a vehicle out-of-service after inspection and alert the manager",
  "Submit proof of repair to DOT or government agencies when required",
  "Reconcile safety events from ELDs (Samsara, Motive, Geotab)",
  "Schedule road tests for new drivers",
];

export const authorityChips = [
  "FMCSA",
  "DOT / PHMSA",
  "CVSA",
  "Drug & Alcohol Clearinghouse",
  "PSP",
  "CSA / CVOR",
];

export type Step = { icon: LucideIcon; n: string; title: string; body: string };

export const plan: Step[] = [
  {
    icon: Calendar,
    n: "1",
    title: "Book a demo",
    body: "We map your fleet's exact compliance requirements by jurisdiction and asset type — so you see your gaps on day one.",
  },
  {
    icon: Truck,
    n: "2",
    title: "Set up your fleet",
    body: "Import your drivers and vehicles and FleetFalcon builds each one's compliance profile — live in days, no IT project.",
  },
  {
    icon: Bot,
    n: "3",
    title: "Let software run the 90%",
    body: "Tracking, renewals, inspections, incidents and citations run themselves. You just approve the 10% of decisions that matter.",
  },
];

export const promises = [
  "No driver training",
  "Live in days",
  "No rip-and-replace",
  "Customizable to your fleet",
];

export type FeaturePoint = { icon: LucideIcon; title: string; body: string };
export type Feature = {
  name: string;
  icon: LucideIcon;
  shot: string;
  alt: string;
  intro: string;
  points: FeaturePoint[];
};

// Five equal-peer modules (deep alternating sections). Violation Radar is one of the five —
// framed as roadside-inspection AI parsing, NOT CSA-centric, NOT the hero.
export const features: Feature[] = [
  {
    name: "DocPulse",
    icon: Activity,
    shot: "/screenshots/driver-profile.png",
    alt: "FleetFalcon DocPulse driver profile showing tracked licenses, medical card, and MVR with expiry dates",
    intro:
      "One system tracks, renews, requests and verifies thousands of driver and fleet documents — no bloated compliance team, no wild spreadsheets.",
    points: [
      {
        icon: Activity,
        title: "Track & renew automatically",
        body: "Expirations monitored continuously; drivers get automatic reminders for DLs, MVRs and passports. AI checks every uploaded document for validity.",
      },
      {
        icon: FileText,
        title: "Prevent OOS, catch critical fails",
        body: "Managers are alerted the moment a missing or expiring document is likely to cause an out-of-service order or threaten authority.",
      },
      {
        icon: ShieldCheck,
        title: "Audit-ready by default",
        body: "Always know what's missing and what's expiring — gaps caught before they ground a driver or trigger a fine.",
      },
    ],
  },
  {
    name: "Rapid Onboarding",
    icon: Zap,
    shot: "/screenshots/onboarding-events.png",
    alt: "FleetFalcon Rapid Onboarding timeline of driver onboarding events and completed signatures",
    intro:
      "Onboarding a driver takes 11 signatures. FleetFalcon replaces that with one link and three clicks — a full, verified, audit-ready package in minutes instead of days.",
    points: [
      {
        icon: Zap,
        title: "One link, three clicks",
        body: "A mobile-friendly form with every legally required question; the driver completes it on their phone. AI validates documents and digital signatures capture every consent.",
      },
      {
        icon: FileText,
        title: "Automated reference checks",
        body: "Reference checks — manual and automated — with documented outreach attempts for regulatory verification.",
      },
      {
        icon: ShieldCheck,
        title: "Everything in one place",
        body: "Signed agreement, references, application, licence and abstract — all on the driver's profile, time-stamped and traceable.",
      },
    ],
  },
  {
    name: "Violation Radar",
    icon: AlertTriangle,
    shot: "/screenshots/roadside-cropped.png",
    alt: "FleetFalcon Violation Radar parsing a CVSA roadside inspection report and extracting violations",
    intro:
      "Roadside inspections flow in automatically — Violation Radar pulls every inspection result straight into your Events section, ties each violation to the right driver or unit, and flags OOS before it drags your CSA. Still get a paper CVSA report? Snap a photo and AI scans that too. Available inside your plan — or as a standalone product.",
    points: [
      {
        icon: FileSearch,
        title: "Inspections sync automatically",
        body: "Inspection results flow straight into the Events section, tied to the right driver or unit — nothing re-keyed, nothing lost.",
      },
      {
        icon: FileText,
        title: "Proof of repair & authority notice",
        body: "Where required, FleetFalcon drafts the proof-of-repair communication and submits it to the government for you.",
      },
      {
        icon: ShieldCheck,
        title: "Protects your CSA",
        body: "Violations resolved on time and a complete inspection history — so a bad score never scares off a broker.",
      },
    ],
  },
  {
    name: "Incident Control",
    icon: ShieldAlert,
    shot: "/screenshots/incident-wi.png",
    alt: "FleetFalcon Incident Control work item with driver and witness statements, photos, and corrective action",
    intro:
      "Incidents happen. FleetFalcon streamlines evidence, witness and driver statements, and paperwork — everything logged and ready for insurance claims and audits.",
    points: [
      {
        icon: AlertCircle,
        title: "A standard procedure, every time",
        body: "Due diligence in incident handling drives your insurance and audit outcomes. Quick, simple handling straight off the driver's phone.",
      },
      {
        icon: FileText,
        title: "Evidence collection",
        body: "Photos, videos, and witness and driver statements collected, stored and time-stamped for audit.",
      },
      {
        icon: ShieldCheck,
        title: "Clear manager review",
        body: "AI builds the full incident report and drafts a corrective action — minimizing liability and saving your time.",
      },
    ],
  },
  {
    name: "Citation Watch",
    icon: Ticket,
    shot: "/screenshots/citation-watch.png",
    alt: "FleetFalcon Citation Watch pay-or-fight ticket pipeline with parsed violations and deadlines",
    intro:
      "Fleets get a lot of tickets. FleetFalcon turns every one into a clear pay-or-fight pipeline — protecting your CSA scores and insurance premiums.",
    points: [
      {
        icon: FileText,
        title: "Capture & parse every ticket",
        body: "Drivers upload a photo or managers log manually; AI parses violation, jurisdiction, deadlines and fine amounts, then drafts a corrective action for approval.",
      },
      {
        icon: Ticket,
        title: "Fight or pay — no limbo",
        body: "One decision per ticket. Fight? A task to assign a lawyer and collect the court date. Pay? Logged and tracked so nothing resurfaces later.",
      },
      {
        icon: ShieldCheck,
        title: "Trends & statistics",
        body: "Aggregate scores and ticket history across drivers and time — spot top offenders and financial impact before patterns become problems.",
      },
    ],
  },
];

export type SecondaryModule = { name: string; icon: LucideIcon; body: string };

export const secondaryModules: SecondaryModule[] = [
  {
    name: "Driver Qualifications",
    icon: FileCheck2,
    body: "Complete, §391-compliant DQ files for CDL and non-CDL drivers — each requirement mapped to the regulation behind it.",
  },
  {
    name: "Carrier Profile",
    icon: Building2,
    body: "Your FMCSA registration profile — MCS-150, authority, UCR and more — kept current for US and Canadian carriers.",
  },
  {
    name: "English Testing",
    icon: Languages,
    body: "Run and record English Language Proficiency (ELP) checks against the reinstated FMCSA requirement, right on the driver profile.",
  },
];

export type Stake = { icon: LucideIcon; title: string; body: string };

export const stakes: Stake[] = [
  {
    icon: Ban,
    title: "Out-of-service orders",
    body: "One expired medical card or missed inspection repair, and a truck — and its revenue — is parked at the scale.",
  },
  {
    icon: Gavel,
    title: "Failed audits & fines",
    body: "A gap in a DQ file or a missing proof-of-repair turns a routine audit into penalties and a conditional safety rating.",
  },
  {
    icon: TrendingDown,
    title: "Rising insurance premiums",
    body: "Slipping CSA scores and unmanaged citations are exactly what underwriters price against at renewal.",
  },
  {
    icon: AlertTriangle,
    title: "A preventable crash",
    body: "The violation you never saw — a repeat out-of-service unit, a driver you should have coached — is the one that ends up in a claim.",
  },
];

/* ---------------------------------------------------------------------------
 * Pricing — REAL model. Flat monthly per tier, tier chosen by fleet size.
 * Ground truth: backend/Services/Stripe/SubscriptionPlanCatalog.cs
 * ------------------------------------------------------------------------- */
export type PricingTier = {
  code: string; // Stripe:Plans:{code}
  name: string;
  trucks: string;
  price: string;
  priceNum?: number;
  selfServe: boolean;
  blurb: string;
  featured?: boolean;
};

// Flat monthly price per tier — the ONLY thing that changes between tiers is fleet size
// (truck count). Every plan includes the entire platform (see `includedInEveryPlan`).
export const pricingTiers: PricingTier[] = [
  { code: "Starter", name: "Starter", trucks: "1–10 trucks", price: "$99", priceNum: 99, selfServe: true, blurb: "Owner-operators & small fleets." },
  { code: "Growth", name: "Growth", trucks: "11–25 trucks", price: "$249", priceNum: 249, selfServe: true, featured: true, blurb: "Growing fleets." },
  { code: "Professional", name: "Professional", trucks: "26–50 trucks", price: "$449", priceNum: 449, selfServe: true, blurb: "Established mid-size fleets." },
  { code: "Fleet", name: "Fleet", trucks: "51–100 trucks", price: "$849", priceNum: 849, selfServe: true, blurb: "Large fleets." },
  { code: "Enterprise", name: "Enterprise", trucks: "101+ trucks", price: "Custom", selfServe: false, blurb: "The largest fleets, multi-entity carriers & consortiums." },
];

// Identical on EVERY plan, Starter through Enterprise. You don't lose features by paying less —
// you just pick the tier that matches your truck count.
export const includedInEveryPlan: string[] = [
  "DocPulse — document & credential expiry tracking",
  "Driver Qualification (DQ) files — §391",
  "Rapid Onboarding — one-link driver forms",
  "Violation Radar — roadside-inspection parsing",
  "Citation Watch — pay-or-fight pipeline",
  "Incident Control — evidence & statements",
  "Carrier Profile — FMCSA registration",
  "CSA / safety-score monitoring",
  "Email & SMS expiry reminders",
  "Multi-user roles & permissions",
  "Reporting & data exports",
];

// English Language Proficiency testing is a STANDALONE product, billed per test — NOT part of a
// subscription tier. Price = Billing:EnglishTestPriceCents (default 1000¢ = $10.00).
export const englishTestingAddOn = {
  name: "English Testing (ELP)",
  price: "$10",
  unit: "per test",
  blurb:
    "Run and record FMCSA English Language Proficiency checks on any driver — pay only for the tests you run. No subscription required; use it on its own or alongside any plan.",
};

/* ---------------------------------------------------------------------------
 * Comparison vs named competitors. Honest — includes rows where a competitor
 * wins. Marketing/legal must verify every cell before publishing.
 * ------------------------------------------------------------------------- */
export const comparisonVendors = [
  "FleetFalcon",
  "J.J. Keller Encompass",
  "SambaSafety",
  "Foley",
  "Motive",
];

export type Cell = "yes" | "partial" | "no" | string;
export type ComparisonRow = { feature: string; cells: Cell[] };

// Order of cells matches comparisonVendors.
export const comparisonRows: ComparisonRow[] = [
  {
    feature: "All-in-one DOT compliance (docs + DQ + onboarding + incidents + citations + roadside)",
    cells: ["yes", "yes", "no", "partial", "partial"],
  },
  {
    feature: "AI document & roadside-inspection parsing",
    cells: ["yes", "partial", "no", "no", "partial"],
  },
  {
    feature: "Continuous MVR / driver monitoring",
    cells: ["partial", "partial", "yes", "yes", "partial"],
  },
  {
    feature: "ELD / telematics hardware",
    cells: ["Integrates (Samsara / Motive / Geotab)", "no", "no", "no", "yes"],
  },
  {
    feature: "Modern self-serve UX",
    cells: ["yes", "no", "partial", "no", "yes"],
  },
  {
    feature: "Transparent flat pricing",
    cells: ["yes (from $99/mo)", "no", "no", "no", "no"],
  },
  {
    feature: "Free trial / self-serve signup",
    cells: ["yes", "no", "no", "no", "no"],
  },
  {
    feature: "Built for SMB & mid-size fleets",
    cells: ["yes", "partial", "partial", "yes", "yes"],
  },
  {
    feature: "US + Canada coverage (CSA / CVOR)",
    cells: ["yes", "partial", "partial", "no", "partial"],
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  published: string; // static ISO date string — do not use Date.now()
  readingTime: string;
  author: string;
};

// Blog index metadata. Article bodies live in their route files.
export const blogPosts: BlogPost[] = [
  {
    slug: "violations-that-score-zero",
    title: "The violations that score zero on your CSA — and still ticket your drivers",
    description:
      "Registration, fuel tax, excessive weight and speeding 1–5 mph over carry no CSA severity weight at all. Across three real carriers, 20–46% of their citations were these. They cost you nothing on your score and every one of them is a real ticket.",
    published: "2026-10-25",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "fleetfalcon-vs-alternatives",
    title: "FleetFalcon vs. the alternatives: J.J. Keller, SambaSafety, Foley & Motive",
    description:
      "An honest comparison of FleetFalcon against the main DOT-compliance alternatives — the legacy incumbent, the MVR-monitoring leader, the compliance-services firm, and the ELD vendor — and where each one actually fits.",
    published: "2026-10-03",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "human-in-the-loop-compliance-ai",
    title: "Why compliance AI needs a human in the loop",
    description:
      "AI can run the repetitive work, but the decisions with legal and safety consequences need a human. Why 'an AI agent runs your back office' is the wrong model for compliance — and how FleetFalcon keeps you in control.",
    published: "2026-10-01",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "compliance-problems-scaling-fleets",
    title: "The biggest compliance problems fleets face as they scale",
    description:
      "As you grow from a handful of trucks to 50, 100+, compliance stops living in one person's head and becomes a systems problem. The failures that compound as fleets scale — and how to get ahead of them.",
    published: "2026-09-25",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "how-to-improve-your-csa-score",
    title: "How to improve your CSA score",
    description:
      "The levers that actually move your BASIC percentiles — clean inspections, DataQs disputes, repeat-offender coaching, and letting time-weighting work for you.",
    published: "2026-09-18",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "jj-keller-encompass-alternatives",
    title: "J.J. Keller Encompass alternatives",
    description:
      "Encompass is the legacy DOT-compliance incumbent. The main alternatives for fleets that want modern, self-serve, integrated compliance — and who each one fits.",
    published: "2026-09-04",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "new-carrier-compliance-mistakes",
    title: "Top compliance mistakes new carriers make",
    description:
      "From no written safety policy to DQ files with holes — the mistakes that sink new carriers at their first audit, and how to avoid them.",
    published: "2026-08-21",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "elp-rule-out-of-service",
    title: "The new English Language Proficiency (ELP) rule: what the out-of-service change means",
    description:
      "English proficiency was always a qualification standard — now it's an out-of-service violation again. What changed, what a roadside ELP assessment looks like, and what carriers must do.",
    published: "2026-08-07",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "safety-and-compliance-overlap",
    title: "Where safety and compliance overlap",
    description:
      "Safety is the work; compliance is the proof. If it hasn't been tracked, it may as well never happened — and that gap is where audits and lawsuits live.",
    published: "2026-07-30",
    readingTime: "5 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "dot-compliance-canada-cvor-nsc",
    title: "DOT compliance in Canada: CVOR, NSC, and cross-border fleets",
    description:
      "Canada's equivalent of FMCSA/CSA — the National Safety Code, Ontario's CVOR, Quebec's PEVL — and what US carriers running cross-border need to know.",
    published: "2026-07-10",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "negligent-hiring-dq-file-defense",
    title: "Negligent-hiring lawsuits in trucking: your DQ file is the defense",
    description:
      "After a crash, plaintiffs target negligent hiring and retention. A complete, documented DQ file is your best defense — or, if it has holes, the smoking gun.",
    published: "2026-06-26",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "what-is-dataqs",
    title: "What is DataQs and how do you challenge a CSA violation?",
    description:
      "DataQs is FMCSA's system for challenging inaccurate inspection, violation, and crash records. How an RDR works, what you can dispute, and which ones are worth your time.",
    published: "2026-06-11",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "how-brokers-use-your-csa-score",
    title: "How brokers use your CSA score — and how to stop losing loads",
    description:
      "Brokers and shippers pull your CSA before they tender freight. What they see, why they care about liability, and how to protect your scores.",
    published: "2026-05-22",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "green-csa-score-hiding-violations",
    title: "Why a “green” CSA score can still hide dangerous violations",
    description:
      "A BASIC under threshold doesn't mean safe. How CSA's percentile math can mask a no-CDL stop, a falsified log, or a repeat out-of-service unit.",
    published: "2026-05-07",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "can-your-tms-handle-dot-compliance",
    title: "Can your TMS handle DOT compliance?",
    description:
      "Most TMS platforms store a med-card date — not a compliance program. Where the TMS ends and real DOT compliance begins.",
    published: "2026-04-24",
    readingTime: "6 min read",
    author: "FleetFalcon Team",
  },
  {
    slug: "what-is-a-dq-file",
    title: "What is a DQ file?",
    description:
      "The Driver Qualification File explained — every record FMCSA requires under §391.51, the CDL vs non-CDL differences, and how long to keep it.",
    published: "2026-04-09",
    readingTime: "7 min read",
    author: "FleetFalcon Team",
  },
];

export type FaqItem = { question: string; answer: string };

// Ported verbatim from lp-fleetfalcon/app/faq-data.ts.
export const faqItems: FaqItem[] = [
  {
    question: "What is FleetFalcon?",
    answer:
      "FleetFalcon is a fleet safety and DOT compliance platform for trucking carriers. It automates the repetitive work of FMCSA compliance — driver qualification files, document tracking, roadside inspections, citations, incidents, onboarding, and CSA safety monitoring — so your team stays audit-ready without spreadsheets or manual reminders.",
  },
  {
    question: "What compliance does FleetFalcon handle?",
    answer:
      "Driver qualification (DQ) files, drug & alcohol testing and FMCSA Clearinghouse queries, vehicle registration and inspections, company registrations (MCS-150, BOC-3, UCR, IFTA, IRP, operating authority), roadside inspections and citations, incident response, and CSA / FMCSA safety monitoring.",
  },
  {
    question: "Who is FleetFalcon for?",
    answer:
      "US and Canadian trucking carriers, fleets, owner-operators, and DOT-regulated motor carriers — plus safety and compliance managers, and management organizations or consortiums that manage multiple carriers.",
  },
  {
    question: "Does FleetFalcon work for non-CDL drivers?",
    answer:
      "Yes. FleetFalcon builds a complete driver qualification file for both CDL and non-CDL drivers, and automatically scopes CDL-only requirements — like FMCSA Clearinghouse queries and Part 382 drug and alcohol testing — so non-CDL drivers aren't flagged for rules that don't apply to them.",
  },
  {
    question: "Can FleetFalcon monitor my CSA scores?",
    answer:
      "Yes. FleetFalcon benchmarks your FMCSA BASIC standing against peer carriers of similar fleet size and region using FMCSA's open inspection data, and tracks out-of-service rates, crash and inspection trends, and recent roadside inspections.",
  },
  {
    question: "Does FleetFalcon work in Canada and for cross-border fleets?",
    answer:
      "Yes. FleetFalcon supports both US and Canadian carriers and cross-border operations, including Canadian carrier profiles, provincial requirements, and US/Canada document rules.",
  },
  {
    question: "How is FleetFalcon different from spreadsheets or a shared document folder?",
    answer:
      "FleetFalcon actively tracks what's missing or expiring, requests documents from drivers by text or email, uses AI to read and file uploaded documents, and maps every requirement to the underlying regulation — so nothing slips and you keep an audit-defensible record.",
  },
  {
    question: "How does driver onboarding work?",
    answer:
      "Replace about eleven separate onboarding documents with a single link. The driver completes it in a few clicks, FleetFalcon assembles the full package, verifies each document, and keeps everything audit-ready — minutes instead of days.",
  },
];
