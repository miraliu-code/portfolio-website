/*
 * Dutch Cycling Infrastructure — "Street Types" (Phase 1).
 * Supports the Dutch Cycling Infrastructure field guide (Design /
 * Systems Design, D-16).
 *
 * THE MECHANIC IS DISCRETE ON PURPOSE. The report's Section 4 argues
 * that Dutch street safety comes from CATEGORICAL classification
 * (through-road / distributor / access road, with design following
 * from the category), not from gradually adding bike infrastructure.
 * A continuous slider morphing one street into another would teach
 * the opposite lesson — that safety is a dial. So: discrete cards,
 * clean cross-fade between fully-formed designs, no interpolation.
 * This is a design decision, not a simplification; a guard below
 * makes the doctrine caption state it on the page.
 *
 * Phase 1 scope: the card swap, the cross-section illustrations, and
 * short single-paragraph element captions. Full report-tie-in
 * content, the sourced comparison street for the arterial baseline,
 * intersections, Key Insights, and Continue Reading are Phase 2.
 */

export const dcQuestion =
  "What does it actually take to design a street where cyclists, pedestrians, and cars can share space safely?";

export const dcOrientation =
  "Choose a street type. Click any part of it to see why it's built that way.";

/* ------------------------------------------------------------------ */
/* The street categories.                                              */
/* ------------------------------------------------------------------ */

export type DcStreetId =
  | "through-road"
  | "distributor"
  | "access-road"
  | "conventional";

export interface DcElement {
  id: string;
  name: string;
  /* Phase 1: one short paragraph — what it is, and its safety
     rationale. Full depth arrives in Phase 2. */
  note: string;
}

export interface DcStreet {
  id: DcStreetId;
  name: string;
  /* The Dutch category term (or the baseline's plain label). */
  term: string;
  speed: string;
  summary: string;
  elements: DcElement[];
}

export const dcStreets: DcStreet[] = [
  {
    id: "through-road",
    name: "Through-road",
    term: "Stroomweg",
    speed: "70–100 km/h",
    summary:
      "Move traffic at speed, and keep everything unprotected structurally apart from it.",
    elements: [
      {
        id: "cycle-track",
        name: "The separated cycle track",
        note:
          "A fully separate track: its own red surface, its own alignment, a structural distance from the carriageway. At through-road speeds no painted marking or shared arrangement is considered safe, so separation is the only treatment the category permits. The red asphalt is itself signage — in the Netherlands, red surface means cycle space, everywhere. [Reported]",
      },
      {
        id: "barrier",
        name: "The physical barrier",
        note:
          "The separation is physical, not painted: a raised, usually planted verge between track and carriageway. A driver leaving the lane meets a curb and a tree line before meeting a cyclist. The barrier does the safety work that paint can only gesture at. [Reported]",
      },
      {
        id: "carriageway",
        name: "The carriageway",
        note:
          "The traffic function, given its own uninterrupted space. Through-roads exist to move vehicles at speed, and the design admits it — rather than mixing fast traffic with anyone unprotected, it excludes them entirely. High speed is made safe by exclusion, not by caution signs. [Reported]",
      },
    ],
  },
  {
    id: "distributor",
    name: "Distributor road",
    term: "Gebiedsontsluitingsweg",
    speed: "≈50 km/h",
    summary:
      "Gather and move local traffic, with cyclists on a physically protected edge.",
    elements: [
      {
        id: "cycle-lane",
        name: "The protected cycle lane",
        note:
          "Still red, still continuous — but running alongside the carriageway rather than fully apart from it. At distributor speeds, roughly 50 km/h, the doctrine requires protection with a physical edge, not paint: close enough to share the corridor, never the surface. [Reported]",
      },
      {
        id: "buffer",
        name: "The physical buffer",
        note:
          "The entire difference between a protected lane and a painted one is this strip: a raised island and bollards a car cannot casually cross. It is narrow, cheap, and categorical — on one side of it, cyclists; on the other, traffic. No judgment, attention, or goodwill is asked of anyone. [Reported]",
      },
      {
        id: "carriageway",
        name: "The carriageway",
        note:
          "Distributors gather and move a district's traffic at moderate speed — and the geometry holds the speed down as much as it moves the cars. Lane widths and curvature are chosen so that driving at the category's speed feels natural, and driving faster does not. [Reported]",
      },
    ],
  },
  {
    id: "access-road",
    name: "Access road",
    term: "Woonerf",
    speed: "15–20 km/h",
    summary:
      "One shared surface, with speed capped so low that sharing is the protection.",
    elements: [
      {
        id: "shared-surface",
        name: "The shared surface",
        note:
          "One continuous brick surface, building front to building front: no curbs, no lanes, no assigned territory. The material is the message — brick rather than asphalt tells a driver on arrival that this is not a street for passing through. At the capped speed, roughly 15–20 km/h, sharing needs no further protection, which is why none is built. [Reported]",
      },
      {
        id: "speed-table",
        name: "The speed table",
        note:
          "The cap is enforced by geometry, not signage: raised tables make the design speed the comfortable maximum, and an uncomfortable one for anything faster. A driver obeys the street because the street offers no comfortable alternative. [Reported]",
      },
      {
        id: "chicane",
        name: "The planter chicane",
        note:
          "Planters and parking are arranged to bend the driving line, so a car cannot hold a straight course for more than a few lengths. Slowness is built into the path itself — enforcement is the pavement's job, not the police's. [Reported]",
      },
    ],
  },
  {
    id: "conventional",
    name: "Conventional arterial",
    term: "The non-Dutch baseline",
    speed: "40–60 km/h, painted margins",
    summary:
      "The arrangement the three categories are built to refuse: speed and mixing at once.",
    elements: [
      {
        id: "painted-lane",
        name: "The painted bike lane",
        note:
          "The baseline treatment outside the doctrine: a painted stripe assigning cyclists a margin of the same surface the traffic uses, with nothing physical between them. Every protection here is behavioral — a standing request that drivers notice the line. This is the arrangement each Dutch category is, differently, a refusal of. [Reported]",
      },
      {
        id: "door-zone",
        name: "The door zone",
        note:
          "The painted lane typically runs within a door's length of parked cars, so an opening door claims the exact space the stripe assigns. The cyclist's escape route is the traffic lane. The paint records where a cyclist is supposed to be, not where it is safe to be. [Reported]",
      },
      {
        id: "traffic-lanes",
        name: "The traffic lanes",
        note:
          "Arterial speed beside unprotected cyclists is the combination the Dutch classification exists to make impossible: in the categorical system, a street this fast must separate, and a street this mixed must slow down. This one does neither, and asks paint to make up the difference. [Reported]",
      },
    ],
  },
];

