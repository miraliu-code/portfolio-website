"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  hsrKmAtYear,
  hsrTimeline,
  type HsrCountry,
} from "@/lib/content/interactives/high-speed-rail";
import type { HsrGeo } from "./geo";
import { HsrGrowthChart, HsrCostChart } from "./hsr-charts";

/*
 * High-Speed Rail — Explore (Phases 1 + 2a).
 * A projected world map; nine clickable countries. Selecting one zooms
 * the camera (CSS transform), draws its rail lines stroke-by-stroke,
 * and slides in a detail panel (right on desktop, bottom sheet on
 * mobile). A timeline scrubber (1964–2024) below the map drives how
 * much of every network is drawn — linear interpolation between known
 * growth points, rendered as a partial-stroke mask on the full route
 * paths. Reduced motion: no pan, no draw animation — values still
 * update (they are data), they just snap.
 */

const MAP_W = 960;
const MAP_H = 500;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function Stat({ text }: { text: string }) {
  return (
    <li className="border-l border-structure/25 pl-4 font-serif text-sm leading-relaxed text-information/85">
      {text}
    </li>
  );
}

function PanelSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
        {label}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function HsrExplore({
  geo,
  countries,
}: {
  geo: HsrGeo;
  countries: HsrCountry[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  /* While true, the selected country's rails transition their dash
     offset (the select-flourish). Off otherwise, so scrubbing feels
     instantaneous. */
  const [flourish, setFlourish] = useState(false);
  /* Timeline year (Phase 2a). Fractional while dragging; survives
     select/deselect. Starts at the present. */
  const [year, setYear] = useState<number>(hsrTimeline.end);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktop = useMediaQuery("(min-width: 768px)");
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = countries.find((c) => c.id === selectedId) ?? null;
  const focus = geo.focuses.find((f) => f.id === selectedId) ?? null;
  const displayYear = Math.round(year);

  /* Fraction of each network built at the scrubber year. */
  const builtFraction = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of countries) {
      const g = c.infrastructure.growth;
      const total = g.length ? g[g.length - 1].km : 0;
      map.set(c.id, total > 0 ? hsrKmAtYear(g, year) / total : 0);
    }
    return map;
  }, [countries, year]);

  /* Trigger the stroke-draw after the pan begins. */
  useEffect(() => {
    setDrawn(false);
    setFlourish(false);
    if (!selectedId) return;
    if (reduced) {
      setDrawn(true);
      return;
    }
    setFlourish(true);
    const t = setTimeout(() => setDrawn(true), 350);
    const t2 = setTimeout(() => setFlourish(false), 2400);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [selectedId, reduced]);

  /* Escape deselects. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Zoom target sits left of the desktop panel / above the mobile sheet. */
  const targetX = desktop ? MAP_W * 0.32 : MAP_W * 0.5;
  const targetY = desktop ? MAP_H * 0.5 : MAP_H * 0.38;
  const transform = focus
    ? `translate(${targetX - focus.k * focus.cx}px, ${targetY - focus.k * focus.cy}px) scale(${focus.k})`
    : "translate(0px, 0px) scale(1)";

  const costData = useMemo(
    () =>
      countries.map((c) => ({
        name: c.name,
        id: c.id,
        cost: c.economics.costPerKm ?? 0,
      })),
    [countries],
  );

  return (
    <div className="border border-structure/20 bg-atmosphere">
      <div className="relative overflow-hidden">
      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        role="group"
        aria-label="World map of high-speed rail networks. Nine countries are selectable."
        className="block w-full"
      >
        {/* Ocean: blank — clicking it deselects. */}
        <rect
          width={MAP_W}
          height={MAP_H}
          fill="transparent"
          onClick={() => setSelectedId(null)}
        />
        <g
          style={{
            transform,
            transformOrigin: "0 0",
            transition: reduced ? "none" : "transform 800ms cubic-bezier(0.33, 0, 0.2, 1)",
          }}
        >
          {/* Background countries */}
          {geo.countries.map((c, i) => (
            <path
              key={i}
              d={c.d}
              fill="var(--structure)"
              fillOpacity="0.05"
              stroke="var(--structure)"
              strokeOpacity="0.2"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
              onClick={() => setSelectedId(null)}
            />
          ))}
          {/* The nine, clickable */}
          {geo.highlighted.map((c) => {
            const country = countries.find((x) => x.id === c.id)!;
            const isSelected = selectedId === c.id;
            return (
              <path
                key={c.id}
                d={c.d}
                role="button"
                tabIndex={0}
                aria-label={`${country.name} — view high-speed rail details`}
                aria-pressed={isSelected}
                fill="var(--structure)"
                fillOpacity={isSelected ? 0.22 : 0.13}
                stroke="var(--structure)"
                strokeOpacity="0.55"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
                className="hsr-country cursor-pointer focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(isSelected ? null : c.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedId(isSelected ? null : c.id);
                  }
                }}
              />
            );
          })}
          {/* Rail lines: resting = faint; selected country's draw in burgundy.
              No non-scaling-stroke here — Chromium computes dash patterns in
              screen space under it, which breaks the pathLength-normalized
              draw mask at high zoom. Width is compensated by the zoom factor
              instead. */}
          {(() => {
            const perCountryIndex = new Map<string, number>();
            const zoomK = focus?.k ?? 1;
            return geo.rails.map((rail, i) => {
              const idx = perCountryIndex.get(rail.countryId) ?? 0;
              perCountryIndex.set(rail.countryId, idx + 1);
              const isActive = selectedId === rail.countryId;
              const resting = selectedId === null;
              /* How much of this route exists at the scrubber year.
                 Dashed routes are proposals — never "built", drawn in
                 full as annotation. */
              const pct = builtFraction.get(rail.countryId) ?? 1;
              const targetOffset = 100 - pct * 100;
              /* Select-flourish: the active country's rails re-draw from
                 zero to the year's extent, staggered. Outside the
                 flourish the offset follows the scrubber directly. */
              const offset =
                isActive && !rail.dashed && !drawn && !reduced
                  ? 100
                  : targetOffset;
              const animateDraw = isActive && flourish && !reduced;
              return (
                <path
                  key={i}
                  d={rail.d}
                  pathLength={rail.dashed ? undefined : 100}
                  fill="none"
                  stroke="var(--interaction)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={rail.dashed ? "3 3" : "100 100"}
                  strokeDashoffset={rail.dashed ? 0 : offset}
                  opacity={isActive ? 0.95 : resting ? 0.55 : 0.12}
                  style={{
                    pointerEvents: "none",
                    strokeWidth: (isActive ? 1.6 : 1) / zoomK,
                    transition: reduced
                      ? "opacity 0s"
                      : `${animateDraw ? `stroke-dashoffset 1000ms ease-out ${idx * 140}ms, ` : ""}opacity 300ms ease, stroke-width 800ms cubic-bezier(0.33, 0, 0.2, 1)`,
                  }}
                />
              );
            });
          })()}
        </g>
      </svg>

      {/* Detail panel: right slide-over (md+), bottom sheet (mobile) */}
      <div
        ref={panelRef}
        aria-hidden={!selected}
        className={`fixed inset-x-0 bottom-0 z-30 max-h-[70vh] overflow-y-auto overscroll-contain border-t border-structure/20 bg-atmosphere shadow-xl shadow-structure/15 transition-transform duration-500 ease-out motion-reduce:transition-none md:absolute md:inset-x-auto md:inset-y-0 md:right-0 md:z-auto md:max-h-none md:w-[24rem] md:border-l md:border-t-0 ${
          selected
            ? "translate-y-0 md:translate-x-0"
            : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        {selected && (
          <div className="space-y-8 p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-information/70">
                  {selected.name}
                </p>
                <p className="mt-3 font-serif text-2xl italic leading-snug text-interaction">
                  {selected.pullQuote}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelectedId(null)}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
              >
                Close
              </button>
            </div>

            <PanelSection label="Infrastructure">
              <ul className="space-y-2.5">
                {(() => {
                  /* The total-km line is time-indexed: it tracks the
                     scrubber. The other stats describe the network as
                     it stands today. */
                  const growth = selected.infrastructure.growth;
                  const lastYear = growth.length
                    ? growth[growth.length - 1].year
                    : hsrTimeline.end;
                  const liveKm = Math.round(hsrKmAtYear(growth, year));
                  return selected.infrastructure.stats.map((s, i) => (
                    <Stat
                      key={s}
                      text={
                        i === 0 && year < lastYear
                          ? s.replace(
                              /^[\d,]+\+?/,
                              liveKm.toLocaleString("en-US"),
                            )
                          : s
                      }
                    />
                  ));
                })()}
              </ul>
              <div className="mt-5">
                <HsrGrowthChart
                  data={selected.infrastructure.growth}
                  note={selected.infrastructure.growthNote}
                  marker={
                    selected.infrastructure.growth.length > 0 &&
                    year >= selected.infrastructure.growth[0].year
                      ? {
                          year: Math.min(
                            year,
                            selected.infrastructure.growth[
                              selected.infrastructure.growth.length - 1
                            ].year,
                          ),
                          km: hsrKmAtYear(selected.infrastructure.growth, year),
                        }
                      : null
                  }
                />
              </div>
            </PanelSection>

            <PanelSection label="Economics">
              <ul className="space-y-2.5">
                {selected.economics.stats.map((s) => (
                  <Stat key={s} text={s} />
                ))}
              </ul>
              <div className="mt-5">
                <HsrCostChart data={costData} selectedId={selected.id} />
              </div>
            </PanelSection>

            <PanelSection label="Operations">
              <ul className="space-y-2.5">
                {selected.operations.map((s) => (
                  <Stat key={s} text={s} />
                ))}
              </ul>
            </PanelSection>

            <PanelSection label="Culture">
              <p className="font-serif text-sm italic leading-[1.8] text-information/85">
                {selected.culture}
              </p>
            </PanelSection>
          </div>
        )}
      </div>
      </div>

      {/* Timeline scrubber (Phase 2a): manual drag, 1964–2024. Drives
          the build-out above in both the global and zoomed views. */}
      <div className="border-t border-structure/20 px-5 pb-5 pt-4 md:px-7">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            Timeline
          </p>
          <p className="font-serif text-xl italic leading-none tabular-nums text-interaction">
            {displayYear}
          </p>
        </div>
        <input
          type="range"
          min={hsrTimeline.start}
          max={hsrTimeline.end}
          step={0.1}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          onKeyDown={(e) => {
            /* Keyboard moves in whole years (drag stays continuous). */
            const jump: Record<string, number> = {
              ArrowLeft: -1,
              ArrowDown: -1,
              ArrowRight: 1,
              ArrowUp: 1,
              PageDown: -10,
              PageUp: 10,
            };
            if (e.key in jump) {
              e.preventDefault();
              setYear((y) =>
                Math.min(
                  hsrTimeline.end,
                  Math.max(hsrTimeline.start, Math.round(y) + jump[e.key]),
                ),
              );
            } else if (e.key === "Home") {
              e.preventDefault();
              setYear(hsrTimeline.start);
            } else if (e.key === "End") {
              e.preventDefault();
              setYear(hsrTimeline.end);
            }
          }}
          aria-label="Timeline — drag to watch the networks grow"
          aria-valuetext={String(displayYear)}
          className="hsr-scrubber mt-4 block w-full"
        />
        <div className="mt-2 flex justify-between font-sans text-[0.6rem] tracking-[0.15em] text-information/50">
          <span>{hsrTimeline.start}</span>
          <span>{hsrTimeline.end}</span>
        </div>
      </div>
    </div>
  );
}
