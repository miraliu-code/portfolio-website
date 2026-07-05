import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { observatorySections } from "@/lib/content/observatory";

export const metadata: Metadata = { title: "Observatory" };

/* The Observatory: ongoing curiosity, no folders — large circles. */
export default function ObservatoryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <SectionLabel>The Observatory</SectionLabel>
      <h1 className="mt-8 max-w-2xl font-serif text-4xl leading-tight text-information">
        Work in motion.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        The Atlas records completed investigations. The Observatory documents
        what is currently underway — intentionally unfinished, and always
        changing.
      </p>
      <div className="mt-16 flex flex-wrap gap-10">
        {observatorySections.map((section) => (
          <Link
            key={section.slug}
            href={`/observatory/${section.slug}`}
            className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-full border border-structure/40 p-6 text-center transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-interaction hover:shadow-lg hover:shadow-structure/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-information">
              {section.name}
            </span>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/40">
              {section.entries.length} entries
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
