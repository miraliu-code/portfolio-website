/*
 * MTR Wayfinding — "Follow the Sign" (Phases 1 + 2).
 *
 * NOT a floor plan (Airport Ecosystem and Changi own that form): a
 * signage-and-symbol interaction — a design-critique piece about
 * reading signs, not navigating rooms. The premise is deliberately
 * reframed away from admiration: not "why is this system so easy to
 * understand" but why a system with real, documented inconsistencies
 * still feels effortless.
 *
 * Phase 2 sourcing (see mtrSourcing, rendered on the page):
 *   - Keith Tam, "(in)visible (de)signs" (Medium / WordPress, April
 *     2013): the Central Station mixed-convention documentation
 *     (photographed first-hand) and the colour-coding critique
 *     (KCR-merger fuchsia/light blue vs the original palette).
 *     Expert observation on a personal platform.
 *   - MTR Corporation's own typeface publication + Zolima CityMag's
 *     MTR-at-45 design history: the custom Song-style face was drawn
 *     by designer Sammy Or (from 1978, ~200 characters, under MTR
 *     chief architect Roland Paoletti); the "city's spirit" framing
 *     is designer Freeman Lau's, quoted in translation. NOTE: the
 *     Phase 2 spec attributed the typeface TO Freeman Lau — research
 *     splits the credit: Or drew it, Lau supplied the cultural
 *     framing. Both appear below, correctly attributed, and a guard
 *     enforces the split.
 *   - Mosaic history corroborated across Zolima CityMag, Cathay's
 *     design feature, and academic work on MTR station colour
 *     schemes (Paoletti; one colour per station; tiles as cheap,
 *     abundant material; the 1970s literacy rationale).
 *   - The platform-disc false-friend reading (Paris/Tokyo/Beijing)
 *     remains this report's own comparative observation: [Reported].
 */

export const mtrQuestion =
  "Why does a signage system with real, documented inconsistencies still feel effortless to navigate?";

export const mtrOrientation =
  "Click a part of the sign to see what it's actually telling you — and where it breaks its own rules.";

/* ------------------------------------------------------------------ */
/* View 1 — the composite directional sign: six elements, each with    */
/* the Phase 2 three-part reading.                                     */
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
  /* The three-part reading: what it communicates / why it was
     designed that way / where it breaks or is limited. `breaks` is
     optional only where an element genuinely has no documented
     inconsistency to report (the exit letter). */
  says: string;
  why: string;
  breaks?: string;
}

