import type { ObservatorySection } from "./types";

/* All entries are DRAFT PLACEHOLDERS documenting the intended structure. */

export const observatorySections: ObservatorySection[] = [
  {
    slug: "currently-reading",
    name: "Currently Reading",
    description: "Books in progress, with running notes.",
    entries: [
      {
        title: "The Design of Everyday Things",
        meta: "Don Norman",
        notes:
          "Reading alongside the Atlas wayfinding work. Norman's affordances vocabulary keeps explaining things the Shenzhen metro note only gestured at. (Draft placeholder.)",
        quote: "Good design is actually a lot harder to notice than poor design.",
        thoughts:
          "Halfway through. Increasingly convinced 'intuitive' is just the word we use when the learning was done by the designer instead of the user.",
      },
      {
        title: "Working",
        meta: "Studs Terkel",
        notes:
          "Oral histories of ordinary jobs. A corrective to reading organizations only from the top of the org chart. (Draft placeholder.)",
        thoughts:
          "Every interview is a reminder that culture documents describe the view from somewhere specific.",
      },
    ],
  },
  {
    slug: "currently-exploring",
    name: "Currently Exploring",
    description: "Places and systems under present attention.",
    entries: [
      {
        title: "Union Station's renovation wayfinding",
        notes:
          "A transit hub navigating its own construction — temporary signage as a stress test of institutional voice. (Draft placeholder.)",
        thoughts:
          "Candidate for a future field note if the pattern holds through the next phase.",
      },
      {
        title: "University donor communications",
        notes:
          "How institutions ask for money from people who already gave. Tone analysis in progress. (Draft placeholder.)",
        thoughts: "The best letters read like updates to a partner, not appeals to a source.",
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
          "Recurring across the crisis simulation and the return-to-office study. (Draft placeholder.)",
        thoughts:
          "Current lean: individually yes, structurally only briefly. Looking for counterexamples.",
      },
      {
        title: "Is restraint a competitive advantage or a taste?",
        notes:
          "Costco says advantage. Most marketing budgets say taste. (Draft placeholder.)",
        thoughts: "Suspect the answer depends on how long the organization plans to exist.",
      },
      {
        title: "What does a trustworthy interface owe its reader?",
        notes: "The design standards answer this for the Atlas; the general case is harder. (Draft placeholder.)",
        thoughts: "Working definition: no surprise the reader wouldn't thank you for.",
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
          "Extending the Costco analysis to gyms, credit unions, and public radio. Early pattern: the fee's meaning matters more than its size. (Draft placeholder.)",
        thoughts: "Likely lands in Strategy as S-04 once the comparison set is complete.",
      },
      {
        title: "How organizations apologize in two languages",
        notes:
          "Comparing US and Chinese corporate apologies for parallel incidents. (Draft placeholder.)",
        thoughts: "The interesting variable so far is who the apology is addressed to.",
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
        notes: "Outline stage. On the difference between how work flows and how accountability flows. (Draft placeholder.)",
        thoughts: "Needs one more case study before drafting.",
      },
      {
        title: "In defense of the boring annual report",
        notes: "Notes stage. On documents that succeed by refusing to be exciting. (Draft placeholder.)",
        thoughts: "Pairs with the museum signage note.",
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
