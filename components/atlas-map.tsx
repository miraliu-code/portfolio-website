"use client";

import Link from "next/link";
import { useState } from "react";
import { domains } from "@/lib/content/domains";

/*
 * The Atlas as a conceptual map. Organizations holds the center — large,
 * burgundy, immovable. Domain nodes sit at organically varied satellite
 * slots. Hovering a domain grows it and turns it burgundy IN PLACE while
 * its connecting line to the center warms to burgundy; mouse-off eases
 * everything back. Clicking navigates to the domain.
 * Reduced motion: same states, instant (no transitions).
 */

interface Slot {
  x: number; // % of container
  y: number;
  d: number; // diameter, % of container width
}

const CENTER: Slot = { x: 50, y: 48, d: 33 };
/* Slot 1 (Communication) is sized so the label stays inside the circle
   even at hover scale — outside the burgundy fill the light label text
   would vanish against the page. */
const SATELLITES: Slot[] = [
  { x: 26, y: 17, d: 21 },
  { x: 71, y: 15, d: 22 },
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

function circleStyle(slot: Slot): React.CSSProperties {
  return { left: `${slot.x}%`, top: `${slot.y}%`, width: `${slot.d}%` };
}

export function AtlasMap({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={`relative aspect-square w-full select-none ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <g strokeWidth="0.25">
          {SATELLITES.map((s, i) => {
            const isHot = hovered === domains[i]?.slug;
            return (
              <line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={s.x}
                y2={s.y}
                className="transition-[stroke,stroke-opacity] duration-300 ease-out motion-reduce:transition-none"
                stroke={isHot ? "var(--interaction)" : "var(--structure)"}
                strokeOpacity={isHot ? 0.85 : 0.25}
              />
            );
          })}
          <g stroke="var(--structure)" strokeOpacity="0.25">
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
        </g>
        <g fill="var(--structure)" fillOpacity="0.3">
          {DOTS.map((dot, i) => (
            <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} />
          ))}
        </g>
      </svg>

      {/* Organizations — the fixed conceptual center, linking to its index. */}
      <Link
        href="/atlas/organizations"
        style={circleStyle(CENTER)}
        className="atlas-node absolute z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-interaction p-3 text-center hover:translate-y-[calc(-50%-0.3rem)] hover:scale-[1.03] hover:shadow-xl hover:shadow-structure/30 focus-visible:translate-y-[calc(-50%-0.3rem)] focus-visible:scale-[1.03] focus-visible:shadow-xl focus-visible:shadow-structure/30 motion-reduce:hover:-translate-y-1/2 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none"
      >
        <span className="font-serif text-sm italic text-atmosphere md:text-lg">
          Organizations
        </span>
      </Link>

      {domains.map((domain, i) => (
        <Link
          key={domain.slug}
          href={`/atlas/${domain.slug}`}
          style={circleStyle(SATELLITES[i])}
          onMouseEnter={() => setHovered(domain.slug)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(domain.slug)}
          onBlur={() => setHovered(null)}
          className="atlas-node absolute z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-structure/10 p-3 text-center hover:translate-y-[calc(-50%-0.3rem)] hover:scale-110 hover:bg-interaction hover:shadow-xl hover:shadow-structure/25 focus-visible:translate-y-[calc(-50%-0.3rem)] focus-visible:scale-110 focus-visible:bg-interaction focus-visible:shadow-xl focus-visible:shadow-structure/25 motion-reduce:hover:-translate-y-1/2 motion-reduce:hover:scale-100 motion-reduce:hover:shadow-none"
        >
          <span
            className={`font-sans text-[0.55rem] uppercase tracking-[0.15em] transition-colors duration-300 motion-reduce:transition-none md:text-[0.65rem] ${
              hovered === domain.slug ? "text-atmosphere" : "text-information"
            }`}
          >
            {domain.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