export const mtrElements: MtrSignElement[] = [
  {
    id: "platform",
    name: "The numbered disc",
    locus: "Coloured circle, left of each row",
    says:
      "Which platform serves your direction. The number belongs to this station's architecture, not to the network — and the colour still speaks line-language: that red is Tsuen Wan Line red, wherever it appears. One symbol answers two questions: which service, and where to stand.",
    why:
      "The MTR gives its lines no numbers at all — they are named and coloured, never numbered — which frees the numeral inside the disc to mean something local: the platform. What softens the choice in practice is that platform assignments are fixed. A line's trains leave from the same numbered platform day after day, so the disc functions as a stable address; regulars stop reading the number entirely and ride on colour alone. [Reported]",
    breaks:
      "In Paris, Tokyo, and Beijing, this exact visual convention — a coloured disc with a numeral inside — identifies a LINE. A rider fluent in any of those three systems reads the symbol instantly, confidently, and wrongly. The mismatch rarely puts anyone on a wrong train, because the colour alone routes them correctly — but it is a standing false friend at the centre of the sign, and the system never warns you it is there. [Reported]",
  },
  {
    id: "line-name",
    name: "The line name",
    locus: "“Tsuen Wan Line” — direction by line",
    says:
      "The direction, named by LINE — the grammar the system's own route map teaches. It quietly asks you to hold the network in your head: to know which line goes where before the sign can help you.",
    why:
      "Because the colours came first, and names attached to them. The original palette was a closed, logical system of strong primaries a rider could tell apart at speed: green for Kwun Tong (1979), red for Tsuen Wan (1982), blue for Island (1985). Later lines were slotted between them — orange for Tung Chung, purple for Tseung Kwan O — and the Airport Express took a teal that already sits uneasily between the blue and the green. Naming directions by line keeps that colour logic doing the work. [Reported]",
    breaks:
      "The 2007 KCR merger imported two colours the palette never planned for: East Rail's light blue and West Rail's fuchsia. The design critique documenting this system flags the fuchsia as a real confusion risk — too close to the purple, and easy to mistake for the red or the blue at a glance. A palette that began as a closed system now carries inherited colours that break its own rules, and the line names inherit that ambiguity. [Reported]",
  },
  {
    id: "terminus",
    name: "The terminus",
    locus: "“Sheung Wan” — direction by final stop",
    says:
      "The same kind of direction, named by the line's final stop instead. Rich if you know the city's geography; nearly empty if you don't. It answers 'which way is my train' in a second language the same signage system also speaks in line names.",
    why:
      "Terminus-naming is the older railway convention — it is how railways everywhere labelled direction before metros had brands, and it needs no knowledge of the network map, only of the city. Paris runs on it entirely (direction Château de Vincennes); the MTR uses it selectively, mostly where a line's name would say less than its endpoint does. [Reported]",
    breaks:
      "The selectivity is the problem: Central mixes both grammars on its own directional signage, for trains running the same direction — the documented case in the second view of this interactive. Neither grammar is wrong; carrying both at the system's busiest interchange means a passenger following the words, rather than the colour, has to translate mid-journey. [Reported]",
  },
  {
    id: "exit-letter",
    name: "The exit letter",
    locus: "Lettered tiles on the yellow band",
    says:
      "A named way out. 'Exit A' — subdivided where it matters into A1, A2 — is a destination in its own right, listed on the sign the way places are.",
    why:
      "Leaving is statistically the hardest wayfinding problem in any station, and the MTR's answer is to make exits addressable. A hotel, a colleague, or a meeting invitation can send you to 'Exit B' — which moves the hardest navigation work off the sign and into the conversation that happens before the journey starts. The letters do quietly ask something of you: an exit letter is only as useful as the person who told it to you. [Reported]",
  },
  {
    id: "yellow-block",
    name: "The yellow block",
    locus: "Yellow-background / black-text band",
    says:
      "One message before any word is read: this is about LEAVING. Passengers travelling onward dismiss the block as background; passengers leaving lock onto it.",
    why:
      "Black-on-yellow is among the highest-contrast pairings available to a signage system — near-maximal luminance difference, legible at distance, in glare, and in degraded lighting. The MTR reserves it system-wide for exit information, so the colour itself performs the categorical work most systems assign to headings: yellow IS the exit category, everywhere, without exception. [Reported]",
    breaks:
      "The block's meaning is pure convention — nothing about yellow inherently says 'exit', and a first-time rider has to learn the code before the colour can pre-sort information for them. The pairing's power is also its dependency: it only works because the system never spends yellow-on-black on anything else. One departure from that discipline anywhere would tax the meaning everywhere. [Reported]",
  },
  {
    id: "chinese-label",
    name: "The Chinese label",
    locus: "Song/Ming-style characters, set above the English",
    says:
      "The station and line names in Chinese, set in a Song/Ming-style face — serifed, calligraphy-rooted — in a fixed bilingual rhythm: Chinese above, English below, every sign, everywhere.",
    why:
      "A cultural statement, not a typographic default. The custom face was drawn by designer Sammy Or — who joined the project in 1978 under MTR chief architect Roland Paoletti and built a roughly 200-character font on the printed script of the Song dynasty, horizontal strokes thickened for distance reading. Nearly every metro on earth sets its native script in a modern sans-serif; the MTR chose a bookish, calligraphic form instead. Designer Freeman Lau's framing of that choice, quoted in translation: the subway is a representation of the city's spirit, and a Ming face, with its calligraphic roots, best carries its Chinese cultural character. A values statement, set at platform scale. [Reported]",
    breaks:
      "The original font covered only the couple of hundred characters the young system needed — every extension since has had to extend the typeface itself, character by drawn character. The cultural choice created a standing maintenance obligation that a licensed sans would never have imposed. [Reported]",
  },
];

export function getMtrElement(id: MtrElementId): MtrSignElement {
  return mtrElements.find((e) => e.id === id)!;
}

export const mtrElementFieldLabels = {
  says: "What it tells you",
  why: "Why it reads this way",
  breaks: "Where it breaks its own rules",
} as const;

