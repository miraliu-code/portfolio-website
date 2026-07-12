"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { geoOrthographic, geoPath, geoDistance, geoGraticule10 } from "d3-geo";
import { feature, merge } from "topojson-client";
import type {
  Topology,
  GeometryCollection,
  Polygon as TopoPolygon,
  MultiPolygon as TopoMultiPolygon,
} from "topojson-specification";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import {
  pnCountries,
  pnLenses,
  getPnLens,
} from "@/lib/content/interactives/professional-norms";
import { PnCountryPanel } from "./pn-panel";

/*
 * The globe (Phase 1). An orthographic projection that must re-project
 * on every frame of rotation, so — unlike the flat HSR map — the
 * projection runs client-side. Two mitigations keep it cheap: all
 * out-of-scope countries are merged into a single land path (one
 * element instead of ~160), and per-frame updates write path `d`
 * attributes imperatively instead of re-rendering React.
 *
 * Motion model: slow auto-rotation at rest; drag to rotate freely
 * (with momentum on release); selecting a country eases it to face
 * forward. Reduced motion: static at rest, no inertia, snap-to-face.
 */

const SIZE = 520;
const C = SIZE / 2;
const R = C - 10;
const AUTO_DEG_PER_MS = 0.0035; // ~3.5°/s resting spin
const RESUME_AFTER_MS = 4000; // idle time before auto-rotation resumes

type Mode = "auto" | "idle" | "drag" | "inertia" | "focus";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const normLambda = (l: number) => ((((l + 180) % 360) + 360) % 360) - 180;
const easeCubicOut = (t: number) => 1 - Math.pow(1 - t, 3);

/* Tier fill opacities, ordered high → low intensity per lens. The
   spread is deliberately wide: a large landmass over the tinted ocean
   reads darker than a small legend swatch, so adjacent tiers need
   clear separation to stay distinguishable on the map itself. */
const TIER_OPACITY = [0.55, 0.24, 0.08];

