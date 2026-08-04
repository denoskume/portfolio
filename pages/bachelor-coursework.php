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

                        <h2>Year 1 Coursework</h2>

                        <div class="bachelor-year-placeholder">
                            <p>
                                First-year course details will be
                                added from the academic transcript.
                            </p>
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

                        <h2>Year 2 Coursework</h2>

                        <div class="bachelor-year-placeholder">
                            <p>
                                Second-year course details will be
                                added from the academic transcript.
                            </p>
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

                        <h2>Year 3 Coursework</h2>

                        <div class="bachelor-year-placeholder">
                            <p>
                                Third-year course details will be
                                added from the academic transcript.
                            </p>
                        </div>

                    </div>
                </div>

            </article>

            <!-- YEAR 4 -->
            <article class="coursework-panel reveal">

                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="bachelor-year-4"
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
                    id="bachelor-year-4"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>Final-Year Internship</h2>

                        <div class="bachelor-year-placeholder">
                            <p>
                                The fourth year was dedicated to the
                                final-year internship and professional
                                experience.
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
                            Computer Science and Electronics
                            Foundations
                        </h2>

                        <div class="coursework-skills-grid">

                            <article>
                                <span>01</span>

                                <h3>Programming</h3>

                                <p>
                                    Programming logic, algorithms,
                                    problem solving and software
                                    development foundations.
                                </p>
                            </article>

                            <article>
                                <span>02</span>

                                <h3>Computer Systems</h3>

                                <p>
                                    Computer architecture, operating
                                    systems and interaction between
                                    hardware and software.
                                </p>
                            </article>

                            <article>
                                <span>03</span>

                                <h3>Electronics</h3>

                                <p>
                                    Electronic components, circuits,
                                    digital systems and practical
                                    laboratory work.
                                </p>
                            </article>

                            <article>
                                <span>04</span>

                                <h3>Embedded Systems</h3>

                                <p>
                                    Microcontrollers, hardware
                                    interfacing and embedded computing
                                    principles.
                                </p>
                            </article>

                            <article>
                                <span>05</span>

                                <h3>Databases</h3>

                                <p>
                                    Relational databases, SQL,
                                    data organization and information
                                    management.
                                </p>
                            </article>

                            <article>
                                <span>06</span>

                                <h3>Technical Projects</h3>

                                <p>
                                    Project planning, implementation,
                                    testing, documentation and
                                    presentation.
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
        accordion.querySelectorAll(
            '.coursework-trigger'
        )
    );

    function closePanel(trigger) {
        const panelId = trigger.getAttribute(
            'aria-controls'
        );

        const panel = document.getElementById(panelId);

        const icon = trigger.querySelector(
            '.coursework-trigger-icon'
        );

        trigger.setAttribute(
            'aria-expanded',
            'false'
        );

        trigger.classList.remove('is-open');

        if (panel) {
            panel.hidden = true;
        }

        if (icon) {
            icon.textContent = '+';
        }
    }

    function openPanel(trigger) {
        const panelId = trigger.getAttribute(
            'aria-controls'
        );

        const panel = document.getElementById(panelId);

        const icon = trigger.querySelector(
            '.coursework-trigger-icon'
        );

        trigger.setAttribute(
            'aria-expanded',
            'true'
        );

        trigger.classList.add('is-open');

        if (panel) {
            panel.hidden = false;
        }

        if (icon) {
            icon.textContent = '×';
        }
    }

    triggers.forEach(function (trigger) {
        trigger.addEventListener(
            'click',
            function () {
                const isOpen =
                    trigger.getAttribute(
                        'aria-expanded'
                    ) === 'true';

                triggers.forEach(closePanel);

                if (!isOpen) {
                    openPanel(trigger);
                }
            }
        );
    });
});
</script>

<?php require BASE_PATH . '/includes/footer.php'; ?>
