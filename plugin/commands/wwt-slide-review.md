---
description: Audit the current WWT deck for brand tone, layout choice, and accessibility
---

# /wwt-slide-review

You are reviewing an existing WWT deck for brand compliance and quality.

## Steps

1. **Locate `slides.md`** in the cwd (or ask the user).

2. **Read the full deck.**
   - **If Slidev's MCP server is attached**, prefer its structured
     read tools (e.g., a list-slides / get-slide tool) — you get slide
     metadata (layout, index, frontmatter keys) already parsed instead of
     re-parsing YAML yourself.
   - Otherwise, `Read` the full `slides.md`.

3. **Run the checks below.** Report findings grouped by severity. Cite
   file:line for every finding. When you have MCP slide indices, cite
   `slide #N` alongside the file line for easier navigation.

### Brand tone (per the WWT tone pillars)

- **Purposeful:** Does every slide have a clear takeaway? Flag slides that
  are decorative or ambiguous.
- **Bold and confident:** Flag hedging language ("might", "may", "possibly",
  "sort of"), passive voice on load-bearing sentences, apologetic tone.
- **Beautifully simple:** Flag sentences over ~20 words. Flag jargon that a
  general technical audience wouldn't know without context. Flag ALL-CAPS
  text (should never appear in body or headlines).
- **Refreshing:** Flag corporate boilerplate ("solutions", "leverage",
  "synergy"), stale metaphors, buzzwords used without content behind them.
  Reward writing that lands with warmth or a bit of tongue-in-cheek humor;
  flag stretches that read as flat or overly earnest.

### Company name

- First use of the company should be "World Wide Technology"; "WWT"
  thereafter. Flag if reversed or inconsistent.

### Layout choice

- Flag slides where the chosen layout doesn't fit the content:
  - Three metrics rendered as bullets → suggest `stats`
  - A quote rendered as a `default` paragraph → suggest `quote` or
    `customer-quote`
  - Multiple sections with no `section` breaks between them
  - `default` slides longer than ~5 bullets — split them or use `two-cols`

### Structure

- Deck should open with a `cover` slide, optionally followed by `speaker`.
- Sections should be numbered consistently (e.g. `"01"`, `"02"`).
- `agenda`, `speaker`, `end`, and `thank-you` should each appear at most
  once. Flag a deck that uses both `end` and `thank-you` — pick one
  closing layout.

### Accessibility & rendering

- Flag any `image-full` or `image-feature` slide without `imageAlt:`.
- Flag any slide where nested YAML looks flattened by Prettier
  (e.g. `left:\ntitle:` on separate lines without indentation, or `points:`
  as an inline flow string). Recommend adding `slides.md` to
  `.prettierignore` if not already.
- Verify slide count vs likely duration: ~1 slide per 60–90 seconds. Flag
  if the deck is likely too dense or too sparse for typical WWT talks.

## Output format

```
## Critical
- <file:line>: <one-line finding> — <suggested fix>

## Important
- ...

## Nitpicks
- ...

## Overall
- Word count: <n>
- Slide count: <n> (approx <m> minutes at 75s/slide)
- Layouts used: [cover, agenda, section×2, default×3, stats, ...]
```

Do NOT edit the deck unless the user asks. This is a read-only audit.
