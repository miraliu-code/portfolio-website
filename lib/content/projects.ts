import type {
  Block,
  DomainSlug,
  NoteEntry,
  Project,
  ReadingEntry,
  StandardProject,
  TabSection,
} from "./types";

/*
 * The Atlas project registry, populated from the Atlas Editorial Roadmap.
 * Titles, formats, and lengths are real; all prose is DRAFT PLACEHOLDER
 * (draft: true renders a visible badge). A handful of flagship pieces
 * carry fuller draft prose; the rest are roadmap stubs awaiting writing.
 */

const heroes = [
  "/placeholders/ph-1.svg",
  "/placeholders/ph-2.svg",
  "/placeholders/ph-3.svg",
  "/placeholders/ph-4.svg",
  "/placeholders/ph-5.svg",
  "/placeholders/ph-6.svg",
];
let heroIndex = 0;
const nextHero = () => heroes[heroIndex++ % heroes.length];

const minutesByFormat: Record<string, number> = {
  "Flagship Report": 18,
  "Case Study": 12,
  "White Paper": 12,
  "Executive Memo": 6,
  Essay: 8,
  "Field Guide": 10,
  "Atlas Note": 4,
  "Reading Entry": 5,
};

interface StubInput {
  slug: string;
  folder: string;
  coordinate: string;
  title: string;
  question: string;
  format: string;
  length: string;
  organizations?: string[];
  explorable?: boolean;
  overview?: string;
}

function stub(domain: DomainSlug, s: StubInput): StandardProject {
  return {
    type: "standard",
    slug: s.slug,
    domain,
    folder: s.folder,
    coordinate: s.coordinate,
    title: s.title,
    question: s.question,
    date: "2026-07-01",
    readingTime: minutesByFormat[s.format.split(" + ")[0]] ?? 10,
    format: s.format,
    length: s.length,
    hero: nextHero(),
    draft: true,
    organizations: s.organizations,
    explorable: s.explorable,
    artifacts: [],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text:
              s.overview ??
              `Planned ${s.format.toLowerCase()} (${s.length}). ${s.question} This investigation is on the Atlas editorial roadmap; the draft has not yet been published. (Roadmap placeholder.)`,
          },
        ],
      },
    ],
  };
}

/* ============================ STRATEGY ============================ */

