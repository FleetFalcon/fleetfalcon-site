"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A link to an on-page #anchor that scrolls DETERMINISTICALLY. Next's router + browser scroll
 * restoration race each other on same-page hash navigation, so we intercept the click and scroll
 * the element ourselves. For a cross-page target (href on a different route) we fall back to a
 * normal <Link> and let HashScroll handle the landing after the new page loads.
 */
export function AnchorLink({
  href,
  className = "",
  children,
  onNavigate,
}: {
  href: string; // e.g. "/#citation-watch" or "#mission"
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [path, id] = href.split("#");
  const targetPath = path || "/";
  const samePage = targetPath === pathname || (targetPath === "/" && pathname === "/");

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!id || !samePage) return; // cross-page → let <Link> navigate; HashScroll lands it
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    onNavigate?.();
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
