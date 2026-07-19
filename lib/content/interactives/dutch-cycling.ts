/*
 * Dutch Cycling Infrastructure — "Street Types" (Phases 1 + 2).
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
 *
 * Phase 2 adds: full element readings for every click target (the
 * Sustainable Safety triple — functionality, homogeneity,
 * predictability — carried where the element embodies it), the
 * woonerf's entry-threshold element, the Davis/Mobycon protected-
 * intersection section (the documented US comparison), the
 * mode-share-plateau finding, the peer-reviewed economics paragraph,
 * Key Insights, and Continue Reading.
 *
 * Sourcing discipline (guard-enforced):
 *   - The conventional arterial stays a GENERIC composite — the
 *     documented US comparison lives in the intersection section.
 *   - The "€1.2–3.8 billion / 13,000 jobs" economics figure traces
 *     to an unverifiable aggregator and must never appear; a guard
 *     scans every exported string for it.
 *   - Tilburg/The Hague get only the defensible early-routes claim,
 *     never the uncorroborated "demonstration town" framing.
 *   - Groningen's 59% traces to a single policy blog: [Reported].
 *   - The Davis implementation gap is a single advocacy source:
 *     [Reported], with the caveat stated in text.
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

export type DcPrinciple = "Functionality" | "Homogeneity" | "Predictability";

export interface DcElement {
  id: string;
  name: string;
  /* Which leg of the Sustainable Safety triple this element embodies,
     where it cleanly embodies one. */
  principle?: DcPrinciple;
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
        principle: "Homogeneity",
        note:
          "Fully physically separated from motor traffic — its own surface, its own alignment, not paint. This is the category where separation is non-negotiable under Sustainable Safety: at through-road speeds, the difference in mass and velocity between a car and a bicycle is unsurvivable regardless of traffic volume, so the doctrine does not weigh separation against cost or convenience here. It simply requires it. The red asphalt carries the system-wide code: red surface means cycle space, everywhere in the country. [Well-established]",
      },
      {
        id: "barrier",
        name: "The physical barrier",
        principle: "Predictability",
        note:
          "The planted verge is not decorative. It is the physical enforcement of the separation — a driver leaving the lane meets a curb and a tree line before meeting a cyclist — and it is also instructional: the buffer reinforces a driver's read of the road as a through-route, discouraging the informal property access and casual pedestrian crossing that would undermine the category's entire design logic. The planting is doing doctrine work: it tells every user what kind of road this is without a single sign. [Reported]",
      },
      {
        id: "carriageway",
        name: "The carriageway",
        principle: "Functionality",
        note:
          "No direct property frontage is permitted on a through-road — no driveways, no shop entrances, no reasons to stop. Access is the defining feature access roads exist to provide, and through-roads exist specifically to NOT provide it. That categorical exclusivity is Sustainable Safety's 'functionality' principle in physical form: every street serves exactly one function, and a road that tried to be both fast and open to its frontage would be neither, safely. [Well-established]",
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
          "The lane's position is chosen against two specific hazards at once: it keeps cyclists out of the blind spot of vehicles running alongside, and away from the 'dooring' arc of parked cars — which is why the parking sits across the carriageway rather than against the lane. Dooring is a hazard class entirely distinct from the through-road's high-speed risk, and that is the pattern: each street category defends against its own characteristic crash type. [Reported]",
      },
      {
        id: "buffer",
        name: "The physical buffer",
        principle: "Homogeneity",
        note:
          "The category-defining element. Under Dutch doctrine a painted line is not a distributor-road treatment, because paint does not physically prevent a vehicle incursion — the buffer, raised concrete plus bollards, is what makes this lane 'protected' rather than merely 'marked.' The reasoning is mechanical, not behavioral: at roughly 50 km/h the design must make incursion impossible, not merely discouraged. Everything else on this card is ordinary; this strip is the category. [Well-established]",
      },
      {
        id: "carriageway",
        name: "The carriageway",
        note:
          "On a distributor, the danger concentrates at the junctions — the mid-block geometry is the easy part. Along the corridor, crossings carry protected-turn treatments and signal priority, so a turning vehicle and a through cyclist are never given the same green into the same space. That junction grammar is its own body of geometry, exact enough to export — the section below this interactive follows it to the first US intersection built on it. [Reported]",
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
        principle: "Homogeneity",
        note:
          "One continuous brick surface, wall to wall — the category's core logic made literal. At 15–20 km/h, the speed differential between a car and a cyclist or pedestrian is survivable if a conflict occurs, so physical separation stops being necessary. This is Sustainable Safety's 'homogeneity' principle: match speed and mass differences to what a human body can survive, rather than trying to eliminate conflict entirely. Slow the street until sharing is safe; then share everything. [Well-established]",
      },
      {
        id: "gateway",
        name: "The entry threshold",
        principle: "Predictability",
        note:
          "A marked rise and a signed gate where the woonerf begins, announcing that a driver is now a guest in a space with different rules — legally and physically. The cue matters because a woonerf is not merely a slow street; it is a different category entirely, and the boundary must be legible at the moment of entry, not discovered mid-block. Category changes are announced at thresholds, never left to inference. [Reported]",
      },
      {
        id: "chicane",
        name: "The planter chicane",
        note:
          "Planters and staggered parking bend the driving line so a car cannot hold a straight course for more than a few lengths — the mid-block partner of the entry threshold and the tables. Together they make the design speed the comfortable maximum. Enforcement is the pavement's job, not the police's. [Reported]",
      },
      {
        id: "speed-table",
        name: "The speed table",
        note:
          "The mechanism, not a visual cue: the street surface rises to sidewalk height, so the cap is enforced by geometry a suspension has to negotiate rather than by a driver's compliance with a posted limit. The table converts the speed limit from a rule into a physical property of the street. [Well-established]",
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
        id: "door-zone",
        name: "The door zone",
        note:
          "The cyclist's usable width is not the painted width: subtract the arc of a parked car's door, and the lane narrows to a strip between an opening door and moving traffic. The distributor design eliminates this hazard class entirely — its buffer and lane position make dooring geometrically impossible, not merely less likely. Here, the paint records where a cyclist is supposed to be, not where it is safe to be. [Reported]",
      },
      {
        id: "painted-lane",
        name: "The painted bike lane",
        note:
          "No buffer — so the 'protection' is entirely a matter of driver attention and compliance. This is precisely the treatment Dutch doctrine rejects as insufficient above roughly 30 km/h: paint marks where a cyclist should be; it cannot influence where a car can go. Each of the three categories on the other cards exists because this arrangement was judged unacceptable at exactly these speeds. [Well-established]",
      },
      {
        id: "traffic-lanes",
        name: "The traffic lanes",
        note:
          "The real finding on this card: this street was not badly designed by accident. It was never assigned a category at all — the painted lane is cycling infrastructure as an add-on, not a street-type decision. The Dutch doctrine's actual export is not any single piece of geometry; it is the requirement that every street answer the classification question first. [Reported]",
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

/* The arterial baseline stays a generic composite; the documented US
   comparison is the intersection section. */
export const dcBaselineNote =
  "The conventional arterial is a generic composite baseline, not a specific sourced street; the documented US comparison lives in the intersection section below.";

/* ------------------------------------------------------------------ */
/* Phase 2 — The Junction, Imported (Davis / Mobycon).                 */
/* ------------------------------------------------------------------ */

export const dcIntersection = {
  title: "The Junction, Imported",
  intro:
    "Street categories are the Dutch export everyone can see. The subtler export is intersection geometry — and its documented American arrival has a date and an address: August 2015, Covell Boulevard and J Street, Davis, California. Proposed by City Councilmember Brett Lee and designed with the Dutch consulting firm Mobycon, it was the first protected intersection built in the United States. [Well-established]",
  geometry: [
    {
      name: "Corner refuge islands",
      text:
        "Four raised islands, one per corner, that block right-turning vehicles from cutting across the cyclist's path. The turning car is held to a wider, slower arc and meets the crossing at close to a right angle, with the cyclist in front of the windscreen rather than beside the mirror. [Well-established]",
    },
    {
      name: "Advanced stop lines",
      text:
        "The cyclist waits ahead of the stopped traffic, inside the driver's forward view. The sightline exists by geometry — neither party needs a shoulder check for the other to be seen. [Well-established]",
    },
    {
      name: "Setback crossings",
      text:
        "The bicycle crossing sits at least one car length back from the turning radius, so a turning driver completes the turn, straightens, and then meets the crossing — with a stopped car's length of reaction space between. [Well-established]",
    },
  ],
  lineage:
    "The American catalyst was not an agency but an explainer: Portland-based planner Nick Falbo's 2014 'protected intersection' video, viewed over 700,000 times, is widely credited with popularizing the Dutch geometry for a US audience. Salt Lake City followed Davis within months (October 2015), then Austin. NACTO's Urban Bikeway Design Guide did not originally include protected-intersection geometry — Alta Planning + Design did the adaptation work for the North American context. [Well-established]",
  complication:
    "The honest complication, from Davis's own bicycle-advocacy community: the intersection delivers its sightline benefit only to cyclists who actually use the separated path and its refuge islands. A cyclist riding the standard bike-lane approach gets a sightline no better than a conventional intersection. Protection that depends on route choice is a design gap, not a detail. [Reported] Single advocacy source, not independently corroborated.",
};

/* ------------------------------------------------------------------ */
/* Phase 2 — The Plateau (mode share).                                 */
/* ------------------------------------------------------------------ */

export const dcModeShare = {
  intro:
    "The infrastructure is old and the measurement is institutional. Tilburg and The Hague were among the earliest Dutch cities to build dedicated cycle routes, alongside Utrecht, Groningen, Enschede, Amsterdam, and Delft — and the country has been counting its cycling ever since. [Reported]",
  stats: [
    {
      label: "All Dutch trips",
      value: "27–28%",
      note: "National mode share, per KiM — the Dutch government's own transport-research institute. [Well-established]",
    },
    {
      label: "Amsterdam",
      value: "38%",
      note: "Multiple corroborating sources. [Well-established]",
    },
    {
      label: "Groningen",
      value: "up to 59%",
      note: "Traces to a single policy blog, not confirmed against KiM's primary data. [Reported]",
    },
    {
      label: "Davis, CA",
      value: "17–19%",
      note: "The highest US bike-commute share — in the same city that built the first Dutch junction. [Reported]",
    },
  ],
  plateau:
    "The sharper finding: the national share has been stable for roughly three decades — not still climbing. What has grown instead is cycling frequency and average trip distance per cyclist. That complicates the reflex that success means a rising percentage. A plateau at a very high level, sustained for thirty years through fuel shocks, e-bikes, and urban growth, may be the more meaningful marker of durability than continued growth would be. [Well-established]",
};

/* ------------------------------------------------------------------ */
/* Phase 2 — The Economics (peer-reviewed source only).                */
/* ------------------------------------------------------------------ */

export const dcEconomics =
  "From the peer-reviewed record only: a study quantifying the health-related economic benefits of Dutch cycling levels finds that continued investment in cycling infrastructure yields a high cost-benefit ratio — driven primarily by reduced sedentary-lifestyle disease and lower all-cause mortality risk, not by construction activity or tourism. Larger, rounder claims circulate (national jobs totals, billion-euro benefit ranges) that trace to unverifiable aggregation; they are deliberately absent from this report and this page. [Well-established]";

/* ------------------------------------------------------------------ */
/* Phase 2 — Key Insights.                                             */
/* ------------------------------------------------------------------ */

export const dcInsights = [
  {
    tag: "Categories, not dials",
    text:
      "This interactive is a card swap and not a slider because the doctrine is a card swap and not a slider: a Dutch street is classified — through-road, distributor, access road — and its design follows from the class. Safety was never a quantity you add to a street. It is a decision you make about one.",
  },
  {
    tag: "The plateau is the point",
    text:
      "Dutch cycling has held 27–28% of all trips for about three decades. It stopped growing and refused to shrink — through e-bikes, urban growth, and every disruption since. A share that high, held that long, is a stronger durability claim than a rising curve would be.",
  },
  {
    tag: "Protection you have to opt into",
    text:
      "Davis's own advocates note the first US protected intersection only delivers its sightlines to cyclists who use the refuge islands — the standard bike-lane approach sees no better than a conventional junction. Geometry that must be chosen is not yet a system; the Dutch versions work because there is no other way through.",
  },
  {
    tag: "The second-bicycle problem",
    text:
      "The report's Section 8 follows the success to its logistics bill: a bike-plus-train country needs a bicycle at both ends of the ride, so the system multiplies bicycles faster than people — and station parking, not street design, becomes the binding constraint. Solved street categories buy you a new category of problem. [Reported]",
  },
];

/* ------------------------------------------------------------------ */
/* Consistency guards — deterministic over static data and unguarded,  */
/* so a violation fails `next build` at prerender.                     */
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
      if (e.note.trim().length < 200 || e.note.trim().length > 1100) {
        throw new Error(
          `Dutch Cycling: element "${s.id}/${e.id}" note must carry Phase 2 depth (200–1100 chars).`,
        );
      }
    }
  }
  const requiredElements: [DcStreetId, string][] = [
    ["distributor", "buffer"],
    ["access-road", "speed-table"],
    ["access-road", "gateway"],
    ["conventional", "painted-lane"],
  ];
  for (const [street, el] of requiredElements) {
    if (!getDcStreet(street).elements.some((e) => e.id === el)) {
      throw new Error(
        `Dutch Cycling: "${street}" must include its category-defining "${el}" element.`,
      );
    }
  }
  /* The Sustainable Safety triple must all be represented somewhere. */
  const principles = new Set(
    dcStreets.flatMap((s) => s.elements.map((e) => e.principle)).filter(Boolean),
  );
  for (const p of ["Functionality", "Homogeneity", "Predictability"]) {
    if (!principles.has(p as DcPrinciple)) {
      throw new Error(
        `Dutch Cycling: the Sustainable Safety principle "${p}" must be carried by at least one element.`,
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
    /Amsterdam|Utrecht|Rotterdam|New York|London|Paris|Chicago|Los Angeles|Houston|Toronto|Davis/i.test(
      conventionalText,
    )
  ) {
    throw new Error(
      "Dutch Cycling: the arterial baseline must stay generic — the documented comparison belongs to the intersection section.",
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
  if (
    !dcBaselineNote.includes("generic") ||
    !dcBaselineNote.includes("intersection section")
  ) {
    throw new Error(
      "Dutch Cycling: the baseline caption must stay generic and point at the documented intersection comparison.",
    );
  }
  if (!getDcStreet("access-road").speed.includes("15")) {
    throw new Error(
      "Dutch Cycling: the access road must carry the specced 15–20 km/h cap.",
    );
  }
  /* Intersection section: the documented instance, complication
     honestly framed. */
  if (
    !dcIntersection.intro.includes("Davis") ||
    !dcIntersection.intro.includes("2015") ||
    !dcIntersection.intro.includes("Mobycon") ||
    !dcIntersection.intro.includes("Brett Lee")
  ) {
    throw new Error(
      "Dutch Cycling: the intersection intro must carry the documented Davis facts (2015, Mobycon, Brett Lee).",
    );
  }
  if (dcIntersection.geometry.length !== 3) {
    throw new Error(
      "Dutch Cycling: the intersection section must carry exactly the three documented geometry features.",
    );
  }
  if (
    !dcIntersection.complication.includes("[Reported]") ||
    !dcIntersection.complication.includes("Single advocacy source")
  ) {
    throw new Error(
      "Dutch Cycling: the Davis complication must stay tagged [Reported] with its single-source caveat stated.",
    );
  }
  if (
    !dcIntersection.lineage.includes("Falbo") ||
    !dcIntersection.lineage.includes("NACTO") ||
    !dcIntersection.lineage.includes("Alta Planning")
  ) {
    throw new Error(
      "Dutch Cycling: the lineage note must credit Falbo, NACTO's omission, and Alta Planning + Design.",
    );
  }
  /* Mode share: plateau finding + honest Groningen tagging. */
  if (dcModeShare.stats.length !== 4) {
    throw new Error("Dutch Cycling: the mode-share section carries four stats.");
  }
  const groningen = dcModeShare.stats.find((s) => s.label === "Groningen")!;
  if (!groningen.note.includes("[Reported]") || !groningen.note.includes("single policy blog")) {
    throw new Error(
      "Dutch Cycling: Groningen's figure must stay [Reported] with its single-source caveat.",
    );
  }
  if (!dcModeShare.plateau.includes("three decades")) {
    throw new Error(
      "Dutch Cycling: the plateau finding must state the three-decade stability.",
    );
  }
  /* Economics: peer-reviewed only; the aggregator figure and the
     uncorroborated demonstration-town claim are banned everywhere. */
  const allText = [
    dcQuestion,
    dcOrientation,
    dcDoctrineNote,
    dcBaselineNote,
    dcEconomics,
    dcIntersection.intro,
    dcIntersection.lineage,
    dcIntersection.complication,
    dcModeShare.intro,
    dcModeShare.plateau,
    ...dcIntersection.geometry.map((g) => g.name + g.text),
    ...dcModeShare.stats.map((s) => s.label + s.value + s.note),
    ...dcInsights.map((i) => i.tag + i.text),
    ...dcStreets.flatMap((s) => [
      s.name,
      s.term,
      s.summary,
      ...s.elements.map((e) => e.name + e.note),
    ]),
  ].join(" ");
  if (/13,000|€1\.2|3\.8 billion|demonstration town/i.test(allText)) {
    throw new Error(
      "Dutch Cycling: a banned claim surfaced — the aggregator economics figure and the demonstration-town framing must not appear anywhere.",
    );
  }
  if (!dcEconomics.includes("cost-benefit") || !dcEconomics.includes("[Well-established]")) {
    throw new Error(
      "Dutch Cycling: the economics paragraph must carry the peer-reviewed cost-benefit finding.",
    );
  }
  if (dcInsights.length !== 4) {
    throw new Error("Dutch Cycling: exactly four Key Insights.");
  }
  if (!dcInsights[0].text.includes("slider")) {
    throw new Error(
      "Dutch Cycling: the first insight must tie the doctrine to the card-swap mechanic explicitly.",
    );
  }
}
