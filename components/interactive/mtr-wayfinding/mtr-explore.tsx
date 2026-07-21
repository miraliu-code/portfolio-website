"use client";

import { useEffect, useState } from "react";
import {
  mtrCentralDating,
  mtrCentralFindings,
  mtrCentralGroups,
  mtrCentralIntro,
  mtrElementFieldLabels,
  mtrModeRestNote,
  mtrModes,
  mtrSourcing,
  getMtrElement,
  type MtrCentralGroup,
  type MtrElementId,
  type MtrMode,
} from "@/lib/content/interactives/mtr-wayfinding";
import { Tagged } from "@/components/interactive/professional-norms/pn-panel";
import { MtrSign } from "./mtr-sign";

/*
 * Explore: two views over the same subject.
 *   View 1 — the composite sign, with the Tourist / Local / Rush Hour
 *   reading-mode toggle and six selectable elements, each opening the
 *   Phase 2 three-part reading (what it tells you / why it reads this
 *   way / where it breaks its own rules).
 *   View 2 — Central Station, Live: the DOCUMENTED April 2013 mixed-
 *   convention sign content, rendered as two adjacent clickable
 *   boards, with both documented findings and the dating note.
 */

type MtrView = "sign" | "central";

const SONG_STACK =
  "'Noto Serif TC','Noto Serif CJK TC','Songti TC','SimSun','MingLiU',serif";

/* One documented board: three directions, colour bar per row, and the
   unevenly-applied platform discs exactly as documented. */
function CentralListSign({ group }: { group: MtrCentralGroup }) {
  return (
    <svg viewBox="0 0 440 250" aria-hidden="true" className="block w-full">
      <rect x={4} y={4} width={432} height={242} rx={6} fill="#1b212b" />
      {group.rows.map((row, i) => {
        const cy = 45 + i * 78;
        return (
          <g key={row.en}>
            <rect x={22} y={cy - 26} width={10} height={52} fill={row.color} />
            <text
              x={52}
              y={cy - 1}
              fontSize="24"
              fill="#f5f6f4"
              style={{ fontFamily: SONG_STACK }}
            >
              {row.zh}
            </text>
            <text
              x={52}
              y={cy + 25}
              fontSize="13.5"
              letterSpacing="0.8"
              fill="#f5f6f4"
              fillOpacity="0.88"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {row.en}
            </text>
            {(row.platforms ?? []).map((p, j) => (
              <g key={p}>
                <circle
                  cx={368 + j * 42}
                  cy={cy}
                  r={16}
                  fill={row.color}
                />
                <text
                  x={368 + j * 42}
                  y={cy + 6}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="#f5f6f4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {p}
                </text>
              </g>
            ))}
            {i < group.rows.length - 1 && (
              <line
                x1={22}
                y1={cy + 39}
                x2={418}
                y2={cy + 39}
                stroke="#f5f6f4"
                strokeOpacity="0.09"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function MtrExplore() {
  const [view, setView] = useState<MtrView>("sign");
  const [mode, setMode] = useState<MtrMode>("rest");
  const [selected, setSelected] = useState<MtrElementId | null>(null);
  const [centralSel, setCentralSel] = useState<MtrCentralGroup["id"] | null>(
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
  const centralGroup = centralSel
    ? mtrCentralGroups.find((g) => g.id === centralSel)!
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

          {/* Element panel — the Phase 2 three-part reading */}
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
                <div className="mt-4 grid gap-x-10 gap-y-5 md:grid-cols-2">
                  <div>
                    <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/55">
                      {mtrElementFieldLabels.says}
                    </p>
                    <Tagged
                      text={element.says}
                      className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
                    />
                  </div>
                  <div>
                    <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/55">
                      {mtrElementFieldLabels.why}
                    </p>
                    <Tagged
                      text={element.why}
                      className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
                    />
                  </div>
                </div>
                {element.breaks && (
                  <div className="mt-5 max-w-none border-l-2 border-interaction/70 bg-structure/5 p-5">
                    <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
                      {mtrElementFieldLabels.breaks}
                    </p>
                    <Tagged
                      text={element.breaks}
                      className="mt-2 max-w-3xl font-serif text-sm leading-[1.8] text-information/90"
                    />
                  </div>
                )}
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
          {/* Central Station, Live — the documented instance */}
          <div className="px-5 py-6 md:px-7">
            <p className="max-w-3xl font-serif text-sm leading-relaxed text-information/85">
              {mtrCentralIntro}
            </p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {mtrCentralGroups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() =>
                    setCentralSel((prev) => (prev === g.id ? null : g.id))
                  }
                  aria-pressed={centralSel === g.id}
                  className={`border p-4 text-left transition-colors motion-reduce:transition-none ${
                    centralSel === g.id
                      ? "border-interaction bg-structure/5"
                      : "border-structure/25 hover:border-interaction"
                  }`}
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-information/60">
                    {g.title}
                  </p>
                  <div className="mt-3">
                    <CentralListSign group={g} />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-5 min-h-[4.5rem]">
              {centralGroup ? (
                <Tagged
                  text={centralGroup.note}
                  className="max-w-3xl font-serif text-sm leading-[1.8] text-information/90"
                />
              ) : (
                <p className="max-w-3xl font-serif text-sm italic leading-relaxed text-information/60">
                  Click either board to read what its convention asks of a
                  passenger, and what the discs are doing.
                </p>
              )}
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {mtrCentralFindings.map((f) => (
                <div
                  key={f.tag}
                  className="border-l-2 border-interaction/70 bg-structure/5 p-5"
                >
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-interaction">
                    {f.tag}
                  </p>
                  <p className="mt-2 font-serif text-sm leading-[1.8] text-information/90">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
            <Tagged
              text={mtrCentralDating}
              className="mt-4 max-w-3xl font-serif text-xs italic leading-relaxed text-information/60"
            />
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
