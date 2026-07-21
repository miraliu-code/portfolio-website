import { cpoInsights } from "@/lib/content/interactives/china-plus-one";
import { buildCpoGeo } from "./geo";
import { CpoHero } from "./cpo-hero";
import { CpoExplore } from "./cpo-explore";

/*
 * Following the Factory (China Plus One) — Phases 1 + 2, complete:
 * the Pacific-centered map, timeline scrubber, sector toggle, full
 * four-field country panels (with the labor field restructured where
 * a routine label would neutralize it), Vietnam's transshipment-
 * resolution control, Mexico's brownfield/greenfield callout, Key
 * Insights, and Continue Reading.
 *
 * Server component: geography is projected at build time (see
 * geo.ts); the client receives only path strings and coordinates.
 */
export function ChinaPlusOneInteractive() {
  const geo = buildCpoGeo();

  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the map at rest */}
      <CpoHero geo={geo} />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <CpoExplore geo={geo} />
        </div>
      </section>

      {/* 4 — Key insights */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {cpoInsights.map((insight) => (
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

      {/* 5 — Continue reading */}
      <section className="border-t border-structure/15 pt-8">
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Continue Reading
        </h3>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-information/85">
          The map shows where manufacturing moved. The report's closing
          section (Section 12, The Skeptic's Case) asks how much of this
          shift is real, and how much is relabeling.
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
