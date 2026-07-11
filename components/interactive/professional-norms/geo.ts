import "server-only";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";
import { feature, merge } from "topojson-client";
import type {
  Topology,
  GeometryCollection,
  Polygon as TopoPolygon,
  MultiPolygon as TopoMultiPolygon,
} from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import { pnCountries } from "@/lib/content/interactives/professional-norms";

/*
 * Server-only snapshot of the globe for the hero: a fixed orthographic
 * view rendered to path strings at build time (the HSR pattern). The
 * interactive globe itself must project client-side — rotation changes
 * the projection every frame — so only the hero uses this pipeline.
 */

export const PN_SIZE = 520;

/* The hero faces the Arabia/India meridian: Europe on one limb, East
   Asia on the other, UAE and India centered. */
const HERO_ROTATE: [number, number, number] = [-70, -22, 0];

export interface PnHeroGlobe {
  size: number;
  sphere: string;
  graticule: string;
  land: string; // all out-of-scope countries merged into one path
  highlighted: string[]; // the sixteen (those visible on this side)
}

export function buildPnHeroGlobe(): PnHeroGlobe {
  const topology = worldData as unknown as Topology<{
    countries: GeometryCollection;
  }>;
  const inScope = new Set(pnCountries.map((c) => c.numericId));

  const world = feature(
    topology,
    topology.objects.countries,
  ) as FeatureCollection<Geometry>;

  const landGeom = merge(
    topology,
    topology.objects.countries.geometries.filter(
      (g) => !inScope.has(String(g.id)),
    ) as Array<TopoPolygon | TopoMultiPolygon>,
  );

  const projection = geoOrthographic()
    .translate([PN_SIZE / 2, PN_SIZE / 2])
    .scale(PN_SIZE / 2 - 10)
    .rotate(HERO_ROTATE);
  const pathGen = geoPath(projection);

  const highlighted: string[] = [];
  for (const f of world.features) {
    if (!inScope.has(String(f.id))) continue;
    const d = pathGen(f);
    if (d) highlighted.push(d);
  }

  return {
    size: PN_SIZE,
    sphere: pathGen({ type: "Sphere" }) ?? "",
    graticule: pathGen(geoGraticule10()) ?? "",
    land: pathGen(landGeom) ?? "",
    highlighted,
  };
}
