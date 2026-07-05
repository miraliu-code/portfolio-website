import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { projectHref } from "@/lib/content/projects";

/*
 * Project card (Standard 10): hero image, title, guiding question,
 * reading time, coordinate. Nothing else competes with these.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={projectHref(project)} className="group block">
      {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */}
      <img
        src={project.hero}
        alt=""
        className="aspect-[3/2] w-full border border-structure/10 object-cover"
      />
      <h3 className="mt-5 font-serif text-xl leading-snug text-information transition-colors group-hover:text-interaction">
        {project.title}
      </h3>
      <p className="mt-2 font-serif text-base italic leading-relaxed text-information/70">
        {project.question}
      </p>
      <p className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
        {project.readingTime} min read · {project.coordinate}
      </p>
    </Link>
  );
}
