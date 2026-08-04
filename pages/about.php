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
