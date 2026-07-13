/*
 * Professional Norms — situation cells (Phase 2, calibrated against
 * "Country page schema — v2" and populated with the editor-supplied
 * final text). Three of eight situations at full depth: Meeting,
 * Feedback, Negotiation. The other five are deferred.
 *
 * Structure per the schema:
 * - Meeting baselines are written once per grouping (A–D, grouped by
 *   Hierarchy in the Room + Disagreement Expression together), not
 *   per lens tier and not per country.
 * - Deltas render BEFORE baselines. "Largely converged" is a
 *   first-class answer and gets its own visual treatment in the UI.
 * - Feedback carries three sub-views (upward is 70% of the cell and
 *   leads); no sequence field.
 * - Negotiation is scoped to distinctly-negotiation moments only; six
 *   countries share a converged block.
 * - Every claim carries a confidence tag; banned-vocabulary rules per
 *   the schema apply throughout.
 */

export type PnSituationId =
  | "meeting"
  | "feedback"
  | "negotiation"
  | "interview"
  | "business-dinner"
  | "presentation"
  | "email"
  | "networking";

export interface PnSituationDef {
  id: PnSituationId;
  name: string;
  deferred?: boolean;
}

export const pnSituations: PnSituationDef[] = [
  { id: "meeting", name: "Meeting" },
  { id: "feedback", name: "Feedback" },
  { id: "negotiation", name: "Negotiation" },
  { id: "interview", name: "Interview" },
  { id: "business-dinner", name: "Business Dinner" },
  { id: "presentation", name: "Presentation" },
  { id: "email", name: "Follow-up in writing" },
  { id: "networking", name: "Meeting someone new" },
];

/* ---------------------------------------------------------------- */
/* Meeting baselines: A–D, grouped by hierarchy + disagreement       */
/* ---------------------------------------------------------------- */

export type PnMeetingBaselineId = "a" | "b" | "c" | "d";

export const pnMeetingBaselines: Record<
  PnMeetingBaselineId,
  { name: string; text: string }
> = {
  a: {
    name: "Baseline A — flat, direct",
    text: "Whoever has the relevant answer speaks, regardless of title. The first ten minutes are used to state purpose and move into substance. Silence is filled quickly, often by the most junior person in the room.",
  },
  b: {
    name: "Baseline B — ranked, indirect",
    text: "The most senior person present speaks least and last. The first ten minutes establish who everyone is before any business surfaces. Silence after a statement is not an invitation to fill it.",
  },
  c: {
    name: "Baseline C — ranked, moderated directness",
    text: "Seniority is visible in seating and speaking order but does not prevent direct exchange. The first ten minutes move quickly to the stated agenda.",
  },
  d: {
    name: "Baseline D — relational, softened hierarchy",
    text: "Business begins only after a personal exchange that isn't treated as preamble. Seating and speaking order matter less than in Baseline B, but the senior person still closes the meeting.",
  },
};

/* ---------------------------------------------------------------- */
/* Cells                                                              */
/* ---------------------------------------------------------------- */

export interface PnMeetingCell {
  baseline: PnMeetingBaselineId;
  baselineNote?: string; // e.g. "sharper", "consensus-modified"
  delta: string;
  sequence: string;
  costlyError: string;
  disconfirmingSignal: string;
}

export interface PnFeedbackCell {
  upward: string; // leads — the highest-variance sub-view
  sideways: string;
  downward: string;
  costlyError: string;
  disconfirmingSignal: string;
}

export interface PnNegotiationCell {
  delta: string;
  sequence?: string;
  costlyError?: string;
  disconfirmingSignal?: string;
}

export interface PnCountryCells {
  meeting: PnMeetingCell;
  feedback: PnFeedbackCell;
  negotiation: PnNegotiationCell;
}

/* Shared negotiation block for the six converged countries. There is
   no negotiation A–D system; the Anglo pattern functions as the
   baseline here and is named as a pattern, not as one country's.
   The deferral note rides along wherever decision locus scores low —
   Switzerland (2, federated) and Sweden (1, the dataset's most
   consensus-bound) — because "empowered to close directly" is not
   true of those two without it. */
/* Exported for the converged-block consistency check in
   professional-norms-situations-2.ts. */
export const NEGOTIATION_ANGLO_BASELINE =
  "Largely converged with the Anglo negotiation baseline — first offers function as real anchors, silence is often tactical rather than emotional, and counterparties are frequently empowered to close directly. [Reported]";
const NEGOTIATION_DEFERRAL_NOTE =
  " Significant delta: Swiss and Swedish counterparties often cannot close alone — the decision is federated across stakeholders or taken back to the group — so treat a Swiss or Swedish 'let me confirm with the team' as genuine process, not a tactic. [Reported]";

