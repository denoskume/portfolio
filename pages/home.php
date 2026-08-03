<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$profilePhoto = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="home-hero">
    <div class="container home-hero-grid">

        <div class="home-hero-content reveal">

            <div class="home-status">
                <span class="home-status-dot"></span>
                <span>
                    AI Engineering Portfolio · France
                </span>
            </div>

            <p class="home-eyebrow">
                Machine Learning · Computer Vision · Image Processing
            </p>

            <h1>
                Engineering intelligent systems from
                <span>data, signals and images.</span>
            </h1>

            <p class="home-introduction">
                I am Denos Kume, a Master's student at École Centrale
                de Nantes developing a multidisciplinary engineering
                profile in artificial intelligence, computer vision,
                signal processing and image analysis.
            </p>

            <div class="home-actions">
                <a
                    href="<?= page_url('projects') ?>"
                    class="home-button home-button-primary"
                >
                    Explore selected projects
                    <span aria-hidden="true">↗</span>
                </a>

                <a
                    href="<?= page_url('about') ?>"
                    class="home-button home-button-secondary"
                >
                    View professional profile
                </a>
            </div>

            <div class="home-role-list">
                <div>
                    <span>01</span>
                    <p>Machine Learning Engineer</p>
                </div>

                <div>
                    <span>02</span>
                    <p>Computer Vision Engineer</p>
                </div>

                <div>
                    <span>03</span>
                    <p>Image Processing Engineer</p>
                </div>
            </div>

        </div>

        <aside class="home-profile-panel reveal">

            <div class="home-profile-image">
                <?php if (is_file($profilePhoto)): ?>
                    <img
                        src="<?= asset(
                            'images/profile/denos-formal.jpg'
                        ) ?>"
                        alt="Formal portrait of Denos Kume"
                    >
                <?php else: ?>
                    <div class="home-profile-placeholder">
                        <strong>DK</strong>
                        <span>Professional portrait</span>
                    </div>
                <?php endif; ?>
            </div>

            <div class="home-profile-information">

                <div>
                    <p class="home-profile-label">
                        Professional profile
                    </p>

                    <h2>Denos Kume</h2>

                    <p class="home-profile-title">
                        Master's Student in Data Science,
                        Signal and Image Processing
                    </p>
                </div>

                <dl class="home-profile-details">
                    <div>
                        <dt>Institution</dt>
                        <dd>École Centrale de Nantes</dd>
                    </div>

                    <div>
                        <dt>Primary focus</dt>
                        <dd>AI Engineering</dd>
                    </div>

                    <div>
                        <dt>Location</dt>
                        <dd>France</dd>
                    </div>

                    <div>
                        <dt>Languages</dt>
                        <dd>French · English</dd>
                    </div>
                </dl>

                <a
                    href="<?= page_url('contact') ?>"
                    class="home-profile-contact"
                >
                    Start a conversation
                    <span aria-hidden="true">→</span>
                </a>

            </div>

        </aside>

    </div>
</section>

<section class="home-proof">
    <div class="container home-proof-grid">

        <article class="home-proof-item reveal">
            <strong>91.15%</strong>

            <div>
                <h2>CLAP Top-1 Accuracy</h2>

                <p>
                    Best zero-shot performance achieved on ESC-50
                    through prompt engineering.
                </p>
            </div>
        </article>

        <article class="home-proof-item reveal">
            <strong>+8.10</strong>

            <div>
                <h2>Percentage-Point Gain</h2>

                <p>
                    Improvement compared with the class-name-only
                    baseline.
                </p>
            </div>
        </article>

        <article class="home-proof-item reveal">
            <strong>50</strong>

            <div>
                <h2>Environmental Sound Classes</h2>

                <p>
                    Evaluated across the complete ESC-50 dataset.
                </p>
            </div>
        </article>

    </div>
</section>

