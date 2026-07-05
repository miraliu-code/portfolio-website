import type { Block } from "./types";

/* Photography-related essays — DRAFT PLACEHOLDER prose throughout. */

export interface PhotoWriting {
  slug: string;
  title: string;
  body: Block[];
}

export const photoWritings: PhotoWriting[] = [
  {
    slug: "looking-and-seeing",
    title: "The Difference Between Looking and Seeing",
    body: [
      {
        kind: "p",
        text: "Photography entered the Atlas as evidence, not decoration. An organization can revise a press release, but it cannot revise how its lobby treats a visitor at 8 a.m., or how its signage speaks when nobody is managing the message. The camera catches institutions off duty. (Draft placeholder essay.)",
      },
      {
        kind: "quote",
        text: "A photograph is an organization caught not performing itself.",
      },
      {
        kind: "p",
        text: "The collections here are organized by what they observe — courts and rinks, ceremonies, cities — but they share one method: pay attention to the ordinary until it explains something.",
      },
    ],
  },
  {
    slug: "sports-photography-decision-making",
    title: "What Sports Photography Taught Me About Decision-Making Under Pressure",
    body: [
      {
        kind: "p",
        text: "Sports photography is usually about the peak moment. I find myself shooting the second before it — the rotation, the call, the glance that assigns responsibility. Teams are the most legible organizations we have; the org chart moves in real time. (Draft placeholder essay.)",
      },
      {
        kind: "p",
        text: "The frames that survive editing are rarely the goals. They are the coordination.",
      },
    ],
  },
  {
    slug: "photographing-protests-attention",
    title: "Photographing Protests Changed How I Think About Attention",
    body: [
      {
        kind: "p",
        text: "Everything the Atlas says about design restraint, the viewfinder taught first. A frame is a decision about what to exclude. So is a strategy. (Draft placeholder essay.)",
      },
      {
        kind: "quote",
        text: "Composition is editing you commit to before the picture exists.",
      },
    ],
  },
];
