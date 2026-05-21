# Slidev WWT Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pnpm monorepo containing a publishable `slidev-theme-wwt` package and a runnable WWT-branded starter deck that exercises every layout.

**Architecture:** Two pnpm workspace packages. `slidev-theme-wwt` is a Slidev theme (Vue 3 layouts + components + CSS tokens + Shiki/Mermaid setup) following Slidev's `slidev-theme-*` convention. `starter` is a sample deck that depends on the theme via `workspace:*` and serves as the visual smoke test for every layout. Verification favors visual smoke tests through the starter deck plus lint/typecheck/build success; targeted Vitest unit tests only where there is real logic (e.g., proportional logo sizing).

**Tech Stack:** pnpm 9 workspaces, Node ≥ 20, TypeScript, Vue 3 (`<script setup>`), Slidev (`@slidev/cli`, `@slidev/types`), UnoCSS (via Slidev defaults), `@fontsource/inter`, Shiki, Mermaid, Vitest + `@vue/test-utils`, ESLint flat config with `eslint-plugin-vue`, Prettier.

**Source of truth for design decisions:** [`docs/superpowers/specs/2026-05-21-slidev-wwt-template-design.md`](../specs/2026-05-21-slidev-wwt-template-design.md).

**Brand assets to copy in:** Logo and gradient PNGs from the local `wwt-brand` and `wwt-presentation` skills under `~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/.../skills/wwt-brand/assets/` and `.../wwt-presentation/assets/`.

---

## Phase 1 — Repository foundation

### Task 1: Initialize pnpm monorepo root

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `.gitignore`
- Create: `.editorconfig`
- Create: `tsconfig.base.json`
- Create: `.nvmrc`

- [ ] **Step 1: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "packages/*"
```

- [ ] **Step 2: Create `.nvmrc`**

```
20
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules/
.DS_Store
dist/
.output/
.cache/
.vite/
*.log
.env
.env.*
!.env.example
slides-export/
*.pdf
.pnpm-store/
.vscode/*
!.vscode/extensions.json
```

- [ ] **Step 4: Create `.editorconfig`**

```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

- [ ] **Step 5: Create `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": []
  }
}
```

- [ ] **Step 6: Create root `package.json`**

```json
{
  "name": "slidev-wwt-template",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20",
    "pnpm": ">=9"
  },
  "packageManager": "pnpm@9.12.0",
  "scripts": {
    "dev": "pnpm --filter starter dev",
    "build": "pnpm --filter starter build",
    "export": "pnpm --filter starter export",
    "lint": "eslint .",
    "format": "prettier --write \"**/*.{ts,vue,css,md,json,yaml,yml}\"",
    "format:check": "prettier --check \"**/*.{ts,vue,css,md,json,yaml,yml}\"",
    "typecheck": "pnpm -r typecheck",
    "test": "pnpm -r test"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "eslint": "^9.13.0",
    "eslint-plugin-vue": "^9.30.0",
    "prettier": "^3.3.3",
    "typescript": "^5.6.3",
    "vue-eslint-parser": "^9.4.3"
  }
}
```

- [ ] **Step 7: Create `eslint.config.js`**

```js
import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.output/**", "**/slides-export/**"],
  },
  ...vue.configs["flat/recommended"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": ["error", { html: { void: "always", normal: "always" } }],
    },
  },
];
```

- [ ] **Step 8: Create `.prettierrc.json`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": []
}
```

- [ ] **Step 9: Install root dev deps and commit**

```bash
pnpm install
git add .
git commit -m "chore: initialize pnpm monorepo with tooling"
```

Expected: `pnpm install` succeeds, creates `pnpm-lock.yaml`.

---

### Task 2: Scaffold theme package shell

**Files:**
- Create: `packages/slidev-theme-wwt/package.json`
- Create: `packages/slidev-theme-wwt/tsconfig.json`
- Create: `packages/slidev-theme-wwt/.gitignore`
- Create: `packages/slidev-theme-wwt/README.md` (stub)
- Create empty directories: `layouts/`, `components/`, `styles/`, `setup/`, `public/`

- [ ] **Step 1: Create `packages/slidev-theme-wwt/package.json`**

```json
{
  "name": "slidev-theme-wwt",
  "version": "0.1.0",
  "description": "WWT-branded theme for Slidev",
  "type": "module",
  "license": "MIT",
  "keywords": ["slidev-theme", "slidev", "wwt"],
  "files": [
    "layouts/",
    "components/",
    "styles/",
    "setup/",
    "public/",
    "package.json",
    "README.md"
  ],
  "slidev": {
    "colorSchema": "both",
    "highlighter": "shiki"
  },
  "peerDependencies": {
    "@slidev/cli": ">=0.49.0",
    "@slidev/types": ">=0.49.0",
    "vue": ">=3.4.0"
  },
  "dependencies": {
    "@fontsource/inter": "^5.1.0"
  },
  "devDependencies": {
    "@slidev/cli": "^0.49.0",
    "@slidev/types": "^0.49.0",
    "@types/node": "^20.14.0",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vue/test-utils": "^2.4.6",
    "happy-dom": "^15.7.0",
    "typescript": "^5.6.3",
    "vitest": "^2.1.3",
    "vue": "^3.5.12",
    "vue-tsc": "^2.1.10"
  },
  "scripts": {
    "typecheck": "vue-tsc --noEmit",
    "test": "vitest run"
  }
}
```

- [ ] **Step 2: Create `packages/slidev-theme-wwt/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.vue", "**/*.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create `packages/slidev-theme-wwt/.gitignore`**

```
node_modules/
dist/
```

- [ ] **Step 4: Create `packages/slidev-theme-wwt/README.md` stub**

```markdown
# slidev-theme-wwt

WWT-branded theme for [Slidev](https://sli.dev/).

> README will be expanded in Task 38.
```

- [ ] **Step 5: Create empty directory placeholders**

```bash
mkdir -p packages/slidev-theme-wwt/{layouts,components,styles,setup,public}
touch packages/slidev-theme-wwt/{layouts,components,styles,setup,public}/.gitkeep
```

- [ ] **Step 6: Install and commit**

```bash
pnpm install
git add packages/slidev-theme-wwt
git commit -m "feat(theme): scaffold slidev-theme-wwt package"
```

Expected: `pnpm install` resolves new workspace package without error.

---

### Task 3: Copy WWT brand assets into theme public

**Files:**
- Copy into `packages/slidev-theme-wwt/public/`:
  - `wwt-logo.png`, `wwt-logo-white.png`, `wwt-logo-black.png`
  - `wwt-monogram.png`, `wwt-monogram-white.png`
  - `wwt-gradient-rule.png`
  - `bg-cover-gradient.png` (from `wwt-presentation/assets/bg_navy_graphic_device.png`)
  - `bg-section-gradient.png` (from `wwt-presentation/assets/bg_Section_break_without_logo.jpeg` — rename to `.jpeg` or keep extension)

- [ ] **Step 1: Locate skill asset directories**

```bash
SKILLS_DIR=$(find "$HOME/Library/Application Support/Claude" -type d -name "wwt-brand" 2>/dev/null | head -1)
echo "wwt-brand: $SKILLS_DIR"
ls "$SKILLS_DIR/assets/"
```

Expected output lists `wwt-logo.png`, `wwt-monogram.png`, `wwt-gradient-rule.png`, etc.

- [ ] **Step 2: Copy logos and gradient rule**

```bash
WB="$HOME/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin"
SRC=$(find "$WB" -type d -name "wwt-brand" 2>/dev/null | head -1)/assets
DEST=packages/slidev-theme-wwt/public

cp "$SRC/wwt-logo.png" "$DEST/wwt-logo.png"
cp "$SRC/wwt-logo-white.png" "$DEST/wwt-logo-white.png"
cp "$SRC/wwt-logo-black.png" "$DEST/wwt-logo-black.png"
cp "$SRC/wwt-monogram.png" "$DEST/wwt-monogram.png"
cp "$SRC/wwt-monogram-white.png" "$DEST/wwt-monogram-white.png"
cp "$SRC/wwt-gradient-rule.png" "$DEST/wwt-gradient-rule.png"
```

- [ ] **Step 3: Copy pre-rendered backgrounds from wwt-presentation skill**

```bash
WP_SRC=$(find "$WB" -type d -name "wwt-presentation" 2>/dev/null | head -1)/assets

cp "$WP_SRC/bg_navy_graphic_device.png" "$DEST/bg-cover-gradient.png"
cp "$WP_SRC/bg_Section_break_without_logo.jpeg" "$DEST/bg-section-gradient.jpeg"
```

- [ ] **Step 4: Remove `.gitkeep` from public/, verify assets present**

```bash
rm -f packages/slidev-theme-wwt/public/.gitkeep
ls packages/slidev-theme-wwt/public/
```

Expected output includes all eight image files.

- [ ] **Step 5: Commit**

```bash
git add packages/slidev-theme-wwt/public
git commit -m "feat(theme): vendor WWT brand image assets"
```

---

### Task 4: Scaffold starter package shell

**Files:**
- Create: `packages/starter/package.json`
- Create: `packages/starter/slides.md` (minimal cover only)
- Create: `packages/starter/.gitignore`
- Create: `packages/starter/README.md` (stub)
- Create empty: `packages/starter/{components,public,snippets}/.gitkeep`

- [ ] **Step 1: Create `packages/starter/package.json`**

```json
{
  "name": "starter",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "slidev",
    "build": "slidev build",
    "export": "slidev export",
    "typecheck": "vue-tsc --noEmit"
  },
  "dependencies": {
    "slidev-theme-wwt": "workspace:*"
  },
  "devDependencies": {
    "@slidev/cli": "^0.49.0",
    "@slidev/theme-default": "^0.25.0",
    "typescript": "^5.6.3",
    "vue": "^3.5.12",
    "vue-tsc": "^2.1.10"
  }
}
```

