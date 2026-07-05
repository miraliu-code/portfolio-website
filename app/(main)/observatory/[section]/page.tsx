import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/back-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  observatorySections,
  getObservatorySection,
} from "@/lib/content/observatory";

export function generateStaticParams() {
  return observatorySections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const meta = getObservatorySection(section);
  return { title: meta ? `${meta.name} · Observatory` : "Observatory" };
}

/*
 * A living page: entries expand in place (no third route level —
 * never more than a few decisions from any piece of work).
 */
export default async function ObservatorySectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: slug } = await params;
  const section = getObservatorySection(slug);
  if (!section) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <Breadcrumbs
        crumbs={[
          { label: "Observatory", href: "/observatory" },
          { label: section.name },
        ]}
      />
      <div>
        <BackLink href="/observatory" label="Back to the Observatory" />
      </div>
      <h1 className="mt-6 font-serif text-4xl leading-tight text-information">
        {section.name}
      </h1>
      <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-information/70">
        {section.description}
      </p>

      <ul className="mt-16">
        {section.entries.map((entry) => (
          <li key={entry.title} className="border-t border-structure/15 last:border-b">
            <details className="group py-6">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="font-serif text-xl text-information transition-colors group-hover:text-interaction">
                    {entry.title}
                  </span>
                  {entry.meta && (
                    <span className="mt-1 block font-sans text-xs uppercase tracking-[0.2em] text-information/50">
                      {entry.meta}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-interaction"
                >
                  <span className="group-open:hidden">Open</span>
                  <span className="hidden group-open:inline">Close</span>
                </span>
              </summary>
              <div className="mt-6 max-w-2xl space-y-6">
                <p className="font-serif text-base leading-[1.85] text-information/90">
                  {entry.notes}
                </p>
                {entry.quote && (
                  <blockquote className="border-l border-structure/30 pl-6 font-serif text-lg italic leading-snug text-information">
                    {entry.quote}
                  </blockquote>
                )}
                <div>
                  <p className="font-sans text-[0.65rem] uppercase tracking-[0.25em] text-information/50">
                    Current thoughts
                  </p>
                  <p className="mt-2 font-serif text-base leading-relaxed text-information/80">
                    {entry.thoughts}
                  </p>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