const strategy: StandardProject[] = [
  /* -- Michelin: flagship with fuller draft prose -- */
  {
    type: "standard",
    slug: "michelin-guide",
    domain: "strategy",
    folder: "market-strategy",
    coordinate: "S-01",
    title: "The Michelin Guide",
    question:
      "How did a tire company become one of the world's most trusted cultural institutions?",
    date: "2026-06-15",
    readingTime: 22,
    format: "Flagship Report",
    length: "40–50 pp",
    hero: nextHero(),
    draft: true,
    longReport: true,
    pdf: "/artifacts/sample-report.pdf",
    organizations: ["Michelin"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "In 1900, a tire manufacturer printed a free guide to encourage the French to drive more. A century later, that guide can close a restaurant with a phone call. This report asks how a piece of marketing collateral became one of the world's most trusted cultural institutions — and what its discipline teaches organizations about earning authority they were never granted. (Draft placeholder.)",
          },
          {
            kind: "quote",
            text: "Michelin never asked permission to judge the world's kitchens. It earned the standing one anonymous meal at a time.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Three commitments appear to hold the Guide's authority together. First, anonymity: inspectors pay for their meals, and the organization spends real money to keep them unknown — credibility as an operating cost. Second, scarcity: stars are withheld far more often than they are granted, and the third star remains rare enough to reorganize a chef's life. Third, independence from the parent business: the Guide has never obviously served the tire company's quarterly interests, which is precisely why it serves the brand's century-long ones. (Draft placeholder.)",
          },
          {
            kind: "p",
            text: "The comparison set — rating agencies, awards bodies, review platforms — mostly failed to protect one of the three. Platforms monetized attention and lost scarcity; agencies monetized the rated and lost independence.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "For organizations seeking Michelin-grade trust, the transferable lesson is that authority is a cost center. Fund the expensive, invisible disciplines — verification, anonymity, restraint — before the visible ones, and let decades do the compounding. (Draft placeholder.)",
          },
          {
            kind: "list",
            items: [
              "Separate the judging function structurally from the commercial one.",
              "Protect scarcity even when demand begs you to inflate.",
              "Treat credibility expenses as brand capital, not overhead.",
            ],
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Full report (PDF)",
        kind: "pdf",
        href: "/artifacts/sample-report.pdf",
        description: "The complete written analysis as a downloadable document.",
      },
      {
        label: "Institution comparison framework",
        kind: "framework",
        description:
          "Anonymity, scarcity, independence — scored across rating institutions. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "michelin-guide-identity",
        relationship: "expand",
        note: "The same institution, read through its visual system.",
      },
      {
        slug: "trust-organizational-asset",
        relationship: "deepen",
        note: "Trust as a balance-sheet item, argued in full.",
      },
      {
        slug: "shenzhen-metro-observations",
        relationship: "observe",
        note: "Another system that earns trust through visible discipline.",
      },
    ],
  },
  stub("strategy", {
    slug: "smithsonian-next-generation",
    folder: "market-strategy",
    coordinate: "S-02",
    title: "The Smithsonian's Next Generation",
    question: "What should growth mean for America's museums?",
    format: "Flagship Report",
    length: "30–40 pp",
    organizations: ["Smithsonian Institution"],
  }),
  stub("strategy", {
    slug: "uniqlo-outside-japan",
    folder: "market-strategy",
    coordinate: "S-03",
    title: "UNIQLO Outside Japan",
    question: "What should global brands standardize — and what should they localize?",
    format: "White Paper",
    length: "15–20 pp",
    organizations: ["UNIQLO"],
  }),
  stub("strategy", {
    slug: "novo-nordisk-demand",
    folder: "market-strategy",
    coordinate: "S-04",
    title: "Novo Nordisk: Managing Success",
    question: "How does an organization manage success when demand exceeds supply?",
    format: "Case Study",
    length: "20–25 pp",
    organizations: ["Novo Nordisk"],
  }),
  stub("strategy", {
    slug: "decathlon-in-america",
    folder: "market-strategy",
    coordinate: "S-05",
    title: "Decathlon in America",
    question: "Can Europe's biggest sporting-goods retailer learn to speak American?",
    format: "Case Study",
    length: "20–25 pp",
    organizations: ["Decathlon"],
  }),
  stub("strategy", {
    slug: "monocle-lifestyle-ecosystem",
    folder: "market-strategy",
    coordinate: "S-06",
    title: "Monocle: Can a Magazine Become a Lifestyle Ecosystem?",
    question: "Can a magazine become a lifestyle ecosystem?",
    format: "Essay",
    length: "2,000–2,500 words",
    organizations: ["Monocle"],
  }),
  stub("strategy", {
    slug: "pwhl-building-a-league",
    folder: "comparative-strategy",
    coordinate: "S-07",
    title: "The PWHL: Building a League That Lasts",
    question: "How do you build a league that lasts?",
    format: "Flagship Report",
    length: "25–35 pp",
    organizations: ["PWHL"],
  }),
  stub("strategy", {
    slug: "public-broadcasters",
    folder: "comparative-strategy",
    coordinate: "S-08",
    title: "Public Broadcasters: BBC vs. CBC vs. ABC Australia",
    question: "What keeps a public broadcaster public?",
    format: "White Paper",
    length: "20 pp",
    organizations: ["BBC", "CBC", "ABC Australia"],
  }),
  stub("strategy", {
    slug: "global-grocery-chains",
    folder: "comparative-strategy",
    coordinate: "S-09",
    title: "Global Grocery Chains: Aldi, Carrefour, Aeon & Woolworths",
    question: "Why does grocery loyalty look so different across countries?",
    format: "White Paper",
    length: "20 pp",
    organizations: ["Aldi", "Carrefour", "Aeon", "Woolworths"],
  }),
  stub("strategy", {
    slug: "high-speed-rail",
    folder: "comparative-strategy",
    coordinate: "S-10",
    title: "High-Speed Rail Around the World",
    question:
      "Why have some countries built world-class high-speed rail systems while others continue to struggle?",
    format: "Flagship Report + Interactive",
    length: "30–40 pp + Interactive",
    explorable: true,
  }),
  stub("strategy", {
    slug: "international-airports",
    folder: "comparative-strategy",
    coordinate: "S-11",
    title: "International Airports: Changi, Schiphol, Incheon & Dulles",
    question: "What makes an airport feel like a country's front door?",
    format: "Essay",
    length: "2,500–3,000 words",
    organizations: ["Changi Airport Group", "Schiphol", "Incheon International Airport", "Dulles International Airport"],
  }),
  stub("strategy", {
    slug: "wikipedia-competing-without-competitors",
    folder: "comparative-strategy",
    coordinate: "S-12",
    title: "Wikipedia: Competing Without Competitors",
    question: "How do you compete without competitors?",
    format: "Essay",
    length: "2,500 words",
    organizations: ["Wikipedia"],
  }),
  stub("strategy", {
    slug: "formula-one-lvmh",
    folder: "strategic-partnerships",
    coordinate: "S-13",
    title: "Formula One × LVMH",
    question: "What do luxury and racing buy from each other?",
    format: "Case Study",
    length: "20 pp",
    organizations: ["Formula One", "LVMH"],
  }),
  stub("strategy", {
    slug: "olympic-top-sponsors",
    folder: "strategic-partnerships",
    coordinate: "S-14",
    title: "Olympic TOP Sponsors",
    question: "What does Olympic sponsorship actually purchase?",
    format: "White Paper",
    length: "20 pp",
    organizations: ["International Olympic Committee"],
  }),
  stub("strategy", {
    slug: "cities-and-megaevents",
    folder: "strategic-partnerships",
    coordinate: "S-15",
    title: "Cities & Megaevents",
    question: "Why do cities keep bidding for events that lose money?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("strategy", {
    slug: "spotify-fc-barcelona",
    folder: "strategic-partnerships",
    coordinate: "S-16",
    title: "Spotify × FC Barcelona",
    question: "What should a streaming service do with a stadium?",
    format: "Executive Memo",
    length: "8–10 pp",
    organizations: ["Spotify", "FC Barcelona"],
  }),
  stub("strategy", {
    slug: "lego-nasa",
    folder: "strategic-partnerships",
    coordinate: "S-17",
    title: "LEGO × NASA",
    question: "Why does a toy company partner with a space agency?",
    format: "Essay",
    length: "2,000 words",
    organizations: ["LEGO", "NASA"],
  }),
  stub("strategy", {
    slug: "openai-mission-vs-commercialization",
    folder: "organizational-strategy",
    coordinate: "S-18",
    title: "OpenAI: Mission vs. Commercialization",
    question: "Can a mission survive its own commercialization?",
    format: "Flagship Report",
    length: "35–40 pp",
    organizations: ["OpenAI"],
  }),
  stub("strategy", {
    slug: "financial-times-reinvention",
    folder: "organizational-strategy",
    coordinate: "S-19",
    title: "The Financial Times: Reinvention as Strategy",
    question: "How does a 130-year-old newspaper make reinvention its strategy?",
    format: "Case Study",
    length: "20 pp",
    organizations: ["Financial Times"],
  }),
  stub("strategy", {
    slug: "national-trust-heritage",
    folder: "organizational-strategy",
    coordinate: "S-20",
    title: "The National Trust: Managing Heritage as an Organization",
    question: "How do you manage heritage as an organization?",
    format: "Essay",
    length: "2,000 words",
    organizations: ["National Trust"],
  }),
  stub("strategy", {
    slug: "four-futures-higher-education",
    folder: "scenario-planning",
    coordinate: "S-21",
    title: "Four Futures for Higher Education",
    question: "What futures should universities be preparing for?",
    format: "White Paper",
    length: "20–25 pp",
  }),
  stub("strategy", {
    slug: "future-of-public-media",
    folder: "scenario-planning",
    coordinate: "S-22",
    title: "The Future of Public Media",
    question: "What is public media for, once broadcast is gone?",
    format: "White Paper",
    length: "20–25 pp",
  }),
  stub("strategy", {
    slug: "china-plus-one",
    folder: "comparative-strategy",
    coordinate: "S-24",
    title: "Following the Factory (China Plus One)",
    question:
      "When manufacturing costs rise in one country, where does it actually go — and does it actually go anywhere at all?",
    format: "Flagship Report + Interactive",
    length: "30–40 pp + Interactive",
    explorable: true,
  }),
  stub("strategy", {
    slug: "professional-services-ai-economy",
    folder: "scenario-planning",
    coordinate: "S-23",
    title: "Professional Services in an AI Economy",
    question: "What happens to professional services in an AI economy?",
    format: "White Paper",
    length: "20 pp",
  }),
];

