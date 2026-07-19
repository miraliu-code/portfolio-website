import {
  dcEconomics,
  dcInsights,
  dcIntersection,
  dcModeShare,
} from "@/lib/content/interactives/dutch-cycling";
import { Tagged } from "@/components/interactive/professional-norms/pn-panel";
import { DcHero } from "./dc-hero";
import { DcExplore } from "./dc-explore";
import { DcIntersectionDiagram } from "./dc-intersection";

/*
 * Dutch Cycling Infrastructure — "Street Types" (Phases 1 + 2,
 * complete): the discrete street-type cards (a card swap and never a
 * slider, because the doctrine is categorical), full element
 * readings, the Davis/Mobycon protected-intersection section, the
 * mode-share plateau, the peer-reviewed economics finding, Key
 * Insights, and Continue Reading.
 */
export function DutchCyclingInteractive() {
  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the first street */}
      <DcHero />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <DcExplore />
        </div>
      </section>

      {/* 4 — The Junction, Imported */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          {dcIntersection.title}
        </h3>
        <Tagged
          text={dcIntersection.intro}
          className="mt-4 max-w-3xl font-serif text-sm leading-[1.8] text-information/90"
        />
        <div className="mt-5 border border-structure/20 bg-atmosphere p-4 md:p-6">
          <DcIntersectionDiagram />
          <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/45">
            The documented geometry, drawn in plan — presentation stylized
          </p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {dcIntersection.geometry.map((g) => (
            <div key={g.name} className="border border-structure/20 p-5">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                {g.name}
              </p>
              <Tagged
                text={g.text}
                className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
              />
            </div>
          ))}
        </div>
        <Tagged
          text={dcIntersection.lineage}
          className="mt-6 max-w-3xl font-serif text-sm leading-[1.8] text-information/85"
        />
        <div className="mt-5 max-w-3xl border-l-2 border-interaction/70 bg-structure/5 p-5">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
            The honest complication
          </p>
          <Tagged
            text={dcIntersection.complication}
            className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
          />
        </div>
      </section>

      {/* 5 — The Plateau */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          The Plateau
        </h3>
        <Tagged
          text={dcModeShare.intro}
          className="mt-4 max-w-3xl font-serif text-sm leading-[1.8] text-information/85"
        />
        <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-4">
          {dcModeShare.stats.map((s) => (
            <div key={s.label} className="border-t-2 border-structure/30 pt-3">
              <p className="font-serif text-3xl leading-none text-interaction">
                {s.value}
              </p>
              <p className="mt-1.5 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/70">
                {s.label}
              </p>
              <Tagged
                text={s.note}
                className="mt-2 font-serif text-xs leading-relaxed text-information/65"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 max-w-3xl border-l-2 border-interaction/70 bg-structure/5 p-5">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
            Three decades, flat on purpose
          </p>
          <Tagged
            text={dcModeShare.plateau}
            className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
          />
        </div>
      </section>

      {/* 6 — The Economics */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          The Economics
        </h3>
        <Tagged
          text={dcEconomics}
          className="mt-4 max-w-3xl font-serif text-sm leading-[1.8] text-information/90"
        />
      </section>

      {/* 7 — Key insights */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Key Insights
        </h3>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          {dcInsights.map((insight) => (
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

      {/* 8 — Continue reading */}
      <section className="border-t border-structure/15 pt-8">
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Continue Reading
        </h3>
        <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-information/85">
          The cards show the categories; the written field guide carries the
          doctrine behind them — Sustainable Safety's three principles, the
          retrofit history, and what the classification question would mean
          applied anywhere else.
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
