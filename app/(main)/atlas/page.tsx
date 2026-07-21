import type { Metadata } from "next";
import Link from "next/link";
import { AtlasMap } from "@/components/atlas-map";
import { BackLink } from "@/components/back-link";
import { SectionLabel } from "@/components/section-label";
import { domains } from "@/lib/content/domains";

export const metadata: Metadata = { title: "Atlas" };

export default function AtlasPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
      <SectionLabel>The Atlas</SectionLabel>
      <div>
        <BackLink href="/" label="Back to the homepage" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
        A map of investigations.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        Every project is a coordinate. Six domains ask different questions
        about the same subject: organizations, and the people inside them.
      </p>

      <div className="mx-auto mt-16 max-w-2xl">
        <AtlasMap />
      </div>

      <ul className="mx-auto mt-16 max-w-2xl">
        {domains.map((domain) => (
          <li key={domain.slug} className="border-t border-structure/15 last:border-b">
            <Link
              href={`/atlas/${domain.slug}`}
              className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors group-hover:text-interaction">
                {domain.name}
              </span>
              <span className="font-serif text-base italic text-information/70 transition-colors group-hover:text-interaction sm:text-right">
                {domain.question}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-10 max-w-2xl">
        <Link
          href="/observatory"
          className="font-sans text-xs uppercase tracking-[0.25em] text-interaction transition-colors hover:underline hover:underline-offset-4"
        >
          → what&apos;s in motion
        </Link>
      </p>
    </main>
  );
}
