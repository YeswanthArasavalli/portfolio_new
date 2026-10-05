---
name: Yeswanth Arasavalli Portfolio
description: The Analyst's Desk — a flat, slate-neutral portfolio system with a single restrained cobalt accent.
colors:
  restrained-cobalt: "hsl(221 83% 53%)"
  cobalt-ink: "hsl(221 83% 35%)"
  cobalt-wash: "hsl(221 80% 95%)"
  snow: "hsl(0 0% 100%)"
  desk: "hsl(222 47% 97%)"
  ink: "hsl(222 47% 8%)"
  graphite: "hsl(222 15% 45%)"
  fog: "hsl(222 20% 94%)"
  mist: "hsl(222 16% 93%)"
  hairline: "hsl(222 20% 88%)"
  alert-red: "hsl(0 84% 60%)"
  code-bg: "hsl(222 84% 5%)"
  code-surface: "hsl(222 47% 11%)"
  code-line: "hsl(217 33% 17%)"
  code-edge: "hsl(215 25% 27%)"
  code-fg: "hsl(214 32% 91%)"
  code-text: "hsl(213 27% 84%)"
  code-muted: "hsl(215 20% 65%)"
  code-dim: "hsl(215 16% 47%)"
  code-faint: "hsl(215 20% 35%)"
typography:
  display:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'DM Sans', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.1em"
  mono:
    fontFamily: "'DM Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
rounded:
  control: "4px"
  surface: "8px"
  pill: "9999px"
spacing:
  gap-tight: "6px"
  gap-card: "12px"
  pad-card: "24px"
  pad-section: "48px"
  rhythm-block: "64px"
components:
  button-primary:
    backgroundColor: "{colors.restrained-cobalt}"
    textColor: "{colors.snow}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-primary-hover:
    backgroundColor: "hsl(221 83% 53% / 0.9)"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
  button-ghost-icon:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.control}"
    padding: "6px"
  chip-tech:
    backgroundColor: "{colors.cobalt-wash}"
    textColor: "{colors.cobalt-ink}"
    rounded: "{rounded.control}"
    padding: "4px 10px"
  chip-category:
    backgroundColor: "{colors.fog}"
    textColor: "hsl(222 47% 15%)"
    rounded: "{rounded.control}"
    padding: "2px 8px"
  panel-code:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-fg}"
    rounded: "{rounded.surface}"
    padding: "20px"
  badge-role:
    backgroundColor: "hsl(221 83% 53% / 0.1)"
    textColor: "{colors.restrained-cobalt}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card-project:
    backgroundColor: "{colors.snow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "24px"
  nav-link-active:
    backgroundColor: "{colors.cobalt-wash}"
    textColor: "{colors.restrained-cobalt}"
    rounded: "{rounded.control}"
    padding: "6px 12px"
---

# Design System: Yeswanth Arasavalli Portfolio

## Overview

**Creative North Star: "The Analyst's Desk"**

This system looks like a working analyst's desk: a cool paper-white surface, ink-dark text, hairline rules separating sections the way a desk blotter separates documents, and exactly one accent — a restrained cobalt blue — reserved for actions, active states, and emphasis. Nothing is decorative for its own sake. Every visual element either carries evidence (a metric, a screenshot, a tech tag) or organizes it (a border, a section eyebrow, a numbered index). Depth is structural, never theatrical: surfaces sit flat at rest and are separated by 1px borders; the only shadow in the entire system is a barely-there lift on card hover.

Density is calm and reading-first. Navigation and project lists use a wide container; prose and case-study content narrow to a single comfortable column. Numbered mono index chips (`01`, `02`), uppercase micro-labels, and tabular-figure metrics give the site the annotated feel of a well-kept technical record — matching the product commitment that the portfolio reads like work, not coursework. Light mode is the default; a full dark remapping of every token exists and must stay in sync.

**Key Characteristics:**
- Flat surfaces + hairline borders as the primary separation mechanism.
- One accent color (Restrained Cobalt) that signals only action/state/emphasis.
- Two font families only: DM Sans for everything human-readable, DM Mono for technical annotation.
- Numbered entries, uppercase eyebrow labels, and tabular metrics — the vocabulary of a working document.
- Gentle curves everywhere (4px controls, 8px cards); pills only for role badges.

## Colors

The palette is a slate-tinted neutral system with a single cobalt accent — professional, not startup; cool, never warm-beige. The CSS source calls the accent out explicitly: "a restrained cobalt blue — not teal, not purple."

