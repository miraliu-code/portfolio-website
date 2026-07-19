"use client";

import type { DcStreetId } from "@/lib/content/interactives/dutch-cycling";

/*
 * The street cross-sections — side-elevation drawings in the site's
 * restrained illustration language, annotated like design sections
 * (zone ticks and small uppercase labels below grade, a hatched
 * foundation band, building frontages where the category is defined
 * by them). One drawing per category; the explore view stacks all
 * four and cross-fades between them. No geometry is shared or
 * interpolated between streets — each is a fully-formed, distinct
 * design, which is the argument.
 *
 * Interaction: visuals render plain; an interaction layer of
 * transparent hit bands + outline chrome sits on top (the MTR sign
 * pattern, applied to a cross-section).
 */

export const DC_W = 960;
export const DC_H = 320;

/* Grade line: surfaces sit on top of it, labels hang below it. */
const GRADE = 252;

const COLORS = {
  asphalt: "#4a5765",
  asphaltAlt: "#57647a",
  red: "#a34e3e",
  sidewalk: "#d9d3c5",
  grass: "#93a184",
  brick: "#b8926f",
  brickJoint: "#94714f",
  table: "#c9a077",
  concrete: "#cfc9ba",
  facade: "#d3ccbd",
  glyph: "#3c4756",
  paint: "#f2efe6",
  earth: "rgba(47, 65, 86, 0.13)",
};

const GHOST = {
  asphalt: "rgba(255,253,248,0.10)",
  asphaltAlt: "rgba(255,253,248,0.13)",
  red: "rgba(201,141,155,0.28)",
  sidewalk: "rgba(255,253,248,0.16)",
  grass: "rgba(255,253,248,0.09)",
  brick: "rgba(255,253,248,0.14)",
  brickJoint: "rgba(255,253,248,0.22)",
  table: "rgba(255,253,248,0.2)",
  concrete: "rgba(255,253,248,0.18)",
  facade: "rgba(255,253,248,0.10)",
  glyph: "rgba(255,253,248,0.5)",
  paint: "rgba(255,253,248,0.55)",
  earth: "rgba(255,253,248,0.07)",
};

type Pal = typeof COLORS;

/* ---------------------- glyphs (side view) ------------------------ */

function Car({
  x,
  top,
  p,
  fast = false,
  doorOpen = false,
}: {
  x: number;
  top: number; // surface top the wheels rest on
  p: Pal;
  fast?: boolean;
  doorOpen?: boolean;
}) {
  const y = top;
  return (
    <g>
      {fast && (
        <g stroke={p.glyph} strokeOpacity={0.45} strokeWidth={2}>
          <line x1={x - 26} y1={y - 30} x2={x - 10} y2={y - 30} />
          <line x1={x - 32} y1={y - 22} x2={x - 12} y2={y - 22} />
          <line x1={x - 24} y1={y - 14} x2={x - 8} y2={y - 14} />
        </g>
      )}
      <path
        d={`M ${x} ${y - 24} q 2 -7 12 -8 l 12 -1 q 8 -9 20 -9 h 18 q 12 0 18 9 l 8 1 q 10 1 11 8 l 0 12 q 0 4 -4 4 h -91 q -4 0 -4 -4 Z`}
        fill={p.glyph}
      />
      <path
        d={`M ${x + 27} ${y - 32} q 4 -6 12 -6 h 14 q 8 0 12 6 Z`}
        fill={p.paint}
        fillOpacity={0.85}
      />
      <circle cx={x + 22} cy={y - 9} r={9} fill={p.glyph} />
      <circle cx={x + 22} cy={y - 9} r={3.5} fill={p.paint} fillOpacity={0.8} />
      <circle cx={x + 72} cy={y - 9} r={9} fill={p.glyph} />
      <circle cx={x + 72} cy={y - 9} r={3.5} fill={p.paint} fillOpacity={0.8} />
      {doorOpen && (
        <g>
          <line
            x1={x + 94}
            y1={y - 26}
            x2={x + 128}
            y2={y - 12}
            stroke={p.glyph}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <path
            d={`M ${x + 94} ${y - 4} A 34 34 0 0 0 ${x + 128} ${y - 12}`}
            fill="none"
            stroke={p.glyph}
            strokeOpacity={0.5}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        </g>
      )}
    </g>
  );
}

