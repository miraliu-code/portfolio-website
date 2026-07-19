import "server-only";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import {
  hsrCountries,
  HSR_MAP_W,
  HSR_MAP_H,
} from "@/lib/content/interactives/high-speed-rail";

/*
 * Server-only geo pipeline: Natural Earth 110m boundaries (world-atlas)
 * are projected with d3-geo at build time. Only the resulting SVG path
 * strings cross to the client — no topojson or d3 in the bundle.
 *
 * The projection keeps the full longitude range but trims the dead
 * polar bands: latitude −56° (past the tip of South America, so no
 * Antarctica or far southern ocean) to 70°N (no high Arctic). Neither
 * band is ever relevant to the nine countries. Background land
 * crossing the frame edge is simply clipped by the viewBox.
 */

export const MAP_W = HSR_MAP_W;
export const MAP_H = HSR_MAP_H;

const ANTARCTICA_ID = "010";

/* world-atlas's France geometry (ISO 250) is a MultiPolygon that
   includes French Guiana in South America. The HSR highlight must
   cover European France only — Guiana has no part in the report's
   network — so France's polygons are split by longitude: anything
   west of 20°W leaves the highlight and rejoins the map as plain
   background land (it should still be drawn, just not light up). */
const FRANCE_ID = "250";
const isOverseasPolygon = (polygon: number[][][]) => polygon[0][0][0] < -20;

/* The crop window, sampled as a MultiPoint (avoids spherical-polygon
   winding pitfalls in fitSize): frame-edge extremes at the latitudes
   where the projection is widest/tallest. */
const CROP_BOUNDS = {
  type: "MultiPoint" as const,
  coordinates: [
    ...[-180, 180].flatMap((lon) =>
      [-56, -20, 0, 40, 70].map((lat) => [lon, lat]),
    ),
    ...[-120, -60, 0, 60, 120].flatMap((lon) =>
      [-56, 70].map((lat) => [lon, lat]),
    ),
  ],
};

/* Label-callout leaders for the tight European cluster: a line from
   each country's center out to a dot over open water/quiet land, so
   all five are individually hoverable and selectable at world scale.
   Offsets are in map units from the country's focus center. */
const EUROPE_CALLOUT_OFFSETS: Record<string, [number, number]> = {
  "united-kingdom": [-34, -16],
  france: [-46, 2],
  spain: [-34, 26],
  germany: [16, -26],
  italy: [20, 24],
};

export interface CountryShape {
  id: string; // hsr country slug, or "" for non-highlighted countries
  d: string;
}

export interface RailPath {
  countryId: string;
  d: string;
  dashed: boolean;
}

export interface CountryFocus {
  id: string;
  k: number; // zoom scale
  cx: number; // projected focus center (map coords)
  cy: number;
}

export interface CountryCallout {
  id: string;
  name: string;
  cx: number; // country center (leader start)
  cy: number;
  ex: number; // dot position (leader end)
  ey: number;
}

export interface HsrGeo {
  countries: CountryShape[]; // all world countries (background)
  highlighted: CountryShape[]; // the nine, clickable
  rails: RailPath[];
  focuses: CountryFocus[];
  callouts: CountryCallout[];
}

export function buildHsrGeo(): HsrGeo {
  const topology = worldData as unknown as Topology<{
    countries: GeometryCollection;
  }>;
  const world = feature(
    topology,
    topology.objects.countries,
  ) as FeatureCollection<Geometry>;

  const features = world.features.filter(
    (f) => String(f.id) !== ANTARCTICA_ID,
  );

  const projection = geoNaturalEarth1().fitSize(
    [MAP_W, MAP_H],
    CROP_BOUNDS as unknown as Geometry,
  );
  const pathGen = geoPath(projection);

  const byNumericId = new Map(hsrCountries.map((c) => [c.numericId, c]));

  const countries: CountryShape[] = [];
  const highlighted: CountryShape[] = [];

  for (const f of features) {
    const hsr = byNumericId.get(String(f.id));
    if (hsr && String(f.id) === FRANCE_ID && f.geometry.type === "MultiPolygon") {
      const polygons = f.geometry.coordinates as number[][][][];
      const mainland = polygons.filter((p) => !isOverseasPolygon(p));
      const overseas = polygons.filter(isOverseasPolygon);
      const mainlandD = pathGen({
        type: "MultiPolygon",
        coordinates: mainland,
      } as Geometry);
      if (mainlandD) highlighted.push({ id: hsr.id, d: mainlandD });
      const overseasD = pathGen({
        type: "MultiPolygon",
        coordinates: overseas,
      } as Geometry);
      if (overseasD) countries.push({ id: "", d: overseasD });
      continue;
    }
    const d = pathGen(f);
    if (!d) continue;
    if (hsr) highlighted.push({ id: hsr.id, d });
    else countries.push({ id: "", d });
  }

  const rails: RailPath[] = hsrCountries.flatMap((c) =>
    c.railLines.map((line) => ({
      countryId: c.id,
      dashed: line.dashed ?? false,
      d: line.points
        .map((p, i) => {
          const xy = projection(p);
          return `${i === 0 ? "M" : "L"}${xy![0].toFixed(1)},${xy![1].toFixed(1)}`;
        })
        .join(""),
    })),
  );

  const focuses: CountryFocus[] = hsrCountries.map((c) => {
    const xy = projection(c.focus.center)!;
    return { id: c.id, k: c.focus.scale, cx: xy[0], cy: xy[1] };
  });

  const callouts: CountryCallout[] = hsrCountries.flatMap((c) => {
    const offset = EUROPE_CALLOUT_OFFSETS[c.id];
    if (!offset) return [];
    const xy = projection(c.focus.center)!;
    return [
      {
        id: c.id,
        name: c.name,
        cx: xy[0],
        cy: xy[1],
        ex: xy[0] + offset[0],
        ey: xy[1] + offset[1],
      },
    ];
  });

  return { countries, highlighted, rails, focuses, callouts };
}
