import type { IndexEntry } from "./types";
import { projects, projectHref } from "./projects";
import { domains } from "./domains";
import { photoCategories } from "./photography";
import { observatorySections } from "./observatory";

/*
 * The Index: the publication's back matter. Every project, domain,
 * category, and organization across the site, alphabetically.
 */

/* Manual entries: organizations, books, cities, people, concepts. */
const manual: IndexEntry[] = [
  { label: "Costco", category: "Organization", href: "/atlas/strategy/market-entry/costco-membership-model" },
  { label: "Duolingo", category: "Organization", href: "/atlas/io-psychology/consumer-psychology/duolingo-habit-formation" },
  { label: "Google", category: "Organization", href: "/atlas/communication/internal-communication/google-return-to-office" },
  { label: "Juicy Couture", category: "Organization", href: "/atlas/strategy/brand-strategy/juicy-couture-brand-audit" },
  { label: "Smithsonian Institution", category: "Organization", href: "/atlas/notes/smithsonian-signage" },
  { label: "Shenzhen Metro", category: "Organization", href: "/atlas/notes/shenzhen-metro-observations" },
  { label: "American University", category: "Organization", href: "/about" },

  { label: "The Culture Code", category: "Book", href: "/atlas/reading/the-culture-code" },
  { label: "Thinking, Fast and Slow", category: "Book", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "The Design of Everyday Things", category: "Book", href: "/observatory/currently-reading" },
  { label: "Working", category: "Book", href: "/observatory/currently-reading" },

  { label: "Shenzhen", category: "City", href: "/photography/experience/shenzhen" },
  { label: "Washington, D.C.", category: "City", href: "/photography/experience/washington-dc" },

  { label: "Daniel Coyle", category: "Person", href: "/atlas/reading/the-culture-code" },
  { label: "Daniel Kahneman", category: "Person", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "Don Norman", category: "Person", href: "/observatory/currently-reading" },

  { label: "Habit formation", category: "Concept", href: "/atlas/io-psychology/consumer-psychology/duolingo-habit-formation" },
  { label: "Loss aversion", category: "Concept", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "Organizational trust", category: "Concept", href: "/atlas/communication/internal-communication/google-return-to-office" },
  { label: "Psychological safety", category: "Concept", href: "/atlas/reading/the-culture-code" },
  { label: "Restraint", category: "Concept", href: "/atlas/design/editorial-design/designing-the-atlas" },
  { label: "Wayfinding", category: "Concept", href: "/atlas/notes/shenzhen-metro-observations" },
];

/* Derived entries: every project, domain, and category, exactly once. */
const derived: IndexEntry[] = [
  ...projects.map((p) => ({
    label: p.title,
    category:
      p.type === "note" ? "Note" : p.type === "reading" ? "Reading" : "Project",
    href: projectHref(p),
    coordinate: p.coordinate,
  })),
  ...domains.map((d) => ({
    label: d.name,
    category: "Domain",
    href: `/atlas/${d.slug}`,
  })),
  ...photoCategories.map((c) => ({
    label: c.name,
    category: "Photography",
    href: `/photography/${c.slug}`,
  })),
  ...observatorySections.map((s) => ({
    label: s.name,
    category: "Observatory",
    href: `/observatory/${s.slug}`,
  })),
];

export const indexEntries: IndexEntry[] = [...manual, ...derived].sort(
  (a, b) => a.label.localeCompare(b.label),
);

/* Sort key: ignore leading articles, encyclopedia-style. */
export function indexLetter(label: string): string {
  const stripped = label.replace(/^(the|a|an)\s+/i, "");
  const first = stripped.charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : "#";
}
