<?php

$pageTitle = 'Education';
$currentPage = 'education';

require BASE_PATH . '/includes/header.php';
?>

<section class="education-page">
    <div class="container">

        <header class="education-header reveal">
            <p>Education</p>

            <h1>
                Academic background
            </h1>

            <span>
                Two programmes that shaped my technical foundation.
            </span>
        </header>

        <div class="education-grid">

            <article class="education-card reveal">

                <div class="education-card-top">
                    <span class="education-level">
                        MSc
                    </span>

                    <span class="education-period">
                        2025 — Present
                    </span>
                </div>

                <div class="education-card-content">
                    <h2>
                        École Centrale de Nantes
                    </h2>

                    <h3>
                        Data Science, Signal and Image Processing
                    </h3>

                    <p>
                        Final-year MSc programme combining data analysis,
                        machine learning, computer vision, signal processing
                        and image processing.
                    </p>
                </div>

                <dl class="education-meta">
                    <div>
                        <dt>Location</dt>
                        <dd>France</dd>
                    </div>

                    <div>
                        <dt>Status</dt>
                        <dd>In progress</dd>
                    </div>

                    <div>
                        <dt>Expected completion</dt>
                        <dd>2027</dd>
                    </div>
                </dl>

                <a
                    href="https://www.ec-nantes.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="education-link"
                >
                    Official website
                    <span aria-hidden="true">↗</span>
                </a>

            </article>

            <article class="education-card reveal">

                <div class="education-card-top">
                    <span class="education-level">
                        Bachelor's Degree
                    </span>

                    <span class="education-period">
                        2021 — 2025
                    </span>
                </div>

                <div class="education-card-content">
                    <h2>
                        Kristu Jayanti University
                    </h2>

                    <h3>
                        Computer Science and Electronics
                    </h3>

                    <p>
                        Undergraduate programme combining programming,
                        computing systems, electronics and applied
                        technical foundations.
                    </p>
                </div>

                <dl class="education-meta">
                    <div>
                        <dt>Location</dt>
                        <dd>India</dd>
                    </div>

                    <div>
                        <dt>Status</dt>
                        <dd>Completed</dd>
                    </div>

                    <div>
                        <dt>Graduated</dt>
                        <dd>January 2025</dd>
                    </div>
                </dl>

                <a
                    href="https://www.kristujayanti.edu.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="education-link"
                >
                    Official website
                    <span aria-hidden="true">↗</span>
                </a>

            </article>

        </div>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
