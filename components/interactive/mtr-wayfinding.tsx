"use client";

import { useState } from "react";

/*
 * Hong Kong MTR Wayfinding — proof-of-concept interactive.
 * A schematic interchange station. Toggle information layers
 * (Accessibility / Tourist / Rush Hour) to see what each audience is
 * shown; click a numbered sign to learn why it exists. Calm by design:
 * no motion beyond color, everything keyboard-reachable.
 */

type Layer = "accessibility" | "tourist" | "rush";

const LAYERS: { id: Layer; label: string; note: string }[] = [
  {
    id: "accessibility",
    label: "Accessibility",
    note: "Step-free routes surface: lifts, wide gates, tactile paths.",
  },
  {
    id: "tourist",
    label: "Tourist",
    note: "Exit lettering, landmark names, and airport connections come forward.",
  },
  {
    id: "rush",
    label: "Rush Hour",
    note: "Directional flow takes over: split staircases, one-way passages.",
  },
];

interface Sign {
  id: number;
  x: number; // viewBox coords
  y: number;
  title: string;
  why: string;
  layers: Layer[]; // highlighted when any of these layers is on
}

const SIGNS: Sign[] = [
  {
    id: 1,
    x: 14,
    y: 24,
    title: "Line color band",
    why: "The line's color runs continuously from the network map to the platform edge, so identity is confirmed by glance, not by reading. Under time pressure passengers pattern-match; color is the pattern.",
    layers: ["rush", "tourist"],
  },
  {
    id: 2,
    x: 50,
    y: 14,
    title: "Exit letter totem",
    why: "Exits are named destinations (A1, B2) and advertised before the fare gates. Leaving — the hardest wayfinding problem — is solved while you are still on the train.",
    layers: ["tourist"],
  },
  {
    id: 3,
    x: 84,
    y: 24,
    title: "Cross-platform arrow",
    why: "Interchange arrows appear exactly at the decision point, not earlier. Information shown before it can be acted on is noise; the MTR withholds it until the moment of use.",
    layers: ["rush"],
  },
  {
    id: 4,
    x: 26,
    y: 66,
    title: "Lift pictogram route",
    why: "The step-free route is signed as a first-class path with its own continuous pictogram trail — not an afterthought appended to the stair signs.",
    layers: ["accessibility"],
  },
  {
    id: 5,
    x: 62,
    y: 66,
    title: "Split staircase markings",
    why: "Floor arrows assign each staircase side a direction during peak flow. The crowd becomes laminar instead of turbulent — behavior change with paint.",
    layers: ["rush", "accessibility"],
  },
  {
    id: 6,
    x: 78,
    y: 52,
    title: "Bilingual type pairing",
    why: "Chinese and English are set as one typographic unit with fixed hierarchy, so neither reads as a translation of the other. Both audiences are first-class readers.",
    layers: ["tourist", "accessibility"],
  },
];