/* ========================== COMMUNICATION ========================== */

const communication: StandardProject[] = [
  /* -- American Airlines 5342: case study with fuller draft prose -- */
  {
    type: "standard",
    slug: "american-airlines-5342",
    domain: "communication",
    folder: "crisis-communication",
    coordinate: "COM-01",
    title: "American Airlines Flight 5342",
    question: "What do the first hours of a tragedy demand from an organization?",
    date: "2026-05-20",
    readingTime: 14,
    format: "Case Study",
    length: "20–25 pp",
    hero: nextHero(),
    draft: true,
    organizations: ["American Airlines"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "When Flight 5342 collided over the Potomac in January 2025, American Airlines faced the hardest communication problem an organization can face: speaking about a tragedy it did not yet understand, to families it could not yet console, under scrutiny it could not control. This case study reconstructs the first seventy-two hours of statements and asks what they reveal about how prepared organizations actually are for the worst day. (Draft placeholder.)",
          },
          {
            kind: "quote",
            text: "In a tragedy, the first statement is not information. It is a promise about how the organization will behave.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "The record shows a sequence — acknowledgment before facts, care before cause, presence before defense — that maps closely onto what the crisis literature prescribes and what few organizations execute. Where the communication faltered, it faltered on coordination: multiple institutions owned pieces of the same tragedy, and their timelines diverged. (Draft placeholder.)",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Statement timeline",
        kind: "framework",
        description:
          "Every public statement in the first 72 hours, by institution and hour. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "crowdstrike-outage",
        relationship: "compare",
        note: "A crisis of systems rather than lives — and a different first hour.",
      },
      {
        slug: "cdc-communicating-uncertainty",
        relationship: "deepen",
        note: "Speaking carefully when the facts are not yet in.",
      },
    ],
  },
  stub("communication", {
    slug: "crowdstrike-outage",
    folder: "crisis-communication",
    coordinate: "COM-02",
    title: "CrowdStrike Global Outage",
    question: "How do you apologize for breaking the internet?",
    format: "Case Study",
    length: "20–25 pp",
    organizations: ["CrowdStrike"],
  }),
  stub("communication", {
    slug: "francis-scott-key-bridge",
    folder: "crisis-communication",
    coordinate: "COM-03",
    title: "Francis Scott Key Bridge",
    question: "Who speaks when infrastructure fails?",
    format: "Case Study",
    length: "20 pp",
    organizations: ["Maryland Transportation Authority"],
  }),
  stub("communication", {
    slug: "toyota-recalls",
    folder: "crisis-communication",
    coordinate: "COM-04",
    title: "Toyota Recalls",
    question: "Can a recall strengthen trust instead of spending it?",
    format: "Case Study",
    length: "20 pp",
    organizations: ["Toyota"],
  }),
  stub("communication", {
    slug: "every-organization-communication-system",
    folder: "organizational-communication",
    coordinate: "COM-05",
    title: "Every Organization Is Really a Communication System",
    question: "What if every organization is really a communication system?",
    format: "Flagship Report",
    length: "30–40 pp",
  }),
  stub("communication", {
    slug: "communication-debt",
    folder: "organizational-communication",
    coordinate: "COM-06",
    title: "Communication Debt",
    question: "What does an organization owe for every conversation it postpones?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("communication", {
    slug: "why-meetings-are-a-design-problem",
    folder: "organizational-communication",
    coordinate: "COM-07",
    title: "Why Meetings Are a Design Problem",
    question: "Why are meetings a design problem?",
    format: "Essay",
    length: "2,500 words",
  }),
  stub("communication", {
    slug: "organization-before-the-meeting",
    folder: "organizational-communication",
    coordinate: "COM-08",
    title: "The Organization Before the Meeting",
    question: "What happens to a decision before the meeting starts?",
    format: "Essay",
    length: "2,500 words",
  }),
  stub("communication", {
    slug: "psychology-of-corporate-euphemism",
    folder: "institutional-communication",
    coordinate: "COM-09",
    title: "The Psychology of Corporate Euphemism",
    question: "Why do organizations speak in euphemism?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("communication", {
    slug: "national-park-service-sounds-human",
    folder: "institutional-communication",
    coordinate: "COM-10",
    title: "Why the National Park Service Sounds Human",
    question: "Why does the National Park Service sound human?",
    format: "Essay",
    length: "2,000 words",
    organizations: ["National Park Service"],
  }),
  stub("communication", {
    slug: "the-economists-voice",
    folder: "institutional-communication",
    coordinate: "COM-11",
    title: "The Economist's Voice",
    question: "How does a magazine keep one voice for 180 years?",
    format: "Case Study",
    length: "20 pp",
    organizations: ["The Economist"],
  }),
  stub("communication", {
    slug: "a-letter-to-a-ceo",
    folder: "institutional-communication",
    coordinate: "COM-12",
    title: "A Letter to a CEO",
    question: "What would you tell a chief executive that nobody else will?",
    format: "Essay",
    length: "2,000 words",
  }),
  stub("communication", {
    slug: "tiktok-at-congress",
    folder: "public-affairs",
    coordinate: "COM-13",
    title: "TikTok at Congress",
    question: "What happens when an algorithm testifies?",
    format: "White Paper",
    length: "20 pp",
    organizations: ["TikTok"],
  }),
  stub("communication", {
    slug: "cdc-communicating-uncertainty",
    folder: "public-affairs",
    coordinate: "COM-14",
    title: "CDC: Communicating Uncertainty",
    question: "How should institutions speak when they do not know?",
    format: "White Paper",
    length: "20 pp",
    organizations: ["CDC"],
  }),
  stub("communication", {
    slug: "noaa-communicating-probability",
    folder: "public-affairs",
    coordinate: "COM-15",
    title: "NOAA: Communicating Probability",
    question: "How do you communicate a thirty percent chance of catastrophe?",
    format: "Essay",
    length: "2,500 words",
    organizations: ["NOAA"],
  }),
  stub("communication", {
    slug: "european-commission-communications",
    folder: "public-affairs",
    coordinate: "COM-16",
    title: "European Commission Communications",
    question: "Can twenty-seven countries share one voice?",
    format: "Essay",
    length: "2,500 words",
    organizations: ["European Commission"],
  }),
  stub("communication", {
    slug: "bank-of-japan-communications",
    folder: "public-affairs",
    coordinate: "COM-17",
    title: "Bank of Japan Communications",
    question: "What do markets hear when a central bank whispers?",
    format: "Essay",
    length: "2,500 words",
    organizations: ["Bank of Japan"],
  }),
  stub("communication", {
    slug: "press-release-three-audiences",
    folder: "professional-writing",
    coordinate: "COM-18",
    title: "Press Release (Three Audiences)",
    question: "Can one announcement serve three audiences?",
    format: "Executive Memo",
    length: "4–6 pp",
  }),
  stub("communication", {
    slug: "annotated-executive-speech",
    folder: "professional-writing",
    coordinate: "COM-19",
    title: "Annotated Executive Speech",
    question: "What is a speech doing, line by line?",
    format: "Executive Memo",
    length: "5–6 pp",
  }),
  stub("communication", {
    slug: "donor-journey-email-series",
    folder: "professional-writing",
    coordinate: "COM-20",
    title: "Donor Journey Email Series",
    question: "What does a donor need to hear, and when?",
    format: "Executive Memo",
    length: "8 pp",
  }),
  stub("communication", {
    slug: "internal-communications-brief",
    folder: "professional-writing",
    coordinate: "COM-21",
    title: "Internal Communications Brief",
    question: "How do you brief an organization about itself?",
    format: "Executive Memo",
    length: "6 pp",
  }),
];

