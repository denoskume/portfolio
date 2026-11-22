/* Live Home dashboard. Public GitHub REST API; no tokens, fabricated observations or hidden backend. */
(function () {
  'use strict';

  const root = document.getElementById('projectsDashboard');
  const catalog = window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects;
  if (!root || !Array.isArray(catalog)) return;
  const OWNER = 'denoskume';
  const API = 'https://api.github.com';
  const AUTO_REFRESH_MS = 300000; // five-minute, low-rate public API polling
  const DAY_MS = 86400000;
  const COLORS = {'Computer Vision':'#7568e9','Image Processing':'#20a89b','Machine Learning':'#ec9e73'};
  const ids = {'fluoroscopy-instrument-segmentation':1,'camera-calibration':2,'clap-zero-shot':3};

  const els = {};
  ['status','refresh','search','domain','format','activity','sort','reset','kpis',
   'chart','domains','repositories','events','table','count','notes'].forEach(k => {
    els[k] = root.querySelector('[data-pd-' + k + ']');
  });
  if (Object.values(els).some(el => !el)) return;

  function repoKey(project) {
    const match = String(project.github || '').match(/^https:\/\/github\.com\/([^/?#]+)\/([^/?#]+)/i);
    if (!match || match[1].toLowerCase() !== OWNER) return '';
    return (match[1] + '/' + match[2]).toLowerCase();
  }
  const projects = catalog.filter(p => p && p.title && p.slug).map(p => ({
    ...p, sourceKey: repoKey(p),
    format: p.kind === 'Reproducible laboratory' ? 'Laboratory' :
      p.kind === 'Research experiment' ? 'Research' : 'Case study'
  }));
  const allKeys = new Set(projects.map(p => p.sourceKey).filter(Boolean));
  const sourceSizes = projects.reduce((acc,p) => {
    if (p.sourceKey) acc[p.sourceKey] = (acc[p.sourceKey] || 0) + 1;
    return acc;
  }, {});
  const state = {q:'',domain:'All',format:'All',activity:'All',sort:'latest',week:null};
  const live = {repos:null, events:null, timestamp:null, fetching:false, error:'', eventError:''};
  let lastAttempt = 0;

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g,c =>
      ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  function num(v) {return Number.isFinite(Number(v)) ? Number(v).toLocaleString('en-US') : '—';}
  function when(iso) {
    if (!iso) return 'No push date';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return 'Unknown';
    return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric'}).format(d);
  }
  function ago(iso) {
    const ms = Date.parse(iso || '');
    if (!Number.isFinite(ms)) return 'No push date';
    const days = Math.max(0,Math.floor((Date.now()-ms)/DAY_MS));
    if (days===0) return 'Today';
    if (days===1) return 'Yesterday';
    return days+' days ago';
  }
  function statusFor(repo) {
    if (!repo || !repo.pushed_at) return 'unknown';
    const days = (Date.now()-Date.parse(repo.pushed_at))/DAY_MS;
    if (days <= 7) return '7d';
    if (days <= 30) return '30d';
    return 'older';
  }
  function getRepo(key) {return live.repos ? live.repos.get(key) || null : null;}
  function distinctKeys(rows) {return [...new Set(rows.map(p=>p.sourceKey).filter(Boolean))];}
  function visible() {
    const q = state.q.trim().toLowerCase();
    let rows = projects.filter(p=>{
      if (state.domain !== 'All' && p.category !== state.domain) return false;
      if (state.format !== 'All' && p.format !== state.format) return false;
      if (state.activity !== 'All') {
        const r = getRepo(p.sourceKey);
        if (!r) return false;
        const delta = (Date.now()-Date.parse(r.pushed_at))/DAY_MS;
        if (state.activity === '7d' && !(delta<=7)) return false;
        if (state.activity === '30d' && !(delta<=30)) return false;
        if (state.activity === 'older' && !(delta>30)) return false;
      }
      return !q || [p.title,p.subtitle,p.summary,p.category,p.format,p.kind,
        (p.tags||[]).join(' '),p.sourceKey].join(' ').toLowerCase().includes(q);
    });
    rows.sort((a,b)=>{
      if (state.sort==='name') return a.title.localeCompare(b.title);
      if (state.sort==='stars') {
        return (getRepo(b.sourceKey)?.stargazers_count ?? -1) -
               (getRepo(a.sourceKey)?.stargazers_count ?? -1) || a.title.localeCompare(b.title);
      }
      return (Date.parse(getRepo(b.sourceKey)?.pushed_at||'')||0) -
             (Date.parse(getRepo(a.sourceKey)?.pushed_at||'')||0) || a.title.localeCompare(b.title);
    });
    return rows;
  }
  function labelCard(name,value,subtitle,glyph) {
    return '<article class="pd-kpi"><div class="pd-kpi-top"><span>'+esc(name)+'</span><b aria-hidden="true">'+glyph+
      '</b></div><strong>'+esc(value)+'</strong><small>'+esc(subtitle)+'</small></article>';
  }
  function renderKpis(rows,keys) {
    let active = null, stars = null;
    if (live.repos) {
      const repoRows = keys.map(getRepo).filter(Boolean);
      active = repoRows.filter(r=>statusFor(r)==='7d'||statusFor(r)==='30d').length;
      stars = repoRows.reduce((sum,r)=>sum+(Number(r.stargazers_count)||0),0);
    }
    els.kpis.innerHTML =
      labelCard('Portfolio projects',rows.length,'Projects in the current filter','▦')+
      labelCard('Distinct GitHub sources',keys.length,'Shared repositories counted once','◇')+
      labelCard('Updated repositories · 30d',active===null?'—':num(active),
        live.repos?'Distinct sources with a push in 30 days':'Waiting for live GitHub data','↗')+
      labelCard('GitHub stars',stars===null?'—':num(stars),
        live.repos?'Across distinct linked repositories':'Not available until GitHub connects','☆');
  }
  function renderDomain(rows) {
    const cats=Object.keys(COLORS);
    const total=rows.length;
    if (!total) {els.domains.innerHTML='<div class="pd-blank">No projects match these filters.</div>';return;}
    let pct=0;
    const stops=[];
    const items=cats.map(c=>{
      const n=rows.filter(p=>p.category===c).length;
      if(n){const next=pct+100*n/total;stops.push(COLORS[c]+' '+pct.toFixed(2)+'% '+next.toFixed(2)+'%');pct=next;}
      return '<button type="button" class="pd-legend-row" data-pd-select-domain="'+esc(c)+'" aria-pressed="'+
        (state.domain===c)+'"><span class="pd-dot" style="background:'+COLORS[c]+'"></span><span>'+esc(c)+
        '</span><strong>'+n+'</strong></button>';
    }).join('');
    els.domains.innerHTML='<div class="pd-donut-layout"><div class="pd-donut" role="img" aria-label="'+total+
      ' portfolio projects grouped by domain" style="background:conic-gradient('+stops.join(',')+
      ')"><div class="pd-donut-hole"><strong>'+total+'</strong><small>projects</small></div></div>'+
      '<div class="pd-legend">'+items+'</div></div>';
  }
  function weeks() {
    const end=Date.now(),start=end-28*DAY_MS, result=[];
    for(let i=0;i<4;i++) {
      const lo=start+i*7*DAY_MS,hi=lo+7*DAY_MS;
      result.push({lo,hi,from:when(new Date(lo).toISOString()),to:when(new Date(hi-DAY_MS).toISOString())});
    }
    return result;
  }
  function sampledEvents(keys) {
    if(!live.events) return null;
    const set=new Set(keys);
    return live.events.filter(e=>
      e && e.type==='PushEvent' && e.repo && set.has(String(e.repo.name||'').toLowerCase()) &&
      Number.isFinite(Date.parse(e.created_at||'')));
  }
  function renderChart(keys) {
    const entries=sampledEvents(keys);
    if(entries===null) {
      els.chart.innerHTML='<div class="pd-blank">Recent push-event data unavailable. The chart will appear after a successful GitHub sync.</div>';
      return;
    }
    const bins=weeks(), values=bins.map(w=>entries.filter(e=>{
      const time=Date.parse(e.created_at);return time>=w.lo&&time<w.hi;
    }).length);
    const max=Math.max(...values,1);
    const bars=bins.map((w,i)=>{
      const v=values[i],height=v===0?0:Math.max(12,Math.round(v/max*100));
      return '<button type="button" class="pd-week" data-pd-week="'+i+'" aria-pressed="'+(state.week===i)+
        '" aria-label="'+v+' observed public PushEvents from '+esc(w.from)+' to '+esc(w.to)+'">' +
        '<span class="pd-week-count">'+v+'</span><span class="pd-week-track"><span class="pd-week-fill" style="height:'+height+
        '%"></span></span><span class="pd-week-label">'+esc(w.from.slice(0,-5))+'</span></button>';
    }).join('');
    els.chart.innerHTML='<div class="pd-week-chart" aria-label="Recent public push events by seven-day window">'+bars+'</div>'+
      '<p class="pd-panel-note">Observed public PushEvents from GitHub’s latest 100 public events. This is a limited sample, not complete commit history.'+
      (state.week!==null?' <button type="button" class="pd-clear-week" data-pd-clear-week>Clear selected week</button>':'')+'</p>';
  }
  function renderRepos(keys) {
    if(!live.repos) {
      els.repositories.innerHTML='<div class="pd-blank">Connecting to GitHub for repository timestamps and stars…</div>';
      return;
    }
    if(!keys.length) {els.repositories.innerHTML='<div class="pd-blank">No linked repositories in this selection.</div>';return;}
    els.repositories.innerHTML=keys.map(key=>{
      const r=getRepo(key),slug=key.split('/')[1];
      if(!r) return '<div class="pd-repo"><span class="pd-repo-icon">?</span><div><strong>'+esc(slug)+
        '</strong><small>Repository not returned by the public GitHub API</small></div><span class="pd-state unknown">Unknown</span></div>';
      const recent=statusFor(r),label=recent==='7d'?'Last 7 days':recent==='30d'?'Last 30 days':'Older';
      return '<a class="pd-repo" href="'+esc(r.html_url||'https://github.com/'+key)+'" target="_blank" rel="noopener noreferrer">'+
        '<span class="pd-repo-icon" aria-hidden="true">⌁</span><span class="pd-repo-copy"><strong>'+esc(r.name||slug)+
        '</strong><small>Last push: '+esc(when(r.pushed_at))+' · '+esc(ago(r.pushed_at))+
        (sourceSizes[key]>1?' · shared by '+sourceSizes[key]+' projects':'')+'</small></span>'+
        '<span class="pd-state '+(recent==='older'?'quiet':'recent')+'">'+label+'</span></a>';
    }).join('');
  }
  function renderEvents(keys) {
    const events=sampledEvents(keys);
    if(events===null) {
      els.events.innerHTML='<div class="pd-blank">Public activity feed unavailable. Repository timestamps can still be viewed above.</div>';
      return;
    }
    let rows=events.sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at));
    if(state.week!==null) {
      const w=weeks()[state.week];
      rows=rows.filter(e=>{const t=Date.parse(e.created_at);return t>=w.lo&&t<w.hi;});
    }
    rows=rows.slice(0,5);
    if(!rows.length) {
      els.events.innerHTML='<div class="pd-blank">No PushEvents observed in the selected public activity sample.</div>';
      return;
    }
    els.events.innerHTML='<ol class="pd-event-list">'+rows.map(e=>{
      const key=String(e.repo.name||'').toLowerCase(),name=key.split('/')[1]||key;
      return '<li><span class="pd-event-marker"></span><span><strong>'+esc(name)+
        '</strong><small>Public push event · '+esc(when(e.created_at))+'</small></span>'+
        '<a href="https://github.com/'+esc(key)+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+esc(name)+' on GitHub">↗</a></li>';
    }).join('')+'</ol>';
  }
  function safeLink(url) {
    const str = String(url || '');
    return /^https:\/\/github\.com\/[a-z0-9._-]+\/[a-z0-9._-]+(?:[/?#][^"<>\s]*)?$/i.test(str) ? str : '';
  }
  function renderTable(rows) {
    els.count.textContent=rows.length+' matching '+(rows.length===1?'project':'projects');
    if (!rows.length) {
      els.table.innerHTML='<div class="pd-blank">'+(state.activity!=='All'&&!live.repos?
        'Activity filters require a successful live GitHub connection. Please refresh.' :
        'No projects match the selected filters.')+'</div>';
      return;
    }
    const trs=rows.map(p=>{
      const r=getRepo(p.sourceKey),source=sourceSizes[p.sourceKey]>1;
      const title='<strong>'+esc(p.title)+'</strong><small>'+esc(p.kind||p.format)+'</small>';
      const link=ids[p.slug]?
        '<button class="pd-open" type="button" data-pd-open="'+esc(p.slug)+'">View case study ↗</button>':
        '<a class="pd-open" href="'+esc(safeLink(p.github))+'" target="_blank" rel="noopener noreferrer">View source ↗</a>';
      return '<tr><td class="pd-project-name">'+title+'</td>'+
        '<td><span class="pd-tag">'+esc(p.category)+'</span></td>'+
        '<td><span class="pd-source">'+esc(p.sourceKey.split('/')[1]||'Unknown')+
        (source?'<small>Shared source</small>':'')+'</span></td>'+
        '<td><span class="pd-pushed">'+(r?esc(when(r.pushed_at)):'—')+
        (r?'<small>'+esc(ago(r.pushed_at))+'</small>':'<small>Awaiting GitHub</small>')+'</span></td>'+
        '<td class="pd-numeric">'+(r?num(r.stargazers_count):'—')+'</td><td>'+link+'</td></tr>';
    }).join('');
    els.table.innerHTML='<div class="pd-table-wrap"><table class="pd-table"><thead><tr>'+
      '<th scope="col">Project</th><th scope="col">Domain</th><th scope="col">GitHub source</th>'+
      '<th scope="col">Latest source push</th><th scope="col">Stars</th><th scope="col">Explore</th>'+
      '</tr></thead><tbody>'+trs+'</tbody></table></div>';
  }
  function renderStatus() {
    const button=els.refresh;
    button.disabled=live.fetching;
    button.textContent=live.fetching?'Refreshing…':'↻ Refresh data';
    if(live.fetching&&!live.timestamp){els.status.textContent='Connecting to GitHub…';els.status.dataset.state='loading';return;}
    if(!live.timestamp){
      els.status.textContent=live.error||'Waiting for GitHub sync';
      els.status.dataset.state='error';return;
    }
    const formatted=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit'}).format(live.timestamp);
    els.status.textContent=(live.error?'Stale · last success ':'Live GitHub · synced ')+formatted+
      (live.eventError?' · events unavailable':'');
    els.status.dataset.state=live.error?'stale':'live';
  }
  function render() {
    const rows=visible(),keys=distinctKeys(rows);
    renderStatus();
    renderKpis(rows,keys);
    renderChart(keys);
    renderDomain(rows);
    renderRepos(keys);
    renderEvents(keys);
    renderTable(rows);
    els.notes.textContent='GitHub REST API · '+allKeys.size+' distinct public source repositories linked from '+
      projects.length+' portfolio projects. Metadata is fetched directly in your browser, approximately every 5 minutes. '+
      'Shared-source push dates do not prove every laboratory changed. Private repository data is not included.';
  }
  async function json(url) {
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),14000);
    try {
      const response=await fetch(url,{method:'GET',headers:{Accept:'application/vnd.github+json'},cache:'no-store',signal:controller.signal});
      if(!response.ok) throw new Error(response.status===403||response.status===429?
        'GitHub API rate limit or access restriction':'GitHub API returned '+response.status);
      return await response.json();
    } finally {clearTimeout(timer);}
  }
  async function refresh(force) {
    if(live.fetching||(!force&&Date.now()-lastAttempt<AUTO_REFRESH_MS))return;
    // Even manual reloads are limited to once every 15 seconds.
    if(force&&Date.now()-lastAttempt<15000)return;
    lastAttempt=Date.now();
    live.fetching=true;live.error='';renderStatus();
    const results=await Promise.allSettled([
      json(API+'/users/'+OWNER+'/repos?type=owner&sort=pushed&per_page=100'),
      json(API+'/users/'+OWNER+'/events/public?per_page=100')
    ]);
    const repoResult=results[0],eventResult=results[1];
    if(repoResult.status==='fulfilled'&&Array.isArray(repoResult.value)){
      const map=new Map();
      repoResult.value.forEach(r=>{
        const key=String(r.full_name||'').toLowerCase();
        if(allKeys.has(key))map.set(key,r);
      });
      live.repos=map;
      live.timestamp=new Date();
      live.error='';
    } else {
      live.error=repoResult.status==='rejected'?
        (repoResult.reason&&repoResult.reason.message||'GitHub API unavailable') :
        'Unexpected repository response';
    }
    if(eventResult.status==='fulfilled'&&Array.isArray(eventResult.value)){
      live.events=eventResult.value;live.eventError='';
    } else {
      live.eventError='Public events could not be fetched';
      // Do not leave an old event sample labeled as current.
      live.events=null;
    }
    live.fetching=false;
    render();
  }
  function setFilter(key,value) {
    state[key]=value;
    if(key!=='week')state.week=null;
    render();
  }
  ['search','domain','format','activity','sort'].forEach(key=>{
    els[key].addEventListener(key==='search'?'input':'change',()=>{
      setFilter(key==='search'?'q':key,els[key].value);
    });
  });
  els.reset.addEventListener('click',()=>{
    Object.assign(state,{q:'',domain:'All',format:'All',activity:'All',sort:'latest',week:null});
    els.search.value='';
    els.domain.value=els.format.value=els.activity.value='All';
    els.sort.value='latest';
    render();
  });
  els.refresh.addEventListener('click',()=>refresh(true));
  root.addEventListener('click',event=>{
    const node=event.target.closest('button');
    if(!node)return;
    const d=node.getAttribute('data-pd-select-domain');
    if(d){state.domain=state.domain===d?'All':d;els.domain.value=state.domain;state.week=null;render();return;}
    const w=node.getAttribute('data-pd-week');
    if(w!==null){const n=Number(w);state.week=state.week===n?null:n;render();return;}
    if(node.hasAttribute('data-pd-clear-week')){state.week=null;render();return;}
    const slug=node.getAttribute('data-pd-open');
    if(slug&&ids[slug]&&typeof window.openProject==='function')window.openProject(ids[slug]);
  });
  document.addEventListener('visibilitychange',()=>{
    if(!document.hidden&&Date.now()-lastAttempt>=AUTO_REFRESH_MS)refresh(false);
  });
  setInterval(()=>{if(!document.hidden)refresh(false);},AUTO_REFRESH_MS);
  render();
  refresh(false);
})();
