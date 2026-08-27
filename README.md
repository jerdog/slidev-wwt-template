# slidev-theme-wwt

WWT-branded theme for [Slidev](https://sli.dev/). Author a presentation in
Markdown and ship it on-brand — with a companion starter deck and a Claude
Code plugin for conversational authoring.

> This is a personal open-source project by [@jerdog](https://github.com/jerdog).
> It is not an official World Wide Technology product and is not affiliated
> with or endorsed by WWT.

## Table of contents

- [Install](#install)
- [Updating](#updating)
  - [Updating the theme](#updating-the-theme)
  - [Updating the plugin](#updating-the-plugin)
- [Getting started](#getting-started)
  - [Option A — author by hand](#option-a--author-by-hand)
  - [Option B — author with the Claude Code plugin](#option-b--author-with-the-claude-code-plugin)
- [Layouts](#layouts)
  - [`speaker` and `thank-you` frontmatter](#speaker-and-thank-you-frontmatter)
- [Typography](#typography)
- [Dark mode](#dark-mode)
- [Animation](#animation)
- [Custom CSS reference](#custom-css-reference)
  - [Utility classes](#utility-classes)
  - [Overriding a layout's internals](#overriding-a-layouts-internals)
  - [Sizing a custom component to fill a `default` slide](#sizing-a-custom-component-to-fill-a-default-slide)
- [Claude Code plugin](#claude-code-plugin)
- [Known issues](#known-issues)
  - [Theme public assets resolve to broken paths](#theme-public-assets-resolve-to-broken-paths)
  - [`process` layout overflows past ~5 items](#process-layout-overflows-past-5-items)
  - [`<v-clicks>`-native layouts render empty on load](#v-clicks-native-layouts-render-empty-on-load)
- [Developing this theme](#developing-this-theme)
- [License](#license)

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

## Updating

### Updating the theme

The theme is a `github:` git dependency, so `pnpm add` pinned it to whatever
commit was current when you installed it. To pull the latest:

```bash
pnpm update slidev-theme-wwt
```

This re-resolves to the latest commit on the default branch and updates
`pnpm-lock.yaml`. There's no published changelog — check the
[commit history](https://github.com/jerdog/slidev-wwt-template/commits/main)
for what changed since your last install.

A new theme version may add or change public assets, so re-run the
known-issue copy step too:

```bash
cp node_modules/slidev-theme-wwt/public/* public/
```

If you've edited any of those copied files yourself, diff before
overwriting — this copies straight over them.

### Updating the plugin

If you installed the [Claude Code plugin](#claude-code-plugin), refresh the
marketplace and reinstall to pick up the latest version:

```
/plugin marketplace update slidev-wwt
/plugin install wwt-slidev@slidev-wwt
/reload-plugins
```

Reinstalling refreshes the marketplace's listing before resolving the
plugin, so this always gets you the latest commit. If the marketplace has
auto-update enabled, `/plugin marketplace update slidev-wwt` alone updates
it in the background on your next session.

## Getting started

Two ways to build a deck: by hand (below), or conversationally with the
[Claude Code plugin](#claude-code-plugin). Pick whichever fits — both
produce the same `slides.md`.

### Option A — author by hand

**1. Scaffold a deck directory.**

```bash
mkdir my-talk && cd my-talk
pnpm init
pnpm add -D slidev-theme-wwt@github:jerdog/slidev-wwt-template @slidev/cli vue
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "slidev",
    "build": "slidev build",
    "export": "slidev export"
  }
}
```

**2. Copy the theme's public assets** (see the
[known issue](#theme-public-assets-resolve-to-broken-paths) below for why
this step exists):

```bash
mkdir -p public && cp node_modules/slidev-theme-wwt/public/* public/
```

**3. Write `slides.md` slide by slide.** Start with the deck-level
frontmatter and a `cover`:

```markdown
---
theme: wwt
title: Zero to Production with Platform Engineering
info: A 20-minute conference talk.
layout: cover
subtitle: What we shipped, what broke, what we'd do differently
presenterName: Jeremy Meiss
presenterRole: Director, Developer Relations, World Wide Technology
date: 2026
---
```

_What you'll see:_ a full-bleed navy title slide with your title, subtitle,
name, and role.

Introduce yourself (and a co-speaker, if any) with `speaker`:

```markdown
---
layout: speaker
speakers:
  - name: Jeremy Meiss
    role: Director, Developer Relations
    company: World Wide Technology
    socials:
      bluesky: "@jerdog.dev"
      github: jerdog
---
```

_What you'll see:_ a white slide with a circular headshot placeholder (your
initial, until you add a `photo:`), your name, title, and a row of social
icons linking out.

Add an `agenda`, then your first content slide:

```markdown
---
layout: agenda
items:
  - The problem with our old rollout process
  - What platform engineering actually changed
  - Numbers, three months in
---

---

layout: default
title: The problem with our old rollout process

---

# The problem with our old rollout process

- Every deploy needed four teams to sign off
- Rollbacks took longer than the outage they were fixing
- No two environments were configured the same way
```

_What you'll see:_ a numbered two-column agenda, then a plain white content
slide with your bullets.

Anchor a point with `stats`:

```markdown
---
layout: stats
title: Three months in
stats:
  - value: "9x"
    label: faster deploys
  - value: "3"
    label: teams, down from 4
  - value: "0"
    label: rollback incidents
---
```

_What you'll see:_ three large numerals side by side, each with a label
underneath.

Close with `thank-you`:

```markdown
---
layout: thank-you
speakers:
  - name: Jeremy Meiss
    socials:
      bluesky: "@jerdog.dev"
      github: jerdog
slidesUrl: wwt.com/talks/platform-engineering
---
```

_What you'll see:_ a navy closing slide reading "Thank You," your name and
socials, and a link to where the slides live.

That's a complete 6-slide deck. See [Layouts](#layouts) below for the
other 13, and [`speaker` and `thank-you` frontmatter](#speaker-and-thank-you-frontmatter)
for the full `socials:`/`orgs:` reference.

**4. Preview and export.**

```bash
pnpm dev      # localhost:3030, hot-reloads on save
pnpm export   # slides-export.pdf
```

### Option B — author with the Claude Code plugin

Install the plugin once (see [Claude Code plugin](#claude-code-plugin)
below), then drive the whole workflow conversationally instead of hand-
writing YAML:

```
/wwt-talk-new
```

Answer its questions (title, presenter, audience, duration, topic) and it
scaffolds the directory, `package.json`, and a first draft of `slides.md`
— asking you to confirm a section outline before it writes anything.
Iterate with `/wwt-slide-add` for one more slide at a time, run
`/wwt-slide-review` before you rehearse, then `/wwt-talk-preview` to launch
`pnpm dev`. Full command reference in [`plugin/README.md`](./plugin/README.md).

## Layouts

| Layout           | Purpose                                                    |
| ---------------- | ---------------------------------------------------------- |
| `cover`          | Title slide — dark gradient                                |
| `speaker`        | Speaker bio — 1 or 2 speakers with headshot, socials       |
| `section`        | Section break — large numeral + title                      |
| `default`        | White content slide with monogram + gradient rule          |
| `agenda`         | Numbered table of contents                                 |
| `two-cols`       | Two-column content using `::left::` / `::right::`          |
| `quote`          | Pull quote (light or `dark: true`)                         |
| `image-feature`  | Headline beside an edge-bleed image (`side: left\|right`)  |
| `image-full`     | Full-bleed image with overlay headline                     |
| `stats`          | 1-4 big-number stats                                       |
| `team`           | Team grid with photos                                      |
| `comparison`     | Side-by-side cards                                         |
| `timeline`       | Horizontal milestone strip                                 |
| `process`        | Numbered process steps                                     |
| `code-focus`     | Dark code-centric slide                                    |
| `customer-quote` | Photo + large pull quote                                   |
| `demo`           | Framed screenshot or iframe                                |
| `thank-you`      | Closing — "Thank You" + 1-2 speakers, socials, slides link |
| `end`            | Closing slide — "Make a new world happen"                  |

### `speaker` and `thank-you` frontmatter

Both take a `speakers:` list of **1 or 2** entries — the layouts aren't
built to gracefully handle a third. `speaker` shows a full bio card per
person; `thank-you` shows just the name and socials, sign-off style.

```yaml
---
layout: speaker
title: Meet your speakers # optional heading
speakers:
  - name: Jeremy Meiss # required
    role: Director, Developer Relations # optional
    company: World Wide Technology # optional
    photo: /headshots/jeremy.png # optional — root-absolute, in *your* deck's public/
    socials: # optional — see below
      bluesky: "@jerdog.dev"
      github: jerdog
    orgs: # optional — see below
      - CNCF Ambassador
  - name: A Co-presenter
    role: Solutions Architect
    company: World Wide Technology
---
```

```yaml
---
layout: thank-you
speakers:
  - name: Jeremy Meiss
    socials:
      bluesky: "@jerdog.dev"
      github: jerdog
slidesUrl: wwt.com/talks/your-talk # optional — rendered as a text link
qr: /qr-slides.png # optional — an image you generate and drop in public/
heading: Thank You # optional — overrides the default "Thank You" headline
---
```

**`socials:`** is a map of platform key → handle. Known platform keys
resolve straight to a profile URL and the matching brand icon — you only
supply the handle:

| Key                | Handle you provide                                           | Resolves to                           |
| ------------------ | ------------------------------------------------------------ | ------------------------------------- |
| `bluesky`          | `"@jerdog.dev"`                                              | `https://bsky.app/profile/jerdog.dev` |
| `mastodon`         | `"@jerdog@fosstodon.org"`                                    | `https://fosstodon.org/@jerdog`       |
| `github`           | `jerdog`                                                     | `https://github.com/jerdog`           |
| `gitlab`           | `jerdog`                                                     | `https://gitlab.com/jerdog`           |
| `linkedin`         | `jerdog`                                                     | `https://www.linkedin.com/in/jerdog`  |
| `x` (or `twitter`) | `jerdog`                                                     | `https://x.com/jerdog`                |
| `youtube`          | `jerdog` or `@jerdog`                                        | `https://youtube.com/@jerdog`         |
| `instagram`        | `jerdog`                                                     | `https://instagram.com/jerdog`        |
| `facebook`         | `jerdog`                                                     | `https://facebook.com/jerdog`         |
| `medium`           | `jerdog`                                                     | `https://medium.com/@jerdog`          |
| `website`          | `jeremymeiss.com`                                            | `https://jeremymeiss.com`             |
| `email`            | `jeremy.meiss@wwt.com`                                       | `mailto:jeremy.meiss@wwt.com`         |
| `discord`, `slack` | a **full URL** — no fixed per-user pattern exists for either | used as-is                            |

A bare handle for `discord`/`slack` (or any unrecognized key that isn't a
full URL) renders as plain, non-linking text — never a broken link.

For anything the table above doesn't cover, or to fully control the
icon/label/url, pass an object instead of a string:

```yaml
socials:
  matrix:
    icon: link # optional — one of the keys above; defaults to a generic link glyph
    label: "@jerdog:matrix.org"
    url: https://matrix.to/#/@jerdog:matrix.org
```

**`orgs:`** (speaker only) lists community affiliations as pills — a plain
string, or an object for an optional logo/link:

```yaml
orgs:
  - CNCF Ambassador
  - name: DevOpsDays Chicago
    logo: /orgs/dod-chi.png # optional
    url: https://devopsdays.org/chicago # optional — makes the pill clickable
```

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

Always-dark layouts (`cover`, `section`, `end`, `thank-you`, `code-focus`,
`image-full`) stay dark regardless of toggle. Light content layouts swap
background, ink, and monogram colors cleanly.

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

## Custom CSS reference

Every CSS custom property the layouts use is defined in
[`styles/tokens.css`](./styles/tokens.css) on `:root`, with dark-mode
overrides on `.dark`. Use these instead of hardcoded colors/spacing/sizes
in your own components and per-slide `<style>` blocks — that's what keeps
a custom slide looking like it belongs in the deck.

**Color:**

| Token                                        | Value                                                               |
| -------------------------------------------- | ------------------------------------------------------------------- |
| `--wwt-primary-base/medium/light/lightest`   | `#0086ea` / `#339eee` / `#66b6f2` / `#99cff7`                       |
| `--wwt-secondary-base/medium/light/lightest` | `#1c0087` / `#49339f` / `#7766b7` / `#a499cf`                       |
| `--wwt-accent1-base` … `--wwt-accent6-base`  | Royal Blue, Violet, Pink, Purple, Orange, Bright Red — accents only |
| `--wwt-accent7-base`                         | `#1d1e48` Navy — the always-dark layout background                  |
| `--wwt-ink-base`                             | Body text color — flips light/dark with `.dark`                     |
| `--wwt-ink-white`                            | `#ffffff`, fixed regardless of mode                                 |
| `--wwt-ink-muted`                            | Muted text — flips light/dark with `.dark`                          |
| `--wwt-bg-base`                              | Slide background — flips light/dark with `.dark`                    |

**Spacing scale:** `--wwt-space-1/2/3/4/6/8/12/16` = `.25rem` through `4rem`.

**Type scale:** `--wwt-text-cover` (72px), `-section` (84px),
`-section-number` (220px), `-h1` (40px), `-h2` (28px), `-body` (20px),
`-caption` (16px), `-quote` (36px).

**Other:** `--wwt-grad-cover` (the radial gradient behind `cover`),
`--wwt-monogram-url` (swaps to the white monogram PNG under `.dark`).

### Utility classes

- **`.wwt-monogram-mark`** — a 32×32 block rendered from
  `--wwt-monogram-url`. Drop `<div class="wwt-monogram-mark" role="img" aria-label="WWT" />`
  into a custom component if you need the monogram outside a layout that
  already renders one.
- **`.wwt-header-center`** — pass as `layoutClass:` (not `class:`) on
  Slidev's built-in `two-cols-header` layout to center its header row:
  ```yaml
  ---
  layout: two-cols-header
  layoutClass: wwt-header-center
  ---
  ```
- **`.wwt-cols-center`** — same `layoutClass:` mechanism, for the same
  `two-cols-header` layout, but vertically centers `::left::`/`::right::`
  content instead of the header row. That layout only sets `align-self` on
  its `.col-bottom` slot, so the left/right columns default to `stretch` and
  their content top-flows; this class fixes that. Combine with
  `wwt-header-center` as needed:
  ```yaml
  ---
  layout: two-cols-header
  layoutClass: wwt-header-center wwt-cols-center
  ---
  ```
- **Global element defaults** inside every `.slidev-layout`: `h1`
  (`--wwt-text-h1`, primary color, 700 weight), `h2` (`--wwt-text-h2`, 600),
  `p`/`li` (`--wwt-text-body`), `a` (primary color, underlined via
  `border-bottom`), `strong` (700), `em` (italic). All text is left-aligned
  by default — brand convention, not an accident; the dark sign-off layouts
  (`cover`, `section`, `end`, `thank-you`) explicitly override this back to
  centered.

### Overriding a layout's internals

Use `:deep(...)` for any selector targeting an element the layout renders
internally — Vue only stamps a slide's scoped-CSS hash onto the layout's
**root** element, not its descendants, so a plain selector compiles to an
attribute selector that matches nothing and fails silently:

```vue
<style>
/* WRONG — never matches, no error */
.wwt-quote__text {
  font-size: 56px !important;
}

/* RIGHT */
:deep(.wwt-quote__text) {
  font-size: 56px !important;
}
</style>
```

Layout-internal class names follow `wwt-<layout>__<element>` (e.g.
`.wwt-speaker-card__name`, `.wwt-thank-you__socials`) — check the layout's
source in [`layouts/`](./layouts) or the component in
[`components/`](./components) for the exact names to target.

### Sizing a custom component to fill a `default` slide

Use `flex: 1; min-height: 0` on the component's root — not `height: 100%`,
which can render taller than the slide's fixed canvas and get clipped
silently by `overflow: hidden`:

```vue
<style scoped>
.my-diagram {
  flex: 1;
  min-height: 0;
}
</style>
```

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

See [AGENTS.md](./AGENTS.md) for repo conventions (styling tokens, layout
checklist, etc.) — including the rule that any change to this README's
headings must also update the [Table of contents](#table-of-contents) above.

## License

MIT — make a new world happen.