- [ ] **Step 2: Create minimal `packages/starter/slides.md`**

```markdown
---
theme: wwt
title: WWT Slidev Starter
info: |
  ## WWT Slidev Starter
  Make a new world happen.
---

# Hello WWT

Placeholder cover slide — Task 15 replaces this with the real `cover` layout.
```

- [ ] **Step 3: Create `packages/starter/.gitignore` and README**

`.gitignore`:
```
node_modules/
.output/
.slidev/
dist/
slides-export/
```

`README.md`:
```markdown
# WWT Slidev Starter

Sample deck that consumes `slidev-theme-wwt`.

> README will be expanded in Task 39.
```

- [ ] **Step 4: Scaffold empty subdirectories**

```bash
mkdir -p packages/starter/{components,public,snippets}
touch packages/starter/{components,public,snippets}/.gitkeep
```

- [ ] **Step 5: Install and verify Slidev boots**

```bash
pnpm install
pnpm dev
```

Expected: Slidev dev server starts on `localhost:3030` and shows the placeholder slide using the default theme fallback (the theme has no layouts yet, so the cover renders as default Slidev styling). Stop with Ctrl-C.

- [ ] **Step 6: Commit**

```bash
git add packages/starter
git commit -m "feat(starter): scaffold sample deck consuming workspace theme"
```

---

## Phase 2 — Design system

### Task 5: Design tokens (CSS custom properties)

**Files:**
- Create: `packages/slidev-theme-wwt/styles/tokens.css`

- [ ] **Step 1: Create `tokens.css`**

```css
/* WWT Brand Design Tokens
 * Seeded from Blue Steel Design System token mapping.
 * Use the scripts/sync-tokens.mjs helper (TBD task) to refresh from the
 * Blue Steel MCP when available.
 */

:root {
  /* Primary — WWT Light Blue */
  --wwt-primary-base: #0086ea;
  --wwt-primary-medium: #339eee;
  --wwt-primary-light: #66b6f2;
  --wwt-primary-lightest: #99cff7;

  /* Secondary — WWT Dark Blue */
  --wwt-secondary-base: #1c0087;
  --wwt-secondary-medium: #49339f;
  --wwt-secondary-light: #7766b7;
  --wwt-secondary-lightest: #a499cf;

  /* Accents */
  --wwt-accent1-base: #162fb4; /* Royal Blue */
  --wwt-accent2-base: #330072; /* Violet */
  --wwt-accent3-base: #e31c79; /* Pink */
  --wwt-accent4-base: #8212c4; /* Purple */
  --wwt-accent5-base: #fb550e; /* Orange */
  --wwt-accent6-base: #ee282a; /* Bright Red — accents only */
  --wwt-accent7-base: #1d1e48; /* Navy */

  /* Ink and background */
  --wwt-ink-base: #0a0b19;
  --wwt-ink-white: #ffffff;
  --wwt-ink-muted: rgba(10, 11, 25, 0.7);
  --wwt-bg-base: #ffffff;

  /* Spacing scale (used by layouts) */
  --wwt-space-1: 0.25rem;
  --wwt-space-2: 0.5rem;
  --wwt-space-3: 0.75rem;
  --wwt-space-4: 1rem;
  --wwt-space-6: 1.5rem;
  --wwt-space-8: 2rem;
  --wwt-space-12: 3rem;
  --wwt-space-16: 4rem;

  /* Type scale (px to match Slidev's 1980x1080 canvas) */
  --wwt-text-cover: 72px;
  --wwt-text-section: 84px;
  --wwt-text-section-number: 220px;
  --wwt-text-h1: 40px;
  --wwt-text-h2: 28px;
  --wwt-text-body: 20px;
  --wwt-text-caption: 16px;
  --wwt-text-quote: 36px;

  /* Signature radial gradient (matches Blue Steel gradientBlueCenter) */
  --wwt-grad-cover: radial-gradient(
    circle at center,
    var(--wwt-accent1-base) 0%,
    var(--wwt-accent7-base) 70%
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/styles/tokens.css
git commit -m "feat(theme): add WWT design tokens as CSS custom properties"
```

---

### Task 6: Typography base styles and font loading

**Files:**
- Create: `packages/slidev-theme-wwt/styles/layout.css`
- Create: `packages/slidev-theme-wwt/styles/index.ts`

- [ ] **Step 1: Create `styles/layout.css`**

```css
/* Base typography and Slidev slide reset */

html,
body,
#app {
  font-family:
    "Inter",
    "Roobert",
    "Arial",
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--wwt-ink-base);
  font-weight: 400;
  line-height: 1.35;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.slidev-layout {
  font-size: var(--wwt-text-body);
  color: var(--wwt-ink-base);
  background: var(--wwt-bg-base);
}

.slidev-layout h1 {
  font-size: var(--wwt-text-h1);
  font-weight: 700;
  color: var(--wwt-primary-base);
  line-height: 1.1;
  margin-bottom: var(--wwt-space-6);
  letter-spacing: -0.01em;
}

.slidev-layout h2 {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
  line-height: 1.3;
  margin-bottom: var(--wwt-space-4);
}

.slidev-layout p,
.slidev-layout li {
  font-size: var(--wwt-text-body);
  line-height: 1.35;
  text-align: left;
}

.slidev-layout ul,
.slidev-layout ol {
  padding-left: var(--wwt-space-6);
}

.slidev-layout li {
  margin-bottom: var(--wwt-space-2);
}

.slidev-layout a {
  color: var(--wwt-primary-base);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.slidev-layout strong {
  font-weight: 700;
}

.slidev-layout em {
  font-style: italic;
}

/* All text left-aligned per brand */
.slidev-layout,
.slidev-layout * {
  text-align: left;
}
```

- [ ] **Step 2: Create `styles/index.ts`**

```ts
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "./tokens.css";
import "./layout.css";
```

- [ ] **Step 3: Commit**

```bash
git add packages/slidev-theme-wwt/styles
git commit -m "feat(theme): add typography base styles and font bundle"
```

---

### Task 7: Theme app setup wiring

**Files:**
- Create: `packages/slidev-theme-wwt/setup/main.ts`

Slidev's `defineAppSetup` lets a theme run code at app boot. We use it only to import the styles bundle.

- [ ] **Step 1: Create `setup/main.ts`**

```ts
import { defineAppSetup } from "@slidev/types";
import "../styles/index";

export default defineAppSetup(({ app, router }) => {
  // styles imported above
  void app;
  void router;
});
```

- [ ] **Step 2: Run dev to confirm font loads**

```bash
pnpm dev
```

Open `localhost:3030`. The placeholder slide should now use Inter. Stop with Ctrl-C.

- [ ] **Step 3: Commit**

```bash
git add packages/slidev-theme-wwt/setup
git commit -m "feat(theme): wire app setup to import styles bundle"
```

---

## Phase 3 — Shared components

### Task 8: WwtLogo component (with unit test)

**Files:**
- Create: `packages/slidev-theme-wwt/components/WwtLogo.vue`
- Create: `packages/slidev-theme-wwt/components/__tests__/WwtLogo.test.ts`
- Create: `packages/slidev-theme-wwt/vitest.config.ts`

The logo must preserve intrinsic proportions. Since Slidev serves PNGs from `public/`, we cannot read pixel dimensions at runtime — instead we hardcode each PNG's intrinsic aspect ratio in a lookup table and derive `width` from `height` (or vice versa).

- [ ] **Step 1: Discover PNG dimensions**

```bash
# Use Node's image-size or python PIL — pick whichever you have. Here we use sips on macOS:
for f in packages/slidev-theme-wwt/public/wwt-*.png; do
  sips -g pixelWidth -g pixelHeight "$f" | tail -2
done
```

Record the width × height for each logo file. The component uses these.

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    globals: false,
  },
});
```

- [ ] **Step 3: Write failing test `components/__tests__/WwtLogo.test.ts`**

Use placeholder dimensions; replace with real ones in Step 5.

```ts
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import WwtLogo from "../WwtLogo.vue";

describe("WwtLogo", () => {
  it("renders the color variant by default", () => {
    const wrapper = mount(WwtLogo);
    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("/wwt-logo.png");
    expect(img.attributes("alt")).toBe("World Wide Technology");
  });

  it("selects the white variant", () => {
    const wrapper = mount(WwtLogo, { props: { variant: "white" } });
    expect(wrapper.find("img").attributes("src")).toBe("/wwt-logo-white.png");
  });

  it("derives width from height using intrinsic ratio", () => {
    // wwt-logo.png intrinsic ratio is approximately 2.5:1 (width:height) — adjust to actual
    const wrapper = mount(WwtLogo, { props: { height: 60 } });
    const img = wrapper.find("img");
    const w = Number(img.attributes("width"));
    const h = Number(img.attributes("height"));
    expect(h).toBe(60);
    expect(w / h).toBeGreaterThan(1);
    expect(w / h).toBeLessThan(6);
  });
});
```

- [ ] **Step 4: Run test, confirm it fails**

```bash
pnpm --filter slidev-theme-wwt test
```

Expected: FAIL — `Cannot find module '../WwtLogo.vue'`.

- [ ] **Step 5: Implement `components/WwtLogo.vue`**

Replace the ratio numbers with the real values from Step 1.

```vue
<script setup lang="ts">
import { computed } from "vue";

type Variant = "color" | "white" | "black" | "monogram-color" | "monogram-white";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    height?: number;
    width?: number;
  }>(),
  { variant: "color", height: 60 },
);

// Intrinsic aspect ratios (width / height) for each PNG variant.
// Update these to match the actual pixel dimensions discovered in Task 8 Step 1.
const RATIOS: Record<Variant, number> = {
  color: 2.5,
  white: 2.5,
  black: 2.5,
  "monogram-color": 1.0,
  "monogram-white": 1.0,
};

