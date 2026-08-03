<?php

$pageTitle = 'About';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';

$photoPath = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="recruiter-about">
    <div class="container">

        <article class="recruiter-about-layout reveal">

            <aside class="recruiter-profile-card">

                <div class="recruiter-photo">
                    <?php if (is_file($photoPath)): ?>
                        <img
                            src="<?= asset(
                                'images/profile/denos-formal.jpg'
                            ) ?>"
                            alt="Formal portrait of Denos Kume"
                        >
                    <?php else: ?>
                        <div class="recruiter-photo-placeholder">
                            DK
                        </div>
                    <?php endif; ?>
                </div>

                <div class="recruiter-identity">
                    <h1>Denos Kume</h1>

                    <p>
                        Machine Learning · Computer Vision ·
                        Image Processing
                    </p>
                </div>

                <dl class="recruiter-profile-meta">
                    <div>
                        <dt>Location</dt>
                        <dd>France</dd>
                    </div>

                    <div>
                        <dt>Current level</dt>
                        <dd>Master's student</dd>
                    </div>

                    <div>
                        <dt>Institution</dt>
                        <dd>École Centrale de Nantes</dd>
                    </div>

                    <div>
                        <dt>Languages</dt>
                        <dd>French · English</dd>
                    </div>
                </dl>

                <a
                    href="<?= page_url('contact') ?>"
                    class="recruiter-contact-link"
                >
                    Contact me
                    <span aria-hidden="true">→</span>
                </a>

            </aside>

            <div class="recruiter-about-content">

                <header class="recruiter-about-header">
                    <p>Professional Profile</p>

                    <h2>
                        AI engineering profile focused on
                        practical systems and measurable results.
                    </h2>

                    <p class="recruiter-summary">
                        I combine software, data, signal processing
                        and visual computing to build reliable
                        intelligent systems for real-world use cases.
                    </p>
                </header>

                <section class="recruiter-value">
                    <div>
                        <span>Target roles</span>

                        <strong>
                            Machine Learning Engineer
                        </strong>

                        <strong>
                            Computer Vision Engineer
                        </strong>

                        <strong>
                            Image Processing Engineer
                        </strong>
                    </div>

                    <div>
                        <span>What I bring</span>

                        <p>
                            Structured problem solving, experimental
                            discipline, clear documentation and the
                            ability to translate theory into working
                            implementations.
                        </p>
                    </div>
                </section>

                <section class="recruiter-section">
                    <div class="recruiter-section-heading">
                        <span>01</span>
                        <h3>Core capability</h3>
                    </div>

                    <div class="recruiter-capability-grid">

                        <article>
                            <h4>Machine Learning</h4>

                            <p>
                                Classification, model evaluation,
                                feature preparation, experimentation
                                and performance comparison.
                            </p>
                        </article>

                        <article>
                            <h4>Computer Vision</h4>

                            <p>
                                Image analysis, feature extraction,
                                segmentation and vision-oriented
                                pipelines.
                            </p>
                        </article>

                        <article>
                            <h4>Signal & Image Processing</h4>

                            <p>
                                Filtering, spectral analysis,
                                time-frequency methods and
                                signal-based interpretation.
                            </p>
                        </article>

                    </div>
                </section>

                <section class="recruiter-section">
                    <div class="recruiter-section-heading">
                        <span>02</span>
                        <h3>Technical stack</h3>
                    </div>

                    <div class="recruiter-stack">
                        <span>Python</span>
                        <span>NumPy</span>
                        <span>pandas</span>
                        <span>scikit-learn</span>
                        <span>OpenCV</span>
                        <span>Jupyter</span>
                        <span>SQL</span>
                        <span>Git</span>
                        <span>Linux</span>
                    </div>
                </section>

                <section class="recruiter-section">
                    <div class="recruiter-section-heading">
                        <span>03</span>
                        <h3>Evidence</h3>
                    </div>

                    <div class="recruiter-evidence">

                        <div class="recruiter-evidence-metric">
                            <strong>91.15%</strong>
                            <span>Top-1 accuracy</span>
                        </div>

                        <div>
                            <h4>
                                Zero-Shot Audio Classification
                                Using CLAP
                            </h4>

                            <p>
                                Evaluated ten prompt strategies on
                                ESC-50 and improved the class-name
                                baseline by 8.10 percentage points.
                            </p>

                            <a href="<?= page_url('projects') ?>">
                                View project
                                <span aria-hidden="true">↗</span>
                            </a>
                        </div>

                    </div>
                </section>

                <section class="recruiter-section">
                    <div class="recruiter-section-heading">
                        <span>04</span>
                        <h3>How I work</h3>
                    </div>

                    <div class="recruiter-work-grid">

                        <article>
                            <strong>Problem first</strong>

                            <p>
                                Clarify the need, constraints and
                                success criteria before implementation.
                            </p>
                        </article>

                        <article>
                            <strong>Evidence driven</strong>

                            <p>
                                Compare approaches using meaningful
                                metrics rather than intuition alone.
                            </p>
                        </article>

                        <article>
                            <strong>Clear delivery</strong>

                            <p>
                                Keep code, documentation and results
                                understandable and reproducible.
                            </p>
                        </article>

                    </div>
                </section>

                <footer class="recruiter-about-footer">
                    <p>
                        Currently preparing for industry opportunities
                        in AI, computer vision and image processing.
                    </p>

                    <a href="<?= page_url('experience') ?>">
                        View experience
                        <span aria-hidden="true">↗</span>
                    </a>
                </footer>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
