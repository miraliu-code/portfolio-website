"use client";

import { useState } from "react";
import {
  pnAxisLabels,
  getPnLens,
  getPnTier,
  type PnCountry,
  type PnAxisScore,
} from "@/lib/content/interactives/professional-norms";
import {
  pnBaselines,
  pnCells,
  pnSituations,
  type PnSituationId,
} from "@/lib/content/interactives/professional-norms-situations";

/*
 * The selected country's reading layer (Phase 2): A2 segmentation,
 * A1 coverage + review metadata, the A3 axis profile, and the three
 * built situation cells. Reading order per the editorial rules: the
 * country delta always renders before the regional baseline.
 */

/* Inline confidence tags — [Reported] etc. — render as quiet chips. */
function Tagged({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(
    /\[(Well-established|Reported|Contested|Dated)\]/g,
  );
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span
            key={i}
            className="ml-1 mr-0.5 inline-block -translate-y-px border border-structure/25 px-1.5 py-px align-middle font-sans text-[0.55rem] uppercase tracking-[0.12em] text-information/55"
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.3em] text-information/70">
      {children}
    </h4>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
      {children}
    </p>
  );
}

function AxisRow({ label, axis }: { label: string; axis: PnAxisScore }) {
  return (
    <div className="grid grid-cols-[minmax(9rem,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-l border-structure/25 py-2 pl-4 md:grid-cols-[minmax(11rem,14rem)_auto_1fr]">
      <p className="font-sans text-xs tracking-wide text-information/90">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => {
            const inRange =
              axis.range && i >= axis.range[0] && i <= axis.range[1];
            return (
              <span
                key={i}
                className={`inline-block h-2 w-2 rounded-full ${
                  i <= axis.score
                    ? "bg-interaction"
                    : inRange
                      ? "border border-interaction/50"
                      : "bg-structure/20"
                }`}
              />
            );
          })}
        </span>
        <span className="font-sans text-[0.65rem] tabular-nums text-information/70">
          {axis.score}
          {axis.range ? ` (${axis.range[0]}–${axis.range[1]})` : ""}
        </span>
        <span className="border border-structure/25 px-1.5 py-px font-sans text-[0.5rem] uppercase tracking-[0.12em] text-information/55">
          {axis.confidence}
        </span>
      </div>
      {axis.note && (
        <p className="col-span-2 font-serif text-xs italic leading-relaxed text-information/60 md:col-span-1 md:col-start-3">
          {axis.note}
        </p>
      )}
    </div>
  );
}

