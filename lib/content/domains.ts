import type { DomainMeta, Folder } from "./types";

export const domains: DomainMeta[] = [
  {
    slug: "strategy",
    name: "Strategy",
    prefix: "S",
    question: "How do organizations compete, grow, and adapt?",
    description:
      "Flagship reports, case studies, and white papers on how organizations compete, grow, and adapt — from cultural institutions to global retailers.",
    letterform: "S",
    hasFolders: true,
  },
  {
    slug: "communication",
    name: "Communication",
    prefix: "COM",
    question: "How do organizations reduce uncertainty and build understanding?",
    description:
      "Crisis cases, institutional voice studies, and professional writing — how organizations reduce uncertainty and build understanding.",
    letterform: "C",
    hasFolders: true,
  },
  {
    slug: "design",
    name: "Design",
    prefix: "D",
    question: "How does information shape perception, movement, and decision-making?",
    description:
      "Identity systems, information design, and explorable systems — how information shapes perception, movement, and decision-making.",
    letterform: "D",
    hasFolders: true,
  },
  {
    slug: "io-psychology",
    name: "I/O Psychology",
    prefix: "IO",
    question: "How do organizations shape human behavior?",
    description:
      "Organizational behavior, leadership, decision-making, and culture — how organizations shape human behavior, and are shaped by it.",
    letterform: "Ψ",
    hasFolders: true,
  },
  {
    slug: "reading",
    name: "Reading",
    prefix: "R",
    question: "What ideas have changed my thinking?",
    description:
      "A living archive of books, articles, reports, and research papers — summaries, favorite passages, and how each revised my worldview.",
    letterform: "R",
    hasFolders: false,
  },
  {
    slug: "notes",
    name: "Notes",
    prefix: "N",
    question: "What have I been noticing?",
    description:
      "Growing short observations from travel, work, photography, and everyday life. The smallest observations often reveal the largest patterns.",
    letterform: "N",
    hasFolders: false,
  },
];

export const folders: Folder[] = [
  /* ---- Strategy ---- */
  {
    slug: "market-strategy",
    domain: "strategy",
    name: "Market Strategy",
    description: "How organizations decide where to compete, and on what terms.",
    question: "Where should an organization compete — and on whose terms?",
  },
  {
    slug: "comparative-strategy",
    domain: "strategy",
    name: "Comparative Strategy",
    description: "The same problem, solved differently across countries and organizations.",
    question: "Why do different organizations solve the same problem so differently?",
  },
  {
    slug: "strategic-partnerships",
    domain: "strategy",
    name: "Strategic Partnerships",
    description: "What organizations buy, borrow, and risk when they join forces.",
    question: "What does a partnership actually purchase?",
  },
  {
    slug: "organizational-strategy",
    domain: "strategy",
    name: "Organizational Strategy",
    description: "Mission, structure, and reinvention inside single organizations.",
    question: "Can an organization change what it does without losing what it is?",
  },
  {
    slug: "scenario-planning",
    domain: "strategy",
    name: "Scenario Planning",
    description: "Structured futures for institutions facing uncertainty.",
    question: "What futures should an institution be preparing for?",
  },

  /* ---- Communication ---- */
  {
    slug: "crisis-communication",
    domain: "communication",
    name: "Crisis Communication",
    description: "What organizations say when something has gone wrong.",
    question: "What should an organization say when something has gone wrong?",
  },
  {
    slug: "organizational-communication",
    domain: "communication",
    name: "Organizational Communication",
    description: "The internal systems of meetings, messages, and understanding.",
    question: "What if communication is the organization, not a function of it?",
  },
  {
    slug: "institutional-communication",
    domain: "communication",
    name: "Institutional Communication",
    description: "How institutions develop — and lose — a recognizable voice.",
    question: "What gives an institution a voice people trust?",
  },
  {
    slug: "public-affairs",
    domain: "communication",
    name: "Public Affairs",
    description: "Organizations speaking to publics, regulators, and markets.",
    question: "How should institutions speak when everyone is listening?",
  },
  {
    slug: "professional-writing",
    domain: "communication",
    name: "Professional Writing",
    description: "Working documents: releases, speeches, briefs, and appeals.",
    question: "What does a well-made working document actually do?",
  },

  /* ---- Design ---- */
  {
    slug: "identity-systems",
    domain: "design",
    name: "Identity Systems",
    description: "Audits and anatomies of visual identities that endure.",
    question: "What holds a visual identity together for a century?",
  },
  {
    slug: "presentation",
    domain: "design",
    name: "Presentation",
    description: "Decks and briefings designed to carry an argument.",
    question: "How much argument can a room's worth of slides carry?",
  },
  {
    slug: "information-design",
    domain: "design",
    name: "Information Design",
    description: "Redesigns that make serious information legible.",
    question: "Can serious information be made inviting without being diluted?",
  },
  {
    slug: "systems-design",
    domain: "design",
    name: "Systems Design",
    description: "Airports, transit, and infrastructure as designed information systems.",
    question: "What becomes obvious when you can explore a system instead of reading about it?",
  },
  {
    slug: "editorial-design",
    domain: "design",
    name: "Editorial Design",
    description: "Publications, typography, and systems for making ideas legible.",
    question: "How should ideas be given a visible form?",
  },

  /* ---- I/O Psychology ---- */
  {
    slug: "organizations",
    domain: "io-psychology",
    name: "Organizations",
    description: "Culture, cohesion, and change inside real organizations.",
    question: "What holds an organization together when it changes?",
  },
  {
    slug: "leadership",
    domain: "io-psychology",
    name: "Leadership",
    description: "Motivation, hierarchy, and the people at the front.",
    question: "What do leaders actually control?",
  },
  {
    slug: "decision-making",
    domain: "io-psychology",
    name: "Decision Making",
    description: "The architecture of choices inside institutions.",
    question: "Who designs the decisions organizations think they make freely?",
  },
  {
    slug: "culture-behavior",
    domain: "io-psychology",
    name: "Culture & Behavior",
    description: "How place and culture shape organizational behavior.",
    question: "How much of behavior is culture wearing a uniform?",
  },
];

export function getDomain(slug: string): DomainMeta | undefined {
  return domains.find((d) => d.slug === slug);
}

export function getFolders(domain: string): Folder[] {
  return folders.filter((f) => f.domain === domain);
}

export function getFolder(domain: string, slug: string): Folder | undefined {
  return folders.find((f) => f.domain === domain && f.slug === slug);
}
