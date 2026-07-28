# wwt-slidev Claude Code plugin

A Claude Code plugin for authoring WWT-branded [Slidev](https://sli.dev/)
presentations. Teaches Claude the layout catalog, WWT tone, and
conference-talk workflow so you can draft, edit, and audit decks
conversationally.

Works alongside the [`slidev-theme-wwt`](../) theme in this repo.

> This is a personal open-source project by [@jerdog](https://github.com/jerdog).
> It is not an official World Wide Technology product and is not affiliated
> with or endorsed by WWT.

## Install

From a Claude Code session (interactive terminal):

```
/plugin install github:jerdog/slidev-wwt-template#feat/initial-implementation --path plugin
```

Or, if you've cloned this repo locally:

```
/plugin install ./plugin
```

(Exact syntax depends on your Claude Code version. See the Claude Code
plugin docs for local vs remote install.)

## What's included

### Skill

`wwt-slidev-authoring` — activates when you're working on a Slidev deck
using `theme: wwt`, or when you ask Claude to draft a WWT presentation.
Teaches:

- All 17 layouts and their frontmatter contracts
- WWT tone of voice (purposeful, bold, simple, refreshing)
- The "Make a new world happen" sign-off convention
- Dark mode and animation patterns
- YAML frontmatter formatting gotchas

### Slash commands

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `/wwt-talk-new`     | Scaffold a new WWT deck for a conference talk                 |
| `/wwt-slide-add`    | Add a slide to the current deck with the right layout         |
| `/wwt-slide-review` | Audit the current deck for tone, layout choice, accessibility |
| `/wwt-talk-preview` | Launch `pnpm dev` and report the preview URL                  |

## Typical flow

1. `/wwt-talk-new` in a fresh directory — answer questions about topic,
   audience, duration. Claude scaffolds a `package.json`, `slides.md`,
   installs the theme from GitHub, and drafts the outline.
2. Iterate slides in the editor or via `/wwt-slide-add`.
3. `/wwt-slide-review` before rehearsing — catches tone drift, missing
   sign-off, WCAG issues.
4. `/wwt-talk-preview` when ready — open the URL in your browser.

## Why a plugin instead of an MCP server?

The plugin ships instructions, not tools. Claude Code already has the file
I/O and shell tools it needs to author decks; what it was missing is
_context_ — the 17 layouts, the tone, the sign-off. A skill delivers that
context on demand. If a future integration needs a real capability Claude
can't otherwise reach (e.g., publishing to an internal WWT presentation
hub), we can add an MCP server here alongside the skill.

## License

MIT