export function PnCountryPanel({ country }: { country: PnCountry }) {
  const [situationId, setSituationId] = useState<PnSituationId>("meeting");
  const cells = pnCells[country.id];
  const situation = pnSituations.find((s) => s.id === situationId)!;
  const groupingLens = getPnLens(situation.groupingLensId);
  const tier = getPnTier(groupingLens, country.id);
  const baseline =
    !situation.deferred && tier
      ? pnBaselines[situationId as "meeting" | "feedback" | "negotiation"][
          tier.id
        ]
      : null;

  const deltaBody = "font-serif text-sm leading-[1.8] text-information/90";
  const quietBody = "font-serif text-sm leading-[1.8] text-information/70";

  return (
    <div className="space-y-9 border-t border-structure/20 px-5 py-8 md:px-7">
      {/* A2 — who the page describes (first: it scopes everything). */}
      <section>
        <SectionLabel>Who this page describes</SectionLabel>
        <p className="mt-3 max-w-2xl font-serif text-sm leading-[1.8] text-information/90">
          {country.segmentation}
        </p>
      </section>

      {/* A1 — coverage honesty + review metadata. */}
      <section>
        <SectionLabel>Coverage</SectionLabel>
        <p className="mt-3 max-w-2xl font-serif text-sm italic leading-[1.8] text-information/75">
          {country.coverage}
        </p>
        <p className="mt-2 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-information/50">
          Last reviewed: {country.lastReviewed} · Reviewed by:{" "}
          {country.reviewedBy}
        </p>
      </section>

      {/* A3 — the seven axes. */}
      <section>
        <SectionLabel>The seven axes</SectionLabel>
        <div className="mt-4 max-w-3xl space-y-1">
          {pnAxisLabels.map(({ key, label }) => (
            <AxisRow key={key} label={label} axis={country.axes[key]} />
          ))}
        </div>
        <p className="mt-3 font-serif text-xs italic text-information/55">
          1–5 per axis; hollow dots mark the in-country range. Higher =
          more direct, faster, more contract-literal, stricter.
        </p>
      </section>

      {/* Situations. */}
      <section>
        <SectionLabel>Situations</SectionLabel>
        <div className="mt-4 flex flex-wrap gap-2">
          {pnSituations.map((s) => (
            <button
              key={s.id}
              type="button"
              disabled={s.deferred}
              onClick={() => setSituationId(s.id)}
              aria-pressed={situationId === s.id}
              title={s.deferred ? "In development" : undefined}
              className={`border px-3 py-1.5 font-sans text-xs tracking-wide transition-colors motion-reduce:transition-none ${
                situationId === s.id
                  ? "border-interaction bg-interaction text-atmosphere"
                  : s.deferred
                    ? "cursor-not-allowed border-structure/20 text-information/35"
                    : "border-structure/35 text-information/80 hover:border-interaction hover:text-interaction"
              }`}
            >
              {s.name}
              {s.deferred ? " ·" : ""}
            </button>
          ))}
        </div>
        <p className="mt-2 font-serif text-xs italic text-information/50">
          Dotted situations are in development.
        </p>

        {!situation.deferred && cells && (
          <div className="mt-7 max-w-2xl space-y-7">
            {/* Country delta first — the editorial rule. */}
            {situationId === "meeting" && (
              <div>
                <FieldLabel>{country.name} delta</FieldLabel>
                <Tagged text={cells.meeting.delta} className={`mt-2 ${deltaBody}`} />
              </div>
            )}
            {situationId === "negotiation" && (
              <div>
                <FieldLabel>{country.name} delta</FieldLabel>
                <Tagged
                  text={cells.negotiation.delta}
                  className={`mt-2 ${deltaBody}`}
                />
              </div>
            )}
            {situationId === "feedback" && (
              <div className="space-y-5">
                <div>
                  <FieldLabel>Upward — the one that varies most</FieldLabel>
                  <Tagged
                    text={cells.feedback.upward}
                    className={`mt-2 ${deltaBody}`}
                  />
                </div>
                <div>
                  <FieldLabel>Sideways</FieldLabel>
                  <Tagged
                    text={cells.feedback.sideways}
                    className={`mt-2 ${deltaBody}`}
                  />
                </div>
                <div>
                  <FieldLabel>Downward</FieldLabel>
                  <Tagged
                    text={cells.feedback.downward}
                    className={`mt-2 ${deltaBody}`}
                  />
                </div>
              </div>
            )}

            {(() => {
              const cell =
                situationId === "meeting"
                  ? cells.meeting
                  : situationId === "feedback"
                    ? cells.feedback
                    : cells.negotiation;
              return (
                <>
                  <div>
                    <FieldLabel>Sequence</FieldLabel>
                    <Tagged
                      text={cell.sequence}
                      className={`mt-2 ${deltaBody}`}
                    />
                  </div>
                  <div className="border-l-2 border-interaction/60 pl-4">
                    <FieldLabel>The costly error</FieldLabel>
                    <Tagged
                      text={cell.costlyError}
                      className={`mt-2 ${deltaBody}`}
                    />
                  </div>
                  <div>
                    <FieldLabel>Disconfirming signal</FieldLabel>
                    <Tagged
                      text={cell.disconfirmingSignal}
                      className={`mt-2 ${deltaBody}`}
                    />
                  </div>
                </>
              );
            })()}

            {/* Regional baseline LAST — background, not anchor. */}
            {baseline && tier && (
              <div className="border-t border-structure/15 pt-5">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/50">
                  Regional pattern — {tier.name} tier (
                  {groupingLens.name.toLowerCase()})
                </p>
                <Tagged text={baseline} className={`mt-2 ${quietBody}`} />
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
