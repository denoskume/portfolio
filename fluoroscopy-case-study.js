/* Academic case study with journal-style Report, Figures and Metrics views. */
window.renderFluoroCaseStudy = function renderFluoroCaseStudy(){
  const raw = "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/";
  const repo = "https://github.com/denoskume/Background-Subtraction-Fluoroscopy";
  const frames = [201,211,221,231,241,251,261,271,281,291];
  const toc = [
    {key:"report",entries:[["fl-r-abstract","Abstract"],["fl-r-keywords","Keywords & information"],["fl-r-intro","1.0 Introduction"],["fl-r-dataset","2.0 Dataset & objectives"],["fl-r-method","3.0 Methodology"],["fl-r-results","4.0 Experimental results"],["fl-r-discussion","5.0 Discussion & conclusion"]]},
    {key:"figures",entries:[["fl-f-input","Figure 1 · Input images"],["fl-f-method","Figure 2 · Reconstruction"],["fl-f-results","Figure 3 · Predictions"],["fl-f-demo","Video demonstration"]]},
    {key:"metrics",entries:[["fl-m-dice","Dice comparison"],["fl-m-baselines","Initial methods"],["fl-m-errors","Detection errors"],["fl-m-frames","Frame explorer"]]}
  ];
  return `
<article class="fluoro-study" aria-labelledby="fl-title">
  <div class="fl-backbar"><button type="button" onclick="showSection('projects')">Back to projects</button></div>
  <div class="fl-paper-shell">
    <div class="fl-paper-main">
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
      <div class="fl-paper-actions" role="group" aria-label="Report actions">
        <button type="button" data-fl-action="save"><span aria-hidden="true">↓</span> Save PDF</button>
        <button type="button" data-fl-action="share"><span aria-hidden="true">↗</span> Share</button>
        <button type="button" data-fl-action="cite"><span aria-hidden="true">“ ”</span> Cite</button>
        <button type="button" data-fl-action="rights">Rights &amp; Permissions</button>
        <span id="fl-action-status" class="fl-action-status" role="status" aria-live="polite"></span>
      </div>

      <div class="fl-paper-panel" id="fl-panel-report" data-fl-panel="report" role="tabpanel" aria-labelledby="fl-tab-report" tabindex="0">

        <section class="fl-paper-section" id="fl-r-abstract">
          <h2>Abstract</h2>
          <p>This Master 1 project at Centrale Nantes investigated how to detect thin guidewires and microcatheters in fluoroscopic X-ray images. The instrument occupies a small portion of each frame and can be confused with noisy anatomical edges, making complete segmentation difficult.</p>
          <p>We built a background-subtraction pipeline, evaluated fixed thresholding, Otsu thresholding and Gaussian-mixture segmentation against manual annotations, then explored supervised pixel scoring and continuous-path reconstruction to recover missed segments. Over nine motion frames from the supplied sequence, mean Dice improved from <strong>0.501 to 0.876</strong> after reconstruction. The project demonstrates improved within-sequence segmentation; its robustness on independent sequences remains untested.</p>
        </section>

        <section class="fl-paper-section fl-keywords-section" id="fl-r-keywords">
          <h2>Keywords</h2>
          <div class="fl-keywords" aria-label="Project keywords">
            <span>Computer Vision</span><span>Image Processing</span><span>Fluoroscopy</span><span>Background Subtraction</span><span>Segmentation</span><span>ExtraTrees</span><span>Dice Score</span><span>Path Reconstruction</span>
          </div>
          <h2>Project information</h2>
          <div class="fl-info-table" role="table" aria-label="Project information">
            <div role="row"><strong role="rowheader">Type</strong><span role="cell">Master 1 academic project</span></div>
            <div role="row"><strong role="rowheader">Institution</strong><span role="cell">Centrale Nantes · MSc Control &amp; Robotics</span></div>
            <div role="row"><strong role="rowheader">Authors</strong><span role="cell">Denos Kume and Oluwole Shokunbi</span></div>
            <div role="row"><strong role="rowheader">Data</strong><span role="cell">10 frames (512 × 512), 20 manual tracings</span></div>
            <div role="row"><strong role="rowheader">Resources</strong><span role="cell"><a href="${repo}" target="_blank" rel="noopener noreferrer">GitHub repository</a> · <a href="${repo}/blob/main/Fluoroscopy_Instrument_Segmentation.ipynb" target="_blank" rel="noopener noreferrer">Notebook</a> · <a href="${repo}/blob/main/frame_comparison.csv" target="_blank" rel="noopener noreferrer">Results CSV</a></span></div>
          </div>
        </section>

        <section class="fl-paper-section" id="fl-r-intro">
          <h2>1.0 Introduction</h2>
          <p>Fluoroscopy produces a sequence of X-ray images in which thin instruments can be observed against complex structures. For this image-processing assignment, the central question was whether we could isolate the instrument from a noisy background and reconstruct its full visible path.</p>
          <p>Simple background subtraction emphasizes what changes between frames. However, a nearly stationary instrument segment may resemble the background, while anatomical edges can generate false detections. An effective pipeline must therefore address weak contrast, noise, missing segments and the need for a connected prediction.</p>
          <p><a class="fl-figure-ref" href="#fl-r-fig1">Figure 1</a> shows a sample image before and after enhancement.</p>
          <figure class="fl-report-figure" id="fl-r-fig1">
            <a href="${raw}assets/grayscale-comparison.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" src="${raw}assets/grayscale-comparison.png" alt="Original and enhanced fluoroscopy frame 291"></a>
            <figcaption><strong>Figure 1.</strong> Original and contrast-enhanced X-ray image, frame 291.</figcaption>
          </figure>
        </section>

        <section class="fl-paper-section" id="fl-r-dataset">
          <h2>2.0 Dataset and project objectives</h2>
          <h3>2.1 Dataset</h3>
          <p>The supplied dataset contains ten grayscale frames of 512 × 512 pixels and twenty manual tracings used to form reference masks. Frame 201 acts as the background reference; frames 211–291 provide the nine motion frames used for the reported comparisons.</p>
          <div class="fl-facts" aria-label="Dataset summary">
            <div><strong>10</strong><span>Images</span></div>
            <div><strong>512 × 512</strong><span>Pixels each</span></div>
            <div><strong>20</strong><span>Tracings</span></div>
          </div>
          <h3>2.2 Objective</h3>
          <p>Identify the instrument pixels in each frame, reconstruct a continuous instrument trace and compare the predicted masks to manually annotated references.</p>
          <h3>2.3 Requirements and evaluation</h3>
          <p>Enhance and preprocess the images, implement and compare the classical segmentation approaches, export binary predictions for all frames, and evaluate the quality of results using Dice, IoU, PSNR and error visualization. The connected-path extension was assessed by its continuity and improvement in overlap with manual traces.</p>
          <p>The repository does not document a minimum required Dice score. The outcomes are evaluated by measured improvement, completeness of the outputs and inspection of residual errors.</p>
        </section>

        <section class="fl-paper-section" id="fl-r-method">
          <h2>3.0 Methodology</h2>
          <div class="fl-method-steps" aria-label="Processing pipeline"><span>Prepare</span><span>Subtract</span><span>Segment</span><span>Reconnect</span></div>
          <h3>3.1 Preprocessing and initial segmentation</h3>
          <p>The pipeline enhances image contrast and reduces noise before comparing each frame with the background reference. We evaluated fixed thresholding (0.10), Otsu thresholding and a two-component Gaussian mixture to produce candidate instrument masks.</p>
          <p><a class="fl-table-ref" href="#fl-r-table1">Table 1</a> compares the original classical methods before connected-path reconstruction. The fixed threshold produced the highest mean Dice of the three, but these masks could still fragment the instrument.</p>
          <div class="fl-report-table" id="fl-r-table1">
            <p class="fl-table-caption"><strong>Table 1.</strong> Initial segmentation performance on the nine motion frames (before component cleanup).</p>
            <div class="fl-metric-table-wrap"><table class="fl-metric-table">
              <thead><tr><th>Method</th><th>Mean Dice</th><th>Mean IoU</th><th>Mean PSNR</th></tr></thead>
              <tbody>
                <tr><td>Fixed threshold (0.10)</td><td>0.416</td><td>0.280</td><td>16.57 dB</td></tr>
                <tr><td>Otsu threshold</td><td>0.412</td><td>0.295</td><td>13.95 dB</td></tr>
                <tr><td>Gaussian mixture</td><td>0.385</td><td>0.249</td><td>15.30 dB</td></tr>
              </tbody>
            </table></div>
          </div>
          <h3>3.2 Continuous-path reconstruction</h3>
          <p>To address disconnected predictions, an ExtraTrees model scores candidate pixels using local dark-line appearance, intensity derivatives and temporal changes. A path-search step then decodes a connected centerline. For this dataset, it assumes the instrument enters from the lower edge of the image.</p>
          <p>As shown in <a class="fl-figure-ref" href="#fl-r-fig2">Figure 2</a>, the continuous trace follows the manually drawn shape more consistently than the fragmented previous prediction.</p>
          <figure class="fl-report-figure" id="fl-r-fig2">
            <a href="${raw}assets/mask-cleanup.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" src="${raw}assets/mask-cleanup.png" alt="Previous prediction compared with the reconstructed connected path and manual tracing"></a>
            <figcaption><strong>Figure 2.</strong> Previous prediction, reconstructed continuous trace and manual reference for frame 291.</figcaption>
          </figure>
        </section>

        <section class="fl-paper-section" id="fl-r-results">
          <h2>4.0 Experimental results</h2>
          <h3>4.1 Agreement with the reference</h3>
          <p>Dice scores range from 0 (no overlap) to 1 (perfect overlap). Mean Dice across the same nine motion frames improved from <strong>0.501 to 0.876</strong>, a gain of <strong>+0.375 Dice points</strong>. These are paired results for the previous prediction and the connected trace, not the earlier threshold-comparison scores in Table 1.</p>
          <div class="fl-score" aria-label="Mean Dice comparison">
            <div><span>Previous prediction</span><strong>0.501</strong></div>
            <div><span>Continuous trace</span><strong>0.876</strong></div>
            <div class="fl-score-gain"><span>Dice improvement</span><strong>+0.375</strong></div>
          </div>
          <p>The final reconstructions for all ten frames are shown in <a class="fl-figure-ref" href="#fl-r-fig3">Figure 3</a>, and the separate Metrics view allows closer inspection of the per-frame scores.</p>
          <figure class="fl-report-figure" id="fl-r-fig3">
            <a href="${raw}assets/segmentation-comparison.png" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" src="${raw}assets/segmentation-comparison.png" alt="All ten final connected-path predictions with frame Dice scores"></a>
            <figcaption><strong>Figure 3.</strong> Reconstructed instrument paths across ten frames, with individual Dice scores.</figcaption>
          </figure>
          <h3>4.2 False detections and missed segments</h3>
          <p>Across the nine motion frames, false-positive pixels fell from <strong>22,472 to 3,553</strong> and false-negative pixels from <strong>5,240 to 2,511</strong>. Every final mask contained one connected component. These changes support the conclusion that reconstruction improved the detected path on this sequence.</p>
        </section>

        <section class="fl-paper-section" id="fl-r-discussion">
          <h2>5.0 Discussion and conclusion</h2>
          <h3>5.1 Were the objectives met?</h3>
          <p><strong>Yes, for the supplied academic sequence.</strong> We produced predictions for the required frames, evaluated them against manual tracings and achieved a substantial improvement in the Dice score after continuous-path reconstruction. The method reduced both missed instrument pixels and false detections.</p>
          <h3>5.2 Why did the reconstruction help?</h3>
          <p>Background subtraction can miss a nearly stationary instrument shaft or confuse anatomical edges with the tool. Combining local line evidence with a path-continuity constraint makes the prediction less dependent on disconnected pixel responses.</p>
          <h3>5.3 Limitations and future work</h3>
          <p>The study uses one image sequence. Model and path settings were explored within that acquisition, and the lower-border entry assumption may not hold for other viewpoints. Evaluating other sequences with different image quality, instrument positions and motion is the next step toward testing generalization.</p>
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
    </div>

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
