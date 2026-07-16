/*
 * Following the Factory (China Plus One) — interactive data (Phase 1).
 * Supports the China Plus One flagship report (Strategy domain).
 *
 * Scope note (the report's stated scope, and this map's): every figure
 * is a share of US IMPORTS, not of global production — China still
 * dominates absolute production (~80% of iPhone assembly in 2025)
 * while its share of what America imports has collapsed, and that
 * distinction is the point.
 *
 * Sourcing: the 2025 endpoints are sourced —
 *   Electronics: US smartphone import shares, Q2 2025
 *     (Canalys/Census-derived): India ~44%, Vietnam ~30%, China ~25%
 *     (down from ~61% in Q2 2024).
 *   Apparel: US apparel import shares by value (OTEXA / Sheng Lu,
 *     2025): China 11.3% (from 19.8% a year earlier), Vietnam
 *     17.7–21.5% depending on series (19.6 used here), and the five
 *     non-China Asian suppliers on this map summing to the sourced
 *     record 44.2%; Mexico 2.3%.
 * The 2010 endpoints are stylized per the Phase 1 spec — "China
 * dominant, the other six minimal" — and get data-backed granularity
 * in Phase 2. Mid-timeline values are linear interpolation between
 * the endpoints: illustrative motion, not year-by-year data.
 */

export type CpoSector = "electronics" | "apparel";

export const cpoQuestion =
  "When manufacturing costs rise in one country, where does it actually go — and does it actually go anywhere at all?";

export const cpoOrientation =
  "Drag the timeline. Switch between apparel and electronics. Click a country to see what moved, and why.";

export const cpoTimeline = { start: 2010, end: 2025 };

/* Map frame, shared by the server geo pipeline and the client SVGs.
 * Pacific-centered window: longitude 62°E eastward across the Pacific
 * to 62°W, latitude −18°…55° (see geo.ts). Height follows at W=960. */
export const CPO_MAP_W = 960;
export const CPO_MAP_H = 343;

export const cpoSectors: { id: CpoSector; name: string }[] = [
  { id: "electronics", name: "Electronics" },
  { id: "apparel", name: "Apparel" },
];

export interface CpoShare {
  start: number; // % of US imports at 2010 (stylized endpoint)
  end: number; // % of US imports at 2025 (sourced)
}

export interface CpoCountry {
  id: string;
  numericId: string; // world-atlas (ISO 3166-1 numeric) id
  name: string;
  /* Node anchor [lon, lat]. Where a country is too small or too close
     to a neighbor for its node to sit on its own soil, the anchor is
     nudged into open water and a leader line points home. */
  node: [number, number];
  leaderTo?: [number, number];
  /* Label placement in px relative to the projected node — fixed, so
     labels don't chase the resizing circles. */
  labelOffset: [number, number];
  labelAnchor: "start" | "middle" | "end";
  /* Phase 1 one-line summary; the full four-field panel is Phase 2. */
  summary: string;
  shares: Record<CpoSector, CpoShare>;
}

export const cpoCountries: CpoCountry[] = [
  {
    id: "china",
    numericId: "156",
    name: "China",
    node: [104, 35],
    labelOffset: [50, 6],
    labelAnchor: "start",
    summary:
      "Still the world's factory in absolute terms — but its share of what America imports has fallen fast enough to reorder this map.",
    shares: {
      electronics: { start: 82, end: 25 },
      apparel: { start: 39.5, end: 11.3 },
    },
  },
  {
    id: "vietnam",
    numericId: "704",
    name: "Vietnam",
    node: [107, 16.5],
    labelOffset: [30, 4],
    labelAnchor: "start",
    summary:
      "The biggest single winner of China Plus One — first in US apparel by 2025, past China in smartphones.",
    shares: {
      electronics: { start: 2, end: 30 },
      apparel: { start: 7.0, end: 19.6 },
    },
  },
  {
    id: "cambodia",
    numericId: "116",
    name: "Cambodia",
    node: [99, -1],
    leaderTo: [105, 12],
    labelOffset: [0, 24],
    labelAnchor: "middle",
    summary:
      "An apparel-led beneficiary of the intra-Asia shift, with almost no electronics story yet.",
    shares: {
      electronics: { start: 0.2, end: 0.5 },
      apparel: { start: 2.4, end: 4.4 },
    },
  },
  {
    id: "bangladesh",
    numericId: "050",
    name: "Bangladesh",
    node: [90, 24],
    labelOffset: [-22, -14],
    labelAnchor: "end",
    summary:
      "Apparel scale without an electronics story — the shift's most single-industry winner.",
    shares: {
      electronics: { start: 0.1, end: 0.3 },
      apparel: { start: 4.6, end: 9.3 },
    },
  },
  {
    id: "india",
    numericId: "356",
    name: "India",
    node: [77, 20],
    labelOffset: [-6, 44],
    labelAnchor: "middle",
    summary:
      "The electronics surprise: from under 1% of Apple's iPhone output in 2017 to a quarter of it — and 44% of US smartphone imports — by 2025.",
    shares: {
      electronics: { start: 1, end: 44 },
      apparel: { start: 4.0, end: 6.3 },
    },
  },
  {
    id: "indonesia",
    numericId: "360",
    name: "Indonesia",
    node: [113, -4],
    labelOffset: [24, 6],
    labelAnchor: "start",
    summary:
      "A steady, second-tier apparel gainer inside Asia's record combined share.",
    shares: {
      electronics: { start: 0.5, end: 1.2 },
      apparel: { start: 5.0, end: 4.6 },
    },
  },
  {
    id: "mexico",
    numericId: "484",
    name: "Mexico",
    node: [-102.5, 23.5],
    labelOffset: [0, 30],
    labelAnchor: "middle",
    summary:
      "The nearshoring narrative's home — and, in apparel, its clearest counterexample: 2.3% of US imports and falling.",
    shares: {
      electronics: { start: 3, end: 1.5 },
      apparel: { start: 4.5, end: 2.3 },
    },
  },
];