function Cyclist({ x, top, p }: { x: number; top: number; p: Pal }) {
  const y = top;
  return (
    <g stroke={p.glyph} strokeWidth={2.2} fill="none" strokeLinecap="round">
      <circle cx={x - 14} cy={y - 10} r={10} />
      <circle cx={x + 14} cy={y - 10} r={10} />
      {/* frame */}
      <path
        d={`M ${x - 14} ${y - 10} L ${x - 2} ${y - 26} L ${x + 14} ${y - 10} M ${x - 2} ${y - 26} L ${x + 10} ${y - 28} M ${x - 6} ${y - 12} L ${x - 2} ${y - 26}`}
      />
      {/* rider */}
      <path d={`M ${x - 2} ${y - 26} L ${x + 2} ${y - 40} L ${x + 10} ${y - 30}`} />
      <circle cx={x + 3} cy={y - 46} r={4.5} fill={p.glyph} stroke="none" />
    </g>
  );
}

function Pedestrian({ x, top, p }: { x: number; top: number; p: Pal }) {
  const y = top;
  return (
    <g stroke={p.glyph} strokeWidth={2.2} fill="none" strokeLinecap="round">
      <circle cx={x} cy={y - 34} r={4.5} fill={p.glyph} stroke="none" />
      <line x1={x} y1={y - 29} x2={x} y2={y - 14} />
      <path d={`M ${x} ${y - 14} L ${x - 5} ${y} M ${x} ${y - 14} L ${x + 6} ${y}`} />
      <path d={`M ${x} ${y - 25} L ${x - 5} ${y - 17} M ${x} ${y - 25} L ${x + 5} ${y - 18}`} />
    </g>
  );
}

function Tree({
  x,
  top,
  p,
  tall = false,
}: {
  x: number;
  top: number;
  p: Pal;
  tall?: boolean;
}) {
  const h = tall ? 34 : 22;
  const r = tall ? 21 : 17;
  return (
    <g>
      <rect x={x - 2.5} y={top - h} width={5} height={h} fill={p.brickJoint} />
      <circle cx={x} cy={top - h - r + 5} r={r} fill={p.grass} />
      <circle
        cx={x}
        cy={top - h - r + 5}
        r={r}
        fill="none"
        stroke={p.glyph}
        strokeOpacity={0.25}
      />
    </g>
  );
}

function Bollard({ x, top, p }: { x: number; top: number; p: Pal }) {
  return (
    <g>
      <rect x={x - 3.5} y={top - 18} width={7} height={18} rx={3} fill={p.glyph} />
      <rect x={x - 3.5} y={top - 15} width={7} height={3} fill={p.paint} fillOpacity={0.8} />
    </g>
  );
}

/* Building frontage: the wall a street section is measured between. */
function Building({
  x,
  w,
  base,
  h,
  p,
}: {
  x: number;
  w: number;
  base: number;
  h: number;
  p: Pal;
}) {
  const winCols: number[] = [];
  for (let cx = x + 14; cx + 20 < x + w - 10; cx += 34) winCols.push(cx);
  const winRows: number[] = [];
  for (let ry = base - h + 20; ry < base - 40; ry += 46) winRows.push(ry);
  return (
    <g>
      <rect
        x={x}
        y={base - h}
        width={w}
        height={h}
        fill={p.facade}
        stroke={p.glyph}
        strokeOpacity={0.3}
      />
      <line
        x1={x}
        y1={base - h + 8}
        x2={x + w}
        y2={base - h + 8}
        stroke={p.glyph}
        strokeOpacity={0.2}
      />
      {winCols.map((cx) =>
        winRows.map((ry) => (
          <rect
            key={`${cx}-${ry}`}
            x={cx}
            y={ry}
            width={20}
            height={28}
            fill={p.glyph}
            fillOpacity={0.16}
          />
        )),
      )}
      {/* door at street level */}
      <rect
        x={x + w / 2 - 11}
        y={base - 34}
        width={22}
        height={34}
        fill={p.glyph}
        fillOpacity={0.22}
      />
    </g>
  );
}

/* Below-grade: foundation band with section hatching, full width. */
function Foundation({ p }: { p: Pal }) {
  const hatches: React.ReactNode[] = [];
  for (let x = 46; x < 916; x += 26) {
    hatches.push(
      <line
        key={x}
        x1={x}
        y1={GRADE + 9}
        x2={x + 8}
        y2={GRADE + 2}
        stroke={p.glyph}
        strokeOpacity={0.16}
        strokeWidth={1}
      />,
    );
  }
  return (
    <g>
      <rect x={40} y={GRADE} width={880} height={10} fill={p.earth} />
      {hatches}
    </g>
  );
}

