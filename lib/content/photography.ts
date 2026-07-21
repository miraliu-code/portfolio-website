import type { Gallery, PhotoCategory } from "./types";

/* All statements and metadata are DRAFT PLACEHOLDERS; images are placeholders. */

export const photoCategories: PhotoCategory[] = [
  {
    slug: "editorial",
    name: "Editorial",
    description: "Composed work: portraits, publications, and directed shoots.",
  },
  {
    slug: "sports",
    name: "Sports",
    description: "Court, ice, and stage: organizations at their most legible.",
  },
  {
    slug: "events",
    name: "Events",
    description: "Rooms full of intention: ceremonies, talks, and gatherings.",
  },
  {
    slug: "experience",
    name: "Experience",
    description: "Cities and systems, observed while moving through them.",
  },
];

const ph = (n: number) => `/placeholders/photo-${n}.svg`;

export const galleries: Gallery[] = [
  {
    slug: "campus-editorial",
    category: "editorial",
    name: "Campus Editorial",
    statement:
      "A portrait series about institutions wearing their identities: students photographed where the university's architecture does half the talking. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "Spring 2026",
    camera: "Canon R6, 50mm f/1.8",
    images: [
      { src: ph(1), caption: "Placeholder frame 01" },
      { src: ph(3), caption: "Placeholder frame 02" },
      { src: ph(5), caption: "Placeholder frame 03" },
      { src: ph(7), caption: "Placeholder frame 04" },
      { src: ph(9), caption: "Placeholder frame 05" },
      { src: ph(1), caption: "Placeholder frame 06" },
    ],
  },
  {
    slug: "print-work",
    category: "editorial",
    name: "Print Work",
    statement:
      "Photography made for layouts: images that leave room for typography. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "2025–2026",
    camera: "Canon R6, 35mm f/2",
    images: [
      { src: ph(4), caption: "Placeholder frame 01" },
      { src: ph(6), caption: "Placeholder frame 02" },
      { src: ph(8), caption: "Placeholder frame 03" },
      { src: ph(10), caption: "Placeholder frame 04" },
      { src: ph(2), caption: "Placeholder frame 05" },
    ],
  },
  {
    slug: "basketball",
    category: "sports",
    name: "Basketball",
    statement:
      "Five people executing a shared plan under time pressure: the closest thing to watching an org chart move. (Draft placeholder statement.)",
    location: "Bender Arena, Washington, D.C.",
    date: "Winter 2025–26",
    camera: "Canon R6, 70–200mm f/2.8",
    images: [
      { src: ph(7), caption: "Placeholder frame 01" },
      { src: ph(9), caption: "Placeholder frame 02" },
      { src: ph(1), caption: "Placeholder frame 03" },
      { src: ph(3), caption: "Placeholder frame 04" },
      { src: ph(5), caption: "Placeholder frame 05" },
      { src: ph(7), caption: "Placeholder frame 06" },
    ],
  },
  {
    slug: "ice-hockey",
    category: "sports",
    name: "Ice Hockey",
    statement:
      "Speed that outruns deliberation. Shot from the glass, where the decisions are visible before the puck moves. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "Winter 2025–26",
    camera: "Canon R6, 70–200mm f/2.8",
    images: [
      { src: ph(10), caption: "Placeholder frame 01" },
      { src: ph(2), caption: "Placeholder frame 02" },
      { src: ph(4), caption: "Placeholder frame 03" },
      { src: ph(6), caption: "Placeholder frame 04" },
      { src: ph(8), caption: "Placeholder frame 05" },
    ],
  },
  {
    slug: "volleyball",
    category: "sports",
    name: "Volleyball",
    statement:
      "Rotation as choreography: six roles exchanged without a word. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "Fall 2025",
    camera: "Canon R6, 70–200mm f/2.8",
    images: [
      { src: ph(3), caption: "Placeholder frame 01" },
      { src: ph(5), caption: "Placeholder frame 02" },
      { src: ph(7), caption: "Placeholder frame 03" },
      { src: ph(9), caption: "Placeholder frame 04" },
    ],
  },
  {
    slug: "track-and-field",
    category: "sports",
    name: "Track & Field",
    statement:
      "The loneliest team sport. Individual efforts that only make sense as a total. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "Spring 2026",
    camera: "Canon R6, 70–200mm f/2.8",
    images: [
      { src: ph(6), caption: "Placeholder frame 01" },
      { src: ph(8), caption: "Placeholder frame 02" },
      { src: ph(10), caption: "Placeholder frame 03" },
      { src: ph(2), caption: "Placeholder frame 04" },
      { src: ph(4), caption: "Placeholder frame 05" },
    ],
  },
  {
    slug: "ceremonies",
    category: "events",
    name: "Ceremonies",
    statement:
      "Institutions performing themselves: the moments organizations design most carefully. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "2025–2026",
    camera: "Canon R6, 24–70mm f/2.8",
    images: [
      { src: ph(9), caption: "Placeholder frame 01" },
      { src: ph(1), caption: "Placeholder frame 02" },
      { src: ph(3), caption: "Placeholder frame 03" },
      { src: ph(5), caption: "Placeholder frame 04" },
    ],
  },
  {
    slug: "talks-and-panels",
    category: "events",
    name: "Talks & Panels",
    statement:
      "One person, a room, and the transfer of conviction. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "2025–2026",
    camera: "Canon R6, 85mm f/1.8",
    images: [
      { src: ph(2), caption: "Placeholder frame 01" },
      { src: ph(4), caption: "Placeholder frame 02" },
      { src: ph(6), caption: "Placeholder frame 03" },
      { src: ph(8), caption: "Placeholder frame 04" },
    ],
  },
  {
    slug: "shenzhen",
    category: "experience",
    name: "Shenzhen",
    statement:
      "Two weeks in a city that rebuilds itself faster than it can be photographed. Companion images to the metro field notes. (Draft placeholder statement.)",
    location: "Shenzhen, China",
    date: "Summer 2025",
    camera: "Canon R6, 35mm f/2",
    images: [
      { src: ph(5), caption: "Placeholder frame 01" },
      { src: ph(7), caption: "Placeholder frame 02" },
      { src: ph(9), caption: "Placeholder frame 03" },
      { src: ph(1), caption: "Placeholder frame 04" },
      { src: ph(3), caption: "Placeholder frame 05" },
      { src: ph(5), caption: "Placeholder frame 06" },
      { src: ph(7), caption: "Placeholder frame 07" },
    ],
  },
  {
    slug: "washington-dc",
    category: "experience",
    name: "Washington, D.C.",
    statement:
      "The company town of institutions, photographed off-duty. (Draft placeholder statement.)",
    location: "Washington, D.C.",
    date: "Ongoing",
    camera: "Canon R6, 35mm f/2",
    images: [
      { src: ph(8), caption: "Placeholder frame 01" },
      { src: ph(10), caption: "Placeholder frame 02" },
      { src: ph(2), caption: "Placeholder frame 03" },
      { src: ph(4), caption: "Placeholder frame 04" },
      { src: ph(6), caption: "Placeholder frame 05" },
      { src: ph(8), caption: "Placeholder frame 06" },
    ],
  },
];

export function getPhotoCategory(slug: string) {
  return photoCategories.find((c) => c.slug === slug);
}

export function getGalleries(category: string) {
  return galleries.filter((g) => g.category === category);
}

export function getGallery(category: string, slug: string) {
  return galleries.find((g) => g.category === category && g.slug === slug);
}
