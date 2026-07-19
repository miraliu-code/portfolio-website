import { dcPhaseNote } from "@/lib/content/interactives/dutch-cycling";
import { DcHero } from "./dc-hero";
import { DcExplore } from "./dc-explore";

/*
 * Dutch Cycling Infrastructure — "Street Types" (Phase 1).
 *
 * The mechanic is discrete on purpose: the report argues that Dutch
 * street safety is CATEGORICAL (classify the street, then design
 * follows), so the interaction is a clean swap between fully-formed
 * street designs — never a slider, never a morph. Key Insights and
 * Continue Reading arrive with Phase 2's full content.
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

      {/* Phase note */}
      <section className="border-t border-structure/15 pt-6">
        <p className="max-w-2xl font-sans text-xs leading-relaxed text-information/60">
          {dcPhaseNote}
        </p>
      </section>
    </div>
  );
}
