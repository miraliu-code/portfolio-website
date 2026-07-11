/*
 * Professional Norms — situation cells (Phase 2).
 * Three of eight situations built to full depth: Meeting, Feedback,
 * Negotiation. Interview, Business Dinner, Presentation, Email, and
 * Networking are deferred.
 *
 * Editorial rules in force throughout:
 * - Behavioral, not psychological (film test).
 * - No theory vocabulary; the behavior is described, not named.
 * - The subject is the reader, the counterparty, or the meeting —
 *   never a nationality as a personality.
 * - Every claim carries a confidence tag: [Well-established]
 *   [Reported] [Contested] [Dated].
 * - Deltas render BEFORE baselines: the country detail is the anchor,
 *   the regional pattern is background.
 * - "Largely converged" is a valid, complete delta.
 *
 * Baselines are written once per tier of the axis most relevant to
 * each situation (not the retired fixed clusters):
 *   Meeting     → Hierarchy in the Room (flat / moderate / strict)
 *   Feedback    → Directness (blunt / calibrated / indirect)
 *   Negotiation → Contract vs. Relationship (contract-first / mixed /
 *                 relational)
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
  /* Lens whose tiers group the baselines for this situation. */
  groupingLensId: string;
  deferred?: boolean;
}

export const pnSituations: PnSituationDef[] = [
  { id: "meeting", name: "Meeting", groupingLensId: "hierarchy" },
  { id: "feedback", name: "Feedback", groupingLensId: "directness" },
  {
    id: "negotiation",
    name: "Negotiation",
    groupingLensId: "contract-relationship",
  },
  { id: "interview", name: "Interview", groupingLensId: "hierarchy", deferred: true },
  {
    id: "business-dinner",
    name: "Business Dinner",
    groupingLensId: "hierarchy",
    deferred: true,
  },
  {
    id: "presentation",
    name: "Presentation",
    groupingLensId: "hierarchy",
    deferred: true,
  },
  { id: "email", name: "Email", groupingLensId: "directness", deferred: true },
  {
    id: "networking",
    name: "Networking",
    groupingLensId: "hierarchy",
    deferred: true,
  },
];

/* ---------------------------------------------------------------- */
/* Baselines, keyed by lens tier id                                   */
/* ---------------------------------------------------------------- */

export const pnBaselines: Record<
  "meeting" | "feedback" | "negotiation",
  Record<string, string>
> = {
  meeting: {
    flat: "The room assembles without ceremony. Seating is wherever people sit down; the most senior person may arrive last, and their absence doesn't stall the agenda. [Well-established] First names from the first exchange; junior attendees speak without being invited to. [Reported] Small talk is short, and the meeting is expected to end on time or early. [Reported]",
    moderate:
      "Titles appear in introductions and then mostly disappear. [Reported] The senior person anchors the table and opens the meeting, but anyone present is expected to answer questions in their own area without checking first. [Well-established] The agenda is real: deviation happens, but someone visibly steers it back. Punctuality is read as competence across most of this tier. [Reported]",
    strict:
      "Who enters first, where each person sits, and who speaks are all information. [Well-established] The most senior person may say the least; watch who the room's eyes go to before anyone answers a hard question. [Reported] Introductions and seating follow an order — let your hosts direct you rather than choosing a chair. [Well-established] The stated agenda may be a container for a relationship conversation that matters more than the slides. [Reported]",
  },
  feedback: {
    blunt:
      "Criticism is delivered plainly, often in the meeting itself, with the flaw named and the fix expected. [Well-established] The absence of praise is normal — silence usually means the work is acceptable. [Reported] A plain correction in front of colleagues is procedural, not a demotion signal; watch whether the same person gets the next assignment. [Reported]",
    calibrated:
      "Criticism is real but wrapped: it arrives after something positive, framed as a suggestion, or one-on-one rather than in the room. [Well-established] The words 'maybe' and 'consider' often carry a directive. [Reported] Public correction is rare and notable when it happens. [Reported]",
    indirect:
      "Explicit criticism — especially across rank, or in front of others — is rare in the room. [Well-established] Correction arrives through a third party, a private conversation, a changed assignment, or a question that sounds like curiosity. [Reported] A flat 'no' is unusual; deferral, delay, or 'that may be difficult' does that work. [Well-established]",
  },
  negotiation: {
    "contract-first":
      "The written terms are the deal; once signed, renegotiation is exceptional and usually costly. [Well-established] The first offer is an opening position but within a defensible range — anchoring absurdly high reads as unserious. [Reported] The people at the table generally have authority to close, or say plainly that they don't. [Reported] Walkaway is a real endpoint, not a move. [Reported]",
    mixed:
      "The contract matters and will be honored, but signature follows internal alignment rather than producing it. [Reported] Expect the pace to be set by an approval process you can't see; pressing the people in the room to close on the spot misreads their role. [Reported] Walkaway is read seriously and can end more than the deal. [Reported]",
    relational:
      "The signed document opens a relationship; terms are expected to flex as circumstances change, and insisting on the letter of a clause can cost the relationship it memorializes. [Well-established] First offers leave substantial room, and visible concession is part of how respect is shown. [Reported] The table often channels an off-stage decision-maker; the meeting's real product is what gets carried back to them. [Well-established] Walkaway is a move in the conversation more often than an exit. [Reported]",
  },
};

/* ---------------------------------------------------------------- */
/* Cells                                                              */
/* ---------------------------------------------------------------- */

export interface PnMeetingCell {
  delta: string;
  sequence: string;
  costlyError: string;
  disconfirmingSignal: string;
}

export interface PnFeedbackCell {
  upward: string; // lead with the highest-variance sub-view
  sideways: string;
  downward: string;
  sequence: string;
  costlyError: string;
  disconfirmingSignal: string;
}

export interface PnNegotiationCell {
  delta: string;
  sequence: string;
  costlyError: string;
  disconfirmingSignal: string;
}

export interface PnCountryCells {
  meeting: PnMeetingCell;
  feedback: PnFeedbackCell;
  negotiation: PnNegotiationCell;
}