export function getDcStreet(id: DcStreetId): DcStreet {
  return dcStreets.find((s) => s.id === id)!;
}

/* ------------------------------------------------------------------ */
/* On-page captions.                                                   */
/* ------------------------------------------------------------------ */

/* Why the selector is discrete — stated on the page, because the
   interaction is the argument. */
export const dcDoctrineNote =
  "The selector is discrete on purpose. In the Dutch Sustainable Safety doctrine a street is first assigned a category — through-road, distributor, access road — and its design follows from the assignment. Safety here is a classification, not a dial, so there is nothing continuous to slide between.";

/* The arterial baseline is a generic composite for now. */
export const dcBaselineNote =
  "The conventional arterial is a generic composite baseline, not a specific sourced street; Phase 2 ties the comparison to a documented example.";

export const dcPhaseNote =
  "Phase 1 — this build proves the discrete street-type swap and the cross-section illustrations. Full element content, the sourced comparison street, intersection geometry, mode share and economics, Key Insights, and Continue Reading arrive with Phase 2.";

/* ------------------------------------------------------------------ */
/* Consistency guards — deterministic over static data and unguarded,  */
/* so a violation fails `next build` at prerender:                     */
/* 1. exactly the four specced categories, in order;                   */
/* 2. every street carries 2–4 elements with substantive Phase 1       */
/*    notes (short by design, but never token);                        */
/* 3. the mechanic-defining elements exist: the distributor's buffer,  */
/*    the access road's speed table, the arterial's painted lane;      */
/* 4. the arterial stays GENERIC — naming a real city on the baseline  */
/*    card fails the build until Phase 2 sources a real street;        */
/* 5. the discrete-not-a-dial doctrine is stated on the page.          */
/* ------------------------------------------------------------------ */
{
  const expectedIds: DcStreetId[] = [
    "through-road",
    "distributor",
    "access-road",
    "conventional",
  ];
  if (
    dcStreets.length !== expectedIds.length ||
    !expectedIds.every((id, i) => dcStreets[i].id === id)
  ) {
    throw new Error(
      "Dutch Cycling: the four street categories must match the spec, in order.",
    );
  }
  for (const s of dcStreets) {
    if (s.elements.length < 2 || s.elements.length > 4) {
      throw new Error(
        `Dutch Cycling: street "${s.id}" must carry 2–4 clickable elements.`,
      );
    }
    for (const e of s.elements) {
      if (e.note.trim().length < 100 || e.note.trim().length > 700) {
        throw new Error(
          `Dutch Cycling: element "${s.id}/${e.id}" note must be a short substantive paragraph (100–700 chars).`,
        );
      }
    }
  }
  const requiredElements: [DcStreetId, string][] = [
    ["distributor", "buffer"],
    ["access-road", "speed-table"],
    ["conventional", "painted-lane"],
  ];
  for (const [street, el] of requiredElements) {
    if (!getDcStreet(street).elements.some((e) => e.id === el)) {
      throw new Error(
        `Dutch Cycling: "${street}" must include its category-defining "${el}" element.`,
      );
    }
  }
  const conventional = getDcStreet("conventional");
  const conventionalText =
    conventional.name +
    conventional.term +
    conventional.summary +
    conventional.elements.map((e) => e.note).join(" ");
  if (
    /Amsterdam|Utrecht|Rotterdam|New York|London|Paris|Chicago|Los Angeles|Houston|Toronto/i.test(
      conventionalText,
    )
  ) {
    throw new Error(
      "Dutch Cycling: the arterial baseline must stay generic until Phase 2 sources a specific comparison street.",
    );
  }
  if (conventional.name !== "Conventional arterial") {
    throw new Error(
      "Dutch Cycling: the baseline card must be labeled generically as 'Conventional arterial'.",
    );
  }
  if (
    !dcDoctrineNote.includes("not a dial") ||
    !dcDoctrineNote.includes("category")
  ) {
    throw new Error(
      "Dutch Cycling: the doctrine caption must state the discrete-not-a-dial rationale on the page.",
    );
  }
  if (!dcBaselineNote.includes("generic") || !dcBaselineNote.includes("Phase 2")) {
    throw new Error(
      "Dutch Cycling: the baseline caption must disclose the generic composite and the Phase 2 sourcing plan.",
    );
  }
  if (!getDcStreet("access-road").speed.includes("15")) {
    throw new Error(
      "Dutch Cycling: the access road must carry the specced 15–20 km/h cap.",
    );
  }
}
