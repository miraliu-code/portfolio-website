import { ptPhaseNote } from "@/lib/content/interactives/transit-info";
import { PtHero } from "./pt-hero";
import { PtExplore } from "./pt-explore";

/*
 * Public Transit as Information Design — Phase 1 (mechanic +
 * structure; placeholder comparative content, tagged [DRAFT] in the
 * data file, pending the dedicated content pass). Key Insights and
 * Continue Reading arrive with that pass.
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

      {/* Phase note */}
      <section className="border-t border-structure/15 pt-6">
        <p className="max-w-2xl font-sans text-xs leading-relaxed text-information/60">
          {ptPhaseNote}
        </p>
      </section>
    </div>
  );
}
