import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectView } from "@/components/project-view";
import { getProject, projects } from "@/lib/content/projects";

export function generateStaticParams() {
  return projects
    .filter((p) => p.type === "standard")
    .map((p) => ({
      domain: p.domain,
      folder: p.type === "standard" ? p.folder : "",
      slug: p.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? project.title : "Atlas" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ domain: string; folder: string; slug: string }>;
}) {
  const { domain, folder, slug } = await params;
  const project = getProject(slug);
  if (
    !project ||
    project.type !== "standard" ||
    project.domain !== domain ||
    project.folder !== folder
  ) {
    notFound();
  }
  return <ProjectView project={project} />;
}
