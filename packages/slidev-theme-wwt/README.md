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
