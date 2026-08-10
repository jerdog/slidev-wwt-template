---
name: wwt-slidev-authoring
description: Use when authoring or editing a WWT-branded Slidev presentation — any project whose slides.md declares `theme: wwt`, or where the user asks to draft a WWT conference talk, technical presentation, or customer deck. Covers the 17 layouts, frontmatter contracts, WWT tone of voice, and the "Make a new world happen" sign-off convention.
---

# Authoring WWT Slidev presentations

The user is working in (or about to bootstrap) a Slidev deck that uses the
`slidev-theme-wwt` theme. Your job is to draft on-brand Markdown slides that
render correctly, follow WWT tone, and use the right layout for each idea.

## The layout catalog

Every slide sets `layout: <name>` in its frontmatter. Pick the layout by
what the slide is trying to do, not by decoration.

The **Body slot?** column matters: layouts marked **No** render only from
frontmatter — any markdown/HTML you put in the slide body is **silently
dropped** (no error, no warning). Only layouts marked **Yes** accept body
content.

| Layout           | Body slot? | Use for                                             | Key frontmatter                                                                     |
| ---------------- | ---------- | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `cover`          | No         | Deck title slide (dark)                             | `title`, `subtitle?`, `presenterName?`, `presenterRole?`, `date?`                   |
| `section`        | No         | Section break with big numeral (dark)               | `number` (string, e.g. `"01"`), `title`                                             |
| `default`        | **Yes**    | General content slide (light)                       | `title?` — the slide's H1 is the markdown `# Heading`                               |
| `agenda`         | No         | Numbered table of contents                          | `items: string[]`                                                                   |
| `two-cols`       | **Yes**    | Two-column content                                  | Uses Slidev `::left::` and `::right::` slots                                        |
| `quote`          | **Yes**    | Pull quote (light by default, dark if `dark: true`) | `attribution`, `role?`, `dark?`                                                     |
| `image-feature`  | **Yes**    | Headline beside an edge-bleed image                 | `title?`, `image`, `imageAlt?`, `side: "left" \| "right"`                           |
| `image-full`     | No         | Full-bleed image with overlay headline              | `image`, `imageAlt?`, `headline?`                                                   |
| `stats`          | No         | 1–4 big-number stats (auto-fits grid)               | `title?`, `stats: { value: string, label: string, caption?: string }[]`             |
| `team`           | No         | Team grid with photos                               | `title?`, `members: { name, role, photo? }[]`                                       |
| `comparison`     | No         | Side-by-side cards                                  | `title?`, `left: { title, points: string[] }`, `right: { title, points: string[] }` |
| `timeline`       | No         | Horizontal milestone strip                          | `title?`, `events: { date, label, detail? }[]`                                      |
| `process`        | No         | Numbered process steps (see capacity note below)    | `title?`, `steps: { title, detail? }[]`                                             |
| `code-focus`     | **Yes**    | Dark code-centric slide                             | `title?` — put a fenced code block in the slide body                                |
| `customer-quote` | No         | Photo + large pull quote                            | `quote`, `name`, `role`, `photo?`, `logo?`                                          |
| `demo`           | No         | Framed screenshot or iframe                         | `title?`, `src`, `caption?`, `iframe?` (bool)                                       |
| `end`            | No         | Closing slide — "Make a new world happen" (dark)    | `signoff?` (overrides default tagline)                                              |

### Layout capacity notes

- **`process` overflows past ~5 items.** Its grid uses `grid-auto-flow:
column` with no wrapping — the 6th and 7th steps render off the right
  edge of the slide, even with short text. For 6+ steps, use `default`
  with your own CSS grid instead. Same watch-out likely applies to
  `agenda`, `stats`, and `team` at higher counts; verify visually.
- **No source-line field.** Layouts like `comparison`, `process`,
  `timeline`, and `agenda` have no dedicated field for citing a source.
  Fold citations into an existing string — usually `title` (e.g.
  `title: "The experience gap — Sonar 2026"`) or a `caption` if the
  layout has one. `stats` has per-item `caption?` for this.
