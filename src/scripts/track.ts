// Reports the moments that matter to Google Tag Manager, which forwards them to Google Analytics.
// Elements opt in with data attributes; nothing else on the page is tracked by this script.
//   data-track="order_open"       data-placement="hero"           an Order button (PillButton `order` adds these)
//   data-track="order_choice"     data-method="delivery" data-app="Grubhub"   a choice in the order popup
//   data-track="call_click"       data-placement="find_us"        a phone link
//   data-track="directions_click" data-placement="footer"         a Google Maps link
// An app choice carries the placement of the Order button that opened the popup.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

let orderPlacement: string | undefined;

document.addEventListener(
  'click',
  (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    const { track, placement, method, app } = el.dataset;
    if (track === 'order_open') orderPlacement = placement;
    // Every key is sent each time, so a value from an earlier tap never carries over to this one.
    (window.dataLayer ||= []).push({
      event: track,
      placement: track === 'order_choice' ? orderPlacement : placement,
      method,
      app,
    });
  },
  { capture: true },
);

export {};
