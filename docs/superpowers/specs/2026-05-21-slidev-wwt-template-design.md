# Slidev WWT Template — Design Spec

**Date:** 2026-05-21
**Status:** Approved (brainstorming phase complete)
**Owner:** Jeremy Meiss (jeremy.meiss@wwt.com)

## Goal

Build a Slidev theme and starter project that lets anyone author a WWT-branded
presentation by writing Markdown. The deliverable is a pnpm monorepo containing
two packages:

1. `slidev-theme-wwt` — a publishable Slidev theme (npm package)
2. `starter` — a runnable sample deck that consumes the theme and demonstrates
   every layout

The theme must comply with WWT brand guidelines (colors, typography, logo,
gradient line, graphic device, tone) while remaining easy to install and edit.

## Non-goals

- Multi-language / i18n support
- Custom Slidev plugins beyond Shiki, Mermaid, and AutoAnimate setup
- Distributing proprietary Roobert font files
- Auto-cross-slide chapter numbering (frontmatter sets `number` explicitly)
- Heavy animation libraries (GSAP, Motion One) beyond AutoAnimate +
  Slidev's built-in `<v-motion>` and `v-click` directives

## Architecture

### Repository layout

```
slidev-wwt-template/
├── package.json                 # workspace root scripts
├── pnpm-workspace.yaml          # packages/*
├── tsconfig.base.json
├── .editorconfig, .gitignore, .prettierrc, .eslintrc
├── docs/superpowers/specs/      # design + implementation plan
├── packages/
│   ├── slidev-theme-wwt/        # the publishable theme
│   └── starter/                 # consumer demo deck
└── scripts/
    └── sync-tokens.mjs          # optional: refresh tokens from Blue Steel MCP
```

### Theme package (`packages/slidev-theme-wwt`)

Follows Slidev's published-theme conventions
(https://sli.dev/themes/write-a-theme.html):

```
slidev-theme-wwt/
├── package.json                 # name: "slidev-theme-wwt"
│                                # "slidev": { "colorSchema": "both", "highlighter": "shiki" }
│                                # peerDependencies: @slidev/cli, @slidev/types, vue
├── layouts/                     # *.vue — auto-discovered by Slidev
│   ├── cover.vue
│   ├── section.vue
│   ├── default.vue              # override
│   ├── agenda.vue
│   ├── two-cols.vue             # override
│   ├── quote.vue                # override
│   ├── image-feature.vue
│   ├── image-full.vue
│   ├── stats.vue
│   ├── team.vue
│   ├── comparison.vue
│   ├── timeline.vue
│   ├── process.vue
│   ├── code-focus.vue
│   ├── customer-quote.vue
│   ├── demo.vue
│   └── end.vue
├── components/                  # *.vue building blocks
│   ├── WwtLogo.vue
│   ├── GradientRule.vue
│   ├── GraphicDevice.vue
│   ├── Stat.vue
│   ├── PersonCard.vue
│   ├── SectionNumber.vue
│   └── Footer.vue
├── styles/
│   ├── index.ts                 # imports all CSS, registers @fontsource
│   ├── tokens.css               # CSS custom properties
│   ├── layout.css               # base typography, container, slide reset
│   ├── code.css                 # code block tweaks
│   └── print.css                # PDF export rules
├── setup/
│   ├── main.ts                  # defineAppSetup — font preload
│   ├── shiki.ts                 # defineShikiSetup — WWT-tinted code theme
│   └── mermaid.ts               # defineMermaidSetup — WWT colors
├── public/                      # served at /<file> in deck
│   ├── wwt-logo.png
│   ├── wwt-logo-white.png
│   ├── wwt-logo-black.png
│   ├── wwt-monogram.png
│   ├── wwt-monogram-white.png
│   ├── wwt-gradient-rule.png
│   ├── bg-cover-gradient.png    # pre-rendered radial gradient + graphic device
│   └── bg-section-gradient.png
└── README.md
```

### Starter package (`packages/starter`)

```
starter/
├── package.json                 # depends on slidev-theme-wwt (workspace:*), @slidev/cli
├── slides.md                    # demonstrates every layout
├── components/                  # deck-local overrides (empty by default)
├── public/                      # deck-specific images (sample headshots, screenshots)
├── snippets/                    # external code samples for code-focus slide
└── README.md                    # "how to author a WWT deck"
```

### Workspace root

- `pnpm-workspace.yaml` lists `packages/*`
- Root `package.json` scripts proxy to starter:
  - `dev` → `pnpm --filter starter dev`
  - `build` → `pnpm --filter starter build`
  - `export` → `pnpm --filter starter export`
  - `lint`, `format`, `typecheck` → root-level over all packages

## Design tokens

CSS custom properties in `styles/tokens.css` are the runtime source of truth.
Values are seeded from the WWT brand skill's Blue Steel token mapping (hardcoded
fallbacks). The `scripts/sync-tokens.mjs` helper can regenerate this file from
the Blue Steel MCP when available.

