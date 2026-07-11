import {
  hsrCountries,
  hsrInsights,
} from "@/lib/content/interactives/high-speed-rail";
import { buildHsrGeo } from "./geo";
import { HsrHero } from "./hsr-hero";
import { HsrExplore } from "./hsr-explore";

/*
 * High-Speed Rail Around the World — the Atlas's first flagship
 * interactive (Phase 1). Server component: geography is projected at
 * build time (see geo.ts); the client receives only SVG path strings.
 *
 * Structure follows the shared interactive design language:
 * Guiding Question → Orientation → Explore → Key Insights →
 * Continue Reading.
 */
export function HighSpeedRailInteractive() {
  const geo = buildHsrGeo();

  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question over the resting network preview,
          with the single orientation line. */}
      <HsrHero geo={geo} />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <HsrExplore geo={geo} countries={hsrCountries} />
        </div>
      </section>

      {/* 4 — Key insights (Phase 1: static placement) */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {hsrInsights.map((insight) => (
            <div
              key={insight.country}
              className="border-t-2 border-interaction/60 bg-structure/5 p-5"
            >
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                {insight.country}
              </p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-information/90">
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5 — Continue reading */}
      <section className="border-t border-structure/15 pt-8">
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Continue Reading
        </h3>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-information/85">
          The map shows you where high-speed rail happened. The written
          report argues why — history, politics, funding, and what the next
          generation of investment should learn from both columns of this
          map.
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
