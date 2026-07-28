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

| Layout           | Use for                                             | Key frontmatter                                                                     |
| ---------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `cover`          | Deck title slide (dark)                             | `title`, `subtitle?`, `presenter?`, `presenterRole?`, `date?`                       |
| `section`        | Section break with big numeral (dark)               | `number` (string, e.g. `"01"`), `title`                                             |
| `default`        | General content slide (light)                       | `title?` — the slide's H1 is the markdown `# Heading`                               |
| `agenda`         | Numbered table of contents                          | `items: string[]`                                                                   |
| `two-cols`       | Two-column content                                  | Uses Slidev `::left::` and `::right::` slots                                        |
| `quote`          | Pull quote (light by default, dark if `dark: true`) | `attribution`, `role?`, `dark?`                                                     |
| `image-feature`  | Headline beside an edge-bleed image                 | `title?`, `image`, `imageAlt?`, `side: "left" \| "right"`                           |
| `image-full`     | Full-bleed image with overlay headline              | `image`, `imageAlt?`, `headline?`                                                   |
| `stats`          | 1–4 big-number stats (auto-fits grid)               | `title?`, `stats: { value: string, label: string, caption?: string }[]`             |
| `team`           | Team grid with photos                               | `title?`, `members: { name, role, photo? }[]`                                       |
| `comparison`     | Side-by-side cards                                  | `title?`, `left: { title, points: string[] }`, `right: { title, points: string[] }` |
| `timeline`       | Horizontal milestone strip                          | `title?`, `events: { date, label, detail? }[]`                                      |
| `process`        | Numbered process steps                              | `title?`, `steps: { title, detail? }[]`                                             |
| `code-focus`     | Dark code-centric slide                             | `title?` — put a fenced code block in the slide body                                |
| `customer-quote` | Photo + large pull quote                            | `quote`, `name`, `role`, `photo?`, `logo?`                                          |
| `demo`           | Framed screenshot or iframe                         | `title?`, `src`, `caption?`, `iframe?` (bool)                                       |
| `end`            | Closing slide — "Make a new world happen" (dark)    | `signoff?` (overrides default tagline)                                              |

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

## When you author

- Ask the user for the talk's topic, audience, duration, and any content
  they've already written before drafting.
- Sketch the section outline (as a bullet list) and confirm before writing
  full slides — one bad section wastes far more time than one bad slide.
- Use the layout catalog above to pick appropriately for each idea. Don't
  force everything into `default`.
- When you write speaker notes (Slidev supports HTML comments as notes),
  keep them one paragraph max per slide.

## When you edit

- Preserve existing frontmatter contracts — if a slide already uses
  `stats:`, don't switch it to `default` unless the user asks.
- Verify YAML indentation stays consistent across sibling slides.
- If Prettier is enabled in the deck's repo and `slides.md` is not in
  `.prettierignore`, warn the user before running `pnpm format`.
