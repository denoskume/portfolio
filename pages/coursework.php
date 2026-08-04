<?php

$pageTitle = 'Coursework';
$currentPage = 'education';

require BASE_PATH . '/includes/header.php';
?>

<section class="coursework-page">
    <div class="container">

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

        <div class="coursework-grid">

            <article class="coursework-card reveal">

                <div class="coursework-card-number">
                    01
                </div>

                <div class="coursework-card-content">
                    <span>Academic Year</span>

                    <h2>M1 Year</h2>

                    <p>
                        First-year coursework covering the technical
                        foundations of data science, artificial intelligence,
                        signal processing, control and embedded computing.
                    </p>
                </div>

                <a
                    href="<?= page_url('coursework-year') ?>&amp;year=m1"
                    class="coursework-link"
                >
                    Explore M1 Courses
                    <span aria-hidden="true">→</span>
                </a>

            </article>

            <article class="coursework-card reveal">

                <div class="coursework-card-number">
                    02
                </div>

                <div class="coursework-card-content">
                    <span>Academic Year</span>

                    <h2>M2 Year</h2>

                    <p>
                        Final-year coursework focused on advanced methods,
                        professional specialization and preparation for the
                        six-month final-year internship.
                    </p>
                </div>

                <a
                    href="<?= page_url('coursework-year') ?>&amp;year=m2"
                    class="coursework-link"
                >
                    Explore M2 Courses
                    <span aria-hidden="true">→</span>
                </a>

            </article>

        </div>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
