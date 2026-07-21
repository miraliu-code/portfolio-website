import { aeInsights } from "@/lib/content/interactives/airport-ecosystem";
import { AeHero } from "./ae-hero";
import { AeFloorPlan } from "./ae-plan";

/*
 * Airport Ecosystem — Phases 1 + 2, complete: the stylized terminal
 * floor plan with zone selection, the organization layer with
 * cross-highlighting (an organization lights every zone it touches),
 * and the four-field detail panel for all fifteen nodes.
 *
 * Structure follows the shared interactive design language:
 * Guiding Question → Orientation → Explore → Key Insights →
 * Continue Reading.
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
      </section>

      {/* 4 — Key insights */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {aeInsights.map((insight) => (
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
          The floor plan shows the seams; the written field guide argues why
          they exist: how ownership, mandates, and contracts carve one
          building into seven organizations, and what that costs the
          passenger who experiences it as a single place.
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