/* Zone annotation below grade: ticks, rule, small caps label. */
function ZoneLabel({
  x1,
  x2,
  text,
  p,
  row = 0,
}: {
  x1: number;
  x2: number;
  text: string;
  p: Pal;
  /* row 1 drops the annotation a level, for full-width labels that
     would otherwise collide with zone labels above them. */
  row?: number;
}) {
  const cx = (x1 + x2) / 2;
  const dy = row * 28;
  return (
    <g className="dc-label-tiny">
      <line x1={x1} y1={GRADE + 13 + dy} x2={x1} y2={GRADE + 21 + dy} stroke={p.glyph} strokeOpacity={0.4} />
      <line x1={x2} y1={GRADE + 13 + dy} x2={x2} y2={GRADE + 21 + dy} stroke={p.glyph} strokeOpacity={0.4} />
      <line x1={x1} y1={GRADE + 21 + dy} x2={x2} y2={GRADE + 21 + dy} stroke={p.glyph} strokeOpacity={0.4} />
      <text
        x={cx}
        y={GRADE + 37 + dy}
        textAnchor="middle"
        fontSize="10"
        letterSpacing="1.5"
        fill={p.glyph}
        fillOpacity={0.72}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {text}
      </text>
    </g>
  );
}

/* --------------------- per-street drawings ----------------------- */

interface HitZone {
  id: string;
  label: string;
  x1: number;
  x2: number;
}

function ThroughRoad({ p }: { p: Pal }) {
  return (
    <>
      <Foundation p={p} />
      {/* no frontages: through-roads run clear of buildings — a tree
          line does the framing instead */}
      <Tree x={60} top={236} p={p} tall />
      <rect x={40} y={236} width={110} height={GRADE - 236} fill={p.sidewalk} />
      <rect x={150} y={238} width={75} height={GRADE - 238} fill={p.grass} />
      <rect x={225} y={240} width={160} height={GRADE - 240} fill={p.red} />
      <rect x={385} y={230} width={110} height={GRADE - 230} fill={p.grass} />
      <rect x={495} y={240} width={405} height={GRADE - 240} fill={p.asphalt} />
      <rect x={900} y={238} width={20} height={GRADE - 238} fill={p.grass} />
      <Pedestrian x={105} top={236} p={p} />
      <Tree x={187} top={238} p={p} />
      <Cyclist x={270} top={240} p={p} />
      <Cyclist x={340} top={240} p={p} />
      <Tree x={420} top={230} p={p} tall />
      <Tree x={468} top={230} p={p} tall />
      <Car x={545} top={240} p={p} fast />
      <Car x={735} top={240} p={p} fast />
      <Tree x={910} top={238} p={p} tall />
      <ZoneLabel x1={40} x2={150} text="SIDEWALK" p={p} />
      <ZoneLabel x1={150} x2={225} text="VERGE" p={p} />
      <ZoneLabel x1={225} x2={385} text="CYCLE TRACK" p={p} />
      <ZoneLabel x1={385} x2={495} text="BARRIER" p={p} />
      <ZoneLabel x1={495} x2={900} text="CARRIAGEWAY · 70–100 KM/H" p={p} />
    </>
  );
}
const THROUGH_HITS: HitZone[] = [
  { id: "cycle-track", label: "The separated cycle track", x1: 225, x2: 385 },
  { id: "barrier", label: "The physical barrier", x1: 385, x2: 495 },
  { id: "carriageway", label: "The carriageway", x1: 495, x2: 900 },
];

function Distributor({ p }: { p: Pal }) {
  return (
    <>
      <Foundation p={p} />
      <Building x={40} w={86} base={236} h={168} p={p} />
      <Building x={834} w={86} base={236} h={150} p={p} />
      <rect x={40} y={236} width={130} height={GRADE - 236} fill={p.sidewalk} />
      <rect x={170} y={240} width={130} height={GRADE - 240} fill={p.red} />
      <rect x={300} y={230} width={65} height={GRADE - 230} fill={p.concrete} />
      <rect x={365} y={240} width={375} height={GRADE - 240} fill={p.asphalt} />
      <rect x={740} y={240} width={140} height={GRADE - 240} fill={p.asphaltAlt} />
      <rect x={880} y={236} width={40} height={GRADE - 236} fill={p.sidewalk} />
      <Pedestrian x={148} top={236} p={p} />
      <Cyclist x={235} top={240} p={p} />
      <Bollard x={314} top={230} p={p} />
      <Bollard x={332} top={230} p={p} />
      <Bollard x={350} top={230} p={p} />
      <Car x={425} top={240} p={p} fast />
      <Car x={600} top={240} p={p} />
      <Car x={762} top={240} p={p} />
      <ZoneLabel x1={40} x2={170} text="SIDEWALK" p={p} />
      <ZoneLabel x1={170} x2={300} text="PROTECTED LANE" p={p} />
      <ZoneLabel x1={300} x2={365} text="BUFFER" p={p} />
      <ZoneLabel x1={365} x2={740} text="CARRIAGEWAY · ≈50 KM/H" p={p} />
      <ZoneLabel x1={740} x2={880} text="PARKING" p={p} />
    </>
  );
}
const DISTRIBUTOR_HITS: HitZone[] = [
  { id: "cycle-lane", label: "The protected cycle lane", x1: 170, x2: 300 },
  { id: "buffer", label: "The physical buffer", x1: 300, x2: 365 },
  { id: "carriageway", label: "The carriageway", x1: 365, x2: 740 },
];

