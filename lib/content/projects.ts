import type { Project } from "./types";

/*
 * All prose below is DRAFT PLACEHOLDER content — realistic in tone and
 * structure so the layouts read truthfully, but not final writing.
 * Every project carries draft: true, which renders a visible draft badge.
 */

export const projects: Project[] = [
  /* ---------------- Strategy ---------------- */
  {
    type: "standard",
    slug: "costco-membership-model",
    domain: "strategy",
    folder: "market-entry",
    coordinate: "S-01",
    title: "Costco's Membership Model",
    question: "Why do nine out of ten members renew, year after year?",
    date: "2026-03-10",
    readingTime: 14,
    hero: "/placeholders/ph-1.svg",
    draft: true,
    pdf: "/artifacts/sample-report.pdf",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Costco is usually described as a retailer, but its financial statements describe something closer to a subscription business that happens to sell groceries. The membership fee is small relative to a household's annual spending, yet it produces most of the company's operating income. This project asks what the fee actually buys — not in goods, but in psychology.",
          },
          {
            kind: "p",
            text: "The investigation began in a warehouse aisle, watching shoppers pass premium brands to reach Kirkland Signature. A private label that outsells the brands it imitates is not a pricing story. It is a trust story.",
          },
          {
            kind: "quote",
            text: "The membership card is not a payment. It is a boundary — and people defend what sits inside their boundaries.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Three mechanisms appear to hold the model together. First, the fee reframes every purchase: once paid, savings become the return on an investment the member has already made, and renewal becomes the way to protect it. Second, deliberate scarcity — roughly four thousand SKUs against a supermarket's forty thousand — converts choice from a burden into a curation the member has outsourced. Third, the treasure-hunt rotation gives repetition a reason: the warehouse is never quite the same place twice.",
          },
          {
            kind: "p",
            text: "Comparing renewal cohorts against published loyalty research suggests the fee functions less like a price and more like a commitment device. The economics literature calls this a sunk-cost effect. Members appear to experience it as belonging.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "For organizations studying Costco, the transferable lesson is not the fee — it is the discipline. Every visible decision, from packaging to parking, communicates that the organization spends the member's money reluctantly. Imitating the membership without imitating the restraint produces a paywall, not a club.",
          },
          {
            kind: "list",
            items: [
              "Treat pricing structure as a communication channel, not only a revenue lever.",
              "Reduce assortment before reducing price; curation is a service members can feel.",
              "Protect one visible symbol of discipline the way Costco protects the $1.50 hot dog.",
            ],
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Annual report notes",
        kind: "notes",
        description:
          "Reading notes on five years of 10-K filings, focused on membership economics. (Draft placeholder.)",
      },
      {
        label: "Renewal-rate dataset",
        kind: "dataset",
        description:
          "Published renewal figures by region, 2015–2025, compiled for comparison. (Draft placeholder.)",
      },
      {
        label: "Full report (PDF)",
        kind: "pdf",
        href: "/artifacts/sample-report.pdf",
        description: "The complete written analysis as a downloadable document.",
      },
    ],
    continueExploring: [
      {
        slug: "duolingo-habit-formation",
        relationship: "deepen",
        note: "The renewal decision is a habit before it is a calculation.",
      },
      {
        slug: "thinking-fast-and-slow",
        relationship: "deepen",
        note: "Kahneman on why sunk costs feel like belonging.",
      },
      {
        slug: "shenzhen-metro-observations",
        relationship: "observe",
        note: "Another system that earns trust through visible discipline.",
      },
    ],
  },
  {
    type: "standard",
    slug: "market-entry-southeast-asia",
    domain: "strategy",
    folder: "market-entry",
    coordinate: "S-02",
    title: "Warehouse Retail in Southeast Asia",
    question: "When should a retailer adapt, and when should it insist?",
    date: "2026-01-22",
    readingTime: 11,
    hero: "/placeholders/ph-2.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Every market entry is a negotiation between identity and context. This project examines warehouse-club expansion into Southeast Asian cities — dense, humid, apartment-living markets that would seem to reject every assumption bulk retail is built on.",
          },
          {
            kind: "p",
            text: "The puzzle is that the format sometimes works anyway. Understanding why requires separating what a business model does from what it says — and noticing which parts of the experience customers were actually buying all along.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Where the format succeeds, operators appear to have adapted the logistics while insisting on the identity: smaller pack sizes and urban formats, but unchanged pricing discipline and the same treasure-hunt theater. Where it fails, the adaptation ran the other direction — the identity was localized into something indistinct while the cost structure stayed foreign.",
          },
          {
            kind: "quote",
            text: "Customers forgave the format for being unfamiliar. They did not forgive it for being unclear.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "The working rule this analysis suggests: adapt everything the customer touches with their hands, and insist on everything the customer holds in their head. Logistics are local. Meaning is not.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Market comparison framework",
        kind: "framework",
        description:
          "A two-axis framework separating operational adaptation from identity adaptation. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "costco-membership-model",
        relationship: "expand",
        note: "The identity being exported — examined at home.",
      },
      {
        slug: "shenzhen-metro-observations",
        relationship: "observe",
        note: "Field notes from the region this analysis abstracts.",
      },
    ],
  },
  {
    type: "standard",
    slug: "juicy-couture-brand-audit",
    domain: "strategy",
    folder: "brand-strategy",
    coordinate: "S-03",
    title: "Juicy Couture Brand Audit",
    question: "Can heritage brands reinvent themselves without losing authenticity?",
    date: "2025-11-05",
    readingTime: 9,
    hero: "/placeholders/ph-3.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Juicy Couture is a case study in what happens when a brand's cultural moment ends before the brand does. The velour tracksuit was not a product; it was a timestamp. This audit examines the brand's revival attempts and asks which parts of a heritage identity are assets, which are anchors, and how an organization can tell the difference before spending on the wrong one.",
          },
          {
            kind: "p",
            text: "The audit compares three revival waves against the brand's original meaning, using archived campaigns, resale-market pricing, and the brand's own shifting vocabulary about itself.",
          },
          {
            kind: "quote",
            text: "Nostalgia is rented, never owned. A brand that lives on it pays rising rent to its own past.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Campaign archive",
        kind: "source",
        description:
          "Annotated advertising from 2001–2025, organized by claimed identity. (Draft placeholder.)",
      },
      {
        label: "Resale price tracking",
        kind: "dataset",
        description:
          "Secondary-market pricing as a proxy for cultural value. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "designing-the-atlas",
        relationship: "compare",
        note: "Identity built to age deliberately rather than accidentally.",
      },
      {
        slug: "smithsonian-signage",
        relationship: "observe",
        note: "Institutions that carry heritage without being trapped by it.",
      },
    ],
  },

  /* ---------------- Communication ---------------- */
  {
    type: "standard",
    slug: "product-recall-simulation",
    domain: "communication",
    folder: "crisis-communication",
    coordinate: "COM-01",
    title: "Product Recall Simulation",
    question: "What does honesty cost during a crisis — and what does it buy?",
    date: "2026-02-14",
    readingTime: 12,
    hero: "/placeholders/ph-4.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "This simulation drafts the full communication sequence for a fictional consumer-goods recall: the first statement, the follow-up under new facts, the internal memo, and the return-to-market announcement. The constraint was writing each document before knowing how the next round of facts would break — the way real communicators must.",
          },
          {
            kind: "p",
            text: "The exercise tests a hypothesis from the trust literature: that early candor is expensive in the first news cycle and cheap in every cycle after.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Drafting under sequential uncertainty exposed a pattern the finished documents hide: every hedge in the first statement became a liability in the second. Language written to preserve options instead preserved doubt. The documents that survived new facts were the ones that had committed to specifics early — dates, counts, names of responsible executives.",
          },
          {
            kind: "quote",
            text: "A crisis statement is not judged when it is released. It is judged when the next fact arrives.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "The simulation suggests crisis playbooks should be tested the way these drafts were — sequentially, against adversarial facts — rather than reviewed as static documents. A statement that reads well in isolation may still be structurally fragile.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Statement drafts, all rounds",
        kind: "source",
        description:
          "Every draft in sequence, with the facts available at each round. (Draft placeholder.)",
      },
      {
        label: "Trust-repair literature notes",
        kind: "notes",
        description:
          "Reading notes on apology and trust-repair research. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "google-return-to-office",
        relationship: "compare",
        note: "A slower crisis: trust eroded by policy rather than event.",
      },
      {
        slug: "the-culture-code",
        relationship: "deepen",
        note: "Coyle on why vulnerability precedes trust, not the reverse.",
      },
    ],
  },
  {
    type: "standard",
    slug: "google-return-to-office",
    domain: "communication",
    folder: "internal-communication",
    coordinate: "COM-02",
    title: "Google's Return-to-Office Messaging",
    question: "Can organizations maintain trust after abandoning remote work?",
    date: "2025-12-01",
    readingTime: 13,
    hero: "/placeholders/ph-5.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Between 2021 and 2024, Google's internal messaging about where work happens reversed itself several times. This project reads the public record of those communications — leaked memos, executive statements, policy documents — as a single evolving text, and asks what each revision taught employees about how the organization makes decisions.",
          },
          {
            kind: "p",
            text: "The interest here is not whether hybrid work is good policy. It is what happens to internal trust when the reasons given for a policy change faster than the policy itself.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "The communications shift registers in their grammar. Early messages are written in the language of experiment — we are learning, we will adjust. Later messages are written in the language of conclusion — the data shows, collaboration requires. But the data was never shown, and employees noticed the shift from invitation to verdict. The messages lost less credibility from their content than from their change in voice.",
          },
          {
            kind: "quote",
            text: "Employees can accept a decision they disagree with. What they audit is whether the stated reason is the real one.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "For communicators, the case argues for keeping the voice of a policy consistent even as its content evolves — and for showing the evidence when claiming to have it. An unshared dataset cited as justification reads, internally, as no dataset at all.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Message timeline",
        kind: "framework",
        description:
          "Every public statement and reported memo, 2021–2024, on one axis. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "worker-motivation-hybrid",
        relationship: "expand",
        note: "The psychology underneath the policy.",
      },
      {
        slug: "the-culture-code",
        relationship: "deepen",
        note: "What safety signals look like when they work.",
      },
      {
        slug: "shenzhen-metro-observations",
        relationship: "observe",
        note: "Systems that communicate reliability without memos.",
      },
    ],
  },

  /* ---------------- Design ---------------- */
  {
    type: "standard",
    slug: "designing-the-atlas",
    domain: "design",
    folder: "editorial-design",
    coordinate: "D-01",
    title: "Designing The Atlas",
    question: "How should a publication about thinking be designed?",
    date: "2026-06-20",
    readingTime: 8,
    hero: "/placeholders/ph-6.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "This website is itself a design project, and this entry documents its reasoning. The Atlas borrows from printed journals, museum wayfinding, and library catalogues — institutions that organize attention rather than compete for it. Four colors, two typefaces, one persistent panel: every constraint in the system exists to keep reading the primary act.",
          },
          {
            kind: "p",
            text: "The full design standards run to a hundred pages. This entry is the short version: what was decided, what was rejected, and why restraint kept winning.",
          },
          {
            kind: "quote",
            text: "The interface succeeds when readers forget it was designed at all.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "THE ATLAS Design Standards v1.0",
        kind: "pdf",
        href: "/THE%20ATLAS%20Design%20Standards.pdf",
        description: "The complete design standards document governing this site.",
      },
      {
        label: "Rejected directions",
        kind: "notes",
        description:
          "Layouts and palettes considered and set aside, with reasons. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "smithsonian-signage",
        relationship: "observe",
        note: "The wayfinding this site's navigation studies.",
      },
      {
        slug: "juicy-couture-brand-audit",
        relationship: "compare",
        note: "What happens when identity is fashion instead of system.",
      },
    ],
  },

  /* ---------------- I/O Psychology ---------------- */
  {
    type: "standard",
    slug: "worker-motivation-hybrid",
    domain: "io-psychology",
    folder: "organizational-behavior",
    coordinate: "IO-01",
    title: "Worker Motivation After Hybrid",
    question: "What actually brings people back to an office?",
    date: "2026-04-02",
    readingTime: 15,
    hero: "/placeholders/ph-1.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Return-to-office debates are usually argued in the language of productivity, but the research record suggests productivity was never the variable that moved. This literature review reads the motivation research — self-determination theory, belonging, status signaling — against the observed behavior of hybrid workforces, and asks what offices provide that mandates cannot.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "Across the studies reviewed, voluntary attendance tracks three things mandates do not touch: whether specific colleagues will be there, whether the work planned for that day benefits from presence, and whether being seen carries career weight. Attendance policies address none of these; they address the aggregate, and the aggregate is not what any individual is deciding about.",
          },
          {
            kind: "quote",
            text: "Nobody commutes to a building. People commute to other people, and only when the people will be there.",
          },
        ],
      },
      {
        id: "recommendations",
        label: "Recommendations",
        blocks: [
          {
            kind: "p",
            text: "The review suggests organizations get further coordinating presence than compelling it — anchoring teams to shared days, making the office legibly social, and letting the mandate be the floor rather than the message.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Annotated bibliography",
        kind: "notes",
        description:
          "Forty sources on motivation and hybrid work, annotated. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "google-return-to-office",
        relationship: "compare",
        note: "The same question, seen from the communications office.",
      },
      {
        slug: "the-culture-code",
        relationship: "deepen",
        note: "Belonging cues as the mechanism underneath attendance.",
      },
    ],
  },
  {
    type: "standard",
    slug: "duolingo-habit-formation",
    domain: "io-psychology",
    folder: "consumer-psychology",
    coordinate: "IO-02",
    title: "Duolingo and Habit Formation",
    question: "Why does a cartoon owl succeed where willpower fails?",
    date: "2026-05-11",
    readingTime: 10,
    hero: "/placeholders/ph-2.svg",
    draft: true,
    tabs: [
      {
        id: "overview",
        label: "Overview",
        blocks: [
          {
            kind: "p",
            text: "Duolingo's streak is one of the most effective habit mechanisms in consumer software, and it is built almost entirely from loss aversion. This project maps the app's design decisions onto the habit-formation literature and asks which mechanisms teach a language and which merely teach the habit of opening the app.",
          },
        ],
      },
      {
        id: "analysis",
        label: "Analysis",
        blocks: [
          {
            kind: "p",
            text: "The streak converts an approach goal — learn Spanish — into an avoidance goal: don't lose the number. Avoidance goals are stickier day to day but hollower over time, and the app's own design suggests its makers know it: streak freezes, repair mechanics, and notification tone all manage the guilt the streak manufactures. The tension is instructive for any organization that wants engagement to mean commitment rather than captivity.",
          },
          {
            kind: "quote",
            text: "A streak is a promise the user made to a number. The design question is whether the number was ever keeping its side.",
          },
        ],
      },
    ],
    artifacts: [
      {
        label: "Mechanism map",
        kind: "framework",
        description:
          "Each app mechanic mapped to its habit-loop role. (Draft placeholder.)",
      },
    ],
    continueExploring: [
      {
        slug: "costco-membership-model",
        relationship: "compare",
        note: "A membership fee as the physical world's streak.",
      },
      {
        slug: "thinking-fast-and-slow",
        relationship: "deepen",
        note: "The loss-aversion research the streak is built on.",
      },
    ],
  },

  /* ---------------- Reading (no folders) ---------------- */
  {
    type: "reading",
    slug: "the-culture-code",
    domain: "reading",
    coordinate: "R-01",
    title: "The Culture Code",
    author: "Daniel Coyle",
    sourceUrl: "https://danielcoyle.com/the-culture-code/",
    question: "Where does group chemistry actually come from?",
    date: "2026-02-28",
    readingTime: 6,
    hero: "/placeholders/ph-3.svg",
    draft: true,
    tabs: [
      {
        id: "summary",
        label: "Summary",
        blocks: [
          {
            kind: "p",
            text: "Coyle argues that high-performing cultures are built not from talent or strategy but from a steady exchange of small signals — safety cues, vulnerability loops, and shared purpose narratives. The book's most useful move is demoting culture from a mystery to a craft: something groups do, repeatedly and observably, rather than something they have.",
          },
        ],
      },
      {
        id: "passages",
        label: "Favorite Passages",
        blocks: [
          {
            kind: "quote",
            text: "Vulnerability doesn't come after trust — it precedes it. Leaping into the unknown, when done alongside others, causes the solid ground of trust to materialize beneath our feet.",
          },
          {
            kind: "p",
            text: "Also marked: the Navy SEAL debrief protocol, and the observation that belonging cues must be continually refreshed — belonging has a half-life. (Draft placeholder selection.)",
          },
        ],
      },
      {
        id: "worldview",
        label: "My Worldview",
        blocks: [
          {
            kind: "p",
            text: "This book reorganized how I read every organization in the Atlas. I now look for the smallest signals first — who speaks second in a meeting, what happens after a mistake — before reading any strategy document. The strategy explains what an organization intends. The signals explain what it is.",
          },
        ],
      },
    ],
    artifacts: [],
    continueExploring: [
      {
        slug: "worker-motivation-hybrid",
        relationship: "expand",
        note: "Belonging cues, tested against the hybrid office.",
      },
      {
        slug: "product-recall-simulation",
        relationship: "compare",
        note: "Vulnerability loops under public pressure.",
      },
    ],
  },
  {
    type: "reading",
    slug: "thinking-fast-and-slow",
    domain: "reading",
    coordinate: "R-02",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    sourceUrl: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
    question: "How much of judgment is architecture rather than choice?",
    date: "2025-10-15",
    readingTime: 7,
    hero: "/placeholders/ph-4.svg",
    draft: true,
    tabs: [
      {
        id: "summary",
        label: "Summary",
        blocks: [
          {
            kind: "p",
            text: "Kahneman's account of the two systems — fast, associative intuition and slow, effortful reasoning — is the load-bearing wall under most of behavioral economics. For the Atlas, the durable contribution is the catalogue of predictable errors: anchoring, loss aversion, the planning fallacy. Organizations are built from these errors at scale.",
          },
        ],
      },
      {
        id: "passages",
        label: "Favorite Passages",
        blocks: [
          {
            kind: "quote",
            text: "Nothing in life is as important as you think it is, while you are thinking about it.",
          },
          {
            kind: "p",
            text: "Also marked: the section on the focusing illusion, and the premortem technique. (Draft placeholder selection.)",
          },
        ],
      },
      {
        id: "worldview",
        label: "My Worldview",
        blocks: [
          {
            kind: "p",
            text: "I stopped treating consumer behavior as preference and started treating it as architecture. When a Costco member renews or a Duolingo streak survives midnight, the interesting question is no longer what the person wants — it is what the structure around them made effortless.",
          },
        ],
      },
    ],
    artifacts: [],
    continueExploring: [
      {
        slug: "duolingo-habit-formation",
        relationship: "expand",
        note: "Loss aversion, shipped as a product feature.",
      },
      {
        slug: "costco-membership-model",
        relationship: "expand",
        note: "Sunk costs, experienced as loyalty.",
      },
    ],
  },

  /* ---------------- Notes (no folders, no tabs) ---------------- */
  {
    type: "note",
    slug: "shenzhen-metro-observations",
    domain: "notes",
    coordinate: "N-01",
    title: "Observations from the Shenzhen Metro",
    question: "What can a subway system teach an organization?",
    date: "2025-08-19",
    readingTime: 5,
    hero: "/placeholders/ph-5.svg",
    draft: true,
    body: [
      {
        kind: "p",
        text: "The Shenzhen Metro moves more people before nine in the morning than most organizations serve in a year, and it does so almost silently. What struck me over two weeks of daily rides was not the scale but the legibility: at no point, in any station, was it unclear what to do next. (Draft placeholder essay.)",
      },
      {
        kind: "image",
        src: "/placeholders/ph-6.svg",
        caption: "Platform wayfinding, Futian station. (Placeholder image.)",
      },
      {
        kind: "p",
        text: "The floor arrows, the queuing boxes, the door chimes pitched differently for arrival and departure — none of it is signage in the American sense, where instructions compensate for confusing design. The design itself is the instruction. Organizations write employee handbooks for the same reason bad stations hang more signs.",
      },
      {
        kind: "quote",
        text: "A system that needs to be explained is already apologizing.",
      },
      {
        kind: "p",
        text: "The note I keep returning to: trust in the system was not asked for anywhere. It accumulated from ten thousand small precisions — a train that arrives when the board says it will, every time. This is what operational discipline looks like when it becomes a communication strategy.",
      },
    ],
    artifacts: [],
    continueExploring: [
      {
        slug: "google-return-to-office",
        relationship: "compare",
        note: "An organization that asked for trust instead of accumulating it.",
      },
      {
        slug: "designing-the-atlas",
        relationship: "expand",
        note: "The same wayfinding principles, applied to this site.",
      },
    ],
  },
  {
    type: "note",
    slug: "smithsonian-signage",
    domain: "notes",
    coordinate: "N-02",
    title: "Museum Signage at the Smithsonian",
    question: "Why do some institutions speak so clearly?",
    date: "2026-05-30",
    readingTime: 4,
    hero: "/placeholders/ph-6.svg",
    draft: true,
    body: [
      {
        kind: "p",
        text: "An afternoon in the National Museum of American History, spent reading the labels instead of the exhibits. The best ones perform a small miracle of altitude: one sentence of fact, one of context, one of consequence — and then they stop. (Draft placeholder essay.)",
      },
      {
        kind: "p",
        text: "Corporate communication rarely stops. The press release equivalent of a museum label would run four paragraphs and include a quote from leadership. The Smithsonian's restraint is not modesty; it is confidence that the object can carry its share of the argument.",
      },
      {
        kind: "quote",
        text: "The label trusts the reader. That is the whole technique.",
      },
    ],
    artifacts: [],
    continueExploring: [
      {
        slug: "designing-the-atlas",
        relationship: "expand",
        note: "Museum restraint as a design standard for this publication.",
      },
      {
        slug: "juicy-couture-brand-audit",
        relationship: "compare",
        note: "Heritage handled with confidence versus heritage as costume.",
      },
    ],
  },
];

/* ---------------- Registry helpers ---------------- */

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByDomain(domain: string): Project[] {
  return projects.filter((p) => p.domain === domain);
}

export function getProjectsByFolder(domain: string, folder: string): Project[] {
  return projects.filter(
    (p) => p.type === "standard" && p.domain === domain && p.folder === folder,
  );
}

/** URL for a project, honoring the folder-skipping rules for reading/notes. */
export function projectHref(p: Project): string {
  if (p.type === "standard") return `/atlas/${p.domain}/${p.folder}/${p.slug}`;
  return `/atlas/${p.domain}/${p.slug}`;
}
