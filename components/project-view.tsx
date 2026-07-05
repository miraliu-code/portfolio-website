import type { Artifact, Project } from "@/lib/content/types";
import { getDomain, getFolder } from "@/lib/content/domains";
import { Blocks } from "./blocks";
import { ContinueExploring } from "./continue-exploring";
import { ProjectHeader } from "./project-header";
import { Tabs, type TabDef } from "./tabs";
import type { Crumb } from "./breadcrumbs";

function ArtifactList({ artifacts }: { artifacts: Artifact[] }) {
  return (
    <ul className="max-w-2xl space-y-8">
      {artifacts.map((artifact) => (
        <li key={artifact.label} className="border-l border-structure/30 pl-6">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-information/50">
            {artifact.kind}
          </p>
          <p className="mt-1 font-serif text-lg text-information">
            {artifact.label}
          </p>
          <p className="mt-1 font-serif text-sm leading-relaxed text-information/70">
            {artifact.description}
          </p>
          {artifact.href && (
            <a
              href={artifact.href}
              className="mt-2 inline-block font-sans text-xs uppercase tracking-[0.2em] text-interaction hover:underline hover:underline-offset-4"
            >
              View →
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

/*
 * Full project page body, shared by every route that renders a project.
 * Standard + reading entries are tabbed (Artifact always last); notes are
 * immediately the essay. Continue Exploring closes every page.
 */
export function ProjectView({ project }: { project: Project }) {
  const domain = getDomain(project.domain);
  const crumbs: Crumb[] = [{ label: "Atlas", href: "/atlas" }];
  if (domain) crumbs.push({ label: domain.name, href: `/atlas/${domain.slug}` });
  if (project.type === "standard") {
    const folder = getFolder(project.domain, project.folder);
    if (folder)
      crumbs.push({
        label: folder.name,
        href: `/atlas/${project.domain}/${folder.slug}`,
      });
  }
  crumbs.push({ label: project.coordinate });

  let body: React.ReactNode;
  if (project.type === "note") {
    body = <Blocks blocks={project.body} />;
  } else {
    const tabs: TabDef[] = project.tabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      content: <Blocks blocks={tab.blocks} />,
    }));
    if (project.artifacts.length > 0) {
      tabs.push({
        id: "artifact",
        label: "Artifact",
        content: <ArtifactList artifacts={project.artifacts} />,
      });
    }
    body = <Tabs tabs={tabs} />;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <ProjectHeader project={project} crumbs={crumbs} />
      <div className="mt-16">{body}</div>
      <ContinueExploring links={project.continueExploring} />
    </main>
  );
}
