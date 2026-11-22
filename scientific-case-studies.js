/* Camera Calibration and CLAP case studies.
   Same journal-style Report / Figures / Metrics structure as Background Subtraction.
   All quantitative results and figure paths come from the two source repositories. */
(function () {
  'use strict';
  const CAMERA = 'https://github.com/denoskume/camera-calibration';
  const CLAP = 'https://github.com/denoskume/CLAP-Zero-Shot-Audio-Classification';
  const rawCamera = 'https://raw.githubusercontent.com/denoskume/camera-calibration/main/';
  const rawClap = 'https://raw.githubusercontent.com/denoskume/CLAP-Zero-Shot-Audio-Classification/main/';
  const safe = value => String(value).replace(/[&<>"']/g, char =>
    ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
  const link = (url, label) => '<a href="' + safe(url) +
    '" target="_blank" rel="noopener noreferrer">' + safe(label) + '</a>';
  const table = (headers, rows, caption) =>
    '<div class="fl-report-table">' + (caption ? '<p class="fl-table-caption">' + caption + '</p>' : '') +
    '<div class="fl-metric-table-wrap"><table class="fl-metric-table"><thead><tr>' +
    headers.map(h => '<th scope="col">' + h + '</th>').join('') +
    '</tr></thead><tbody>' + rows.map(row =>
      '<tr>' + row.map((cell, i) => '<td>' + cell + '</td>').join('') + '</tr>'
    ).join('') + '</tbody></table></div></div>';
  const figure = (url, caption, alt, id) =>
    '<figure class="fl-report-figure" id="' + id + '">' +
    '<a href="' + safe(url) + '" target="_blank" rel="noopener noreferrer">' +
    '<img src="' + safe(url) + '" alt="' + safe(alt) + '" loading="lazy" decoding="async"></a>' +
    '<figcaption>' + caption + '</figcaption></figure>';
  const terms = pairs =>
    '<dl class="fl-terms">' + pairs.map(([term, definition]) =>
      '<div><dt>' + safe(term) + '</dt><dd>' + safe(definition) + '</dd></div>'
    ).join('') + '</dl>';
  const bullets = entries => '<ul class="sc-list">' + entries.map(p => '<li>' + p + '</li>').join('') + '</ul>';
  const info = rows => '<div class="fl-info-table" role="table">' + rows.map(([key, value]) =>
    '<div role="row"><strong role="rowheader">' + safe(key) + '</strong><span role="cell">' + value +
    '</span></div>').join('') + '</div>';
  const keywords = words => '<div class="fl-keywords" aria-label="Project keywords">' +
    words.map(w => '<span>' + safe(w) + '</span>').join('') + '</div>';
  const scores = items => '<div class="fl-score sc-score" aria-label="Key project results">' +
    items.map((m,i)=> '<div' + (i===2 ? ' class="fl-score-gain"' : '') + '><span>' +
      safe(m[0]) + '</span><strong>' + safe(m[1]) + '</strong></div>').join('') + '</div>';

  const calibrationErrors = [
    ['img0.jpg','0.256','0.303'],['img1.jpg','0.234','0.277'],
    ['img2.jpg','0.469','0.525'],['img3.jpg','0.547','0.608'],
    ['img4.jpg','0.384','0.444'],['img5.jpg','0.251','0.279'],
    ['img6.jpg','0.603','0.728'],['img7.jpg','0.786','0.859'],
    ['img8.jpg','0.376','0.456']
  ];
  const holdout = [
    ['img0.jpg','0.338','0.323'],['img1.jpg','0.311','0.288'],
    ['img2.jpg','0.533','0.470'],['img3.jpg','0.589','0.521'],
    ['img4.jpg','0.342','0.309'],['img5.jpg','0.193','0.168'],
    ['img6.jpg','0.359','0.330'],['img7.jpg','0.407','0.335'],
    ['img8.jpg','0.334','0.307']
  ];
  const promptResults = [
    ['Audio Recording','91.15%'],['Sound Clip','87.60%'],
    ['Recording Sound','87.55%'],['A Class','87.00%'],
    ['Heard Sound','85.10%'],['Sound Of A','84.90%'],
    ['Sound Of','83.75%'],['This Is Sound','83.10%'],
    ['Class Only (baseline)','83.05%'],['Environmental Sound','81.85%']
  ];
  const topK = [
    ['Top-1','91.15%'],['Top-2','95.80%'],['Top-3','97.45%'],
    ['Top-4','98.60%'],['Top-5','99.00%'],['Top-6','99.10%'],
    ['Top-7','99.15%'],['Top-8','99.40%'],['Top-9','99.40%'],['Top-10','99.55%']
  ];

  const studies = {
    2: {
      slug:'camera-calibration', prefix:'sc-cam', title:'Camera Calibration',
      question:'How accurately can nine chessboard views recover a camera model and predict previously unused corner positions?',
      authors:'',
      repository:CAMERA, notebook:CAMERA+'/blob/main/Camera_Calibration.ipynb',
      pdf:'camera-calibration-case-study.pdf', downloadName:'Camera-Calibration-Report.pdf',
      citation:'Kume, D. (2026). Camera Calibration [Academic case study, Centrale Nantes]. GitHub. '+CAMERA,
      bibtex:'@misc{kume2026calibration,\n  author = {Kume, Denos},\n  title = {Camera Calibration},\n  year = {2026},\n  note = {Academic engineering case study, Centrale Nantes},\n  url = {'+CAMERA+'}\n}',
      keywords:['Computer Vision','Camera Calibration','Zhang Method','Homography','SVD','OpenCV','Reprojection Error','Held-out Evaluation'],
      projectInfo:[
        ['Type','Academic engineering case study'],
        ['Institution','Centrale Nantes · MSc Control &amp; Robotics'],
        ['Data','9 laboratory chessboard photographs (640 × 480 px); 8 × 6 inner corners; 30 mm pitch'],
        ['Scope','Camera intrinsics, poses, reprojection diagnostics and held-out point prediction'],
        ['Resources',link(CAMERA,'Source repository')+' · '+link(CAMERA+'/blob/main/Camera_Calibration.ipynb','Executed notebook')+
          ' · '+link(CAMERA+'/blob/main/outputs/calibration.json','Camera model')+
          ' · '+link(CAMERA+'/blob/main/outputs/view_errors.csv','View-level results')]
      ],
      glossary:[
        ['Intrinsic matrix','A matrix of focal lengths and optical-centre coordinates expressed in pixels.'],
        ['Chessboard corner','An intersection of black and white squares, detected to associate image pixels with known board coordinates.'],
        ['Homography','A planar projective mapping between board coordinates and pixel coordinates.'],
        ['Zhang calibration','A method that recovers camera intrinsics from multiple planar calibration target views.'],
        ['DLT / SVD','Direct Linear Transform and Singular Value Decomposition, used here to estimate normalized homographies.'],
        ['Extrinsic pose','A rotation and translation that position the chessboard with respect to the camera.'],
        ['Reprojection error','The image-plane distance between a measured corner and the location predicted by the fitted model; lower is better.'],
        ['Held-out corners','Corner points excluded from model fitting for a specific fold and used to test prediction quality.']
      ],
      summary: [
        'Camera calibration uses image observations of a pattern with known geometry to estimate camera parameters. This academic project used nine chessboard photographs to estimate intrinsic parameters and board poses, then tested how accurately the model predicts corners not used during fitting.',
        'An 8 × 6 pattern gave 48 detected inner corners per image (432 total). The linear Zhang pipeline produced <strong>0.434 px mean reprojection error</strong> and <strong>0.534 px overall RMS</strong> on the calibration views. In a separate held-out test, a nonlinear OpenCV refinement reduced pooled RMS from <strong>0.395 px to 0.352 px</strong>. The results include reprojection errors across nine calibration views and 216 held-out predictions per model.'
      ],
      questionLabel:'Project objective and evaluation',
      reportSections:[
        {key:'intro',title:'1.0 Introduction',body:
          '<p>Camera calibration estimates the geometric relationship between a 3D scene and its projection in an image. A planar chessboard provides known coordinates that can be matched to detected image corners in multiple photographs.</p>'+
          '<p>The question is whether a model estimated from different board poses can explain measured image points and predict other points accurately. <a class="fl-figure-ref" href="#sc-cam-r-fig1">Figure 1</a> illustrates the detected corner locations.</p>'+
          figure(rawCamera+'outputs/figures/detected_chessboard_corners.png','<strong>Figure 1.</strong> Detected chessboard corners across the source calibration images.','Chessboard photographs with detected calibration corners.','sc-cam-r-fig1')},
        {key:'dataset',title:'2.0 Dataset and objectives',body:
          '<h3>2.1 Data and geometry</h3><p>The dataset contains nine 640 × 480 photographs. The board has eight by six <em>inner corners</em>, giving 48 geometric correspondences per image. The 30 mm checkerboard pitch supplies the world-coordinate scale. All nine views were retained and 432 corners were detected.</p>'+
          '<div class="fl-facts"><div><strong>9</strong><span>Views</span></div><div><strong>432</strong><span>Detected corners</span></div><div><strong>30 mm</strong><span>Square pitch</span></div></div>'+
          '<h3>2.2 Requirements and expected outputs</h3>'+
          bullets(['Detect and refine corner coordinates in all images; map the 8 × 6 target into physical units.',
            'Estimate normalized planar homographies, intrinsics, rotation and translation for each board pose.',
            'Quantify reprojection residuals view by view and export camera parameters and diagnostic figures.',
            'Use withheld corner points to compare the linear camera model with an independently refined OpenCV variant.'])+
          '<p>Calibration quality is evaluated through recovered parameters, reprojection residuals and held-out prediction errors.</p>'},
        {key:'method',title:'3.0 Methodology',body:
          '<div class="fl-method-steps"><span>Detect</span><span>Fit homographies</span><span>Recover camera</span><span>Validate</span></div>'+
          '<h3>3.1 Calibration pipeline</h3>'+
          '<p>Subpixel chessboard corners are located in all nine views. Each image-to-board mapping is estimated using a normalized DLT procedure and singular value decomposition. Zhang constraints combine the resulting homographies into one intrinsic camera matrix, after which board-to-camera rotation and translation are recovered.</p>'+
          '<p><a class="fl-figure-ref" href="#sc-cam-r-fig2">Figure 2</a> shows the geometric processing sequence.</p>'+
          figure(rawCamera+'outputs/figures/homography_estimation_pipeline.png','<strong>Figure 2.</strong> Homography and camera-calibration pipeline.','Diagram of homography estimation and geometric camera calibration.','sc-cam-r-fig2')+
          '<h3>3.2 Evaluation on unseen corners</h3>'+
          '<p>Each held-out fold fits intrinsics using eight images. In the ninth view, 24 alternating board corners recover the pose; the remaining 24 are predicted. The experiment repeats over all nine views, totaling <strong>216 scored test corners per model</strong>. The comparison uses the linear Zhang method and an OpenCV refinement with distortion parameters and a different optimization constraint.</p>'+
          '<p>The refined model estimates lens distortion and uses nonlinear optimization with a different skew constraint.</p>'},
        {key:'results',title:'4.0 Experimental results',body:
          '<h3>4.1 Calibration fit</h3>'+
          '<p>Across all nine views, the mean pointwise reprojection error was <strong>0.434 px</strong>, while pooled RMS was <strong>0.534 px</strong>. View-level RMS ranged from <strong>0.277 px</strong> (img1.jpg) to <strong>0.859 px</strong> (img7.jpg). RMS and average distances are different aggregates and should not be confused.</p>'+
          table(['Image','Mean error (px)','RMS error (px)'],calibrationErrors,'<strong>Table 1.</strong> Error by calibration view, from outputs/view_errors.csv.')+
          figure(rawCamera+'outputs/figures/mean_reprojection_error_by_view.png','<strong>Figure 3.</strong> Mean reprojection error for each of the nine calibration views.','Source bar chart of calibration reprojection errors by image.','sc-cam-r-fig3')+
          '<h3>4.2 Prediction on held-out corners</h3>'+
          '<p>The pooled held-out RMS fell from <strong>0.395 px</strong> for linear Zhang to <strong>0.352 px</strong> for the refined model (a <strong>10.7% relative reduction</strong>). The refined method improved all nine folds.</p>'+
          table(['Model','Held-out pooled RMS','Highest fold RMS'],[
            ['Linear Zhang','0.395 px','0.589 px (img3.jpg)'],
            ['Refined OpenCV','0.352 px','0.521 px (img3.jpg)']
          ],'<strong>Table 2.</strong> Independent corner prediction, 216 test corners per model.')+
          figure(rawCamera+'outputs/figures/held_out_view_errors.png','<strong>Figure 4.</strong> Held-out prediction error by board pose for two calibration models.','Held-out corner prediction error plot for linear and refined models.','sc-cam-r-fig4')},
        {key:'discussion',title:'5.0 Discussion and conclusion',body:
          '<h3>5.1 Were the objectives met?</h3>'+
          '<p><strong>Yes, within the academic camera-calibration experiment.</strong> The notebook recovers a camera matrix and board poses, publishes diagnostics for all nine images and evaluates held-out corner prediction. The refined model improves the measured held-out error.</p>'+
          '<h3>5.2 What deserves further investigation?</h3>'+
          '<p>The large residual in img7.jpg indicates that some board poses fit less consistently than others. Comparing this view with img1.jpg helps identify variation in the measured projections. The linear fit does not estimate lens distortion; results are sensitive to geometry and model assumptions.</p>'+
          '<h3>5.3 Limitations and future work</h3>'+
          '<p>Additional chessboard views, varied target orientations and independent image sets would extend the robustness analysis.</p>'}
      ],
      figures:[
        ['Corner detection','Detected corners in the nine photographs','outputs/figures/detected_chessboard_corners.png','intro','sc-cam-r-fig1'],
        ['Homography estimation','From board correspondences to the recovered camera model','outputs/figures/homography_estimation_pipeline.png','method','sc-cam-r-fig2'],
        ['Reprojection by view','Average pixel error for each input image','outputs/figures/mean_reprojection_error_by_view.png','results','sc-cam-r-fig3'],
        ['Held-out error','Prediction error on withheld corners, Zhang versus refined OpenCV','outputs/figures/held_out_view_errors.png','results','sc-cam-r-fig4'],
        ['Estimated camera poses','Recovered orientation and position for the nine board views','outputs/figures/estimated_camera_poses.png','method','sc-cam-r-method'],
        ['Residual distribution','Distribution of corner reprojection residuals','outputs/figures/reprojection_error_distribution.png','results','sc-cam-r-results']
      ].map(x=>({title:x[0],description:x[1],url:rawCamera+x[2],section:x[3],reportId:x[4]})),
      metrics:[
        {key:'overview',title:'Core calibration results',body:
          '<p>Reprojection error is the distance, in pixels, from a measured corner to the location predicted by a camera model. <strong>Lower is better.</strong> The first two values refer to fitting on all nine images, while the third comes from a separate held-out comparison.</p>'+
          scores([['Mean error','0.434 px'],['Overall RMS','0.534 px'],['Refined held-out RMS','0.352 px']])+
          figure(rawCamera+'outputs/figures/reprojection_error_distribution.png','<strong>Residual distribution.</strong> Measured calibration residuals from the original notebook.','Reprojection error residual histogram.','sc-cam-m-dist')},
        {key:'perview',title:'View-by-view reprojection error',body:
          '<p>All 48 checkerboard corners were retained in each image. Select a row to inspect its source photograph; the table contains measured error statistics from the exported CSV.</p>'+
          table(['View','Corners','Mean error','RMS error'],calibrationErrors.map(row=>[
            row[0],'48',row[1]+' px',row[2]+' px'
          ]),'<strong>Table 3.</strong> Original per-view calibration scores.')+
          '<div class="sc-viewer"><div class="fl-frame-selector sc-view-selector" role="group" aria-label="Inspect original calibration views">'+
          calibrationErrors.map((row,i)=>'<button type="button" data-sc-view="'+i+'" aria-pressed="'+(i===7)+'" class="'+(i===7?'selected':'')+'">'+row[0].replace('.jpg','')+'</button>').join('')+
          '</div><figure class="fl-frame-figure"><a id="sc-view-link" href="'+rawCamera+'data/calibration_images/img7.jpg" target="_blank" rel="noopener noreferrer"><img id="sc-view-image" src="'+rawCamera+'data/calibration_images/img7.jpg" alt="Original calibration image 7" loading="lazy"></a>'+
          '<figcaption><strong id="sc-view-caption">img7.jpg</strong><span id="sc-view-metrics" aria-live="polite">48 corners · mean error: 0.786 px · RMS: 0.859 px</span></figcaption></figure></div>'+
          '<p><strong>Note:</strong> the interactive viewer shows the original source photos; the detected-corner overlay is provided separately in Figures.</p>'},
        {key:'holdout',title:'Held-out model comparison',body:
          '<p>A model was fitted on eight views, while 24 corners from the remaining view were reserved for prediction. Each method was evaluated on 216 corner predictions over nine folds.</p>'+
          table(['View','Linear Zhang RMS','Refined OpenCV RMS'],holdout.map(row=>[row[0],row[1]+' px',row[2]+' px']),
            '<strong>Table 4.</strong> Held-out errors by board view, from outputs/held_out_view_errors.csv.')+
          figure(rawCamera+'outputs/figures/held_out_view_errors.png','<strong>Held-out model comparison.</strong> Lower pixel RMS for the refined model across every fold.','Held-out RMS comparison chart.','sc-cam-m-heldout')}
      ]
    },
    3: {
      slug:'clap-zero-shot',prefix:'sc-clap', title:'CLAP zero-shot audio classification on ESC-50',
      question:'How much can carefully chosen text prompts improve sound recognition without training a new classifier?',
      authors:'Master 1 project · Centrale Nantes',
      collaborator:'Venkatesh Muthukrishnan',
      repository:CLAP, notebook:CLAP+'/blob/main/notebooks/main.ipynb',
      pdf:'clap-zero-shot-case-study.pdf',downloadName:'CLAP-Zero-Shot-Report.pdf',
      citation:'Kume, D., & Muthukrishnan, V. (2026). CLAP zero-shot audio classification on ESC-50 [Academic project, Centrale Nantes]. GitHub. '+CLAP,
      bibtex:'@misc{kume2026clap,\n  author = {Kume, Denos and Muthukrishnan, Venkatesh},\n  title = {CLAP Zero-Shot Audio Classification on ESC-50},\n  year = {2026},\n  note = {Academic project, Centrale Nantes},\n  url = {'+CLAP+'}\n}',
      keywords:['Audio Classification','CLAP','Zero-shot Learning','ESC-50','Prompt Engineering','Audio-text Embeddings','Cosine Similarity','Top-k Accuracy'],
      projectInfo:[
        ['Type','Academic multimodal machine-learning research project'],
        ['Institution','Centrale Nantes · MSc Control &amp; Robotics'],
        ['Collaborator','Venkatesh Muthukrishnan'],
        ['Dataset','ESC-50 · 2,000 clips · 50 environmental sound classes'],
        ['Model','Pretrained LAION-CLAP; no task-specific fine-tuning'],
        ['Resources',link(CLAP,'Source repository')+' · '+link(CLAP+'/blob/main/notebooks/main.ipynb','Executed notebook')+
          ' · '+link(CLAP+'/blob/main/outputs/tables/prompt_strategy_comparison_table.csv','Prompt results CSV')+
          ' · '+link(CLAP+'/blob/main/outputs/tables/topk_accuracy.csv','Top-k results CSV')]
      ],
      glossary:[
        ['CLAP','Contrastive Language–Audio Pretraining: an audio and text representation model.'],
        ['Zero-shot classification','Predicting classes using a pretrained model without fitting a task-specific classifier to the target dataset.'],
        ['ESC-50','Environmental Sound Classification dataset: 50 classes and 2,000 five-second recordings.'],
        ['Prompt template','A phrase surrounding a class name, such as "an audio recording of {class}", before text encoding.'],
        ['Embedding','A numerical vector used to represent audio or text in a shared feature space.'],
        ['L2 normalization','Scaling vectors to unit Euclidean length before comparing directions.'],
        ['Cosine similarity','The dot product between normalized audio and text embeddings used to rank class labels.'],
        ['Top-1 / Top-k','The proportion of clips whose correct class ranks first, or within the highest k predictions.'],
        ['AudioSet metadata','Class-level quality and coverage statistics used to examine their relationship with ESC-50 accuracy.']
      ],
      summary:[
        'This study investigated the sensitivity of a pretrained audio–text model to natural-language prompt formulation. ESC-50 supplies <strong>2,000 audio clips in 50 classes</strong>; the workflow pairs each clip with textual descriptions encoded by LAION-CLAP. No task-specific training or fine-tuning was performed.',
        'Ten prompt strategies were compared under the same zero-shot evaluation. Using only class names gave <strong>83.05% Top-1</strong> accuracy. The prompt <strong>"an audio recording of {}"</strong> raised Top-1 to <strong>91.15%</strong> (+8.10 percentage points), with <strong>99.00% Top-5</strong> accuracy. The experiment demonstrates the impact of prompt design on classification accuracy across ESC-50.'
      ],
      reportSections:[
        {key:'intro',title:'1.0 Introduction',body:
          '<p>Audio classifiers often require supervised labels and training. CLAP instead maps recordings and text into a common embedding space, allowing a recording to be compared with class descriptions directly. A zero-shot classifier ranks descriptions without learning a new classification head from ESC-50.</p>'+
          '<p>The research question is whether the <em>wording</em> of those descriptions changes prediction quality, even when the same pretrained model and clips are used. <a class="fl-figure-ref" href="#sc-clap-r-fig1">Figure 1</a> presents the complete pipeline.</p>'+
          figure(rawClap+'outputs/figures/clap_complete_zero_shot_pipeline.png','<strong>Figure 1.</strong> LAION-CLAP audio/text encoders, L2 normalization, cosine similarity and class ranking.','Project pipeline for zero-shot audio classification with CLAP.','sc-clap-r-fig1')},
        {key:'dataset',title:'2.0 Dataset and objectives',body:
          '<h3>2.1 ESC-50 dataset</h3>'+
          '<p>ESC-50 contains 2,000 environmental recordings grouped into 50 categories. In this project, the clips are evaluation examples, not a training set for a new task-specific classifier. Each of the ten prompt templates is tested with the same class inventory.</p>'+
          '<div class="fl-facts"><div><strong>2,000</strong><span>Audio clips</span></div><div><strong>50</strong><span>Classes</span></div><div><strong>10</strong><span>Prompt strategies</span></div></div>'+
          '<h3>2.2 Requirements and acceptance measures</h3>'+
          bullets(['Load ESC-50 and the pretrained CLAP checkpoint; encode audio clips and 50 class descriptions per strategy.',
            'Normalize embeddings, compute cosine similarities and rank the candidate classes.',
            'Benchmark all ten prompts, identify the best Top-1 result, then compute Top-1 through Top-10.',
            'Inspect class-wise performance and explore relationships with AudioSet quality and coverage statistics.'])+
          '<p>The evaluation compares ten prompt strategies against the class-name baseline using Top-1, Top-k and classwise accuracy.</p>'},
        {key:'method',title:'3.0 Methodology',body:
          '<div class="fl-method-steps"><span>Encode audio</span><span>Write prompts</span><span>Match embeddings</span><span>Rank classes</span></div>'+
          '<h3>3.1 Pretrained audio–text scoring</h3>'+
          '<p>The audio encoder produces one embedding for each clip; the text encoder produces one embedding for each of the 50 prompted class labels. After L2 normalization, cosine similarity ranks text candidates by proximity to the audio vector. The highest-scoring candidate is the Top-1 prediction.</p>'+
          '<h3>3.2 Prompt design</h3>'+
          '<p>The comparison covers ten templates, including the raw class name, "the sound of {}", "a sound clip of {}" and "an audio recording of {}". No task-specific labels update the pretrained weights.</p>'+
          '<p>Section 4.1 compares all ten prompt strategies.</p>'+
          '<h3>3.3 Evaluation protocol</h3>'+
          '<p>Accuracy is recorded over ESC-50. Top-k checks whether the true class appears among the first k ranked text candidates. The analysis also looks at per-class performance and exploratory correlations with AudioSet metadata.</p>'},
        {key:'results',title:'4.0 Experimental results',body:
          '<h3>4.1 Prompt strategy comparison</h3>'+
          '<p>The best prompt ("an audio recording of {}") achieved <strong>91.15% Top-1</strong>, versus <strong>83.05%</strong> for class names alone, or <strong>+8.10 percentage points</strong>. The scores varied widely across the ten tested formulations.</p>'+
          figure(rawClap+'outputs/figures/prompt_strategy_comparison_table.png','<strong>Table 1.</strong> Prompt-strategy comparison, highlighting the class-only baseline and best-performing strategy.','Ten prompt strategies: baseline 83.05%, best score 91.15%.','sc-clap-r-fig2')+
          '<p>'+link(CLAP+'/blob/main/outputs/tables/prompt_strategy_comparison_table.csv','Open the original results CSV')+'</p>'+
          '<h3>4.2 Top-k evaluation</h3>'+
          '<p>With the best prompt, Top-1 was 91.15%, Top-3 was 97.45%, and Top-5 reached <strong>99.00%</strong>. This shows the correct class is frequently among the highest-scoring alternatives even when not ranked first.</p>'+
          figure(rawClap+'outputs/figures/topk_accuracy_table.png','<strong>Table 2.</strong> Top-1 through Top-10 classification accuracy.','Top-k classification accuracy on ESC-50.','sc-clap-r-topk-table')+
          figure(rawClap+'outputs/figures/topk_accuracy_line.png','<strong>Figure 3.</strong> Top-k accuracy for k = 1 through 10 using the best tested prompt.','Original Top-k accuracy line chart from the CLAP project.','sc-clap-r-fig3')+
          '<h3>4.3 Classwise accuracy and AudioSet metadata</h3>'+
          '<p>Classwise evaluation identifies the ESC-50 categories with the highest and lowest recognition accuracy.</p>'+
          figure(rawClap+'outputs/figures/classwise_accuracy_tables.png','<strong>Classwise results.</strong> Highest and lowest classification accuracies across ESC-50 categories.','Classwise classification accuracy on ESC-50.','sc-clap-r-classwise-table')+
          '<p>Classwise accuracy showed weak correlations with the recorded AudioSet metadata: quality (Pearson r = <strong>0.081</strong>) and log10 class video counts (Pearson r = <strong>−0.181</strong>). Neither variable showed a strong linear association with recognition accuracy.</p>'+
          '<h3>4.4 Comparison with published classifiers</h3>'+
          '<p>CLAP achieved <strong>91.15% Top-1</strong> accuracy on ESC-50. For comparison, published results include BEATs (98.61%), HTS-AT (96.20%) and AST (95.30%), using their respective training and evaluation protocols.</p>'+
          figure(rawClap+'outputs/figures/published_classifier_comparison_table.png','<strong>Table 3.</strong> CLAP zero-shot accuracy and published ESC-50 classifier results.','CLAP result alongside reported ESC-50 classifier accuracies.','sc-clap-r-model-table')},
        {key:'discussion',title:'5.0 Discussion and conclusion',body:
          '<h3>5.1 Were the objectives met?</h3>'+
          '<p>All ten prompt strategies were evaluated using Top-k and classwise metrics. The best formulation improved Top-1 accuracy by <strong>8.10 percentage points</strong> over the class-name baseline without fine-tuning.</p>'+
          '<h3>5.2 Why did prompt formulation matter?</h3>'+
          '<p>CLAP scores similarity between audio and text embeddings rather than a class-specific trained classifier. Changing the surrounding words changes the text representation and can therefore change which classes receive the highest similarity scores.</p>'+
          '<h3>5.3 Limitations and future work</h3>'+
          '<p>Further work could compare different CLAP checkpoints, evaluate additional audio datasets and test prompts adapted to different recording conditions.</p>'}
      ],
      figures:[
        ['Zero-shot pipeline','Audio and text embedding flow through similarity-based classification','outputs/figures/clap_complete_zero_shot_pipeline.png','intro','sc-clap-r-fig1','figure'],
        ['Prompt strategy comparison','Ten tested prompts, highlighting baseline and best result','outputs/figures/prompt_strategy_comparison_table.png','results','sc-clap-r-fig2','table'],
        ['Top-k accuracy table','Top-1 through Top-10 classification accuracy','outputs/figures/topk_accuracy_table.png','results','sc-clap-r-topk-table','table'],
        ['Top-k accuracy curve','Prediction accuracy as the number of accepted ranks increases','outputs/figures/topk_accuracy_line.png','results','sc-clap-r-fig3','figure'],
        ['Classwise accuracy','Highest- and lowest-performing ESC-50 classes','outputs/figures/classwise_accuracy_tables.png','results','sc-clap-r-classwise-table','table'],
        ['Published ESC-50 classifiers','CLAP and published ESC-50 accuracy results','outputs/figures/published_classifier_comparison_table.png','results','sc-clap-r-model-table','table'],
        ['AudioSet quality','Accuracy compared with AudioSet quality metadata for all classes','outputs/figures/all50_esc50_accuracy_vs_audioset_quality.png','results','sc-clap-r-results','figure'],
        ['AudioSet coverage','Accuracy compared with AudioSet class video counts','outputs/figures/all50_esc50_accuracy_vs_audioset_coverage.png','results','sc-clap-r-results','figure']
      ].map(x=>({title:x[0],description:x[1],url:rawClap+x[2],section:x[3],reportId:x[4],kind:x[5]})),
      metrics:[
        {key:'overview',title:'Key accuracy results',body:
          '<p>Accuracy is the fraction of ESC-50 clips classified correctly. <strong>Higher is better.</strong> These are measured values for a pretrained LAION-CLAP model in the specified zero-shot experiment.</p>'+
          scores([['Class-name baseline','83.05%'],['Best Top-1','91.15%'],['Improvement','+8.10 pp']])+
          figure(rawClap+'outputs/figures/prompt_strategy_comparison_table.png','<strong>Prompt comparison.</strong> Ten tested strategies, ranked by measured Top-1 accuracy.','Original CLAP prompt-accuracy comparison table.','sc-clap-m-overview')},
        {key:'prompts',title:'Accuracy by prompt strategy',body:
          '<p>The prompt formulation changes while the pretrained model, dataset and candidate classes remain fixed. The best strategy achieves <strong>91.15% Top-1</strong> accuracy.</p>'+
          figure(rawClap+'outputs/figures/prompt_strategy_comparison_table.png','<strong>Prompt comparison.</strong> Top-1 accuracy by prompt strategy.','CLAP prompt-strategy accuracy table.','sc-clap-m-prompts')+
          '<p>'+link(CLAP+'/blob/main/outputs/tables/prompt_strategy_comparison_table.csv','View prompt results CSV')+'</p>'},
        {key:'topk',title:'Top-k classification accuracy',body:
          '<p>Top-k is the proportion of clips whose true class is among the first k predicted categories. This value increases with k and should be reported with the chosen evaluation protocol.</p>'+
          figure(rawClap+'outputs/figures/topk_accuracy_table.png','<strong>Top-k accuracy.</strong> Classification accuracy for k = 1 through 10.','Top-k accuracy table.','sc-clap-m-topk-table')+
          figure(rawClap+'outputs/figures/topk_accuracy_line.png','<strong>Top-k accuracy.</strong> The correct class is in the top five for 99.00% of ESC-50 clips.','Original CLAP Top-k accuracy line chart.','sc-clap-m-topk')},
        {key:'audioset',title:'AudioSet metadata correlations',body:
          '<p>Class-level accuracy was compared with AudioSet quality and video-count metadata. Both correlations were weak.</p>'+
          table(['Comparison','Pearson r','Spearman ρ'],[
            ['Accuracy vs AudioSet quality','0.081','0.107'],
            ['Accuracy vs log10(AudioSet videos)','−0.181','−0.066']
          ],'<strong>Table 4.</strong> Metadata correlation summary reported by the project.')+
          figure(rawClap+'outputs/figures/all50_esc50_accuracy_vs_audioset_coverage.png','<strong>AudioSet coverage.</strong> Class accuracy versus AudioSet video counts for 50 ESC-50 categories.','Correlation scatter plot of class accuracy versus AudioSet coverage.','sc-clap-m-correlation')}
      ]
    }
  };

  function renderStudy(project) {
    const d = studies[project];
    if (!d) return '';
    const p = d.prefix;
    const primary = ['abstract','keywords','information','nomenclature',...d.reportSections.map(s=>s.key)];
    const names = {'abstract':'Abstract','keywords':'Keywords','information':'Project information',
      'nomenclature':'Nomenclature','intro':'1.0 Introduction','dataset':'2.0 Dataset & objectives',
      'method':'3.0 Methodology','results':'4.0 Results','discussion':'5.0 Discussion & conclusion'};
    const reportToc = primary.map(k=>({id:p+'-r-'+k,title:names[k]||k}));
    const figuresToc = d.figures.map((f,i) => {
      const kind = f.kind === 'table' ? 'Table' : 'Figure';
      const num = d.figures.slice(0, i+1).filter(x => (x.kind||'figure') === (f.kind||'figure')).length;
      return {id:p+'-f-'+i,title:kind+' '+num+' · '+f.title};
    });
    const metricsToc = d.metrics.map(m=>({id:p+'-m-'+m.key,title:m.title}));
    const section = (id,title,body,cls) =>
      '<section class="'+(cls||'fl-paper-section')+'" id="'+id+'"><h2>'+title+'</h2>'+body+'</section>';
    const report =
      section(p+'-r-abstract','Abstract',d.summary.map(t=>'<p>'+t+'</p>').join(''))+
      '<section class="fl-paper-section fl-keywords-section" id="'+p+'-r-keywords"><h2>Keywords</h2>'+
      keywords(d.keywords)+'<h2 id="'+p+'-r-information">Project information</h2>'+
      info(d.projectInfo)+'<div class="fl-nomenclature" id="'+p+'-r-nomenclature">'+
      '<h2>Nomenclature</h2><p class="fl-nomenclature-intro">Definitions used in this project report.</p>'+
      terms(d.glossary)+'</div></section>'+
      d.reportSections.map(row=>section(p+'-r-'+row.key,row.title,row.body)).join('');
    const indexedFigures = d.figures.map((f,i) => {
      const kind = f.kind === 'table' ? 'Table' : 'Figure';
      const num = d.figures.slice(0, i+1).filter(x => (x.kind||'figure') === (f.kind||'figure')).length;
      return '<section class="fl-figure-section fl-index-figure" id="'+p+'-f-'+i+'">'+
        '<a class="fl-index-thumb" href="'+safe(f.url)+'" target="_blank" rel="noopener noreferrer" aria-label="Open '+kind+' '+num+' at full size">'+
        '<img src="'+safe(f.url)+'" loading="lazy" decoding="async" alt="'+safe(f.title)+'"></a>'+
        '<div class="fl-index-description"><h3>'+kind+' '+num+'. '+safe(f.title)+'</h3><p>'+safe(f.description)+'</p>'+
        '<button class="fl-view-content" type="button" data-sc-open-panel="report" data-sc-jump="'+safe(f.reportId)+'">View in report</button>'+
        '</div></section>';
    }).join('');
    const metrics = d.metrics.map(m=>section(p+'-m-'+m.key,m.title,m.body,'fl-metric-section')).join('');
    const tabs = ['report','figures','metrics'].map((tab,i)=>
      '<button type="button" id="'+p+'-tab-'+tab+'" class="fl-paper-tab'+(i===0?' is-active':'')+
      '" role="tab" data-sc-tab="'+tab+'" aria-controls="'+p+'-panel-'+tab+
      '" aria-selected="'+(i===0)+'" tabindex="'+(i===0?'0':'-1')+'">'+
      tab[0].toUpperCase()+tab.slice(1)+'</button>').join('');
    const toc = [["report",reportToc],["figures",figuresToc],["metrics",metricsToc]].map(([tab,entries])=>
      '<nav class="fl-toc-group" data-sc-toc="'+tab+'" aria-label="'+tab+' sections"'+(tab==='report'?'':' hidden')+'>'+
      entries.map((it,i)=>'<a href="#'+it.id+'" data-sc-target-tab="'+tab+'" data-sc-target-id="'+it.id+
        '"'+(tab==='report'&&i===0?' class="is-current"':'')+'>'+safe(it.title)+'</a>').join('')+
      '</nav>').join('');
    const pdfLabel = '<button type="button" data-sc-action="save">↓ Save PDF</button>';
    const modal = (name,title,body) =>
      '<dialog class="fl-modal" id="'+p+'-'+name+'-dialog" aria-labelledby="'+p+'-'+name+'-title">'+
      '<div class="fl-modal-head"><h2 id="'+p+'-'+name+'-title">'+title+
      '</h2><button type="button" class="fl-modal-close" data-sc-close aria-label="Close dialog">×</button></div>'+
      body+'</dialog>';
    const cite = modal('cite','Cite this project',
      '<p>Use the following reference for the academic work and its reported results.</p>'+
      '<label for="'+p+'-citation">APA-style reference</label>'+
      '<textarea id="'+p+'-citation" readonly rows="4">'+safe(d.citation)+'</textarea>'+
      '<button type="button" data-sc-copy="citation">Copy citation</button>'+
      '<label for="'+p+'-bibtex">BibTeX</label>'+
      '<textarea id="'+p+'-bibtex" readonly rows="8">'+safe(d.bibtex)+'</textarea>'+
      '<button type="button" data-sc-copy="bibtex">Copy BibTeX</button>');
    const rights = modal('rights','License & rights',
      '<p><strong>Academic source project.</strong> The repository does not publish an explicit open license. Publicly available source code and figures are not automatically licensed for redistribution.</p>'+
      '<p>Third-party model, dataset and image materials may have their own conditions. Contact the relevant rights holders for uses not otherwise permitted.</p>'+
      '<p>The portfolio website has a separate license covering its original frontend code, not the underlying project materials.</p>'+
      '<p>'+link(d.repository,'View source repository')+'</p>');
    return '<article class="fluoro-study scientific-study" data-sc-study="'+project+'" aria-labelledby="'+p+'-title">'+
      '<div class="fl-backbar"><button type="button" onclick="showSection(\'projects\')">Back to projects</button></div>'+
      '<header class="fl-paper-header"><h1 id="'+p+'-title">'+safe(d.title)+'</h1>'+
      '<p class="fl-paper-question">'+safe(d.question)+'</p>'+
      (d.authors ? '<p class="fl-paper-authors">'+safe(d.authors)+(d.collaborator ? ' · <strong>Collaborator:</strong> '+safe(d.collaborator) : '')+'</p>' : '')+'</header>'+
      '<div class="fl-paper-shell"><div class="fl-paper-main">'+
      '<div class="fl-paper-tabs" role="tablist" aria-label="Project case study views">'+tabs+'</div>'+
      '<div class="fl-paper-actions" role="group" aria-label="Report actions">'+pdfLabel+
      '<button type="button" data-sc-action="share">↗ Share</button>'+
      '<button type="button" data-sc-action="cite">“ ” Cite</button>'+
      '<button type="button" data-sc-action="rights">License &amp; Rights</button>'+
      '<a class="sc-source-link" href="'+safe(d.notebook)+'" target="_blank" rel="noopener noreferrer">Source notebook</a>'+
      '<span class="fl-action-status" role="status" aria-live="polite"></span></div>'+
      '<div class="fl-paper-panel" id="'+p+'-panel-report" data-sc-panel="report" role="tabpanel" aria-labelledby="'+p+'-tab-report" tabindex="0">'+report+'</div>'+
      '<div class="fl-paper-panel" id="'+p+'-panel-figures" data-sc-panel="figures" role="tabpanel" aria-labelledby="'+p+'-tab-figures" tabindex="0" hidden>'+
      '<div class="fl-panel-intro"><h2>Figures</h2><p>All project figures and tables, with links to the corresponding report sections.</p></div>'+
      indexedFigures+'</div>'+
      '<div class="fl-paper-panel" id="'+p+'-panel-metrics" data-sc-panel="metrics" role="tabpanel" aria-labelledby="'+p+'-tab-metrics" tabindex="0" hidden>'+
      '<div class="fl-panel-intro"><h2>Metrics</h2><p>Recorded quantitative evaluation, linked to the original tables and plots.</p></div>'+
      metrics+'</div></div>'+
      '<aside class="fl-paper-sidebar" aria-label="Contents"><div class="fl-sidebar-sticky"><div class="fl-sidebar-heading"><h2>Contents</h2>'+
      '<button type="button" class="fl-sidebar-toggle" data-sc-toggle-toc aria-controls="'+p+'-toc" aria-expanded="true" aria-label="Collapse contents" title="Collapse contents">'+
      '<span class="fl-collapse-icon" aria-hidden="true">‹</span></button></div>'+
      '<div id="'+p+'-toc">'+toc+'</div></div></aside></div>'+
      cite+rights+'</article>';
  }

  function initStudy() {
    const root = document.querySelector('#projectDetail .scientific-study');
    if (!root) return;
    const config = studies[Number(root.dataset.scStudy)];
    if (!config) return;
    const tabs = [...root.querySelectorAll('[data-sc-tab]')];
    const panels = [...root.querySelectorAll('[data-sc-panel]')];
    const tocGroups = [...root.querySelectorAll('[data-sc-toc]')];
    const status = root.querySelector('.fl-action-status');
    const shell = root.querySelector('.fl-paper-shell');
    const tocParent = root.querySelector('#'+config.prefix+'-toc');
    const setStatus = message => { if (status) status.textContent = message; };
    let currentView = 'report';

    function markToc(id) {
      root.querySelectorAll('[data-sc-target-id]').forEach(anchor => {
        const selected = anchor.dataset.scTargetId === id;
        anchor.classList.toggle('is-current',selected);
        if (selected) anchor.setAttribute('aria-current','location');
        else anchor.removeAttribute('aria-current');
      });
    }
    function setTab(name,targetId,shouldScroll) {
      if (!['report','figures','metrics'].includes(name)) return;
      currentView=name;
      tabs.forEach(button=>{
        const selected=button.dataset.scTab===name;
        button.classList.toggle('is-active',selected);
        button.setAttribute('aria-selected',String(selected));
        button.tabIndex=selected?0:-1;
      });
      panels.forEach(panel=>{panel.hidden=panel.dataset.scPanel!==name;});
      tocGroups.forEach(group=>{group.hidden=group.dataset.scToc!==name;});
      const group=tocGroups.find(group=>group.dataset.scToc===name);
      const first=group && group.querySelector('[data-sc-target-id]');
      markToc(targetId||(first&&first.dataset.scTargetId));
      if (shouldScroll || targetId) {
        requestAnimationFrame(()=>{
          const target=(targetId&&root.querySelector('#'+targetId)) ||
            panels.find(panel=>panel.dataset.scPanel===name);
          if (!target)return;
          const top=target.getBoundingClientRect().top+window.scrollY-
            (document.getElementById('navbar')?.getBoundingClientRect().height||76)-72;
          window.scrollTo({top:Math.max(0,top),behavior:'smooth'});
        });
      }
    }
    tabs.forEach((button,index)=>{
      button.addEventListener('click',()=>setTab(button.dataset.scTab,null,true));
      button.addEventListener('keydown',event=>{
        const target=event.key==='ArrowRight'?(index+1)%3:
          event.key==='ArrowLeft'?(index+2)%3:event.key==='Home'?0:event.key==='End'?2:null;
        if(target===null)return;
        event.preventDefault();
        tabs[target].focus();setTab(tabs[target].dataset.scTab,null,true);
      });
    });
    root.querySelectorAll('[data-sc-target-tab]').forEach(el=>el.addEventListener('click',event=>{
      event.preventDefault();setTab(el.dataset.scTargetTab,el.dataset.scTargetId,false);
    }));
    root.querySelectorAll('[data-sc-open-panel]').forEach(el=>el.addEventListener('click',()=>{
      setTab(el.dataset.scOpenPanel,el.dataset.scJump,false);
    }));
    root.querySelectorAll('.fl-figure-ref,.fl-table-ref').forEach(a=>a.addEventListener('click',event=>{
      event.preventDefault();
      const target=root.querySelector(a.getAttribute('href'));
      target?.scrollIntoView({behavior:'smooth',block:'start'});
    }));
    root.querySelector('[data-sc-toggle-toc]')?.addEventListener('click',event=>{
      const collapsed=shell.classList.toggle('is-toc-collapsed');
      tocParent.hidden=collapsed;
      const button=event.currentTarget;
      button.setAttribute('aria-expanded',String(!collapsed));
      button.setAttribute('aria-label',collapsed?'Expand contents':'Collapse contents');
      button.querySelector('.fl-collapse-icon').textContent=collapsed?'›':'‹';
    });
    setTab('report');
    const citationModal=root.querySelector('#'+config.prefix+'-cite-dialog');
    const rightsModal=root.querySelector('#'+config.prefix+'-rights-dialog');
    const openDialog=dialog=>{
      if(dialog?.showModal)dialog.showModal();
      else dialog?.setAttribute('open','');
    };
    root.querySelectorAll('[data-sc-close]').forEach(button=>button.addEventListener('click',()=>{
      const dialog=button.closest('dialog');
      if (dialog?.close)dialog.close();
      else dialog?.removeAttribute('open');
    }));
    [citationModal,rightsModal].forEach(dialog=>dialog?.addEventListener('click',event=>{
      if(event.target===dialog&&dialog.close)dialog.close();
    }));
    root.querySelector('[data-sc-action="cite"]')?.addEventListener('click',()=>openDialog(citationModal));
    root.querySelector('[data-sc-action="rights"]')?.addEventListener('click',()=>openDialog(rightsModal));
    async function copyText(text) {
      if(navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
      const area=document.createElement('textarea');
      area.value=text;area.style.position='fixed';area.style.left='-9999px';
      document.body.appendChild(area);area.select();
      const worked=document.execCommand('copy');area.remove();
      if(!worked)throw new Error('Clipboard unavailable');
    }
    root.querySelectorAll('[data-sc-copy]').forEach(button=>button.addEventListener('click',async()=>{
      try{
        await copyText(button.dataset.scCopy==='citation'?config.citation:config.bibtex);
        button.textContent='Copied';setStatus('Citation copied');
      }catch(e){setStatus('Select the text above to copy it manually.');}
    }));
    root.querySelector('[data-sc-action="share"]')?.addEventListener('click',async()=>{
      const url=location.origin+location.pathname+'#/projects/'+config.slug;
      try{
        if(navigator.share)await navigator.share({title:config.title,url});
        else await copyText(url);
        setStatus(navigator.share?'Project shared':'Project link copied');
      }catch(e){if(e.name!=='AbortError')setStatus('Sharing unavailable; use the URL in the address bar.');}
    });
    root.querySelector('[data-sc-action="save"]')?.addEventListener('click',async event=>{
      const button=event.currentTarget;
      if(button.disabled)return;
      button.disabled=true;setStatus('Preparing the illustrated PDF report...');
      try{
        const url=new URL(config.pdf,document.baseURI);
        url.searchParams.set('v','20261122-journal');
        const response=await fetch(url.href,{cache:'no-store'});
        if(!response.ok)throw new Error('No PDF: '+response.status);
        const blob=await response.blob();
        const header=new TextDecoder('ascii').decode(await blob.slice(0,5).arrayBuffer());
        if(header!=='%PDF-')throw new Error('Not a PDF file');
        const objectURL=URL.createObjectURL(new Blob([blob],{type:'application/pdf'}));
        const a=document.createElement('a');a.href=objectURL;a.download=config.downloadName;
        document.body.appendChild(a);a.click();a.remove();
        window.setTimeout(()=>URL.revokeObjectURL(objectURL),15000);
        setStatus('PDF download started');
      }catch(e){
        setStatus('PDF unavailable. The source notebook is available above.');
      }finally{button.disabled=false;}
    });
    if(Number(root.dataset.scStudy)===2){
      const viewButtons=[...root.querySelectorAll('[data-sc-view]')];
      const image=root.querySelector('#sc-view-image');
      const linkEl=root.querySelector('#sc-view-link');
      const caption=root.querySelector('#sc-view-caption');
      const details=root.querySelector('#sc-view-metrics');
      viewButtons.forEach(button=>button.addEventListener('click',()=>{
        const row=calibrationErrors[Number(button.dataset.scView)];
        if(!row)return;
        const url=rawCamera+'data/calibration_images/'+row[0];
        image.src=url;image.alt='Original calibration '+row[0];
        linkEl.href=url;caption.textContent=row[0];
        details.textContent='48 corners · mean error: '+row[1]+' px · RMS: '+row[2]+' px';
        viewButtons.forEach(b=>{
          const on=b===button;b.classList.toggle('selected',on);
          b.setAttribute('aria-pressed',String(on));
        });
      }));
    }
  }

  window.renderScientificCaseStudy=renderStudy;
  window.initScientificCaseStudy=initStudy;
})();
