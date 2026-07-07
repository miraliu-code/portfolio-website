"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import {
  Contact,
  DrawerNav,
  Identity,
  ResumeSection,
  Rule,
} from "./panel-sections";
import { ThemeToggle } from "./theme-toggle";
import { CoordinateBadge } from "./coordinate-badge";

/*
 * Mobile header + drawer (below lg). The wordmark links home; only the
 * Menu button opens the drawer. The drawer is a fixed, fully opaque
 * overlay above everything (z-50), body scroll locks while it is open,
 * and it closes on navigation.
 */
export function MobileDrawer({
  coordinateMap,
}: {
  coordinateMap: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* Close when the route changes (a drawer link was followed). */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Lock the page scroll while the drawer is open. */
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  const headerRow = (closeButton: boolean) => (
    <div className="flex items-baseline justify-between px-6 py-4">
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="font-serif text-lg text-atmosphere"
      >
        {site.wordmark}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(!open)}
        className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70 transition-colors hover:text-atmosphere"
      >
        {closeButton ? "Close" : "Menu"}
      </button>
    </div>
  );

  return (
    <>
      {/* Persistent mobile header bar */}
      <div className="panel-scope sticky top-0 z-40 border-b border-atmosphere/10 bg-panel lg:hidden">
        {headerRow(false)}
      </div>

      {/* The drawer: opaque, above everything, own scroll context */}
      {open && (
        <div
          id="mobile-drawer"
          className="panel-scope fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-panel lg:hidden"
        >
          <div className="sticky top-0 border-b border-atmosphere/15 bg-panel">
            {headerRow(true)}
          </div>
          <div className="space-y-8 px-6 py-8">
            <Identity />
            <Rule />
            <DrawerNav />
            <Rule />
            <Contact />
            <Rule />
            <ResumeSection />
            <div className="space-y-4">
              <ThemeToggle />
              <CoordinateBadge map={coordinateMap} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
