<?php

$pageTitle = 'Professional Profile';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';

$photoPath = BASE_PATH . '/assets/images/profile/denos-formal.jpg';
?>

<section class="executive-profile">
    <div class="container">

        <article class="executive-sheet reveal">

            <aside class="executive-sidebar">

                <div class="executive-photo">
                    <?php if (is_file($photoPath)): ?>
                        <img
                            src="<?= asset('images/profile/denos-formal.jpg') ?>"
                            alt="Formal portrait of Denos Kume"
                        >
                    <?php else: ?>
                        <div class="executive-photo-placeholder">
                            <strong>DK</strong>
                            <span>Formal portrait</span>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="executive-identity">
                    <p class="executive-status">
                        AI Engineering Profile
                    </p>

                    <h1>Denos Kume</h1>

                    <p class="executive-role">
                        Master's Student in Data Science,
                        Signal and Image Processing
                    </p>
                </div>

                <section class="executive-sidebar-section">
                    <h2>Professional Focus</h2>

                    <ul class="executive-list">
                        <li>Machine Learning Engineering</li>
                        <li>Computer Vision Engineering</li>
                        <li>Image Processing Engineering</li>
                    </ul>
                </section>

                <section class="executive-sidebar-section">
                    <h2>Profile Details</h2>

                    <dl class="executive-details">
                        <div>
                            <dt>Institution</dt>
                            <dd>École Centrale de Nantes</dd>
                        </div>

                        <div>
                            <dt>Programme</dt>
                            <dd>
                                Data Science, Signal and
                                Image Processing
                            </dd>
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
                </section>

                <section class="executive-sidebar-section">
                    <h2>Technical Domains</h2>

                    <div class="executive-tags">
                        <span>Artificial Intelligence</span>
                        <span>Machine Learning</span>
                        <span>Computer Vision</span>
                        <span>Image Processing</span>
                        <span>Signal Processing</span>
                        <span>Data Science</span>
                    </div>
                </section>

                <div class="executive-sidebar-actions">
                    <a
                        class="executive-primary-action"
                        href="<?= page_url('projects') ?>"
                    >
                        View projects
                    </a>

                    <a
                        class="executive-secondary-action"
                        href="<?= page_url('contact') ?>"
                    >
                        Contact me
                    </a>
                </div>

            </aside>

            <div class="executive-content">

                <header class="executive-header">
                    <div>
                        <p class="executive-kicker">
                            Professional Profile · 2026
                        </p>

                        <h2>
                            Building intelligent systems from
                            data, signals and images.
                        </h2>
                    </div>

                    <div class="executive-availability">
                        <span class="availability-indicator"></span>

                        <div>
                            <strong>Career Direction</strong>
                            <span>
                                AI engineering and intelligent products
                            </span>
                        </div>
                    </div>
                </header>

                <section class="executive-introduction">
                    <p class="executive-lead">
                        I am developing a multidisciplinary engineering
                        profile combining artificial intelligence,
                        computer science, electronics, signal processing
                        and image analysis.
                    </p>

                    <p>
                        My objective is to transform advanced technical
                        knowledge into reliable, measurable and useful
                        intelligent systems. I approach every project
                        with a strong emphasis on problem definition,
                        methodology, experimentation, documentation
                        and clear communication.
                    </p>
                </section>

                <section class="executive-section">
                    <div class="executive-section-number">01</div>

                    <div class="executive-section-content">
                        <h3>Academic Foundation</h3>

                        <p>
                            I am completing a Master's programme in
                            Data Science, Signal and Image Processing
                            at École Centrale de Nantes.
                        </p>

                        <p>
                            My coursework includes artificial
                            intelligence, algorithmics, optimization,
                            computer vision, image processing, signal
                            filtering, spectral analysis and
                            time-frequency methods.
                        </p>

                        <a
                            class="executive-inline-link"
                            href="<?= page_url('education') ?>"
                        >
                            Explore my education
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </section>

                <section class="executive-section">
                    <div class="executive-section-number">02</div>

                    <div class="executive-section-content">
                        <h3>Professional Direction</h3>

                        <p>
                            I am preparing for high-responsibility
                            engineering roles in Machine Learning,
                            Computer Vision and Image Processing.
                        </p>

                        <p>
                            I want to work in an environment where
                            technical excellence, experimentation and
                            real-world impact are central to product
                            development.
                        </p>
                    </div>
                </section>

                <section class="executive-section">
                    <div class="executive-section-number">03</div>

                    <div class="executive-section-content">
                        <h3>Engineering Method</h3>

                        <div class="executive-principles">
                            <article>
                                <strong>Understand</strong>
                                <p>
                                    Define the real problem before
                                    selecting a technical solution.
                                </p>
                            </article>

                            <article>
                                <strong>Build</strong>
                                <p>
                                    Develop clear, maintainable and
                                    reproducible implementations.
                                </p>
                            </article>

                            <article>
                                <strong>Measure</strong>
                                <p>
                                    Evaluate results using transparent
                                    metrics and meaningful comparisons.
                                </p>
                            </article>

                            <article>
                                <strong>Communicate</strong>
                                <p>
                                    Present methods, decisions and
                                    outcomes with precision.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>

                <section class="executive-section">
                    <div class="executive-section-number">04</div>

                    <div class="executive-section-content">
                        <h3>Selected Achievement</h3>

                        <div class="executive-achievement">
                            <div class="executive-achievement-metric">
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
                                    baseline from 83.05% to 91.15%.
                                </p>

                                <a
                                    class="executive-inline-link"
                                    href="<?= page_url('projects') ?>"
                                >
                                    View selected projects
                                    <span aria-hidden="true">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="executive-section">
                    <div class="executive-section-number">05</div>

                    <div class="executive-section-content">
                        <h3>Long-Term Vision</h3>

                        <p>
                            My long-term ambition is to design and build
                            useful AI platforms and products addressing
                            concrete challenges in transport, industry,
                            communication and intelligent automation.
                        </p>

                        <p>
                            I aim to combine engineering expertise,
                            product vision, leadership and
                            entrepreneurship to create systems with
                            durable value.
                        </p>
                    </div>
                </section>

                <footer class="executive-signature">
                    <div>
                        <p>
                            “The greatest achievements are rarely
                            the result of a single effort.”
                        </p>

                        <span>Denos Kume</span>
                    </div>

                    <a
                        class="executive-contact-button"
                        href="<?= page_url('contact') ?>"
                    >
                        Start a conversation
                    </a>
                </footer>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