/* ============================= DESIGN ============================= */

const design: StandardProject[] = [
  stub("design", {
    slug: "national-geographic-brand-audit",
    folder: "identity-systems",
    coordinate: "D-01",
    title: "National Geographic Brand Audit",
    question: "What holds a 137-year-old yellow rectangle together?",
    format: "Field Guide",
    length: "25–30 pp",
    organizations: ["National Geographic"],
  }),
  stub("design", {
    slug: "smithsonian-visual-system",
    folder: "identity-systems",
    coordinate: "D-02",
    title: "Smithsonian Visual System",
    question: "How does one identity serve nineteen museums?",
    format: "Field Guide",
    length: "20–25 pp",
    organizations: ["Smithsonian Institution"],
  }),
  stub("design", {
    slug: "michelin-guide-identity",
    folder: "identity-systems",
    coordinate: "D-03",
    title: "Michelin Guide Identity System",
    question: "What does a star system communicate?",
    format: "Field Guide",
    length: "20 pp",
    organizations: ["Michelin"],
  }),
  stub("design", {
    slug: "london-underground-identity",
    folder: "identity-systems",
    coordinate: "D-04",
    title: "London Underground Identity",
    question: "Why does a 1913 typeface still run a city?",
    format: "Field Guide",
    length: "20 pp",
    organizations: ["Transport for London"],
  }),
  stub("design", {
    slug: "consulting-recommendation-deck",
    folder: "presentation",
    coordinate: "D-05",
    title: "Consulting Recommendation Deck",
    question: "What makes a recommendation legible?",
    format: "Field Guide",
    length: "20 slides",
  }),
  stub("design", {
    slug: "agency-brand-pitch",
    folder: "presentation",
    coordinate: "D-06",
    title: "Agency Brand Pitch",
    question: "How do you pitch an identity?",
    format: "Field Guide",
    length: "20 slides",
  }),
  stub("design", {
    slug: "campaign-strategy-deck",
    folder: "presentation",
    coordinate: "D-07",
    title: "Campaign Strategy Deck",
    question: "How does a campaign argue for itself?",
    format: "Field Guide",
    length: "20 slides",
  }),
  stub("design", {
    slug: "executive-briefing-deck",
    folder: "presentation",
    coordinate: "D-08",
    title: "Executive Briefing Deck",
    question: "How much can fifteen slides carry?",
    format: "Field Guide",
    length: "15 slides",
  }),
  stub("design", {
    slug: "brookings-report-redesign",
    folder: "information-design",
    coordinate: "D-09",
    title: "Brookings Report Redesign",
    question: "Can serious research look inviting?",
    format: "Field Guide",
    length: "20 slides",
    organizations: ["Brookings Institution"],
  }),
  stub("design", {
    slug: "who-publication-redesign",
    folder: "information-design",
    coordinate: "D-10",
    title: "WHO Publication Redesign",
    question: "How should global health information look?",
    format: "Field Guide",
    length: "20 slides",
    organizations: ["World Health Organization"],
  }),
  stub("design", {
    slug: "us-census-redesign",
    folder: "information-design",
    coordinate: "D-11",
    title: "U.S. Census Redesign",
    question: "Can a form respect the person filling it in?",
    format: "Field Guide",
    length: "15 slides",
    organizations: ["U.S. Census Bureau"],
  }),
  stub("design", {
    slug: "google-hybrid-executive-report",
    folder: "information-design",
    coordinate: "D-12",
    title: "Google Hybrid Executive Report",
    question: "How do you brief executives on their own workforce?",
    format: "Field Guide",
    length: "15 slides",
    organizations: ["Google"],
  }),
  stub("design", {
    slug: "airport-ecosystem",
    folder: "systems-design",
    coordinate: "D-13",
    title: "Airport Ecosystem",
    question: "How does an airport function as one interconnected organizational system?",
    format: "Field Guide + Interactive",
    length: "20 pp + Interactive",
    explorable: true,
  }),
  stub("design", {
    slug: "changi-airport-experience",
    folder: "systems-design",
    coordinate: "D-14",
    title: "Changi Airport Experience",
    question: "Why does Changi feel fundamentally different from most airports?",
    format: "Essay + Interactive",
    length: "2,000 words + Interactive",
    organizations: ["Changi Airport Group"],
    explorable: true,
  }),
  /* -- Hong Kong MTR: the proof-of-concept interactive, fuller prose -- */
  {
    type: "standard",
    slug: "hong-kong-mtr-wayfinding",
    domain: "design",
    folder: "systems-design",
    coordinate: "D-15",
    title: "Hong Kong MTR Wayfinding",
    question:
      "Why is one of the world's busiest transit systems so easy to understand?",
    date: "2026-06-28",
    readingTime: 12,
    format: "Field Guide + Interactive",
    length: "20 pp + Interactive",
    hero: nextHero(),
    draft: true,
    organizations: ["MTR Corporation"],
    explorable: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "The MTR moves five million people a day through some of the densest urban space on earth, and almost nobody gets lost. This field guide examines the information system that makes that possible — the hierarchy, the typography, the color logic, the transfer design — and compares it with New York, London, Paris, and Washington. (Draft placeholder.)",
          },
          {
            kind: "quote",
            text: "The MTR does not tell passengers where to go. It makes everywhere else feel implausible.",
          },
          {
            kind: "p",
            text: "The written guide provides the argument; the Interactive tab lets you discover it — toggle the station's information layers and see what each audience actually reads.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Three principles recur. Information appears exactly at the decision point, never before; color is a system-wide language, not decoration, so a line's identity survives from map to platform edge; and exits are numbered destinations in their own right, which converts the hardest problem — leaving — into the easiest. Under time pressure, passengers stop reading and start pattern-matching, and the MTR is designed for the pattern-matcher. (Draft placeholder.)",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Signage inventory",
        kind: "photography",
        description:
          "Photographic survey of station signage by decision point. (Draft placeholder.)",
      },
      {
        label: "System comparison matrix",
        kind: "framework",
        description:
          "MTR vs. NYC, London, Paris, and DC across ten wayfinding criteria. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "public-transit-information-design",
        relationship: "expand",
        note: "The general argument this station proves.",
      },
      {
        slug: "shenzhen-metro-observations",
        relationship: "observe",
        note: "Field notes from across the border.",
      },
      {
        slug: "london-underground-identity",
        relationship: "compare",
        note: "The century-old system the MTR learned from.",
      },
    ],
  },
  stub("design", {
    slug: "dutch-cycling-infrastructure",
    folder: "systems-design",
    coordinate: "D-16",
    title: "Dutch Cycling Infrastructure",
    question: "How do cities design cycling as transportation instead of recreation?",
    format: "Field Guide + Interactive",
    length: "20 pp + Interactive",
    explorable: true,
  }),
  stub("design", {
    slug: "public-transit-information-design",
    folder: "systems-design",
    coordinate: "D-17",
    title: "Public Transit as Information Design",
    question: "What if good transit is information before it is transportation?",
    format: "Essay + Interactive",
    length: "2,500 words + Interactive",
    explorable: true,
  }),
  /* -- The Atlas design system: ported prose -- */
  {
    type: "standard",
    slug: "atlas-design-system",
    domain: "design",
    folder: "editorial-design",
    coordinate: "D-18",
    title: "The Atlas Design System",
    question: "How should a publication about thinking be designed?",
    date: "2026-06-20",
    readingTime: 15,
    format: "Field Guide",
    length: "30–40 pp",
    hero: nextHero(),
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "This website is itself a design project, and this entry documents its reasoning. The Atlas borrows from printed journals, museum wayfinding, and library catalogues — institutions that organize attention rather than compete for it. Four colors, two typefaces, one persistent panel: every constraint in the system exists to keep reading the primary act.",
          },
          {
            kind: "p",
            text: "The full design standards run to a hundred pages. This entry is the short version: what was decided, what was rejected, and why restraint kept winning.",
          },
          {
            kind: "quote",
            text: "The interface succeeds when readers forget it was designed at all.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "THE ATLAS Design Standards v1.0",
        kind: "pdf",
        href: "/THE%20ATLAS%20Design%20Standards.pdf",
        description: "The complete design standards document governing this site.",
      },
      {
        label: "Rejected directions",
        kind: "notes",
        description:
          "Layouts and palettes considered and set aside, with reasons. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "hong-kong-mtr-wayfinding",
        relationship: "compare",
        note: "Wayfinding principles this site's navigation studies.",
      },
      {
        slug: "quiet-confidence-public-libraries",
        relationship: "observe",
        note: "The institutions whose restraint this design borrows.",
      },
    ],
  },
  stub("design", {
    slug: "trend-report",
    folder: "editorial-design",
    coordinate: "D-19",
    title: "Trend Report",
    question: "What is a trend report for?",
    format: "Field Guide",
    length: "20 slides",
  }),
];

