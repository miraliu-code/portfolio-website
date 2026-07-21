/*
 * Changi Airport Experience — data.
 * A specific, real airport — not a composite. Where Airport Ecosystem
 * asks "who runs this, and where does coordination break down?", this
 * piece asks "what philosophy of travel does this place embody?" —
 * design-focused and behavioral, deliberately narrower: a floor map,
 * click a space, the panel explains why it exists. No organization
 * layer, no cross-highlighting, by intent.
 *
 * The four fields differ from Airport Ecosystem's on purpose:
 * Design intent / Behavioral effect / Sensory detail / Tradeoff.
 * Tradeoff is mandatory on every zone and must name a real, specific
 * cost — the guard at the bottom of this file enforces its presence,
 * because that field is what keeps this piece from reading as
 * brochure copy.
 */

export const cxQuestion =
  "Why does Changi feel fundamentally different from most airports?";

export const cxOrientation = "Click a space to see why it was built this way.";

export interface CxDetail {
  designIntent: string;
  behavioralEffect: string;
  sensoryDetail: string;
  tradeoff: string;
}

export interface CxZone {
  id: string;
  name: string;
  detail: CxDetail;
}

export const cxZones: CxZone[] = [
  {
    id: "immigration",
    name: "Immigration / Arrival Hall",
    detail: {
      designIntent:
        "The first few minutes after landing are treated as the moment that sets a traveler's entire impression of the country, not just the airport, so the hall is designed to feel like arrival somewhere specific, not a generic processing checkpoint.",
      behavioralEffect:
        "Ceiling height, natural light, and greenery visible even before you clear immigration measurably lower the tension most travelers carry off a long flight; the queue feels shorter than its actual wait time.",
      sensoryDetail:
        "Living plant walls are positioned at eye level in the queue itself, not just in decorative peripheral areas: a deliberate choice to put something alive directly in your sightline during the most tedious part of arrival.",
      tradeoff:
        "Maintaining living walls at this scale requires a dedicated horticulture staff and climate control most airports would consider an unjustifiable operating cost for a space passengers move through once.",
    },
  },
  {
    id: "jewel",
    name: "Jewel / Rain Vortex",
    detail: {
      designIntent:
        "The world's tallest indoor waterfall was built inside an airport not primarily for travelers, but to give Singapore a genuine non-flying destination, turning transit infrastructure into a place people visit on purpose.",
      behavioralEffect:
        "The vortex is visible from multiple terminal levels before you ever reach it, functioning as a landmark that makes wayfinding intuitive without needing to rely on signage alone.",
      sensoryDetail:
        "The sound of falling water is audible well before the vortex is visible, and it's loud enough to mask terminal noise on its own: an acoustic design choice as much as a visual one.",
      tradeoff:
        "Jewel is, commercially, a shopping mall wrapped around a waterfall, and its retail draws the same complaint leveled at any airport that turns transit space into a mall: it's easy to overspend on a layover you didn't plan to spend money on.",
    },
  },
  {
    id: "transit",
    name: "Transit Areas",
    detail: {
      designIntent:
        "Long layovers are treated as a design problem to solve, not a captive-audience monetization opportunity; free city tours and transit hotels exist specifically so a long layover doesn't feel wasted.",
      behavioralEffect:
        "The option to leave the terminal on a free tour (for qualifying layovers) changes how travelers relate to a long wait; it becomes a choice rather than an imposition.",
      sensoryDetail:
        "Rest areas use lower, warmer lighting than the rest of the terminal, and are acoustically separated enough that you can genuinely sleep, not just doze in a chair.",
      tradeoff:
        "Transit perks like the free city tour require Singapore-specific visa flexibility most countries don't extend, so the experience isn't fully replicable elsewhere even with equivalent airport investment.",
    },
  },
  {
    id: "gardens",
    name: "Terminal Gardens (Sunflower / Orchid)",
    detail: {
      designIntent:
        "Placing real, actively maintained gardens throughout the terminal is meant to counter the disorientation of being in a climate-controlled, windowless environment for hours: a reminder of a real season and place even mid-transit.",
      behavioralEffect:
        "Travelers consistently pause at these gardens mid-walk, even when not tired or lost: an unplanned break point that naturally slows the pace of moving through the terminal.",
      sensoryDetail:
        "The Sunflower Garden's plants are rotated seasonally, so a returning frequent flyer sees a genuinely different space on each visit, not a static installation.",
      tradeoff:
        "Live gardens at this scale require constant specialist upkeep that only a national flagship airport with Changi's specific funding model can sustain indefinitely.",
    },
  },
  {
    id: "retail",
    name: "Retail / Dining",
    detail: {
      designIntent:
        "Local Singaporean food stalls are deliberately mixed in alongside international chains, treating the airport as a genuine introduction to the country's food culture rather than a generic duty-free corridor.",
      behavioralEffect:
        "Seeing recognizably local food options (not just Western fast food) shifts how international transit passengers perceive the country before they've even left the airport.",
      sensoryDetail:
        "Food court seating is positioned with sightlines to greenery or the Jewel wherever possible; dining areas are rarely enclosed in a way that feels purely transactional.",
      tradeoff:
        "This is still, functionally, an airport retail environment: prices carry the same captive-audience premium as any other airport, local stalls included.",
    },
  },
  {
    id: "attractions",
    name: "Free Attractions (Movie Theater, Rooftop Pool)",
    detail: {
      designIntent:
        "Free amenities exist to actively change what \"waiting at an airport\" means, reframing dead time as an opportunity rather than a cost to be endured.",
      behavioralEffect:
        "Knowing a free pool or movie theater exists changes how travelers plan connection times; some passengers deliberately book longer layovers at Changi specifically to use these amenities.",
      sensoryDetail:
        "The rooftop pool is positioned with direct views of aircraft on the tarmac; the airport experience isn't hidden or minimized, it's incorporated directly into the amenity.",
      tradeoff:
        "These amenities function, in part, as brand marketing for Singapore and its airline: genuinely generous to travelers, and also a soft-power investment with a real return the airport authority is counting on.",
    },
  },
  {
    id: "butterfly",
    name: "Butterfly Garden (T3)",
    detail: {
      designIntent:
        "A live butterfly enclosure inside a terminal is an unambiguous statement of intent: Changi is willing to build infrastructure that serves delight and curiosity with no direct throughput benefit at all.",
      behavioralEffect:
        "Travelers routinely detour from their gate walk to see it, even with limited connection time: a rare case of an airport successfully competing with a passenger's own schedule anxiety.",
      sensoryDetail:
        "Humidity and temperature inside the enclosure are kept noticeably different from the rest of the terminal; you physically feel the transition into the space, not just see it.",
      tradeoff:
        "A live butterfly population requires specialist ecological maintenance with zero commercial return: a cost most airport operators would never approve without Changi's specific mandate to prioritize brand experience over strict cost-per-square-foot logic.",
    },
  },
  {
    id: "rest",
    name: "Rest & Sleep Areas",
    detail: {
      designIntent:
        "Recognizing that sleep quality directly shapes how a traveler remembers an entire journey, Changi treats rest infrastructure as seriously as its retail infrastructure.",
      behavioralEffect:
        "Genuinely quiet, dimly lit rest zones reduce the visible sprawl of travelers sleeping on gate-area floor space that defines many other major airports.",
      sensoryDetail:
        "Some rest areas use white noise generated specifically to mask nearby foot traffic and announcements, rather than just lowering ambient terminal volume.",
      tradeoff:
        "The best of these spaces (nap cabins, day-use hotel rooms) are paid, not free, meaning genuinely restorative rest is still class-stratified even inside an airport known for hospitality.",
    },
  },
];

