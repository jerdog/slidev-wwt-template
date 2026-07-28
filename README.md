# slidev-theme-wwt

WWT-branded theme for [Slidev](https://sli.dev/). Author a presentation in
Markdown and ship it on-brand — with a companion starter deck and a Claude
Code plugin for conversational authoring.

> This is a personal open-source project by [@jerdog](https://github.com/jerdog).
> It is not an official World Wide Technology product and is not affiliated
> with or endorsed by WWT.

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

**Known-issue post-install step** (see the [Known issues](#known-issues)
section below): copy the theme's public assets into your deck's `public/`
directory so logos and gradients resolve at their expected paths:

```bash
mkdir -p public && cp node_modules/slidev-theme-wwt/public/* public/
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
Install it from an interactive Claude Code session:

```
/plugin marketplace add jerdog/slidev-wwt-template
/plugin install wwt-slidev@slidev-wwt
/reload-plugins
```

Then use slash commands like `/wwt-talk-new`, `/wwt-talk-retheme`,
`/wwt-talk-import`, `/wwt-slide-add`, `/wwt-slide-review`, and
`/wwt-talk-preview` to author decks conversationally. Full details in
[`plugin/README.md`](./plugin/README.md).

## Known issues

### Theme public assets resolve to broken paths

The theme's components reference root-absolute paths (`/wwt-logo.png`,
`/wwt-monogram.png`, `/wwt-gradient-rule.png`, `/bg-cover-gradient.png`,
`/bg-section-gradient.jpeg`). Slidev's `vite-plugin-static-copy` integration
nests theme public assets under `dist/theme/node_modules/.pnpm/…/public/*`
instead of the root path the components request. The images render as
broken in both dev and build, silently, with no console error.

**Workaround** (already shown in the Install section above): copy the
theme's public assets into your deck's own `public/` directory:

```bash
mkdir -p public && cp node_modules/slidev-theme-wwt/public/* public/
```

Verify with `curl -sI http://localhost:3030/wwt-logo.png | head -1` — a
`200 OK` with `Content-Type: image/png` means it's serving the file; a
`200 OK` with `Content-Type: text/html` means Vite's SPA fallback is
serving `index.html` and the copy didn't land.

### `process` layout overflows past ~5 items

`process.vue` uses `grid-auto-flow: column` with no wrapping. Six or
seven steps render off the right edge of the slide even with short
labels. For 6+ steps, use `default` with your own grid.

### `<v-clicks>`-native layouts render empty on load

`agenda`, `timeline`, `stats`, `team`, and `process` use `<v-clicks>`
under the hood. On the first render they display nothing until you press
`→`. When reviewing these slides in isolation, either advance the click
counter or append `?clicks=999` to the URL.

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
