/*
 * Professional Norms Around the World — data (Phase 2).
 * Sixteen countries with the A1–A3 layers of the content schema:
 *   A1 — region tag + coverage-honesty note + review metadata
 *   A2 — segmentation: which counterparty the page describes
 *   A3 — seven axis scores with ranges, confidence tags, notes
 * A4 (institutional reality) and A5 (reader-identity deltas) are
 * deliberately descoped: both need subject-matter review this project
 * is not set up to provide.
 *
 * Phase 2 replaces Phase 1's fixed clusters with axis-based lenses —
 * the groupings below are data, not permanent structure.
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
  /* A1 — coverage honesty + review metadata (placeholder values are
     structured so real ones drop in later). */
  coverage: string;
  lastReviewed: string;
  reviewedBy: string;
  /* A2 — segmentation: who the rest of the page describes. */
  segmentation: string;
  /* A3 — the seven axes. */
  axes: PnAxes;
}

export const pnQuestion =
  "What does 'professionalism' actually mean in different cultures?";

export const pnOrientation = "Drag the globe. Choose a country to begin.";

/* ---------------------------------------------------------------- */
/* Lenses: the re-clustering mechanic. Geography is the arrival view; */
/* the other four re-group the sixteen by tier on one axis.          */
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
    tiers: [
      {
        id: "blunt",
        name: "Blunt",
        countryIds: ["netherlands", "germany", "switzerland"],
      },
      {
        id: "calibrated",
        name: "Direct but calibrated",
        countryIds: [
          "united-states",
          "australia",
          "new-zealand",
          "brazil",
          "italy",
          "singapore",
        ],
      },
      {
        id: "indirect",
        name: "Indirect",
        countryIds: [
          "japan",
          "china",
          "south-korea",
          "india",
          "uae",
          "ireland",
          "sweden",
        ],
      },
    ],
    observations: [
      "On directness, Sweden leaves its neighbors: it groups with Japan and India, not with the Netherlands next door.",
      "Ireland sits in the indirect tier with East Asia here, apart from its Anglo peers.",
    ],
  },
  {
    id: "decision-speed",
    name: "Decision speed",
    tiers: [
      {
        id: "fast",
        name: "Fast",
        countryIds: ["united-states", "australia", "uae", "singapore"],
      },
      {
        id: "moderate",
        name: "Moderate",
        countryIds: ["netherlands", "china", "south-korea", "brazil"],
      },
      {
        id: "slow",
        name: "Slow",
        countryIds: [
          "japan",
          "sweden",
          "germany",
          "switzerland",
          "india",
          "italy",
          "ireland",
          "new-zealand",
        ],
      },
    ],
    observations: [
      "On decision speed, the UAE runs with the US and Singapore — and New Zealand sits in the slow tier, apart from Australia.",
      "China's tier is an average of extremes: state-owned and founder-led firms sit at opposite ends of the range.",
    ],
  },
  {
    id: "contract-relationship",
    name: "Contract vs. relationship",
    tiers: [
      {
        id: "contract-first",
        name: "Contract-first",
        countryIds: [
          "united-states",
          "germany",
          "switzerland",
          "singapore",
          "netherlands",
          "sweden",
        ],
      },
      {
        id: "mixed",
        name: "Mixed",
        countryIds: ["japan", "ireland", "australia", "new-zealand"],
      },
      {
        id: "relational",
        name: "Relational",
        countryIds: ["brazil", "uae", "india", "italy", "china", "south-korea"],
      },
    ],
    observations: [
      "On contracts, Japan sits in the mixed tier — apart from China and South Korea, its geographic neighbors.",
      "Italy groups with Brazil and India here, not with its EU neighbors.",
    ],
  },
  {
    id: "hierarchy",
    name: "Hierarchy in the room",
    tiers: [
      {
        id: "strict",
        name: "Strict",
        countryIds: ["japan", "south-korea", "china", "india", "uae"],
      },
      {
        id: "moderate",
        name: "Moderate",
        countryIds: [
          "united-states",
          "germany",
          "switzerland",
          "singapore",
          "italy",
          "brazil",
        ],
      },
      {
        id: "flat",
        name: "Flat",
        countryIds: [
          "sweden",
          "netherlands",
          "new-zealand",
          "australia",
          "ireland",
        ],
      },
    ],
    observations: [
      "On hierarchy, Ireland sits with Sweden and New Zealand in the flat tier.",
      "Italy and Brazil group with the US and Germany here — not with the relational tier they occupy on contracts.",
    ],
  },
];

