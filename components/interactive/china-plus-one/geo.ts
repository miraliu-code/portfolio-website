import "server-only";
import { geoNaturalEarth1 } from "d3-geo";
import { geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import worldData from "world-atlas/countries-110m.json";
import {
  cpoCountries,
  CPO_MAP_W,
  CPO_MAP_H,
} from "@/lib/content/interactives/china-plus-one";

/*
 * Server-only geo pipeline (the HSR pattern): Natural Earth 110m
 * boundaries projected at build time; only SVG path strings and node
 * coordinates cross to the client.
 *
 * The projection is Pacific-centered (rotated 180°) so Asia sits on
 * the left and the Americas on the right of one continuous frame —
 * the ocean between them is the story. Crop window: longitude 62°E
 * eastward across the Pacific to 62°W, latitude −18°…55°. Europe and
 * Africa fall outside the window and are clipped by the viewBox.
 */

const ANTARCTICA_ID = "010";

/* Crop window sampled as a MultiPoint (longitudes normalized to
   −180…180; the rotation makes them contiguous in screen space). */
const norm = (lon: number) => ((lon + 180) % 360) - 180;
const CROP_BOUNDS = {
  type: "MultiPoint" as const,
  coordinates: [
    ...[62, 298].flatMap((lon) =>
      [-18, 0, 25, 55].map((lat) => [norm(lon), lat]),
    ),
    ...[90, 130, 180, 230, 270].flatMap((lon) =>
      [-18, 55].map((lat) => [norm(lon), lat]),
    ),
  ],
};

export interface CpoShape {
  id: string; // cpo country slug, or "" for background countries
  d: string;
}

export interface CpoNode {
  id: string;
  x: number;
  y: number;
  /* Leader line back to the country when the node anchor is nudged
     into open water. */
  leader?: { x: number; y: number };
}

export interface CpoGeo {
  countries: CpoShape[];
  highlighted: CpoShape[];
  nodes: CpoNode[];
}

export function buildCpoGeo(): CpoGeo {
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

  const projection = geoNaturalEarth1()
    .rotate([-180, 0])
    .fitSize([CPO_MAP_W, CPO_MAP_H], CROP_BOUNDS as unknown as Geometry);
  const pathGen = geoPath(projection);

  const byNumericId = new Map(cpoCountries.map((c) => [c.numericId, c]));

  const countries: CpoShape[] = [];
  const highlighted: CpoShape[] = [];
  for (const f of features) {
    const d = pathGen(f);
    if (!d) continue;
    const cpo = byNumericId.get(String(f.id));
    if (cpo) highlighted.push({ id: cpo.id, d });
    else countries.push({ id: "", d });
  }

  const nodes: CpoNode[] = cpoCountries.map((c) => {
    const xy = projection(c.node)!;
    const node: CpoNode = { id: c.id, x: xy[0], y: xy[1] };
    if (c.leaderTo) {
      const to = projection(c.leaderTo)!;
      node.leader = { x: to[0], y: to[1] };
    }
    return node;
  });

  return { countries, highlighted, nodes };
}
