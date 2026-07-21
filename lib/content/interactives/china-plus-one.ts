/*
 * Following the Factory (China Plus One) — interactive data (Phases 1+2).
 * Supports the China Plus One flagship report (Strategy domain).
 *
 * Scope note (the report's stated scope, and this map's): every figure
 * is a share of US IMPORTS, not of global production — China still
 * dominates absolute production (~80% of iPhone assembly in 2025)
 * while its share of what America imports has collapsed, and that
 * distinction is the point.
 *
 * Sourcing: the 2025 anchors carried by the report are sourced —
 *   Electronics: US smartphone import shares, Q2 2025
 *     (Canalys/Census-derived): India ~44%, Vietnam ~30%, China ~25%
 *     (down from ~61% in Q2 2024).
 *   Apparel: US apparel import shares by value (OTEXA / Sheng Lu,
 *     2025): China 11.3% (from 19.8% a year earlier), Vietnam
 *     17.7–21.5% depending on series (19.6 used here), the five
 *     non-China Asian suppliers on this map summing to the sourced
 *     record 44.2%, and Mexico 2.3%.
 * The REMAINING 2025 endpoints — the individual apparel splits for
 * Bangladesh, India, Cambodia, and Indonesia, and the small-country
 * electronics shares — are NOT individually sourced: they are
 * estimates set at plausible reported magnitudes and fitted (for
 * apparel) to sum with Vietnam's sourced figure to the 44.2% total.
 * Each is flagged in `estimated2025`, marked "est." in its panel,
 * disclosed in the on-page caption, and guarded below.
 * The 2010 endpoints are stylized per the Phase 1 spec — "China
 * dominant, the other six minimal". Mid-timeline values are linear
 * interpolation between the endpoints: illustrative motion, not
 * year-by-year data. Both facts are labeled on the page.
 *
 * Phase 2 adds the four-field country panels (What moved here, and
 * why / What it cost to build / The labor reality / The ceiling),
 * Vietnam's transshipment-resolution mini-interaction, Mexico's
 * brownfield/greenfield callout, and Key Insights. Where a country's
 * labor story cannot honestly sit under a routine template label
 * (Cambodia, Bangladesh, Indonesia), the field is RESTRUCTURED —
 * rendered as its own distinctly-treated block, the same principle
 * as Airport Ecosystem's and Changi's caution against neutralizing
 * templates.
 */

export type CpoSector = "electronics" | "apparel";

export const cpoQuestion =
  "When manufacturing costs rise in one country, where does it actually go, and does it actually go anywhere at all?";

export const cpoOrientation =
  "Drag the timeline. Switch between apparel and electronics. Click a country to see what moved, and why.";

export const cpoTimeline = { start: 2010, end: 2025 };

/* Map frame, shared by the server geo pipeline and the client SVGs.
 * Pacific-centered window: longitude 62°E eastward across the Pacific
 * to 62°W, latitude −18°…55° (see geo.ts). Height follows at W=960. */
export const CPO_MAP_W = 960;
export const CPO_MAP_H = 343;

export const cpoSectors: { id: CpoSector; name: string }[] = [
  { id: "electronics", name: "Electronics" },
  { id: "apparel", name: "Apparel" },
];

export interface CpoShare {
  start: number; // % of US imports at 2010 (stylized endpoint)
  end: number; // % of US imports at 2025 — sourced anchor, or a fitted
  // estimate where the country's `estimated2025` flags the sector
}

/* The four-field panel. `laborRestructured` pulls The Labor Reality
   out of the routine template into its own distinctly-treated block —
   set where a country's labor story must not read as a filed-away
   field (Cambodia, Bangladesh, Indonesia). */
export interface CpoDetail {
  whatMoved: string;
  whatItCost: string;
  laborReality: string;
  laborRestructured?: boolean;
  ceiling: string;
  /* Per-country label overrides (China's second field becomes
     "What staying costs"). */
  fieldLabels?: Partial<Record<"whatMoved" | "whatItCost" | "ceiling", string>>;
}

