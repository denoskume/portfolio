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

  const cited = (prefix, number) => '<a class="study-cite" href="#' + prefix + '-ref-' + number +
    '" aria-label="Reference ' + number + '">[' + number + ']</a>';
  const bibliography = (prefix, references) =>
    '<ol class="study-reference-list">' + references.map((r,i) =>
      '<li id="' + prefix + '-ref-' + (i+1) + '"><span>' + safe(r.label) +
      '</span> ' + link(r.url, r.linkLabel || 'View source') + '</li>'
    ).join('') + '</ol>';

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
      references:[
        {label:'Zhang, Z. (2000). A Flexible New Technique for Camera Calibration. IEEE Transactions on Pattern Analysis and Machine Intelligence, 22(11), 1330–1334. DOI: 10.1109/34.888718.',url:'https://doi.org/10.1109/34.888718',linkLabel:'Read paper'},
        {label:'OpenCV. Camera Calibration with Square Chessboard. OpenCV Documentation.',url:'https://docs.opencv.org/4.12.0/dc/d43/tutorial_camera_calibration_square_chess.html',linkLabel:'Documentation'},
        {label:'Kume, D. (2026). Camera Calibration. Executed Jupyter notebook and experiment, Centrale Nantes.',url:CAMERA+'/blob/main/Camera_Calibration.ipynb',linkLabel:'Project notebook'},
        {label:'Kume, D. (2026). Calibration reprojection errors by view. Data output of Camera Calibration.',url:CAMERA+'/blob/main/outputs/view_errors.csv',linkLabel:'View error CSV'},
        {label:'Kume, D. (2026). Held-out corner prediction errors for Zhang and refined OpenCV models. Data output of Camera Calibration.',url:CAMERA+'/blob/main/outputs/held_out_view_errors.csv',linkLabel:'Held-out CSV'}
      ],
      reportSections:[
        {key:'intro',title:'1.0 Introduction',body:
          '<h3>1.1 What is camera calibration?</h3>'+
          '<p>When a camera takes a photograph, a point in the scene becomes a point in the image. The image gives us pixel coordinates, but those pixels alone do not tell us how the camera formed the image. <strong>Camera calibration</strong> estimates the parameters of that projection: for example, the focal lengths in pixels and the location of the image centre.</p>'+
          '<p>To estimate these parameters, we need objects whose geometry we already know. A chessboard is useful because its black-and-white intersections are easy to locate and form a regular pattern with known spacing. By photographing the same board in several positions, we obtain different views of the same geometry.</p>'+
          '<h3>1.2 The question we investigated</h3>'+
          '<p>Our aim was to recover the camera parameters and board poses from nine chessboard images, then measure how closely the model predicts the observed corner positions. We also asked whether a refined model could predict corners reserved from the fitting process more accurately.</p>'},
        {key:'dataset',title:'2.0 Dataset and objectives',body:
          '<h3>2.1 The images and reference geometry</h3>'+
          '<p>The dataset contains <strong>nine photographs</strong>, each <strong>640 × 480 pixels</strong>. The chessboard has <strong>8 × 6 inner corners</strong>, so each image provides 48 measurable image-to-board correspondences. With a square spacing of <strong>30 mm</strong>, we can assign physical coordinates to those board corners. In total, we detected <strong>432 corners</strong> across the nine images.'+cited('sc-cam',3)+'</p>'+
          '<div class="fl-facts"><div><strong>9</strong><span>Views</span></div><div><strong>432</strong><span>Detected corners</span></div><div><strong>30 mm</strong><span>Square pitch</span></div></div>'+
          '<h3>2.2 What we needed to produce</h3>'+
          '<p>We organized the project around four concrete outputs:</p>'+
          bullets([
            'Detect the chessboard corners and improve their pixel positions using subpixel refinement.',
            'Recover one set of camera intrinsic parameters and the position of the board in each photograph.',
            'Project the known board points back into the images and measure the difference from the detected corners.',
            'Test prediction on held-out corners and compare the linear method with nonlinear OpenCV refinement.'
          ])+
          '<p>The resulting camera parameters, per-image errors and diagnostic figures were exported from the notebook, so each step can be inspected and compared.</p>'},
        {key:'method',title:'3.0 Methodology',body:
          '<div class="fl-method-steps"><span>Find corners</span><span>Estimate mappings</span><span>Recover camera</span><span>Test predictions</span></div>'+
          '<h3>3.1 Finding the same points in every photograph</h3>'+
          '<p>We first detected the 48 internal chessboard intersections in each image. We then refined their locations to subpixel precision. Every detected corner was paired with its known position on the board. These correspondences are the input to the calibration: they tell the algorithm where a known physical point appears in the photograph.</p>'+
          figure(rawCamera+'outputs/figures/detected_chessboard_corners.png','<strong>Figure 1.</strong> Detected chessboard intersections provide the matching image and board points needed for calibration.','Calibration photos with detected checkerboard corner positions.','sc-cam-r-fig1')+
          '<h3>3.2 Recovering the camera geometry</h3>'+
          '<p>For each photograph, we estimated a <strong>homography</strong>, a mapping that explains how the flat chessboard appears in the image. We used normalized point coordinates, Direct Linear Transform (DLT) and Singular Value Decomposition (SVD) to calculate these mappings.</p>'+
          '<p>Because all nine photographs were taken with the same camera, they share the same intrinsic parameters. <strong>Zhang calibration</strong> combines information from the different homographies to estimate those parameters.'+cited('sc-cam',1)+' We then recovered the rotation and translation of the chessboard for each view.</p>'+
          figure(rawCamera+'outputs/figures/homography_estimation_pipeline.png','<strong>Figure 2.</strong> From detected board points to homographies, camera intrinsics and board poses.','Project diagram of the camera calibration processing pipeline.','sc-cam-r-fig2')+
          '<h3>3.3 Checking predictions instead of stopping at a fitted matrix</h3>'+
          '<p>Once we had a camera model, we projected the known corners back into each image. We measured the distance in pixels between the detected location and the location predicted by the model; this is the <strong>reprojection error</strong>. A smaller value means the predicted corner is closer to its observed position.</p>'+
          '<p>We also repeated a held-out test nine times. In each fold, the camera intrinsics were fitted using eight images. For the remaining view, 24 alternating corners established the board pose and the other 24 were reserved to test the predictions. This gave <strong>216 test corners per model</strong>. We compared the linear Zhang model with nonlinear OpenCV refinement, which also estimates lens distortion.'+cited('sc-cam',2)+'</p>'},
        {key:'results',title:'4.0 Experimental results',body:
          '<h3>4.1 How well did the model reproduce the observed corners?</h3>'+
          '<p>The average distance between detected and projected corners across the nine calibration views was <strong>0.434 pixels</strong>. The overall root-mean-square error (RMS), which gives more weight to larger errors, was <strong>0.534 pixels</strong>.'+cited('sc-cam',4)+' Both measures describe how closely the fitted camera model represents the observed chessboard points.</p>'+
          '<p>We also examined the results separately for each photograph. <strong>img1.jpg</strong> had an RMS of <strong>0.277 px</strong>, while <strong>img7.jpg</strong> had <strong>0.859 px</strong>. The difference shows why it is useful to inspect individual views: a single average can hide which board positions are more difficult for the model to reproduce.</p>'+
          '<p>The complete table of nine image errors, the per-view chart and the source photos are available in the <strong>Metrics</strong> and <strong>Figures</strong> tabs.</p>'+
          '<h3>4.2 Can the camera model predict reserved corners?</h3>'+
          '<p>The second experiment tested prediction rather than simply measuring a fit. For the <strong>216 reserved corners</strong>, the linear Zhang model produced a pooled RMS of <strong>0.395 px</strong>. With nonlinear OpenCV refinement, pooled RMS fell to <strong>0.352 px</strong>—a <strong>10.7% reduction</strong>. The refined model produced a lower error in each of the nine held-out folds.'+cited('sc-cam',5)+'</p>'+
          '<p>In practical terms, the refined camera parameters placed the predicted corners closer to their detected locations. The improvement comes from a refinement that includes nonlinear optimization and lens-distortion parameters, with a different skew constraint.</p>'+
          figure(rawCamera+'outputs/figures/held_out_view_errors.png','<strong>Figure 3.</strong> Held-out prediction errors for the linear and refined camera models. Lower bars indicate closer predictions of reserved corners.','Held-out camera model prediction error across nine views.','sc-cam-r-fig4')+
          '<p>The full held-out error table can be explored in <strong>Metrics</strong>, including the difference between the two methods for each board view.</p>'},
        {key:'discussion',title:'5.0 Discussion and conclusion',body:
          '<h3>5.1 What did the experiments show?</h3>'+
          '<p>We recovered a common camera matrix and nine chessboard poses, then checked the results in two ways: reproduction of the observed corners and prediction of reserved corners. The fitted model achieved <strong>0.434 px mean reprojection error</strong>, while refinement lowered the held-out RMS from <strong>0.395 to 0.352 px</strong>.</p>'+
          '<p>The per-view results also show that accuracy varies with the photograph. Comparing img1.jpg with img7.jpg is a useful next diagnostic step because the same camera parameters are applied to different board positions.</p>'+
          '<h3>5.2 What we learned from the project</h3>'+
          '<p>This project connects the mathematics of a camera model with measurable image results. It demonstrates corner detection, normalized homography estimation, the Zhang method, pose recovery and an evaluation based on reserved image points—not simply the calculation of a matrix.</p>'+
          '<h3>5.3 Next steps</h3>'+
          '<p>Additional images with varied chessboard positions, angles and image conditions would extend the evaluation. They would also make it possible to study how consistently the estimated camera parameters perform across a wider range of observations.</p>'}
      ],
      figures:[
        ['Corner detection','Detected corners in the nine photographs','outputs/figures/detected_chessboard_corners.png','intro','sc-cam-r-fig1'],
        ['Homography estimation','From board correspondences to the recovered camera model','outputs/figures/homography_estimation_pipeline.png','method','sc-cam-r-fig2'],
        ['Reprojection by view','Average pixel error for each input image','outputs/figures/mean_reprojection_error_by_view.png','results','sc-cam-r-results'],
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
      references:[
        {label:'Piczak, K. J. (2015). ESC: Dataset for Environmental Sound Classification. Proceedings of the 23rd ACM International Conference on Multimedia, 1015–1018. DOI: 10.1145/2733373.2806390.',url:'https://doi.org/10.1145/2733373.2806390',linkLabel:'Read paper'},
        {label:'Wu, Y., Chen, K., Zhang, T., Hui, Y., et al. (2023). Large-Scale Contrastive Language-Audio Pretraining with Feature Fusion and Keyword-to-Caption Augmentation. ICASSP 2023.',url:'https://arxiv.org/abs/2211.06687',linkLabel:'Read paper'},
        {label:'Gemmeke, J. F., Ellis, D. P. W., Freedman, D., Jansen, A., et al. (2017). Audio Set: An Ontology and Human-Labeled Dataset for Audio Events. IEEE ICASSP 2017.',url:'https://research.google/pubs/audio-set-an-ontology-and-human-labeled-dataset-for-audio-events/',linkLabel:'Read paper'},
        {label:'Kume, D., and Muthukrishnan, V. (2026). CLAP Zero-Shot Audio Classification on ESC-50. Executed Jupyter notebook, Centrale Nantes.',url:CLAP+'/blob/main/notebooks/main.ipynb',linkLabel:'Project notebook'},
        {label:'Kume, D., and Muthukrishnan, V. (2026). Prompt-strategy comparison results. Experiment output.',url:CLAP+'/blob/main/outputs/tables/prompt_strategy_comparison_table.csv',linkLabel:'Prompt results CSV'},
        {label:'Kume, D., and Muthukrishnan, V. (2026). Top-k accuracy results. Experiment output.',url:CLAP+'/blob/main/outputs/tables/topk_accuracy.csv',linkLabel:'Top-k results CSV'},
        {label:'Kume, D., and Muthukrishnan, V. (2026). ESC-50 classwise accuracy results. Experiment figure.',url:CLAP+'/blob/main/outputs/figures/classwise_accuracy_tables.png',linkLabel:'Classwise table'},
        {label:'Kume, D., and Muthukrishnan, V. (2026). Comparison with published ESC-50 classifiers. Compiled experiment table.',url:CLAP+'/blob/main/outputs/figures/published_classifier_comparison_table.png',linkLabel:'Comparison table'}
      ],
      reportSections:[
        {key:'intro',title:'1.0 Introduction',body:
          '<h3>1.1 Why this problem matters</h3>'+
          '<p>Imagine hearing a short sound but having no labeled examples available to teach a new classifier. A conventional supervised model would need recordings with known labels. CLAP offers another approach: it has already learned relationships between sounds and language, so it can compare an unfamiliar recording with descriptions of possible sound categories.'+cited('sc-clap',2)+'</p>'+
          '<p>However, a sound can be described in several ways. A label such as "rain" is short, while "an audio recording of rain" provides context. Both point to the same class, but they create different text embeddings. Our research question was simple: <strong>does the wording of a class description change how accurately CLAP recognizes environmental sounds?</strong></p>'+
          '<h3>1.2 What we set out to test</h3>'+
          '<p>We compared ten ways of writing the same 50 ESC-50 class names, using one pretrained audio-text model and the same audio clips throughout. This let us study the effect of the prompt itself while keeping the classification process consistent.</p>'},
        {key:'dataset',title:'2.0 Dataset and objectives',body:
          '<h3>2.1 The audio we worked with</h3>'+
          '<p>We used <strong>ESC-50</strong>, a dataset of <strong>2,000 five-second recordings</strong> representing <strong>50 everyday sound categories</strong>.'+cited('sc-clap',1)+' Each recording has a known class, which provides a direct way to check whether the model selected the correct sound. We used these labels for evaluation rather than fitting a new classifier.</p>'+
          '<div class="fl-facts"><div><strong>2,000</strong><span>Audio clips</span></div><div><strong>50</strong><span>Classes</span></div><div><strong>10</strong><span>Prompt strategies</span></div></div>'+
          '<h3>2.2 What the project needed to deliver</h3>'+
          '<p>Our goal was to build a complete zero-shot classification workflow, compare prompt choices fairly, and explain what changed in the predictions. We organized the work into four tasks:</p>'+
          bullets([
            'Prepare the ESC-50 recordings and load the pretrained LAION-CLAP model.',
            'Describe each of the 50 classes using ten different text templates.',
            'Compare audio and text representations and measure Top-1 and Top-k accuracy.',
            'Examine which classes were easier or harder to recognize, and study their relationship with AudioSet metadata.'
          ])+
          '<p>We evaluated each prompt strategy on the full dataset. The main comparison was against a simple baseline that used class names without surrounding words.</p>'},
        {key:'method',title:'3.0 Methodology',body:
          '<div class="fl-method-steps"><span>Prepare clips</span><span>Encode audio and text</span><span>Compare similarity</span><span>Evaluate</span></div>'+
          '<h3>3.1 How CLAP makes a prediction</h3>'+
          '<p>For each sound clip, the CLAP audio encoder produces a numerical representation called an <strong>embedding</strong>. The text encoder does the same for every candidate description. We normalize these vectors and calculate their cosine similarity. A higher similarity means that, according to the model, the sound and the description are a better match.</p>'+
          '<p>For example, a clip containing rain is compared with descriptions of all 50 possible classes. The class whose text embedding obtains the highest similarity becomes the <strong>Top-1 prediction</strong>. The model does not need to be retrained for the ESC-50 labels.'+cited('sc-clap',2)+'</p>'+
          figure(rawClap+'outputs/figures/clap_complete_zero_shot_pipeline.png','<strong>Figure 1.</strong> The audio and text encoders produce embeddings; cosine similarity ranks the candidate sound classes.','CLAP processing pipeline from audio and text through similarity to class ranking.','sc-clap-r-fig1')+
          '<h3>3.2 Why we changed the prompts</h3>'+
          '<p>We kept the recordings, model and candidate categories fixed, then changed how each category was introduced to the text encoder. The ten strategies included the bare class name, "the sound of {}", "a sound clip of {}" and "an audio recording of {}". The braces stand for one of the 50 sound classes.</p>'+
          '<p>This matters because CLAP compares complete text representations, not isolated dictionary labels. The surrounding words can make a description more similar to the language used when the model learned its audio-text associations.</p>'+
          '<h3>3.3 How we measured performance</h3>'+
          '<p><strong>Top-1 accuracy</strong> counts the recordings for which the highest-ranked class is correct. <strong>Top-k accuracy</strong> checks whether the correct answer appears within the first k suggestions. We also looked at individual class results to understand where recognition was strongest and where confusion remained.</p>'},
        {key:'results',title:'4.0 Experimental results',body:
          '<h3>4.1 The wording of the prompt changed accuracy</h3>'+
          '<p>Starting with class names alone, CLAP correctly classified <strong>83.05%</strong> of the recordings. With the prompt <strong>"an audio recording of {}"</strong>, accuracy increased to <strong>91.15%</strong>. That is a gain of <strong>8.10 percentage points</strong>, achieved by changing the text descriptions without modifying the pretrained model.'+cited('sc-clap',5)+'</p>'+
          '<p>The improvement is meaningful because the audio clips and the 50 possible answers were the same in both tests. The text supplied to CLAP was the difference. The comparison also shows that extra words do not automatically help: the tested prompt strategies produced different scores, and some performed below the class-name baseline.</p>'+
          figure(rawClap+'outputs/figures/prompt_strategy_comparison_table.png','<strong>Table 1.</strong> Top-1 accuracy for the ten prompt strategies. The class-name baseline and the best-performing prompt provide the key comparison.','Prompt strategy table with accuracies from the CLAP project.','sc-clap-r-fig2')+
          '<p>Among the alternative formulations, "a sound clip of {}" reached <strong>87.60%</strong> and "a recording of the sound of {}" reached <strong>87.55%</strong>. The results demonstrate why choosing a prompt is part of the classification method rather than a purely cosmetic wording decision.</p>'+
          '<h3 id="sc-clap-r-topk-section">4.2 What the Top-k results tell us</h3>'+
          '<p>Top-1 accuracy tells us how often the first answer is correct, but it does not show how close other predictions were. With the best prompt, the correct class appeared in the top three for <strong>97.45%</strong> of clips and in the top five for <strong>99.00%</strong>.'+cited('sc-clap',6)+' So even when the first prediction was wrong, the correct label was often among the next few suggestions.</p>'+
          '<p>This matters for interpreting a similarity-based classifier: its ranking can still contain useful information beyond the first label. The complete Top-1 through Top-10 table is available in <strong>Figures</strong> and <strong>Metrics</strong>.</p>'+
          figure(rawClap+'outputs/figures/topk_accuracy_line.png','<strong>Figure 2.</strong> The rise from Top-1 to Top-5 accuracy shows how often the correct class appears among the highest-ranked suggestions.','Top-k accuracy curve for the best CLAP prompt.','sc-clap-r-fig3')+
          '<h3 id="sc-clap-r-classwise-section">4.3 Differences between sound categories</h3>'+
          '<p>We then examined accuracy separately for each of the 50 categories. Some sounds were recognized consistently, while others produced more incorrect first choices. Looking at classwise results helps identify the types of recordings that are more difficult for this model, rather than relying only on one overall percentage.'+cited('sc-clap',7)+'</p>'+
          '<p>We also compared the classwise accuracy scores with AudioSet quality statistics and class video counts.'+cited('sc-clap',3)+' The measured Pearson correlations were <strong>0.081</strong> for quality and <strong>−0.181</strong> for log10 video counts. These small values show that neither metadata variable closely tracked the differences in recognition accuracy across classes. The classwise tables and scatter plots can be inspected in <strong>Figures</strong>.</p>'+
          '<h3 id="sc-clap-r-published-section">4.4 Putting the result in context</h3>'+
          '<p>Our <strong>91.15%</strong> Top-1 accuracy comes from zero-shot classification: we used the pretrained CLAP representations without fitting a classifier on ESC-50. The project also presents published ESC-50 accuracies for BEATs (98.61%), HTS-AT (96.20%) and AST (95.30%). Those results come from supervised or fine-tuned approaches and provide a useful reference for understanding the performance of different audio classification strategies.'+cited('sc-clap',8)+'</p>'+
          '<p>The complete model comparison appears in the <strong>Figures</strong> tab, alongside the classwise tables and Top-k results.</p>'},
        {key:'discussion',title:'5.0 Discussion and conclusion',body:
          '<h3>5.1 What did we learn?</h3>'+
          '<p>The experiment answered our research question: <strong>prompt formulation had a clear effect on CLAP classification accuracy</strong>. Using a more descriptive phrase raised Top-1 accuracy from 83.05% to 91.15% while the model weights and audio examples stayed unchanged.</p>'+
          '<p>The Top-k results add another insight. A first-choice error does not necessarily mean the correct category is unrelated to the recording; in many cases it is already ranked among the strongest candidates. This helps explain both the strengths and remaining confusions of the model.</p>'+
          '<h3>5.2 Why this work is useful</h3>'+
          '<p>The project shows how to build and evaluate an audio-text classification pipeline, design controlled prompt comparisons, and interpret performance across categories. It also demonstrates that improving the text representation can raise accuracy without creating a new supervised training pipeline.</p>'+
          '<h3>5.3 Next steps</h3>'+
          '<p>A natural continuation is to test the same prompt strategies on different audio datasets, compare other CLAP checkpoints, and examine descriptions adapted to specific recording conditions. Those experiments would show how the prompt effects change across audio domains.</p>'}
      ],
      figures:[
        ['Zero-shot pipeline','Audio and text embedding flow through similarity-based classification','outputs/figures/clap_complete_zero_shot_pipeline.png','intro','sc-clap-r-fig1','figure'],
        ['Prompt strategy comparison','Ten tested prompts, highlighting baseline and best result','outputs/figures/prompt_strategy_comparison_table.png','results','sc-clap-r-fig2','table'],
        ['Top-k accuracy table','Top-1 through Top-10 classification accuracy','outputs/figures/topk_accuracy_table.png','results','sc-clap-r-topk-section','table'],
        ['Top-k accuracy curve','Prediction accuracy as the number of accepted ranks increases','outputs/figures/topk_accuracy_line.png','results','sc-clap-r-fig3','figure'],
        ['Classwise accuracy','Highest- and lowest-performing ESC-50 classes','outputs/figures/classwise_accuracy_tables.png','results','sc-clap-r-classwise-section','table'],
        ['Published ESC-50 classifiers','CLAP and published ESC-50 accuracy results','outputs/figures/published_classifier_comparison_table.png','results','sc-clap-r-published-section','table'],
        ['AudioSet quality','Accuracy compared with AudioSet quality metadata for all classes','outputs/figures/all50_esc50_accuracy_vs_audioset_quality.png','results','sc-clap-r-classwise-section','figure'],
        ['AudioSet coverage','Accuracy compared with AudioSet class video counts','outputs/figures/all50_esc50_accuracy_vs_audioset_coverage.png','results','sc-clap-r-classwise-section','figure']
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
    const primary = ['abstract','keywords','information','nomenclature',...d.reportSections.map(s=>s.key),'references'];
    const names = {'abstract':'Abstract','keywords':'Keywords','information':'Project information',
      'nomenclature':'Nomenclature','intro':'1.0 Introduction','dataset':'2.0 Dataset & objectives',
      'method':'3.0 Methodology','results':'4.0 Results','discussion':'5.0 Discussion & conclusion',
      'references':'6.0 References'};
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
      d.reportSections.map(row=>section(p+'-r-'+row.key,row.title,row.body)).join('')+
      section(p+'-r-references','6.0 References',bibliography(p,d.references),'fl-paper-section study-references');
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
