"use client";

import { useState } from "react";
import type { PhotoWriting } from "@/lib/content/photo-writings";

/*
 * Featured Writings card. Collapsed: title, subtitle, and the essay's
 * closing pull quote. Clicking expands the card from the middle — the
 * body drops in between the subtitle and the quote, pushing the quote
 * to the bottom. The height animation uses the grid-template-rows
 * 0fr → 1fr technique (no measuring); reduced motion snaps instead.
 */
export function PhotoWritingCard({ essay }: { essay: PhotoWriting }) {
  const [open, setOpen] = useState(false);

  return (
    <article
      id={essay.slug}
      onClick={() => setOpen((o) => !o)}
      className="cursor-pointer border border-structure/20 transition-colors hover:border-structure/40"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`${essay.slug}-body`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex w-full cursor-pointer items-start justify-between gap-6 px-7 pt-7 text-left focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-interaction md:px-9 md:pt-9"
      >
        <span className="block">
          <span className="block font-serif text-2xl leading-snug text-information">
            {essay.title}
          </span>
          <span className="mt-2 block font-sans text-xs uppercase tracking-[0.2em] text-information/60">
            {essay.subtitle}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="mt-1.5 shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-interaction"
        >
          {open ? "Close −" : "Read +"}
        </span>
      </button>

      {/* The middle: body text, animated open/closed. */}
      <div
        id={`${essay.slug}-body`}
        onClick={(e) => e.stopPropagation()}
        className="grid cursor-auto transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="space-y-5 px-7 pt-7 font-serif text-base leading-[1.85] text-information/90 md:px-9">
            {essay.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* The hero quote stays visible in both states, pinned below. */}
      <figure className="px-7 pb-7 pt-6 md:px-9 md:pb-9">
        <blockquote className="border-t border-structure/25 pt-6 font-serif text-lg italic leading-snug text-information">
          &ldquo;{essay.heroQuote}&rdquo;
        </blockquote>
      </figure>
    </article>
  );
}
