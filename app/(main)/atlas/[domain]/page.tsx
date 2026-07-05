import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
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
      <div>
        <BackLink href="/atlas" label="Back to the Atlas" />
      </div>

      <header className="mt-6 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-start">
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
        /* Literal file folders: tab on top, label and count inside. */
        <ul className="mt-20 grid max-w-3xl gap-x-10 gap-y-14 sm:grid-cols-2">
          {folders.map((folder) => {
            const count = getProjectsByFolder(slug, folder.slug).length;
            return (
              <li key={folder.slug}>
                <Link
                  href={`/atlas/${slug}/${folder.slug}`}
                  className="group relative block transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {/* The folder's tab */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 left-0 h-4 w-2/5 rounded-t-sm border border-b-0 border-structure/40 bg-structure/15 transition-colors group-hover:border-interaction/50"
                  />
                  {/* The folder's body */}
                  <span className="flex min-h-40 flex-col justify-between border border-structure/40 bg-structure/15 p-6 transition-[border-color,box-shadow] duration-200 group-hover:border-interaction/50 group-hover:shadow-lg group-hover:shadow-structure/15">
                    <span>
                      <span className="block font-sans text-sm uppercase tracking-[0.2em] text-information transition-colors group-hover:text-interaction">
                        {folder.name}
                      </span>
                      <span className="mt-3 block font-serif text-sm italic leading-relaxed text-information/60">
                        {folder.description}
                      </span>
                    </span>
                    <span className="mt-6 block font-sans text-xs uppercase tracking-[0.2em] text-information/60">
                      {count} investigation{count === 1 ? "" : "s"}
                    </span>
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
