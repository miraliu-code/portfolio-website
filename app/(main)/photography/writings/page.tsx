import type { Metadata } from "next";
import { BackLink } from "@/components/back-link";
import { SectionLabel } from "@/components/section-label";
import { PhotoWritingCard } from "@/components/photo-writing-card";
import { photoWritings } from "@/lib/content/photo-writings";

export const metadata: Metadata = { title: "Featured Writings · Photography" };

/*
 * Featured Writings: essays as expandable cards — title, subtitle, and
 * the closing pull quote visible at rest; the body drops in between on
 * click (see PhotoWritingCard).
 */
export default function PhotoWritingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>Photography · Featured Writings</SectionLabel>
      <div>
        <BackLink href="/photography" label="Back to Photography" />
      </div>
      <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-information">
        A Grammar for Every Room.
      </h1>
      <p className="mt-6 max-w-2xl font-serif text-lg italic leading-relaxed text-information/75">
        On reading an unfamiliar room fast, working in rooms that only happen
        once, and what happens when it won&apos;t hold still for you.
      </p>

      <div className="mt-16 space-y-10">
        {photoWritings.map((essay) => (
          <PhotoWritingCard key={essay.slug} essay={essay} />
        ))}
      </div>
    </main>
  );
}
