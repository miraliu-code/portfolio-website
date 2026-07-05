import Link from "next/link";
import { AtlasMap } from "@/components/atlas-map";
import { SectionLabel } from "@/components/section-label";
import { domains } from "@/lib/content/domains";
import {
  observatorySections,
  observatoryPreviewSlugs,
} from "@/lib/content/observatory";

/*
 * Homepage: exactly three sections — Hero (with the map), The Atlas,
 * Observatory preview. Nothing else (Standard 09).
 */

function Hero() {
  return (
    <section className="grid min-h-[85vh] items-center gap-12 py-20 xl:grid-cols-[1fr_minmax(0,34rem)]">
      <div>
        <SectionLabel>The Atlas · A publication by Mira Liu</SectionLabel>
        <h1 className="mt-10 max-w-xl font-serif text-4xl leading-[1.15] text-information md:text-5xl md:leading-[1.15]">
          Everything is connected.
        </h1>
        <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-information/80">
          Strategy, communication, psychology, design, reading, and
          observation — complementary ways of understanding how organizations
          earn trust, create meaning, and make better decisions.
        </p>
        <Link
          href="/atlas"
          className="mt-10 inline-block font-sans text-xs uppercase tracking-[0.25em] text-interaction transition-colors hover:underline hover:underline-offset-4"
        >
          Explore the Atlas →
        </Link>
      </div>
      {/* The map rides beside the hero on wide screens (quiet until hovered). */}
      <div className="hidden xl:block">
        <AtlasMap />
      </div>
    </section>
  );
}

function AtlasSection() {
  return (
    <section id="atlas" className="scroll-mt-16 border-t border-structure/20 py-24">
      <SectionLabel>The Atlas</SectionLabel>
      <h2 className="mt-8 max-w-2xl font-serif text-3xl leading-snug text-information">
        Six domains of inquiry. One center.
      </h2>
      <p className="mt-6 max-w-xl font-serif text-base leading-relaxed text-information/80">
        Work is organized by the questions it seeks to answer, not the format
        it takes. Each domain asks a different question about the same subject.
      </p>

      {/* Below xl the hero hides the map, so it renders here instead. */}
      <div className="mx-auto mt-12 max-w-xl xl:hidden">
        <AtlasMap />
      </div>

      <ul className="mt-12 max-w-2xl">
        {domains.map((domain) => (
          <li key={domain.slug} className="border-t border-structure/15">
            <Link
              href={`/atlas/${domain.slug}`}
              className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors group-hover:text-interaction">
                {domain.name}
              </span>
              <span className="font-serif text-base italic text-information/70 transition-colors group-hover:text-interaction sm:text-right">
                {domain.question}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ObservatoryPreview() {
  const preview = observatoryPreviewSlugs
    .map((slug) => observatorySections.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);

  return (
    <section className="border-t border-structure/20 py-24">
      <SectionLabel>The Observatory</SectionLabel>
      <h2 className="mt-8 max-w-2xl font-serif text-3xl leading-snug text-information">
        What is currently in motion.
      </h2>
      <div className="mt-14 flex flex-wrap gap-8">
        {preview.map((section) => (
          <Link
            key={section!.slug}
            href={`/observatory/${section!.slug}`}
            className="flex h-44 w-44 items-center justify-center rounded-full border border-structure/40 p-6 text-center font-sans text-xs uppercase tracking-[0.15em] text-information transition-[transform,border-color,color,box-shadow] duration-200 hover:-translate-y-1 hover:border-interaction hover:text-interaction hover:shadow-lg hover:shadow-structure/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {section!.name}
          </Link>
        ))}
      </div>
      <Link
        href="/observatory"
        className="mt-12 inline-block font-sans text-xs uppercase tracking-[0.25em] text-interaction transition-colors hover:underline hover:underline-offset-4"
      >
        Enter Observatory →
      </Link>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 sm:px-10">
      <Hero />
      <AtlasSection />
      <ObservatoryPreview />
    </main>
  );
}
