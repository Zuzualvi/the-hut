// Single source of truth for links and menu content. Edit prices here.

export const ORDER_URL =
  'https://www.doordash.com/store/the-hut-glassboro-51518273/120066347/?pickup=true';

// Internal links carry Astro's base path so they keep working if the site moves under a subpath.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const HOME_URL = `${BASE}/`;
export const MENU_URL = `${BASE}/menu/`;

export const NAV_LINKS = [
  { label: 'Menu', href: MENU_URL },
  { label: 'Munchie Hour', href: `${HOME_URL}#munchie-hour` },
  { label: 'Our Vibe', href: `${HOME_URL}#our-vibe` },
  { label: 'Find Us', href: `${HOME_URL}#find-us` },
];

export type MenuArt = 'subs' | 'steaks' | 'rolls' | 'classics' | 'munchies';

// Every sub costs the same per size. Change sub prices here; the size guide,
// group headers, fan faves and home page card all read from it.
export const SUB_PRICES = { half: '8.99', full: '15.99' };
const SUB_PRICE_PAIR = `${SUB_PRICES.half} / ${SUB_PRICES.full}`;

export type Sticker = 'fire-og' | 'grandaddy-purp' | 'white-widow' | 'pineapple-express';

export const FAN_FAVES: {
  name: string;
  flavor: string;
  price: string;
  sticker: Sticker;
  text: string;
  tilt: number;
}[] = [
  { name: 'Fire OG', flavor: 'Buffalo', price: SUB_PRICE_PAIR, sticker: 'fire-og', text: 'text-green', tilt: 6 },
  { name: 'Grandaddy Purp', flavor: 'BBQ', price: SUB_PRICE_PAIR, sticker: 'grandaddy-purp', text: 'text-cream', tilt: -4 },
  { name: 'White Widow', flavor: 'Chicken Bacon Ranch', price: SUB_PRICE_PAIR, sticker: 'white-widow', text: 'text-ink', tilt: 3 },
  { name: 'Pineapple Express', flavor: 'Teriyaki', price: SUB_PRICE_PAIR, sticker: 'pineapple-express', text: 'text-cream', tilt: -7 },
];

export const SITE_NAME = 'The Hut';
// `tel` is the dialable form used for tap-to-call links and Google's business details.
export const PHONE = { display: '(856) 355-8899', tel: '+18563558899' };
export const ADDRESS = { street: '709 N. Main St.', city: 'Glassboro', region: 'NJ', zip: '08028' };
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${ADDRESS.street} ${ADDRESS.city} ${ADDRESS.region} ${ADDRESS.zip}`,
)}`;
export const INSTAGRAM_HANDLE = 'thehutglassboro';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// `days` and `time` are what the site shows. `open` is the same thing for Google
// (24-hour times; a close earlier than the open means after midnight). Update both.
export const HOURS: { days: string; time: string; open?: { days: string[]; opens: string; closes: string } }[] = [
  { days: 'Mon–Thu', time: '4PM – 11PM', open: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '16:00', closes: '23:00' } },
  { days: 'Fri–Sat', time: '4PM – 2AM', open: { days: ['Friday', 'Saturday'], opens: '16:00', closes: '02:00' } },
  { days: 'Sunday', time: 'Closed' },
];

export const SPECIALS = [
  {
    tag: 'Mon–Thu · after 10PM',
    title: 'The Night Owl',
    body: 'Any half toasted sub, fries and a brownie. The 1AM trifecta.',
    price: '$13.99',
    tone: 'cream',
    tilt: -2,
  },
  {
    tag: 'Rowan students',
    title: 'Show Ya ID',
    body: 'Flash your Rowan ID at the counter for 10% off any whole sub.',
    price: '10% off',
    tone: 'mustard',
    tilt: 2,
  },
  {
    tag: 'Fri & Sat',
    title: 'Munchie Box',
    body: 'Not’so Nachos, Mac & Cheese Bites and two fries. Built for the group chat.',
    price: '$21.99',
    tone: 'green',
    tilt: -1.5,
  },
] as const;

// ---------------------------------------------------------------------------
// Full menu (from the in-store menu board). Subs have no per-item price; they
// all use SUB_PRICES (above).

export const SUB_SIZES = [
  { size: 'Half', inches: '6"', nickname: 'Quick Hit', price: `$${SUB_PRICES.half}` },
  { size: 'Full', inches: '12"', nickname: 'Heavy Hands', price: `$${SUB_PRICES.full}` },
];
export const ALL_THE_WAY = ['Lettuce', 'Red Onion', 'Tomato', 'Shake', 'House Dressing'];
export const SHAKE = 'Our house seasoning: parmesan, oregano, basil, onion powder, parsley, salt & pepper.';

