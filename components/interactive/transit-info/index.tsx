import { ptInsights } from "@/lib/content/interactives/transit-info";
import { Tagged } from "@/components/interactive/professional-norms/pn-panel";
import { PtHero } from "./pt-hero";
import { PtExplore } from "./pt-explore";

/*
 * Public Transit as Information Design — complete: the 4-city ×
 * 4-system comparison with the Tourist/Local reading toggle, the
 * fragmentation/incentives spine (Maps, Tickets, Announcements) and
 * the false-neutrality counterpoint (Icons), Key Insights, and
 * Continue Reading.
 */
export function TransitInfoInteractive() {
  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the map pattern */}
      <PtHero />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <PtExplore />
        </div>
      </section>

      {/* 4 — Key insights */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {ptInsights.map((insight) => (
            <div
              key={insight.tag}
              className="border-t-2 border-interaction/60 bg-structure/5 p-5"
            >
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                {insight.tag}
              </p>
              <Tagged
                text={insight.text}
                className="mt-2 font-serif text-sm leading-relaxed text-information/90"
              />
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
          The four cities are the exhibits; the written essay carries the
          argument — what it means to treat information as infrastructure,
          and who a system is really built for.
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