/* Field labels in render order. Tradeoff renders last, with the
   accent treatment — it is the counterweight field. */
export const cxDetailFields: { key: keyof CxDetail; label: string }[] = [
  { key: "designIntent", label: "Design intent" },
  { key: "behavioralEffect", label: "Behavioral effect" },
  { key: "sensoryDetail", label: "Sensory detail" },
  { key: "tradeoff", label: "Tradeoff" },
];

/* Key Insights — pulled from the panel content, ending on the
   soft-power tradeoff so the piece doesn't close on pure celebration. */
export const cxInsights: { tag: string; text: string }[] = [
  {
    tag: "Jewel",
    text: "The world's tallest indoor waterfall wasn't built primarily for travelers; it was built to give Singapore a genuine non-flying destination, turning transit infrastructure into a place people visit on purpose.",
  },
  {
    tag: "Butterfly Garden",
    text: "A live butterfly enclosure serves delight and curiosity with no direct throughput benefit at all: infrastructure most airport operators would never approve, and an unambiguous statement of what Changi thinks an airport is for.",
  },
  {
    tag: "The Return",
    text: "The generosity is real, and it is also soft power: free pools and movie theaters function in part as brand marketing for Singapore and its airline, an investment with a return the airport authority is counting on.",
  },
];

export function getCxZone(id: string): CxZone | null {
  return cxZones.find((z) => z.id === id) ?? null;
}

/* ------------------------------------------------------------------ */
/* Consistency guard. Deterministic over static data and unguarded,    */
/* so a violation fails `next build` at prerender: every zone must     */
/* carry all four fields, and Tradeoff must be substantive — it is     */
/* the field that keeps this piece from reading as brochure copy.      */
/* ------------------------------------------------------------------ */
for (const zone of cxZones) {
  for (const { key, label } of cxDetailFields) {
    if (!zone.detail[key] || zone.detail[key].trim().length === 0) {
      throw new Error(
        `Changi Experience: zone "${zone.id}" is missing the "${label}" field.`,
      );
    }
  }
  if (zone.detail.tradeoff.trim().length < 80) {
    throw new Error(
      `Changi Experience: zone "${zone.id}" has a token Tradeoff — the field must name a real, specific cost.`,
    );
  }
}