export function PnGlobe() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lensId, setLensId] = useState("geography");
  const lens = getPnLens(lensId);

  /* ---- static geometry (computed once) ---- */
  const { landGeom, highlightedFeatures, graticule } = useMemo(() => {
    const topology = worldData as unknown as Topology<{
      countries: GeometryCollection;
    }>;
    const inScope = new Set(pnCountries.map((c) => c.numericId));
    const world = feature(
      topology,
      topology.objects.countries,
    ) as FeatureCollection<Geometry>;
    const byNumeric = new Map(pnCountries.map((c) => [c.numericId, c]));
    const highlightedFeatures = world.features
      .filter((f) => inScope.has(String(f.id)))
      .map((f) => ({
        feature: f as Feature<Geometry>,
        country: byNumeric.get(String(f.id))!,
      }));
    const landGeom = merge(
      topology,
      topology.objects.countries.geometries.filter(
        (g) => !inScope.has(String(g.id)),
      ) as Array<TopoPolygon | TopoMultiPolygon>,
    );
    return { landGeom, highlightedFeatures, graticule: geoGraticule10() };
  }, []);

  const markers = useMemo(
    () => pnCountries.filter((c) => c.marker),
    [],
  );

  /* ---- kinetic state (refs — the rAF loop owns these) ---- */
  const rotRef = useRef<[number, number]>([30, -18]); // faces [-30, 18]
  const modeRef = useRef<Mode>("auto");
  const velRef = useRef<[number, number]>([0, 0]);
  const focusRef = useRef<{
    from: [number, number];
    to: [number, number];
    start: number;
    dur: number;
  } | null>(null);
  const lastPointerRef = useRef<[number, number] | null>(null);
  const movedRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const reducedRef = useRef(false);
  const selectedRef = useRef<string | null>(null);
  reducedRef.current = reduced;
  selectedRef.current = selectedId;

  const svgRef = useRef<SVGSVGElement>(null);
  const sphereRef = useRef<SVGPathElement>(null);
  const graticuleRef = useRef<SVGPathElement>(null);
  const landRef = useRef<SVGPathElement>(null);
  const countryRefs = useRef(new Map<string, SVGPathElement>());
  const markerRefs = useRef(new Map<string, SVGGElement>());

  const projectionRef = useRef(
    geoOrthographic().translate([C, C]).scale(R).rotate([30, -18, 0]),
  );

  /* Initial paths so SSR + first paint show the globe pre-hydration. */
  const initial = useMemo(() => {
    const projection = geoOrthographic()
      .translate([C, C])
      .scale(R)
      .rotate([rotRef.current[0], rotRef.current[1], 0]);
    const pg = geoPath(projection);
    return {
      sphere: pg({ type: "Sphere" }) ?? "",
      graticule: pg(graticule) ?? "",
      land: pg(landGeom) ?? "",
      countries: new Map(
        highlightedFeatures.map((h) => [h.country.id, pg(h.feature) ?? ""]),
      ),
      markers: new Map(
        markers.map((m) => {
          const visible =
            geoDistance(m.marker!, [
              -rotRef.current[0],
              -rotRef.current[1],
            ]) <
            Math.PI / 2 - 0.05;
          return [m.id, { xy: projection(m.marker!) ?? [C, C], visible }];
        }),
      ),
    };
  }, [graticule, landGeom, highlightedFeatures, markers]);

  const redraw = useCallback(() => {
    const [l, p] = rotRef.current;
    const projection = projectionRef.current.rotate([l, p, 0]);
    const pg = geoPath(projection);
    sphereRef.current?.setAttribute("d", pg({ type: "Sphere" }) ?? "");
    graticuleRef.current?.setAttribute("d", pg(graticule) ?? "");
    landRef.current?.setAttribute("d", pg(landGeom) ?? "");
    for (const h of highlightedFeatures) {
      countryRefs.current
        .get(h.country.id)
        ?.setAttribute("d", pg(h.feature) ?? "");
    }
    for (const m of markers) {
      const g = markerRefs.current.get(m.id);
      if (!g) continue;
      const visible =
        geoDistance(m.marker!, [-l, -p]) < Math.PI / 2 - 0.05;
      const xy = projection(m.marker!);
      /* Opacity, not display — the marker must stay keyboard-focusable
         while over the horizon, like the country paths. */
      g.style.opacity = visible && xy ? "1" : "0";
      g.style.pointerEvents = visible && xy ? "" : "none";
      if (visible && xy) g.setAttribute("transform", `translate(${xy[0]}, ${xy[1]})`);
    }
  }, [graticule, landGeom, highlightedFeatures, markers]);

  /* ---- the loop ---- */
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;
      const rot = rotRef.current;
      const mode = modeRef.current;
      let moved = false;

      if (mode === "auto") {
        rot[0] = normLambda(rot[0] + dt * AUTO_DEG_PER_MS);
        moved = true;
      } else if (mode === "inertia") {
        const v = velRef.current;
        rot[0] = normLambda(rot[0] + v[0] * dt);
        rot[1] = Math.max(-85, Math.min(85, rot[1] + v[1] * dt));
        const decay = Math.pow(0.94, dt / 16);
        v[0] *= decay;
        v[1] *= decay;
        moved = true;
        if (Math.abs(v[0]) < 0.002 && Math.abs(v[1]) < 0.002) {
          modeRef.current = "idle";
          lastInteractionRef.current = now;
        }
      } else if (mode === "focus" && focusRef.current) {
        const f = focusRef.current;
        const t = Math.min((now - f.start) / f.dur, 1);
        const e = easeCubicOut(t);
        rot[0] = f.from[0] + (f.to[0] - f.from[0]) * e;
        rot[1] = f.from[1] + (f.to[1] - f.from[1]) * e;
        moved = true;
        if (t >= 1) {
          modeRef.current = "idle";
          focusRef.current = null;
        }
      } else if (mode === "idle") {
        if (
          !selectedRef.current &&
          !reducedRef.current &&
          now - lastInteractionRef.current > RESUME_AFTER_MS
        ) {
          modeRef.current = "auto";
        }
      }

      if (moved) redraw();
      raf = requestAnimationFrame(tick);
    };
    /* Reduced motion: never start in auto (checked synchronously —
       the media-query state hook hasn't run yet on first paint). */
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      modeRef.current === "auto"
    ) {
      modeRef.current = "idle";
      lastInteractionRef.current = performance.now();
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [redraw]);

  /* Reduced-motion flips at runtime: leave auto immediately. */
  useEffect(() => {
    if (reduced && modeRef.current === "auto") {
      modeRef.current = "idle";
      lastInteractionRef.current = performance.now();
    }
  }, [reduced]);

  /* ---- selection ---- */
  const select = useCallback((id: string | null) => {
    setSelectedId(id);
    if (!id) {
      /* Back to free rotation. */
      lastInteractionRef.current = performance.now();
      modeRef.current = reducedRef.current ? "idle" : "auto";
      focusRef.current = null;
      return;
    }
    const country = pnCountries.find((c) => c.id === id);
    if (!country) return;
    const to: [number, number] = [-country.focus[0], -country.focus[1]];
    const from = rotRef.current;
    if (reducedRef.current) {
      rotRef.current = [to[0], to[1]];
      modeRef.current = "idle";
      redraw();
      return;
    }
    /* Rotate the short way around. */
    const fromNorm: [number, number] = [normLambda(from[0]), from[1]];
    const dl = normLambda(to[0] - fromNorm[0]);
    focusRef.current = {
      from: fromNorm,
      to: [fromNorm[0] + dl, to[1]],
      start: performance.now(),
      dur: 950,
    };
    modeRef.current = "focus";
  }, [redraw]);

  /* Escape deselects. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") select(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [select]);

  /* ---- drag ----
     Pointer capture is taken only once the gesture is unambiguously a
     drag (>4px). Capturing on pointerdown would retarget the browser's
     compatibility click event to the svg itself, which silently breaks
     real mouse/touch selection of countries and the ocean-deselect. */
  const capturedRef = useRef(false);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    modeRef.current = "drag";
    lastPointerRef.current = [e.clientX, e.clientY];
    movedRef.current = 0;
    velRef.current = [0, 0];
    capturedRef.current = false;
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (modeRef.current !== "drag" || !lastPointerRef.current) return;
    if (!capturedRef.current && movedRef.current > 4) {
      e.currentTarget.setPointerCapture(e.pointerId);
      capturedRef.current = true;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const degPerPx = 0.38 * (SIZE / rect.width);
    const dx = e.clientX - lastPointerRef.current[0];
    const dy = e.clientY - lastPointerRef.current[1];
    lastPointerRef.current = [e.clientX, e.clientY];
    movedRef.current += Math.abs(dx) + Math.abs(dy);
    const rot = rotRef.current;
    rot[0] = normLambda(rot[0] + dx * degPerPx);
    rot[1] = Math.max(-85, Math.min(85, rot[1] - dy * degPerPx));
    /* Blend velocity for release momentum (deg/ms). */
    const dl = dx * degPerPx;
    const dp = -dy * degPerPx;
    velRef.current = [
      velRef.current[0] * 0.6 + dl * 0.4 * 0.06,
      velRef.current[1] * 0.6 + dp * 0.4 * 0.06,
    ];
    redraw();
  };

  const onPointerUp = () => {
    if (modeRef.current !== "drag") return;
    capturedRef.current = false;
    lastPointerRef.current = null;
    lastInteractionRef.current = performance.now();
    const v = velRef.current;
    if (
      !reducedRef.current &&
      movedRef.current > 6 &&
      (Math.abs(v[0]) > 0.01 || Math.abs(v[1]) > 0.01)
    ) {
      modeRef.current = "inertia";
    } else {
      modeRef.current = "idle";
    }
  };

  const wasDrag = () => movedRef.current > 6;

  const selected = pnCountries.find((c) => c.id === selectedId) ?? null;

  /* Fill encodes the active lens tier; selection is a stroke ring so
     the tier reading survives selection. Geography keeps the Phase 1
     treatment. */
  const countryFill = (id: string) => {
    if (lens.tiers.length > 0) {
      const tierIdx = lens.tiers.findIndex((t) => t.countryIds.includes(id));
      return {
        fill: "var(--interaction)",
        fillOpacity: TIER_OPACITY[tierIdx] ?? 0.13,
      };
    }
    if (id === selectedId)
      return { fill: "var(--interaction)", fillOpacity: 0.32 };
    return { fill: "var(--structure)", fillOpacity: 0.13 };
  };

  const countryStroke = (id: string) =>
    id === selectedId
      ? {
          stroke: "var(--interaction)",
          strokeOpacity: 0.95,
          strokeWidth: 1.4,
        }
      : {
          stroke: "var(--structure)",
          strokeOpacity: 0.6,
          strokeWidth: 0.7,
        };

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* Lens picker: axis-based re-clustering. */}
      <div className="border-b border-structure/20 px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            Lens
          </span>
          {pnLenses.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLensId(l.id)}
              aria-pressed={lensId === l.id}
              className={`py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                lensId === l.id
                  ? "text-interaction underline underline-offset-4"
                  : "text-information/60 hover:text-interaction"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
        {lens.tiers.length > 0 && (
          <>
            <div className="mt-3.5 flex flex-wrap gap-x-6 gap-y-2">
              {lens.tiers.map((t, i) => (
                <span key={t.id} className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 border border-structure/30">
                    <span
                      className="block h-full w-full"
                      style={{
                        background: "var(--interaction)",
                        opacity: TIER_OPACITY[i],
                      }}
                    />
                  </span>
                  <span className="font-sans text-[0.65rem] uppercase tracking-[0.15em] text-information/70">
                    {t.name}
                  </span>
                </span>
              ))}
            </div>
            <div className="mt-3 max-w-2xl space-y-1">
              {lens.observations.map((o) => (
                <p
                  key={o}
                  className="font-serif text-sm italic leading-relaxed text-information/70"
                >
                  {o}
                </p>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-6 px-4 pt-4 md:flex-row md:items-center md:justify-center md:gap-10 md:px-8 md:pt-8">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="group"
          aria-label="Globe of professional-norm countries. Sixteen countries are selectable; drag to rotate."
          className="block w-full max-w-xl cursor-grab touch-none select-none active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Ocean */}
          <path
            ref={sphereRef}
            d={initial.sphere}
            fill="var(--structure)"
            fillOpacity="0.05"
            stroke="var(--structure)"
            strokeOpacity="0.35"
            strokeWidth="1"
            onClick={() => {
              if (!wasDrag()) select(null);
            }}
          />
          <path
            ref={graticuleRef}
            d={initial.graticule}
            fill="none"
            stroke="var(--structure)"
            strokeOpacity="0.12"
            strokeWidth="0.4"
            style={{ pointerEvents: "none" }}
          />
          {/* Out-of-scope land, merged into one inert path */}
          <path
            ref={landRef}
            d={initial.land}
            fill="var(--structure)"
            fillOpacity="0.07"
            stroke="var(--structure)"
            strokeOpacity="0.25"
            strokeWidth="0.5"
            onClick={() => {
              if (!wasDrag()) select(null);
            }}
          />
          {/* The sixteen */}
          {highlightedFeatures.map(({ country }) => (
            <path
              key={country.id}
              ref={(el) => {
                if (el) countryRefs.current.set(country.id, el);
                else countryRefs.current.delete(country.id);
              }}
              d={initial.countries.get(country.id) ?? ""}
              role="button"
              tabIndex={0}
              aria-label={`${country.name} — select`}
              aria-pressed={selectedId === country.id}
              {...countryFill(country.id)}
              {...countryStroke(country.id)}
              className="pn-country cursor-pointer focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                if (wasDrag()) return;
                select(selectedId === country.id ? null : country.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(selectedId === country.id ? null : country.id);
                }
              }}
            />
          ))}
          {/* City-state markers (absent from 110m polygons) */}
          {markers.map((m) => {
            const init = initial.markers.get(m.id);
            const [mx, my] = init?.xy ?? [C, C];
            const isSel = selectedId === m.id;
            return (
              <g
                key={m.id}
                ref={(el) => {
                  if (el) markerRefs.current.set(m.id, el);
                  else markerRefs.current.delete(m.id);
                }}
                transform={`translate(${mx}, ${my})`}
                style={{
                  opacity: init?.visible ? 1 : 0,
                  pointerEvents: init?.visible ? undefined : "none",
                }}
                role="button"
                tabIndex={0}
                aria-label={`${m.name} — select`}
                aria-pressed={isSel}
                className="pn-country cursor-pointer focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  if (wasDrag()) return;
                  select(isSel ? null : m.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(isSel ? null : m.id);
                  }
                }}
              >
                <circle r="9" fill="transparent" />
                {(() => {
                  /* The dot is tiny, so tier opacity maps denser than
                     the country fills to stay legible. */
                  const tierIdx = lens.tiers.findIndex((t) =>
                    t.countryIds.includes(m.id),
                  );
                  const tierFill =
                    lens.tiers.length > 0
                      ? { fill: "var(--interaction)", fillOpacity: [0.95, 0.55, 0.25][tierIdx] ?? 0.25 }
                      : isSel
                        ? { fill: "var(--interaction)", fillOpacity: 0.9 }
                        : { fill: "var(--atmosphere)", fillOpacity: 1 };
                  return (
                    <circle
                      r="4"
                      {...tierFill}
                      stroke={
                        isSel ? "var(--interaction)" : "var(--structure)"
                      }
                      strokeOpacity="0.8"
                      strokeWidth={isSel ? 1.6 : 1.2}
                      className="pn-country"
                    />
                  );
                })()}
              </g>
            );
          })}
        </svg>

        {/* Jump list: every country selectable by name — small
            countries are hard to locate on the globe at a glance. */}
        <nav aria-label="Country list" className="w-full shrink-0 pb-4 md:w-44 md:pb-0">
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.25em] text-information/50">
            Jump to a country
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {[...pnCountries]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => select(c.id)}
                    aria-pressed={selectedId === c.id}
                    className={`block w-full border-l py-1 pl-3 text-left font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                      selectedId === c.id
                        ? "border-interaction text-interaction"
                        : "border-structure/20 text-information/65 hover:border-interaction/60 hover:text-interaction"
                    }`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      {/* Caption / selection readout — panels come in Phase 2. */}
      <div className="flex min-h-[4.5rem] items-baseline justify-between gap-6 border-t border-structure/20 px-5 py-4 md:px-7">
        {selected ? (
          <>
            <div>
              <p className="font-serif text-xl leading-snug text-information">
                {selected.name}
              </p>
              <p className="mt-1.5 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-information/60">
                {selected.region}
              </p>
            </div>
            <button
              type="button"
              onClick={() => select(null)}
              className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
            >
              Reset
            </button>
          </>
        ) : (
          <p className="font-serif text-sm italic leading-relaxed text-information/60">
            Sixteen countries are highlighted. Drag to explore; choose one to
            select it.
          </p>
        )}
      </div>

      {/* The reading layer: A1–A3 + situations (Phase 2). */}
      {selected && <PnCountryPanel country={selected} />}
    </div>
  );
}
