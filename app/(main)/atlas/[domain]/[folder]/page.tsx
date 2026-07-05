import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectCard } from "@/components/project-card";
import { ProjectView } from "@/components/project-view";
import { domains, getDomain, getFolder, getFolders } from "@/lib/content/domains";
import {
  getProject,
  getProjectsByDomain,
  getProjectsByFolder,
} from "@/lib/content/projects";

/*
 * Dual-purpose segment: for folder domains this is a folder page
 * (/atlas/strategy/market-entry); for Reading and Notes — which skip the
 * folder layer — it is the project page itself (/atlas/reading/the-culture-code).
 */

export function generateStaticParams() {
  const params: { domain: string; folder: string }[] = [];
  for (const d of domains) {
    if (d.hasFolders) {
      for (const f of getFolders(d.slug))
        params.push({ domain: d.slug, folder: f.slug });
    } else {
      for (const p of getProjectsByDomain(d.slug))
        params.push({ domain: d.slug, folder: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; folder: string }>;
}): Promise<Metadata> {
  const { domain, folder } = await params;
  const meta = getDomain(domain);
  if (meta && !meta.hasFolders) {
    const project = getProject(folder);
    return { title: project ? project.title : meta.name };
  }
  const f = getFolder(domain, folder);
  return { title: f ? `${f.name} · ${meta?.name ?? ""}` : "Atlas" };
}

export default async function FolderOrProjectPage({
  params,
}: {
  params: Promise<{ domain: string; folder: string }>;
}) {
  const { domain: domainSlug, folder: folderSlug } = await params;
  const domain = getDomain(domainSlug);
  if (!domain) notFound();

  /* Reading / Notes: this segment is a project slug. */
  if (!domain.hasFolders) {
    const project = getProject(folderSlug);
    if (!project || project.domain !== domainSlug) notFound();
    return <ProjectView project={project} />;
  }

  const folder = getFolder(domainSlug, folderSlug);
  if (!folder) notFound();
  const projects = getProjectsByFolder(domainSlug, folderSlug);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <Breadcrumbs
        crumbs={[
          { label: "Atlas", href: "/atlas" },
          { label: domain.name, href: `/atlas/${domain.slug}` },
        ]}
      />
      <h1 className="mt-12 font-serif text-4xl leading-tight text-information">
        {folder.name}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-xl italic leading-snug text-interaction">
        {folder.question}
      </p>
      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
