import { resumes } from "@/lib/site";

/*
 * The Resume Library: four tailored resumes presented like a spread of
 * document files — a page-thumbnail card with faux text lines, title,
 * and a one-line description. Each opens its PDF.
 */
export function ResumeLibrary({
  compact = false,
}: {
  /** compact: single-column, tighter — for the Blue Ink panel. */
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "space-y-4" : "grid gap-8 sm:grid-cols-2"}>
      {resumes.map((resume) => (
        <li key={resume.slug}>
          <a
            href={resume.pdf}
            className={`group block border transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
              compact
                ? "border-atmosphere/20 bg-atmosphere/5 p-4 hover:border-atmosphere/50 hover:shadow-black/20"
                : "border-structure/20 bg-atmosphere p-6 hover:border-interaction/50 hover:shadow-structure/10"
            }`}
          >
            {/* Document thumbnail: a small page with faux text lines. */}
            <span
              aria-hidden="true"
              className={`block w-12 border p-1.5 ${
                compact
                  ? "border-atmosphere/30 bg-atmosphere/90"
                  : "border-structure/25 bg-atmosphere"
              }`}
              style={{ aspectRatio: "8.5 / 11" }}
            >
              <span className="block h-1 w-3/4 bg-structure/60" />
              <span className="mt-1.5 block h-px w-full bg-structure/30" />
              <span className="mt-1 block h-px w-full bg-structure/30" />
              <span className="mt-1 block h-px w-5/6 bg-structure/30" />
              <span className="mt-1.5 block h-px w-full bg-structure/30" />
              <span className="mt-1 block h-px w-2/3 bg-structure/30" />
            </span>
            <span
              className={`mt-3 block font-serif leading-snug ${
                compact
                  ? "text-sm text-atmosphere group-hover:underline group-hover:underline-offset-4"
                  : "text-lg text-information transition-colors group-hover:text-interaction"
              }`}
            >
              {resume.title}
            </span>
            <span
              className={`mt-1.5 block font-sans text-xs leading-relaxed tracking-wide ${
                compact ? "text-atmosphere/60" : "text-information/60"
              }`}
            >
              {resume.description}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
