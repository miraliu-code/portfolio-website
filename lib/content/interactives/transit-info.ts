/*
 * Public Transit as Information Design — full content pass.
 * Supports the Public Transit as Information Design essay (Design /
 * Systems Design, D-17).
 *
 * TWO THROUGHLINES, NOT EQUAL (the piece's structure):
 *   - PRIMARY SPINE (Maps, Ticketing, Announcements): fragmentation
 *     and incentives — the same multiple-operator condition produces
 *     unified outcomes in some dimensions and fragmented ones in
 *     others, depending on whether cooperation grows or dilutes each
 *     operator's individual interest.
 *   - COUNTERPOINT (Icons & Symbols only): a different argument —
 *     "universal" design is never actually neutral. Deliberately NOT
 *     forced onto the fragmentation spine.
 *
 * Provenance rules enforced by the guards below (do not weaken):
 *   - NYC 1972 map credit keeps Joan Charysyn visible — never
 *     reduced to "Vignelli's map".
 *   - Tokyo ticketing states the real mechanism: Suica (2001) was JR
 *     East's own card; the one-card reality is the March 2007 PASMO
 *     launch + negotiated Suica–PASMO interoperability. "Suica works
 *     across all operators" is the error a Tokyo reader catches.
 *   - Octopus's superlative is "first SYSTEM-WIDE integrated
 *     contactless smartcard" — Seoul's U-Pass (buses only until
 *     2000) holds the narrower "first contactless farecard" claim;
 *     the two are never compressed.
 *   - The AIGA/DOT set was drawn by Cook and Shanosky; Vignelli sat
 *     on the committee — the drawing credit stays visible.
 *   - The Isotype default-figure critique is attributed in-text to
 *     Asja Keeman (via Futuress) and tagged [Reported] — a named
 *     critical position, not the Atlas's own voice.
 *   - "Mind the gap" origin is "entered use in the late 1960s"; the
 *     recording-session story is one widely-repeated account.
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
    note:
      "How an unfamiliar rider reads: every word, in order: instructions, names, fare tables. Text density is the tourist's whole experience of the system, because nothing can be skipped when nothing is yet pattern.",
  },
  {
    id: "local",
    name: "Local",
    note:
      "How a practiced rider reads: colour, shape, and position, with almost no text at all. Vignelli's diagnosis of his rejected New York map lives in this toggle: riders wanted tourist-mode information inside what was designed as a local-mode diagram. [Well-established]",
  },
];

/* ------------------------------------------------------------------ */
/* Per-dimension framing lines — the spine, and the counterpoint.      */
/* ------------------------------------------------------------------ */

export const ptDimensionNotes: Record<PtDimensionId, string> = {
  maps:
    "The variable underneath this dimension: how many hands hold the system. One authority redrew London in a stroke; a dozen-plus operators keep Tokyo's map divided; New York's single authority argued with itself for fifty years.",
  tickets:
    "The spine's clearest test: the same fragmented operators who will not share a map will share a payment layer, when the incentive runs the other way.",
  icons:
    "A deliberate counterpoint: the tension in this dimension isn't operator fragmentation at all. It is that 'universal' symbols are never actually neutral; every neutral figure is somebody's default.",
  digital:
    "The most intimate layer of the comparison: what a system says out loud, and how. Twice here, a safety fix became culture, and once, audibly, it didn't.",
};

/* ------------------------------------------------------------------ */
/* Captions per city × dimension — the sourced content pass.           */
/* ------------------------------------------------------------------ */

