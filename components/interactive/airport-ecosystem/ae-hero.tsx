"use client";

import { useEffect, useState } from "react";
import {
  aeQuestion,
  aeOrientation,
} from "@/lib/content/interactives/airport-ecosystem";
import { AeTerminalGhost } from "./ae-plan";

/*
 * Entry moment (the established HSR/Professional Norms pattern): the
 * guiding question fades in over the Blue Ink panel, where the floor
 * plan sits faintly at rest. Reduced motion: no fade.
 */
export function AeHero() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="panel-scope relative overflow-hidden bg-panel">
      <AeTerminalGhost />

      <div
        className={`relative flex min-h-[24rem] flex-col items-center justify-center px-8 py-20 text-center transition-opacity duration-1000 motion-reduce:transition-none md:min-h-[28rem] ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-atmosphere/60">
          An Atlas Interactive
        </p>
        <h3 className="mt-6 max-w-2xl font-serif text-2xl italic leading-snug text-atmosphere md:text-3xl">
          {aeQuestion}
        </h3>
        <p className="mt-8 font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
          {aeOrientation}
        </p>
      </div>
    </div>
  );
}