export interface CpoCountry {
  id: string;
  numericId: string; // world-atlas (ISO 3166-1 numeric) id
  name: string;
  /* Node anchor [lon, lat]. Where a country is too small or too close
     to a neighbor for its node to sit on its own soil, the anchor is
     nudged into open water and a leader line points home. */
  node: [number, number];
  leaderTo?: [number, number];
  /* Label placement in px relative to the projected node — fixed, so
     labels don't chase the resizing circles. */
  labelOffset: [number, number];
  labelAnchor: "start" | "middle" | "end";
  /* One-line summary shown in the panel header. */
  summary: string;
  shares: Record<CpoSector, CpoShare>;
  /* Provenance: sectors whose 2025 endpoint is NOT an individually
     sourced figure but an estimate fitted at plausible reported
     magnitude — constrained, for apparel, to sum with the sourced
     anchors to the record 44.2% five-supplier total. Rendered as
     "est." in the panel and covered by the on-page caption; guarded
     below so the flags can't silently drift from the data. */
  estimated2025?: Partial<Record<CpoSector, true>>;
  detail: CpoDetail;
}

export const cpoCountries: CpoCountry[] = [
  {
    id: "china",
    numericId: "156",
    name: "China",
    node: [104, 35],
    labelOffset: [50, 6],
    labelAnchor: "start",
    summary:
      "Still the world's factory in absolute terms, but its share of what America imports has fallen fast enough to reorder this map.",
    shares: {
      electronics: { start: 82, end: 25 },
      apparel: { start: 39.5, end: 11.3 },
    },
    detail: {
      whatMoved:
        "Nothing moved here; this is the origin node. China remains the largest single manufacturing base on earth (~80% of iPhone assembly in 2025), and the report's spine claim applies here directly: the label moves easily; the ecosystem doesn't. [Well-established]",
      whatItCost:
        "Moving up instead of out: automation, higher-margin manufacturing, and letting the lowest-margin assembly go. Staying the center of the ecosystem while shedding its cheapest layer is a strategy with real costs. It is just paid in different currency than relocation. [Reported]",
      laborReality:
        "The Chinese factory workers whose jobs moved are a real, undercounted loss in the 'who wins' conversation, plainly stated rather than footnoted: the first people this shift happened to were the people doing the work it moved. [Reported]",
      ceiling:
        "Rising wages: the original driver of the entire shift this map draws. The pressure that pushed the label out of China has not stopped operating on China. [Well-established]",
      fieldLabels: { whatItCost: "What staying costs" },
    },
  },
  {
    id: "vietnam",
    numericId: "704",
    name: "Vietnam",
    node: [107, 16.5],
    labelOffset: [30, 4],
    labelAnchor: "start",
    summary:
      "The biggest single winner of China Plus One: first in US apparel by 2025, past China in smartphones.",
    shares: {
      electronics: { start: 2, end: 30 },
      apparel: { start: 7.0, end: 19.6 },
    },
    detail: {
      whatMoved:
        "Both stories at once: the #1 apparel supplier to the US by 2025, and 30% of US smartphone imports in Q2 2025, past China in both categories in the same year. [Well-established]",
      whatItCost:
        "Real, substantial value-added growth: roughly 84% of the export increase reflects genuine domestic production rather than rerouting, per Duke University's Edmund Malesky. [Reported] The contested remainder is exactly what the measurement control below is for.",
      laborReality:
        "A young workforce absorbed into export manufacturing at extraordinary speed. Wage growth is real, and so is the pressure it puts on Vietnam's own low-cost position: the same cycle that started this map, one country over. [Reported]",
      ceiling:
        "The 40% US transshipment tariff, with criteria that remain undefined: what counts as 'transshipped' is not yet written anywhere an exporter can read, and that uncertainty is itself the ceiling. [Reported]",
    },
  },
  {
    id: "cambodia",
    numericId: "116",
    name: "Cambodia",
    node: [99, -1],
    leaderTo: [105, 12],
    labelOffset: [0, 24],
    labelAnchor: "middle",
    summary:
      "An apparel-led beneficiary of the intra-Asia shift, with almost no electronics story yet.",
    shares: {
      electronics: { start: 0.2, end: 0.5 },
      apparel: { start: 2.4, end: 4.4 },
    },
    estimated2025: { electronics: true, apparel: true },
    detail: {
      whatMoved:
        "Apparel, specifically and almost exclusively: +26.9% growth in 2025 (among the fastest of any supplier), with the share of US buyers sourcing here jumping from 75% to 94% in a single year. [Reported]",
      whatItCost:
        "Very little, and that is the finding: a shallow capability base (~3,000 SKUs, the same tier as Bangladesh) growing on price-sensitive volume rather than built capacity. [Reported]",
      laborRestructured: true,
      laborReality:
        "Markedly less oversight than Bangladesh's mature reform apparatus; the growth is arriving faster than any comparable safety or labor-rights machinery. [Reported] In 2020, the EU partially withdrew Cambodia's 'Everything But Arms' trade preferences on human-rights grounds (a rare case of a Western market revoking access over governance), and that context has not aged out of the current boom. [Reported]",
      ceiling:
        "The SKU range itself: ~3,000 products cannot absorb the breadth of production leaving China. Cambodia's ceiling is capability, not demand. [Reported]",
    },
  },
  {
    id: "bangladesh",
    numericId: "050",
    name: "Bangladesh",
    node: [90, 24],
    labelOffset: [-22, -14],
    labelAnchor: "end",
    summary:
      "Apparel scale without an electronics story: the shift's most single-industry winner.",
    shares: {
      electronics: { start: 0.1, end: 0.3 },
      apparel: { start: 4.6, end: 9.3 },
    },
    estimated2025: { electronics: true, apparel: true },
    detail: {
      whatMoved:
        "The mature, longest-standing apparel destination of the whole shift, its scale built over decades, not tariff cycles. [Well-established]",
      whatItCost:
        "Two remediation systems, two outcomes: the binding Accord (now RSC) passed 90% completion years ago; the government's voluntary Remediation Coordination Cell sits at 59%, or 665 of 1,800 factories. Binding worked; voluntary drifted. [Reported]",
      laborRestructured: true,
      laborReality:
        "The progress is real: 1,548 apparel workers died in factory disasters between 2005 and 2013; since Rana Plaza forced the binding Accord, 18. [Reported] It is also incomplete: in October 2025, a fire at Anwar Fashions killed 16 workers, one of them 14 years old, behind a locked roof exit. Rana Plaza's exact failure mode, 13 years later. [Reported] The structural finding underneath: factories serving non-traditional buyers (Russia, Brazil, the UAE) face no safety pressure at all, because those buyers don't require it. Labor organizer Kalpona Akter's long-standing point stands: only binding legal obligations have changed factory behavior here; voluntary codes did not, and markets that ask for nothing get nothing. [Reported]",
      ceiling:
        "Erosion of the very leverage that produced the progress: as the customer base diversifies toward markets that never asked about safety, the Western-buyer pressure that built the Accord covers a shrinking share of the industry. [Reported]",
    },
  },
  {
    id: "india",
    numericId: "356",
    name: "India",
    node: [77, 20],
    labelOffset: [-6, 44],
    labelAnchor: "middle",
    summary:
      "The electronics surprise: from under 1% of Apple's iPhone output in 2017 to a quarter of it, and 44% of US smartphone imports, by 2025.",
    shares: {
      electronics: { start: 1, end: 44 },
      apparel: { start: 4.0, end: 6.3 },
    },
    estimated2025: { apparel: true },
    detail: {
      whatMoved:
        "iPhone assembly: under 1% of Apple's global output in 2017, 25% by the end of 2025; in Q2 2025 India overtook China as the largest source of US smartphone imports, at 44% (Canalys). [Well-established]",
      whatItCost:
        "A ~$21bn production-linked incentive (PLI) program, plus a 55%-versus-10% tariff duty gap doing quiet work underneath. The employment claim (175,000 jobs, three-quarters held by women) is the PLI scheme's own government-attributed figure, not independently verified. [Contested]",
      laborReality:
        "Electronics assembly has pulled large numbers of first-generation factory workers, disproportionately women, into formal employment; conditions and wage trajectories vary widely by state and campus, and the scale is too new for settled evidence. [Reported]",
      ceiling:
        "Assembly still runs 5–8% (by some estimates up to 10%) costlier than China, propped up by subsidies and the duty gap. Both props are narrowing: the PLI program expires in March 2026, and the tariff politics are unstable (China recalling Foxconn's Chinese engineers from Indian plants; a US tariff threat answered by Apple's $600bn US investment pledge). [Reported]",
    },
  },
  {
    id: "indonesia",
    numericId: "360",
    name: "Indonesia",
    node: [113, -4],
    labelOffset: [24, 6],
    labelAnchor: "start",
    summary:
      "A steady, second-tier apparel gainer inside Asia's record combined share.",
    shares: {
      electronics: { start: 0.5, end: 1.2 },
      apparel: { start: 5.0, end: 4.6 },
    },
    estimated2025: { electronics: true, apparel: true },
    detail: {
      whatMoved:
        "Not apparel volume but an EV battery supply chain, built out around the world's largest nickel reserves, with roughly $65bn in cumulative Chinese investment. [Reported]",
      whatItCost:
        "Ownership, mostly: about 75% of nickel refining capacity is Chinese-controlled. The oft-quoted 90% figure is a different statistic (smelters BUILT, a construction count, not control) and the two should not be swapped. [Reported] Economist Faisal Basri's sharper 'who wins' estimate: roughly 90% of the profits accrue to foreign firms. [Contested]",
      laborRestructured: true,
      laborReality:
        "Start with who is paying: in October 2025, eleven Indigenous protesters from the Maba Sangaji community were jailed for opposing mining on their land, and Buli Bay's waters carry the contamination of the refining boom. [Reported] Only after that does the strategic standoff belong here, and it is active, not historical: China's shift toward nickel-free LFP batteries has cut Tsingshan's Weda Bay ore quota by roughly 70%, paused Huayou's capacity expansion, and produced a formal complaint from the Chinese Chamber of Commerce to President Prabowo. The consequence lands on the same communities first. [Reported]",
      ceiling:
        "China's own turn to nickel-free battery chemistry structurally undermines the industry Chinese investment built here: the buyer and the builder are the same party, and it is walking away from its own project. A real, unresolved contradiction. [Reported]",
    },
  },
  {
    id: "mexico",
    numericId: "484",
    name: "Mexico",
    node: [-102.5, 23.5],
    labelOffset: [0, 30],
    labelAnchor: "middle",
    summary:
      "The nearshoring narrative's home and, in apparel, its clearest counterexample: 2.3% of US imports and falling.",
    shares: {
      electronics: { start: 3, end: 1.5 },
      apparel: { start: 4.5, end: 2.3 },
    },
    estimated2025: { electronics: true },
    detail: {
      whatMoved:
        "The headline says record investment; the composition says something quieter; see the callout below, which this field deliberately does not compress into one line. [Reported]",
      whatItCost:
        "The 'shelter company' mechanism, foreign manufacturers operating under a Mexican intermediary's legal identity, makes true origin as hard to count here as transshipment makes it in Vietnam: a structural parallel, both numbers effectively unknowable by design. [Reported]",
      laborReality:
        "Manufacturing wages that once anchored the maquila belt have risen with formalization and USMCA labor provisions; the labor story here is steadier than the investment story. [Reported]",
      ceiling:
        "The USMCA review, due July 1, 2026, is the single biggest open variable for Mexico's entire trajectory. Its outcome is not yet knowable, and this panel says so rather than guessing. [Reported]",
    },
  },
];

