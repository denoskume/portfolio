/* Home / Projects insights — all measurements come from content.js (no synthetic data). */
(function () {
  'use strict';

  var root = document.getElementById('projectsDashboard');
  var source = window.PORTFOLIO_DATA;
  if (!root || !source || !Array.isArray(source.projects)) return;

  var projects = source.projects.filter(function (p) { return p && p.title && p.slug; });
  var domains = ['Computer Vision', 'Image Processing', 'Machine Learning'];
  var formats = ['Laboratory', 'Case study', 'Research'];
  var palette = {
    'Computer Vision': '#776ded',
    'Image Processing': '#22ada2',
    'Machine Learning': '#eea26e',
    'Laboratory': '#776ded',
    'Case study': '#22ada2',
    'Research': '#eea26e'
  };
  var detailPages = {
    'fluoroscopy-instrument-segmentation': 1,
    'camera-calibration': 2,
    'clap-zero-shot': 3
  };
  var state = { category: 'All', format: 'All', query: '', expanded: false };
  var categoryInput = root.querySelector('[data-pd-category]');
  var formatInput = root.querySelector('[data-pd-format]');
  var searchInput = root.querySelector('[data-pd-search]');
  var kpiRoot = root.querySelector('[data-pd-kpis]');
  var domainRoot = root.querySelector('[data-pd-domains]');
  var formatRoot = root.querySelector('[data-pd-formats]');
  var skillsRoot = root.querySelector('[data-pd-skills]');
  var listRoot = root.querySelector('[data-pd-projects]');
  var resultCount = root.querySelector('[data-pd-result-count]');
  if (!categoryInput || !formatInput || !searchInput || !kpiRoot || !domainRoot ||
      !formatRoot || !skillsRoot || !listRoot || !resultCount) return;

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch];
    });
  }
  function formatOf(p) {
    if (p.kind === 'Reproducible laboratory') return 'Laboratory';
    if (p.kind === 'Research experiment') return 'Research';
    return 'Case study';
  }
  function clampCount(n) { return Math.max(0, Math.min(100, n)); }
  function figureCount(p) { return Array.isArray(p.gallery) ? p.gallery.length : 0; }
  function filtered() {
    var q = state.query.toLowerCase().trim();
    return projects.filter(function (p) {
      if (state.category !== 'All' && p.category !== state.category) return false;
      if (state.format !== 'All' && formatOf(p) !== state.format) return false;
      if (!q) return true;
      return [
        p.title, p.subtitle, p.category, p.kind, p.summary,
        (p.tags || []).join(' ')
      ].join(' ').toLowerCase().indexOf(q) !== -1;
    });
  }
  function sum(rows, fn) { return rows.reduce(function (n, p) { return n + fn(p); }, 0); }
  function count(rows, predicate) { return rows.filter(predicate).length; }
  function card(label, value, note, icon) {
    return '<article class="pd-kpi">' +
      '<div class="pd-kpi-head"><span class="pd-kpi-label">' + esc(label) + '</span><span class="pd-kpi-icon" aria-hidden="true">' + icon + '</span></div>' +
      '<strong class="pd-kpi-value">' + esc(value) + '</strong><span class="pd-kpi-note">' + esc(note) + '</span></article>';
  }
  function renderKpis(rows) {
    var uniqueDomains = new Set(rows.map(function (p) { return p.category; }));
    var cases = count(rows, function (p) { return formatOf(p) !== 'Laboratory'; });
    var figures = sum(rows, figureCount);
    kpiRoot.innerHTML =
      card('Projects', rows.length, 'Showing ' + rows.length + ' of ' + projects.length + ' portfolio projects', '▦') +
      card('Technical domains', uniqueDomains.size, 'Computer vision, image processing & ML', '◈') +
      card('Case studies & research', cases, 'Experiments and applied investigations', '◎') +
      card('Evidence figures', figures, 'Images linked to the selected projects', '▤');
  }
  function empty(message) { return '<p class="pd-empty">' + esc(message) + '</p>'; }
  function renderDomains(rows) {
    if (!rows.length) {
      domainRoot.innerHTML = empty('No domain data matches the filters.');
      return;
    }
    var progress = 0;
    var stops = [];
    var legend = domains.map(function (name) {
      var n = count(rows, function (p) { return p.category === name; });
      var percent = 100 * n / rows.length;
      if (n) {
        stops.push(palette[name] + ' ' + progress.toFixed(2) + '% ' + (progress + percent).toFixed(2) + '%');
        progress += percent;
      }
      return '<button type="button" class="pd-legend-item" data-pd-domain-value="' + esc(name) + '" aria-pressed="' + (state.category === name) + '" title="Filter projects by ' + esc(name) + '">' +
        '<span class="pd-swatch" style="background:' + palette[name] + '"></span><span>' + esc(name) +
        '</span><strong>' + n + ' <small>(' + Math.round(percent) + '%)</small></strong></button>';
    }).join('');
    var fill = 'conic-gradient(' + stops.join(',') + ')';
    domainRoot.innerHTML =
      '<div class="pd-mix-body">' +
      '<div class="pd-donut" role="img" aria-label="' + esc(rows.length + ' projects across ' + domains.length + ' tracked technical domains') + '" style="background:' + fill + '">' +
      '<div class="pd-donut-core"><strong>' + rows.length + '</strong><span>projects</span></div></div>' +
      '<div class="pd-legend">' + legend + '</div></div>';
  }
  function renderFormats(rows) {
    if (!rows.length) {
      formatRoot.innerHTML = empty('No formats match the filters.');
      return;
    }
    formatRoot.innerHTML = '<div class="pd-bars">' + formats.map(function (name) {
      var n = count(rows, function (p) { return formatOf(p) === name; });
      var pct = clampCount(100 * n / rows.length);
      return '<button type="button" class="pd-bar-item" data-pd-format-value="' + name + '" aria-pressed="' + (state.format === name) + '" title="Filter projects by ' + name + '">' +
        '<span class="pd-bar-top"><span>' + name + '</span><strong>' + n + ' / ' + rows.length + '</strong></span>' +
        '<span class="pd-track"><span class="pd-fill" style="width:' + pct.toFixed(1) + '%;background:' + palette[name] + '"></span></span></button>';
    }).join('') + '</div>';
  }
  function renderSkills(rows) {
    if (!rows.length) {
      skillsRoot.innerHTML = empty('No technologies match the filters.');
      return;
    }
    var freq = new Map();
    rows.forEach(function (p) {
      var tags = Array.isArray(p.tags) ? p.tags : [];
      new Set(tags).forEach(function (label) {
        freq.set(label, (freq.get(label) || 0) + 1);
      });
    });
    var top = Array.from(freq.entries()).sort(function (a, b) {
      return b[1] - a[1] || a[0].localeCompare(b[0]);
    }).slice(0, 6);
    skillsRoot.innerHTML = '<div class="pd-skills">' + top.map(function (entry) {
      var pct = clampCount(100 * entry[1] / rows.length);
      return '<div class="pd-skill"><div class="pd-bar-top"><span>' + esc(entry[0]) +
        '</span><strong>' + entry[1] + ' ' + (entry[1] === 1 ? 'project' : 'projects') + '</strong></div>' +
        '<span class="pd-track"><span class="pd-fill" style="width:' + pct.toFixed(1) + '%;background:#7782d7"></span></span></div>';
    }).join('') + '</div>';
  }
  function safeURL(value) {
    var s = String(value || '');
    return /^https:\/\/[a-z0-9.-]+(?:[/:?#][^\s"<>]*)?$/i.test(s) ? s : '';
  }
  function projectRow(p) {
    var metric = Array.isArray(p.metrics) && p.metrics.length ? p.metrics[0] : null;
    var metricCell = metric ?
      '<div class="pd-measure"><strong>' + esc(metric.value) + '</strong><small>' + esc(metric.label) + '</small></div>' :
      '<span>—</span>';
    var index = detailPages[p.slug];
    var action = index ?
      '<button type="button" class="pd-project-button" data-pd-open="' + esc(p.slug) + '">Case study ↗</button>' :
      '<a class="pd-link" target="_blank" rel="noopener noreferrer" href="' + esc(safeURL(p.github)) + '">Repository ↗</a>';
    var cover = safeURL(p.cover);
    return '<tr><td><div class="pd-project"><img loading="lazy" decoding="async" src="' + esc(cover) + '" alt="">' +
      '<div><strong>' + esc(p.title) + '</strong><small>' + esc(p.year || '') + '</small></div></div></td>' +
      '<td><span class="pd-pill">' + esc(p.category) + '</span></td><td>' + esc(formatOf(p)) + '</td>' +
      '<td>' + metricCell + '</td><td>' + figureCount(p) + '</td><td>' + action + '</td></tr>';
  }
  function renderProjects(rows) {
    resultCount.textContent = rows.length + ' matching ' + (rows.length === 1 ? 'project' : 'projects');
    if (!rows.length) {
      listRoot.innerHTML = empty('No projects match these filters. Try clearing the search or selecting All.');
      return;
    }
    var visible = state.expanded ? rows : rows.slice(0, 6);
    var table =
      '<div class="pd-table-scroll"><table class="pd-table"><thead><tr>' +
      '<th scope="col">Project</th><th scope="col">Domain</th><th scope="col">Format</th>' +
      '<th scope="col">Recorded measure</th><th scope="col">Figures</th><th scope="col">Explore</th></tr></thead><tbody>' +
      visible.map(projectRow).join('') + '</tbody></table></div>';
    if (rows.length > 6) {
      table += '<button type="button" class="pd-expand" data-pd-expand aria-expanded="' +
        state.expanded + '">' + (state.expanded ? 'Show fewer projects' : 'Show all ' + rows.length + ' projects') + '</button>';
    }
    listRoot.innerHTML = table;
  }
  function render() {
    var rows = filtered();
    renderKpis(rows);
    renderDomains(rows);
    renderFormats(rows);
    renderSkills(rows);
    renderProjects(rows);
  }

  categoryInput.addEventListener('change', function () {
    state.category = categoryInput.value;
    state.expanded = false;
    render();
  });
  formatInput.addEventListener('change', function () {
    state.format = formatInput.value;
    state.expanded = false;
    render();
  });
  searchInput.addEventListener('input', function () {
    state.query = searchInput.value;
    state.expanded = false;
    render();
  });
  root.addEventListener('click', function (event) {
    var target = event.target;
    if (!(target instanceof Element)) return;
    var reset = target.closest('[data-pd-reset]');
    if (reset) {
      state = { category: 'All', format: 'All', query: '', expanded: false };
      categoryInput.value = formatInput.value = 'All';
      searchInput.value = '';
      render();
      return;
    }
    var category = target.closest('[data-pd-domain-value]');
    if (category) {
      var newDomain = category.getAttribute('data-pd-domain-value');
      state.category = state.category === newDomain ? 'All' : newDomain;
      categoryInput.value = state.category;
      state.expanded = false;
      render();
      return;
    }
    var format = target.closest('[data-pd-format-value]');
    if (format) {
      var newFormat = format.getAttribute('data-pd-format-value');
      state.format = state.format === newFormat ? 'All' : newFormat;
      formatInput.value = state.format;
      state.expanded = false;
      render();
      return;
    }
    if (target.closest('[data-pd-expand]')) {
      state.expanded = !state.expanded;
      renderProjects(filtered());
      return;
    }
    var open = target.closest('[data-pd-open]');
    if (open) {
      var id = detailPages[open.getAttribute('data-pd-open')];
      if (id && typeof window.openProject === 'function') window.openProject(id);
    }
  });
  render();
})();
