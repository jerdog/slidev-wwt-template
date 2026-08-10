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

Claude Code installs plugins via marketplaces. This repo publishes a
marketplace at its root (`.claude-plugin/marketplace.json`) that hosts
just this plugin.

From an interactive Claude Code session:

```
/plugin marketplace add jerdog/slidev-wwt-template
/plugin install wwt-slidev@slidev-wwt
/reload-plugins
```

The first command adds the marketplace; the second installs the plugin
from it; the third activates it in the current session. Claude Code will
prompt you to pick an install scope (user / project / session) — choose
whichever fits.

If you've cloned the repo locally, point at the checkout instead:

```
/plugin marketplace add /path/to/slidev-wwt-template
/plugin install wwt-slidev@slidev-wwt
/reload-plugins
```

Refresh after the marketplace repo updates:

```
/plugin marketplace update slidev-wwt
```

## What's included

### Skill

`wwt-slidev-authoring` — activates when you're working on a Slidev deck
using `theme: wwt`, or when you ask Claude to draft a WWT presentation.
Teaches:

- All 19 layouts and their frontmatter contracts
- WWT tone of voice (purposeful, bold, simple, refreshing with a touch of humor)
- Recommended narrative arcs for talks (cover → agenda → sections → recap → end)
- Dark mode and animation patterns
- Slidev's built-in MCP server: when it's attached, prefer its tools
- YAML frontmatter formatting gotchas

### Slash commands

| Command             | What it does                                                     |
| ------------------- | ---------------------------------------------------------------- |
| `/wwt-talk-new`     | Scaffold a new WWT deck from scratch (topic, audience, duration) |
| `/wwt-talk-retheme` | Convert an existing `slides.md` to the WWT theme + layouts       |
| `/wwt-talk-import`  | Compose a WWT `slides.md` from a Markdown content file           |
| `/wwt-slide-add`    | Add a slide to the current deck with the right layout            |
| `/wwt-slide-review` | Audit the current deck for tone, layout choice, accessibility    |
| `/wwt-talk-preview` | Launch `pnpm dev`, attach Slidev's MCP server                    |

## Typical flows

**Start from scratch.**
`/wwt-talk-new` in a fresh directory → iterate via `/wwt-slide-add` →
`/wwt-slide-review` before rehearsing → `/wwt-talk-preview` when ready.

**Retheme an existing deck.**
`/wwt-talk-retheme` on a `slides.md` from another theme → the mechanical
theme + layout swap happens with your approval, followed by an
opinionated pass suggesting tone and structure changes → `/wwt-slide-add`
or manual edits to close gaps → `/wwt-talk-preview`.

**Compose from a content file.**
`/wwt-talk-import` with an article, outline, or brainstorm dump → outline
proposed and approved in chat before any file is written → `/wwt-slide-add`
to fill gaps → `/wwt-talk-preview`.

`/wwt-talk-preview` also attaches Slidev's built-in MCP server so Claude
gets structured slide tools for the rest of the session (see below).

## Integration with Slidev's MCP server

Slidev ships its own MCP server that gives AI agents structured tools for
slide inspection, editing, reordering, and navigation — see
[the Slidev docs](https://sli.dev/guide/work-with-ai). This plugin's skill
and slash commands are aware of it: when the MCP is attached, Claude
prefers its structured tools over raw file edits; when it isn't, Claude
falls back to `slides.md` I/O.

Two ways to attach:

**HTTP mode** (when the dev server is running) — `/wwt-talk-preview` does
this for you after starting the dev server:

```bash
claude mcp add --transport http slidev http://localhost:3030/__mcp
```

**stdio mode** (no dev server needed) — run from a deck directory:

```bash
slidev mcp slides.md
```

Register with Claude Code the same way as any other stdio MCP.

The plugin does NOT declare Slidev's MCP in its own `plugin.json` — the
stdio server needs a `slides.md` path that only makes sense per-deck, and
auto-registering would fail in every non-Slidev workspace.

## Why a plugin instead of an MCP server?

The plugin ships instructions, not tools. Claude Code already has the file
I/O and shell tools it needs to author decks; what it was missing is
_context_ — the 19 layouts, the tone, the sign-off. A skill delivers that
context on demand. If a future integration needs a real capability Claude
can't otherwise reach (e.g., publishing to an internal WWT presentation
hub), we can add an MCP server here alongside the skill.

## License

MIT
