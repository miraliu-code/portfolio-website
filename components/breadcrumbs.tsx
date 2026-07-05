import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  label: string;
  href?: string;
}

/*
 * Wayfinding, not hierarchy (Standard 10): the trail reads like locating
 * oneself on the map — Atlas / Strategy / Market Entry / S-03 — and every
 * step back up is a link.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="You are here" className="font-sans text-xs uppercase tracking-[0.2em]">
      <ol className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {crumbs.map((crumb, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <li aria-hidden="true" className="text-structure/40">
                /
              </li>
            )}
            <li>
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-structure transition-colors hover:text-interaction"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-information/60">{crumb.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
