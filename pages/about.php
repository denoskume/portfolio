<?php

$pageTitle = 'About';
$currentPage = 'about';

require BASE_PATH . '/includes/header.php';
?>

<section class="about-paper-section">
    <div class="container">

        <article class="about-paper reveal">

            <aside class="about-sidebar">

                <div class="about-photo-frame">
                    <?php
                    $profilePhoto = BASE_PATH
                        . '/assets/images/profile/denos-formal.jpg';
                    ?>

                    <?php if (is_file($profilePhoto)): ?>
                        <img
                            src="<?= asset(
                                'images/profile/denos-formal.jpg'
                            ) ?>"
                            alt="Formal portrait of Denos Kume"
                            class="about-photo"
                        >
                    <?php else: ?>
                        <div class="about-photo-placeholder">
                            <span>DK</span>
                            <p>Formal photo</p>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="about-identity">
                    <h1>Denos Kume</h1>

                    <p>
                        Master's Student in Data Science,
                        Signal and Image Processing
                    </p>
                </div>

                <section class="about-sidebar-block">
                    <h2>Profile</h2>

                    <dl class="about-detail-list">
                        <div>
                            <dt>Location</dt>
                            <dd>France</dd>
                        </div>

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
                            <dt>Languages</dt>
                            <dd>French · English</dd>
                        </div>
                    </dl>
                </section>

                <section class="about-sidebar-block">
                    <h2>Target Roles</h2>

                    <ul class="about-simple-list">
                        <li>Machine Learning Engineer</li>
                        <li>Computer Vision Engineer</li>
                        <li>Image Processing Engineer</li>
                    </ul>
                </section>

                <section class="about-sidebar-block">
                    <h2>Core Interests</h2>

                    <ul class="about-simple-list">
                        <li>Artificial Intelligence</li>
                        <li>Computer Vision</li>
                        <li>Image Processing</li>
                        <li>Signal Processing</li>
                        <li>Intelligent products</li>
                    </ul>
                </section>

            </aside>

            <div class="about-main-content">

                <header class="about-document-header">
                    <p class="about-document-label">
                        Professional Profile
                    </p>

                    <h2>
                        Building a strong path toward
                        intelligent systems engineering.
                    </h2>
                </header>

                <section class="about-text-section">
                    <h3>About Me</h3>

                    <p>
                        I am Denos Kume, a Master's student at
                        École Centrale de Nantes in Data Science,
                        Signal and Image Processing.
                    </p>

                    <p>
                        My academic background combines computer
                        science, electronics, artificial intelligence,
                        optimization, signal processing, image
                        processing and data analysis.
                    </p>

                    <p>
                        I am particularly interested in Machine
                        Learning, Computer Vision and Image Processing.
                        My objective is to develop intelligent systems
                        that solve concrete and meaningful problems.
                    </p>
                </section>

                <section class="about-text-section">
                    <h3>Professional Direction</h3>

                    <p>
                        My immediate objective is to begin my career
                        in a technically demanding engineering role
                        where I can strengthen my expertise, contribute
                        to ambitious projects and learn from experienced
                        professionals.
                    </p>

                    <p>
                        I am primarily targeting positions as a
                        Machine Learning Engineer, Computer Vision
                        Engineer or Image Processing Engineer.
                    </p>
                </section>

                <section class="about-text-section">
                    <h3>Engineering Approach</h3>

                    <p>
                        I value structured learning, measurable
                        results, clear documentation and disciplined
                        project organization.
                    </p>

                    <p>
                        For me, strong engineering is not limited to
                        writing code. It also requires understanding
                        the problem, selecting appropriate methods,
                        evaluating results carefully and communicating
                        technical decisions clearly.
                    </p>
                </section>

                <section class="about-text-section">
                    <h3>Long-Term Vision</h3>

                    <p>
                        My long-term ambition is to build useful AI
                        products and platforms, particularly solutions
                        addressing concrete challenges in transport,
                        industry, communication and intelligent
                        automation.
                    </p>

                    <p>
                        I aim to combine technical expertise,
                        leadership and entrepreneurship to create
                        systems with sustainable value.
                    </p>
                </section>

                <blockquote class="about-quote">
                    <p>
                        “The greatest achievements are rarely
                        the result of a single effort.”
                    </p>

                    <cite>— Denos Kume</cite>
                </blockquote>

            </div>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
