/* Reference-matched professional CV, using the same structured data as the PDF. */
(function () {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[char]);

  function section(title, content) {
    return '<section class="cv-section"><h2>' + esc(title) + '</h2>' + content + '</section>';
  }

  function heading(title, dates) {
    return '<div class="cv-entry-title"><h3>' + esc(title) +
      '</h3><span class="cv-dates">' + esc(dates) + '</span></div>';
  }

  function bulletList(bullets) {
    return '<ul class="cv-bullets">' +
      bullets.map(line => {
        const match = /^([A-Za-z ]{2,16}):\s*(.*)$/.exec(line);
        return '<li>' + (match
          ? '<strong>' + esc(match[1]) + ':</strong> ' + esc(match[2])
          : esc(line)) + '</li>';
      }).join('') + '</ul>';
  }

  function educationItem(row) {
    return '<div class="cv-entry">' +
      heading(row.school, row.dates) +
      '<div class="cv-edu-meta"><p class="cv-track">' + esc(row.track_label) + ': ' +
      esc(row.track) + '</p><span class="cv-location">' + esc(row.location) + '</span></div>' +
      '<p>' + esc(row.description) + '</p>' +
      '<p><strong>Relevant coursework:</strong> ' + row.courses.split(' | ').map(esc).join(' &bull; ') + '</p>' +
      '</div>';
  }

  function experienceItem(row) {
    return '<div class="cv-entry">' +
      heading(row.title, row.dates) +
      '<p class="cv-affiliation">' + esc(row.organization) + '</p>' +
      bulletList(row.bullets) + '</div>';
  }

  function projectItem(row) {
    return '<div class="cv-entry">' +
      heading(row.title, row.dates) +
      '<p>' + esc(row.summary) + '</p>' +
      bulletList(row.bullets) + '</div>';
  }

  function contacts(items) {
    return items.map(item => item.url
      ? '<a href="' + esc(item.url) + '"' +
        (item.url.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : '') +
        '>' + esc(item.label) + '</a>'
      : '<span>' + esc(item.label) + '</span>'
    ).join('<span class="cv-separator" aria-hidden="true">|</span>');
  }

  async function render() {
    const root = document.getElementById('harvardCvDocument');
    if (!root) return;
    try {
      const response = await fetch('./data/cv-data.json', {cache:'no-cache'});
      if (!response.ok) throw new Error('CV data unavailable');
      const d = await response.json();
      root.innerHTML =
        '<header class="cv-header">' +
        '<h1>' + esc(d.name) + '</h1>' +
        '<p class="cv-academic">' + esc(d.academic_headline) + '</p>' +
        '<p class="cv-focus">' + esc(d.career_headline) + '</p>' +
        '<div class="cv-contacts">' + contacts(d.contact) + '</div>' +
        '<div class="cv-social">' + contacts(d.social) + '</div>' +
        '</header>' +
        section('Profile', '<p>' +
          esc(d.profile).replace('six-month internship from February 2027',
            '<strong>six-month internship from February 2027</strong>') + '</p>') +
        section('Education', d.education.map(educationItem).join('')) +
        section('Experience', d.experience.map(experienceItem).join('')) +
        section('Selected Projects', d.projects.map(projectItem).join('')) +
        section('Technical Skills', d.skills.map(row =>
          '<p><strong>' + esc(row.label) + ':</strong> ' + esc(row.value) + '</p>'
        ).join('')) +
        section('Languages & Interests',
          '<p><strong>Languages:</strong> ' + esc(d.languages) + '</p>' +
          '<p><strong>Interests:</strong> ' + esc(d.interests) + '</p>');
    } catch (error) {
      console.error('Cannot render CV:',error);
      root.innerHTML = '<p class="cv-error">The CV preview is unavailable. Please use the Download PDF link.</p>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',render,{once:true});
  } else {
    render();
  }
})();
