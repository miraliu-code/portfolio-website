import Link from "next/link";
import { AtlasMap } from "@/components/atlas-map";
import { DomainLegend } from "@/components/domain-legend";
import { ObservatoryMap } from "@/components/observatory-map";
import { SectionLabel } from "@/components/section-label";

/*
 * Homepage: exactly three sections — Hero (with the map), The Atlas,
 * Observatory preview. Nothing else (Standard 09).
 */

function Hero() {
  return (
    <section className="grid min-h-[85vh] items-center gap-12 py-20 xl:grid-cols-[1fr_minmax(0,34rem)]">
      <div>
        <SectionLabel>The Atlas · by Mira Liu</SectionLabel>
        <h1 className="mt-10 max-w-xl font-serif text-4xl leading-[1.15] text-information md:text-5xl md:leading-[1.15]">
          Everything is connected.
        </h1>
        <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-information/80">
          <span className="block">
            Everything on this site is an attempt to answer one question:
          </span>
          <span className="mt-3 block">
            How do organizations earn trust, create meaning, and make better
            decisions?
          </span>
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

      <DomainLegend />
    </section>
  );
}

function ObservatoryPreview() {
  return (
    <section className="border-t border-structure/20 py-24">
      <SectionLabel>The Observatory</SectionLabel>
      <h2 className="mt-8 max-w-2xl font-serif text-3xl leading-snug text-information">
        What is currently in motion.
      </h2>
      <div className="mt-10">
        <ObservatoryMap />
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