/* ------------------------------------------------------------------ */
/* Reading modes — unchanged from Phase 1.                             */
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
/* View 2 — Central Station, Live: Phase 2 replaces Phase 1's          */
/* illustrative reconstruction with the DOCUMENTED instance — the      */
/* sign content Keith Tam photographed at Central / Hong Kong Station  */
/* in April 2013: three directions named by line alongside three       */
/* named by terminus or stop, with platform discs applied to some      */
/* and not others. Board layout and numerals are stylized; the sign    */
/* content (names and which get platform indication) is as             */
/* documented. Dated where the network has since changed.              */
/* ------------------------------------------------------------------ */

export interface MtrCentralRow {
  zh: string;
  en: string;
  color: string;
  /* Platform discs as documented: present on some rows, absent on
     others — itself the second documented inconsistency. */
  platforms?: number[];
}

export interface MtrCentralGroup {
  id: "by-line" | "by-terminus";
  title: string;
  rows: MtrCentralRow[];
  note: string;
}

export const mtrCentralIntro =
  "Central Station is connected to Hong Kong Station by a paid pedestrian tunnel — effectively one interchange, four lines, the busiest node in the system. On its own directional signage, as documented in April 2013, some directions are named by LINE and others by TERMINUS or stop — side by side, for passengers standing in the same corridor. The two boards below reproduce that documented sign content (board layout and platform numerals stylized). Click either one.";

export const mtrCentralGroups: MtrCentralGroup[] = [
  {
    id: "by-line",
    title: "Named by line",
    rows: [
      { zh: "荃灣綫", en: "Tsuen Wan Line", color: "#c8332b", platforms: [1, 2] },
      { zh: "東涌綫", en: "Tung Chung Line", color: "#d97b28" },
      { zh: "迪士尼綫", en: "Disneyland Resort Line", color: "#cf6d9e" },
    ],
    note:
      "The line-naming grammar: to follow it, you need the map in your head — a line name only helps a passenger who already knows their destination is on it. Note the discs: the Tsuen Wan Line is given two platform numbers here, and the other two lines none at all. [Reported]",
  },
  {
    id: "by-terminus",
    title: "Named by terminus or stop",
    rows: [
      { zh: "上環", en: "Sheung Wan", color: "#1e5aa5", platforms: [3] },
      { zh: "機場", en: "Airport", color: "#0d7680" },
      { zh: "博覽館", en: "AsiaWorld-Expo", color: "#0d7680" },
    ],
    note:
      "The same signage system, steps away: directions named by where the train ends up. Sheung Wan — the Island Line's then-terminus — gets exactly one platform disc; the two Airport Express destinations get none. Two grammars and three platform-marking treatments, in one interchange. [Reported]",
  },
];

export const mtrCentralFindings = [
  {
    tag: "The naming inconsistency",
    text:
      "Same interchange, same corridor, two grammars: three directions named by line, three by terminus or stop. Passengers bound the same way can meet both conventions between concourse and platform. The system absorbs it because colour keeps answering the question even where the words change grammar mid-journey.",
  },
  {
    tag: "The platform-disc inconsistency",
    text:
      "The documented signs also apply the platform disc unevenly: two numbered discs for the Tsuen Wan Line, one for Sheung Wan, none for the rest. The sign system's most distinctive symbol — the numbered disc — is itself used inconsistently at the network's busiest station.",
  },
] as const;

export const mtrCentralDating =
  "As documented in April 2013. The network has since changed: Sheung Wan was the Island Line's western terminus only until the 2014 West Island Line extension — these trains now run to Kennedy Town — so terminus-named signage from that era no longer matches today's routing. [Dated]";

/* ------------------------------------------------------------------ */
/* Phase 2 — the mosaic layer (deep dive section).                     */
/* ------------------------------------------------------------------ */

export interface MtrMosaicStation {
  zh: string;
  en: string;
  /* Tile palette for the swatch rendering. */
  tiles: string[];
  /* Calligraphy ink over the tiles: dark on light palettes, light on
     dark — the real walls do the same. */
  ink: string;
  caption: string;
}

export const mtrMosaicIntro =
  "Under the identical concrete architecture of the early system, chief architect Roland Paoletti gave every station a single colour, executed in mosaic tile — a cheap, abundant material in the Hong Kong of the 1970s. The choice was economical first and identity second, and it quietly built the network's most underrated wayfinding layer: you can recognise your stop by sight alone, from a moving train, without reading anything.";

