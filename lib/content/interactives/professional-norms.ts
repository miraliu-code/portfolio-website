/*
 * Professional Norms Around the World — data (Phase 2).
 * Sixteen countries with the A1–A3 layers of the content schema:
 *   A1 — region tag + coverage-honesty note
 *   A2 — segmentation: which counterparty the page describes
 *   A3 — seven axis scores with ranges, confidence tags, notes
 * A4 (institutional reality) and A5 (reader-identity deltas) are
 * deliberately descoped: both need subject-matter review this project
 * is not set up to provide. The A5 gap is flagged explicitly in the
 * method note rather than left silent.
 *
 * Phase 2 replaces Phase 1's fixed clusters with axis-based lenses.
 * Lens tiers are DERIVED from the axis scores below (see deriveTiers)
 * so the groupings can never drift from the numbers on each page.
 */

export type PnConfidence =
  | "Well-established"
  | "Reported"
  | "Contested"
  | "Dated";

export interface PnAxisScore {
  score: number; // 1–5
  range?: [number, number];
  note?: string; // one-line justification
  confidence: PnConfidence;
}

export interface PnAxes {
  disagreement: PnAxisScore; // Disagreement Expression (5 = most direct)
  decisionLocus: PnAxisScore; // 5 = the room can decide
  decisionSpeed: PnAxisScore; // 5 = fast
  contractFunction: PnAxisScore; // 5 = contract is the operative document
  timeCommitment: PnAxisScore; // 5 = the calendar is a commitment
  hierarchy: PnAxisScore; // Hierarchy in the Room (5 = strict)
  trustBasis: PnAxisScore; // 5 = competence-based; 1 = relationship-based
}

export const pnAxisLabels: { key: keyof PnAxes; label: string }[] = [
  { key: "disagreement", label: "Disagreement expression" },
  { key: "decisionLocus", label: "Decision locus" },
  { key: "decisionSpeed", label: "Decision speed" },
  { key: "contractFunction", label: "Contract function" },
  { key: "timeCommitment", label: "Time commitment" },
  { key: "hierarchy", label: "Hierarchy in the room" },
  { key: "trustBasis", label: "Trust basis" },
];

export interface PnCountry {
  id: string; // slug
  numericId: string; // world-atlas (ISO 3166-1 numeric) id
  name: string;
  region: string; // A1 region tag
  /* [lon, lat] the globe faces when this country is selected. */
  focus: [number, number];
  /* City-states are invisible at 110m resolution — rendered as a
     clickable dot at these coordinates instead of a polygon. */
  marker?: [number, number];
  /* A1 — coverage honesty. */
  coverage: string;
  /* A2 — segmentation: who the rest of the page describes. */
  segmentation: string;
  /* A3 — the seven axes. */
  axes: PnAxes;
}

export const pnQuestion =
  "What does 'professionalism' actually mean in different cultures?";

export const pnOrientation = "Drag the globe. Choose a country to begin.";

/* Review metadata, rendered with each country's A1 coverage note.
   Restored at the editor's request after the first audit removed it. */
export const PN_LAST_REVIEWED = "September 1, 2026";

/* ---------------------------------------------------------------- */
/* Lens types. The lens definitions themselves live below            */
/* pnCountries, because their tiers are derived from the scores.     */
/* ---------------------------------------------------------------- */

export interface PnLensTier {
  id: string;
  name: string;
  countryIds: string[];
}

export interface PnLens {
  id: string;
  name: string;
  /* Tiers ordered high → low visual intensity. Empty for geography. */
  tiers: PnLensTier[];
  /* Short observations surfaced near the picker. */
  observations: string[];
}

export function getPnLens(id: string): PnLens {
  return pnLenses.find((l) => l.id === id) ?? pnLenses[0];
}

export function getPnTier(lens: PnLens, countryId: string): PnLensTier | null {
  return lens.tiers.find((t) => t.countryIds.includes(countryId)) ?? null;
}

/* ---------------------------------------------------------------- */
/* Countries                                                          */
/* ---------------------------------------------------------------- */

