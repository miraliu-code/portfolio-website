import Link from "next/link";
import { AtlasMap } from "@/components/atlas-map";
import { DomainLegend } from "@/components/domain-legend";
import { SectionLabel } from "@/components/section-label";
import { observatorySections } from "@/lib/content/observatory";

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

/*
 * Observatory preview: all five sections as a loose constellation —
 * no center, varied sizes, connected by quiet lines. Hover: deeper
 * blue and slightly larger (line highlighting stays Atlas-specific).
 */
const OBSERVATORY_SLOTS: { x: number; y: number; d: number }[] = [
  { x: 11, y: 34, d: 15 },
  { x: 33, y: 64, d: 12.5 },
  { x: 55, y: 30, d: 16.5 },
  { x: 76, y: 62, d: 13 },
  { x: 92, y: 26, d: 11 },
];

const OBSERVATORY_EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 2],
  [2, 3],
  [3, 4],
];

function ObservatoryPreview() {
  return (
    <section className="border-t border-structure/20 py-24">
      <SectionLabel>The Observatory</SectionLabel>
      <h2 className="mt-8 max-w-2xl font-serif text-3xl leading-snug text-information">
        What is currently in motion.
      </h2>

      {/* Constellation (md+) */}
      <div className="relative mt-10 hidden aspect-[100/42] w-full max-w-3xl select-none md:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 42"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <g stroke="var(--structure)" strokeOpacity="0.25" strokeWidth="0.2">
            {OBSERVATORY_EDGES.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                x1={OBSERVATORY_SLOTS[a].x}
                y1={(OBSERVATORY_SLOTS[a].y * 42) / 100}
                x2={OBSERVATORY_SLOTS[b].x}
                y2={(OBSERVATORY_SLOTS[b].y * 42) / 100}
              />
            ))}
          </g>
        </svg>
        {observatorySections.map((section, i) => {
          const slot = OBSERVATORY_SLOTS[i];
          return (
            <Link
              key={section.slug}
              href={`/observatory/${section.slug}`}
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                width: `${slot.d}%`,
              }}
              className="absolute z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-structure/10 p-3 text-center font-sans text-[0.55rem] uppercase tracking-[0.15em] text-information transition-[transform,background-color] duration-300 ease-out hover:scale-105 hover:bg-structure/30 focus-visible:scale-105 focus-visible:bg-structure/30 motion-reduce:transition-none motion-reduce:hover:scale-100 lg:text-[0.65rem]"
            >
              {section.name}
            </Link>
          );
        })}
      </div>

      {/* Simple list below md, where the constellation has no room. */}
      <ul className="mt-10 space-y-3 md:hidden">
        {observatorySections.map((section) => (
          <li key={section.slug}>
            <Link
              href={`/observatory/${section.slug}`}
              className="font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors hover:text-interaction"
            >
              {section.name}
            </Link>
          </li>
        ))}
      </ul>

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
