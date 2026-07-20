/*
 * Public Transit as Information Design — Phase 1 (mechanic + structure).
 * Supports the Public Transit as Information Design essay (Design /
 * Systems Design, D-17).
 *
 * FAST BUILD, PLACEHOLDER CONTENT: every comparative caption below is
 * tagged [DRAFT] in a comment and will be replaced wholesale in the
 * dedicated content pass. The selector mechanic (4 cities × 4
 * information systems), the Tourist/Local reading toggle (the MTR
 * pattern, simplified to two states), and the illustration structure
 * are the deliverables of this phase — not the words.
 *
 * Altitude note vs. MTR Wayfinding: that piece reads ONE system's
 * actual signage up close; this one compares FOUR systems at a higher
 * level across four information types (maps, tickets, icons, digital).
 */

export const ptQuestion =
  "Good transit isn't just transportation. It's information.";

export const ptOrientation =
  "Choose a city and a system to compare. Toggle between how a tourist and a local read it.";

/* ------------------------------------------------------------------ */
/* Cities and dimensions.                                              */
/* ------------------------------------------------------------------ */

export type PtCityId = "tokyo" | "london" | "hong-kong" | "new-york";
export type PtDimensionId = "maps" | "tickets" | "icons" | "digital";
export type PtMode = "tourist" | "local";

export interface PtCity {
  id: PtCityId;
  name: string;
  /* Accent used by the illustrations. */
  accent: string;
}

export const ptCities: PtCity[] = [
  { id: "tokyo", name: "Tokyo", accent: "#c0392b" },
  { id: "london", name: "London", accent: "#1e4b8f" },
  { id: "hong-kong", name: "Hong Kong", accent: "#a04b3c" },
  { id: "new-york", name: "New York", accent: "#3c4756" },
];

export interface PtDimension {
  id: PtDimensionId;
  name: string;
}

export const ptDimensions: PtDimension[] = [
  { id: "maps", name: "Maps" },
  { id: "tickets", name: "Ticket Machines" },
  { id: "icons", name: "Icons & Symbols" },
  { id: "digital", name: "Digital & Announcements" },
];

export const ptModes: { id: PtMode; name: string; note: string }[] = [
  {
    id: "tourist",
    name: "Tourist",
    /* [DRAFT] placeholder — content pass pending. */
    note:
      "Reading everything: instructions, names, fare tables, every printed word. The tourist experiences the system as text — and meets its full information density head-on.",
  },
  {
    id: "local",
    name: "Local",
    /* [DRAFT] placeholder — content pass pending. */
    note:
      "Priority filtering: colour, shape, and position carry the route, and the words fall away. The local reads the same surfaces as pattern — most of the text no longer exists for them.",
  },
];

/* ------------------------------------------------------------------ */
/* Captions per city × dimension. ALL PLACEHOLDER — each entry is      */
/* tagged [DRAFT] and will be replaced in the dedicated content pass.  */
/* ------------------------------------------------------------------ */