export const ptCaptions: Record<PtCityId, Record<PtDimensionId, string>> = {
  tokyo: {
    maps: "Tokyo's map is fragmented by ownership, not by bad design. A dozen-plus operators (Tokyo Metro, Toei, JR East, and private railways like Tokyu, Keio, and Odakyu) each hold a real commercial incentive not to unify it: private lines market the destinations along their own tracks as part of their brand, so a single map would serve riders better and dilute every company's identity. The 'confusing' map is a rational business outcome; maps are tools, not neutral explanations. It took the transport ministry, not the market, to push station maps toward a standard ahead of the 2020 Olympics. [Well-established]",
    tickets: "The keystone of this whole comparison: the operators who refused to unify their maps did unify their payment, because the incentive ran the other way. Not in one step: Suica (2001) was JR East's own card and did not cover the other operators; PASMO (2007) was the private-railway and subway consortium's answer. 'Greater Tokyo on one card' is a March 2007 achievement: two competing cards whose owners negotiated interoperability, jointly testing some 1.23 billion fare patterns to make it hold. The map stayed divided; the harder engineering got shared. [Well-established]",
    icons: "Where the modern pictogram style was born: the Tokyo 1964 Olympics, designing for a global audience across a language barrier, pioneered the reductive geometric figures that Munich 1972 refined and the world adopted. This dimension is the piece's deliberate counterpoint. The tension here isn't operator fragmentation but a subtler one: a symbol built to work for everyone is still drawn by someone, from someone's defaults. [Well-established]",
    digital: "Hassha merodii: five-to-ten-second departure melodies, one per station. A precursor came on Keihan Railway in 1971; the modern computerized form was introduced by JR East in 1989 at Shinjuku and Shibuya with Yamaha and composer Hiroaki Ide. They are safety engineering, not decoration: written to calm the dangerous last-second boarding rush (kakekomi josha), to aid visually-impaired riders, and to retire harsh buzzers. Composer Minoru Mukaiya has written roughly 170 of them, and some lines chain their stations' melodies into one continuous song. [Well-established]",
  },
  london: {
    maps: "The reference case, and the founding one. Harry Beck, a technical draughtsman, drew the diagrammatic map in his spare time around 1931, modeling it on the electrical circuit diagrams of his drafting work: horizontal, vertical, and 45-degree lines only, stations evenly spaced, the crowded centre enlarged. The Underground rejected his unsolicited submission, released it tentatively in 1933, and has never gone back. The public took to it almost immediately, and every map since 2001 has carried the credit 'an evolution of the original design conceived in 1931 by Harry Beck.' [Well-established]",
    tickets: "Oyster arrived in 2003 as a closed-loop stored-value card, and then London leapfrogged its own invention by accepting open-loop contactless bank cards directly: buses in 2012, the Tube in 2014. The dedicated transit card became semi-optional, a second-mover advantage against Octopus's first-mover lock-in. Hong Kong built the best closed system; London made the closed system unnecessary. [Well-established]",
    icons: "The deep lineage runs through here: Isotype, the 1920s Vienna picture-language of Otto Neurath, Marie Reidemeister, and Gerd Arntz, emigrated to England with its makers and became the grammar every 'universal' transit figure descends from. The attributed critique, argued by design researcher Asja Keeman writing for Futuress: Isotype and its descendants encoded a default figure (male, white) with women and other groups drawn as deviations from it. [Reported] A named critical position rather than consensus; the neutral little figure on the sign has a specific history.",
    digital: "'Mind the gap' entered use in the late 1960s, automating a warning staff had given by voice; the popular story of how it came to be recorded is one widely-repeated account among rival claimants. [Reported] The documented part is the coda: the Northern-line voice belonged to actor Oswald Laurence, and when his recording was retired it was reinstated at Embankment station so his widow, Dr. Margaret McCollum, could keep hearing him. The structural rhyme with Tokyo is the finding: a safety fix that became culturally cherished. [Well-established]",
  },
  "hong-kong": {
    maps: "The structural contrast that frames this whole dimension: Hong Kong's network is dominated by a single operator, MTR Corporation, where Tokyo has a dozen-plus. One set of hands, one map, one voice. The operative variable isn't design talent but how many parties have to agree. For the close reading of what that single operator does with its signage, this site's MTR Wayfinding interactive goes deep. [Well-established]",
    tickets: "Octopus, launched September 1, 1997, was the world's first contactless smartcard integrated system-wide across a whole network: rail, bus, and ferry from day one. (Seoul's U-Pass ran earlier, from 1995–96, but on buses only until 2000: a different, narrower first.) The mechanism matters to this piece's spine: five operators formed a joint venture in 1994 to share one payment layer, the cooperation Tokyo's map-makers wouldn't attempt, because shared payment grows everyone's ridership. It worked well enough to become general-purpose money: shops, parking, buildings. [Well-established]",
    icons: "Hong Kong's house dialect of the 'universal' style: pictograms set into the MTR's yellow-on-black exit language, always in bilingual pairs: characters above, English below. The counterpoint reads clearly here: even a global symbol vocabulary arrives with a local accent, and the accent is doing real navigational work. The MTR Wayfinding interactive reads that system up close. [Reported]",
    digital: "Every announcement three times: Cantonese, English, Mandarin: the language-layering problem as a permanent design constraint, in audio and on displays alike. Sequencing, timing, and script pairing become the design surface, and none of the three audiences can be made to wait long. The MTR Wayfinding interactive covers how the same constraint shapes the signage. [Well-established]",
  },
  "new-york": {
    maps: "The same philosophy that won London instantly was publicly rejected here for decades. The 1972 diagram (Massimo Vignelli with Joan Charysyn and Bob Noorda at Unimark) was geometrically beautiful and omitted the street-level geography New Yorkers actually navigate by; after a raucous 1978 debate at Cooper Union, the geographic Michael Hertz map replaced it in 1979 and held for 46 years. Vignelli's own diagnosis, in 2010: riders 'want to put too much information that doesn't belong in the diagram... all you want to know is how to go from A to B.' Then the live turn: in April 2025 the MTA released a new official map explicitly inspired by the 1972 design, a hybrid keeping Hertz-era conventions. A just-resolved chapter, not closed history. [Well-established]",
    tickets: "Strikingly late: the magnetic MetroCard (1993) outlived two failed contactless pilots (2006, 2010), and OMNY only began rolling out in May 2019; MetroCard sales ended on the last day of 2025. The provenance is the finding: OMNY was built by Cubic, the same vendor behind London's Oyster and contactless system, and in 2016 TfL licensed its contactless technology to Cubic to adapt for other cities. OMNY is that adaptation. New York didn't reinvent London's answer; it imported it, a generation later. [Well-established]",
    icons: "The anchor set: in 1974 the US DOT commissioned AIGA to standardize travel pictograms: 34 symbols, 16 more in 1979, 50 in all, public-domain to this day. The committee included Massimo Vignelli (the designer whose abstract subway map New York rejected helped govern the abstract symbol language that succeeded), but the drawing was done by Cook and Shanosky. [Well-established] The crack in 'universal' showed within three years: in 1977, nursing mothers objected to the baby-bottle nursery symbol: a universal symbol failing the exact group it addressed. [Well-established]",
    digital: "The baseline the other three stand against: New York's platform announcements are famously utilitarian and, in the popular imagination, half-audible. That is a comparative impression rather than a measured claim, but the contrast is the point. Tokyo composed its safety audio; London's warning became an icon; New York's remains, recognizably, a PA system. [Reported]",
  },
};

