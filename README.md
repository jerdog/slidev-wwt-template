# slidev-theme-wwt

WWT-branded theme for [Slidev](https://sli.dev/). Author a presentation in
Markdown and ship it on-brand — with a companion starter deck and a Claude
Code plugin for conversational authoring.

## Install

The theme is distributed directly from this GitHub repo (no npm publish):

```bash
pnpm add -D github:jerdog/slidev-wwt-template
```

Then set the theme in your deck's `slides.md` frontmatter:

```markdown
---
theme: wwt
title: Your deck title
---
```

## Layouts

| Layout           | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `cover`          | Title slide — dark gradient                               |
| `section`        | Section break — large numeral + title                     |
| `default`        | White content slide with monogram + gradient rule         |
| `agenda`         | Numbered table of contents                                |
| `two-cols`       | Two-column content using `::left::` / `::right::`         |
| `quote`          | Pull quote (light or `dark: true`)                        |
| `image-feature`  | Headline beside an edge-bleed image (`side: left\|right`) |
| `image-full`     | Full-bleed image with overlay headline                    |
| `stats`          | 1-4 big-number stats                                      |
| `team`           | Team grid with photos                                     |
| `comparison`     | Side-by-side cards                                        |
| `timeline`       | Horizontal milestone strip                                |
| `process`        | Numbered process steps                                    |
| `code-focus`     | Dark code-centric slide                                   |
| `customer-quote` | Photo + large pull quote                                  |
| `demo`           | Framed screenshot or iframe                               |
| `end`            | Closing slide — "Make a new world happen"                 |

## Typography

The theme ships with [Inter](https://rsms.me/inter/) as a Roobert stand-in. If
you have a licensed copy of Roobert, drop it into your deck's `public/fonts/`
and override the font stack in your own CSS.

## Dark mode

The theme supports both light and dark color schemes. Press `D` during a
presentation to toggle, click the sun/moon button in the footer, or pin a
deck to one mode via frontmatter:

```markdown
---
theme: wwt
colorSchema: dark
---
```

Always-dark layouts (`cover`, `section`, `end`, `code-focus`, `image-full`)
stay dark regardless of toggle. Light content layouts swap background, ink,
and monogram colors cleanly.

## Animation

The theme combines three layers:

1. **Slidev built-ins** — `v-click`, `v-clicks`, named slide `transition:`
   frontmatter.
2. **AutoAnimate** — `v-auto-animate` directive is registered globally; use
   it on any container whose children appear, disappear, or reorder.
3. **`<v-motion>` presets** — for explicit entrance/exit motion. Examples:

```vue
<v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1 }">
  Slide-up entrance
</v-motion>
```

Five built-in layouts use `v-auto-animate` + `<v-clicks>` already: `agenda`,
`timeline`, `stats`, `team`, `process`. Each child appears on click with a
smooth tween.

## Claude Code plugin

The [`plugin/`](./plugin) directory ships a Claude Code plugin that teaches
Claude the layout catalog, WWT tone, and conference-talk authoring workflow.
Install it from this repo and use slash commands like `/wwt-talk-new` and
`/wwt-slide-add` to author decks conversationally. See
[`plugin/README.md`](./plugin/README.md) for setup.

## Developing this theme

This repo is a pnpm workspace. The theme lives at the root; the starter deck
lives at [`starter/`](./starter) and consumes the theme via `workspace:*`.

```bash
pnpm install
pnpm dev
```

Open `localhost:3030`. Edit `starter/slides.md` and watch it hot-reload.

| Command          | What it does                     |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Run the starter deck             |
| `pnpm build`     | Build the starter to static HTML |
| `pnpm export`    | Export the starter to PDF        |
| `pnpm lint`      | Run ESLint across the workspace  |
| `pnpm typecheck` | Type-check theme + starter       |
| `pnpm test`      | Run theme unit tests             |
| `pnpm format`    | Prettier-format everything       |

## License

MIT — make a new world happen.
