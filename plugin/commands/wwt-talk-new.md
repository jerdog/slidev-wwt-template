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

3. **Draft `slides.md`.** Use the `wwt-slidev-authoring` skill's recommended
   narrative to sketch a section outline first (bullets in chat), confirm
   with the user, then write full slides. For a 25-minute talk aim for
   15–20 slides.

4. **Install.**

   ```bash
   pnpm install
   ```

5. **Report back.** Tell the user:
   - Where the deck lives
   - How to preview: `pnpm dev` inside the deck directory
   - How to export a PDF: `pnpm export`
   - Which layouts you used and why

Do NOT run `pnpm dev` yourself — let the user launch it when they're ready.
