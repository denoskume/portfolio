/* Home credentials: accessible stacked carousel using original document images. */
(() => {
  'use strict';
  const root = document.getElementById('homeCredentials');
  if (!root) return;
  const stage = root.querySelector('.hc-carousel');
  const cards = [...root.querySelectorAll('.hc-card')];
  const dots = [...root.querySelectorAll('.hc-dot')];
  const counter = root.querySelector('.hc-count');
  const play = root.querySelector('.hc-play');
  const prev = root.querySelector('.hc-prev');
  const next = root.querySelector('.hc-next');
  if (!stage || cards.length !== 4 || dots.length !== 4 ||
      !counter || !play || !prev || !next) return;

  const reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let playing = !reduced;
  let startX = null, startY = null;

  function render() {
    cards.forEach((card, i) => {
      const offset = (i - current + cards.length) % cards.length;
      const place = offset === 0 ? 'active' :
        offset === 1 ? 'next' : offset === cards.length - 1 ? 'previous' : 'back';
      card.dataset.place = place;
      card.setAttribute('aria-hidden', String(place !== 'active'));
      card.querySelectorAll('a').forEach(link => {
        link.tabIndex = place === 'active' ? 0 : -1;
      });
    });
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', String(i === current));
      dot.setAttribute('aria-label', 'Show card ' + (i + 1) + ' of ' +
        cards.length + ': ' + cards[i].querySelector('h3').textContent.trim());
    });
    counter.textContent =
      String(current + 1).padStart(2, '0') + ' / ' +
      String(cards.length).padStart(2, '0');
    play.textContent = playing ? 'Pause' : 'Play';
    play.setAttribute('aria-label', playing ?
      'Pause automatic credential carousel' : 'Play automatic credential carousel');
    play.setAttribute('aria-pressed', String(!playing));
  }

  function go(index, userInitiated = false) {
    current = (index + cards.length) % cards.length;
    if (userInitiated) playing = false;
    render();
  }
  prev.addEventListener('click', () => go(current - 1, true));
  next.addEventListener('click', () => go(current + 1, true));
  dots.forEach((dot, i) => dot.addEventListener('click', () => go(i, true)));
  play.addEventListener('click', () => { playing = !playing; render(); });
  cards.forEach((card, i) => card.addEventListener('click', event => {
    if (i === current) return;
    event.preventDefault();
    go(i, true);
  }));
  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      go(current + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  stage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startX = event.clientX; startY = event.clientY;
  });
  stage.addEventListener('pointerup', event => {
    if (startX === null || startY === null) return;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    startX = startY = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) {
      go(current + (dx < 0 ? 1 : -1), true);
    }
  });
  stage.addEventListener('pointercancel', () => { startX = startY = null; });
  const interval = window.setInterval(() => {
    if (!playing || document.hidden || !root.closest('#home.active') ||
        stage.matches(':hover') || stage.contains(document.activeElement)) return;
    const bounds = root.getBoundingClientRect();
    if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
    go(current + 1);
  }, 5500);
  window.addEventListener('pagehide', () => window.clearInterval(interval), {once:true});
  render();
})();
