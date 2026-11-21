/* Source-grounded fluoroscopy case study: real figures and frame_comparison.csv values */
window.renderFluoroCaseStudy = function renderFluoroCaseStudy() {
  const base = "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/";
  const repo = "https://github.com/denoskume/Background-Subtraction-Fluoroscopy";
  return `
<article class="fluoro-study" aria-labelledby="fl-title">
  <button class="fl-back" type="button" onclick="showSection('projects')">Back to all projects</button>
  <header class="fl-hero">
    <p class="fl-eyebrow">COMPUTER VISION / MEDICAL IMAGE PROCESSING / CASE STUDY</p>
    <h1 id="fl-title">Finding a thin instrument in noisy X-ray images.</h1>
    <p class="fl-lead">How we went from a low-contrast fluoroscopy sequence to a measurable, continuous trace of a microcatheter or guidewire — and what the experiment really proves.</p>
    <p class="fl-authors">Denos Kume &amp; Oluwole Shokunbi · MSc Control &amp; Robotics · Centrale Nantes</p>
    <nav class="fl-jump" aria-label="Case study sections">
      <a href="#fl-problem">The problem</a>
      <a href="#fl-process">The method</a>
      <a href="#fl-results">Results</a>
      <a href="#fl-review">Frame review</a>
      <a href="#fl-demo">Video demo</a>
    </nav>
  </header>

  <div class="fl-metrics" aria-label="Measured experimental results">
    <div><span class="fl-metric-number">10</span><span class="fl-metric-name">annotated X-ray frames</span><small>512 × 512 pixels each</small></div>
    <div><span class="fl-metric-number">0.876</span><span class="fl-metric-name">mean Dice after tracing</span><small>Nine motion frames, one acquisition</small></div>
    <div><span class="fl-metric-number">0.501</span><span class="fl-metric-name">comparison baseline Dice</span><small>Same nine motion frames</small></div>
  </div>

  <section id="fl-problem" class="fl-section">
    <div class="fl-section-heading"><span class="fl-chapter">THE CHALLENGE</span><h2>What are we trying to see?</h2></div>
    <div class="fl-text">
      <p><strong>Fluoroscopy</strong> is a type of X-ray imaging that makes it possible to observe structures and instruments during a procedure. In our teaching sequence, the goal was to find a very thin medical instrument — a guidewire or microcatheter — against anatomical structures that can look surprisingly similar.</p>
      <p>The instrument occupies only a small fraction of each image. Its contrast is weak, image noise creates misleading edges, and parts of the instrument can appear almost stationary. A simple detector may therefore miss the shaft, split one instrument into disconnected pieces, or mistake an anatomical edge for the instrument.</p>
      <div class="fl-point"><strong>Our question</strong><p>Can we separate the instrument from the background, reconstruct its path as one connected line, and measure how closely the result matches a manually traced reference?</p></div>
    </div>
  </section>

  <section class="fl-section">
    <div class="fl-section-heading"><span class="fl-chapter">THE DATA</span><h2>What goes into the pipeline?</h2></div>
    <div class="fl-text">
      <p>We worked with <strong>10 grayscale frames</strong> of <strong>512 × 512 pixels</strong> and <strong>20 manual tracings</strong> supplied with an academic practical. Frame <strong>201</strong> serves as a fixed background reference; frames <strong>211–291</strong> are the nine subsequent motion frames used for the reported method comparisons.</p>
      <p>Manual tracings identify the true instrument location. We combine these annotations into a reference mask, then compare the algorithm’s mask against it pixel by pixel. In the saved masks, <strong>0 represents the instrument and 1 represents background</strong> — the opposite of some common conventions, so the comparison must respect those labels.</p>
    </div>
    <div class="fl-pipeline" role="img" aria-label="Processing flow: fluoroscopy frames, image enhancement, initial segmentation, continuous-path reconstruction, evaluation against manual traces">
      <div><b>Fluoroscopy</b><span>10 X-ray frames</span></div>
      <span class="fl-pipe-connector" aria-hidden="true"></span>
      <div><b>Preprocess</b><span>Contrast + filtering</span></div>
      <span class="fl-pipe-connector" aria-hidden="true"></span>
      <div><b>Segment</b><span>Instrument candidates</span></div>
      <span class="fl-pipe-connector" aria-hidden="true"></span>
      <div><b>Trace</b><span>Connected path</span></div>
      <span class="fl-pipe-connector" aria-hidden="true"></span>
      <div><b>Evaluate</b><span>Dice · IoU · PSNR</span></div>
    </div>
  </section>

  <section id="fl-process" class="fl-section">
    <div class="fl-section-heading"><span class="fl-chapter">THE METHOD</span><h2>From raw pixels to a continuous path.</h2></div>
    <div class="fl-stage"><span class="fl-stage-num">STEP 1</span><div><h3>Improve the image before looking for the instrument</h3>
      <p>A fluoroscopy frame has subtle differences in brightness. We apply a consistent display window, local contrast enhancement, and gamma correction to help the instrument stand out while keeping all frames comparable. Filtering helps reduce noise that might otherwise look like an instrument.</p>
      <p><strong>Why this step matters:</strong> a segmentation algorithm cannot reliably isolate a line that is barely distinguishable from the background.</p>
      <figure class="fl-figure"><a href="${base}assets/grayscale-comparison.png" target="_blank" rel="noopener noreferrer"><img src="${base}assets/grayscale-comparison.png" loading="lazy" alt="Actual original and enhanced grayscale views for frame 291" /></a>
        <figcaption><b>Real figure · Frame 291.</b> Original versus enhanced grayscale image. Select the figure for its full-size version.</figcaption></figure>
    </div></div>

    <div class="fl-stage"><span class="fl-stage-num">STEP 2</span><div><h3>Find the parts of the image that changed</h3>
      <p>We start with <strong>background subtraction</strong>: compare a motion frame with the reference frame so that changes become more noticeable. We then use contrast stretching and smoothing to create a cleaner response. Spatial Gaussian filtering and frequency-domain low-pass filtering are tested as part of the processing pipeline.</p>
      <p><strong>What can go wrong?</strong> Anatomy can move or change appearance too. A tool segment that barely moves may disappear from a difference image, while an anatomical edge may be detected instead.</p>
      <figure class="fl-figure"><a href="${base}assets/segmentation-comparison.png" target="_blank" rel="noopener noreferrer"><img src="${base}assets/segmentation-comparison.png" loading="lazy" alt="Actual comparison of predicted instrument masks across the ten fluoroscopy frames" /></a>
        <figcaption><b>Real figure · All 10 frames.</b> Predicted instrument masks across the sequence. This is a project output, not a stock illustration.</figcaption></figure>
    </div></div>

    <div class="fl-stage"><span class="fl-stage-num">STEP 3</span><div><h3>Decide which pixels belong to the instrument</h3>
      <p>The difference image is not yet a segmentation. We need a <strong>binary mask</strong>, where every pixel is classified as instrument or background. We compared three simple, explainable approaches:</p>
      <div class="fl-methods">
        <div><h4>Fixed threshold</h4><p>Use one chosen intensity cutoff (0.10). Simple and fast, but it may miss pixels if contrast changes.</p></div>
        <div><h4>Otsu threshold</h4><p>Choose the cutoff automatically from the pixel-intensity distribution. Helpful when a single fixed value is not ideal.</p></div>
        <div><h4>Gaussian mixture</h4><p>Model intensity values as two statistical groups, then classify likely foreground and background pixels.</p></div>
      </div>
      <p>We also tested morphological processing — small neighborhood operations that remove or merge parts of a mask. The fixed threshold gave the highest mean Dice and PSNR among these three initial approaches, while Otsu produced a slightly higher IoU.</p>
    </div></div>

    <div class="fl-stage"><span class="fl-stage-num">STEP 4</span><div><h3>Reconnect the broken instrument</h3>
      <p>Initial masks can contain scattered pixels and disconnected lines. For the stronger experimental extension, we used a <strong>supervised pixel-scoring model (ExtraTrees)</strong> with information about dark lines, local intensity changes and changes over time. A path-search step then reconstructs <strong>one continuous centerline</strong> from the lower image border.</p>
      <p>In plain language: rather than trusting every dark pixel, we score which pixels resemble the instrument and find a plausible connected route through them. Starting at the lower border is an assumption specific to these images, not a general rule for every fluoroscopy procedure.</p>
      <figure class="fl-figure"><a href="${base}assets/mask-cleanup.png" target="_blank" rel="noopener noreferrer"><img src="${base}assets/mask-cleanup.png" loading="lazy" alt="Actual comparison of the prior prediction, reconstructed continuous centerline and manually traced instrument in frame 291" /></a>
        <figcaption><b>Real figure · Frame 291.</b> Earlier prediction, reconstructed continuous trace, and manual tracing shown together to reveal the difference.</figcaption></figure>
      <p class="fl-note">To reduce direct leakage, training excludes each test pair and its immediate neighbors. However, the temporal background uses raw images from the whole sequence, and method settings were explored on this acquisition. The result is <strong>within-sequence development evidence</strong>, not independent medical validation.</p>
    </div></div>
  </section>

  <section id="fl-results" class="fl-section fl-results">
    <div class="fl-section-heading"><span class="fl-chapter">THE EVIDENCE</span><h2>Did the method actually improve?</h2></div>
    <div class="fl-text"><p>We measured each prediction against manual annotations. <strong>Dice</strong> and <strong>IoU</strong> measure how much of the instrument mask overlaps the reference (higher is better). <strong>PSNR</strong> measures whole-image pixel agreement. Since the instrument is so thin, an apparently good PSNR can hide an almost completely missed instrument.</p></div>
    <div class="fl-results-summary">
      <div><span>Comparison baseline</span><b>0.501</b><small>Mean Dice · 9 motion frames</small></div>
      <span class="fl-result-line" aria-hidden="true"></span>
      <div><span>Continuous trace</span><b>0.876</b><small>Mean Dice · same 9 frames</small></div>
    </div>
    <div class="fl-chart-box">
      <div class="fl-chart-head"><h3>Segmentation accuracy, frame by frame</h3><div class="fl-chart-legend"><span><i class="fl-legend-base"></i>Previous prediction</span><span><i class="fl-legend-new"></i>Continuous trace</span></div></div>
      <div id="fl-dice-plot" class="fl-dice-plot" aria-label="Data plot of per-frame Dice scores"></div>
      <p class="fl-source">Actual frame-level results · nine motion frames (211–291) · <a href="${repo}/blob/main/frame_comparison.csv" target="_blank" rel="noopener noreferrer">View source CSV</a></p>
    </div>
    <div class="fl-pixel-metrics">
      <div><b>22,472 <span>→</span> 3,553</b><span>False-positive pixels</span><small>Fewer background pixels incorrectly marked as instrument</small></div>
      <div><b>5,240 <span>→</span> 2,511</b><span>Missed instrument pixels</span><small>Fewer annotated instrument pixels left undetected</small></div>
    </div>
    <h3 class="fl-subhead">How did the three initial segmentation methods compare?</h3>
    <div class="fl-table-wrap"><table class="fl-data-table"><thead><tr><th>Method</th><th>Mean Dice</th><th>Mean IoU</th><th>Mean PSNR</th></tr></thead><tbody>
      <tr><td>Fixed threshold (0.10)</td><td><b>0.416</b></td><td>0.280</td><td><b>16.57 dB</b></td></tr>
      <tr><td>Otsu threshold</td><td>0.412</td><td><b>0.295</b></td><td>13.95 dB</td></tr>
      <tr><td>Two-component Gaussian mixture</td><td>0.385</td><td>0.249</td><td>15.30 dB</td></tr>
    </tbody></table></div>
    <p class="fl-table-note">These are the earlier segmentation-method results <strong>before component cleanup</strong>, not the 0.501 baseline used in the separate continuous-trace comparison above. All method comparisons use the same nine motion frames.</p>
    <div class="fl-point"><strong>An important lesson</strong><p>Background subtraction by itself scored about <b>20.35 dB PSNR</b> but only <b>0.001 Dice</b>. It mostly agreed on the empty background while missing almost all of the instrument. Good-looking image statistics are not necessarily good segmentation.</p></div>
  </section>

  <section id="fl-review" class="fl-section">
    <div class="fl-section-heading"><span class="fl-chapter">INSPECT THE RESULTS</span><h2>Look at the actual frames.</h2></div>
    <div class="fl-text"><p>Choose any frame to see a genuine review image exported by the project. The accompanying numbers come from <code>frame_comparison.csv</code>. This makes the strongest and weakest examples inspectable instead of hiding them behind a single average.</p></div>
    <div class="fl-frame-selector" role="group" aria-label="Choose a fluoroscopy frame">
      <button type="button" data-fluoro-frame="201">201</button>
      <button type="button" data-fluoro-frame="211">211</button>
      <button type="button" data-fluoro-frame="221">221</button>
      <button type="button" data-fluoro-frame="231">231</button>
      <button type="button" data-fluoro-frame="241">241</button>
      <button type="button" data-fluoro-frame="251">251</button>
      <button type="button" data-fluoro-frame="261">261</button>
      <button type="button" data-fluoro-frame="271">271</button>
      <button type="button" data-fluoro-frame="281">281</button>
      <button type="button" data-fluoro-frame="291" class="selected" aria-pressed="true">291</button>
    </div>
    <figure class="fl-frame-figure">
      <a id="fl-frame-link" href="${base}review/frame_291_review.png" target="_blank" rel="noopener noreferrer"><img id="fl-frame-image" src="${base}review/frame_291_review.png" loading="lazy" alt="Actual frame 291 review composite with image and predicted mask" /></a>
      <figcaption><strong id="fl-frame-caption">Frame 291</strong><span id="fl-frame-info" aria-live="polite">Previous Dice: 0.588 · Continuous-trace Dice: 0.849 · False positives: 811 · Missed pixels: 414</span><span class="fl-expand">Select image to open full resolution</span></figcaption>
    </figure>
    <p class="fl-note">Frame 201 is the fixed background reference. The nine other frames form the motion-frame evaluation. Technical inspection is possible here; clinical reader review is not yet completed.</p>
  </section>

  <section id="fl-demo" class="fl-section">
    <div class="fl-section-heading"><span class="fl-chapter">WATCH THE EXPERIMENT</span><h2>See the pipeline in motion.</h2></div>
    <p class="fl-section-intro">This short recording comes from the project's own assets, not an illustrative stock video.</p>
    <figure class="project-demo fl-video">
      <div class="project-demo-head"><span>RECORDED DEMONSTRATION</span><h2>Microcatheter Segmentation · 19 sec</h2></div>
      <video class="project-demo-video" controls playsinline preload="metadata" poster="${base}assets/segmentation-comparison.png" aria-label="Microcatheter segmentation recorded project demo">
        <source src="${base}assets/demo-web.mp4" type="video/mp4">Your browser does not support HTML5 video.
      </video>
      <figcaption>H.264 MP4 video from the project repository · <a href="${base}assets/demo-web.mp4" target="_blank" rel="noopener noreferrer">Open video separately</a></figcaption>
    </figure>
  </section>

  <section class="fl-section fl-end">
    <div class="fl-section-heading"><span class="fl-chapter">CONCLUSION</span><h2>What we learned — and what remains open.</h2></div>
    <div class="fl-end-grid"><div><h3>What worked</h3><p>Combining image enhancement, segmentation, supervised line scoring and connected-path reconstruction substantially improved overlap with the manually annotated instruments on this one sequence.</p></div>
      <div><h3>What we cannot yet claim</h3><p>There were only ten frames from one acquisition. We do not have patient outcomes or acquisition geometry. Method choices were explored on the same sequence, and independent clinical validation and human reader review remain pending.</p></div>
      <div><h3>Next steps</h3><p>Evaluate unseen acquisitions, vary imaging conditions, assess robustness when the tool enters from a different image edge, and compare with learning-based segmentation under independent validation.</p></div>
    </div>
    <div class="fl-reproduce"><h3>Reproduce the experiment</h3><p>The repository contains the executed Python notebook, annotations and figures, output masks, a run manifest, and frame-level results. Place <code>catheter.zip</code> alongside the notebook before running it.</p><pre><code>python -m pip install -r requirements.txt
python -m jupyter lab Fluoroscopy_Instrument_Segmentation.ipynb</code></pre>
      <div class="fl-links"><a href="${repo}" target="_blank" rel="noopener noreferrer">Explore the GitHub repository</a><a href="${repo}/blob/main/Fluoroscopy_Instrument_Segmentation.ipynb" target="_blank" rel="noopener noreferrer">Executed notebook</a><a href="${repo}/blob/main/review/run_manifest.json" target="_blank" rel="noopener noreferrer">Experiment manifest</a></div>
    </div>
    <p class="fl-attribution">Academic context: adapted from the Background Subtraction practical by Diana Mateus at Centrale Nantes. This is a research and teaching project, not a clinical product.</p>
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
