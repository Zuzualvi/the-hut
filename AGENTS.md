# The Hut: agent notes

Marketing site for The Hut, a friend's late-night sub shop in Glassboro, NJ. The owner (Zuhayr) is a product manager building coding experience, so explain architectural choices briefly and ask before committing or pushing.

## Where things live

- **Live preview:** https://www.zuhayr.io/hut (shared with the restaurant owners for review).
- **Repo:** github.com/Zuzualvi/the-hut (private). Pushes to `main` auto-deploy to production.
- **Vercel:** project `the-hut` (team `zuhayr-alvis-projects`), production alias https://the-hut-kappa.vercel.app/hut.
- **The `/hut` proxy:** lives in the main site repo, github.com/Zuzualvi/Website (Vercel project `zuhayr-portfolio`, local clone `~/Claude/projects/website`). `next.config.ts` rewrites `/hut/*` to the-hut-kappa. This repo's `vercel.json` also maps `/hut/*` to `/` so the Vercel URL works directly.
- **Design:** Figma file `72Oe1dgJOTnV3NcJuHebFC` ("Website"), page "The Hut — Trippy v2" (node `15:22`); desktop frame `16:22`, mobile frame `20:33`.

## Status and open items

- All 8 sections are built to match the desktop and mobile designs. Scroll reveals and ambient motion are done.
- **On trial:** the hero sunburst sway runs on all screen sizes, and the owner is testing phone smoothness. If it stutters on mobile, wrap the `.sunburst-wrap` rule in `src/styles/motion.css` in `@media (min-width: 1024px)`.
- **Confirmed hours (2026-09-26):** Mon–Thu 4–11PM, Fri–Sat 4PM–2AM, Sunday closed.
- **Not yet confirmed with the owners:** address, prices, specials, and the Instagram handle `@thehutglassboro`. All were copied from the design.
- **Menu page:** `src/pages/menu.astro` (served at `/hut/menu/`), built from Figma frames "Desktop — Menu (1440)" `45:43` and "Mobile — Menu (390)" `50:48`. Menu content comes from the in-store board and lives in `src/data/site.ts`. "View …" and "Menu" links go to the menu page; only "Order" buttons go to DoorDash.
- **Later:** move to the restaurant's own domain (steps in README).

## Figma access

- The Figma MCP is on a Full seat (Pro plan) as of 2026-09-26, so the old 6-reads-per-month cap no longer applies. Read and edit the file directly with `use_figma`.
- Shared brand pieces are components in the "Brand kit" frame on the "The Hut — Website v1" page (e.g. `Logo/Tagline` `5:2`). Editing one changes every instance on both pages.
- `Logo/Tagline` is traced from the real sign lettering (source: a PNG from the owners). Its "Late night" is stacked on two lines at about half the cap height of "Toasted Subs".
- The older `design/desktop.svg` and `design/mobile.svg` exports are out of date. Pull art straight from Figma instead.

## Commands

- Node 24 via `fnm` (`.nvmrc`). Prefix commands with `fnm exec --using=24` if the shell isn't switched; the system default is Node 20.
- `npm run dev` (serves at `/hut/`), `npm run check`, `npm run build`, `npx astro preview` (serves `dist/` at `/hut/`).
- Stop servers when done: `lsof -nP -tiTCP:4321 -sTCP:LISTEN | xargs kill`.

## Structure

- `src/pages/index.astro`: the home page; sections live in `src/components/sections/`.
- `src/pages/menu.astro`: the full menu; sections live in `src/components/menu-page/`.
- `src/data/site.ts`: all content (full menu, specials, hours, links, DoorDash URL). Internal links use `HOME_URL`/`MENU_URL` so they carry the `/hut` base path.
- `src/assets/figma/`: SVG art exported from Figma. Don't redraw or hand-edit it; re-export instead.
- `src/styles/global.css`: color and font tokens. `src/styles/motion.css`: ambient CSS animation. `src/scripts/motion.ts`: Motion scroll reveals and marquee speed-up.

## Conventions

- Positions in art-heavy sections are Figma px multiplied by a CSS unit var (`--u`, `--su`, `--sbu`, `--pu`, `--fu`) so layouts scale proportionally. Keep the Figma numbers when editing.
- Extruded headlines use `StackedText` (one element plus a text-shadow stack), not duplicated text.
- Ambient animation uses the individual `rotate`/`translate`/`scale` CSS properties so it composes with Motion's `transform`-based reveals. Keep it that way.
- Reveal hooks: `data-reveal` (`up`/`pop`/`fade`/`drip`), `data-reveal-group`, `data-delay`. Everything must stay visible with reduced motion or with JS off.
- Keep animated layers small. The hero sunburst sways through a clipped circular window sized to just cover the hero; the Our Vibe rays stay still.
- Tailwind utility names collide with plain class names (e.g. `ring`), so pick distinctive class names.
- Scoped styles don't reach child components; use `.parent :global(.child)`.
- `CLAUDE.md` is a symlink to this file; edit this file, not the link.

## Visual testing gotchas

- Headless Chrome has a 500px minimum viewport. For phone widths, screenshot a page that iframes the site at 390px.
- `--virtual-time-budget` doesn't advance Motion animations reliably, so reveals look half-finished. Use `--timeout=5000` (real time) to judge animation end states.
- Background browser tabs pause animation frames, so frame-rate checks in a non-visible tab are meaningless.
