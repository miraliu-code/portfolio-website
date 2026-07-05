import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { SectionLabel } from "@/components/section-label";
import {
  OrganizationList,
  type OrgEntry,
} from "@/components/organization-list";
import { getOrganizations, projectHref } from "@/lib/content/projects";

export const metadata: Metadata = { title: "Organizations" };

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* The conceptual center of the Atlas, as an index of its subjects. */
export default function OrganizationsPage() {
  const organizations: OrgEntry[] = getOrganizations().map((org) => ({
    name: org.name,
    slug: slugify(org.name),
    projects: org.projects.map((p) => ({
      title: p.title,
      question: p.question,
      href: projectHref(p),
      coordinate: p.coordinate,
    })),
  }));

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>Atlas · Organizations</SectionLabel>
      <div>
        <BackLink href="/atlas" label="Back to the Atlas" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
        The subjects of the map.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        Every organization studied anywhere in the Atlas, alphabetically.
        Select one to see each investigation that mentions it.
      </p>
      <div className="mt-14">
        <OrganizationList organizations={organizations} />
      </div>
    </main>
  );
}
