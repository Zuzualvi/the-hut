# Common tasks

Recipes for everyday edits. Each one ends the same way: check your work and open a PR (see `docs/workflow.md`).

## Where each fact appears

Most content lives in `src/data/site.ts`, but a few facts are repeated in page copy or summaries. When one of these changes, update every place listed.

| Fact | Places |
|---|---|
| Sub prices (half / whole) | `SUB_SIZES`, the Toasted Subs entry in `MENU_CATEGORIES`, each `FAN_FAVES` price (`site.ts`); the two hardcoded price lines in `src/components/menu-page/SubsSection.astro` |
| Kati roll or cheesesteak prices | `KATI_ROLLS` / `CHEESESTEAKS`, and that category's price in `MENU_CATEGORIES` (the home page card) |
| Cheapest Classics or Munchies item | The "From x.xx" price for that category in `MENU_CATEGORIES` |
| Hours | `HOURS`. "Open till 2AM" also appears in the hero sticker art, the hero's screen-reader text (`sections/Hero.astro`), and the Our Vibe badge (`sections/OurVibe.astro`, art + alt text). |
| Address | `MAPS_URL`, `sections/FindUs.astro`, `menu-page/HungryYet.astro` |
| DoorDash link | `ORDER_URL` (every Order button uses it) |
| Instagram | `INSTAGRAM_HANDLE` |
| Copyright year | `sections/Footer.astro` |

Text that's part of an illustration (the "Open till 2AM" sticker and badge, "Est. 2026", "100% Halal") can't be edited as text. If it needs to change, flag it in the PR as needing new art.

## Change a price

1. Find the item in `src/data/site.ts` (`SUB_SIZES`, `KATI_ROLLS`, `CHEESESTEAKS`, `CLASSICS`, `MUNCHIES`, `DRINKS`).
2. Change `price`. Menu prices have no `$`.
3. Update any other place from the table above.

## Add, rename or remove a menu item

1. Edit the right array in `src/data/site.ts`. Items are `{ name, price, desc? }`. `desc` is an optional small line under the name (e.g. "6 pieces").
2. Subs are grouped in `SUB_GROUPS` and have a `style` instead of a price, since all subs share the sizes in `SUB_SIZES`. A sub whose name matches a `FAN_FAVES` entry gets a "fan fave" marker automatically.
3. If it's now the cheapest item in Classics or Munchies, update "From x.xx" in `MENU_CATEGORIES`.
4. Check the menu page at phone and desktop widths. Long names should wrap cleanly and leave room for the dotted leader and price.

## Change hours

1. Edit `HOURS` in `src/data/site.ts`. Format: `{ days: 'Mon–Thu', time: '4PM – 11PM' }`.
2. Hours show in Find Us (home) and Hungry Yet (menu page).
3. If the late-night closing time changes, the "Open till 2AM" art and its text need updating too (see the table above).

## Change the Munchie Hour specials

1. Edit `SPECIALS` in `src/data/site.ts`: `tag` (small label), `title`, `body`, `price` (with `$` or a phrase like "10% off"), `tone` (`cream`, `mustard` or `green`), and `tilt` (a small angle between -3 and 3).
2. Keep three specials with three different tones so the row stays balanced. If the count changes, check the layout at all widths.

## Change links

`ORDER_URL` (DoorDash), `MAPS_URL`, `INSTAGRAM_HANDLE` and `NAV_LINKS` are at the top of `src/data/site.ts`. Internal links must use `HOME_URL` / `MENU_URL`, not hardcoded paths.

## Change the page title or search description

The home page defaults are in `src/layouts/Layout.astro` (`title`, `description`). The menu page passes its own in `src/pages/menu.astro`.

## Edit copy

Headlines and paragraphs live in the section components (`src/components/sections/`, `src/components/menu-page/`). Follow the copy voice in `docs/design-system.md`. Headlines use `StackedText`; keep them short, or they'll wrap awkwardly at desktop sizes.

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
