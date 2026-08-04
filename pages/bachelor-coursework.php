<?php

$pageTitle = 'Bachelor Coursework';
$currentPage = 'education';

require BASE_PATH . '/includes/header.php';
?>

<section class="coursework-page">
    <div class="container coursework-container">

        <header class="coursework-header reveal">
            <a
                href="<?= page_url('education') ?>"
                class="coursework-back"
            >
                ← Back to Education
            </a>

            <h1>Bachelor's Coursework</h1>

            <p>
                Computer Science and Electronics
            </p>
        </header>

        <div
            class="coursework-accordion"
            data-coursework-accordion
        >

            <!-- YEAR 1 -->
            <article class="coursework-panel reveal">
                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="bachelor-year-1"
                >
                    <span>Year 1</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="bachelor-year-1"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>Year 1 — Semesters I &amp; II</h2>

                        <div class="coursework-table-wrapper">
                            <table class="coursework-table">
                                <thead>
                                    <tr>
                                        <th>Semester I Courses</th>
                                        <th>Credits</th>
                                        <th>Semester II Courses</th>
                                        <th>Credits</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Programming in C</td>
                                        <td>4</td>
                                        <td>Data Structures</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>Programming in C Practical</td>
                                        <td>2</td>
                                        <td>Data Structures Practical</td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Electronic Devices and Circuits
                                        </td>
                                        <td>4</td>
                                        <td>
                                            Analog and Digital Electronics
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Electronic Devices and Circuits
                                            Practical
                                        </td>
                                        <td>2</td>
                                        <td>
                                            Analog and Digital Electronics
                                            Practical
                                        </td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Matrices and Differential Calculus
                                        </td>
                                        <td>3</td>
                                        <td>Group Theory and Calculus</td>
                                        <td>3</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Data Analysis using Spreadsheet
                                        </td>
                                        <td>2</td>
                                        <td>Environmental Studies</td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>Functional Kannada</td>
                                        <td>3</td>
                                        <td>
                                            Listening and Comprehension in English
                                        </td>
                                        <td>3</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Musings in English Literature
                                        </td>
                                        <td>3</td>
                                        <td>
                                            Glimpses: Readings from English Literature
                                        </td>
                                        <td>3</td>
                                    </tr>

                                    <tr>
                                        <td>Yoga for Well-being</td>
                                        <td>1</td>
                                        <td>Sports I</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>Health and Wellness</td>
                                        <td>1</td>
                                        <td>Value Based I</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </article>

            <!-- YEAR 2 -->
            <article class="coursework-panel reveal">
                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="bachelor-year-2"
                >
                    <span>Year 2</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="bachelor-year-2"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>Year 2 — Semesters III &amp; IV</h2>

                        <div class="coursework-table-wrapper">
                            <table class="coursework-table">
                                <thead>
                                    <tr>
                                        <th>Semester III Courses</th>
                                        <th>Credits</th>
                                        <th>Semester IV Courses</th>
                                        <th>Credits</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>Programming in Java</td>
                                        <td>4</td>
                                        <td>Internet Technology</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>Programming in Java Practical</td>
                                        <td>2</td>
                                        <td>Internet Technology Practical</td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Digital Design using Verilog and VHDL
                                        </td>
                                        <td>4</td>
                                        <td>Communication Systems</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Digital Design using Verilog and VHDL
                                            Practical
                                        </td>
                                        <td>2</td>
                                        <td>Communication Systems Practical</td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Ordinary Differential Equations
                                        </td>
                                        <td>3</td>
                                        <td>India and Indian Constitution</td>
                                        <td>3</td>
                                    </tr>

                                    <tr>
                                        <td>Artificial Intelligence</td>
                                        <td>2</td>
                                        <td>
                                            Financial Education and Investment
                                            Awareness
                                        </td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>Essential English Reading</td>
                                        <td>3</td>
                                        <td>
                                            Fundamentals of English Written
                                            Communication
                                        </td>
                                        <td>3</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Symphony of English Literature
                                        </td>
                                        <td>3</td>
                                        <td>
                                            Ruminations of English Literature
                                        </td>
                                        <td>3</td>
                                    </tr>

                                    <tr>
                                        <td>Sports II</td>
                                        <td>1</td>
                                        <td>Sports III</td>
                                        <td>1</td>
                                    </tr>

                                    <tr>
                                        <td>Value Based II</td>
                                        <td>1</td>
                                        <td>Value Based III</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </article>

            <!-- YEAR 3 -->
            <article class="coursework-panel reveal">
                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="bachelor-year-3"
                >
                    <span>Year 3</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="bachelor-year-3"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>Year 3 — Semesters V &amp; VI</h2>

                        <div class="coursework-table-wrapper">
                            <table class="coursework-table">
                                <thead>
                                    <tr>
                                        <th>Semester V Courses</th>
                                        <th>Credits</th>
                                        <th>Semester VI Courses</th>
                                        <th>Credits</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            Operating System Concepts and Linux
                                        </td>
                                        <td>4</td>
                                        <td>Software Engineering</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Operating System Concepts and Linux
                                            Practical
                                        </td>
                                        <td>2</td>
                                        <td>Software Engineering Practical</td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>Database Management System</td>
                                        <td>4</td>
                                        <td>Web Programming using PHP</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Database Management System Practical
                                        </td>
                                        <td>2</td>
                                        <td>
                                            Web Programming using PHP Practical
                                        </td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>Advanced Communication Systems</td>
                                        <td>4</td>
                                        <td>Instrumentation Systems</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Advanced Communication Systems
                                            Practical
                                        </td>
                                        <td>2</td>
                                        <td>Instrumentation Systems Practical</td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Microcontroller 8051 and Peripheral
                                            Interfacing
                                        </td>
                                        <td>4</td>
                                        <td>Internet of Things, AI and ML</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Microcontroller 8051 and Peripheral
                                            Interfacing Practical
                                        </td>
                                        <td>2</td>
                                        <td>
                                            Internet of Things, AI and ML Practical
                                        </td>
                                        <td>2</td>
                                    </tr>

                                    <tr>
                                        <td>Cyber Security</td>
                                        <td>2</td>
                                        <td>Internship</td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </article>

            <!-- INTERNSHIP -->
            <article class="coursework-panel reveal">
                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="bachelor-internship"
                >
                    <span>Internship</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="bachelor-internship"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>Final-Year Internship</h2>

                        <div class="bachelor-year-placeholder">
                            <p>
                                The programme included a credited internship
                                during Semester VI, focused on applying
                                technical knowledge in a professional setting.
                            </p>
                        </div>

                    </div>
                </div>
            </article>

            <!-- SKILLS DEVELOPED -->
            <article class="coursework-panel reveal">
                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="bachelor-skills"
                >
                    <span>Skills Developed</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="bachelor-skills"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>
                            Computer Science and Electronics Foundations
                        </h2>

                        <div class="coursework-skills-grid">

                            <article>
                                <span>01</span>
                                <h3>Programming</h3>
                                <p>
                                    C, Java, PHP, programming logic,
                                    algorithms and software development.
                                </p>
                            </article>

                            <article>
                                <span>02</span>
                                <h3>Data Structures</h3>
                                <p>
                                    Data organization, algorithmic thinking
                                    and structured problem solving.
                                </p>
                            </article>

                            <article>
                                <span>03</span>
                                <h3>Databases</h3>
                                <p>
                                    Database design, relational systems,
                                    SQL and data management.
                                </p>
                            </article>

                            <article>
                                <span>04</span>
                                <h3>Operating Systems</h3>
                                <p>
                                    Linux, operating-system concepts and
                                    hardware-software interaction.
                                </p>
                            </article>

                            <article>
                                <span>05</span>
                                <h3>Electronics</h3>
                                <p>
                                    Analog electronics, digital electronics,
                                    circuits and laboratory practice.
                                </p>
                            </article>

                            <article>
                                <span>06</span>
                                <h3>Digital Design</h3>
                                <p>
                                    Verilog, VHDL, digital systems and
                                    hardware-oriented design.
                                </p>
                            </article>

                            <article>
                                <span>07</span>
                                <h3>Embedded Systems</h3>
                                <p>
                                    8051 microcontrollers, peripheral
                                    interfacing and embedded computing.
                                </p>
                            </article>

                            <article>
                                <span>08</span>
                                <h3>Communication Systems</h3>
                                <p>
                                    Analog, digital and advanced
                                    communication-system foundations.
                                </p>
                            </article>

                            <article>
                                <span>09</span>
                                <h3>AI and IoT</h3>
                                <p>
                                    Artificial intelligence, machine-learning
                                    fundamentals and Internet of Things.
                                </p>
                            </article>

                            <article>
                                <span>10</span>
                                <h3>Software Engineering</h3>
                                <p>
                                    Software lifecycle, implementation,
                                    testing and technical documentation.
                                </p>
                            </article>

                            <article>
                                <span>11</span>
                                <h3>Cyber Security</h3>
                                <p>
                                    Core security concepts and awareness
                                    of digital risks.
                                </p>
                            </article>

                            <article>
                                <span>12</span>
                                <h3>Technical Practice</h3>
                                <p>
                                    Laboratory work, practical implementation,
                                    project delivery and internship experience.
                                </p>
                            </article>

                        </div>

                    </div>
                </div>
            </article>

        </div>

    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const accordion = document.querySelector(
        '[data-coursework-accordion]'
    );

    if (!accordion) {
        return;
    }

    const triggers = Array.from(
        accordion.querySelectorAll('.coursework-trigger')
    );

    function closePanel(trigger) {
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const icon = trigger.querySelector(
            '.coursework-trigger-icon'
        );

        trigger.setAttribute('aria-expanded', 'false');
        trigger.classList.remove('is-open');

        if (panel) {
            panel.hidden = true;
        }

        if (icon) {
            icon.textContent = '+';
        }
    }

    function openPanel(trigger) {
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        const icon = trigger.querySelector(
            '.coursework-trigger-icon'
        );

        trigger.setAttribute('aria-expanded', 'true');
        trigger.classList.add('is-open');

        if (panel) {
            panel.hidden = false;
        }

        if (icon) {
            icon.textContent = '×';
        }
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            const isOpen =
                trigger.getAttribute('aria-expanded') === 'true';

            triggers.forEach(closePanel);

            if (!isOpen) {
                openPanel(trigger);
            }
        });
    });
});
</script>

<?php require BASE_PATH . '/includes/footer.php'; ?>
