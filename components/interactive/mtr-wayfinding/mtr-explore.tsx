"use client";

import { useEffect, useState } from "react";
import {
  mtrCentralFinding,
  mtrCentralIntro,
  mtrCentralSigns,
  mtrElements,
  mtrModeRestNote,
  mtrModes,
  mtrSourcing,
  getMtrElement,
  type MtrCentralSign,
  type MtrElementId,
  type MtrMode,
} from "@/lib/content/interactives/mtr-wayfinding";
import { Tagged } from "@/components/interactive/professional-norms/pn-panel";
import { MtrSign } from "./mtr-sign";

/*
 * Explore: two views over the same subject.
 *   View 1 — the composite sign, with the Tourist / Local / Rush Hour
 *   reading-mode toggle and six selectable elements.
 *   View 2 — Central Station, Live: the documented line-vs-terminus
 *   naming conflict, rendered as two adjacent clickable signs rather
 *   than prose.
 */

type MtrView = "sign" | "central";

const SONG_STACK =
  "'Noto Serif TC','Noto Serif CJK TC','Songti TC','SimSun','MingLiU',serif";

/* The Central mini-signs share one drawing: a dark board, the Island
   Line blue bar (the colour that survives the wording conflict), the
   bilingual pair, and an up arrow for "toward the platforms". */
function CentralMiniSign({ sign }: { sign: MtrCentralSign }) {
  return (
    <svg viewBox="0 0 440 150" aria-hidden="true" className="block w-full">
      <rect x={4} y={4} width={432} height={142} rx={6} fill="#1b212b" />
      <rect x={22} y={20} width={12} height={110} fill="#1e5aa5" />
      <text
        x={58}
        y={72}
        fontSize="32"
        fill="#f5f6f4"
        style={{ fontFamily: SONG_STACK }}
      >
        {sign.zh}
      </text>
      <text
        x={58}
        y={112}
        fontSize="17"
        letterSpacing="1"
        fill="#f5f6f4"
        fillOpacity="0.88"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {sign.en}
      </text>
      <path
        d="M 392 108 V 46 M 380 58 L 392 44 L 404 58"
        fill="none"
        stroke="#f5f6f4"
        strokeOpacity="0.95"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MtrExplore() {
  const [view, setView] = useState<MtrView>("sign");
  const [mode, setMode] = useState<MtrMode>("rest");
  const [selected, setSelected] = useState<MtrElementId | null>(null);
  const [centralSel, setCentralSel] = useState<MtrCentralSign["id"] | null>(
    null,
  );

  /* Escape deselects, matching the other systems. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setCentralSel(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const element = selected ? getMtrElement(selected) : null;
  const centralSign = centralSel
    ? mtrCentralSigns.find((s) => s.id === centralSel)!
    : null;
  const modeNote =
    mode === "rest" ? mtrModeRestNote : mtrModes.find((m) => m.id === mode)!.note;

  const chip = (active: boolean) =>
    `border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
      active
        ? "border-interaction bg-interaction text-atmosphere"
        : "border-structure/35 text-information/80 hover:border-interaction hover:text-interaction"
    }`;

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* View switch */}
      <div className="flex flex-wrap items-center gap-2 border-b border-structure/20 px-5 py-4 md:px-7">
        <span className="mr-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
          View
        </span>
        <button
          type="button"
          onClick={() => setView("sign")}
          aria-pressed={view === "sign"}
          className={chip(view === "sign")}
        >
          The Composite Sign
        </button>
        <button
          type="button"
          onClick={() => setView("central")}
          aria-pressed={view === "central"}
          className={chip(view === "central")}
        >
          Central Station, Live
        </button>
      </div>

      {view === "sign" ? (
        <>
          {/* Reading-mode toggle */}
          <div className="border-b border-structure/20 px-5 py-4 md:px-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
                Reading mode
              </span>
              {mtrModes.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() =>
                    setMode((prev) => (prev === m.id ? "rest" : m.id))
                  }
                  aria-pressed={mode === m.id}
                  className={chip(mode === m.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <p
              aria-live="polite"
              className="mt-3 max-w-3xl font-serif text-sm italic leading-relaxed text-information/70"
            >
              {modeNote}
            </p>
          </div>

          {/* The sign */}
          <div className="px-5 pt-6 md:px-7">
            <MtrSign mode={mode} selected={selected} onSelect={setSelected} />
          </div>

          {/* Element panel */}
          <div className="min-h-[7rem] border-t border-structure/20 px-5 py-5 md:px-7">
            {element ? (
              <div>
                <div className="flex items-baseline justify-between gap-6">
                  <p className="flex flex-wrap items-baseline gap-x-4 font-serif text-xl leading-snug text-information">
                    {element.name}
                    <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction">
                      {element.locus}
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
                Six parts of this sign are selectable — the numbered disc, the
                line name, the terminus, an exit letter, the yellow block
                itself, and the Chinese label. Click any of them, in any
                reading mode.
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Central Station, Live */}
          <div className="px-5 py-6 md:px-7">
            <p className="max-w-3xl font-serif text-sm leading-relaxed text-information/85">
              {mtrCentralIntro}
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {mtrCentralSigns.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() =>
                    setCentralSel((prev) => (prev === s.id ? null : s.id))
                  }
                  aria-pressed={centralSel === s.id}
                  className={`border p-4 text-left transition-colors motion-reduce:transition-none ${
                    centralSel === s.id
                      ? "border-interaction bg-structure/5"
                      : "border-structure/25 hover:border-interaction"
                  }`}
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-information/60">
                    {s.heading}
                  </p>
                  <div className="mt-3">
                    <CentralMiniSign sign={s} />
                  </div>
                  <p className="mt-3 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction">
                    Names the direction by{" "}
                    {s.id === "by-line" ? "line" : "terminus"}
                  </p>
                </button>
              ))}
            </div>
            <div className="mt-5 min-h-[4.5rem]">
              {centralSign ? (
                <Tagged
                  text={centralSign.note}
                  className="max-w-3xl font-serif text-sm leading-[1.8] text-information/90"
                />
              ) : (
                <p className="max-w-3xl font-serif text-sm italic leading-relaxed text-information/60">
                  Click either sign to read what its convention asks of a
                  passenger.
                </p>
              )}
            </div>
            <div className="mt-4 max-w-3xl border-l-2 border-interaction/70 bg-structure/5 p-5">
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                The documented inconsistency
              </p>
              <p className="mt-2 font-serif text-sm leading-[1.8] text-information/90">
                {mtrCentralFinding}
              </p>
            </div>
          </div>
        </>
      )}

      {/* Sourcing note — both views */}
      <div className="border-t border-structure/15 px-5 py-4 md:px-7">
        <p className="max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {mtrSourcing}
        </p>
      </div>
    </div>
  );
}
