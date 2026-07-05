import Link from "next/link";
import type { Project } from "@/lib/content/types";
import { projectHref } from "@/lib/content/projects";

/*
 * Editorial article listing (Standard 10): large thumbnail, large title,
 * guiding question, reading time and coordinate — in a very light box
 * with generous whitespace. Nothing else competes with these.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project)}
      className="group block border border-structure/15 bg-structure/5 p-5 transition-[border-color,box-shadow] duration-200 hover:border-interaction/40 hover:shadow-lg hover:shadow-structure/10 motion-reduce:transition-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */}
      <img
        src={project.hero}
        alt=""
        className="aspect-[3/2] w-full border border-structure/10 object-cover"
      />
      <h3 className="mt-6 font-serif text-2xl leading-snug text-information transition-colors group-hover:text-interaction">
        {project.title}
      </h3>
      <p className="mt-3 font-serif text-base italic leading-relaxed text-information/70">
        {project.question}
      </p>
      <p className="mt-4 pb-1 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
        {project.readingTime} min read · {project.coordinate}
      </p>
    </Link>
  );
}