### Primary
- **Restrained Cobalt** (`hsl(221 83% 53%)`): The only action color. Filled buttons (Resume, Full Case Study), active nav text, links, accent borders on hover, the pulse of the availability dot's counterpart emphasis. In dark mode it lightens (60% L) for contrast against the deep desk.

### Neutral
- **Ink** (`hsl(222 47% 8%)`): All primary text and headings.
- **Graphite** (`hsl(222 15% 45%)`): Secondary/muted text — summaries, captions, nav defaults.
- **Desk** (`hsl(222 47% 97%)`): Page background, a faint blue-tinted paper white.
- **Snow** (`hsl(0 0% 100%)`): Card surfaces, popovers, button-primary text.
- **Fog / Mist** (`hsl(222 20% 94%)` / `hsl(222 16% 93%)`): Secondary and muted surface fills (index chips, hover fills, subtle wells).
- **Hairline** (`hsl(222 20% 88%)`): Every 1px border, divider, and input stroke in the system.
- **Cobalt Wash / Cobalt Ink** (`hsl(221 80% 95%)` / `hsl(221 83% 35%)`): The accent's soft background pair — tech tags and active nav sit on the wash with the deep cobalt-ink text, so accent tinting never requires white-on-fill.
- **Code Window** (`--code-bg hsl(222 84% 5%)` + `code-surface / code-line / code-edge / code-fg / code-text / code-muted / code-dim / code-faint`): the SQL/architecture panels are a deliberate "ink panel" — near-black in *both* themes, with their own internal neutral ramp so no raw Tailwind palette colors are referenced. They are tokenized, not ad-hoc.

### Semantic
- **Alert Red** (`hsl(0 84% 60%)`): Destructive/error states only (toast framework default; nearly unused).
- **Syntax accents** (SQL page only, rendered on the code window): keyword = Restrained Cobalt (bold), string = green `hsl(142 71% 45%)`, function = amber `hsl(31 98% 55%)`, comment = `code-muted` italic. These classes are wired live into the SQL showcase via `highlightSQL()`. Confined to code blocks — they never leak into chrome.

### Named Rules
**The One Signal Rule.** Restrained Cobalt means "act, active, or emphasize" and nothing else. If an element is neither interactive, state-marked, nor a deliberate emphasis, it does not get cobalt.
**The Not-Teal, Not-Purple Rule.** The accent is cobalt, full stop. No teal, no violet, no blue→purple gradients — the source comment prohibits them and the system holds.

## Typography

**Display Font:** DM Sans (fallback system-ui, sans-serif)
**Body Font:** DM Sans (same family as display — one voice, weight-differentiated)
**Label/Mono Font:** DM Mono (fallback ui-monospace)

**Character:** A single humanist sans carries everything from hero to caption, differentiated purely by weight (400 reading → 700 display) and size; DM Mono is the "technical annotation" voice — tech tags, numbered indices, data volumes, SQL blocks — used sparingly so mono always means "machine-ish detail."

### Hierarchy
- **Display** (700, 2.25rem→3rem responsive, -0.025em): Home hero headline only. The one moment of scale.
- **Headline** (700, 1.875rem): Page titles (`text-3xl font-bold`), one per page in the header band. Case-study titles step 2xl→3xl across breakpoints.
- **Title** (600, 1.125–1.5rem): Section headings (`text-2xl`) and card titles (`text-lg leading-snug`); card titles shift to cobalt on group-hover as the click affordance.
- **Body** (400, 0.875rem, leading ~1.6): All prose, summaries, bullet content. The site deliberately runs its body at 14px with Graphite color — dense, document-like.
- **Label** (600, 0.75rem, +0.1em tracking, uppercase): Section eyebrows ("WORK EXPERIENCE", "CERTIFICATIONS") — the quiet wayfinding layer.
- **Mono/Annotation** (500, 0.75rem): Tech tags, index numbers, `Data:` chips, resume-adjacent metadata.

Headings globally carry -0.02em letter-spacing from the base layer. Numerals in metrics use `tabular-nums` and `-0.025em` tracking so figures align like a table.

### Named Rules
**The Two-Family Rule.** DM Sans and DM Mono only. No third font, no decorative face; hierarchy is built from weight and size, not novelty.
**The Mono Means Machine Rule.** Monospace appears only on technical annotation — tags, indices, code, data volumes. Never for body prose or headings.

## Layout

