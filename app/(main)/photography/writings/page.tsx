import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { Blocks } from "@/components/blocks";
import { SectionLabel } from "@/components/section-label";
import { photoWritings } from "@/lib/content/photo-writings";

export const metadata: Metadata = { title: "Featured Writings · Photography" };

/* Notes-style page: the essays themselves, stacked like journal entries. */
export default function PhotoWritingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>Photography · Featured Writings</SectionLabel>
      <div>
        <BackLink href="/photography" label="Back to Photography" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
        Writing about looking.
      </h1>

      <div className="mt-16 space-y-20">
        {photoWritings.map((essay) => (
          <article
            key={essay.slug}
            id={essay.slug}
            className="border-t border-structure/15 pt-12 first:border-t-0 first:pt-0"
          >
            <h2 className="font-serif text-2xl leading-snug text-information">
              {essay.title}
            </h2>
            <div className="mt-8">
              <Blocks blocks={essay.body} />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