/* Persistent honesty captions (rendered under the map). House style:
   no em dashes in this box. */
export const cpoCaptions = {
  sizing:
    "Node size encodes share of US imports, not a live trade index. Every figure is a US-market share, per the report's stated scope. Sourced 2025 anchors: China and Vietnam in both sectors, India's electronics share, Mexico's apparel share, and the five-supplier 44.2% apparel total. The remaining 2025 shares, including Bangladesh's and India's individual apparel splits, are estimates fitted within that sourced total and are marked 'est.' in their panels.",
  baseline:
    "The 2010 baseline is stylized: China dominant, the other six minimal, and between the endpoints the motion is illustrative interpolation, not year-by-year data.",
  scope:
    "Malaysia and Thailand are deliberately outside this map's scope: a stated gap, not an oversight.",
  cafta:
    "Off this map entirely: CAFTA-DR Central America fell from 9.6% to 7.6% of US apparel imports. The industry everyone assumed would nearshore first is not nearshoring.",
};

/* ------------------------------------------------------------------ */
/* Special interaction 1 — Vietnam's transshipment range.              */
/* Rerouting estimates shrink as measurement gets more granular; the   */
/* finest-grained series (firm-level, the original researchers' most   */
/* trusted) gives the lowest number. Ordered coarse → fine.            */
/* ------------------------------------------------------------------ */

