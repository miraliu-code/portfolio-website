import { cxInsights } from "@/lib/content/interactives/changi-experience";
import { CxHero } from "./cx-hero";
import { CxFloorPlan } from "./cx-plan";

/*
 * Changi Airport Experience — complete: the campus floor plan with
 * eight selectable spaces and the four-field design panel (Design
 * intent / Behavioral effect / Sensory detail / Tradeoff).
 *
 * Deliberately narrower than Airport Ecosystem: no organization
 * layer, no cross-highlighting. That restraint is the point — this
 * piece asks what philosophy a place embodies, not who runs it.
 *
 * Structure follows the shared interactive design language:
 * Guiding Question → Orientation → Explore → Key Insights →
 * Continue Reading.
 */
export function ChangiExperienceInteractive() {
  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the plan at rest */}
      <CxHero />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <CxFloorPlan />
        </div>
      </section>

      {/* 4 — Key insights */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {cxInsights.map((insight) => (
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
          The floor plan shows what Changi chose to build; the written essay
          argues what those choices add up to: a national philosophy of
          arrival, visible in horticulture budgets, nap cabins, and a
          waterfall where a food court would have paid better.
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