/* ========================== I/O PSYCHOLOGY ========================== */

const ioPsychology: StandardProject[] = [
  /* -- Google's Hybrid Work Crisis: flagship, merged prior prose -- */
  {
    type: "standard",
    slug: "google-hybrid-work-crisis",
    domain: "io-psychology",
    folder: "organizations",
    coordinate: "IO-01",
    title: "Google's Hybrid Work Crisis",
    question: "Can organizations maintain trust after abandoning remote work?",
    date: "2026-04-02",
    readingTime: 20,
    format: "Flagship Report",
    length: "35–40 pp",
    hero: nextHero(),
    draft: true,
    longReport: true,
    pdf: "/artifacts/sample-report.pdf",
    organizations: ["Google"],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Between 2021 and 2024, Google's messaging about where work happens reversed itself several times. This report reads the public record of those communications as a single evolving text, and pairs it with the motivation research — self-determination theory, belonging, status signaling — to ask what mandates can and cannot buy. (Draft placeholder.)",
          },
          {
            kind: "p",
            text: "The interest here is not whether hybrid work is good policy. It is what happens to internal trust when the reasons given for a policy change faster than the policy itself.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "The communications shift registers in their grammar. Early messages are written in the language of experiment — we are learning, we will adjust. Later messages are written in the language of conclusion — the data shows, collaboration requires. But the data was never shown, and employees noticed the shift from invitation to verdict.",
          },
          {
            kind: "p",
            text: "Meanwhile the attendance research suggests voluntary presence tracks three things mandates never touch: whether specific colleagues will be there, whether the day's work benefits from presence, and whether being seen carries career weight. Policies address the aggregate; no individual is deciding about the aggregate.",
          },
          {
            kind: "quote",
            text: "Nobody commutes to a building. People commute to other people — and only when the people will be there.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "Organizations get further coordinating presence than compelling it: anchor teams to shared days, make the office legibly social, keep the voice of a policy consistent even as its content evolves — and show the evidence when claiming to have it. An unshared dataset cited as justification reads, internally, as no dataset at all. (Draft placeholder.)",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Message timeline",
        kind: "framework",
        description:
          "Every public statement and reported memo, 2021–2024, on one axis. (Draft placeholder.)",
      },
      {
        label: "Annotated bibliography",
        kind: "notes",
        description:
          "Forty sources on motivation and hybrid work, annotated. (Draft placeholder.)",
      },
      {
        label: "Full report (PDF)",
        kind: "pdf",
        href: "/artifacts/sample-report.pdf",
        description: "The complete written analysis as a downloadable document.",
      },
    ],
    continueExploring: [
      {
        slug: "google-hybrid-executive-report",
        relationship: "expand",
        note: "The same findings, designed as a fifteen-slide executive brief.",
      },
      {
        slug: "trust-organizational-asset",
        relationship: "deepen",
        note: "The asset this policy spent.",
      },
      {
        slug: "shenzhen-metro-observations",
        relationship: "observe",
        note: "Systems that communicate reliability without memos.",
      },
    ],
  },
  stub("io-psychology", {
    slug: "why-corporate-transformations-fail",
    folder: "organizations",
    coordinate: "IO-02",
    title: "Why Corporate Transformations Fail",
    question: "Why do corporate transformations fail?",
    format: "White Paper",
    length: "20–25 pp",
  }),
  stub("io-psychology", {
    slug: "the-informal-organization",
    folder: "organizations",
    coordinate: "IO-03",
    title: "The Informal Organization",
    question: "Where does the real org chart live?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("io-psychology", {
    slug: "pixars-braintrust",
    folder: "organizations",
    coordinate: "IO-04",
    title: "Pixar's Braintrust",
    question: "How does candor survive success?",
    format: "Case Study",
    length: "20 pp",
    organizations: ["Pixar"],
  }),
  stub("io-psychology", {
    slug: "executive-derailment",
    folder: "leadership",
    coordinate: "IO-05",
    title: "Executive Derailment",
    question: "Why do successful executives derail?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("io-psychology", {
    slug: "the-all-blacks",
    folder: "leadership",
    coordinate: "IO-06",
    title: "The All Blacks",
    question: "What does a rugby team know about culture that companies don't?",
    format: "Essay",
    length: "2,500 words",
    organizations: ["New Zealand All Blacks"],
  }),
  stub("io-psychology", {
    slug: "hierarchy-autonomy-motivation",
    folder: "leadership",
    coordinate: "IO-07",
    title: "Hierarchy, Autonomy & Motivation",
    question: "Can hierarchy and autonomy exist at the same time?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("io-psychology", {
    slug: "gig-economy-belonging",
    folder: "leadership",
    coordinate: "IO-08",
    title: "Workplace Belonging in the Gig Economy",
    question: "Can you belong to a platform?",
    format: "Case Study",
    length: "20 pp",
  }),
  stub("io-psychology", {
    slug: "decision-architecture",
    folder: "decision-making",
    coordinate: "IO-09",
    title: "Decision Architecture Inside Organizations",
    question: "Who designs the decisions organizations think they make freely?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("io-psychology", {
    slug: "organizational-identity-disruption",
    folder: "decision-making",
    coordinate: "IO-10",
    title: "Organizational Identity Under Technological Disruption",
    question: "What happens to identity under technological disruption?",
    format: "White Paper",
    length: "20–25 pp",
  }),
  stub("io-psychology", {
    slug: "trust-organizational-asset",
    folder: "decision-making",
    coordinate: "IO-11",
    title: "Trust Is an Organizational Asset",
    question: "What if trust belongs on the balance sheet?",
    format: "Essay",
    length: "3,000 words",
  }),
  stub("io-psychology", {
    slug: "dei-words-behavior",
    folder: "decision-making",
    coordinate: "IO-12",
    title: "Do DEI Words Change Behavior or Just Perception?",
    question: "Do DEI words change behavior, or just perception?",
    format: "White Paper",
    length: "20–25 pp",
  }),
  stub("io-psychology", {
    slug: "japanese-convenience-stores",
    folder: "culture-behavior",
    coordinate: "IO-13",
    title: "Japanese Convenience Stores",
    question: "Why is the konbini the best-run organization you'll visit today?",
    format: "Essay",
    length: "2,000 words",
    organizations: ["7-Eleven Japan", "Lawson", "FamilyMart"],
  }),
  stub("io-psychology", {
    slug: "psychology-of-queueing",
    folder: "culture-behavior",
    coordinate: "IO-14",
    title: "The Psychology of Queueing Across Cultures",
    question: "Why do we queue so differently?",
    format: "White Paper",
    length: "20 pp",
  }),
  stub("io-psychology", {
    slug: "how-countries-design-public-space",
    folder: "culture-behavior",
    coordinate: "IO-15",
    title: "How Different Countries Design Public Space",
    question: "How do different countries design public space?",
    format: "Essay",
    length: "2,500 words",
  }),
  stub("io-psychology", {
    slug: "professional-norms-worldwide",
    folder: "culture-behavior",
    coordinate: "IO-17",
    title: "Professional Norms Around the World",
    question: "What does professionalism actually mean in different cultures?",
    format: "Flagship Report + Interactive",
    length: "30–40 pp + Interactive",
    explorable: true,
  }),
];

