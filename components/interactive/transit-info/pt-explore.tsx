"use client";

import { useState } from "react";
import {
  ptCaptions,
  ptCities,
  ptDimensions,
  ptModes,
  ptScopeNote,
  type PtCityId,
  type PtDimensionId,
  type PtMode,
} from "@/lib/content/interactives/transit-info";
import { PtIllustration } from "./pt-illustration";

/*
 * Explore: city × information-system selector with the two-state
 * Tourist/Local reading toggle (the MTR pattern, simplified). The
 * captions rendered here are Phase 1 placeholders — see the [DRAFT]
 * tags in the data file.
 */
export function PtExplore() {
  const [city, setCity] = useState<PtCityId>("tokyo");
  const [dim, setDim] = useState<PtDimensionId>("maps");
  const [mode, setMode] = useState<PtMode>("tourist");

  const cityName = ptCities.find((c) => c.id === city)!.name;
  const dimName = ptDimensions.find((d) => d.id === dim)!.name;
  const modeSpec = ptModes.find((m) => m.id === mode)!;

  const chip = (active: boolean) =>
    `border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
      active
        ? "border-interaction bg-interaction text-atmosphere"
        : "border-structure/35 text-information/80 hover:border-interaction hover:text-interaction"
    }`;

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* Selectors */}
      <div className="space-y-3 border-b border-structure/20 px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-3 w-24 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            City
          </span>
          {ptCities.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCity(c.id)}
              aria-pressed={city === c.id}
              className={chip(city === c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-3 w-24 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            System
          </span>
          {ptDimensions.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDim(d.id)}
              aria-pressed={dim === d.id}
              className={chip(dim === d.id)}
            >
              {d.name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-3 w-24 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            Reading
          </span>
          {ptModes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={chip(mode === m.id)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <p
          aria-live="polite"
          className="max-w-3xl pt-1 font-serif text-sm italic leading-relaxed text-information/70"
        >
          {modeSpec.note}
        </p>
      </div>

      {/* Illustration */}
      <div className="px-5 pt-6 md:px-7">
        <PtIllustration city={city} dim={dim} mode={mode} />
      </div>

      {/* Caption */}
      <div className="min-h-[5rem] border-t border-structure/20 px-5 py-5 md:px-7">
        <p className="flex flex-wrap items-baseline gap-x-4 font-serif text-xl leading-snug text-information">
          {cityName}
          <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-interaction">
            {dimName} · {modeSpec.name} reading
          </span>
        </p>
        <p className="mt-2 max-w-3xl font-serif text-sm leading-[1.8] text-information/90">
          {ptCaptions[city][dim]}
        </p>
      </div>

      {/* Scope note vs MTR */}
      <div className="border-t border-structure/15 px-5 py-4 md:px-7">
        <p className="max-w-3xl font-serif text-xs italic leading-relaxed text-information/55">
          {ptScopeNote}
        </p>
      </div>
    </div>
  );
}
