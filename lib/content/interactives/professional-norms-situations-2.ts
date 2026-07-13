/*
 * Professional Norms — the remaining five situation cells (Phase 3):
 * Interview, Business Dinner (or its local equivalent), Presentation,
 * Email (the follow-up in writing), and Networking (meeting someone
 * you don't know). Editor-supplied final text; same editorial rules
 * as the first three situations.
 *
 * Interview carries its own A–E grouping (self-promotion tolerance).
 * The groupings were re-derived in the editorial fix pass: the earlier
 * catch-all "modest, context-framed" group bundled every non-Western
 * country (plus Italy) together, which contradicted the country pages
 * themselves — Chinese tech and Indian IT interviews are direct and
 * individually framed, not modest.
 *
 * The bottom of this file runs a converged-block consistency check
 * over every shared block in both situation files.
 */

import {
  getPnCountry,
  pnCountries,
  type PnAxes,
} from "./professional-norms";
import {
  NEGOTIATION_ANGLO_BASELINE,
  pnCells,
} from "./professional-norms-situations";

export interface PnBasicCell {
  delta: string;
  sequence?: string;
  costlyError?: string;
  disconfirmingSignal?: string;
  /* Business Dinner only, where genuinely relevant. */
  readerNote?: string;
}

export type PnInterviewBaselineId = "a" | "b" | "c" | "d" | "e";

export interface PnInterviewCell extends PnBasicCell {
  baseline: PnInterviewBaselineId;
}

export const pnInterviewBaselineNames: Record<PnInterviewBaselineId, string> =
  {
    a: "Baseline A — self-promotion rewarded",
    b: "Baseline B — self-promotion muted",
    c: "Baseline C — credential-led, formal",
    d: "Baseline D — sector split, at its widest",
    e: "Baseline E — rapport-led",
  };

/* Interview baselines — kept brief: Interview is the schema's most
   narrowly scoped situation (self-promotion tolerance + which personal
   questions are routine). */
export const pnInterviewBaselines: Record<PnInterviewBaselineId, string> = {
  a: "Achievements are stated plainly, early, and in the first person; the interviewer treats a confident account of your own work as information, not arrogance. [Well-established] Questions center on individual accomplishment — what you did, and how it was measured. [Reported]",
  b: "Achievements are stated once, without embellishment, and often credited partly to the team. [Reported] Overselling is noticed and quietly discounted; the interviewer probes for the substance behind modest answers rather than rewarding volume. [Reported]",
  c: "The interview opens formally and runs on qualifications: degrees, certifications, and specific technical experience, stated precisely. [Well-established] Claims are tested with detailed follow-up questions, and the precision of the answer counts alongside the claim itself. [Reported]",
  d: "A sector split runs through every country in this guide — the US page says as much about regulated sectors versus tech. What marks these three markets is the width of that split, not its existence: a state-owned enterprise, chaebol, or traditional family firm expects modest, organization-framed answers, while the same country's tech sector runs direct, individually framed interviews — Indian IT and Chinese tech screening can probe individual accomplishment harder than the US baseline does. [Reported] Establish which segment you're interviewing with before calibrating either way. [Reported]",
  e: "Personal rapport and presentation are assessed alongside credentials, and questions about family or personal background can be part of the conversation. [Reported] Where they are, they can function as screening as much as rapport — a risk that falls unevenly across candidates, and one this guide flags rather than resolves; identity-based deltas are a stated gap here. [Contested] Where such questions shade from rapport into screening, the 'Where adaptation stops' note under Method & Sources draws the line. [Contested]",
};

export interface PnTier2Cells {
  interview: PnInterviewCell;
  "business-dinner": PnBasicCell;
  presentation: PnBasicCell;
  email: PnBasicCell;
  networking: PnBasicCell;
}

/* ---- shared group blocks ---- */

const PRESENTATION_ANGLO: PnBasicCell = {
  delta:
    "Largely converged with the US pattern — open, direct Q&A, challenge is normal and undramatic. [Reported]",
  sequence: "Similar to the US. [Reported]",
  costlyError: "Similar to the US. [Reported]",
  disconfirmingSignal:
    "A silent, deferential room suggests a more hierarchical sub-sector — government, parts of finance — rather than the general norm. [Contested]",
};

const EMAIL_CONVERGED: PnBasicCell = {
  delta:
    "Largely converged with the US/Germany pattern — written follow-up is standard and read as professionalism, not suspicion. [Reported]",
  sequence:
    "Similar timing; chase after 1–2 weeks of silence is normal throughout this group. [Reported]",
  costlyError:
    "Similar — not following up reads as disinterest. [Reported]",
  disconfirmingSignal:
    "Discomfort with a written summary suggests an atypical, more relationship-first counterparty in any of these contexts. [Contested]",
};

const NETWORKING_AU: PnBasicCell = {
  delta:
    "Largely converged with the US event format; self-promotion is notably more muted, and overselling is quietly discounted. [Reported]",
  sequence:
    "Casual approach, modest self-introduction, genuine mutual questions before any ask. [Reported]",
  costlyError: "Leading with credentials or achievements. [Reported]",
  disconfirmingSignal:
    "Confident credential-leading landing well signals a recruiting- or sales-driven event rather than the general register. [Contested]",
};

const NETWORKING_DACH: PnBasicCell = {
  delta:
    "The standing-room networking event exists but is used more purposefully — conversations tend to establish specific relevance quickly rather than ranging broadly. [Reported]",
  sequence:
    "Efficient introduction, quick establishment of mutual relevance, follow-up only if genuinely warranted. [Reported]",
  costlyError:
    "A long, unfocused conversation with no clear professional relevance established. [Reported]",
  disconfirmingSignal:
    "Extended small talk with no professional framing suggests a purely social event. [Contested]",
};

