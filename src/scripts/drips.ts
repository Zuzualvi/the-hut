// Squishy drips: scroll speed drives a spring per drip. Scrolling down squashes
// the drips up against "gravity"; scrolling up stretches them; when scrolling stops
// they wobble back to rest. Each drip hangs from the band edge, so we scale it
// vertically about that line. Longer drips are softer (lower frequency) and stretch
// more, which is what makes the band read as liquid instead of one rigid shape.

const MAX = 0.18; // strongest stretch/squash on the longest drip (18%)
const GAIN = 0.09; // stretch per px/ms of scroll speed
const DAMPING = 0.32; // < 1 = a little overshoot before settling

type Drip = { el: SVGPathElement; x: number; v: number; omega: number; reach: number };
type Band = { base: number; drips: Drip[]; visible: boolean };

export function initDrips() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bands: Band[] = [...document.querySelectorAll<SVGSVGElement>('.drip-band')].map((svg) => ({
    base: Number(svg.dataset.band),
    visible: false,
    drips: [...svg.querySelectorAll<SVGPathElement>('path[data-len]')].map((el) => {
      const len = Number(el.dataset.len);
      // omega in rad/ms: short drips ~2.3Hz, long ones ~1.5Hz
      return { el, x: 0, v: 0, omega: (2 * Math.PI * (2.3 - 0.8 * len)) / 1000, reach: 0.35 + 0.65 * len };
    }),
  }));
  if (!bands.length) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const band = bands.find((b) => b.drips[0]?.el.ownerSVGElement === e.target);
      if (band) band.visible = e.isIntersecting;
    }
  });
  document.querySelectorAll('.drip-band').forEach((svg) => io.observe(svg));

  let lastY = window.scrollY;
  let lastT = performance.now();
  let speed = 0; // smoothed scroll speed, px/ms (positive = scrolling down)
  let raf = 0;

  const frame = (t: number) => {
    const dt = Math.min(48, t - lastT) || 16;
    lastT = t;
    const y = window.scrollY;
    speed += ((y - lastY) / dt - speed) * 0.25;
    lastY = y;
    const target = Math.max(-1, Math.min(1, (-speed * GAIN) / MAX)); // -1..1

    let moving = Math.abs(speed) > 0.002;
    for (const band of bands) {
      for (const d of band.drips) {
        // damped spring toward the target (semi-implicit Euler, stable at these step sizes)
        const a = d.omega * d.omega * (target - d.x) - 2 * DAMPING * d.omega * d.v;
        d.v += a * dt;
        d.x += d.v * dt;
        if (Math.abs(d.x) > 0.001 || Math.abs(d.v) > 0.00001) moving = true;
        if (!band.visible) continue;
        const s = 1 + d.x * MAX * d.reach;
        d.el.setAttribute('transform', `matrix(1 0 0 ${s.toFixed(4)} 0 ${(band.base * (1 - s)).toFixed(3)})`);
      }
    }
    raf = moving ? requestAnimationFrame(frame) : 0;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
}
