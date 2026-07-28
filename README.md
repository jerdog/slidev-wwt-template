# slidev-wwt-template

A Slidev theme and starter deck for World Wide Technology (WWT)
presentations.

## What's in here

| Package                                                    | Purpose                         |
| ---------------------------------------------------------- | ------------------------------- |
| [`packages/slidev-theme-wwt`](./packages/slidev-theme-wwt) | Publishable Slidev theme        |
| [`packages/starter`](./packages/starter)                   | Sample deck consuming the theme |

## Quick start

```bash
pnpm install
pnpm dev
```

Open `localhost:3030`. Edit `packages/starter/slides.md` and watch it hot
reload.

## Scripts

| Command          | What it does                     |
| ---------------- | -------------------------------- |
| `pnpm dev`       | Run the starter deck             |
| `pnpm build`     | Build the starter to static HTML |
| `pnpm export`    | Export the starter to PDF        |
| `pnpm lint`      | Run ESLint across the workspace  |
| `pnpm typecheck` | Type-check every package         |
| `pnpm test`      | Run theme unit tests             |
| `pnpm format`    | Prettier-format everything       |

## License

MIT — make a new world happen.
