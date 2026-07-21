"use client";

import { useEffect, useState } from "react";
import {
  cxDetailFields,
  cxZones,
  getCxZone,
} from "@/lib/content/interactives/changi-experience";

/*
 * The Changi floor plan — a stylized map of one real airport's actual
 * spaces, drawn to the Atlas rules (thin structure-ink linework,
 * whisper fills, interaction color reserved for selection) but on a
 * different layout logic from the Airport Ecosystem terminal: Changi
 * isn't a linear band diagram, it's a campus — the Jewel torus at the
 * center-left with Terminal 1 grafted onto it, T2 and T3 reached by
 * corridor and skytrain, and the signature spaces (Rain Vortex,
 * Butterfly Garden, rooftop pool, gardens) drawn as themselves.
 *
 * Ink is parameterized (--cx-ink) so the hero can render the same
 * drawing as a ghost on the Blue Ink panel.
 */

const W = 1000;
const H = 640;

const INK = "var(--cx-ink, var(--structure))";

/* ------------------------------------------------------------------ */
/* Drawing helpers                                                      */
/* ------------------------------------------------------------------ */

function ZoneLabel({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="11"
      letterSpacing="2"
      fill={INK}
      fillOpacity="0.6"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </text>
  );
}

function TinyLabel({
  x,
  y,
  children,
  anchor = "middle",
  rotate,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="9"
      letterSpacing="1.2"
      fill={INK}
      fillOpacity="0.5"
      className="cx-label-tiny"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </text>
  );
}

/* A sunflower mark: a small disc with petal ticks. */
function Flower({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke={INK} strokeOpacity="0.5" strokeWidth="1">
      <circle cx={cx} cy={cy} r={2.6} fill="none" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx + 4 * Math.cos(rad)}
            y1={cy + 4 * Math.sin(rad)}
            x2={cx + 6.5 * Math.cos(rad)}
            y2={cy + 6.5 * Math.sin(rad)}
          />
        );
      })}
    </g>
  );
}

/* A butterfly mark: two tick wings. */
function Butterfly({ cx, cy, tilt = 0 }: { cx: number; cy: number; tilt?: number }) {
  return (
    <g
      stroke={INK}
      strokeOpacity="0.6"
      strokeWidth="1"
      fill="none"
      transform={`rotate(${tilt} ${cx} ${cy})`}
    >
      <path d={`M ${cx} ${cy} q -4 -4 -6 -1 q -1 2 6 3`} />
      <path d={`M ${cx} ${cy} q 4 -4 6 -1 q 1 2 -6 3`} />
    </g>
  );
}

/* Comb-style seating rows (movie theater). */
function SeatRow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return (
    <g stroke={INK} strokeOpacity="0.45" strokeWidth="1">
      <line x1={x1} y1={y} x2={x2} y2={y} />
      {Array.from({ length: Math.floor((x2 - x1) / 8) + 1 }, (_, i) => (
        <line key={i} x1={x1 + i * 8} y1={y} x2={x1 + i * 8} y2={y + 4} />
      ))}
    </g>
  );
}