export interface CpoTransshipmentLevel {
  id: string;
  name: string;
  estimate: number; // %
  /* What the % is OF — the province series measures growth, not
     exports, and must be labeled precisely. */
  measure: string;
}

export const cpoTransshipment: {
  levels: CpoTransshipmentLevel[];
  explanation: string;
  quote: string;
} = {
  levels: [
    {
      id: "product",
      name: "Product-level",
      estimate: 16.5,
      measure: "of exports, matched at the product-category level",
    },
    {
      id: "province",
      name: "Province-level",
      estimate: 8.8,
      measure: "of 2018–2021 export GROWTH (growth, not total exports)",
    },
    {
      id: "firm",
      name: "Firm-level",
      estimate: 1.7,
      measure:
        "of exports, from firm-level records, the series the original researchers consider most reliable",
    },
  ],
  explanation:
    "The estimate shrinks as the measurement gets more granular: coarse product categories can't tell relabeled goods from genuinely new production, and the finest-grained data, which the original researchers trust most, gives the lowest number. The answer depends on your resolution.",
  quote:
    "One path “creates jobs and revenue. The other just moves labels.” — Edmund Malesky, Duke University",
};

/* ------------------------------------------------------------------ */
/* Special interaction 2 — Mexico's brownfield/greenfield callout.     */
/* Three true numbers that appear to conflict, reconciled.             */
/* ------------------------------------------------------------------ */

