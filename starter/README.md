# WWT Slidev Starter

A ready-to-edit Slidev deck that consumes `slidev-theme-wwt`.

## Develop

```bash
pnpm install            # from the repo root
pnpm dev                # opens localhost:3030
```

Edit `slides.md` and Slidev hot-reloads on save.
Press `D` during the deck to toggle dark mode; press it again to switch back.

## Export

```bash
pnpm build              # static site → dist/
pnpm export             # PDF → slides-export.pdf
```

## Author a new deck

1. Copy this `starter/` directory anywhere outside this repo and rename it.
2. In the copy's `package.json`, replace the `workspace:*` dependency on
   `slidev-theme-wwt` with `github:jerdog/slidev-wwt-template` (see the
   root [README's Install section](../README.md#install)).
3. Edit `slides.md` and the assets under `public/`.

## Layouts available

See the root [README](../README.md#layouts) for the full layout catalog,
frontmatter reference, and custom CSS/styling hooks.

## Tone

Write in the WWT voice: purposeful, bold and confident, beautifully simple,
refreshing. Sign off with "Make a new world happen."
