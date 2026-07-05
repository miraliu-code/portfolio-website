import Link from "next/link";

/*
 * Homepage (Standard 09): orientation only. Three sections —
 * Hero Statement, The Atlas, The Observatory. Nothing more.
 */

const domains = [
  {
    name: "Strategy",
    question: "What should organizations do?",
    href: "/atlas/strategy",
    position: { left: "50%", top: "8%" },
  },
  {
    name: "Communication",
    question: "How should organizations communicate?",
    href: "/atlas/communication",
    position: { left: "86.4%", top: "29%" },
  },
  {
    name: "Design",
    question: "How does design shape understanding?",
    href: "/atlas/design",
    position: { left: "86.4%", top: "71%" },
  },
  {
    name: "I/O Psychology",
    question: "Why do people behave this way?",
    href: "/atlas/io-psychology",
    position: { left: "50%", top: "92%" },
  },
  {
    name: "Reading",
    question: "What ideas have changed my thinking?",
    href: "/atlas/reading",
    position: { left: "13.6%", top: "71%" },
  },
  {
    name: "Notes",
    question: "What have I been noticing?",
    href: "/atlas/notes",
    position: { left: "13.6%", top: "29%" },
  },
];

const observatory = [
  {
    label: "Currently Reading",
    description: "Books in progress — notes, favorite passages, questions.",
    href: "/observatory/reading",
  },
  {
    label: "Currently Researching",
    description: "Open investigations that have not yet become projects.",
    href: "/observatory/researching",
  },
  {
    label: "Currently Photographing",
    description:
      "Ongoing photographic observation, before it becomes a collection.",
    href: "/observatory/photographing",
  },
  {
    label: "Currently Exploring",
    description: "Places, systems, and ideas under present attention.",
    href: "/observatory/exploring",
  },
  {
    label: "Questions I'm Living With",
    description: "Unresolved questions guiding what comes next.",
    href: "/observatory/questions",
  },
  {
    label: "Upcoming Essays",
    description: "Writing that is forming but not yet finished.",
    href: "/observatory/essays",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-xs uppercase tracking-[0.3em] text-structure">
      {children}
    </p>
  );
}

function HeroStatement() {
  return (
    <section className="flex min-h-[85vh] flex-col justify-center py-24">
      <SectionLabel>The Atlas · A publication by Mira Liu</SectionLabel>
      <h1 className="mt-10 max-w-3xl font-serif text-4xl leading-[1.2] text-information md:text-5xl md:leading-[1.2]">
        How do organizations earn trust, create meaning, and make better
        decisions?
      </h1>
      <p className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-information/80">
        The Atlas is a map of investigations — strategy, communication,
        psychology, design, reading, and observation, treated as complementary
        ways of understanding organizations. Every project is one coordinate.
      </p>
      <Link
        href="/#atlas"
        className="mt-12 inline-block font-sans text-xs uppercase tracking-[0.25em] text-interaction transition-colors hover:underline hover:underline-offset-4"
      >
        Begin exploring
      </Link>
    </section>
  );
}

function DomainMap() {
  return (
    <div
      className="relative mx-auto mt-16 hidden aspect-square max-w-xl md:block"
      aria-hidden="true"
    >
      {/* Organizations: the conceptual center. Not a link — every domain returns to it. */}
      <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-structure text-center">
        <span className="font-serif text-sm italic text-atmosphere">
          Organizations
        </span>
      </div>
      {domains.map((domain) => (
        <Link
          key={domain.name}
          href={domain.href}
          tabIndex={-1}
          style={domain.position}
          className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-structure/40 p-3 text-center font-sans text-xs uppercase tracking-[0.15em] text-information transition-colors hover:border-interaction hover:text-interaction"
        >
          {domain.name}
        </Link>
      ))}
    </div>
  );
}

function AtlasSection() {
  return (
    <section
      id="atlas"
      className="scroll-mt-16 border-t border-structure/20 py-24"
    >
      <SectionLabel>The Atlas</SectionLabel>
      <h2 className="mt-8 max-w-2xl font-serif text-3xl leading-snug text-information">
        Six domains of inquiry. One center.
      </h2>
      <p className="mt-6 max-w-xl font-serif text-base leading-relaxed text-information/80">
        The Atlas organizes work by the questions it seeks to answer, not the
        format it takes. Each domain asks a different question about the same
        subject.
      </p>

      <DomainMap />

      <ul className="mt-16 max-w-2xl">
        {domains.map((domain) => (
          <li key={domain.name} className="border-t border-structure/15">
            <Link
              href={domain.href}
              className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
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
    </section>
  );
}

function ObservatorySection() {
  return (
    <section
      id="observatory"
      className="scroll-mt-16 border-t border-structure/20 py-24"
    >
      <SectionLabel>The Observatory</SectionLabel>
      <h2 className="mt-8 max-w-2xl font-serif text-3xl leading-snug text-information">
        What is currently in motion.
      </h2>
      <p className="mt-6 max-w-xl font-serif text-base leading-relaxed text-information/80">
        The Atlas records completed investigations. The Observatory documents
        ongoing curiosity — intentionally unfinished, and always changing.
      </p>

      <ul className="mt-14 grid max-w-3xl gap-x-12 gap-y-10 sm:grid-cols-2">
        {observatory.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="group block">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors group-hover:text-interaction">
                {item.label}
              </span>
              <span className="mt-2 block font-serif text-sm leading-relaxed text-information/70">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 sm:px-10">
      <HeroStatement />
      <AtlasSection />
      <ObservatorySection />
    </main>
  );
}
