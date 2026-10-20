import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Shared end-of-post CTA. Price-forward and offers a low-commitment diagnostic (the free
// safety check), kept honest. Lives at the END of every blog post — no mid-article pitch.
export function BlogCta() {
  return (
    <section className="rounded-lg border border-border bg-surface-2 p-8 text-center">
      <h2 className="font-display text-2xl font-semibold tracking-tight">See it on your own fleet</h2>
      <p className="measure mx-auto mt-3 text-[15px] leading-relaxed text-foreground-muted">
        Flat monthly, by fleet size — <span className="font-semibold text-foreground">$99</span> (1–10 trucks),{" "}
        <span className="font-semibold text-foreground">$249</span> (11–25),{" "}
        <span className="font-semibold text-foreground">$449</span> (26–50),{" "}
        <span className="font-semibold text-foreground">$849</span> (51–100). Every feature on every plan,
        cancel anytime, live in days — not a sales cycle. Want a read first?{" "}
        <span className="font-semibold text-foreground">Run a free safety check</span> — enter your
        USDOT and see the violations a green CSA score is hiding.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/pricing"
          className="lift inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-accent-strong px-7 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg sm:w-auto"
        >
          Start your free month
          <ArrowUpRight className="h-5 w-5" />
        </Link>
        <Link
          href="/#safety-check"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-border-strong px-7 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground sm:w-auto"
        >
          Run a free safety check
        </Link>
        <Link
          href="/demo"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-7 py-4 text-base font-bold text-foreground-muted transition-colors hover:text-foreground sm:w-auto"
        >
          Book a demo
        </Link>
      </div>
    </section>
  );
}
