import { projects, projectHref } from "./content/projects";
import { domains } from "./content/domains";
import { indexEntries } from "./content/index-entries";

/*
 * Search documents: titles, guiding questions, domains, and
 * organizations. Metadata only — no essay prose — so the client
 * bundle stays small.
 */
export interface SearchDoc {
  label: string;
  sublabel?: string; // the guiding question, shown and searched
  category: string;
  href: string;
}

export const searchDocs: SearchDoc[] = [
  ...projects.map((p) => ({
    label: p.title,
    sublabel: p.question,
    category:
      p.type === "note" ? "Note" : p.type === "reading" ? "Reading" : "Project",
    href: projectHref(p),
  })),
  ...domains.map((d) => ({
    label: d.name,
    sublabel: d.question,
    category: "Domain",
    href: `/atlas/${d.slug}`,
  })),
  ...indexEntries
    .filter((e) => e.category === "Organization" && e.href)
    .map((e) => ({
      label: e.label,
      category: "Organization",
      href: e.href!,
    })),
];

export function searchAtlas(query: string, limit = 8): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return searchDocs
    .filter(
      (doc) =>
        doc.label.toLowerCase().includes(q) ||
        doc.sublabel?.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q),
    )
    .slice(0, limit);
}
