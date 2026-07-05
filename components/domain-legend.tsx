"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { domains } from "@/lib/content/domains";

/*
 * The "six domains" table with each domain's letter stamp on the right —
 * the same boxed letterform used on domain pages. Stamps fade in with a
 * top-first stagger as the section scrolls into view, and warm to
 * burgundy with the rest of the row on hover.
 */
export function DomainLegend() {
  const ref = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className="mt-12 max-w-3xl">
      {domains.map((domain, i) => (
        <li key={domain.slug} className="border-t border-structure/15 last:border-b">
          <Link
            href={`/atlas/${domain.slug}`}
            className="group flex items-center gap-6 py-4"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <span className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors group-hover:text-interaction">
                {domain.name}
              </span>
              <span className="font-serif text-base italic text-information/70 transition-colors group-hover:text-interaction sm:text-right">
                {domain.question}
              </span>
            </span>
            <span
              aria-hidden="true"
              style={{ transitionDelay: visible ? `${i * 120}ms` : undefined }}
              className={`hidden shrink-0 select-none transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none sm:block ${
                visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center border border-structure/25 font-serif text-2xl italic text-structure/40 transition-colors group-hover:border-interaction/40 group-hover:text-interaction">
                {domain.letterform}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