<section class="home-section">
    <div class="container">

        <header class="home-section-header reveal">
            <div>
                <p class="home-section-kicker">
                    Core Engineering Direction
                </p>

                <h2>
                    A profile built across three connected domains.
                </h2>
            </div>

            <p>
                My academic work and personal projects combine
                mathematical foundations, software development and
                experimental evaluation.
            </p>
        </header>

        <div class="home-domain-grid">

            <article class="home-domain-card reveal">
                <div class="home-domain-top">
                    <span>01</span>
                    <small>Primary domain</small>
                </div>

                <h3>Machine Learning</h3>

                <p>
                    Model development, evaluation, classification,
                    statistical learning and experimental analysis.
                </p>

                <ul>
                    <li>Python and scientific computing</li>
                    <li>Data preparation and analysis</li>
                    <li>Model evaluation and comparison</li>
                    <li>Zero-shot learning</li>
                </ul>
            </article>

            <article class="home-domain-card reveal">
                <div class="home-domain-top">
                    <span>02</span>
                    <small>Visual intelligence</small>
                </div>

                <h3>Computer Vision</h3>

                <p>
                    Image representation, feature analysis,
                    segmentation and intelligent visual systems.
                </p>

                <ul>
                    <li>Image analysis</li>
                    <li>Feature extraction</li>
                    <li>Filtering and segmentation</li>
                    <li>Computer vision pipelines</li>
                </ul>
            </article>

            <article class="home-domain-card reveal">
                <div class="home-domain-top">
                    <span>03</span>
                    <small>Signal intelligence</small>
                </div>

                <h3>Signal & Image Processing</h3>

                <p>
                    Spectral methods, filtering, system identification
                    and time-frequency analysis.
                </p>

                <ul>
                    <li>Signal filtering</li>
                    <li>Spectral analysis</li>
                    <li>Time-frequency methods</li>
                    <li>Image processing</li>
                </ul>
            </article>

        </div>

    </div>
</section>

<section class="home-featured">
    <div class="container">

        <header class="home-featured-header reveal">
            <div>
                <p class="home-section-kicker">
                    Featured Project
                </p>

                <h2>
                    Prompt Engineering for Zero-Shot Audio
                    Classification Using CLAP
                </h2>
            </div>

            <a href="<?= page_url('projects') ?>">
                View all projects
                <span aria-hidden="true">↗</span>
            </a>
        </header>

        <article class="home-featured-project reveal">

            <div class="home-featured-summary">

                <p class="home-featured-type">
                    Academic Artificial Intelligence Project
                </p>

                <p class="home-featured-description">
                    Ten textual prompt strategies were evaluated on
                    ESC-50 using a pretrained language-audio model.
                    The strongest prompt improved Top-1 accuracy from
                    83.05% to 91.15%.
                </p>

                <div class="home-featured-tags">
                    <span>Python</span>
                    <span>CLAP</span>
                    <span>Audio AI</span>
                    <span>Prompt Engineering</span>
                    <span>Zero-Shot Learning</span>
                </div>

            </div>

            <div class="home-featured-results">

                <div>
                    <strong>91.15%</strong>
                    <span>Top-1</span>
                </div>

                <div>
                    <strong>97.45%</strong>
                    <span>Top-3</span>
                </div>

                <div>
                    <strong>99.00%</strong>
                    <span>Top-5</span>
                </div>

            </div>

        </article>

    </div>
</section>

<section class="home-journey">
    <div class="container home-journey-grid">

        <div class="home-journey-heading reveal">
            <p class="home-section-kicker">
                Engineering Journey
            </p>

            <h2>
                Learning, building and preparing for real-world impact.
            </h2>

            <a
                href="<?= page_url('education') ?>"
                class="home-inline-link"
            >
                Explore my education
                <span aria-hidden="true">↗</span>
            </a>
        </div>

        <div class="home-journey-timeline">

            <article class="home-journey-item reveal">
                <span>2021 — 2025</span>

                <div>
                    <h3>
                        Computer Science and Electronics
                    </h3>

                    <p>
                        Built foundations in programming,
                        electronics, systems and technical
                        problem solving.
                    </p>
                </div>
            </article>

            <article class="home-journey-item reveal">
                <span>2025 — Present</span>

                <div>
                    <h3>
                        École Centrale de Nantes
                    </h3>

                    <p>
                        Advanced studies in Data Science,
                        Signal and Image Processing.
                    </p>
                </div>
            </article>

            <article class="home-journey-item reveal">
                <span>Next</span>

                <div>
                    <h3>
                        AI Engineering Career
                    </h3>

                    <p>
                        Targeting demanding roles in Machine Learning,
                        Computer Vision and Image Processing.
                    </p>
                </div>
            </article>

        </div>

    </div>
</section>

<section class="home-callout">
    <div class="container">

        <div class="home-callout-inner reveal">

            <div>
                <p class="home-section-kicker">
                    Collaboration
                </p>

                <h2>
                    Looking for an engineer who learns deeply
                    and builds with purpose?
                </h2>
            </div>

            <div class="home-callout-actions">
                <a
                    href="<?= page_url('contact') ?>"
                    class="home-button home-button-light"
                >
                    Contact me
                </a>

                <a
                    href="<?= page_url('experience') ?>"
                    class="home-button home-button-outline"
                >
                    View experience
                </a>
            </div>

        </div>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
