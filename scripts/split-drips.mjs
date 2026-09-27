// Splits a Figma drip band into a flat band + one path per drip, reshaped with the
// same flare / neck / teardrop math used in Figma. Output feeds DripBand.astro,
// which lets each drip squash and stretch on scroll.
// Usage: node scripts/split-drips.mjs <name> <svg exported from Figma (original shapes)>
import fs from 'node:fs';

const [name, file] = process.argv.slice(2);
const src = fs.readFileSync(file, 'utf8');
const vb = src.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
const d = src.match(/ d="([^"]+)"/)[1];
const fill = src.match(/fill="(#[0-9A-Fa-f]{3,8})"/)[1];

function toSegs(d, oy) {
  const toks = d.match(/[MLHVCZ]|-?\d*\.?\d+(?:e-?\d+)?/g); const segs = []; let i = 0, cmd = null, cx = 0, cy = 0;
  while (i < toks.length) {
    if (/[MLHVCZ]/.test(toks[i])) cmd = toks[i++];
    const from = [cx, cy];
    if (cmd === 'Z') { segs.push({ c: 'Z', pts: [] }); continue; }
    if (cmd === 'M' || cmd === 'L') { cx = +toks[i++]; cy = +toks[i++] - oy; segs.push({ c: cmd, from, pts: [[cx, cy]] }); }
    else if (cmd === 'H') { cx = +toks[i++]; segs.push({ c: 'L', from, pts: [[cx, cy]] }); }
    else if (cmd === 'V') { cy = +toks[i++] - oy; segs.push({ c: 'L', from, pts: [[cx, cy]] }); }
    else if (cmd === 'C') { const p = toks.slice(i, i + 6).map(Number); i += 6; const pts = [[p[0], p[1] - oy], [p[2], p[3] - oy], [p[4], p[5] - oy]]; cx = pts[2][0]; cy = pts[2][1]; segs.push({ c: 'C', from, pts }); }
  }
  segs[0].from = null;
  return segs;
}
function side(cx, hw, y0, yB, dir) {
  const t = Math.max(0, Math.min(1, ((yB - y0) / hw - 1.5) / 2.5));
  const hwN = hw * (1 - 0.12 * t), hwB = hw * (1 + 0.1 * t), yBulb = yB - hwB;
  const X = (v) => cx + dir * v, yN = y0 + (yBulb - y0) * 0.5;
  return { hwB, yBulb, segs: [
    { s: [X(hw), y0], c1: [X(hw), y0 + (yN - y0) * 0.45], c2: [X(hwN), yN - (yN - y0) * 0.35], e: [X(hwN), yN] },
    { s: [X(hwN), yN], c1: [X(hwN), yN + (yBulb - yN) * 0.4], c2: [X(hwB), Math.max(yBulb - hwB * 0.9, yN + (yBulb - yN) * 0.6)], e: [X(hwB), yBulb] },
  ] };
}
// One drip as a closed shape. It starts 4 units up inside the band so no seam shows.
function dripPath(cx, hw, b, f, yB) {
  const R = side(cx, hw, b + f, yB, 1), L = side(cx, hw, b + f, yB, -1);
  const hwB = R.hwB, yBulb = R.yBulb, k = 0.5523 * hwB, out = [];
  out.push(['M', cx - hw - f, b - 4], ['L', cx + hw + f, b - 4], ['L', cx + hw + f, b]);
  out.push(['C', cx + hw + f * 0.45, b, cx + hw, b + f * 0.55, cx + hw, b + f]);
  for (const s of R.segs) out.push(['C', ...s.c1, ...s.c2, ...s.e]);
  out.push(['C', cx + hwB, yBulb + k, cx + k, yB, cx, yB], ['C', cx - k, yB, cx - hwB, yBulb + k, cx - hwB, yBulb]);
  for (const s of L.segs.reverse()) out.push(['C', ...s.c2, ...s.c1, ...s.s]);
  out.push(['C', cx - hw, b + f * 0.55, cx - hw - f * 0.45, b, cx - hw - f, b], ['Z']);
  return out.map((s) => s[0] + s.slice(1).map((v) => +v.toFixed(2)).join(' ')).join('');
}

const segs = toSegs(d, vb[1]);
const found = [];
for (let i = 2; i < segs.length - 2; i++) {
  const s = segs[i];
  if (s.c !== 'C' || !s.from) continue;
  const [a, , e] = s.pts;
  if (Math.abs(s.from[1] - e[1]) < 0.01 && e[0] < s.from[0] && a[1] > e[1] && segs[i - 1].c === 'L' && segs[i + 1].c === 'L' && segs[i - 2].c === 'C' && segs[i + 2].c === 'C')
    found.push({ xR: s.from[0], xL: e[0], yEnd: e[1], capY: a[1], b: segs[i - 2].from[1], r: segs[i - 2].from[0] - s.from[0] });
}
found.sort((p, q) => p.xL - q.xL);
const b = found[0].b;
const drips = found.map((dr, j) => {
  const w = dr.xR - dr.xL;
  const gapL = j > 0 ? dr.xL - found[j - 1].xR : 1e9, gapR = j < found.length - 1 ? found[j + 1].xL - dr.xR : 1e9;
  const f = Math.max(Math.min(dr.r, gapL / 2 - 1, gapR / 2 - 1), Math.min(w * 0.42, 16, gapL / 2 - 1, gapR / 2 - 1));
  const yB = dr.yEnd + 0.75 * (dr.capY - dr.yEnd);
  return { d: dripPath((dr.xR + dr.xL) / 2, w / 2, b, f, yB), len: +(yB - b).toFixed(2) };
});
const out = `src/data/drips/${name}.json`;
fs.mkdirSync('src/data/drips', { recursive: true });
fs.writeFileSync(out, JSON.stringify({ width: vb[2], height: vb[3], band: b, fill, drips }, null, 1) + '\n');
console.log(out, drips.length, 'drips, band', b, 'max len', Math.max(...drips.map((x) => x.len)));
