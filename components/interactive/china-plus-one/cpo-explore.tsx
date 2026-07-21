"use client";

import { useEffect, useMemo, useState } from "react";
import {
  cpoCaptions,
  cpoCountries,
  cpoMexicoCallout,
  cpoRadius,
  cpoSectors,
  cpoShareAt,
  cpoTimeline,
  cpoTransshipment,
  getCpoCountry,
  type CpoCountry,
  type CpoSector,
  CPO_MAP_W,
  CPO_MAP_H,
} from "@/lib/content/interactives/china-plus-one";
import { Tagged } from "@/components/interactive/professional-norms/pn-panel";
import type { CpoGeo } from "./geo";

/*
 * Following the Factory — Explore (Phases 1+2).
 * A Pacific-centered map with seven country nodes sized by share of
 * US imports. The sector toggle is the piece's central interaction:
 * flipping Electronics → Apparel re-sizes every node smoothly and
 * should visibly contradict the nearshoring assumption (apparel
 * diversified WITHIN Asia; Mexico shrinks). The timeline scrubber
 * drives a simplified 2010 → 2025 interpolation (2025 anchors sourced
 * or flagged "est.", 2010 baseline stylized, mid-years illustrative —
 * all labeled on the page). Phase 2 adds the four-field
 * country panels — with the labor field pulled out of the template
 * where a routine label would neutralize it — plus Vietnam's
 * transshipment-resolution control and Mexico's brownfield callout.
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

/* One field of the four-field panel. */
function DetailField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
        {label}
      </p>
      <Tagged
        text={text}
        className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
      />
    </div>
  );
}

/* Special interaction 1 — the transshipment-resolution control.
   A small echo of Professional Norms' lens re-clustering: the answer
   depends on your resolution, demonstrated rather than stated. */