function AccessRoad({ p }: { p: Pal }) {
  /* Brick joints: a deterministic staggered pattern. */
  const joints: React.ReactNode[] = [];
  for (let row = 0; row < 2; row++) {
    const y = 245 + row * 3.5;
    for (let i = 0; i < 43; i++) {
      const x = 132 + i * 20 + (row % 2) * 10;
      if (x > 826) continue;
      joints.push(
        <line
          key={`${row}-${i}`}
          x1={x}
          y1={y}
          x2={x}
          y2={y + 2.6}
          stroke={p.brickJoint}
          strokeWidth={1.2}
        />,
      );
    }
  }
  return (
    <>
      <Foundation p={p} />
      {/* building front to building front — the surface runs wall to
          wall, so the frontages sit ON the shared surface */}
      <Building x={40} w={88} base={244} h={176} p={p} />
      <Building x={832} w={88} base={244} h={160} p={p} />
      <rect x={40} y={244} width={880} height={GRADE - 244} fill={p.brick} />
      {joints}
      {/* speed table: raised brick band with ramped ends */}
      <path
        d={`M 400 244 L 414 237 H 516 L 530 244 Z`}
        fill={p.table}
        stroke={p.glyph}
        strokeOpacity={0.25}
      />
      {/* entry threshold: contrasting paver band + woonerf gate sign,
          announcing the category change at the boundary */}
      <rect
        x={132}
        y={244}
        width={34}
        height={GRADE - 244}
        fill={p.table}
        stroke={p.glyph}
        strokeOpacity={0.3}
      />
      <line x1={149} y1={244} x2={149} y2={GRADE} stroke={p.glyph} strokeOpacity={0.25} />
      <rect x={140} y={186} width={4} height={58} fill={p.glyph} />
      <rect x={130} y={168} width={24} height={22} rx={2} fill="#4c66a0" stroke={p.paint} strokeWidth={1.5} />
      <g stroke={p.paint} strokeWidth={1.4} fill="none">
        <path d="M 135 184 L 138 179 L 141 184" />
        <circle cx={147} cy={176} r={2.2} />
        <line x1={147} y1={178} x2={147} y2={183} />
      </g>
      {/* planter chicane */}
      <rect x={200} y={226} width={80} height={18} fill={p.concrete} stroke={p.glyph} strokeOpacity={0.3} />
      <circle cx={218} cy={222} r={8} fill={p.grass} />
      <circle cx={240} cy={219} r={10} fill={p.grass} />
      <circle cx={262} cy={222} r={8} fill={p.grass} />
      <Pedestrian x={330} top={244} p={p} />
      <Cyclist x={465} top={237} p={p} />
      <Car x={585} top={244} p={p} />
      <Tree x={775} top={244} p={p} />
      <ZoneLabel x1={132} x2={166} text="GATEWAY" p={p} />
      <ZoneLabel x1={200} x2={280} text="CHICANE" p={p} />
      <ZoneLabel x1={400} x2={530} text="SPEED TABLE" p={p} />
      <ZoneLabel x1={40} x2={920} text="ONE SHARED SURFACE, WALL TO WALL · 15–20 KM/H" p={p} row={1} />
    </>
  );
}
const ACCESS_HITS: HitZone[] = [
  /* The shared surface is the underlay: the gateway, chicane, and
     table sit on top of it in the interaction layer, so they win
     their own clicks. */
  { id: "shared-surface", label: "The shared surface", x1: 40, x2: 920 },
  { id: "gateway", label: "The entry threshold", x1: 126, x2: 172 },
  { id: "chicane", label: "The planter chicane", x1: 200, x2: 280 },
  { id: "speed-table", label: "The speed table", x1: 400, x2: 530 },
];