export const pnCountries: PnCountry[] = [
  {
    id: "united-states",
    numericId: "840",
    name: "United States",
    region: "North America",
    focus: [-98.5, 39.5],
    coverage:
      "North America — sole representative in this guide. What follows is US-specific: Canada shares a border and a language but differs on directness and small talk in ways this page cannot speak to, and Mexico is absent entirely. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with a mid-size or large private-sector company in a major metro. Government, healthcare, and regulated finance run slower and more formal than the scores suggest; a venture-backed startup runs flatter and faster. [Well-established] The distance between those two poles is most of the ranges shown below.",
    axes: {
      disagreement: {
        score: 3,
        range: [3, 5],
        note: "Opinion is offered freely, but negative feedback is routinely cushioned ('sandwich' pattern); startups run blunter (≈5).",
        confidence: "Well-established",
      },
      decisionLocus: {
        score: 4,
        range: [3, 5],
        note: "Enterprise sales often channels through procurement.",
        confidence: "Reported",
      },
      decisionSpeed: {
        score: 4,
        range: [2, 5],
        note: "Tech fast; government and enterprise slower.",
        confidence: "Well-established",
      },
      contractFunction: {
        score: 5,
        note: "Litigation-oriented; the contract is the operative document.",
        confidence: "Well-established",
      },
      timeCommitment: {
        score: 4,
        note: "Reschedule culture common in some sectors.",
        confidence: "Reported",
      },
      hierarchy: {
        score: 2,
        range: [1, 4],
        note: "Flat in tech; more hierarchical in finance and government.",
        confidence: "Well-established",
      },
      trustBasis: {
        score: 4,
        note: "Competence signals trust quickly.",
        confidence: "Well-established",
      },
    },
  },
  {
    id: "ireland",
    numericId: "372",
    name: "Ireland",
    region: "Western Europe",
    focus: [-8.2, 53.2],
    coverage:
      "Western Europe — one of four regional representatives (Germany, Switzerland, Netherlands). Ireland is not a lighter Britain: the UK is absent from this guide, and this page does not describe it. [Well-established]",
    segmentation:
      "The rest of this page describes a first meeting with a Dublin-based professional-services or multinational-adjacent firm. If the counterparty is the Irish subsidiary of a US or UK multinational, expect the meeting to feel local while the decision lives abroad — ask early where sign-off actually sits. [Reported]",
    axes: {
      disagreement: {
        score: 2,
        range: [1, 3],
        note: "Indirect, softened via humor.",
        confidence: "Reported",
      },
      decisionLocus: {
        score: 3,
        range: [2, 4],
        note: "Indigenous firms can decide in the room; multinational subsidiaries channel to a non-Irish HQ.",
        confidence: "Reported",
      },
      decisionSpeed: { score: 3, confidence: "Reported" },
      contractFunction: { score: 4, confidence: "Reported" },
      timeCommitment: { score: 3, confidence: "Contested" },
      hierarchy: { score: 2, confidence: "Reported" },
      trustBasis: {
        score: 2,
        note: "Rapport built through humor before substance.",
        confidence: "Reported",
      },
    },
  },
  {
    id: "australia",
    numericId: "036",
    name: "Australia",
    region: "Oceania",
    focus: [134, -25.5],
    coverage:
      "Oceania — one of two regional representatives (New Zealand). The two read as similar from a distance and are not interchangeable up close; the differences are noted where they matter. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with an established Sydney or Melbourne firm. Mining and agriculture lean more formal and more relationship-patient than the city baseline; startups converge with the US pattern. [Reported]",
    axes: {
      disagreement: {
        score: 3,
        note: "Direct but delivered self-deprecatingly.",
        confidence: "Reported",
      },
      decisionLocus: { score: 4, confidence: "Reported" },
      decisionSpeed: { score: 4, confidence: "Reported" },
      contractFunction: { score: 4, confidence: "Reported" },
      timeCommitment: { score: 4, confidence: "Reported" },
      hierarchy: {
        score: 1,
        note: "Visibly flat.",
        confidence: "Well-established",
      },
      trustBasis: {
        score: 3,
        note: "Competence matters, but overt self-promotion is penalized.",
        confidence: "Reported",
      },
    },
  },
  {
    id: "new-zealand",
    numericId: "554",
    name: "New Zealand",
    region: "Oceania",
    focus: [172.5, -41.5],
    coverage:
      "Oceania — one of two regional representatives (Australia). A smaller market with longer memories: reputations travel faster here than the Anglo grouping might suggest. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with an established Auckland or Wellington firm. The market is small enough that your conduct in one meeting reaches the next one before you do; assume any two counterparties know each other. [Reported] In public-sector and iwi-affiliated settings, tikanga Māori shapes how meetings open and proceed — follow your host's lead. [Reported]",
    axes: {
      disagreement: { score: 3, confidence: "Reported" },
      decisionLocus: {
        score: 3,
        note: "Consensus-leaning.",
        confidence: "Reported",
      },
      decisionSpeed: { score: 3, confidence: "Reported" },
      contractFunction: { score: 4, confidence: "Reported" },
      timeCommitment: { score: 4, confidence: "Reported" },
      hierarchy: { score: 1, confidence: "Reported" },
      trustBasis: {
        score: 2,
        note: "Genuine mutual curiosity expected before substance.",
        confidence: "Reported",
      },
    },
  },
  {
    id: "germany",
    numericId: "276",
    name: "Germany",
    region: "Western Europe",
    focus: [10.3, 51.2],
    coverage:
      "Western Europe — one of four regional representatives (Ireland, Switzerland, Netherlands). Austria, absent from this guide, is adjacent but not identical. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with an established Mittelstand manufacturer or corporate. A Berlin startup reads closer to the Anglo baseline, and a family-owned firm's owner can decide faster than the process-heavy scores imply — the process exists until the owner overrides it. [Reported]",
    axes: {
      disagreement: {
        score: 5,
        note: "Criticism delivered in the room, in front of others.",
        confidence: "Well-established",
      },
      decisionLocus: {
        score: 3,
        range: [2, 4],
        note: "Matrixed organizations can channel.",
        confidence: "Reported",
      },
      decisionSpeed: {
        score: 2,
        note: "Thorough process precedes signature.",
        confidence: "Well-established",
      },
      contractFunction: { score: 5, confidence: "Well-established" },
      timeCommitment: { score: 5, confidence: "Well-established" },
      hierarchy: {
        score: 3,
        note: "Expertise can offset seniority.",
        confidence: "Reported",
      },
      trustBasis: { score: 4, confidence: "Well-established" },
    },
  },
  {
    id: "switzerland",
    numericId: "756",
    name: "Switzerland",
    region: "Western Europe",
    focus: [8.2, 46.8],
    coverage:
      "Western Europe — one of four regional representatives (Ireland, Germany, Netherlands). What follows describes German-speaking business Switzerland; Geneva leans noticeably French and Lugano Italian, in ways this page cannot speak to. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with an established German-speaking corporate or private bank — that segment, not the multinational subsidiaries of Zurich and Geneva, is what the scores describe. [Reported] Federated decision-making across stakeholders is the constant in this segment. [Reported]",
    axes: {
      disagreement: {
        score: 4,
        note: "Direct but discreet.",
        confidence: "Reported",
      },
      decisionLocus: {
        score: 2,
        note: "Often federated across stakeholders.",
        confidence: "Reported",
      },
      decisionSpeed: { score: 2, confidence: "Reported" },
      contractFunction: { score: 5, confidence: "Well-established" },
      timeCommitment: { score: 5, confidence: "Well-established" },
      hierarchy: { score: 3, confidence: "Reported" },
      trustBasis: { score: 4, confidence: "Reported" },
    },
  },
  {
    id: "netherlands",
    numericId: "528",
    name: "Netherlands",
    region: "Western Europe",
    focus: [5.3, 52.2],
    coverage:
      "Western Europe — one of four regional representatives (Ireland, Germany, Switzerland). Belgium, absent from this guide, is not a softer Netherlands — it differs in ways this page cannot speak to. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with an established Randstad firm. The directness scores hold across sectors unusually well; what varies is pace, not register. [Reported] Counterparts with long Anglo careers soften their delivery abroad and revert at home. [Reported]",
    axes: {
      disagreement: {
        score: 5,
        note: "The regional outlier — disagreement is the default register.",
        confidence: "Well-established",
      },
      decisionLocus: { score: 4, confidence: "Reported" },
      decisionSpeed: { score: 3, confidence: "Reported" },
      contractFunction: { score: 4, confidence: "Reported" },
      timeCommitment: { score: 4, confidence: "Reported" },
      hierarchy: { score: 1, confidence: "Well-established" },
      trustBasis: { score: 4, confidence: "Reported" },
    },
  },
  {
    id: "sweden",
    numericId: "752",
    name: "Sweden",
    region: "Northern Europe",
    focus: [15, 62],
    coverage:
      "Northern Europe — sole representative in this guide. Denmark, Norway, and Finland are adjacent but distinct — Danish directness in particular would score differently — and this page cannot speak to them. [Reported]",
    segmentation:
      "The rest of this page describes a first meeting with an established Stockholm firm. The consensus loop below holds even at startups, just faster; a counterparty who has worked in the US may run the meeting Anglo-style and still take the decision back to the group. [Reported]",
    axes: {
      disagreement: {
        score: 2,
        note: "Interrupting avoided; consensus sought.",
        confidence: "Well-established",
      },
      decisionLocus: {
        score: 1,
        note: "The decision is rarely one person's to make.",
        confidence: "Well-established",
      },
      decisionSpeed: { score: 2, confidence: "Well-established" },
      contractFunction: { score: 4, confidence: "Reported" },
      timeCommitment: { score: 4, confidence: "Reported" },
      hierarchy: { score: 1, confidence: "Well-established" },
      trustBasis: {
        score: 3,
        note: "Fika-based rapport matters alongside competence.",
        confidence: "Reported",
      },
    },
  },
  {
    id: "china",
    numericId: "156",
    name: "China",
    region: "East Asia",
    focus: [104, 35.5],
    coverage:
      "East Asia — one of three regional representatives (Japan, South Korea). This page describes mainland China. Hong Kong and Taiwan are not covered.",
    segmentation:
      "The rest of this page describes a first meeting with a privately held manufacturer or trading company in a tier-1 or tier-2 city. A state-owned enterprise is more centralized and slower; a founder-led tech firm is faster and blunter than anything else on this page. [Well-established] A counterpart educated abroad will flex toward your norms in the room while the approval chain behind them does not. [Reported]",
    axes: {
      disagreement: {
        score: 1,
        range: [1, 3],
        note: "Tech and founder-led firms less indirect.",
        confidence: "Reported",
      },
      decisionLocus: {
        score: 2,
        range: [1, 4],
        note: "State-owned centralized; founder-led startups fast.",
        confidence: "Reported",
      },
      decisionSpeed: {
        score: 3,
        range: [1, 5],
        note: "Highly sector-dependent.",
        confidence: "Contested",
      },
      contractFunction: {
        score: 2,
        range: [1, 4],
        note: "State-owned differs.",
        confidence: "Reported",
      },
      timeCommitment: { score: 3, range: [2, 4], confidence: "Reported" },
      hierarchy: {
        score: 4,
        note: "Seniority visibly shapes speaking order.",
        confidence: "Well-established",
      },
      trustBasis: {
        score: 1,
        note: "Guanxi — the relationship precedes the transaction.",
        confidence: "Well-established",
      },
    },
  },
  {
    id: "japan",
    numericId: "392",
    name: "Japan",
    region: "East Asia",
    focus: [138, 37],
    coverage:
      "East Asia — one of three regional representatives (China, South Korea).",
    segmentation:
      "The rest of this page describes a first meeting with a large, legacy manufacturer or trading company — the modal counterparty for a foreign visitor's first Japan meeting. [Reported] A meeting with a Tokyo software company under ten years old will look substantially different — closer to the Anglo baseline than to anything else on this page. [Well-established] Ask early which kind of company you're walking into.",
    axes: {
      disagreement: {
        score: 1,
        note: "Soft no, delay, 'that may be difficult.'",
        confidence: "Well-established",
      },
      decisionLocus: {
        score: 2,
        range: [1, 4],
        note: "Large legacy firms low; sub-10-year-old tech firms high.",
        confidence: "Well-established",
      },
      decisionSpeed: {
        score: 1,
        range: [1, 4],
        note: "Same legacy/tech split.",
        confidence: "Well-established",
      },
      contractFunction: { score: 3, confidence: "Reported" },
      timeCommitment: { score: 5, confidence: "Well-established" },
      hierarchy: {
        score: 4,
        range: [2, 5],
        note: "Same sector split.",
        confidence: "Well-established",
      },
      trustBasis: { score: 2, confidence: "Reported" },
    },
  },
  {
    id: "south-korea",
    numericId: "410",
    name: "South Korea",
    region: "East Asia",
    focus: [127.8, 36.3],
    coverage:
      "East Asia — one of three regional representatives (China, Japan). Scores split sharply between chaebol-affiliated firms and post-2000s startups; the ranges are wide because the country genuinely is. [Well-established]",
    segmentation:
      "The rest of this page describes a first meeting with a chaebol-affiliated corporate. A post-2000s tech company will look substantially different — faster, flatter, more direct — and the gap between the two is among the widest in-country spreads in this guide. [Well-established] Ask which you're walking into.",
    axes: {
      disagreement: {
        score: 2,
        range: [1, 4],
        note: "Chaebol vs. startup.",
        confidence: "Reported",
      },
      decisionLocus: { score: 2, range: [1, 4], confidence: "Reported" },
      decisionSpeed: {
        score: 3,
        range: [1, 5],
        note: "Rapid post-2000s shift in startups.",
        confidence: "Contested",
      },
      contractFunction: { score: 3, confidence: "Reported" },
      timeCommitment: { score: 4, confidence: "Reported" },
      hierarchy: {
        score: 4,
        note: "Age and seniority strongly govern order.",
        confidence: "Well-established",
      },
      trustBasis: {
        score: 2,
        note: "After-hours socializing is real relationship-building infrastructure.",
        confidence: "Well-established",
      },
    },
  },
  {
    id: "singapore",
    numericId: "702",
    name: "Singapore",
    region: "Southeast Asia",
    focus: [103.82, 1.35],
    marker: [103.82, 1.35],
    coverage:
      "Southeast Asia — sole representative in this guide, and a poor proxy for its region: Indonesia, Vietnam, Thailand, and Malaysia, all absent, differ sharply. [Well-established] Treat this page as Singapore-specific, not 'Southeast Asian.'",
    segmentation:
      "The rest of this page describes a first meeting with a Singapore-headquartered firm with regional scope. Government-linked companies run more formal; the many regional headquarters of Western multinationals read mostly like their home culture with stricter local time discipline. [Reported]",
    axes: {
      disagreement: {
        score: 3,
        note: "A genuine East–West blend.",
        confidence: "Reported",
      },
      decisionLocus: { score: 4, confidence: "Reported" },
      decisionSpeed: { score: 4, confidence: "Reported" },
      contractFunction: {
        score: 5,
        note: "Common-law system; the contract is operative.",
        confidence: "Well-established",
      },
      timeCommitment: { score: 5, confidence: "Reported" },
      hierarchy: { score: 3, confidence: "Reported" },
      trustBasis: { score: 3, confidence: "Reported" },
    },
  },
  {
    id: "uae",
    numericId: "784",
    name: "United Arab Emirates",
    region: "Gulf",
    focus: [54, 24],
    coverage:
      "Gulf — sole representative in this guide. What follows is Emirati/UAE-specific, not 'Gulf' or 'Middle Eastern' more broadly — Saudi Arabia and Qatar, absent from this guide, differ in ways this page cannot speak to. [Reported]",
    segmentation:
      "The rest of this page describes a meeting with a family-owned or government-adjacent business — still the modal counterparty for a first UAE meeting. [Reported] A meeting at a Dubai free-zone firm — fintech, multinational subsidiary, foreign-founded startup — will differ meaningfully, particularly on hierarchy and time commitment. [Reported]",
    axes: {
      disagreement: { score: 2, confidence: "Reported" },
      decisionLocus: {
        score: 2,
        range: [1, 4],
        note: "Family and state ties matter.",
        confidence: "Reported",
      },
      decisionSpeed: {
        score: 4,
        range: [2, 5],
        note: "Fast once the relationship is established.",
        confidence: "Contested",
      },
      contractFunction: { score: 2, confidence: "Reported" },
      timeCommitment: {
        score: 2,
        note: "The calendar as intention.",
        confidence: "Reported",
      },
      hierarchy: {
        score: 4,
        note: "Family and tribal standing shape the room, not always visibly.",
        confidence: "Reported",
      },
      trustBasis: {
        score: 1,
        note: "Hospitality is the actual work of the meeting.",
        confidence: "Well-established",
      },
    },
  },
  {
    id: "india",
    numericId: "356",
    name: "India",
    region: "South Asia",
    focus: [79, 22.5],
    coverage:
      "South Asia — sole representative in this guide. What follows cannot speak for Pakistan, Bangladesh, or Sri Lanka — and India itself varies internally, by region and by sector, more than most countries in this guide. [Well-established]",
    segmentation:
      "The rest of this page describes a first meeting with an established family-owned or promoter-led company. English is the default language of Indian corporate life — a meeting conducted in English is the norm, not an accommodation for the visitor. [Well-established] A Bangalore tech firm runs flatter and faster than the scores below; a public-sector counterparty slower and more formal. [Reported] A counterpart educated abroad will flex toward your norms in the room while the decision process behind them does not. [Reported]",
    axes: {
      disagreement: { score: 2, confidence: "Reported" },
      decisionLocus: {
        score: 2,
        range: [1, 4],
        note: "Tech and startups notably flatter than traditional sectors.",
        confidence: "Reported",
      },
      decisionSpeed: { score: 2, range: [1, 4], confidence: "Reported" },
      contractFunction: { score: 2, confidence: "Reported" },
      timeCommitment: { score: 2, confidence: "Reported" },
      hierarchy: { score: 4, range: [2, 5], confidence: "Well-established" },
      trustBasis: {
        score: 1,
        note: "Who introduced you shapes the whole interaction.",
        confidence: "Well-established",
      },
    },
  },
  {
    id: "brazil",
    numericId: "076",
    name: "Brazil",
    region: "South America",
    focus: [-53, -10.5],
    coverage:
      "South America — sole representative in this guide. Portuguese-speaking Brazil is not a proxy for its Spanish-speaking neighbors; Argentina and Chile, absent, differ on formality and pace. [Reported] One instrument limit stated plainly: Brazil and Italy land on identical scores across all seven axes below — a limit of the axes' resolution, not a claim that the two countries are interchangeable.",
    segmentation:
      "The rest of this page describes a first meeting with an established São Paulo firm — that city, not the whole country, is what the scores describe; Brazil's regional variation is real, and this page does not attempt to map it. [Reported] Multinational subsidiaries follow their headquarters' forms with Brazilian warmth layered over them. [Reported]",
    axes: {
      disagreement: {
        score: 3,
        note: "Direct once rapport is established.",
        confidence: "Reported",
      },
      decisionLocus: { score: 3, confidence: "Reported" },
      decisionSpeed: { score: 2, confidence: "Reported" },
      contractFunction: { score: 2, confidence: "Reported" },
      timeCommitment: { score: 2, confidence: "Reported" },
      hierarchy: {
        score: 3,
        note: "Softened by personal warmth.",
        confidence: "Reported",
      },
      trustBasis: { score: 1, confidence: "Well-established" },
    },
  },
  {
    id: "italy",
    numericId: "380",
    name: "Italy",
    region: "Southern Europe",
    focus: [12.5, 42.5],
    coverage:
      "Southern Europe — sole representative in this guide. Spain and Greece, absent, share the relational lean but not the specifics. [Reported] This page scores the industrial north and does not attempt to map Italy's internal variation. One instrument limit stated plainly: Italy and Brazil land on identical scores across all seven axes below — a limit of the axes' resolution, not a claim that the two countries are interchangeable.",
    segmentation:
      "The rest of this page describes a first meeting with an established family-owned northern firm (Milan, Bologna, Turin) — that segment, not the whole country, is what the scores describe. A Milanese finance counterparty may read as northern-European until the contract stage, where the relational pattern reasserts itself. [Reported]",
    axes: {
      disagreement: {
        score: 3,
        note: "Direct once rapport is established.",
        confidence: "Reported",
      },
      decisionLocus: { score: 3, confidence: "Reported" },
      decisionSpeed: { score: 2, confidence: "Reported" },
      contractFunction: { score: 2, confidence: "Reported" },
      timeCommitment: { score: 2, confidence: "Reported" },
      hierarchy: { score: 3, confidence: "Reported" },
      trustBasis: { score: 1, confidence: "Reported" },
    },
  },
];