function TransshipmentControl() {
  const [levelIdx, setLevelIdx] = useState(0); // start coarse: the headline number
  const level = cpoTransshipment.levels[levelIdx];
  return (
    <div className="mt-7 max-w-4xl border border-structure/25 bg-structure/5 p-5">
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
        How much of the surge is rerouted Chinese goods?
      </p>
      <p className="mt-1.5 font-serif text-sm italic leading-relaxed text-information/70">
        It depends on the measurement resolution. Move through the three.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {cpoTransshipment.levels.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLevelIdx(i)}
            aria-pressed={levelIdx === i}
            className={`border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
              levelIdx === i
                ? "border-interaction bg-interaction text-atmosphere"
                : "border-structure/35 text-information/80 hover:border-interaction hover:text-interaction"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-5">
        <p className="font-serif text-4xl italic leading-none tabular-nums text-interaction">
          {level.estimate}%
        </p>
        <div className="mt-3 h-1.5 w-full max-w-md bg-structure/15">
          <div
            className="h-full bg-interaction/70 transition-[width] duration-500 ease-out motion-reduce:transition-none"
            style={{ width: `${(level.estimate / 20) * 100}%` }}
          />
        </div>
        <p className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.15em] text-information/60">
          {level.measure}
        </p>
      </div>
      <p className="mt-4 max-w-2xl font-serif text-sm leading-[1.8] text-information/85">
        {cpoTransshipment.explanation}
      </p>
      <p className="mt-3 max-w-2xl font-serif text-sm italic leading-relaxed text-information/70">
        {cpoTransshipment.quote}
      </p>
    </div>
  );
}

/* Special interaction 2 — Mexico's brownfield/greenfield callout:
   three true numbers that appear to conflict, reconciled. */
function MexicoCallout() {
  return (
    <div className="mt-7 max-w-4xl border border-structure/25 bg-structure/5 p-5">
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
        {cpoMexicoCallout.title}
      </p>
      <div className="mt-4 grid gap-5 md:grid-cols-3">
        {cpoMexicoCallout.stats.map((stat) => (
          <div key={stat.label} className="border-l border-structure/25 pl-4">
            <p className="font-serif text-2xl italic leading-none tabular-nums text-interaction">
              {stat.value}
            </p>
            <p className="mt-1.5 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-information/70">
              {stat.label}
            </p>
            <p className="mt-1 font-serif text-xs italic leading-relaxed text-information/60">
              {stat.note}
            </p>
          </div>
        ))}
      </div>
      <Tagged
        text={cpoMexicoCallout.finding}
        className="mt-5 max-w-2xl font-serif text-sm leading-[1.8] text-information/90"
      />
      <Tagged
        text={cpoMexicoCallout.dissent}
        className="mt-3 max-w-2xl font-serif text-sm italic leading-[1.8] text-information/75"
      />
    </div>
  );
}

/* The full four-field panel; the labor field renders inside the grid
   only when it can honestly live under the routine label — otherwise
   it is pulled out into its own full-width, distinctly-treated block. */
function CountryPanel({ country }: { country: CpoCountry }) {
  const d = country.detail;
  const labels = {
    whatMoved: d.fieldLabels?.whatMoved ?? "What moved here, and why",
    whatItCost: d.fieldLabels?.whatItCost ?? "What it cost to build",
    ceiling: d.fieldLabels?.ceiling ?? "The ceiling",
  };
  return (
    <div>
      <div className="mt-6 grid max-w-4xl gap-x-10 gap-y-6 md:grid-cols-2">
        <DetailField label={labels.whatMoved} text={d.whatMoved} />
        <DetailField label={labels.whatItCost} text={d.whatItCost} />
        {!d.laborRestructured && (
          <DetailField label="The labor reality" text={d.laborReality} />
        )}
        <DetailField label={labels.ceiling} text={d.ceiling} />
      </div>
      {d.laborRestructured && (
        <div className="mt-7 max-w-4xl border-l-2 border-interaction/70 bg-structure/5 p-5">
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
            The labor reality
          </p>
          <p className="mt-1 font-sans text-[0.55rem] uppercase tracking-[0.15em] text-information/50">
            Pulled out of the template deliberately: a routine field label
            would neutralize this
          </p>
          <Tagged
            text={d.laborReality}
            className="mt-3 font-serif text-sm leading-[1.8] text-information/90"
          />
        </div>
      )}
      {country.id === "vietnam" && <TransshipmentControl />}
      {country.id === "mexico" && <MexicoCallout />}
    </div>
  );
}

export function CpoExplore({ geo }: { geo: CpoGeo }) {
  const [sector, setSector] = useState<CpoSector>("electronics");
  const [year, setYear] = useState<number>(cpoTimeline.end);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /* True after a toggle (animate the resize), false while scrubbing
     (track the thumb directly). */
  const [smooth, setSmooth] = useState(true);

  const displayYear = Math.round(year);
  /* Only the 2025 endpoint is a data anchor; 2010 is a stylized
     baseline, so it keeps the ≈ the mid-years get. */
  const atAnchor = year === cpoTimeline.end;
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

  const shareLabel = (share: number, estimated?: boolean) =>
    `${atAnchor && !estimated ? "" : "≈"}${Number.isInteger(share) ? share.toFixed(0) : share.toFixed(1)}%`;

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
                {shareLabel(share, country.estimated2025?.[sector])}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Honesty captions — persistent, quiet. */}
      <div className="space-y-1.5 border-t border-structure/15 px-5 py-4 md:px-7">
        <p className="max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {cpoCaptions.sizing}
        </p>
        <p className="max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {cpoCaptions.baseline}
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

      {/* Detail panel — the four-field structure, plus the special
          blocks (Vietnam's resolution control, Mexico's callout). */}
      <div className="min-h-[5.5rem] border-t border-structure/20 px-5 py-5 md:px-7">
        {selected ? (
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <p className="flex flex-wrap items-baseline gap-x-4 font-serif text-xl leading-snug text-information">
                {selected.name}
                <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction">
                  {shareLabel(
                    cpoShareAt(selected, sector, year),
                    selected.estimated2025?.[sector],
                  )}
                  {selected.estimated2025?.[sector] ? " (est.)" : ""} of US{" "}
                  {sectorName.toLowerCase()} imports · {displayYear}
                </span>
              </p>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
              >
                Reset
              </button>
            </div>
            <p className="mt-1.5 max-w-2xl font-serif text-sm italic leading-relaxed text-information/75">
              {selected.summary}
            </p>
            <CountryPanel country={selected} />
          </div>
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
          aria-label="Timeline: drag to watch the shift unfold"
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
