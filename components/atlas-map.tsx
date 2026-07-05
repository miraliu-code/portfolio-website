"use client";

import Link from "next/link";
import { useState } from "react";
import { domains } from "@/lib/content/domains";

/*
 * The Atlas as a conceptual map. Slot-based layout: one large center slot
 * and six organically placed satellite slots of varied sizes. At rest,
 * Organizations holds the center (large, burgundy). Hovering a domain
 * swaps it smoothly into the center slot — trading places with whatever
 * was centered — and mouse-off restores the resting arrangement.
 *
 * The hairlines and dots connect SLOTS, not nodes, so they never move;
 * only the occupants glide between slots. Reduced motion = instant swap.
 */

interface Slot {
  x: number; // % of container
  y: number;
  d: number; // diameter, % of container width
}

const CENTER: Slot = { x: 50, y: 48, d: 33 };
const SATELLITES: Slot[] = [
  { x: 26, y: 17, d: 21 },
  { x: 71, y: 14, d: 17 },
  { x: 87, y: 45, d: 23 },
  { x: 70, y: 79, d: 18 },
  { x: 35, y: 85, d: 20 },
  { x: 11, y: 52, d: 16 },
];

/* Decorative satellite dots, some tethered to a slot by a short line. */
const DOTS: { x: number; y: number; r: number; from?: Slot }[] = [
  { x: 58, y: 6, r: 0.9, from: SATELLITES[1] },
  { x: 95, y: 26, r: 1.1, from: SATELLITES[2] },
  { x: 84, y: 91, r: 0.8, from: SATELLITES[3] },
  { x: 4, y: 37, r: 0.9, from: SATELLITES[5] },
  { x: 21, y: 95, r: 0.7, from: SATELLITES[4] },
  { x: 8, y: 8, r: 0.6, from: SATELLITES[0] },
  { x: 66, y: 96, r: 0.6 },
  { x: 97, y: 62, r: 0.6 },
  { x: 44, y: 3, r: 0.5 },
];

const transition =
  "transition-[left,top,width,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] motion-reduce:transition-none";

function circleStyle(slot: Slot): React.CSSProperties {
  return { left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.d}%` };
}

export function AtlasMap({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredIndex = domains.findIndex((d) => d.slug === hovered);

  /* Organizations sits in the center unless a domain has taken it. */
  const organizationsSlot =
    hoveredIndex === -1 ? CENTER : SATELLITES[hoveredIndex];

  return (
    <div
      className={`relative aspect-square w-full select-none ${className}`}
      onMouseLeave={() => setHovered(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null);
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <g stroke="var(--structure)" strokeOpacity="0.25" strokeWidth="0.25">
          {SATELLITES.map((s, i) => (
            <line key={i} x1={CENTER.x} y1={CENTER.y} x2={s.x} y2={s.y} />
          ))}
          {DOTS.filter((dot) => dot.from).map((dot, i) => (
            <line
              key={`t${i}`}
              x1={dot.from!.x}
              y1={dot.from!.y}
              x2={dot.x}
              y2={dot.y}
            />
          ))}
        </g>
        <g fill="var(--structure)" fillOpacity="0.3">
          {DOTS.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} />
          ))}
        </g>
      </svg>

      {/* Organizations — the conceptual center, never a link. */}
      <div
        style={circleStyle(organizationsSlot)}
        className={`absolute z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-3 text-center ${transition} ${
          hoveredIndex === -1
            ? "bg-interaction"
            : "bg-structure/10"
        }`}
      >
        <span
          className={`${transition} ${
            hoveredIndex === -1
              ? "font-serif text-sm italic text-atmosphere md:text-lg"
              : "font-sans text-[0.55rem] uppercase tracking-[0.15em] text-information md:text-[0.65rem]"
          }`}
        >
          Organizations
        </span>
      </div>

      {domains.map((domain, i) => {
        const isCentered = hovered === domain.slug;
        const slot = isCentered ? CENTER : SATELLITES[i];
        return (
          <Link
            key={domain.slug}
            href={`/atlas/${domain.slug}`}
            style={circleStyle(slot)}
            onMouseEnter={() => setHovered(domain.slug)}
            onFocus={() => setHovered(domain.slug)}
            className={`absolute flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-3 text-center ${transition} ${
              isCentered
                ? "z-20 bg-interaction shadow-xl shadow-structure/20"
                : "z-10 bg-structure/10 hover:bg-structure/15"
            }`}
          >
            <span
              className={`${transition} ${
                isCentered
                  ? "font-serif text-sm italic text-atmosphere md:text-lg"
                  : "font-sans text-[0.55rem] uppercase tracking-[0.15em] text-information md:text-[0.65rem]"
              }`}
            >
              {domain.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
