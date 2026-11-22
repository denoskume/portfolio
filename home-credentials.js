/* Credentials & Recognition: stationary layered deck, as in Demo_cards.mp4.
   Navigation changes which document occupies the front layer; no autoplay. */
(() => {
  'use strict';
  const root = document.getElementById('homeCredentials');
  if (!root) return;
  const stage = root.querySelector('.hc-carousel');
  const cards = Array.from(root.querySelectorAll('.hc-card'));
  const dots = Array.from(root.querySelectorAll('.hc-dot'));
  const announcement = root.querySelector('.hc-announcement');
  if (!stage || cards.length !== 4 || dots.length !== cards.length) return;

  let current = 0;
  let startX = null;
  let startY = null;
  let suppressClick = false;

  function render() {
    cards.forEach((card, index) => {
      const offset = (index - current + cards.length) % cards.length;
      const place = offset === 0 ? 'active'
        : offset === 1 ? 'next'
        : offset === cards.length - 1 ? 'previous' : 'back';
      const isActive = place === 'active';
      card.dataset.place = place;
      card.setAttribute('aria-hidden', String(!isActive));
      card.querySelectorAll('a').forEach(link => { link.tabIndex = isActive ? 0 : -1; });
    });
    dots.forEach((dot, index) => {
      const active = index === current;
      dot.setAttribute('aria-current', String(active));
      dot.setAttribute('aria-label',
        'Show credential ' + (index + 1) + ': ' +
        cards[index].querySelector('h3').textContent.trim());
    });
    if (announcement) {
      announcement.textContent = 'Credential ' + (current + 1) + ' of ' +
        cards.length + ': ' + cards[current].querySelector('h3').textContent.trim();
    }
  }

  function show(index) {
    current = (index + cards.length) % cards.length;
    render();
  }

  dots.forEach((dot, index) =>
    dot.addEventListener('click', () => show(index)));

  cards.forEach((card, index) => {
    card.addEventListener('click', event => {
      if (suppressClick) {
        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
        return;
      }
      if (current !== index) {
        event.preventDefault();
        show(index);
      }
    });
  });

  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  stage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    startX = event.clientX;
    startY = event.clientY;
    suppressClick = false;
  });
  stage.addEventListener('pointerup', event => {
    if (startX === null || startY === null) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    startX = startY = null;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      suppressClick = true;
      show(current + (deltaX < 0 ? 1 : -1));
      window.setTimeout(() => { suppressClick = false; }, 300);
    }
  });
  stage.addEventListener('pointercancel', () => {
    startX = startY = null;
    suppressClick = false;
  });
  render();
})();
