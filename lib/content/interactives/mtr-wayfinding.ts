/*
 * MTR Wayfinding — "Follow the Sign" (Phase 1).
 * Replaces the placeholder beta interactive entirely.
 *
 * NOT a floor plan (Airport Ecosystem and Changi own that form): this
 * is a signage-and-symbol interaction — a design-critique piece about
 * reading signs, not navigating rooms. The premise is deliberately
 * reframed away from admiration: not "why is this system so easy to
 * understand" but why a system with real, documented inconsistencies
 * still feels effortless — the China Plus One India pattern, applied
 * to signage.
 *
 * Phase 1 scope: the composite directional sign with six clickable
 * elements (short single-paragraph notes), the Central Station
 * naming-inconsistency comparison view, and the Tourist / Local /
 * Rush Hour reading-mode toggle with the platform-mosaic swatch.
 * Phase 2 adds full panel content, the mosaic deep dive, typography,
 * the four-city comparison, and Key Insights.
 *
 * Sourcing (see mtrSourcing, rendered on the page): the colour-coding
 * history and the Central Station inconsistency trace principally to
 * Keith Tam's design writing — expert but personal-platform sourcing,
 * to be firmed up before Phase 2.
 */

export const mtrQuestion =
  "Why does a signage system with real, documented inconsistencies still feel effortless to navigate?";

export const mtrOrientation =
  "Click a part of the sign to see what it's actually telling you — and where it breaks its own rules.";

/* ------------------------------------------------------------------ */
/* View 1 — the composite directional sign.                            */
/* Modeled on a busy four-line interchange context (Central / Hong     */
/* Kong Station: Tsuen Wan, Island, Tung Chung, Airport Express).      */
/* ------------------------------------------------------------------ */

export type MtrElementId =
  | "platform"
  | "line-name"
  | "terminus"
  | "exit-letter"
  | "yellow-block"
  | "chinese-label";

export interface MtrSignElement {
  id: MtrElementId;
  name: string;
  /* Where on the sign this element lives — panel sub-heading. */
  locus: string;
  /* Phase 1: one paragraph per element. Full four-field-style content
     arrives in Phase 2. */
  note: string;
}

export const mtrElements: MtrSignElement[] = [
  {
    id: "platform",
    name: "The numbered disc",
    locus: "Coloured circle, left of each row",
    note:
      "The sharpest false friend on this sign. In Paris, Tokyo, and Beijing, this exact visual convention — a coloured disc with a numeral inside — identifies a LINE. Here it identifies a PLATFORM: the number belongs to this station's architecture, not to the network. The colour still speaks line-language (that red is Tsuen Wan Line red), so a rider fluent in three other metro systems reads the symbol instantly, confidently, and wrongly — and usually never notices, because the colour alone routes them correctly anyway. [Reported]",
  },
  {
    id: "line-name",
    name: "The line name",
    locus: "“Tsuen Wan Line” — direction by line",
    note:
      "One of two naming grammars in live use on this system. “Tsuen Wan Line” names a direction by the LINE, which quietly asks you to hold the network map in your head — to know which line goes where before the sign can help you. It is the grammar the system's own route map teaches. The other grammar appears one row down, on the same sign. [Reported]",
  },
  {
    id: "terminus",
    name: "The terminus",
    locus: "“Sheung Wan” — direction by final stop",
    note:
      "The second grammar: naming a direction by the line's terminus. Rich if you know the city's geography; nearly empty if you don't. Line-naming and terminus-naming answer the same question — which way is my train — in two different languages, and Central uses both, sometimes for trains going the same direction. The second view of this interactive reconstructs that documented conflict side by side. [Reported]",
  },
  {
    id: "exit-letter",
    name: "The exit letter",
    locus: "Lettered tiles on the yellow band",
    note:
      "Leaving is statistically the hardest wayfinding problem in any station, and the MTR's answer is to make exits named destinations in their own right. “Exit A” is a place — something a hotel, a colleague, or a meeting invitation can send you to — which moves the hardest navigation work off the sign and into the conversation that happens before the journey starts. [Well-established]",
  },
  {
    id: "yellow-block",
    name: "The yellow block",
    locus: "Yellow-background / black-text band",
    note:
      "A sentence spoken entirely in colour. Yellow-on-black, systemwide, means “this is about leaving the system” — before a single word is read, the block has already sorted its readers. Passengers travelling onward dismiss it as background; passengers leaving lock onto it. It is a background colour doing the categorical work most systems assign to headings. [Reported]",
  },
  {
    id: "chinese-label",
    name: "The Chinese label",
    locus: "Song/Ming-style characters, set above the English",
    note:
      "The Chinese is set in a Song/Ming-style face — a serifed, bookish typeface family that almost no metro system would put on signage, where bold sans-serif is the near-universal reflex. On the MTR it is a deliberate house choice, and it deserves the typography deep-dive that arrives in Phase 2. For now, notice the fixed rule it lives inside: Chinese above, English below — one bilingual rhythm, every sign, everywhere. [Reported]",
  },
];