const SRC: Record<Variant, string> = {
  color: "/wwt-logo.png",
  white: "/wwt-logo-white.png",
  black: "/wwt-logo-black.png",
  "monogram-color": "/wwt-monogram.png",
  "monogram-white": "/wwt-monogram-white.png",
};

const resolvedWidth = computed(() => props.width ?? Math.round(props.height * RATIOS[props.variant]));
</script>

<template>
  <img
    :src="SRC[variant]"
    :width="resolvedWidth"
    :height="height"
    alt="World Wide Technology"
    class="wwt-logo"
  />
</template>

<style scoped>
.wwt-logo {
  display: block;
}
</style>
```

- [ ] **Step 6: Run test to verify it passes**

```bash
pnpm --filter slidev-theme-wwt test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add packages/slidev-theme-wwt/components packages/slidev-theme-wwt/vitest.config.ts
git commit -m "feat(theme): add WwtLogo with proportional sizing and unit tests"
```

---

### Task 9: GradientRule component

**Files:**
- Create: `packages/slidev-theme-wwt/components/GradientRule.vue`

- [ ] **Step 1: Implement `GradientRule.vue`**

```vue
<script setup lang="ts">
defineProps<{
  height?: number;
}>();
</script>

<template>
  <div
    class="wwt-gradient-rule"
    :style="{ height: `${$props.height ?? 4}px` }"
    role="presentation"
    aria-hidden="true"
  />
</template>

<style scoped>
.wwt-gradient-rule {
  width: 100%;
  background-image: url("/wwt-gradient-rule.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/components/GradientRule.vue
git commit -m "feat(theme): add GradientRule component"
```

---

### Task 10: GraphicDevice (background) component

**Files:**
- Create: `packages/slidev-theme-wwt/components/GraphicDevice.vue`

This component is a positioned background image. It does NOT draw the diagonal lines programmatically — it uses the pre-rendered PNG.

- [ ] **Step 1: Implement `GraphicDevice.vue`**

```vue
<script setup lang="ts">
type Variant = "dark" | "light";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
  }>(),
  { variant: "dark" },
);

const SRC: Record<Variant, string> = {
  dark: "/bg-cover-gradient.png",
  light: "/bg-section-gradient.jpeg",
};
</script>

<template>
  <div
    class="wwt-graphic-device"
    :style="{ backgroundImage: `url(${SRC[variant]})` }"
    role="presentation"
    aria-hidden="true"
  />
</template>

<style scoped>
.wwt-graphic-device {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/components/GraphicDevice.vue
git commit -m "feat(theme): add GraphicDevice background component"
```

---

### Task 11: Footer component

**Files:**
- Create: `packages/slidev-theme-wwt/components/Footer.vue`

- [ ] **Step 1: Implement `Footer.vue`**

```vue
<script setup lang="ts">
import { useNav, useSlideContext } from "@slidev/client";

const { currentSlideNo, total } = useNav();
const { $frontmatter } = useSlideContext();
</script>

<template>
  <footer class="wwt-footer">
    <img src="/wwt-monogram.png" alt="WWT" width="24" height="24" class="wwt-footer__monogram" />
    <span class="wwt-footer__title">{{ $frontmatter?.title ?? "World Wide Technology" }}</span>
    <span class="wwt-footer__page">{{ currentSlideNo }} / {{ total }}</span>
  </footer>
</template>

<style scoped>
.wwt-footer {
  position: absolute;
  bottom: 1.25rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: var(--wwt-space-3);
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
}

.wwt-footer__monogram {
  display: block;
}

.wwt-footer__title {
  flex: 1;
}

.wwt-footer__page {
  font-variant-numeric: tabular-nums;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/components/Footer.vue
git commit -m "feat(theme): add Footer component with monogram, title, slide number"
```

---

### Task 12: Stat component

**Files:**
- Create: `packages/slidev-theme-wwt/components/Stat.vue`

- [ ] **Step 1: Implement `Stat.vue`**

```vue
<script setup lang="ts">
defineProps<{
  value: string;
  label: string;
  caption?: string;
}>();
</script>

<template>
  <article class="wwt-stat">
    <div class="wwt-stat__value">{{ value }}</div>
    <div class="wwt-stat__label">{{ label }}</div>
    <p v-if="caption" class="wwt-stat__caption">{{ caption }}</p>
  </article>
</template>

<style scoped>
.wwt-stat {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-2);
}

.wwt-stat__value {
  font-size: 96px;
  font-weight: 300;
  color: var(--wwt-primary-base);
  line-height: 1;
  letter-spacing: -0.02em;
}

.wwt-stat__label {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
}

.wwt-stat__caption {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  margin: 0;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/components/Stat.vue
git commit -m "feat(theme): add Stat component"
```

---

### Task 13: PersonCard component

**Files:**
- Create: `packages/slidev-theme-wwt/components/PersonCard.vue`

- [ ] **Step 1: Implement `PersonCard.vue`**

```vue
<script setup lang="ts">
defineProps<{
  name: string;
  role: string;
  photo?: string;
}>();
</script>

<template>
  <article class="wwt-person">
    <div class="wwt-person__photo">
      <img v-if="photo" :src="photo" :alt="name" />
      <span v-else class="wwt-person__initials">{{ name.charAt(0) }}</span>
    </div>
    <div class="wwt-person__meta">
      <div class="wwt-person__name">{{ name }}</div>
      <div class="wwt-person__role">{{ role }}</div>
    </div>
  </article>
</template>

<style scoped>
.wwt-person {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-3);
  align-items: flex-start;
}

.wwt-person__photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--wwt-primary-lightest);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.wwt-person__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wwt-person__initials {
  font-size: 48px;
  font-weight: 300;
  color: var(--wwt-secondary-base);
}

.wwt-person__name {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
}

