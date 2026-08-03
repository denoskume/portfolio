<?php

$pageTitle = 'About';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';

$photoPath = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="profile-about">
    <div class="container">

        <article class="profile-about-layout reveal">

            <aside class="profile-about-sidebar">

                <div class="profile-about-photo">
                    <?php if (is_file($photoPath)): ?>
                        <img
                            src="<?= asset(
                                'images/profile/denos-formal.jpg'
                            ) ?>"
                            alt="Formal portrait of Denos Kume"
                        >
                    <?php else: ?>
                        <div class="profile-about-placeholder">
                            DK
                        </div>
                    <?php endif; ?>
                </div>

                <div class="profile-about-name">
                    <h1>Denos Kume</h1>

                    <p>
                        AI Engineer in development
                    </p>
                </div>

                <div class="profile-about-meta">
                    <div>
                        <span>Based in</span>
                        <strong>France</strong>
                    </div>

                    <div>
                        <span>Languages</span>
                        <strong>French · English</strong>
                    </div>

                    <div>
                        <span>Current programme</span>
                        <strong>
                            Data Science, Signal and
                            Image Processing
                        </strong>
                    </div>
                </div>

                <a
                    class="profile-about-contact"
                    href="<?= page_url('contact') ?>"
                >
                    Start a conversation
                    <span aria-hidden="true">→</span>
                </a>

            </aside>

            <div class="profile-about-main">

                <header class="profile-about-header">
                    <p class="profile-about-label">
                        Professional Profile
                    </p>

                    <h2>
                        I build practical intelligence from
                        data, signals and images.
                    </h2>

                    <p class="profile-about-intro">
                        I am developing a multidisciplinary engineering
                        profile combining artificial intelligence,
                        computer vision, signal processing and software
                        development.
                    </p>
                </header>

                <section class="profile-about-section">
                    <h3>What I do</h3>

                    <p>
                        I work on problems where data must be transformed
                        into useful decisions, predictions or visual
                        understanding.
                    </p>

                    <p>
                        My approach combines strong technical foundations,
                        structured experimentation and clear communication.
                    </p>
                </section>

                <section class="profile-about-expertise">

                    <article>
                        <span>01</span>

                        <h3>Machine Learning</h3>

                        <p>
                            Model evaluation, classification,
                            data analysis and applied AI systems.
                        </p>
                    </article>

                    <article>
                        <span>02</span>

                        <h3>Computer Vision</h3>

                        <p>
                            Image understanding, feature analysis,
                            segmentation and visual intelligence.
                        </p>
                    </article>

                    <article>
                        <span>03</span>

                        <h3>Signal & Image Processing</h3>

                        <p>
                            Filtering, spectral analysis and
                            time-frequency methods.
                        </p>
                    </article>

                </section>

                <section class="profile-about-section">
                    <h3>How I work</h3>

                    <div class="profile-about-principles">
                        <div>
                            <strong>Understand first</strong>
                            <span>
                                Define the real problem before
                                selecting the technology.
                            </span>
                        </div>

                        <div>
                            <strong>Build clearly</strong>
                            <span>
                                Produce maintainable and
                                well-documented implementations.
                            </span>
                        </div>

                        <div>
                            <strong>Measure results</strong>
                            <span>
                                Compare methods using meaningful
                                and transparent metrics.
                            </span>
                        </div>
                    </div>
                </section>

                <section class="profile-about-section">
                    <h3>Professional direction</h3>

                    <p>
                        I am preparing for roles in Machine Learning,
                        Computer Vision and Image Processing where I can
                        contribute to real products and ambitious
                        engineering projects.
                    </p>
                </section>

                <footer class="profile-about-footer">
                    <p>
                        Long-term objective:
                        build useful AI products and platforms.
                    </p>

                    <a href="<?= page_url('projects') ?>">
                        Explore my projects
                        <span aria-hidden="true">↗</span>
                    </a>
                </footer>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
