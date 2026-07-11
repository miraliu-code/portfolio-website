"use client";

import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { GrowthPoint } from "@/lib/content/interactives/high-speed-rail";

/*
 * Minimal chart treatments: no gridlines, no default palette — thin
 * burgundy line on paper, quiet sans axis labels only where needed.
 */

const axisTick = {
  fontSize: 10,
  fontFamily: "var(--font-montserrat), sans-serif",
  fill: "var(--information)",
  opacity: 0.6,
};

export function HsrGrowthChart({
  data,
  note,
}: {
  data: GrowthPoint[];
  note?: string;
}) {
  return (
    <div>
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/60">
        Network growth (km)
      </p>
      <div className="mt-2 h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 6, right: 8, bottom: 0, left: 0 }}
          >
            <XAxis
              dataKey="year"
              tick={axisTick}
              tickLine={false}
              axisLine={{ stroke: "var(--structure)", strokeOpacity: 0.25 }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={44}
              tickFormatter={(v: number) =>
                v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)
              }
            />
            <Line
              type="monotone"
              dataKey="km"
              stroke="var(--interaction)"
              strokeWidth={1.5}
              dot={{ r: 2, fill: "var(--interaction)", strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {note && (
        <p className="mt-1.5 font-serif text-xs italic text-information/60">
          {note}
        </p>
      )}
    </div>
  );
}

export function HsrCostChart({
  data,
  selectedId,
}: {
  data: { name: string; id: string; cost: number }[];
  selectedId: string;
}) {
  return (
    <div>
      <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/60">
        Construction cost, $M per km — all nine countries
      </p>
      <div className="mt-2 h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 6, right: 8, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="name" tick={false} tickLine={false} axisLine={{ stroke: "var(--structure)", strokeOpacity: 0.25 }} height={4} />
            <YAxis
              tick={axisTick}
              tickLine={false}
              axisLine={false}
              width={36}
            />
            <Bar dataKey="cost" isAnimationActive={false} radius={[1, 1, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={
                    entry.id === selectedId
                      ? "var(--interaction)"
                      : "var(--structure)"
                  }
                  fillOpacity={entry.id === selectedId ? 0.9 : 0.2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1.5 font-serif text-xs italic text-information/60">
        Selected country in burgundy.
      </p>
    </div>
  );
}
