import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { SectionLabel } from "@/components/section-label";
import { indexEntries, indexLetter } from "@/lib/content/index-entries";

export const metadata: Metadata = { title: "Index" };

/*
 * The Index (Standard 09): the publication's back matter. Every project,
 * domain, category, and organization, alphabetically under letter
 * headings — a reference book's final pages, not primary navigation.
 * The top-nav search lands here with ?q=.
 */
export default async function IndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const entries = query
    ? indexEntries.filter(
        (e) =>
          e.label.toLowerCase().includes(query) ||
          e.category.toLowerCase().includes(query),
      )
    : indexEntries;

  /* Group alphabetically, ignoring leading articles. */
  const letters = new Map<string, typeof entries>();
  for (const entry of entries) {
    const letter = indexLetter(entry.label);
    if (!letters.has(letter)) letters.set(letter, []);
    letters.get(letter)!.push(entry);
  }
  const sortedLetters = [...letters.keys()].sort();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>The Index</SectionLabel>
      <div>
        <BackLink href="/" label="Back to the homepage" />
      </div>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-information">
        Everything, alphabetically.
      </h1>
      <form action="/the-index" className="mt-8 max-w-sm">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="Filter the index…"
          aria-label="Filter the index"
          className="w-full border-b border-structure/30 bg-transparent pb-2 font-sans text-sm tracking-wide text-information placeholder:text-information/40 focus:border-interaction focus:outline-none"
        />
      </form>
      {query && (
        <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
          {entries.length} result{entries.length === 1 ? "" : "s"} for “{q}” ·{" "}
          <Link href="/the-index" className="text-interaction hover:underline">
            clear
          </Link>
        </p>
      )}

      <div className="mt-14 space-y-12">
        {sortedLetters.map((letter) => (
          <section key={letter} className="grid gap-6 sm:grid-cols-[3rem_1fr]">
            <h2
              aria-label={`Entries beginning with ${letter}`}
              className="font-serif text-3xl italic text-structure/50"
            >
              {letter}
            </h2>
            <ul className="divide-y divide-structure/10 border-y border-structure/10">
              {letters.get(letter)!.map((entry) => (
                <li key={entry.category + entry.label}>
                  {entry.href ? (
                    <Link
                      href={entry.href}
                      className="group flex items-baseline justify-between gap-6 py-2.5"
                    >
                      <span className="font-serif text-base text-information transition-colors group-hover:text-interaction">
                        {entry.label}
                        {entry.coordinate && (
                          <span className="ml-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/40">
                            {entry.coordinate}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/45">
                        {entry.category}
                      </span>
                    </Link>
                  ) : (
                    <span className="flex items-baseline justify-between gap-6 py-2.5">
                      <span className="font-serif text-base text-information">
                        {entry.label}
                      </span>
                      <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/45">
                        {entry.category}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
