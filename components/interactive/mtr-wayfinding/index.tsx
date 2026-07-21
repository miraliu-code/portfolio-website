import {
  mtrCities,
  mtrCitiesIntro,
  mtrInsights,
  mtrMosaicIntro,
  mtrMosaicLiteracy,
  mtrMosaicRush,
} from "@/lib/content/interactives/mtr-wayfinding";
import { MtrHero } from "./mtr-hero";
import { MtrExplore } from "./mtr-explore";
import { MtrMosaicStrip } from "./mtr-mosaic";

/*
 * MTR Wayfinding — "Follow the Sign" (Phases 1 + 2, complete):
 * the composite sign with six full three-part element readings, the
 * reading-mode toggle, the documented Central Station comparison,
 * the mosaic deep dive, the four-city comparison, Key Insights, and
 * Continue Reading.
 *
 * Deliberately NOT a floor plan: a signage-and-symbol interaction —
 * the core interaction is reading signs, not navigating rooms.
 */
export function MtrFollowTheSign() {
  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the sign at rest */}
      <MtrHero />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <MtrExplore />
        </div>
      </section>

      {/* 4 — The mosaic layer */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          The Mosaic Layer
        </h3>
        <div className="mt-5 space-y-5">
          <p className="max-w-3xl font-serif text-sm leading-[1.8] text-information/90">
            {mtrMosaicIntro}
          </p>
          <p className="max-w-3xl font-serif text-sm leading-[1.8] text-information/90">
            {mtrMosaicLiteracy}
          </p>
          <div className="border border-structure/20 bg-atmosphere p-5 md:p-7">
            <MtrMosaicStrip />
          </div>
          <div className="max-w-3xl border-l-2 border-interaction/70 bg-structure/5 p-5">
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
              Why the Rush Hour toggle ends here
            </p>
            <p className="mt-2 font-serif text-sm leading-[1.8] text-information/90">
              {mtrMosaicRush}
            </p>
          </div>
        </div>
      </section>

      {/* 5 — Around the world */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          The Same Problems, Four Other Ways
        </h3>
        <p className="mt-4 max-w-3xl font-serif text-sm italic leading-relaxed text-information/70">
          {mtrCitiesIntro}
        </p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {mtrCities.map((c) => (
            <div key={c.city} className="border border-structure/20 p-5">
              <p className="font-serif text-lg text-information">{c.city}</p>
              <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                {c.angle}
              </p>
              <p className="mt-3 font-serif text-sm leading-[1.8] text-information/90">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6 — Key insights */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {mtrInsights.map((insight) => (
            <div
              key={insight.tag}
              className="border-t-2 border-interaction/60 bg-structure/5 p-5"
            >
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                {insight.tag}
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-information/90">
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7 — Continue reading */}
      <section className="border-t border-structure/15 pt-8">
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Continue Reading
        </h3>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-information/85">
          The sign is one station's worth of a system-wide argument. The
          written field guide carries the rest: the hierarchy, the transfer
          design, and the full case for why redundancy, not consistency, is
          what makes the MTR feel effortless.
        </p>
        <a
          href="#overview"
          className="mt-4 inline-block font-sans text-xs uppercase tracking-[0.25em] text-interaction hover:underline hover:underline-offset-4"
        >
          Return to the written report →
        </a>
      </section>
    </div>
  );
}
