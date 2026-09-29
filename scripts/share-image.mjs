// Regenerates the link-preview image (public/og.jpg) from the /share-card page,
// and the iPhone home-screen icon (public/apple-touch-icon.png) from the favicon.
//
// Usage: npm run build && npm run share-image
// Needs Google Chrome or Chromium. Set CHROME_PATH if it isn't found.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

const PORT = 4329;
const INK = '#121210';

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => p && existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');
if (!existsSync('dist/share-card/index.html')) throw new Error('Run `npm run build` first.');

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
try {
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/share-card/`)).ok) break;
    } catch {}
    if (i > 50) throw new Error('Preview server did not start.');
    await new Promise((r) => setTimeout(r, 200));
  }

  const dir = mkdtempSync(join(tmpdir(), 'share-'));
  const png = join(dir, 'card.png');
  execFileSync(chrome, [
    '--headless',
    '--hide-scrollbars',
    '--force-prefers-reduced-motion',
    '--timeout=4000',
    '--window-size=1200,630',
    `--screenshot=${png}`,
    `http://localhost:${PORT}/share-card/`,
  ], { stdio: 'ignore' });
  // WhatsApp drops preview images over ~300 KB.
  await sharp(png).resize(1200, 630).jpeg({ quality: 84, mozjpeg: true }).toFile('public/og.jpg');
  rmSync(dir, { recursive: true });

  // Cream owl on ink, with room around it; iOS rounds the corners itself.
  const owl = await sharp(readFileSync('public/favicon.svg'), { density: 300 })
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 3, background: INK } })
    .composite([{ input: owl, gravity: 'center' }])
    .png()
    .toFile('public/apple-touch-icon.png');

  console.log('Wrote public/og.jpg and public/apple-touch-icon.png');
} finally {
  server.kill();
}