/* ============================= READING ============================= */

function readingStub(
  n: number,
  slug: string,
  title: string,
  author: string,
  sourceUrl: string,
  question: string,
  summary: string,
): ReadingEntry {
  return {
    type: "reading",
    slug,
    domain: "reading",
    coordinate: `R-${String(n).padStart(2, "0")}`,
    title,
    author,
    sourceUrl,
    question,
    date: "2026-07-01",
    readingTime: 5,
    format: "Reading Entry",
    length: "1–4 pp",
    hero: nextHero(),
    draft: true,
    artifacts: [],
    tabs: [
      {
        id: "summary",
        label: "Summary",
        blocks: [{ kind: "p", text: summary }],
      },
    ],
  };
}

const reading: ReadingEntry[] = [
  readingStub(
    1,
    "outliers",
    "Outliers: The Story of Success",
    "Malcolm Gladwell",
    "https://en.wikipedia.org/wiki/Outliers_(book)",
    "How much of success is circumstance wearing a person's name?",
    "Gladwell's argument that success is an ecosystem — timing, culture, accumulated advantage — rather than an individual trait. Entry in progress: summary, favorite passages, and worldview notes to come. (Draft placeholder.)",
  ),
  {
    type: "reading",
    slug: "thinking-fast-and-slow",
    domain: "reading",
    coordinate: "R-02",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    sourceUrl: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
    question: "How much of judgment is architecture rather than choice?",
    date: "2025-10-15",
    readingTime: 7,
    format: "Reading Entry",
    length: "1–4 pp",
    hero: nextHero(),
    draft: true,
    artifacts: [],
    tabs: [
      {
        id: "summary",
        label: "Summary",
        blocks: [
          {
            kind: "p",
            text: "Kahneman's account of the two systems — fast, associative intuition and slow, effortful reasoning — is the load-bearing wall under most of behavioral economics. For the Atlas, the durable contribution is the catalogue of predictable errors: anchoring, loss aversion, the planning fallacy. Organizations are built from these errors at scale.",
          },
        ],
      },
      {
        id: "passages",
        label: "Favorite Passages",
        blocks: [
          {
            kind: "quote",
            text: "Nothing in life is as important as you think it is, while you are thinking about it.",
          },
          {
            kind: "p",
            text: "Also marked: the section on the focusing illusion, and the premortem technique. (Draft placeholder selection.)",
          },
        ],
      },
      {
        id: "worldview",
        label: "My Worldview",
        blocks: [
          {
            kind: "p",
            text: "I stopped treating behavior as preference and started treating it as architecture. When a policy fails or a queue forms differently in a different country, the interesting question is no longer what people want — it is what the structure around them made effortless.",
          },
        ],
      },
    ],
    continueExploring: [
      {
        slug: "decision-architecture",
        relationship: "expand",
        note: "The same argument, applied inside organizations.",
      },
      {
        slug: "psychology-of-queueing",
        relationship: "expand",
        note: "Predictable behavior, studied in line.",
      },
    ],
  },
  readingStub(
    3,
    "the-undercover-economist",
    "The Undercover Economist",
    "Tim Harford",
    "https://en.wikipedia.org/wiki/The_Undercover_Economist",
    "What is the economics hiding inside a cup of coffee?",
    "Harford's tour of everyday economics — scarcity, signaling, price discrimination — as a lens for reading organizations. Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    4,
    "freakonomics",
    "Freakonomics",
    "Steven D. Levitt & Stephen J. Dubner",
    "https://en.wikipedia.org/wiki/Freakonomics",
    "What do incentives explain that intentions cannot?",
    "Levitt and Dubner on incentives as the hidden grammar of behavior. Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    5,
    "psychology-of-money",
    "The Psychology of Money",
    "Morgan Housel",
    "https://en.wikipedia.org/wiki/The_Psychology_of_Money",
    "Why is doing well with money a behavioral skill rather than a technical one?",
    "Housel's timeless lessons on wealth, greed, and happiness — behavior beating spreadsheets. Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    6,
    "antifragile",
    "Antifragile: Things That Gain From Disorder",
    "Nassim Nicholas Taleb",
    "https://en.wikipedia.org/wiki/Antifragile_(book)",
    "What kind of organization gets stronger when it is stressed?",
    "Taleb's case that the opposite of fragile is not robust but antifragile — systems that gain from disorder. Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    7,
    "globally-minded-marketing",
    "Globally-Minded Marketing",
    "Carlos J. Torelli & Maria A. Rodas",
    "https://doi.org/10.1007/978-3-031-50812-7",
    "How do iconic brands travel across cultures?",
    "A cultural approach to building iconic brands (textbook, DOI:10.1007/978-3-031-50812-7). Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    8,
    "propaganda",
    "Propaganda",
    "Edward Bernays",
    "https://en.wikipedia.org/wiki/Propaganda_(book)",
    "What did the father of public relations actually believe he was doing?",
    "Bernays' 1928 manual for engineering consent — uncomfortable, foundational reading for anyone studying institutional communication. Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    9,
    "inefficient-pricing-of-news",
    "The Inefficient Pricing of News",
    "Didisheim, Kelly, Pourmohammadi & Tian",
    "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6540399",
    "What is a piece of news actually worth, and to whom?",
    "A study (SSRN: 6540399) on how markets misprice information. Entry in progress. (Draft placeholder.)",
  ),
];

