import Link from "next/link";
import { site } from "@/lib/site";

/*
 * Top navigation (desktop): wordmark → home, search left, sections right.
 * Below lg the mobile drawer in PersistentPanel carries navigation instead.
 */
export function TopNav() {
  return (
    <header className="hidden border-b border-structure/15 lg:block">
      <div className="mx-auto flex max-w-5xl items-center gap-8 px-10 py-5">
        <Link
          href="/"
          className="shrink-0 font-serif text-lg text-information transition-colors hover:text-interaction"
        >
          {site.wordmark}
        </Link>
        <form action="/index" className="min-w-0 flex-1" role="search">
          <input
            type="search"
            name="q"
            placeholder="Search the Atlas…"
            aria-label="Search the Atlas"
            className="w-full max-w-56 border-b border-structure/30 bg-transparent pb-1 font-sans text-xs tracking-wide text-information placeholder:text-information/40 focus:border-interaction focus:outline-none"
          />
        </form>
        <nav aria-label="Sections">
          <ul className="flex items-baseline gap-6">
            {site.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors hover:text-interaction"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