export const pnCells: Record<string, PnCountryCells> = {
  "united-states": {
    meeting: {
      baseline: "a",
      delta:
        "Largely converged. [Well-established] One notable variant: in procurement-led enterprise sales, the person speaking most may not be the decision-maker — watch for who asks about implementation detail rather than price.",
      sequence:
        "Minute 0: handshake, first names, seats taken without ceremony. Minute 3: stated purpose. Minute 15: substance, interruption common. Minute 45: next steps assigned to named owners before the room breaks. [Well-established]",
      costlyError:
        "Waiting to be invited to speak. Silence is read as having nothing to add, not as respect. [Well-established]",
      disconfirmingSignal:
        "If the room defers visibly to one person's seniority before they've said anything, you're likely in a more hierarchical sub-sector (finance, government contracting) — read Baseline C instead. [Reported]",
    },
    feedback: {
      upward:
        "Contradicting a senior person in the room is common in flatter organizations (tech, startups) and normal even publicly; in more hierarchical sectors (finance, government contracting) it's expected to happen but framed as a question rather than a statement. [Well-established]",
      sideways:
        "Peer criticism can happen in the room, though softened with positive framing first ('sandwich' pattern common but not universal). [Reported]",
      downward:
        "Largely converged — direct, delivered promptly, often in writing afterward for documentation. [Well-established]",
      costlyError:
        "Softening upward disagreement so much that it isn't registered as disagreement at all — directness is expected, not punished. [Reported]",
      disconfirmingSignal:
        "If junior staff visibly defer without pushback in a US meeting, you're likely in a specific hierarchical sub-sector, not the general norm. [Contested]",
    },
    negotiation: {
      delta:
        "The first offer is often a real anchor point, not a formality — negotiators expect real movement from it but not dramatic movement. [Well-established]",
      sequence:
        "Silence after a number is often a tactic, not discomfort — holding it can extract a better offer. The person across the table frequently has real authority to close. [Well-established]",
      costlyError:
        "Filling silence after stating your number — this concedes value for no reason. [Well-established]",
      disconfirmingSignal:
        "If your counterparty repeatedly says they need to 'check with someone,' they may be a channel, not a decision-maker — recalibrate expectations for pace. [Reported]",
    },
  },

  ireland: {
    meeting: {
      baseline: "d",
      delta:
        "The personal exchange before business is longer than the Anglo baseline suggests, and often carried through humor rather than direct questions about family or background. [Reported]",
      sequence:
        "Minute 0–5: rapport via humor, often self-deprecating. Minute 5: business surfaces, introduced gently rather than announced. Minute 20: substance, interruption present but softened. [Reported]",
      costlyError:
        "Treating the humor as filler and rushing past it — it's doing real relationship work. [Reported]",
      disconfirmingSignal:
        "If business is raised in the first 60 seconds, you're likely in Dublin's financial-services or tech segment, where pace runs closer to the US pattern than the professional-services norm. [Contested]",
    },
    feedback: {
      upward:
        "Contradicting a senior person happens, but is usually phrased as a question or a joke rather than a flat statement. [Reported]",
      sideways:
        "Peer critique tends to happen privately, afterward, rather than in the room. [Reported]",
      downward:
        "Largely converged with a lighter touch — often delivered with humor to soften directness. [Reported]",
      costlyError:
        "Reading the humor as the whole message and missing the substantive critique inside it. [Reported]",
      disconfirmingSignal:
        "Direct, unhedged pushback in the room suggests a trading-floor or tech-sector context rather than the professional-services norm. [Contested]",
    },
    negotiation: {
      delta:
        NEGOTIATION_ANGLO_BASELINE +
        " Minor delta: at the Irish subsidiary of a US or UK multinational, the person across the table may need sign-off from a non-Irish HQ — ask early where authority actually sits. [Reported]",
    },
  },

  australia: {
    meeting: {
      baseline: "a",
      delta:
        "Largely converged, with one addition: opening self-promotion by anyone in the room, including the most senior person, is muted deliberately. [Reported]",
      sequence:
        "Minute 0: in formal, public-sector, or larger corporate settings, proceedings commonly open with an Acknowledgement of Country — a short statement recognizing the Traditional Owners of the land — and significant occasions may open with a Welcome to Country delivered by a Traditional Owner. [Well-established] Otherwise: informal greeting, first names immediately. Minute 3: purpose stated plainly. Minute 15: direct exchange, disagreement common and undramatic. [Reported]",
      costlyError:
        "Opening with a credentials-heavy introduction. It reads as insecure, not impressive. [Reported]",
      disconfirmingSignal:
        "If someone opens by listing their title and background unprompted, you're likely in a banking or consulting context where credential display runs closer to the US register. [Contested]",
    },
    feedback: {
      upward:
        "Contradicting a senior person is normal and not treated as remarkable — self-important reactions to being challenged are viewed poorly. [Well-established]",
      sideways:
        "Peer critique happens openly, often in group settings, without much softening. [Reported]",
      downward: "Largely converged, direct and prompt. [Reported]",
      costlyError:
        "A senior person visibly punishing someone for direct pushback — this damages their own standing more than the challenger's. [Reported]",
      disconfirmingSignal:
        "A room where junior staff never openly disagree suggests a more traditionally hierarchical sub-sector — banking, parts of government — rather than the general norm. [Contested]",
    },
    negotiation: {
      delta: NEGOTIATION_ANGLO_BASELINE,
    },
  },

  "new-zealand": {
    meeting: {
      baseline: "a",
      delta:
        "Largely converged with the flat, direct baseline, with one distinct addition: the room tends to ask more questions about the visitor before proceeding — a one-sided pitch is noticed. [Reported] Where the counterparty is an iwi-affiliated enterprise or a public-sector body, tikanga Māori shapes the opening: expect a mihi (formal greeting and introductions), and on significant occasions a pōwhiri (formal welcome) — follow your host's lead. [Reported]",
      sequence:
        "Minute 0: informal greeting — or, in public-sector and iwi-affiliated settings, a mihi that is part of the meeting, not preamble to it. Minute 0–5: mutual questions; the room asks about you before you pitch. Minute 5: purpose stated plainly, direct exchange follows. [Reported]",
      costlyError:
        "Treating the meeting as a one-way presentation rather than an exchange. [Reported]",
      disconfirmingSignal:
        "If the room proceeds straight to your agenda without asking anything back, you may be reading a more transaction-oriented sub-sector (e.g., finance) rather than the general norm. [Contested]",
    },
    feedback: {
      upward:
        "Openly challenging a senior person is normal, with a strong expectation that the challenge is grounded in genuine curiosity rather than assertion for its own sake. [Reported]",
      sideways:
        "Largely converged — peer critique happens openly and undramatically. [Reported]",
      downward: "Largely converged. [Reported]",
      costlyError:
        "Pushing back purely to demonstrate confidence rather than because of a genuine point — this is noticed and read poorly, and in a market this small the impression travels. [Reported]",
      disconfirmingSignal:
        "A room where junior staff never openly disagree suggests a more formal sub-sector rather than the general norm. [Contested]",
    },
    negotiation: {
      delta:
        NEGOTIATION_ANGLO_BASELINE +
        " Minor delta: consensus-leaning rooms are common here — a counterparty may take the close back to colleagues before confirming; treat that as process, not hesitation. [Reported]",
    },
  },

  germany: {
    meeting: {
      baseline: "c",
      delta:
        "Titles and academic credentials (particularly doctorates) are used in introductions and referenced through the meeting — this is sharper than the general baseline. [Well-established]",
      sequence:
        "Minute 0: formal greeting, titles used. Minute 3: agenda stated, often previously circulated and expected to be read. Minute 15: direct, sometimes pointed critique of a proposal, delivered in the room. [Well-established]",
      costlyError:
        "Arriving without having read circulated material — this reads as a lack of seriousness, not a minor oversight. [Well-established]",
      disconfirmingSignal:
        "If the agenda is loose and the tone is informal from the outset, you're likely with a Berlin-style startup, not a Mittelstand corporate. [Reported]",
    },
    feedback: {
      upward:
        "Contradicting a senior person is acceptable when backed by expertise or evidence — the objection needs substance, not just disagreement. [Well-established]",
      sideways:
        "Peer criticism of a proposal happening in the room, in front of others, is normal and does not signal the relationship is at risk. [Well-established]",
      downward:
        "Direct and detailed, often delivered with specific reasoning rather than general encouragement. [Well-established]",
      costlyError:
        "Reading in-room criticism of a proposal as a sign the deal is failing — it usually isn't. [Well-established]",
      disconfirmingSignal:
        "A senior person visibly displeased by a well-evidenced challenge suggests an atypical, more rigid individual or organization, not the general norm. [Reported]",
    },
    negotiation: {
      delta:
        "The first offer is typically close to the real position — large opening gaps are viewed as a lack of seriousness rather than a normal opening tactic. [Well-established]",
      sequence:
        "Movement from the initial position tends to be smaller and slower than the US baseline; documentation of each step is expected. [Well-established]",
      costlyError:
        "Opening with an aggressively low or high anchor — this can damage credibility for the rest of the negotiation. [Well-established]",
      disconfirmingSignal:
        "A counterparty opening far from their real position and expecting large moves is negotiating outside the Mittelstand register — recalibrate before assuming your own anchor strategy. [Reported]",
    },
  },

  switzerland: {
    meeting: {
      baseline: "c",
      delta:
        "Similar directness to Germany, but discretion is valued highly — references to other clients or relationships are avoided even when relevant. [Reported]",
      sequence:
        "Minute 0: formal, precise greeting. Minute 3: agenda, closely followed. Minute 15: substantive discussion, disagreement stated but without elaboration on why it matters to other relationships. [Reported]",
      costlyError:
        "Naming other clients or deals to build credibility — reads as indiscreet. [Reported]",
      disconfirmingSignal:
        "If the counterparty volunteers information about other clients unprompted, you may be with a Geneva or Zug trading house rather than a traditional corporate — discretion norms are at their strictest in private banking. [Contested]",
    },
    feedback: {
      upward:
        "Contradicting a senior person is acceptable with sufficient precision and evidence; vague objections land poorly regardless of hierarchy. [Reported]",
      sideways:
        "Similar to Germany, though delivered with more restraint and less publicly. [Reported]",
      downward:
        "Direct, precise, and typically documented afterward. [Reported]",
      costlyError:
        "An imprecise or emotionally framed objection, even if correct, being dismissed for its lack of rigor. [Reported]",
      disconfirmingSignal:
        "Loud, public disagreement without documentation afterward suggests a trading-floor or startup context rather than the corporate and private-banking norm. [Contested]",
    },
    negotiation: {
      delta: NEGOTIATION_ANGLO_BASELINE + NEGOTIATION_DEFERRAL_NOTE,
    },
  },

  netherlands: {
    meeting: {
      baseline: "a",
      baselineNote: "sharper",
      delta:
        "The sharpest disagreement-expression in this dataset — unsolicited critique of a proposal within minutes of meeting is common and is a sign of engagement, not hostility. [Well-established]",
      sequence:
        "Minute 0: informal, direct greeting. Minute 3: purpose stated. Minute 5–10: direct pushback on specifics, sometimes before the full pitch is finished. [Well-established]",
      costlyError:
        "Treating early pushback as a sign the deal is failing — it usually signals genuine interest. [Well-established]",
      disconfirmingSignal:
        "If the room stays quiet through your full presentation without interjecting, that is the unusual signal here, not the norm — worth asking directly what they think. [Reported]",
    },
    feedback: {
      upward:
        "Contradicting a senior person openly, in the room, is genuinely normal and not treated as risky — flat hierarchy extends fully into feedback. [Well-established]",
      sideways:
        "Peer criticism happens openly and immediately, without waiting for a private moment. [Well-established]",
      downward:
        "Direct, immediate, unhedged — the cluster outlier. [Well-established]",
      costlyError:
        "Softening disagreement so heavily it isn't registered — the Dutch expectation is bluntness, and hedging reads as evasive. [Well-established]",
      disconfirmingSignal:
        "Visible discomfort at open upward disagreement suggests a foreign-owned or non-Dutch-led organization. [Reported]",
    },
    negotiation: {
      delta: NEGOTIATION_ANGLO_BASELINE,
    },
  },

  sweden: {
    meeting: {
      baseline: "a",
      baselineNote: "consensus-modified",
      delta:
        "Disagreement is expressed, but rarely by interrupting — the room tends to let a point finish before responding, and decisions are framed collectively even when one person clearly holds authority. [Well-established]",
      sequence:
        "Minute 0: informal but unhurried. Minute 5: purpose stated. Minute 15 onward: discussion circles collaboratively rather than resolving quickly to a single voice. [Well-established]",
      costlyError:
        "Pushing for an individual verbal commitment in the room — the real decision is typically made after, with others not present. [Well-established]",
      disconfirmingSignal:
        "If one person visibly commits on the spot without reference to colleagues, you may be dealing with a small founder-led company rather than a larger consensus-run organization. [Reported]",
    },
    feedback: {
      upward:
        "Contradicting a senior person is acceptable but is typically framed as a shared question rather than a direct challenge — flat hierarchy here runs through consensus-building, not confrontation. [Well-established]",
      sideways:
        "Peer critique tends to happen in group discussion rather than one-on-one confrontation, framed as building toward consensus. [Well-established]",
      downward:
        "Delivered gently, often framed collaboratively rather than as correction. [Well-established]",
      costlyError:
        "A sharp, individually-framed challenge to a senior person, even if correct, can read as socially discordant rather than constructive. [Reported]",
      disconfirmingSignal:
        "Blunt, individually-delivered criticism without group framing suggests a smaller founder-led company diverging from the norm. [Reported]",
    },
    negotiation: {
      delta: NEGOTIATION_ANGLO_BASELINE + NEGOTIATION_DEFERRAL_NOTE,
    },
  },

  china: {
    meeting: {
      baseline: "b",
      delta:
        "Who speaks first and who is introduced first typically track organizational seniority closely — more so at state-owned enterprises than at founder-led tech companies, where the founder may speak first and informally regardless of others' titles. [Reported]",
      sequence:
        "Minute 0: business cards exchanged with both hands. Minute 3–5: seniority-led introductions. Minute 10: substance begins, often framed as the first step in an ongoing relationship rather than a single transaction. [Well-established]",
      costlyError:
        "Expecting a concrete commitment from this first meeting — it's commonly understood as relationship-building, not closing. [Well-established]",
      disconfirmingSignal:
        "If the founder or most senior person speaks first, informally, and invites direct pushback, you're likely with a founder-led tech company, not a state-owned or legacy firm. [Reported]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person in the room is rare at state-owned enterprises; some founder-led tech companies have a markedly different, flatter internal culture where this is normal. [Reported]",
      sideways:
        "Peer critique in the room is uncommon in more traditional organizations; direct and immediate in some fast-moving tech firms. [Reported]",
      downward:
        "Largely converged with indirection in state-owned or legacy firms; considerably more direct in founder-led tech companies. [Reported]",
      costlyError:
        "Assuming the whole country shares one register — the delta between a state-owned enterprise and a founder-led tech company here is as large as the delta between countries elsewhere in this guide. [Well-established]",
      disconfirmingSignal:
        "A founder speaking bluntly and inviting direct challenge signals you're in the tech/startup segment, not the state-owned/legacy one. [Reported]",
    },
    negotiation: {
      delta:
        "Whether the first offer is real, and whether the counterparty is empowered to close, varies sharply by whether you're negotiating with a state-owned enterprise (often a channel to a longer internal process) or a founder-led company (often empowered and fast). [Well-established]",
      sequence:
        "In state-owned contexts, expect the visible negotiator to relay rather than decide. In founder-led contexts, the founder may negotiate and close directly, quickly. [Reported]",
      costlyError:
        "Assuming a slow state-owned process means the deal is struggling, and conceding to speed it up. [Well-established]",
      disconfirmingSignal:
        "Fast, personally-authorized counteroffers signal a founder-led context; slow, deferred responses signal a state-owned or legacy one. [Reported]",
    },
  },

  japan: {
    meeting: {
      baseline: "b",
      delta:
        "In a first meeting with a large legacy manufacturer or trading company, the most senior person present speaks least, and the decision is made outside the room. 'We will consider it internally' usually means no; detailed implementation questions usually mean yes. In a Tokyo software company under ten years old, almost none of this applies, and the meeting resembles Baseline A. [Well-established]",
      sequence:
        "Cards exchanged standing, before anyone sits. Seating is not arbitrary — wait to be placed. Business begins within about five minutes. Silence after your proposal is normal. [Well-established]",
      costlyError:
        "Filling the silence. Foreign negotiators commonly concede on price into a pause that meant nothing. [Well-established]",
      disconfirmingSignal:
        "If your counterparty pushes back openly in the first meeting, you're likely in the younger-company segment — re-read Baseline A instead. [Well-established]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person in the room is rare in legacy organizations; disagreement is signaled through a delay, a change of subject, or a phrase like 'that may be difficult,' not a flat no. In younger tech companies this is substantially less true. [Well-established]",
      sideways:
        "Peer critique, if it happens, tends to happen outside the room, afterward, rather than in front of the group. [Well-established]",
      downward:
        "Largely converged with indirect delivery — critique is often paired closely with acknowledgment of effort. [Reported]",
      costlyError:
        "Missing an indirect no and proceeding as though the answer was yes. [Well-established]",
      disconfirmingSignal:
        "A senior person openly and immediately challenged in the room, without visible discomfort from others, signals a younger tech organization. [Well-established]",
    },
    negotiation: {
      delta:
        "The person across the table is very often a channel to a consensus process happening elsewhere, not the decision-maker — this is the single most expensive misread in this entire guide: reading that consensus process as stalling, and discounting your own price against it. [Well-established]",
      sequence:
        "Silence after a number is normal and does not signal rejection or discomfort — it often means the number is being genuinely considered internally. [Well-established]",
      costlyError:
        "Discounting your price because the response is slow or silent — the slowness reflects process, not disinterest. [Well-established]",
      disconfirmingSignal:
        "A counterparty who counters quickly and personally, without deferring to 'checking internally,' is likely empowered to close directly — recalibrate toward a faster pace. [Well-established]",
    },
  },

  "south-korea": {
    meeting: {
      baseline: "b",
      delta:
        "Age and seniority are often established directly and early, because they determine speaking order for the rest of the meeting. Startups and younger companies diverge from this meaningfully. [Well-established]",
      sequence:
        "Minute 0: business cards exchanged, seniority quickly established through introductions. Minute 5: business begins, most senior voice leads. Real follow-up discussion often happens later, in a social setting, not in this room. [Well-established]",
      costlyError:
        "Assuming the meeting itself is where the relationship is actually built — it's often the after-hours gathering that does that work. [Well-established]",
      disconfirmingSignal:
        "If age/seniority questions don't arise and the room proceeds informally, you're likely with a fast-growing startup rather than a legacy conglomerate. [Reported]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person in the room is rare and carries real social cost in legacy organizations; age and tenure strongly shape who can challenge whom, and how. [Well-established]",
      sideways:
        "Peer critique in the room is uncommon in legacy conglomerates (chaebol); more common in flat startup structures. [Reported]",
      downward:
        "Largely converged with Japan's indirection, though increasingly direct in startups. [Reported]",
      costlyError:
        "A junior employee directly contradicting a senior one in public, in a traditional organization, damaging their own standing regardless of being correct. [Well-established]",
      disconfirmingSignal:
        "Open, immediate upward pushback without visible discomfort suggests a startup context, not a legacy conglomerate. [Reported]",
    },
    negotiation: {
      delta:
        "Similar consensus-channel dynamic to Japan in legacy conglomerate (chaebol) contexts; considerably faster and more directly authorized in startup contexts. [Reported]",
      sequence:
        "In chaebol contexts, expect delay and deference to internal process; in startup contexts, expect a faster, more direct exchange. [Reported]",
      costlyError:
        "Treating a chaebol negotiator's delay as a stalling tactic rather than genuine internal process. [Reported]",
      disconfirmingSignal:
        "A fast, personally-decisive counterparty signals a startup context. [Reported]",
    },
  },

  singapore: {
    meeting: {
      baseline: "c",
      baselineNote: "genuine hybrid — reads toward A once formalities are observed",
      delta:
        "Business cards exchanged two-handed as in East Asia, but pace and directness once formalities are observed sit closer to Baseline A/C. English as the default working language removes translation friction present elsewhere in the region. [Well-established]",
      sequence:
        "Minute 0: formal card exchange. Minute 5: efficient transition to substance. Minute 15: direct discussion, disagreement stated plainly once rapport is minimally established. [Well-established]",
      costlyError:
        "Assuming the efficiency means the formality doesn't matter — skipping the card ritual or rushing past introductions is noticed. [Reported]",
      disconfirmingSignal:
        "If the counterparty skips the card exchange entirely, you're likely in the startup segment rather than the corporate or government-linked one. [Contested]",
    },
    feedback: {
      upward:
        "Contradicting a senior person is acceptable if delivered with appropriate register — deference in form, directness in substance. [Reported]",
      sideways:
        "Peer critique happens relatively openly once trust is established, more restrained on a first encounter. [Reported]",
      downward: "Direct, efficient, similar to Baseline A/C. [Reported]",
      costlyError:
        "Mistaking the efficient, Western-feeling pace for an absence of hierarchy sensitivity — form still matters even when the substance is direct. [Reported]",
      disconfirmingSignal:
        "A very informal exchange with no attention to seniority in how things are phrased suggests a startup context rather than the corporate or government-linked norm. [Contested]",
    },
    negotiation: {
      delta:
        "The first offer functions similarly to Baseline A/C — a real anchor with expected, moderate movement. Counterparties are frequently empowered to close directly. [Reported]",
      sequence:
        "Negotiation tends to move efficiently once trust in the numbers is established. [Reported]",
      costlyError:
        "Over-negotiating past the point of diminishing returns — efficiency is valued, and prolonged haggling can read as wasting time. [Reported]",
      disconfirmingSignal:
        "Repeated deferrals to an unnamed decision process suggest a larger multinational or government-adjacent counterparty rather than the general norm. [Contested]",
    },
  },

  uae: {
    meeting: {
      baseline: "b",
      baselineNote: "relational",
      delta:
        "Relationship-building — extended small talk, questions about wellbeing and family, hospitality (coffee/tea) — is not preamble; it is the actual work of the meeting. Rushing to substance too quickly reads as disrespectful. [Well-established]",
      sequence:
        "Minute 0–10+: hospitality and personal conversation, not time-boxed. Business surfaces only once this concludes naturally, on the host's timing, not the visitor's. [Well-established]",
      costlyError:
        "Visibly rushing the personal conversation or declining offered coffee/tea. [Well-established]",
      disconfirmingSignal:
        "If your counterparty moves to business within the first few minutes, you're likely dealing with a Dubai fintech or free-zone firm — a different segment, not a change in the family-business norm. [Reported]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person in the room is rare; family and tribal standing can shape who is able to challenge whom in ways not always visible to an outside observer. [Reported]",
      sideways:
        "Peer critique tends to happen outside formal settings, relationally, not in the room. [Reported]",
      downward:
        "Delivered privately, rarely in front of others, to preserve the relationship. [Well-established]",
      costlyError:
        "Publicly challenging a senior figure, even with good intent — this can cause a loss of standing for both parties. [Reported]",
      disconfirmingSignal:
        "Open, public upward challenge without visible discomfort suggests a free-zone or fintech context rather than a family-owned or government-adjacent one. [Reported]",
    },
    negotiation: {
      delta:
        "Negotiation typically happens only after the relationship established in earlier meetings is solid — a counterparty may negotiate very differently, and much faster, once genuine rapport exists. [Reported]",
      sequence:
        "Early positions may be less firm than they appear; real movement often happens once trust, not just terms, is established. [Reported]",
      costlyError:
        "Negotiating hard on terms before the relationship is established — this can stall a deal that terms alone wouldn't have stalled. [Reported]",
      disconfirmingSignal:
        "A counterparty willing to negotiate hard on terms in a first encounter, without relationship-building first, suggests a Dubai free-zone or fintech counterparty rather than a family-owned business. [Reported]",
    },
  },

  india: {
    meeting: {
      baseline: "b",
      baselineNote: "relational",
      delta:
        "Who introduced you shapes how the meeting unfolds from the first minute. Personal and professional topics are often discussed together rather than in separate registers — this is substantive relationship-building, not a lack of focus. Tech/startup sector diverges notably, running flatter and faster. [Well-established]",
      sequence:
        "Minute 0–5: relational framing, often referencing the introduction. Minute 5 onward: business and personal topics interweave. [Reported]",
      costlyError:
        "Treating the circling conversation as unfocused and trying to redirect it toward a linear agenda too early. [Reported]",
      disconfirmingSignal:
        "If the meeting proceeds in a tight, linear agenda from minute one, you're likely with a tech/startup counterparty. [Reported]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person in the room is uncommon in traditional sectors; tech/startup culture runs substantially flatter and faster on this axis. [Well-established]",
      sideways:
        "Peer critique tends to happen privately rather than in a group setting, more so in traditional sectors than in tech/startups. [Reported]",
      downward:
        "Delivered with more relational framing than the Anglo baseline — feedback often references the relationship, not just the task. [Reported]",
      costlyError:
        "Assuming uniform hierarchy sensitivity across sectors — the tech/startup delta from the traditional-sector baseline is large. [Reported]",
      disconfirmingSignal:
        "Open, immediate upward challenge without hesitation signals a tech/startup context. [Reported]",
    },
    negotiation: {
      delta:
        "The first offer is often not the real position, and meaningful movement is expected as a normal part of the process, more so than in the Anglo baseline. [Reported]",
      sequence:
        "Negotiation can be prolonged and relational, with pace differing sharply between traditional sectors and tech/startups. [Reported]",
      costlyError:
        "Accepting a first offer as final, or conceding to a counterparty's fast pace before establishing what real movement looks like. [Reported]",
      disconfirmingSignal:
        "A single-round, no-movement negotiation style suggests a tech/startup counterparty calibrated to Western pace. [Reported]",
    },
  },

  brazil: {
    meeting: {
      baseline: "d",
      delta:
        "Physical warmth (extended handshake, closer proximity) and genuine personal interest precede any business topic — this is read as professionalism, not its absence. [Well-established]",
      sequence:
        "Minute 0–10: personal conversation, warmly extended. Minute 10 onward: business surfaces, discussion becomes direct once rapport is set. [Well-established]",
      costlyError:
        "Maintaining typical Anglo physical distance or rushing the personal opening — reads as cold. [Well-established]",
      disconfirmingSignal:
        "If the meeting opens directly with business, you're likely with a São Paulo private-equity or banking counterparty, where meetings run more transactional than the broader pattern. [Reported]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person happens more readily once personal rapport is established than before it — the relationship is what licenses the directness. [Reported]",
      sideways:
        "Peer critique tends to happen once rapport is established, delivered directly but softened by warmth. [Reported]",
      downward:
        "Delivered warmly, often wrapped in personal rapport rather than delivered as a standalone correction. [Reported]",
      costlyError:
        "Attempting direct upward challenge before rapport is built — the same words land very differently depending on relationship context. [Reported]",
      disconfirmingSignal:
        "Immediate, rapport-free directness suggests a private-equity or banking context rather than the broader norm. [Contested]",
    },
    negotiation: {
      delta:
        "Relationship strength established beforehand significantly affects both the pace and outcome of negotiation — this is not a separate consideration from the deal terms, it shapes them directly. [Reported]",
      sequence:
        "Negotiation can be warm and personal even while substantive; directness increases once rapport is solid. [Reported]",
      costlyError:
        "Treating relationship-building and deal terms as separate tracks — in practice they're intertwined. [Reported]",
      disconfirmingSignal:
        "A negotiation that proceeds efficiently and impersonally from the outset suggests a banking or private-equity counterparty rather than the broader norm. [Contested]",
    },
  },

  italy: {
    meeting: {
      baseline: "d",
      delta:
        "Personal texture — family, food, regional topics — is expected before business, and how something is said carries weight alongside content. [Reported]",
      sequence:
        "Minute 0–10: personal conversation, genuinely substantive, not filler. Minute 10 onward: business, presentation and delivery style matter as much as the content itself. [Reported]",
      costlyError:
        "Treating the personal conversation as preamble to skip past — it's often doing real relationship work. [Reported]",
      disconfirmingSignal:
        "If business is raised immediately and personal topics are notably absent, you're likely with a Milanese finance counterparty — the segment of Italian business that runs closest to northern-European pace. [Contested]",
    },
    feedback: {
      upward:
        "Direct contradiction of a senior person becomes more acceptable once personal rapport exists; the relationship licenses the directness, similar to Brazil. [Reported]",
      sideways:
        "Peer critique, once rapport is established, can be direct, delivered with personal warmth softening it. [Reported]",
      downward:
        "Delivered with attention to how it's said, not just what's said — delivery and tone carry real weight. [Reported]",
      costlyError:
        "Delivering technically correct but poorly-toned feedback — the tone can undermine an otherwise valid point. [Reported]",
      disconfirmingSignal:
        "Blunt, rapport-free feedback landing well suggests Milanese finance rather than a traditional family-owned firm. [Contested]",
    },
    negotiation: {
      delta:
        "Similar to Brazil — presentation and relationship both shape the outcome, not just the stated terms. [Reported]",
      sequence:
        "Negotiation often unfolds gradually, with real movement appearing after rapport is well established. [Reported]",
      costlyError:
        "Pushing for a fast close before rapport is solid — this can read as transactional and stall the deal. [Reported]",
      disconfirmingSignal:
        "A fast, impersonal negotiation suggests a Milanese finance counterparty rather than a family-owned firm. [Contested]",
    },
  },
};