export const pnCells: Record<string, PnCountryCells> = {
  "united-states": {
    meeting: {
      delta:
        "Largely converged with the moderate-tier baseline. Two additions: the opening small talk is short but evaluated — flat, minimal responses read as disengagement [Reported] — and time is the loudest signal in the room: arriving late without notice or running long both read as disorganization. [Well-established]",
      sequence:
        "0 min: handshakes, first names, seats taken freely. 3 min: small talk about travel or sports, already half-business. 15 min: slides or agenda in motion; questions interrupt freely. 45 min: action items and owners read back, hard stop honored, follow-up email the same day. [Reported]",
      costlyError:
        "Treating the scheduled end time as soft. Running over signals you can't manage scope — the content of the overrun is forgotten, the overrun isn't. [Reported]",
      disconfirmingSignal:
        "A counterparty who lingers past the hard stop and steers into personal territory is telling you you're in a relationship-led sector — slow down and stop selling. [Reported]",
    },
    feedback: {
      upward:
        "Available in bounded form: disagree in the meeting if framed as improving the plan ('have we considered—'), not overruling the person. [Reported] Escalating past your manager is procedural, not fatal, but noticed. [Reported] Startups tolerate open contradiction of the founder; regulated corporates far less. [Reported]",
      sideways:
        "Peer critique is normal in reviews and retros — softened in public ('one thing I'd push on—'), sharper in private or in writing. [Reported]",
      downward:
        "Largely converged with the calibrated baseline: frequent, structured, praise-wrapped, documented. Praise is loud; correction is scheduled. [Well-established]",
      sequence:
        "0 min: scheduled one-on-one, positive open. 3 min: the actual point, framed as growth. 15 min: action items agreed. Next day: a written summary lands in the HR tool. [Reported]",
      costlyError:
        "Hearing the praise-wrapped delivery as mostly praise. The middle sentence was the meeting. [Reported]",
      disconfirmingSignal:
        "Correction arriving unwrapped and public means a founder-led shop where the baseline doesn't apply — recalibrate; it isn't personal. [Reported]",
    },
    negotiation: {
      delta:
        "Largely converged with the contract-first baseline. First offers are aggressive but defensible; silence after a number is discomfort, and someone will fill it — often against their own position. [Reported] Counsel arrives early and the redlines are the negotiation. [Well-established] Walkaway is exercised without relationship rupture. [Reported]",
      sequence:
        "0 min: brief pleasantries, positions stated. 3 min: the anchor lands. 15 min: concessions traded against terms, not goodwill. 45 min: term sheet or a scheduled next round; papers to counsel the same week. [Reported]",
      costlyError:
        "Reading warmth as commitment. A counterparty can like you, say so, and still take the better offer without a phone call. [Reported]",
      disconfirmingSignal:
        "A negotiator who can't state their approval limit is a channel, not a principal — find out early whose redlines actually bind. [Reported]",
    },
  },

  ireland: {
    meeting: {
      delta:
        "The flat-tier baseline holds, delivered sideways: business backs into the agenda through genuine, funny, self-deprecating conversation, and abruptness reads as rudeness even when time is short. [Reported] Directness runs lower than the flat seating suggests — a firm no may arrive as 'that could be tricky.' [Reported] At a multinational subsidiary, the meeting is local but the decision may not be. [Reported]",
      sequence:
        "0 min: warm greeting, immediate humor. 3 min: still small talk — let it run; cutting it short is the mistake. 15 min: business arrives almost apologetically. 45 min: broad agreement in the room; the concrete commitment often follows by email after internal or HQ check-ins. [Reported]",
      costlyError:
        "Pushing for a hard commitment in the room. Warm agreement in the meeting is real warmth, not yet a decision. [Reported]",
      disconfirmingSignal:
        "A counterparty who skips the humor and drives at the numbers has likely been trained at HQ or abroad — recalibrate toward the US pattern. [Reported]",
    },
    feedback: {
      upward:
        "Rarely head-on. Disagreement with a senior arrives as a joke, a question, or a quiet word after the meeting — the public room stays smooth. [Reported] A junior who flatly contradicts a senior in front of others has spent something not easily recovered. [Reported]",
      sideways:
        "Peer correction happens over coffee or a pint, wrapped in slagging — mockery that carries the real message affectionately. [Reported]",
      downward:
        "Converged with the calibrated pattern, delivered gently and often obliquely; documentation lighter than the US. [Reported]",
      sequence:
        "0 min: a casual 'quick word?' 3 min: humor first. 15 min: the point, made once, lightly — it will not be repeated louder. Later: the relationship visibly restored over tea. [Reported]",
      costlyError:
        "Missing the message because it arrived as a joke. It won't be escalated to plain speech; it will be escalated past you. [Reported]",
      disconfirmingSignal:
        "Plain, unhumored criticism means either an imported multinational process — or a relationship that is already damaged. [Reported]",
    },
    negotiation: {
      delta:
        "The mixed-tier baseline: pleasant, unhurried, allergic to hardball theater. [Reported] The first number is close to reasonable; grinding for the last few percent damages more than it gains. [Reported] Multinational subsidiaries may need HQ sign-off — the room's warm yes can be structurally provisional. [Reported]",
      sequence:
        "0 min: relaxed, personal. 3 min: positions emerge conversationally. 15 min: gaps narrowed with humor as the lubricant. 45 min: agreement in principle; papers follow after the internal blessing. [Reported]",
      costlyError:
        "Importing pressure tactics. The deal may survive them; your standing in a small, fully networked market may not. [Reported]",
      disconfirmingSignal:
        "Repeated deferrals to 'the team' mean the decision lives elsewhere — possibly in another country. Ask where, kindly. [Reported]",
    },
  },

  australia: {
    meeting: {
      delta:
        "Largely converged with the flat-tier baseline. The register is direct but self-deprecating: confidence is welcome, self-promotion is punished, and titles barely surface. [Reported] Meetings start on time and end on time. [Reported]",
      sequence:
        "0 min: first names, informal greeting. 3 min: short banter, often at someone's own expense. 15 min: straight into substance; disagreement voiced casually. 45 min: decisions or clear next steps in the room; a short follow-up confirms. [Reported]",
      costlyError:
        "Opening with a polished account of your seniority and wins. The room will file you under 'tall poppy' before the agenda starts. [Reported]",
      disconfirmingSignal:
        "Titles in steady use and visible junior deference mean mining, banking, or an older corporate — shift toward the moderate-tier pattern. [Reported]",
    },
    feedback: {
      upward:
        "Open pushback is tolerated and often respected — delivered dry, without ceremony. [Reported] What's punished isn't the disagreement but pomposity in it. [Reported]",
      sideways:
        "Blunt between peers, cushioned by humor; visibly taking offense costs more than the critique did. [Reported]",
      downward:
        "Largely converged with the calibrated baseline: direct, brief, informal, less documented than the US. [Reported]",
      sequence:
        "0 min: an offhand opener. 3 min: the point, plainly. 15 min: argued back and forth as equals. Later: settled and socially reset over coffee, no residue. [Reported]",
      costlyError:
        "Escalating formality when challenged — invoking rank or process reads as losing the argument. [Reported]",
      disconfirmingSignal:
        "When pushback stops and formality rises, you've been marked as someone who can't take it; the feedback now flows around you. [Reported]",
    },
    negotiation: {
      delta:
        "Largely converged with the mixed-tier baseline, blunter: positions stated plainly, theatrics disliked from either side, haggling minimal. [Reported] A stated walkaway is a fact, not a gambit. [Reported]",
      sequence:
        "0 min: brief banter. 3 min: 'here's where we are.' 15 min: direct trade-offs. 45 min: handshake terms that will be honored; paperwork routine. [Reported]",
      costlyError:
        "Anchoring outrageously and planning to meet in the middle. The counterparty may simply take the next meeting off the calendar. [Reported]",
      disconfirmingSignal:
        "'Yeah, nah' is a no, regardless of what follows it. [Reported]",
    },
  },

  "new-zealand": {
    meeting: {
      delta:
        "Close to Australia with the volume lowered: quieter, fewer interruptions, and a real expectation of personal interest before business — the questions about your trip are not filler. [Reported] Consensus matters more than the flat seating suggests; the meeting may end without a decision because absent voices count. [Reported]",
      sequence:
        "0 min: relaxed greeting, first names. 3 min: genuine small talk, longer than Australia's. 15 min: substance, less combative than the Anglo norm. 45 min: alignment summarized; the decision often deferred to include others. [Reported]",
      costlyError:
        "Mistaking informality for speed. The tone is casual; the decision loop is not — pressing for same-day closure reads as pushy. [Reported]",
      disconfirmingSignal:
        "A counterparty who closes in the room without consulting anyone is the owner, or ex-corporate from abroad; the wider market still moves at consensus pace. [Reported]",
    },
    feedback: {
      upward:
        "Possible but quieter than Australia: disagreement is raised once, moderately, often privately; repetition or heat reads as aggression. [Reported]",
      sideways:
        "Gentle and oblique between peers; anything sharp moves to a private setting first. [Reported]",
      downward:
        "Converged with the calibrated baseline, understated — 'not bad' is praise. [Reported]",
      sequence:
        "0 min: a low-key setting. 3 min: the point raised once, calmly. 15 min: mutual accommodation. 45 min: consensus language even inside the critique. [Reported]",
      costlyError:
        "Importing Australian bluntness across the Tasman — the same sentence lands twice as hard here. [Reported]",
      disconfirmingSignal:
        "Silence and a change of subject mean the criticism was heard and rejected; pressing it now costs the relationship. [Reported]",
    },
    negotiation: {
      delta:
        "Like Australia slowed down: modest anchors, minimal haggle, consensus checks behind the table. [Reported] The market's size makes reputation an unwritten term of every deal. [Reported]",
      sequence:
        "0 min: friendly, low-key. 3 min: realistic positions. 15 min: measured adjustment. 45 min: in-principle agreement, pending wider sign-off. [Reported]",
      costlyError:
        "Squeezing a counterparty just because you can. The story travels the whole market before your flight home. [Reported]",
      disconfirmingSignal:
        "Enthusiasm without follow-through dates usually means an unconvinced partner offstage. [Reported]",
    },
  },

  germany: {
    meeting: {
      delta:
        "The moderate-tier baseline with the agenda enforced hardest here: items are numbered, and numbered items happen. [Well-established] Small talk approaches zero, and its absence is courtesy, not coldness. [Well-established] Expect your figures to be challenged in the room, in detail, in front of everyone — preparation is the respect currency. [Well-established]",
      sequence:
        "0 min: punctual start, titles at first mention. 3 min: agenda point one, no warm-up. 15 min: deep technical interrogation; expertise outranks rank while it's speaking. 45 min: unresolved points assigned owners and dates; the protocol follows in writing. [Reported]",
      costlyError:
        "Improvising an answer you don't have. A confident guess, once caught, costs more credibility than 'I'll confirm by Thursday' ever would. [Well-established]",
      disconfirmingSignal:
        "A relaxed personal open and loose slides mean a startup or returnee-led firm — the thoroughness still arrives, later, in writing. [Reported]",
    },
    feedback: {
      upward:
        "Substantive contradiction of a senior is legitimate when grounded in evidence and confined to the matter ('the data shows otherwise'). [Well-established] Attack the analysis, never the person's authority to decide; once decided, execution is expected. [Reported]",
      sideways:
        "Peers critique work openly in meetings, in detail, in front of others; it is procedural. [Well-established]",
      downward:
        "Direct, specific, unpadded; the absence of criticism is the praise. [Well-established]",
      sequence:
        "0 min: the flaw named. 3 min: evidence walked through. 15 min: the correction agreed as fact, not negotiation. 45 min: no relationship repair needed — none was damaged. [Reported]",
      costlyError:
        "Padding criticism until it's deniable. The recipient may genuinely not register that anything was wrong. [Reported]",
      disconfirmingSignal:
        "A counterpart who wraps criticism in praise has likely worked in Anglo organizations — don't assume the rest of the building will translate for you. [Reported]",
    },
    negotiation: {
      delta:
        "The contract-first baseline at full strength: the first offer is engineered, not theatrical — expect it near the final number, with movement earned by argument, not persistence. [Well-established] Silence after a number is analysis, not distress; let it run. [Reported] The signed contract will be executed to the letter, including the letters that hurt you. [Well-established]",
      sequence:
        "0 min: agenda confirmed. 3 min: positions with documentation. 15 min: clause-level argument on the merits. 45 min: open points logged with owners; the next session scheduled — closure when analysis completes, not before. [Reported]",
      costlyError:
        "Padding your price for a haggling phase that never comes. The inflated number is now your credibility problem. [Reported]",
      disconfirmingSignal:
        "Questions shifting from your numbers to your delivery process signal real intent; no process questions at all signal a polite no forming. [Reported]",
    },
  },

  switzerland: {
    meeting: {
      delta:
        "The German pattern with the temperature lowered: equally punctual and prepared, but challenges arrive discreetly and understatement is the register. [Reported] Expect no decision in the first meeting — sign-off is federated across stakeholders you haven't met. [Reported]",
      sequence:
        "0 min: precise start, formal greetings. 3 min: brief, polite preliminaries. 15 min: a methodical walk-through; questions exact and unhurried. 45 min: positions noted, nothing closed; the process continues in structured follow-ups. [Reported]",
      costlyError:
        "Reading calm agreement as momentum and pushing to close. The counterparty's process cannot be accelerated from your side of the table, and trying marks you. [Reported]",
      disconfirmingSignal:
        "One person visibly owning the decision — and saying so — means a founder-led or foreign-owned firm; the federated pattern doesn't apply. [Reported]",
    },
    feedback: {
      upward:
        "Possible, evidence-first, delivered with restraint — and usually pre-socialized privately before the meeting where it surfaces. [Reported]",
      sideways:
        "Precise, unemotional, often written; public sharpness is rare. [Reported]",
      downward:
        "Converged with the blunt tier but quieter: exact, documented, undramatic. [Reported]",
      sequence:
        "0 min: scheduled, with an agenda. 3 min: the issue stated precisely. 15 min: methodical discussion. 45 min: a documented conclusion. [Reported]",
      costlyError:
        "Springing criticism unannounced in a group setting. The content may be accepted; the ambush won't be. [Reported]",
      disconfirmingSignal:
        "Noticeably warmer, more expressive delivery usually means a French- or Italian-Swiss counterpart — recalibrate the regional assumptions. [Contested]",
    },
    negotiation: {
      delta:
        "Converged with the German pattern, plus federated sign-off: the table reports to a committee you won't meet. [Reported] Discretion is a term of the deal — publicity, name-dropping, or pressure through third parties can quietly kill it. [Reported]",
      sequence:
        "0 min: precise, formal. 3 min: exact positions. 15 min: unhurried clause work. 45 min: 'we will revert' — and they will, on the stated date. [Reported]",
      costlyError:
        "Trying to accelerate by escalating to someone senior. The committee is the senior; you've just told it you don't respect process. [Reported]",
      disconfirmingSignal:
        "A firm date for their answer is real progress; vagueness about when is the warning. [Reported]",
    },
  },

  netherlands: {
    meeting: {
      delta:
        "The flat-tier baseline at maximum: expect your idea to be argued with immediately, bluntly, possibly by the most junior person in the room — and expect that to be a good sign. [Well-established] The meeting is a working argument, not a presentation venue. [Reported]",
      sequence:
        "0 min: brisk greeting, first names. 3 min: the agenda stated; someone challenges it. 15 min: open argument, everyone participating regardless of rank. 45 min: a concrete conclusion, often decided in the room, with dissent aired and moved past. [Reported]",
      costlyError:
        "Softening your position to avoid conflict. Diplomatic vagueness reads as weakness or concealment; the room trusts the person who argues back. [Well-established]",
      disconfirmingSignal:
        "If the challenges stop arriving, the room hasn't agreed with you — it has stopped taking you seriously. Silence here is the alarm. [Reported]",
    },
    feedback: {
      upward:
        "Fully available: juniors contradict seniors in open meetings and it reads as engagement, not insubordination. [Well-established] Rank grants the decision, not immunity from argument. [Reported]",
      sideways:
        "Peer criticism is constant, public, and unpadded; consensus is reached through visible argument. [Well-established]",
      downward:
        "Blunt and immediate; softening is read as manipulation. [Reported]",
      sequence:
        "0 min: 'I disagree.' 3 min: reasons, plainly. 15 min: the argument in full view. 45 min: decision made, dissent recorded, lunch together as normal. [Reported]",
      costlyError:
        "Hearing the bluntness as hostility and responding emotionally — the room was arguing with your idea, not with you. [Well-established]",
      disconfirmingSignal:
        "A counterpart gone quiet and diplomatic is not agreeing; something has broken, and nobody will name it for you. [Reported]",
    },
    negotiation: {
      delta:
        "The contract-first baseline delivered bluntly and cheaply: 'that price is too high' is an opening courtesy, not an insult. [Well-established] Expect cost transparency to be demanded and reciprocated; inflated anchors are dismantled in the room, enjoyably. [Reported]",
      sequence:
        "0 min: no ceremony. 3 min: your number challenged. 15 min: open cost logic on the table. 45 min: a lean deal, closed or nearly, dissent aired and done. [Reported]",
      costlyError:
        "Defending an inflated anchor after it's been called. Concede the logic or lose the room — sunk pride is not a position. [Reported]",
      disconfirmingSignal:
        "If the challenges stop and the meeting turns polite, the deal is dying — the argument was the buying signal. [Reported]",
    },
  },

  sweden: {
    meeting: {
      delta:
        "The flat-tier baseline plus a consensus loop: the meeting's job is alignment, not decision, and several rounds may pass before anything is signed. [Well-established] Interruptions are rare, and pauses are not gaps to fill. [Well-established] Fika — the coffee break — is a working institution where positions actually move. [Reported]",
      sequence:
        "0 min: quiet start, first names. 3 min: brief practical small talk. 15 min: orderly turns, no interruptions, notable silences. 45 min: 'we will discuss internally' — meant literally, not as a brush-off. [Reported]",
      costlyError:
        "Filling the silences and pushing for a decision in the room. Both read as steamrolling the group, and the group is who decides. [Well-established]",
      disconfirmingSignal:
        "A counterparty deciding unilaterally in the meeting means the organization isn't Swedish-run — or the decision was made before the meeting started. [Reported]",
    },
    feedback: {
      upward:
        "Rarely frontal. Disagreement with a senior is voiced as a question in the meeting or raised privately; the stronger channel is the consensus process itself, which quietly absorbs objections. [Well-established]",
      sideways:
        "Gentle, oblique, often deferred to fika or one-on-ones; open peer conflict is genuinely rare. [Well-established]",
      downward:
        "Understated to the point of invisibility for outsiders: 'perhaps we could look at this' is a correction. [Reported]",
      sequence:
        "0 min: a calm setting. 3 min: the concern voiced as a question. 15 min: long pauses, no pressure. 45 min: 'let's think about it' — the revision arrives through the group later. [Reported]",
      costlyError:
        "Forcing an open verdict on a disagreement. The group's mechanism for handling it is quiet and slow, and overriding it isolates you. [Reported]",
      disconfirmingSignal:
        "An idea that keeps being 'discussed further' across meetings, without a no, has been declined — the process is the message. [Reported]",
    },
    negotiation: {
      delta:
        "The contract-first baseline on a consensus clock: terms are reasonable, movement is modest, and the decision is the group's, made between sessions. [Well-established] Hard anchoring or urgency theater reads as untrustworthy. [Reported]",
      sequence:
        "0 min: calm, prepared. 3 min: fair opening positions. 15 min: methodical, pause-heavy discussion. 45 min: 'we will come back to you' — the group deliberation is the closing process. [Reported]",
      costlyError:
        "Deploying an exploding offer to force the pace. You've asked the group to choose between your deadline and its process; the process wins. [Reported]",
      disconfirmingSignal:
        "Small, concrete implementation questions from several attendees signal the consensus forming in your favor. [Reported]",
    },
  },

  china: {
    meeting: {
      delta:
        "The strict-tier baseline plus hosting as information: who meets you at the elevator, the meal you're offered, and the seniority sent to greet you all state how the relationship is valued. [Well-established] Cards with two hands, senior first. [Well-established] Expect the substantive discussion to progress outside the formal meeting — at dinner, in side conversations, through the introducer who brought you. [Reported] Founder-led tech firms compress all of this dramatically. [Reported]",
      sequence:
        "0 min: greeted in rank order, cards exchanged formally. 3 min: tea; seating directed; the senior host sets the tone. 15 min: presentations received politely, few visible reactions. 45 min: warm generalities, no commitments — the real signal is whether dinner is proposed. [Reported]",
      costlyError:
        "Pressing the room for a decision or a hard no. You'll receive agreeable language, lose access to the real process, and never learn which happened. [Reported]",
      disconfirmingSignal:
        "A counterpart who disagrees with you openly and moves to terms in week one is a founder or a returnee — run the fast pattern, not this page's default. [Reported]",
    },
    feedback: {
      upward:
        "Contradicting a senior in front of others is close to unavailable in traditional firms — objections travel privately, through intermediaries, or inside the phrasing of questions. [Well-established] A subordinate who does it publicly creates a problem the room must then manage. [Reported] Founder-led tech is measurably blunter. [Reported]",
      sideways:
        "Peer critique is private, oblique, or channeled through a mutually trusted third party; open disagreement between peers is handled carefully. [Reported]",
      downward:
        "Can be sharp and public from senior to junior — the tolerance is asymmetric by design. [Reported]",
      sequence:
        "0 min: nothing visible. 3 min: a question that sounds procedural. 15 min: a private word after the meeting. Days later: the position shifts without anyone having disagreed on record. [Reported]",
      costlyError:
        "Asking a subordinate to evaluate their boss's plan in front of the boss. Every honest answer available to them is a bad one. [Reported]",
      disconfirmingSignal:
        "Open argument across ranks in front of you means a founder-culture firm — or a performance. Check which by watching what happens to the junior afterward. [Contested]",
    },
    negotiation: {
      delta:
        "The relational baseline with stamina as a tactic: the substantive concession conversation tends to start near your departure time — airport-day pressure is standard practice. [Reported] The signed contract marks the relationship's beginning and will be reopened as conditions change. [Well-established] The table often channels an unseen authority; your introducer is a working part of the negotiation, not a bystander. [Reported]",
      sequence:
        "0 min: warm, unhurried. 3 min: the relationship reaffirmed. 15 min: broad positions, wide anchors, few commitments. Day three: movement begins — the largest concessions cluster near your departure. [Reported]",
      costlyError:
        "Announcing your flight time. You've handed over the negotiation clock, and the real conversation will now start an hour before it. [Reported]",
      disconfirmingSignal:
        "Renegotiation requests after signature are the relationship operating normally, not bad faith — unless they arrive with new counterparts, which means the relationship moved. [Reported]",
    },
  },

  japan: {
    meeting: {
      delta:
        "The strict-tier baseline at its most codified. Cards presented and received with both hands and read before being put away — pocketing one unread is noticed. [Well-established] Seating follows rank; the seat furthest from the door belongs to the senior guest. [Well-established] The most senior person may speak least; the working-level attendees taking careful notes are the deal's actual path forward. [Reported] 'That may be difficult' is a complete refusal. [Well-established] No decision will happen in the room, and asking for one is a category error — the meeting's product is the internal consensus process it feeds. [Well-established]",
      sequence:
        "0 min: greeted in rank order; card exchange, standing. 3 min: seated by rank, light formal conversation. 15 min: your presentation, received with nods and note-taking, few questions. 45 min: polite thanks, no evaluation offered — the real response arrives weeks later through the introducing channel. [Well-established]",
      costlyError:
        "Asking 'so do we have a deal?' in the room. It forces a refusal nobody wants to voice, embarrasses your hosts, and can end the process silently. [Reported]",
      disconfirmingSignal:
        "If the CEO of a ten-year-old Tokyo software firm answers your email personally and books a video call for Thursday, this page doesn't apply — use the Anglo pattern with better punctuality. [Reported]",
    },
    feedback: {
      upward:
        "The formal meeting contains no upward contradiction; alignment happens beforehand in one-on-one groundwork, where objections are raised safely and absorbed anonymously into the plan. [Well-established] A direct no to a superior is so rare the language routes around it — 'it may be difficult,' a tilted head, a drawn breath. [Well-established] After-hours drinks partially suspend the rules: things said there are usable but not quotable. [Reported]",
      sideways:
        "Peer correction is private, understated, and often nonverbal; a prolonged silence is itself feedback. [Reported]",
      downward:
        "More direct than upward but still typically private; public correction of a subordinate embarrasses the corrector too. [Reported]",
      sequence:
        "0 min: the meeting proceeds smoothly. 3 min: no visible dissent. 15 min: a pause, a qualified phrase. 45 min: consensus confirmed — the actual objections were metabolized days earlier, one desk at a time. [Well-established]",
      costlyError:
        "Soliciting frank public dissent ('be honest — push back!'). You've asked the room to choose between honesty and safety in public, and it will choose neither. [Reported]",
      disconfirmingSignal:
        "A junior openly correcting a senior in front of you marks a young tech firm — or a relationship far deeper than a first meeting. [Reported]",
    },
    negotiation: {
      delta:
        "The mixed-tier baseline at maximum internal-process weight: the people at the table are almost never empowered to close, and pressing them to reads as not understanding how anything works. [Well-established] Silence after your number is deliberation, not a tactic — filling it with a concession is a known foreigner error. [Reported] First offers are serious; the haggling range is narrow. [Reported] Walkaway is heavy: exercised, it tends to end the relationship, not reset the price. [Reported]",
      sequence:
        "0 min: formal, warm. 3 min: your position received and noted. 15 min: detailed questions, no counterproposal. 45 min: thanks and a timeline — the counter arrives weeks later through the established channel, pre-approved internally. [Well-established]",
      costlyError:
        "Conceding into the silence. The room was processing, and you've just taught it that your price moves under quiet. [Reported]",
      disconfirmingSignal:
        "A counterproposal inside a week, from the same people, with authority to adjust it live — young-firm pattern; renegotiate your assumptions along with the terms. [Reported]",
    },
  },

  "south-korea": {
    meeting: {
      delta:
        "The strict-tier baseline ordered by age and title with unusual precision: who bows first, who pours for whom, who exits the elevator first — all rank-legible. [Well-established] Meetings run brisker than Japan's; the pace gap between a chaebol and a startup is the widest in this guide. [Reported] The after-hours dinner is not garnish — attendance is where the relationship is actually built. [Well-established]",
      sequence:
        "0 min: bows and cards, by rank. 3 min: formal preliminaries; the senior speaks for the room. 15 min: substantive but guarded discussion. 45 min: a courteous close — the consequential conversation may begin at 7pm over dinner. [Reported]",
      costlyError:
        "Declining the dinner invitation to be efficient. You've declined the relationship; the next meeting will be politely colder and shorter. [Reported]",
      disconfirmingSignal:
        "First names, English titles, and open pushback from juniors mean a post-2000s startup — expect near-Anglo speed with residual deference to age. [Reported]",
    },
    feedback: {
      upward:
        "Contradicting a senior in front of others is heavily constrained by age-rank; objections surface privately, or after hours over dinner and drinks, where the ordering relaxes by design. [Well-established] The morning after, what was said stands without being cited. [Reported] Startups have compressed this dramatically. [Reported]",
      sideways:
        "Peer feedback tracks age even among equals; same-age peers can be strikingly blunt with each other. [Reported]",
      downward:
        "Can be blunt, occasionally harsh, in traditional firms; younger firms are importing softer Anglo forms. [Reported]",
      sequence:
        "0 min: a smooth meeting. 3 min: deference intact. 15 min: hints in question form. 9 pm: the real feedback, over soju — off the record but binding. [Reported]",
      costlyError:
        "Citing at Tuesday's meeting what was confided at Monday's dinner. The channel exists because it isn't quotable. [Reported]",
      disconfirmingSignal:
        "Public disagreement from a junior that draws no visible consequence means a startup or a foreign-acculturated team — the traditional pattern isn't operating. [Reported]",
    },
    negotiation: {
      delta:
        "Between the relational and contract patterns: brisker than Japan, with a real haggling range and visible urgency once momentum builds. [Reported] The dinner table advances the negotiation more than the meeting room does. [Well-established] Chaebol counterparts channel a hierarchy above them; startup counterparts may close in the room. [Reported]",
      sequence:
        "0 min: a formal open. 3 min: positions exchanged. 15 min: energetic movement, competitive framing. 45 min: near-terms in the room; the final blessing comes from above — or over dinner tonight. [Reported]",
      costlyError:
        "Skipping the evening. Terms that stall at the table routinely resolve over the meal you declined. [Reported]",
      disconfirmingSignal:
        "Speed itself signals empowerment: a counterpart moving fast has authority; one repeating stock positions across meetings is a channel. [Reported]",
    },
  },

  singapore: {
    meeting: {
      delta:
        "Largely converged with the moderate-tier baseline, executed with unusual efficiency: punctual, prepared, contract-oriented, multilingual. [Reported] Deference to seniority is visible but doesn't slow the meeting. [Reported]",
      sequence:
        "0 min: punctual start; cards often exchanged with two hands. 3 min: brief courteous small talk. 15 min: dense, well-prepared substance. 45 min: clear next steps with owners; the follow-up documentation arrives fast. [Reported]",
      costlyError:
        "Assuming the regional-HQ polish means the region's norms are suspended. Your counterparty may run the meeting like Boston and still route the decision like the region. [Reported]",
      disconfirmingSignal:
        "Timelines going vague while the relationship conversation expands means the decision has moved to a regional principal outside Singapore. [Reported]",
    },
    feedback: {
      upward:
        "More available than the surrounding region, less than the Anglo baseline: disagreement is voiced in meetings but framed carefully and rank-aware. [Reported] Written channels carry the sharper versions. [Reported]",
      sideways:
        "Professional, moderate, often documented; a multicultural workforce means peers actively calibrate to each other. [Reported]",
      downward:
        "Largely converged with the calibrated baseline: structured, precise, unsentimental. [Reported]",
      sequence:
        "0 min: a scheduled review. 3 min: framed positives. 15 min: precise correction with examples. 45 min: a documented plan. [Reported]",
      costlyError:
        "Assuming the polished process means the feedback is fully frank — the rank calibration underneath is real. [Reported]",
      disconfirmingSignal:
        "Compare what's written with what's said: when the written version is sharper, you've found the true register. [Reported]",
    },
    negotiation: {
      delta:
        "Largely converged with the contract-first baseline: efficient, lawyered, common-law literal. [Well-established] The regional layer sits underneath — a Singapore signature sometimes routes a Jakarta or Shanghai decision. [Reported]",
      sequence:
        "0 min: punctual, documented. 3 min: tight positions. 15 min: efficient clause work. 45 min: closure, or a dated path to it. [Reported]",
      costlyError:
        "Treating Singapore terms as automatically portable across the region the deal covers — enforcement realities change at every border. [Reported]",
      disconfirmingSignal:
        "Precision about the contract but vagueness about the operating country means the real counterparty is elsewhere; negotiate accordingly. [Reported]",
    },
  },

  uae: {
    meeting: {
      delta:
        "The strict-tier baseline with hospitality as the meeting's actual work: coffee and dates are the agenda's first item, and rushing them is rushing the relationship. [Well-established] Interruptions — calls taken, people entering — are normal traffic, not disrespect. [Reported] Rank may be family or state standing rather than title, and not always visible. [Reported] A 2pm meeting confirms the relationship matters, not the clock. [Reported]",
      sequence:
        "0 min: warm welcome, coffee, unhurried. 3 min: still hospitality — accept it. 15 min: business surfaces conversationally, circles away, returns. 45 min: may end without the agenda 'covered' and still have gone well; follow-through is fast once trust is set. [Reported]",
      costlyError:
        "Visibly checking your watch or declining hospitality to get to the slides. The refreshments are the meeting; the slides are the formality. [Reported]",
      disconfirmingSignal:
        "A precise agenda, a hard stop honored, and a decision in the room mean a multinational subsidiary or foreign-founded firm — the local pattern isn't operating. [Reported]",
    },
    feedback: {
      upward:
        "Public contradiction of a senior is unavailable in the local pattern; concerns travel through private conversation or a trusted intermediary, ideally framed as protecting the senior's interests. [Reported]",
      sideways:
        "Peer critique is private and relationship-cushioned; public criticism reads as an attack on standing, not on work. [Reported]",
      downward:
        "Delivered privately and gently in the local pattern; expatriate-heavy workplaces import their own norms unevenly. [Reported]",
      sequence:
        "0 min: hospitality intact. 3 min: praise where due. 15 min: the concern raised obliquely, or deferred. Later: the substantive version travels through the right person. [Reported]",
      costlyError:
        "Correcting anyone in front of the room. The work issue becomes a standing issue, and standing issues outlive projects. [Reported]",
      disconfirmingSignal:
        "A Dubai multinational may deliver textbook London-style feedback — check whether the Emirati principals in the deal operate that way before assuming. [Reported]",
    },
    negotiation: {
      delta:
        "The relational baseline where the relationship is the enforcement mechanism: the written contract is a milestone, revisitable as circumstances change. [Reported] First offers leave generous room and the concession exchange is expected — declining to participate reads as disrespect. [Reported] Decisions can be startlingly fast once the principal decides you're trustworthy; the slow part was never the paperwork. [Contested]",
      sequence:
        "0 min: hospitality, unhurried. 3 min: relationship talk carrying business signals. 15 min: numbers surface loosely. 45 min: broad alignment — the principal's yes, possibly not in the room, converts it to speed. [Reported]",
      costlyError:
        "Litigating the letter of a clause when circumstances shift. You may win the clause and lose every future deal in the network. [Reported]",
      disconfirmingSignal:
        "Access is the thermometer: deepening invitations — majlis, family events — mean the deal is advancing regardless of paperwork pace. [Reported]",
    },
  },

  india: {
    meeting: {
      delta:
        "The strict-tier baseline with personal warmth over it: expect genuine interest in you — family, background, opinions — woven through the business. [Reported] The most fluent English speaker in the room is often not the decision-maker. [Reported] Who introduced you shapes how the room receives you. [Well-established] Scheduled times flex; agendas flex further. [Reported]",
      sequence:
        "0 min: warm greetings, tea offered. 3 min: personal conversation, unhurried. 15 min: business discussed enthusiastically, commitments sounding closer than they are. 45 min: a warm close with broad agreement — the operative decision follows later, further up. [Reported]",
      costlyError:
        "Taking enthusiastic verbal agreement as closure. 'Yes' often means 'I hear you and want this to continue,' not 'the terms are accepted.' [Reported]",
      disconfirmingSignal:
        "A Bangalore tech counterparty who challenges you directly and closes in the room is running the startup pattern — this page's default describes the traditional sectors. [Reported]",
    },
    feedback: {
      upward:
        "Highly constrained in traditional firms: the boss's plan is improved through questions, side conversations, and quiet workarounds rather than open challenge. [Reported] Tech startups run visibly flatter, but age and seniority still bend the frankness. [Reported]",
      sideways:
        "Warm and personal; critique softened with relationship maintenance, and often delivered through allusion. [Reported]",
      downward:
        "Can be direct, occasionally sharp, in traditional sectors; documentation practices vary widely. [Reported]",
      sequence:
        "0 min: a pleasant meeting. 3 min: agreement voiced. 15 min: a clarifying question hiding an objection. Later: the plan quietly adapts in execution, without a recorded dissent. [Reported]",
      costlyError:
        "Forcing a public yes-or-no on whether your plan has problems. You'll get yes, and the problems will surface in delivery. [Reported]",
      disconfirmingSignal:
        "An engineer who tells you flatly the architecture won't work is startup-pattern; treasure them, and don't quote them upward. [Reported]",
    },
    negotiation: {
      delta:
        "The relational baseline with enthusiastic haggling: wide anchors, energetic movement, and a genuine expectation that both sides visibly concede. [Reported] Verbal agreement is relationship maintenance, not closure; the operative terms consolidate above the table. [Reported] The contract will be revisited — pricing it as final is pricing it wrong. [Reported]",
      sequence:
        "0 min: warm, personal. 3 min: optimistic framing. 15 min: vigorous back-and-forth, numbers moving. 45 min: a warm handshake on 'broadly agreed' terms — the precise ones arrive from the promoter's office later. [Reported]",
      costlyError:
        "Celebrating the enthusiastic yes. The counterparty may be agreeing to the relationship, the direction, and the mood — the price is still open. [Reported]",
      disconfirmingSignal:
        "Follow-ups that start citing specific clause numbers mean the promoter has engaged; generalized warmth without paperwork means the decision hasn't gone up yet. [Reported]",
    },
  },

  brazil: {
    meeting: {
      delta:
        "The moderate-tier baseline warmed considerably: greetings are physical, distances close, and conversation personal before and during business. [Well-established] The agenda is a suggestion; the relationship conversation is the real track. [Reported] Interruption is engagement, not rudeness. [Reported] Meetings start late and run past — plan buffers. [Reported]",
      sequence:
        "0 min: a warm physical greeting, cafezinho offered. 3 min: personal conversation, animated. 15 min: business and relationship threads interwoven, people talking over each other productively. 60 min: warm broad alignment; the paperwork follows slowly. [Reported]",
      costlyError:
        "Keeping it strictly business from behind a laptop. Distance reads as distrust, and distrust closes the relationship the deal needed. [Reported]",
      disconfirmingSignal:
        "A São Paulo finance counterparty running a tight clock and a printed agenda is real too — the transactional pattern exists; follow their lead. [Reported]",
    },
    feedback: {
      upward:
        "Possible once rapport is established — delivered warmly, personally, never coldly procedural; contradicting a senior you lack rapport with is risky. [Reported]",
      sideways:
        "Animated and direct-but-affectionate between established peers; the personal cushion does real work. [Reported]",
      downward:
        "Converged with the calibrated tier, warmer: correction embedded in visible personal regard. [Reported]",
      sequence:
        "0 min: coffee, warmth. 3 min: genuine positives. 15 min: the issue, personally framed. Later: the relationship reaffirmed, often over food. [Reported]",
      costlyError:
        "Delivering cold, written-first criticism. The coldness is heard louder than the content, and becomes the message received. [Reported]",
      disconfirmingSignal:
        "Feedback arriving as a terse email with no coffee attached is either São Paulo finance — or a relationship in trouble. [Reported]",
    },
    negotiation: {
      delta:
        "The relational baseline with improvisation as a live variable: expect creative paths around obstacles, and expect the contract to be renegotiated when reality changes. [Reported] Personal chemistry with the decision-maker moves terms more than competitive pressure does. [Reported]",
      sequence:
        "0 min: warm, social. 3 min: relationship before numbers. 15 min: flexible, overlapping discussion of terms. 45 min: optimistic alignment — the paper trails weeks behind, and that's normal. [Reported]",
      costlyError:
        "Enforcing the letter of the schedule with penalty clauses at the first slip. A legal victory, a relationship funeral — and the next delivery will be worse. [Reported]",
      disconfirmingSignal:
        "A counterpart who stops proposing workarounds has lost sponsorship for your deal — the improvisation only flows toward relationships worth the effort. [Reported]",
    },
  },

  italy: {
    meeting: {
      delta:
        "The moderate-tier baseline with presence weighted heavily: dress, bearing, and how you speak are evaluated from minute one — bella figura is an operating variable, not a stereotype. [Reported] Formal titles (dottore, ingegnere) at first meeting. [Reported] Discussion is expressive and overlapping; the agenda flexes around it. [Reported] Decisions consolidate around the senior owner after the meeting. [Reported]",
      sequence:
        "0 min: formal-but-warm greetings, titles used. 3 min: coffee and genuine conversation. 15 min: animated substantive debate, tangents welcome. 45 min: broad warm alignment — the concrete decision emerges later from the owner's office. [Reported]",
      costlyError:
        "Underdressing and over-informalizing the first meeting. Competence won't be heard until presentation stops distracting from it. [Reported]",
      disconfirmingSignal:
        "A meeting run to a Germanic clock with zero digressions means Milanese finance or a multinational — expect the relational pattern to reappear at contract stage anyway. [Reported]",
    },
    feedback: {
      upward:
        "Available inside animated discussion — expressive disagreement with a senior's idea can flow in the room — but the final call belongs visibly to the senior, and relitigating it afterward does not. [Reported]",
      sideways:
        "Expressive, fast, personal, and gone by lunch: peers argue openly, and the argument is not held against anyone. [Reported]",
      downward:
        "Delivered with rhetorical flourish; sharper in the moment, softer in consequence than it sounds. [Reported]",
      sequence:
        "0 min: energetic discussion. 3 min: open disagreement, hands moving. 15 min: the heat peaks and passes. 45 min: espresso together; the decision consolidates with the senior afterward. [Reported]",
      costlyError:
        "Mistaking volume for rupture and retreating — leaving the argument early means losing it. [Reported]",
      disconfirmingSignal:
        "When the expressive counterpart goes quiet and formal, the disagreement has become serious; the theater was the safe zone. [Reported]",
    },
    negotiation: {
      delta:
        "The relational baseline conducted with style: negotiation is a performance both sides are expected to enjoy, with expressive positioning and real flexibility beneath it. [Reported] The owner's yes is the only yes; polished managers may negotiate everything except the decision. [Reported]",
      sequence:
        "0 min: espresso, personal warmth. 3 min: expressive framing of positions. 15 min: animated haggling, tangents included. 45 min: agreement in spirit — the owner's office produces the actual terms in the following days. [Reported]",
      costlyError:
        "Treating the negotiation as solved by your spreadsheet. The best number without the relationship loses to a worse number with it. [Reported]",
      disconfirmingSignal:
        "An invitation to meet the owner (or to lunch) is term-sheet progress; a counterpart who can't produce that meeting can't produce the deal. [Reported]",
    },
  },
};

/* Methodology note rendered with the interactive. */
export const pnMethodNote = [
  "Some of the concepts underneath this interactive — directness, decision speed, attitudes to contracts and hierarchy — trace back to Hofstede-style dimension research and to Erin Meyer's Culture Map lineage. The scores and prose here are original placeholder-tier content written for a portfolio project: they have not been through the in-market review this subject demands, and they should be read as a design of how such a guide would work, not as the guide itself.",
  "Coverage is sixteen countries: the United States, Ireland, Australia, New Zealand, Germany, Switzerland, the Netherlands, Sweden, China, Japan, South Korea, Singapore, the UAE, India, Brazil, and Italy. That leaves most of the world unrepresented — no Mexico, Indonesia, Poland, Vietnam, Nigeria, or anywhere in Africa, among many others. The gap is stated here because an unstated gap is a claim by omission.",
] as const;