.wwt-person__role {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/components/PersonCard.vue
git commit -m "feat(theme): add PersonCard component"
```

---

### Task 14: SectionNumber component

**Files:**
- Create: `packages/slidev-theme-wwt/components/SectionNumber.vue`

- [ ] **Step 1: Implement `SectionNumber.vue`**

```vue
<script setup lang="ts">
defineProps<{
  n: number | string;
}>();
</script>

<template>
  <div class="wwt-section-number">{{ n }}</div>
</template>

<style scoped>
.wwt-section-number {
  font-size: var(--wwt-text-section-number);
  font-weight: 300;
  color: var(--wwt-primary-base);
  line-height: 1;
  letter-spacing: -0.04em;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/components/SectionNumber.vue
git commit -m "feat(theme): add SectionNumber component"
```

---

## Phase 4 — Layouts

Each layout task follows the same pattern: create the Vue layout file, add or update a slide in `starter/slides.md` that uses it, verify it renders in dev mode, commit. Layouts are independent; an engineer can tackle them in any order, but the order below builds visual narrative coherence in the starter deck.

> **Hint:** Keep `pnpm dev` running in a separate terminal during Phase 4. Slidev HMR will reload each slide as you save.

### Task 15: `cover` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/cover.vue`
- Modify: `packages/starter/slides.md` (replace placeholder with real cover)

- [ ] **Step 1: Implement `layouts/cover.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-cover slidev-layout">
    <GraphicDevice variant="dark" />
    <WwtLogo variant="white" :height="56" class="wwt-cover__logo" />

    <div class="wwt-cover__body">
      <h1 class="wwt-cover__title">{{ $frontmatter?.title ?? "Title goes here" }}</h1>
      <p v-if="$frontmatter?.subtitle" class="wwt-cover__subtitle">
        {{ $frontmatter.subtitle }}
      </p>
      <div v-if="$frontmatter?.presenter || $frontmatter?.date" class="wwt-cover__meta">
        <span v-if="$frontmatter?.presenter">
          {{ $frontmatter.presenter }}
          <template v-if="$frontmatter?.presenterRole"> — {{ $frontmatter.presenterRole }}</template>
        </span>
        <span v-if="$frontmatter?.date">{{ $frontmatter.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wwt-cover {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.wwt-cover__logo {
  position: absolute;
  top: 3rem;
  right: 3rem;
  z-index: 2;
}

.wwt-cover__body {
  position: relative;
  z-index: 1;
  max-width: 75%;
}

.wwt-cover__title {
  font-size: var(--wwt-text-cover);
  font-weight: 300;
  color: var(--wwt-ink-white);
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin: 0 0 var(--wwt-space-6);
}

.wwt-cover__subtitle {
  font-size: 32px;
  font-weight: 400;
  color: var(--wwt-primary-light);
  margin: 0 0 var(--wwt-space-8);
  max-width: 60%;
}

.wwt-cover__meta {
  display: flex;
  gap: var(--wwt-space-6);
  font-size: var(--wwt-text-body);
  color: var(--wwt-ink-white);
  opacity: 0.85;
}
</style>
```

- [ ] **Step 2: Replace `packages/starter/slides.md` cover**

```markdown
---
theme: wwt
title: Make a new world happen
info: Sample deck for the slidev-theme-wwt package.
layout: cover
subtitle: A WWT-branded Slidev starter — every layout in one deck.
presenter: Your Name
presenterRole: Solutions Architect, World Wide Technology
date: 2026
---
```

- [ ] **Step 3: Verify in dev**

```bash
pnpm dev
```

Open `localhost:3030`. Expected: dark gradient background, white logo top-right, large light "Make a new world happen" headline.

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/layouts/cover.vue packages/starter/slides.md
git commit -m "feat(theme): add cover layout"
```

---

### Task 16: `section` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/section.vue`
- Modify: `packages/starter/slides.md` (append section break slide)

- [ ] **Step 1: Implement `layouts/section.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-section slidev-layout">
    <GraphicDevice variant="dark" />
    <div class="wwt-section__body">
      <SectionNumber v-if="$frontmatter?.number" :n="$frontmatter.number" />
      <h1 class="wwt-section__title">{{ $frontmatter?.title ?? "Section title" }}</h1>
    </div>
  </div>
</template>

<style scoped>
.wwt-section {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 5rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.wwt-section__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-4);
  max-width: 75%;
}

.wwt-section__title {
  font-size: var(--wwt-text-section);
  font-weight: 300;
  color: var(--wwt-ink-white);
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin: 0;
}
</style>
```

- [ ] **Step 2: Append section slide to `slides.md`**

```markdown
---
layout: section
number: 01
title: Why this template exists
---
```

- [ ] **Step 3: Verify in dev**

Reload `localhost:3030`, navigate to the second slide. Expected: large "01" in light blue, white headline below.

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/layouts/section.vue packages/starter/slides.md
git commit -m "feat(theme): add section layout"
```

---

### Task 17: `end` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/end.vue`
- Modify: `packages/starter/slides.md` (append end slide)

- [ ] **Step 1: Implement `layouts/end.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-end slidev-layout">
    <GraphicDevice variant="dark" />
    <div class="wwt-end__body">
      <p class="wwt-end__signoff">
        {{ $frontmatter?.signoff ?? "Make a new world happen" }}
      </p>
      <WwtLogo variant="white" :height="80" />
      <p class="wwt-end__site">wwt.com</p>
    </div>
  </div>
</template>

<style scoped>
.wwt-end {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 5rem;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.wwt-end__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--wwt-space-8);
  text-align: center;
}

.wwt-end__signoff {
  font-size: 56px;
  font-weight: 300;
  color: var(--wwt-ink-white);
  letter-spacing: -0.01em;
  margin: 0;
}

.wwt-end__site {
  font-size: var(--wwt-text-body);
  color: var(--wwt-primary-light);
  margin: 0;
}

/* center alignment exception: end slide is centered for brand sign-off */
.wwt-end,
.wwt-end * {
  text-align: center;
}
</style>
```

- [ ] **Step 2: Append end slide to `slides.md`**

```markdown
---
layout: end
---
```

- [ ] **Step 3: Verify in dev**

Navigate to the last slide. Expected: dark gradient, centered "Make a new world happen", logo, "wwt.com".

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/layouts/end.vue packages/starter/slides.md
git commit -m "feat(theme): add end layout"
```

---

### Task 18: `default` layout override

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/default.vue`
- Modify: `packages/starter/slides.md` (insert two content slides between section 01 and end)

- [ ] **Step 1: Implement `layouts/default.vue`**

```vue
<template>
  <div class="wwt-default slidev-layout">
    <GradientRule class="wwt-default__rule" />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-default__monogram" />
    <div class="wwt-default__content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-default {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
  display: flex;
  flex-direction: column;
}

.wwt-default__rule {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.wwt-default__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-default__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-4);
}
</style>
```

- [ ] **Step 2: Insert two content slides between section break and end**

In `slides.md`, before the `layout: end` slide, add:

```markdown
---
layout: default
title: Why this template exists
---

# Why this template exists

World Wide Technology helps the world's most ambitious companies deliver
business outcomes. This Slidev template gives WWT teams a fast, on-brand
way to author technical presentations in Markdown.

- Author once in Markdown, present anywhere
- Brand-compliant out of the box
- Inter as a Roobert stand-in — swap in your licensed copy when ready
- Export to PDF for handoff

---
layout: default
title: How to use it
---

# How to use it

1. Clone this repo and run `pnpm install`
2. Open `slides.md` and start writing
3. Use `pnpm dev` to preview, `pnpm export` to ship a PDF
```

- [ ] **Step 3: Verify**

Reload. Expected: white slides, light-blue bold H1, gradient rule across top, monogram top-left, footer with slide number bottom.

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/layouts/default.vue packages/starter/slides.md
git commit -m "feat(theme): add default layout override"
```

---

### Task 19: `agenda` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/agenda.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/agenda.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const items = ($frontmatter?.items ?? []) as string[];
</script>

<template>
  <div class="wwt-agenda slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-agenda__monogram" />
    <div class="wwt-agenda__body">
      <h1>Agenda</h1>
      <ol class="wwt-agenda__list">
        <li v-for="(item, index) in items" :key="index" class="wwt-agenda__item">
          <span class="wwt-agenda__number">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="wwt-agenda__label">{{ item }}</span>
        </li>
      </ol>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-agenda {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-agenda__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-agenda__list {
  list-style: none;
  padding: 0;
  margin: var(--wwt-space-8) 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--wwt-space-6) var(--wwt-space-12);
}

.wwt-agenda__item {
  display: flex;
  align-items: baseline;
  gap: var(--wwt-space-4);
}

.wwt-agenda__number {
  font-size: var(--wwt-text-h1);
  font-weight: 300;
  color: var(--wwt-primary-base);
  min-width: 4ch;
}

.wwt-agenda__label {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
}
</style>
```

- [ ] **Step 2: Insert agenda slide after cover**

```markdown
---
layout: agenda
items:
  - Why this template exists
  - How to use it
  - What's in the box
  - Make it your own
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/agenda.vue packages/starter/slides.md
git commit -m "feat(theme): add agenda layout"
```

---

### Task 20: `two-cols` layout override

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/two-cols.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/two-cols.vue`**

```vue
<template>
  <div class="wwt-two-cols slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-two-cols__monogram" />
    <div class="wwt-two-cols__grid">
      <div class="wwt-two-cols__col">
        <slot name="left" />
      </div>
      <div class="wwt-two-cols__col">
        <slot name="right" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-two-cols {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-two-cols__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-two-cols__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wwt-space-12);
  height: 100%;
  padding-top: var(--wwt-space-8);
}

.wwt-two-cols__col {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-4);
}
</style>
```

- [ ] **Step 2: Add two-cols slide to `slides.md`**

```markdown
---
layout: two-cols
title: Built for speed
---

# Built for speed

::left::

Author in Markdown — every layout responds to frontmatter so you spend zero
time fighting slide masters.

::right::

Run `pnpm dev` and Slidev rebuilds in milliseconds. Ship a PDF with
`pnpm export` when you're ready to hand it off.
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/two-cols.vue packages/starter/slides.md
git commit -m "feat(theme): add two-cols layout override"
```

---

### Task 21: `quote` layout (light + dark variants)

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/quote.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/quote.vue`**

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const isDark = computed(() => Boolean($frontmatter?.dark));
</script>

<template>
  <div :class="['wwt-quote slidev-layout', { 'wwt-quote--dark': isDark }]">
    <GraphicDevice v-if="isDark" variant="dark" />
    <GradientRule v-else />
    <img
      v-if="!isDark"
      src="/wwt-monogram.png"
      alt="WWT"
      width="32"
      height="32"
      class="wwt-quote__monogram"
    />
    <blockquote class="wwt-quote__body">
      <p class="wwt-quote__text">
        <slot />
      </p>
      <footer class="wwt-quote__cite">
        <span class="wwt-quote__attribution">{{ $frontmatter?.attribution }}</span>
        <span v-if="$frontmatter?.role" class="wwt-quote__role">{{ $frontmatter.role }}</span>
      </footer>
    </blockquote>
    <Footer v-if="!isDark" />
  </div>
</template>

<style scoped>
.wwt-quote {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 5rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.wwt-quote--dark {
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
}

.wwt-quote__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-quote__body {
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-6);
}

.wwt-quote__text {
  font-size: var(--wwt-text-quote);
  font-weight: 300;
  line-height: 1.3;
  color: inherit;
  margin: 0;
}

.wwt-quote__text::before {
  content: "\201C";
  color: var(--wwt-primary-base);
  font-size: 1.5em;
  line-height: 0;
  margin-right: 0.1em;
  vertical-align: -0.2em;
}

.wwt-quote__cite {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-1);
}

.wwt-quote__attribution {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-quote__role {
  font-size: var(--wwt-text-caption);
  opacity: 0.7;
}
</style>
```

- [ ] **Step 2: Add quote slide**

```markdown
---
layout: quote
attribution: WWT customer
role: Fortune 100 retailer
---

Markdown-first authoring shaved a full day off our quarterly business review
prep — and the deck still looks like a real WWT deck.
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/quote.vue packages/starter/slides.md
git commit -m "feat(theme): add quote layout with light and dark variants"
```

---

### Task 22: `image-feature` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/image-feature.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/image-feature.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div :class="['wwt-image-feature slidev-layout', `wwt-image-feature--${$frontmatter?.side ?? 'right'}`]">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-image-feature__monogram" />
    <div class="wwt-image-feature__copy">
      <slot />
    </div>
    <div
      class="wwt-image-feature__image"
      :style="{ backgroundImage: `url(${$frontmatter?.image ?? '/wwt-gradient-rule.png'})` }"
      role="img"
      :aria-label="$frontmatter?.imageAlt ?? ''"
    />
    <Footer />
  </div>
</template>

<style scoped>
.wwt-image-feature {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wwt-space-12);
}

.wwt-image-feature--left {
  grid-template-areas: "image copy";
}

.wwt-image-feature--right {
  grid-template-areas: "copy image";
}

.wwt-image-feature__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-image-feature__copy {
  grid-area: copy;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--wwt-space-4);
  padding-top: var(--wwt-space-8);
}

.wwt-image-feature__image {
  grid-area: image;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}
</style>
```

- [ ] **Step 2: Add image-feature slide**

```markdown
---
layout: image-feature
title: Capability spotlight
side: right
image: /wwt-gradient-rule.png
imageAlt: Sample placeholder — replace with your screenshot.
---

# Capability spotlight

Drop a screenshot, demo capture, or hero image alongside a short paragraph.
The frontmatter `side` key flips the image between left and right.
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/image-feature.vue packages/starter/slides.md
git commit -m "feat(theme): add image-feature layout"
```

---

### Task 23: `image-full` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/image-full.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/image-full.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-image-full slidev-layout">
    <div
      class="wwt-image-full__bg"
      :style="{ backgroundImage: `url(${$frontmatter?.image ?? ''})` }"
      role="img"
      :aria-label="$frontmatter?.imageAlt ?? ''"
    />
    <div class="wwt-image-full__scrim" />
    <h1 v-if="$frontmatter?.headline" class="wwt-image-full__headline">
      {{ $frontmatter.headline }}
    </h1>
  </div>
</template>

<style scoped>
.wwt-image-full {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wwt-image-full__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.wwt-image-full__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(29, 30, 72, 0.85) 0%,
    rgba(22, 47, 180, 0.6) 100%
  );
}

