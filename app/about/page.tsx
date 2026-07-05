import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

/*
 * The About page deliberately breaks from the Atlas chrome: no Blue Ink
 * panel, no top navigation — a two-column spread that should feel like
 * opening the first chapter of a book. Same typography and palette.
 * Prose marked (draft) is placeholder for Mira's own voice.
 */

const cities = [
  "New York",
  "Hong Kong",
  "Amsterdam",
  "Brussels",
  "Geneva",
  "Singapore",
  "Chicago",
  "Tokyo",
  "Shanghai",
  "Vienna",
  "Seoul",
  "Berlin",
  "Copenhagen",
];

const skills = [
  "Strategy research",
  "Market analysis",
  "Communication planning",
  "Crisis simulation",
  "Editorial writing",
  "Photography",
  "Data organization",
  "Design systems",
];

const interests = [
  "Social & abnormal psychology",
  "Comparative politics & international development",
  "East Asian cultures & languages",
  "Memoirs & poetry",
  "Acrylic & graphite, sustainable architecture & technology",
  "Culinary arts & baking",
  "Rock & indie",
  "Jazz & classical",
];

function WallLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-information/50">
      {children}
    </p>
  );
}

function LeftColumn() {
  return (
    <div className="space-y-16">
      <section>
        <h1 className="font-serif text-5xl leading-tight text-information">
          About
        </h1>
        <div className="mt-8 space-y-5 font-serif text-base leading-[1.85] text-information/90">
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
        </div>
      </section>

      <section className="border-y border-structure/20 py-10">
        <h2 className="font-serif text-2xl leading-snug text-information">
          Let&apos;s build something interesting.
        </h2>
        <p className="mt-4 max-w-md font-serif text-base leading-[1.85] text-information/85">
          Whether you&apos;re interested in consulting, communications,
          research, strategy, photography, or simply exchanging ideas,
          I&apos;d love to hear from you.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-sans text-xs uppercase tracking-[0.25em]">
          <a
            href={`mailto:${site.email}`}
            className="text-interaction hover:underline hover:underline-offset-4"
          >
            Email
          </a>
          <span className="text-structure/40">·</span>
          <a
            href={site.linkedin}
            className="text-interaction hover:underline hover:underline-offset-4"
          >
            LinkedIn
          </a>
          <span className="text-structure/40">·</span>
          <Link
            href="/resumes"
            className="text-interaction hover:underline hover:underline-offset-4"
          >
            Resume Library
          </Link>
        </p>
      </section>

      <section>
        <WallLabel>Education</WallLabel>
        <p className="mt-4 font-serif text-base leading-[1.85] text-information/90">
          American University — B.S., Business Administration and Psychology.
          Coursework spanning strategy, organizational behavior, consumer
          psychology, and communication. (Draft placeholder.)
        </p>
      </section>

      <section>
        <WallLabel>Skills &amp; Competencies</WallLabel>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <li
              key={skill}
              className="border border-structure/25 px-3 py-1.5 font-sans text-xs tracking-wide text-information/80"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <WallLabel>Languages</WallLabel>
        <p className="mt-4 font-serif text-base leading-relaxed text-information/90">
          English (native) · Mandarin Chinese (intermediate). (Draft
          placeholder.)
        </p>
      </section>

      <section>
        <WallLabel>Cities on the list</WallLabel>
        <p className="mt-4 max-w-md font-serif text-lg italic leading-[1.9] text-interaction">
          {cities.join(" · ")}
        </p>
      </section>
    </div>
  );
}

function Portrait({ src, alt }: { src: string; alt: string }) {
  /* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */
  return <img src={src} alt={alt} className="w-full border border-structure/10" />;
}

function RightColumn() {
  return (
    <div className="space-y-12">
      <Portrait
        src="/placeholders/portrait-1.svg"
        alt="Portrait of Mira Liu (placeholder)"
      />

      <figure className="border-y border-structure/25 py-8 text-center">
        <blockquote className="font-serif text-xl italic leading-snug text-information">
          Organizations tell stories. I&apos;m interested in understanding
          them.
        </blockquote>
      </figure>

      <div className="grid grid-cols-2 gap-5">
        <Portrait src="/placeholders/portrait-2.svg" alt="Mira photographing (placeholder)" />
        <Portrait src="/placeholders/portrait-3.svg" alt="Mira at work (placeholder)" />
        <Portrait src="/placeholders/portrait-4.svg" alt="Mira traveling (placeholder)" />
        <Portrait src="/placeholders/portrait-5.svg" alt="Mira presenting (placeholder)" />
      </div>

      <dl className="space-y-6">
        <div>
          <dt>
            <WallLabel>Currently based</WallLabel>
          </dt>
          <dd className="mt-2 font-serif text-base text-information/90">
            Washington, D.C. metro area
          </dd>
        </div>
        <div>
          <dt>
            <WallLabel>Currently working on</WallLabel>
          </dt>
          <dd className="mt-2 font-serif text-base text-information/90">
            <Link
              href="/observatory"
              className="text-interaction hover:underline hover:underline-offset-4"
            >
              See the Observatory →
            </Link>
          </dd>
        </div>
        <div>
          <dt>
            <WallLabel>Favorite question</WallLabel>
          </dt>
          <dd className="mt-2 font-serif text-base italic text-information/60">
            [To be filled in]
          </dd>
        </div>
      </dl>

      <div>
        <WallLabel>Interests</WallLabel>
        <ul className="mt-4 space-y-2">
          {interests.map((interest) => (
            <li
              key={interest}
              className="font-serif text-sm leading-relaxed text-information/80"
            >
              {interest}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Minimal header: just the way back to the publication. */}
      <header className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        <Link
          href="/"
          className="font-serif text-lg text-information transition-colors hover:text-interaction"
        >
          {site.wordmark}
        </Link>
      </header>

      <main className="mx-auto grid max-w-6xl gap-16 px-6 py-16 sm:px-10 lg:grid-cols-[3fr_2fr] lg:gap-24">
        <LeftColumn />
        <RightColumn />
      </main>
    </div>
  );
}
