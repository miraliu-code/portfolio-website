import { buildCpoGeo } from "./geo";
import { CpoHero } from "./cpo-hero";
import { CpoExplore } from "./cpo-explore";

/*
 * Following the Factory (China Plus One) — Phase 1: the
 * Pacific-centered map, the timeline scrubber, the sector toggle, and
 * country selection. The full four-field panels, the Vietnam
 * transshipment mini-interaction, Mexico's brownfield callout, Key
 * Insights, and Continue Reading arrive in Phase 2.
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
        <p className="mt-4 max-w-2xl font-serif text-xs italic leading-relaxed text-information/55">
          Phase 1 of this interactive: the map, the timeline, and the sector
          toggle. The full country panels — what moved, what it cost, the
          labor reality, the ceiling — arrive next.
        </p>
      </section>
    </div>
  );
}
