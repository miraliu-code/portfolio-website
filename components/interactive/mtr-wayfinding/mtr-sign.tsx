"use client";

import type { MtrElementId, MtrMode } from "@/lib/content/interactives/mtr-wayfinding";

/*
 * The composite directional sign — a stylized rendering of a busy
 * four-line interchange sign (Central / Hong Kong Station context:
 * Tsuen Wan, Island, Tung Chung, Airport Express), drawn in the
 * site's restrained illustration language rather than as a literal
 * photo recreation.
 *
 * Two layers:
 *   1. the sign's visual parts, each categorized as text / shape /
 *      mosaic so the reading-mode toggle can cross-fade whole
 *      categories (Tourist reads text, Local reads shape, Rush Hour
 *      reads only the platform mosaic);
 *   2. an interaction layer of six element groups (transparent hit
 *      areas + outline chrome) that stays clickable in every mode.
 *
 * `ghost` renders the same geometry in the hero's quiet
 * atmosphere-on-Blue-Ink palette, non-interactive.
 */

export const MTR_SIGN_W = 960;
export const MTR_SIGN_H = 478;

type Part = "text" | "shape" | "backdrop" | "mosaic";

/* `backdrop` is the board itself: it is the canvas the text needs
   (white type requires the dark ground), so Tourist mode keeps it
   while the competing shape SIGNALS — discs, arrows, yellow band —
   recede. */
const OP: Record<MtrMode, Record<Part, number>> = {
  rest: { text: 1, shape: 1, backdrop: 1, mosaic: 0.9 },
  tourist: { text: 1, shape: 0.38, backdrop: 0.88, mosaic: 0.3 },
  local: { text: 0.26, shape: 1, backdrop: 1, mosaic: 0.72 },
  rush: { text: 0.07, shape: 0.16, backdrop: 0.14, mosaic: 1 },
};

/* Restrained takes on the real line colours. */
const TSUEN_WAN_RED = "#c8332b";
const ISLAND_BLUE = "#1e5aa5";
const TUNG_CHUNG_ORANGE = "#d97b28";
const AIRPORT_TEAL = "#0d7680";
const EXIT_YELLOW = "#e8ba1c";
const SIGN_BLACK = "#1b212b";
const INK = "#f5f6f4";
/* Central's platform mosaic — deep red-brown family. */
const MOSAIC = ["#7c2f28", "#8a3a30", "#6f2a24", "#93453a"];
/* Selection chrome: light burgundy on the dark board, full
   interaction burgundy on the yellow band. */
const OUTLINE_LIGHT = "#d9a0ac";
const OUTLINE_DARK = "#6b2d3a";

const SONG_STACK =
  "'Noto Serif TC','Noto Serif CJK TC','Songti TC','SimSun','MingLiU',serif";

interface MtrSignProps {
  ghost?: boolean;
  mode?: MtrMode;
  selected?: MtrElementId | null;
  onSelect?: (id: MtrElementId | null) => void;
}