type Sub = { name: string; style: string; desc: string };
const FAVE_NAMES = new Set(FAN_FAVES.map((f) => f.name));
const withFaves = (items: Sub[]) => items.map((i) => ({ ...i, fave: FAVE_NAMES.has(i.name) }));

export const SUB_GROUPS = [
  {
    title: 'Chicken',
    items: withFaves([
      { name: 'Fire OG', style: 'Buffalo', desc: 'Cheddar, jalapeño, green bell pepper, black olives' },
      { name: 'Mediterranean Kush', style: 'Greek', desc: 'Feta, olives, banana peppers, spring mix' },
      { name: 'Grandaddy Purp', style: 'BBQ', desc: 'Swiss' },
      { name: 'White Widow', style: 'Chicken Bacon Ranch', desc: 'Provolone, ranch, beef bacon' },
      { name: 'Marinara Haze', style: 'Chicken Parm', desc: 'Mozzarella, marinara' },
      { name: 'Pineapple Express', style: 'Teriyaki', desc: 'Pepper jack, pineapple, green bell peppers' },
    ]),
  },
  {
    title: 'Turkey & Veggie',
    items: withFaves([
      { name: 'Turkey Trainwreck', style: 'Turkey', desc: 'Provolone, mayo, beef bacon' },
      { name: 'Green Crack', style: 'Veggie', desc: 'Feta cheese, guacamole, spring mix, cucumbers, mushrooms, olives, green pepper' },
    ]),
  },
];

export const KATI_ROLLS = [
  { name: 'Chicken or Paneer', price: '6.99', desc: 'Paratha, red onions, white sauce, mint chutney', choices: ['Chicken', 'Paneer'] },
];

export const CHEESESTEAKS = [
  { name: 'Beef', price: '12.99', desc: 'Provolone, grilled onions, green bell peppers' },
  { name: 'Chicken', price: '12.99', desc: 'American, grilled onions, buffalo sauce' },
];

export const CLASSICS = [
  { name: 'Grilled Cheese', price: '4.99' },
  { name: 'Tomato Soup', price: '2.99' },
  { name: 'Wake and Bake', price: '7.99', desc: 'Bagel, turkey sausage, egg, cheese' },
  { name: 'Grilled PB&J', price: '2.99' },
  { name: 'Chicken Nuggets', price: '5.99', desc: '6 pieces' },
];

export const MUNCHIES = [
  { name: 'Not’so Nachos', price: '5.99 / 12.99', desc: 'Doritos, colby jack, jalapeño, red onions, black olives, hot sauce, ranch' },
  { name: 'Fries', price: '3.99', desc: 'Add cajun' },
  { name: 'Mac & Cheese Bites', price: '5.99' },
  { name: 'Chips / Brownies', price: '1.99' },
];

export const DRINKS = [
  { name: 'Soda Cans', price: '1.99' },
  { name: 'Water', price: '1.50' },
  { name: 'Energy Drinks & Glass Bottles', price: '2.99' },
  { name: 'Can + Chip Combo', price: '2.99' },
];

// Home page category cards: prices come from the menu above, so they never drift.
// One price if every item costs the same, otherwise "From" the cheapest.
function priceLabel(items: readonly { price: string }[]) {
  const prices = items.map((i) => parseFloat(i.price));
  const min = Math.min(...prices);
  return prices.every((p) => p === min) ? min.toFixed(2) : `From ${min.toFixed(2)}`;
}

export const MENU_CATEGORIES: {
  title: string;
  price: string;
  cta: string;
  art: MenuArt;
  href: string;
}[] = [
  { title: 'Toasted Subs', price: `${SUB_PRICES.half} half · ${SUB_PRICES.full} whole`, cta: 'View Subs', art: 'subs', href: `${MENU_URL}#subs` },
  { title: 'Cheesesteaks', price: priceLabel(CHEESESTEAKS), cta: 'View Steaks', art: 'steaks', href: `${MENU_URL}#steaks` },
  { title: 'Kati Rolls', price: priceLabel(KATI_ROLLS), cta: 'View Rolls', art: 'rolls', href: `${MENU_URL}#rolls` },
  { title: 'Cozy Classics', price: priceLabel(CLASSICS), cta: 'View Classics', art: 'classics', href: `${MENU_URL}#classics` },
  { title: 'Munchies', price: priceLabel(MUNCHIES), cta: 'View Munchies', art: 'munchies', href: `${MENU_URL}#munchies` },
];