```css
:root {
  /* Primary — Light Blue */
  --wwt-primary-base: #0086EA;
  --wwt-primary-medium: #339EEE;
  --wwt-primary-light: #66B6F2;
  --wwt-primary-lightest: #99CFF7;

  /* Secondary — Dark Blue */
  --wwt-secondary-base: #1C0087;
  --wwt-secondary-medium: #49339F;
  --wwt-secondary-light: #7766B7;
  --wwt-secondary-lightest: #A499CF;

  /* Accents */
  --wwt-accent1-base: #162FB4;  /* Royal Blue */
  --wwt-accent2-base: #330072;  /* Violet */
  --wwt-accent3-base: #E31C79;  /* Pink */
  --wwt-accent4-base: #8212C4;  /* Purple */
  --wwt-accent5-base: #FB550E;  /* Orange */
  --wwt-accent6-base: #EE282A;  /* Bright Red — accents only */
  --wwt-accent7-base: #1D1E48;  /* Navy */

  /* Ink + background */
  --wwt-ink-base: #0A0B19;
  --wwt-ink-white: #FFFFFF;
  --wwt-bg-base: #FFFFFF;

  /* Signature gradient (matches Blue Steel gradientBlueCenter) */
  --wwt-grad-cover: radial-gradient(circle at center,
    var(--wwt-accent1-base) 0%,
    var(--wwt-accent7-base) 70%);
}
```

## Typography

- **Font:** Inter as the Roobert stand-in, vendored via `@fontsource/inter`
  (weights 300/400/600/700). No external CDN call.
- **Stack:** `Inter, Roobert, Arial, system-ui, sans-serif` — if the consumer
  has Roobert installed locally, the browser will prefer it; if they vendor
  Roobert into `public/fonts/`, they can swap the `@fontsource/inter` import
  for their own `@font-face` declarations.
- **Type scale (Slidev runs at a default 1980×1080 canvas):**

  | Element | Size | Weight | Color | Leading |
  |---|---|---|---|---|
  | Cover headline | 72px | 300 (Light) | `--wwt-ink-white` | 100% |
  | Section title | 84px | 300 | `--wwt-ink-white` | 100% |
  | Section number | 220px | 300 | `--wwt-primary-base` | 100% |
  | Slide H1 | 40px | 700 (Bold) | `--wwt-primary-base` | 110% |
  | Slide H2 | 28px | 600 | `--wwt-ink-base` | 130% |
  | Body | 20px | 400 | `--wwt-ink-base` | 135% |
  | Caption | 16px | 400 | `--wwt-ink-base` at 70% opacity | 130% |
  | Pull quote | 36px | 400 | `--wwt-ink-base` | 130% |

- **Rules:** left-aligned only, no ALL CAPS, no gradient treatment on text,
  no center/right alignment on body text. Light-blue headlines must be bold
  and/or ≥18pt to satisfy WCAG AA on white (the 40px H1 satisfies this).

