import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { indexEntries, indexCategories } from "@/lib/content/index-entries";

export const metadata: Metadata = { title: "Index" };

/*
 * The Index: the publication's back matter. Alphabetical browsing by
 * category — a reference book's final pages, not primary navigation.
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
    ? indexEntries.filter((e) => e.label.toLowerCase().includes(query))
    : indexEntries;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>Index</SectionLabel>
      <h1 className="mt-8 font-serif text-4xl leading-tight text-information">
        Everything, alphabetically.
      </h1>
      <form action="/index" className="mt-8 max-w-sm">
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
          <Link href="/index" className="text-interaction hover:underline">
            clear
          </Link>
        </p>
      )}

      <div className="mt-14 space-y-14">
        {indexCategories.map((category) => {
          const inCategory = entries.filter((e) => e.category === category);
          if (inCategory.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="border-b border-structure/20 pb-3 font-sans text-xs uppercase tracking-[0.3em] text-structure">
                {category}
              </h2>
              <ul className="mt-4 columns-1 gap-10 sm:columns-2">
                {inCategory.map((entry) => (
                  <li key={entry.category + entry.label} className="mb-2 break-inside-avoid">
                    {entry.href ? (
                      <Link
                        href={entry.href}
                        className="font-serif text-base text-information transition-colors hover:text-interaction"
                      >
                        {entry.label}
                      </Link>
                    ) : (
                      <span className="font-serif text-base text-information">
                        {entry.label}
                      </span>
                    )}
                    {entry.coordinate && (
                      <span className="ml-2 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/40">
                        {entry.coordinate}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
