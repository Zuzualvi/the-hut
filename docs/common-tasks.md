# Common tasks

Recipes for everyday edits. Each one ends the same way: check your work and open a PR (see `docs/workflow.md`).

## Where each fact appears

All prices live only in `src/data/site.ts`. Everything that shows a price (menu page, home page cards, fan faves, size guide) reads it from there. A few other facts are also written into page copy or art; when one of these changes, update every place listed.

| Fact | Places |
|---|---|
| Sub prices (half / whole) | `SUB_PRICES` only |
| Any other price | That item in `site.ts` only. The home page cards work out their own price ("12.99", or "From 2.99" for the cheapest item). |
| Hours | `HOURS` (both the display text and the `open` times for Google). "Open till 2AM" also appears in the hero sticker art, the hero's screen-reader text (`sections/Hero.astro`), and the Our Vibe badge (`sections/OurVibe.astro`, art + alt text). |
| Address | `ADDRESS` (Find Us, Hungry Yet, the footer, the map link and Google's business details all read it). If the shop moves, also update the map pin in `GEO` next to it. |
| Phone | `PHONE` only (Find Us, the footer and Google's business details) |
| DoorDash link | `ORDER_URL` (every Order button uses it) |
| Instagram | `INSTAGRAM_HANDLE` |
| Copyright year | `sections/Footer.astro` |

Text that's part of an illustration (the "Open till 2AM" sticker and badge, "Est. 2026", "100% Halal") can't be edited as text. If it needs to change, flag it in the PR as needing new art.

## Change a price

1. For subs, change `SUB_PRICES` in `src/data/site.ts`. All subs cost the same per size.
2. For anything else, find the item (`KATI_ROLLS`, `CHEESESTEAKS`, `CLASSICS`, `MUNCHIES`, `DRINKS`) and change its `price`. Menu prices have no `$`. Two prices are written "5.99 / 12.99".
3. That's it. The home page cards update themselves.

## Add, rename or remove a menu item

1. Edit the right array in `src/data/site.ts`. Items are `{ name, price, desc? }`. `desc` is an optional small line under the name (e.g. "6 pieces").
2. Subs are grouped in `SUB_GROUPS` and have a `style` instead of a price, since all subs use `SUB_PRICES`. A sub whose name matches a `FAN_FAVES` entry gets a "fan fave" marker automatically.
3. Check the menu page at phone and desktop widths. Long names should wrap cleanly and leave room for the dotted leader and price.

## Change hours

1. Edit `HOURS` in `src/data/site.ts`. Each entry has what the site shows (`days: 'Mon–Thu'`, `time: '4PM – 11PM'`) and the same hours for Google (`open`: full day names and 24-hour `opens` / `closes`; a close earlier than the open means after midnight). Update both. A closed day has no `open`.
2. Hours show in Find Us (home) and Hungry Yet (menu page), and in search results via the business details in `src/layouts/Layout.astro`.
3. If the late-night closing time changes, the "Open till 2AM" art and its text need updating too (see the table above).

## Change the Munchie Hour specials

1. Edit `SPECIALS` in `src/data/site.ts`: `tag` (small label), `title`, `body`, `price` (with `$` or a phrase like "10% off"), `tone` (`cream`, `mustard` or `green`), and `tilt` (a small angle between -3 and 3).
2. Keep three specials with three different tones so the row stays balanced. If the count changes, check the layout at all widths.

## Change links

`ORDER_URL` (DoorDash), `MAPS_URL`, `INSTAGRAM_HANDLE` and `NAV_LINKS` are at the top of `src/data/site.ts`. Internal links must use `HOME_URL` / `MENU_URL`, not hardcoded paths.

## Change the page title or search description

The home page defaults are in `src/layouts/Layout.astro` (`title`, `SITE_DESCRIPTION`). The menu page passes its own in `src/pages/menu.astro`. The same title and description appear in link previews when someone shares the page.

## Update the link-preview image

When someone shares a link in iMessage, WhatsApp, Instagram and similar apps, the preview shows `public/og.jpg`. That image is a screenshot of `src/pages/share-card.astro`, a 1200×630 page built from the hero's art.

1. Edit `src/pages/share-card.astro`. Keep important text away from the edges; some apps crop the preview to a square.
2. `npm run build && npm run share-image`. This needs Chrome (set `CHROME_PATH` if it isn't found), and also regenerates the iPhone home-screen icon from `public/favicon.svg`.
3. Look at `public/og.jpg`. It must stay under about 300 KB, or WhatsApp won't show it.
4. Apps cache previews per link, so links that were already shared keep the old preview.

## Edit copy

Headlines and paragraphs live in the section components (`src/components/sections/`, `src/components/menu-page/`). Follow the copy voice in `docs/design-system.md`. Headlines use `StackedText`; keep them short, or they'll wrap awkwardly at desktop sizes.

On both pages, the small pill above the big headline is the page's main heading (`<h1>`): it tells search engines what the page is about, so keep it plain and descriptive ("Toasted subs & sandwiches in Glassboro, NJ"). The big headline ("Get Toasted.", "Got Munchies?") is display text and can stay playful.

## Add a photo

1. Put the image in `src/assets/photos/`: JPG or WebP, at least 1600px on its long side, under about 1 MB.
2. Import it and render it with Astro's `<Image>` from `astro:assets`, which resizes and compresses it. Always write meaningful `alt` text.
3. Frame it the house way: a thick ink border, rounded or blob-shaped, on a section background, never a bare rectangle.
4. The Our Vibe section still shows an owl placeholder where a crew photo belongs. Swapping in a real photo means clipping it to that blob shape and keeping the ink outline. Describe your approach before building it.

## Add a new section

1. Create a component in `src/components/sections/` (home) or `src/components/menu-page/` (menu page), and add it to the page in `src/pages/`.
2. Copy the structure of a similar existing section. `menu-page/HungryYet.astro` is the simplest.
3. Choose a background that differs from the sections above and below, and start with a `DripBand` or scallop in the previous section's color.
4. Build it only from existing tokens and components (`docs/design-system.md`). Put any new content data in `src/data/site.ts`.
5. Add `data-reveal` / `data-reveal-group` for entrance animation, and check that it still reads with reduced motion.
6. If the nav or jump links should point to it, give it an `id` with `scroll-mt-24` and add the link to `NAV_LINKS` (home sections) or the `jumps` list in `menu-page/MenuHero.astro`.
