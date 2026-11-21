/* Academic case study with journal-style Report, Figures and Metrics views. */
window.renderFluoroCaseStudy = function renderFluoroCaseStudy(){
  const raw = "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/";
  const repo = "https://github.com/denoskume/Background-Subtraction-Fluoroscopy";
  const frames = [201,211,221,231,241,251,261,271,281,291];
  const toc = [
    {key:"report",entries:[["fl-r-abstract","Abstract"],["fl-r-brief","Dataset & objectives"],["fl-r-problem","The challenge"],["fl-r-method","Methodology"],["fl-r-outcome","Conclusion & limitations"]]},
    {key:"figures",entries:[["fl-f-input","Input images"],["fl-f-method","Reconstruction comparison"],["fl-f-results","Final predictions"],["fl-f-demo","Video demonstration"]]},
    {key:"metrics",entries:[["fl-m-dice","Dice comparison"],["fl-m-baselines","Initial methods"],["fl-m-errors","Detection errors"],["fl-m-frames","Frame explorer"]]}
  ];
  return `
<article class="fluoro-study" aria-labelledby="fl-title">
  <div class="fl-backbar"><button type="button" onclick="showSection('projects')">Back to projects</button></div>
  <div class="fl-paper-shell">
    <main class="fl-paper-main">
      <header class="fl-paper-header">
        <h1 id="fl-title">Microcatheter segmentation in fluoroscopy</h1>
        <p class="fl-paper-question">Can we detect a thin instrument in noisy X-ray images and reconstruct its full path accurately?</p>
        <p class="fl-paper-authors">Denos Kume &amp; Oluwole Shokunbi · Master 1 project · Centrale Nantes</p>
      </header>
      <div class="fl-paper-tabs" role="tablist" aria-label="Project case study views">
        <button id="fl-tab-report" class="fl-paper-tab is-active" type="button" role="tab" data-fl-tab="report" aria-selected="true" aria-controls="fl-panel-report" tabindex="0">Report</button>
        <button id="fl-tab-figures" class="fl-paper-tab" type="button" role="tab" data-fl-tab="figures" aria-selected="false" aria-controls="fl-panel-figures" tabindex="-1">Figures</button>
        <button id="fl-tab-metrics" class="fl-paper-tab" type="button" role="tab" data-fl-tab="metrics" aria-selected="false" aria-controls="fl-panel-metrics" tabindex="-1">Metrics</button>
      </div>
      <nav class="fl-paper-actions" aria-label="Project resources">
        <a href="${repo}" target="_blank" rel="noopener noreferrer">Source code</a>
        <a href="${repo}/blob/main/Fluoroscopy_Instrument_Segmentation.ipynb" target="_blank" rel="noopener noreferrer">Notebook</a>
        <a href="${repo}/blob/main/frame_comparison.csv" target="_blank" rel="noopener noreferrer">Results data</a>
      </nav>

      <div class="fl-paper-panel" id="fl-panel-report" data-fl-panel="report" role="tabpanel" aria-labelledby="fl-tab-report" tabindex="0">
        <section class="fl-paper-section" id="fl-r-abstract">
          <h2>Abstract</h2>
          <p>In this Master 1 computer vision and image-processing project, we investigated how to identify thin guidewires and microcatheters in a sequence of fluoroscopic X-ray images. Low contrast, noise and surrounding anatomical structures make it difficult to isolate a complete instrument path.</p>
          <p>We implemented a background-subtraction pipeline, compared three classical segmentation methods against manual annotations, then explored continuous-path reconstruction to address incomplete and fragmented predictions. We evaluated the results frame by frame to understand both the improvements and the remaining limitations.</p>
        </section>

        <section class="fl-paper-section" id="fl-r-brief">
          <h2>Dataset, objective and requirements</h2>
          <h3>Dataset</h3>
          <p>The supplied dataset contains ten 512 × 512 grayscale X-ray frames and twenty manual tracings. Frame 201 is the reference for background subtraction, while the nine subsequent frames are used for the reported motion-frame comparisons. Manual tracings provide the reference masks.</p>
          <div class="fl-facts" aria-label="Dataset facts">
            <div><strong>10</strong><span>X-ray frames</span></div>
            <div><strong>512 × 512</strong><span>Resolution</span></div>
            <div><strong>20</strong><span>Manual tracings</span></div>
          </div>
          <h3>Objective</h3>
          <p>Identify instrument pixels, reconstruct a continuous path, and compare each prediction with the manually traced reference.</p>
          <h3>Project requirements</h3>
          <p>Enhance and preprocess the images; implement fixed thresholding, Otsu thresholding and Gaussian-mixture segmentation; export binary instrument masks; and assess output quality through Dice, IoU, PSNR and visual error inspection. The later connected-path extension was evaluated for path continuity and improved overlap.</p>
          <p>No predefined minimum Dice target is specified in the project repository, so success is assessed through reproducible outputs and measured improvement rather than a claimed pass threshold.</p>
        </section>

        <section class="fl-paper-section" id="fl-r-problem">
          <h2>The challenge</h2>
          <p>The instrument can occupy only a small part of a frame. Its dark line may resemble anatomical edges, while weak movement makes some shaft segments difficult to detect through background subtraction. Noise may introduce false detections and split the predicted instrument into disconnected pieces.</p>
          <p>The challenge was therefore not only to detect individual candidate pixels but also to recover a plausible, connected instrument path. <button class="fl-inline-link" type="button" data-fl-open-panel="figures" data-fl-jump="fl-f-input">View the original and enhanced frames</button>.</p>
        </section>

        <section class="fl-paper-section" id="fl-r-method">
          <h2>Methodology</h2>
          <div class="fl-method-steps" aria-label="Processing pipeline">
            <span>Prepare</span><span>Subtract</span><span>Segment</span><span>Reconnect</span>
          </div>
          <h3>Classical segmentation</h3>
          <p>We first improved image contrast and reduced noise, then compared each frame with the reference to highlight motion. Fixed thresholding, Otsu thresholding and a two-component Gaussian mixture produced candidate binary masks. Their measured overlap with manual annotations established the initial comparison.</p>
          <p>The masks sometimes missed stationary instrument segments or retained irrelevant anatomical edges. The original method scores are available in the <button class="fl-inline-link" type="button" data-fl-open-panel="metrics" data-fl-jump="fl-m-baselines">Metrics comparison</button>.</p>
          <h3>Continuous-path reconstruction</h3>
          <p>To address fragmented detections, a supervised ExtraTrees model scored candidate pixels using line appearance and temporal change. A path-search step then joined high-scoring pixels into one connected centerline, assuming that the instrument enters from the lower border of these images.</p>
          <p>The resulting prediction was compared with the earlier mask and the manual reference. <button class="fl-inline-link" type="button" data-fl-open-panel="figures" data-fl-jump="fl-f-method">See the reconstruction comparison</button>.</p>
        </section>

        <section class="fl-paper-section" id="fl-r-outcome">
          <h2>Did we meet the objective?</h2>
          <p><strong>Yes, within the supplied Master 1 image sequence.</strong> We generated masks for all ten frames, and the reconstructed predictions each formed a connected component. Across the nine motion frames, mean Dice improved from <strong>0.501 to 0.876</strong>, a gain of <strong>0.375 Dice points</strong>.</p>
          <p>The reconstructed masks also reduced false-positive pixels from 22,472 to 3,553 and missed instrument pixels from 5,240 to 2,511. Enforcing a continuous path helped recover segments that independent pixel predictions had lost.</p>
          <h3>Limitations and next steps</h3>
          <p>All results come from one supplied acquisition. The model and path settings were explored using that sequence, and reconstruction assumes entry from the lower frame border. Future work should evaluate other image sequences with different instrument positions, motion and image quality.</p>
        </section>
      </div>

      <div class="fl-paper-panel" id="fl-panel-figures" data-fl-panel="figures" role="tabpanel" aria-labelledby="fl-tab-figures" tabindex="0" hidden>
        <div class="fl-panel-intro"><h2>Figures</h2><p>Experimental images and reconstructions produced in the project. Select a figure to open it at full resolution.</p></div>
        <section class="fl-figure-section" id="fl-f-input">
          <h3>Original and enhanced images</h3>
          <p>Contrast enhancement makes the image structures easier to inspect before subtraction and segmentation.</p>
          <figure class="fl-scientific-figure">
            <a href="${raw}assets/grayscale-comparison.png" target="_blank" rel="noopener noreferrer"><img src="${raw}assets/grayscale-comparison.png" loading="lazy" decoding="async" alt="Project figure showing original and enhanced fluoroscopy frame 291"></a>
            <figcaption><strong>Figure 1.</strong> Original and enhanced image of frame 291.</figcaption>
          </figure>
        </section>
        <section class="fl-figure-section" id="fl-f-method">
          <h3>Comparison with the manual reference</h3>
          <p>The earlier prediction contains gaps; continuous reconstruction recovers a connected line that more closely follows the manual tracing.</p>
          <figure class="fl-scientific-figure">
            <a href="${raw}assets/mask-cleanup.png" target="_blank" rel="noopener noreferrer"><img src="${raw}assets/mask-cleanup.png" loading="lazy" decoding="async" alt="Project figure comparing previous prediction, continuous trace and manual tracing for frame 291"></a>
            <figcaption><strong>Figure 2.</strong> Previous prediction, continuous trace and manual reference — frame 291.</figcaption>
          </figure>
        </section>
        <section class="fl-figure-section" id="fl-f-results">
          <h3>Reconstructed paths across the sequence</h3>
          <p>All ten final predictions are shown in chronological order, with each frame's Dice score.</p>
          <figure class="fl-scientific-figure">
            <a href="${raw}assets/segmentation-comparison.png" target="_blank" rel="noopener noreferrer"><img src="${raw}assets/segmentation-comparison.png" loading="lazy" decoding="async" alt="Project figure showing ten held-out reconstructed paths with their Dice scores"></a>
            <figcaption><strong>Figure 3.</strong> Reconstructed instrument paths and frame-level Dice scores.</figcaption>
          </figure>
        </section>
        <section class="fl-figure-section" id="fl-f-demo">
          <h3>Video demonstration</h3>
          <p>A recorded demonstration of the reconstructed paths, presented after the results and figures.</p>
          <figure class="fl-scientific-video">
            <video controls playsinline preload="metadata" poster="${raw}assets/segmentation-comparison.png" aria-label="Recorded microcatheter segmentation demonstration"><source src="${raw}assets/demo-web.mp4" type="video/mp4">Your browser does not support HTML5 video.</video>
          </figure>
        </section>
      </div>

      <div class="fl-paper-panel" id="fl-panel-metrics" data-fl-panel="metrics" role="tabpanel" aria-labelledby="fl-tab-metrics" tabindex="0" hidden>
        <div class="fl-panel-intro"><h2>Metrics</h2><p>Quantitative evaluation against manual masks. The aggregate comparison below uses nine motion frames (211–291) from the same sequence.</p></div>
        <section class="fl-metric-section" id="fl-m-dice">
          <h3>Continuous-trace improvement</h3>
          <p>Dice measures predicted-mask overlap with the reference, from 0 (no overlap) to 1 (perfect overlap). Higher values are better.</p>
          <div class="fl-score" aria-label="Dice improvement from 0.501 to 0.876, a gain of 0.375 points">
            <div><span>Previous prediction</span><strong>0.501</strong></div>
            <div><span>Continuous trace</span><strong>0.876</strong></div>
            <div class="fl-score-gain"><span>Dice improvement</span><strong>+0.375</strong></div>
          </div>
          <figure class="fl-chart">
            <div class="fl-chart-heading"><h4>Dice score by frame</h4>
              <div class="fl-legend"><span><i class="fl-line-old"></i>Previous prediction</span><span><i class="fl-line-new"></i>Continuous trace</span></div>
            </div>
            <div id="fl-dice-plot" class="fl-dice-plot" aria-label="Line chart comparing previous and reconstructed Dice across motion frames"></div>
          </figure>
        </section>
        <section class="fl-metric-section" id="fl-m-baselines">
          <h3>Initial segmentation methods</h3>
          <p>The earlier classical methods were evaluated before connected-path reconstruction. These scores are a different processing stage from the 0.501 comparison above.</p>
          <div class="fl-metric-table-wrap">
            <table class="fl-metric-table">
              <thead><tr><th>Method</th><th>Mean Dice</th><th>Mean IoU</th><th>Mean PSNR</th></tr></thead>
              <tbody>
                <tr><td>Fixed threshold (0.10)</td><td>0.416</td><td>0.280</td><td>16.57 dB</td></tr>
                <tr><td>Otsu threshold</td><td>0.412</td><td>0.295</td><td>13.95 dB</td></tr>
                <tr><td>Gaussian mixture</td><td>0.385</td><td>0.249</td><td>15.30 dB</td></tr>
              </tbody>
            </table>
          </div>
          <p>The fixed threshold had the highest mean Dice of these three methods. Dice and IoU measure instrument overlap; PSNR reflects whole-image pixel error and should not be interpreted on its own.</p>
        </section>
        <section class="fl-metric-section" id="fl-m-errors">
          <h3>False detections and missed pixels</h3>
          <p>Across nine motion frames, continuous reconstruction reduced both types of error compared with the previous prediction.</p>
          <div class="fl-error-comparison">
            <div><h4>False-positive pixels</h4><p><span>22,472</span><span aria-hidden="true">→</span><strong>3,553</strong></p></div>
            <div><h4>Missed instrument pixels</h4><p><span>5,240</span><span aria-hidden="true">→</span><strong>2,511</strong></p></div>
          </div>
        </section>
        <section class="fl-metric-section" id="fl-m-frames">
          <h3>Inspect individual frames</h3>
          <p>Choose one of the ten images to inspect the exported review figure and its frame-level scores. Frame 201 is the reference frame and is not included in the nine-frame mean above.</p>
          <div class="fl-frame-selector" role="group" aria-label="Choose a fluoroscopy frame">
            ${frames.map(n=>`<button type="button" data-fluoro-frame="${n}" ${n===291?'class="selected" aria-pressed="true"':''}>${n}</button>`).join("")}
          </div>
          <figure class="fl-frame-figure">
            <a id="fl-frame-link" href="${raw}review/frame_291_review.png" target="_blank" rel="noopener noreferrer">
              <img id="fl-frame-image" src="${raw}review/frame_291_review.png" alt="Experiment review image for frame 291" loading="lazy">
            </a>
            <figcaption><strong id="fl-frame-caption">Frame 291</strong><span id="fl-frame-info" aria-live="polite">Previous Dice: 0.588 · Continuous-trace Dice: 0.849 · False positives: 811 · Missed pixels: 414</span></figcaption>
          </figure>
        </section>
      </div>
    </main>

    <aside class="fl-paper-sidebar" aria-label="Project article contents">
      <div class="fl-sidebar-sticky">
        <h2>Contents</h2>
        ${toc.map(group=>`<nav class="fl-toc-group" data-fl-toc="${group.key}" aria-label="${group.key} sections" ${group.key==='report'?'':'hidden'}>${group.entries.map(([id,label])=>`<a href="#${id}" data-fl-target-tab="${group.key}" data-fl-target-id="${id}" ${id==='fl-r-abstract'?'class="is-current"':''}>${label}</a>`).join("")}</nav>`).join("")}
      </div>
    </aside>
  </div>
</article>`;
};
window.initFluoroCaseStudy = function initFluoroCaseStudy() {
  const root = document.querySelector(".fluoro-study");
  if (!root) return;

  const tabButtons = Array.from(root.querySelectorAll("[data-fl-tab]"));
  const panels = Array.from(root.querySelectorAll("[data-fl-panel]"));
  const tocGroups = Array.from(root.querySelectorAll("[data-fl-toc]"));
  let activeView = "report";

  function selectTocEntry(id) {
    root.querySelectorAll("[data-fl-target-id]").forEach(link => {
      const selected = link.dataset.flTargetId === id;
      link.classList.toggle("is-current", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  function activateView(view, options = {}) {
    if (!["report", "figures", "metrics"].includes(view)) return;
    activeView = view;
    tabButtons.forEach(button => {
      const selected = button.dataset.flTab === view;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.flPanel !== view; });
    tocGroups.forEach(group => { group.hidden = group.dataset.flToc !== view; });

    const activeGroup = tocGroups.find(group => group.dataset.flToc === view);
    const selectedAnchor = options.targetId || activeGroup?.querySelector("[data-fl-target-id]")?.dataset.flTargetId;
    if (selectedAnchor) selectTocEntry(selectedAnchor);
    if (options.targetId) {
      requestAnimationFrame(() => {
        const target = root.querySelector("#" + options.targetId);
        if (target && !target.closest("[hidden]")) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else if (options.scroll) {
      root.querySelector(".fl-paper-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => activateView(button.dataset.flTab, { scroll: true }));
    button.addEventListener("keydown", event => {
      const keys = { ArrowRight: (index + 1) % tabButtons.length, ArrowLeft: (index + tabButtons.length - 1) % tabButtons.length, Home: 0, End: tabButtons.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      const next = tabButtons[keys[event.key]];
      next.focus();
      activateView(next.dataset.flTab);
    });
  });
  root.querySelectorAll("[data-fl-target-tab]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      activateView(link.dataset.flTargetTab, { targetId: link.dataset.flTargetId });
    });
  });
  root.querySelectorAll("[data-fl-open-panel]").forEach(button => {
    button.addEventListener("click", () => activateView(button.dataset.flOpenPanel, { targetId: button.dataset.flJump }));
  });
  activateView(activeView);

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
