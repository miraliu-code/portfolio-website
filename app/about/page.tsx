import type { Metadata } from "next";
import { SectionLabel } from "@/components/section-label";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

/*
 * Narrative biography, not a résumé list. All prose is DRAFT PLACEHOLDER
 * text for Mira to replace in her own voice.
 */

function AboutSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-structure/15 pt-10">
      <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-structure">
        {label}
      </h2>
      <div className="mt-5 max-w-2xl space-y-5 font-serif text-base leading-[1.85] text-information/90">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-10">
      <SectionLabel>About</SectionLabel>
      <h1 className="mt-8 max-w-2xl font-serif text-4xl leading-tight text-information">
        The person behind the map.
      </h1>
      <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-information/50">
        Draft — placeholder text throughout
      </p>

      <div className="mt-14 space-y-10">
        <AboutSection label="Bio">
          <p>
            I&apos;m Mira Liu, a student of business and psychology at American
            University in Washington, D.C. The Atlas is my attempt to practice
            a particular kind of attention: to how organizations earn trust,
            create meaning, and make decisions — and to the people, systems,
            and cities that shape them. (Draft placeholder.)
          </p>
          <p>
            I came to this work through an unplanned combination of marketing
            projects, psychology coursework, a camera, and a habit of taking
            notes on things most people walk past. The Atlas is where those
            habits stopped being separate.
          </p>
        </AboutSection>

        <AboutSection label="Education">
          <p>
            American University — B.S., Business Administration and Psychology.
            Coursework spanning strategy, organizational behavior, consumer
            psychology, and communication. (Draft placeholder.)
          </p>
        </AboutSection>

        <AboutSection label="Skills">
          <p>
            Strategy research and market analysis, communication planning and
            crisis simulation, editorial writing, photography, data organization,
            and design systems — the last of which this website is the evidence
            for. (Draft placeholder.)
          </p>
        </AboutSection>

        <AboutSection label="Languages">
          <p>English (native) · Mandarin Chinese (intermediate). (Draft placeholder.)</p>
        </AboutSection>

        <AboutSection label="Interests">
          <p>
            Transit systems, museum wayfinding, membership economics, why some
            institutions speak clearly, and warehouse-club hot dogs as a
            strategic artifact. (Draft placeholder.)
          </p>
        </AboutSection>

        <AboutSection label="Where I Want to Work">
          <p>
            At the intersections this site is built from: strategy consulting,
            corporate communications, brand and research roles — anywhere the
            job is understanding organizations before advising them. (Draft
            placeholder.)
          </p>
        </AboutSection>

        <AboutSection label="Selected Experience">
          <p>
            Donor engagement, marketing strategy, operations streamlining, data
            management, advocacy, and creative direction across campus and
            nonprofit roles. The full record lives in the CV. (Draft
            placeholder.)
          </p>
          <p>
            <a
              href={site.cv}
              className="font-sans text-xs uppercase tracking-[0.25em] text-interaction hover:underline hover:underline-offset-4"
            >
              Download CV →
            </a>
          </p>
        </AboutSection>
      </div>
    </main>
  );
}
