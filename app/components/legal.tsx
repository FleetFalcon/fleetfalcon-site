import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-20">
        <p className="text-eyebrow text-accent">Legal</p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="text-eyebrow mt-4 text-foreground-faint">Last updated: {updated}</p>
        <p className="measure mt-6 text-[15px] leading-relaxed text-foreground-muted">{intro}</p>

        <div className="mt-12 space-y-10 border-t border-border pt-10">{children}</div>
      </div>
    </section>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-foreground">{heading}</h2>
      <div className="measure mt-3 space-y-3 text-[15px] leading-relaxed text-foreground-muted">
        {children}
      </div>
    </div>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}

export function LegalMail() {
  return (
    <a href="mailto:val@fleetfalcon.io" className="text-accent underline hover:no-underline">
      val@fleetfalcon.io
    </a>
  );
}
