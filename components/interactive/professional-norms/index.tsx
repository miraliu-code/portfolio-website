import { buildPnHeroGlobe } from "./geo";
import { PnHero } from "./pn-hero";
import { PnGlobe } from "./pn-globe";
import { Tagged } from "./pn-panel";
import {
  pnAdaptationBoundary,
  pnAdaptationBoundaryTitle,
  pnMethodNote,
} from "@/lib/content/interactives/professional-norms-situations";

/*
 * Professional Norms Around the World — Phases 1 + 2: the globe with
 * axis-based lens re-clustering, the A1–A3 country data layer, and
 * three of eight situation cells (Meeting, Feedback, Negotiation).
 * Key Insights and Continue Reading polish arrive in a later phase.
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

      {/* Method & sources — the coverage gap stated, not implied. */}
      <section className="border-t border-structure/15 pt-8">
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Method &amp; Sources
        </h3>
        <div className="mt-4 max-w-2xl space-y-4">
          {pnMethodNote.map((p) => (
            <p
              key={p.slice(0, 24)}
              className="font-serif text-sm italic leading-[1.8] text-information/70"
            >
              {p}
            </p>
          ))}
        </div>

        {/* A6-lite — the adaptation boundary, one shared principle.
            Normative content: tagged Contested, gap tracked in text. */}
        <div className="mt-8 max-w-2xl border-l-2 border-interaction/50 pl-5">
          <h4 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            {pnAdaptationBoundaryTitle}
          </h4>
          <div className="mt-3 space-y-4">
            {pnAdaptationBoundary.map((p) => (
              <Tagged
                key={p.slice(0, 24)}
                text={p}
                className="font-serif text-sm leading-[1.8] text-information/80"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
