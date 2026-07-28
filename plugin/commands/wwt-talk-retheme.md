---
description: Convert an existing slides.md to the WWT theme, mapping layouts and updating frontmatter
---

# /wwt-talk-retheme

You are converting an existing Slidev deck to use `slidev-theme-wwt`.
This is a two-pass job: **mechanical** (theme + layout swap) first,
**opinionated** (tone + structure suggestions) second, with the user
approving the plan before either pass writes to disk.

## Steps

1. **Locate the deck.** Default to `./slides.md`. If not there, ask where.

2. **Read the current deck.**
   - If Slidev's MCP is attached, use its list/get tools to enumerate
     slides with their layout + frontmatter.
   - Otherwise `Read` the full file.

   Note the current `theme:` (or absence), every layout in use, deck
   length, section structure, and code/media presence.

3. **Diff the layouts.** Build a mapping from every current layout to a
   WWT equivalent. Use this table as your starting point:

   | Current layout       | Map to          | Notes                                                         |
   | -------------------- | --------------- | ------------------------------------------------------------- |
   | `cover`              | `cover`         | Keep                                                          |
   | `intro`              | `cover`         | WWT has no `intro`; `cover` is the analogue                   |
   | `default`            | `default`       | Keep                                                          |
   | `section`            | `section`       | Add `number` (string) if missing                              |
   | `two-cols`           | `two-cols`      | Keep; verify `::left::` / `::right::` slots present           |
   | `two-cols-header`    | `two-cols`      | Move header into a preceding `default` slide or into left col |
   | `quote`              | `quote`         | Keep; add `attribution` if missing                            |
   | `center`             | `default`       | WWT doesn't offer center-only; use `default`                  |
   | `statement`          | `quote` (dark)  | Or `section` if the statement is a real break                 |
   | `fact`               | `stats`         | Single big number → `stats`; qualitative punchline → `quote`  |
   | `image-right`        | `image-feature` | Set `side: right`                                             |
   | `image-left`         | `image-feature` | Set `side: left`                                              |
   | `image`, `full`      | `image-full`    | Move any headline into `headline:` frontmatter                |
   | `end`                | `end`           | Keep; `signoff:` overrides the default tagline                |
   | `iframe`, `iframe-*` | `demo`          | Set `src:` and `iframe: true`                                 |
   | anything else        | (ask user)      | Propose the closest WWT layout and confirm before applying    |

4. **Preview the change plan.** Present to the user, in chat, before
   editing anything:
   - Slides changing layout (before → after)
   - Slides needing new frontmatter keys (e.g., `number: "01"` for section)
   - Slides where content may need trimming or splitting to fit the new
     layout (e.g., a 12-bullet `default` slide that should become `agenda`
     or split across two slides)
   - Anything unclear that you're punting to the user

5. **Get explicit approval** before applying changes.

6. **Apply the mechanical pass.**
   - Prefer Slidev's MCP tools if attached (they preserve parser edges).
   - Otherwise `Edit` the file:
     - Change document-level `theme:` to `wwt`
     - Update each slide's `layout:` per the approved mapping
     - Add required frontmatter keys with sensible defaults; when unclear,
       leave a `# TODO: fill in` YAML comment above the key

7. **Verify the mechanical pass.**
   - Every `layout:` value now maps to a WWT layout name
   - Document-level `theme: wwt` is set
   - No orphaned frontmatter keys from the old theme (e.g., stale
     `background:` on covers if the WWT `cover` layout handles that)

8. **Run the opinionated pass.** Now invoke `/wwt-slide-review`'s checks
   inline: tone (four pillars), layout fit, structure (agenda/sections/end),
   accessibility (`imageAlt`, WCAG on custom colors), density (1 slide per
   60–90 seconds of talk time). Report findings grouped by severity but
   **do not apply them** without a second round of user approval — tone
   changes are personal and layout-fit calls are debatable.

## Not your job

- Don't rewrite slide content during the mechanical pass. Content edits
  belong to the opinionated pass, gated by user approval.
- Don't delete slides even if they look redundant. Ask first.
- Don't add a sign-off, agenda, or section breaks the source deck didn't
  have — those are suggestions for the opinionated pass, not mechanical
  changes.
