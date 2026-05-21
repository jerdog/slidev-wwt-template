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
