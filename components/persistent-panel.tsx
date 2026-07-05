import Link from "next/link";
import { site } from "@/lib/site";
import { buildCoordinateMap } from "@/lib/coordinates";
import { ThemeToggle } from "./theme-toggle";
import { CoordinateBadge } from "./coordinate-badge";
import { ResumeLibrary } from "./resume-library";

function Rule() {
  return <hr className="border-atmosphere/15" />;
}

function Identity() {
  return (
    <div>
      <Link
        href="/"
        className="font-serif text-xl text-atmosphere hover:underline hover:underline-offset-4"
      >
        {site.name}
      </Link>
      <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-atmosphere/70">
        {site.affiliation}
      </p>
      <p className="mt-4 font-serif text-sm italic leading-relaxed text-atmosphere/80">
        {site.bio}
      </p>
      <Link
        href="/about"
        className="mt-3 inline-block font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/80 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
      >
        About →
      </Link>
    </div>
  );
}

function ResumeSection() {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/60">
        Resume Library
      </p>
      <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-atmosphere/60">
        Four tailored resumes — pick the one that fits the conversation.
      </p>
      <div className="mt-4">
        <ResumeLibrary compact />
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="font-sans text-xs tracking-wide">
      <a
        href={`mailto:${site.email}`}
        className="block text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
      >
        {site.email}
      </a>
      <a
        href={site.linkedin}
        className="mt-2 block text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
      >
        LinkedIn
      </a>
    </div>
  );
}

/* Mobile only: the drawer is the sole navigation below the desktop top nav. */
function DrawerNav() {
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

/*
 * The persistent Blue Ink panel (Standard 07): the publication's spine.
 * Fixed right on large screens; a collapsible drawer below that.
 */
export function PersistentPanel() {
  const coordinateMap = buildCoordinateMap();

  const footer = (
    <div className="space-y-4">
      <ThemeToggle />
      <CoordinateBadge map={coordinateMap} />
    </div>
  );

  return (
    <>
      <aside className="panel-scope fixed inset-y-0 right-0 z-10 hidden w-72 flex-col bg-structure px-10 py-12 lg:flex">
        <div className="flex flex-1 flex-col gap-8 overflow-y-auto">
          <Identity />
          <Rule />
          <ResumeSection />
          <Rule />
          <Contact />
          {footer}
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
          <DrawerNav />
          <ResumeSection />
          <Contact />
          {footer}
        </div>
      </details>
    </>
  );
}
