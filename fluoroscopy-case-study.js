/* Focused, source-grounded fluoroscopy case study */
window.renderFluoroCaseStudy = function renderFluoroCaseStudy(){
 const raw="https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/";
 const repo="https://github.com/denoskume/Background-Subtraction-Fluoroscopy";
 return `
<article class="fluoro-study" aria-labelledby="fl-title">
  <div class="fl-crumb"><button type="button" onclick="showSection('projects')">Back to projects</button></div>
  <header class="fl-cover">
    <div class="fl-cover-copy">
      <h1 id="fl-title">Microcatheter segmentation in fluoroscopy</h1>
      <p class="fl-lead">Detecting thin instruments in noisy X-ray images, then reconstructing their paths as continuous lines.</p>
      <div class="fl-cover-stats">
        <div><strong>0.876</strong><span>Mean Dice score</span></div>
        <div><strong>10</strong><span>Annotated frames</span></div>
      </div>
    </div>
    <figure class="fl-cover-video">
      <video controls playsinline preload="metadata" poster="${raw}assets/segmentation-comparison.png" aria-label="Recorded demonstration of microcatheter segmentation">
        <source src="${raw}assets/demo-web.mp4" type="video/mp4">Your browser does not support HTML5 video.
      </video>
    </figure>
  </header>

  <section class="fl-chapter" id="fl-problem">
    <div class="fl-chapter-intro">
      <h2>The instrument almost disappears into the image.</h2>
      <p>In fluoroscopy, the microcatheter or guidewire is thin, low contrast, and easily confused with anatomy. We need to distinguish the instrument from the background and compare its position against manual tracings.</p>
    </div>
    <figure class="fl-visual fl-visual-wide">
      <a href="${raw}assets/grayscale-comparison.png" target="_blank" rel="noopener noreferrer">
        <img src="${raw}assets/grayscale-comparison.png" loading="lazy" decoding="async" alt="Actual original and enhanced grayscale fluoroscopy frame 291">
      </a>
      <figcaption>Original and enhanced fluoroscopy images, frame 291.</figcaption>
    </figure>
  </section>

  <section class="fl-chapter" id="fl-method">
    <div class="fl-chapter-intro">
      <h2>Detect the instrument, then reconnect its path.</h2>
      <p>We analysed ten 512 × 512 fluoroscopy frames. Frame 201 is the background reference; the other nine show the instrument moving.</p>
    </div>
    <div class="fl-process" aria-label="Processing stages">
      <div>Prepare</div><div>Subtract</div><div>Segment</div><div>Reconnect</div>
    </div>

    <div class="fl-method-row fl-baseline-row">
      <div class="fl-method-copy">
        <h3>First, identify possible instrument pixels</h3>
        <p>After contrast enhancement and background subtraction, we compared three segmentation methods. Each produces an initial mask, but the thin instrument is often fragmented or confused with surrounding anatomy.</p>
      </div>
      <div class="fl-baseline-table">
        <h4>Initial segmentation performance</h4>
        <table>
          <thead><tr><th>Method</th><th>Mean Dice</th></tr></thead>
          <tbody>
            <tr><td>Fixed threshold</td><td>0.416</td></tr>
            <tr><td>Otsu threshold</td><td>0.412</td></tr>
            <tr><td>Gaussian mixture</td><td>0.385</td></tr>
          </tbody>
        </table>
        <p>Compared with manual tracings before connected-path reconstruction.</p>
      </div>
    </div>

    <div class="fl-method-row fl-reconstruction-row">
      <div class="fl-method-copy">
        <h3>Then, reconstruct a continuous path</h3>
        <p>A supervised ExtraTrees model scores pixels using line appearance and changes over time. A path-search algorithm joins the strongest candidates into one connected centerline.</p>
        <p>The image compares the earlier fragmented prediction, reconstructed trace and manual annotation for the same frame.</p>
      </div>
      <figure class="fl-visual">
        <a href="${raw}assets/mask-cleanup.png" target="_blank" rel="noopener noreferrer">
          <img src="${raw}assets/mask-cleanup.png" loading="lazy" decoding="async" alt="Frame 291: fragmented previous mask, continuous reconstructed trace and manual annotation">
        </a>
        <figcaption>Frame 291: previous prediction, continuous trace, and manual reference.</figcaption>
      </figure>
    </div>
  </section>

  <section class="fl-chapter" id="fl-results">
    <div class="fl-chapter-intro">
      <h2>Does reconstruction produce a better match?</h2>
      <p>We compared the reconstructed path with manually traced instruments. Dice measures how closely the masks overlap: 1 means a perfect match.</p>
    </div>
    <div class="fl-score" aria-label="Mean Dice across nine motion frames">
      <div><small>Previous prediction</small><strong>0.501</strong></div>
      <span class="fl-score-separator" aria-hidden="true"></span>
      <div><small>Continuous trace</small><strong>0.876</strong></div>
    </div>
    <figure class="fl-visual fl-visual-results">
      <a href="${raw}assets/segmentation-comparison.png" target="_blank" rel="noopener noreferrer">
        <img src="${raw}assets/segmentation-comparison.png" loading="lazy" decoding="async" alt="All ten final continuous-trace predictions in chronological order, with each frame's Dice score">
      </a>
      <figcaption>Final reconstructed traces across all ten frames. The numbers above each trace show its Dice score.</figcaption>
    </figure>
    <figure class="fl-chart">
      <div class="fl-chart-heading">
        <h3>Dice score by frame</h3>
        <div class="fl-legend"><span><i class="fl-line-old"></i>Previous prediction</span><span><i class="fl-line-new"></i>Continuous trace</span></div>
      </div>
      <div id="fl-dice-plot" class="fl-dice-plot"></div>
    </figure>

    <details class="fl-extras fl-frame-extras">
      <summary>Explore all 10 annotated frames</summary>
      <div class="fl-frames">
        <div class="fl-frame-selector" role="group" aria-label="Choose fluoroscopy frame">
          ${[201,211,221,231,241,251,261,271,281,291].map(n=>`<button type="button" data-fluoro-frame="${n}" ${n===291?'class="selected" aria-pressed="true"':''}>${n}</button>`).join("")}
        </div>
        <figure class="fl-frame-figure">
          <a id="fl-frame-link" href="${raw}review/frame_291_review.png" target="_blank" rel="noopener noreferrer">
            <img id="fl-frame-image" src="${raw}review/frame_291_review.png" alt="Real frame 291 review image" loading="lazy">
          </a>
          <figcaption><strong id="fl-frame-caption">Frame 291</strong><span id="fl-frame-info" aria-live="polite">Previous Dice: 0.588 · Continuous-trace Dice: 0.849 · False positives: 811 · Missed pixels: 414</span></figcaption>
        </figure>
      </div>
    </details>
  </section>

  <section class="fl-conclusion">
    <div>
      <h2>A stronger trace, with clear limits.</h2>
      <p>Connected-path reconstruction improves segmentation on this one acquisition. Independent sequences and clinical review are still needed before the method can be considered generalizable.</p>
      <p class="fl-credits">Academic project by Denos Kume and Oluwole Shokunbi at Centrale Nantes.</p>
    </div>
    <div class="fl-conclusion-links">
      <a class="fl-primary-link" href="${repo}" target="_blank" rel="noopener noreferrer">Explore repository</a>
      <a href="${repo}/blob/main/Fluoroscopy_Instrument_Segmentation.ipynb" target="_blank" rel="noopener noreferrer">Read the notebook</a>
      <a href="${repo}/blob/main/frame_comparison.csv" target="_blank" rel="noopener noreferrer">View experimental results</a>
    </div>
  </section>
</article>`;
};
window.initFluoroCaseStudy = function initFluoroCaseStudy() {
  const root = document.querySelector(".fluoro-study");
  if (!root) return;
  const data = [
    {frame:201, baseline:0.0, continuous:0.9319323892, fp:86, missed:63},
    {frame:211, baseline:0.0834621329, continuous:0.9316827144, fp:94, missed:55},
    {frame:221, baseline:0.2866287340, continuous:0.8180051813, fp:444, missed:118},
    {frame:231, baseline:0.4672863131, continuous:0.8889472302, fp:221, missed:202},
    {frame:241, baseline:0.5962850644, continuous:0.8830922457, fp:271, missed:222},
    {frame:251, baseline:0.5828748766, continuous:0.8472068073, fp:435, missed:391},
    {frame:261, baseline:0.5442917144, continuous:0.8835010674, fp:384, missed:380},
    {frame:271, baseline:0.6673110381, continuous:0.8783691339, fp:480, missed:409},
    {frame:281, baseline:0.6905573468, continuous:0.9078798542, fp:413, missed:320},
    {frame:291, baseline:0.5875759878, continuous:0.8486720198, fp:811, missed:414}
  ];
  const chartData = data.slice(1);
  const svgNS = "http://www.w3.org/2000/svg";
  const x = i => 75 + i * (740 / 8);
  const y = val => 235 - val * 180;
  const toPoints = key => chartData.map((d,i)=>`${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ");
  const plot = `<svg viewBox="0 0 890 300" xmlns="${svgNS}" role="img" aria-label="Dice scores for frames 211 through 291, previous prediction versus continuous-trace reconstruction">
      <title>Dice score per motion frame, previous prediction compared with continuous trace</title>
      ${[0,.25,.5,.75,1].map(v=>`<g><line x1="75" y1="${y(v)}" x2="825" y2="${y(v)}" stroke="#dfe7ee" stroke-width="1"/><text x="59" y="${y(v)+4}" text-anchor="end" font-size="12" fill="#5c7183">${v.toFixed(2)}</text></g>`).join("")}
      ${chartData.map((d,i)=>`<text x="${x(i)}" y="261" text-anchor="middle" font-size="11.5" fill="#4d6174">${d.frame}</text>`).join("")}
      <polyline fill="none" stroke="#b48c4a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${toPoints("baseline")}"/>
      <polyline fill="none" stroke="#11538a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" points="${toPoints("continuous")}"/>
      ${chartData.map((d,i)=>`<g><circle cx="${x(i)}" cy="${y(d.baseline)}" r="4.5" fill="#b48c4a" stroke="#fff" stroke-width="1.5"/><circle cx="${x(i)}" cy="${y(d.continuous)}" r="5" fill="#11538a" stroke="#fff" stroke-width="1.5"/></g>`).join("")}
      <text x="450" y="287" text-anchor="middle" font-size="12" fill="#4d6174">Fluoroscopy frame</text>
    </svg>`;
  const plotNode = root.querySelector("#fl-dice-plot");
  if (plotNode) plotNode.innerHTML = plot;
  const image = root.querySelector("#fl-frame-image");
  const link = root.querySelector("#fl-frame-link");
  const caption = root.querySelector("#fl-frame-caption");
  const info = root.querySelector("#fl-frame-info");
  root.querySelectorAll("[data-fluoro-frame]").forEach(button => {
    button.setAttribute("aria-pressed",String(button.dataset.fluoroFrame === "291"));
    button.addEventListener("click", () => {
      const frame = Number(button.dataset.fluoroFrame);
      const row = data.find(item => item.frame === frame);
      if (!row) return;
      const url = `https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/review/frame_${frame}_review.png`;
      image.src = url;
      image.alt = `Actual review image for fluoroscopy frame ${frame}`;
      link.href = url;
      caption.textContent = frame === 201 ? "Frame 201 · background reference" : `Frame ${frame}`;
      info.textContent = `Previous Dice: ${row.baseline.toFixed(3)} · Continuous-trace Dice: ${row.continuous.toFixed(3)} · False positives: ${row.fp} · Missed pixels: ${row.missed}`;
      root.querySelectorAll("[data-fluoro-frame]").forEach(b => {
        const selected = b === button;
        b.classList.toggle("selected",selected);
        b.setAttribute("aria-pressed",String(selected));
      });
    });
  });
};
