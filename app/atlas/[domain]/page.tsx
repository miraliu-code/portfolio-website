import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectCard } from "@/components/project-card";
import { domains, getDomain, getFolders } from "@/lib/content/domains";
import {
  getProjectsByDomain,
  getProjectsByFolder,
} from "@/lib/content/projects";

export function generateStaticParams() {
  return domains.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}): Promise<Metadata> {
  const { domain } = await params;
  const meta = getDomain(domain);
  return { title: meta ? meta.name : "Atlas" };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: slug } = await params;
  const domain = getDomain(slug);
  if (!domain) notFound();

  const folders = getFolders(slug);
  const directProjects = domain.hasFolders ? [] : getProjectsByDomain(slug);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <Breadcrumbs
        crumbs={[
          { label: "Atlas", href: "/atlas" },
          { label: domain.name },
        ]}
      />

      <header className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="font-serif text-4xl leading-tight text-information">
            {domain.name}
          </h1>
          <p className="mt-4 max-w-xl font-serif text-xl italic leading-snug text-interaction">
            {domain.question}
          </p>
          <p className="mt-6 max-w-xl font-serif text-base leading-relaxed text-information/80">
            {domain.description}
          </p>
        </div>
        <div
          aria-hidden="true"
          className="hidden select-none border border-structure/20 px-8 py-4 font-serif text-7xl italic text-structure/30 sm:block"
        >
          {domain.letterform}
        </div>
      </header>

      {domain.hasFolders ? (
        <ul className="mt-16 max-w-2xl">
          {folders.map((folder) => {
            const count = getProjectsByFolder(slug, folder.slug).length;
            return (
              <li key={folder.slug} className="border-t border-structure/15 last:border-b">
                <Link
                  href={`/atlas/${slug}/${folder.slug}`}
                  className="group block py-6"
                >
                  <span className="flex items-baseline justify-between gap-6">
                    <span className="font-serif text-xl text-information transition-colors group-hover:text-interaction">
                      {folder.name}
                    </span>
                    <span className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
                      {count} investigation{count === 1 ? "" : "s"}
                    </span>
                  </span>
                  <span className="mt-2 block font-serif text-sm italic text-information/60">
                    {folder.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        /* Reading and Notes skip the folder layer: projects directly. */
        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {directProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </main>
  );
}
