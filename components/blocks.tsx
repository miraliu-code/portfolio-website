import type { Block } from "@/lib/content/types";

/* Renders structured long-form content per the typography standard. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-2xl space-y-7">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "p":
            return (
              <p
                key={i}
                className="font-serif text-base leading-[1.85] text-information/90"
              >
                {block.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-4 font-serif text-xl text-information">
                {block.text}
              </h3>
            );
          case "quote":
            /* Pull quote: generous space, no decorative marks (Standard 06). */
            return (
              <blockquote
                key={i}
                className="my-14 pr-8 font-serif text-2xl italic leading-snug text-information"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="space-y-3 pl-5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="list-disc font-serif text-base leading-relaxed text-information/90 marker:text-structure/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "image":
            return (
              <figure key={i} className="my-12">
                {/* eslint-disable-next-line @next/next/no-img-element -- local placeholder SVGs need no optimization */}
                <img
                  src={block.src}
                  alt={block.caption}
                  className="w-full border border-structure/10"
                />
                <figcaption className="mt-3 font-sans text-xs tracking-wide text-information/60">
                  {block.caption}
                </figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