export const ptCaptions: Record<PtCityId, Record<PtDimensionId, string>> = {
  tokyo: {
    /* [DRAFT] */
    maps: "A network drawn at maximum density: every operator, every line, every transfer on one sheet. The map assumes patience and rewards study — it is a document you learn, not a glance you take.",
    /* [DRAFT] */
    tickets: "The fare board hangs above the machine, not on it: you find your destination, read its price, then buy that price. The machine sells numbers; the wall carries the knowledge.",
    /* [DRAFT] */
    icons: "Pictograms standardized to the point of national infrastructure, paired with line bullets that carry a letter and a number each — the symbol system is itself a small language with a grammar.",
    /* [DRAFT] */
    digital: "Signage alternates scripts on a timer, and the platform display's real message is precision itself: the train arrives when the sign said it would, to the minute.",
  },
  london: {
    /* [DRAFT] */
    maps: "The Beck diagram: geometry over geography, forty-five-degree angles, and the river as the only concession to the real city above. The map's clarity is a century of editorial discipline.",
    /* [DRAFT] */
    tickets: "Contactless-first: the yellow reader is the interface and the bank card is the ticket. The machine still stands there — as the fallback for everyone the default no longer serves.",
    /* [DRAFT] */
    icons: "One mark does the anchoring: the roundel names the station, badges the entrance, and signs the platform. A single symbol carrying the work whole alphabets do elsewhere.",
    /* [DRAFT] */
    digital: "Amber dot-matrix and a countdown: '2 min' is the entire message. The board teaches riders to think in waits, not in timetables.",
  },
  "hong-kong": {
    /* [DRAFT] */
    maps: "A few thick lines and almost nothing else — the map's only drama is the interchange. Its restraint is the point: a network simple enough to hold in your head after one ride.",
    /* [DRAFT] */
    tickets: "The ticket disappeared into the Octopus card decades before the rest of the world caught up — the machine's main job now is topping up the thing that replaced it.",
    /* [DRAFT] */
    icons: "Bilingual pairing as a fixed rhythm — characters above, English below — and exit letters treated as destinations in their own right. (The MTR piece on this site reads this system up close.)",
    /* [DRAFT] */
    digital: "Platform doors turn the display into the platform's front page: next train, two scripts, and a countdown — read from behind glass, at a fixed distance, every time.",
  },
  "new-york": {
    /* [DRAFT] */
    maps: "A geographic compromise map carrying an ungeographic truth: many services, few trunks. The colours group routes that split apart exactly where a rider most needs them not to.",
    /* [DRAFT] */
    tickets: "Tap readers grafted onto century-old turnstiles: the newest interface in the system bolted to its oldest furniture. Transitions here happen in layers, never replacements.",
    /* [DRAFT] */
    icons: "Text-first signage in one typeface: the system explains itself in words, black bars, and Helvetica, and the coloured bullets do quiet duty as the only symbols in a written system.",
    /* [DRAFT] */
    digital: "Countdown clocks arrived decades after London's — and changed how the platform feels more than any renovation: the uncertain wait became a number.",
  },
};

/* Altitude note vs the MTR piece — rendered on the page. */
export const ptScopeNote =
  "A different altitude than MTR Wayfinding: that interactive reads one system's actual signage up close; this one compares four systems across four information types — maps, tickets, symbols, and displays.";

export const ptPhaseNote =
  "Phase 1 — this build proves the city/system selector and the Tourist/Local reading toggle. All comparative captions are placeholder drafts, to be replaced in a dedicated content pass, along with Key Insights and Continue Reading.";

/* ------------------------------------------------------------------ */
/* Consistency guards — deterministic over static data and unguarded.  */
/* ------------------------------------------------------------------ */
{
  if (ptCities.length !== 4 || ptDimensions.length !== 4) {
    throw new Error(
      "Transit Info: the mechanic is a 4-city × 4-dimension comparison.",
    );
  }
  for (const c of ptCities) {
    for (const d of ptDimensions) {
      const caption = ptCaptions[c.id]?.[d.id];
      if (!caption || caption.trim().length < 60) {
        throw new Error(
          `Transit Info: missing or token caption for ${c.id}/${d.id}.`,
        );
      }
    }
  }
  if (ptModes.length !== 2 || ptModes[0].id !== "tourist" || ptModes[1].id !== "local") {
    throw new Error(
      "Transit Info: the reading toggle is exactly Tourist/Local (the simplified MTR pattern).",
    );
  }
  if (!ptPhaseNote.includes("placeholder")) {
    throw new Error(
      "Transit Info: the phase note must disclose the placeholder content on the page.",
    );
  }
  if (!ptScopeNote.includes("MTR Wayfinding")) {
    throw new Error(
      "Transit Info: the scope note must distinguish this piece from the MTR interactive.",
    );
  }
}
