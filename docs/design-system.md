# Design system

The Hut's look is retro late-night: chunky ink outlines, flat solid colors, extruded 70s headlines, drippy section edges, sunbursts and sparkles. This doc describes the pieces and how they're used. The code is the source of truth for exact values; when in doubt, copy the nearest existing section.

## Principles

- **Flat and solid.** Solid fills with thick ink (`#121210`) outlines. No gradients, blurs or soft drop shadows. Shadows are hard offsets in a solid color.
- **Overlaps use solid colors.** Where shapes overlap, pick a solid color for the overlap rather than stacking translucent layers, which creates darker or lighter patches.
- **Playful but readable.** Slight tilts, stickers and wobble are fine as accents. Menu text, prices and hours must always be easy to read.
- **Subtle motion.** Animation is a nice touch, never a distraction (see Motion).
- **Reuse before inventing.** New sections should be built from the components below with the existing tokens.

## Colors

Defined as Tailwind theme tokens in `src/styles/global.css`. Use them as utilities (`bg-mustard`, `text-cream`, `border-ink`) or as CSS variables (`var(--color-mustard)`). Never hardcode a hex value in a component.

| Token | Hex | Used for |
|---|---|---|
| `ink` | `#121210` | Page background, nav, outlines and keylines, hard shadows, dark sections (Munchie Hour, Rolls & Steaks) |
| `cream` | `#f3e9d2` | Light sections (home Menu, Toasted Subs), headlines on dark or green backgrounds, light cards and buttons |
| `mustard` | `#e0ae2e` | The accent: Order buttons, small uppercase labels on dark backgrounds, sparkles, Find Us / Hungry Yet sections, the Drinks strip |
| `green` | `#3d5541` | Green sections (Hero, Our Vibe, Classics & Munchies, menu hero), item names on light cards |
| `green-deep` | `#2a3b2d` | Darker green inside illustrations |
| `brown` | `#2b1a10` | Body text on light backgrounds, headline extrusion depth, the marquee band |
| `paper` | `#fff9ec` | Menu list cards (Classics, Munchies) |
| `bread`, `meat`, `rim` | `#b7782f`, `#4a2c1a`, `#7a4a2a` | Food illustrations only |
| `stone`, `ash` | `#c9bfa6`, `#7f7a6e` | Muted text in the footer |

Text pairings that work: `cream` or `mustard` on `ink`/`green`/`brown`; `ink`, `brown` or `green` on `cream`/`paper`/`mustard`.

## Typography

| Token | Font | Used for |
|---|---|---|
| `font-display` | Shrikhand | Headlines, section titles, menu item names, big drink prices. Always mixed case. |
| `font-label` | Titan One | Short uppercase labels: nav links, buttons, tags, section subtitles, prices in lists, hours |
| `font-body` | DM Sans (variable) | Paragraphs and item descriptions. The default font. |
| `font-mono` | DM Mono | Defined but currently unused |

Typical sizes (phone → desktop):

- **Section titles:** `StackedText`, sized per section with `clamp()`, roughly 46–104px.
- **Menu item names:** `font-display`, 20–22px → 30px (up to 40px on big cards).
- **List prices:** `font-label`, 17–18px → 24px.
- **Section subtitles:** `font-label uppercase`, 13px → 16px, `tracking-[0.52px]`, usually `text-mustard`.
- **Descriptions and body:** `font-body`, 15–16px → 18–21px, `leading-normal`.

## Components

| Component | Where | Use it for |
|---|---|---|
| `StackedText` | `src/components/StackedText.astro` | Extruded retro headlines: one element plus a stacked text-shadow. Props: `designSize` (font px at full desktop size), `layers` (depth; about 1 per 10px), `outline` (adds an ink keyline for big titles on dark backgrounds), `as` (tag). Never duplicate text elements to fake the extrusion. |
| `PillButton` | `src/components/PillButton.astro` | Every button-style link. Rounded pill, 3px ink border, Titan One uppercase, hard 6px ink shadow that presses in on hover. `variant`: `cream`, `mustard` (primary), `ink`. `size`: `md`, `lg`, `xl`. `external` opens in a new tab. |
| Cards | e.g. `menu-page/RollsSteaks.astro`, `ClassicsMunchies.astro` | `border-4 border-ink`, `rounded-[30px] md:rounded-[36px]`, hard offset shadow (`8px 8px 0` → `12px 12px 0` on desktop) in `ink`, `green` or `mustard`. Fill: `cream`, `paper`, `mustard` or `green`. |
| Leader rows | `.leader` in `global.css` | Menu rows: name, a dotted leader that fills the gap, then the price, like the in-store board. Row is `flex items-baseline`; the leader is `<span class="leader" aria-hidden="true" />`. |
| Tags and chips | e.g. "Pick one" chips in `RollsSteaks.astro` | `rounded-full border-3 border-ink`, Titan One uppercase, 13–15px. |
| `DripBand` | `src/components/DripBand.astro` + `src/data/drips/*.json` | The drippy top edge of a section, in the color of the section above so it looks like that section is dripping down. Bands: `nav-drips` (ink), `hero-drips` (green), `marquee-drips` (brown), `menu-drips` (cream), `gold-drips` (mustard). Each drip stretches slightly on scroll (`src/scripts/drips.ts`). |
| Scallop edge | `src/assets/art/findus/scallop.svg` | Wavy top edge used on mustard sections (Find Us, Hungry Yet), as `<img class="edge-art" data-reveal="drip">`. |
| Sparkles | `src/assets/art/hero/sparkle-*.svg`, `star-*.svg` | Small decorative stars scattered in a section's margins. Add the `twinkle` class for a gentle staggered pulse. Hide the small ones on phones (`max-md:hidden`). |
| Sunburst | `src/assets/art/hero/sunburst.svg`, `vibe/rays.svg`, `menu/rays.svg` | Radiating rays behind green sections, usually at `opacity-50`. |
| Lava blobs | `src/assets/art/munchie/blob-*.svg` | Slow-moving blobs behind ink sections (class `lava`). |
| `Art`, `Layer` | `src/components/Art.astro`, `menu/Layer.astro` | Place pieces of an illustration at fixed design-px coordinates on a scaled canvas. |