export const pnCellsTier2: Record<string, PnTier2Cells> = {
  "united-states": {
    interview: {
      baseline: "a",
      delta:
        "Largely converged. [Well-established] Personal questions about age, marital status, religion, or health are legally sensitive and rarely asked; if raised, it's a candidate red flag more than a norm.",
      sequence:
        "Self-promotion is expected from the opening answer onward. [Well-established]",
      costlyError:
        "Undersized answers to 'tell me about yourself' read as low confidence, not humility. [Well-established]",
      disconfirmingSignal:
        "An interviewer asking directly about family status suggests an atypical or smaller/less formal employer. [Reported]",
    },
    "business-dinner": {
      delta:
        "Largely converged — a working dinner or lunch, business often discussed directly at the table rather than reserved for after. [Well-established]",
      sequence:
        "Light small talk, business surfaces mid-meal, direct. [Well-established]",
      costlyError:
        "Treating the meal as purely social and avoiding business topics entirely. [Reported]",
      disconfirmingSignal:
        "A meal with no business discussion at all suggests a purely relationship-building event, not a working dinner. [Contested]",
    },
    presentation: {
      delta:
        "Q&A is open and can include direct, public challenge to your claims; silence usually means agreement or disengagement, not quiet dissent. [Well-established]",
      sequence:
        "Questions throughout or at the end, often interrupting mid-presentation in informal settings. [Reported]",
      costlyError:
        "Being visibly rattled by a direct public challenge — composure under challenge is itself being evaluated. [Reported]",
      disconfirmingSignal:
        "A silent, question-free room suggests either full buy-in or a more formal/hierarchical sub-sector. [Contested]",
    },
    email: {
      delta:
        "A written summary after a meeting is standard, read as diligence and a record-keeping habit, not distrust. [Well-established]",
      sequence:
        "Sent within 24–48 hours; a follow-up chase after ~1 week of silence is normal and expected. [Well-established]",
      costlyError:
        "Not following up at all after silence — this reads as lack of interest, not politeness. [Well-established]",
      disconfirmingSignal:
        "Irritation at a written summary suggests an atypical or more relationship-first counterparty. [Contested]",
    },
    networking: {
      delta:
        "Largely converged — an open networking event with brief, purpose-stated conversations is a genuine local institution here, more than in most of this dataset. [Well-established]",
      sequence:
        "Quick introduction, stated purpose within minutes, exchange of contact info (often LinkedIn over a physical card); follow-up within 24–48 hours expected. [Well-established]",
      costlyError:
        "Under-stating your professional purpose out of politeness — reads as unprepared, not gracious. [Reported]",
      disconfirmingSignal:
        "A conversation that never states a professional purpose suggests a purely social event, not a networking one. [Contested]",
    },
  },

  ireland: {
    interview: {
      baseline: "b",
      delta:
        "Self-promotion is muted, often offset with self-deprecating humor even in a formal interview. [Reported]",
      sequence:
        "Achievements stated, then softened; interviewers may probe gently rather than directly. [Reported]",
      costlyError:
        "A humorless, credentials-heavy delivery can read as stiff. [Reported]",
      disconfirmingSignal:
        "A very direct, US-style pitch landing well suggests a US multinational's Dublin office — a genuinely large share of the market — rather than an indigenous firm. [Contested]",
    },
    "business-dinner": {
      delta:
        "The pub, not the restaurant, is often the real equivalent — substantive rapport-building happens there more than at a formal dinner. [Reported]",
      sequence:
        "Relaxed, humor-led conversation; business referenced lightly, rarely as the stated purpose. [Reported]",
      costlyError:
        "Steering the conversation too insistently toward business. [Reported]",
      disconfirmingSignal:
        "A formal, business-only dinner signals a corporate-finance or deal-stage context rather than the relationship-building norm. [Contested]",
    },
    presentation: {
      delta:
        "The room is engaged but softened: challenge arrives wrapped in humor or framed as a question, and the sharpest reservations often don't surface publicly at all. [Reported]",
      sequence:
        "Warm, responsive Q&A; objections gently framed, often self-deprecating; substantive doubts are more likely to arrive afterward, one-to-one. [Reported]",
      costlyError:
        "Reading a warm, joke-leavened Q&A as full agreement — the humor can be carrying the objection. [Reported]",
      disconfirmingSignal:
        "Blunt, unhedged public challenge suggests a trading-floor or tech-sector audience rather than the professional-services norm. [Contested]",
    },
    email: EMAIL_CONVERGED,
    networking: {
      delta:
        "The open-networking-event format is less load-bearing here than in the US — introductions through a mutual contact carry more weight than approaching a stranger cold. [Reported]",
      sequence:
        "Humor-led rapport before any stated purpose; direct self-promotion is muted. [Reported]",
      costlyError:
        "Leading with a direct pitch to someone you weren't introduced to. [Reported]",
      disconfirmingSignal:
        "An immediate, US-style pitch from a stranger signals a startup or recruiting event rather than the general pattern. [Contested]",
    },
  },

  australia: {
    interview: {
      baseline: "b",
      delta:
        "Largely converged with the muted-self-promotion pattern elsewhere in this cluster. [Reported]",
      sequence:
        "Achievements are stated plainly, without embellishment; overselling is noticed and discounted. [Reported]",
      costlyError:
        "A polished, credentials-forward opening reads as insecure. [Reported]",
      disconfirmingSignal:
        "An interviewer pushing you to 'sell yourself' harder signals a sales-driven or finance employer rather than the national register. [Contested]",
    },
    "business-dinner": {
      delta:
        "Largely converged with the US pattern — informal, direct, business discussed openly. [Reported]",
      sequence:
        "Casual opening, business surfaces naturally, no strict separation between social and professional talk. [Reported]",
      costlyError:
        "Over-formality at what's meant to be a relaxed setting. [Reported]",
      disconfirmingSignal:
        "A stiff, agenda-driven dinner suggests an atypical formal employer. [Contested]",
    },
    presentation: PRESENTATION_ANGLO,
    email: EMAIL_CONVERGED,
    networking: NETWORKING_AU,
  },

  "new-zealand": {
    interview: {
      baseline: "b",
      delta:
        "Largely converged with the muted-self-promotion pattern; real space is given to who the candidate is as a person, not just the resume. [Reported]",
      sequence:
        "Achievements stated plainly, without embellishment; genuine questions about the candidate beyond the resume are part of the assessment, not filler. [Reported]",
      costlyError:
        "Treating personal questions as filler rather than genuine interest. [Reported]",
      disconfirmingSignal:
        "A tightly scripted, resume-only interview suggests a larger corporate employer rather than the general norm. [Contested]",
    },
    "business-dinner": {
      delta:
        "Largely converged with an informal, direct working meal — a casual restaurant or barbecue is as likely a venue as a formal dinner. In a market this small, how you handle the social setting reaches your next counterparty before you do. [Reported]",
      sequence:
        "Casual opening, social and professional talk mixing freely; business surfaces naturally rather than by agenda. [Reported]",
      costlyError:
        "Over-formality, or treating the meal as a transaction to get through. [Reported]",
      disconfirmingSignal:
        "A stiff, agenda-driven dinner suggests a formal corporate context rather than the general norm. [Contested]",
    },
    presentation: PRESENTATION_ANGLO,
    email: EMAIL_CONVERGED,
    networking: {
      delta:
        "The standing-room event exists, but in a market this small, introductions through shared connections do most of the real work, and genuine mutual curiosity is expected before any ask. Self-promotion is muted; overselling is quietly discounted. [Reported]",
      sequence:
        "Casual approach, modest self-introduction, real questions in both directions before any professional purpose surfaces. [Reported]",
      costlyError:
        "Leading with credentials or an ask before mutual interest is established — reputations travel here, and the impression follows you. [Reported]",
      disconfirmingSignal:
        "Confident credential-leading landing well signals a recruiting- or sales-driven event rather than the general register. [Contested]",
    },
  },

  germany: {
    interview: {
      baseline: "c",
      delta:
        "Credentials (degrees, certifications, specific technical qualifications) carry real weight and are expected to be stated plainly. [Well-established]",
      sequence:
        "Formal opening, credential-led self-introduction, then substantive technical questioning. [Well-established]",
      costlyError:
        "Vague answers about qualifications instead of specific credentials. [Well-established]",
      disconfirmingSignal:
        "An informal, credential-light interview suggests a Berlin-style startup rather than a legacy corporate. [Reported]",
    },
    "business-dinner": {
      delta:
        "The meal is more clearly separated from business than the US pattern — substantive discussion often waits until after the meal concludes, if it happens at all. [Reported]",
      sequence:
        "Structured, courteous conversation through the meal; business, if raised, comes at the end. [Reported]",
      costlyError: "Introducing business topics early in the meal. [Reported]",
      disconfirmingSignal:
        "Business discussed openly mid-meal suggests a startup or tech context rather than a legacy corporate. [Contested]",
    },
    presentation: {
      delta:
        "Public, detailed critique of the content is normal and does not signal the audience is unconvinced. [Well-established]",
      sequence:
        "Questions are often technical and specific, delivered directly during or after. [Well-established]",
      costlyError:
        "Reading detailed critique as rejection rather than engagement. [Well-established]",
      disconfirmingSignal:
        "A room with no substantive questions suggests low engagement, not agreement. [Reported]",
    },
    email: {
      delta:
        "Written summaries are expected and often quite detailed — the written record functions as the operative reference going forward. [Well-established]",
      sequence:
        "Sent promptly, detailed; a chase after 1–2 weeks of silence is normal. [Well-established]",
      costlyError: "A vague or overly brief written summary. [Well-established]",
      disconfirmingSignal:
        "Annoyance at a detailed written follow-up suggests an atypical counterparty. [Reported]",
    },
    networking: NETWORKING_DACH,
  },

  switzerland: {
    interview: {
      baseline: "c",
      delta:
        "Similar to Germany; precision and specificity in describing past work are valued over broad claims. [Reported]",
      sequence: "Formal, detail-oriented questioning throughout. [Reported]",
      costlyError:
        "Broad, unspecific answers to direct technical questions. [Reported]",
      disconfirmingSignal:
        "A loosely structured, conversational interview suggests a smaller firm or startup rather than the corporate norm. [Contested]",
    },
    "business-dinner": {
      delta:
        "Similar separation to Germany, with discretion valued — personal or client details are avoided even in relaxed settings. [Reported]",
      sequence:
        "Courteous, measured conversation; business deferred to the close of the meal or a separate follow-up. [Reported]",
      costlyError: "Discussing other clients or deals at the table. [Reported]",
      disconfirmingSignal:
        "Open, casual business talk mid-meal suggests a trading-house or startup host rather than the corporate norm. [Contested]",
    },
    presentation: {
      delta:
        "Critique is direct but more measured in delivery than Germany or the Netherlands; precision of the challenge matters. [Reported]",
      sequence: "Focused, specific questions. [Reported]",
      costlyError:
        "An imprecise answer to a precise question is noticed more than the substance of the disagreement itself. [Reported]",
      disconfirmingSignal:
        "Loosely framed challenges suggest an atypical, less formal audience. [Contested]",
    },
    email: EMAIL_CONVERGED,
    networking: NETWORKING_DACH,
  },

  netherlands: {
    interview: {
      baseline: "c",
      delta:
        "Interviewers often ask direct, sometimes blunt follow-up questions to test how a candidate handles pushback in real time. [Well-established]",
      sequence:
        "Credential-led opening, then direct challenge to specific claims. [Well-established]",
      costlyError:
        "Visible defensiveness when a claim is challenged. [Well-established]",
      disconfirmingSignal:
        "A purely confirmatory, non-challenging interview suggests a non-Dutch-led organization. [Reported]",
    },
    "business-dinner": {
      delta:
        "Largely converged with the direct, business-can-surface-anytime pattern; less ceremony than Germany or Switzerland. [Reported]",
      sequence: "Informal, business raised whenever relevant. [Reported]",
      costlyError:
        "Over-formality that doesn't match the relaxed setting. [Reported]",
      disconfirmingSignal:
        "A highly structured, formal dinner suggests an atypical host. [Contested]",
    },
    presentation: {
      delta:
        "Blunt, public critique of the content is normal and can begin before the presentation ends — it signals engagement here more than almost anywhere else in this dataset. [Reported]",
      sequence:
        "Interruption mid-slide is unremarkable; questions are direct and expect equally direct answers. [Reported]",
      costlyError:
        "Reading blunt public critique as hostility or a failing pitch — it usually means the room is taking the content seriously. [Reported]",
      disconfirmingSignal:
        "A quiet, deferential room is the unusual signal here — worth asking directly what the room thinks. [Reported]",
    },
    email: EMAIL_CONVERGED,
    networking: {
      delta:
        "Largely converged with Germany/Switzerland; conversations can include direct, immediate opinions or pushback even on a first meeting. [Reported]",
      sequence:
        "Efficient, direct exchange, opinions stated plainly early on. [Reported]",
      costlyError:
        "Reading direct pushback in a first conversation as unfriendly. [Reported]",
      disconfirmingSignal:
        "Extended pleasantries without any direct opinion offered suggests an atypical, more reserved attendee. [Contested]",
    },
  },

  sweden: {
    interview: {
      baseline: "b",
      delta:
        "Self-promotion is muted; collaborative framing ('we' over 'I') is often rewarded even in individual interviews. [Reported]",
      sequence:
        "Achievements framed within team context; direct individual credit-taking is less common. [Reported]",
      costlyError:
        "Framing every achievement as individually earned. [Reported]",
      disconfirmingSignal:
        "Confident individual credit-taking landing well suggests a smaller founder-led company. [Contested]",
    },
    "business-dinner": {
      delta:
        "Fika — a coffee break, not a dinner — is often where real rapport-building happens, more so than a formal evening meal. [Well-established]",
      sequence:
        "Informal, unhurried; business surfaces gently, without a hard push. [Reported]",
      costlyError: "Skipping the fika invitation as unimportant. [Reported]",
      disconfirmingSignal:
        "A formal, business-scripted dinner suggests an atypical, more corporate host rather than the general norm. [Contested]",
    },
    presentation: {
      delta:
        "Questions tend to build collaboratively on the material rather than challenge it adversarially; silence more often means the room is still processing, not agreement. [Well-established]",
      sequence:
        "Questions arrive after a pause, framed constructively. [Well-established]",
      costlyError:
        "Filling silence too quickly, before the room has had time to formulate a question. [Reported]",
      disconfirmingSignal:
        "Immediate, sharp challenge suggests a smaller founder-led company diverging from the norm. [Reported]",
    },
    email: EMAIL_CONVERGED,
    networking: {
      delta:
        "The fika format — a coffee conversation, not a standing-room event — is often the more genuine networking equivalent. [Reported]",
      sequence:
        "Unhurried, collaborative conversation; a direct individual ask is less common than a shared, exploratory framing. [Reported]",
      costlyError: "Pushing for a fast individual commitment. [Reported]",
      disconfirmingSignal:
        "A fast, transactional ask suggests a founder-led startup context rather than the consensus norm. [Contested]",
    },
  },

  china: {
    interview: {
      baseline: "d",
      delta:
        "Self-promotion norms vary sharply by sector — modest and organization-framed at state-owned enterprises, direct and individually framed at founder-led tech companies. [Reported]",
      sequence:
        "Formality and framing follow the sector split above. [Reported]",
      costlyError: "Applying one register to both contexts. [Well-established]",
      disconfirmingSignal:
        "A blunt, individually-framed pitch landing well signals a tech/startup employer. [Reported]",
    },
    "business-dinner": {
      delta:
        "The banquet is a significant relationship-building institution, distinct from a Western working dinner — toasting rituals, seating order, and who pays all carry meaning; the host typically pays and this should not be contested. [Well-established]",
      sequence:
        "Formal seating by seniority; toasting throughout; direct business talk is often minimal at the table itself, more relationship-confirming than deal-making. [Well-established]",
      costlyError:
        "Insisting on splitting the bill, or raising business terms too directly at the table. [Well-established]",
      disconfirmingSignal:
        "A casual, unceremonial business dinner suggests a Shenzhen-style founder-led host, not a state-owned or legacy one. [Reported]",
      readerNote:
        "In some regions, heavy toasting culture involves social pressure to drink — declining gracefully (citing health, driving, or simply preference) is increasingly accepted and rarely damages the relationship. [Reported] Toasts at a formal banquet are often routed senior-to-senior and man-to-man, and a woman leading a delegation may find toasts directed past her to a male colleague. Initiating the toast herself, or having the host briefed beforehand on who leads the delegation, are accepted correctives — not breaches of etiquette. [Contested] Where this shades from custom into exclusion, the 'Where adaptation stops' note under Method & Sources applies. [Contested]",
    },
    presentation: {
      delta:
        "Public challenge is uncommon in state-owned or legacy contexts; notably more open in founder-led tech companies. Real pushback in traditional contexts often surfaces through an intermediary afterward. [Reported]",
      sequence:
        "Formal, quiet room in traditional contexts; direct, open questioning in tech/startup contexts. [Reported]",
      costlyError:
        "Assuming silence means agreement in a traditional-company context. [Well-established]",
      disconfirmingSignal:
        "Direct, informal challenge in the room signals a tech/startup audience. [Reported]",
    },
    email: {
      delta:
        "A formal written summary can register as distrust of what was agreed verbally, more so in relationship-first traditional contexts than in tech/startup ones, where it's standard practice. [Reported]",
      sequence:
        "A warm, brief note is safer in traditional relationship contexts; chasing should be gentle, often through a warm check-in rather than a direct request. [Reported]",
      costlyError:
        "A terse, contractual-sounding follow-up too early in the relationship. [Reported]",
      disconfirmingSignal:
        "A detailed written summary landing well signals a tech/startup counterparty. [Reported]",
    },
    networking: {
      delta:
        "Guanxi — the cultivation of a long-term reciprocal relationship — functions as the real infrastructure of networking here, more than any single event. A first conversation is typically understood as one step in a longer process. [Well-established]",
      sequence:
        "Formal card exchange (both hands), relationship-establishing conversation; concrete commitments are rarely expected at this stage. [Well-established]",
      costlyError:
        "Expecting a first conversation to produce a concrete result. [Well-established]",
      disconfirmingSignal:
        "A fast-moving, immediately transactional conversation signals a founder-led tech company. [Reported]",
    },
  },

  japan: {
    interview: {
      baseline: "b",
      delta:
        "Self-promotion is muted; achievements are often framed as team or organizational outcomes rather than individual ones, more so in legacy firms than younger tech companies. [Well-established]",
      sequence:
        "Formal opening, modest self-introduction, questions often probe fit and process over individual accomplishment. [Well-established]",
      costlyError:
        "Individually-framed credit-taking can read as poor team fit. [Well-established]",
      disconfirmingSignal:
        "Direct individual credit-taking landing well signals a younger tech company. [Well-established]",
    },
    "business-dinner": {
      delta:
        "The equivalent is often an izakaya visit after work — a more informal, unscripted setting where real candor can emerge that doesn't surface in the office. Seniority still shapes seating and pouring etiquette (pour for others before yourself). [Well-established]",
      sequence:
        "Initial toast, food and drink shared communally, conversation loosens as the evening continues; business is rarely the explicit topic. [Well-established]",
      costlyError:
        "Treating the informality as an invitation to raise business terms directly — it usually isn't. [Well-established]",
      disconfirmingSignal:
        "A younger colleague raising business directly at this kind of gathering signals a younger company. [Reported]",
      readerNote:
        "The after-hours izakaya circuit remains male-dominated terrain in many legacy firms: women are invited less often, and when present can be read as guests rather than participants in the candor the setting exists to produce. Because real reservations often surface there rather than in the office, a reader excluded from the evening is losing information, not just a social event — asking a trusted counterpart afterward what was actually said is legitimate practice, not prying. [Contested] The 'Where adaptation stops' note under Method & Sources applies here too. [Contested]",
    },
    presentation: {
      delta:
        "Public challenge is rare, especially from junior attendees; a lack of questions in the room does not mean agreement — real questions and pushback often arrive afterward, one-to-one, in the corridor. [Well-established]",
      sequence:
        "Formal, largely silent Q&A in the room; substantive follow-up happens privately, sometimes days later. [Well-established]",
      costlyError:
        "Treating a silent room as full buy-in and moving forward without following up individually. [Well-established]",
      disconfirmingSignal:
        "Direct public challenge, especially from a junior attendee, signals a younger tech company. [Well-established]",
    },
    email: {
      delta:
        "A written summary can be read as diligence in modern/tech contexts, but in more traditional relationships, putting something in writing too quickly or too formally can register as a lack of trust in what was agreed verbally. [Reported]",
      sequence:
        "A brief, warm thank-you note is safer than a detailed formal summary in traditional contexts; chasing silence should be gentle and indirect rather than a direct demand for a response. [Reported]",
      costlyError:
        "A terse, purely transactional follow-up email in a traditional relationship. [Reported]",
      disconfirmingSignal:
        "A detailed, formal written summary landing well signals a modern/tech counterparty. [Reported]",
    },
    networking: {
      delta:
        "The standing-room networking event, as an Anglo-American institution, translates imperfectly — being introduced through a mutual contact matters considerably more than approaching someone cold. Business cards are exchanged with both hands, studied briefly, and never pocketed immediately. [Well-established]",
      sequence:
        "Formal introduction (ideally brokered), card exchange, modest rapport-building before any professional ask. [Well-established]",
      costlyError:
        "Approaching cold without an introduction, or handling a received card casually. [Well-established]",
      disconfirmingSignal:
        "An open, cold-approach conversation landing well signals a younger tech-company context. [Well-established]",
    },
  },

  "south-korea": {
    interview: {
      baseline: "d",
      delta:
        "Similar modesty to Japan in legacy conglomerates; markedly more individually self-promotional in startup interviews. [Reported]",
      sequence:
        "Formal in conglomerate interviews; casual and direct in startup ones. [Reported]",
      costlyError:
        "Assuming one register applies across both contexts. [Reported]",
      disconfirmingSignal:
        "A relaxed, individually-framed interview signals a startup context. [Reported]",
    },
    "business-dinner": {
      delta:
        "A multi-stage evening (dinner, then a second and sometimes third venue) is common in more traditional company cultures; attendance signals commitment to the relationship. Less pronounced in startups. [Well-established]",
      sequence:
        "Formal dinner first, informal venues follow; hierarchy shapes who initiates toasts and who is expected to stay latest. [Well-established]",
      costlyError:
        "Leaving early from a traditional company's multi-stage evening without acknowledgment. [Well-established]",
      disconfirmingSignal:
        "A single, early-ending dinner signals a startup rather than a chaebol-affiliated company. [Reported]",
      readerNote:
        "As in China, drinking-heavy gatherings carry some social pressure; declining is increasingly accepted, particularly in younger companies. [Reported] For women, the multi-stage evening carries a structurally different calculus: later venues can shift from relationship-building toward settings where presence itself is read differently, and deciding when to leave is a judgment call male colleagues rarely face. Arranging an early exit through the host or a senior ally beforehand is a recognized move, not a slight. [Contested] Where attendance pressure shades into a condition of the relationship, the 'Where adaptation stops' note under Method & Sources applies. [Contested]",
    },
    presentation: {
      delta:
        "Similar to Japan in legacy organizations — real questions surface privately afterward, more so than in the room; startups diverge, with open Q&A common. [Reported]",
      sequence:
        "Formal room, quiet Q&A; private follow-up in traditional settings. [Reported]",
      costlyError:
        "Not following up individually after a quiet room, in a traditional-company context. [Reported]",
      disconfirmingSignal:
        "Open public challenge signals a startup context. [Reported]",
    },
    email: {
      delta:
        "Similar to Japan in traditional company contexts; more direct and Western-style in startups. [Reported]",
      sequence:
        "Warm, brief follow-up in traditional contexts; detailed and prompt in startup contexts. [Reported]",
      costlyError:
        "A cold, overly formal email in a traditional relationship context. [Reported]",
      disconfirmingSignal:
        "A detailed, efficient written summary landing well signals a startup counterparty. [Reported]",
    },
    networking: {
      delta:
        "Similar emphasis on introduction/brokering as Japan; the after-event social gathering often does more relationship-building than the formal event itself. [Well-established]",
      sequence:
        "Formal card exchange, age/seniority established early through introductions; real rapport-building often continues afterward. [Well-established]",
      costlyError:
        "Treating the after-event gathering as optional. [Well-established]",
      disconfirmingSignal:
        "Real business progress happening entirely within the formal event, with no after-gathering, signals a startup context. [Reported]",
    },
  },

  singapore: {
    interview: {
      baseline: "c",
      delta:
        "Credentials matter, delivered efficiently; self-promotion is acceptable within a fairly formal register. [Reported]",
      sequence:
        "Formal opening, efficient movement through qualifications and experience. [Reported]",
      costlyError:
        "Over-elaborating past the point the interviewer needs. [Reported]",
      disconfirmingSignal:
        "A very informal interview suggests a startup employer rather than the corporate or government-linked norm. [Contested]",
    },
    "business-dinner": {
      delta:
        "Largely converged with an efficient, relatively informal working meal — less ceremony than China, Japan, or South Korea. [Reported]",
      sequence:
        "Business can surface directly, without a long deferral period. [Reported]",
      costlyError:
        "Over-formality that doesn't match the efficient local register. [Reported]",
      disconfirmingSignal:
        "A highly ritualized, ceremony-heavy meal suggests an atypical, more traditional host. [Contested]",
    },
    presentation: {
      delta:
        "Delivery is efficient; direct questions are acceptable within a respectful register, real challenge often reserved for one-to-one follow-up rather than the open room. [Reported]",
      sequence:
        "Formal Q&A in the room; more candid questions may come afterward privately. [Reported]",
      costlyError:
        "Assuming an unchallenged public Q&A means full agreement. [Reported]",
      disconfirmingSignal:
        "Sharp public challenge signals a startup audience rather than the corporate norm. [Contested]",
    },
    email: EMAIL_CONVERGED,
    networking: {
      delta:
        "A genuine hybrid — card exchange with two hands as in East Asia, but pace and directness once formalities are observed sit closer to the Western pattern. [Well-established]",
      sequence:
        "Formal card exchange, efficient transition to substance. [Well-established]",
      costlyError:
        "Assuming the efficiency means the card-exchange formality doesn't matter. [Reported]",
      disconfirmingSignal:
        "Skipping the card exchange entirely signals a startup-scene event rather than the corporate norm. [Contested]",
    },
  },

  uae: {
    interview: {
      baseline: "e",
      delta:
        "Personal and family context may be raised as part of establishing who the candidate is, more common in family-owned or government-adjacent employers than multinational offices. [Reported]",
      sequence:
        "Relationship-establishing opening before substantive questioning. [Reported]",
      costlyError:
        "A purely transactional, credentials-only opening can read as cold. [Reported]",
      disconfirmingSignal:
        "A brisk, transactional interview signals a free-zone or fintech employer rather than a family-owned or government-adjacent one. [Contested]",
    },
    "business-dinner": {
      delta:
        "A shared meal, often at the host's invitation and expense, is a significant relationship gesture — declining without good reason can be read poorly. Alcohol is often absent; this should not be assumed to mean the gathering is less significant. [Well-established]",
      sequence:
        "Extended hospitality and conversation; business is rarely the explicit focus of the meal itself. [Well-established]",
      costlyError:
        "Treating the meal as purely social and disconnected from the business relationship. [Reported]",
      disconfirmingSignal:
        "A brief, transactional meal suggests a free-zone or fintech host rather than a family-owned business. [Contested]",
      readerNote:
        "Gender-mixed business meals are normal in the UAE's commercial mainstream, and the hospitality itself is warm regardless of the reader's gender. Greetings differ: some counterparts do not shake hands across gender for religious reasons — waiting for the other party to offer a hand first, whatever your own gender, avoids the misstep entirely and reads as courtesy, not hesitation. [Reported] Who hosts, and who attends, can narrow with gender in more traditional family businesses. [Contested] If participation is ever conditioned on a colleague's absence, the 'Where adaptation stops' note under Method & Sources applies. [Contested]",
    },
    presentation: {
      delta:
        "Public challenge is uncommon; real questions or concerns are more likely to surface in a private follow-up conversation, particularly with senior attendees. [Reported]",
      sequence:
        "Formal, respectful room; substantive follow-up happens privately. [Reported]",
      costlyError:
        "Treating a quiet room as full agreement without private follow-up. [Reported]",
      disconfirmingSignal:
        "Open public challenge signals a free-zone or fintech audience rather than a family-owned or government-adjacent one. [Contested]",
    },
    email: {
      delta:
        "A written follow-up should reference the relationship and hospitality shared, not just the business discussed — a purely transactional summary can feel cold. [Reported]",
      sequence:
        "Warm framing throughout; chasing silence should be patient and relationship-toned rather than urgent. [Reported]",
      costlyError: "A terse, deadline-driven chase email. [Reported]",
      disconfirmingSignal:
        "A brisk, purely transactional follow-up landing well signals a free-zone or fintech counterparty. [Contested]",
    },
    networking: {
      delta:
        "Extended personal conversation — questions about wellbeing, family, hospitality offered and accepted — is not preamble to networking, it is the actual work of it. [Well-established]",
      sequence:
        "Extended hospitality-driven conversation; professional purpose surfaces only once this concludes naturally. [Well-established]",
      costlyError: "Rushing toward the professional ask. [Well-established]",
      disconfirmingSignal:
        "An efficient, fast-moving conversation signals a free-zone or fintech context rather than the general norm. [Reported]",
    },
  },

  india: {
    interview: {
      baseline: "d",
      delta:
        "Personal and family context is often part of the conversation, more so in traditional sectors than tech/startups, where the tone is notably more Western and individually framed. [Reported]",
      sequence:
        "Traditional-sector interviews open with more personal context; tech interviews move quickly to individual technical assessment. [Reported]",
      costlyError:
        "Assuming personal questions are irrelevant to the hiring decision in traditional-sector contexts. [Reported]",
      disconfirmingSignal:
        "A tightly scripted, personal-question-free interview signals a tech/startup employer. [Reported]",
    },
    "business-dinner": {
      delta:
        "A shared meal, often at the host's home or a family-style restaurant, signals real relationship investment; declining without good reason can be read as distancing. [Reported]",
      sequence:
        "Warm, extended hospitality; business may be discussed throughout rather than deferred, particularly in traditional sectors. [Reported]",
      costlyError:
        "Rushing through the meal or declining seconds when offered — hospitality is meant to be received generously. [Reported]",
      disconfirmingSignal:
        "A brief, efficient business lunch suggests a tech/startup context calibrated to Western pace. [Reported]",
    },
    presentation: {
      delta:
        "Questions are common and can be detailed, though direct public challenge of a senior presenter is less common in traditional sectors than in tech/startup audiences. [Reported]",
      sequence:
        "Detailed clarifying questions throughout; sharper challenge more likely in tech contexts. [Reported]",
      costlyError:
        "Reading detailed clarifying questions as skepticism rather than genuine engagement. [Reported]",
      disconfirmingSignal:
        "Direct, pointed public challenge signals a tech/startup audience. [Reported]",
    },
    email: {
      delta:
        "A written summary is generally well received, particularly in tech/startup contexts; traditional-sector relationships may expect a warmer, more personal tone than a purely transactional one. [Reported]",
      sequence:
        "Prompt in tech contexts; warmer and slightly less urgent in traditional-sector relationships. [Reported]",
      costlyError:
        "A cold, transactional tone in a traditional-sector relationship. [Reported]",
      disconfirmingSignal:
        "A brisk, efficient exchange landing well signals a tech/startup counterparty. [Reported]",
    },
    networking: {
      delta:
        "Who introduced you shapes the conversation from the outset; a warmer, more circling conversational pace than the Anglo baseline is typical, more so in traditional sectors than tech. [Reported]",
      sequence:
        "Relational framing from the start, referencing the introduction if one exists; professional and personal topics interweave. [Reported]",
      costlyError:
        "Treating the warm, circling conversation as unfocused. [Reported]",
      disconfirmingSignal:
        "A tight, linear, purpose-first conversation signals a tech/startup attendee. [Reported]",
    },
  },

  brazil: {
    interview: {
      baseline: "e",
      delta:
        "Warmth and personal rapport are part of how a candidate is assessed, alongside credentials — a candidate who builds rapport well is read favorably even with a modest resume. [Reported]",
      sequence:
        "Personal rapport-building opens the interview before substantive questions. [Reported]",
      costlyError: "A cold, purely credentials-focused delivery. [Reported]",
      disconfirmingSignal:
        "A brisk, no-rapport interview signals a São Paulo banking or private-equity employer. [Contested]",
    },
    "business-dinner": {
      delta:
        "The meal runs long by design — rushing it undercuts the relationship-building it's meant to accomplish. [Well-established]",
      sequence:
        "Extended, warm conversation throughout; business surfaces naturally rather than on a schedule. [Well-established]",
      costlyError:
        "Checking the time or steering urgently back to business. [Well-established]",
      disconfirmingSignal:
        "A tightly time-boxed meal suggests a banking or private-equity context rather than the broader norm. [Contested]",
    },
    presentation: {
      delta:
        "Questions can be warm and engaged, direct once rapport with the presenter is established, less so on a first encounter. [Reported]",
      sequence:
        "Engaged, personable Q&A once the room is comfortable with the presenter. [Reported]",
      costlyError:
        "A cold, purely transactional presentation style limiting how much the room engages. [Reported]",
      disconfirmingSignal:
        "A formal, unengaged room suggests low rapport rather than the general norm. [Contested]",
    },
    email: {
      delta:
        "A warm, personal tone in the written follow-up matters — a purely businesslike summary can undercut the rapport built in person. [Reported]",
      sequence:
        "Warm framing, referencing the personal conversation, not just the business discussed; chasing silence can be more direct once rapport is established. [Reported]",
      costlyError: "A cold, purely transactional follow-up email. [Reported]",
      disconfirmingSignal:
        "A brisk, efficient email landing well signals a banking or private-equity counterparty. [Contested]",
    },
    networking: {
      delta:
        "Physical warmth and genuine personal interest precede any professional ask — this is read as professionalism, not its absence. [Well-established]",
      sequence:
        "Warm personal conversation first; professional purpose surfaces naturally, not on a schedule. [Well-established]",
      costlyError:
        "Typical Western brevity or physical distance reads as coldness. [Well-established]",
      disconfirmingSignal:
        "An efficient, purpose-first conversation signals a finance-sector attendee rather than the broader norm. [Contested]",
    },
  },

  italy: {
    interview: {
      baseline: "e",
      delta:
        "Similar to Brazil — presentation and personal rapport carry real weight alongside stated qualifications. [Reported]",
      sequence:
        "Personal rapport-building precedes substantive assessment. [Reported]",
      costlyError:
        "Treating credentials alone as sufficient without attention to how they're presented. [Reported]",
      disconfirmingSignal:
        "A purely credentials-driven interview signals Milanese finance rather than a family-owned firm. [Contested]",
    },
    "business-dinner": {
      delta:
        "Similar to Brazil — the meal is unhurried by design, and how it's enjoyed is itself part of the professional impression made. [Reported]",
      sequence:
        "Long, attentive to the meal itself, business discussed comfortably within a relaxed frame rather than urgently. [Reported]",
      costlyError: "Visible impatience with the meal's pace. [Reported]",
      disconfirmingSignal:
        "A rushed, efficiency-focused meal suggests a Milanese finance host rather than a family-owned firm. [Contested]",
    },
    presentation: {
      delta:
        "Similar to Brazil — engagement and directness in Q&A track with how much rapport the presenter has built, not just content quality. [Reported]",
      sequence:
        "Engaged once rapport is present; more reserved on a first encounter. [Reported]",
      costlyError:
        "Assuming content quality alone will generate engagement without any relationship-building. [Reported]",
      disconfirmingSignal:
        "A highly formal, low-engagement room suggests low rapport with the presenter rather than the general norm. [Contested]",
    },
    email: {
      delta:
        "Similar to Brazil — tone and warmth in the written follow-up matter alongside its content. [Reported]",
      sequence: "Warm, personally framed follow-up. [Reported]",
      costlyError: "A cold, purely transactional tone. [Reported]",
      disconfirmingSignal:
        "A brisk, efficient email landing well signals a Milanese finance counterparty. [Contested]",
    },
    networking: {
      delta:
        "Personal texture — genuine conversation, not just transactional exchange — is expected before any professional ask surfaces. [Reported]",
      sequence:
        "Personal conversation first; professional purpose emerges comfortably within it rather than being stated directly. [Reported]",
      costlyError: "Skipping to the professional ask too quickly. [Reported]",
      disconfirmingSignal:
        "An efficient, purpose-first approach signals a finance-sector attendee rather than the general pattern. [Contested]",
    },
  },
};