export const mtrMosaicLiteracy =
  "It was designed for exactly that. When the system opened in 1979, a substantial share of Hong Kong's riders could not comfortably read either official language — the colour-per-station scheme was not decoration on top of the signage, it was a parallel wayfinding channel for riders the signage could not serve. The oversized station-name calligraphy painted across the tile walls completes the pairing: one layer for readers, one for everyone.";

export const mtrMosaicRush =
  "This is why the Rush Hour reading mode ends where it does. Toggle it on the composite sign above and everything fades — line names, termini, exit letters, even the discs — except the mosaic swatch. That is the argument of this whole interactive in one interaction: the tile wall is the layer that works precisely when reading fails — under time pressure, in crowds, in unfamiliarity, or in a language you cannot read. The conditions that defeat text are the conditions the mosaic was built for.";

export const mtrMosaicStations: MtrMosaicStation[] = [
  {
    zh: "中環",
    en: "Central",
    tiles: ["#7c2f28", "#8a3a30", "#6f2a24", "#93453a"],
    ink: "#fffdf8",
    caption: "Deep red — the colour this interactive's swatch carries.",
  },
  {
    zh: "金鐘",
    en: "Admiralty",
    tiles: ["#4f8fc0", "#6aa3cf", "#3f7fb2", "#7db1d8"],
    ink: "#14181f",
    caption: "Sky blue, one stop east — adjacent stations, unmistakable apart.",
  },
  {
    zh: "彩虹",
    en: "Choi Hung",
    tiles: ["#c8332b", "#d97b28", "#e0b81f", "#3f7f4f", "#1e5aa5", "#6b4a94"],
    ink: "#14181f",
    caption:
      "The name means 'rainbow' — the tiles spell the station's own name in colour.",
  },
  {
    zh: "鑽石山",
    en: "Diamond Hill",
    tiles: ["#1d2126", "#2a2f36", "#171a1f", "#8d949e"],
    ink: "#fffdf8",
    caption:
      "Black flecked with silver — 'diamonds' in a hillside of dark tile.",
  },
];

/* ------------------------------------------------------------------ */
/* Phase 2 — around the world: NYC / London / Paris / DC, held to      */
/* 2–3 dimensions (line identity, platform-vs-line numbering,          */
/* script/typography) and a paragraph per city.                        */
/* ------------------------------------------------------------------ */

export interface MtrCityComparison {
  city: string;
  angle: string;
  text: string;
}

export const mtrCitiesIntro =
  "Three dimensions only — how each system names its lines, what its numerals mean, and what its typography carries — because that is where the MTR's choices stand out.";

export const mtrCities: MtrCityComparison[] = [
  {
    city: "New York",
    angle: "Numbers and letters ARE the lines",
    text:
      "The opposite pole. The A, the 7, the Q — the numeral or letter IS the line's identity, and colour merely groups trunk routes. A numbered disc on a New York sign can only mean a service, never a platform, which is exactly the reading habit the MTR's discs betray. Signage is monolingual and Helvetica-standardized — one script, one face, meaning carried almost entirely by words and letters.",
  },
  {
    city: "London",
    angle: "Named lines, a century of type-as-identity",
    text:
      "The MTR's closest cousin: lines carry names and colours — Bakerloo brown, Victoria light blue — and no numbers, so the numeral confusion cannot arise. Platforms are numbered but subordinate, rarely part of how directions are told. And London set the precedent the MTR followed in spirit: a proprietary typeface (Johnston, since 1916) as civic identity — the idea that a transit system's letters can belong to its city.",
  },
  {
    city: "Paris",
    angle: "The false friend's origin — and the terminus, done consistently",
    text:
      "The source of the collision: Métro lines are numbered, and a coloured disc with a numeral is the line itself — the exact symbol grammar the MTR repurposes for platforms. But Paris is also the consistency counter-example: direction is always given by terminus (direction Château de Vincennes), one grammar, system-wide. Paris uses the convention Central uses only sometimes — and uses it without exception.",
  },
  {
    city: "Washington, DC",
    angle: "Colour AS the name",
    text:
      "The minimal system: lines are their colours — Red, Orange, Blue — so name, colour, and identity collapse into one word. No line numbers, so no false friend; but also monolingual, austere signage in which colour does categorical work with almost no redundancy behind it. Where the MTR layers colour, two scripts, discs, and mosaic, DC bets nearly everything on the colour word alone.",
  },
];

