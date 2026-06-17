# Socialsect marketing site  design brief

This document summarizes the **current** visual system as implemented in the codebase (CSS variables, typography, spacing, and recurring section patterns). Source of truth lives in `src/App.css`, `src/pages/homepage/homepage.css`, `src/index.css`, and component-scoped styles.

---

## Brand intent

- **Clinical + premium**: restrained palette, serif display for headlines, sans body for UI and long copy.
- **Primary accent** (`#695AF2`) signals links, emphasis numerals, and CTAs without overwhelming white/surface layouts.

---

## Color tokens

| Token | Hex | Usage |
|--------|-----|--------|
| `--primary` | `#695AF2` | Buttons, links on hover, stat highlights, pillar leads |
| `--primary-dark` | `#503DD8` | Primary hover / pressed |
| `--charcoal` | `#1A1C1D` | Primary text, borders on secondary buttons |
| `--dark-gray` | `#474555` | Secondary text, eyebrows, subcopy |
| `--gray` | `#E2E2E2` | Rules, card borders, hairlines |
| `--light-gray` | `#F5F5F7` | Secondary button hover |
| `--surface` | `#F9F9FB` | Alternate section backgrounds |
| `--white` | `#FFFFFF` | Default page / card surfaces |

Global definitions appear in **`src/App.css`** (`:root`). **`homepage.css`** duplicates a subset of tokens for the homepage scope (including `--lg: 64px` vs `App.css` `--lg: 60px`  be aware of that drift when editing).

---

## Typography

| Role | Family | Notes |
|------|--------|--------|
| Display / headlines | **Newsreader** (`--font-display`) | Weights 400–600; negative tracking on large titles |
| Body / UI | **Inter** (`--font-body`) | 400–600; eyebrows are 12px, 600 weight, ~0.08em letter-spacing, uppercase |

**Loaded in** `src/index.css` via Google Fonts.

**Common scale (marketing sections)**

- Eyebrows: `12px`, uppercase, `letter-spacing: 0.08em`, `--dark-gray`
- Section H2 (e.g. Perfect Match, new infra section): `clamp(28px, 3.8vw, 40px)`, Newsreader 400, `--charcoal`
- Hero headline (homepage): `56px` desktop (responsive in `homepage.css`)
- Body / quotes: `15–18px`, line-height ~1.6–1.65, `--dark-gray` or `--charcoal`

**Global headings** in `App.css` set large defaults for `h1`–`h3`; many components **override** these locally for marketing layouts.

---

## Spacing & layout

8px-derived scale (from `App.css`):

| Token | Value |
|--------|--------|
| `--xs` | `4px` |
| `--sm` | `16px` |
| `--md` | `32px` |
| `--lg` | `60px` (homepage file uses `64px` for `--lg`) |
| `--xl` | `128px` |

**Layout**

- **`--gutter`**: `24px` horizontal padding for contained sections.
- **`--container-max`**: `1440px` in `App.css`; some sections use `max-width: 1200px` in their own CSS for readability.
- **Section vertical rhythm**: often `clamp(48px, 8vw, 64px)` vertical padding + `border-bottom: 1px solid var(--gray)` between stacked sections.

---

## Components & patterns

### Buttons (`.btn`, `.btn-primary`, `.btn-secondary`)

- Defined in **`App.css`** and extended in **`homepage.css`** (padding, arrows, responsive full-width on small breakpoints).
- Primary: purple fill, white text; hover lift on global variant; homepage uses shadow on hover for primary.

### Global CTAs (`.cta`)

- Defined in **`App.css`** (global, app-wide). Use on **`<a>`** or **`<button>`**: base class **`cta`**, then a variant: **`cta--primary`** (purple fill), **`cta--secondary`** (outline on light backgrounds), **`cta--inverse`** (white fill for dark panels). Optional **`cta--lg`** for hero-sized padding; **`cta--block`** for a centered full-width-style control (capped `max-width`).
- Sizing tokens: `--cta-radius`, `--cta-pad-*`, `--cta-font-size*` in `:root` in `App.css`.

### Navbar

- Sticky white bar, bottom border `--gray`.
- **`Navbar.css`** owns layout, dropdowns, and mobile stacking.

### Homepage hero

- Split layout: ~55% copy / 45% proof (`homepage.css`).
- Eyebrow + large Newsreader headline + subhead + `.cta-buttons` row + trust line.

### Client logo marquee

- Full-width white band, optional sky treatment for specific logos (`ClientLogoMarquee.css`).

### “Perfect match” style sections

- White background, **two-column grid** (intro left, list right) → single column under `768px`.
- Numbered list with **Newsreader** numerals in `--primary`.

### “Practice infrastructure” style section (new)

- **`--surface`** band, three **white bordered cards** for Build / Grow / Brand, pillar lead lines in **primary** Newsreader, link row with middots and a trailing “Explore … →” link.

### Footer

- Dark **`--charcoal`** bar, light text (`Footer.css`).

---

## Motion & interaction

- Transitions commonly **`0.2s ease`** on color, border, and buttons.
- Marquee: long linear infinite scroll; **`prefers-reduced-motion`**: animation off, wrapped layout (`ClientLogoMarquee.css`).

---

## Assets

- **Logo / icons**: `public/icons/logo.svg` (navbar), `favicon.svg`, etc.
- **Client logos**: `public/client-logos/` (marquee glob + fallbacks).

---

## Files quick map

| Concern | Primary files |
|---------|----------------|
| Global tokens + legacy layout blocks | `src/App.css` |
| Homepage hero, stats, CTA row | `src/pages/homepage/homepage.css` |
| Fonts + body baseline | `src/index.css` |
| Perfect Match | `PerfectMatchSection.jsx` / `.css` |
| Practice infrastructure (one team) | `PracticeInfrastructureSection.jsx` / `.css` |
| Nav / footer / marquee | Matching `*.css` next to each component |

---

## Maintenance notes

1. **Token duplication**: `homepage.css` redefines `:root` variables; align with `App.css` when possible to avoid inconsistent `--lg` and container behavior.
2. **Semantic HTML**: new sections use `<section>`, headings in order, and `aria-labelledby` where a single H2 anchors the block.
3. **Links**: service routes in the new section mirror paths used in `Navbar.jsx` dropdowns.