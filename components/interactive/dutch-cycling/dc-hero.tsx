"use client";

import { useEffect, useState } from "react";
import {
  dcQuestion,
  dcOrientation,
} from "@/lib/content/interactives/dutch-cycling";
import { DcSection } from "./dc-section";

/*
 * Entry moment (the established pattern): the guiding question fades
 * in over the Blue Ink panel, where the first street type — the
 * through-road — rests in its ghost rendering. Reduced motion: no
 * fade.
 */
export function DcHero() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[150%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-50 md:w-[96%]">
        <DcSection street="through-road" ghost />
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
          {dcQuestion}
        </h3>
        <p className="mt-8 max-w-xl font-sans text-xs uppercase tracking-[0.25em] leading-relaxed text-atmosphere/70">
          {dcOrientation}
        </p>
      </div>
    </div>
  );
}