/* Cross-references rendered as real links under the caption — the
   Hong Kong cells defer to the MTR Wayfinding interactive rather
   than re-deriving its content, and the deferral must actually
   resolve, not just be mentioned in prose. */
export const MTR_WAYFINDING_ROUTE =
  "/atlas/design/systems-design/hong-kong-mtr-wayfinding";

export const ptCrossRefs: Partial<
  Record<PtCityId, Partial<Record<PtDimensionId, { label: string; href: string }>>>
> = {
  "hong-kong": {
    maps: {
      label: "MTR Wayfinding: the close reading of this system →",
      href: MTR_WAYFINDING_ROUTE,
    },
    icons: {
      label: "MTR Wayfinding: the signage system up close →",
      href: MTR_WAYFINDING_ROUTE,
    },
    digital: {
      label: "MTR Wayfinding: how the same constraint shapes the signs →",
      href: MTR_WAYFINDING_ROUTE,
    },
  },
};

/* Altitude note vs the MTR piece — rendered on the page. */
export const ptScopeNote =
  "A different altitude than MTR Wayfinding: that interactive reads one system's actual signage up close; this one compares four systems across four information types: maps, tickets, symbols, and displays.";

/* ------------------------------------------------------------------ */
/* Key Insights.                                                       */
/* ------------------------------------------------------------------ */

export const ptInsights = [
  {
    tag: "The map is an org chart",
    text:
      "Tokyo's operators refused to share a map and then negotiated a shared payment card: the same fragmentation, opposite outcomes, because the incentives ran opposite ways. When an information surface looks irrational, check the ownership structure underneath before blaming the designer.",
  },
  {
    tag: "Same philosophy, opposite verdicts",
    text:
      "Beck's abstraction won London in months and has held for ninety years; Vignelli's version of the same idea lost New York for forty-six, then returned, hybridized, in 2025. The diagram didn't change. The cities navigate differently, and a map that ignores how its city walks loses, however beautiful.",
  },
  {
    tag: "Universal is somebody's default",
    text:
      "The pictogram language built to need no translation was still drawn from someone's defaults. Nursing mothers said so in 1977, and later critics argue the neutral figure itself carried a specific race and gender. [Reported] A symbol that works for everyone is a claim, not a property.",
  },
  {
    tag: "Safety that became culture",
    text:
      "Tokyo's departure melodies and London's 'Mind the gap' both began as safety engineering and became beloved civic sound: information design outgrowing its function and turning into place. New York is the audible counterfactual: function alone, unloved.",
  },
];

