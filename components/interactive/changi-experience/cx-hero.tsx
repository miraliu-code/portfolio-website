"use client";

import { useEffect, useState } from "react";
import {
  cxQuestion,
  cxOrientation,
} from "@/lib/content/interactives/changi-experience";
import { CxTerminalGhost } from "./cx-plan";

/*
 * Entry moment (the established HSR/PN/Airport Ecosystem pattern):
 * the guiding question fades in over the Blue Ink panel, where the
 * Changi plan — the Jewel torus especially — sits faintly at rest.
 * Reduced motion: no fade.
 */
export function CxHero() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <CxTerminalGhost />

      <div
        className={`relative flex min-h-[24rem] flex-col items-center justify-center px-8 py-20 text-center transition-opacity duration-1000 motion-reduce:transition-none md:min-h-[28rem] ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-atmosphere/60">
          An Atlas Interactive
        </p>
        <h3 className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-atmosphere md:text-3xl">
          {cxQuestion}
        </h3>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
          {cxOrientation}
        </p>
      </div>
    </div>
  );
}
