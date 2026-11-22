/* Source-backed engineering software case studies. All measurements originate
   in the linked repositories; product features are described from their code
   and README files. Reuses the existing scientific Report/Figures/Metrics UI. */
(function () {
  'use strict';
  const host = 'https://github.com/denoskume/';
  const raw = 'https://raw.githubusercontent.com/denoskume/';
  const R = {
    flag:host+'Flag-Intelligence', card:host+'Python-CardGame',
    stage:host+'monstage',
    assets:raw+'portfolio/main/assets/case-studies/'
  };
  const e = s => String(s).replace(/[&<>"']/g,t=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[t]));
  const a = (url,label) => '<a href="'+e(url)+'" target="_blank" rel="noopener noreferrer">'+e(label)+'</a>';
  const cit = (p,n) => '<a class="study-cite" href="#'+p+'-ref-'+n+'" aria-label="Reference '+n+'">['+n+']</a>';
  const fig = (url,caption,alt,id) =>
    '<figure class="fl-report-figure" id="'+e(id)+'"><a href="'+e(url)+'" target="_blank" rel="noopener noreferrer">'+
    '<img src="'+e(url)+'" loading="lazy" decoding="async" alt="'+e(alt)+'"></a><figcaption>'+caption+'</figcaption></figure>';
  const steps = labels => '<div class="fl-method-steps">'+labels.map(x=>'<span>'+e(x)+'</span>').join('')+'</div>';
  const facts = pairs => '<div class="fl-facts">'+pairs.map(x=>'<div><strong>'+e(x[0])+'</strong><span>'+e(x[1])+'</span></div>').join('')+'</div>';
  const bullets = entries => '<ul class="sc-list">'+entries.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
  const table = (columns,rows,caption) =>
    '<div class="fl-report-table">'+(caption?'<p class="fl-table-caption">'+caption+'</p>':'')+
    '<div class="fl-metric-table-wrap"><table class="fl-metric-table"><thead><tr>'+
    columns.map(t=>'<th scope="col">'+e(t)+'</th>').join('')+'</tr></thead><tbody>'+
    rows.map(row=>'<tr>'+row.map(t=>'<td>'+e(t)+'</td>').join('')+'</tr>').join('')+
    '</tbody></table></div></div>';
  const score = rows => '<div class="fl-score sc-score">'+rows.map((pair,i)=>
    '<div><span>'+e(pair[0])+'</span><strong>'+e(pair[1])+'</strong></div>').join('')+'</div>';

  const flag = {
    slug:'flag-intelligence',prefix:'sc-flag',title:'Flag Intelligence',
    question:'How can an application recognize a national flag and turn the result into a useful, sourced country profile?',
    authors:'Computer vision · Streamlit application',
    repository:R.flag,notebook:R.flag+'/blob/main/src/flag_recognition/flag_first_app.py',
    pdf:'flag-intelligence-case-study.pdf',downloadName:'Flag-Intelligence-Report.pdf',
    citation:'Kume, D. (2026). Flag Intelligence: recognition and country facts [Python/Streamlit software project]. GitHub. '+R.flag,
    bibtex:'@software{kume2026flag,author={Kume, Denos},title={Flag Intelligence},year={2026},url={'+R.flag+'}}',
    keywords:['Computer Vision','Flag Recognition','MobileNetV3','Streamlit','Image Matching','Data Provenance'],
    projectInfo:[
      ['Project','Flag recognition and country information application'],
      ['Stack','Python · Streamlit · PyTorch · MobileNetV3-Small · reference matching'],
      ['Input','Flag upload, camera capture or demo selection'],
      ['Output','Country identification, capital, area and annual population with source/year'],
      ['Try the application',a('https://flag-intelligence.streamlit.app/','Open Streamlit demo')+' · '+a(R.flag,'Source code')]
    ],
    glossary:[
      ['Reference matching','Comparing a query flag with known flag images to find a close visual match.'],
      ['MobileNetV3-Small','A compact convolutional neural-network architecture used as the classifier fallback.'],
      ['Top-1 accuracy','Percentage of evaluated images whose first predicted class matches the annotation.'],
      ['Top-5 accuracy','Percentage whose correct class appears among the five highest-ranked classes.'],
      ['Ambiguous flag','A flag design that looks similar to another, for example Côte d’Ivoire and Ireland.'],
      ['Data provenance','Metadata identifying the source, reference year and retrieval time for country facts.']
    ],
    summary:[
      'Flag Intelligence is a Streamlit application that recognizes flags from uploads, camera pictures or examples and displays country facts. It combines visual reference matching with a <strong>250-class MobileNetV3-Small</strong> fallback. Similar-looking flags can be confirmed manually.'+cit('sc-flag',1),
      'The documented human-reviewed real-world challenge for the original classifier yielded <strong>19.61% Top-1</strong> and <strong>27.45% Top-5</strong> accuracy. The later reference-matching route was introduced for clean and recognizable flags; the README does not report a fresh independent photo benchmark for the combined pipeline.'+cit('sc-flag',2)
    ],
    references:[
      {label:'Kume, D. (2026). Flag Intelligence: application design and evaluated workflow. Project documentation.',url:R.flag+'/blob/main/README.md',linkLabel:'README'},
      {label:'Kume, D. (2026). Real-world flag recognition review and classifier evaluation. Review script and results summary.',url:R.flag+'/blob/main/scripts/review_real_world_challenge.py',linkLabel:'Review pipeline'},
      {label:'PyTorch. MobileNet V3 Small model architecture. Torchvision documentation.',url:'https://docs.pytorch.org/vision/master/models/generated/torchvision.models.mobilenet_v3_small.html',linkLabel:'Model documentation'},
      {label:'Kume, D. (2026). Flag-first classification, candidate handling and country-fact interface.',url:R.flag+'/blob/main/src/flag_recognition/flag_first_app.py',linkLabel:'Application code'},
      {label:'World Bank. Indicators API documentation and annual population indicator SP.POP.TOTL.',url:'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392',linkLabel:'World Bank API'},
      {label:'mledoze/countries. Countries, capitals, geographic attributes and country codes. Open data project.',url:'https://github.com/mledoze/countries',linkLabel:'Country reference'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Introduction',body:
        '<h3>1.1 From a flag picture to a country</h3>'+
        '<p>Recognizing a flag is not always as simple as looking for its colours. Several countries use almost identical patterns, and a photo can contain folds, shadows or only part of the flag. We built Flag Intelligence to make this recognition process accessible through a web interface and to connect the identified country with useful facts.'+cit('sc-flag',1)+'</p>'+
        '<p>The aim was to combine an image-recognition pipeline with clear user feedback. Instead of presenting an uncertain guess as a definitive answer, the application can show candidate countries and allow the user to confirm a visually ambiguous flag.</p>'},
      {key:'dataset',title:'2.0 Inputs and objectives',body:
        '<h3>2.1 What the application works with</h3>'+
        '<p>The user can upload an image, take a camera picture or choose a sample. The recognition system supports <strong>250 classes</strong> covering ISO-coded entities plus Kosovo. The project also combines real-world flag photos with canonical designs and controlled presentation variants during dataset preparation.'+cit('sc-flag',1)+'</p>'+
        facts([['250','Flag classes'],['3','Input options'],['Top-5','Candidate ranking']])+
        '<h3>2.2 What a successful result should provide</h3>'+
        bullets(['Recognize the flag where the visual evidence is sufficiently distinctive.',
          'Allow confirmation when several flags share closely related designs.',
          'Show the country name, capital and area together with its latest available annual population observation.',
          'Include the population source and reference year in the visible fact sheet and JSON export.'])},
      {key:'method',title:'3.0 Methodology',body:
        steps(['Validate image','Compare flags','Use CNN fallback','Show country facts'])+
        '<h3>3.1 Recognition in two stages</h3>'+
        '<p>After checking image size and format, the application first looks for recognizable flag patterns and compares the input with reference flags. This is particularly useful for clean, centred designs. If reference matching cannot confidently distinguish the flag, the application uses the MobileNetV3-Small classifier to rank candidate countries.'+cit('sc-flag',3)+cit('sc-flag',4)+'</p>'+
        '<p>For instance, Côte d’Ivoire and Ireland have similar vertical tricolours with reversed outer colours. The final interaction allows a human to resolve an uncertain case rather than hiding the ambiguity.</p>'+
        fig(R.assets+'flag-intelligence-workflow.svg','<strong>Figure 1.</strong> Recognition and country-fact workflow, based on the application code.','Flag recognition pipeline with validation, reference matching, CNN and country facts.','sc-flag-r-fig1')+
        '<h3>3.2 Country facts and their sources</h3>'+
        '<p>After country confirmation, the application retrieves its static geographic information from a bundled country reference and seeks the latest available <strong>annual</strong> population observation from the World Bank indicator API. The year and data source accompany that population value, so it can be interpreted correctly.'+cit('sc-flag',5)+cit('sc-flag',6)+'</p>'},
      {key:'results',title:'4.0 Evaluation and implementation results',body:
        '<h3>4.1 What the real-world benchmark measured</h3>'+
        '<p>The human-reviewed real-world challenge for the original image classifier reported <strong>19.61% Top-1</strong> and <strong>27.45% Top-5</strong> accuracy. Top-1 counts first-choice correct predictions; Top-5 counts the cases where the correct country appears within the five suggested classes.'+cit('sc-flag',2)+'</p>'+
        '<p>These figures help explain the later design choice: clean reference matching and a manual confirmation step can make the application more usable when the model encounters closely related flag designs. The README does not supply a directly comparable accuracy score for the combined workflow.</p>'+
        '<h3>4.2 What the implemented product delivers</h3>'+
        '<p>The current recognition-first interface supports image upload, camera input, examples, candidate correction and country information. The JSON export includes provenance fields such as population reference year, source and retrieval timestamp. Tests cover ambiguous tricolours, the country-fact fallback and the main application flow.'+cit('sc-flag',4)+'</p>'},
      {key:'discussion',title:'5.0 Discussion and next steps',body:
        '<h3>5.1 What we learned</h3>'+
        '<p>Flag recognition combines a computer-vision task with an information-retrieval task. Good application design needs both: a visual prediction that can be checked, and a country fact sheet whose numbers can be traced back to a source.</p>'+
        '<h3>5.2 Where to develop further</h3>'+
        '<p>The next experiment is a new independently reviewed set of flag photographs covering folds, backgrounds and partial visibility. Evaluating the full reference-plus-model pipeline on that set would give a stronger measure of recognition performance under realistic conditions.</p>'}
    ],
    figures:[
      {title:'Recognition workflow',description:'Pipeline based on the deployed recognition-first Python code.',url:R.assets+'flag-intelligence-workflow.svg',kind:'figure',reportId:'sc-flag-r-fig1'},
      {title:'Flag Intelligence branding',description:'Application logo from the project assets.',url:raw+'Flag-Intelligence/main/assets/flag-intelligence-logo.png',kind:'figure',reportId:'sc-flag-r-intro'}
    ],
    metrics:[
      {key:'accuracy',title:'Documented classifier benchmark',body:
        '<p>The human-reviewed real-world challenge was conducted for the original classifier. The accuracy values describe that evaluation and provide a baseline for future combined-pipeline tests.'+cit('sc-flag',2)+'</p>'+
        score([['Top-1','19.61%'],['Top-5','27.45%'],['Classes','250']])+
        table(['Measure','Recorded value','Interpretation'],[
          ['Top-1 accuracy','19.61%','Correct first-ranked country'],
          ['Top-5 accuracy','27.45%','Correct country among five candidates'],
          ['Taxonomy','250','ISO-coded entities and Kosovo']
        ],'<strong>Table 1.</strong> Recorded classifier evaluation and model coverage.')},
      {key:'features',title:'System and data provenance',body:
        table(['Component','Implementation'],[
          ['Image inputs','Upload, camera, and examples'],
          ['Recognition','Reference matching and MobileNetV3 fallback'],
          ['Uncertain result','Candidates and manual country confirmation'],
          ['Country details','Capital and area from bundled country reference'],
          ['Population','World Bank annual series with year and source'],
          ['Export','JSON with data source and retrieval timestamp']
        ],'<strong>Table 2.</strong> Delivered recognition-first application features.')+
        '<p>'+a(R.flag+'/blob/main/tests/test_flag_first.py','Inspect tested application behaviour')+'</p>'}
    ]
  };

  const card = {
    slug:'python-cardgame',prefix:'sc-card',title:'Python CardGame · V2',
    question:'How can a real-time three-card memory game remain consistent across animations, timers, user input and desktop/browser interfaces?',
    authors:'Software engineering project · Pygame · Collaborator: Sena FUKABE',
    repository:R.card,notebook:R.card+'/blob/main/src/game.py',
    pdf:'python-cardgame-case-study.pdf',downloadName:'Python-CardGame-Report.pdf',
    citation:'Kume, D., & Fukabe, S. (2026). Python CardGame V2 [Python/Pygame software project]. GitHub. '+R.card,
    bibtex:'@software{kume2026cardgame,author={Kume, Denos and Fukabe, Sena},title={Python CardGame V2},year={2026},url={'+R.card+'}}',
    keywords:['Python','Pygame','Finite-State Machine','Event Loop','Animation','WebAssembly','Testing'],
    projectInfo:[
      ['Project','Three-card visual memory game with fictitious credits'],
      ['Platforms','Desktop Python/Pygame and browser build using Pygbag'],
      ['Player journey','Profile → stake → observation → shuffle → selection → result'],
      ['Controls','Mouse, touch, keyboard; difficulty and pause options'],
      ['Play',a('https://denoskume.github.io/Python-CardGame/','Play the browser game')+' · '+a(R.card,'Source code')]
    ],
    glossary:[
      ['Finite-state machine','A controller that moves through defined game states with explicit transition rules.'],
      ['Frame update','An iteration in the event, update and rendering loop.'],
      ['Logical slot','A persistent card position independent of the screen pixel coordinates.'],
      ['Interpolation','A smooth mapping between start and destination positions during a card exchange.'],
      ['Settlement guard','A rule that prevents a round from changing the balance more than once.'],
      ['Pygbag','A toolchain that packages Python/Pygame applications for execution in a web browser.']
    ],
    summary:[
      'Python CardGame V2 is a visual-memory game built in <strong>Pygame</strong> for desktop and the browser. The user tracks a red card through an animated shuffle and chooses its final position. The same Python controller handles transitions, timers and outcomes on both platforms.'+cit('sc-card',1),
      'The V2 verification reports successful automated tests, desktop and Chromium browser flows, plus a <strong>0.59 ms median</strong> and <strong>0.95 ms p95</strong> rendering time over 300 desktop frames in its test environment.'+cit('sc-card',3)
    ],
    references:[
      {label:'Kume, D., & Fukabe, S. (2026). Python CardGame V2. Rules, architecture and controls.',url:R.card+'/blob/main/README.md',linkLabel:'README'},
      {label:'Kume, D., & Fukabe, S. (2026). Game state, event handling, card motion and settlement controller.',url:R.card+'/blob/main/src/game.py',linkLabel:'Game controller'},
      {label:'Kume, D., & Fukabe, S. (2026). CardGame V2 verification and performance notes.',url:R.card+'/blob/main/docs/verification-v2.md',linkLabel:'Verification report'},
      {label:'Pygame. Event queue and application event loop. Official documentation.',url:'https://www.pygame.org/docs/ref/event.html',linkLabel:'Pygame events'},
      {label:'Kume, D., & Fukabe, S. (2026). Validated local storage and profile history.',url:R.card+'/blob/main/src/storage.py',linkLabel:'Storage code'},
      {label:'Kume, D., & Fukabe, S. (2026). Browser build and packaging script.',url:R.card+'/blob/main/scripts/build_web.sh',linkLabel:'Web build script'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Introduction',body:
        '<h3>1.1 A simple game with difficult timing rules</h3>'+
        '<p>The player watches three cards, follows the red one while the cards exchange positions, and tries to choose it afterward. The game looks simple, but its code must keep the card identity correct while animations, timers, user input and account balances change.'+cit('sc-card',1)+'</p>'+
        '<p>We designed a shared game controller so the desktop and web versions use the same rules. The main challenge was keeping gameplay responsive during shuffling without losing track of the card or accepting an outcome twice.</p>'},
      {key:'dataset',title:'2.0 Requirements and game rules',body:
        '<h3>2.1 Player interaction</h3>'+
        '<p>A player can create a local profile, choose a difficulty and select a stake using fictitious credits. Each round has an observation phase, a shuffle phase and a selection phase. The interface supports mouse, keyboard and touch inputs.'+cit('sc-card',1)+'</p>'+
        facts([['3','Cards'],['3','Difficulty levels'],['10 s','Each main phase']])+
        '<h3>2.2 Core engineering requirements</h3>'+
        bullets(['Maintain one red-card identity as displayed positions change.',
          'Use non-blocking animation, with pause and resume preserving elapsed time.',
          'Validate a stake before the round begins and settle its outcome once.',
          'Keep profiles and recent results across sessions using local storage.',
          'Render consistently on desktop and browser viewport sizes.'])},
      {key:'method',title:'3.0 Implementation approach',body:
        steps(['Read input','Update game state','Animate cards','Render frame'])+
        '<h3>3.1 Finite-state controller</h3>'+
        '<p>The controller progresses through profile setup, betting, observation, shuffle, selection and result states. Each state determines which actions are allowed. The event loop processes user actions and time changes, then redraws the current state; the rendering step does not change the game rules.'+cit('sc-card',2)+cit('sc-card',4)+'</p>'+
        '<h3>3.2 Keeping cards consistent while they move</h3>'+
        '<p>Each card has a permanent red or black identity and a logical slot. Exchanges move cards between slots through smooth interpolated paths. When the window is resized, coordinates are recomputed from those slots rather than resetting the shuffle. This prevents the visible animation and the final answer from disagreeing.</p>'+
        fig(raw+'Python-CardGame/main/docs/screenshots/v2-table.png','<strong>Figure 1.</strong> V2 gameplay table showing the responsive card interface.','CardGame V2 tabletop with three cards and game controls.','sc-card-r-fig1')+
        '<h3>3.3 Time, credit and storage integrity</h3>'+
        '<p>The round freezes the accepted stake. A correct choice adds one total stake to the fictitious credit balance; an incorrect choice or timeout subtracts it. The settlement guard allows only one outcome per round. Pausing shifts the time origin, and the storage layer validates local profiles and bounded history.'+cit('sc-card',5)+'</p>'},
      {key:'results',title:'4.0 Testing and results',body:
        '<h3>4.1 Validation of gameplay</h3>'+
        '<p>Automated checks and a browser walkthrough covered profile creation, stakes, round progression, pause/resume, history, returning profiles and responsive layouts. The project was also tested with a headless desktop display and Chromium browser automation.'+cit('sc-card',3)+'</p>'+
        '<h3>4.2 Rendering performance</h3>'+
        '<p>On a 300-frame desktop rendering run, the reported median frame-render time was <strong>0.59 ms</strong>, with a <strong>0.95 ms</strong> 95th percentile. These timings cover the measured rendering work in the test environment. They help explain why cached typography and graphics can keep the interface responsive.'+cit('sc-card',3)+'</p>'+
        '<p>Verification details, viewport sizes and the full rules table are available in <strong>Metrics</strong>. Both original interface screenshots are available in <strong>Figures</strong>.</p>'},
      {key:'discussion',title:'5.0 Discussion and next steps',body:
        '<h3>5.1 What the project demonstrates</h3>'+
        '<p>CardGame V2 is an event-driven application, not merely a collection of animated screens. Separating game state, presentation and storage makes it possible to reason about card identity, timer transitions and settlement independently of rendering.</p>'+
        '<h3>5.2 Further work</h3>'+
        '<p>Additional automated browser/device tests and accessibility reviews would help extend coverage to more interaction environments. A cloud-backed multiplayer mode would require a different persistence and trust model than the current local profiles.</p>'}
    ],
    figures:[
      {title:'Welcome screen',description:'V2 start interface from the project repository.',url:raw+'Python-CardGame/main/docs/screenshots/v2-home.png',kind:'figure',reportId:'sc-card-r-intro'},
      {title:'Gameplay table',description:'Responsive in-game table and controls.',url:raw+'Python-CardGame/main/docs/screenshots/v2-table.png',kind:'figure',reportId:'sc-card-r-fig1'}
    ],
    metrics:[
      {key:'timing',title:'Measured desktop rendering',body:
        '<p>The rendering check covers 300 frames under the documented desktop verification environment.'+cit('sc-card',3)+'</p>'+
        score([['Median','0.59 ms'],['p95','0.95 ms'],['Frames','300']])+
        '<p>'+a(R.card+'/blob/main/docs/verification-v2.md','Read verification methodology')+'</p>'},
      {key:'rules',title:'Game rules and validation',body:
        table(['Rule','Value'],[
          ['Card identities','One red and two black'],
          ['Starting profile balance','30 fictitious credits'],
          ['Stake','10–1000 credits, step 5'],
          ['Observation / shuffle / choice','10 seconds each'],
          ['Correct choice','Add one accepted stake'],
          ['Wrong choice / timeout','Subtract one accepted stake'],
          ['Saved history','Latest 200 rounds on the device']
        ],'<strong>Table 1.</strong> Round behaviour specified in the CardGame V2 README.')+
        '<p>The desktop and browser flows share the controller and persistence rules.'+cit('sc-card',1)+'</p>'}
    ]
  };

  const monstage = {
    slug:'monstage',prefix:'sc-stage',title:'MonStage',
    question:'How can internship discovery, evaluation, application documents and follow-ups be managed in one private workspace?',
    authors:'Web application · React · TypeScript · Cloudflare Worker',
    repository:R.stage,notebook:R.stage+'/blob/main/src/app/routes.tsx',
    pdf:'monstage-case-study.pdf',downloadName:'MonStage-Report.pdf',
    citation:'Kume, D. (2026). MonStage: Internship Intelligence & Application OS [Web application]. GitHub. '+R.stage,
    bibtex:'@software{kume2026monstage,author={Kume, Denos},title={MonStage: Internship Intelligence and Application OS},year={2026},url={'+R.stage+'}}',
    keywords:['React','TypeScript','Vite','Application Tracking','Google Sheets','Cloudflare Workers','Authentication'],
    projectInfo:[
      ['Product','Private internship search and application management'],
      ['Frontend','React / TypeScript / Vite'],
      ['Data layer','Google Sheet, Apps Script and protected Cloudflare Worker'],
      ['User workflow','Discover → Evaluate → Prepare → Apply → Follow up'],
      ['Access',a('https://denoskume.github.io/monstage/','Open restricted app')+' · '+a(R.stage,'Source repository')]
    ],
    glossary:[
      ['Application dossier','An offer-specific record containing status, documents, notes and follow-up actions.'],
      ['Authorization gateway','Server-side checks before access to protected offers is allowed.'],
      ['Identity token','A token used to verify the Google account signed in to the private workspace.'],
      ['Candidate fit','An assessment comparing an offer with the candidate’s skills and role objectives.'],
      ['Application pipeline','A workflow that tracks an opportunity from saved to submitted and later outcomes.'],
      ['Conversion rate','An outcome count divided by the relevant application count for a selected period.']
    ],
    summary:[
      'MonStage is an internship intelligence and application workspace built with React, TypeScript and a private Google Sheets data source. It brings offer discovery, candidate fit, application dossiers, CV and letter preparation, follow-ups and outcomes into one responsive product.'+cit('sc-stage',1),
      'Access is restricted using Google Sign-In and a Cloudflare Worker authorization gateway. The public portfolio uses a <strong>sanitized screenshot</strong> rather than exposing private offer records, authentication details or application notes.'+cit('sc-stage',2)
    ],
    references:[
      {label:'Kume, D. (2026). MonStage: product workflow, architecture and security model.',url:R.stage+'/blob/main/README.md',linkLabel:'Project README'},
      {label:'Kume, D. (2026). Authentication and request gateway. Cloudflare Worker source.',url:R.stage+'/blob/main/worker/src/auth.ts',linkLabel:'Worker authorization'},
      {label:'Kume, D. (2026). Application tracking and offer workspace. React frontend.',url:R.stage+'/blob/main/src/features/applications/ApplicationsPage.tsx',linkLabel:'Applications code'},
      {label:'Kume, D. (2026). Dashboard and application outcome visualization.',url:R.stage+'/blob/main/src/features/dashboard/DashboardPage.tsx',linkLabel:'Dashboard code'},
      {label:'Kume, D. (2026). Desktop and mobile layout regression tests.',url:R.stage+'/blob/main/e2e/responsive.spec.ts',linkLabel:'Responsive tests'},
      {label:'Kume, D. (2026). Sanitized Jobs screen for public project communication.',url:R.stage+'/blob/main/docs/assets/monstage_preview_sanitized.png',linkLabel:'Public preview'},
      {label:'Kume, D. (2026). Protected Apps Script integration.',url:R.stage+'/blob/main/apps-script/README.md',linkLabel:'Backend documentation'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Introduction',body:
        '<h3>1.1 The problem of scattered applications</h3>'+
        '<p>An internship search involves more than saving vacancy links. Each opportunity has different skill requirements, application documents, deadlines and follow-up actions. Managing those details across many pages and files makes it difficult to see what needs attention next.</p>'+
        '<p>MonStage was created as one workspace where a candidate can move from discovering a role to preparing and tracking the application. The goal was to keep the process organized without losing the history attached to a particular offer.'+cit('sc-stage',1)+'</p>'},
      {key:'dataset',title:'2.0 Product requirements',body:
        '<h3>2.1 Information handled by the product</h3>'+
        '<p>Each offer has an employer, job title, location, source, link, relevance information, dates and a status. An application dossier can also contain tailored documents and preparation notes. Aggregated data feeds search, prioritization and outcome indicators.</p>'+
        '<h3>2.2 What the product needed to deliver</h3>'+
        bullets(['Search and filter opportunities, and identify priority roles.',
          'Prepare documents and actions for the selected opportunity.',
          'Maintain status history and follow-ups without confusing different jobs at the same company.',
          'Display progress and application outcomes in a compact dashboard.',
          'Protect the private data source and work across desktop and mobile screens.'])+
        '<p>The interface is intended for an authorized user. The public case study illustrates its design using anonymized example data.</p>'},
      {key:'method',title:'3.0 Architecture and implementation',body:
        steps(['Discover offers','Evaluate fit','Prepare dossier','Track outcomes'])+
        '<h3>3.1 From the private dataset to the interface</h3>'+
        '<p>A React/TypeScript frontend provides the interface. The offer data is held in a private Google Sheet and read through an Apps Script service. Between the browser and that service sits a Cloudflare Worker: it verifies the Google ID token, applies an account allowlist and forwards permitted requests. The browser does not query the private spreadsheet directly.'+cit('sc-stage',2)+cit('sc-stage',7)+'</p>'+
        fig(R.assets+'monstage-workflow.svg','<strong>Figure 1.</strong> Candidate workflow from discovery to application follow-up, based on the product architecture.','Four steps of the MonStage internship application workflow.','sc-stage-r-fig1')+
        '<h3>3.2 One dossier per opportunity</h3>'+
        '<p>After finding an offer, the user can examine its requirements, move it into an application status, and prepare an offer-specific CV, letter and interview notes. Maintaining distinct dossiers matters because one company may have several unrelated roles.'+cit('sc-stage',3)+'</p>'+
        '<h3>3.3 Dashboard and privacy</h3>'+
        '<p>The dashboard summarizes the pipeline and outcomes so the next action is easier to choose. Private records and notes are not copied into the public portfolio. The screenshot shown here has been sanitized for that purpose.'+cit('sc-stage',4)+cit('sc-stage',6)+'</p>'},
      {key:'results',title:'4.0 Delivered features and verification',body:
        '<h3>4.1 Application flow</h3>'+
        '<p>The implementation includes search, sorting, multi-criteria filtering, candidate fit, a shortlist, application dossiers and tracking views. Each offer can be reviewed with its own status and supporting documents, while the dashboard gives a view of progress and outcomes.'+cit('sc-stage',1)+'</p>'+
        fig(raw+'monstage/main/docs/assets/monstage_preview_sanitized.png','<strong>Figure 2.</strong> Sanitized Jobs view showing internship discovery and filtering.','Sanitized MonStage jobs interface preview.','sc-stage-r-fig2')+
        '<h3>4.2 Testing and responsive behaviour</h3>'+
        '<p>The repository includes unit tests, authentication and Worker tests, TypeScript builds, and Playwright end-to-end checks. Responsive tests include narrow mobile widths down to <strong>360 pixels</strong> and verify that the interface remains navigable without horizontal overflow.'+cit('sc-stage',5)+'</p>'+
        '<p>This case study reports product capabilities and verified test coverage rather than inventing a count of recruiter responses, applications or users.</p>'},
      {key:'discussion',title:'5.0 Discussion and next steps',body:
        '<h3>5.1 What was learned</h3>'+
        '<p>MonStage connects interface design, data modelling, authenticated API access and candidate workflow. The work shows how a multi-step personal process can become a coherent product when the offer, its documents and its status are kept together.</p>'+
        '<h3>5.2 Further improvements</h3>'+
        '<p>Additional work can focus on workflow reliability, accessible editing and clearer historical analytics. Those improvements build on the existing architecture and should keep the same private-data protections.</p>'}
    ],
    figures:[
      {title:'Application workflow',description:'Product process, from offer discovery through follow-up.',url:R.assets+'monstage-workflow.svg',kind:'figure',reportId:'sc-stage-r-fig1'},
      {title:'Sanitized Jobs interface',description:'An anonymized preview from the public repository.',url:raw+'monstage/main/docs/assets/monstage_preview_sanitized.png',kind:'figure',reportId:'sc-stage-r-fig2'}
    ],
    metrics:[
      {key:'features',title:'Implemented product areas',body:
        table(['Area','Delivered capability'],[
          ['Discovery','Offer search, filters, sorting and relevance'],
          ['Decision','Shortlist, role fit and application readiness'],
          ['Dossiers','Per-offer documents and follow-up actions'],
          ['Pipeline','Saved, submitted and later outcome tracking'],
          ['Analytics','Conversion and application-progress views'],
          ['Access','Google token verification via Cloudflare Worker']
        ],'<strong>Table 1.</strong> Core product capabilities from the repository.')},
      {key:'verification',title:'Testing and interface coverage',body:
        '<p>Verification spans the frontend, protected data gateway and responsive layouts.'+cit('sc-stage',5)+'</p>'+
        table(['Check','Implementation'],[
          ['Frontend unit tests','Vitest'],
          ['Browser end-to-end tests','Playwright'],
          ['Minimum tested viewport','360 × 800'],
          ['Worker tests','Authentication and API behaviour'],
          ['Frontend build','TypeScript and Vite']
        ],'<strong>Table 2.</strong> Documented verification methods.')+
        '<p>'+a(R.stage+'/blob/main/e2e/responsive.spec.ts','Inspect responsive test cases')+'</p>'}
    ]
  };

  const studies={4:flag,5:card,6:monstage};
  if(typeof window.registerScientificCaseStudies!=='function'){
    throw new Error('Load scientific-case-studies.js before software-case-studies.js');
  }
  window.registerScientificCaseStudies(studies);
})();
