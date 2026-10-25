import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Shared end-of-post CTA. Price-forward and offers a low-commitment diagnostic (the free
// safety check), kept honest. Lives at the END of every blog post — no mid-article pitch.
//
// Two actions, not three. A blog reader is browsing, not buying: the free check is the
// honest next step, the trial is the commitment, and a demo is for the minority who want a
// human — so the demo sits underneath as a text link instead of competing as a third
// button of identical size. Three co-equal buttons left the hierarchy to colour alone.
export function BlogCta() {
  return (
    // The post body spaces its own sections 40px apart (`space-y-10`). The CTA has to clear
    // that or it reads as one more section of the article rather than the thing after it.
    <section className="mt-14 rounded-lg border border-border bg-surface-2 p-6 text-center sm:mt-16 sm:p-8">
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
      {/* This panel sits inside the article's own max-w-3xl column, so the row never gets
          more than ~640px — room for two of these labels side by side, never three.
          `whitespace-nowrap` makes a single line a guarantee rather than a measurement that
          holds only until someone lengthens a label. */}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {/* The transparent 2px border buys nothing visually; it just makes the filled button
            the same 60px tall as the bordered one beside it, instead of 4px shorter. */}
        <Link
          href="/pricing"
          className="lift inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-transparent bg-accent-strong px-6 py-4 text-base font-bold text-accent-foreground shadow-sm hover:shadow-lg sm:w-auto sm:px-7"
        >
          Start your free month
          <ArrowUpRight className="h-5 w-5" />
        </Link>
        <Link
          href="/#safety-check"
          className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border-2 border-border-strong px-6 py-4 text-base font-bold text-foreground transition-colors hover:border-foreground sm:w-auto sm:px-7"
        >
          Run a free safety check
        </Link>
      </div>
      <p className="mt-5 text-sm text-foreground-muted">
        Prefer a walkthrough?{" "}
        <Link href="/demo" className="font-semibold text-accent hover:underline">
          Book a demo
        </Link>
      </p>
    </section>
  );
}
