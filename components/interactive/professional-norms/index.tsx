import { buildPnHeroGlobe } from "./geo";
import { PnHero } from "./pn-hero";
import { PnGlobe } from "./pn-globe";

/*
 * Professional Norms Around the World — Phase 1: the globe mechanic
 * and country/cluster selection. Situations, panels, insights, and
 * Continue Reading arrive in later phases.
 */
export function ProfessionalNormsInteractive() {
  const heroGlobe = buildPnHeroGlobe();

  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation line over the globe still */}
      <PnHero globe={heroGlobe} />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <PnGlobe />
        </div>
      </section>
    </div>
  );
}
