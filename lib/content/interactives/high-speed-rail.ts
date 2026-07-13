/*
 * High-Speed Rail Around the World — interactive data (Phase 1).
 * All figures live here so real numbers can be swapped without touching
 * component code. Rail line geometries are PLACEHOLDER polylines
 * ([lon, lat] waypoints) — plausible corridors, not route-accurate.
 */

export interface GrowthPoint {
  year: number;
  km: number;
}

export interface HsrCountry {
  id: string; // slug
  numericId: string; // world-atlas (ISO 3166-1 numeric) id
  name: string;
  pullQuote: string;
  infrastructure: {
    stats: string[]; // 2–3 short stat lines
    growth: GrowthPoint[]; // km over time (chart)
    growthNote?: string;
  };
  economics: {
    stats: string[];
    costPerKm: number | null; // $M per km (comparison chart)
    costNote?: string;
  };
  operations: string[]; // 2–3 short lines
  culture: string; // 1–2 sentence editorial paragraph
  /* Map behavior */
  focus: { center: [number, number]; scale: number };
  railLines: { points: [number, number][]; dashed?: boolean }[];
}

export const hsrQuestion =
  "Why have some countries built world-class high-speed rail systems while others continue to struggle?";

/* Timeline (Phase 2a): the scrubber spans the Shinkansen's opening year
 * to the present. */
export const hsrTimeline = { start: 1964, end: 2024 };

/* Map frame, shared by the server geo pipeline and the client SVGs.
 * The projection is fitted to a cropped window — longitude −169°…172°,
 * latitude −12° (the top of Australia) to 78° — so the frame carries
 * no Antarctica, no far southern ocean, and less empty Pacific on
 * either edge (see geo.ts). Height follows from that window at W=960. */
export const HSR_MAP_W = 960;
export const HSR_MAP_H = 282;

/*
 * Network size at an arbitrary year: 0 before the first build year,
 * linear interpolation between known growth points, flat after the
 * last. Fractional years are fine — the scrubber is continuous.
 */
export function hsrKmAtYear(growth: GrowthPoint[], year: number): number {
  if (growth.length === 0 || year < growth[0].year) return 0;
  const last = growth[growth.length - 1];
  if (year >= last.year) return last.km;
  for (let i = 1; i < growth.length; i++) {
    if (year <= growth[i].year) {
      const a = growth[i - 1];
      const b = growth[i];
      const t = (year - a.year) / (b.year - a.year);
      return a.km + t * (b.km - a.km);
    }
  }
  return last.km;
}

/* Key insights — static cards below the map, and (Phase 2b) map-native
 * pins that reveal as the timeline crosses each insight's year.
 * DRAFT PLACEHOLDER text. */
export interface HsrInsight {
  country: string;
  countryId: string; // matches HsrCountry.id — anchors the map pin
  year: number; // the scrubber year at which the pin reveals
  text: string;
}

export const hsrInsights: HsrInsight[] = [
  {
    country: "Italy",
    countryId: "italy",
    year: 2009, // dual-operator era begins (see infrastructure stats)
    text: "Direct competition between operators on the same tracks drove fares down and service up: proof that liberalization, not just investment, can be a growth strategy.",
  },
  {
    country: "China",
    countryId: "china",
    /* 2014: computed from the growth series above — the first year
       China's interpolated network exceeds the other eight countries'
       combined total (≈16,400 km vs ≈15,600 km; in 2013 it still
       trails). */
    year: 2014,
    text: "China built more high-speed rail in twenty years than the rest of the world combined.",
  },
  {
    country: "United States",
    countryId: "united-states",
    year: 2024, // the insight is about absence — pinned to the present
    text: "The American gap isn't geography or engineering — it's follow-through.",
  },
];

