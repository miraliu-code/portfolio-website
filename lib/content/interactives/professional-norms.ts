/*
 * Professional Norms Around the World — interactive data (Phase 1).
 * Sixteen countries: three clusters plus five standalone. Phase 1 is
 * the globe mechanic only; situations and content panels arrive in
 * Phase 2.
 */

export interface PnCluster {
  id: string;
  name: string;
}

export interface PnCountry {
  id: string; // slug
  numericId: string; // world-atlas (ISO 3166-1 numeric) id
  name: string;
  cluster?: string; // PnCluster id; absent = standalone
  /* [lon, lat] the globe faces when this country is selected. */
  focus: [number, number];
  /* City-states are invisible at 110m resolution — rendered as a
     clickable dot at these coordinates instead of a polygon. */
  marker?: [number, number];
}

export const pnQuestion =
  "What does 'professionalism' actually mean in different cultures?";

export const pnOrientation = "Drag the globe. Choose a country to begin.";

export const pnClusters: PnCluster[] = [
  { id: "anglo-pacific", name: "Anglo-Pacific" },
  { id: "northern-western-europe", name: "Northern & Western Europe" },
  { id: "east-asia", name: "East Asia" },
];

export const pnCountries: PnCountry[] = [
  /* Anglo-Pacific */
  {
    id: "united-states",
    numericId: "840",
    name: "United States",
    cluster: "anglo-pacific",
    focus: [-98.5, 39.5],
  },
  {
    id: "ireland",
    numericId: "372",
    name: "Ireland",
    cluster: "anglo-pacific",
    focus: [-8.2, 53.2],
  },
  {
    id: "australia",
    numericId: "036",
    name: "Australia",
    cluster: "anglo-pacific",
    focus: [134, -25.5],
  },
  {
    id: "new-zealand",
    numericId: "554",
    name: "New Zealand",
    cluster: "anglo-pacific",
    focus: [172.5, -41.5],
  },
  /* Northern & Western Europe */
  {
    id: "germany",
    numericId: "276",
    name: "Germany",
    cluster: "northern-western-europe",
    focus: [10.3, 51.2],
  },
  {
    id: "switzerland",
    numericId: "756",
    name: "Switzerland",
    cluster: "northern-western-europe",
    focus: [8.2, 46.8],
  },
  {
    id: "netherlands",
    numericId: "528",
    name: "Netherlands",
    cluster: "northern-western-europe",
    focus: [5.3, 52.2],
  },
  {
    id: "sweden",
    numericId: "752",
    name: "Sweden",
    cluster: "northern-western-europe",
    focus: [15, 62],
  },
  /* East Asia */
  {
    id: "china",
    numericId: "156",
    name: "China",
    cluster: "east-asia",
    focus: [104, 35.5],
  },
  {
    id: "japan",
    numericId: "392",
    name: "Japan",
    cluster: "east-asia",
    focus: [138, 37],
  },
  {
    id: "south-korea",
    numericId: "410",
    name: "South Korea",
    cluster: "east-asia",
    focus: [127.8, 36.3],
  },
  /* Standalone */
  {
    id: "singapore",
    numericId: "702",
    name: "Singapore",
    focus: [103.82, 1.35],
    marker: [103.82, 1.35], // absent from 110m boundaries (city-state)
  },
  {
    id: "uae",
    numericId: "784",
    name: "United Arab Emirates",
    focus: [54, 24],
  },
  {
    id: "india",
    numericId: "356",
    name: "India",
    focus: [79, 22.5],
  },
  {
    id: "brazil",
    numericId: "076",
    name: "Brazil",
    focus: [-53, -10.5],
  },
  {
    id: "italy",
    numericId: "380",
    name: "Italy",
    focus: [12.5, 42.5],
  },
];

export function getPnCluster(country: PnCountry): PnCluster | null {
  return pnClusters.find((c) => c.id === country.cluster) ?? null;
}