/* ============================== NOTES ============================== */

function noteStub(
  n: number,
  slug: string,
  title: string,
  question: string,
  body: string,
): NoteEntry {
  return {
    type: "note",
    slug,
    domain: "notes",
    coordinate: `N-${String(n).padStart(2, "0")}`,
    title,
    question,
    date: "2026-07-01",
    readingTime: 4,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: true,
    artifacts: [],
    body: [{ kind: "p", text: body }],
  };
}

const notes: NoteEntry[] = [
  {
    type: "note",
    slug: "shenzhen-metro-observations",
    domain: "notes",
    coordinate: "N-01",
    title: "Observations from the Shenzhen Metro",
    question: "What can a subway system teach an organization?",
    date: "2025-08-19",
    readingTime: 5,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: true,
    artifacts: [],
    body: [
      {
        kind: "p",
        text: "The Shenzhen Metro moves more people before nine in the morning than most organizations serve in a year, and it does so almost silently. What struck me over two weeks of daily rides was not the scale but the legibility: at no point, in any station, was it unclear what to do next. (Draft placeholder essay.)",
      },
      {
        kind: "image",
        src: "/placeholders/ph-6.svg",
        caption: "Platform wayfinding, Futian station. (Placeholder image.)",
      },
      {
        kind: "p",
        text: "The floor arrows, the queuing boxes, the door chimes pitched differently for arrival and departure — none of it is signage in the American sense, where instructions compensate for confusing design. The design itself is the instruction. Organizations write employee handbooks for the same reason bad stations hang more signs.",
      },
      {
        kind: "quote",
        text: "A system that needs to be explained is already apologizing.",
      },
      {
        kind: "p",
        text: "The note I keep returning to: trust in the system was not asked for anywhere. It accumulated from ten thousand small precisions — a train that arrives when the board says it will, every time. This is what operational discipline looks like when it becomes a communication strategy.",
      },
    ],
    continueExploring: [
      {
        slug: "hong-kong-mtr-wayfinding",
        relationship: "expand",
        note: "The same legibility, studied as a field guide across the border.",
      },
      {
        slug: "shenzhen-innovation",
        relationship: "observe",
        note: "The city around the metro.",
      },
    ],
  },
  noteStub(
    2,
    "a-day-in-new-york",
    "A Day in New York",
    "What does one day in one city actually contain?",
    "A single day, recorded honestly: what the city demanded, what it offered, and how often its systems explained themselves. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    3,
    "three-hours-in-union-station",
    "Three Hours in Union Station",
    "What does a station do with the people who are not going anywhere?",
    "Union Station between trains — the waiting, the retail, the restoration scaffolding, and the quiet negotiation over whom the building is for. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    4,
    "cities-relationship-with-time",
    "Every City Has a Different Relationship with Time",
    "Why does an hour feel different in different cities?",
    "Punctuality, queues, dinner hours, and walk signals — a city's clock is a cultural document. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    5,
    "walking-as-research",
    "Walking Is an Underrated Research Method",
    "What does a city tell you at three miles an hour?",
    "The research method that requires no instrument: walking the same street until it starts explaining itself. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    6,
    "coffee-shops-behavioral-design",
    "Coffee Shops as Behavioral Design",
    "Who is a coffee shop designed to move, and who is it designed to keep?",
    "Seating, sockets, playlists, and cup sizes as instruments of dwell time. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    7,
    "libraries-understand-attention",
    "Libraries Understand Attention Better Than Most Apps",
    "Why does focus come easily in a building full of strangers?",
    "The library as attention architecture — and what product design keeps getting wrong about focus. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    8,
    "waiting-rooms",
    "Waiting Rooms Reveal More Than Waiting",
    "What does an organization believe about you while you wait?",
    "Chairs, signage, and the order of names called: the waiting room as an organization's honest self-portrait. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    9,
    "yearbook-organizations",
    "Three Things I Learned About Organizations from Editing a Yearbook",
    "What does a yearbook staff know about deadlines that companies don't?",
    "Volunteer labor, hard deadlines, and shared authorship — the yearbook room as a miniature organization. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    10,
    "donor-engagement-customer-loyalty",
    "Why Donor Engagement and Customer Loyalty Are the Same Behavioral Problem",
    "Why do donors and customers churn for the same reasons?",
    "Two vocabularies, one behavior: recognition, reciprocity, and the moment someone quietly stops believing the relationship is mutual. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    11,
    "shenzhen-innovation",
    "How Shenzhen Changed My Understanding of Innovation",
    "What does innovation look like when it is a place instead of a pitch?",
    "Hardware markets, iteration speed, and a city that prototypes itself. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    12,
    "quiet-confidence-public-libraries",
    "The Quiet Confidence of Public Libraries",
    "Why do libraries never have to advertise their trustworthiness?",
    "The last institution nobody suspects of an agenda — and what its quiet confidence is built from. Note in progress. (Draft placeholder.)",
  ),
];

