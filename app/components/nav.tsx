"use client";

import Link from "next/link";
import { registerUrl } from "../signup";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Wordmark } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { AnchorLink } from "./anchor-link";

const LINKS = [
  { label: "Platform", href: "/#platform" },
  // The two products that convert on their own terms get real nav entries: Violation Radar
  // leads with the free safety check, English testing sells per test. Burying them as
  // home-page anchors would hide both funnels.
  { label: "Violation Radar", href: "/violation-radar" },
  { label: "English testing", href: "/english-testing" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Mission", href: "/#mission" },
  { label: "Contact", href: "/contact" },
];

const APP_URL = "https://app.fleetfalcon.io/";
const isExternal = (href: string) => /^(mailto:|tel:|https?:)/.test(href);

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark />

        {/* Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => {
            const cls = "text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground";
            if (l.href.includes("#"))
              return <AnchorLink key={l.label} href={l.href} className={cls}>{l.label}</AnchorLink>;
            if (isExternal(l.href))
              return <a key={l.label} href={l.href} className={cls}>{l.label}</a>;
            return <Link key={l.label} href={l.href} className={cls}>{l.label}</Link>;
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a
            href={APP_URL}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground"
          >
            Log in
          </a>
          <Link
            href={registerUrl("nav_desktop")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent-strong px-4 py-2 text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Start free month
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
            {LINKS.map((l) => {
              const cls = "rounded-lg px-2 py-2.5 text-base font-semibold text-foreground-muted hover:bg-surface-2 hover:text-foreground";
              if (l.href.includes("#"))
                return <AnchorLink key={l.label} href={l.href} onNavigate={() => setOpen(false)} className={cls}>{l.label}</AnchorLink>;
              if (isExternal(l.href))
                return <a key={l.label} href={l.href} onClick={() => setOpen(false)} className={cls}>{l.label}</a>;
              return <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className={cls}>{l.label}</Link>;
            })}
            <a
              href={APP_URL}
              className="rounded-lg px-2 py-2.5 text-base font-semibold text-foreground-muted hover:bg-surface-2 hover:text-foreground"
            >
              Log in
            </a>
            <Link
              href={registerUrl("nav_mobile")}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent-strong px-4 py-3 text-base font-bold text-accent-foreground"
            >
              Start free month
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