export function getPnLens(id: string): PnLens {
  return pnLenses.find((l) => l.id === id) ?? pnLenses[0];
}

export function getPnTier(lens: PnLens, countryId: string): PnLensTier | null {
  return lens.tiers.find((t) => t.countryIds.includes(countryId)) ?? null;
}

/* ---------------------------------------------------------------- */
/* Countries                                                          */
/* ---------------------------------------------------------------- */

const PENDING_DATE = "[placeholder date]";
const PENDING_REVIEWERS =
  "[placeholder — in-market operator + foreign operator, per schema]";

export const pnCountries: PnCountry[] = [
  {
    id: "united-states",
    numericId: "840",
    name: "United States",
    region: "North America",
    focus: [-98.5, 39.5],
    coverage:
      "North America — sole representative in this guide. What follows is US-specific: Canada shares a border and a language but differs on directness and small talk in ways this page cannot speak to, and Mexico is absent entirely.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with a mid-size or large private-sector company in a major metro. Government, healthcare, and regulated finance run slower and more formal than the scores suggest; a venture-backed startup runs flatter and faster. The distance between those two poles is most of the ranges shown below.",
    axes: {
      disagreement: {
        score: 4,
        range: [3, 5],
        note: "Startups ≈5, regulated corporate ≈3.",
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
      "Western Europe — one of four regional representatives (Germany, Switzerland, Netherlands). Ireland is not a lighter Britain: the UK is absent from this guide, and this page does not describe it.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with a Dublin-based professional-services or multinational-adjacent firm. If the counterparty is the Irish subsidiary of a US or UK multinational, expect the meeting to feel local while the decision lives abroad — ask early where sign-off actually sits.",
    axes: {
      disagreement: {
        score: 2,
        range: [1, 3],
        note: "Indirect, softened via humor.",
        confidence: "Reported",
      },
      decisionLocus: {
        score: 3,
        note: "Often channels to a non-Irish HQ at multinational subsidiaries.",
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
      "Oceania — one of two regional representatives (New Zealand). The two read as similar from a distance and are not interchangeable up close; the differences are noted where they matter.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established Sydney or Melbourne firm. Mining and agriculture lean more formal and more relationship-patient than the city baseline; startups converge with the US pattern.",
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
      "Oceania — one of two regional representatives (Australia). A smaller market with longer memories: reputations travel faster here than the Anglo grouping might suggest.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established Auckland or Wellington firm. The market is small enough that your conduct in one meeting reaches the next one before you do; assume any two counterparties know each other.",
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
      "Western Europe — one of four regional representatives (Ireland, Switzerland, Netherlands). Austria, absent from this guide, is adjacent but not identical.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established Mittelstand manufacturer or corporate. A Berlin startup reads closer to the Anglo baseline, and a family-owned firm's owner can decide faster than the process-heavy scores imply — the process exists until the owner overrides it.",
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
      "Western Europe — one of four regional representatives (Ireland, Germany, Netherlands). What follows describes German-speaking business Switzerland; Geneva leans noticeably French and Lugano Italian, in ways this page only gestures at.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established German-speaking corporate or private bank. Multinational subsidiaries in Zurich and Geneva run more international than the scores below; federated decision-making across stakeholders is the constant either way.",
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
      "Western Europe — one of four regional representatives (Ireland, Germany, Switzerland). Belgium, absent from this guide, is not a softer Netherlands — it differs on nearly every axis this page scores.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established Randstad firm. The directness scores hold across sectors unusually well; what varies is pace, not register. Counterparts with long Anglo careers soften their delivery abroad and revert at home.",
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
      "Northern Europe — sole representative in this guide. Denmark, Norway, and Finland are adjacent but distinct — Danish directness in particular would score differently — and this page cannot speak to them.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established Stockholm firm. The consensus loop below holds even at startups, just faster; a counterparty who has worked in the US may run the meeting Anglo-style and still take the decision back to the group.",
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
      "East Asia — one of three regional representatives (Japan, South Korea). What follows is mainland-specific; Hong Kong and Taiwan, absent from this guide, differ substantially.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with a privately held manufacturer or trading company in a tier-1 or tier-2 city. A state-owned enterprise is more centralized and slower; a founder-led tech firm is faster and blunter than anything else on this page. A counterpart educated abroad will flex toward your norms in the room while the approval chain behind them does not.",
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
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with a large, legacy manufacturer or trading company (the modal counterparty for a foreign visitor's first Japan meeting). A meeting with a Tokyo software company under ten years old will look substantially different — closer to the Anglo baseline than to anything else on this page. Ask early which kind of company you're walking into.",
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
      "East Asia — one of three regional representatives (China, Japan). Scores split sharply between chaebol-affiliated firms and post-2000s startups; the ranges are wide because the country genuinely is.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with a chaebol-affiliated corporate. A post-2000s tech company will look substantially different — faster, flatter, more direct — and the gap between the two is the widest in-country spread in this guide. Ask which you're walking into.",
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
      "Southeast Asia — sole representative in this guide, and a poor proxy for its region: Indonesia, Vietnam, Thailand, and Malaysia, all absent, differ sharply. Treat this page as Singapore-specific, not 'Southeast Asian.'",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with a Singapore-headquartered firm with regional scope. Government-linked companies run more formal; the many regional headquarters of Western multinationals read mostly like their home culture with stricter local time discipline.",
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
      "Gulf — sole representative in this guide. What follows is Emirati/UAE-specific, not 'Gulf' or 'Middle Eastern' more broadly — Saudi Arabia and Qatar, absent from this guide, differ in ways this page cannot speak to.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a meeting with a family-owned or government-adjacent business — still the modal counterparty for a first UAE meeting. A meeting at a Dubai-based multinational subsidiary or foreign-founded startup will differ meaningfully, particularly on hierarchy and time commitment.",
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
      "South Asia — sole representative in this guide. What follows cannot speak for Pakistan, Bangladesh, or Sri Lanka — and India itself varies internally, by region and by sector, more than most countries in this guide.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established family-owned or promoter-led company. A Bangalore tech firm runs flatter and faster than the scores below; a public-sector counterparty slower and more formal. A counterpart educated abroad will flex toward your norms in the room while the decision process behind them does not.",
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
      "South America — sole representative in this guide. Portuguese-speaking Brazil is not a proxy for its Spanish-speaking neighbors; Argentina and Chile, absent, differ on formality and pace.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established São Paulo firm. São Paulo runs more transactional than the rest of the country; Rio and the northeast lean further relational. Multinational subsidiaries follow their headquarters' forms with Brazilian warmth layered over them.",
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
      "Southern Europe — sole representative in this guide. Spain and Greece, absent, share the relational lean but not the specifics — and Italy's own north–south range is wide.",
    lastReviewed: PENDING_DATE,
    reviewedBy: PENDING_REVIEWERS,
    segmentation:
      "The rest of this page describes a first meeting with an established family-owned northern firm (Milan, Bologna, Turin). The south leans further relational and slower. A Milanese finance counterparty may read as northern-European until the contract stage, where the relational pattern reasserts itself.",
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
