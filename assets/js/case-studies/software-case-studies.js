/* Source-backed engineering software case studies. All measurements originate
   in the linked repositories; product features are described from their code
   and implementation tests. Reuses the existing scientific Report/Figures/Metrics UI. */
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
      'The documented human-reviewed real-world challenge for the original classifier yielded <strong>19.61% Top-1</strong> and <strong>27.45% Top-5</strong> accuracy. The later reference-matching route was introduced for clean and recognizable flags; the available evaluation evidence does not include a new independent photo benchmark for the combined pipeline.'+cit('sc-flag',2)
    ],
    references:[
      {label:'Kume, D. (2026). Flag Intelligence: flag-first recognition application implementation.',url:R.flag+'/blob/main/src/flag_recognition/flag_first_app.py',linkLabel:'Application code'},
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
        '<p>These figures help explain the later design choice: clean reference matching and a manual confirmation step can make the application more usable when the model encounters closely related flag designs. A directly comparable accuracy score for the combined workflow is not established by the available evaluations.</p>'+
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
    slug:'python-cardgame',prefix:'sc-card',title:'Rouge Gagne, Noir Perd · CardGame V1 & V2',
    question:'How did we design, implement and present a three-card memory game in Python for the Master 1 ALPRO course, and how was that original V1 extended into V2?',
    authors:'Master 1 · Semester 1 (2025–2026) · Algorithms and Programming (ALPRO) · Denos KUME and Sena FUKABE',
    repository:R.card,notebook:R.card+'/blob/main/versions/v1/code/game.py',
    pdf:'python-cardgame-case-study.pdf',downloadName:'Python-CardGame-Report.pdf',
    citation:'Kume, D., & Fukabe, S. (2025). Rouge Gagne, Noir Perd: CardGame V1 [Master 1 Semester 1, ALPRO Algorithms and Programming course project in Python]. Centrale Nantes. '+R.card+'/tree/main/versions/v1',
    bibtex:'@software{kume2025cardgame,author={Kume, Denos and Fukabe, Sena},title={Rouge Gagne, Noir Perd: CardGame V1},year={2025},url={'+R.card+'/tree/main/versions/v1}}',
    keywords:['Python','Pygame','Object-Oriented Programming','Finite-State Machine','Event Loop','UML','Game Development'],
    projectInfo:[
      ['Academic project','Master 1 (S1), Centrale Nantes · Algorithms and Programming (ALPRO), Python'],
      ['Team and presentation','Denos KUME and Sena FUKABE · presented on 12 December 2025'],
      ['Assessment','Collaborative Python game developed and presented to validate ALPRO'],
      ['V1 source',a(R.card+'/tree/main/versions/v1/code','View the five original Python modules')+' · '+a(R.card+'/blob/main/versions/v1/original-code.zip','Original source archive')],
      ['V1 documentation',a(R.card+'/blob/main/versions/v1/docs/academic-report.md','Read report and presentation summary')],
      ['V2 evolution',a(R.card+'/tree/main/src','Explore V2 code')+' · '+a('https://denoskume.github.io/Python-CardGame/','Play browser version')]
    ],
    glossary:[
      ['ALPRO','Algorithms and Programming — the Master 1 course assessed through the original Python project.'],
      ['Pygame','A Python library used to render the game, process player input and manage the event loop.'],
      ['Finite-state machine','A model of game phases with explicit rules for moving from one phase to another.'],
      ['Object-oriented programming','Using classes to organize player, stake, card and game-controller responsibilities.'],
      ['UML','Unified Modeling Language — diagrams used to document classes and system interactions.'],
      ['SDLC','Software Development Life Cycle — planning, implementation, testing and documentation stages.'],
      ['Pygbag','A later browser packaging tool used in V2, not part of the original V1 course submission.']
    ],
    summary:[
      '<strong>Original academic project (V1, 2025).</strong> We developed <em>Rouge Gagne, Noir Perd</em> in Python/Pygame as a Master 1 Semester 1 project to validate Algorithms and Programming (ALPRO). It was completed with <strong>Sena FUKABE</strong> and presented on <strong>12 December 2025</strong>. The original submission included the game, a 22-page report and a 20-slide presentation.',
      'V1 combines a three-card memory game with player profiles, fictitious stakes, timed game phases, animated shuffling and local JSON history. The submitted report explains objectives, UML and sequence diagrams, an ER diagram, a Gantt chart and testing. '+a(R.card+'/tree/main/versions/v1','Explore original V1 source and documentation')+'.',
      '<strong>Later evolution (V2, 2026).</strong> V2 is preserved separately at the repository root. It adds a browser build, later automated verification and measured rendering results. Those results are <strong>not</strong> presented as ALPRO V1 outcomes.'
    ],
    references:[
      {label:'Kume, D., & Fukabe, S. (2025). Rouge Gagne, Noir Perd, academic ALPRO V1 Python source.',url:R.card+'/tree/main/versions/v1/code',linkLabel:'Original V1 Python code'},
      {label:'Kume, D., & Fukabe, S. (2025). ALPRO report and presentation: source-grounded academic summary.',url:R.card+'/blob/main/versions/v1/docs/academic-report.md',linkLabel:'V1 academic documentation'},
      {label:'Kume, D., & Fukabe, S. (2025). Original CardGame V1 animated demonstration.',url:R.card+'/blob/main/docs/cardgame_demo.gif',linkLabel:'Original V1 demo'},
      {label:'Kume, D., & Fukabe, S. (2026). Later CardGame V2 source and controller.',url:R.card+'/blob/main/src/game.py',linkLabel:'V2 source'},
      {label:'Kume, D., & Fukabe, S. (2026). V2 round timing and pause/resume checks.',url:R.card+'/blob/main/tests/test_round_timing.py',linkLabel:'V2 tests'},
      {label:'Pygame. Event queue and application loop. Official documentation.',url:'https://www.pygame.org/docs/ref/event.html',linkLabel:'Pygame events'},
      {label:'Kume, D., & Fukabe, S. (2026). V2 browser packaging.',url:R.card+'/blob/main/scripts/build_web.sh',linkLabel:'V2 web build'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Context, problem and objective',body:
        '<h3>1.1 Master 1 ALPRO assessment</h3>'+
        '<p><strong>Rouge Gagne, Noir Perd</strong> was developed by Denos KUME and Sena FUKABE during Master 1 Semester 1 at Centrale Nantes for the Algorithms and Programming (ALPRO) course in Python. We developed the game collaboratively and presented it on 12 December 2025. The original submission included an implemented Python program, a 22-page report and a 20-slide classroom presentation.</p>'+
        '<h3>1.2 Why this problem?</h3>'+
        '<p>We wanted to turn fundamental programming concepts into an interactive application. A player must remember which of three cards is red while the cards change positions. The implementation must coordinate player input, a countdown, animated card movement, game rules and saved results without losing the red card identity.</p>'+
        '<h3>1.3 Objective and expected deliverables</h3>'+
        bullets(['Build a working Python/Pygame application with explicit game phases.',
          'Apply object-oriented programming and maintainable module separation.',
          'Document requirements, architecture, diagrams, testing and development stages.',
          'Demonstrate and explain the result during the ALPRO presentation.'])+
        '<p>'+a(R.card+'/blob/main/versions/v1/docs/academic-report.md','Read the V1 academic report and presentation summary')+'</p>'},
      {key:'dataset',title:'2.0 Game requirements and flow (V1)',body:
        '<h3>2.1 What the player does</h3>'+
        steps(['Create or select a player','Choose a fictitious stake','Observe the red card','Track the shuffle','Select a card','Review the result'])+
        '<p>The three cards contain one red target and two black alternatives. The player makes a choice after the shuffle. The game updates fictitious credits and records local outcomes. The original V1 implementation uses timed stages rather than a static card-selection screen.</p>'+
        facts([['3','Cards'],['5','Python modules'],['10 s','Main timed phases']])+
        '<h3>2.2 Software requirements</h3>'+
        bullets(['Reject invalid input and stakes instead of letting them corrupt the round.',
          'Keep game phases and the active card identity consistent during shuffles.',
          'Render responsive menus, betting controls, timers and results in Pygame.',
          'Maintain a local JSON history without exposing real player data.',
          'Test game logic, error conditions and basic performance.'])},
      {key:'method',title:'3.0 Original V1 design and Python implementation',body:
        '<h3>3.1 Five modules with distinct responsibilities</h3>'+
        table(['Python file','Responsibility'],[
          ['main.py','Configure Pygame; initialize models and run the event/update/render loop'],
          ['user.py','Store player identity and fictitious balance'],
          ['bet.py','Validate stake limits and turbo multiplier'],
          ['game.py','Coordinate states, cards, timers, shuffling and outcomes'],
          ['dashboard.py','Draw menus, game screens, controls and results']
        ],'<strong>Table 1.</strong> Files preserved from the original ALPRO submission.')+
        '<h3>3.2 Game controller and event loop</h3>'+
        '<p>V1 uses a state-driven controller to keep each phase explicit. The main loop receives events, updates the current game state and redraws the interface. Keeping rendering in a separate dashboard module helps prevent screen code from becoming the source of game rules.</p>'+
        '<p>'+a(R.card+'/tree/main/versions/v1/code','Inspect the original V1 Python source')+'</p>'+
        '<h3>3.3 Planning and system diagrams</h3>'+
        '<p>The academic report includes a UML class diagram, an entity–relationship (ER) diagram, an SDLC Gantt chart and a sequence diagram of a complete round. These explain the architecture, data relationships, schedule and order of interactions, rather than serving merely as illustrations.</p>'+
        '<h3>3.4 Later V2 changes</h3>'+
        '<p>The application was subsequently extended into V2 with a browser-compatible build and additional features. V2 lives under the repository-root <code>src/</code> folder; it is not the original code submitted for ALPRO.'+a(R.card+'/tree/main/src',' Explore V2 source')+'</p>'},
      {key:'results',title:'4.0 Tests, presentation and later results',body:
        '<h3>4.1 What the original submission established</h3>'+
        '<p>The V1 report documents a functioning desktop Pygame game with a round lifecycle, player input, fictitious stakes, animations, outcome calculation and local JSON records. It discusses functional testing and risks such as invalid input, inconsistent state, lag and corrupted history. The project was also presented as part of the course assessment.</p>'+
        '<p>The original academic materials do <strong>not</strong> report the later V2 browser test results or the 0.59 ms and 0.95 ms rendering measurements. We therefore do not attribute those numbers to V1.</p>'+
        '<h3>4.2 Later V2 verification</h3>'+
        '<p>V2 added desktop and Chromium browser checks, responsive layouts, protected round settlement and further tests. Its reported 300-frame desktop rendering measurements are a <strong>0.59 ms median</strong> and <strong>0.95 ms p95</strong>, in the documented test environment.'+cit('sc-card',5)+'</p>'+
        '<p>The <strong>Figures</strong> tab begins with the original V1 gameplay recording and then shows clearly labeled V2 screenshots. The <strong>Metrics</strong> tab separates the two versions.</p>'},
      {key:'discussion',title:'5.0 Discussion and project evolution',body:
        '<h3>5.1 What we learned in ALPRO</h3>'+
        '<p>The project translates algorithms and programming concepts into an application: input validation, classes, modular code, explicit states, time-dependent logic and persistent data. The report and presentation made us explain not just what the user sees, but how the game is organized and tested.</p>'+
        '<h3>5.2 Limitations and perspectives</h3>'+
        '<p>The V1 submission documents a classroom-scale application. It does not establish deployment reliability or browser-wide compatibility, and any later test measurements belong to V2. Further work could strengthen accessibility, testing and portability.</p>'+
        '<h3>5.3 V1 is preserved, V2 is maintained</h3>'+
        '<p>The five Python files and original artwork are available in <code>versions/v1</code> alongside a source archive. The current V2 controller, browser game, tests and assets remain in their existing locations.'+a(R.card+'/tree/main/versions/v1',' View V1')+' · '+a(R.card+'/tree/main/src','View V2')+'</p>'}
    ],
    figures:[
      {title:'Original V1 gameplay demonstration (2025)',description:'Rouge Gagne, Noir Perd — the original Master 1 ALPRO game. The animation shows its gameplay interface before the later V2 evolution.',url:raw+'Python-CardGame/main/docs/cardgame_demo.gif',kind:'demo'},
      {title:'V1 red card artwork',description:'Original red-card asset used in the Python/Pygame game, retained in the 2025 V1 source folder.',url:raw+'Python-CardGame/main/versions/v1/code/assets/card_back_red.png',kind:'figure'},
      {title:'V2 welcome screen (later evolution)',description:'V2 welcome interface; this is not a screenshot from the original ALPRO submission.',url:raw+'Python-CardGame/main/docs/screenshots/v2-home.png',kind:'figure',reportId:'sc-card-r-intro'},
      {title:'V2 gameplay table (later evolution)',description:'Responsive game table from V2, kept separate from the original V1 demonstration.',url:raw+'Python-CardGame/main/docs/screenshots/v2-table.png',kind:'figure',reportId:'sc-card-r-fig1'}
    ],
    metrics:[
      {key:'v1',title:'ALPRO V1 — documented deliverables and checks',body:
        '<p>V1 was an academic implementation and presentation, not a benchmark study. Its report documents functional testing, input checks, round-state consistency and risk analysis, but does not publish V2 browser metrics.</p>'+
        score([['Python files','5'],['Report','22 pages'],['Presentation','20 slides']])+
        '<p>'+a(R.card+'/blob/main/versions/v1/docs/academic-report.md','Read the original V1 academic evidence summary')+'</p>'},
      {key:'timing',title:'V2 only — measured desktop rendering',body:
        '<p>These results come from the later V2 implementation, measured over 300 desktop frames in its test environment.'+cit('sc-card',5)+'</p>'+
        score([['Median','0.59 ms'],['p95','0.95 ms'],['Frames','300']])+
        '<p>'+a(R.card+'/blob/main/tests/test_round_timing.py','Explore V2 timing and state tests')+'</p>'},
      {key:'rules',title:'V2 only — verified rule set',body:
        table(['Rule','V2 value'],[
          ['Card identities','One red and two black'],
          ['Starting profile balance','30 fictitious credits'],
          ['Stake','10–1000 credits, step 5'],
          ['Observation / shuffle / choice','10 seconds each'],
          ['Correct choice','Add one accepted stake'],
          ['Wrong choice / timeout','Subtract one accepted stake'],
          ['Saved history','Latest 200 rounds on the device']
        ],'<strong>Table 2.</strong> V2 controller rules (not a table of original ALPRO V1 test results).')+
        '<p>'+a(R.card+'/blob/main/src/game.py','Inspect V2 implementation')+'</p>'}
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
      {label:'Kume, D. (2026). MonStage: application routes and product workflow.',url:R.stage+'/blob/main/src/app/routes.tsx',linkLabel:'Application routes'},
      {label:'Kume, D. (2026). Authentication and request gateway. Cloudflare Worker source.',url:R.stage+'/blob/main/worker/src/auth.ts',linkLabel:'Worker authorization'},
      {label:'Kume, D. (2026). Application tracking and offer workspace. React frontend.',url:R.stage+'/blob/main/src/features/applications/ApplicationsPage.tsx',linkLabel:'Applications code'},
      {label:'Kume, D. (2026). Dashboard and application outcome visualization.',url:R.stage+'/blob/main/src/features/dashboard/DashboardPage.tsx',linkLabel:'Dashboard code'},
      {label:'Kume, D. (2026). Desktop and mobile layout regression tests.',url:R.stage+'/blob/main/e2e/responsive.spec.ts',linkLabel:'Responsive tests'},
      {label:'Kume, D. (2026). Sanitized Jobs screen for public project communication.',url:R.stage+'/blob/main/docs/assets/monstage_preview_sanitized.png',linkLabel:'Public preview'},
      {label:'Kume, D. (2026). Protected Apps Script backend implementation.',url:R.stage+'/blob/main/apps-script/Code.gs',linkLabel:'Backend code'}
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
