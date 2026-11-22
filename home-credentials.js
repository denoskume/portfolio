/* Credentials & Recognition — visible two-card hand-off.
   The current card SLOWLY slides away and the next card SLOWLY enters the centre.
   Original document images are preserved. No instant reshuffling. */
(() => {
  'use strict';
  const root = document.getElementById('homeCredentials');
  if (!root) return;
  const stage = root.querySelector('.hc-carousel');
  const stack = root.querySelector('.hc-stack');
  const cards = Array.from(root.querySelectorAll('.hc-card'));
  const dots = Array.from(root.querySelectorAll('.hc-dot'));
  const announcement = root.querySelector('.hc-announcement');
  if (!stage || !stack || cards.length !== 4 || dots.length !== cards.length) return;

  const DURATION = 2050;   // An observable 2.05-second card transition.
  let current = 0;
  let sliding = false;
  let touchStartX = null, touchStartY = null;
  let suppressClick = false;
  let lastManual = 0;

  function render() {
    cards.forEach((card, index) => {
      const offset = (index - current + cards.length) % cards.length;
      const place = offset === 0 ? 'active'
        : offset === 1 ? 'next'
        : offset === cards.length - 1 ? 'previous' : 'back';
      card.dataset.place = place;
      const active = place === 'active';
      card.setAttribute('aria-hidden', String(!active));
      card.querySelectorAll('a').forEach(link => { link.tabIndex = active ? 0 : -1; });
    });
    dots.forEach((dot, index) => {
      dot.setAttribute('aria-current', String(index === current));
      dot.setAttribute('aria-label',
        'Show credential ' + (index + 1) + ': ' +
        cards[index].querySelector('h3').textContent.trim());
    });
    if (announcement) {
      announcement.textContent = 'Credential ' + (current + 1) +
        ' of ' + cards.length + ': ' +
        cards[current].querySelector('h3').textContent.trim();
    }
  }

  function show(target, userInitiated = false) {
    if (sliding) return;
    target = (target + cards.length) % cards.length;
    if (target === current) return;
    if (userInitiated) lastManual = Date.now();

    // Respect OS-level reduced-motion settings and older browsers.
    const outgoing = cards[current];
    const incoming = cards[target];
    // The user explicitly requested the visible slide effect. A lack of
    // Web Animations support falls back to a direct card change, but OS-level
    // reduced-motion settings must not silently disable autoplay entirely.
    if (typeof outgoing.animate !== 'function') {
      current = target;
      render();
      return;
    }
    const stepsForward = (target - current + cards.length) % cards.length;
    const forward = stepsForward <= cards.length / 2;
    const direction = forward ? 1 : -1;
    const stageWidth = stage.getBoundingClientRect().width;
    const distance = Math.min(390, Math.max(205, stageWidth * .42));
    const startDistance = Math.min(155, Math.max(85, stageWidth * .17));
    const incomingStartSize = incoming.getBoundingClientRect();
    const outgoingFrontSize = outgoing.getBoundingClientRect();
    const ease = 'cubic-bezier(.44, .02, .2, 1)';

    sliding = true;
    stack.dataset.sliding = 'true';
    outgoing.dataset.motion = 'outgoing';
    incoming.dataset.motion = 'incoming';
    incoming.setAttribute('aria-hidden', 'false');

    // The outgoing card travels to the side, still fully visible during
    // the first half of the movement. The incoming card simultaneously
    // approaches from behind and fills the vacated central space.
    const outgoingFrames = [
      {transform: 'translate(-50%,-50%) translateX(0px) scale(1)',
       opacity:1, offset:0},
      {transform: 'translate(-50%,-50%) translateX(' +
        (-direction * distance * .52).toFixed(1) + 'px) scale(.96)',
       opacity:1, offset:.55},
      {transform: 'translate(-50%,-50%) translateX(' +
        (-direction * distance).toFixed(1) + 'px) scale(.9)',
       opacity:.22, offset:1}
    ];
    const incomingFrames = [
      {transform: 'translate(-50%,-50%) translateX(' +
        (direction * startDistance).toFixed(1) + 'px) scale(.91)',
       width:incomingStartSize.width + 'px',
       height:incomingStartSize.height + 'px',
       opacity:.72, offset:0},
      {transform: 'translate(-50%,-50%) translateX(' +
        (direction * startDistance * .40).toFixed(1) + 'px) scale(.97)',
       width:(incomingStartSize.width * .43 + outgoingFrontSize.width * .57) + 'px',
       height:(incomingStartSize.height * .43 + outgoingFrontSize.height * .57) + 'px',
       opacity:.95, offset:.57},
      {transform:'translate(-50%,-50%) translateX(0px) scale(1)',
       width:outgoingFrontSize.width + 'px',
       height:outgoingFrontSize.height + 'px',
       opacity:1, offset:1}
    ];

    const oldAnimation = outgoing.animate(outgoingFrames,
      {duration:DURATION, easing:ease, fill:'forwards'});
    const newAnimation = incoming.animate(incomingFrames,
      {duration:DURATION, easing:ease, fill:'forwards'});
    let finished = false;

    function finish() {
      if (finished) return;
      finished = true;
      // Put the newly arrived card in its stable central slot, THEN
      // discard temporary animations. The previous card becomes a
      // visible thin background edge again without a flash in front.
      current = target;
      render();
      delete outgoing.dataset.motion;
      delete incoming.dataset.motion;
      delete stack.dataset.sliding;
      oldAnimation.cancel();
      newAnimation.cancel();
      sliding = false;
    }
    Promise.allSettled([oldAnimation.finished, newAnimation.finished]).then(finish);
    // Safety guard if animations are suspended by a browser or tab.
    window.setTimeout(finish, DURATION + 150);
  }

  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index, true)));
  cards.forEach((card, index) => card.addEventListener('click', event => {
    if (suppressClick || sliding) {
      event.preventDefault();
      if (suppressClick) suppressClick = false;
      return;
    }
    if (index !== current) {
      event.preventDefault();
      show(index, true);
    }
  }));

  stage.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  stage.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    touchStartX = event.clientX;
    touchStartY = event.clientY;
  });
  stage.addEventListener('pointerup', event => {
    if (touchStartX === null || touchStartY === null) return;
    const dx = event.clientX - touchStartX;
    const dy = event.clientY - touchStartY;
    touchStartX = touchStartY = null;
    if (Math.abs(dx) >= 45 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick = true;
      show(current + (dx < 0 ? 1 : -1), true);
      window.setTimeout(() => { suppressClick = false; }, 300);
    }
  });
  stage.addEventListener('pointercancel', () => {
    touchStartX = touchStartY = null;
    suppressClick = false;
  });

  // Start a visible transition shortly AFTER the carousel enters the viewport.
  // A long interval started at page load can be skipped while a visitor scrolls,
  // making autoplay appear broken. This short heartbeat fixes that issue.
  const TICK = 250;
  const FIRST_SLIDE_DELAY = 900;   // first visible movement, not 6.3s later
  const REST_BETWEEN_SLIDES = 3000; // pause after each 2.05s transition
  let nextSlideAt = Infinity;
  let wasVisible = false;

  function isActuallyVisible() {
    const home = root.closest('#home');
    if (document.hidden || !home || !home.classList.contains('active')) return false;
    const box = stage.getBoundingClientRect();
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleHeight = Math.max(0, Math.min(box.bottom, screenHeight) - Math.max(box.top, 0));
    return visibleHeight >= Math.min(Math.max(box.height || 340, 200) * .30, screenHeight * .30);
  }
  function autoplayTick() {
    const visible = isActuallyVisible();
    const now = Date.now();
    if (visible && !wasVisible) {
      nextSlideAt = now + FIRST_SLIDE_DELAY;
    } else if (!visible) {
      nextSlideAt = Infinity;
    }
    wasVisible = visible;
    if (!visible || sliding || touchStartX !== null) return;
    if (now - lastManual < REST_BETWEEN_SLIDES) {
      nextSlideAt = Math.max(nextSlideAt, lastManual + REST_BETWEEN_SLIDES);
      return;
    }
    if (now < nextSlideAt) return;
    show(current + 1);
    nextSlideAt = now + DURATION + REST_BETWEEN_SLIDES;
  }

  const timer = window.setInterval(autoplayTick, TICK);
  window.addEventListener('pagehide', () => window.clearInterval(timer), {once:true});
  // Run once on initialization, and again after the page becomes visible.
  autoplayTick();
  document.addEventListener('visibilitychange', autoplayTick);

  render();
})();
