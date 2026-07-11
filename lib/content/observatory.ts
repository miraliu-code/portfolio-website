import type { ObservatorySection } from "./types";

export const observatorySections: ObservatorySection[] = [
  {
    slug: "currently-reading",
    name: "Currently Reading",
    description: "Books in progress, with running notes.",
    entries: [
      {
        title: "Freakonomics",
        meta: "Steven D. Levitt & Stephen J. Dubner",
        notes:
          "A rereading, prompted by the incentives thread running through Strategy and I/O Psychology. Levitt and Dubner's habit of distrusting the stated reason for something and going looking for the real one is closer to a research method than the book usually gets credit for.",
        quote:
          "The interesting economics were never in the headline number. They were in the incentive nobody had bothered to name.",
        thoughts:
          "Some of the individual studies haven't aged well, but the underlying discipline still holds: assume the official explanation is incomplete, then find what it's missing.",
      },
    ],
  },
  {
    slug: "currently-exploring",
    name: "Currently Exploring",
    description: "Places and systems under present attention.",
    entries: [
      {
        title: "Airport lounge access as membership design",
        notes:
          "A live extension of the retail membership research, testing whether the logic that makes a warehouse-club fee feel meaningful still holds when the product being sold is comfort instead of savings.",
        thoughts:
          "Working theory is that the fee matters less than the story it lets you tell yourself about who you are. Same pattern as the Costco case, more expensive iteration.",
      },
      {
        title: "How wedding vendors talk about scarcity",
        notes:
          "Sitting in on vendor conversations this season as a photographer, half working and half taking notes on how urgency gets manufactured politely: 'we're pretty much full for your date, but let me see what I can do.'",
        thoughts:
          "The pattern shows up almost identically across photographers, florists, and venues, which suggests it's taught rather than instinctive. Curious whether anyone teaches it explicitly, or whether it's just absorbed.",
      },
    ],
  },
  {
    slug: "questions",
    name: "Questions I'm Living With",
    description: "Unresolved questions guiding what comes next.",
    entries: [
      {
        title: "Can an organization be more honest than its incentives?",
        notes:
          "Recurring across the crisis simulation and the return-to-office study.",
        thoughts:
          "Current lean is: individually, yes, but structurally: only briefly. Looking for counterexamples.",
      },
      {
        title:
          "Can you observe an organization honestly without becoming part of what you're observing?",
        notes:
          "The photographer's version of the observer effect. A camera in a room changes what the room is willing to show it, which raises an obvious question about attention that isn't holding a camera at all.",
        thoughts:
          "Current lean: not fully. The more access a room grants you, the more responsibility you take on for what you do with what it shows you.",
      },
      {
        title: "What does a trustworthy interface owe its reader?",
        notes:
          "The design standards answer this for the Atlas. The general case is harder.",
        thoughts: "Working definition, no surprise the reader wouldn't thank you for.",
      },
    ],
  },
  {
    slug: "current-research",
    name: "Current Research",
    description: "Open investigations that have not yet become projects.",
    entries: [
      {
        title: "Membership models beyond retail",
        notes:
          "Extending the Costco analysis to gyms, credit unions, and public radio. Early pattern: the fee's meaning matters more than its size.",
        thoughts:
          "Likely lands in Strategy as S-04 once the comparison set is complete.",
      },
      {
        title: "How organizations apologize in two languages",
        notes:
          "Comparing US and Chinese corporate apologies for parallel incidents.",
        thoughts:
          "The interesting variable so far is who the apology is actually addressed to: the harmed party, the regulator, or the market.",
      },
    ],
  },
  {
    slug: "future-essays",
    name: "Future Essays",
    description: "Writing that is forming but not yet finished.",
    entries: [
      {
        title: "The org chart is a map of blame",
        notes:
          "Outline stage. On the difference between how work flows and how accountability flows.",
        thoughts: "Needs one more case study before drafting.",
      },
      {
        title: "In defense of the boring annual report",
        notes:
          "Notes stage. On documents that succeed by refusing to be exciting.",
        thoughts:
          "The strongest candidates so far refuse to perform excitement even where the numbers would justify it. Looking for one duller than a utility company's before committing to the thesis.",
      },
    ],
  },
];

export function getObservatorySection(slug: string) {
  return observatorySections.find((s) => s.slug === slug);
}

/** The three sections previewed on the homepage. */
export const observatoryPreviewSlugs = [
  "currently-reading",
  "currently-exploring",
  "questions",
];
