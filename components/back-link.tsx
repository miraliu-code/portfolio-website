import Link from "next/link";

/*
 * The site-wide back arrow: a small burgundy ← that sits between a page's
 * section label and its main heading, always pointing one level up.
 */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="mt-4 inline-block font-serif text-xl leading-none text-interaction transition-transform duration-200 hover:-translate-x-1 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
    >
      ←
    </Link>
  );
}
