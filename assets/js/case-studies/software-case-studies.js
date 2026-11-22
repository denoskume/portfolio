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
    slug:'python-cardgame',prefix:'sc-card',title:'Rouge Gagne, Noir Perd · CardGame V1',
    question:'How can we design, program and explain a complete interactive card game using Python for the Master 1 Algorithms and Programming (ALPRO) course?',
    authors:'Master 1 · Semester 1 (2025–2026) · Centrale Nantes · Denos KUME & Sena FUKABE',
    repository:R.card+'/tree/main/versions/v1',
    notebook:R.card+'/blob/main/versions/v1/code/main.py',
    pdf:'python-cardgame-case-study.pdf',downloadName:'CardGame-V1-ALPRO-Report.pdf',
    citation:'Kume, D., & Fukabe, S. (2025). Rouge Gagne, Noir Perd [Master 1 Semester 1, Algorithmics and Programming (ALPRO) project]. Centrale Nantes. '+R.card+'/tree/main/versions/v1',
    bibtex:'@software{kume2025cardgame,author={Kume, Denos and Fukabe, Sena},title={Rouge Gagne, Noir Perd},year={2025},url={'+R.card+'/tree/main/versions/v1}}',
    keywords:['Python','Pygame','Object-Oriented Programming','State Machine','UML','JSON Persistence','Software Design'],
    projectInfo:[
      ['Academic setting','Master 1 · Semester 1 · Centrale Nantes · Academic year 2025–2026'],
      ['Course','Algorithmics and Programming (ALPRO), Python'],
      ['Authors','Denos KUME and Sena FUKABE'],
      ['Instructor','Mira Rizkallah'],
      ['Submission and presentation','12 December 2025 · collaborative coursework'],
      ['Project objective','Develop and present a working Python game to validate ALPRO'],
      ['Original code',a(R.card+'/tree/main/versions/v1/code','Explore the five Python modules')],
      ['Original figures',a(R.card+'/tree/main/versions/v1/docs/figures','Open V1 images and diagrams')]
    ],
    glossary:[
      ['ALPRO','Algorithmics and Programming, the Master 1 course assessed by this project.'],
      ['Pygame','Python library for the game window, visual rendering, input events and animation.'],
      ['State machine','A controller that switches between defined game stages only when a transition is allowed.'],
      ['OOP','Object-oriented programming: separating user, stake, cards and game controller into dedicated classes.'],
      ['UML','Unified Modeling Language, used to explain the classes and their relationships.'],
      ['ER diagram','Entity–relationship diagram, used to describe player and round data.'],
      ['SDLC','Software Development Life Cycle: requirements, design, implementation, testing and documentation.'],
      ['JSON','A local text format used by the game to record round history.']
    ],
    summary:[
      '<strong>Academic context.</strong> We created <em>Rouge Gagne, Noir Perd</em> in <strong>Python and Pygame</strong> for our Master 1 Semester 1 <strong>Algorithmics and Programming (ALPRO)</strong> course at Centrale Nantes. The project was developed by <strong>Denos KUME and Sena FUKABE</strong>, with a report and a presentation on <strong>12 December 2025</strong>.'+cit('sc-card',2),
      '<strong>What we built.</strong> A single-player, three-card memory game in which the player identifies a red card, follows it during an animated shuffle, and selects a card before the timer expires. The program manages player profiles, fictitious stakes and balances, game states, results and local JSON history.'+cit('sc-card',1),
      '<strong>What we demonstrated.</strong> The project connects programming fundamentals to a complete application through modular Python classes, an event-driven Pygame interface, UML and sequence diagrams, software development planning, a documented test plan and an academic presentation.'
    ],
    references:[
      {label:'Kume, D., & Fukabe, S. (2025). Rouge Gagne, Noir Perd. Original Master 1 ALPRO Python source.',url:R.card+'/tree/main/versions/v1/code',linkLabel:'Original Python files'},
      {label:'Kume, D., & Fukabe, S. (2025). Rouge Gagne, Noir Perd. Original course-project metadata and run instructions.',url:R.card+'/blob/main/versions/v1/README.md',linkLabel:'Academic source metadata'},
      {label:'Kume, D., & Fukabe, S. (2025). Rouge Gagne, Noir Perd. Original gameplay demonstration.',url:R.card+'/blob/main/docs/cardgame_demo.gif',linkLabel:'Gameplay demo'},
      {label:'Kume, D., & Fukabe, S. (2025). SDLC Gantt chart from the ALPRO report.',url:R.card+'/blob/main/versions/v1/docs/figures/sdlc-gantt.webp',linkLabel:'Original Gantt chart'},
      {label:'Python Software Foundation. Python documentation.',url:'https://docs.python.org/3/',linkLabel:'Python documentation'},
      {label:'Pygame Community. Pygame event reference.',url:'https://www.pygame.org/docs/ref/event.html',linkLabel:'Pygame events'},
      {label:'Kume, D., & Fukabe, S. (2025). Class architecture diagram extracted from the original ALPRO report.',url:R.card+'/blob/main/versions/v1/docs/figures/alpro-v1-uml-classes.webp',linkLabel:'Original UML diagram'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Context and objectives',body:
        '<h3>1.1 Master 1 ALPRO assessment</h3>'+
        '<p><strong>Rouge Gagne, Noir Perd</strong> was our Master 1 Semester 1 programming project at Centrale Nantes. We developed it together, <strong>Denos KUME and Sena FUKABE</strong>, as part of the <strong>Algorithmics and Programming (ALPRO)</strong> course taught by Mira Rizkallah. The submitted work included a functional Python game, a 22-page project report and a 20-slide presentation dated 12 December 2025.'+cit('sc-card',2)+'</p>'+
        '<h3>1.2 The problem</h3>'+
        '<p>A player has to identify the red card among three, watch the cards move, and select the correct position. A simple-looking game requires reliable coordination between timing, animations, user input, fictitious stakes, card identity and saved results.</p>'+
        '<h3>1.3 Our objectives</h3>'+
        bullets([
          'Build a complete interactive game using Python and Pygame.',
          'Apply object-oriented programming, modular design and clear state transitions.',
          'Document requirements, architecture, test strategy and development stages.',
          'Present the implemented project and explain the technical decisions made.'
        ])+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-menu.webp','<strong>Figure 1.</strong> The original V1 menu collects the player's nickname and avatar before the first round.','Original 2025 CardGame player menu','sc-card-r-v1-menu')},
      {key:'dataset',title:'2.0 Requirements and game rules',body:
        '<h3>2.1 Gameplay: one complete round</h3>'+
        steps(['Create player profile','Configure stake','Observe cards','Track shuffle','Select card','Display result'])+
        '<p>The interface collects a nickname and avatar, lets the player configure a stake using fictitious credits, and displays one red and two black cards. During the round, the player observes the cards, follows the shuffle and selects a position before the countdown ends. The outcome updates the balance and is recorded in local history.'+cit('sc-card',1)+'</p>'+
        facts([['3','Cards'],['10 s','Each principal phase'],['60 FPS','Design target']])+
        '<h3>2.2 Player setup and observation</h3>'+
        '<p>The bet dashboard displays the available fictitious credit balance, allowed stake and turbo options. The observation screen then reveals which card is red and starts the countdown, giving the player time to memorize its position.</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-bet-dashboard.webp','<strong>Figure 2.</strong> The V1 betting dashboard shows balance, stake controls and turbo choice.','Original V1 bet configuration screenshot','sc-card-r-v1-bet-dashboard')+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-observation.webp','<strong>Figure 3.</strong> Observation phase: the red target card is visible before shuffling.','Original V1 card observation screenshot','sc-card-r-v1-observation')+
        '<h3>2.3 Functional requirements</h3>'+
        bullets([
          'Create a player profile using nickname and avatar selection.',
          'Enforce minimum and maximum stake values and apply the turbo multiplier.',
          'Display the card backs, animated shuffling, timed selection and results.',
          'Calculate win/loss outcomes and transition to Game Over when credits are insufficient.',
          'Store round history in a local JSON file.'
        ])+
        '<h3>2.4 Shuffle and selection stages</h3>'+
        '<p>During the shuffle, the same card identities move between positions. After the movement ends, the selection stage hides the target and gives the player a limited time to choose one of the three cards.</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-shuffle.webp','<strong>Figure 4.</strong> V1 shuffle phase: the player follows card movements within the countdown.','Original V1 shuffle screenshot','sc-card-r-v1-shuffle')+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-selection.webp','<strong>Figure 5.</strong> V1 selection phase: the player chooses one card before time expires.','Original V1 card selection screenshot','sc-card-r-v1-selection')+
        '<h3>2.5 Constraints</h3>'+
        '<p>The submitted implementation targets a <strong>single-player, offline desktop game</strong> built in Python/Pygame. The report specifies a fixed Pygame window and a 60 FPS smoothness objective. This is a design target, not an independently measured frame-rate result.</p>'},
      {key:'method',title:'3.0 Architecture and implementation',body:
        '<h3>3.1 Five Python modules</h3>'+
        table(['Module','Role in the original game'],[
          ['main.py','Initializes Pygame and coordinates the event, update and render loop'],
          ['user.py','Manages the player identity, selected avatar and balance'],
          ['bet.py','Contains stake limits and turbo-related betting logic'],
          ['game.py','Controls the game states, round timing, card movements and outcomes'],
          ['dashboard.py','Draws menus, gameplay controls, status and result views']
        ],'<strong>Table 1.</strong> Source structure of the ALPRO project.')+
        '<p>The program separates domain logic from screen rendering. This makes each responsibility easier to understand and gives the project a structure that can be discussed and tested.'+cit('sc-card',1)+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-module-overview.webp','<strong>Figure 6.</strong> The five Python modules and their connections in the project architecture.','Original ALPRO module architecture diagram','sc-card-r-v1-module-overview')+
        '<h3>3.2 Object-oriented model</h3>'+
        '<p>The report describes a <strong>User</strong> class for player data, a <strong>Bet</strong> class for stakes, a <strong>Card</strong> class for visual representation and position, and a <strong>CardGame</strong> controller that composes these objects. The UML diagram explains how the classes work together, while the ER diagram documents how player and round records relate.'+cit('sc-card',7)+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-uml-classes.webp','<strong>Figure 7.</strong> UML class diagram showing the relationships between the game controller, domain objects and interface.','Original ALPRO UML class architecture','sc-card-r-v1-uml-classes')+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-er-player-round.webp','<strong>Figure 8.</strong> Entity–relationship diagram describing player data and stored round records.','Original ALPRO player and round ER diagram','sc-card-r-v1-er-player-round')+
        '<h3>3.3 State-driven event handling</h3>'+
        '<p>The game moves through a series of explicit states for player setup, betting, card display, shuffle, selection and result. The Pygame loop collects events, updates the active state and redraws the screen. This structure is important because a selection should only be accepted in the correct phase and the chosen card must match its position after the shuffle.</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-sequence-round.webp','<strong>Figure 9.</strong> The sequence diagram follows the interaction between player, game controller and stored results during a round.','Original V1 game round sequence diagram','sc-card-r-v1-sequence-round')+
        '<h3>3.4 Software development lifecycle</h3>'+
        '<p>We documented the project in four stages: <strong>design</strong> (requirements and diagrams), <strong>implementation</strong> (modules and visual assets), <strong>testing</strong> (functional and non-functional checks) and <strong>documentation</strong> (report and presentation). The original planning diagram is reproduced below.'+cit('sc-card',4)+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/sdlc-gantt.webp','<strong>Figure 10.</strong> Original ALPRO Gantt chart showing the project planning, implementation, testing and documentation schedule.','Original development timeline from the December 2025 academic report.','sc-card-r-v1-gantt')+
        '<p>'+a(R.card+'/tree/main/versions/v1/code','Read the original Python implementation')+'</p>'},
      {key:'results',title:'4.0 Demonstration and validation',body:
        '<h3>4.1 Delivered application</h3>'+
        '<p>The submitted project demonstrates a working desktop Pygame game with player entry, bet configuration, card observation and shuffle, timed selection, result screens and JSON history. The original gameplay demonstration is reserved for the <strong>end of this report</strong>.'+cit('sc-card',3)+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-result.webp','<strong>Figure 11.</strong> V1 game-over screen summarizes the completed rounds and fictitious credits.','Original 2025 CardGame result dashboard','sc-card-r-v1-result')+
        '<h3>4.2 What the report evaluates</h3>'+
        '<p>The report sets out both functional and non-functional validation. It discusses player-input checks, allowed stakes, state transitions, round outcome consistency, JSON persistence and animation smoothness. It also identifies possible risks and mitigation strategies. It does not provide a numerical accuracy benchmark or a measured frame-rate distribution.</p>'+
        table(['Validation area','Expected behaviour'],[
          ['Player input','Reject empty or invalid nicknames and numeric input'],
          ['Stake control','Keep stakes inside allowed limits'],
          ['Round progression','Move through the correct observation, shuffle, selection and result phases'],
          ['Outcome and balance','Use a consistent result and fictitious credit update'],
          ['Local history','Preserve round information in JSON and handle file errors'],
          ['Rendering','Maintain a responsive animation and readable interface']
        ],'<strong>Table 2.</strong> Test areas described in the academic report; not a claim of a quantified automated test suite.')+
        '<p>The source report also includes a functional test matrix and a non-functional test table. These show what was verified or expected, without converting the course results into invented performance metrics.</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-functional-tests.webp','<strong>Figure 12.</strong> Functional test matrix from the original submission, covering gameplay and validation checks.','V1 academic functional tests table','sc-card-r-v1-functional-tests')+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-nonfunctional-tests.webp','<strong>Figure 13.</strong> Original non-functional testing table: responsiveness, usability, robustness and persistence.','V1 academic nonfunctional tests table','sc-card-r-v1-nonfunctional-tests')+
        '<h3>4.3 Academic presentation</h3>'+
        '<p>We prepared and presented our implementation for the ALPRO assessment on <strong>12 December 2025</strong>. The accompanying report explains requirements, UML, ER and sequence diagrams, the development timeline, design choices, test strategy and future improvements.'+cit('sc-card',2)+'</p>'},
      {key:'discussion',title:'5.0 Discussion and conclusion',body:
        '<h3>5.1 What the project demonstrates</h3>'+
        '<p>This project shows how fundamental algorithms and programming concepts can be assembled into a small but complete software application. Object-oriented classes organize responsibilities, an explicit state machine manages the round, Pygame supplies event-driven interaction, and JSON records local game data.</p>'+
        '<h3>5.2 Risks and limitations</h3>'+
        '<p>The original implementation is a local, single-player desktop application. The report highlights possible issues with invalid inputs, low-end hardware, corrupted JSON data and inconsistent shuffle transitions. The proposed safeguards include validation, defensive file handling, controlled animation complexity and clear separation between game states.</p>'+
        '<h3>5.3 Conclusion and perspectives</h3>'+
        '<p>Our ALPRO submission met its academic objective of producing and presenting a modular Python game with documented design and testing. The report identifies additional difficulty modes, multiplayer, language localization and mobile support as potential future improvements, not as completed deliverables.</p>'+
        '<h3>5.4 Original gameplay demonstration</h3>'+
        '<p>This is the recorded demonstration of the ALPRO game we built and presented in 2025. It is placed after the technical explanations, diagrams and test evidence so it can be viewed with the full project context.</p>'+
        fig(raw+'Python-CardGame/main/docs/cardgame_demo.gif','<strong>Figure 14.</strong> Animated demonstration of the original CardGame V1 interface and gameplay.','Original ALPRO CardGame V1 gameplay animation','sc-card-r-v1-demo')+
        '<p class="sc-demo-cta">'+a(R.card+'/blob/main/docs/cardgame_demo.gif','Open full gameplay demonstration')+'</p>'}
    ],
    figures:[
      {title:'Original V1 game menu',description:'Nickname, avatar and initial player setup, from the ALPRO report.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-menu.webp',kind:'figure',reportId:'sc-card-r-v1-menu'},
      {title:'V1 bet configuration dashboard',description:'Fictitious stake limits, balance, and turbo controls.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-bet-dashboard.webp',kind:'figure',reportId:'sc-card-r-v1-bet-dashboard'},
      {title:'V1 observation phase',description:'Red card revealed before animated movement.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-observation.webp',kind:'figure',reportId:'sc-card-r-v1-observation'},
      {title:'V1 shuffle phase',description:'Cards change positions during the timed round.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-shuffle.webp',kind:'figure',reportId:'sc-card-r-v1-shuffle'},
      {title:'V1 card selection',description:'The player chooses one position before the timer expires.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-selection.webp',kind:'figure',reportId:'sc-card-r-v1-selection'},
      {title:'Five-module architecture',description:'The original code structure and module responsibilities.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-module-overview.webp',kind:'figure',reportId:'sc-card-r-v1-module-overview'},
      {title:'UML class diagram',description:'Class responsibilities and inheritance/composition relationships.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-uml-classes.webp',kind:'figure',reportId:'sc-card-r-v1-uml-classes'},
      {title:'ER diagram',description:'Player and round record data relationships.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-er-player-round.webp',kind:'figure',reportId:'sc-card-r-v1-er-player-round'},
      {title:'Game-round sequence diagram',description:'Interaction ordering and game state transitions.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-sequence-round.webp',kind:'figure',reportId:'sc-card-r-v1-sequence-round'},
      {title:'ALPRO SDLC Gantt chart',description:'Original academic planning chart showing design, development, testing and report preparation.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/sdlc-gantt.webp',kind:'figure',reportId:'sc-card-r-v1-gantt'},
      {title:'V1 results screen',description:'Game-over screen with original summary statistics.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-result.webp',kind:'figure',reportId:'sc-card-r-v1-result'},
      {title:'Original functional test matrix',description:'Gameplay, validation and outcome checks from the academic report.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-functional-tests.webp',kind:'figure',reportId:'sc-card-r-v1-functional-tests'},
      {title:'Original non-functional test table',description:'Robustness, usability and responsiveness testing goals.',url:raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-nonfunctional-tests.webp',kind:'figure',reportId:'sc-card-r-v1-nonfunctional-tests'}
    ],
    metrics:[
      {key:'deliverables',title:'Academic deliverables',body:
        '<p>These are documented deliverables and design parameters, not performance benchmark measurements.'+cit('sc-card',2)+'</p>'+
        score([['Python modules','5'],['Original report','22 pages'],['Presentation','20 slides']])+
        '<p>'+a(R.card+'/tree/main/versions/v1','Inspect the academic submission')+'</p>'},
      {key:'specifications',title:'Game design parameters',body:
        '<p>The original report specifies the following gameplay structure and implementation constraints:</p>'+
        table(['Parameter','Original V1 design'],[
          ['Cards per round','3 (one red target, two black alternatives)'],
          ['Main timed phases','Observation, shuffle and selection, 10 seconds each'],
          ['Rendering objective','Smooth gameplay at 60 FPS (design target)'],
          ['Runtime','Python / Pygame desktop application'],
          ['Storage','Local JSON round history'],
          ['Execution mode','Single player, offline']
        ],'<strong>Table 3.</strong> Parameters and constraints in the submitted ALPRO report.')},
      {key:'validation',title:'Testing scope and evidence',body:
        '<p>The academic documentation addresses input validation, stake checks, state transitions, result integrity, JSON storage risks and responsive animation. It does not provide a measured FPS time series, unit-test count or accuracy percentage. The evidence is the original report, project demonstration and Python source.'+cit('sc-card',1)+cit('sc-card',2)+'</p>'+
        '<p>'+a(R.card+'/tree/main/versions/v1/code','Inspect the original Python source and implementation')+'</p>'}
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
