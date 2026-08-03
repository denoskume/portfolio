<?php

$pageTitle = 'About';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';

$photoPath = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="about-profile-page">
    <div class="container">

        <article class="about-profile-sheet reveal">

            <aside class="about-profile-sidebar">

                <div class="about-profile-photo">
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

                <div class="about-profile-identity">
                    <h1>Denos Kume</h1>

                    <p>
                        AI Engineering Profile
                    </p>
                </div>

                <dl class="about-profile-details">
                    <div>
                        <dt>Programme</dt>
                        <dd>
                            Data Science, Signal and
                            Image Processing
                        </dd>
                    </div>

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
                </dl>

                <section class="about-sidebar-section">
                    <h2>Target Roles</h2>

                    <ul>
                        <li>Machine Learning Engineer</li>
                        <li>Computer Vision Engineer</li>
                        <li>Image Processing Engineer</li>
                    </ul>
                </section>

                <section class="about-sidebar-section">
                    <h2>Core Tools</h2>

                    <div class="about-tools">
                        <span>Python</span>
                        <span>Git</span>
                        <span>SQL</span>
                        <span>OpenCV</span>
                        <span>Jupyter</span>
                    </div>
                </section>

            </aside>

            <div class="about-profile-content">

                <header class="about-profile-header">
                    <p>Professional Profile</p>

                    <h2>
                        Building practical intelligent systems
                        from data, signals and images.
                    </h2>
                </header>

                <section class="about-content-block">
                    <h3>Profile</h3>

                    <p>
                        I am a Master's student at École Centrale
                        de Nantes, specializing in Data Science,
                        Signal and Image Processing.
                    </p>

                    <p>
                        My background combines computer science,
                        electronics, artificial intelligence,
                        signal processing and image analysis.
                    </p>
                </section>

                <section class="about-content-block">
                    <h3>Technical Focus</h3>

                    <div class="about-focus-grid">
                        <article>
                            <strong>Machine Learning</strong>
                            <span>
                                Classification, model evaluation,
                                data analysis and applied AI.
                            </span>
                        </article>

                        <article>
                            <strong>Computer Vision</strong>
                            <span>
                                Image understanding, features,
                                segmentation and visual systems.
                            </span>
                        </article>

                        <article>
                            <strong>Signal & Image Processing</strong>
                            <span>
                                Filtering, spectral analysis and
                                time-frequency methods.
                            </span>
                        </article>
                    </div>
                </section>

                <section class="about-content-block">
                    <h3>Professional Objective</h3>

                    <p>
                        I am seeking a technically demanding
                        engineering role where I can contribute to
                        real AI projects, strengthen my expertise
                        and work with experienced teams.
                    </p>
                </section>

                <section class="about-content-block">
                    <h3>What I Bring</h3>

                    <ul class="about-value-list">
                        <li>
                            Structured problem solving and disciplined
                            project organization
                        </li>

                        <li>
                            Ability to connect theory with practical
                            implementation
                        </li>

                        <li>
                            Clear technical communication in French
                            and English
                        </li>

                        <li>
                            Strong ambition, adaptability and
                            continuous learning
                        </li>
                    </ul>
                </section>

                <section class="about-highlight">
                    <div>
                        <span>Selected Achievement</span>
                        <strong>91.15%</strong>
                    </div>

                    <p>
                        Top-1 accuracy achieved on ESC-50 through
                        prompt engineering with CLAP, improving the
                        class-only baseline by 8.10 percentage points.
                    </p>
                </section>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