export function MtrWayfinding() {
  const [layers, setLayers] = useState<Set<Layer>>(new Set());
  const [selected, setSelected] = useState<Sign | null>(null);

  function toggle(layer: Layer) {
    setLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return next;
    });
  }

  const isHot = (sign: Sign) =>
    layers.size > 0 && sign.layers.some((l) => layers.has(l));

  return (
    <div>
      {/* Layer toggles */}
      <div className="flex flex-wrap gap-3">
        {LAYERS.map((layer) => {
          const on = layers.has(layer.id);
          return (
            <button
              key={layer.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(layer.id)}
              className={`border px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] transition-colors motion-reduce:transition-none ${
                on
                  ? "border-interaction bg-interaction text-atmosphere"
                  : "border-structure/40 text-information hover:border-interaction hover:text-interaction"
              }`}
            >
              {layer.label}
            </button>
          );
        })}
      </div>
      <p className="mt-3 min-h-5 font-serif text-sm italic text-information/70">
        {layers.size === 0
          ? "All layers off — the station as an unmarked space. Toggle a layer, or click a numbered sign."
          : [...layers].map((l) => LAYERS.find((x) => x.id === l)!.note).join(" ")}
      </p>

      {/* The station schematic */}
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <svg
          viewBox="0 0 100 80"
          role="group"
          aria-label="Schematic MTR interchange station"
          className="w-full border border-structure/20 bg-structure/5"
        >
          {/* Platforms */}
          <rect x="6" y="28" width="88" height="8" fill="var(--structure)" fillOpacity="0.15" />
          <rect x="6" y="56" width="88" height="8" fill="var(--structure)" fillOpacity="0.15" />
          {/* Line bands: two lines crossing the station */}
          <rect x="6" y="30.5" width="88" height="3" fill="#B65C6E" fillOpacity={layers.size === 0 || layers.has("rush") || layers.has("tourist") ? 0.85 : 0.25} />
          <rect x="6" y="58.5" width="88" height="3" fill="var(--structure)" fillOpacity={layers.size === 0 || layers.has("rush") || layers.has("tourist") ? 0.7 : 0.25} />
          {/* Concourse */}
          <rect x="34" y="40" width="32" height="12" fill="var(--structure)" fillOpacity="0.1" />
          {/* Stairs between levels */}
          <path d="M40 40 l0 -4 l4 0 l0 -2 l4 0" stroke="var(--structure)" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
          <path d="M60 52 l0 4 l-4 0 l0 2 l-4 0" stroke="var(--structure)" strokeOpacity="0.5" strokeWidth="0.8" fill="none" />
          {/* Accessibility lift path */}
          <path
            d="M22 62 L22 44 L34 44"
            stroke="var(--interaction)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="2 1.5"
            opacity={layers.has("accessibility") ? 0.9 : 0.12}
          />
          {/* Rush-hour flow arrows */}
          <g opacity={layers.has("rush") ? 0.9 : 0.1} stroke="var(--interaction)" strokeWidth="0.8" fill="none">
            <path d="M44 46 l6 0 m-2 -1.5 l2 1.5 l-2 1.5" />
            <path d="M56 48 l-6 0 m2 -1.5 l-2 1.5 l2 1.5" />
          </g>
          {/* Tourist exit letters */}
          <g opacity={layers.has("tourist") ? 1 : 0.15}>
            <rect x="46" y="8" width="8" height="8" fill="var(--interaction)" />
            <text x="50" y="13.6" textAnchor="middle" fontSize="4.5" fill="var(--atmosphere)" fontFamily="var(--font-sans)">
              A2
            </text>
          </g>

          {/* Numbered sign hotspots */}
          {SIGNS.map((sign) => {
            const hot = isHot(sign) || selected?.id === sign.id;
            return (
              <g
                key={sign.id}
                role="button"
                tabIndex={0}
                aria-label={`Sign ${sign.id}: ${sign.title}`}
                onClick={() => setSelected(sign)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(sign);
                  }
                }}
                className="cursor-pointer focus:outline-none"
              >
                <circle
                  cx={sign.x}
                  cy={sign.y}
                  r="3.4"
                  fill={hot ? "var(--interaction)" : "var(--atmosphere)"}
                  stroke={hot ? "var(--interaction)" : "var(--structure)"}
                  strokeOpacity={hot ? 1 : 0.5}
                  strokeWidth="0.5"
                  className="transition-colors motion-reduce:transition-none"
                />
                <text
                  x={sign.x}
                  y={sign.y + 1.4}
                  textAnchor="middle"
                  fontSize="3.6"
                  fontFamily="var(--font-sans)"
                  fill={hot ? "var(--atmosphere)" : "var(--information)"}
                >
                  {sign.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Explanation panel */}
        <div className="border-l border-structure/20 pl-6">
          {selected ? (
            <>
              <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-interaction">
                Sign {selected.id}
              </p>
              <p className="mt-2 font-serif text-lg text-information">
                {selected.title}
              </p>
              <p className="mt-3 font-serif text-sm leading-[1.8] text-information/85">
                {selected.why}
              </p>
            </>
          ) : (
            <p className="font-serif text-sm italic leading-relaxed text-information/60">
              Click a numbered sign to learn why it exists — every element of
              the station is a decision.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
