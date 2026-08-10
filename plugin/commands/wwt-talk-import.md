---
description: Compose a new WWT slides.md from a Markdown content file (article, outline, brainstorm)
---

# /wwt-talk-import

You are composing a new WWT `slides.md` from an existing Markdown content
file — an article, outline, brainstorm dump, previous Claude output, or
similar. Sketch the outline first, get approval, then draft slides.

## Steps

1. **Get the input.** Ask the user for:
   - Path to the content file (or the content pasted directly into chat)
   - Talk metadata: title, subtitle, presenter, presenter role, target
     duration in minutes
   - Output path (default: `./slides.md`)
   - Whether the target directory already has a `package.json` depending
     on `slidev-theme-wwt`. If not, offer to scaffold one (mirror
     `/wwt-talk-new` step 2's package.json — pull it from that command
     rather than duplicating).

2. **Read and analyze the content.** Look for structure that maps to
   slides — the source's own shape usually points at the right layouts:

   | Signal in the source                              | Likely layout    |
   | ------------------------------------------------- | ---------------- |
   | H1 / top-level title                              | `cover`          |
   | Speaker bio / "about me" section                  | `speaker`        |
   | Numbered list at the top ("what we'll cover")     | `agenda`         |
   | H1 / H2 that opens a major section                | `section`        |
   | Prose paragraph with 1 clear takeaway             | `default`        |
   | Two parallel comparisons ("before/after", A vs B) | `comparison`     |
   | 2–4 metrics (numbers with units)                  | `stats`          |
   | Blockquote with attribution                       | `customer-quote` |
   | Blockquote without attribution                    | `quote`          |
   | Code fence (≥ 4 lines)                            | `code-focus`     |
   | Chronological milestones ("Q1 …", "Week 0 …")     | `timeline`       |
   | Numbered steps or a methodology                   | `process`        |
   | Screenshot / image callout                        | `image-feature`  |
   | Full-bleed hero visual                            | `image-full`     |
   | Team introductions                                | `team`           |
   | Explicit closing / call to action                 | `end`            |
   | Closing with contact info / socials / slides link | `thank-you`      |

3. **Draft the outline in chat first.** Present a bullet outline before
   writing any files:

   ```
   1. cover     — <title>
   2. agenda    — 4 items pulled from source H2s
   3. section 01 — <first section name>
   4. default   — <one-line takeaway>
   5. stats     — three metrics from paragraph 3
   6. section 02 — <second section name>
   7. process   — the 4-step methodology at the bottom of the source
   8. quote     — closing analyst quote
   9. end       — closing slide
   ```

   Include: which source paragraphs became which slides, and any content
   you couldn't place (call these out as "candidates for speaker notes").

4. **Get explicit approval** on the outline. Ask what to change before
   writing files — outline changes are cheap, per-slide rewrites are not.

5. **Draft `slides.md`.** After approval:
   - Document-level frontmatter: `theme: wwt`, `title`, `info`, and
     `presenterName` if provided
   - One slide per idea; target ~1 slide per 60–90 seconds of talk time
   - Follow the skill's tone pillars (purposeful, bold, simple,
     refreshing with a touch of humor)
   - Preserve verbatim content the user gave you (specific numbers,
     quotes, code, brand names) — paraphrase only the connective tissue
   - Prefer specific layouts over `default` when the content matches the
     signals above

6. **Prefer Slidev's MCP tools** for constructing the file if attached;
   otherwise `Write` the whole `slides.md` at once.

7. **Add a `.prettierignore`** in the output directory listing `slides.md`
   if the target project uses Prettier. Skip if it already has one, or if
   there's no `.prettierrc*` in the project (no Prettier = no risk).

8. **Report the mapping.** Tell the user:
   - Path to the produced `slides.md`
   - Layouts used, with counts
   - Which source chunks became which slides
   - Content that didn't fit any layout — flag it as candidate speaker
     notes or a handout appendix
   - How to preview: run `/wwt-talk-preview` from the deck directory

## Not your job

- Don't invent facts to pad a thin section. If the source is light on
  content, flag the gap and let the user decide whether to research more
  or drop that section.
- Don't force every source paragraph into a slide. Narrative bridges
  belong in speaker notes.
- Don't add a sign-off tagline the user didn't ask for. The `end` layout
  ships one by default; that's enough.
