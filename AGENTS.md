# The Hut: agent guide

Website for The Hut, a late-night toasted-sub shop at 709 N. Main St., Glassboro, NJ. Live at https://thehutglassboro.com: a home page (`/`) and a full menu page (`/menu`).

This repo is the single source of truth for the site: content, code and design. The people asking you for changes are usually the restaurant's owners and aren't developers, so explain what you changed in plain words and keep them out of technical weeds.

## Rules

1. **Never push to `main`.** Work on a branch, open a pull request, squash-merge it. Merging to `main` puts the change live in about 30 seconds. Read `docs/workflow.md` before your first commit.
2. **Ask before merging.** Show the person what changed, and merge only when they say so. After merging, check the live site.
3. **Content lives in `src/data/site.ts`.** Menu items, prices, hours, specials and links are all there, and every price is set only there. A few other facts are also written into page copy or art; `docs/common-tasks.md` lists every place each one appears.
4. **Match the existing look.** Before adding or restyling anything, read `docs/design-system.md` and reuse its colors, fonts and components. Don't invent new colors, fonts or effects.
5. **Don't draw new illustrations or hand-edit the SVGs in `src/assets/art/`.** Reuse existing art. If a change needs new art, say so and leave a note in the PR.
6. **Nothing secret goes in this repo.** It's public. There are no API keys or environment variables, and there shouldn't be.
7. **Keep it working for everyone:** phone and desktop, reduced motion, and JavaScript turned off (see `docs/design-system.md` → Motion).

## Where things are

| Path | What it is |
|---|---|
| `src/data/site.ts` | All content: menu, prices, hours, specials, links, DoorDash URL |
| `src/pages/index.astro`, `src/pages/menu.astro` | The two pages; each is a list of sections |
| `src/components/sections/` | Home page sections (Hero, Marquees, Menu, Munchie Hour, Our Vibe, Find Us, Footer) |
| `src/components/menu-page/` | Menu page sections |
| `src/components/` | Shared pieces: `Nav`, `PillButton`, `StackedText`, `DripBand`, `Art` |
| `src/styles/global.css` | Color and font tokens, shared CSS (`.edge-art`, `.leader`) |
| `src/styles/motion.css`, `src/scripts/motion.ts`, `src/scripts/drips.ts` | Ambient animation, scroll reveals, stretchy drips |
| `src/assets/art/` | SVG illustrations, grouped by section |
| `src/data/drips/*.json`, `scripts/split-drips.mjs` | Drip band shapes and the script that generates them |
| `scripts/flower-of-life.mjs` | Generates the hero's inner ring with its Flower of Life pattern |
| `src/layouts/Layout.astro` | Page `<head>`: title, description, link-preview tags, business details for Google |
| `src/pages/share-card.astro`, `scripts/share-image.mjs`, `public/og.jpg` | The link-preview image and how it's made |
| `public/` | Favicon, iPhone icon, `robots.txt`, share image. The sitemap is generated on build. |
| `vercel.json` | Redirects (`/sitemap.xml` points to the generated `/sitemap-index.xml`) |
| `docs/` | Workflow, design system and task recipes |

## Stack

Astro (static HTML, very little JavaScript), Tailwind CSS v4 and the Motion library, hosted on Vercel. Node 24 (`.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:4321/
npm run share-image  # regenerate the link-preview image (see docs/common-tasks.md)
npm run check    # type-check
npm run build    # production build into dist/
```

## Docs

- `docs/workflow.md`: branches, PRs, deploys, undoing a change, checking your work.
- `docs/design-system.md`: colors, type, components, layout, motion, copy voice.
- `docs/common-tasks.md`: step-by-step recipes for everyday edits.

`CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`, not the link. Personal notes that shouldn't be shared go in a gitignored `CLAUDE.local.md`.
