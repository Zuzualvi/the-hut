# The Hut: agent notes

Marketing site for The Hut, a late-night sub shop in Glassboro, NJ: a home page and a full menu page, built from the Figma designs.

## Where things live

- **Live site:** https://thehutglassboro.com (home) and https://thehutglassboro.com/menu.
- **Repo:** github.com/Zuzualvi/the-hut (public, so any collaborator's commits deploy without a paid Vercel seat). Pushes to `main` auto-deploy to production in about 30 seconds; other branches get Vercel preview URLs. A ruleset ("Protect main") blocks force-pushes and deleting `main`; PRs aren't required. Vercel fork protection is on, so outside PRs don't build until approved. Never commit secrets; there are none today.
- **Vercel:** project `the-hut` (team `zuhayr-alvis-projects`), production domain `thehutglassboro.com` (registered through Vercel, Vercel DNS, auto-renew on; `www.` redirects to the bare domain). Also served at https://the-hut-kappa.vercel.app.
- **Old preview links:** the site used to be proxied at zuhayr.io/hut. The main site repo, github.com/Zuzualvi/Website (Vercel project `zuhayr-portfolio`, local clone `~/Claude/projects/website`), now permanently redirects `/hut/*` to thehutglassboro.com in `next.config.ts`.
- **DNS records** (e.g. for email or Google verification) are added in Vercel under the domain, or with `vercel dns add thehutglassboro.com <name> <type> <value>`.
- **Design:** Figma file `72Oe1dgJOTnV3NcJuHebFC` ("Website"), page "The Hut — Trippy v2" (node `15:22`). Frames: home desktop `16:22`, home mobile `20:33`, menu desktop `45:43`, menu mobile `50:48`.

## Status

- Home and menu pages are built to match the desktop and mobile designs and are live. Scroll reveals, ambient motion and scroll-driven drips are done.
- Menu content comes from the restaurant's in-store menu board and lives in `src/data/site.ts`. "View …" and "Menu" links go to the menu page; only "Order" buttons go to DoorDash.
- The Find Us map is a lo-fi street map (Mullica Hill Rd, Delsea Dr, N Main St, Carpenter St, Bowe Blvd, Heston Rd, Rowan campus) exported from Figma as one SVG.

## Figma

- Read and edit the file directly with the Figma MCP (`use_figma`); design changes happen in Figma first, then get built.
- Shared brand pieces are components in the "Brand kit" frame on the "The Hut — Website v1" page (e.g. `Logo/Tagline` `5:2`). Editing one changes every instance on both pages.
- `Logo/Tagline` is traced from the real sign lettering; "Late-night" sits on one line at about half the cap height of "Toasted Subs".
- To get art out of Figma, prefer `download_assets` (saves a file, keeps big SVGs out of context) or `exportAsync` for small pieces. Its exports can include parent-frame background rects; strip them.
- The older `design/desktop.svg` and `design/mobile.svg` exports are out of date.

## Commands

- Node 24 via `fnm` (`.nvmrc`). Prefix commands with `fnm exec --using=24` if the shell isn't switched; the system default is Node 20.
- `npm run dev`, `npm run check`, `npm run build`, `npx astro preview` (serves `dist/`). All serve at http://localhost:4321/.
- Stop servers when done: `lsof -nP -tiTCP:4321 -sTCP:LISTEN | xargs kill`.

## Structure

- `src/pages/index.astro`: the home page; sections live in `src/components/sections/`.
- `src/pages/menu.astro`: the full menu; sections live in `src/components/menu-page/`.
- `src/data/site.ts`: all content (full menu, specials, hours, links, DoorDash URL). Internal links use `HOME_URL`/`MENU_URL` so they carry Astro's base path.
- `src/assets/figma/`: SVG art exported from Figma. Don't redraw or hand-edit it; re-export instead.
- Drip bands are inline SVGs (`src/components/DripBand.astro`) built from `src/data/drips/*.json`; `src/scripts/drips.ts` springs each drip on scroll (tuning constants `MAX`, `GAIN`, `DAMPING` at the top). Regenerate a band with `node scripts/split-drips.mjs <name> <original Figma SVG>`; the originals are in git history at `aa53908` under `src/assets/figma/`.
- `src/styles/global.css`: color and font tokens, `.edge-art`, `.leader`. `src/styles/motion.css`: ambient CSS animation. `src/scripts/motion.ts`: Motion scroll reveals and marquee speed-up.

## Conventions

- Positions in art-heavy sections are Figma px multiplied by a CSS unit var (`--u`, `--su`, `--sbu`, `--pu`, `--fu`) so layouts scale proportionally. Keep the Figma numbers when editing.
- Extruded headlines use `StackedText` (one element plus a text-shadow stack), not duplicated text.
- Ambient animation uses the individual `rotate`/`translate`/`scale` CSS properties so it composes with Motion's `transform`-based reveals. Keep it that way.
- Reveal hooks: `data-reveal` (`up`/`pop`/`fade`/`drip`), `data-reveal-group`, `data-delay`. Everything must stay visible with reduced motion or with JS off.
- Keep animated layers small. The hero sunburst sways through a clipped circular window sized to just cover the hero; the Our Vibe rays stay still.
- Tailwind utility names collide with plain class names (e.g. `ring`), so pick distinctive class names.
- Scoped styles don't reach child components; use `.parent :global(.child)`.
- `CLAUDE.md` is a symlink to this file; edit this file, not the link. Personal, non-shared notes go in the gitignored `CLAUDE.local.md`.

## Visual testing gotchas

- Headless Chrome has a 500px minimum viewport. For phone widths, screenshot a page that iframes the site at 390px.
- `--virtual-time-budget` doesn't advance Motion animations reliably, so reveals look half-finished. Use `--timeout=5000` (real time), or `--force-prefers-reduced-motion` to see end states.
- Background browser tabs pause animation frames, so frame-rate checks in a non-visible tab are meaningless.
- To test scroll-driven motion, drive headless Chrome over the DevTools protocol (`--remote-debugging-port`, Node 24 for the built-in `WebSocket`). The site sets `scroll-behavior: smooth`, so scripted scrolling must use `scrollBy({ top, behavior: 'instant' })`. `Page.captureScreenshot` clip coordinates are page coordinates, not viewport.
