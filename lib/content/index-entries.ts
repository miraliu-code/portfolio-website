import type { IndexEntry } from "./types";
import { projects, projectHref, getOrganizations } from "./projects";
import { domains } from "./domains";
import { photoCategories } from "./photography";
import { observatorySections } from "./observatory";

/*
 * The Index: the publication's back matter. Every project, domain,
 * category, organization, and a handful of cities, people, and
 * concepts — alphabetically.
 */

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const manual: IndexEntry[] = [
  { label: "Shenzhen", category: "City", href: "/photography/experience/shenzhen" },
  { label: "Washington, D.C.", category: "City", href: "/photography/experience/washington-dc" },
  { label: "New York", category: "City", href: "/atlas/notes/a-day-in-new-york" },
  { label: "Hong Kong", category: "City", href: "/atlas/design/systems-design/hong-kong-mtr-wayfinding" },

  { label: "Malcolm Gladwell", category: "Person", href: "/atlas/reading/outliers" },
  { label: "Daniel Kahneman", category: "Person", href: "/atlas/reading/thinking-fast-and-slow" },
  { label: "Morgan Housel", category: "Person", href: "/atlas/reading/psychology-of-money" },
  { label: "Nassim Nicholas Taleb", category: "Person", href: "/atlas/reading/antifragile" },
  { label: "Edward Bernays", category: "Person", href: "/atlas/reading/propaganda" },

  { label: "Organizational trust", category: "Concept", href: "/atlas/io-psychology/decision-making/trust-organizational-asset" },
  { label: "Wayfinding", category: "Concept", href: "/atlas/design/systems-design/hong-kong-mtr-wayfinding" },
  { label: "Communication debt", category: "Concept", href: "/atlas/communication/organizational-communication/communication-debt" },
  { label: "Decision architecture", category: "Concept", href: "/atlas/io-psychology/decision-making/decision-architecture" },
  { label: "Restraint", category: "Concept", href: "/atlas/design/editorial-design/atlas-design-system" },
];

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
  ...getOrganizations().map((org) => ({
    label: org.name,
    category: "Organization",
    href: `/atlas/organizations#${slugify(org.name)}`,
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
