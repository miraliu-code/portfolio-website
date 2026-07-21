import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { BackLink } from "@/components/back-link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

/*
 * The About page deliberately breaks from the Atlas chrome: no Blue Ink
 * panel, no top navigation — a two-column spread that should feel like
 * opening the first chapter of a book. Same typography and palette.
 *
 * Photos: drop the five real images at public/about/about-1.jpg …
 * about-5.jpg (1 = main portrait). Until a file exists, the matching
 * placeholder renders instead — no code change needed.
 */

function aboutPhoto(n: number): string {
  const file = path.join(process.cwd(), "public", "about", `about-${n}.jpg`);
  return fs.existsSync(file)
    ? `/about/about-${n}.jpg`
    : `/placeholders/portrait-${n}.svg`;
}

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
  "Sydney",
];

const functionalSkills = [
  "Brand Strategy",
  "Marketing Analytics",
  "Competitive Intelligence",
  "Client Communications",
  "Consumer Insight & Research",
  "Campaign Strategy & Execution",
  "CRM & Audience Segmentation",
  "Content Strategy",
  "Stakeholder Management",
  "Business Case Development",
  "AI-Assisted Research & Drafting (Claude, ChatGPT, Perplexity)",
];

const behavioralSkills = [
  "Cross-Functional Collaboration",
  "Client Relationship Management",
  "Team Leadership",
  "Adaptability Under Pressure",
  "Intercultural Communication",
  "Cognitive Empathy",
  "Conflict Resolution",
  "Attention to Detail",
  "Initiative & Ownership",
];

const platformProficiency = [
  "Microsoft 365",
  "Adobe Creative Suite",
  "Canva",
  "CapCut",
  "Constant Contact",
  "IBISWorld",
  "MRI-Simmons",
  "Euromonitor",
  "Modash",
  "Instagram",
  "LinkedIn",
  "Statista",
  "WordPress",
  "Mailchimp",
  "ROI Solutions",
  "Engaging Networks",
  "Meltwater",
  "Tableau",
];

const interests = [
  "Social & abnormal psychology",
  "East Asian cultures & languages",
  "Memoirs & poetry",
  "Acrylic & graphite",
  "Rock & indie",
  "Sustainable architecture & technology",
  "Culinary arts & baking",
  "Jazz & classical",
  "Comparative politics & international development",
];

function WallLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/75">
      {children}
    </p>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="border border-structure/35 px-3 py-1.5 font-sans text-xs tracking-wide text-information/90"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function LeftColumn() {
  return (
    <div className="space-y-16">
      <section>
        <WallLabel>About</WallLabel>
        <div className="mt-8 space-y-5 font-serif text-base leading-[1.85] text-information/90">
          <p>
            I&apos;m Mira Liu, a junior at American University in Washington,
            DC, double majoring in Psychology and Business Administration with
            a concentration in Marketing. My work has centered on brand
            strategy, client communications, and consumer insight, supporting
            both Fortune 500 and nonprofit clients.
          </p>
          <p>
            Psychology gives me a grounded read on how people actually make
            decisions. Business gives me a framework for turning that read
            into a strategy that a client or an organization can act on.
            I&apos;ve used that combination on projects ranging from donor and
            audience analytics to brand positioning to campaign design, and
            it&apos;s consistently made me a stronger strategist than either
            discipline would on its own.
          </p>
          <p>
            I spent a semester at Chinese University of Hong Kong, Shenzhen,
            one of the most internationally connected universities in China,
            located in a city defined by fast-moving business and technology.
            The experience strengthened my Mandarin and gave me a much clearer
            sense of how markets, institutions, and consumer behavior shift
            across regions. It also confirmed that I want a career with an
            international footprint rather than one confined to a single
            market.
          </p>
          <p>
            Outside of coursework and client work, I spend time on
            photography, reading on social psychology and political analysis,
            and exploring DC&apos;s restaurant scene. My list of cities
            I&apos;d like to eventually work in, including New York, Hong
            Kong, and Amsterdam, reflects where I see the strongest
            opportunities in consulting, brand strategy, and global business.
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
        <div className="mt-5 space-y-8">
          <div>
            <p className="font-serif text-lg text-information">
              American University
            </p>
            <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-information/60">
              Washington, D.C.
            </p>
            <p className="mt-2 font-serif text-base leading-relaxed text-information/85">
              B.S. in Business Administration with a concentration in
              Marketing, and a B.A. in Psychology. Based in the nation&apos;s
              capital, where consulting and communications work runs
              alongside national policy.
            </p>
          </div>
          <div>
            <p className="font-serif text-lg text-information">
              Chinese University of Hong Kong, Shenzhen
            </p>
            <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-information/60">
              Shenzhen, China · Semester abroad
            </p>
            <p className="mt-2 font-serif text-base leading-relaxed text-information/85">
              One of China&apos;s most internationally connected campuses.
              Studied global business, finance, and marketing in the
              country&apos;s fastest-growing tech and finance hub.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div>
          <WallLabel>Functional Skills</WallLabel>
          <PillList items={functionalSkills} />
        </div>
        <div>
          <WallLabel>Behavioral Skills</WallLabel>
          <PillList items={behavioralSkills} />
        </div>
        <div>
          <WallLabel>Platform Proficiency</WallLabel>
          <PillList items={platformProficiency} />
        </div>
      </section>

      <section>
        <WallLabel>Languages</WallLabel>
        <p className="mt-4 font-serif text-base leading-relaxed text-information/90">
          Fluent in English · Intermediate Mandarin.
        </p>
      </section>

    </div>
  );
}

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  /* eslint-disable-next-line @next/next/no-img-element -- local images, layout-cropped */
  return <img src={src} alt={alt} className={className} />;
}

function RightColumn() {
  return (
    <div className="space-y-12">
      <Photo
        src={aboutPhoto(1)}
        alt="Portrait of Mira Liu"
        className="aspect-[3/4] w-full border border-structure/10 object-cover"
      />

      <figure className="border-y border-structure/25 py-8 text-center">
        <blockquote className="font-serif text-xl italic leading-snug text-information">
          &ldquo;Give me a blank page and a deadline, and I&apos;ll figure out
          the rest.&rdquo;
        </blockquote>
      </figure>

      <div className="grid grid-cols-2 gap-5">
        <Photo
          src={aboutPhoto(2)}
          alt="Mira under the willows"
          className="aspect-square w-full border border-structure/10 object-cover"
        />
        <Photo
          src={aboutPhoto(3)}
          alt="Mira with the CAPAL cohort"
          className="aspect-square w-full border border-structure/10 object-cover object-[55%_50%]"
        />
        <Photo
          src={aboutPhoto(4)}
          alt="Mira at a WAMU / NPR 1A event"
          className="aspect-square w-full border border-structure/10 object-cover"
        />
        <Photo
          src={aboutPhoto(5)}
          alt="Mira at the Library of Congress"
          className="aspect-square w-full border border-structure/10 object-cover"
        />
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
          <dd className="mt-2 font-serif text-base italic text-information/90">
            What binds a group of people to a shared belief?
          </dd>
        </div>
      </dl>

      <div>
        <WallLabel>Interests</WallLabel>
        <PillList items={interests} />
      </div>

      <div>
        <WallLabel>Cities on the list</WallLabel>
        <p className="mt-4 font-serif text-lg italic leading-[1.9] text-interaction">
          {cities.join(" · ")}
        </p>
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
        <div>
          <BackLink href="/" label="Back to the homepage" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        {/* Hero quote — the page's opening line, set in the voice type. */}
        <h1 className="max-w-3xl font-serif text-3xl italic leading-snug text-information md:text-4xl md:leading-snug">
          Behind every strong business decision is an accurate read on
          people. That&apos;s the read I&apos;m trained to make.
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">
          <LeftColumn />
          <RightColumn />
        </div>
      </main>
    </div>
  );
}