function Conventional({ p }: { p: Pal }) {
  return (
    <>
      <Foundation p={p} />
      <Building x={40} w={80} base={236} h={172} p={p} />
      <Building x={840} w={80} base={236} h={156} p={p} />
      <rect x={40} y={236} width={75} height={GRADE - 236} fill={p.sidewalk} />
      <rect x={115} y={240} width={765} height={GRADE - 240} fill={p.asphalt} />
      <rect x={880} y={236} width={40} height={GRADE - 236} fill={p.sidewalk} />
      {/* the paint: thin white strips on the same surface */}
      <rect x={236} y={239} width={4} height={2.4} fill={p.paint} />
      <rect x={304} y={239} width={4} height={2.4} fill={p.paint} />
      <rect x={236} y={239} width={72} height={1} fill={p.paint} fillOpacity={0.45} />
      {/* painted bike symbol on the surface */}
      <g stroke={p.paint} strokeWidth={1.6} fill="none" opacity={0.9}>
        <circle cx={263} cy={240} r={2.6} />
        <circle cx={277} cy={240} r={2.6} />
        <path d="M 263 240 L 270 236 L 277 240 M 270 236 L 270 240" />
      </g>
      {/* centre-line dashes further along */}
      <rect x={520} y={239.2} width={16} height={1.6} fill={p.paint} fillOpacity={0.6} />
      <rect x={560} y={239.2} width={16} height={1.6} fill={p.paint} fillOpacity={0.6} />
      <Pedestrian x={78} top={236} p={p} />
      <Car x={126} top={240} p={p} doorOpen />
      <Cyclist x={272} top={240} p={p} />
      <Car x={390} top={240} p={p} fast />
      <Car x={640} top={240} p={p} fast />
      <ZoneLabel x1={40} x2={115} text="SIDEWALK" p={p} />
      <ZoneLabel x1={115} x2={236} text="PARKING" p={p} />
      <ZoneLabel x1={236} x2={308} text="PAINT" p={p} />
      <ZoneLabel x1={308} x2={880} text="TRAFFIC LANES · 40–60 KM/H" p={p} />
    </>
  );
}
const CONVENTIONAL_HITS: HitZone[] = [
  { id: "door-zone", label: "The door zone", x1: 115, x2: 236 },
  { id: "painted-lane", label: "The painted bike lane", x1: 236, x2: 308 },
  { id: "traffic-lanes", label: "The traffic lanes", x1: 308, x2: 880 },
];

const DRAWINGS: Record<
  DcStreetId,
  { Art: ({ p }: { p: Pal }) => React.ReactNode; hits: HitZone[] }
> = {
  "through-road": { Art: ThroughRoad, hits: THROUGH_HITS },
  distributor: { Art: Distributor, hits: DISTRIBUTOR_HITS },
  "access-road": { Art: AccessRoad, hits: ACCESS_HITS },
  conventional: { Art: Conventional, hits: CONVENTIONAL_HITS },
};

/* ------------------------------------------------------------------ */

interface DcSectionProps {
  street: DcStreetId;
  ghost?: boolean;
  selected?: string | null;
  onSelect?: (id: string | null) => void;
}

export function DcSection({
  street,
  ghost = false,
  selected = null,
  onSelect,
}: DcSectionProps) {
  const p = ghost ? (GHOST as Pal) : COLORS;
  const { Art, hits } = DRAWINGS[street];

  return (
    <svg
      viewBox={`0 0 ${DC_W} ${DC_H}`}
      role={ghost ? undefined : "group"}
      aria-hidden={ghost ? "true" : undefined}
      aria-label={
        ghost
          ? undefined
          : "Street cross-section. Parts of the street are selectable."
      }
      className="block w-full select-none"
      onClick={ghost ? undefined : () => onSelect?.(null)}
    >
      <Art p={p} />
      {/* interaction layer */}
      {!ghost &&
        hits.map((h) => {
          const isSel = selected === h.id;
          return (
            <g
              key={h.id}
              role="button"
              tabIndex={0}
              aria-label={`${h.label} — select`}
              aria-pressed={isSel}
              className="dc-el"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(isSel ? null : h.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect?.(isSel ? null : h.id);
                }
              }}
            >
              <rect
                x={h.x1}
                y={166}
                width={h.x2 - h.x1}
                height={122}
                fill="transparent"
              />
              <rect
                x={h.x1 - 3}
                y={164}
                width={h.x2 - h.x1 + 6}
                height={126}
                rx={6}
                fill="none"
                stroke="var(--interaction)"
                strokeWidth={2.5}
                className={`dc-outline${isSel ? " dc-outline-on" : ""}`}
              />
            </g>
          );
        })}
    </svg>
  );
}
