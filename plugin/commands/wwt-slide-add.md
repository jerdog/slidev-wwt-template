---
description: Add a new slide to the current WWT deck using the right layout
---

# /wwt-slide-add

You are helping the user append a slide to an existing WWT Slidev deck.

## Steps

1. **Locate `slides.md`.** Look in the current working directory. If it's
   not there, ask the user where the deck lives.

2. **Verify it's a WWT deck.** The document-level frontmatter should
   declare `theme: wwt`. If it doesn't, ask before proceeding — the slide
   you author may not render correctly under a different theme.

3. **Understand the ask.** Ask the user (in one message):
   - What's the slide's takeaway in one sentence?
   - Where in the deck should it go? (End / after a specific slide title /
     before a specific slide title)
   - Any content they want to include (bullets, code, numbers, quote, etc.)

4. **Pick a layout.** Use the `wwt-slidev-authoring` skill's layout table.
   Common mappings:
   - Three metrics that anchor a point → `stats`
   - Reordering a customer's process → `process` or `timeline`
   - "Old way vs new way" → `comparison`
   - A quote from a customer → `customer-quote` (with attribution) or
     `quote` (without a photo)
   - Screenshot walkthrough → `demo`
   - New section beginning → `section`

5. **Draft the slide.** Write proper YAML frontmatter with correct
   indentation. Follow WWT tone: purposeful, bold, simple, refreshing.
   Keep to one idea per slide.

6. **Insert at the right position.** Use Edit to add the slide with a
   blank line before `---` for correct Slidev parsing.

7. **Verify.** Read back the surrounding slides. Confirm:
   - The new slide's frontmatter is valid YAML
   - The document-level frontmatter is unchanged
   - No accidental double `---` or missing separators

8. **Report** what layout you picked, why, and where you inserted it.
   Suggest the user reload their `pnpm dev` server if it's running.

Do NOT modify other slides while adding this one.
