/*
 * The protected intersection, drawn top-down — the documented Davis
 * geometry (corner refuge islands, advanced stop lines, setback
 * crossings) as an annotated plan diagram. Static illustration,
 * server-rendered; the section's text carries the content.
 */

const ASPHALT = "#4a5765";
const RED = "#a34e3e";
const LAND = "#eae4d6";
const GRASS = "#93a184";
const CONCRETE = "#cfc9ba";
const GLYPH = "#3c4756";
const PAINT = "#f2efe6";

function TopCar({
  x,
  y,
  rot = 0,
}: {
  x: number;
  y: number;
  rot?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-23} y={-12} width={46} height={24} rx={7} fill={GLYPH} />
      <line x1={6} y1={-9} x2={6} y2={9} stroke={PAINT} strokeOpacity={0.85} strokeWidth={2.5} />
      <line x1={-12} y1={-9} x2={-12} y2={9} stroke={PAINT} strokeOpacity={0.5} strokeWidth={2} />
    </g>
  );
}

function TopCyclist({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <line x1={-9} y1={0} x2={9} y2={0} stroke={GLYPH} strokeWidth={3} strokeLinecap="round" />
      <circle cx={0} cy={0} r={4} fill={GLYPH} />
    </g>
  );
}

function Note({
  x,
  y,
  toX,
  toY,
  text,
  anchor = "start",
}: {
  x: number;
  y: number;
  toX: number;
  toY: number;
  text: string;
  anchor?: "start" | "end";
}) {
  return (
    <g>
      <line x1={x} y1={y - 4} x2={toX} y2={toY} stroke={GLYPH} strokeOpacity={0.45} strokeWidth={1} />
      <circle cx={toX} cy={toY} r={2.2} fill={GLYPH} fillOpacity={0.6} />
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fontSize="10.5"
        letterSpacing="1.2"
        fill="var(--information)"
        fillOpacity={0.75}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {text}
      </text>
    </g>
  );
}

export function DcIntersectionDiagram() {
  return (
    <svg
      viewBox="0 0 960 470"
      aria-hidden="true"
      className="block w-full select-none"
    >
      {/* land quadrants */}
      <rect x={40} y={30} width={880} height={410} fill={LAND} />
      {/* roads */}
      <rect x={40} y={185} width={880} height={110} fill={ASPHALT} />
      <rect x={430} y={30} width={110} height={410} fill={ASPHALT} />
      {/* centre lines */}
      {[80, 150, 220, 700, 770, 840].map((x) => (
        <rect key={x} x={x} y={238.5} width={26} height={3} fill={PAINT} fillOpacity={0.55} />
      ))}
      {[60, 110, 380, 400].map((y) => (
        <rect key={y} x={483.5} y={y} width={3} height={22} fill={PAINT} fillOpacity={0.55} />
      ))}
      {/* grass verges between road and cycle paths */}
      <rect x={40} y={158} width={880} height={12} fill={GRASS} fillOpacity={0.6} />
      <rect x={40} y={310} width={880} height={12} fill={GRASS} fillOpacity={0.6} />
      <rect x={398} y={30} width={12} height={410} fill={GRASS} fillOpacity={0.6} />
      <rect x={560} y={30} width={12} height={410} fill={GRASS} fillOpacity={0.6} />
      {/* cycle paths: a red ring offset from both roads */}
      <rect x={40} y={132} width={880} height={26} fill={RED} />
      <rect x={40} y={322} width={880} height={26} fill={RED} />
      <rect x={372} y={30} width={26} height={410} fill={RED} />
      <rect x={572} y={30} width={26} height={410} fill={RED} />
      {/* crossing markings where cycle paths cross the carriageways */}
      {[
        { x: 372, y: 185, w: 26, h: 110 },
        { x: 572, y: 185, w: 26, h: 110 },
      ].map((c, i) => (
        <g key={`v${i}`}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} fill={RED} fillOpacity={0.85} />
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={j} x={c.x - 5} y={c.y + 8 + j * 22} width={4} height={9} fill={PAINT} fillOpacity={0.9} />
          ))}
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={`r${j}`} x={c.x + c.w + 1} y={c.y + 8 + j * 22} width={4} height={9} fill={PAINT} fillOpacity={0.9} />
          ))}
        </g>
      ))}
      {[
        { x: 430, y: 132, w: 110, h: 26 },
        { x: 430, y: 322, w: 110, h: 26 },
      ].map((c, i) => (
        <g key={`h${i}`}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} fill={RED} fillOpacity={0.85} />
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={j} x={c.x + 8 + j * 22} y={c.y - 5} width={9} height={4} fill={PAINT} fillOpacity={0.9} />
          ))}
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={`b${j}`} x={c.x + 8 + j * 22} y={c.y + c.h + 1} width={9} height={4} fill={PAINT} fillOpacity={0.9} />
          ))}
        </g>
      ))}
      {/* corner refuge islands: four concrete quarter-round wedges */}
      <g fill={CONCRETE} stroke={GLYPH} strokeOpacity={0.4} strokeWidth={1.2}>
        <path d="M 404 170 L 426 170 Q 426 192 404 192 Q 412 181 404 170 Z" transform="translate(0 0)" />
        <path d="M 556 170 L 534 170 Q 534 192 556 192 Q 548 181 556 170 Z" />
        <path d="M 404 310 L 426 310 Q 426 288 404 288 Q 412 299 404 310 Z" />
        <path d="M 556 310 L 534 310 Q 534 288 556 288 Q 548 299 556 310 Z" />
      </g>
      {/* advanced stop lines: the cyclist's bar on the red path sits
          ahead of the traffic's bar on the carriageway */}
      <rect x={352} y={186} width={4} height={52} fill={PAINT} fillOpacity={0.9} />
      <rect x={332} y={186} width={4} height={52} fill={PAINT} fillOpacity={0.35} />
      {/* vehicles: a car held to the wide slow turn; cyclists on paths */}
      <TopCar x={200} y={212} />
      <path
        d="M 250 212 Q 420 212 470 300 "
        fill="none"
        stroke="#6b2d3a"
        strokeWidth={2.2}
        strokeDasharray="7 6"
        markerEnd="url(#dc-arrow)"
      />
      <defs>
        <marker id="dc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b2d3a" />
        </marker>
      </defs>
      <TopCyclist x={300} y={145} />
      <TopCyclist x={385} y={90} rot={90} />
      <TopCar x={488} y={80} rot={90} />
      {/* annotations */}
      <Note x={70} y={62} toX={412} toY={180} text="CORNER REFUGE ISLAND × 4" />
      <Note x={890} y={62} toX={585} toY={145} text="CYCLE PATH, SET BACK FROM THE ROAD" anchor="end" />
      <Note x={70} y={430} toX={354} toY={230} text="ADVANCED STOP LINE" />
      <Note x={890} y={430} toX={585} toY={296} text="SETBACK CROSSING · ONE CAR LENGTH" anchor="end" />
    </svg>
  );
}