export const projects: Project[] = [
  ...strategy,
  ...communication,
  ...design,
  ...ioPsychology,
  ...reading,
  ...notes,
];

/* ---------------- Registry helpers ---------------- */

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByDomain(domain: string): Project[] {
  return projects.filter((p) => p.domain === domain);
}

export function getProjectsByFolder(domain: string, folder: string): Project[] {
  return projects.filter(
    (p) => p.type === "standard" && p.domain === domain && p.folder === folder,
  );
}

/** URL for a project, honoring the folder-skipping rules for reading/notes. */
export function projectHref(p: Project): string {
  if (p.type === "standard") return `/atlas/${p.domain}/${p.folder}/${p.slug}`;
  return `/atlas/${p.domain}/${p.slug}`;
}

/** Projects with an interactive component, for /atlas/explorable-systems. */
export function getExplorableProjects(): Project[] {
  return projects.filter((p) => p.explorable);
}

/** organization name → projects mentioning it, alphabetical. */
export function getOrganizations(): { name: string; projects: Project[] }[] {
  const map = new Map<string, Project[]>();
  for (const p of projects) {
    for (const org of p.organizations ?? []) {
      if (!map.has(org)) map.set(org, []);
      map.get(org)!.push(p);
    }
  }
  return [...map.entries()]
    .map(([name, list]) => ({ name, projects: list }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/* Unused-type imports kept referenced for clarity of the model above. */
export type { Block, TabSection };