/* ------------------------------------------------------------------ */
/* Consistency guards — deterministic over static data and unguarded,  */
/* so a violation fails `next build` at prerender. The CRITICAL        */
/* provenance rules of the content pass live here so they cannot       */
/* silently drop in future edits.                                      */
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
      if (!caption || caption.trim().length < 150) {
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
  /* CRITICAL: NYC map credit keeps Charysyn visible, and the 2025
     hybrid keeps the story live. */
  const nyMaps = ptCaptions["new-york"].maps;
  if (!nyMaps.includes("Charysyn") || !nyMaps.includes("2025")) {
    throw new Error(
      "Transit Info: the NYC map caption must credit Joan Charysyn and carry the April 2025 turn.",
    );
  }
  /* CRITICAL: Tokyo ticketing states the negotiated 2007 mechanism,
     never the flat "Suica works everywhere" error. */
  const tokyoTickets = ptCaptions.tokyo.tickets;
  if (
    !tokyoTickets.includes("PASMO") ||
    !tokyoTickets.includes("2007") ||
    !tokyoTickets.includes("negotiated")
  ) {
    throw new Error(
      "Transit Info: Tokyo ticketing must carry the PASMO / March 2007 negotiated-interoperability mechanism.",
    );
  }
  const allText = [
    ...Object.values(ptCaptions).flatMap((d) => Object.values(d)),
    ...ptModes.map((m) => m.note),
    ...Object.values(ptDimensionNotes),
    ...ptInsights.map((i) => i.tag + " " + i.text),
    ptScopeNote,
  ].join(" ");
  if (/Suica works across|Suica covers all/i.test(allText)) {
    throw new Error(
      "Transit Info: the flat 'Suica works across all operators' error must never appear — the one-card reality is the 2007 Suica–PASMO agreement.",
    );
  }
  /* CRITICAL: Octopus's superlative is system-wide integration; if
     Seoul's U-Pass appears, its buses-only scope appears with it. */
  if (!ptCaptions["hong-kong"].tickets.includes("system-wide")) {
    throw new Error(
      "Transit Info: Octopus's superlative is 'first system-wide integrated contactless smartcard' — not merely first contactless farecard.",
    );
  }
  if (allText.includes("U-Pass") && !allText.includes("buses only")) {
    throw new Error(
      "Transit Info: Seoul's U-Pass may only appear with its buses-only scope — the two firsts are never compressed.",
    );
  }
  /* CRITICAL: the AIGA drawing credit stays with Cook and Shanosky. */
  const nyIcons = ptCaptions["new-york"].icons;
  if (!nyIcons.includes("Cook and Shanosky") || !nyIcons.includes("Vignelli")) {
    throw new Error(
      "Transit Info: the AIGA/DOT caption must keep Cook and Shanosky's drawing credit alongside Vignelli's committee role.",
    );
  }
  /* CRITICAL: the Isotype critique stays attributed and tagged. */
  const londonIcons = ptCaptions.london.icons;
  if (!londonIcons.includes("Keeman") || !londonIcons.includes("[Reported]")) {
    throw new Error(
      "Transit Info: the Isotype default-figure critique must stay attributed to Asja Keeman and tagged [Reported].",
    );
  }
  /* CRITICAL: the Icons dimension is framed as the counterpoint, not
     the fragmentation spine. */
  if (
    !ptDimensionNotes.icons.includes("counterpoint") ||
    !ptDimensionNotes.icons.includes("neutral")
  ) {
    throw new Error(
      "Transit Info: the Icons dimension must be framed as the deliberate counterpoint — never forced onto the fragmentation spine.",
    );
  }
  /* CRITICAL: 'Mind the gap' origin stays soft. */
  const londonDigital = ptCaptions.london.digital;
  if (
    !londonDigital.includes("late 1960s") ||
    !londonDigital.includes("widely-repeated account") ||
    !londonDigital.includes("[Reported]")
  ) {
    throw new Error(
      "Transit Info: the 'Mind the gap' origin must stay 'entered use in the late 1960s' with the recording story as one widely-repeated account, [Reported].",
    );
  }
  /* The Vignelli diagnosis anchors the toggle. */
  if (!ptModes[1].note.includes("Vignelli")) {
    throw new Error(
      "Transit Info: the Local mode note must carry Vignelli's tourist-mode-in-a-local-mode-diagram diagnosis.",
    );
  }
  if (ptInsights.length !== 4) {
    throw new Error("Transit Info: exactly four Key Insights.");
  }
  /* Every Hong Kong cell whose caption defers to the MTR piece must
     carry a real cross-reference link at the correct route. */
  for (const d of ["maps", "icons", "digital"] as const) {
    const ref = ptCrossRefs["hong-kong"]?.[d];
    if (!ref || ref.href !== MTR_WAYFINDING_ROUTE) {
      throw new Error(
        `Transit Info: the Hong Kong ${d} cell defers to MTR Wayfinding and must link to its live route.`,
      );
    }
  }
}