/* ---------------------------------------------------------------- */
/* Converged-block consistency check.                                 */
/*                                                                    */
/* Bug class (caught twice by manual audit before this existed:       */
/* Switzerland/negotiation, Ireland/presentation): a country reuses a */
/* shared "largely converged with X" block while sitting in a         */
/* different tier from X on the axis that governs the block's claim.  */
/*                                                                    */
/* Rule: a BARE shared block requires the same tier (score ≥4 / =3 /  */
/* ≤2, matching the lens cutoffs) as the reference country on the     */
/* governing axis. Appending a country-specific rider — which states  */
/* the difference — exempts the cell. A block whose own text already  */
/* states a delta from the reference gets one tier of slack, never    */
/* two. Deterministic over static data and unguarded, so a violation  */
/* throws during `next build` prerender and fails the build before    */
/* anything ships.                                                    */
/* ---------------------------------------------------------------- */

const scoreTier = (countryId: string, axis: keyof PnAxes): number => {
  const score = getPnCountry(countryId)!.axes[axis].score;
  return score >= 4 ? 0 : score === 3 ? 1 : 2;
};

const sharedBlockChecks: {
  name: string;
  axis: keyof PnAxes;
  reference: string;
  block: string;
  /* The block's own text states a delta from the reference. */
  statesDelta?: boolean;
  text: (countryId: string) => string | undefined;
}[] = [
  {
    name: "negotiation / Anglo baseline",
    axis: "decisionLocus",
    reference: "united-states",
    block: NEGOTIATION_ANGLO_BASELINE,
    text: (id) => pnCells[id]?.negotiation.delta,
  },
  {
    name: "presentation / Anglo",
    axis: "disagreement",
    reference: "united-states",
    block: PRESENTATION_ANGLO.delta,
    text: (id) => pnCellsTier2[id]?.presentation.delta,
  },
  {
    name: "email / converged",
    axis: "contractFunction",
    reference: "united-states",
    block: EMAIL_CONVERGED.delta,
    text: (id) => pnCellsTier2[id]?.email.delta,
  },
  {
    name: "networking / muted US format",
    axis: "trustBasis",
    reference: "united-states",
    statesDelta: true,
    block: NETWORKING_AU.delta,
    text: (id) => pnCellsTier2[id]?.networking.delta,
  },
  {
    name: "networking / DACH",
    axis: "trustBasis",
    reference: "germany",
    statesDelta: true,
    block: NETWORKING_DACH.delta,
    text: (id) => pnCellsTier2[id]?.networking.delta,
  },
];

for (const check of sharedBlockChecks) {
  for (const country of pnCountries) {
    const text = check.text(country.id);
    if (!text || !text.startsWith(check.block)) continue;
    if (text.length > check.block.length) continue; // rider states the delta
    const distance = Math.abs(
      scoreTier(country.id, check.axis) - scoreTier(check.reference, check.axis),
    );
    if (distance > (check.statesDelta ? 1 : 0)) {
      throw new Error(
        `Converged-block violation: ${country.name} uses the "${check.name}" ` +
          `shared block bare, but sits ${distance} tier(s) away from its ` +
          `reference (${check.reference}) on ${String(check.axis)}. ` +
          `Give the cell a rider stating the difference, or its own content.`,
      );
    }
  }
}