- **`badge: false` isn't layout-specific.** If the deck has a
  `CornerBadge` wired up via its own `global-top.vue` (see
  `/wwt-talk-new`'s optional corner-motif step), this flag suppresses it
  on that one slide, regardless of which layout the slide uses — it's not
  another column in the table above, it's read by the badge component
  itself.

## Frontmatter format rules

The frontmatter is **YAML with proper indentation**. Prettier will silently
break nested keys — this repo's `.prettierignore` excludes `starter/slides.md`
for that reason. When editing another consumer's `slides.md`, verify Prettier
either ignores it too or is not run.

Structural gotchas:

- Numbers with leading zeros (`01`, `02`) must be **strings**: `number: "01"`
- Nested keys need 2-space indentation (`left:\n  title:`, not `left:\ntitle:`)
- List items under a key need 2-space indentation:
  ```yaml
  stats:
    - value: "17"
      label: layouts
  ```

## Recommended narrative

For a WWT conference talk or customer deck, use this shape as a starting
point (adjust to the topic):

1. `cover` — deck title, presenter
2. `agenda` — 3-5 items, one per section
3. `section` — "01 · Section title" (dark break)
4. Content slides — `default`, `stats`, `quote`, `two-cols`
5. `section` — "02 · Section title"
6. Content slides — `code-focus`, `demo`, `comparison`, `timeline`, `process`
7. `customer-quote` or `image-feature` — anchoring narrative
8. `default` — recap
9. `end` — closing slide

For a 25-minute talk, aim for ~15–20 slides. Density belongs in speaker
notes, not on the slide.

## WWT tone of voice

Every deck must sound like WWT. Four pillars:

1. **Purposeful** — every slide has a clear takeaway. Benefit-led language.
   Focus on the audience's perspective.
2. **Bold and confident** — speak with authority. Positive, productive.
   Avoid hedging ("might", "possibly", "sort of").
3. **Beautifully simple** — short crisp sentences. Active voice. Everyday
   words. Cut jargon. One idea per sentence.
4. **Refreshing** — human, not corporate. Optimistic. Personal and genuine.
   With a touch of tongue-in-cheek humor.

Conventions:

- Company name is "World Wide Technology" on first use; "WWT" thereafter.
- Never use ALL CAPS for body text or headlines.

## Dark mode + animation

The theme supports dark mode via `D` keyboard toggle, a footer button, or
`colorSchema: dark` in the deck's document-level frontmatter. Content
slides swap cleanly; `cover`, `section`, `end`, `code-focus`, `image-full`
stay dark in both modes by design.

Five layouts already reveal children on click via `v-auto-animate` +
`<v-clicks>`: `agenda`, `timeline`, `stats`, `team`, `process`. No
authoring changes needed — each list item appears with a tween as the
presenter clicks.

For emphasis animation on any element, use Slidev's built-in `<v-motion>`:

```vue
<v-motion :initial="{ y: 24, opacity: 0 }" :enter="{ y: 0, opacity: 1 }">
  Element that slides up on entrance
</v-motion>
```

For progressive reveals on lists that aren't already animated, wrap children
in `<v-clicks>`:

```markdown
<v-clicks>

- First point appears on click 1
- Second point on click 2
- Third on click 3

</v-clicks>
```

## Slidev's built-in MCP server

Slidev ships an MCP server that exposes structured tools for slide
inspection, editing, reordering, and navigation
(<https://sli.dev/guide/work-with-ai>). Two ways to attach it:

- **HTTP mode** (dev server is running): register with
  `claude mcp add --transport http slidev http://localhost:<port>/__mcp`.
  The `/wwt-talk-preview` command does this automatically after starting
  the dev server.
- **stdio mode** (no dev server needed): `slidev mcp slides.md` from the
  deck directory registers a stdio MCP that operates directly on files.

**When the MCP is registered, prefer its tools over raw file I/O** for
anything the tools cover — reading slide metadata, adding/reordering/
removing slides, jumping the presenter to a specific slide. The MCP knows
Slidev's parser rules (frontmatter delimiters, `<v-clicks>` scoping, etc.)
and won't corrupt the file the way a naive text edit can.

Fall back to `Read` / `Edit` on `slides.md` when:

- No `mcp__slidev__*` tools appear in your available tool list
- The tool for what you need doesn't exist yet (the MCP evolves; check the
  actual tool list before assuming)
- You're doing something the MCP wasn't built for (e.g., editing the
  theme's own layout files, not a consumer deck's slides)

## Workflow

Consumers install the theme from GitHub:

```bash
pnpm add -D github:jerdog/slidev-wwt-template
```

Then `slides.md` starts with:

```markdown
---
theme: wwt
title: Your deck title
info: One-line description.
---
```

Preview with `pnpm slidev` (or `pnpm dev` if the deck's `package.json` has
that script). Build a PDF with `slidev export`.

## Common authoring workflows

Three patterns cover most WWT deck work. Match your approach to how the
user is starting:

1. **From scratch** — no draft, just intent. Ask about topic, audience,
   duration; sketch a section outline; then draft slides. Slash command:
   `/wwt-talk-new`.
2. **Retheme an existing deck** — the user has a `slides.md` from a
   different theme (or no theme). Do a mechanical layout mapping first
   (theme swap + `layout:` updates + required frontmatter), get approval,
   apply it, then run a separate opinionated pass for tone and structure.
   Slash command: `/wwt-talk-retheme`.
3. **Compose from content** — the user has a Markdown article, outline,
   brainstorm dump, or previous Claude output. Analyze source structure
   (headers, lists, quotes, code, tables) to pick layouts; sketch the
   outline in chat; approve; then write `slides.md`. Slash command:
   `/wwt-talk-import`.

For 2 and 3, always show your plan (the layout mapping or the outline)
before writing files. Both involve opinionated choices — the user should
have a chance to redirect before you commit to disk.

For 1, ditto — brainstorm the section outline before writing full slides.

## Known issues (as of theme 0.2.0)

These are current bugs in `slidev-theme-wwt`. If you see them, apply the
workaround and consider filing/updating an issue against the repo.

### Theme public assets resolve to broken paths

**Symptom:** logos, monograms, and gradient backgrounds render as broken
images in `pnpm dev` and `pnpm build`, with zero console error and zero
build warning.

**Cause:** the theme's components reference root-absolute paths
(`/wwt-logo.png`, `/wwt-monogram.png`, `/wwt-gradient-rule.png`,
`/bg-cover-gradient.png`, `/bg-section-gradient.jpeg`, and the
`--wwt-monogram-url` token). Slidev's `vite-plugin-static-copy` integration
nests theme public assets under `dist/theme/node_modules/.pnpm/…/public/*`
— never at the root path the components request.

**Workaround:** copy the theme's public assets into the consumer deck's
own `public/` directory at the same root filenames:

```bash
cp node_modules/slidev-theme-wwt/public/* public/
```

**Verify:**

```bash
curl -sI http://localhost:3030/wwt-logo.png | head -1
# HTTP/1.1 200 OK  → served correctly
# HTTP/1.1 200 OK  with Content-Type: text/html  → Vite's SPA fallback
#                                                   served index.html instead
```

If you scaffold a new deck via `/wwt-talk-new` or `/wwt-talk-import`, add
this asset copy as a post-install step.

### `<v-clicks>`-native layouts render empty on load

**Symptom:** opening `agenda`, `timeline`, `stats`, `team`, or `process`
directly by URL (or on the very first load) shows an apparently-empty
slide — no bullets, no cards, nothing.

**Cause:** these layouts use `<v-clicks>` for reveals, and the initial
click index is 0 (no children visible yet).

**Workaround:** advance the click counter. Add `?clicks=999` to the URL
to reveal everything, or press `→` repeatedly. When reviewing content in
isolation (screenshot, MCP inspection), do this **before** concluding a
slide is broken.

### `:global(.dark)` silently fails to compile

**Symptom:** a dark-mode color override written as
`:global(.dark) .foo { color: ...; }` inside a component's `<style scoped>`
block — or inside a Slidev per-slide style block in a consumer's
`slides.md` — never applies. No build error, no console warning; the rule
simply never appears in the served stylesheet.

**Cause:** unconfirmed root cause, confirmed symptom — verified by
inspecting `document.styleSheets` directly, not just by screenshot. A
screenshot can look "close enough" at a glance and still be measurably
wrong; this bug has fooled that check before.

**Workaround:** don't scope the override to the component or slide at all.
Add it to the deck's project-root `global-top.vue` instead, in a plain
*unscoped* `<style>` block (no `scoped` attribute), as `.dark .foo { color:
...; }` — **with `!important`.** The `!important` is load-bearing, not
defensive: `.dark .foo` and the original rule's compiled
`.foo[data-v-hash]` selector are equal CSS specificity, so without it the
winner depends on stylesheet load order — verified to go the wrong way,
silently, more often than not.

## Custom styling

### Overriding a layout's internals from a slide `<style>` block

**Rule: use `:deep(...)`** for any selector that targets an element the
layout renders internally.

```vue
<style>
/* WRONG — compiles to `.wwt-quote__text[data-v-<slidehash>]`
   which never matches, and there's no error. */
.wwt-quote__text {
  font-size: 56px !important;
}

/* RIGHT */
:deep(.wwt-quote__text) {
  font-size: 56px !important;
}
</style>
```

Vue only stamps the slide's scoped-CSS hash onto the layout's **root
element**, not onto descendants. Plain selectors compile to a stamped
attribute selector that matches nothing. It fails silently — no console
error, no build warning, the override just doesn't apply.

### Building a custom component that fills a `default` slide

Use `flex: 1; min-height: 0` on the component's root — **not**
`height: 100%`:

```vue
<style scoped>
.my-diagram {
  flex: 1;
  min-height: 0;
}
</style>
```

`.wwt-default__content` is a column flexbox without its own
`min-height: 0`. A percentage-height child inherits that gap and can
render taller than the slide's fixed canvas, clipped silently by
`overflow: hidden`. The bottom of your diagram just disappears.

## Small gotchas

- **Angle brackets in HTML comments inside `<style>`/`<script>` blocks
  can break slide compilation.** A comment like `/* the outer <p> tag */`
  inside a `<style>` block will sometimes be misparsed as a stray tag and
  produce a confusing Vue compiler error. Avoid literal `<tag>`-shaped
  text inside such comments; write "the outer `p` tag" instead.
- **Use `presenterName:` on the cover slide, never `presenter:`.** Slidev
  reserves `presenter` as document-level headmatter (`boolean | 'dev' |
  'build'`) that toggles presenter mode and the `/presenter` route. Slide
  1's frontmatter is that global headmatter block, so a string value there
  silently overwrites Slidev's own config — no error, no warning, and the
  presenter toolbar button just stops working. The `cover` layout reads
  `presenterName` specifically to avoid this collision.

## When you author

- Ask the user for the talk's topic, audience, duration, and any content
  they've already written before drafting.
- Sketch the section outline (as a bullet list) and confirm before writing
  full slides — one bad section wastes far more time than one bad slide.
- Use the layout catalog above to pick appropriately for each idea. Don't
  force everything into `default`.
- When you write speaker notes (Slidev supports HTML comments as notes),
  keep them one paragraph max per slide.
- **A clean `pnpm build` does not mean the deck renders correctly.** All
  the known issues above (broken asset paths, non-matching scoped CSS,
  layout overflow, `<v-clicks>` empty-on-load) compile without error.
  After drafting slides with custom components or per-slide style
  overrides, visually verify in a running dev server — screenshot or
  browser-tool the actual rendered slide, don't rely on the build alone.

## When you edit

- Preserve existing frontmatter contracts — if a slide already uses
  `stats:`, don't switch it to `default` unless the user asks.
- Verify YAML indentation stays consistent across sibling slides.
- If Prettier is enabled in the deck's repo and `slides.md` is not in
  `.prettierignore`, warn the user before running `pnpm format`.
- After any change to a `<style>` block or custom-component sizing, re-
  verify visually — see the note above about clean builds not meaning
  correctness.
