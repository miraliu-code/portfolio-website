"use client";

import { useEffect, useState } from "react";
import { hsrQuestion } from "@/lib/content/interactives/high-speed-rail";
import type { HsrGeo } from "./geo";

/*
 * The entry moment: the guiding question fades in over a dark ground
 * where all nine rail networks glow faintly — an at-rest preview, not
 * yet interactive. Reduced motion: no fade, content immediately shown.
 */
export function HsrHero({ geo }: { geo: HsrGeo }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      {/* Faint world + glowing rail preview */}
      <svg
        viewBox="0 0 960 500"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="hsr-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>
        <g stroke="var(--atmosphere)" strokeOpacity="0.12" fill="none">
          {geo.countries.map((c, i) => (
            <path key={i} d={c.d} strokeWidth="0.4" />
          ))}
          {geo.highlighted.map((c) => (
            <path key={c.id} d={c.d} strokeWidth="0.6" strokeOpacity="0.2" />
          ))}
        </g>
        {/* Glow layer under crisp lines */}
        <g
          stroke="#c98d9b"
          strokeOpacity="0.35"
          strokeWidth="2.2"
          fill="none"
          filter="url(#hsr-glow)"
          strokeLinecap="round"
        >
          {geo.rails.map((r, i) => (
            <path key={i} d={r.d} />
          ))}
        </g>
        <g
          stroke="#c98d9b"
          strokeOpacity="0.5"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        >
          {geo.rails.map((r, i) => (
            <path key={i} d={r.d} strokeDasharray={r.dashed ? "3 3" : undefined} />
          ))}
        </g>
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
          {hsrQuestion}
        </h3>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
          Click a country to begin.
        </p>
      </div>
    </div>
  );
}
