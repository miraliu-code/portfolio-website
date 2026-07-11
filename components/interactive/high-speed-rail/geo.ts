import "server-only";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import { hsrCountries } from "@/lib/content/interactives/high-speed-rail";

/*
 * Server-only geo pipeline: Natural Earth 110m boundaries (world-atlas)
 * are projected with d3-geo at build time. Only the resulting SVG path
 * strings cross to the client — no topojson or d3 in the bundle.
 */

export const MAP_W = 960;
export const MAP_H = 500;

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

export interface HsrGeo {
  countries: CountryShape[]; // all world countries (background)
  highlighted: CountryShape[]; // the nine, clickable
  rails: RailPath[];
  focuses: CountryFocus[];
}

export function buildHsrGeo(): HsrGeo {
  const topology = worldData as unknown as Topology<{
    countries: GeometryCollection;
  }>;
  const world = feature(
    topology,
    topology.objects.countries,
  ) as FeatureCollection<Geometry>;

  const projection = geoNaturalEarth1().fitSize([MAP_W, MAP_H], world);
  const pathGen = geoPath(projection);

  const byNumericId = new Map(hsrCountries.map((c) => [c.numericId, c]));

  const countries: CountryShape[] = [];
  const highlighted: CountryShape[] = [];

  for (const f of world.features) {
    const d = pathGen(f);
    if (!d) continue;
    const hsr = byNumericId.get(String(f.id));
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

  return { countries, highlighted, rails, focuses };
}