export function getPnCountry(id: string): PnCountry | null {
  return pnCountries.find((c) => c.id === id) ?? null;
}

/* ---------------------------------------------------------------- */
/* Lenses: the re-clustering mechanic. Geography is the arrival view; */
/* the other four re-group the sixteen by tier on one axis.          */
/*                                                                    */
/* Tiers are derived from the axis scores with one uniform cutoff —  */
/* score ≥ 4 → top tier, score = 3 → middle, score ≤ 2 → bottom —    */
/* applied identically to all sixteen countries on every lens, so a  */
/* country's tier can never contradict the dots on its own page.     */
/*                                                                    */
/* Observations are generated FROM the derived tiers: each is a      */
/* template over live tier names plus a guard over every tier fact   */
/* the sentence asserts. If a data change breaks a fact, the         */
/* observation drops out automatically instead of rendering stale    */
/* prose — captions structurally cannot contradict the tiers.        */
/* ---------------------------------------------------------------- */

type PnAxisLensId =
  | "directness"
  | "decision-speed"
  | "contract-relationship"
  | "hierarchy";

const LENS_AXIS: Record<PnAxisLensId, keyof PnAxes> = {
  directness: "disagreement",
  "decision-speed": "decisionSpeed",
  "contract-relationship": "contractFunction",
  hierarchy: "hierarchy",
};