- **Container model:** Tailwind `container` centered with 1.5rem padding, capped at `max-w-6xl` (1152px) for chrome and project lists; reading content (Experience, About, Contact, case-study prose) narrows to `max-w-4xl` (896px). Two widths, always: wide for scanning, narrow for reading.
- **Page skeleton:** every page is `Header → tinted header band → content → CTA → Footer`. The header band is a full-bleed `border-b` strip with `py-12`, holding the H1 + a Graphite subtitle — a consistent "document title page" for each route.
- **Vertical rhythm:** sections stack at `space-y-16` (64px); inside them, cards at `space-y-6` (24px); card interiors pad 24px (`p-6`); CTA blocks are separated by a `border-t` + `pt-8`. Section eyebrows sit 24px above their content.
- **Project list:** a single full-width column of cards (not a grid) — reads like an index of files. Above it, a horizontally scrollable filter row of text buttons (`px-3 py-1.5`), active filter inverts to solid cobalt.
- **Case-study layout:** metric rows (label/value pairs) and numbered approach lists; evidence images full-bleed within the card with captions beneath in Graphite.
- **Responsive behavior:** `md:` (768px) is the pivot — desktop nav links swap for a hamburger drawer; hero scales down; card meta rows collapse from row to column (`sm:flex-row`). Grids of auxiliary content use `sm:grid-cols-2` (e.g., certifications). Nothing beyond one breakpoint of genuine layout change; the system is a single column that stays a single column.

## Elevation & Depth

This system is flat. Surfaces do not float; separation is done by 1px hairline borders and tonal background steps (Desk → Snow → Fog). Depth language:

