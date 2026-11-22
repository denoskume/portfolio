/* One verified CV data source for both the Harvard HTML preview and PDF. */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function itemMarkup(row) {
    const bullets = (row.bullets || []).length
      ? '<ul class="harvard-bullets">' +
        row.bullets.map(text => '<li>' + escapeHtml(text) + '</li>').join('') +
        '</ul>'
      : '';

    return '<div class="harvard-item">' +
      '<div class="harvard-item-heading"><strong>' + escapeHtml(row.title) + '</strong>' +
      '<span class="harvard-dates">' + escapeHtml(row.dates) + '</span></div>' +
      '<p class="harvard-organization">' + escapeHtml(row.organization) + '</p>' +
      bullets + '</div>';
  }

  function sectionMarkup(title, content) {
    return '<section class="harvard-section"><h2>' + escapeHtml(title) + '</h2>' +
      content + '</section>';
  }

  async function renderHarvardCV() {
    const root = document.getElementById('harvardCvDocument');
    if (!root) return;

    try {
      const response = await fetch('./cv-data.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error('CV data unavailable');
      const data = await response.json();

      const contacts = data.contact.map(item => item.url
        ? '<a href="' + escapeHtml(item.url) + '" target="' +
          (item.url.startsWith('mailto:') ? '_self' : '_blank') +
          '" rel="noopener noreferrer">' + escapeHtml(item.label) + '</a>'
        : '<span>' + escapeHtml(item.label) + '</span>'
      ).join('<span aria-hidden="true">·</span>');

      const skills = data.technical_skills.map(item =>
        '<p class="harvard-skill-line"><strong>' + escapeHtml(item.category) +
        ':</strong> ' + escapeHtml(item.items) + '</p>'
      ).join('');

      const projects = data.projects.map(item =>
        '<div class="harvard-project"><strong>' + escapeHtml(item.title) +
        '</strong><p>' + escapeHtml(item.details) + '</p></div>'
      ).join('');

      root.innerHTML =
        '<header class="harvard-header"><h1>' + escapeHtml(data.name) + '</h1>' +
        '<p class="harvard-headline">' + escapeHtml(data.headline) + '</p>' +
        '<p class="harvard-direction">' + escapeHtml(data.direction) + '</p>' +
        '<div class="harvard-contact">' + contacts + '</div></header>' +
        sectionMarkup('Profile', '<p>' + escapeHtml(data.profile) + '</p>') +
        sectionMarkup('Education', data.education.map(itemMarkup).join('')) +
        sectionMarkup('Selected Technical Projects', projects) +
        sectionMarkup('Professional Experience', data.experience.map(itemMarkup).join('')) +
        sectionMarkup('Technical Skills', skills) +
        sectionMarkup('Languages', '<p>' + escapeHtml(data.languages.replace(/ \| /g, ' · ')) + '</p>');
    } catch (error) {
      root.innerHTML = '<p class="harvard-loading">CV preview unavailable. ' +
        'Please use Download PDF above to view the latest document.</p>';
      console.error('Unable to load Harvard CV:', error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHarvardCV, { once: true });
  } else {
    renderHarvardCV();
  }
})();