export function getMtrElement(id: MtrElementId): MtrSignElement {
  return mtrElements.find((e) => e.id === id)!;
}

/* ------------------------------------------------------------------ */
/* Reading modes — the same sign consumed three different ways.        */
/* The smaller, focused sibling of Professional Norms' lens            */
/* re-clustering and China Plus One's sector toggle.                   */
/* ------------------------------------------------------------------ */

export type MtrMode = "rest" | "tourist" | "local" | "rush";

export interface MtrModeSpec {
  id: Exclude<MtrMode, "rest">;
  name: string;
  note: string;
}

export const mtrModes: MtrModeSpec[] = [
  {
    id: "tourist",
    name: "Tourist",
    note:
      "Reading word by word. Every text element is doing work — line names, termini, exit letters — and the shapes recede to background. This is the sign read the slow way, the first-visit way.",
  },
  {
    id: "local",
    name: "Local",
    note:
      "Pattern-matching. A regular rider has stopped reading: colour and shape carry the route — red disc, yellow band, arrow — and the words have become texture. The text is still there; it is simply no longer being consumed.",
  },
  {
    id: "rush",
    name: "Rush Hour",
    note:
      "Under real time pressure, even shape-reading collapses to the fastest signal available: the platform mosaic. Station tile colour reads from a moving train and across a crowded platform — when it matters most, nobody is reading the sign at all.",
  },
];

export const mtrModeRestNote =
  "The sign at rest — no reading mode applied. Choose one to see the same sign consumed three different ways.";

/* ------------------------------------------------------------------ */
/* View 2 — Central Station, Live: the documented inconsistency.       */
/* ------------------------------------------------------------------ */

export interface MtrCentralSign {
  id: "by-line" | "by-terminus";
  heading: string;
  zh: string;
  en: string;
  note: string;
}

export const mtrCentralIntro =
  "The documented inconsistency at Central / Hong Kong Station: some directional signage names where a train is going by LINE, while other signage in the same interchange names it by TERMINUS — for trains running the same direction. The two signs below are illustrative reconstructions of those two real conventions, built to show the documented pattern side by side — not reproductions of specific photographed installations. Click either one.";

export const mtrCentralSigns: MtrCentralSign[] = [
  {
    id: "by-line",
    heading: "The line-naming convention",
    zh: "港島綫",
    en: "Island Line",
    note:
      "The first convention: direction named by line. To follow it, you need the map in your head — “Island Line” only helps a passenger who already knows their destination is on it. [Reported]",
  },
  {
    id: "by-terminus",
    heading: "The terminus-naming convention — same trains",
    zh: "往上環",
    en: "To Sheung Wan",
    note:
      "The second convention: the same direction named by terminus instead. Neither sign is wrong; they are two grammars for one fact — and a passenger following the words, rather than the colour, has to translate between them mid-journey. [Reported] One period detail in this reconstruction: Sheung Wan was the Island Line's western terminus only until the 2014 West Island Line extension — these trains now run to Kennedy Town. [Dated]",
  },
];

export const mtrCentralFinding =
  "In the reconstruction as in the station: both signs point to the same westbound Island Line trains. The system absorbs its own inconsistency because colour — the Island Line blue carried on both signs — keeps answering the question even where the words disagree.";

/* ------------------------------------------------------------------ */
/* Sourcing note — the Hofstede-lineage-note pattern from              */
/* Professional Norms, applied to this interactive's key source.       */
/* ------------------------------------------------------------------ */

export const mtrSourcing =
  "Sourcing note: the colour-coding history and the Central Station naming inconsistency presented here trace principally to Keith Tam — a Hong Kong-based information designer and academic who has written specifically and critically about MTR signage. A genuine expert source, but a personal design-writing platform rather than an institutional or peer-reviewed one. The paired Central signs in this interactive are illustrative reconstructions of the two conventions he documents, not reproductions of photographed signage. These claims will be firmed up with additional sourcing before Phase 2's fuller content; read them as expert observation, not settled record.";

