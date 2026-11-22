/* Contact form: accessible client validation + FormSubmit AJAX relay.
   A successful HTTP response confirms only that the relay accepted the request,
   not that an email was delivered. The recipient may need first-use activation.
   An email-draft fallback is provided on failure. */
(() => {
  'use strict';

  const ADDRESS = 'kamenan.kume@eleves.ec-nantes.fr';
  const ENDPOINT = 'https://formsubmit.co/ajax/' + ADDRESS;

  function buildMailto(fields) {
    const subject = fields.subject ? 'Portfolio: ' + fields.subject : 'Portfolio inquiry';
    const body = [
      'Name: ' + (fields.name || ''),
      'Email: ' + (fields.email || ''),
      'Topic: ' + (fields.topic || ''),
      '',
      fields.message || ''
    ].join('\n');
    return 'mailto:' + ADDRESS
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body.slice(0, 2000));
  }

  function initContact() {
    const form = document.getElementById('portfolioContactForm');
    if (!form) return;
    const feedback = document.getElementById('contactFeedback');
    const send = document.getElementById('contactSubmit');
    const message = document.getElementById('contactMessage');
    const counter = document.getElementById('contactCounter');
    const sendText = send.querySelector('[data-submit-label]');

    function fields() {
      return {
        name: form.elements.namedItem('name').value.trim(),
        email: form.elements.namedItem('email').value.trim(),
        topic: form.elements.namedItem('topic').value,
        subject: form.elements.namedItem('subject').value.trim(),
        message: message.value.trim()
      };
    }

    function showState(state, detail, draft) {
      feedback.dataset.state = state;
      feedback.textContent = detail;
      if (draft) {
        feedback.appendChild(document.createTextNode(' '));
        const link = document.createElement('a');
        link.href = buildMailto(draft);
        link.textContent = 'Open email draft';
        feedback.appendChild(link);
      }
    }

    function updateCount() {
      counter.textContent = message.value.length + ' / ' + message.maxLength;
    }
    message.addEventListener('input', updateCount);
    updateCount();

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (send.disabled) return;
      if (!form.reportValidity()) return;

      const info = fields();
      if (info.name.length < 2 || info.subject.length < 4 || info.message.length < 20) {
        showState('error', 'Please enter your name, a meaningful subject, and a message of at least 20 characters.');
        if (info.message.length < 20) message.focus();
        return;
      }

      const honey = form.elements.namedItem('_honey');
      if (honey && honey.value.trim()) {
        showState('error', 'Please try again or use the direct email option.');
        return;
      }

      send.disabled = true;
      sendText.textContent = 'Sending…';
      form.setAttribute('aria-busy', 'true');
      feedback.textContent = '';
      const controller = new AbortController();
      const deadline = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: info.name,
            email: info.email,
            topic: info.topic,
            subject: info.subject,
            message: info.message,
            _subject: 'Portfolio inquiry: ' + info.subject,
            _template: 'table',
            _url: window.location.href.split('#')[0] + '#contact',
            _honey: ''
          }),
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || !(result.success === true || result.success === 'true')) {
          throw new Error('Relay did not confirm the submission');
        }

        showState('success', 'Your message was accepted by the contact service. Email delivery may require first-time activation by the recipient.');
        form.reset();
        updateCount();
      } catch (error) {
        showState('error', 'The form could not confirm submission. You can send the same message through your email app:', info);
        console.warn('Contact relay submission unavailable:', error);
      } finally {
        clearTimeout(deadline);
        send.disabled = false;
        sendText.textContent = 'Send message';
        form.removeAttribute('aria-busy');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContact, { once: true });
  } else {
    initContact();
  }
})();
