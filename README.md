# The Hut

Marketing site for The Hut, a late-night sub shop in Glassboro, NJ: a home page and a full menu page. Built from the Figma file "Website" → page "The Hut — Trippy v2".

Preview: https://www.zuhayr.io/hut · menu: https://www.zuhayr.io/hut/menu

## Stack

- **Astro**: static HTML, near-zero JS
- **Tailwind v4**: color and font tokens live in `src/styles/global.css`
- **Motion**: scroll reveals (`src/scripts/motion.ts`); ambient loops are CSS (`src/styles/motion.css`)

## Develop

```sh
fnm use          # Node 24 (.nvmrc)
npm install
npm run dev      # http://localhost:4321/hut/
npm run check    # type-check
npm run build
```

## Deploy

Pushes to `main` deploy to production on Vercel (project `the-hut`, https://the-hut-kappa.vercel.app/hut). Other branches get preview deployments.

## Edit content

The full menu, prices, specials, hours, and links are in `src/data/site.ts`.

## Moving to the restaurant's own domain

1. Add the domain to this project in Vercel.
2. Set env vars `BASE_PATH=/` and `SITE_URL=https://<domain>`, then redeploy.
3. Remove the `/hut` rewrite from the zuhayr.io repo (`next.config.ts`).
4. Remove the `noindex` meta in `src/layouts/Layout.astro`.
