import type { Project } from "@/lib/content/types";
import { BackLink } from "./back-link";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

/*
 * Project header: image, title, question, metadata, downloads.
 * The guiding question lives here — not in a tab.
 */
export function ProjectHeader({
  project,
  crumbs,
}: {
  project: Project;
  crumbs: Crumb[];
}) {
  const parent = [...crumbs].reverse().find((crumb) => crumb.href);

  return (
    <header>
      <Breadcrumbs crumbs={crumbs} />
      {parent && (
        <div>
          <BackLink href={parent.href!} label={`Back to ${parent.label}`} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */}
      <img
        src={project.hero}
        alt=""
        className="mt-8 aspect-[21/9] w-full border border-structure/10 object-cover"
      />
      <h1 className="mt-10 max-w-3xl font-serif text-3xl leading-tight text-information md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-xl italic leading-snug text-interaction">
        {project.question}
      </p>
      <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-sans text-xs uppercase tracking-[0.2em] text-information/60">
        <span>{project.format}</span>
        <span>{project.length}</span>
        <span>{project.readingTime} min read</span>
        <span>{project.coordinate}</span>
        {project.type === "reading" && (
          <a
            href={project.sourceUrl}
            className="text-interaction hover:underline hover:underline-offset-4"
          >
            Read the original
          </a>
        )}
        {project.pdf && (
          <a
            href={project.pdf}
            className="text-interaction hover:underline hover:underline-offset-4"
          >
            Download PDF
          </a>
        )}
        {project.draft && (
          <span className="border border-structure/30 px-2 py-1 tracking-[0.15em] text-structure">
            Draft — placeholder text
          </span>
        )}
      </div>
    </header>
  );
}
