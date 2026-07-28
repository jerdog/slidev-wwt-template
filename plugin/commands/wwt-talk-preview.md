---
description: Preview the current WWT deck in a browser and attach Slidev's MCP server
---

# /wwt-talk-preview

You are launching the Slidev dev server for the current WWT deck AND
registering Slidev's built-in MCP server with Claude Code so you get
structured slide-manipulation tools for the rest of the session.

## Steps

1. Verify you're in a directory containing a WWT Slidev deck (there should
   be a `slides.md` and a `package.json` depending on `slidev-theme-wwt`).
   If not, ask the user where the deck lives and `cd` there.

2. If `node_modules/` is missing or clearly stale (e.g. older than
   `package.json`), run:

   ```bash
   pnpm install
   ```

3. Launch the dev server in the background, tee'ing output so you can
   parse the port:

   ```bash
   pnpm dev 2>&1 | tee .slidev/dev.log &
   ```

   (Create `.slidev/` first if it doesn't exist. If the deck's `pnpm dev`
   script forwards to `slidev`, this works; otherwise use `pnpm exec slidev`
   directly.)

4. Wait up to ~10 seconds for the server to bind, then grep the log for
   the actual port Slidev picked (default 3030, next free port if taken):

   ```bash
   until PORT=$(grep -oE "localhost:[0-9]+" .slidev/dev.log | head -1 | cut -d: -f2); do
     [ -n "$PORT" ] && break
     sleep 1
   done
   ```

5. **Ask the user before mutating Claude Code config.** Say something like:

   > Dev server is up at http://localhost:$PORT. Attach Slidev's MCP server
   > so I get structured tools for slide edits, navigation, and reordering?
   > This runs `claude mcp add` and updates your Claude Code config.

6. If they agree, register the MCP:

   ```bash
   claude mcp add --transport http slidev "http://localhost:$PORT/__mcp"
   ```

   Note that the newly-registered tools may only appear after Claude Code
   picks up the config change — usually immediate, but a session restart
   is sometimes needed. If tools don't show up after ~10 seconds, tell the
   user to restart their Claude Code session.

7. Report to the user:
   - Preview URL: `http://localhost:$PORT`
   - Presenter mode: `http://localhost:$PORT/presenter/`
   - Overview: `http://localhost:$PORT/overview/`
   - Keybindings: `space` (next), `left/right` (nav), `d` (dark toggle),
     `o` (overview), `f` (fullscreen)
   - How to stop: Ctrl-C in the terminal, or ask you to stop it
   - Whether the MCP was attached (and what to do if tools don't appear)

8. Leave the server running.

## If the server fails to start

Capture the stderr from `.slidev/dev.log` and diagnose:

- Missing dependency → `pnpm install`
- Corrupt `.slidev/` cache → `rm -rf .slidev` and retry
- Wrong theme resolution → check `slides.md`'s `theme:` matches
  `package.json` dependency name (`slidev-theme-wwt`)
- Port conflict Slidev couldn't resolve → set a port explicitly:
  `pnpm exec slidev --port 3040`

## If the MCP registration fails

The dev server is still usable — the deck previews fine without MCP tools.
Fall back gracefully: tell the user the MCP wasn't attached (with the
`claude mcp` error), and continue using file I/O for slide edits.

Do NOT open the browser automatically — just report the URL.
