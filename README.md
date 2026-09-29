# The Hut

Marketing site for The Hut, a late-night sub shop in Glassboro, NJ: a home page and a full menu page. Built from the Figma file "Website" → page "The Hut — Trippy v2".

Live: https://thehutglassboro.com · menu: https://thehutglassboro.com/menu

## Stack

- **Astro**: static HTML, near-zero JS
- **Tailwind v4**: color and font tokens live in `src/styles/global.css`
- **Motion**: scroll reveals (`src/scripts/motion.ts`); ambient loops are CSS (`src/styles/motion.css`)

## Develop

```sh
fnm use          # Node 24 (.nvmrc)
npm install
npm run dev      # http://localhost:4321/
npm run check    # type-check
npm run build
```

## Deploy

Pushes to `main` deploy to production on Vercel (project `the-hut`, https://thehutglassboro.com). Other branches get preview deployments.

The domain is registered through Vercel, which also runs its DNS. `www.thehutglassboro.com` redirects to the bare domain. Old `zuhayr.io/hut` links redirect here (set in the zuhayr.io repo's `next.config.ts`).

## Edit content

The full menu, prices, specials, hours, and links are in `src/data/site.ts`.
