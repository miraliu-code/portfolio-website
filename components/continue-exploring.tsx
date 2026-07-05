import Link from "next/link";
import type { Project, Relationship } from "@/lib/content/types";
import { getProject, getProjectsByDomain, projectHref } from "@/lib/content/projects";
import { SectionLabel } from "./section-label";

const relationshipLabels: Record<Relationship, string> = {
  expand: "Expand",
  compare: "Compare",
  deepen: "Deepen",
  observe: "Observe",
};

interface ResolvedLink {
  target: Project;
  relationship: Relationship;
  note: string;
}

/*
 * Every project ends here (Standard 09): curated editorial transitions,
 * never algorithmic. Roadmap stubs without curated links fall back to
 * quiet siblings from the same domain, with their questions as notes.
 */
export function ContinueExploring({ project }: { project: Project }) {
  let resolved: ResolvedLink[] = (project.continueExploring ?? [])
    .map((link) => ({
      target: getProject(link.slug),
      relationship: link.relationship,
      note: link.note,
    }))
    .filter((x): x is ResolvedLink => x.target !== undefined);

  if (resolved.length === 0) {
    resolved = getProjectsByDomain(project.domain)
      .filter(
        (p) =>
          p.slug !== project.slug &&
          (p.type !== "standard" ||
            project.type !== "standard" ||
            p.folder === project.folder),
      )
      .slice(0, 3)
      .map((target) => ({
        target,
        relationship: "expand" as const,
        note: target.question,
      }));
  }

  if (resolved.length === 0) return null;

  return (
    <section className="mt-24 border-t border-structure/20 pt-12">
      <SectionLabel>Continue Exploring</SectionLabel>
      <ul className="mt-8 max-w-2xl">
        {resolved.map(({ target, relationship, note }) => (
          <li key={target.slug} className="border-b border-structure/10">
            <Link href={projectHref(target)} className="group block py-5">
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-interaction">
                {relationshipLabels[relationship]}
              </span>
              <span className="mt-1 block font-serif text-lg text-information transition-colors group-hover:text-interaction">
                {target.title}
              </span>
              <span className="mt-1 block font-serif text-sm italic text-information/60">
                {note}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