## Layouts

Each layout maps to `layout: <name>` in frontmatter. Frontmatter keys are the
public API.

| Layout | Background | Frontmatter keys (besides `layout`) |
|---|---|---|
| `cover` | Pre-rendered navy radial gradient with graphic device; white reversed full logo top-right | `title`, `subtitle`, `presenter`, `presenterRole`, `date` |
| `section` | Same gradient family as cover | `number`, `title` |
| `default` | White; gradient rule top; monogram top-left | The slide H1 is the markdown `# Heading` |
| `agenda` | White | `items: string[]` (auto-numbered) |
| `two-cols` | White | Uses Slidev's `::left::` / `::right::` slots |
| `quote` | White (default) or dark gradient (when `dark: true`) | `attribution`, `role`, `dark?` |
| `image-feature` | White, image edge-bleed | `image`, `side: 'left' \| 'right'` |
| `image-full` | Full-bleed image with gradient scrim for legibility | `image`, `headline` |
| `stats` | White | `stats: { value, label, caption? }[]` (1–4 cards) |
| `team` | White | `members: { name, role, photo? }[]` |
| `comparison` | White, two cards with light-blue header bars | `left: { title, points[] }`, `right: { title, points[] }` |
| `timeline` | White, gradient rule as baseline | `events: { date, label, detail? }[]` |
| `process` | White, numbered chevrons | `steps: { title, detail? }[]` |
| `code-focus` | Dark (`--wwt-accent7-base`) | code block in slide body |
| `customer-quote` | White; large pull quote | `quote`, `name`, `role`, `photo?`, `logo?` |
| `demo` | White; framed screenshot/iframe with light shadow | `src`, `caption?` |
| `end` | Navy gradient; "Make a new world happen"; full reversed logo center; "wwt.com" footer | `signoff?` (overrides default tagline) |

### Shared components

- `<WwtLogo variant="color|white|black|monogram-color|monogram-white" :height="px" />`
  — proportional height calculated from PNG intrinsic dimensions; never both
  width and height hardcoded.
- `<GradientRule />` — renders `wwt-gradient-rule.png` as a 4px-tall, full-width strip.
- `<GraphicDevice variant="dark|light" />` — picks the pre-rendered background
  image; the diagonal lines are part of the asset (per brand: never
  programmatically recreated).
- `<Stat :value :label :caption />` — large numeral in `--wwt-primary-base`.
- `<PersonCard :name :role :photo />` — circular photo, name bold, role caption.
- `<SectionNumber :n />` — 220px light-weight light-blue numeral.
- `<Footer />` — slide number, deck title, monogram bottom-left on interior
  slides; optionally embeds `<DarkToggle />`.
- `<DarkToggle />` — small button that flips `colorSchema` via Slidev's
  `useDark()` composable. Sun/moon glyph; hidden on always-dark slides.

## Code blocks (Shiki)

`setup/shiki.ts` uses `defineShikiSetup` to register two WWT-tinted themes:

- **`wwt-dark`** — bg `#1D1E48`, keywords `#66B6F2`, strings `#99CFF7`,
  comments `#7766B7`, plain text `#FFFFFF`
- **`wwt-light`** — bg `#FFFFFF`, keywords `#1C0087`, strings `#0086EA`,
  comments `#7766B7`, plain text `#0A0B19`

`code-focus` layout uses `wwt-dark` by default. Inline code on light slides
uses `wwt-light`.

## Mermaid

`setup/mermaid.ts` registers a WWT theme variables object:

```js
{
  primaryColor: '#0086EA',
  primaryTextColor: '#FFFFFF',
  primaryBorderColor: '#1C0087',
  lineColor: '#0A0B19',
  secondaryColor: '#1C0087',
  tertiaryColor: '#99CFF7',
}
```

## Brand assets

PNGs are copied from the `wwt-brand`/`wwt-presentation` skills into
`packages/slidev-theme-wwt/public/`:

