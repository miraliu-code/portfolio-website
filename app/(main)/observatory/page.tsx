import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { ObservatoryMap } from "@/components/observatory-map";
import { SectionLabel } from "@/components/section-label";

export const metadata: Metadata = { title: "Observatory" };

/* The Observatory: ongoing curiosity, no folders — large circles. */
export default function ObservatoryPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
      <SectionLabel>The Observatory</SectionLabel>
      <div>
        <BackLink href="/" label="Back to the homepage" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
        Work in motion.
      </h1>
      <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        The Atlas records completed investigations. The Observatory documents
        what is currently underway: intentionally unfinished, and always
        changing.
      </p>
      <div className="mt-16">
        <ObservatoryMap />
      </div>
    </main>
  );
}