export function MtrSign({
  ghost = false,
  mode = "rest",
  selected = null,
  onSelect,
}: MtrSignProps) {
  /* Ghost ignores modes and interaction entirely. */
  const op = (part: Part) => (ghost ? 1 : OP[mode][part]);
  const fade = ghost ? "" : "mtr-fade";

  /* Ghost palette: atmosphere strokes with the light-burgundy accent
     the other hero ghosts use. */
  const g = ghost;
  const ink = g ? "var(--atmosphere)" : INK;
  const inkOp = (full: number, ghostVal: number) => (g ? ghostVal : full);

  const disc = (
    cx: number,
    cy: number,
    color: string,
    label: string | null,
  ) => (
    <g className={fade} style={{ opacity: op("shape") }}>
      <circle
        cx={cx}
        cy={cy}
        r={25}
        fill={g ? "#c98d9b" : color}
        fillOpacity={g ? 0.14 : 1}
        stroke={g ? "#c98d9b" : "none"}
        strokeOpacity={g ? 0.55 : 0}
        strokeWidth={g ? 1 : 0}
      />
      {label && (
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill={ink}
          fillOpacity={inkOp(1, 0.6)}
          className={fade}
          style={{
            fontFamily: "var(--font-sans)",
            opacity: op("text"),
          }}
        >
          {label}
        </text>
      )}
    </g>
  );

  /* A text run with its tourist-mode reading highlight behind it. */
  const run = (
    x: number,
    y: number,
    text: string,
    size: number,
    opts: {
      song?: boolean;
      sub?: boolean;
      dark?: boolean;
      ls?: number;
      hl?: [number, number, number, number]; // highlight rect x,y,w,h
    } = {},
  ) => (
    <>
      {opts.hl && !g && (
        <rect
          x={opts.hl[0]}
          y={opts.hl[1]}
          width={opts.hl[2]}
          height={opts.hl[3]}
          rx={3}
          fill={opts.dark ? "#14181f" : EXIT_YELLOW}
          className="mtr-fade"
          style={{ opacity: mode === "tourist" ? (opts.dark ? 0.12 : 0.22) : 0 }}
        />
      )}
      <text
        x={x}
        y={y}
        fontSize={size}
        letterSpacing={opts.ls ?? 0}
        fill={opts.dark && !g ? "#14181f" : ink}
        fillOpacity={
          opts.dark && !g ? 1 : inkOp(opts.sub ? 0.88 : 1, opts.sub ? 0.4 : 0.55)
        }
        className={fade}
        style={{
          fontFamily: opts.song ? SONG_STACK : "var(--font-sans)",
          opacity: op("text"),
        }}
      >
        {text}
      </text>
    </>
  );

  const arrow = (x: number, y: number, dir: "right" | "up") => {
    const d =
      dir === "right"
        ? `M ${x - 26} ${y} H ${x + 18} M ${x + 6} ${y - 12} L ${x + 20} ${y} L ${x + 6} ${y + 12}`
        : `M ${x} ${y + 22} V ${y - 22} M ${x - 12} ${y - 10} L ${x} ${y - 24} L ${x + 12} ${y - 10}`;
    return (
      <path
        d={d}
        fill="none"
        stroke={ink}
        strokeOpacity={inkOp(0.95, 0.5)}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={fade}
        style={{ opacity: op("shape") }}
      />
    );
  };

  /* Interaction layer: transparent hits + outline chrome per element. */
  const elGroup = (
    id: MtrElementId,
    label: string,
    shapes: React.ReactNode,
  ) => {
    if (ghost) return null;
    const isSel = selected === id;
    return (
      <g
        role="button"
        tabIndex={0}
        aria-label={`${label} — select`}
        aria-pressed={isSel}
        className="mtr-el"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(isSel ? null : id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            onSelect?.(isSel ? null : id);
          }
        }}
      >
        {shapes}
      </g>
    );
  };

  const hitRect = (x: number, y: number, w: number, h: number) => (
    <rect x={x} y={y} width={w} height={h} fill="transparent" />
  );
  const outlineRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    on: boolean,
    dark = false,
  ) => (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={6}
      fill="none"
      stroke={dark ? OUTLINE_DARK : OUTLINE_LIGHT}
      strokeWidth={2.5}
      className={`mtr-outline${on ? " mtr-outline-on" : ""}`}
    />
  );
  const outlineCircle = (cx: number, cy: number, on: boolean) => (
    <circle
      cx={cx}
      cy={cy}
      r={30}
      fill="none"
      stroke={OUTLINE_LIGHT}
      strokeWidth={2.5}
      className={`mtr-outline${on ? " mtr-outline-on" : ""}`}
    />
  );

  const mosaicTiles: React.ReactNode[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 14; col++) {
      mosaicTiles.push(
        <rect
          key={`${row}-${col}`}
          x={40 + col * 18}
          y={400 + row * 18}
          width={15}
          height={15}
          fill={g ? "#c98d9b" : MOSAIC[(row * 3 + col * 5) % 4]}
          fillOpacity={g ? 0.16 : 1}
        />,
      );
    }
  }

  return (
    <svg
      viewBox={`0 0 ${MTR_SIGN_W} ${MTR_SIGN_H}`}
      role={ghost ? undefined : "group"}
      aria-hidden={ghost ? "true" : undefined}
      aria-label={
        ghost
          ? undefined
          : "Stylized MTR directional sign. Six elements are selectable."
      }
      className="block w-full select-none"
      onClick={ghost ? undefined : () => onSelect?.(null)}
    >
      {/* ------------------------- visuals ------------------------- */}
      {/* Board */}
      <rect
        x={40}
        y={24}
        width={880}
        height={356}
        rx={8}
        fill={g ? "var(--atmosphere)" : SIGN_BLACK}
        fillOpacity={g ? 0.05 : 1}
        stroke={g ? "var(--atmosphere)" : "var(--structure)"}
        strokeOpacity={g ? 0.35 : 0.25}
        strokeWidth={1}
        className={fade}
        style={{ opacity: op("backdrop") }}
      />
      {/* Row separators */}
      {[118, 212].map((y) => (
        <line
          key={y}
          x1={64}
          y1={y}
          x2={896}
          y2={y}
          stroke={ink}
          strokeOpacity={inkOp(0.1, 0.12)}
          className={fade}
          style={{ opacity: op("backdrop") }}
        />
      ))}

      {/* Row 1 — Tsuen Wan Line */}
      {disc(96, 71, TSUEN_WAN_RED, "1")}
      {run(146, 66, "荃灣綫", 26, { song: true, hl: [142, 42, 88, 30] })}
      {run(146, 98, "Tsuen Wan Line", 14.5, {
        sub: true,
        ls: 1,
        hl: [142, 84, 132, 18],
      })}
      {arrow(852, 71, "right")}

      {/* Row 2 — Island Line direction, named by terminus */}
      {disc(96, 165, ISLAND_BLUE, "3")}
      {run(146, 160, "上環", 26, { song: true, hl: [142, 136, 64, 30] })}
      {run(146, 192, "Sheung Wan", 14.5, {
        sub: true,
        ls: 1,
        hl: [142, 178, 102, 18],
      })}
      {arrow(858, 165, "up")}

      {/* Row 3 — Tung Chung Line + Airport Express */}
      {disc(96, 262, TUNG_CHUNG_ORANGE, "4")}
      {run(146, 257, "東涌綫", 26, { song: true, hl: [142, 233, 88, 30] })}
      {run(146, 289, "Tung Chung Line", 14.5, {
        sub: true,
        ls: 1,
        hl: [142, 275, 138, 18],
      })}
      {disc(468, 262, AIRPORT_TEAL, null)}
      <path
        d="M 458 268 L 481 262 L 458 256 L 464 262 Z"
        fill={ink}
        fillOpacity={inkOp(1, 0.6)}
        className={fade}
        style={{ opacity: op("shape") }}
      />
      {run(518, 257, "機場快綫", 22, { song: true, hl: [514, 235, 96, 28] })}
      {run(518, 289, "Airport Express", 13.5, {
        sub: true,
        ls: 1,
        hl: [514, 275, 122, 18],
      })}
      {arrow(852, 262, "right")}

      {/* Yellow exit band */}
      <rect
        x={40}
        y={316}
        width={880}
        height={64}
        rx={6}
        fill={g ? "var(--atmosphere)" : EXIT_YELLOW}
        fillOpacity={g ? 0.1 : 1}
        className={fade}
        style={{ opacity: op("shape") }}
      />
      {/* Exit tiles */}
      {[
        { x: 76, letter: "A" },
        { x: 130, letter: "B" },
      ].map(({ x, letter }) => (
        <g key={letter} className={fade} style={{ opacity: op("shape") }}>
          <rect
            x={x}
            y={328}
            width={40}
            height={40}
            rx={4}
            fill={g ? "var(--atmosphere)" : EXIT_YELLOW}
            fillOpacity={g ? 0.08 : 1}
            stroke={g ? "var(--atmosphere)" : "#14181f"}
            strokeOpacity={g ? 0.4 : 1}
            strokeWidth={2.5}
          />
          <text
            x={x + 20}
            y={356}
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill={g ? "var(--atmosphere)" : "#14181f"}
            fillOpacity={g ? 0.55 : 1}
            className={fade}
            style={{ fontFamily: "var(--font-sans)", opacity: op("text") }}
          >
            {letter}
          </text>
        </g>
      ))}
      {run(200, 357, "出口", 25, {
        song: true,
        dark: true,
        hl: [196, 333, 72, 30],
      })}
      {run(276, 356, "Exits", 15, { dark: true, ls: 2, hl: [272, 342, 56, 19] })}
      <text
        x={884}
        y={355}
        textAnchor="end"
        fontSize="12"
        fill={g ? "var(--atmosphere)" : "#14181f"}
        fillOpacity={g ? 0.4 : 0.75}
        className={`mtr-label-tiny ${fade}`}
        style={{ fontFamily: "var(--font-sans)", opacity: op("text") }}
      >
        Des Voeux Road Central · IFC 國際金融中心
      </text>

      {/* Platform mosaic swatch — the Rush Hour payoff */}
      <g className={fade} style={{ opacity: op("mosaic") }}>
        {mosaicTiles}
        <text
          x={310}
          y={428}
          fontSize="20"
          fill={g ? "var(--atmosphere)" : "var(--information)"}
          fillOpacity={g ? 0.5 : 0.85}
          style={{ fontFamily: SONG_STACK }}
        >
          中環
        </text>
        <text
          x={310}
          y={452}
          fontSize="12"
          letterSpacing="1.5"
          fill={g ? "var(--atmosphere)" : "var(--information)"}
          fillOpacity={g ? 0.4 : 0.6}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          CENTRAL — PLATFORM MOSAIC
        </text>
      </g>

      {/* --------------------- interaction layer ------------------- */}
      {/* The yellow block first, so tiles and 出口 win the overlap. */}
      {elGroup(
        "yellow-block",
        "The yellow block",
        <>
          {hitRect(40, 316, 880, 64)}
          {outlineRect(42, 318, 876, 60, selected === "yellow-block", true)}
        </>,
      )}
      {elGroup(
        "platform",
        "Platform number disc",
        <>
          {[71, 165, 262].map((cy) => (
            <circle key={cy} cx={96} cy={cy} r={31} fill="transparent" />
          ))}
          {[71, 165, 262].map((cy) => (
            <g key={`o-${cy}`}>{outlineCircle(96, cy, selected === "platform")}</g>
          ))}
        </>,
      )}
      {elGroup(
        "line-name",
        "Line name label",
        <>
          {hitRect(140, 80, 142, 24)}
          {hitRect(140, 271, 148, 24)}
          {hitRect(510, 271, 132, 24)}
          {outlineRect(138, 78, 146, 26, selected === "line-name")}
          {outlineRect(138, 269, 152, 26, selected === "line-name")}
          {outlineRect(508, 269, 136, 26, selected === "line-name")}
        </>,
      )}
      {elGroup(
        "terminus",
        "Terminus label",
        <>
          {hitRect(140, 174, 108, 24)}
          {outlineRect(138, 172, 112, 26, selected === "terminus")}
        </>,
      )}
      {elGroup(
        "chinese-label",
        "Chinese character label",
        <>
          {hitRect(140, 38, 96, 34)}
          {hitRect(140, 132, 72, 34)}
          {hitRect(140, 229, 96, 34)}
          {hitRect(510, 231, 104, 30)}
          {hitRect(194, 330, 76, 32)}
          {outlineRect(138, 36, 100, 38, selected === "chinese-label")}
          {outlineRect(138, 130, 76, 38, selected === "chinese-label")}
          {outlineRect(138, 227, 100, 38, selected === "chinese-label")}
          {outlineRect(508, 229, 108, 34, selected === "chinese-label")}
          {outlineRect(192, 328, 80, 36, selected === "chinese-label", true)}
        </>,
      )}
      {elGroup(
        "exit-letter",
        "Exit letter",
        <>
          {hitRect(72, 324, 48, 48)}
          {hitRect(126, 324, 48, 48)}
          {outlineRect(70, 322, 52, 52, selected === "exit-letter", true)}
          {outlineRect(124, 322, 52, 52, selected === "exit-letter", true)}
        </>,
      )}
    </svg>
  );
}