- Logos: `wwt-logo.png`, `wwt-logo-white.png`, `wwt-logo-black.png`,
  `wwt-monogram.png`, `wwt-monogram-white.png`
- Decoration: `wwt-gradient-rule.png`
- Backgrounds (pre-rendered, include graphic device):
  - `bg-cover-gradient.png` (navy radial + graphic device, white logo
    composited)
  - `bg-section-gradient.png` (navy radial + graphic device, no logo)

These are served from the theme package's `public/` directory and reachable as
`/wwt-logo.png` etc. inside slide markdown.

## Dark mode

The theme supports both light and dark color schemes. Slidev applies a `.dark`
class on the root element when the user toggles dark mode (keyboard `D`,
the optional `<DarkToggle />` UI in the footer, or `colorSchema: dark` in
frontmatter). The theme's `package.json` declares `"colorSchema": "both"`.

**Which slides change:**

- **Light content layouts** (`default`, `agenda`, `two-cols`, `quote` light
  variant, `image-feature`, `stats`, `team`, `comparison`, `timeline`,
  `process`, `customer-quote`, `demo`) — switch background and ink colors
  via CSS variable overrides. Layouts themselves do not change.
- **Always-dark layouts** (`cover`, `section`, `end`, `code-focus`, `image-full`,
  `quote` with `dark: true`) — unaffected by dark mode. They are dark by
  design in both schemes.

**Token overrides** (appended to `styles/tokens.css`):

```css
:root {
  --wwt-monogram-url: url("/wwt-monogram.png");
}

.dark {
  --wwt-bg-base: #0a0b19;
  --wwt-ink-base: #ffffff;
  --wwt-ink-muted: rgba(255, 255, 255, 0.7);
  --wwt-primary-lightest: rgba(102, 182, 242, 0.15);
  --wwt-monogram-url: url("/wwt-monogram-white.png");
}
```

`--wwt-primary-base` (`#0086EA`) stays constant — it has 4.5:1 contrast on
the dark background, sufficient for AA-large given our 40px bold H1.

**Monogram swap:** Layouts that show the small WWT monogram in the corner use
a CSS-backed `<div>` instead of an `<img>`, reading the asset URL from the
`--wwt-monogram-url` token. This auto-swaps to the white monogram in dark
mode without any Vue logic.

```vue
<div class="wwt-monogram-mark" role="img" aria-label="WWT" />
```
```css
.wwt-monogram-mark {
  width: 32px;
  height: 32px;
  background: var(--wwt-monogram-url) center / contain no-repeat;
}
```

**Optional `<DarkToggle />` component** sits inside `<Footer />` and uses
Slidev's `useDark()` composable to flip the scheme on click. Slidev's `D`
keyboard shortcut remains the primary toggle.

## Animation

The theme combines three layers of motion, escalating from least to most code:

1. **Slidev built-ins** — `v-click`, `v-clicks`, `v-after` for progressive
   reveals; named slide transitions (`transition: slide-left` etc.) in
   frontmatter; `<v-motion>` from `@vueuse/motion` (Slidev's bundled
   dependency) for declarative entrance/exit motion.
2. **AutoAnimate** — `@formkit/auto-animate` registered globally as the
   `v-auto-animate` directive. Applied to layouts whose content reveals or
   reorders: `agenda`, `timeline`, `stats`, `team`, `process`. Auto-tweens
   child add/remove/move with zero per-call configuration.
3. **Documented `<v-motion>` patterns** — the theme README lists 4-6 ready-
   to-paste presets (slide-up, fade-in, stagger-list, magic-number, etc.)
   for authors who want emphasis animation on a specific element.

**Implementation:**
- Dep: `@formkit/auto-animate` (~3KB) added to the theme `dependencies`
- Plugin registered in `setup/main.ts` via `autoAnimatePlugin`
- Affected layouts wrap their reveal lists with `v-auto-animate`
- Combined with Slidev's `v-clicks` so each child appears on click with a
  smooth tween instead of an abrupt swap

