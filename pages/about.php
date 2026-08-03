<?php

$pageTitle = 'About';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';

$photoPath = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="candidate-about">
    <div class="container">

        <article class="candidate-about-layout reveal">

            <aside class="candidate-about-sidebar">

                <div class="candidate-about-photo">
                    <?php if (is_file($photoPath)): ?>
                        <img
                            src="<?= asset(
                                'images/profile/denos-formal.jpg'
                            ) ?>"
                            alt="Formal portrait of Denos Kume"
                        >
                    <?php else: ?>
                        <div class="candidate-about-placeholder">
                            DK
                        </div>
                    <?php endif; ?>
                </div>

                <div class="candidate-about-identity">
                    <h1>Denos Kume</h1>

                    <p>
                        Master 2 Student in Data Science,
                        Signal and Image Processing
                    </p>
                </div>

                <dl class="candidate-about-details">
                    <div>
                        <dt>Institution</dt>
                        <dd>École Centrale de Nantes</dd>
                    </div>

                    <div>
                        <dt>Location</dt>
                        <dd>France</dd>
                    </div>

                    <div>
                        <dt>Languages</dt>
                        <dd>French · English</dd>
                    </div>

                    <div>
                        <dt>Current Stage</dt>
                        <dd>Final year of Master's programme</dd>
                    </div>
                </dl>

            </aside>

            <div class="candidate-about-content">

                <header class="candidate-about-header">
                    <p>Professional Introduction</p>

                    <h2>
                        A Master 2 student developing practical skills
                        across data, signals and images.
                    </h2>

                    <p class="candidate-about-summary">
                        I am completing a Master's programme at
                        École Centrale de Nantes in Data Science,
                        Signal and Image Processing.
                    </p>

                    <p class="candidate-about-summary">
                        Through my coursework and projects, I am
                        developing practical experience in machine
                        learning, computer vision, image processing,
                        signal processing and data analysis.
                    </p>
                </header>

                <section class="candidate-about-section">
                    <h3>Current Profile</h3>

                    <p>
                        My academic background combines computer
                        science, electronics and applied engineering.
                        I am currently strengthening my ability to
                        analyse technical problems, implement methods
                        in code and evaluate results clearly.
                    </p>
                </section>

                <section class="candidate-about-section">
                    <h3>Areas of Specialization</h3>

                    <div class="candidate-specialization-grid">

                        <article>
                            <strong>Machine Learning</strong>

                            <p>
                                Classification, model evaluation,
                                data preparation and experimental
                                comparison.
                            </p>
                        </article>

                        <article>
                            <strong>Computer Vision</strong>

                            <p>
                                Image analysis, feature extraction,
                                segmentation and visual pipelines.
                            </p>
                        </article>

                        <article>
                            <strong>Image Processing</strong>

                            <p>
                                Filtering, transformation and
                                analysis of digital images.
                            </p>
                        </article>

                        <article>
                            <strong>Signal Processing</strong>

                            <p>
                                Filtering, spectral analysis and
                                time-frequency methods.
                            </p>
                        </article>

                        <article>
                            <strong>Data Science</strong>

                            <p>
                                Data exploration, statistical analysis
                                and interpretation of results.
                            </p>
                        </article>

                    </div>
                </section>

                <section class="candidate-about-section">
                    <h3>Technical Skills</h3>

                    <div class="candidate-skill-list">
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

                <section class="candidate-about-section">
                    <h3>Selected Projects</h3>

                    <div class="candidate-project-list">

                        <article>
                            <span>01</span>

                            <div>
                                <strong>
                                    Zero-Shot Audio Classification
                                    Using CLAP
                                </strong>

                                <p>
                                    Evaluated prompt strategies on
                                    ESC-50 and compared their impact
                                    on classification performance.
                                </p>
                            </div>
                        </article>

                        <article>
                            <span>02</span>

                            <div>
                                <strong>
                                    France Daily Temperature Analysis
                                </strong>

                                <p>
                                    Applied decomposition,
                                    stationarity analysis and ARIMA
                                    modelling to time-series data.
                                </p>
                            </div>
                        </article>

                        <article>
                            <span>03</span>

                            <div>
                                <strong>Python for AI</strong>

                                <p>
                                    Structured exercises and
                                    mini-projects focused on building
                                    stronger Python foundations.
                                </p>
                            </div>
                        </article>

                    </div>

                    <a
                        class="candidate-about-link"
                        href="<?= page_url('projects') ?>"
                    >
                        View all projects
                        <span aria-hidden="true">↗</span>
                    </a>
                </section>

                <section class="candidate-about-section">
                    <h3>How I Work</h3>

                    <ul class="candidate-work-list">
                        <li>
                            I prefer to understand the problem clearly
                            before choosing a technical solution.
                        </li>

                        <li>
                            I value structured, readable and
                            reproducible work.
                        </li>

                        <li>
                            I learn by combining coursework,
                            experimentation and practical projects.
                        </li>

                        <li>
                            I appreciate collaboration, feedback and
                            clear technical communication.
                        </li>
                    </ul>
                </section>

                <section class="candidate-about-section">
                    <h3>Beyond Engineering</h3>

                    <p>
                        Alongside my technical studies, I have developed
                        experience in customer service, teaching and
                        international student coordination. These roles
                        strengthened my communication, adaptability and
                        ability to work with people from different
                        backgrounds.
                    </p>
                </section>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