/* Persistent honesty captions (rendered under the map). */
export const cpoCaptions = {
  sizing:
    "Node size reflects sourced share-of-US-import figures — cited in each country's panel — not a live trade index. Every figure is a US-market share, the report's stated scope.",
  scope:
    "Malaysia and Thailand are deliberately outside this map's scope — a stated gap, not an oversight.",
  cafta:
    "Off this map entirely: CAFTA-DR Central America fell from 9.6% to 7.6% of US apparel imports — the industry everyone assumed would nearshore first is not nearshoring.",
  interpolation:
    "Between the endpoints the motion is illustrative — year-by-year granularity arrives in Phase 2.",
};

/* Share at an arbitrary year: linear interpolation between the 2010
   and 2025 endpoints (Phase 1's stylized motion). */
export function cpoShareAt(
  country: CpoCountry,
  sector: CpoSector,
  year: number,
): number {
  const { start, end } = country.shares[sector];
  const t = Math.min(
    1,
    Math.max(0, (year - cpoTimeline.start) / (cpoTimeline.end - cpoTimeline.start)),
  );
  return start + (end - start) * t;
}

/* Node radius: area encodes share (sqrt), floored so tiny players
   stay visible and clickable. */
export function cpoRadius(share: number): number {
  return Math.max(3, 4.6 * Math.sqrt(share));
}

export function getCpoCountry(id: string): CpoCountry | null {
  return cpoCountries.find((c) => c.id === id) ?? null;
}

/* ------------------------------------------------------------------ */
/* Consistency guards. Deterministic over static data and unguarded,   */
/* so a violation fails `next build` at prerender:                     */
/* 1. every country carries both sectors' endpoints;                   */
/* 2. the five non-China Asian apparel shares must sum to the sourced  */
/*    record figure (44.2% of US apparel imports, 2024/25) — if the    */
/*    per-country numbers drift, the sourced total breaks loudly;      */
/* 3. the 2025 electronics podium matches the sourced ordering:        */
/*    India > Vietnam > China.                                         */
/* ------------------------------------------------------------------ */
{
  for (const c of cpoCountries) {
    for (const sector of ["electronics", "apparel"] as const) {
      const s = c.shares[sector];
      if (
        !s ||
        !Number.isFinite(s.start) ||
        !Number.isFinite(s.end) ||
        s.start < 0 ||
        s.end < 0
      ) {
        throw new Error(
          `China Plus One: country "${c.id}" has invalid ${sector} shares.`,
        );
      }
    }
  }
  const asianNonChina = ["vietnam", "bangladesh", "india", "indonesia", "cambodia"];
  const sum = asianNonChina.reduce(
    (acc, id) => acc + getCpoCountry(id)!.shares.apparel.end,
    0,
  );
  if (Math.abs(sum - 44.2) > 0.05) {
    throw new Error(
      `China Plus One: non-China Asian 2025 apparel shares sum to ${sum.toFixed(1)}, not the sourced 44.2.`,
    );
  }
  const e = (id: string) => getCpoCountry(id)!.shares.electronics.end;
  if (!(e("india") > e("vietnam") && e("vietnam") > e("china"))) {
    throw new Error(
      "China Plus One: 2025 electronics ordering must be India > Vietnam > China (sourced Q2 2025 smartphone import shares).",
    );
  }
}
