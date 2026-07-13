/*
 * Airport Ecosystem — data (Phase 1).
 * A generic, composite model of "how airports work" — deliberately not
 * any single named airport (Changi has its own, separate interactive).
 * Thesis: an airport feels like one place to a passenger but is
 * operated by several separate organizations that don't fully
 * coordinate. Phase 1 ships the floor plan and zone selection; the
 * organization layer, cross-highlighting, and the four-field detail
 * panel arrive in Phase 2.
 */

export const aeQuestion =
  "How does an airport function as one interconnected organizational system?";

export const aeOrientation = "Click an area of the terminal to begin.";

export interface AeZone {
  id: string;
  name: string;
  /* One-line caption for Phase 1; the full four-field panel is Phase 2. */
  blurb: string;
}

export const aeZones: AeZone[] = [
  {
    id: "check-in",
    name: "Check-in / Ticketing",
    blurb:
      "Airline territory on the airport's floor — counters staffed by carriers and their handling agents, not by the terminal operator.",
  },
  {
    id: "security",
    name: "Security Screening",
    blurb:
      "The chokepoint every departing passenger funnels through — run by a government or contracted security authority, on its own rules and its own clock.",
  },
  {
    id: "immigration",
    name: "Immigration / Customs",
    blurb:
      "A national border drawn across a building — staffed by border agencies with a chain of command that ends in a ministry, not in the terminal.",
  },
  {
    id: "gates",
    name: "Gate / Boarding",
    blurb:
      "Shared infrastructure reassigned by the hour: the airport owns the gate, the airline runs the boarding.",
  },
  {
    id: "baggage",
    name: "Baggage Handling",
    blurb:
      "A parallel logistics network under the floor — a bag passes through more organizational handoffs than the passenger who checked it.",
  },
  {
    id: "retail",
    name: "Retail & Concessions",
    blurb:
      "A shopping center leasing space inside a transport facility — tuned to the dwell time the other zones create.",
  },
  {
    id: "curbside",
    name: "Ground Transport / Curbside",
    blurb:
      "The contested edge where city traffic, taxis, buses, and transit authorities meet the terminal door.",
  },
  {
    id: "ramp",
    name: "Ramp / Aircraft Turnaround",
    blurb:
      "The busiest 40 minutes in aviation: fueling, catering, cleaning, loading — each by a different company, all against one departure time.",
  },
];

export function getAeZone(id: string): AeZone | null {
  return aeZones.find((z) => z.id === id) ?? null;
}
