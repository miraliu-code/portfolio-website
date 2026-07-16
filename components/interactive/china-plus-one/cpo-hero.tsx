"use client";

import { useEffect, useState } from "react";
import {
  cpoCountries,
  cpoQuestion,
  cpoOrientation,
  cpoRadius,
  CPO_MAP_W,
  CPO_MAP_H,
} from "@/lib/content/interactives/china-plus-one";
import type { CpoGeo } from "./geo";

/*
 * Entry moment (the established pattern): the guiding question fades
 * in over the Blue Ink panel, where the Pacific-centered map rests at
 * its 2025 / Electronics state — the default the Explore section
 * opens on. Reduced motion: no fade.
 */
export function CpoHero({ geo }: { geo: CpoGeo }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const nodeById = new Map(geo.nodes.map((n) => [n.id, n]));

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <svg
        viewBox={`0 0 ${CPO_MAP_W} ${CPO_MAP_H}`}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-45 md:w-[102%]"
      >
        {geo.countries.map((c, i) => (
          <path
            key={i}
            d={c.d}
            fill="var(--atmosphere)"
            fillOpacity="0.04"
            stroke="var(--atmosphere)"
            strokeOpacity="0.14"
            strokeWidth="0.4"
          />
        ))}
        {geo.highlighted.map((c) => (
          <path
            key={c.id}
            d={c.d}
            fill="var(--atmosphere)"
            fillOpacity="0.08"
            stroke="var(--atmosphere)"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
        ))}
        {cpoCountries.map((c) => {
          const n = nodeById.get(c.id)!;
          return (
            <circle
              key={c.id}
              cx={n.x}
              cy={n.y}
              r={cpoRadius(c.shares.electronics.end)}
              fill="#c98d9b"
              fillOpacity="0.16"
              stroke="#c98d9b"
              strokeOpacity="0.5"
              strokeWidth="0.7"
            />
          );
        })}
      </svg>

      <div
        className={`relative flex min-h-[24rem] flex-col items-center justify-center px-8 py-20 text-center transition-opacity duration-1000 motion-reduce:transition-none md:min-h-[28rem] ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-atmosphere/60">
          An Atlas Interactive
        </p>
        <h3 className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-atmosphere md:text-3xl">
          {cpoQuestion}
        </h3>
        <p className="mt-8 max-w-xl font-sans text-xs uppercase tracking-[0.25em] leading-relaxed text-atmosphere/70">
          {cpoOrientation}
        </p>
      </div>
    </div>
  );
}
