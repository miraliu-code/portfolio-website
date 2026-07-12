"use client";

import { useState } from "react";
import {
  pnAxisLabels,
  type PnCountry,
  type PnAxisScore,
} from "@/lib/content/interactives/professional-norms";
import {
  pnCells,
  pnMeetingBaselines,
  pnSituations,
  type PnSituationId,
} from "@/lib/content/interactives/professional-norms-situations";
import {
  pnCellsTier2,
  pnInterviewBaselineNames,
  pnInterviewBaselines,
  type PnBasicCell,
} from "@/lib/content/interactives/professional-norms-situations-2";

/*
 * The selected country's reading layer: A2 segmentation, A1 coverage +
 * review metadata, the A3 axis profile, and the three built situation
 * cells. Reading order per the schema: the country delta always
 * renders before the regional baseline, and "Largely converged" gets
 * its own visual treatment — a first-class answer, not an absence.
 */

const CONVERGED_RE = /^(Largely converged|Same as Australia)/;

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

/* A field block: label, optional converged badge, tagged body. */
function Field({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  const converged = CONVERGED_RE.test(text);
  return (
    <div className={accent ? "border-l-2 border-interaction/60 pl-4" : ""}>
      <p className="flex flex-wrap items-baseline gap-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-interaction">
        {label}
        {converged && (
          <span className="border border-structure/30 bg-structure/10 px-1.5 py-px font-sans text-[0.55rem] uppercase tracking-[0.12em] text-information/60">
            ✓ Converged
          </span>
        )}
      </p>
      <Tagged
        text={text}
        className="mt-2 font-serif text-sm leading-[1.8] text-information/90"
      />
    </div>
  );
}

function AxisRow({ label, axis }: { label: string; axis: PnAxisScore }) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-x-4 gap-y-1 border-l border-structure/25 py-2 pl-4 md:grid-cols-[minmax(11rem,14rem)_auto_1fr]">
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
        <p className="font-serif text-xs italic leading-relaxed text-information/60 md:col-start-3">
          {axis.note}
        </p>
      )}
    </div>
  );
}

/* Generic cell block for the Tier-2 situations (and negotiation):
   delta first, then whichever optional fields the cell carries. */
function BasicCellBlock({
  countryName,
  cell,
  footer,
}: {
  countryName: string;
  cell: PnBasicCell;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <Field label={`${countryName} delta`} text={cell.delta} />
      {cell.sequence && <Field label="Sequence" text={cell.sequence} />}
      {cell.costlyError && (
        <Field label="The costly error" text={cell.costlyError} accent />
      )}
      {cell.disconfirmingSignal && (
        <Field label="Disconfirming signal" text={cell.disconfirmingSignal} />
      )}
      {cell.readerNote && (
        <div>
          <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/50">
            Reader note
          </p>
          <Tagged
            text={cell.readerNote}
            className="mt-2 font-serif text-sm italic leading-[1.8] text-information/70"
          />
        </div>
      )}
      {footer}
    </>
  );
}

export function PnCountryPanel({ country }: { country: PnCountry }) {
  const [situationId, setSituationId] = useState<PnSituationId>("meeting");
  const cells = pnCells[country.id];
  const tier2 = pnCellsTier2[country.id];
  const situation = pnSituations.find((s) => s.id === situationId)!;

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
          Last reviewed: {country.lastReviewed}
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
        {!situation.deferred && cells && tier2 && (
          <div className="mt-7 max-w-2xl space-y-7">
            {situationId === "meeting" && (
              <>
                <Field
                  label={`${country.name} delta`}
                  text={cells.meeting.delta}
                />
                <Field label="Sequence" text={cells.meeting.sequence} />
                <Field
                  label="The costly error"
                  text={cells.meeting.costlyError}
                  accent
                />
                <Field
                  label="Disconfirming signal"
                  text={cells.meeting.disconfirmingSignal}
                />
                {/* Regional baseline LAST — background, not anchor. */}
                <div className="border-t border-structure/15 pt-5">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/50">
                    Regional pattern —{" "}
                    {pnMeetingBaselines[cells.meeting.baseline].name}
                    {cells.meeting.baselineNote
                      ? ` (${cells.meeting.baselineNote})`
                      : ""}
                  </p>
                  <Tagged
                    text={pnMeetingBaselines[cells.meeting.baseline].text}
                    className="mt-2 font-serif text-sm leading-[1.8] text-information/70"
                  />
                </div>
              </>
            )}

            {situationId === "feedback" && (
              <>
                <Field
                  label="Upward — the consequential one"
                  text={cells.feedback.upward}
                />
                <Field label="Sideways" text={cells.feedback.sideways} />
                <Field label="Downward" text={cells.feedback.downward} />
                <Field
                  label="The costly error"
                  text={cells.feedback.costlyError}
                  accent
                />
                <Field
                  label="Disconfirming signal"
                  text={cells.feedback.disconfirmingSignal}
                />
              </>
            )}

            {situationId === "negotiation" && (
              <BasicCellBlock
                countryName={country.name}
                cell={cells.negotiation}
              />
            )}

            {situationId === "interview" && (
              <BasicCellBlock
                countryName={country.name}
                cell={tier2.interview}
                footer={
                  <div className="border-t border-structure/15 pt-5">
                    <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-information/50">
                      Regional pattern —{" "}
                      {pnInterviewBaselineNames[tier2.interview.baseline]}
                    </p>
                    <Tagged
                      text={pnInterviewBaselines[tier2.interview.baseline]}
                      className="mt-2 font-serif text-sm leading-[1.8] text-information/70"
                    />
                  </div>
                }
              />
            )}

            {situationId === "business-dinner" && (
              <BasicCellBlock
                countryName={country.name}
                cell={tier2["business-dinner"]}
              />
            )}

            {situationId === "presentation" && (
              <BasicCellBlock
                countryName={country.name}
                cell={tier2.presentation}
              />
            )}

            {situationId === "email" && (
              <BasicCellBlock countryName={country.name} cell={tier2.email} />
            )}

            {situationId === "networking" && (
              <BasicCellBlock
                countryName={country.name}
                cell={tier2.networking}
              />
            )}
          </div>
        )}
      </section>
    </div>
  );
}
