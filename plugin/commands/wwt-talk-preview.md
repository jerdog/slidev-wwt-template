---
description: Preview the current WWT deck in a browser
---

# /wwt-talk-preview

You are launching the Slidev dev server for the current WWT deck.

## Steps

1. Verify you're in a directory containing a WWT Slidev deck (there should
   be a `slides.md` and a `package.json` depending on `slidev-theme-wwt`).
   If not, ask the user where the deck lives and `cd` there.

2. If `node_modules/` is missing or clearly stale (e.g. older than
   `package.json`), run:

   ```bash
   pnpm install
   ```

3. Launch the dev server in the background:

   ```bash
   pnpm dev
   ```

   Slidev typically opens on `http://localhost:3030`. If port 3030 is
   taken, Slidev auto-picks the next free port and prints the URL.

4. Wait ~5 seconds for the server to bind, then report:
   - The URL the user can open
   - The keybindings that matter: `space` (next), `left/right` (nav),
     `d` (dark-mode toggle), `o` (overview), `f` (fullscreen)
   - How to stop: Ctrl-C in the terminal, or ask you to stop it

5. Leave the server running. If the user asks you to stop it later, kill
   the background process.

If the server fails to start, capture the error output and diagnose common
causes:

- Missing dependency → `pnpm install`
- Corrupt `.slidev/` cache → `rm -rf .slidev` and retry
- Wrong theme resolution → check `slides.md`'s `theme:` matches
  `package.json` dependency name (`slidev-theme-wwt`)

Do NOT open the browser automatically — some users have specific browsers
they prefer for presentation preview. Just report the URL.
