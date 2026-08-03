<?php

$pageTitle = 'Projects';
$currentPage = 'projects';

require BASE_PATH . '/includes/header.php';
?>

<section class="page-hero">
    <div class="container page-hero-content reveal">
        <p class="eyebrow">Projects</p>

        <h1 class="page-title">
            Applied work with measurable results.
        </h1>

        <p class="lead">
            Each project is maintained separately and can reference
            the coursework, methods and technical foundations it uses.
        </p>
    </div>
</section>

<section class="section">
    <div class="container project-list">

        <article class="project-item reveal">
            <span class="project-index">01</span>

            <div>
                <p class="eyebrow">Academic AI project</p>

                <h2 class="project-title">
                    Prompt Engineering for Zero-Shot Audio
                    Classification Using CLAP
                </h2>

                <p class="lead">
                    Evaluation of ten textual prompt strategies on
                    ESC-50. The strongest prompt increased Top-1
                    accuracy from 83.05% to 91.15%.
                </p>

                <div class="tags">
                    <span class="tag">Python</span>
                    <span class="tag">CLAP</span>
                    <span class="tag">Audio AI</span>
                    <span class="tag">Zero-shot</span>
                </div>
            </div>
        </article>

        <article class="project-item reveal">
            <span class="project-index">02</span>

            <div>
                <p class="eyebrow">Time-series analysis</p>

                <h2 class="project-title">
                    France Daily Temperature Modelling
                </h2>

                <p class="lead">
                    Seasonal decomposition, stationarity analysis,
                    moving averages and ARIMA residual modelling.
                </p>

                <div class="tags">
                    <span class="tag">Time Series</span>
                    <span class="tag">ARIMA</span>
                    <span class="tag">Statistics</span>
                    <span class="tag">Jupyter</span>
                </div>
            </div>
        </article>

        <article class="project-item reveal">
            <span class="project-index">03</span>

            <div>
                <p class="eyebrow">Personal learning project</p>

                <h2 class="project-title">Python for AI</h2>

                <p class="lead">
                    A structured repository moving from Python
                    foundations to increasingly advanced
                    AI-oriented exercises and mini-projects.
                </p>

                <div class="tags">
                    <span class="tag">Python</span>
                    <span class="tag">Git</span>
                    <span class="tag">Linux</span>
                    <span class="tag">Clean Code</span>
                </div>
            </div>
        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
