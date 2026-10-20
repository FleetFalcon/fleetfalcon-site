import Link from "next/link";
import Image from "next/image";

// The REAL FleetFalcon mark — the navy falcon fused with red wheels (public/web-app-manifest-512).
// It's a two-color brand asset, so we seat it on a small white tile; that keeps it legible and
// on-brand on BOTH the light paper and the dark ink-navy grounds (same treatment as the favicon).
export function FalconMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-white ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/web-app-manifest-512x512.png"
        alt=""
        width={28}
        height={28}
        className="h-[82%] w-[82%] object-contain"
        priority
      />
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 ${className}`}
      aria-label="FleetFalcon home"
    >
      <FalconMark className="h-7 w-7 transition-transform group-hover:-translate-y-0.5" />
      <span className="font-display text-lg font-semibold tracking-tight text-foreground">
        Fleet<span className="text-accent">Falcon</span>
      </span>
    </Link>
  );
}
