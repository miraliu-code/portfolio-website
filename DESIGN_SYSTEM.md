# Design System

> **⚠️ PLACEHOLDER — pending "THE ATLAS Design Standards" memo.**
> The source memo was not available in this repository or session, so every value
> below is a temporary default, not a summary of the memo. Once the memo is added
> to the repo (or pasted in chat), this file and the `@theme` block in
> `app/globals.css` should be updated to match it.

This file is the working summary of the ATLAS design memo for this portfolio
site. It covers four areas: colors, typography, spacing, and layout rules.

## Colors

| Token | Value | Usage |
|---|---|---|
| `background` | `#ffffff` / `#0a0a0a` (dark) | Page background — *placeholder* |
| `foreground` | `#171717` / `#ededed` (dark) | Body text — *placeholder* |
| `accent` | `#2563eb` | Links, buttons, highlights — *placeholder* |
| `muted` | `#6b7280` | Secondary text, captions — *placeholder* |

Tokens are defined in `app/globals.css` under `@theme` and used in markup as
Tailwind utilities (`bg-background`, `text-foreground`, `text-accent`, …).

## Typography

- **Sans (headings + body):** Geist Sans — *placeholder; replace with the memo's typeface*
- **Mono (code):** Geist Mono — *placeholder*
- Type scale, weights, and line-height rules: **TBD from memo.**

## Spacing

- Base unit: Tailwind's default 4px scale — *placeholder until the memo's
  spacing scale is known.*
- Section vertical rhythm, component padding, and gap conventions: **TBD from memo.**

## Layout Rules

- Max content width, grid/columns, breakpoints, and page-structure rules:
  **TBD from memo.**
- Until then, pages use a centered container (`mx-auto max-w-*`) with
  responsive horizontal padding.
