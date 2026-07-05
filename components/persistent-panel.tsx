import Link from "next/link";

const navigation = [
  { label: "Atlas", href: "/#atlas" },
  { label: "Observatory", href: "/#observatory" },
  { label: "Writing", href: "/writing" },
  { label: "Photography", href: "/photography" },
  { label: "Index", href: "/index" },
  { label: "About", href: "/about" },
];

function Identity() {
  return (
    <div>
      <p className="font-serif text-xl text-atmosphere">Mira Liu</p>
      <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-atmosphere/70">
        American University
        <br />
        Washington, D.C.
      </p>
    </div>
  );
}

function PanelNav() {
  return (
    <nav aria-label="Primary">
      <ul className="space-y-3">
        {navigation.map((item) => (
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

function PanelContact() {
  return (
    <div className="space-y-3 font-sans text-xs tracking-wide">
      <a
        href="mailto:Cl9886a@american.edu"
        className="block text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
      >
        Cl9886a@american.edu
      </a>
      <a
        href="/cv.pdf"
        className="inline-block border border-atmosphere/40 px-4 py-2 uppercase tracking-[0.2em] text-atmosphere/80 transition-colors hover:border-atmosphere hover:text-atmosphere"
      >
        Download CV
      </a>
    </div>
  );
}

/*
 * The persistent Blue Ink panel (Standard 07): the one permanently fixed
 * architectural element — the spine of the publication. Fixed on the right
 * for large screens; a collapsible drawer on smaller ones.
 */
export function PersistentPanel() {
  return (
    <>
      {/* Desktop: fixed right-side panel */}
      <aside className="fixed inset-y-0 right-0 z-10 hidden w-72 flex-col justify-between bg-structure px-10 py-12 lg:flex">
        <div className="space-y-12">
          <p className="font-serif text-sm italic tracking-wide text-atmosphere/60">
            The Atlas
          </p>
          <Identity />
          <PanelNav />
        </div>
        <PanelContact />
      </aside>

      {/* Mobile: collapsible Atlas drawer */}
      <details className="sticky top-0 z-10 bg-structure lg:hidden">
        <summary className="flex cursor-pointer list-none items-baseline justify-between px-6 py-4 [&::-webkit-details-marker]:hidden">
          <span className="font-serif text-lg text-atmosphere">The Atlas</span>
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
            Menu
          </span>
        </summary>
        <div className="space-y-8 border-t border-atmosphere/15 px-6 py-8">
          <Identity />
          <PanelNav />
          <PanelContact />
        </div>
      </details>
    </>
  );
}
