import Link from "next/link";
import { SearchBox } from "./search-box";
import { site } from "@/lib/site";
import { domains } from "@/lib/content/domains";
import { photoCategories } from "@/lib/content/photography";
import { observatorySections } from "@/lib/content/observatory";

interface DropdownItem {
  label: string;
  href?: string; // absent = not yet built (wired in a later phase)
}

const dropdowns: Record<string, DropdownItem[]> = {
  Atlas: [
    ...domains.map((d) => ({ label: d.name, href: `/atlas/${d.slug}` })),
    { label: "Organizations", href: "/atlas/organizations" },
    { label: "Explorable Systems", href: "/atlas/explorable-systems" },
  ],
  Photography: [
    ...photoCategories.map((c) => ({
      label: c.name,
      href: `/photography/${c.slug}`,
    })),
    { label: "Featured Writings", href: "/photography/writings" },
  ],
  Observatory: observatorySections.map((s) => ({
    label: s.name,
    href: `/observatory/${s.slug}`,
  })),
};

/*
 * Top navigation (desktop): wordmark → home, search left, sections right.
 * Atlas / Photography / Observatory open hover dropdowns; the dropdown
 * hangs directly off the item (bridged by padding, not margin) so the
 * pointer can travel into it without a gap. Focus keeps it open too.
 */
export function TopNav() {
  return (
    <header className="relative z-20 hidden border-b border-structure/15 lg:block">
      <div className="mx-auto flex max-w-5xl items-center gap-8 px-10 py-5">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg text-information transition-colors hover:text-interaction"
        >
          {site.wordmark}
        </Link>
        <SearchBox />
        <nav aria-label="Sections">
          <ul className="flex items-baseline gap-6">
            {site.nav.map((item) => {
              const menu = dropdowns[item.label];
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors hover:text-interaction"
                  >
                    {item.label}
                  </Link>
                  {menu && (
                    <div className="invisible absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 motion-reduce:transition-none">
                      <ul className="min-w-48 border border-structure/20 bg-atmosphere px-5 py-4 shadow-lg shadow-structure/10">
                        {menu.map((entry) => (
                          <li key={entry.label}>
                            {entry.href ? (
                              <Link
                                href={entry.href}
                                className="block py-1.5 font-sans text-xs tracking-wide text-information transition-colors hover:text-interaction"
                              >
                                {entry.label}
                              </Link>
                            ) : (
                              <span
                                className="block cursor-default py-1.5 font-sans text-xs tracking-wide text-information/35"
                                title="Coming soon"
                              >
                                {entry.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