/* ------------------------------------------------------------------ */
/* Phase 2 — Key Insights.                                             */
/* ------------------------------------------------------------------ */

export const mtrInsights = [
  {
    tag: "The false friend",
    text:
      "The same symbol — a coloured disc with a numeral — means LINE in Paris, Tokyo, and Beijing, and PLATFORM here. The most internationally fluent riders are the ones most confidently wrong, and they almost never find out, because colour quietly corrects for the words.",
  },
  {
    tag: "The documented inconsistency",
    text:
      "The system's busiest interchange names the same direction by line on some signs and by terminus on others, and applies its own platform discs unevenly — real, photographed, at Central. The system feels effortless anyway: redundancy, not consistency, is what actually holds it up.",
  },
  {
    tag: "The layer that works when text fails",
    text:
      "Each station's mosaic colour is the wayfinding layer that becomes essential under exactly the conditions that defeat text — rush, crowds, unfamiliarity, illiteracy. The MTR's most robust information channel contains no information a sign-maker would recognise: it is a wall, in a colour.",
  },
  {
    tag: "A values statement in type",
    text:
      "Setting the Chinese in a calligraphy-rooted Song face — drawn by Sammy Or, framed by Freeman Lau as carrying the city's spirit — when every peer system reached for a sans-serif, is a cultural argument conducted through letterforms. The most-read text in Hong Kong makes a daily case that heritage and modern infrastructure are not opposites.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Sourcing — firmed up per Phase 2.                                   */
/* ------------------------------------------------------------------ */

export const mtrSourcing =
  "Sourcing: the Central Station documentation and the colour-coding critique come from information designer Keith Tam's design writing ((in)visible (de)signs, April 2013) — expert observation, photographed first-hand, but a personal design-writing platform rather than an institutional record; the Central sign content here reproduces what he documented, with board layout and platform numerals stylized. The typeface story is corroborated by MTR Corporation's own typeface publication and Zolima CityMag's design history (Sammy Or's authorship under chief architect Roland Paoletti; Freeman Lau's 'city's spirit' framing, quoted in translation). The mosaic history is corroborated across Zolima CityMag, Cathay's design feature, and academic work on MTR station colour schemes. The platform-disc false-friend reading against Paris, Tokyo, and Beijing remains this report's own comparative observation — [Reported], not settled record.";

/* ------------------------------------------------------------------ */
/* Consistency guards — deterministic over static data and unguarded,  */
/* so a violation fails `next build` at prerender.                     */
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
  /* Phase 2 panels: substantial three-part readings. `breaks` is
     required everywhere an inconsistency is documented — only the
     exit letter may omit it. */
  for (const e of mtrElements) {
    if (e.says.trim().length < 80 || e.why.trim().length < 120) {
      throw new Error(
        `MTR Follow the Sign: element "${e.id}" has token-length panel content.`,
      );
    }
    if (e.id !== "exit-letter" && (!e.breaks || e.breaks.trim().length < 100)) {
      throw new Error(
        `MTR Follow the Sign: element "${e.id}" must carry a substantive "where it breaks" reading.`,
      );
    }
  }
  const platform = getMtrElement("platform");
  for (const city of ["Paris", "Tokyo", "Beijing"]) {
    if (!platform.breaks!.includes(city)) {
      throw new Error(
        `MTR Follow the Sign: the platform-disc reading must carry the ${city} false-friend finding.`,
      );
    }
  }
  const lineName = getMtrElement("line-name");
  for (const needle of ["Kwun Tong", "2007", "fuchsia"]) {
    if (!(lineName.why + lineName.breaks!).includes(needle)) {
      throw new Error(
        `MTR Follow the Sign: the line-name reading must carry the colour history ("${needle}" missing).`,
      );
    }
  }
  /* The typeface credit must stay split correctly: Sammy Or drew the
     face; Freeman Lau supplied the cultural framing. Conflating them
     (as the phase spec did) must fail the build. */
  const chinese = getMtrElement("chinese-label");
  if (
    !chinese.why.includes("Sammy Or") ||
    !chinese.why.includes("Freeman Lau") ||
    !chinese.why.includes("Roland Paoletti")
  ) {
    throw new Error(
      "MTR Follow the Sign: the typeface story must credit Sammy Or (design), Roland Paoletti (direction), and Freeman Lau (framing) — attribution may not be conflated.",
    );
  }
  /* Central view: the documented instance, exactly as sourced. */
  const byLine = mtrCentralGroups.find((g) => g.id === "by-line");
  const byTerminus = mtrCentralGroups.find((g) => g.id === "by-terminus");
  if (mtrCentralGroups.length !== 2 || !byLine || !byTerminus) {
    throw new Error(
      "MTR Follow the Sign: Central view must hold exactly the by-line and by-terminus boards.",
    );
  }
  const lineNames = byLine.rows.map((r) => r.en).join("|");
  const termNames = byTerminus.rows.map((r) => r.en).join("|");
  if (
    lineNames !== "Tsuen Wan Line|Tung Chung Line|Disneyland Resort Line" ||
    termNames !== "Sheung Wan|Airport|AsiaWorld-Expo"
  ) {
    throw new Error(
      "MTR Follow the Sign: Central boards must reproduce the documented April 2013 sign content exactly.",
    );
  }
  /* The documented platform-disc unevenness: 2 / none / none vs
     1 / none / none. */
  const discPattern = [...byLine.rows, ...byTerminus.rows].map(
    (r) => r.platforms?.length ?? 0,
  );
  if (discPattern.join(",") !== "2,0,0,1,0,0") {
    throw new Error(
      "MTR Follow the Sign: the documented platform-disc unevenness (2/0/0 and 1/0/0) must be preserved.",
    );
  }
  if (
    !mtrCentralIntro.includes("April 2013") ||
    !mtrCentralIntro.includes("stylized")
  ) {
    throw new Error(
      "MTR Follow the Sign: the Central intro must date the documentation and disclose the stylized presentation.",
    );
  }
  if (
    !mtrCentralDating.includes("2013") ||
    !mtrCentralDating.includes("Kennedy Town") ||
    !mtrCentralDating.includes("[Dated]")
  ) {
    throw new Error(
      "MTR Follow the Sign: the Central dating note must carry the 2013 documentation date and the Kennedy Town change, tagged [Dated].",
    );
  }
  if (mtrCentralFindings.length !== 2) {
    throw new Error(
      "MTR Follow the Sign: Central must carry both documented findings (naming + platform-disc).",
    );
  }
  /* Mosaic deep dive. */
  if (mtrMosaicStations.length < 3) {
    throw new Error(
      "MTR Follow the Sign: the mosaic section needs at least three station examples.",
    );
  }
  if (!mtrMosaicStations.some((s) => s.en === "Choi Hung")) {
    throw new Error(
      "MTR Follow the Sign: the mosaic section must include Choi Hung — the name-as-colour proof case.",
    );
  }
  if (!mtrMosaicRush.includes("Rush Hour")) {
    throw new Error(
      "MTR Follow the Sign: the mosaic section must explicitly tie back to the Rush Hour reading mode.",
    );
  }
  /* City comparison: exactly four, and TIGHT — the spec caps this at
     a paragraph or two per city, so an upper bound is guarded too. */
  const cityNames = mtrCities.map((c) => c.city).join("|");
  if (cityNames !== "New York|London|Paris|Washington, DC") {
    throw new Error(
      "MTR Follow the Sign: the comparison must cover exactly NYC, London, Paris, and DC.",
    );
  }
  for (const c of mtrCities) {
    if (c.text.trim().length < 150 || c.text.trim().length > 650) {
      throw new Error(
        `MTR Follow the Sign: the ${c.city} comparison must stay a tight paragraph (150–650 chars).`,
      );
    }
  }
  if (mtrInsights.length !== 4) {
    throw new Error("MTR Follow the Sign: exactly four Key Insights.");
  }
  /* Sourcing: personal-platform framing stays explicit; corroboration
     and the split typeface credit must be stated. */
  for (const needle of [
    "Keith Tam",
    "personal design-writing platform",
    "Sammy Or",
    "Freeman Lau",
    "stylized",
  ]) {
    if (!mtrSourcing.includes(needle)) {
      throw new Error(
        `MTR Follow the Sign: the sourcing note must include "${needle}".`,
      );
    }
  }
  const modeIds = mtrModes.map((m) => m.id);
  if (modeIds.join(",") !== "tourist,local,rush") {
    throw new Error(
      "MTR Follow the Sign: reading modes must be exactly Tourist, Local, Rush Hour.",
    );
  }
}
