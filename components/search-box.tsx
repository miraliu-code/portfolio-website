"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchAtlas } from "@/lib/search";

/*
 * Live search over the content registry: project titles, guiding
 * questions, domains, and organizations. Results drop down as you
 * type; Enter falls through to the full Index filtered by the query.
 */
export function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const results = open ? searchAtlas(query) : [];

  return (
    <div
      className="relative min-w-0 flex-1"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) {
            setOpen(false);
            router.push(`/the-index?q=${encodeURIComponent(query.trim())}`);
          }
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search the Atlas…"
          aria-label="Search the Atlas"
          className="w-full max-w-56 border-b border-structure/30 bg-transparent pb-1 font-sans text-xs tracking-wide text-information placeholder:text-information/40 focus:border-interaction focus:outline-none"
        />
      </form>
      {results.length > 0 && (
        <ul className="absolute left-0 top-full z-30 mt-2 w-80 border border-structure/20 bg-atmosphere py-2 shadow-lg shadow-structure/10">
          {results.map((doc) => (
            <li key={doc.href + doc.label}>
              <Link
                href={doc.href}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
                className="group flex items-baseline justify-between gap-4 px-5 py-2"
              >
                <span className="min-w-0">
                  <span className="block truncate font-serif text-sm text-information transition-colors group-hover:text-interaction">
                    {doc.label}
                  </span>
                  {doc.sublabel && (
                    <span className="block truncate font-serif text-xs italic text-information/55">
                      {doc.sublabel}
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/45">
                  {doc.category}
                </span>
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-structure/10 px-5 pt-2">
            <Link
              href={`/the-index?q=${encodeURIComponent(query.trim())}`}
              onClick={() => setOpen(false)}
              className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction hover:underline hover:underline-offset-4"
            >
              Search the full Index →
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
