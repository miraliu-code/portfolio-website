import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/section-label";
import { photoCategories, getGalleries } from "@/lib/content/photography";

export const metadata: Metadata = { title: "Photography" };

export default function PhotographyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <SectionLabel>Photography</SectionLabel>
      <h1 className="mt-8 max-w-2xl font-serif text-4xl leading-tight text-information">
        Observation as evidence.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        Photography here is not decoration. Each collection is a way of paying
        attention — to institutions, cities, and the people moving through them.
      </p>
      <ul className="mt-16 max-w-2xl">
        {photoCategories.map((category) => (
          <li key={category.slug} className="border-t border-structure/15 last:border-b">
            <Link
              href={`/photography/${category.slug}`}
              className="group block py-6"
            >
              <span className="flex items-baseline justify-between gap-6">
                <span className="font-serif text-xl text-information transition-colors group-hover:text-interaction">
                  {category.name}
                </span>
                <span className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
                  {getGalleries(category.slug).length} collections
                </span>
              </span>
              <span className="mt-2 block font-serif text-sm italic text-information/60">
                {category.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
