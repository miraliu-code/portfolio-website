"use client";

import { useEffect, useState } from "react";
import {
  mtrQuestion,
  mtrOrientation,
} from "@/lib/content/interactives/mtr-wayfinding";
import { MtrSign } from "./mtr-sign";

/*
 * Entry moment (the established pattern): the guiding question fades
 * in over the Blue Ink panel, where the directional sign rests in its
 * ghost rendering. Reduced motion: no fade.
 */
export function MtrHero() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-45 md:w-[88%]">
        <MtrSign ghost />
      </div>

      <div
        className={`relative flex min-h-[24rem] flex-col items-center justify-center px-8 py-20 text-center transition-opacity duration-1000 motion-reduce:transition-none md:min-h-[28rem] ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-atmosphere/60">
          An Atlas Interactive
        </p>
        <h3 className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-atmosphere md:text-3xl">
          {mtrQuestion}
        </h3>
        <p className="mt-8 max-w-xl font-sans text-xs uppercase tracking-[0.25em] leading-relaxed text-atmosphere/70">
          {mtrOrientation}
        </p>
      </div>
    </div>
  );
}
