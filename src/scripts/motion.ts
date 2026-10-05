// Scroll-triggered reveals (Motion) + marquee speed-up on scroll.
// Everything here is skipped when the visitor prefers reduced motion; the
// `motion` class on <html> (set inline in <head>) gates the hidden start states.
import { animate, inView } from 'motion';
import { initDrips } from './drips';

const EASE = [0.22, 1, 0.36, 1] as const;

type Variant = 'up' | 'pop' | 'fade' | 'drip';
const variants: Record<Variant, Record<string, unknown>> = {
  up: { opacity: [0, 1], y: [28, 0] },
  pop: { opacity: [0, 1], scale: [0.6, 1], rotate: [-10, 0] },
  fade: { opacity: [0, 1] },
  drip: { clipPath: ['inset(0 0 55% 0)', 'inset(0 0 0% 0)'] },
};

function reveal(el: HTMLElement, delay = 0) {
  const raw = el.dataset.reveal as Variant;
  const v: Variant = raw in variants ? raw : 'up';
  const spring = v === 'pop' ? { type: 'spring', bounce: 0.45, duration: 0.8 } : { duration: v === 'drip' ? 1.1 : 0.7, ease: EASE };
  animate(el, variants[v] as never, { ...spring, delay } as never);
}

(window as unknown as { __motionReady: boolean }).__motionReady = true;

if (document.documentElement.classList.contains('motion')) {
  // Groups: items that scroll into view together reveal one after another.
  // Each item is watched on its own rather than the group as a whole, so it
  // doesn't matter how the layout looked when the page loaded. (A wrapper that's
  // `display: contents` on phones has no box and never "scrolls into view", and
  // the page can load at a different width than it's read at: a rotated phone,
  // a resized window, a browser that loads the page before it's on screen.)
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    let batch = 0;
    let frame = 0;
    group.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      inView(
        el,
        () => {
          reveal(el, batch++ * 0.09);
          frame ||= requestAnimationFrame(() => (batch = frame = 0));
        },
        { amount: 0.1 },
      );
    });
  });

  // Loners: anything with data-reveal that isn't inside a group.
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-reveal-group]')) return;
    inView(el, () => reveal(el, Number(el.dataset.delay ?? 0)), { amount: 0.1 });
  });

  // Marquees drift on their own; scrolling nudges them faster, then they settle.
  const tracks = [...document.querySelectorAll<HTMLElement>('.track')];
  const anims = tracks.flatMap((t) => t.getAnimations());
  let boost = 0;
  let lastY = window.scrollY;
  let raf = 0;
  const settle = () => {
    boost *= 0.92;
    anims.forEach((a) => (a.playbackRate = 1 + boost));
    raf = boost > 0.02 ? requestAnimationFrame(settle) : 0;
  };
  window.addEventListener(
    'scroll',
    () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      boost = Math.min(4, boost + dy / 60);
      if (!raf) raf = requestAnimationFrame(settle);
    },
    { passive: true },
  );
}

initDrips();
