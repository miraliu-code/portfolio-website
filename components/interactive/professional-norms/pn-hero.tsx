"use client";

import { useEffect, useState } from "react";
import {
  pnQuestion,
  pnOrientation,
} from "@/lib/content/interactives/professional-norms";
import type { PnHeroGlobe } from "./geo";

/*
 * Entry moment (the HSR pattern): the guiding question fades in over a
 * dark ground where a still of the globe sits faintly. Reduced motion:
 * no fade, content immediately shown.
 */
export function PnHero({ globe }: { globe: PnHeroGlobe }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <svg
        viewBox={`0 0 ${globe.size} ${globe.size}`}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-auto -translate-x-1/2 -translate-y-1/2 opacity-50"
      >
        <path
          d={globe.sphere}
          fill="none"
          stroke="var(--atmosphere)"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <path
          d={globe.graticule}
          fill="none"
          stroke="var(--atmosphere)"
          strokeOpacity="0.07"
          strokeWidth="0.4"
        />
        <path
          d={globe.land}
          fill="var(--atmosphere)"
          fillOpacity="0.04"
          stroke="var(--atmosphere)"
          strokeOpacity="0.14"
          strokeWidth="0.4"
        />
        {globe.highlighted.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="#c98d9b"
            fillOpacity="0.16"
            stroke="#c98d9b"
            strokeOpacity="0.45"
            strokeWidth="0.6"
          />
        ))}
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
          {pnQuestion}
        </h3>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
          {pnOrientation}
        </p>
      </div>
    </div>
  );
}
