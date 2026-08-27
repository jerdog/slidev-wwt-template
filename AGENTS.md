# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, etc.) working
in this repo. Human contributors: the same ground rules apply to you.

## What this is

`slidev-theme-wwt` is a WWT-branded [Slidev](https://sli.dev/) theme,
structured as a pnpm workspace with three parts:

| Path                                                                  | What it is                                                                                                                               |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| repo root (`layouts/`, `components/`, `styles/`, `setup/`, `public/`) | The theme itself — the `slidev-theme-wwt` package, distributed via `github:` dependency, not published to npm                            |
| [`starter/`](./starter)                                               | A sample deck — the one pnpm workspace package (`pnpm-workspace.yaml`), consumes the theme via `workspace:*`, used for local dev/preview |
| [`plugin/`](./plugin)                                                 | A Claude Code plugin (its own `.claude-plugin/plugin.json`, **not** a pnpm workspace package) with slash commands and an authoring skill |

Full user-facing docs live in [README.md](./README.md) (theme) and
[plugin/README.md](./plugin/README.md) (plugin). This file is for how to
work _on_ the repo, not how to use it.

## Commands

Run from the repo root unless noted.

| Command                        | What it does                               |
| ------------------------------ | ------------------------------------------ |
| `pnpm install`                 | Install workspace deps                     |
| `pnpm dev`                     | Run the starter deck (`localhost:3030`)    |
| `pnpm build`                   | Build the starter to static HTML           |
| `pnpm export`                  | Export the starter to PDF                  |
| `pnpm lint`                    | ESLint across the workspace                |
| `pnpm typecheck`               | `vue-tsc` on the theme + starter           |
| `pnpm test`                    | Vitest unit tests (`components/__tests__`) |
| `pnpm format` / `format:check` | Prettier                                   |

Before calling a change to theme code (`layouts/`, `components/`, `styles/`)
done, run `pnpm typecheck`, `pnpm lint`, and `pnpm test` — all three are
green on `main`.

## Conventions

- **Tokens, not hardcoded values.** Every color/spacing/type-size a layout
  uses is a CSS custom property in [`styles/tokens.css`](./styles/tokens.css)
  (`--wwt-*`), with dark-mode overrides on `.dark`. New layouts/components
  must use these instead of literal hex/px values — see the README's
  [Custom CSS reference](./README.md#custom-css-reference) for the full list.
- **Layout-internal class names** follow `wwt-<layout>__<element>` (e.g.
  `.wwt-quote__text`). Target them from a slide's scoped `<style>` with
  `:deep(...)` — see [Overriding a layout's internals](./README.md#overriding-a-layouts-internals)
  for why a plain selector silently matches nothing.
- **Dark-only layouts** (`cover`, `section`, `end`, `thank-you`, `code-focus`,
  `image-full`) always render dark regardless of the deck's `colorSchema` or
  the runtime toggle — don't add light-mode branches to them.
- **`socials:` platform keys** are resolved in
  [`components/socialPlatforms.ts`](./components/socialPlatforms.ts). Adding
  a new known platform means updating that resolver, `SocialIcon.vue`, _and_
  the platform table in both this repo's README and
  `plugin/skills/wwt-slidev-authoring/SKILL.md` — they document the same
  contract and drift if only one is touched.
- **New layout checklist:** the `.vue` file in `layouts/`, a row in the
  README's [Layouts](./README.md#layouts) table, a case in
  `plugin/skills/wwt-slidev-authoring/SKILL.md`'s layout catalog, and a
  Vitest spec under `components/__tests__/` if it has non-trivial logic.
- **Adding a body slot to an existing layout** follows the same
  checklist: update the README row and flip the **Body slot?** column
  (plus any capacity note) in `SKILL.md`'s layout catalog. Use the
  `boxes`/`comparison`/`timeline` pattern — a `<div v-if="$slots.default"
class="wwt-<layout>__footer"><slot /></div>` wrapper placed before
  `<Footer />`, styled with `margin-top: var(--wwt-space-6); color:
var(--wwt-ink-muted); font-size: var(--wwt-text-caption);` — so an
  unused slot renders exactly as before, with no empty wrapper in the DOM.
- **A change doesn't have to be a new layout to need a skill update.**
  Anything in `styles/*.css` (e.g. the global element defaults — `h1`,
  `table`, etc.), `setup/*.ts` (mermaid, shiki), or a shared component can
  change what an author should know or do differently. When it does,
  update `plugin/skills/wwt-slidev-authoring/SKILL.md` too, not just this
  repo's own README — the skill is what actually reaches an author's AI
  agent at authoring time, so a README-only fix is invisible to it.
- **This repo doesn't author deck content.** `starter/slides.md` is a fixed
  reference deck, not a scratchpad. WWT tone, the sign-off convention
  ("Make a new world happen"), and frontmatter contracts for talks live in
  `plugin/skills/wwt-slidev-authoring/SKILL.md`, not here.

## Keeping the READMEs' tables of contents in sync

Both [`README.md`](./README.md) and [`plugin/README.md`](./plugin/README.md)
open with a "Table of contents" section that hand-links every `##`/`###`
heading in that file. **Whenever a change adds, removes, renames, or
re-levels a heading in either README, update that file's table of contents
in the same change** — don't leave it to drift out of date.

Anchor links follow GitHub's heading-slug rule: lowercase the heading text,
drop characters that aren't letters, digits, spaces, or hyphens (backticks,
apostrophes, `~`, `<`/`>` disappear with nothing inserted in their place),
then turn each remaining space into a `-`. Two things that trip this up:

- An em dash surrounded by spaces (e.g. "Option A — author by hand") leaves
  a double space once the dash itself is stripped, which becomes a
  **double** hyphen: `option-a--author-by-hand`. Don't collapse it to one.
- An apostrophe is removed with nothing replacing it, not turned into a
  hyphen: "Overriding a layout's internals" → `overriding-a-layouts-internals`.

When a new heading's punctuation makes the slug non-obvious, compare it
against a similar heading already in one of the two files —
`#speaker-and-thank-you-frontmatter`, `#theme-public-assets-resolve-to-broken-paths`,
`#v-clicks-native-layouts-render-empty-on-load` (root README), and
`#whats-included`, `#why-a-plugin-instead-of-an-mcp-server` (plugin README)
are all working anchors you can pattern-match against.
