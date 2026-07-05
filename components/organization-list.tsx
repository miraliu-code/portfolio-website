"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/*
 * Alphabetical organization accordion: clicking a name reveals every
 * project that mentions it. A URL hash (#google) opens that entry.
 */

export interface OrgEntry {
  name: string;
  slug: string;
  projects: { title: string; question: string; href: string; coordinate: string }[];
}

export function OrganizationList({ organizations }: { organizations: OrgEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (organizations.some((o) => o.slug === fromHash)) setOpen(fromHash);
  }, [organizations]);

  return (
    <ul className="max-w-2xl">
      {organizations.map((org) => {
        const isOpen = open === org.slug;
        return (
          <li key={org.slug} id={org.slug} className="border-t border-structure/15 last:border-b">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : org.slug)}
              className="group flex w-full items-baseline justify-between gap-6 py-4 text-left"
            >
              <span className="font-serif text-lg text-information transition-colors group-hover:text-interaction">
                {org.name}
              </span>
              <span className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.2em] text-information/60">
                {org.projects.length} project{org.projects.length === 1 ? "" : "s"}
                <span aria-hidden="true" className="ml-3 text-interaction">
                  {isOpen ? "–" : "+"}
                </span>
              </span>
            </button>
            {isOpen && (
              <ul className="space-y-4 pb-6 pl-4">
                {org.projects.map((project) => (
                  <li key={project.href}>
                    <Link href={project.href} className="group block">
                      <span className="font-serif text-base text-information transition-colors group-hover:text-interaction">
                        {project.title}
                        <span className="ml-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/60">
                          {project.coordinate}
                        </span>
                      </span>
                      <span className="mt-0.5 block font-serif text-sm italic text-information/60">
                        {project.question}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
