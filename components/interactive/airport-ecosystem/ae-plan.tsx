"use client";

import { useEffect, useState } from "react";
import {
  aeDetailFields,
  aeOrganizations,
  aeZones,
  getAeOrganization,
  getAeZone,
  getAeZoneOrganizations,
} from "@/lib/content/interactives/airport-ecosystem";

/*
 * The terminal floor plan — a stylized, top-down composite of "an
 * airport" (no real airport's geometry). Vertical order tells the
 * story at a glance: aircraft at the top edge, city traffic at the
 * bottom, the security chokepoint pinched between landside and
 * airside. Drawn to the Atlas rules: thin structure-ink linework,
 * whisper fills, interaction color reserved for hover/selection.
 *
 * Ink is parameterized (--ae-ink) so the hero can render the same
 * drawing as a ghost on the Blue Ink panel.
 */

const W = 1000;
const H = 660;

const INK = "var(--ae-ink, var(--structure))";

/* ------------------------------------------------------------------ */
/* Drawing helpers                                                      */
/* ------------------------------------------------------------------ */

/* A parked narrow-body, top view, nose-in toward the terminal
   (nose at the bottom, swept wings toward the tail). */
function Plane({ cx }: { cx: number }) {
  return (
    <g>
      {/* stand centerline */}
      <line
        x1={cx}
        y1={38}
        x2={cx}
        y2={132}
        stroke={INK}
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="5 4"
      />
      {/* wings */}
      <path
        d={`M ${cx - 7} 100 L ${cx - 62} 72 L ${cx - 62} 63 L ${cx - 7} 82 Z`}
        fill={INK}
        fillOpacity="0.09"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx + 7} 100 L ${cx + 62} 72 L ${cx + 62} 63 L ${cx + 7} 82 Z`}
        fill={INK}
        fillOpacity="0.09"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* tailplane */}
      <path
        d={`M ${cx - 6} 56 L ${cx - 26} 45 L ${cx - 26} 40 L ${cx - 6} 47 Z`}
        fill={INK}
        fillOpacity="0.09"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d={`M ${cx + 6} 56 L ${cx + 26} 45 L ${cx + 26} 40 L ${cx + 6} 47 Z`}
        fill={INK}
        fillOpacity="0.09"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* engines */}
      <rect
        x={cx - 26}
        y={84}
        width={7}
        height={13}
        rx={3}
        fill="var(--atmosphere)"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <rect
        x={cx + 19}
        y={84}
        width={7}
        height={13}
        rx={3}
        fill="var(--atmosphere)"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      {/* fuselage — blunt nose toward the terminal, tapered tail */}
      <path
        d={`M ${cx} 140
            C ${cx - 6.5} 136 ${cx - 7} 127 ${cx - 7} 118
            L ${cx - 7} 66
            C ${cx - 7} 52 ${cx - 4.5} 43 ${cx} 38
            C ${cx + 4.5} 43 ${cx + 7} 52 ${cx + 7} 66
            L ${cx + 7} 118
            C ${cx + 7} 127 ${cx + 6.5} 136 ${cx} 140 Z`}
        fill="var(--atmosphere)"
        stroke={INK}
        strokeOpacity="0.75"
        strokeWidth="1.1"
      />
      {/* cockpit windshield tick */}
      <line
        x1={cx - 3.5}
        y1={130}
        x2={cx + 3.5}
        y2={130}
        stroke={INK}
        strokeOpacity="0.55"
        strokeWidth="1"
      />
    </g>
  );
}

/* Jet bridge from the pier wall to the aircraft's forward door. */
function JetBridge({ cx }: { cx: number }) {
  return (
    <g>
      <path
        d={`M ${cx - 44} 152 L ${cx - 44} 140 L ${cx - 12} 126`}
        fill="none"
        stroke={INK}
        strokeOpacity="0.55"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
      <path
        d={`M ${cx - 44} 152 L ${cx - 44} 140 L ${cx - 12} 126`}
        fill="none"
        stroke="var(--atmosphere)"
        strokeOpacity="0.9"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="butt"
      />
      <circle
        cx={cx - 44}
        cy={140}
        r={5}
        fill="var(--atmosphere)"
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
    </g>
  );
}

/* A ground-service vehicle: a small labeled-by-shape rect. */
function Vehicle({
  x,
  y,
  w = 13,
  h = 8,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={1.5}
      fill="var(--atmosphere)"
      stroke={INK}
      strokeOpacity="0.55"
      strokeWidth="1"
    />
  );
}

/* Waiting-area seating: comb-style bench rows (a spine with seat
   ticks), two banks per row with an aisle between. */
function SeatRows({ cx }: { cx: number }) {
  const rows = [172, 184, 196];
  const banks: [number, number][] = [
    [cx - 52, cx - 8],
    [cx + 4, cx + 48],
  ];
  return (
    <g stroke={INK} strokeOpacity="0.45" strokeWidth="1">
      {rows.map((y) =>
        banks.map(([x1, x2]) => (
          <g key={`${y}${x1}`}>
            <line x1={x1} y1={y} x2={x2} y2={y} />
            {Array.from({ length: Math.floor((x2 - x1) / 8) + 1 }, (_, i) => (
              <line
                key={i}
                x1={x1 + i * 8}
                y1={y}
                x2={x1 + i * 8}
                y2={y + 4}
              />
            ))}
          </g>
        )),
      )}
    </g>
  );
}

/* A queue of people: small dots along a path. */
function QueueDots({ points }: { points: [number, number][] }) {
  return (
    <g fill={INK} fillOpacity="0.5">
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.7} />
      ))}
    </g>
  );
}

function ZoneLabel({
  x,
  y,
  children,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "end";
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
      fontSize="9"
      letterSpacing="1.2"
      fill={INK}
      fillOpacity="0.5"
      className="ae-label-tiny"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------ */
/* The illustration (static linework, aria-hidden)                     */
/* ------------------------------------------------------------------ */

function TerminalArt() {
  const gates = [220, 500, 780];
  return (
    <g aria-hidden="true">
      {/* ============ RAMP / APRON (top band) ============ */}
      {/* apron ground */}
      <rect
        x={36}
        y={10}
        width={928}
        height={140}
        fill={INK}
        fillOpacity="0.025"
      />
      {/* taxiway centerline with lead-ins to each stand */}
      <line
        x1={48}
        y1={34}
        x2={952}
        y2={34}
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeDasharray="9 6"
      />
      {gates.map((cx) => (
        <path
          key={cx}
          d={`M ${cx - 24} 34 Q ${cx} 34 ${cx} 46`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="6 5"
        />
      ))}
      {/* stand envelopes (corner ticks) */}
      {gates.map((cx) => (
        <g key={cx} stroke={INK} strokeOpacity="0.3" strokeWidth="1">
          <path d={`M ${cx - 78} 46 h 10 M ${cx - 78} 46 v 10`} fill="none" />
          <path d={`M ${cx + 78} 46 h -10 M ${cx + 78} 46 v 10`} fill="none" />
          <path d={`M ${cx - 78} 144 h 10 M ${cx - 78} 144 v -10`} fill="none" />
          <path d={`M ${cx + 78} 144 h -10 M ${cx + 78} 144 v -10`} fill="none" />
        </g>
      ))}
      {gates.map((cx) => (
        <g key={cx}>
          <Plane cx={cx} />
          <JetBridge cx={cx} />
        </g>
      ))}
      {/* ground service: baggage train, fuel truck, catering, tugs */}
      <g>
        <Vehicle x={262} y={116} />
        <Vehicle x={279} y={116} />
        <Vehicle x={296} y={116} />
        <line
          x1={275}
          y1={120}
          x2={279}
          y2={120}
          stroke={INK}
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <line
          x1={292}
          y1={120}
          x2={296}
          y2={120}
          stroke={INK}
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* belt loader against plane 1 */}
        <line
          x1={234}
          y1={112}
          x2={252}
          y2={119}
          stroke={INK}
          strokeOpacity="0.55"
          strokeWidth="3"
        />
        <Vehicle x={540} y={104} w={16} h={9} />
        <TinyLabel x={548} y={102} anchor="middle">
          FUEL
        </TinyLabel>
        <Vehicle x={696} y={112} w={14} h={9} />
        <Vehicle x={836} y={104} />
      </g>
      <ZoneLabel x={60} y={24}>
        RAMP / TURNAROUND
      </ZoneLabel>

      {/* ============ TERMINAL SHELL ============ */}
      {/* airside pier (full width) + landside block (inset) */}
      <path
        d={`M 48 152 L 952 152 L 952 300 L 900 300 L 900 548 L 100 548 L 100 300 L 48 300 Z`}
        fill={INK}
        fillOpacity="0.02"
        stroke={INK}
        strokeOpacity="0.8"
        strokeWidth="1.6"
      />
      {/* gate doors punched through the pier wall (drawn as gaps) */}
      {gates.map((cx) => (
        <line
          key={cx}
          x1={cx - 50}
          y1={152}
          x2={cx - 38}
          y2={152}
          stroke="var(--atmosphere)"
          strokeWidth="3"
        />
      ))}
      {/* window ticks along the pier wall between gates */}
      <g stroke={INK} strokeOpacity="0.25" strokeWidth="1">
        {[70, 120, 310, 360, 410, 590, 640, 690].map((x) => (
          <line key={x} x1={x} y1={156} x2={x + 26} y2={156} />
        ))}
      </g>
      {/* sterile boundary: the airside/landside line, with openings at
          the security exit and the immigration entrance */}
      <g stroke={INK} strokeOpacity="0.45" strokeWidth="1.2">
        <line x1={100} y1={302} x2={150} y2={302} />
        <line x1={420} y1={302} x2={640} y2={302} />
        <line x1={892} y1={302} x2={900} y2={302} />
      </g>

      {/* ============ GATES / BOARDING ============ */}
      {gates.map((cx, i) => (
        <g key={cx}>
          <SeatRows cx={cx} />
          {/* gate desk by the door */}
          <rect
            x={cx - 66}
            y={160}
            width={20}
            height={8}
            fill="var(--atmosphere)"
            stroke={INK}
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <TinyLabel x={cx - 2} y={214} anchor="middle">
            {`GATE A${i + 1}`}
          </TinyLabel>
          {/* boarding queue toward the door */}
          <QueueDots
            points={[
              [cx - 60, 176],
              [cx - 63, 184],
              [cx - 59, 192],
              [cx - 63, 200],
            ]}
          />
        </g>
      ))}
      {/* Gate A4: vacant stand — turnaround gap made visible */}
      <g>
        <SeatRows cx={893} />
        <rect
          x={827}
          y={160}
          width={20}
          height={8}
          fill="var(--atmosphere)"
          stroke={INK}
          strokeOpacity="0.6"
          strokeWidth="1"
        />
        <line
          x1={843}
          y1={152}
          x2={855}
          y2={152}
          stroke="var(--atmosphere)"
          strokeWidth="3"
        />
        <TinyLabel x={893} y={214} anchor="middle">
          GATE A4
        </TinyLabel>
        {/* empty stand envelope on the ramp */}
        <line
          x1={899}
          y1={50}
          x2={899}
          y2={132}
          stroke={INK}
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="5 4"
        />
        <g stroke={INK} strokeOpacity="0.22" strokeWidth="1">
          <path d={`M 852 50 h 10 M 852 50 v 10`} fill="none" />
          <path d={`M 946 50 h -10 M 946 50 v 10`} fill="none" />
          <path d={`M 852 144 h 10 M 852 144 v -10`} fill="none" />
          <path d={`M 946 144 h -10 M 946 144 v -10`} fill="none" />
        </g>
      </g>
      <ZoneLabel x={64} y={172}>
        GATES /
      </ZoneLabel>
      <ZoneLabel x={64} y={188}>
        BOARDING
      </ZoneLabel>

      {/* ============ RETAIL & CONCESSIONS ============ */}
      {/* shop units opening onto the concourse */}
      {[
        { x: 210, label: "CAFÉ" },
        { x: 318, label: "BOOKS" },
        { x: 426, label: "DUTY FREE" },
        { x: 534, label: "PHARMACY" },
      ].map((shop) => (
        <g key={shop.x}>
          <path
            d={`M ${shop.x} 244 L ${shop.x} 290 L ${shop.x + 96} 290 L ${shop.x + 96} 244 M ${shop.x + 70} 244 L ${shop.x + 96} 244 M ${shop.x} 244 L ${shop.x + 26} 244`}
            fill={INK}
            fillOpacity="0.03"
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          {/* counter */}
          <line
            x1={shop.x + 10}
            y1={272}
            x2={shop.x + 52}
            y2={272}
            stroke={INK}
            strokeOpacity="0.45"
            strokeWidth="2.5"
          />
          <TinyLabel x={shop.x + 48} y={260}>
            {shop.label}
          </TinyLabel>
        </g>
      ))}
      {/* food-court tables at the east end */}
      <g stroke={INK} strokeOpacity="0.45" strokeWidth="1" fill="none">
        {[
          [694, 262],
          [738, 276],
          [782, 260],
          [826, 276],
          [868, 262],
        ].map(([x, y]) => (
          <g key={`${x}${y}`}>
            <circle cx={x} cy={y} r={7} />
            <line x1={x - 11} y1={y} x2={x - 8} y2={y} />
            <line x1={x + 8} y1={y} x2={x + 11} y2={y} />
          </g>
        ))}
      </g>
      <TinyLabel x={781} y={296}>
        FOOD COURT
      </TinyLabel>
      {/* ATMs at the quiet west end */}
      <g>
        {[116, 134].map((x) => (
          <rect
            key={x}
            x={x}
            y={248}
            width={11}
            height={11}
            fill="var(--atmosphere)"
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        ))}
        <TinyLabel x={130} y={272} anchor="middle">
          ATM
        </TinyLabel>
      </g>
      <ZoneLabel x={64} y={292}>
        RETAIL
      </ZoneLabel>

      {/* ============ SECURITY SCREENING (chokepoint) ============ */}
      {/* flanking walls — heavy bars so the open lanes read narrow */}
      <g fill={INK} fillOpacity="0.35">
        <rect x={100} y={330} width={64} height={9} />
        <rect x={208} y={330} width={44} height={9} />
        <rect x={296} y={330} width={44} height={9} />
        <rect x={384} y={330} width={220} height={9} />
      </g>
      {/* three lanes: x-ray belt + walk-through posts */}
      {[186, 274, 362].map((x) => (
        <g key={x}>
          {/* x-ray belt through the wall */}
          <rect
            x={x - 22}
            y={316}
            width={16}
            height={38}
            fill="var(--atmosphere)"
            stroke={INK}
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <g stroke={INK} strokeOpacity="0.35" strokeWidth="1">
            <line x1={x - 20} y1={324} x2={x - 8} y2={324} />
            <line x1={x - 20} y1={332} x2={x - 8} y2={332} />
            <line x1={x - 20} y1={340} x2={x - 8} y2={340} />
            <line x1={x - 20} y1={348} x2={x - 8} y2={348} />
          </g>
          {/* walk-through arch: two posts in plan view */}
          <g stroke={INK} strokeOpacity="0.7" strokeWidth="2">
            <line x1={x + 6} y1={330} x2={x + 6} y2={339} />
            <line x1={x + 15} y1={330} x2={x + 15} y2={339} />
          </g>
          {/* flow arrow, landside → airside */}
          <path
            d={`M ${x + 10.5} 356 L ${x + 10.5} 346 M ${x + 7} 349.5 L ${x + 10.5} 345.5 L ${x + 14} 349.5`}
            fill="none"
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
        </g>
      ))}
      {/* serpentine queue on the landside approach */}
      <path
        d={`M 140 362 L 430 362 M 430 356 L 150 356 M 150 350 L 430 350`}
        fill="none"
        stroke={INK}
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <QueueDots
        points={[
          [176, 362],
          [214, 362],
          [258, 362],
          [318, 362],
          [388, 356],
          [330, 356],
          [268, 356],
          [214, 350],
          [282, 350],
        ]}
      />
      <ZoneLabel x={116} y={314}>
        SECURITY SCREENING
      </ZoneLabel>

      {/* ============ IMMIGRATION / CUSTOMS ============ */}
      {/* wall between security and immigration */}
      <line
        x1={610}
        y1={300}
        x2={610}
        y2={372}
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1.4"
      />
      {/* booth row with lanes between */}
      <g>
        {[664, 728, 792, 856].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y={326}
              width={14}
              height={18}
              fill="var(--atmosphere)"
              stroke={INK}
              strokeOpacity="0.65"
              strokeWidth="1"
            />
            <line
              x1={x + 3}
              y1={335}
              x2={x + 11}
              y2={335}
              stroke={INK}
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            {/* stop line in the lane beside the booth */}
            <line
              x1={x + 22}
              y1={322}
              x2={x + 34}
              y2={322}
              stroke={INK}
              strokeOpacity="0.45"
              strokeWidth="1.4"
              strokeDasharray="3 2"
            />
            {/* flow arrow, airside → landside (arrivals) */}
            <path
              d={`M ${x + 28} 348 L ${x + 28} 358 M ${x + 24.5} 354.5 L ${x + 28} 358.5 L ${x + 31.5} 354.5`}
              fill="none"
              stroke={INK}
              strokeOpacity="0.5"
              strokeWidth="1.2"
            />
          </g>
        ))}
        {/* arrivals queue above the booths */}
        <QueueDots
          points={[
            [690, 314],
            [716, 310],
            [754, 314],
            [782, 310],
            [818, 314],
            [846, 310],
          ]}
        />
      </g>
      <ZoneLabel x={628} y={314}>
        IMMIGRATION / CUSTOMS
      </ZoneLabel>

      {/* ============ CHECK-IN / TICKETING ============ */}
      {[
        { x: 128, y: 400 },
        { x: 128, y: 436 },
        { x: 520, y: 400 },
        { x: 520, y: 436 },
      ].map((island) => (
        <g key={`${island.x}${island.y}`}>
          <rect
            x={island.x}
            y={island.y}
            width={310}
            height={16}
            fill="var(--atmosphere)"
            stroke={INK}
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <g stroke={INK} strokeOpacity="0.35" strokeWidth="1">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <line
                key={i}
                x1={island.x + 13 + i * 26}
                y1={island.y}
                x2={island.x + 13 + i * 26}
                y2={island.y + 16}
              />
            ))}
          </g>
        </g>
      ))}
      {/* self-service kiosk cluster between the counter groups */}
      <g>
        {[
          [458, 404],
          [474, 404],
          [458, 420],
          [474, 420],
          [458, 436],
          [474, 436],
        ].map(([x, y]) => (
          <rect
            key={`${x}${y}`}
            x={x}
            y={y}
            width={9}
            height={9}
            fill="var(--atmosphere)"
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        ))}
      </g>
      {/* queues in front of the counters */}
      <QueueDots
        points={[
          [176, 426],
          [210, 424],
          [252, 427],
          [306, 425],
          [568, 426],
          [612, 424],
          [668, 427],
          [730, 425],
          [790, 426],
        ]}
      />
      <ZoneLabel x={116} y={392}>
        CHECK-IN / TICKETING
      </ZoneLabel>

      {/* ============ BAGGAGE HANDLING ============ */}
      {/* wall separating the hall from the bag level */}
      <line
        x1={100}
        y1={472}
        x2={900}
        y2={472}
        stroke={INK}
        strokeOpacity="0.5"
        strokeWidth="1"
        strokeDasharray="7 5"
      />
      {/* bag room: sorter loop with roller ticks */}
      <rect
        x={124}
        y={492}
        width={380}
        height={40}
        rx={20}
        fill="none"
        stroke={INK}
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <rect
        x={140}
        y={502}
        width={348}
        height={20}
        rx={10}
        fill="none"
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <g stroke={INK} strokeOpacity="0.3" strokeWidth="1">
        {[170, 220, 270, 320, 370, 420, 458].map((x) => (
          <line key={x} x1={x} y1={492} x2={x} y2={502} />
        ))}
      </g>
      {/* bags on the belt */}
      <g fill={INK} fillOpacity="0.45">
        {[
          [196, 495],
          [288, 495],
          [388, 526],
          [442, 495],
        ].map(([x, y]) => (
          <rect key={`${x}${y}`} x={x} y={y} width={8} height={5} rx={1} />
        ))}
      </g>
      {/* wall between bag room and claim hall */}
      <line
        x1={560}
        y1={472}
        x2={560}
        y2={548}
        stroke={INK}
        strokeOpacity="0.6"
        strokeWidth="1.4"
      />
      {/* claim carousels: racetrack belts */}
      {[600, 764].map((x) => (
        <g key={x}>
          <rect
            x={x}
            y={490}
            width={128}
            height={44}
            rx={22}
            fill="none"
            stroke={INK}
            strokeOpacity="0.6"
            strokeWidth="1.4"
          />
          <rect
            x={x + 12}
            y={500}
            width={104}
            height={24}
            rx={12}
            fill="none"
            stroke={INK}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        </g>
      ))}
      {/* passengers waiting at the carousels */}
      <QueueDots
        points={[
          [612, 544],
          [648, 546],
          [692, 544],
          [778, 546],
          [820, 544],
          [858, 546],
        ]}
      />
      {/* feed line from the bag room to the carousels */}
      <path
        d={`M 504 512 L 560 512 M 560 512 L 600 512`}
        fill="none"
        stroke={INK}
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      {/* bag tunnel out to the ramp, running outside the west wall */}
      <path
        d={`M 124 512 L 40 512 L 40 100`}
        fill="none"
        stroke={INK}
        strokeOpacity="0.28"
        strokeWidth="1.2"
        strokeDasharray="5 4"
      />
      <path
        d={`M 35 108 L 40 98 L 45 108`}
        fill="none"
        stroke={INK}
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      <ZoneLabel x={116} y={488}>
        BAG ROOM
      </ZoneLabel>
      <TinyLabel x={664} y={486} anchor="middle">
        BAGGAGE CLAIM
      </TinyLabel>

      {/* ============ CURBSIDE / GROUND TRANSPORT ============ */}
      {/* terminal doors (gaps + slide ticks) */}
      {[260, 500, 740].map((x) => (
        <g key={x}>
          <line
            x1={x - 15}
            y1={548}
            x2={x + 15}
            y2={548}
            stroke="var(--atmosphere)"
            strokeWidth="3.5"
          />
          <line
            x1={x - 15}
            y1={548}
            x2={x + 15}
            y2={548}
            stroke={INK}
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
        </g>
      ))}
      {/* canopy over the curb */}
      <line
        x1={160}
        y1={560}
        x2={840}
        y2={560}
        stroke={INK}
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="10 6"
      />
      {/* sidewalk */}
      <rect
        x={36}
        y={548}
        width={928}
        height={30}
        fill={INK}
        fillOpacity="0.03"
      />
      {/* crossing at the middle door */}
      <g stroke={INK} strokeOpacity="0.35" strokeWidth="4">
        {[488, 496, 504, 512].map((x) => (
          <line key={x} x1={x} y1={580} x2={x} y2={600} />
        ))}
      </g>
      {/* roadway */}
      <line
        x1={36}
        y1={578}
        x2={964}
        y2={578}
        stroke={INK}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <line
        x1={36}
        y1={636}
        x2={964}
        y2={636}
        stroke={INK}
        strokeOpacity="0.5"
        strokeWidth="1.2"
      />
      <line
        x1={44}
        y1={607}
        x2={956}
        y2={607}
        stroke={INK}
        strokeOpacity="0.3"
        strokeWidth="1"
        strokeDasharray="12 9"
      />
      {/* vehicles */}
      <g>
        {/* taxi rank */}
        <Vehicle x={276} y={586} w={26} h={12} />
        <Vehicle x={312} y={586} w={26} h={12} />
        <rect
          x={284}
          y={590}
          width={10}
          height={4}
          fill={INK}
          fillOpacity="0.4"
        />
        <rect
          x={320}
          y={590}
          width={10}
          height={4}
          fill={INK}
          fillOpacity="0.4"
        />
        <TinyLabel x={300} y={584} anchor="middle">
          TAXI
        </TinyLabel>
        {/* bus, opposite direction lane */}
        <Vehicle x={596} y={614} w={52} h={14} />
        <g stroke={INK} strokeOpacity="0.35" strokeWidth="1">
          <line x1={604} y1={614} x2={604} y2={628} />
          <line x1={616} y1={614} x2={616} y2={628} />
          <line x1={628} y1={614} x2={628} y2={628} />
        </g>
        <TinyLabel x={622} y={611} anchor="middle">
          BUS
        </TinyLabel>
        {/* private car dropping off */}
        <Vehicle x={800} y={586} w={26} h={12} />
        {/* rail link at the west end */}
        <g>
          <line
            x1={56}
            y1={620}
            x2={196}
            y2={620}
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <line
            x1={56}
            y1={627}
            x2={196}
            y2={627}
            stroke={INK}
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <g stroke={INK} strokeOpacity="0.35" strokeWidth="1">
            {[68, 84, 100, 116, 132, 148, 164, 180].map((x) => (
              <line key={x} x1={x} y1={618} x2={x} y2={629} />
            ))}
          </g>
          <TinyLabel x={126} y={614} anchor="middle">
            RAIL LINK
          </TinyLabel>
        </g>
      </g>
      <ZoneLabel x={44} y={572}>
        CURBSIDE
      </ZoneLabel>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Zone hit regions (drawn above the art)                              */
/* ------------------------------------------------------------------ */

interface ZoneShape {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const ZONE_SHAPES: ZoneShape[] = [
  { id: "ramp", x: 36, y: 10, w: 928, h: 138 },
  { id: "gates", x: 54, y: 156, w: 892, h: 74 },
  { id: "retail", x: 54, y: 234, w: 892, h: 62 },
  { id: "security", x: 104, y: 302, w: 498, h: 66 },
  { id: "immigration", x: 616, y: 302, w: 280, h: 66 },
  { id: "check-in", x: 104, y: 376, w: 792, h: 92 },
  { id: "baggage", x: 104, y: 474, w: 792, h: 70 },
  { id: "curbside", x: 36, y: 552, w: 928, h: 88 },
];

/* ------------------------------------------------------------------ */
/* Public components                                                    */
/* ------------------------------------------------------------------ */

/* Ghost rendering for the hero: same drawing, atmosphere ink. */
export function AeTerminalGhost() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-40 md:w-[105%]"
      style={
        {
          /* Ghost mode: Floral White linework over the Blue Ink panel.
             --ae-ink must be a literal — it can't reference
             --atmosphere, which is overridden to transparent here so
             the drawing reads as pure line, no solid fills. */
          "--ae-ink": "#fffdf8",
          "--atmosphere": "transparent",
        } as React.CSSProperties
      }
    >
      <TerminalArt />
    </svg>
  );
}

/* Small pill button shared by the org selector and the pivot chips. */
function Chip({
  active = false,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
        active
          ? "border-interaction bg-interaction text-atmosphere"
          : "border-structure/35 text-information/80 hover:border-interaction hover:text-interaction"
      }`}
    >
      {children}
    </button>
  );
}

