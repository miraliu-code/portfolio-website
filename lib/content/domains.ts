import type { DomainMeta, Folder } from "./types";

export const domains: DomainMeta[] = [
  {
    slug: "strategy",
    name: "Strategy",
    prefix: "S",
    question: "What should organizations do?",
    description:
      "Market entry analyses, business model studies, and brand audits — investigations into the choices organizations make and the reasoning behind them.",
    letterform: "S",
    hasFolders: true,
  },
  {
    slug: "communication",
    name: "Communication",
    prefix: "COM",
    question: "How should organizations communicate?",
    description:
      "Crisis simulations, internal communications, and public messaging — how organizations speak, and what their speech reveals about them.",
    letterform: "C",
    hasFolders: true,
  },
  {
    slug: "design",
    name: "Design",
    prefix: "D",
    question: "How does design shape understanding?",
    description:
      "Editorial systems, identity work, and the design of this publication itself — every visual decision as an editorial decision.",
    letterform: "D",
    hasFolders: true,
  },
  {
    slug: "io-psychology",
    name: "I/O Psychology",
    prefix: "IO",
    question: "Why do people behave this way?",
    description:
      "Organizational behavior, motivation, and consumer psychology — organizations understood as collections of people rather than abstractions.",
    letterform: "Ψ",
    hasFolders: true,
  },
  {
    slug: "reading",
    name: "Reading",
    prefix: "R",
    question: "What ideas have changed my thinking?",
    description:
      "Books in dialogue with the rest of the Atlas — summaries, favorite passages, and how each one revised my worldview.",
    letterform: "R",
    hasFolders: false,
  },
  {
    slug: "notes",
    name: "Notes",
    prefix: "N",
    question: "What have I been noticing?",
    description:
      "Field notes and observations — subway systems, museum signage, storefronts. The smallest observations often reveal the largest patterns.",
    letterform: "N",
    hasFolders: false,
  },
];

export const folders: Folder[] = [
  {
    slug: "market-entry",
    domain: "strategy",
    name: "Market Entry",
    description: "How organizations decide where to compete, and on what terms.",
  },
  {
    slug: "brand-strategy",
    domain: "strategy",
    name: "Brand Strategy",
    description: "What brands promise, and whether their choices keep the promise.",
  },
  {
    slug: "crisis-communication",
    domain: "communication",
    name: "Crisis Communication",
    description: "What organizations say when something has gone wrong.",
  },
  {
    slug: "internal-communication",
    domain: "communication",
    name: "Internal Communication",
    description: "How organizations talk to their own people — and what it costs when they do it badly.",
  },
  {
    slug: "editorial-design",
    domain: "design",
    name: "Editorial Design",
    description: "Publications, typography, and systems for making ideas legible.",
  },
  {
    slug: "organizational-behavior",
    domain: "io-psychology",
    name: "Organizational Behavior",
    description: "Motivation, culture, and cohesion inside organizations.",
  },
  {
    slug: "consumer-psychology",
    domain: "io-psychology",
    name: "Consumer Psychology",
    description: "Habit, loyalty, and the psychology of everyday decisions.",
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
