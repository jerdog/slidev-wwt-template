---
description: Bootstrap a new WWT-branded Slidev deck for a conference talk
---

# /wwt-talk-new

You are helping the user bootstrap a new WWT conference talk deck.

## Steps

1. **Gather intent.** Ask, in one message, for:
   - Talk title
   - Presenter name and role
   - Audience (technical / executive / mixed)
   - Duration in minutes
   - Topic / core message in one sentence
   - Target directory name (default: kebab-case of the title)
   - Optional: a recurring corner motif/badge image (a running visual joke,
     a client logo, a conference badge — anything that should appear in the
     same corner of every slide). Skip this if the user doesn't want one.

2. **Scaffold the deck.** Create the directory and populate it:

   ```bash
   mkdir -p <target-dir>/public
   cd <target-dir>
   ```

   Write `package.json`:

   ```json
   {
     "name": "<target-dir>",
     "version": "0.0.0",
     "private": true,
     "type": "module",
     "scripts": {
       "dev": "slidev",
       "build": "slidev build",
       "export": "slidev export"
     },
     "dependencies": {
       "slidev-theme-wwt": "github:jerdog/slidev-wwt-template"
     },
     "devDependencies": {
       "@slidev/cli": "^0.49.0",
       "vue": "^3.5.12"
     }
   }
   ```

   Write `.gitignore`:

   ```
   node_modules/
   .output/
   .slidev/
   dist/
   slides-export/
   ```

   Write `.prettierignore` (if the user uses Prettier):

   ```
   slides.md
   ```

   **If the user wants a corner motif/badge** (from step 1), write
   `global-top.vue` at the deck root — Slidev auto-discovers this file and
   renders it once, above every slide (see
   https://sli.dev/custom/global-layers). No import needed: Slidev
   auto-registers a theme's `components/*.vue` as global components (the
   same reason the theme's own `layouts/*.vue` use `<WwtLogo>` and
   `<GraphicDevice>` with no import statements anywhere in this repo):

   ```vue
   <template>
     <CornerBadge src="/your-badge-image.png" />
   </template>
   ```

   Tell the user to drop their badge image into `public/` and update `src`
   to match its filename. To hide the badge on any individual slide (a
   cover slide with its own logo treatment, a full-bleed photo it would
   clutter), set `badge: false` in that slide's frontmatter — no code
   change needed. Skip this whole sub-step if the user didn't want a badge;
   nothing else in the deck depends on `global-top.vue` existing.

3. **Draft `slides.md`.** Use the `wwt-slidev-authoring` skill's recommended
   narrative to sketch a section outline first (bullets in chat), confirm
   with the user, then write full slides. For a 25-minute talk aim for
   15–20 slides.

4. **Install.**

   ```bash
   pnpm install
   ```

   Then copy the theme's public assets into the deck's own `public/`
   directory. The theme's components reference root-absolute paths
   (`/wwt-logo.png`, `/wwt-monogram.png`, etc.) that Slidev's static-asset
   handling doesn't serve from `node_modules` — skipping this step means
   logos and gradient backgrounds render as broken images with no error:

   ```bash
   cp node_modules/slidev-theme-wwt/public/* public/
   ```

5. **Report back.** Tell the user:
   - Where the deck lives
   - How to preview: `pnpm dev` inside the deck directory
   - How to export a PDF: `pnpm export`
   - Which layouts you used and why

Do NOT run `pnpm dev` yourself — let the user launch it when they're ready.