function QueueDots({ points }: { points: [number, number][] }) {
  return (
    <g fill={INK} fillOpacity="0.5">
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.7} />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* The illustration (static linework, aria-hidden)                     */
/* ------------------------------------------------------------------ */

function ChangiArt() {
  return (
    <g aria-hidden="true">
      {/* ============ JEWEL — the torus and the Rain Vortex ========= */}
      {/* gridshell spokes, drawn first so the rings sit over them */}
      <g stroke={INK} strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i * 22.5 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={300 + 34 * Math.cos(a)}
              y1={330 + 34 * Math.sin(a)}
              x2={300 + 150 * Math.cos(a)}
              y2={330 + 150 * Math.sin(a)}
            />
          );
        })}
      </g>
      {/* torus rings */}
      <circle
        cx={300}
        cy={330}
        r={150}
        fill={INK}
        fillOpacity="0.015"
        stroke={INK}
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      <circle
        cx={300}
        cy={330}
        r={118}
        fill="none"
        stroke={INK}
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      <circle
        cx={300}
        cy={330}
        r={86}
        fill="none"
        stroke={INK}
        strokeOpacity="0.3"
        strokeWidth="1"
      />
      {/* Forest Valley: canopy dots in the ring between the vortex and
          the shell */}
      <g fill={INK} fillOpacity="0.35">
        {[
          [300, 205], [345, 214], [388, 238], [252, 212], [214, 240],
          [188, 285], [180, 335], [190, 385], [216, 425], [256, 450],
          [304, 458], [352, 448], [392, 421], [415, 380], [421, 330],
          [412, 282], [268, 232], [332, 234], [230, 270], [372, 270],
          [212, 362], [390, 360], [242, 415], [360, 415],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 3 : 2.1} />
        ))}
      </g>
      {/* Rain Vortex: the oculus, falling-water ticks, catch pool */}
      <circle
        cx={300}
        cy={330}
        r={30}
        fill="var(--atmosphere)"
        stroke={INK}
        strokeOpacity="0.7"
        strokeWidth="1.2"
      />
      <g stroke={INK} strokeOpacity="0.45" strokeWidth="1">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={300 + 14 * Math.cos(a)}
              y1={330 + 14 * Math.sin(a)}
              x2={300 + 26 * Math.cos(a)}
              y2={330 + 26 * Math.sin(a)}
            />
          );
        })}
      </g>
      <circle
        cx={300}
        cy={330}
        r={13}
        fill="none"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <circle cx={300} cy={330} r={3} fill={INK} fillOpacity="0.5" />
      <TinyLabel x={300} y={302}>
        RAIN VORTEX
      </TinyLabel>
      <ZoneLabel x={300} y={172} anchor="middle">
        JEWEL
      </ZoneLabel>

      {/* link bridges Jewel → Terminal 1 */}
      {[300, 360].map((y) => (
        <g key={y}>
          <line
            x1={444}
            y1={y}
            x2={492}
            y2={y}
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="7"
          />
          <line
            x1={445}
            y1={y}
            x2={491}
            y2={y}
            stroke="var(--atmosphere)"
            strokeOpacity="0.9"
            strokeWidth="4"
          />
        </g>
      ))}

      {/* ============ TERMINAL 1 ============ */}
      <rect
        x={492}
        y={240}
        width={276}
        height={180}
        fill={INK}
        fillOpacity="0.02"
        stroke={INK}
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      <TinyLabel x={766} y={234} anchor="end">
        TERMINAL 1
      </TinyLabel>

      {/* Arrival / Immigration: booth row, queue, living plant wall */}
      <g>
        {[560, 620, 680, 740].map((x) => (
          <g key={x}>
            <rect
              x={x - 7}
              y={266}
              width={14}
              height={18}
              fill="var(--atmosphere)"
              stroke={INK}
              strokeOpacity="0.65"
              strokeWidth="1"
            />
            <line
              x1={x - 4}
              y1={275}
              x2={x + 4}
              y2={275}
              stroke={INK}
              strokeOpacity="0.45"
              strokeWidth="1"
            />
          </g>
        ))}
        {/* queue serpentine */}
        <path
          d={`M 516 300 L 744 300 M 744 308 L 524 308 M 524 316 L 744 316`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <QueueDots
          points={[
            [548, 300], [596, 300], [648, 300], [700, 300],
            [672, 308], [616, 308], [564, 308],
            [590, 316], [672, 316],
          ]}
        />
        {/* the plant wall at eye level in the queue — foliage bumps
            along a rail */}
        <line
          x1={516}
          y1={330}
          x2={744}
          y2={330}
          stroke={INK}
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <g fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="1">
          {[524, 546, 568, 590, 612, 634, 656, 678, 700, 722].map((x) => (
            <path key={x} d={`M ${x} 330 q 3 -7 8 -4 q 4 2 3 4`} />
          ))}
        </g>
        <TinyLabel x={630} y={344}>
          PLANT WALL
        </TinyLabel>
      </g>
      <ZoneLabel x={504} y={262}>
        ARRIVAL / IMMIGRATION
      </ZoneLabel>

      {/* Retail / Dining: hawker stalls + tables with Jewel sightline */}
      <g>
        {[
          { x: 630, label: "LAKSA" },
          { x: 686, label: "KAYA" },
          { x: 742, label: "NOODLE" },
        ].map((stall) => (
          <g key={stall.x}>
            <rect
              x={stall.x - 22}
              y={370}
              width={44}
              height={26}
              fill="var(--atmosphere)"
              stroke={INK}
              strokeOpacity="0.55"
              strokeWidth="1"
            />
            {/* awning ticks */}
            <g stroke={INK} strokeOpacity="0.4" strokeWidth="1">
              {[-16, -8, 0, 8, 16].map((dx) => (
                <line
                  key={dx}
                  x1={stall.x + dx}
                  y1={370}
                  x2={stall.x + dx}
                  y2={365}
                />
              ))}
            </g>
            <line
              x1={stall.x - 14}
              y1={388}
              x2={stall.x + 14}
              y2={388}
              stroke={INK}
              strokeOpacity="0.45"
              strokeWidth="2"
            />
            <TinyLabel x={stall.x} y={381}>
              {stall.label}
            </TinyLabel>
          </g>
        ))}
        {/* tables facing the Jewel side */}
        <g stroke={INK} strokeOpacity="0.45" strokeWidth="1" fill="none">
          {[
            [528, 388], [556, 398], [530, 406],
          ].map(([x, y]) => (
            <g key={`${x}${y}`}>
              <circle cx={x} cy={y} r={6} />
              <line x1={x - 10} y1={y} x2={x - 7} y2={y} />
              <line x1={x + 7} y1={y} x2={x + 10} y2={y} />
            </g>
          ))}
        </g>
      </g>
      <ZoneLabel x={504} y={364}>
        RETAIL / DINING
      </ZoneLabel>

      {/* Rooftop pool on T1's roof edge (west end, clear of T2) */}
      <g>
        <rect
          x={500}
          y={194}
          width={68}
          height={46}
          fill={INK}
          fillOpacity="0.02"
          stroke={INK}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <rect
          x={508}
          y={202}
          width={44}
          height={30}
          rx={6}
          fill="var(--atmosphere)"
          stroke={INK}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <g stroke={INK} strokeOpacity="0.4" strokeWidth="1" fill="none">
          <path d="M 514 212 q 4 -3 8 0 q 4 3 8 0 q 4 -3 8 0 q 4 3 8 0" />
          <path d="M 514 222 q 4 -3 8 0 q 4 3 8 0 q 4 -3 8 0 q 4 3 8 0" />
        </g>
        {/* lounger */}
        <line
          x1={558}
          y1={208}
          x2={558}
          y2={226}
          stroke={INK}
          strokeOpacity="0.5"
          strokeWidth="2.5"
        />
        <TinyLabel x={534} y={188}>
          ROOFTOP POOL
        </TinyLabel>
      </g>

      {/* corridor T1 → T2 and T1 → T3 */}
      {[
        { y1: 200, y2: 240 },
        { y1: 420, y2: 460 },
      ].map(({ y1, y2 }) => (
        <g key={y1} stroke={INK} strokeOpacity="0.55" strokeWidth="1">
          <line x1={690} y1={y1} x2={690} y2={y2} />
          <line x1={718} y1={y1} x2={718} y2={y2} />
        </g>
      ))}

      {/* ============ TERMINAL 2 ============ */}
      <rect
        x={624}
        y={56}
        width={296}
        height={144}
        fill={INK}
        fillOpacity="0.02"
        stroke={INK}
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      <TinyLabel x={624} y={50} anchor="start">
        TERMINAL 2
      </TinyLabel>
      {/* divider between gardens and transit */}
      <line
        x1={770}
        y1={56}
        x2={770}
        y2={200}
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* Terminal Gardens: sunflower grid + orchid stems */}
      <g>
        {[
          [660, 96], [692, 88], [724, 96], [676, 120], [708, 118],
          [740, 116], [660, 142], [694, 146], [726, 142],
        ].map(([x, y]) => (
          <Flower key={`${x}${y}`} cx={x} cy={y} />
        ))}
        {/* orchid bed: arcing stems with a bloom dot */}
        <g stroke={INK} strokeOpacity="0.5" strokeWidth="1" fill="none">
          <path d="M 646 172 q 2 -14 12 -18" />
          <path d="M 658 172 q 4 -10 14 -12" />
          <path d="M 672 172 q 2 -12 10 -16" />
        </g>
        <g fill={INK} fillOpacity="0.5">
          <circle cx={659} cy={153} r={2} />
          <circle cx={673} cy={159} r={2} />
          <circle cx={683} cy={155} r={2} />
        </g>
      </g>
      <ZoneLabel x={636} y={190}>
        GARDENS
      </ZoneLabel>
      <TinyLabel x={700} y={76} anchor="middle">
        SUNFLOWER · ORCHID
      </TinyLabel>
      {/* Transit Areas: transit hotel rooms + free-city-tour desk */}
      <g>
        {[0, 1, 2].map((col) =>
          [0, 1].map((row) => (
            <rect
              key={`${col}${row}`}
              x={790 + col * 26}
              y={84 + row * 20}
              width={20}
              height={14}
              fill="var(--atmosphere)"
              stroke={INK}
              strokeOpacity="0.55"
              strokeWidth="1"
            />
          )),
        )}
        <TinyLabel x={822} y={132}>
          TRANSIT HOTEL
        </TinyLabel>
        {/* tour desk with flag */}
        <rect
          x={800}
          y={142}
          width={30}
          height={10}
          fill="var(--atmosphere)"
          stroke={INK}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <line
          x1={836}
          y1={152}
          x2={836}
          y2={136}
          stroke={INK}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <path
          d={`M 836 136 l 9 3 l -9 3 Z`}
          fill={INK}
          fillOpacity="0.45"
        />
        <QueueDots
          points={[
            [794, 160], [806, 162], [818, 160], [830, 162],
          ]}
        />
        <TinyLabel x={824} y={174}>
          FREE CITY TOUR
        </TinyLabel>
      </g>
      <ZoneLabel x={782} y={190}>
        TRANSIT
      </ZoneLabel>

      {/* ============ TERMINAL 3 ============ */}
      <rect
        x={624}
        y={460}
        width={296}
        height={144}
        fill={INK}
        fillOpacity="0.02"
        stroke={INK}
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      <TinyLabel x={624} y={618} anchor="start">
        TERMINAL 3
      </TinyLabel>
      {/* Butterfly Garden: conservatory bulge on T3's west edge */}
      <g>
        <circle
          cx={628}
          cy={532}
          r={44}
          fill="var(--atmosphere)"
          stroke={INK}
          strokeOpacity="0.7"
          strokeWidth="1.3"
        />
        <circle
          cx={628}
          cy={532}
          r={36}
          fill="none"
          stroke={INK}
          strokeOpacity="0.3"
          strokeWidth="1"
        />
        {/* foliage + butterflies */}
        <g fill={INK} fillOpacity="0.35">
          {[
            [612, 546], [628, 552], [644, 544], [618, 526],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r={2.4} />
          ))}
        </g>
        <Butterfly cx={620} cy={514} tilt={-15} />
        <Butterfly cx={640} cy={524} tilt={20} />
        <Butterfly cx={630} cy={540} tilt={0} />
        <TinyLabel x={628} y={590}>
          BUTTERFLY GARDEN
        </TinyLabel>
      </g>
      {/* Movie theater: screen + seat combs */}
      <g>
        <line
          x1={706}
          y1={484}
          x2={790}
          y2={484}
          stroke={INK}
          strokeOpacity="0.65"
          strokeWidth="3"
        />
        {[500, 514, 528, 542].map((y) => (
          <SeatRow key={y} x1={708} y={y} x2={788} />
        ))}
        <TinyLabel x={748} y={566}>
          MOVIE THEATER
        </TinyLabel>
      </g>
      <ZoneLabel x={700} y={592}>
        FREE ATTRACTIONS
      </ZoneLabel>
      {/* Rest & Sleep: nap cabins */}
      <g>
        {[0, 1].map((col) =>
          [0, 1, 2].map((row) => (
            <g key={`${col}${row}`}>
              <rect
                x={826 + col * 40}
                y={478 + row * 26}
                width={32}
                height={18}
                rx={4}
                fill="var(--atmosphere)"
                stroke={INK}
                strokeOpacity="0.55"
                strokeWidth="1"
              />
              {/* pillow tick */}
              <line
                x1={831 + col * 40}
                y1={483 + row * 26}
                x2={831 + col * 40}
                y2={491 + row * 26}
                stroke={INK}
                strokeOpacity="0.4"
                strokeWidth="2.5"
              />
            </g>
          )),
        )}
        <TinyLabel x={862} y={568}>
          SNOOZE LOUNGES
        </TinyLabel>
      </g>

      {/* ============ SKYTRAIN ============ */}
      <g>
        <path
          d={`M 920 128 L 948 128 L 948 532 L 920 532`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="6 5"
        />
        {[240, 420].map((y) => (
          <rect
            key={y}
            x={944}
            y={y}
            width={8}
            height={14}
            rx={2}
            fill="var(--atmosphere)"
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        ))}
        <TinyLabel x={962} y={330} rotate={90}>
          SKYTRAIN
        </TinyLabel>
      </g>

    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Zone hit shapes: each zone is a group of one or more fill shapes.   */
/* Free Attractions is deliberately two disjoint areas — the rooftop   */
/* pool on T1 and the movie theater in T3.                             */
/* ------------------------------------------------------------------ */

type CxShape =
  | { kind: "rect"; x: number; y: number; w: number; h: number }
  | { kind: "circle"; cx: number; cy: number; r: number };

const ZONE_SHAPES: { id: string; shapes: CxShape[] }[] = [
  {
    id: "immigration",
    shapes: [{ kind: "rect", x: 498, y: 246, w: 264, h: 106 }],
  },
  { id: "jewel", shapes: [{ kind: "circle", cx: 300, cy: 330, r: 152 }] },
  { id: "transit", shapes: [{ kind: "rect", x: 774, y: 60, w: 142, h: 136 }] },
  { id: "gardens", shapes: [{ kind: "rect", x: 628, y: 60, w: 138, h: 136 }] },
  { id: "retail", shapes: [{ kind: "rect", x: 498, y: 356, w: 264, h: 60 }] },
  {
    id: "attractions",
    shapes: [
      { kind: "rect", x: 496, y: 190, w: 76, h: 52 },
      { kind: "rect", x: 698, y: 470, w: 104, h: 106 },
    ],
  },
  {
    id: "butterfly",
    shapes: [{ kind: "circle", cx: 628, cy: 532, r: 48 }],
  },
  { id: "rest", shapes: [{ kind: "rect", x: 818, y: 470, w: 96, h: 106 }] },
];

/* ------------------------------------------------------------------ */
/* Public components                                                    */
/* ------------------------------------------------------------------ */

/* Ghost rendering for the hero: same drawing, atmosphere ink. */
export function CxTerminalGhost() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40 md:w-[105%]"
      style={
        {
          /* Ghost mode: Floral White linework over the Blue Ink panel.
             --cx-ink must be a literal — it can't reference
             --atmosphere, which is overridden to transparent here so
             the drawing reads as pure line, no solid fills. */
          "--cx-ink": "#fffdf8",
          "--atmosphere": "transparent",
        } as React.CSSProperties
      }
    >
      <ChangiArt />
    </svg>
  );
}

