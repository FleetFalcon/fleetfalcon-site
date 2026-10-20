"use client";

import { useEffect, useState } from "react";
import { PlayCircle, X } from "lucide-react";

// "Watch the 90-second overview" — opens a modal with a <video> placeholder. No external
// src (we can't fetch media); poster is the real dashboard screenshot.
export function VideoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-border-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground-muted"
      >
        <PlayCircle className="h-5 w-5 text-accent" aria-hidden />
        Watch the 90-second overview
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="FleetFalcon product overview"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-surface"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md bg-background/80 text-foreground backdrop-blur"
            >
              <X className="h-5 w-5" />
            </button>
            {/* PLACEHOLDER: real product walkthrough video. No src yet — poster only. */}
            <video
              controls
              poster="/screenshots/dash.png"
              className="aspect-video w-full bg-black"
              aria-label="FleetFalcon 90-second product walkthrough (coming soon)"
            >
              Your browser does not support the video tag.
            </video>
            <p className="px-5 py-3 text-center font-mono text-xs text-foreground-faint">
              Product walkthrough video coming soon
            </p>
          </div>
        </div>
      )}
    </>
  );
}
