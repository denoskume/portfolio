<?php

$pageTitle = 'Master Coursework';
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

            <h1>Master's Coursework</h1>

            <p>
                MSc in Data Science, Signal and Image Processing
            </p>
        </header>

        <div
            class="coursework-accordion"
            data-coursework-accordion
        >

            <!-- M1 YEAR -->
            <article class="coursework-panel reveal">

                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="coursework-m1"
                >
                    <span>M1 Year</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="coursework-m1"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>M1 Year 2025/26</h2>

                        <div class="coursework-table-wrapper">
                            <table class="coursework-table">
                                <thead>
                                    <tr>
                                        <th>Autumn Semester Courses</th>
                                        <th>ECTS</th>
                                        <th>Spring Semester Courses</th>
                                        <th>ECTS</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            Algorithmics and Programming
                                        </td>
                                        <td>4</td>
                                        <td>Computer Vision</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>Artificial Intelligence</td>
                                        <td>6</td>
                                        <td>Image Processing</td>
                                        <td>5</td>
                                    </tr>

                                    <tr>
                                        <td>Classical Linear Control</td>
                                        <td>5</td>
                                        <td>Optimization Techniques</td>
                                        <td>5</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Mathematical Tools for
                                            Signals and Systems
                                        </td>
                                        <td>4</td>
                                        <td>
                                            Systems Identification
                                            and Signal Filtering
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>Embedded Computing</td>
                                        <td>4</td>
                                        <td>
                                            Spectral and
                                            Time-Frequency Analysis
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>Signal Processing</td>
                                        <td>5</td>
                                        <td>Group Project</td>
                                        <td>6</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Cultural and
                                            Communication English
                                        </td>
                                        <td>2</td>
                                        <td>
                                            Cultural and
                                            Communication English
                                        </td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </article>

            <!-- M2 YEAR -->
            <article class="coursework-panel reveal">

                <button
                    class="coursework-trigger"
                    type="button"
                    aria-expanded="false"
                    aria-controls="coursework-m2"
                >
                    <span>M2 Year</span>

                    <span
                        class="coursework-trigger-icon"
                        aria-hidden="true"
                    >
                        +
                    </span>
                </button>

                <div
                    id="coursework-m2"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>M2 Year 2026/27</h2>

                        <div class="coursework-table-wrapper">
                            <table class="coursework-table">
                                <thead>
                                    <tr>
                                        <th>Autumn Semester Courses</th>
                                        <th>ECTS</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            Biomedical Signals,
                                            Images and Methods
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Design of Signal and
                                            Image Representations
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Machine Learning,
                                            Data Analysis and
                                            Information Retrieval
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Mathematical Tools for
                                            Signal and Image Processing
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Signal and Image Restoration,
                                            Inversion Methods
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>Stochastic Methods</td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Advanced Research Project
                                        </td>
                                        <td>4</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            Cultural and
                                            Communication English
                                        </td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
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
                    aria-controls="coursework-skills"
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
                    id="coursework-skills"
                    class="coursework-panel-content"
                    hidden
                >
                    <div class="coursework-panel-inner">

                        <h2>
                            Technical and Engineering Foundations
                        </h2>

                        <div class="coursework-skills-grid">

                            <article>
                                <span>01</span>
                                <h3>Machine Learning</h3>
                                <p>
                                    Classification, model evaluation,
                                    data analysis and experimental
                                    comparison.
                                </p>
                            </article>

                            <article>
                                <span>02</span>
                                <h3>Computer Vision</h3>
                                <p>
                                    Image analysis, feature extraction,
                                    visual representation and
                                    segmentation.
                                </p>
                            </article>

                            <article>
                                <span>03</span>
                                <h3>Signal Processing</h3>
                                <p>
                                    Filtering, spectral analysis,
                                    time-frequency analysis and
                                    system identification.
                                </p>
                            </article>

                            <article>
                                <span>04</span>
                                <h3>Image Processing</h3>
                                <p>
                                    Image filtering, restoration,
                                    inversion and representation.
                                </p>
                            </article>

                            <article>
                                <span>05</span>
                                <h3>Optimization</h3>
                                <p>
                                    Mathematical modelling,
                                    constrained optimization and
                                    numerical methods.
                                </p>
                            </article>

                            <article>
                                <span>06</span>
                                <h3>Scientific Computing</h3>
                                <p>
                                    Python-based experimentation,
                                    numerical analysis and
                                    reproducible workflows.
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
