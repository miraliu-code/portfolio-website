import Link from "next/link";
import { site } from "@/lib/site";
import { buildCoordinateMap } from "@/lib/coordinates";
import { ThemeToggle } from "./theme-toggle";
import { CoordinateBadge } from "./coordinate-badge";

function Rule() {
  return <hr className="border-atmosphere/15" />;
}

function Identity() {
  return (
    <div>
      <Link href="/" className="font-serif text-xl text-atmosphere hover:underline hover:underline-offset-4">
        {site.name}
      </Link>
      <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-atmosphere/70">
        {site.affiliation}
      </p>
      <p className="mt-4 space-x-3 font-sans text-xs tracking-wide">
        <a
          href={`mailto:${site.email}`}
          className="text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
        >
          Email
        </a>
        <span className="text-atmosphere/30">·</span>
        <a
          href={site.linkedin}
          className="text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
        >
          LinkedIn
        </a>
      </p>
    </div>
  );
}

function PanelNav() {
  return (
    <nav aria-label="Primary">
      <ul className="space-y-3">
        {site.nav.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/80 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PanelFooter({ coordinateMap }: { coordinateMap: Record<string, string> }) {
  return (
    <div className="space-y-4">
      <a
        href={site.cv}
        className="inline-block border border-atmosphere/40 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-atmosphere/80 transition-colors hover:border-atmosphere hover:text-atmosphere"
      >
        Download CV
      </a>
      <ThemeToggle />
      <CoordinateBadge map={coordinateMap} />
    </div>
  );
}

/*
 * The persistent Blue Ink panel (Standard 07): the publication's spine.
 * Fixed right on large screens; a collapsible drawer below that.
 */
export function PersistentPanel() {
  const coordinateMap = buildCoordinateMap();

  return (
    <>
      <aside className="panel-scope fixed inset-y-0 right-0 z-10 hidden w-72 flex-col bg-structure px-10 py-12 lg:flex">
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto">
          <Identity />
          <Rule />
          <PanelNav />
          <Rule />
          <PanelFooter coordinateMap={coordinateMap} />
        </div>
      </aside>

      <details className="panel-scope sticky top-0 z-10 bg-structure lg:hidden">
        <summary className="flex cursor-pointer list-none items-baseline justify-between px-6 py-4 [&::-webkit-details-marker]:hidden">
          <span className="font-serif text-lg text-atmosphere">{site.wordmark}</span>
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
            Menu
          </span>
        </summary>
        <div className="space-y-8 border-t border-atmosphere/15 px-6 py-8">
          <Identity />
          <PanelNav />
          <PanelFooter coordinateMap={coordinateMap} />
        </div>
      </details>
    </>
  );
}
