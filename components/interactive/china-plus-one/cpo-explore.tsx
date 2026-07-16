"use client";

import { useEffect, useMemo, useState } from "react";
import {
  cpoCaptions,
  cpoCountries,
  cpoRadius,
  cpoSectors,
  cpoShareAt,
  cpoTimeline,
  getCpoCountry,
  type CpoSector,
  CPO_MAP_W,
  CPO_MAP_H,
} from "@/lib/content/interactives/china-plus-one";
import type { CpoGeo } from "./geo";

/*
 * Following the Factory — Explore (Phase 1).
 * A Pacific-centered map with seven country nodes sized by share of
 * US imports. The sector toggle is the piece's central interaction:
 * flipping Electronics → Apparel re-sizes every node smoothly and
 * should visibly contradict the nearshoring assumption (apparel
 * diversified WITHIN Asia; Mexico shrinks). The timeline scrubber
 * drives a simplified 2010 → 2025 interpolation (endpoints correct,
 * granularity arrives in Phase 2).
 *
 * Motion rules: the sector toggle animates node radii (700ms); while
 * scrubbing, radii track the thumb directly with no transition so the
 * drag feels instantaneous. Reduced motion: everything snaps.
 */

/* Stable draw order: biggest possible nodes first, so small nodes
   always sit on top and stay clickable. */
const DRAW_ORDER = [...cpoCountries].sort((a, b) => {
  const max = (c: typeof a) =>
    Math.max(
      c.shares.electronics.start,
      c.shares.electronics.end,
      c.shares.apparel.start,
      c.shares.apparel.end,
    );
  return max(b) - max(a);
});