export const mtrPhaseNote =
  "Phase 1 — this build proves the signage-board interaction and the reading-mode toggle. Full element content, the mosaic-tile deep dive, the Song-typeface story, the Central Station comparison in full, the NYC/London/Paris/DC comparison, and Key Insights arrive in Phase 2.";

/* ------------------------------------------------------------------ */
/* Consistency guards — deterministic over static data and unguarded,  */
/* so a violation fails `next build` at prerender:                     */
/* 1. exactly the six specced sign elements, in board order;           */
/* 2. the platform note must carry the Paris/Tokyo/Beijing false-      */
/*    friend finding even in Phase 1's shortened content;              */
/* 3. no element note is token-length;                                 */
/* 4. the Central view holds exactly the two documented conventions    */
/*    (line vs terminus) and its finding names the shared direction;   */
/* 5. the sourcing note names Keith Tam and its personal-platform      */
/*    status — expert observation must not silently harden into        */
/*    settled record.                                                  */
/* ------------------------------------------------------------------ */
{
  const expectedIds: MtrElementId[] = [
    "platform",
    "line-name",
    "terminus",
    "exit-letter",
    "yellow-block",
    "chinese-label",
  ];
  if (
    mtrElements.length !== expectedIds.length ||
    !expectedIds.every((id, i) => mtrElements[i].id === id)
  ) {
    throw new Error(
      "MTR Follow the Sign: the six sign elements must match the spec, in order.",
    );
  }
  const platform = getMtrElement("platform").note;
  for (const city of ["Paris", "Tokyo", "Beijing"]) {
    if (!platform.includes(city)) {
      throw new Error(
        `MTR Follow the Sign: the platform-disc note must carry the ${city} false-friend finding — it is the sharpest finding and must not wait for Phase 2.`,
      );
    }
  }
  for (const e of mtrElements) {
    if (e.note.trim().length < 140) {
      throw new Error(
        `MTR Follow the Sign: element "${e.id}" has a token-length note.`,
      );
    }
  }
  const conventions = mtrCentralSigns.map((s) => s.id).sort();
  if (
    mtrCentralSigns.length !== 2 ||
    conventions[0] !== "by-line" ||
    conventions[1] !== "by-terminus"
  ) {
    throw new Error(
      "MTR Follow the Sign: Central view must hold exactly the line-named and terminus-named signs.",
    );
  }
  if (!mtrCentralFinding.includes("same westbound Island Line trains")) {
    throw new Error(
      "MTR Follow the Sign: the Central finding must state that both signs serve the same trains.",
    );
  }
  for (const s of mtrCentralSigns) {
    if (s.note.trim().length < 100) {
      throw new Error(
        `MTR Follow the Sign: Central sign "${s.id}" has a token-length note.`,
      );
    }
  }
  if (
    !mtrSourcing.includes("Keith Tam") ||
    !mtrSourcing.includes("personal design-writing platform")
  ) {
    throw new Error(
      "MTR Follow the Sign: the sourcing note must name Keith Tam and its personal-platform status.",
    );
  }
  /* The paired Central signs are constructed illustrations of the
     documented PATTERN, not sourced reproductions of specific
     installations — the framing must say so, on the page, in both
     the intro and the sourcing note, and the terminus sign must
     carry its pre-2015 dating. */
  if (!mtrCentralIntro.includes("illustrative reconstructions")) {
    throw new Error(
      "MTR Follow the Sign: the Central intro must label the paired signs as illustrative reconstructions of the documented pattern.",
    );
  }
  if (!mtrSourcing.includes("illustrative reconstructions")) {
    throw new Error(
      "MTR Follow the Sign: the sourcing note must disclose that the Central signs are reconstructions, not photographed signage.",
    );
  }
  const terminusSign = mtrCentralSigns.find((s) => s.id === "by-terminus")!;
  if (
    !terminusSign.note.includes("[Dated]") ||
    !terminusSign.note.includes("Kennedy Town")
  ) {
    throw new Error(
      "MTR Follow the Sign: the terminus sign must carry its pre-2015 dating (Sheung Wan → Kennedy Town, 2014 extension).",
    );
  }
  const modeIds = mtrModes.map((m) => m.id);
  if (modeIds.join(",") !== "tourist,local,rush") {
    throw new Error(
      "MTR Follow the Sign: reading modes must be exactly Tourist, Local, Rush Hour.",
    );
  }
}
