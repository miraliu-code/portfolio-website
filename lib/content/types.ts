export type DomainSlug =
  | "strategy"
  | "communication"
  | "design"
  | "io-psychology"
  | "reading"
  | "notes";

export interface DomainMeta {
  slug: DomainSlug;
  name: string;
  prefix: string; // coordinate prefix: S, COM, D, IO, R, N
  question: string;
  description: string;
  letterform: string; // large glyph on the domain page
  hasFolders: boolean; // reading & notes skip the folder layer
}

export interface Folder {
  slug: string;
  domain: DomainSlug;
  name: string;
  description: string;
  question: string; // the folder's guiding question, shown on its page
}

/* Long-form bodies are structured blocks so typography rules stay enforced. */
export type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "dek"; text: string } // essay subhead: italic lede under the title
  | { kind: "quote"; text: string } // pull quote — one per substantial essay
  | { kind: "list"; items: string[] }
  | { kind: "image"; src: string; caption: string }
  /* Closing bibliography for essays citing formal sources: author-date
     entries with the locator (DOI/URL) split out as a link, rendered
     as a bordered end block. The pattern for every cited essay. */
  | { kind: "references"; items: { text: string; href?: string }[] };

export interface TabSection {
  id: string;
  label: string;
  blocks: Block[];
}

export interface Artifact {
  label: string;
  kind:
    | "source"
    | "notes"
    | "deck"
    | "dataset"
    | "photography"
    | "framework"
    | "pdf";
  description: string;
  href?: string;
}

/* The memo's four editorial relationship kinds — never algorithmic. */
export type Relationship = "expand" | "compare" | "deepen" | "observe";

export interface ContinueLink {
  slug: string; // target project slug (resolved via the registry)
  relationship: Relationship;
  note: string; // one editorial line explaining the connection
}

interface ProjectBase {
  slug: string;
  domain: DomainSlug;
  coordinate: string;
  title: string;
  question: string;
  date: string;
  readingTime: number; // minutes
  format: string; // roadmap format: Flagship Report, Case Study, …
  length: string; // roadmap length: "40–50 pp", "2,500 words", …
  hero: string;
  draft: boolean;
  pdf?: string; // downloadable report
  organizations?: string[]; // organizations this project mentions
  explorable?: boolean; // has (or will have) an interactive component
  artifacts: Artifact[];
  continueExploring?: ContinueLink[]; // omitted = quiet same-domain fallback
}

/* Standard Atlas project: lives in a folder, tabbed body, Artifact tab last. */
export interface StandardProject extends ProjectBase {
  type: "standard";
  folder: string;
  tabs: TabSection[]; // Overview [, Analysis, Recommendations] — Artifact appended from artifacts[]
  longReport?: boolean; // long-form research: adds the floating section rail
}

/* Reading entry: no folder. Summary / Favorite Passages / My Worldview. */
export interface ReadingEntry extends ProjectBase {
  type: "reading";
  author: string;
  sourceUrl: string;
  tabs: TabSection[];
}

/* Note: no folder, no tabs — the essay body immediately. */
export interface NoteEntry extends ProjectBase {
  type: "note";
  body: Block[];
}

export type Project = StandardProject | ReadingEntry | NoteEntry;

/* ---------- Photography (separate top-level section) ---------- */

export interface Gallery {
  slug: string;
  category: string;
  name: string;
  statement: string; // curator's statement
  location: string;
  date: string;
  camera: string;
  images: { src: string; caption: string }[];
}

export interface PhotoCategory {
  slug: string;
  name: string;
  description: string;
}

/* ---------- Observatory ---------- */

export interface ObservatoryEntry {
  title: string;
  meta?: string; // author, place, etc.
  notes: string;
  quote?: string;
  thoughts: string;
}

export interface ObservatorySection {
  slug: string;
  name: string;
  description: string;
  entries: ObservatoryEntry[];
}

/* ---------- Index ---------- */

export interface IndexEntry {
  label: string;
  category: string; // "Organization", "Project", "Domain", "Book", …
  href?: string;
  coordinate?: string;
}
