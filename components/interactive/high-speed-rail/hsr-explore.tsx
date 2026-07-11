"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { HsrCountry } from "@/lib/content/interactives/high-speed-rail";
import type { HsrGeo } from "./geo";
import { HsrGrowthChart, HsrCostChart } from "./hsr-charts";

/*
 * High-Speed Rail — Explore (Phase 1).
 * A projected world map; nine clickable countries. Selecting one zooms
 * the camera (CSS transform), draws its rail lines stroke-by-stroke,
 * and slides in a detail panel (right on desktop, bottom sheet on
 * mobile). Reduced motion: no pan, no drawing — end states directly.
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
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const desktop = useMediaQuery("(min-width: 768px)");
  const panelRef = useRef<HTMLDivElement>(null);

  const selected = countries.find((c) => c.id === selectedId) ?? null;
  const focus = geo.focuses.find((f) => f.id === selectedId) ?? null;

  /* Trigger the stroke-draw after the pan begins. */
  useEffect(() => {
    setDrawn(false);
    if (!selectedId) return;
    if (reduced) {
      setDrawn(true);
      return;
    }
    const t = setTimeout(() => setDrawn(true), 350);
    return () => clearTimeout(t);
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
    <div className="relative overflow-hidden border border-structure/20 bg-atmosphere">
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
          {/* Rail lines: resting = faint; selected country's draw in burgundy. */}
          {(() => {
            const perCountryIndex = new Map<string, number>();
            return geo.rails.map((rail, i) => {
              const idx = perCountryIndex.get(rail.countryId) ?? 0;
              perCountryIndex.set(rail.countryId, idx + 1);
              const isActive = selectedId === rail.countryId;
              const resting = selectedId === null;
              return (
                <path
                  key={i}
                  d={rail.d}
                  pathLength={100}
                  fill="none"
                  stroke="var(--interaction)"
                  strokeWidth={isActive ? 1.6 : 1}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={
                    rail.dashed ? "3 3" : isActive ? "100 100" : undefined
                  }
                  strokeDashoffset={
                    isActive && !rail.dashed ? (drawn ? 0 : 100) : 0
                  }
                  opacity={isActive ? 0.95 : resting ? 0.4 : 0.12}
                  style={{
                    pointerEvents: "none",
                    transition: reduced
                      ? "opacity 0s"
                      : `stroke-dashoffset 1000ms ease-out ${idx * 140}ms, opacity 300ms ease`,
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
        className={`absolute inset-x-0 bottom-0 max-h-[75%] overflow-y-auto overscroll-contain border-t border-structure/20 bg-atmosphere shadow-xl shadow-structure/15 transition-transform duration-500 ease-out motion-reduce:transition-none md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-[24rem] md:border-l md:border-t-0 ${
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
                {selected.infrastructure.stats.map((s) => (
                  <Stat key={s} text={s} />
                ))}
              </ul>
              <div className="mt-5">
                <HsrGrowthChart
                  data={selected.infrastructure.growth}
                  note={selected.infrastructure.growthNote}
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
  );
}
