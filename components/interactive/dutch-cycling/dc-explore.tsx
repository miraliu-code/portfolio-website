"use client";

import { useEffect, useState } from "react";
import {
  dcBaselineNote,
  dcDoctrineNote,
  dcStreets,
  getDcStreet,
  type DcStreetId,
} from "@/lib/content/interactives/dutch-cycling";
import { Tagged } from "@/components/interactive/professional-norms/pn-panel";
import { DcSection, DC_W, DC_H } from "./dc-section";

/*
 * Explore: the discrete street-type cards and the cross-section
 * viewport. Selecting a card CROSS-FADES between fully-formed
 * drawings — all four sections stay mounted in a stack and swap
 * opacity, so the transition reads as a clean swap between distinct
 * designs, never a morph. There is deliberately no slider here (see
 * dcDoctrineNote, rendered below the drawing).
 */
export function DcExplore() {
  const [street, setStreet] = useState<DcStreetId>("through-road");
  const [selected, setSelected] = useState<string | null>(null);

  const current = getDcStreet(street);
  const element = selected
    ? current.elements.find((e) => e.id === selected) ?? null
    : null;

  /* Escape deselects, matching the other systems. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chooseStreet = (id: DcStreetId) => {
    setStreet(id);
    setSelected(null);
  };

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* Street-type cards — discrete, not a dial. */}
      <div className="grid grid-cols-2 gap-3 border-b border-structure/20 px-5 py-4 md:grid-cols-4 md:px-7">
        {dcStreets.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => chooseStreet(s.id)}
            aria-pressed={street === s.id}
            className={`border p-3 text-left transition-colors motion-reduce:transition-none ${
              street === s.id
                ? "border-interaction bg-structure/5"
                : "border-structure/25 hover:border-interaction"
            }`}
          >
            <p className="font-serif text-base leading-snug text-information">
              {s.name}
            </p>
            <p className="mt-0.5 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-interaction">
              {s.term} · {s.speed}
            </p>
            <p className="mt-1.5 font-serif text-xs italic leading-relaxed text-information/65">
              {s.summary}
            </p>
          </button>
        ))}
      </div>

      {/* Cross-section viewport: all four drawings stacked, opacity
          cross-fade on swap. */}
      <div className="px-5 pt-6 md:px-7">
        <div
          className="relative"
          style={{ aspectRatio: `${DC_W} / ${DC_H}` }}
        >
          {dcStreets.map((s) => {
            const active = s.id === street;
            return (
              <div
                key={s.id}
                aria-hidden={!active}
                className={`dc-layer absolute inset-0 ${
                  active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <DcSection
                  street={s.id}
                  selected={active ? selected : null}
                  onSelect={active ? setSelected : undefined}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-2 max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {dcDoctrineNote}
          {street === "conventional" && <> {dcBaselineNote}</>}
        </p>
      </div>

      {/* Element panel */}
      <div className="mt-4 min-h-[6rem] border-t border-structure/20 px-5 py-5 md:px-7">
        {element ? (
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <p className="flex flex-wrap items-baseline gap-x-4 font-serif text-xl leading-snug text-information">
                {element.name}
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction">
                  {current.name} · {current.speed}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
              >
                Reset
              </button>
            </div>
            <Tagged
              text={element.note}
              className="mt-3 max-w-3xl font-serif text-sm leading-[1.8] text-information/90"
            />
            <p className="mt-3 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/45">
              Phase 1 note — the full reading of each element arrives in
              Phase 2
            </p>
          </div>
        ) : (
          <p className="font-serif text-sm italic leading-relaxed text-information/60">
            {current.elements.length} parts of this street are selectable.
            Click the drawing to see why each is built the way it is, or
            choose another street type above.
          </p>
        )}
      </div>
    </div>
  );
}
