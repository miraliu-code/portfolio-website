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
            text: "In 1900, a tire manufacturer printed a free guide to encourage the French to drive more. A century later, that guide can close a restaurant with a phone call. This report asks how a piece of marketing collateral became one of the world's most trusted cultural institutions, and what its discipline teaches organizations about earning authority they were never granted. (Draft placeholder.)",
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
            text: "Three commitments appear to hold the Guide's authority together. First, anonymity: inspectors pay for their meals, and the organization spends real money to keep them unknown: credibility as an operating cost. Second, scarcity: stars are withheld far more often than they are granted, and the third star remains rare enough to reorganize a chef's life. Third, independence from the parent business: the Guide has never obviously served the tire company's quarterly interests, which is precisely why it serves the brand's century-long ones. (Draft placeholder.)",
          },
          {
            kind: "p",
            text: "The comparison set (rating agencies, awards bodies, review platforms) mostly failed to protect one of the three. Platforms monetized attention and lost scarcity; agencies monetized the rated and lost independence.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "For organizations seeking Michelin-grade trust, the transferable lesson is that authority is a cost center. Fund the expensive, invisible disciplines (verification, anonymity, restraint) before the visible ones, and let decades do the compounding. (Draft placeholder.)",
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
          "Anonymity, scarcity, independence, scored across rating institutions. (Draft placeholder.)",
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
    question: "What should global brands standardize, and what should they localize?",
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
      "When manufacturing costs rise in one country, where does it actually go, and does it actually go anywhere at all?",
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
            text: "The record shows a sequence (acknowledgment before facts, care before cause, presence before defense) that maps closely onto what the crisis literature prescribes and what few organizations execute. Where the communication faltered, it faltered on coordination: multiple institutions owned pieces of the same tragedy, and their timelines diverged. (Draft placeholder.)",
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
        note: "A crisis of systems rather than lives, and a different first hour.",
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
      "Why does a signage system with real, documented inconsistencies still feel effortless to navigate?",
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
            text: "The MTR moves five million people a day through some of the densest urban space on earth, and almost nobody gets lost. This field guide examines the information system that makes that possible (the hierarchy, the typography, the color logic, the transfer design) and compares it with New York, London, Paris, and Washington. (Draft placeholder.)",
          },
          {
            kind: "quote",
            text: "The MTR does not tell passengers where to go. It makes everywhere else feel implausible.",
          },
          {
            kind: "p",
            text: "The written guide provides the argument; the Interactive tab lets you discover it: toggle the station's information layers and see what each audience actually reads.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Three principles recur. Information appears exactly at the decision point, never before; color is a system-wide language, not decoration, so a line's identity survives from map to platform edge; and exits are numbered destinations in their own right, which converts the hardest problem, leaving, into the easiest. Under time pressure, passengers stop reading and start pattern-matching, and the MTR is designed for the pattern-matcher. (Draft placeholder.)",
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
            text: "This website is itself a design project, and this entry documents its reasoning. The Atlas borrows from printed journals, museum wayfinding, and library catalogues: institutions that organize attention rather than compete for it. Four colors, two typefaces, one persistent panel: every constraint in the system exists to keep reading the primary act.",
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
            text: "Between 2021 and 2024, Google's messaging about where work happens reversed itself several times. This report reads the public record of those communications as a single evolving text, and pairs it with the motivation research (self-determination theory, belonging, status signaling) to ask what mandates can and cannot buy. (Draft placeholder.)",
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
            text: "The communications shift registers in their grammar. Early messages are written in the language of experiment: we are learning, we will adjust. Later messages are written in the language of conclusion: the data shows, collaboration requires. But the data was never shown, and employees noticed the shift from invitation to verdict.",
          },
          {
            kind: "p",
            text: "Meanwhile the attendance research suggests voluntary presence tracks three things mandates never touch: whether specific colleagues will be there, whether the day's work benefits from presence, and whether being seen carries career weight. Policies address the aggregate; no individual is deciding about the aggregate.",
          },
          {
            kind: "quote",
            text: "Nobody commutes to a building. People commute to other people, and only when the people will be there.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "Organizations get further coordinating presence than compelling it: anchor teams to shared days, make the office legibly social, keep the voice of a policy consistent even as its content evolves, and show the evidence when claiming to have it. An unshared dataset cited as justification reads, internally, as no dataset at all. (Draft placeholder.)",
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
  /* -- The second full essay on the site (Komen / trust-as-capital):
        Essay treatment is dek → body → one pull quote → References
        (the closing-bibliography pattern) → a methodological figures
        note. Financial figures transcribed from the supplied piece. -- */
  {
    type: "standard",
    slug: "trust-organizational-asset",
    domain: "io-psychology",
    folder: "decision-making",
    coordinate: "IO-11",
    title: "The Asset You Cannot Spend",
    question: "What if trust belongs on the balance sheet?",
    date: "2026-07-21",
    readingTime: 14,
    format: "Essay",
    length: "3,000 words",
    hero: nextHero(),
    draft: false,
    organizations: ["Susan G. Komen"],
    artifacts: [],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "dek",
            text: "Trust behaves like capital in almost every respect, except the one that matters most: the moment an organization draws it down for its own benefit, the balance disappears.",
          },
          {
            kind: "p",
            text: "In late January of 2012, the Susan G. Komen for the Cure foundation stopped funding a set of grants that Planned Parenthood affiliates had used for breast examinations, a sum of roughly seven hundred thousand dollars, and explained the decision by pointing to a newly adopted rule against supporting organizations under government investigation (Harvard Kennedy School Case Program, 2012). Measured in dollars, it was a minor line item for a charity that had spent three decades building one of the most recognized brands in American philanthropy. Measured in trust, it was ruinous. Over four days the decision pulled in senators, a New York mayor, musicians, and a flood of ordinary supporters who read the move as a women's-health charity trading its mission for political cover, and Komen reversed itself and apologized (Harvard Kennedy School Case Program, 2012). The reversal did not save it. In the first full fiscal year after the decision, contributions and grants across Komen and its affiliates fell by nearly eighteen percent, from about a hundred and forty-two million dollars to a hundred and seventeen, with total revenue falling from a hundred and seventy-eight million to a hundred and forty-nine (Susan G. Komen Breast Cancer Foundation Group, 2013). The erosion continued for years afterward. By the fiscal year ending in March of 2018, contributions to the national foundation had fallen to fifty-one million, roughly a third of their pre-crisis level, and total revenue to seventy-seven million (Susan G. Komen Breast Cancer Foundation, 2018). A grant program worth seven hundred thousand dollars a year was followed by a first-year shortfall in contributions alone of twenty-five million, a ratio of roughly one to thirty-five. In the years that followed, the decline removed close to two thirds of the organization's donated income, arriving through a channel that no line on any budget could have anticipated.",
          },
          {
            kind: "p",
            text: "That ratio does not behave the way an organization's other resources behave. Ordinary assets are roughly linear, so that spending a dollar leaves you a dollar poorer and spending a little costs you a little. What Komen spent was small and what it lost was enormous, and the loss arrived through the reactions of people rather than through any depletion of a stock. Trust is regularly called an asset, and the description carries real weight. Take the accounting seriously, though, and the metaphor starts to strain, and the places where it strains explain why organizations destroy the thing so reliably and so often by surprise.",
          },
          {
            kind: "quote",
            text: "The act of visibly drawing it down for your own advantage is not a withdrawal from the account; it is the destruction of the account.",
          },
          {
            kind: "p",
            text: "The metaphor holds in several genuine respects, which is why the language of assets attached itself to trust in the first place. The economics here are old and carefully worked out. Kenneth Arrow described trust as a lubricant of social and commercial life, the quiet substance that lets exchange proceed without everything being specified, secured, and enforced in advance (Arrow, 1972). Oliver Williamson built much of the modern theory of the firm on the observation that coordination is costly, that transactions carry frictions of negotiation and monitoring and enforcement, and that organizations exist in large part to economize on those frictions (Williamson, 1981). Trust sits directly on that cost. When a supplier believes a buyer will pay, when an employee believes a promotion will follow the work, when a donor believes a gift will reach its purpose, the elaborate and expensive machinery of verification can be left in the drawer. Mark Fichman, surveying how the concept had been studied, tied this lubricating quality explicitly to transaction-cost analysis and offered the working definition the field tends to use, in which trust is the willingness to accept vulnerability on the strength of positive expectations about another party's conduct (Fichman, 2003). Vulnerability is the operative word. Trust matters precisely where verification is incomplete, which is nearly everywhere that human beings coordinate over time.",
          },
          {
            kind: "p",
            text: "Understood this way, trust accumulates like capital and pays out like capital. It is built slowly, through a long sequence of kept commitments, and once built it lowers the cost of everything an organization subsequently attempts. It shows up, in a rough and partial way, on actual balance sheets, since much of what an acquirer pays above the tangible value of a company is goodwill, which is to say the market's estimate of accumulated reputation and relationship. It can be inherited, passed from one chief executive to the next like a reserve in an account, and drawn upon by people who did nothing to earn it. A new leader at a trusted institution starts with a balance already standing to the institution's name. The capital metaphor captures something structurally true about how trust forms and what it does.",
          },
          {
            kind: "p",
            text: "The trouble begins when one asks whether trust possesses the property that makes capital useful, which is that you can spend it. Lindon Robison and his colleagues, examining whether social capital deserved to be called capital at all, worked carefully through the features a thing must have to earn the name, among them durability, the capacity to be maintained against decay, and the possibility of investment and disinvestment (Robison et al., 2002). In the course of that examination they revive the sharpest objection to the whole analogy, which Arrow had raised at a World Bank workshop: the word capital implies a deliberate sacrifice in the present made to secure a benefit in the future, and he doubted that relationships formed for other reasons fit that description (Arrow, 1999, as cited in Robison et al., 2002). Robison and his colleagues go on to dispute him, arguing that people do invest in relationships at a real present cost, but Arrow's objection points to the exact seam where the metaphor tears. You can invest in trust by absorbing a present cost, keeping a promise that is inconvenient, spending on quality no customer would have detected, in order to draw a future return. What you cannot do is the thing that makes financial capital financial, which is to liquidate it at will. You cannot withdraw trust and hold the proceeds. The act of visibly drawing it down for your own advantage is not a withdrawal from the account; it is the destruction of the account. Trust is an asset you may add to and protect and slowly convert into other goods, and the one transaction forbidden to you is the one that treats it as a reserve to be spent when convenient. Komen attempted precisely that forbidden transaction. It reached for a small withdrawal, dropping one grantee to relieve a political pressure, and found that the attempt consumed the entire balance.",
          },
          {
            kind: "p",
            text: "Why should so small a withdrawal be so ruinous, and why should the damage prove so resistant to repair? The answer lies in how people process the information a violation carries. Peter Kim and his colleagues, studying how trust can be rebuilt after it breaks, worked from a distinction that turns out to be central, first drawn in their earlier study of apology and denial: people read failures of competence and failures of integrity in opposite ways (Kim et al., 2004, 2006). A single competence failure tends to be discounted as an anomaly, because we understand that capable people occasionally perform badly, so one bad outcome is weak evidence of a bad type. A single integrity failure runs the other way. We intuitively believe that a person of genuine integrity would not have done the dishonest thing under any circumstance, so a single violation reads as reliable evidence of character, and that reading, once formed, is remarkably difficult to disconfirm. Komen's decision was received as a violation of the second kind. Supporters did not conclude that the charity had made an administrative misjudgment; they concluded that it had revealed what it actually was, an organization willing to subordinate women's health to politics. Once an audience has settled on a conclusion about character, further information struggles to move it, which is why the reversal four days later accomplished so little. The reversal was the disconfirming act, the attempt to signal that the violation had not been what it seemed, and it ran straight into the wall that Kim and his colleagues describe. Crisis specialists watching in real time reached a similar view of the damage, if not of the remedy. The consultants and scholars Forbes canvassed days after the reversal agreed that reversing had been the right call and that the reputational repair would nonetheless be long and complex; the reputation scholar Daniel Diermeier added that Komen's deeper problem was the need to purge the perception that its grant-making had become political (Adams, 2012). Komen had by then angered those who wanted the funding cut along with those who wanted it kept, and satisfied neither.",
          },
          {
            kind: "p",
            text: "Underneath the cognition sits an emotion that gives the collapse its force. Ernst Fehr, reviewing the experimental study of trust, documented what researchers call betrayal aversion, the finding that people treat the risk of being cheated as categorically worse than an identical risk of simple bad luck (Fehr, 2009). Offered the same odds and the same stakes, a person will accept more risk from an indifferent world than from a potentially treacherous partner, which means that the harm of a betrayal is felt far out of proportion to its material cost. This is the missing term in the Komen ratio. The seven hundred thousand dollars was never what drove the reaction. What drove it was the sense of having been let down by an organization people had chosen to believe in, and that sense obeys its own arithmetic, one in which a small material stake can generate an overwhelming response. Supporters did not reach for the language of disappointment. A longtime donor, explaining why she stopped giving, described the decision as a betrayal of what she had wanted the organization to represent (Myers & Reynolds, 2013). That is the language of a broken relationship, not of a revised budget, and it is exactly the register betrayal aversion predicts.",
          },
          {
            kind: "p",
            text: "Komen and several of its affiliates attributed the falling numbers partly to a weak economy and to an election year that pulled charitable dollars toward political campaigns, and those factors were real. Fehr himself spends much of his review cautioning against exactly the kind of inference that trust research is prone to, the leap from a correlation between trust and some desirable outcome to the confident claim that trust caused it; he argues that trust is often an epiphenomenon of the institutions surrounding it, and that clean causal evidence is harder to come by than the enthusiasm for the topic suggests (Fehr, 2009). The same discipline should apply to a single charity. What tilts the Komen case toward causation rather than coincidence is not any one figure but the pattern around it. The organization's own spokeswoman attributed the decline substantially to the controversy (Stengle, 2014). At least five senior executives departed in the months after the decision (Associated Press, 2012), and the founder stepped down from the chief executive role (Myers & Reynolds, 2013). Local event figures show the same break. Race registrations in Fort Worth fell from nearly fourteen thousand in 2011 to about eighty-five hundred in 2013, and revenue from the Washington race halved over two years (Myers & Reynolds, 2013). Komen cut its national three-day walk from fourteen host cities to seven (Castillo, 2013). Event fundraising may well have been softening in these years for reasons of its own, which would be a second confound alongside the first, though a general trend of that kind would not produce a break concentrated in the year the controversy landed. The decline also failed to track the business cycle, persisting through the recovery and reaching its low point a full six years after the controversy, long after the economy had turned (Susan G. Komen Breast Cancer Foundation, 2018). A weak economy does not usually announce itself by keeping an organization's most loyal participants at home for the better part of a decade.",
          },
          {
            kind: "p",
            text: "The pattern breaks the other way in one place. In the fiscal year ending March 2019 the numbers turned upward, contributions rising twenty-three percent and total revenue seventeen (Susan G. Komen Breast Cancer Foundation, 2019). Trust can be rebuilt. The recovery was not the return of a balance that had been sitting somewhere waiting to be reclaimed. Komen did not withdraw its reputation in 2012 and redeposit it in 2019; it spent seven years doing the only thing the mechanism permits, keeping faith with the supporters who remained and earning a new balance slowly from a much lower base. Even after the rebound the foundation was taking in about half the revenue and well under half the contributions of the fiscal year in which the decision was announced. The account was not restored so much as replaced by a smaller one.",
          },
          {
            kind: "p",
            text: "If trust is an asset that cannot be spent, only invested in or protected, then the ordinary meaning of managing an asset does not quite apply to it, and this is where most organizations come to grief. You cannot plan to spend trust down at an optimal rate, the way a firm might manage a cash reserve, because any visible attempt to spend it is self-defeating. You can only keep faith with it and let it slowly convert into the cheaper coordination and easier fundraising and greater benefit of the doubt that it produces. The difficulty is that an organization's incentive systems are built to reward the opposite behavior. Quarterly targets, political expedients, and cost reductions all offer visible, immediate, measurable gains, and each of them can be financed, invisibly and for a while, by drawing on the trust reserve. The drawdown does not appear anywhere. No line item falls when a company ships a slightly worse product, or when a charity drops a commitment, without announcement, that a portion of its base held dear, so the reserve depletes without anyone recording a transaction, right up until the reactions arrive all at once. Komen's conduct once the backlash arrived shows what this costs. The charity defended itself by appealing to internal grant-making policy, a procedural justification for what its supporters could see was a decision about values, and the mismatch deepened the erosion. An audience already reading the decision as a statement of character will read a procedural cover story as further evidence about character, which is precisely the failed disconfirming act that Kim and his colleagues describe (Kim et al., 2006). Trust punishes, specifically and severely, the move of quietly spending it and then dressing the expenditure as something administrative.",
          },
          {
            kind: "p",
            text: "Barbara Brooks Kimmel, who runs a firm devoted to measuring corporate trust and therefore has her own interest in the answer, made the observation that lands the whole problem in a single diagnosis. In most organizations, she notes, nobody owns trust, because it is not classified as a risk, and a thing that no one owns is a thing that no one tends until it is too late (Kimmel, 2020). Her firm's own analysis claims that the most trusted public companies outperform the broader market over time, a finding worth treating with the caution its source invites, but the diagnosis stands on its own without the performance figures. It rests on an accounting gap. Trust is the asset that every organization lists in its statement of values and no organization lists on its balance sheet. It is declared central and recorded nowhere, which leaves it with no custodian, no quarterly review, no line that turns red as it is being spent. An asset that cannot be seen cannot be managed, and an asset that cannot be managed will be spent by whoever finds it convenient, because the spending carries no visible cost until the whole balance comes due at once.",
          },
          {
            kind: "p",
            text: "This is the reason organizations keep destroying the thing they most depend on and keep being astonished when they do. The destruction is never recorded as it happens. It accumulates silently behind decisions that each looked defensible on the numbers that were actually visible, and it becomes legible only in the reaction, by which point the account is already empty and the reversal already too late. Komen did not set out to burn thirty years of goodwill over a seven-hundred-thousand-dollar grant. It made a choice the internal numbers supported, defended it with a policy that sounded orderly, and learned the size of the reserve it had been drawing on only in the four days it took to drain it. The lesson everyone claims to have absorbed is that trust is fragile. The lesson that actually matters is that trust is the one asset an organization holds which its instruments cannot see it spending, so that the worth of the thing becomes fully knowable only at the instant it is gone.",
          },
          {
            kind: "h3",
            text: "A note on the figures",
          },
          {
            kind: "p",
            text: "All financial figures come from Komen's filed Forms 990 rather than from press accounts, which report materially different totals.",
          },
          {
            kind: "p",
            text: "Two filing entities are involved. The pre-crisis and first-full-year figures are drawn from the group return filed under EIN 75-2462834, which covers the national foundation together with its affiliates. The later figures come from returns filed under EIN 75-1835298, covering the national foundation alone. The two overlap in the fiscal year ending March 31, 2013, which appears as the current year on the group return and as the prior year on the national foundation's following filing. They differ there by 1.8 percent on contributions and 1.5 percent on total revenue, so the series is treated here as continuous, with that caveat stated.",
          },
          {
            kind: "p",
            text: "Komen's fiscal year ends March 31, and the decision was announced on January 31, 2012. The baseline year used here, ending March 31, 2012, therefore already contains two months of fallout, which means the true pre-crisis figure was somewhat higher and the ratios given above are conservative.",
          },
          {
            kind: "p",
            text: "Readers comparing these figures against contemporaneous news coverage should note that the 990 reports special-event revenue net of direct fundraising expenses, while Komen's audited consolidated statements report race income gross. That accounts for much of the gap between the two sets of numbers.",
          },
        ],
      },
      {
        id: "sources",
        label: "Artifacts",
        blocks: [
          {
            kind: "references",
            items: [
              { text: "Adams, S. (2012, February 3). After changing course on Planned Parenthood, what Susan G. Komen should do now. Forbes." },
              {
                text: "Arrow, K. J. (1972). Gifts and exchanges. Philosophy & Public Affairs, 1(4), 343–362.",
                href: "https://doi.org/10.2307/2265097",
              },
              { text: "Associated Press. (2012, March 22). Several executives leave Komen after controversy. CBS Texas." },
              { text: "Castillo, M. (2013, June 5). Susan G. Komen cuts participating 3-Day cities in half. CBS News." },
              {
                text: "Fehr, E. (2009). On the economics and biology of trust. Journal of the European Economic Association, 7(2–3), 235–266.",
                href: "https://doi.org/10.1162/JEEA.2009.7.2-3.235",
              },
              {
                text: "Fichman, M. (2003). Straining towards trust: Some constraints on studying trust in organizations. Journal of Organizational Behavior, 24(2), 133–157.",
                href: "https://doi.org/10.1002/job.189",
              },
              { text: "Harvard Kennedy School Case Program. (2012). Social media and the Planned Parenthood / Susan G. Komen for the Cure controversy (Case No. HKS729). Harvard Kennedy School." },
              {
                text: "Kim, P. H., Ferrin, D. L., Cooper, C. D., & Dirks, K. T. (2004). Removing the shadow of suspicion: The effects of apology versus denial for repairing competence- versus integrity-based trust violations. Journal of Applied Psychology, 89(1), 104–118.",
                href: "https://doi.org/10.1037/0021-9010.89.1.104",
              },
              {
                text: "Kim, P. H., Dirks, K. T., Cooper, C. D., & Ferrin, D. L. (2006). When more blame is better than less: The implications of internal vs. external attributions for the repair of trust after a competence- vs. integrity-based trust violation. Organizational Behavior and Human Decision Processes, 99(1), 49–65.",
                href: "https://doi.org/10.1016/j.obhdp.2005.07.002",
              },
              { text: "Kimmel, B. B. (2020, February 12). Trust is the tie that binds intangibles to tangible value [Interview]. The Conference Board." },
              { text: "Myers, L., & Reynolds, T. (2013, June 10). Susan Komen CEO's salary draws fire as donations drop, races are canceled. NBC News." },
              {
                text: "Robison, L. J., Schmid, A. A., & Siles, M. E. (2002). Is social capital really capital? Review of Social Economy, 60(1), 1–21.",
                href: "https://doi.org/10.1080/00346760110127074",
              },
              { text: "Stengle, J. (2014, January 3). Komen sees big drop in contributions after dispute. NBC DFW / Associated Press." },
              { text: "Susan G. Komen Breast Cancer Foundation. (2014). Return of organization exempt from income tax (Form 990 for tax year 2013, EIN 75-1835298, fiscal year ending March 31, 2014). Internal Revenue Service." },
              { text: "Susan G. Komen Breast Cancer Foundation. (2018). Return of organization exempt from income tax (Form 990 for tax year 2017, EIN 75-1835298, fiscal year ending March 31, 2018). Internal Revenue Service." },
              { text: "Susan G. Komen Breast Cancer Foundation. (2019). Return of organization exempt from income tax (Form 990 for tax year 2018, EIN 75-1835298, fiscal year ending March 31, 2019). Internal Revenue Service." },
              { text: "Susan G. Komen Breast Cancer Foundation Group. (2013). Return of organization exempt from income tax (Form 990 for tax year 2012, EIN 75-2462834, fiscal year ending March 31, 2013). Internal Revenue Service." },
              {
                text: "Williamson, O. E. (1981). The economics of organization: The transaction cost approach. American Journal of Sociology, 87(3), 548–577.",
                href: "https://doi.org/10.1086/227496",
              },
            ],
          },
        ],
      },
    ],
  },
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
    "Gladwell's argument that success is an ecosystem (timing, culture, accumulated advantage) rather than an individual trait. Entry in progress: summary, favorite passages, and worldview notes to come. (Draft placeholder.)",
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
            text: "Kahneman's account of the two systems (fast, associative intuition and slow, effortful reasoning) is the load-bearing wall under most of behavioral economics. For the Atlas, the durable contribution is the catalogue of predictable errors: anchoring, loss aversion, the planning fallacy. Organizations are built from these errors at scale.",
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
            text: "I stopped treating behavior as preference and started treating it as architecture. When a policy fails or a queue forms differently in a different country, the interesting question is no longer what people want; it is what the structure around them made effortless.",
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
    "Harford's tour of everyday economics (scarcity, signaling, price discrimination) as a lens for reading organizations. Entry in progress. (Draft placeholder.)",
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
    "Housel's timeless lessons on wealth, greed, and happiness: behavior beating spreadsheets. Entry in progress. (Draft placeholder.)",
  ),
  readingStub(
    6,
    "antifragile",
    "Antifragile: Things That Gain From Disorder",
    "Nassim Nicholas Taleb",
    "https://en.wikipedia.org/wiki/Antifragile_(book)",
    "What kind of organization gets stronger when it is stressed?",
    "Taleb's case that the opposite of fragile is not robust but antifragile: systems that gain from disorder. Entry in progress. (Draft placeholder.)",
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
    "Bernays' 1928 manual for engineering consent: uncomfortable, foundational reading for anyone studying institutional communication. Entry in progress. (Draft placeholder.)",
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
        text: "The floor arrows, the queuing boxes, the door chimes pitched differently for arrival and departure: none of it is signage in the American sense, where instructions compensate for confusing design. The design itself is the instruction. Organizations write employee handbooks for the same reason bad stations hang more signs.",
      },
      {
        kind: "quote",
        text: "A system that needs to be explained is already apologizing.",
      },
      {
        kind: "p",
        text: "The note I keep returning to: trust in the system was not asked for anywhere. It accumulated from ten thousand small precisions, a train that arrives when the board says it will, every time. This is what operational discipline looks like when it becomes a communication strategy.",
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
    "Union Station between trains: the waiting, the retail, the restoration scaffolding, and the quiet negotiation over whom the building is for. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    4,
    "cities-relationship-with-time",
    "Every City Has a Different Relationship with Time",
    "Why does an hour feel different in different cities?",
    "Punctuality, queues, dinner hours, and walk signals: a city's clock is a cultural document. Note in progress. (Draft placeholder.)",
  ),
  noteStub(
    5,
    "walking-as-research",
    "Walking Is an Underrated Research Method",
    "What does a city tell you at three miles an hour?",
    "The research method that requires no instrument: walking the same street until it starts explaining itself. Note in progress. (Draft placeholder.)",
  ),
  {
    type: "note",
    slug: "coffee-shops-behavioral-design",
    domain: "notes",
    coordinate: "N-06",
    title: "Nobody Designed the Coffee Shop",
    question: "In a coffee shop nobody planned, who gets moved along and who gets to stay?",
    date: "2026-07-23",
    readingTime: 5,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: false,
    artifacts: [],
    body: [
        {
          kind: "dek",
          text: "Thousands of them open every year furnished by taste and budget. The survivors all end up with the same floor plan.",
        },
        {
          kind: "p",
          text: "Walk into enough independent coffee shops and a layout starts repeating itself. Hard seating sits near the door, stools and high tops and wooden benches that are pleasant for twenty minutes and punishing for two hours, while the soft chairs are pushed as far toward the back as the room allows. Outlets cluster along one wall or vanish from the best seats. The counter is placed so that the queue runs along the least useful floor space. You can find this arrangement in cities that share no trade press, in shops whose owners have never met, opened by people with no background in retail design and no consultant on the payroll.",
        },
        {
          kind: "p",
          text: "The tempting explanation is that this is behavioral design, that the furniture has been selected to shape how long you stay. Hospitality trade writing is full of this, and the mechanism it describes is real enough. What the explanation gets wrong is the intent, because in most of these rooms there was none. The chairs were bought because they were on sale, or because the owner liked them, or because they came with the space. Convergence on a common layout without a common designer is a different phenomenon than design, and a more interesting one.",
        },
        {
          kind: "p",
          text: "Armen Alchian made the general argument in 1950, in a paper about why firms behave as though they are optimizing when the people running them are doing nothing of the sort. His answer was that the market does not require anyone to calculate correctly. It only requires that those who calculate badly stop operating, after which the surviving population looks purposive whether or not any individual in it ever reasoned its way to anything. The coffee shop layout is a small and legible instance of it. Nobody worked out the seating strategy; the shops that got it wrong closed. Edith Penrose objected to the whole analogy two years later, arguing that selection does not reliably produce the optimization the argument credits it with, and the objection lands wherever an environment shifts faster than selection can run. The economics of a room with chairs in it do not shift that fast.",
        },
        {
          kind: "p",
          text: "What those failed shops got wrong is a conflict between two businesses sharing one room. The first is throughput: the customer who arrives at 7:40, orders, waits ninety seconds, and leaves, generating a few dollars and then vacating the space for the next person, which across a morning produces the revenue per square foot that pays the rent. The second is dwell: the customer who buys one drink at eleven and holds a four-top until two, consuming electricity and Wi-Fi and a table while generating almost nothing per hour. On the arithmetic, dwell is a loss that throughput subsidizes. On any other measure it is essential, because an empty café does not read as calm, it reads as failing, and the person deciding whether to come in is reading the room through the window.",
        },
        {
          kind: "p",
          text: "An owner who fills the front of the house with armchairs will not receive a signal telling them their morning throughput has fallen by a third. They will receive a slow shortfall they attribute to the weather, or the neighborhood, or the new place down the street, and some fraction of those owners will close for reasons they never correctly diagnose. The layout that survives encodes an analysis nobody performed.",
        },
        {
          kind: "p",
          text: "There is one part of the arrangement that does appear deliberate wherever you find it, which is the use of the clock rather than the floor plan to manage the conflict. Furniture cannot move, but the day can. Mornings run louder and faster, the queue engineered to clear, the whole room feeling like somewhere you pass through. By two in the afternoon the same space has gone quiet and become somewhere to stay. Nothing physical has changed. The variables that shifted are the ones capable of shifting, and music volume tracking the hour is the clearest sign that an operator has actually thought about any of this.",
        },
        {
          kind: "p",
          text: "The conflict has no solution, which is why outlets keep disappearing from cafés and then reappearing. Remove them and the afternoon room empties and starts to look like a place in trouble. Restore them and the four-tops fill with people making a cortado last three hours. The layout most shops arrive at does not resolve the conflict; it holds it at a temperature the business survives, and the rooms that held it at a worse one are not around to be surveyed.",
        },
    ],
  },
  {
    type: "note",
    slug: "libraries-understand-attention",
    domain: "notes",
    coordinate: "N-07",
    title: "Libraries Understand Attention Better Than Most Apps",
    question: "Why does focus come easily in a building full of strangers?",
    date: "2026-07-23",
    readingTime: 5,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: false,
    artifacts: [],
    body: [
        {
          kind: "dek",
          text: "Focus arrives easily in a room full of strangers and refuses to arrive on a device built to produce it.",
        },
        {
          kind: "p",
          text: "Someone who cannot work at home, who has installed two site blockers and a timer and still loses the afternoon, walks into a library; she sits at a table among people she has never met and will never speak to, and works for four hours without effort. Her willpower did not change on the walk over, and neither did the task. An entire software industry rests on the premise that this is a problem of self-control, and a building with no theory of attention whatsoever routinely outperforms it.",
        },
        {
          kind: "p",
          text: "Two mechanisms are doing the work, and neither is available to an application.",
        },
        {
          kind: "p",
          text: "The first is co-presence; twenty people are visibly engaged in the same activity, none of whom will comment on what you are doing, none of whom you will meet, and all of whom can see you. This produces accountability with no consequence attached, which turns out to be the productive ratio. Actual surveillance, a manager who can see your screen, generates anxiety and performance rather than attention, while total privacy generates nothing at all. What a reading room supplies is the mild continuous unenforced awareness of being among people who are working, and it recruits something social and quite old that has little to do with discipline. In neurodivergent communities the effect is called body doubling and is discussed as an accommodation. That framing understates it: body doubling appears to be the ordinary mechanism by which most people concentrate, simply noticed first by the population for whom its absence is most costly.",
        },
        {
          kind: "p",
          text: "The second is that the room means one thing: a library is single-purpose space, which converts focusing into a decision made once, at the door, rather than continuously, at every moment. This is the structural failure of the focus application. The blocker lives on the device that contains the thing being blocked, so the intention has to be renewed against a temptation that is always one gesture away, and every renewal costs something. Restriction fights the user and architecture removes the fight from the room, charging the whole price up front, in the walk over.",
        },
        {
          kind: "p",
          text: "Neither feature can be shipped, because software cannot supply real strangers in matched time and cannot be a place you go rather than a thing you are on.",
        },
        {
          kind: "p",
          text: "Virtual coworking is the case that ought to disprove this and instead explains it. Two people sit on video for fifty minutes and both work, and by every account it succeeds. It is also the one product category that imported the library's mechanisms rather than adding restrictions to a device: there is a real other person, visible and unjudging, there is a session with a start and an end, which is a door, and it conspicuously omits blocking, streaks, gamification, and analytics about your habits. The tool that works is the one that stopped trying to make its user more disciplined and tried instead to make her less alone.",
        },
        {
          kind: "p",
          text: "The economics of this explain the shape of the market better than any failure of insight. Restriction is cheap to build, easy to demonstrate, and produces a feature list. Co-presence requires other human beings in synchronized time, scales badly, and yields almost nothing to show a prospective customer beyond the customer's own presence. Single-purpose space cannot be sold as software at all, since its entire value consists in not being the device that contains everything else. A company that must ship features will keep building the thing that does not work, in a new interface, every eighteen months.",
        },
        {
          kind: "p",
          text: "Ray Oldenburg's third places were about sociability, the pub and the barbershop and the informal public life that happens outside home and work, and the library keeps getting filed under that heading. The reading room is doing something adjacent and different. It gathers people in order that they may be alone in company, and it manages this without programming, without membership, and without anyone on staff having decided that this was the service. The tables are long because that is how reading rooms were built. The quiet is a convention inherited from institutions with unrelated motives. Nobody arranged any of it to exploit ambient accountability, and it is not clear the arrangement would survive anyone trying.",
        },
    ],
  },
  {
    type: "note",
    slug: "waiting-rooms",
    domain: "notes",
    coordinate: "N-08",
    title: "Waiting Rooms Reveal More Than Waiting",
    question: "What does an organization believe about you while you wait?",
    date: "2026-07-23",
    readingTime: 4,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: false,
    artifacts: [],
    body: [
        {
          kind: "dek",
          text: "Budget explains the chairs, not the clock.",
        },
        {
          kind: "p",
          text: "The cheapest thing a waiting room can contain is information about how long you will be waiting, and the frequency with which rooms decline to contain it is the most revealing fact about them.",
        },
        {
          kind: "p",
          text: "A posted wait time requires no furniture, no renovation, and no staff. An emergency department that displays one has decided that a stranger's ability to plan the rest of the day is a legitimate claim on its operations, and has accepted the awkwardness of publishing a number that will sometimes look terrible. A registry office with no clock, no estimate, and no indication of queue position has decided otherwise, and the decision is rarely cruelty. It is arithmetic. Your uncertainty is expensive to you and free to the institution, appearing in none of its numbers and on none of its reports, so nothing in the system ever surfaces it as a problem to solve. Airlines began publishing delays at the point where uncertain passengers started generating costs at the gate. Institutions tell you how long you will wait at the moment your waiting begins to show up on their side of the ledger, and not before.",
        },
        {
          kind: "p",
          text: "This is the distinction that makes waiting rooms readable at all. An underfunded clinic and a well-endowed one differ in their chairs for obvious reasons, and reading an institution's soul out of its upholstery would be unfair; but the clock is nearly free, and so is a water dispenser, and so is the orientation of the front desk, and these vary in ways that budget does not explain. Scarcity constrains what an institution can provide and reveals what it prioritizes when it cannot provide everything, which makes a poor waiting room a better instrument than a rich one.",
        },
        {
          kind: "p",
          text: "Once you are looking at the free choices, the room fills with them. The front desk either faces the room or sits behind angled glass that lets whoever sits behind it decline to notice a space they know is full. The seating either admits that people arrive in pairs or bolts them into rows facing forward, where conversation is possible only in profile. Whether anything acknowledges that a person waiting for news is doing something different than a person waiting for a service is a question most rooms answer by never asking it. Whether the magazines were chosen or merely accumulated is answered by their dates, a stack four years out being a fairly exact measure of how long since anyone walked in and saw the room as a room rather than a corridor with seats in it.",
        },
        {
          kind: "p",
          text: "The oddity in all of this is that the waiting room is the one space an institution controls that nobody art-directs: the lobby is designed, the website has been through six rounds of review, the packaging, the signage, the hold music, and the receipts have all passed under the eye of someone paid to consider them. The waiting room gets furnished, which is a different verb, and because almost no one is trying to persuade you of anything while you sit in it, what it communicates is unguarded. Service designers have understood since Mary Jo Bitner's work on the servicescape in the early nineties that physical surroundings shape how customers read an encounter. The waiting room is the part of the servicescape that most organizations have not yet gotten around to shaping.",
        },
        {
          kind: "p",
          text: "This is also the limit of the method, and the reason I expect it to stop working. The most sophisticated organizations have already abolished the waiting room, Apple replacing it with an appointment and a staff member who finds you standing somewhere in the store so that you never experience yourself as waiting even while you are, and restaurants handing you a pager that relocates the wait to a sidewalk they are not responsible for. Both are real improvements that dissolve the evidence along with the problem, because as soon as a company becomes good enough at design to notice its waiting room is saying something, it will design the waiting room, and the room will become a statement like every other statement it makes. Everything readable here is readable only in the places nobody has gotten to yet.",
        },
    ],
  },
  {
    type: "note",
    slug: "yearbook-organizations",
    domain: "notes",
    coordinate: "N-09",
    title: "Three Things Editing a Yearbook Taught Me About Organizations",
    question: "What does a yearbook staff know about deadlines that companies don't?",
    date: "2026-07-23",
    readingTime: 5,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: false,
    artifacts: [],
    body: [
        {
          kind: "dek",
          text: "Fifty people, no salaries, no leverage, and a deadline nobody in the building controlled.",
        },
        {
          kind: "p",
          text: "I spent a year as editor-in-chief of a yearbook with about fifty people on staff, none of whom I could pay, promote, discipline, or fire, and all of us working toward a date none of us set. Most of what I have read since about management assumes at least one of those conditions away. The year taught me, mostly by removing the instruments, which instruments were holding the weight.",
        },
        {
          kind: "p",
          text: "A deadline is real only when someone outside the organization enforces it. The printer's date could not move. It was not a target or a milestone; it was the day the files existed or the book did not, and no explanation was going to alter it. I have since sat through many meetings about deadlines that were nothing like this: a corporate date is typically set by the same organization that will suffer from missing it, which means the organization retains the power to forgive itself, and everyone in the room understands this on the day the date is announced. The date slips because it was always capable of slipping; nobody says so, and an apparatus of tracking and status and escalation grows up around a commitment that never had enforcement behind it. The lesson is not that people require pressure; it is that a date with no external consequence is a stated preference, and teams recognize the difference long before anyone admits it.",
        },
        {
          kind: "p",
          text: "Without leverage, the only currency available is not wanting to disappoint someone. I could not offer a raise or threaten a job, so every mechanism that runs on consequence was unavailable, and what remained was thinner and stranger and more effective than I expected. People turned in spreads because they had said they would, because their name was going on the page, and because the person who would otherwise be fixing it at midnight was someone they knew. Organizational writing calls this commitment and files it as a soft supplement to real management. Running a staff with nothing else available, I came to suspect the causation points the other way, that commitment is what actually moves work and authority is the substitute organizations reach for once commitment has failed or was never built. The supporting evidence is that companies possess every form of leverage a yearbook staff lacks, and their coordination problems are not visibly smaller.",
        },
        {
          kind: "p",
          text: "Permanence changes how you check: the book prints once, and a misspelled name is misspelled in three hundred houses forever, with no revision and no quiet correction at two in the morning. Under that constraint you learn quickly that individual carefulness does not scale, because everyone is careful and the errors arrive regardless. What works is building the checking into the process so that it does not depend on anyone's attention on a bad night: names verified against a roster by a second person, every spread read by someone who did not make it, a final pass whose only assignment was proper nouns. Software culture has partly lost this habit because most software is reversible, and reversibility is a real advantage that quietly erodes the discipline of getting things right the first time. Anything an organization does that cannot be undone, a public statement, a layoff, a decision a customer will remember, is running under yearbook conditions rather than software conditions, and most organizations do not change modes when they cross that line.",
        },
        {
          kind: "p",
          text: "The three do not fit together. One says organizations need enforcement from outside themselves; another says the strongest coordination runs on something no enforcement can produce. The third cuts across both, holding that the process should be built to survive the people inside it on their worst day. I spent a while trying to reduce them to a single principle and eventually decided the tension was the finding rather than a failure to reach one, since the year worked precisely because the usual instruments were missing. We had no way to compel anyone, so we had to be worth showing up for, and the date was real, so nobody needed persuading that it mattered.",
        },
    ],
  },
  /* -- The first full essay on the site (converted from a Note): the
        Essay treatment is dek → body → one pull quote → References
        (the closing-bibliography block, the pattern for cited
        essays). -- */
  {
    type: "note",
    slug: "donor-engagement-customer-loyalty",
    domain: "notes",
    coordinate: "N-10",
    title: "The Same Machine",
    question: "Why do donors and customers churn for the same reasons?",
    date: "2026-07-19",
    readingTime: 7,
    format: "Essay",
    length: "1,500 words",
    hero: nextHero(),
    draft: false,
    artifacts: [],
    body: [
      {
        kind: "dek",
        text: "Nonprofits treat giving as charity, though it behaves like loyalty until the gift grows large enough to become something else.",
      },
      {
        kind: "p",
        text: "For two years I spent my days with a donor database, and what held my attention was never the gifts themselves but the pattern of who disappeared. Most people who gave did so exactly once. They arrived during a pledge drive, made a single contribution, and were never heard from again, leaving behind a long roster of names each fixed to a single date. A smaller number came back. Smaller still was the group that set up a recurring gift and then stayed for years, quietly, the way a lamp left on in an empty room goes unnoticed until you realize how long it has been burning. The donors who seemed least consequential in the moment, the ones giving ten dollars a month with no gala and no naming opportunity, proved over time to be the ones who mattered most.",
      },
      {
        kind: "p",
        text: "Blackbaud measured the shape of this in its Sustainers in Focus report, which followed donors from a first gift in 2006 across the decade that followed. A person who gave a single time was worth roughly two dollars ten years on, while someone who converted to monthly giving the following year was worth thirty-one, and someone who converted two years out, seventy-three. By the report's accounting, a new sustainer returns fifteen to thirty-six times the ten-year value of a single-gift donor (Anonymous, 2017). One person who sets up an automatic ten dollars, in other words, outweighs by an order of magnitude the person who writes a hundred-dollar check once and means it.",
      },
      {
        kind: "p",
        text: "Inside a nonprofit, the staff who cultivate that recurring gift belong to a department called development, or membership, a world with its own conferences, its own vocabulary, and its own founding conviction that giving is a categorically different act, undertaken because donors believe in the cause. They do believe, as a rule. What the database suggests, though, is that belief is seldom what sustains the relationship over time, and that habit is what actually does the work.",
      },
      {
        kind: "p",
        text: "Marketing understood this a century ago and said so without embarrassment. In the early trade literature the entire enterprise was organized around the repeat rather than the first sale. One writer in 1914 observed that Gillette had built its fortune by drawing men into an expensive habit, and that Pears distributed sample soap precisely so that use would settle into a permanent one. Holding on to the habitual customer, and forestalling what we would now call churn, was treated as the real work, while the initial purchase counted as little more than the price of entry. Followed back through the archive, it is habit rather than exchange that forms the actual spine of the discipline (Tadajewski, 2019), a lesson nonprofits seem to rediscover every year and promptly refile under a different name.",
      },
      {
        kind: "quote",
        text: "The sector's genuine error is not that it treats donors like customers; it is that it treats every donor like the same customer.",
      },
      {
        kind: "p",
        text: "The second ingredient is identity, and the most vivid illustration I have found sits in a place no fundraiser thinks to look, which is the economy of live-stream gifting. On Chinese streaming platforms, viewers send real money to performers they will never meet, partly to sustain a private sense of connection with one particular streamer and partly to be seen giving at all. Researchers who have studied the behavior separate it into relational identity and class identity, the bond and the display (Li et al., 2021). Translated into another idiom, this is the listener who feels personally addressed by a Morning Edition host, and it is the on-air acknowledgment that reads a donor's name into the air. The tote bag is not a present so much as reciprocity with a logo on it, and a second donation comes more easily than the first for the same reason a tenth comes more easily than a second, which is that each one confirms the person the donor has already decided to be.",
      },
      {
        kind: "p",
        text: "The obvious objection is that giving carries a moral warmth that buying does not, the quiet satisfaction of having done one's part. That satisfaction is real, it has a name in the literature, and it has been measured, and the measurements locate its source mostly in the self rather than in any observing audience. In one experiment, participants gave at nearly identical rates whether or not a pair of watching eyes appeared on the screen, and the eyes raised the amount given without changing the decision to give (Grossman & Levy, 2024). The celebrated moral return of giving consists, then, largely in the upkeep of a self-image, the sense of being the kind of person who gives, which runs on the same machinery as being a public-radio person, or an Apple person. Rather than setting giving apart from loyalty, the warmth proves to be cut from the same cloth.",
      },
      {
        kind: "p",
        text: "This is why the monthly sustainer does not merely resemble a subscription but functions as one, a point first made by someone inside the CRM industry rather than outside it. Blackbaud's chief scientist described the recurring gift as blending into the other small monthly charges on a donor's card, a Netflix subscription among them, until it becomes what he called background giving (Anonymous, 2017). Administering a fifteen-dollar monthly sustainer calls for the same discipline a streaming company practices, from the lapse when a card expires to the effort of winning the customer back and the unglamorous arithmetic of retention. Automating the gift lowers the cost of continuing to the point that people simply neglect to stop, which is less a matter of belief holding them in place than of friction finally arranged in their favor.",
      },
      {
        kind: "p",
        text: "The pattern holds until the gift grows large, at which point it quietly inverts. A major donor, the source of a six- or seven-figure commitment, is not operating out of habit at all. One study of thirty-two such donors found that their giving rested on relationships lasting eighteen years on average, on private conversations, on a trusted peer making the request, on professional advisors consulted along the way, and on terms that were negotiated rather than assumed (Van Hecke, 2025). This is not cue and routine but something closer to an enterprise sale, complete with a named account manager and a cycle measured in months. What these donors respond to is not automation but agency, an appeal that leaves the choice and the direction visibly in their hands, which is simply identity again in more formal dress. The mechanism does not vanish near the top of the pyramid, but it changes register.",
      },
      {
        kind: "p",
        text: "The sector's genuine error is not that it treats donors like customers; it is that it treats every donor like the same customer. The ten-dollar sustainer churns like a streaming subscriber and is best understood as one, while the two-million-dollar donor behaves like a key account and is best understood as another. Applying membership tactics to a major donor, or the choreography of a major gift to the mass file, is a category mistake in either direction, and most development shops commit it in at least one.",
      },
      {
        kind: "p",
        text: "There is a reading of all this that sounds cynical and, on closer inspection, is not. The purest-seeming giving, the automatic ten dollars a month with no plaque and no dinner attached, is in mechanical terms an instance of brand loyalty, built from habit, identity, and a charge that dissolves into the others on the card. The commitment behind it is entirely real; it is simply not exceptional. It is the ordinary way people bind themselves to anything that lasts, whether a detergent, a streamer, a newsroom, or a cause, and a nonprofit that understood its recurring donors the way a subscription business understands its base, while understanding its major donors the way a firm understands its accounts, would keep far more of the people it already has.",
      },
      {
        kind: "p",
        text: "Belief, in the end, was never what held them; habit was, and that word simply flattered us less.",
      },
      {
        kind: "references",
        items: [
          {
            text: "Anonymous. (2017). Research quantifies the high value in sustainer donor programs. Nonprofit Business Advisor, 2017(328), 1–3.",
            href: "https://doi.org/10.1002/nba.30265",
          },
          {
            text: "Grossman, P. J., & Levy, J. (2024). It's not you (well, it is a bit you), it's me: Self- versus social image in warm-glow giving. PLOS ONE, 19(3), Article e0300868.",
            href: "https://doi.org/10.1371/journal.pone.0300868",
          },
          {
            text: "Li, R., Lu, Y., Ma, J., & Wang, W. (2021). Examining gifting behavior on live streaming platforms: An identity-based motivation model. Information & Management, 58(6), Article 103406.",
            href: "https://doi.org/10.1016/j.im.2020.103406",
          },
          {
            text: "Tadajewski, M. (2019). Habit as a central concept in marketing. Marketing Theory, 19(4), 447–466.",
            href: "https://doi.org/10.1177/1470593119847251",
          },
          {
            text: "Van Hecke, D. C. (2025). Major donor philanthropy and the effects of social capital (Publication No. 32409616) [Doctoral dissertation]. ProQuest Dissertations & Theses Global.",
            href: "https://www.proquest.com/dissertations-theses/major-donor-philanthropy-effects-social-capital/docview/3271801752/se-2",
          },
        ],
      },
    ],
  },
  noteStub(
    11,
    "shenzhen-innovation",
    "How Shenzhen Changed My Understanding of Innovation",
    "What does innovation look like when it is a place instead of a pitch?",
    "Hardware markets, iteration speed, and a city that prototypes itself. Note in progress. (Draft placeholder.)",
  ),
  {
    type: "note",
    slug: "quiet-confidence-public-libraries",
    domain: "notes",
    coordinate: "N-12",
    title: "What Happens When a Library Is Made to Argue for Itself",
    question: "Why do libraries never have to advertise their trustworthiness?",
    date: "2026-07-23",
    readingTime: 5,
    format: "Atlas Note",
    length: "500–1,200 words",
    hero: nextHero(),
    draft: false,
    artifacts: [],
    body: [
        {
          kind: "dek",
          text: "The vocabulary of demonstrated value belongs to institutions that need something from you.",
        },
        {
          kind: "p",
          text: "Open the annual report of almost any large public library system and you will find, usually within the first few pages, a figure for return on investment. For every dollar of public funding, the community receives four dollars in value, or six, or eleven, depending on the methodology. The calculation assigns retail prices to borrowed books, hourly rates to computer sessions, tuition equivalents to literacy classes. This is careful work, produced by people who believe in the institution, and it exists because somewhere upstream a council or a legislature asked what the library was worth.",
        },
        {
          kind: "p",
          text: "Economists working on what they call cheap talk, meaning messages that cost the speaker nothing to send, established that such messages do carry information, though only within a limit: they inform to the degree that the speaker's interests run parallel to the listener's, and they decay toward noise as the two pull apart. A claim an institution makes about its own worth sits at the far end of that range, which is why nobody reads a company's description of its own value as evidence of anything. What made libraries unusual is that they were among the few institutions in a person's week that never had to make such a claim, and the reason was structural rather than cultural.",
        },
        {
          kind: "p",
          text: "A librarian helping you find a book has no stake in which book you leave with. He earns nothing more if you take the expensive one, is not evaluated on how many you check out, and loses nothing if you decide the subject was a mistake and go home with nothing at all. When he tells you the popular title on the display table is worse than the older one two shelves over, the advice costs him nothing in either direction, and you can hear that it costs him nothing. Trust does not follow from what an institution says about itself. It follows from what you are able to work out about its interests, and for most of their history libraries have been the rare case where the answer was that there weren't any.",
        },
        {
          kind: "p",
          text: "The bookstore makes the contrast legible, staffed by people who love books at least as much as librarians do, and who operate under a constraint librarians do not have, which is that the store needs the sale. The best booksellers are trusted exactly in the moments when they tell you not to buy something, because that is when their advice visibly cuts against their employer. This is the logic Michael Spence formalized as signaling, in which a claim becomes credible precisely because making it falsely would cost the speaker something. Booksellers purchase transaction by transaction what the library was getting structurally, and that many of them succeed is a tribute to them rather than evidence that the difference does not matter.",
        },
        {
          kind: "p",
          text: "This is what makes the return-on-investment figure worth looking at twice, though it is not dishonest and I am not suggesting the numbers are cooked. The issue is what the act of producing them does to the position the institution occupies. A library that publishes a multiplier has entered an argument, and to enter an argument is to acquire a stake in its outcome. The report exists to secure the appropriation. Everyone involved knows this, including the council members reading it, and the claim is therefore discounted the way claims from interested parties are always discounted. The institution has spent something to make it, and what it spent was the very quality that made its other statements credible.",
        },
        {
          kind: "p",
          text: "None of this amounts to saying that libraries should refuse to account for themselves, and the honest difficulty is that the accounting is not optional. Public money requires public justification; a system that declines to make its case in the language the funder speaks will simply be cut by people who never had to hear the case. The bind is real and I do not think there is a clean way through it. What I notice is only that the requirement arrives from outside, that it asks libraries to behave like organizations with something to gain, and that the behavior is not free even when it is unavoidable.",
        },
        {
          kind: "p",
          text: "There is a version of this problem in every institution that trades on disinterest. Auditors, referees, ratings agencies, and public broadcasters all derive their standing from having nothing at stake in the particular outcome, and all of them are periodically asked to demonstrate their worth to whoever pays for them. The demonstration is reasonable; it's also the moment the disinterest stops being obvious to anyone watching.",
        },
    ],
  },
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
