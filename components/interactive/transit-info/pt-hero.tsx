"use client";

import { useEffect, useState } from "react";
import {
  ptQuestion,
  ptOrientation,
} from "@/lib/content/interactives/transit-info";

/*
 * Entry moment (the established pattern): the guiding question fades
 * in over an abstract transit-map pattern at rest on the Blue Ink
 * panel. Reduced motion: no fade.
 */
export function PtHero() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <svg
        viewBox="0 0 960 400"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40 md:w-[105%]"
      >
        {[
          "M -20 320 L 200 320 L 340 200 L 620 200 L 780 90 L 990 90",
          "M -20 120 L 180 120 L 360 260 L 700 260 L 990 180",
          "M 120 420 L 300 240 L 560 240 L 720 140 L 990 140",
          "M -20 220 L 240 220 L 420 100 L 990 100",
          "M 60 -20 L 60 180 L 220 340 L 220 420",
          "M 840 -20 L 840 160 L 680 320 L 680 420",
        ].map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={i % 3 === 0 ? "#c98d9b" : "var(--atmosphere)"}
            strokeOpacity={i % 3 === 0 ? 0.4 : 0.25}
            strokeWidth={i % 3 === 0 ? 3 : 2}
          />
        ))}
        {[
          [200, 320], [340, 200], [620, 200], [180, 120], [360, 260],
          [700, 260], [300, 240], [560, 240], [240, 220], [420, 100],
          [60, 180], [840, 160], [720, 140], [780, 90],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={5}
            fill="var(--panel, #2f4156)"
            stroke="var(--atmosphere)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
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
          {ptQuestion}
        </h3>
        <p className="mt-8 max-w-xl font-sans text-xs uppercase tracking-[0.25em] leading-relaxed text-atmosphere/70">
          {ptOrientation}
        </p>
      </div>
    </div>
  );
}
