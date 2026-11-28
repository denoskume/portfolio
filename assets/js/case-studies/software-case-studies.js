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
  const collaboratorLink = (url,name) => '<a class="collaborator-link" href="'+e(url)+'" target="_blank" rel="noopener noreferrer" aria-label="'+e(name)+' on LinkedIn">'+e(name)+'</a>';
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
    subtitle:'A Streamlit application for recognizing national flags and exploring country information.',
    authors:'Computer vision · Streamlit application',
    repository:R.flag,notebook:R.flag+'/blob/main/src/flag_recognition/flag_first_app.py',
    pdf:'flag-intelligence-case-study.pdf',downloadName:'Flag-Intelligence-Report.pdf',
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
      'Flag Intelligence is a Streamlit application that recognizes flags from uploads, camera pictures or examples and displays country facts. It combines visual reference matching with a <strong>250-class MobileNetV3-Small</strong> fallback. Similar-looking flags can be confirmed manually.',
      'The documented human-reviewed real-world challenge for the original classifier yielded <strong>19.61% Top-1</strong> and <strong>27.45% Top-5</strong> accuracy. The later reference-matching route was introduced for clean and recognizable flags; the available evaluation evidence does not include a new independent photo benchmark for the combined pipeline.'
    ],
    references:[
      {label:'PyTorch. MobileNet V3 Small model architecture. Torchvision documentation.',url:'https://docs.pytorch.org/vision/master/models/generated/torchvision.models.mobilenet_v3_small.html',linkLabel:'Model documentation'},
      {label:'World Bank. Indicators API documentation and annual population indicator SP.POP.TOTL.',url:'https://datahelpdesk.worldbank.org/knowledgebase/articles/889392',linkLabel:'World Bank API'},
      {label:'mledoze/countries. Countries, capitals, geographic attributes and country codes. Open data project.',url:'https://github.com/mledoze/countries',linkLabel:'Country reference'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Introduction',body:
        '<h3>1.1 From a flag picture to a country</h3>'+
        '<p>Recognizing a flag is not always as simple as looking for its colours. Several countries use almost identical patterns, and a photo can contain folds, shadows or only part of the flag. We built Flag Intelligence to make this recognition process accessible through a web interface and to connect the identified country with useful facts.'+'</p>'+
        '<p>The aim was to combine an image-recognition pipeline with clear user feedback. Instead of presenting an uncertain guess as a definitive answer, the application can show candidate countries and allow the user to confirm a visually ambiguous flag.</p>'},
      {key:'dataset',title:'2.0 Inputs and objectives',body:
        '<h3>2.1 What the application works with</h3>'+
        '<p>The user can upload an image, take a camera picture or choose a sample. The recognition system supports <strong>250 classes</strong> covering ISO-coded entities plus Kosovo. The project also combines real-world flag photos with canonical designs and controlled presentation variants during dataset preparation.'+'</p>'+
        facts([['250','Flag classes'],['3','Input options'],['Top-5','Candidate ranking']])+
        '<h3>2.2 What a successful result should provide</h3>'+
        bullets(['Recognize the flag where the visual evidence is sufficiently distinctive.',
          'Allow confirmation when several flags share closely related designs.',
          'Show the country name, capital and area together with its latest available annual population observation.',
          'Include the population source and reference year in the visible fact sheet and JSON export.'])},
      {key:'method',title:'3.0 Methodology',body:
        steps(['Validate image','Compare flags','Use CNN fallback','Show country facts'])+
        '<h3>3.1 Recognition in two stages</h3>'+
        '<p>After checking image size and format, the application first looks for recognizable flag patterns and compares the input with reference flags. This is particularly useful for clean, centred designs. If reference matching cannot confidently distinguish the flag, the application uses the MobileNetV3-Small classifier to rank candidate countries.'+cit('sc-flag',1)+'</p>'+
        '<p>For instance, Côte d’Ivoire and Ireland have similar vertical tricolours with reversed outer colours. The final interaction allows a human to resolve an uncertain case rather than hiding the ambiguity.</p>'+
        fig(R.assets+'flag-intelligence-workflow.svg','<strong>Figure 1.</strong> Recognition and country-fact workflow, based on the application code.','Flag recognition pipeline with validation, reference matching, CNN and country facts.','sc-flag-r-fig1')+
        '<h3>3.2 Country facts and their sources</h3>'+
        '<p>After country confirmation, the application retrieves its static geographic information from a bundled country reference and seeks the latest available <strong>annual</strong> population observation from the World Bank indicator API. The year and data source accompany that population value, so it can be interpreted correctly.'+cit('sc-flag',2)+cit('sc-flag',3)+'</p>'},
      {key:'results',title:'4.0 Evaluation and implementation results',body:
        '<h3>4.1 What the real-world benchmark measured</h3>'+
        '<p>The human-reviewed real-world challenge for the original image classifier reported <strong>19.61% Top-1</strong> and <strong>27.45% Top-5</strong> accuracy. Top-1 counts first-choice correct predictions; Top-5 counts the cases where the correct country appears within the five suggested classes.'+'</p>'+
        '<p>These figures help explain the later design choice: clean reference matching and a manual confirmation step can make the application more usable when the model encounters closely related flag designs. A directly comparable accuracy score for the combined workflow is not established by the available evaluations.</p>'+
        '<h3>4.2 What the implemented product delivers</h3>'+
        '<p>The current recognition-first interface supports image upload, camera input, examples, candidate correction and country information. The JSON export includes provenance fields such as population reference year, source and retrieval timestamp. Tests cover ambiguous tricolours, the country-fact fallback and the main application flow.'+'</p>'},
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
        '<p>The human-reviewed real-world challenge was conducted for the original classifier. The accuracy values describe that evaluation and provide a baseline for future combined-pipeline tests.'+'</p>'+
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
    subtitle:'Applying object-oriented programming in Python to design and implement an event-driven card game.',
    authors:'Master 1 (S1) project · Centrale Nantes',
    collaborator:'Sena FUKABE',
    collaboratorLinkedIn:'https://www.linkedin.com/in/sena-fukabe-86aa2a309/',
    repository:R.card+'/tree/main/versions/v1',
    notebook:R.card+'/blob/main/versions/v1/code/main.py',
    pdf:'python-cardgame-case-study.pdf',downloadName:'CardGame-V1-ALPRO-Report.pdf',
    keywords:['Python','Pygame','Object-Oriented Programming','State Machine','UML','JSON Persistence','Software Design'],
    projectInfo:[
      ['Academic setting','Master 1 · Semester 1 · Centrale Nantes · Academic year 2025–2026'],
      ['Course','Algorithmics and Programming (ALPRO), Python'],
      ['Collaborator',collaboratorLink('https://www.linkedin.com/in/sena-fukabe-86aa2a309/','Sena FUKABE')],
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
      'Rouge Gagne, Noir Perd is a three-card memory game developed in <strong>Python and Pygame</strong> by Denos KUME and '+collaboratorLink('https://www.linkedin.com/in/sena-fukabe-86aa2a309/','Sena FUKABE')+' for the Master 1 (S1) <strong>Algorithmics and Programming (ALPRO)</strong> course at Centrale Nantes. The project provided a practical application of object-oriented programming, modular design and event-driven logic, using player interactions, card animations, timed rounds and game-state transitions.',
      'We implemented an event-driven desktop application using five Python modules to separate player and stake management, game-state transitions and interface rendering. The game provides player profiles, fictitious stakes and balances, observation and shuffle phases, timed card selection, result screens and local JSON history. The working application was documented with UML and sequence diagrams and a testing plan, then presented as part of the ALPRO assessment on <strong>12 December 2025</strong>. The project demonstrates how modular and object-oriented programming can support a complete interactive application.'
    ],
    references:[
      {label:'Python Software Foundation. Python documentation.',url:'https://docs.python.org/3/',linkLabel:'Python documentation'},
      {label:'Pygame Community. Pygame event reference.',url:'https://www.pygame.org/docs/ref/event.html',linkLabel:'Pygame events'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Context and objectives',body:
        '<h3>1.1 Master 1 ALPRO assessment</h3>'+
        '<p><strong>Rouge Gagne, Noir Perd</strong> was our Master 1 Semester 1 programming project at Centrale Nantes. We developed it together, <strong>Denos KUME and '+collaboratorLink('https://www.linkedin.com/in/sena-fukabe-86aa2a309/','Sena FUKABE')+'</strong>, as part of the <strong>Algorithmics and Programming (ALPRO)</strong> course taught by Mira Rizkallah. The submitted work included a functional Python game, a 22-page project report and a 20-slide presentation dated 12 December 2025.'+'</p>'+
        '<h3>1.2 The problem</h3>'+
        '<p>A player has to identify the red card among three, watch the cards move, and select the correct position. A simple-looking game requires reliable coordination between timing, animations, user input, fictitious stakes, card identity and saved results.</p>'+
        '<h3>1.3 Our objectives</h3>'+
        bullets([
          'Build a complete interactive game using Python and Pygame.',
          'Apply object-oriented programming, modular design and clear state transitions.',
          'Document requirements, architecture, test strategy and development stages.',
          'Present the implemented project and explain the technical decisions made.'
        ])+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-menu.webp','<strong>Figure 1.</strong> The original V1 menu collects a nickname and avatar before the first round.','Original 2025 CardGame player menu','sc-card-r-v1-menu')},
      {key:'dataset',title:'2.0 Requirements and game rules',body:
        '<h3>2.1 Gameplay: one complete round</h3>'+
        steps(['Create player profile','Configure stake','Observe cards','Track shuffle','Select card','Display result'])+
        '<p>The interface collects a nickname and avatar, lets the player configure a stake using fictitious credits, and displays one red and two black cards. During the round, the player observes the cards, follows the shuffle and selects a position before the countdown ends. The outcome updates the balance and is recorded in local history.'+'</p>'+
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
        '<p>The program separates domain logic from screen rendering. This makes each responsibility easier to understand and gives the project a structure that can be discussed and tested.'+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-module-overview.webp','<strong>Figure 6.</strong> The five Python modules and their connections in the project architecture.','Original ALPRO module architecture diagram','sc-card-r-v1-module-overview')+
        '<h3>3.2 Object-oriented model</h3>'+
        '<p>The report describes a <strong>User</strong> class for player data, a <strong>Bet</strong> class for stakes, a <strong>Card</strong> class for visual representation and position, and a <strong>CardGame</strong> controller that composes these objects. The UML diagram explains how the classes work together, while the ER diagram documents how player and round records relate.'+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-uml-classes.webp','<strong>Figure 7.</strong> UML class diagram showing the relationships between the game controller, domain objects and interface.','Original ALPRO UML class architecture','sc-card-r-v1-uml-classes')+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-er-player-round.webp','<strong>Figure 8.</strong> Entity–relationship diagram describing player data and stored round records.','Original ALPRO player and round ER diagram','sc-card-r-v1-er-player-round')+
        '<h3>3.3 State-driven event handling</h3>'+
        '<p>The game moves through a series of explicit states for player setup, betting, card display, shuffle, selection and result. The Pygame loop collects events, updates the active state and redraws the screen. This structure is important because a selection should only be accepted in the correct phase and the chosen card must match its position after the shuffle.</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-sequence-round.webp','<strong>Figure 9.</strong> The sequence diagram follows the interaction between player, game controller and stored results during a round.','Original V1 game round sequence diagram','sc-card-r-v1-sequence-round')+
        '<h3>3.4 Software development lifecycle</h3>'+
        '<p>We documented the project in four stages: <strong>design</strong> (requirements and diagrams), <strong>implementation</strong> (modules and visual assets), <strong>testing</strong> (functional and non-functional checks) and <strong>documentation</strong> (report and presentation). The original planning diagram is reproduced below.'+'</p>'+
        fig(raw+'Python-CardGame/main/versions/v1/docs/figures/sdlc-gantt.webp','<strong>Figure 10.</strong> Original ALPRO Gantt chart showing the project planning, implementation, testing and documentation schedule.','Original development timeline from the December 2025 academic report.','sc-card-r-v1-gantt')+
        '<p>'+a(R.card+'/tree/main/versions/v1/code','Read the original Python implementation')+'</p>'},
      {key:'results',title:'4.0 Demonstration and validation',body:
        '<h3>4.1 Delivered application</h3>'+
        '<p>The submitted project demonstrates a working desktop Pygame game with player entry, bet configuration, card observation and shuffle, timed selection, result screens and JSON history. The original gameplay demonstration is reserved for the <strong>end of this report</strong>.'+'</p>'+
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
        '<p>We prepared and presented our implementation for the ALPRO assessment on <strong>12 December 2025</strong>. The accompanying report explains requirements, UML, ER and sequence diagrams, the development timeline, design choices, test strategy and future improvements.'+'</p>'},
      {key:'discussion',title:'5.0 Discussion and conclusion',body:
        '<h3>5.1 What the project demonstrates</h3>'+
        '<p>This project shows how fundamental algorithms and programming concepts can be assembled into a small but complete software application. Object-oriented classes organize responsibilities, an explicit state machine manages the round, Pygame supplies event-driven interaction, and JSON records local game data.</p>'+
        '<h3>5.2 Risks and limitations</h3>'+
        '<p>The original implementation is a local, single-player desktop application. The report highlights possible issues with invalid inputs, low-end hardware, corrupted JSON data and inconsistent shuffle transitions. The proposed safeguards include validation, defensive file handling, controlled animation complexity and clear separation between game states.</p>'+
        '<h3>5.3 Conclusion and perspectives</h3>'+
        '<p>Our ALPRO submission met its academic objective of producing and presenting a modular Python game with documented design and testing. The report identifies additional difficulty modes, multiplayer, language localization and mobile support as potential future improvements, not as completed deliverables.</p>'+
        '<h3>5.4 Original gameplay demonstration</h3>'+
        '<p>This is the recorded demonstration of the ALPRO game we built and presented in 2025. It is placed after the technical explanations, diagrams and test evidence so it can be viewed with the full project context.</p>'+
        '<figure class="fl-scientific-video sc-card-video">'+
        '<video controls playsinline preload="metadata" poster="'+raw+'Python-CardGame/main/versions/v1/docs/figures/alpro-v1-observation.webp" aria-label="Original CardGame V1 presentation gameplay recording">'+
        '<source src="'+raw+'Python-CardGame/main/versions/v1/assets/v1-presentation-demo.mp4" type="video/mp4">'+
        'Your browser does not support HTML5 video. </video>'+
        '<figcaption>Original CardGame V1 presentation recording · December 2025</figcaption></figure>'+
        '<p class="sc-demo-cta">'+a(R.card+'/blob/main/versions/v1/assets/v1-presentation-demo.mp4','Open the original V1 demonstration')+'</p>'}
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
        '<p>These are documented deliverables and design parameters, not performance benchmark measurements.'+'</p>'+
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
        '<p>The academic documentation addresses input validation, stake checks, state transitions, result integrity, JSON storage risks and responsive animation. It does not provide a measured FPS time series, unit-test count or accuracy percentage. The evidence is the original report, project demonstration and Python source.'+'</p>'+
        '<p>'+a(R.card+'/tree/main/versions/v1/code','Inspect the original Python source and implementation')+'</p>'}
    ]
  };

  const monstage = {
    slug:'monstage',prefix:'sc-stage',title:'MonStage',
    subtitle:'A private workspace for finding internships, preparing applications and tracking their progress.',
    authors:'Web application · React · TypeScript · Cloudflare Worker',
    repository:R.stage,notebook:R.stage+'/blob/main/src/app/routes.tsx',
    pdf:'monstage-case-study.pdf',downloadName:'MonStage-Report.pdf',
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
      'MonStage is an internship intelligence and application workspace built with React, TypeScript and a private Google Sheets data source. It brings offer discovery, candidate fit, application dossiers, CV and letter preparation, follow-ups and outcomes into one responsive product.',
      'Access is restricted using Google Sign-In and a Cloudflare Worker authorization gateway. The public case study illustrates the implemented interface with screenshots of offer discovery, campaign analytics and the integrated document studio. The underlying application remains access-restricted.'
    ],
    references:[
      {label:'React. Official documentation for building component-based web interfaces.',url:'https://react.dev/learn',linkLabel:'React documentation'},
      {label:'Vite. Official frontend build and development guide.',url:'https://vite.dev/guide/',linkLabel:'Vite guide'},
      {label:'Cloudflare. Workers documentation for request handling.',url:'https://developers.cloudflare.com/workers/',linkLabel:'Cloudflare Workers'},
      {label:'Google. Apps Script documentation for Sheets integrations.',url:'https://developers.google.com/apps-script',linkLabel:'Google Apps Script'}
    ],
    reportSections:[
      {key:'intro',title:'1.0 Introduction',body:
        '<h3>1.1 The problem of scattered applications</h3>'+
        '<p>An internship search involves more than saving vacancy links. Each opportunity has different skill requirements, application documents, deadlines and follow-up actions. Managing those details across many pages and files makes it difficult to see what needs attention next.</p>'+
        '<p>MonStage was created as one workspace where a candidate can move from discovering a role to preparing and tracking the application. The goal was to keep the process organized without losing the history attached to a particular offer.'+'</p>'},
      {key:'dataset',title:'2.0 Product requirements',body:
        '<h3>2.1 Information handled by the product</h3>'+
        '<p>Each offer has an employer, job title, location, source, link, relevance information, dates and a status. An application dossier can also contain tailored documents and preparation notes. Aggregated data feeds search, prioritization and outcome indicators.</p>'+
        '<h3>2.2 What the product needed to deliver</h3>'+
        bullets(['Search and filter opportunities, and identify priority roles.',
          'Prepare documents and actions for the selected opportunity.',
          'Maintain status history and follow-ups without confusing different jobs at the same company.',
          'Display progress and application outcomes in a compact dashboard.',
          'Protect the private data source and work across desktop and mobile screens.'])+
        '<p>The interface is intended for an authorized user. The screenshots illustrate the product as captured on 24 November 2026.</p>'},
      {key:'method',title:'3.0 Architecture and implementation',body:
        steps(['Discover offers','Evaluate fit','Prepare dossier','Track outcomes'])+
        '<h3>3.1 From the private dataset to the interface</h3>'+
        '<p>A React/TypeScript frontend provides the interface. The offer data is held in a private Google Sheet and read through an Apps Script service. Between the browser and that service sits a Cloudflare Worker: it verifies the Google ID token, applies an account allowlist and forwards permitted requests. The browser does not query the private spreadsheet directly.'+'</p>'+
        fig(R.assets+'monstage-workflow.svg','<strong>Figure 1.</strong> Candidate workflow from discovery to application follow-up, based on the product architecture.','Four steps of the MonStage internship application workflow.','sc-stage-r-fig1')+
        '<h3>3.2 One dossier per opportunity</h3>'+
        '<p>After finding an offer, the user can examine its requirements, move it into an application status, and prepare an offer-specific CV, letter and interview notes. Maintaining distinct dossiers matters because one company may have several unrelated roles.'+'</p>'+
        '<h3>3.3 Dashboard and privacy</h3>'+
        '<p>The dashboard summarizes the pipeline and outcomes so the next action is easier to choose. The dashboard combines campaign indicators, a timeline, a status distribution and a geographic view. Access to the underlying records remains restricted.'+'</p>'},
      {key:'results',title:'4.0 Delivered features and verification',body:
        '<h3>4.1 Application flow</h3>'+
        '<p>The implementation includes search, sorting, multi-criteria filtering, candidate fit, a shortlist, application dossiers and tracking views. Each offer can be reviewed with its own status and supporting documents, while the dashboard gives a view of progress and outcomes.'+'</p>'+
        fig(raw+'portfolio/main/assets/monstage/Home.png','<strong>Figure 2.</strong> Offers interface: search, filtering, candidate-fit score and application actions alongside the selected vacancy.','MonStage offers interface with a selected image-processing opportunity.','sc-stage-r-fig2')+
        '<h3>4.2 Campaign dashboard</h3>'+
        '<p>The dashboard brings together opportunity counts, submitted applications, recruiter responses and interviews. The timeline shows campaign activity, while the status donut summarizes the current distribution of dossiers. The geographic panel provides a map view. The figures are a snapshot of the campaign, not a measure of software performance.</p>'+
        fig(raw+'portfolio/main/assets/monstage/Dashboard%20.png','<strong>Figure 3.</strong> Campaign dashboard captured on 24 November 2026, showing indicators, timeline, status distribution and map.','MonStage dashboard with campaign KPIs and charts.','sc-stage-r-fig3')+
        '<h3>4.3 Integrated document studio</h3>'+
        '<p>The Studio includes a built-in CV editor with document creation and DOCX import, formatting controls, editable Harvard-style sections, version management and download controls. This keeps application preparation within the same workspace instead of requiring a separate document editor.</p>'+
        fig(raw+'portfolio/main/assets/monstage/built_in-Studio.png','<strong>Figure 4.</strong> Integrated CV Studio with formatting ribbon, document management and Harvard template controls.','MonStage integrated CV editor.','sc-stage-r-fig4')+
        '<h3>4.4 Testing and responsive behaviour</h3>'+
        '<p>The repository includes unit tests, authentication and Worker tests, TypeScript builds, and Playwright end-to-end checks. Responsive tests include narrow mobile widths down to <strong>360 pixels</strong> and verify that the interface remains navigable without horizontal overflow.'+'</p>'+
        '<p>This case study reports product capabilities and verified test coverage rather than treating campaign counts as software performance metrics.</p>'},
      {key:'discussion',title:'5.0 Discussion and next steps',body:
        '<h3>5.1 What was learned</h3>'+
        '<p>MonStage connects interface design, data modelling, authenticated API access and candidate workflow. The work shows how a multi-step personal process can become a coherent product when the offer, its documents and its status are kept together.</p>'+
        '<h3>5.2 Further improvements</h3>'+
        '<p>Additional work can focus on workflow reliability, accessible editing and clearer historical analytics. Those improvements build on the existing architecture and should keep the same private-data protections.</p>'}
    ],
    figures:[
      {title:'Application workflow',description:'Product process, from offer discovery through follow-up.',url:R.assets+'monstage-workflow.svg',kind:'figure',reportId:'sc-stage-r-fig1'},
      {title:'Offers interface',description:'Search, filters, vacancy details and candidate fit.',url:raw+'portfolio/main/assets/monstage/Home.png',kind:'figure',reportId:'sc-stage-r-fig2'},
      {title:'Campaign dashboard',description:'Campaign indicators, timeline, status distribution and map.',url:raw+'portfolio/main/assets/monstage/Dashboard%20.png',kind:'figure',reportId:'sc-stage-r-fig3'},
      {title:'Integrated CV Studio',description:'Document editing, formatting and version controls.',url:raw+'portfolio/main/assets/monstage/built_in-Studio.png',kind:'figure',reportId:'sc-stage-r-fig4'}
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
        '<p>Verification spans the frontend, protected data gateway and responsive layouts.'+'</p>'+
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

  const circuit = raw+'portfolio/main/assets/portfolio-images/traffic-light.jpg';
  const traffic = {
    slug:'traffic-light-simulation', prefix:'sc-traffic', title:'Traffic Light Simulation',
    subtitle:'Coordinating vehicle and pedestrian signals with a visible countdown.',
    authors:'Bachelor’s project · Computer Science and Electronics · Kristu Jayanti College',
    notebook:circuit, sourceLabel:'Original circuit diagram', repository:host+'portfolio/tree/main/assets/portfolio-images',
    pdf:'traffic-light-simulation-case-study.pdf', downloadName:'Traffic-Light-Simulation-Report.pdf',
    keywords:['Embedded systems','Microcontroller','Traffic signals','Seven-segment displays'],
    summary:['I simulated a pedestrian crossing with separate red and green signals for vehicles and pedestrians. The microcontroller drives both signal groups and two countdown displays. The diagram captures one phase of the crossing cycle.'],
    projectInfo:[['Project type','Bachelor’s electronics project'],['Controller','8051-family microcontroller'],['Outputs','Two signal pairs and two seven-segment displays']],
    glossary:[['LED','Light-emitting diode, used here as a signal lamp.'],['Seven-segment display','Seven individually controlled segments form a digit.']],
    reportSections:[
      {key:'intro',title:'1.0 Introduction',body:'<p>A pedestrian crossing gives drivers and pedestrians different instructions at the same moment. This circuit models each instruction with a red and a green lamp.</p>'},
      {key:'objective',title:'2.0 Objective',body:'<p>Coordinate the two signal groups and display a countdown alongside the light sequence.</p>'},
      {key:'method',title:'3.0 Circuit design',body:'<p>Follow the connections from the microcontroller on the left to the two pairs of lights on the right. Separate groups of output lines drive the segments of the upper and lower displays.</p>'},
      {key:'results',title:'4.0 Reading the simulation',body:fig(circuit,'<strong>Figure 1.</strong> The vehicle signal is green while the crossing signal is red. The upper display reads 8.','Traffic light simulation schematic','sc-traffic-r-circuit')+
        '<p>The labels “traffic” and “cross” identify the two signal groups. In this frame vehicles can proceed while pedestrians wait.</p>'}
    ],
    references:[{label:'Original Bachelor’s project circuit diagram.',url:circuit,linkLabel:'Open schematic'}],
    figures:[{title:'Traffic and pedestrian signal circuit',description:'The original simulation frame shows the controller, signal outputs and countdown displays.',url:circuit,kind:'figure',reportId:'sc-traffic-r-circuit'}],
    metricsIntro:'Component counts read directly from the circuit diagram.',
    metrics:[{key:'components',title:'Circuit components',body:table(['Component','Count'],[['Microcontroller','1'],['Signal LEDs','4'],['Seven-segment displays','2']],'<strong>Table 1.</strong> Components visible in Figure 1.')}]
  };

  const studies={4:flag,5:card,6:monstage,7:traffic};
  if(typeof window.registerScientificCaseStudies!=='function'){
    throw new Error('Load scientific-case-studies.js before software-case-studies.js');
  }
  window.registerScientificCaseStudies(studies);
})();
