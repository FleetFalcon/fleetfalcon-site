import Link from "next/link";
import { FalconMark } from "./logo";
import { AnchorLink } from "./anchor-link";

const PLATFORM = [
  { label: "Violation Radar", href: "/#violation-radar" },
  { label: "DocPulse", href: "/#docpulse" },
  { label: "Driver Qualifications", href: "/#driver-qualifications" },
  { label: "Rapid Onboarding", href: "/#rapid-onboarding" },
  { label: "Incident Control", href: "/#incident-control" },
  { label: "Citation Watch", href: "/#citation-watch" },
];

const COMPANY = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Mission", href: "/#mission" },
  { label: "Book a demo", href: "/demo" },
  { label: "Log in", href: "https://app.fleetfalcon.io/" },
];

const LEGAL = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "val@fleetfalcon.io", href: "mailto:val@fleetfalcon.io" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <FalconMark className="h-6 w-6" />
              <span className="font-display text-lg font-semibold tracking-tight">
                Fleet<span className="text-accent">Falcon</span>
              </span>
            </div>
            <p className="measure mt-4 text-sm leading-relaxed text-foreground-muted">
              The DOT-compliance system that runs the repetitive 90% — so your team can focus on
              the 10% that keeps trucks safe and freight moving.
            </p>
          </div>

          <FooterCol title="Platform" items={PLATFORM} />
          <FooterCol title="Company" items={COMPANY} />
          <FooterCol title="Legal" items={LEGAL} />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-foreground-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">© {new Date().getFullYear()} FleetFalcon Corp</p>
          <p className="font-mono">US &amp; Canadian DOT compliance · Audit-ready by default</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-eyebrow text-foreground-faint">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((i) => {
          const cls = "text-sm text-foreground-muted transition-colors hover:text-foreground";
          const isHash = i.href.includes("#");
          const isExternal = /^(mailto:|tel:|https?:)/.test(i.href);
          return (
            <li key={i.label}>
              {isHash ? (
                <AnchorLink href={i.href} className={cls}>
                  {i.label}
                </AnchorLink>
              ) : isExternal ? (
                <a href={i.href} className={cls}>
                  {i.label}
                </a>
              ) : (
                <Link href={i.href} className={cls}>
                  {i.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