## Layout

- **Pages are a stack of full-width sections** with alternating backgrounds (green, brown, cream, ink, green, mustard). A new section should differ from its neighbors, and usually starts with a `DripBand` or scallop in the previous section's color.
- **Content width:** `mx-auto max-w-[1200px]`. Side padding: `px-5 md:px-[clamp(20px,8.3vw,120px)]`.
- **Vertical padding:** set per section in its `<style>` with `clamp()`, e.g. `padding-top: clamp(130px, 13.9vw, 200px)`. Leave room at the top for the drip band.
- **Breakpoints:** Tailwind defaults: `md` 768px, `lg` 1024px, `xl` 1280px. Designs target 390px (phone) and 1440px (desktop). Two-column layouts switch on at `lg`.
- **Scaled art sections:** the hero, menu cards, Our Vibe and footer position art in design px multiplied by a CSS unit variable (`--u`, `--su`, `--sbu`, `--pu`, `--fu`, `--bu`) so the whole composition scales with the screen. Keep the existing numbers when editing, and use the same unit for anything new in that section.
- **Section anchors:** sections that the nav or jump links point to have an `id` and `scroll-mt-24` so the sticky nav doesn't cover their titles.

## Motion

- **Scroll reveals:** add `data-reveal` to an element: `up` (default: fade and rise), `pop` (springy scale-in, for stickers and badges), `fade`, or `drip` (wipes down; for edges). Wrap related elements in `data-reveal-group` to reveal them in sequence. `data-delay="0.2"` delays a lone element.
- **Ambient loops** (sway, float, twinkle, lava, smoke) live in `src/styles/motion.css`. They use the individual `rotate` / `translate` / `scale` CSS properties, never `transform`, so they combine with the reveals. Keep them slow and small.
- **Keep animated layers small.** Don't animate full-screen images.
- **Everything must work without motion.** Reveals only hide content when JavaScript is running and the visitor hasn't asked for reduced motion, and `prefers-reduced-motion` turns animations off. Content must never depend on an animation to be visible.

## Copy voice

- **Tone:** late-night, playful, a little cheeky. Short punchy lines ("Hungry yet?", "Got Munchies?", "The 1AM trifecta.").
- **Names:** subs are named after cannabis strains (Fire OG, Grandaddy Purp, White Widow, Pineapple Express). Keep the wink subtle and never explicit.
- **Facts to keep consistent:** 100% halal, open till 2AM Fri & Sat, Rowan-grown, order on DoorDash.
- **Formatting:**
  - Menu prices have no `$` ("12.99"). Specials and the size guide use `$`.
  - Two prices are written "5.99 / 12.99".
  - Use typographic apostrophes (’), en dashes for ranges ("Mon–Thu", "4PM – 11PM") and a middle dot (·) as a separator.

## Share image and icons

- **Link preview:** `public/og.jpg` (1200×630), a screenshot of `src/pages/share-card.astro`: the green sunburst, the ring-and-owl stage, the "Get Toasted." headline with drips, the tagline and the domain. Regenerate with `npm run share-image` (see `docs/common-tasks.md`).
- **Favicon:** `public/favicon.svg`, the cream owl mark.
- **iPhone icon:** `public/apple-touch-icon.png`, the cream owl on ink, generated from the favicon.

## Code gotchas

- Tailwind utility names can collide with plain class names (e.g. `ring`). Give custom classes distinctive names.
- Astro scoped styles don't reach child components. Style them with `.parent :global(.child)`.
- Images from `src/assets` are imported and used as `src={image.src}`. Decorative images get `alt=""` and `aria-hidden="true"`.
