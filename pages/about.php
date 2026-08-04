<?php

$pageTitle = 'About';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';

$photoPath = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="about-page">
    <div class="container">

        <article class="about-layout reveal">

            <aside class="about-sidebar">

                <div class="about-photo">
                    <?php if (is_file($photoPath)): ?>
                        <img
                            src="<?= asset(
                                'images/profile/denos-formal.jpg'
                            ) ?>"
                            alt="Formal portrait of Denos Kume"
                        >
                    <?php else: ?>
                        <div class="about-photo-placeholder">
                            DK
                        </div>
                    <?php endif; ?>
                </div>

                <div class="about-identity">
                    <h1>Denos Kume</h1>

                    <p class="about-title">
                        Final-year MSc Student
                    </p>

                    <p class="about-programme">
                        Data Science, Signal and Image Processing
                    </p>

                    <p class="about-school">
                        École Centrale de Nantes
                    </p>
                </div>

                <dl class="about-details">
                    <div>
                        <dt>Location</dt>
                        <dd>France</dd>
                    </div>

                    <div>
                        <dt>Languages</dt>
                        <dd>French · English</dd>
                    </div>

                    <div>
                        <dt>Background</dt>
                        <dd>Computer Science and Electronics</dd>
                    </div>

                    <div>
                        <dt>Current Stage</dt>
                        <dd>Final year of MSc programme</dd>
                    </div>
                </dl>

            </aside>

            <div class="about-content">

                <header class="about-header">
                    <h2>
                        Machine Learning • Computer Vision •
                        Signal &amp; Image Processing
                    </h2>

                    <div class="about-introduction">

                        <p>
                            Born in M'Batto, Côte d'Ivoire, Denos studied
                            Computer Science and Electronics at
                            <a
                                href="https://www.kristujayanti.edu.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kristu Jayanti University
                            </a>,
                            graduating with a Bachelor's degree in
                            January 2025.
                        </p>

                        <p>
                            In September 2025, he joined
                            <a
                                href="https://www.ec-nantes.fr/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                École Centrale de Nantes
                            </a>
                            to pursue an MSc in Data Science, Signal and
                            Image Processing. His graduate studies focus
                            on machine learning, computer vision, signal
                            processing, image processing and data analysis,
                            combining theoretical foundations with practical
                            engineering applications.
                        </p>

                        <p>
                            Through coursework, research projects and
                            hands-on experimentation, he is developing
                            practical skills in designing, implementing and
                            evaluating intelligent systems. He enjoys
                            working on engineering problems where data,
                            signals and images can be transformed into
                            reliable and meaningful solutions.
                        </p>

                        <p>
                            He is currently seeking a six-month final-year
                            internship where he can contribute to real-world
                            engineering projects, collaborate with experienced
                            teams and continue developing his technical skills
                            in artificial intelligence and data-driven
                            technologies.
                        </p>

                    </div>
                </header>

                <section class="about-section">
                    <h3>Core Areas</h3>

                    <div class="about-grid">

                        <article>
                            <span>01</span>
                            <strong>Machine Learning</strong>
                            <p>
                                Classification, data preparation,
                                model evaluation and experimental comparison.
                            </p>
                        </article>

                        <article>
                            <span>02</span>
                            <strong>Computer Vision</strong>
                            <p>
                                Image analysis, feature extraction,
                                segmentation and visual pipelines.
                            </p>
                        </article>

                        <article>
                            <span>03</span>
                            <strong>Signal Processing</strong>
                            <p>
                                Filtering, spectral analysis and
                                time-frequency methods.
                            </p>
                        </article>

                        <article>
                            <span>04</span>
                            <strong>Image Processing</strong>
                            <p>
                                Filtering, transformation and
                                interpretation of digital images.
                            </p>
                        </article>

                        <article>
                            <span>05</span>
                            <strong>Data Analysis</strong>
                            <p>
                                Data exploration, statistical analysis
                                and interpretation of results.
                            </p>
                        </article>

                    </div>
                </section>

                <section class="about-section">
                    <h3>Technical Interests</h3>

                    <div class="about-tags">
                        <span>Artificial Intelligence</span>
                        <span>Deep Learning</span>
                        <span>Pattern Recognition</span>
                        <span>Information Retrieval</span>
                        <span>Scientific Computing</span>
                    </div>
                </section>

                <section class="about-section">
                    <h3>Technical Skills</h3>

                    <div class="about-tags">
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

                <section class="about-section">
                    <h3>Selected Work</h3>

                    <div class="about-projects">

                        <article>
                            <span>01</span>

                            <div>
                                <strong>
                                    Zero-Shot Audio Classification
                                    Using CLAP
                                </strong>

                                <p>
                                    Evaluated prompt strategies on ESC-50
                                    and analysed their impact on
                                    classification performance.
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
                                    Applied decomposition, stationarity
                                    analysis and ARIMA modelling to
                                    time-series data.
                                </p>
                            </div>
                        </article>

                        <article>
                            <span>03</span>

                            <div>
                                <strong>Python for AI</strong>

                                <p>
                                    Structured exercises and mini-projects
                                    created to strengthen Python and
                                    software foundations.
                                </p>
                            </div>
                        </article>

                    </div>

                    <a
                        class="about-project-link"
                        href="<?= page_url('projects') ?>"
                    >
                        View all projects
                        <span aria-hidden="true">↗</span>
                    </a>
                </section>

                <section class="about-section">
                    <h3>How I Work</h3>

                    <ul class="about-work-list">
                        <li>
                            I clarify the problem, constraints and expected
                            outcome before selecting a technical approach.
                        </li>

                        <li>
                            I value readable, structured and reproducible
                            work.
                        </li>

                        <li>
                            I learn through coursework, experimentation and
                            practical projects.
                        </li>

                        <li>
                            I appreciate collaboration, constructive feedback
                            and clear communication.
                        </li>
                    </ul>
                </section>

                <section class="about-section about-final-section">
                    <h3>Beyond Technical Work</h3>

                    <p>
                        Experience in customer service, teaching and
                        international student coordination has strengthened
                        his communication, adaptability and sense of
                        responsibility.
                    </p>
                </section>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