function DetailField({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div className={accent ? "border-l-2 border-interaction/60 pl-4" : ""}>
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
        {label}
      </p>
      <p className="mt-2 font-serif text-sm leading-[1.8] text-information/90">
        {text}
      </p>
    </div>
  );
}

/* The Explore section: jump list + floor plan + detail panel. */
export function CxFloorPlan() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? getCxZone(selectedId) : null;

  const selectZone = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  /* Escape deselects, matching the other systems. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* Plan + jump list (the Professional Norms pattern: map first
          in DOM, list seated left on desktop, below on mobile). */}
      <div className="flex flex-col md:flex-row-reverse">
        <div className="min-w-0 flex-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="group"
            aria-label="Stylized floor plan of Changi Airport's signature spaces. Eight spaces are selectable."
            className="block w-full select-none"
          >
            {/* background click = deselect */}
            <rect
              x={0}
              y={0}
              width={W}
              height={H}
              fill="transparent"
              onClick={() => setSelectedId(null)}
            />
            <ChangiArt />
            {ZONE_SHAPES.map((zone) => {
              const z = getCxZone(zone.id)!;
              const isSelected = selectedId === zone.id;
              return (
                <g
                  key={zone.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${z.name} — select`}
                  aria-pressed={isSelected}
                  className={`cx-zone cursor-pointer focus:outline-none ${
                    isSelected ? "cx-zone-selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectZone(zone.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectZone(zone.id);
                    }
                  }}
                >
                  {zone.shapes.map((s, i) =>
                    s.kind === "rect" ? (
                      <rect
                        key={i}
                        x={s.x}
                        y={s.y}
                        width={s.w}
                        height={s.h}
                        rx={4}
                        className="cx-zone-fill"
                      />
                    ) : (
                      <circle
                        key={i}
                        cx={s.cx}
                        cy={s.cy}
                        r={s.r}
                        className="cx-zone-fill"
                      />
                    ),
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Jump list — some of these spaces are small on the drawing
            (the pool especially). */}
        <nav
          aria-label="Space list"
          className="w-full shrink-0 border-t border-structure/15 px-5 pb-5 pt-4 md:w-52 md:border-r md:border-t-0 md:py-5 md:pl-7 md:pr-4"
        >
          <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.25em] text-information/50">
            Jump to a space
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {[...cxZones]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((z) => (
                <li key={z.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(z.id)}
                    aria-pressed={selectedId === z.id}
                    className={`block w-full border-l py-1 pl-3 text-left font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                      selectedId === z.id
                        ? "border-interaction text-interaction"
                        : "border-structure/20 text-information/65 hover:border-interaction/60 hover:text-interaction"
                    }`}
                  >
                    {z.name}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      {/* Detail panel — Changi's four fields; Tradeoff carries the
          accent: it is the counterweight that keeps this piece from
          reading as brochure copy. */}
      <div className="min-h-[5.5rem] border-t border-structure/20 px-5 py-5 md:px-7">
        {!selected && (
          <p className="font-serif text-sm italic leading-relaxed text-information/60">
            Eight spaces are selectable, from the arrival hall to the
            butterfly garden. Choose one to see why it was built this way.
          </p>
        )}
        {selected && (
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <p className="font-serif text-xl leading-snug text-information">
                {selected.name}
              </p>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
              >
                Reset
              </button>
            </div>
            <div className="mt-6 grid max-w-4xl gap-x-10 gap-y-6 md:grid-cols-2">
              {cxDetailFields.map(({ key, label }) => (
                <DetailField
                  key={key}
                  label={label}
                  text={selected.detail[key]}
                  accent={key === "tradeoff"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
