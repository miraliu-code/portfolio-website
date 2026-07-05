import type { IndexEntry } from "./types";
import { projects, projectHref } from "./projects";

/* Manual entries: concepts, people, places, organizations. */
const manual: IndexEntry[] = [
  { label: "Costco", category: "Organizations", href: "/atlas/strategy/market-entry/costco-membership-model" },
  { label: "Duolingo", category: "Organizations", href: "/atlas/io-psychology/consumer-psychology/duolingo-habit-formation" },
  { label: "Google", category: "Organizations", href: "/atlas/communication/internal-communication/google-return-to-office" },
  { label: "Juicy Couture", category: "Organizations", href: "/atlas/strategy/brand-strategy/juicy-couture-brand-audit" },
  { label: "Smithsonian Institution", category: "Organizations", href: "/atlas/notes/smithsonian-signage" },
  { label: "Shenzhen Metro", category: "Organizations", href: "/atlas/notes/shenzhen-metro-observations" },

  { label: "The Culture Code", category: "Books", href: "/atlas/reading/the-culture-code" },
  { label: "Thinking, Fast and Slow", category: "Books", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "The Design of Everyday Things", category: "Books", href: "/observatory/currently-reading" },
  { label: "Working", category: "Books", href: "/observatory/currently-reading" },

  { label: "Shenzhen", category: "Cities", href: "/photography/experience/shenzhen" },
  { label: "Washington, D.C.", category: "Cities", href: "/photography/experience/washington-dc" },

  { label: "Daniel Coyle", category: "People", href: "/atlas/reading/the-culture-code" },
  { label: "Daniel Kahneman", category: "People", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "Don Norman", category: "People", href: "/observatory/currently-reading" },

  { label: "Habit formation", category: "Concepts", href: "/atlas/io-psychology/consumer-psychology/duolingo-habit-formation" },
  { label: "Loss aversion", category: "Concepts", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "Organizational trust", category: "Concepts", href: "/atlas/communication/internal-communication/google-return-to-office" },
  { label: "Psychological safety", category: "Concepts", href: "/atlas/reading/the-culture-code" },
  { label: "Restraint", category: "Concepts", href: "/atlas/design/editorial-design/designing-the-atlas" },
  { label: "Wayfinding", category: "Concepts", href: "/atlas/notes/shenzhen-metro-observations" },
];

/* Every project appears once, derived from the registry. */
const derived: IndexEntry[] = projects.map((p) => ({
  label: p.title,
  category:
    p.type === "note" ? ("Essays" as const) : ("Projects" as const),
  href: projectHref(p),
  coordinate: p.coordinate,
}));

export const indexEntries: IndexEntry[] = [...manual, ...derived].sort((a, b) =>
  a.label.localeCompare(b.label),
);

export const indexCategories = [
  "Organizations",
  "Books",
  "Cities",
  "Projects",
  "Essays",
  "People",
  "Concepts",
] as const;