export function CpoExplore({ geo }: { geo: CpoGeo }) {
  const [sector, setSector] = useState<CpoSector>("electronics");
  const [year, setYear] = useState<number>(cpoTimeline.end);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /* True after a toggle (animate the resize), false while scrubbing
     (track the thumb directly). */
  const [smooth, setSmooth] = useState(true);

  const displayYear = Math.round(year);
  const atEndpoint =
    year === cpoTimeline.start || year === cpoTimeline.end;
  const selected = selectedId ? getCpoCountry(selectedId) : null;
  const sectorName = cpoSectors.find((s) => s.id === sector)!.name;

  const nodeById = useMemo(
    () => new Map(geo.nodes.map((n) => [n.id, n])),
    [geo.nodes],
  );

  /* Escape deselects, matching the other systems. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const chooseSector = (id: CpoSector) => {
    setSmooth(true);
    setSector(id);
  };

  const shareLabel = (share: number) =>
    `${atEndpoint ? "" : "≈"}${Number.isInteger(share) ? share.toFixed(0) : share.toFixed(1)}%`;

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* Sector toggle — the interaction carrying the finding. */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-structure/20 px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            Sector
          </span>
          {cpoSectors.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => chooseSector(s.id)}
              aria-pressed={sector === s.id}
              className={`border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                sector === s.id
                  ? "border-interaction bg-interaction text-atmosphere"
                  : "border-structure/35 text-information/80 hover:border-interaction hover:text-interaction"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-information/55">
          {displayYear} · {sectorName} · share of US imports
        </p>
      </div>

      {/* The map */}
      <svg
        viewBox={`0 0 ${CPO_MAP_W} ${CPO_MAP_H}`}
        role="group"
        aria-label="Pacific-centered map of manufacturing shift. Seven countries are selectable, sized by share of US imports."
        className="block w-full select-none"
      >
        <rect
          width={CPO_MAP_W}
          height={CPO_MAP_H}
          fill="transparent"
          onClick={() => setSelectedId(null)}
        />
        {/* Background land */}
        {geo.countries.map((c, i) => (
          <path
            key={i}
            d={c.d}
            fill="var(--structure)"
            fillOpacity="0.05"
            stroke="var(--structure)"
            strokeOpacity="0.2"
            strokeWidth="0.4"
            onClick={() => setSelectedId(null)}
          />
        ))}
        {/* The seven, lightly distinguished */}
        {geo.highlighted.map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="var(--structure)"
            fillOpacity={selectedId === c.id ? 0.18 : 0.1}
            stroke="var(--structure)"
            strokeOpacity="0.45"
            strokeWidth="0.6"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId((prev) => (prev === c.id ? null : c.id));
            }}
          />
        ))}
        {/* The Pacific is the point: a quiet arc names the flow this
            map measures, and the destination market gets a label. */}
        <g aria-hidden="true" style={{ pointerEvents: "none" }}>
          <path
            d="M 268 158 Q 470 34 688 92"
            fill="none"
            stroke="var(--structure)"
            strokeOpacity="0.3"
            strokeWidth="1"
            strokeDasharray="7 6"
          />
          <path
            d="M 679 84 L 690 93 L 676 95"
            fill="none"
            stroke="var(--structure)"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text
            x={468}
            y={72}
            textAnchor="middle"
            fontSize="9.5"
            letterSpacing="1.6"
            fill="var(--structure)"
            fillOpacity="0.55"
            className="cpo-label-tiny"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            SHARE OF US IMPORTS
          </text>
          <text
            x={800}
            y={48}
            textAnchor="middle"
            fontSize="9.5"
            letterSpacing="1.6"
            fill="var(--structure)"
            fillOpacity="0.55"
            className="cpo-label-tiny"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            THE US MARKET
          </text>
        </g>
        {/* Leader lines for offset nodes */}
        {geo.nodes.map(
          (n) =>
            n.leader && (
              <line
                key={n.id}
                x1={n.x}
                y1={n.y}
                x2={n.leader.x}
                y2={n.leader.y}
                stroke="var(--structure)"
                strokeOpacity="0.45"
                strokeWidth="0.6"
                style={{ pointerEvents: "none" }}
              />
            ),
        )}
        {/* Nodes — the data marks. Radii animate on toggle, track on
            scrub. */}
        {DRAW_ORDER.map((country) => {
          const n = nodeById.get(country.id)!;
          const share = cpoShareAt(country, sector, year);
          const r = cpoRadius(share);
          const isSelected = selectedId === country.id;
          return (
            <circle
              key={country.id}
              cx={n.x}
              cy={n.y}
              r={r}
              role="button"
              tabIndex={0}
              aria-label={`${country.name} — select`}
              aria-pressed={isSelected}
              fill="var(--interaction)"
              fillOpacity={isSelected ? 0.3 : 0.14}
              stroke="var(--interaction)"
              strokeOpacity={isSelected ? 1 : 0.7}
              strokeWidth={isSelected ? 1.8 : 1}
              className={`cpo-node cursor-pointer focus:outline-none ${
                smooth ? "cpo-node-smooth" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId((prev) =>
                  prev === country.id ? null : country.id,
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedId((prev) =>
                    prev === country.id ? null : country.id,
                  );
                }
              }}
            />
          );
        })}
        {/* Labels: fixed positions so they never chase the circles. */}
        {cpoCountries.map((country) => {
          const n = nodeById.get(country.id)!;
          const share = cpoShareAt(country, sector, year);
          const [dx, dy] = country.labelOffset;
          return (
            <g key={country.id} aria-hidden="true" style={{ pointerEvents: "none" }}>
              <text
                x={n.x + dx}
                y={n.y + dy}
                textAnchor={country.labelAnchor}
                fontSize="10.5"
                letterSpacing="1.4"
                fill="var(--information)"
                fillOpacity="0.75"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {country.name.toUpperCase()}
              </text>
              <text
                x={n.x + dx}
                y={n.y + dy + 13}
                textAnchor={country.labelAnchor}
                fontSize="9.5"
                fill="var(--interaction)"
                fillOpacity="0.85"
                className="cpo-label-tiny"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {shareLabel(share)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Honesty captions — persistent, quiet. */}
      <div className="space-y-1.5 border-t border-structure/15 px-5 py-4 md:px-7">
        <p className="max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {cpoCaptions.sizing} {cpoCaptions.interpolation}
        </p>
        <p className="max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {cpoCaptions.scope}
        </p>
        <p
          aria-hidden={sector !== "apparel"}
          className={`max-w-3xl font-serif text-xs italic leading-relaxed text-interaction/80 transition-opacity duration-500 motion-reduce:transition-none ${
            sector === "apparel" ? "opacity-100" : "opacity-0"
          }`}
        >
          {cpoCaptions.cafta}
        </p>
      </div>

      {/* Selection caption (Phase 1: name + one line + current share). */}
      <div className="flex min-h-[5.5rem] items-baseline justify-between gap-6 border-t border-structure/20 px-5 py-4 md:px-7">
        {selected ? (
          <>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-4 font-serif text-xl leading-snug text-information">
                {selected.name}
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction">
                  {shareLabel(cpoShareAt(selected, sector, year))} of US{" "}
                  {sectorName.toLowerCase()} imports · {displayYear}
                </span>
              </p>
              <p className="mt-1.5 max-w-2xl font-serif text-sm italic leading-relaxed text-information/75">
                {selected.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
            >
              Reset
            </button>
          </>
        ) : (
          <p className="font-serif text-sm italic leading-relaxed text-information/60">
            Seven countries are selectable — sized by their share of what
            America imports. Flip the sector and watch where the factory
            actually went.
          </p>
        )}
      </div>

      {/* Timeline scrubber (the HSR pattern). */}
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
          min={cpoTimeline.start}
          max={cpoTimeline.end}
          step={0.1}
          value={year}
          onChange={(e) => {
            setSmooth(false);
            setYear(Number(e.target.value));
          }}
          onKeyDown={(e) => {
            const jump: Record<string, number> = {
              ArrowLeft: -1,
              ArrowDown: -1,
              ArrowRight: 1,
              ArrowUp: 1,
              PageDown: -5,
              PageUp: 5,
            };
            if (e.key in jump) {
              e.preventDefault();
              setSmooth(false);
              setYear((y) =>
                Math.min(
                  cpoTimeline.end,
                  Math.max(cpoTimeline.start, Math.round(y) + jump[e.key]),
                ),
              );
            } else if (e.key === "Home") {
              e.preventDefault();
              setSmooth(false);
              setYear(cpoTimeline.start);
            } else if (e.key === "End") {
              e.preventDefault();
              setSmooth(false);
              setYear(cpoTimeline.end);
            }
          }}
          aria-label="Timeline — drag to watch the shift unfold"
          aria-valuetext={String(displayYear)}
          className="hsr-scrubber mt-4 block w-full"
        />
        <div className="mt-2 flex justify-between font-sans text-[0.6rem] tracking-[0.15em] text-information/50">
          <span>{cpoTimeline.start}</span>
          <span>{cpoTimeline.end}</span>
        </div>
      </div>
    </div>
  );
}
