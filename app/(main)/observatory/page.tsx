import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { SectionLabel } from "@/components/section-label";
import { observatorySections } from "@/lib/content/observatory";

export const metadata: Metadata = { title: "Observatory" };

/* The Observatory: ongoing curiosity, no folders — large circles. */
export default function ObservatoryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <SectionLabel>The Observatory</SectionLabel>
      <div>
        <BackLink href="/" label="Back to the homepage" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
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
            className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-full bg-structure/10 p-6 text-center transition-[transform,background-color] duration-300 ease-out hover:scale-105 hover:bg-structure/30 focus-visible:scale-105 focus-visible:bg-structure/30 motion-reduce:transition-none motion-reduce:hover:scale-100"
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
