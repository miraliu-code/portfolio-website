import Link from "next/link";

/*
 * The site-wide back link: small burgundy "← back" between a page's
 * section label and its main heading, always pointing one level up.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group mt-4 inline-flex items-baseline gap-2 font-sans text-xs uppercase tracking-[0.25em] text-interaction"
    >
      <span
        aria-hidden="true"
        className="inline-block font-serif text-base leading-none transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        ←
      </span>
      <span className="group-hover:underline group-hover:underline-offset-4">
        Back
      </span>
    </Link>
  );
}