/* Methodology note rendered with the interactive: discipline first,
   lineage second, coverage gap third. */
export const pnMethodNote = [
  "This guide was built against a specific failure mode: cultural guides that manufacture differences to fill space, and that describe what people supposedly feel rather than what a reader could actually observe. Every claim here is written to be behavioral — what happens, not what it means — and tagged for confidence rather than presented as settled fact. Country detail always renders before the regional pattern, and where a country doesn't meaningfully differ from that pattern, the convergence is stated plainly rather than invented around. This guide has been through multiple internal accuracy and sensitivity passes but has not undergone external subject-matter review.",
  "Some of the concepts underneath this interactive — directness, decision speed, attitudes to contracts and hierarchy — trace back to Hofstede-style dimension research (rooted in IBM survey data from the 1960s–70s) and to Erin Meyer's Culture Map lineage of executive-classroom observation. Those foundations are dated and narrow, and they are named here rather than inherited silently.",
  "Coverage is sixteen countries; that leaves most of the world unrepresented. The gap is stated here, and uncovered countries render greyed-out on the globe, because an unstated gap is a claim by omission.",
  "One more gap is structural rather than geographic: this guide does not model how these norms shift with who the reader is. Several dynamics described here — personal questions in interviews, drinking-centered evenings — carry different stakes depending on the reader's gender, age, or family status. Where a cell touches one of those dynamics, a reader note flags it; the deeper treatment belongs in the full written report, not in a tooltip.",
] as const;

/* A6-lite: the "adaptation stops here" boundary, stated once as a
   shared principle rather than per country. Normative content, so it
   is tagged [Contested] throughout and flagged for subject-matter
   review. Referenced from the four gender reader notes and Interview
   Baseline E; rendered as its own block under Method & Sources. */
export const pnAdaptationBoundaryTitle = "Where adaptation stops";

export const pnAdaptationBoundary = [
  "Everything in this guide is about adapting form — pace, register, sequence, who speaks first. Adaptation stops where a norm stops asking you to change your own behavior and starts asking you to accept someone's exclusion or diminishment, most often along lines of gender, family status, or identity. [Contested]",
  "Three concrete boundaries recur in this guide's territory: a counterparty requesting that a female colleague not attend — staffing is your decision, not theirs; interview questions about marriage, family plans, or age that function as screening rather than rapport; and drinking or attendance pressure framed as a condition of the relationship. Declining any of these is not a cultural misstep, and nothing in this guide advises absorbing them as local custom. [Contested]",
  "A full per-country treatment of these boundaries — section A6 of the content schema — is a named, tracked gap of this interactive, alongside the reader-identity deltas of A5. Both belong to the full written report, with subject-matter review this project is not set up to provide.",
] as const;