function deriveTiers(
  lensId: PnAxisLensId,
  tierDefs: [string, string][], // [id, name] ordered high → low
): PnLensTier[] {
  const axis = LENS_AXIS[lensId];
  const ids = (test: (score: number) => boolean) =>
    pnCountries.filter((c) => test(c.axes[axis].score)).map((c) => c.id);
  return [
    { id: tierDefs[0][0], name: tierDefs[0][1], countryIds: ids((s) => s >= 4) },
    { id: tierDefs[1][0], name: tierDefs[1][1], countryIds: ids((s) => s === 3) },
    { id: tierDefs[2][0], name: tierDefs[2][1], countryIds: ids((s) => s <= 2) },
  ];
}

const tiersByLens: Record<PnAxisLensId, PnLensTier[]> = {
  directness: deriveTiers("directness", [
    ["blunt", "Blunt"],
    ["calibrated", "Direct but calibrated"],
    ["indirect", "Indirect"],
  ]),
  "decision-speed": deriveTiers("decision-speed", [
    ["fast", "Fast"],
    ["moderate", "Moderate"],
    ["slow", "Slow"],
  ]),
  "contract-relationship": deriveTiers("contract-relationship", [
    ["contract-first", "Contract-first"],
    ["mixed", "Mixed"],
    ["relational", "Relational"],
  ]),
  hierarchy: deriveTiers("hierarchy", [
    ["strict", "Strict"],
    ["moderate", "Moderate"],
    ["flat", "Flat"],
  ]),
};

