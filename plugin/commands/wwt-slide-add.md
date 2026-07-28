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

6. **Insert at the right position.**
   - **If Slidev's MCP server is attached** (any `mcp__slidev__*` tool
     available — e.g., an add-slide or insert-slide tool), use it. The MCP
     handles parser edge cases (frontmatter delimiters, `v-clicks` scoping)
     that a naive text edit can corrupt.
   - Otherwise, use `Edit` on `slides.md` and insert the new slide with a
     blank line before its opening `---` so Slidev parses it as a new
     slide, not appended content of the previous one.

7. **Verify.** Whether you used the MCP or file I/O, read back the
   surrounding slides. Confirm:
   - The new slide's frontmatter is valid YAML
   - The document-level frontmatter is unchanged
   - No accidental double `---` or missing separators

8. **Report** what layout you picked, why, and where you inserted it. Note
   whether you used the Slidev MCP or file I/O. If a dev server is
   running, HMR will pick up the change automatically.

Do NOT modify other slides while adding this one.
