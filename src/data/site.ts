// Single source of truth for links and menu content. Edit prices here.

export const ORDER_URL =
  'https://www.doordash.com/store/the-hut-glassboro-51518273/120066347/?pickup=true';

export const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Munchie Hour', href: '#munchie-hour' },
  { label: 'Our Vibe', href: '#our-vibe' },
  { label: 'Find Us', href: '#find-us' },
];

export type MenuArt = 'subs' | 'steaks' | 'rolls' | 'classics' | 'munchies';

export const MENU_CATEGORIES: {
  title: string;
  price: string;
  cta: string;
  art: MenuArt;
}[] = [
  { title: 'Toasted Subs', price: '8.99 half · 15.99 whole', cta: 'View Subs', art: 'subs' },
  { title: 'Cheesesteaks', price: '12.99', cta: 'View Steaks', art: 'steaks' },
  { title: 'Kati Rolls', price: '6.99', cta: 'View Rolls', art: 'rolls' },
  { title: 'Cozy Classics', price: 'From 2.99', cta: 'View Classics', art: 'classics' },
  { title: 'Munchies', price: 'From 1.99', cta: 'View Munchies', art: 'munchies' },
];

export type Sticker = 'fire-og' | 'grandaddy-purp' | 'white-widow' | 'pineapple-express';

export const FAN_FAVES: {
  name: string;
  flavor: string;
  price: string;
  sticker: Sticker;
  text: string;
  tilt: number;
}[] = [
  { name: 'Fire OG', flavor: 'Buffalo', price: '8.99 / 15.99', sticker: 'fire-og', text: 'text-green', tilt: 6 },
  { name: 'Grandaddy Purp', flavor: 'BBQ', price: '8.99 / 15.99', sticker: 'grandaddy-purp', text: 'text-cream', tilt: -4 },
  { name: 'White Widow', flavor: 'Chicken Bacon Ranch', price: '8.99 / 15.99', sticker: 'white-widow', text: 'text-ink', tilt: 3 },
  { name: 'Pineapple Express', flavor: 'Teriyaki', price: '8.99 / 15.99', sticker: 'pineapple-express', text: 'text-cream', tilt: -7 },
];

export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=709+N+Main+St+Glassboro+NJ+08028';
export const INSTAGRAM_HANDLE = 'thehutglassboro';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export const HOURS = [
  { days: 'Mon–Thu', time: '11AM – 12AM' },
  { days: 'Fri–Sat', time: '11AM – 2AM' },
  { days: 'Sunday', time: '12PM – 12AM' },
];

export const SPECIALS = [
  {
    tag: 'Sun–Thu · after 10PM',
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
