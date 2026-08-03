<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$profilePhoto = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="magazine-home">
    <div class="container">

        <article class="magazine-cover reveal">

            <header class="magazine-masthead">
                <div class="magazine-brand">
                    <span>DK</span>

                    <strong>
                        AI Engineering Portfolio
                    </strong>
                </div>

                <div class="magazine-issue">
                    <span>Portfolio Edition</span>
                    <strong>2026</strong>
                </div>
            </header>

            <div class="magazine-rule"></div>

            <div class="magazine-layout">

                <div class="magazine-story">

                    <p class="magazine-category">
                        Machine Learning · Computer Vision ·
                        Image Processing
                    </p>

                    <h1>
                        Engineering
                        intelligent systems
                        with purpose.
                    </h1>

                    <p class="magazine-introduction">
                        I am Denos Kume, a Master's student at
                        École Centrale de Nantes, developing expertise
                        in artificial intelligence, signal processing
                        and visual computing.
                    </p>

                    <div class="magazine-byline">
                        <span>Profile</span>

                        <strong>
                            Data Science, Signal and
                            Image Processing
                        </strong>
                    </div>

                </div>

                <figure class="magazine-portrait">

                    <?php if (is_file($profilePhoto)): ?>
                        <img
                            src="<?= asset(
                                'images/profile/denos-formal.jpg'
                            ) ?>"
                            alt="Formal portrait of Denos Kume"
                        >
                    <?php else: ?>
                        <div class="magazine-photo-placeholder">
                            <strong>DK</strong>
                            <span>Formal portrait</span>
                        </div>
                    <?php endif; ?>

                    <figcaption>
                        <strong>Denos Kume</strong>
                        <span>AI Engineering Portfolio</span>
                    </figcaption>

                </figure>

            </div>

            <div class="magazine-rule"></div>

            <footer class="magazine-cover-footer">
                <p>
                    Exploring AI through data, signals and images.
                </p>

                <span>
                    France · 2026
                </span>
            </footer>

        </article>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