export const hsrCountries: HsrCountry[] = [
  {
    id: "japan",
    numericId: "392",
    name: "Japan",
    pullQuote: "9,000 km built since 1964",
    infrastructure: {
      stats: ["9,000 km total", "320 km/h top speed", "9 Shinkansen lines"],
      growth: [
        { year: 1964, km: 515 },
        { year: 1980, km: 2000 },
        { year: 2000, km: 5800 },
        { year: 2024, km: 9000 },
      ],
    },
    economics: {
      stats: [
        "~$50M/km construction cost",
        "~350M annual riders",
        "100%+ cost recovery",
      ],
      costPerKm: 50,
    },
    operations: [
      "Trains every 3 min at peak (Tokyo–Osaka)",
      "<1 min average delay",
      "Privatized (JR companies, formerly state JNR)",
    ],
    culture:
      "Rail in Japan isn't infrastructure — it's a civic promise. Punctuality is treated as a moral obligation, not a service metric, and that standard shapes everything from timetable design to how apologies are issued when a train runs late by seconds.",
    focus: { center: [137.5, 37], scale: 5 },
    railLines: [
      {
        points: [
          [139.7, 35.7],
          [136.9, 35.2],
          [135.5, 34.7],
          [132.5, 34.4],
          [130.4, 33.6],
        ],
      },
      {
        points: [
          [139.7, 35.7],
          [140.9, 38.3],
          [141.1, 39.7],
          [140.7, 40.8],
        ],
      },
      {
        points: [
          [139.7, 35.7],
          [139.0, 37.9],
        ],
      },
      {
        points: [
          [136.6, 36.6],
          [136.9, 35.2],
        ],
      },
    ],
  },
  {
    id: "china",
    numericId: "156",
    name: "China",
    pullQuote: "40,000 km in under 20 years",
    infrastructure: {
      stats: [
        "40,000+ km total",
        "350 km/h top speed",
        "World's largest network",
      ],
      growth: [
        { year: 2000, km: 0 },
        { year: 2008, km: 649 },
        { year: 2015, km: 19000 },
        { year: 2024, km: 40000 },
      ],
    },
    economics: {
      stats: [
        "~$30M/km construction cost (state-subsidized labor/land)",
        "~2.5B annual riders",
        "~50% cost recovery (many regional lines run at a loss)",
      ],
      costPerKm: 30,
    },
    operations: [
      "Trains every 5–10 min on core corridors",
      "State-owned (China Railway)",
      "Centrally planned expansion",
    ],
    culture:
      "China treated high-speed rail as a demonstration of national capability as much as a transit solution — a network built fast enough to become a symbol of what centralized planning can execute, whether or not every line pays for itself.",
    focus: { center: [105, 34], scale: 2.4 },
    railLines: [
      {
        points: [
          [116.4, 39.9],
          [117.2, 36.7],
          [118.8, 32.1],
          [121.5, 31.2],
        ],
      },
      {
        points: [
          [116.4, 39.9],
          [114.5, 34.8],
          [114.3, 30.6],
          [113.0, 25.8],
          [113.3, 23.1],
          [114.1, 22.5],
        ],
      },
      {
        points: [
          [121.5, 31.2],
          [117.3, 31.9],
          [114.3, 30.6],
        ],
      },
      {
        points: [
          [116.4, 39.9],
          [112.5, 37.9],
          [108.9, 34.3],
          [104.1, 30.7],
        ],
      },
      {
        points: [
          [126.5, 45.8],
          [123.4, 41.8],
          [116.4, 39.9],
        ],
      },
      {
        points: [
          [103.8, 36.1],
          [98.5, 39.7],
          [93.5, 42.8],
          [87.6, 43.8],
        ],
      },
      {
        points: [
          [121.5, 31.2],
          [120.2, 30.3],
          [118.1, 26.6],
          [113.3, 23.1],
        ],
      },
    ],
  },
  {
    id: "france",
    numericId: "250",
    name: "France",
    pullQuote: "Paris–Lyon cut travel time by 60% overnight",
    infrastructure: {
      stats: ["2,800 km total", "320 km/h top speed", "TGV network since 1981"],
      growth: [
        { year: 1981, km: 417 },
        { year: 1990, km: 1250 },
        { year: 2010, km: 1900 },
        { year: 2024, km: 2800 },
      ],
    },
    economics: {
      stats: [
        "~$25M/km construction cost",
        "~120M annual riders",
        "~90% cost recovery",
      ],
      costPerKm: 25,
    },
    operations: [
      "Trains every 30–60 min on core routes",
      "State-owned (SNCF)",
      "Centralized national planning",
    ],
    culture:
      "France chose rail as national industrial policy decades before most competitors — the TGV wasn't just a train, it was a statement that the state could out-engineer the automobile and the airplane at once.",
    focus: { center: [2.5, 46.6], scale: 6 },
    railLines: [
      {
        points: [
          [2.35, 48.86],
          [4.84, 45.76],
          [4.8, 44.1],
          [5.37, 43.3],
        ],
      },
      {
        points: [
          [2.35, 48.86],
          [0.35, 46.6],
          [-0.58, 44.84],
        ],
      },
      {
        points: [
          [2.35, 48.86],
          [4.03, 48.3],
          [7.75, 48.58],
        ],
      },
      {
        points: [
          [2.35, 48.86],
          [3.06, 50.63],
          [1.85, 50.95],
        ],
      },
      {
        points: [
          [2.35, 48.86],
          [0.2, 48.0],
          [-1.68, 48.11],
        ],
      },
    ],
  },
  {
    id: "spain",
    numericId: "724",
    name: "Spain",
    pullQuote: "Europe's largest network, built in under 30 years",
    infrastructure: {
      stats: ["3,900 km total", "310 km/h top speed", "AVE network since 1992"],
      growth: [
        { year: 1992, km: 471 },
        { year: 2005, km: 1500 },
        { year: 2015, km: 3100 },
        { year: 2024, km: 3900 },
      ],
    },
    economics: {
      stats: [
        "~$20M/km construction cost (lower due to flat terrain)",
        "~40M annual riders",
        "~60% cost recovery",
      ],
      costPerKm: 20,
    },
    operations: [
      "Trains every 30–45 min on core corridors",
      "Mixed state/private operators (Renfe, competitors since 2021)",
      "Liberalized market",
    ],
    culture:
      "Spain built more track than ridership initially justified — a bet that rail could reshape which cities counted as connected, made before the demand curve caught up.",
    focus: { center: [-3.8, 40], scale: 6 },
    railLines: [
      {
        points: [
          [-3.7, 40.4],
          [-1.0, 41.65],
          [2.17, 41.39],
        ],
      },
      {
        points: [
          [-3.7, 40.4],
          [-4.78, 37.88],
          [-5.99, 37.39],
        ],
      },
      {
        points: [
          [-3.7, 40.4],
          [-1.87, 39.99],
          [-0.38, 39.47],
        ],
      },
      {
        points: [
          [-3.7, 40.4],
          [-4.72, 41.65],
        ],
      },
      {
        points: [
          [-4.78, 37.88],
          [-4.42, 36.72],
        ],
      },
    ],
  },
  {
    id: "south-korea",
    numericId: "410",
    name: "South Korea",
    pullQuote: "Seoul–Busan travel time nearly halved",
    infrastructure: {
      stats: ["1,100 km total", "305 km/h top speed", "KTX network since 2004"],
      growth: [
        { year: 2004, km: 412 },
        { year: 2010, km: 650 },
        { year: 2024, km: 1100 },
      ],
    },
    economics: {
      stats: [
        "~$35M/km construction cost (heavy tunneling)",
        "~85M annual riders",
        "~85% cost recovery",
      ],
      costPerKm: 35,
    },
    operations: [
      "Trains every 15–20 min on core corridor",
      "State-owned (Korail)",
      "Dense single-corridor focus",
    ],
    culture:
      "Korea's network is narrow by design — concentrated almost entirely on the Seoul–Busan spine, betting depth of service on one corridor over breadth across the country.",
    focus: { center: [127.8, 36.2], scale: 8.5 },
    railLines: [
      {
        points: [
          [126.98, 37.57],
          [127.38, 36.35],
          [128.6, 35.87],
          [129.07, 35.18],
        ],
      },
      {
        points: [
          [127.38, 36.35],
          [126.85, 35.16],
        ],
      },
    ],
  },
  {
    id: "germany",
    numericId: "276",
    name: "Germany",
    pullQuote: "A network built for connection, not speed records",
    infrastructure: {
      stats: [
        "1,600 km dedicated high-speed track",
        "300 km/h top speed",
        "ICE network since 1991",
      ],
      growth: [
        { year: 1991, km: 100 },
        { year: 2002, km: 900 },
        { year: 2015, km: 1400 },
        { year: 2024, km: 1600 },
      ],
    },
    economics: {
      stats: [
        "~$40M/km construction cost",
        "~150M annual riders",
        "~75% cost recovery",
      ],
      costPerKm: 40,
    },
    operations: [
      "Trains every 30–60 min, integrated with regional rail",
      "State-owned (Deutsche Bahn)",
      "Hybrid high-speed/conventional track sharing",
    ],
    culture:
      "Germany never fully committed to dedicated high-speed infrastructure the way Japan or France did — ICE trains often share track with regional and freight rail, a compromise that prioritizes network integration over top-line speed.",
    focus: { center: [10.2, 51.1], scale: 6.5 },
    railLines: [
      {
        points: [
          [6.96, 50.94],
          [8.68, 50.11],
        ],
      },
      {
        points: [
          [9.73, 52.37],
          [9.93, 49.79],
        ],
      },
      {
        points: [
          [13.4, 52.52],
          [11.03, 50.98],
          [11.08, 49.45],
          [11.58, 48.14],
        ],
      },
      {
        points: [
          [9.99, 53.55],
          [9.73, 52.37],
        ],
      },
      {
        points: [
          [9.18, 48.78],
          [8.47, 49.49],
          [8.68, 50.11],
        ],
      },
    ],
  },
  {
    id: "italy",
    numericId: "380",
    name: "Italy",
    pullQuote: "Private competition cut fares by a third",
    infrastructure: {
      stats: [
        "1,000 km total",
        "300 km/h top speed",
        "Dual-operator system since 2009",
      ],
      growth: [
        { year: 2009, km: 250 },
        { year: 2015, km: 650 },
        { year: 2024, km: 1000 },
      ],
    },
    economics: {
      stats: [
        "~$45M/km construction cost (extensive tunneling)",
        "~65M annual riders",
        "~80% cost recovery",
      ],
      costPerKm: 45,
    },
    operations: [
      "Trains every 20–30 min on Milan–Rome corridor",
      "Competing operators (Trenitalia + private Italo)",
      "Europe's first open-access competition model",
    ],
    culture:
      "Italy is the rare case where direct competition between operators on the same tracks drove fares down and service up — proof that liberalization, not just investment, can be a growth strategy.",
    focus: { center: [12.3, 42.8], scale: 6 },
    railLines: [
      {
        points: [
          [7.69, 45.07],
          [9.19, 45.46],
          [11.34, 44.49],
          [11.26, 43.77],
          [12.5, 41.9],
          [14.27, 40.85],
          [14.79, 40.68],
        ],
      },
      {
        points: [
          [9.19, 45.46],
          [10.99, 45.44],
          [12.34, 45.44],
        ],
      },
    ],
  },
  {
    id: "united-kingdom",
    numericId: "826",
    name: "United Kingdom",
    pullQuote: "One line, three decades of debate",
    infrastructure: {
      stats: [
        "113 km dedicated high-speed track (HS1)",
        "300 km/h top speed",
        "Limited to the Channel Tunnel corridor",
      ],
      growth: [
        { year: 2003, km: 74 },
        { year: 2007, km: 113 },
        { year: 2024, km: 113 },
      ],
      growthNote: "Phase 1 (2003), Phase 2 complete (2007) — unchanged since.",
    },
    economics: {
      stats: [
        "~$110M/km construction cost (dense urban tunneling)",
        "~10M annual riders (Eurostar)",
        "~65% cost recovery",
      ],
      costPerKm: 110,
    },
    operations: [
      "Trains every 30–60 min",
      "Privatized (Eurostar)",
      "Politically stalled expansion (HS2 scaled back repeatedly)",
    ],
    culture:
      "Britain built one high-speed line and spent the next twenty years arguing about a second — HS2's repeated scaling-back has made it a case study in how political cycles can outlast infrastructure ambition.",
    focus: { center: [-1.8, 53], scale: 6.2 },
    railLines: [
      {
        points: [
          [-0.12, 51.5],
          [0.5, 51.3],
          [0.87, 51.15],
          [1.17, 51.08],
        ],
      },
    ],
  },
  {
    id: "united-states",
    numericId: "840",
    name: "United States",
    pullQuote: "Zero true high-speed rail, after 50 years of proposals",
    infrastructure: {
      stats: [
        "0 km true high-speed (Acela reaches 240 km/h on short segments only)",
        "Dozens of proposed or stalled projects since the 1960s",
      ],
      growth: [
        { year: 1970, km: 0 },
        { year: 2000, km: 0 },
        { year: 2024, km: 0 },
      ],
      growthNote: "Flat — no dedicated high-speed network exists nationally.",
    },
    economics: {
      stats: [
        "California High-Speed Rail alone has exceeded $30M/km, costs still rising",
        "Acela ridership ~3.5M annually",
        "Cost recovery not comparable (no dedicated network)",
      ],
      costPerKm: 30,
      costNote: "California HSR, still under construction.",
    },
    operations: [
      "Acela shares track with freight and commuter rail",
      "Amtrak (federally subsidized)",
      "Project ownership fragmented across states",
    ],
    culture:
      "The U.S. hasn't lacked proposals — it's lacked the sustained political and funding continuity that every other country on this map treated as non-negotiable. The gap here isn't geography or engineering. It's follow-through.",
    focus: { center: [-96, 38.5], scale: 1.9 },
    railLines: [
      {
        points: [
          [-71.06, 42.36],
          [-74.0, 40.71],
          [-75.16, 39.95],
          [-77.04, 38.9],
        ],
        dashed: true,
      },
      {
        points: [
          [-122.42, 37.77],
          [-119.77, 36.75],
          [-118.24, 34.05],
        ],
        dashed: true,
      },
    ],
  },
];
