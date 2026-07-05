import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { SectionLabel } from "@/components/section-label";
import { getExplorableProjects, projectHref } from "@/lib/content/projects";

export const metadata: Metadata = { title: "Explorable Systems" };

/*
 * Explorable Systems: investigations with an interactive component.
 * "What becomes obvious when you can explore the system instead of
 * reading about it?"
 */
export default function ExplorableSystemsPage() {
  const explorables = getExplorableProjects();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>Atlas · Explorable Systems</SectionLabel>
      <div>
        <BackLink href="/atlas" label="Back to the Atlas" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
        Systems you can explore instead of read.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        Every interactive asks one question: what becomes obvious when you can
        explore the system instead of reading about it? The written portion
        provides the argument; the interactive lets you discover it yourself.
      </p>

      <ul className="mt-14 max-w-2xl">
        {explorables.map((project) => (
          <li key={project.slug} className="border-t border-structure/15 last:border-b">
            <Link
              href={`${projectHref(project)}#interactive`}
              className="group block py-6"
            >
              <span className="flex items-baseline justify-between gap-6">
                <span className="font-serif text-xl leading-snug text-information transition-colors group-hover:text-interaction">
                  {project.title}
                </span>
                <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/60">
                  {project.coordinate}
                </span>
              </span>
              <span className="mt-2 block font-serif text-base italic text-information/70">
                {project.question}
              </span>
              <span className="mt-3 block font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/60">
                {project.format} · {project.length}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
