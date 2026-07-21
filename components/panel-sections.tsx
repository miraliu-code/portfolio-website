import Link from "next/link";
import { site } from "@/lib/site";

/*
 * The Blue Ink panel's content sections, shared by the desktop aside
 * and the mobile drawer so the two can never drift apart.
 */

export function Rule() {
  return <hr className="border-atmosphere/15" />;
}

export function Identity() {
  return (
    <div>
      <Link
        href="/"
        className="font-serif text-xl text-atmosphere hover:underline hover:underline-offset-4"
      >
        {site.name}
      </Link>
      <p className="mt-2 font-sans text-xs leading-relaxed tracking-wide text-atmosphere/70">
        {site.affiliation}
      </p>
      <div className="mt-4 space-y-3">
        {site.bio.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="font-serif text-sm italic leading-relaxed text-atmosphere/80"
          >
            {paragraph}
          </p>
        ))}
      </div>
      <Link
        href="/about"
        className="mt-3 inline-block font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/80 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
      >
        About →
      </Link>
    </div>
  );
}

export function Contact() {
  return (
    <div>
      <p className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/70">
        Contact
      </p>
      <div className="mt-3 font-sans text-xs tracking-wide">
        <a
          href={`mailto:${site.email}`}
          className="block text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
        >
          {site.email}
        </a>
        <a
          href={site.linkedin}
          className="mt-2 block text-atmosphere/70 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
        >
          linkedin.com/in/4mira-liu/
        </a>
      </div>
    </div>
  );
}

/* A pointer to the library — the cards themselves live at /resumes. */
export function ResumeSection() {
  return (
    <div>
      <Link
        href="/resumes"
        className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/80 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
      >
        The Resume Library →
      </Link>
      <p className="mt-3 font-sans text-xs leading-relaxed tracking-wide text-atmosphere/70">
        Four tailored resumes: strategy, communications, marketing, and
        social impact. Pick the one that fits the conversation.
      </p>
    </div>
  );
}

/* Mobile only: the drawer is the sole navigation below the desktop top nav. */
export function DrawerNav() {
  return (
    <nav aria-label="Primary">
      <ul className="space-y-3">
        {site.nav.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="font-sans text-xs uppercase tracking-[0.25em] text-atmosphere/80 transition-colors hover:text-atmosphere hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
