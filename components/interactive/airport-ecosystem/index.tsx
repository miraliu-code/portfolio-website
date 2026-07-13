import { AeHero } from "./ae-hero";
import { AeFloorPlan } from "./ae-plan";

/*
 * Airport Ecosystem — Phase 1: the stylized terminal floor plan with
 * zone selection. The organization layer (who actually runs each
 * zone), cross-highlighting, the four-field detail panel, Key
 * Insights, and Continue Reading arrive in Phase 2.
 */
export function AirportEcosystemInteractive() {
  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the plan at rest */}
      <AeHero />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <AeFloorPlan />
        </div>
        <p className="mt-4 max-w-2xl font-serif text-xs italic leading-relaxed text-information/55">
          Phase 1 of this interactive: the terminal and its zones. The
          organization layer — who actually runs each zone, and where they
          fail to coordinate — arrives next.
        </p>
      </section>
    </div>
  );
}
