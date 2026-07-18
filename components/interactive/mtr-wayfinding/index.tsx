import { mtrPhaseNote } from "@/lib/content/interactives/mtr-wayfinding";
import { MtrHero } from "./mtr-hero";
import { MtrExplore } from "./mtr-explore";

/*
 * MTR Wayfinding — "Follow the Sign" (Phase 1). Replaces the
 * placeholder beta interactive entirely.
 *
 * Deliberately NOT a floor plan (Airport Ecosystem and Changi own
 * that form): a signage-and-symbol interaction, closer to a design
 * critique — the core interaction is reading signs, not navigating
 * rooms. Key Insights and Continue Reading arrive with Phase 2's
 * full content.
 */
export function MtrFollowTheSign() {
  return (
    <div className="space-y-14">
      {/* 1 + 2 — Guiding question + orientation over the sign at rest */}
      <MtrHero />

      {/* 3 — Explore */}
      <section>
        <h3 className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-information/70">
          Explore
        </h3>
        <div className="mt-5">
          <MtrExplore />
        </div>
      </section>

      {/* Phase note */}
      <section className="border-t border-structure/15 pt-6">
        <p className="max-w-2xl font-sans text-xs leading-relaxed text-information/60">
          {mtrPhaseNote}
        </p>
      </section>
    </div>
  );
}