.wwt-image-full__headline {
  position: relative;
  z-index: 1;
  color: var(--wwt-ink-white);
  font-size: var(--wwt-text-cover);
  font-weight: 300;
  line-height: 1.0;
  max-width: 70%;
  padding: 5rem;
  margin: 0;
}
</style>
```

- [ ] **Step 2: Add image-full slide**

```markdown
---
layout: image-full
image: /bg-section-gradient.jpeg
headline: One world. One team.
imageAlt: WWT section break visual.
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/image-full.vue packages/starter/slides.md
git commit -m "feat(theme): add image-full layout"
```

---

### Task 24: `stats` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/stats.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/stats.vue`**

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type StatItem = { value: string; label: string; caption?: string };
const stats = computed<StatItem[]>(() => ($frontmatter?.stats ?? []) as StatItem[]);
</script>

<template>
  <div class="wwt-stats slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-stats__monogram" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <div class="wwt-stats__grid" :data-count="stats.length">
      <Stat
        v-for="(s, i) in stats"
        :key="i"
        :value="s.value"
        :label="s.label"
        :caption="s.caption"
      />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-stats {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-stats__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-stats__grid {
  display: grid;
  gap: var(--wwt-space-12);
  margin-top: var(--wwt-space-8);
}

.wwt-stats__grid[data-count="1"] {
  grid-template-columns: 1fr;
}

.wwt-stats__grid[data-count="2"] {
  grid-template-columns: repeat(2, 1fr);
}

.wwt-stats__grid[data-count="3"] {
  grid-template-columns: repeat(3, 1fr);
}

.wwt-stats__grid[data-count="4"] {
  grid-template-columns: repeat(4, 1fr);
}
</style>
```

- [ ] **Step 2: Add stats slide**

```markdown
---
layout: stats
title: By the numbers
stats:
  - value: "17"
    label: layouts
    caption: every common business slide pattern
  - value: "1"
    label: command
    caption: pnpm dev to preview
  - value: "0"
    label: license fees
    caption: Inter as the Roobert stand-in
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/stats.vue packages/starter/slides.md
git commit -m "feat(theme): add stats layout"
```

---

### Task 25: `team` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/team.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/team.vue`**

```vue
<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Member = { name: string; role: string; photo?: string };
const members = computed<Member[]>(() => ($frontmatter?.members ?? []) as Member[]);
</script>

<template>
  <div class="wwt-team slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-team__monogram" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <div class="wwt-team__grid">
      <PersonCard
        v-for="m in members"
        :key="m.name"
        :name="m.name"
        :role="m.role"
        :photo="m.photo"
      />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-team {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-team__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-team__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--wwt-space-8);
  margin-top: var(--wwt-space-8);
}
</style>
```

- [ ] **Step 2: Add team slide**

```markdown
---
layout: team
title: Your team
members:
  - name: Avery Chen
    role: Engagement Lead
  - name: Jordan Patel
    role: Principal Architect
  - name: Riley Okonkwo
    role: Solutions Engineer
  - name: Sam Rivera
    role: Customer Success
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/team.vue packages/starter/slides.md
git commit -m "feat(theme): add team layout"
```

---

### Task 26: `comparison` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/comparison.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/comparison.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Side = { title: string; points: string[] };
const left = ($frontmatter?.left ?? { title: "", points: [] }) as Side;
const right = ($frontmatter?.right ?? { title: "", points: [] }) as Side;
</script>

<template>
  <div class="wwt-comparison slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-comparison__monogram" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <div class="wwt-comparison__grid">
      <section class="wwt-comparison__card">
        <header class="wwt-comparison__header">{{ left.title }}</header>
        <ul>
          <li v-for="p in left.points" :key="p">{{ p }}</li>
        </ul>
      </section>
      <section class="wwt-comparison__card">
        <header class="wwt-comparison__header">{{ right.title }}</header>
        <ul>
          <li v-for="p in right.points" :key="p">{{ p }}</li>
        </ul>
      </section>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-comparison {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-comparison__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-comparison__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wwt-space-8);
  margin-top: var(--wwt-space-6);
}

.wwt-comparison__card {
  border: 1px solid var(--wwt-primary-lightest);
  border-radius: 12px;
  overflow: hidden;
}

.wwt-comparison__header {
  background: var(--wwt-primary-base);
  color: var(--wwt-ink-white);
  padding: var(--wwt-space-3) var(--wwt-space-4);
  font-weight: 600;
}

.wwt-comparison__card ul {
  padding: var(--wwt-space-4) var(--wwt-space-6);
  margin: 0;
}
</style>
```

- [ ] **Step 2: Add comparison slide**

```markdown
---
layout: comparison
title: Markdown vs slide-master decks
left:
  title: Slide-master deck
  points:
    - Drag boxes around for hours
    - Inconsistent typography
    - Version control unfriendly
right:
  title: Markdown deck
  points:
    - Write content, not layout
    - On-brand by default
    - Pull-request-friendly
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/comparison.vue packages/starter/slides.md
git commit -m "feat(theme): add comparison layout"
```

---

### Task 27: `timeline` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/timeline.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/timeline.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Event = { date: string; label: string; detail?: string };
const events = ($frontmatter?.events ?? []) as Event[];
</script>

<template>
  <div class="wwt-timeline slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-timeline__monogram" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <ol class="wwt-timeline__line">
      <li v-for="(e, i) in events" :key="i" class="wwt-timeline__event">
        <div class="wwt-timeline__dot" />
        <div class="wwt-timeline__date">{{ e.date }}</div>
        <div class="wwt-timeline__label">{{ e.label }}</div>
        <p v-if="e.detail" class="wwt-timeline__detail">{{ e.detail }}</p>
      </li>
    </ol>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-timeline {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-timeline__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-timeline__line {
  list-style: none;
  padding: 0;
  margin: var(--wwt-space-12) 0 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: var(--wwt-space-6);
  position: relative;
}

.wwt-timeline__line::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 4px;
  background-image: url("/wwt-gradient-rule.png");
  background-size: 100% 100%;
}

.wwt-timeline__event {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-2);
  padding-top: var(--wwt-space-6);
  position: relative;
}

.wwt-timeline__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--wwt-primary-base);
  border: 3px solid var(--wwt-bg-base);
}

.wwt-timeline__date {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-primary-base);
  font-weight: 600;
}

.wwt-timeline__label {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-timeline__detail {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  margin: 0;
}
</style>
```

- [ ] **Step 2: Add timeline slide**

```markdown
---
layout: timeline
title: Engagement milestones
events:
  - date: Week 0
    label: Kickoff
    detail: Goals and stakeholders aligned.
  - date: Week 2
    label: Discovery
    detail: Architecture and risks captured.
  - date: Week 6
    label: Build
    detail: Iterative delivery with weekly demos.
  - date: Week 10
    label: Launch
    detail: Operational handoff and runbook.
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/timeline.vue packages/starter/slides.md
git commit -m "feat(theme): add timeline layout"
```

---

### Task 28: `process` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/process.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/process.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Step = { title: string; detail?: string };
const steps = ($frontmatter?.steps ?? []) as Step[];
</script>

<template>
  <div class="wwt-process slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-process__monogram" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <ol class="wwt-process__steps">
      <li v-for="(step, i) in steps" :key="i" class="wwt-process__step">
        <div class="wwt-process__number">{{ String(i + 1).padStart(2, "0") }}</div>
        <div class="wwt-process__title">{{ step.title }}</div>
        <p v-if="step.detail" class="wwt-process__detail">{{ step.detail }}</p>
      </li>
    </ol>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-process {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-process__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-process__steps {
  list-style: none;
  padding: 0;
  margin: var(--wwt-space-8) 0 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: var(--wwt-space-6);
}

.wwt-process__step {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-3);
  padding: var(--wwt-space-6);
  border-top: 4px solid var(--wwt-primary-base);
  background: var(--wwt-bg-base);
}

.wwt-process__number {
  font-size: 48px;
  font-weight: 300;
  color: var(--wwt-primary-base);
  line-height: 1;
}