**Default click model:** Every list/grid layout uses `<ul v-auto-animate>`
with `<v-clicks>` children — authors get progressive reveal + smooth motion
by default, with no extra markup. Authors who want all-at-once display can
remove the `v-clicks` wrapper.

## Print / PDF export

`styles/print.css` handles `slidev export`:
- Force backgrounds to print (`-webkit-print-color-adjust: exact`)
- Hide footer slide-number on full-bleed cover/section/end slides
- Ensure gradient line and logos render at full opacity

## Sample `slides.md` (starter)

Demonstrates every layout in a coherent narrative — order:

1. `cover` — "Make a new world happen" demo deck
2. `agenda`
3. `default` — opening statement
4. `default` — value props
5. `section` — "Section 1 · Why WWT"
6. `stats` — four big numbers
7. `quote` — analyst quote
8. `team` — team grid
9. `section` — "Section 2 · How we deliver"
10. `code-focus` — sample code
11. `customer-quote` — customer testimonial
12. `comparison` — before/after
13. `timeline` — engagement milestones
14. `process` — 4-step methodology
15. `image-feature` — capability spotlight
16. `image-full` — section visual
17. `demo` — screenshot frame
18. `default` — recap
19. `end` — "Make a new world happen"

## Tone of voice (sample copy and README)

Sample copy in `slides.md` and READMEs follows WWT tone:
- Purposeful, bold and confident, beautifully simple, refreshing
- "World Wide Technology" on first use, "WWT" thereafter
- Sign-off on the `end` slide: "Make a new world happen"

## Tooling

- **Package manager:** pnpm 9, Node ≥ 20
- **TypeScript:** root `tsconfig.base.json`; theme has its own `tsconfig.json`
  extending it
- **Lint:** ESLint flat config + `eslint-plugin-vue`
- **Format:** Prettier with `prettier-plugin-vue`
- **License:** MIT for the theme; MIT for the starter
- **CI:** scaffold a `.github/workflows/ci.yml` running `pnpm install`,
  `pnpm lint`, `pnpm typecheck`, `pnpm --filter starter build` on PR

## Distribution

- Theme is published as `slidev-theme-wwt` on npm (manual `pnpm publish` from
  `packages/slidev-theme-wwt`; no auto-publish in v1)
- Starter is **not** published — it is consumed by cloning the repo or copying
  the `packages/starter` directory

## Risks and open questions

- **Inter vs Roobert mismatch:** Inter's metrics are close to Roobert but not
  identical. Acceptable trade-off for distribution simplicity. Consumers with
  a Roobert license can swap the font import.
- **Brand asset licensing:** The `wwt-brand` skill's PNG assets are bundled
  into the theme `public/` folder. If WWT considers these restricted, the
  theme should ship without them and document where to drop them — flag this
  for review before publishing publicly.
- **Slidev breaking changes:** Slidev's theme API is stable but evolving. The
  theme pins a `peerDependency` range; updates may require minor adjustments.

## Acceptance criteria

- `pnpm install && pnpm dev` from repo root opens a working WWT-branded deck
  at `localhost:3030`
- Every layout in the table above renders correctly with sample frontmatter
- `pnpm export` produces a PDF where logos, gradient line, and graphic device
  appear as intended
- ESLint, Prettier, and TypeScript pass with no errors
- WCAG AA contrast satisfied for every text-on-background combination used by
  the theme's layouts, in **both** light and dark mode
- Pressing `D` toggles dark mode; light content layouts swap background/ink/
  monogram cleanly; always-dark layouts (cover, section, end, code-focus,
  image-full) are unaffected
- Reveal-style layouts (agenda, timeline, stats, team, process) animate
  children smoothly via `v-auto-animate` + `<v-clicks>`; no janky pop-in
- Sample deck reads in WWT tone (purposeful, bold, simple, refreshing) and
  signs off with "Make a new world happen"