/* One field of the four-field detail panel. */
function DetailField({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
        {label}
      </p>
      <p className="mt-2 font-serif text-sm leading-[1.8] text-information/90">
        {text}
      </p>
    </div>
  );
}

type AeSelection = { kind: "zone" | "org"; id: string } | null;

/* The Explore section: org selector, floor plan with
   cross-highlighting, and the four-field detail panel. */
export function AeFloorPlan() {
  const [selection, setSelection] = useState<AeSelection>(null);
  const selectedZone =
    selection?.kind === "zone" ? getAeZone(selection.id) : null;
  const selectedOrg =
    selection?.kind === "org" ? getAeOrganization(selection.id) : null;
  /* Cross-highlighting: an organization lights every zone it touches. */
  const litZones = selectedOrg ? new Set(selectedOrg.zones) : null;

  const selectZone = (id: string) =>
    setSelection((prev) =>
      prev?.kind === "zone" && prev.id === id ? null : { kind: "zone", id },
    );
  const selectOrg = (id: string) =>
    setSelection((prev) =>
      prev?.kind === "org" && prev.id === id ? null : { kind: "org", id },
    );

  /* Escape deselects, matching the globe. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelection(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="border border-structure/20 bg-atmosphere">
      {/* Organization selector — the second axis into the same system. */}
      <div className="border-b border-structure/20 px-5 py-4 md:px-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-3 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
            Organizations
          </span>
          {aeOrganizations.map((org) => (
            <Chip
              key={org.id}
              active={selection?.kind === "org" && selection.id === org.id}
              onClick={() => selectOrg(org.id)}
            >
              {org.name}
            </Chip>
          ))}
        </div>
        {selectedOrg ? (
          <p className="mt-3 font-serif text-sm italic leading-relaxed text-information/70">
            {selectedOrg.name} touches {selectedOrg.zones.length} of the 8
            zones — highlighted on the plan below.
          </p>
        ) : (
          /* The two click categories, named plainly: orgs and zones are
             different kinds of node, but both open the same panel. */
          <p className="mt-3 max-w-3xl font-serif text-sm italic leading-relaxed text-information/60">
            Two ways in: choose an organization above to light every zone it
            operates, or choose a zone of the terminal to see who runs it —
            either way, the panel beneath the plan opens with the detail.
          </p>
        )}
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="group"
        aria-label="Stylized airport terminal floor plan. Eight zones are selectable; selecting an organization highlights every zone it operates in."
        className="block w-full select-none"
      >
        {/* background click = deselect */}
        <rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill="transparent"
          onClick={() => setSelection(null)}
        />
        <TerminalArt />
        {ZONE_SHAPES.map((shape) => {
          const zone = getAeZone(shape.id)!;
          const isSelected =
            selection?.kind === "zone" && selection.id === shape.id;
          const isLit = litZones?.has(shape.id) ?? false;
          return (
            <rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.w}
              height={shape.h}
              rx={4}
              role="button"
              tabIndex={0}
              aria-label={`${zone.name} — select`}
              aria-pressed={isSelected}
              className={`ae-zone cursor-pointer focus:outline-none ${
                isSelected ? "ae-zone-selected" : isLit ? "ae-zone-lit" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                selectZone(shape.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectZone(shape.id);
                }
              }}
            />
          );
        })}
        {/* The vacant stand's callout, restored from Phase 1 — now an
            entry point into the turnaround content instead of a bare
            assertion. */}
        <g
          role="button"
          tabIndex={0}
          aria-label="Next aircraft in 40 minutes — open Ramp / Aircraft Turnaround"
          className="ae-callout ae-label-tiny cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setSelection({ kind: "zone", id: "ramp" });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelection({ kind: "zone", id: "ramp" });
            }
          }}
        >
          <text
            x={899}
            y={94}
            textAnchor="middle"
            fontSize="9"
            letterSpacing="1.2"
            fill={INK}
            fillOpacity="0.55"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            NEXT AIRCRAFT · 40 MIN
          </text>
          <line
            x1={848}
            y1={99}
            x2={950}
            y2={99}
            stroke={INK}
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </g>
      </svg>

      {/* Detail panel — the four-field structure for either node kind. */}
      <div className="min-h-[5.5rem] border-t border-structure/20 px-5 py-5 md:px-7">
        {!selection && (
          <p className="font-serif text-sm italic leading-relaxed text-information/60">
            Eight zones of the terminal are selectable — from the curb to the
            ramp. Choose one, or choose an organization above to see its
            footprint.
          </p>
        )}

        {selectedZone && (
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <p className="font-serif text-xl leading-snug text-information">
                {selectedZone.name}
              </p>
              <button
                type="button"
                onClick={() => setSelection(null)}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
              >
                Reset
              </button>
            </div>
            <p className="mt-1.5 max-w-2xl font-serif text-sm italic leading-relaxed text-information/75">
              {selectedZone.blurb}
            </p>
            {/* Who runs it — each tag pivots into that organization. */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/50">
                Run by
              </span>
              {getAeZoneOrganizations(selectedZone.id).map((org) => (
                <Chip key={org.id} onClick={() => selectOrg(org.id)}>
                  {org.name}
                </Chip>
              ))}
            </div>
            <div className="mt-7 grid max-w-4xl gap-x-10 gap-y-6 md:grid-cols-2">
              {aeDetailFields.map(({ key, label }) => (
                <DetailField
                  key={key}
                  label={label}
                  text={selectedZone.detail[key]}
                />
              ))}
            </div>
          </div>
        )}

        {selectedOrg && (
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <p className="font-serif text-xl leading-snug text-information">
                {selectedOrg.name}
              </p>
              <button
                type="button"
                onClick={() => setSelection(null)}
                className="shrink-0 font-sans text-xs uppercase tracking-[0.2em] text-information/60 transition-colors hover:text-interaction"
              >
                Reset
              </button>
            </div>
            <p className="mt-1.5 max-w-2xl font-serif text-sm italic leading-relaxed text-information/75">
              {selectedOrg.role}
            </p>
            {/* Footprint — each tag pivots into that zone. */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/50">
                Footprint — {selectedOrg.zones.length}{" "}
                {selectedOrg.zones.length === 1 ? "zone" : "zones"}
              </span>
              {selectedOrg.zones.map((zoneId) => (
                <Chip key={zoneId} onClick={() => selectZone(zoneId)}>
                  {getAeZone(zoneId)!.name}
                </Chip>
              ))}
            </div>
            <div className="mt-7 grid max-w-4xl gap-x-10 gap-y-6 md:grid-cols-2">
              {aeDetailFields.map(({ key, label }) => (
                <DetailField
                  key={key}
                  label={label}
                  text={selectedOrg.detail[key]}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Jump rows: all fifteen nodes by name (the Professional Norms
          lens-bar treatment), grouped under explicit ZONES and
          ORGANIZATIONS sub-labels so the two click categories never
          read as one undifferentiated set. Runs the identical
          selection path as the plan and the org chips, toggle
          included. */}
      <nav
        aria-label="All zones and organizations"
        className="space-y-3 border-t border-structure/20 px-5 py-4 md:px-7"
      >
        <div className="md:flex md:flex-wrap md:items-baseline md:gap-x-5 md:gap-y-1">
          <p className="mb-1.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70 md:mb-0 md:w-32 md:shrink-0">
            Zones
          </p>
          <div className="grid grid-cols-2 gap-x-6 md:contents">
            {aeZones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => selectZone(zone.id)}
                aria-pressed={
                  selection?.kind === "zone" && selection.id === zone.id
                }
                className={`py-1.5 text-left font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                  selection?.kind === "zone" && selection.id === zone.id
                    ? "text-interaction underline underline-offset-4"
                    : "text-information/60 hover:text-interaction"
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>
        </div>
        <div className="md:flex md:flex-wrap md:items-baseline md:gap-x-5 md:gap-y-1">
          <p className="mb-1.5 font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70 md:mb-0 md:w-32 md:shrink-0">
            Organizations
          </p>
          <div className="grid grid-cols-2 gap-x-6 md:contents">
            {aeOrganizations.map((org) => (
              <button
                key={org.id}
                type="button"
                onClick={() => selectOrg(org.id)}
                aria-pressed={
                  selection?.kind === "org" && selection.id === org.id
                }
                className={`py-1.5 text-left font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                  selection?.kind === "org" && selection.id === org.id
                    ? "text-interaction underline underline-offset-4"
                    : "text-information/60 hover:text-interaction"
                }`}
              >
                {org.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export { aeZones };
