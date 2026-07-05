import Link from "next/link";
import { observatorySections } from "@/lib/content/observatory";

/*
 * The Observatory as a loose constellation — no center, varied sizes,
 * quiet connecting lines and satellite dots (matching the Atlas map's
 * texture). Hover: deeper blue and slightly larger. Shared by the
 * homepage preview and the Observatory page. Falls back to a plain
 * list below md, where the labels have no room.
 */

const SLOTS: { x: number; y: number; d: number }[] = [
  { x: 11, y: 34, d: 15 },
  { x: 33, y: 64, d: 12.5 },
  { x: 55, y: 30, d: 16.5 },
  { x: 76, y: 62, d: 13 },
  { x: 92, y: 26, d: 11 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 2],
  [2, 3],
  [3, 4],
  [1, 3],
];

/* Decorative satellite dots (viewBox coords), some tethered to a circle. */
const DOTS: { x: number; y: number; r: number; from?: number }[] = [
  { x: 22, y: 4, r: 0.8, from: 0 },
  { x: 44, y: 38, r: 0.7, from: 1 },
  { x: 65, y: 3.5, r: 0.9, from: 2 },
  { x: 85, y: 38.5, r: 0.7, from: 3 },
  { x: 98, y: 19, r: 0.6, from: 4 },
  { x: 4.5, y: 6, r: 0.5 },
  { x: 50, y: 40.5, r: 0.5 },
  { x: 72, y: 6.5, r: 0.5 },
  { x: 30, y: 41, r: 0.5 },
];

/* Slot centers in viewBox units (y% of a 100x42 canvas). */
const sy = (yPct: number) => (yPct * 42) / 100;

export function ObservatoryMap() {
  return (
    <>
      {/* Constellation (md+) */}
      <div className="relative hidden aspect-[100/42] w-full max-w-3xl select-none md:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 42"
          className="absolute inset-0 h-full w-full"
        >
          <g stroke="var(--structure)" strokeOpacity="0.25" strokeWidth="0.2">
            {EDGES.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                x1={SLOTS[a].x}
                y1={sy(SLOTS[a].y)}
                x2={SLOTS[b].x}
                y2={sy(SLOTS[b].y)}
              />
            ))}
            {DOTS.filter((dot) => dot.from !== undefined).map((dot, i) => (
              <line
                key={`t${i}`}
                x1={SLOTS[dot.from!].x}
                y1={sy(SLOTS[dot.from!].y)}
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
        {observatorySections.map((section, i) => {
          const slot = SLOTS[i];
          return (
            <Link
              key={section.slug}
              href={`/observatory/${section.slug}`}
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                width: `${slot.d}%`,
              }}
              className="absolute z-10 flex aspect-square -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-structure/10 p-3 text-center font-sans text-[0.55rem] uppercase tracking-[0.15em] text-information transition-[transform,background-color] duration-300 ease-out hover:scale-105 hover:bg-structure/30 focus-visible:scale-105 focus-visible:bg-structure/30 motion-reduce:transition-none motion-reduce:hover:scale-100 lg:text-[0.65rem]"
            >
              {section.name}
            </Link>
          );
        })}
      </div>

      {/* Simple list below md, where the constellation has no room. */}
      <ul className="space-y-3 md:hidden">
        {observatorySections.map((section) => (
          <li key={section.slug}>
            <Link
              href={`/observatory/${section.slug}`}
              className="font-sans text-xs uppercase tracking-[0.2em] text-information transition-colors hover:text-interaction"
            >
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
