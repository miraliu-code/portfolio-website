# The Atlas — Design System

A working summary of **THE ATLAS Design Standards v1.0** (the full memo lives at
`THE ATLAS Design Standards.pdf` and is always the authority). The Atlas is an
editorial publication, not a portfolio: it documents inquiry, not accomplishments.
Its guiding rule — *"The Atlas is not designed to showcase accomplishments. It is
designed to make visible the habits of observation, synthesis, and reasoning that
produced them."*

The test for any design decision: **it should behave like a publication before it
behaves like a website.** Calm over clever; reading over scrolling; typography
leads, everything else recedes.

## Colors (Standard 05)

Four colors only. Each has one responsibility, and per the memo, tokens are named
by **function, not literal color** (these are the Tailwind tokens in
`app/globals.css`):

| Token | Name | HEX | Responsibility |
|---|---|---|---|
| `atmosphere` | Floral White | `#FFFDF8` | Backgrounds, whitespace, the reading environment. Warm paper-like white — never used as an accent. |
| `information` | Ink Black | `#222222` | Body text, headlines, captions, icons, metadata, dividers. Softened black for long reading; don't add extra dark grays. |
| `structure` | Blue Ink | `#2F4156` | The persistent panel, primary navigation, major dividers, Atlas framework. Appears sparingly — its rarity gives it authority; it frames pages, never dominates them. |
| `interaction` | Burgundy | `#6B2D3A` | Links, hover states, buttons, selected navigation, questions, Continue Exploring. The only expressive color — an invitation, never large text blocks. |

Rules: no secondary palette (content like charts stays monochromatic and muted);
photography provides the visual richness, so the interface around it disappears;
every combination meets **WCAG AA** minimum. The memo defines a single light
palette — a theme switch is only a future consideration.

## Typography (Standard 06)

Exactly **two typefaces** — every additional face weakens the system:

- **Libre Baskerville** (`font-serif`) — the **voice**. Homepage statement,
  manifesto, project titles, questions, essays, pull quotes, long-form body,
  reading entries, notes. Should feel like a printed journal.
- **Montserrat** (`font-sans`) — the **system**. Navigation, coordinates,
  metadata, reading time, dates, buttons, tabs, labels, captions. Should almost
  disappear.

Six-level hierarchy, built through scale/spacing/restraint, never decoration:

1. **Homepage statement** — largest type, used rarely (rarity creates significance)
2. **Project titles** — concise, ideally under ten words
3. **Questions** — every project opens with one; conversational, never a summary
4. **Body text** — exceptionally readable; comfortable for 20+ minutes
5. **Metadata** — visually quiet (reading time, coordinates, dates, captions)
6. **Footnotes** — smallest, still fully readable

Rules: emphasis via position, scale, whitespace, weight, sparing italics — avoid
multi-color emphasis, underlining (outside links), and excessive bolding. One pull
quote per substantial essay, generous margins, no decorative quotation marks.
Lists stay rare. Hierarchy and proportions stay identical across devices.

## Spacing (Standards 06–07)

- **Whitespace is an active design element** — editorial pacing, not leftover
  space. It slows reading, establishes hierarchy, separates ideas, frames
  photography. When in doubt, add whitespace rather than visual elements.
- **Generous outer margins on every page**, all screen sizes — content never
  crowds the browser edge. Margins provide cognitive rest.
- **Consistent vertical rhythm**: large statements get generous spacing →
  questions breathe → body copy compacts → images and pull quotes create pauses.
  The rhythm (statement / pause / question / pause / paragraph / image / quote)
  should become recognizable and part of the identity.
- Line spacing is generous; paragraphs breathe; interactive elements get
  sufficient surrounding space (accessibility requirement).

## Layout Rules (Standard 07)

- **Fixed, narrow reading column.** Long-form text never spans a wide monitor;
  extra screen space becomes margin, not text width. Large displays feel more
  generous, not more crowded.
- **Persistent Blue Ink panel** — the one permanently fixed architectural
  element, like a book's spine. Contains: name, affiliation, location (optional),
  contact, primary navigation, Download CV, Atlas coordinate. On mobile it
  becomes a collapsible drawer.
- **Invisible grid** — supports alignment and rhythm; readers should never
  perceive it. Consistency over symmetry.
- **Page rhythm**: Statement → Question → Reading → Reflection → Connection.
- **Images align to the reading column**; only exceptionally important photos may
  exceed it (rare = impactful). Every image is evidence or atmosphere, never
  decoration.
- **Page-type layouts**: long reports add a subtle right-side section/progress
  column; presentations show slides + speaker notes together; reading entries and
  notes are deliberately minimal; photo galleries feel like an exhibition with
  the interface nearly gone.
- **Every project ends with "Continue Exploring"** — curated editorial links
  (expand / compare / deepen / observe), never algorithmic. No dead ends.
- **Motion (Standard 08)**: restrained and communicative only — subtle hovers,
  brief predictable transitions; no parallax, scroll-jacking, carousels, or
  decorative animation. Once reading begins the interface goes still. Fully
  respect `prefers-reduced-motion`.
- The layout test for every decision: *does this make reading easier?*

## Implementation Notes

- Tokens live in `app/globals.css` (Tailwind v4 `@theme`): use
  `bg-atmosphere`, `text-information`, `bg-structure`, `text-interaction`, and
  `font-serif` / `font-sans`.
- Fonts load via `next/font/google` in `app/layout.tsx`
  (`--font-libre-baskerville`, `--font-montserrat`).
