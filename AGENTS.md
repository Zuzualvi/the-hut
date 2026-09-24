# The Hut: agent notes

## Commands

- Node 24 via `fnm` (`.nvmrc`). Prefix commands with `fnm exec --using=24` if the shell isn't switched.
- `npm run dev` (serves at `/hut/`), `npm run check`, `npm run build`.
- Pushes to `main` deploy to production on Vercel.

## Structure

- `src/pages/index.astro`: the single page; sections live in `src/components/sections/`.
- `src/data/site.ts`: all content (menu, specials, hours, links).
- `src/assets/figma/`: SVG art exported from Figma. Don't redraw or hand-edit it; re-export instead.
- `design/`: raw Figma SVG exports (git-ignored, reference only).

## Conventions

- Positions in art-heavy sections are Figma px multiplied by a CSS unit var (`--u`, `--su`, `--sbu`, `--pu`, `--fu`) so layouts scale proportionally. Keep the Figma numbers when editing.
- Extruded headlines use `StackedText` (one element plus a text-shadow stack), not duplicated text.
- Ambient animation uses the individual `rotate`/`translate`/`scale` CSS properties so it composes with Motion's `transform`-based reveals. Keep it that way.
- Reveal hooks: `data-reveal` (`up`/`pop`/`fade`/`drip`), `data-reveal-group`, `data-delay`. Everything must stay visible with reduced motion or with JS off.
- Keep animated layers small. The hero sunburst sways through a clipped circular window sized to just cover the hero; the Our Vibe rays stay still.
- Tailwind utility names collide with plain class names (e.g. `ring`), so pick distinctive class names.
- Scoped styles don't reach child components; use `.parent :global(.child)`.
- `CLAUDE.md` is a symlink to this file; edit this file, not the link.
