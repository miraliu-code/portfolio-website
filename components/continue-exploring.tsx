import Link from "next/link";
import type { ContinueLink, Relationship } from "@/lib/content/types";
import { getProject, projectHref } from "@/lib/content/projects";
import { SectionLabel } from "./section-label";

const relationshipLabels: Record<Relationship, string> = {
  expand: "Expand",
  compare: "Compare",
  deepen: "Deepen",
  observe: "Observe",
};

/*
 * Every project ends here (Standard 09): curated editorial transitions,
 * never algorithmic. One room leading into another.
 */
export function ContinueExploring({ links }: { links: ContinueLink[] }) {
  const resolved = links
    .map((link) => ({ link, target: getProject(link.slug) }))
    .filter((x) => x.target !== undefined);

  if (resolved.length === 0) return null;

  return (
    <section className="mt-24 border-t border-structure/20 pt-12">
      <SectionLabel>Continue Exploring</SectionLabel>
      <ul className="mt-8 max-w-2xl">
        {resolved.map(({ link, target }) => (
          <li key={link.slug} className="border-b border-structure/10">
            <Link href={projectHref(target!)} className="group block py-5">
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-interaction">
                {relationshipLabels[link.relationship]}
              </span>
              <span className="mt-1 block font-serif text-lg text-information transition-colors group-hover:text-interaction">
                {target!.title}
              </span>
              <span className="mt-1 block font-serif text-sm italic text-information/60">
                {link.note}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