.wwt-process__title {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-process__detail {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  margin: 0;
}
</style>
```

- [ ] **Step 2: Add process slide**

```markdown
---
layout: process
title: How we deliver
steps:
  - title: Listen
    detail: We start with your business outcomes.
  - title: Architect
    detail: Reference architectures grounded in lab-tested patterns.
  - title: Deliver
    detail: Iterative builds with continuous demos.
  - title: Operate
    detail: Runbooks, handoff, and ongoing support.
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/process.vue packages/starter/slides.md
git commit -m "feat(theme): add process layout"
```

---

### Task 29: `code-focus` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/code-focus.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/code-focus.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-code slidev-layout">
    <header v-if="$frontmatter?.title" class="wwt-code__header">
      <h1>{{ $frontmatter.title }}</h1>
    </header>
    <div class="wwt-code__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wwt-code {
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-6);
}

.wwt-code__header h1 {
  color: var(--wwt-primary-light);
  font-size: var(--wwt-text-h1);
  margin: 0;
}

.wwt-code__body {
  flex: 1;
  font-size: 22px;
  line-height: 1.5;
}

.wwt-code__body :deep(pre) {
  background: rgba(0, 0, 0, 0.25);
  padding: var(--wwt-space-6);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
```

- [ ] **Step 2: Add code-focus slide**

````markdown
---
layout: code-focus
title: Author in Markdown
---

```ts
// slides.md frontmatter drives every layout
const slide = {
  layout: "stats",
  stats: [
    { value: "17", label: "layouts" },
    { value: "1", label: "command" },
  ],
};
```
````

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/code-focus.vue packages/starter/slides.md
git commit -m "feat(theme): add code-focus layout"
```

---

### Task 30: `customer-quote` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/customer-quote.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/customer-quote.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-customer slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-customer__monogram" />
    <div class="wwt-customer__layout">
      <figure v-if="$frontmatter?.photo" class="wwt-customer__photo">
        <img :src="$frontmatter.photo" :alt="$frontmatter?.name ?? ''" />
      </figure>
      <blockquote class="wwt-customer__body">
        <p class="wwt-customer__quote">{{ $frontmatter?.quote }}</p>
        <footer class="wwt-customer__cite">
          <div class="wwt-customer__name">{{ $frontmatter?.name }}</div>
          <div class="wwt-customer__role">{{ $frontmatter?.role }}</div>
          <img
            v-if="$frontmatter?.logo"
            :src="$frontmatter.logo"
            :alt="$frontmatter?.name ?? ''"
            class="wwt-customer__logo"
          />
        </footer>
      </blockquote>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-customer {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
  display: flex;
  align-items: center;
}

.wwt-customer__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-customer__layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--wwt-space-12);
  align-items: center;
}

.wwt-customer__photo {
  margin: 0;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  background: var(--wwt-primary-lightest);
}

.wwt-customer__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wwt-customer__body {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-6);
}

.wwt-customer__quote {
  font-size: var(--wwt-text-quote);
  font-weight: 300;
  line-height: 1.3;
  margin: 0;
}

.wwt-customer__quote::before {
  content: "\201C";
  color: var(--wwt-primary-base);
  font-size: 1.5em;
  vertical-align: -0.2em;
  margin-right: 0.1em;
}

.wwt-customer__cite {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-2);
}

.wwt-customer__name {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-customer__role {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
}

.wwt-customer__logo {
  height: 32px;
  width: auto;
  margin-top: var(--wwt-space-2);
}
</style>
```

- [ ] **Step 2: Add customer-quote slide**

```markdown
---
layout: customer-quote
quote: We rebuilt our annual customer review in two days instead of two weeks — and it actually looked like a WWT deck.
name: Anonymous customer
role: VP, Engineering
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/customer-quote.vue packages/starter/slides.md
git commit -m "feat(theme): add customer-quote layout"
```

---

### Task 31: `demo` layout

**Files:**
- Create: `packages/slidev-theme-wwt/layouts/demo.vue`
- Modify: `packages/starter/slides.md`

- [ ] **Step 1: Implement `layouts/demo.vue`**

```vue
<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-demo slidev-layout">
    <GradientRule />
    <img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-demo__monogram" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <figure class="wwt-demo__frame">
      <img
        v-if="$frontmatter?.src && !$frontmatter?.iframe"
        :src="$frontmatter.src"
        :alt="$frontmatter?.caption ?? ''"
        class="wwt-demo__media"
      />
      <iframe
        v-else-if="$frontmatter?.src && $frontmatter?.iframe"
        :src="$frontmatter.src"
        class="wwt-demo__media"
        :title="$frontmatter?.caption ?? 'demo'"
      />
      <figcaption v-if="$frontmatter?.caption" class="wwt-demo__caption">
        {{ $frontmatter.caption }}
      </figcaption>
    </figure>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-demo {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-demo__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-demo__frame {
  margin: var(--wwt-space-6) 0 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(28, 0, 135, 0.16);
  border: 1px solid var(--wwt-primary-lightest);
  background: var(--wwt-primary-lightest);
}

.wwt-demo__media {
  display: block;
  width: 100%;
  height: 540px;
  object-fit: cover;
  border: 0;
}

.wwt-demo__caption {
  padding: var(--wwt-space-3) var(--wwt-space-4);
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  background: var(--wwt-bg-base);
}
</style>
```

- [ ] **Step 2: Add demo slide**

```markdown
---
layout: demo
title: Live preview
src: /bg-section-gradient.jpeg
caption: Sample placeholder — drop in your product screenshot or set `iframe: true` for an embedded URL.
---
```

- [ ] **Step 3: Verify and commit**

```bash
git add packages/slidev-theme-wwt/layouts/demo.vue packages/starter/slides.md
git commit -m "feat(theme): add demo layout"
```

---

## Phase 5 — Code and diagram theming

### Task 32: Shiki setup with WWT-tinted themes

**Files:**
- Create: `packages/slidev-theme-wwt/setup/shiki.ts`

Slidev's `defineShikiSetup` lets us register themes by name. We define a light and dark variant by extending built-in Shiki themes with our brand color overrides.

- [ ] **Step 1: Create `setup/shiki.ts`**

```ts
import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(() => ({
  themes: {
    dark: {
      name: "wwt-dark",
      type: "dark",
      colors: {
        "editor.background": "#1D1E48",
        "editor.foreground": "#FFFFFF",
      },
      tokenColors: [
        { scope: ["comment"], settings: { foreground: "#7766B7", fontStyle: "italic" } },
        { scope: ["keyword", "storage", "storage.type"], settings: { foreground: "#66B6F2" } },
        { scope: ["string", "string.quoted"], settings: { foreground: "#99CFF7" } },
        { scope: ["constant.numeric"], settings: { foreground: "#FB550E" } },
        { scope: ["entity.name.function", "support.function"], settings: { foreground: "#E31C79" } },
        { scope: ["variable", "variable.parameter"], settings: { foreground: "#FFFFFF" } },
        { scope: ["entity.name.type", "support.class"], settings: { foreground: "#A499CF" } },
      ],
    },
    light: {
      name: "wwt-light",
      type: "light",
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#0A0B19",
      },
      tokenColors: [
        { scope: ["comment"], settings: { foreground: "#7766B7", fontStyle: "italic" } },
        { scope: ["keyword", "storage", "storage.type"], settings: { foreground: "#1C0087" } },
        { scope: ["string", "string.quoted"], settings: { foreground: "#0086EA" } },
        { scope: ["constant.numeric"], settings: { foreground: "#FB550E" } },
        { scope: ["entity.name.function", "support.function"], settings: { foreground: "#E31C79" } },
        { scope: ["variable", "variable.parameter"], settings: { foreground: "#0A0B19" } },
        { scope: ["entity.name.type", "support.class"], settings: { foreground: "#162FB4" } },
      ],
    },
  },
}));
```

- [ ] **Step 2: Verify the code-focus slide picks up the new theme**

```bash
pnpm dev
```

Navigate to the code-focus slide. Expected: dark navy background with light-blue keywords, white identifiers, violet comments.

- [ ] **Step 3: Commit**

```bash
git add packages/slidev-theme-wwt/setup/shiki.ts
git commit -m "feat(theme): add WWT-tinted Shiki light and dark themes"
```

---

### Task 33: Mermaid setup with WWT theme variables

**Files:**
- Create: `packages/slidev-theme-wwt/setup/mermaid.ts`

- [ ] **Step 1: Create `setup/mermaid.ts`**

```ts
import { defineMermaidSetup } from "@slidev/types";

export default defineMermaidSetup(() => ({
  theme: "base",
  themeVariables: {
    primaryColor: "#0086EA",
    primaryTextColor: "#FFFFFF",
    primaryBorderColor: "#1C0087",
    secondaryColor: "#1C0087",
    tertiaryColor: "#99CFF7",
    lineColor: "#0A0B19",
    fontFamily: "Inter, Roobert, Arial, system-ui, sans-serif",
  },
}));
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/setup/mermaid.ts
git commit -m "feat(theme): add WWT Mermaid theme variables"
```

---

## Phase 6 — Polish

### Task 34: Print and PDF export CSS

**Files:**
- Create: `packages/slidev-theme-wwt/styles/print.css`
- Modify: `packages/slidev-theme-wwt/styles/index.ts` (import print.css)

- [ ] **Step 1: Create `styles/print.css`**

```css
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .wwt-footer {
    display: none;
  }

  .wwt-cover .wwt-footer,
  .wwt-section .wwt-footer,
  .wwt-end .wwt-footer,
  .wwt-image-full .wwt-footer {
    display: none !important;
  }
}
```

- [ ] **Step 2: Append import to `styles/index.ts`**

```ts
import "./print.css";
```

- [ ] **Step 3: Verify PDF export**

```bash
pnpm export
```

Expected: `packages/starter/slides-export.pdf` (or similar) is produced, every slide renders with the correct background and logos. Inspect visually.

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/styles
git commit -m "feat(theme): add print CSS for PDF export fidelity"
```

---

### Task 35: Theme README

**Files:**
- Modify: `packages/slidev-theme-wwt/README.md`

- [ ] **Step 1: Replace `packages/slidev-theme-wwt/README.md`**

```markdown
# slidev-theme-wwt

WWT-branded theme for [Slidev](https://sli.dev/). Author a presentation in
Markdown and ship it on-brand.

## Install

```bash
pnpm add -D slidev-theme-wwt @slidev/cli
```

## Use

Set the theme in your `slides.md` frontmatter:

```markdown
---
theme: wwt
title: Your deck title
---
```

## Layouts

| Layout | Purpose |
|---|---|
| `cover` | Title slide — dark gradient |
| `section` | Section break — large numeral + title |
| `default` | White content slide with monogram + gradient rule |
| `agenda` | Numbered table of contents |
| `two-cols` | Two-column content using `::left::` / `::right::` |
| `quote` | Pull quote (light or `dark: true`) |
| `image-feature` | Headline beside an edge-bleed image (`side: left\|right`) |
| `image-full` | Full-bleed image with overlay headline |
| `stats` | 1-4 big-number stats |
| `team` | Team grid with photos |
| `comparison` | Side-by-side cards |
| `timeline` | Horizontal milestone strip |
| `process` | Numbered process steps |
| `code-focus` | Dark code-centric slide |
| `customer-quote` | Photo + large pull quote |
| `demo` | Framed screenshot or iframe |
| `end` | Closing slide — "Make a new world happen" |

## Typography

The theme ships with [Inter](https://rsms.me/inter/) as a Roobert stand-in. If
you have a licensed copy of Roobert, drop it into your deck's `public/fonts/`
and override the font stack in your own CSS.

## License

MIT
```

- [ ] **Step 2: Commit**

```bash
git add packages/slidev-theme-wwt/README.md
git commit -m "docs(theme): write full README"
```

---

### Task 36: Starter README

**Files:**
- Modify: `packages/starter/README.md`

- [ ] **Step 1: Replace `packages/starter/README.md`**

```markdown
# WWT Slidev Starter

A ready-to-edit Slidev deck that consumes `slidev-theme-wwt`.

## Develop

```bash
pnpm install            # from the repo root
pnpm dev                # opens localhost:3030
```

Edit `slides.md` and Slidev hot-reloads on save.

## Export

```bash
pnpm build              # static site → dist/
pnpm export             # PDF → slides-export.pdf
```

## Author a new deck

1. Copy this `packages/starter/` directory anywhere outside the monorepo and
   rename it.
2. In the copy's `package.json`, replace the `workspace:*` dependency on
   `slidev-theme-wwt` with the published version (`^0.1.0` or later).
3. Edit `slides.md` and the assets under `public/`.

## Layouts available

See `packages/slidev-theme-wwt/README.md` for the full layout catalog.

## Tone

Write in the WWT voice: purposeful, bold and confident, beautifully simple,
refreshing. Sign off with "Make a new world happen."
```

- [ ] **Step 2: Commit**

```bash
git add packages/starter/README.md
git commit -m "docs(starter): write authoring guide"
```

---

### Task 37: GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: ci

on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add GitHub Actions workflow"
```

---

### Task 38: Root README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create root `README.md`**

```markdown
# slidev-wwt-template

A Slidev theme and starter deck for World Wide Technology (WWT)
presentations.

## What's in here

| Package | Purpose |
|---|---|
| [`packages/slidev-theme-wwt`](./packages/slidev-theme-wwt) | Publishable Slidev theme |
| [`packages/starter`](./packages/starter) | Sample deck consuming the theme |

## Quick start

```bash
pnpm install
pnpm dev
```

Open `localhost:3030`. Edit `packages/starter/slides.md` and watch it hot
reload.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Run the starter deck |
| `pnpm build` | Build the starter to static HTML |
| `pnpm export` | Export the starter to PDF |
| `pnpm lint` | Run ESLint across the workspace |
| `pnpm typecheck` | Type-check every package |
| `pnpm test` | Run theme unit tests |
| `pnpm format` | Prettier-format everything |

## License

MIT — make a new world happen.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add root README"
```

---

## Phase 7 — End-to-end verification

### Task 39: Full smoke test

**Files:** none modified.

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml
pnpm install
```

Expected: install completes without errors.

- [ ] **Step 2: Lint, typecheck, test**

```bash
pnpm lint
pnpm typecheck
pnpm test
```

Expected: all three pass.

- [ ] **Step 3: Dev preview every slide**

```bash
pnpm dev
```

Click through every slide. For each, confirm:
- Cover, section, end show the dark navy gradient with the graphic device
- Content slides have the gradient rule on top and monogram in the corner
- Stats, team, comparison, timeline, process render their frontmatter data
- Code-focus uses the dark WWT-tinted Shiki theme
- The footer shows monogram + title + slide number on interior slides

Stop with Ctrl-C.

- [ ] **Step 4: Build and PDF export**

```bash
pnpm build
pnpm export
```

Open the produced PDF. Confirm logos, gradient rule, and graphic device
render correctly on every page.

- [ ] **Step 5: Final commit (if anything needed fixing in this task)**

If you found bugs and patched them above, commit them now with descriptive
messages. Otherwise, this task closes without a new commit.

```bash
git status
```

---

## Acceptance checklist

Tick each before declaring the project shippable:

- [ ] `pnpm install` from a clean clone succeeds on Node 20+
- [ ] `pnpm dev` opens the starter deck with every layout rendered
- [ ] `pnpm build` and `pnpm export` succeed
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` all pass
- [ ] WCAG AA contrast satisfied: Light Blue (`#0086EA`) headlines on white
  use ≥40px or bold weight; white text on the navy gradient uses default body
  weight
- [ ] Logos preserve intrinsic aspect ratio (Task 8's `WwtLogo` does this via
  the `RATIOS` table)
- [ ] Gradient rule and graphic device are pre-rendered PNGs (no programmatic
  recreations)
- [ ] All 17 layouts exercised in `packages/starter/slides.md`
- [ ] No ALL CAPS body text; text left-aligned except on the `end` slide
  sign-off
- [ ] Starter deck signs off with "Make a new world happen"
- [ ] Theme `README.md` lists every layout and its frontmatter contract

---

## Self-review notes (for plan author)

- Spec coverage: every layout in the spec table maps to a Phase 4 task; every
  shared component in the spec maps to a Phase 3 task; design tokens (Task 5),
  typography (Task 6), Shiki/Mermaid (Tasks 32-33), print (Task 34), and CI
  (Task 37) all covered.
- Placeholders: ratio numbers in `WwtLogo.vue` are seed values that the
  engineer replaces with measured values in Task 8 Step 1 — the test in Step
  3 uses a wide tolerance band so it still passes with placeholder ratios,
  but the engineer is instructed to update both the table and (optionally)
  tighten the test.
- Type consistency: `Member`, `Event`, `StatItem`, `Step`, `Side` interfaces
  appear inline in their respective layouts. Frontmatter key names match
  across spec, starter slides, and layout code.
- Ambiguity: `bg-section-gradient.jpeg` extension differs from the spec's
  `.png` — chosen because the source asset in the wwt-presentation skill is
  a JPEG. The layouts that reference it (`image-full` default, `demo`
  placeholder) use the `.jpeg` path consistently.

---

# Amendment 1 — Dark mode + AutoAnimate

These tasks add dark-mode support and the AutoAnimate motion layer. Execute
them after Phase 4 is complete (i.e., after all 17 layouts exist), but before
Phase 7 verification. Order: 40 → 41 → 42 → 43 → 44 → 45.

The amendment also modifies existing tasks 18-31 (every layout that hardcodes
the monogram `<img>`). The amendment's Task 41 patches all of them in one
pass.

## Task 40: Dark-mode token overrides

**Files:**
- Modify: `packages/slidev-theme-wwt/styles/tokens.css`

- [ ] **Step 1: Append dark-mode overrides to `tokens.css`**

Append after the existing `:root { ... }` block:

```css
:root {
  --wwt-monogram-url: url("/wwt-monogram.png");
}

.dark {
  --wwt-bg-base: #0a0b19;
  --wwt-ink-base: #ffffff;
  --wwt-ink-muted: rgba(255, 255, 255, 0.7);
  --wwt-primary-lightest: rgba(102, 182, 242, 0.15);
  --wwt-monogram-url: url("/wwt-monogram-white.png");
}
```

- [ ] **Step 2: Verify dark mode in dev**

```bash
pnpm dev
```

Open `localhost:3030`. Press `D` to toggle dark mode. Expected: white content
slides flip to near-black background with white text. Always-dark slides
(cover, section, end, code-focus, image-full) are unchanged. The monogram in
the corner is still the color version (will be fixed in Task 41).

- [ ] **Step 3: Commit**

```bash
git add packages/slidev-theme-wwt/styles/tokens.css
git commit -m "feat(theme): add dark-mode token overrides"
```

---

## Task 41: CSS-driven monogram mark (dark-mode auto-swap)

**Files:**
- Modify: `packages/slidev-theme-wwt/styles/layout.css` (append shared `.wwt-monogram-mark` rule)
- Modify (in 12 layouts): replace `<img src="/wwt-monogram.png" ... />` with `<div class="wwt-monogram-mark" role="img" aria-label="WWT" />`

Layouts that contain the hardcoded `<img>` (from Phase 4):
`default.vue`, `agenda.vue`, `two-cols.vue`, `quote.vue` (light branch),
`image-feature.vue`, `stats.vue`, `team.vue`, `comparison.vue`,
`timeline.vue`, `process.vue`, `customer-quote.vue`, `demo.vue`.

- [ ] **Step 1: Append shared rule to `styles/layout.css`**

```css
.wwt-monogram-mark {
  width: 32px;
  height: 32px;
  background: var(--wwt-monogram-url) center / contain no-repeat;
  display: block;
}
```

- [ ] **Step 2: Find every monogram img tag**

```bash
grep -rln "wwt-monogram.png" packages/slidev-theme-wwt/layouts/
```

Expected: 12 layout files listed.

- [ ] **Step 3: Replace each `<img>` with the mark `<div>`**

For each listed layout, replace:

```vue
<img src="/wwt-monogram.png" alt="WWT" width="32" height="32" class="wwt-<layout>__monogram" />
```

with:

```vue
<div class="wwt-monogram-mark wwt-<layout>__monogram" role="img" aria-label="WWT" />
```

The per-layout `wwt-<layout>__monogram` class still positions it
(absolutely top-left). The shared `wwt-monogram-mark` class handles the
background image, which now reads from `--wwt-monogram-url`.

- [ ] **Step 4: Update each layout's scoped `.wwt-<layout>__monogram` rule**

In each layout's `<style scoped>` block, remove `width: 32px; height: 32px;`
from `.wwt-<layout>__monogram` (the shared class already sets them). Keep
the `position`, `top`, and `left` declarations.

- [ ] **Step 5: Verify dark-mode monogram swaps**

```bash
pnpm dev
```

Toggle `D`. Expected: monogram switches between color (light mode) and
white (dark mode) in the top-left of every content slide.

- [ ] **Step 6: Commit**

```bash
git add packages/slidev-theme-wwt/layouts packages/slidev-theme-wwt/styles/layout.css
git commit -m "refactor(theme): switch monogram to CSS-driven mark for dark-mode swap"
```

---

## Task 42: AutoAnimate plugin and global directive

**Files:**
- Modify: `packages/slidev-theme-wwt/package.json` (add dependency)
- Modify: `packages/slidev-theme-wwt/setup/main.ts` (register plugin)

- [ ] **Step 1: Add dependency**

```bash
pnpm --filter slidev-theme-wwt add @formkit/auto-animate
```

Expected: `package.json` `dependencies` now contains `@formkit/auto-animate`.

- [ ] **Step 2: Register the plugin globally in `setup/main.ts`**

Replace the file contents:

```ts
import { defineAppSetup } from "@slidev/types";
import autoAnimatePlugin from "@formkit/auto-animate/vue";
import "../styles/index";

export default defineAppSetup(({ app }) => {
  app.use(autoAnimatePlugin);
});
```

- [ ] **Step 3: Confirm dev still boots**

```bash
pnpm dev
```

Expected: dev server starts without errors. The directive `v-auto-animate`
is now available globally; nothing animates yet because no layout uses it.

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt
git commit -m "feat(theme): register AutoAnimate plugin globally"
```

---

## Task 43: Apply `v-auto-animate` and `<v-clicks>` to reveal layouts

**Files (modify in each):**
- `packages/slidev-theme-wwt/layouts/agenda.vue`
- `packages/slidev-theme-wwt/layouts/timeline.vue`
- `packages/slidev-theme-wwt/layouts/stats.vue`
- `packages/slidev-theme-wwt/layouts/team.vue`
- `packages/slidev-theme-wwt/layouts/process.vue`

For each, wrap the iterating element with `v-auto-animate` and wrap children
with Slidev's `<v-clicks>` so each appears on click with a smooth tween.

- [ ] **Step 1: Patch `agenda.vue`**

Replace the existing `<ol class="wwt-agenda__list">` block with:

```vue
<ol class="wwt-agenda__list" v-auto-animate>
  <v-clicks>
    <li v-for="(item, index) in items" :key="index" class="wwt-agenda__item">
      <span class="wwt-agenda__number">{{ String(index + 1).padStart(2, "0") }}</span>
      <span class="wwt-agenda__label">{{ item }}</span>
    </li>
  </v-clicks>
</ol>
```

- [ ] **Step 2: Patch `timeline.vue`**

Replace the existing `<ol class="wwt-timeline__line">` block with:

```vue
<ol class="wwt-timeline__line" v-auto-animate>
  <v-clicks>
    <li v-for="(e, i) in events" :key="i" class="wwt-timeline__event">
      <div class="wwt-timeline__dot" />
      <div class="wwt-timeline__date">{{ e.date }}</div>
      <div class="wwt-timeline__label">{{ e.label }}</div>
      <p v-if="e.detail" class="wwt-timeline__detail">{{ e.detail }}</p>
    </li>
  </v-clicks>
</ol>
```

- [ ] **Step 3: Patch `stats.vue`**

Replace the existing `<div class="wwt-stats__grid" :data-count="stats.length">`
block with:

```vue
<div class="wwt-stats__grid" :data-count="stats.length" v-auto-animate>
  <v-clicks>
    <Stat
      v-for="(s, i) in stats"
      :key="i"
      :value="s.value"
      :label="s.label"
      :caption="s.caption"
    />
  </v-clicks>
</div>
```

- [ ] **Step 4: Patch `team.vue`**

Replace the existing `<div class="wwt-team__grid">` block with:

```vue
<div class="wwt-team__grid" v-auto-animate>
  <v-clicks>
    <PersonCard
      v-for="m in members"
      :key="m.name"
      :name="m.name"
      :role="m.role"
      :photo="m.photo"
    />
  </v-clicks>
</div>
```

- [ ] **Step 5: Patch `process.vue`**

Replace the existing `<ol class="wwt-process__steps">` block with:

```vue
<ol class="wwt-process__steps" v-auto-animate>
  <v-clicks>
    <li v-for="(step, i) in steps" :key="i" class="wwt-process__step">
      <div class="wwt-process__number">{{ String(i + 1).padStart(2, "0") }}</div>
      <div class="wwt-process__title">{{ step.title }}</div>
      <p v-if="step.detail" class="wwt-process__detail">{{ step.detail }}</p>
    </li>
  </v-clicks>
</ol>
```

- [ ] **Step 6: Verify in dev**

```bash
pnpm dev
```

For each patched slide (agenda, timeline, stats, team, process), confirm
each child item appears on click with a smooth tween instead of an abrupt
swap. Use arrow keys to step through clicks.

- [ ] **Step 7: Commit**

```bash
git add packages/slidev-theme-wwt/layouts
git commit -m "feat(theme): animate reveal layouts with AutoAnimate + v-clicks"
```

---

## Task 44: DarkToggle component in Footer

**Files:**
- Create: `packages/slidev-theme-wwt/components/DarkToggle.vue`
- Modify: `packages/slidev-theme-wwt/components/Footer.vue`

- [ ] **Step 1: Create `DarkToggle.vue`**

```vue
<script setup lang="ts">
import { useDark } from "@slidev/client";

const isDark = useDark();

function toggle() {
  isDark.value = !isDark.value;
}
</script>

<template>
  <button
    type="button"
    class="wwt-dark-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    @click="toggle"
  >
    <span v-if="isDark" aria-hidden="true">☀</span>
    <span v-else aria-hidden="true">☾</span>
  </button>
</template>

<style scoped>
.wwt-dark-toggle {
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  font-size: 14px;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 120ms ease;
}

.wwt-dark-toggle:hover {
  opacity: 1;
}
</style>
```

- [ ] **Step 2: Add `<DarkToggle />` to Footer**

In `packages/slidev-theme-wwt/components/Footer.vue`, replace the existing
template with:

```vue
<template>
  <footer class="wwt-footer">
    <div class="wwt-monogram-mark wwt-footer__monogram" role="img" aria-label="WWT" />
    <span class="wwt-footer__title">{{ $frontmatter?.title ?? "World Wide Technology" }}</span>
    <DarkToggle />
    <span class="wwt-footer__page">{{ currentSlideNo }} / {{ total }}</span>
  </footer>
</template>
```

Update the scoped styles: remove the old `.wwt-footer__monogram img`
declarations and add a sizing override:

```css
.wwt-footer__monogram {
  width: 24px;
  height: 24px;
}
```

(The shared `.wwt-monogram-mark` rule from Task 41 sets the background image
and base size; this override shrinks it to 24px for the footer.)

- [ ] **Step 3: Verify**

```bash
pnpm dev
```

Expected: every interior slide's footer shows a small sun/moon toggle next
to the slide number. Click toggles dark mode. The footer's monogram also
swaps color/white based on dark mode.

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/components
git commit -m "feat(theme): add DarkToggle component and embed in Footer"
```

---

## Task 45: Update READMEs and starter sample

**Files:**
- Modify: `packages/slidev-theme-wwt/README.md` (add Dark mode and Animation sections)
- Modify: `packages/starter/README.md` (mention `D` toggle)
- Modify: `packages/starter/slides.md` (no structural change; the existing
  layouts now auto-reveal via Task 43)

- [ ] **Step 1: Append a "Dark mode" section to theme README**

After the "Typography" section, add:

````markdown
## Dark mode

The theme ships with both light and dark color schemes. Press `D` during a
presentation to toggle, click the sun/moon button in the footer, or pin a
deck to one mode via frontmatter:

```markdown
---
theme: wwt
colorSchema: dark
---
```

Always-dark layouts (`cover`, `section`, `end`, `code-focus`, `image-full`)
stay dark regardless of toggle. Light content layouts swap background, ink,
and monogram colors cleanly.
````

- [ ] **Step 2: Append an "Animation" section to theme README**

After the "Dark mode" section, add:

````markdown
## Animation

The theme combines three layers:

1. **Slidev built-ins** — `v-click`, `v-clicks`, named slide `transition:`
   frontmatter.
2. **AutoAnimate** — `v-auto-animate` directive is registered globally; use
   it on any container whose children appear, disappear, or reorder.
3. **`<v-motion>` presets** — for explicit entrance/exit motion. Examples:

```vue
<v-motion
  :initial="{ y: 24, opacity: 0 }"
  :enter="{ y: 0, opacity: 1 }"
>
  Slide-up entrance
</v-motion>
```

Five built-in layouts use `v-auto-animate` + `<v-clicks>` already:
`agenda`, `timeline`, `stats`, `team`, `process`. Each child appears on
click with a smooth tween.
````

- [ ] **Step 3: Append a `D` toggle note to starter README**

In the "Develop" section, add:

```markdown
Press `D` during the deck to toggle dark mode; press it again to switch back.
```

- [ ] **Step 4: Commit**

```bash
git add packages/slidev-theme-wwt/README.md packages/starter/README.md
git commit -m "docs: cover dark mode and animation patterns"
```

---

## Amended acceptance checklist (add to original list)

- [ ] Pressing `D` toggles dark mode; content slides swap cleanly; always-
  dark slides are unaffected
- [ ] Light-blue H1 contrast ≥3:1 against the dark-mode background
- [ ] Monogram auto-swaps between color and white based on color scheme
- [ ] `agenda`, `timeline`, `stats`, `team`, `process` each reveal children
  on click with a visible AutoAnimate tween
- [ ] Footer shows a discoverable sun/moon toggle
- [ ] `@formkit/auto-animate` is in theme `dependencies` (not `devDependencies`)
- [ ] Theme README has Dark mode and Animation sections