export const cpoMexicoCallout = {
  title: "Brownfield, not greenfield: three true numbers, reconciled",
  stats: [
    {
      label: "Chinese FDI into Mexico",
      value: "−80%",
      note: "$3.017bn → $588.3m, 2024→2025",
    },
    {
      label: "Total FDI into Mexico",
      value: "$41bn",
      note: "a record, 2025",
    },
    {
      label: "New greenfield investment",
      value: "$6.6bn",
      note: "recovered, but still below the 2015–2022 average of $13bn",
    },
  ],
  finding:
    "The reconciliation: record capital is mostly reinvested earnings inside existing operations, not new factories. The nearshoring 'land rush' the headline FDI number implies is thinner than it looks. [Reported]",
  dissent:
    "The balancing voices: Economy Minister Marcelo Ebrard disputes the pessimistic reading of these figures outright; and the 'spill-shoring' reframe holds that “there is a lot of investment coming into Mexico simply because the US cannot take it.” [Contested]",
};

/* Key Insights — four cards; Indonesia's leads with the human cost,
   matching its panel's own restructuring principle. */
export const cpoInsights: { tag: string; text: string }[] = [
  {
    tag: "The Divergence",
    text: "Flip the toggle: apparel diversified aggressively within Asia (a record 73% of US apparel imports) while Mexico fell to 2.3%. The industry everyone assumed would nearshore first didn't.",
  },
  {
    tag: "Vietnam",
    text: "Vietnam passed China twice in the same year: the #1 apparel supplier to the US, and past China in smartphone imports. The only country on this map that won both stories at once.",
  },
  {
    tag: "Mexico",
    text: "Three true numbers, one finding: Chinese FDI down 80%, total FDI at a record $41bn, new greenfield at half its 2015–2022 average. Record capital is mostly reinvested earnings in existing plants, not new factories.",
  },
  {
    tag: "Indonesia",
    text: "Eleven jailed Indigenous protesters and a contaminated bay are the near-term price of a nickel build-out whose own funder, China, is now moving to nickel-free batteries. The human bill arrived before the strategic one.",
  },
];

/* Share at an arbitrary year: linear interpolation between the 2010
   and 2025 endpoints (Phase 1's stylized motion). */
export function cpoShareAt(
  country: CpoCountry,
  sector: CpoSector,
  year: number,
): number {
  const { start, end } = country.shares[sector];
  const t = Math.min(
    1,
    Math.max(0, (year - cpoTimeline.start) / (cpoTimeline.end - cpoTimeline.start)),
  );
  return start + (end - start) * t;
}

/* Node radius: area encodes share (sqrt), floored so tiny players
   stay visible and clickable. */
export function cpoRadius(share: number): number {
  return Math.max(3, 4.6 * Math.sqrt(share));
}

export function getCpoCountry(id: string): CpoCountry | null {
  return cpoCountries.find((c) => c.id === id) ?? null;
}