/* Tier-fact helpers for observation guards and templates. */
const tierIdx = (lens: PnAxisLensId, id: string) =>
  tiersByLens[lens].findIndex((t) => t.countryIds.includes(id));
const tierName = (lens: PnAxisLensId, id: string) =>
  tiersByLens[lens][tierIdx(lens, id)]?.name.toLowerCase() ?? "?";
const sameTier = (lens: PnAxisLensId, ...ids: string[]) =>
  tierIdx(lens, ids[0]) !== -1 &&
  ids.every((id) => tierIdx(lens, id) === tierIdx(lens, ids[0]));
const apartFrom = (lens: PnAxisLensId, a: string, b: string) =>
  tierIdx(lens, a) !== tierIdx(lens, b);
const tierBelow = (lens: PnAxisLensId, a: string, b: string) =>
  tierIdx(lens, a) > tierIdx(lens, b);

function observations(specs: (() => string | null)[]): string[] {
  return specs.map((spec) => spec()).filter((s): s is string => s !== null);
}

export const pnLenses: PnLens[] = [
  {
    id: "geography",
    name: "Geography",
    tiers: [],
    observations: [],
  },
  {
    id: "directness",
    name: "Directness",
    tiers: tiersByLens.directness,
    observations: observations([
      () =>
        sameTier("directness", "sweden", "japan", "india") &&
        apartFrom("directness", "sweden", "netherlands")
          ? `On directness, Sweden leaves its neighbors: it shares the ${tierName("directness", "sweden")} tier with Japan and India, not with the Netherlands next door.`
          : null,
      () =>
        sameTier("directness", "ireland", "japan", "china", "south-korea") &&
        apartFrom("directness", "ireland", "united-states") &&
        apartFrom("directness", "ireland", "australia")
          ? `Ireland sits in the ${tierName("directness", "ireland")} tier with East Asia here, apart from its Anglo peers.`
          : null,
    ]),
  },
  {
    id: "decision-speed",
    name: "Decision speed",
    tiers: tiersByLens["decision-speed"],
    observations: observations([
      () =>
        sameTier("decision-speed", "uae", "united-states", "singapore") &&
        tierBelow("decision-speed", "new-zealand", "australia")
          ? "On decision speed, the UAE runs with the US and Singapore — and New Zealand sits a tier below Australia."
          : null,
      () => {
        const range = getPnCountry("china")?.axes.decisionSpeed.range;
        return range && range[0] === 1 && range[1] === 5
          ? "China's tier is an average of extremes: state-owned and founder-led firms sit at opposite ends of the range."
          : null;
      },
    ]),
  },
  {
    id: "contract-relationship",
    name: "Contract vs. relationship",
    tiers: tiersByLens["contract-relationship"],
    observations: observations([
      () =>
        sameTier("contract-relationship", "japan", "south-korea") &&
        apartFrom("contract-relationship", "japan", "china")
          ? `On contracts, Japan and South Korea share the ${tierName("contract-relationship", "japan")} tier while China sits in the ${tierName("contract-relationship", "china")} one — the East Asian trio splits.`
          : null,
      () =>
        sameTier("contract-relationship", "italy", "brazil", "india") &&
        ["ireland", "germany", "switzerland", "netherlands", "sweden"].every(
          (id) => apartFrom("contract-relationship", "italy", id),
        )
          ? "Italy groups with Brazil and India here, not with the rest of Europe in this guide."
          : null,
    ]),
  },
  {
    id: "hierarchy",
    name: "Hierarchy in the room",
    tiers: tiersByLens.hierarchy,
    observations: observations([
      () =>
        sameTier("hierarchy", "united-states", "sweden", "netherlands", "ireland")
          ? `On hierarchy, the United States lands in the ${tierName("hierarchy", "united-states")} tier with Sweden, the Netherlands, and Ireland.`
          : null,
      () =>
        sameTier("hierarchy", "italy", "brazil", "germany", "switzerland") &&
        sameTier("contract-relationship", "italy", "brazil") &&
        apartFrom("contract-relationship", "italy", "germany")
          ? `Italy and Brazil group with Germany and Switzerland here — not with the ${tierName("contract-relationship", "italy")} tier they occupy on contracts.`
          : null,
    ]),
  },
];

/* Brazil and Italy score identically on all seven axes; both A1 notes
   state this limitation explicitly. This check keeps those sentences
   honest: if the scores ever diverge, it fails loudly in development
   so the notes get removed alongside the change. */
if (process.env.NODE_ENV !== "production") {
  const brazil = pnCountries.find((c) => c.id === "brazil")!.axes;
  const italy = pnCountries.find((c) => c.id === "italy")!.axes;
  const identical = (Object.keys(brazil) as (keyof PnAxes)[]).every(
    (k) => brazil[k].score === italy[k].score,
  );
  if (!identical) {
    throw new Error(
      "Brazil and Italy axis scores have diverged — remove the identical-scores sentences from both countries' coverage notes.",
    );
  }
}