- **Hairline borders** (`1px solid` Hairline) on every card, header band, divider, and drawer edge — the primary depth mechanism.
- **shadow-sm on hover only** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`): project cards gain it together with a `border-primary/40` edge — hover says "this is clickable," subtly.
- **Backdrop-blur header:** the sticky nav is `bg-background/90 backdrop-blur-md` with a bottom hairline — the only translucency in the system, reserved for the overlay-on-scroll case.
- **Tonal layering:** muted fills (Fog/Mist/Cobalt Wash) mark secondary surfaces and annotation chips instead of shadows.

### Named Rules
**The Hairline Rule.** Borders separate, shadows never do. Any new surface gets a 1px Hairline border first; a shadow needs a state (hover) to exist at all.
**The Flat-by-Default Rule.** There is no rest-state shadow in this system. Do not introduce one.

## Shapes

- **Controls** (buttons, chips, tags, filter items, inputs): gently squared with a subtle curve (4px — Tailwind `rounded`).
- **Surfaces** (cards, drawers): softly rounded (8px — `rounded-lg` = `--radius: 0.5rem`).
- **Pills** (fully rounded, 9999px): reserved exclusively for role badges and status dots companions — the only round geometry in the system, so a pill always reads as a "tagged role."
- **Borders:** solid hairlines for real, available things; **dashed hairlines mark honest absence** — the "Private repository" / "In development" chips use `border-dashed` so the line style itself encodes the product's private-source policy. This is the system's signature shape gesture.
- No organic blobs, no clipped corners, no decorative frames. Rectangular, quietly curved, document-like.

## Components

### Buttons
- **Shape:** subtly squared (4px, `rounded`).
- **Primary:** Restrained Cobalt fill, Snow text, 10–16px scale (`px-4 py-2.5` for page CTAs, `px-3 py-1.5` in dense rows), `text-sm font-medium`, optional 14px lucide icon at `gap-2`. Hover darkens the fill to 90% opacity — no lift, no glow.
- **Hover / Focus:** color transition only (`transition-colors`); focus shows a 2px cobalt ring with a 2px offset (`ring-2 ring-ring ring-offset-2`) — the system's only ring treatment.
- **Secondary:** transparent with a Hairline border and Ink text, same padding; hover fills a Fog well (`hover:bg-secondary`). Tertiary/icon buttons: `p-1.5`, Graphite → Ink on hover with the same Fog well.
- **Asymmetry convention:** the Resume button is the only persistent primary CTA in the header; pages carry at most one primary fill per action row, with "View Projects"/"Get in touch" pairing one filled + one outlined.

### Chips (tech tags)
- **Style:** Cobalt Wash background, Cobalt Ink text, 4px radius, hairline border of accent-foreground at 10%, `text-xs font-mono font-medium`, tight padding (`px-2.5 py-1` / `px-2 py-0.5`).
- **State:** static annotations only — never buttons. The `Data:` volume chip swaps to a Fog well with mono text to stay in the annotation family.
- **Category chips are neutral:** taxonomy labels (MLOps, NLP, Analytics, CV, Time-Series, Freelance/Internship) sit in a Fog well with Hairline border and Ink-scale text — never colored. Color budget is reserved for action (cobalt) and honest-absence (dashed hairline); the text label carries the category meaning.

### Cards / Containers
- **Corner Style:** softly rounded (8px).
- **Background:** Snow on Desk; interiors padded 24px (`p-6`).
- **Shadow Strategy:** flat at rest; `shadow-sm` + cobalt-tinted border (`border-primary/40`) on hover for clickable cards (see Elevation).
- **Border:** 1px Hairline, always.
- **Signature — Project card:** a `01`-style mono index chip (32px Fog square) leads the row; title (Title tier, group-hover → cobalt), Graphite summary, a tech-tag row, then an action row (primary "Full Case Study" + outlined Code/Demo or a dashed-border state chip). The card *is* the system's thesis in one component.

### Inputs / Fields
- Not implemented — the site has no forms; contact runs on `mailto:`/link cards. Any future input must adopt the button geometry (4px, Hairline border, `--input` stroke) and the shared focus ring.

### Navigation
- **Style:** sticky 56px header, `bg-background/90` + `backdrop-blur-md`, bottom hairline. Brand = "YA" wordmark + a mono `DA · DS · MLE` bordered badge.
- **Typography:** `text-sm` links, Graphite default; active link = Cobalt text + `font-medium` on a Cobalt Wash well; hover = Ink text + Fog well.
- **Right cluster:** icon links (GitHub/LinkedIn/Mail) → divider → theme toggle → small primary Resume. A vertical 1px rule separates link groups.
- **Mobile:** hamburger opens a bordered drawer under the header — plain stacked links (`py-2.5`), Contact included, ending with a LinkedIn/Resume action row split 50/50. Mobile header icon controls are 40×40px hit targets (`h-10 w-10` centered) wrapping the same 16–20px icons, so tap area meets 40px minimum without visual bulk.

### Metric Strip
- Case-study metrics render as label/value pairs with `metric-value` numerals: 3xl bold, tabular-nums, tight tracking — figures behave like a table even in prose layouts.

### Footer
- Quiet band continuing the hairline rhythm: identity line, role labels, contact links, and a mono/short status line. No color, no fills — Ink/Graphite text on the page background.

## Do's and Don'ts

### Do:
- **Do** separate surfaces with 1px Hairline borders and tonal fills (Snow/Fog/Cobalt Wash) before considering any shadow.
- **Do** reserve Restrained Cobalt for actions, active states, links, and emphasis — and cap filled cobalt to one primary CTA per action row.
- **Do** use DM Mono only for technical annotation: tags, indices, data volumes, code.
- **Do** keep the page skeleton identical: bordered header band → eyebrow labels → bordered cards at 24px padding → single primary CTA row.
- **Do** use dashed hairline borders for honest-absence states (private repo, in development) — the style encodes the honesty policy.
- **Do** run numerals tabular (`tabular-nums`) and keep the 2px-offset cobalt focus ring on every interactive element.
- **Do** update both `:root` and `.dark` token blocks together; every light token has a dark counterpart. (Exception: the code-window tokens are intentionally identical in both themes — the ink panel stays dark.)
- **Do** respect `prefers-reduced-motion`: a global reduce block mutes animation/transitions to 0.01ms and the availability dot uses `motion-safe:animate-pulse` — states still change, nothing swings.
- **Do** keep availability/status expression on documented tokens: one cobalt dot treatment site-wide (`bg-primary`, subtle motion-safe pulse) — no undocumented greens.
- **Do** provide the visually-hidden "Skip to main content" link targeting `#main` on every page (it lives in Layout, above the header).

### Don't:
- **Don't** introduce gradients, glassmorphism (outside the header blur), glow effects, or rest-state shadows.
- **Don't** add teal, violet, or blue→purple accent schemes; the accent is cobalt and the source comment forbids the drift — and category/taxonomy chips stay neutral, never rainbow-coded.
- **Don't** reference raw Tailwind palette colors (`slate-*`, `emerald-*`, `green-*`) for chrome or code surfaces — use the token ramp so the system stays theme-coherent and documentable.
- **Don't** add a third font family or use uppercase mono as decorative chrome.
- **Don't** widen body copy past the reading container (`max-w-4xl`) or shrink it below the 0.875rem document scale for "style."
- **Don't** turn role-badge pills into a general chip shape; pills are for roles/status only.
- **Don't** replace numbered index chips, section eyebrows, or the project-card layout with generic card grids — they are the desk's organizing system.