/* ------------------------------------------------------------------ */
/* Consistency guards. Deterministic over static data and unguarded,   */
/* so a violation fails `next build` at prerender:                     */
/* 1. every country carries both sectors' endpoints;                   */
/* 2. the five non-China Asian apparel shares must sum to the sourced  */
/*    record figure (44.2% of US apparel imports, 2024/25) — if the    */
/*    per-country numbers drift, the sourced total breaks loudly;      */
/* 3. the 2025 electronics podium matches the sourced ordering:        */
/*    India > Vietnam > China.                                         */
/* ------------------------------------------------------------------ */
{
  for (const c of cpoCountries) {
    for (const sector of ["electronics", "apparel"] as const) {
      const s = c.shares[sector];
      if (
        !s ||
        !Number.isFinite(s.start) ||
        !Number.isFinite(s.end) ||
        s.start < 0 ||
        s.end < 0
      ) {
        throw new Error(
          `China Plus One: country "${c.id}" has invalid ${sector} shares.`,
        );
      }
    }
  }
  const asianNonChina = ["vietnam", "bangladesh", "india", "indonesia", "cambodia"];
  const sum = asianNonChina.reduce(
    (acc, id) => acc + getCpoCountry(id)!.shares.apparel.end,
    0,
  );
  if (Math.abs(sum - 44.2) > 0.05) {
    throw new Error(
      `China Plus One: non-China Asian 2025 apparel shares sum to ${sum.toFixed(1)}, not the sourced 44.2.`,
    );
  }
  const e = (id: string) => getCpoCountry(id)!.shares.electronics.end;
  if (!(e("india") > e("vietnam") && e("vietnam") > e("china"))) {
    throw new Error(
      "China Plus One: 2025 electronics ordering must be India > Vietnam > China (sourced Q2 2025 smartphone import shares).",
    );
  }
  /* Phase 2 guards. */
  for (const c of cpoCountries) {
    for (const key of ["whatMoved", "whatItCost", "laborReality", "ceiling"] as const) {
      if (!c.detail[key] || c.detail[key].trim().length < 40) {
        throw new Error(
          `China Plus One: country "${c.id}" has a missing or token "${key}" field.`,
        );
      }
    }
  }
  for (const id of ["cambodia", "bangladesh", "indonesia"]) {
    if (!getCpoCountry(id)!.detail.laborRestructured) {
      throw new Error(
        `China Plus One: "${id}" must carry the restructured labor treatment — its labor story does not belong under a routine template label.`,
      );
    }
  }
  if (!getCpoCountry("india")!.detail.whatItCost.includes("[Contested]")) {
    throw new Error(
      "China Plus One: India's PLI jobs figure must be tagged [Contested] and government-attributed.",
    );
  }
  const est = cpoTransshipment.levels.map((l) => l.estimate);
  if (!(est[0] > est[1] && est[1] > est[2])) {
    throw new Error(
      "China Plus One: transshipment estimates must strictly shrink as granularity increases (coarse → fine).",
    );
  }
  /* Provenance guards: the estimated-2025 flags must match reality.
     Sourced anchors (China + Vietnam both sectors, India electronics,
     Mexico apparel) must NOT be flagged; every fitted estimate MUST
     be — so an unflagged estimate, or a flag on a sourced figure,
     fails the build rather than quietly mislabeling provenance. */
  const expectedEstimates: Record<string, CpoSector[]> = {
    china: [],
    vietnam: [],
    cambodia: ["electronics", "apparel"],
    bangladesh: ["electronics", "apparel"],
    india: ["apparel"],
    indonesia: ["electronics", "apparel"],
    mexico: ["electronics"],
  };
  for (const c of cpoCountries) {
    const expected = expectedEstimates[c.id];
    if (!expected) {
      throw new Error(
        `China Plus One: country "${c.id}" has no provenance expectation registered.`,
      );
    }
    for (const sector of ["electronics", "apparel"] as const) {
      const flagged = c.estimated2025?.[sector] === true;
      const shouldBe = expected.includes(sector);
      if (flagged !== shouldBe) {
        throw new Error(
          `China Plus One: "${c.id}" ${sector} 2025 provenance flag is ${flagged} but must be ${shouldBe} — sourced anchors and fitted estimates may not be conflated.`,
        );
      }
    }
  }
  if (!cpoCaptions.sizing.includes("est.") || !cpoCaptions.baseline.includes("stylized")) {
    throw new Error(
      "China Plus One: the on-page captions must disclose the fitted estimates and the stylized 2010 baseline.",
    );
  }
}
