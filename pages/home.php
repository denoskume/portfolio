<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$profilePhoto = BASE_PATH
    . '/assets/images/profile/denos-formal.jpg';
?>

<section class="home-compact">
    <div class="container home-compact-grid">

        <div class="home-compact-content reveal">

            <p class="home-compact-kicker">
                AI Engineering Portfolio
            </p>

            <h1>
                Machine Learning,
                Computer Vision and
                Image Processing.
            </h1>

            <p class="home-compact-lead">
                I am Denos Kume, a Master's student at
                École Centrale de Nantes, building practical
                intelligent systems from data, signals and images.
            </p>

            <div class="home-compact-actions">
                <a
                    href="<?= page_url('projects') ?>"
                    class="home-compact-primary"
                >
                    View projects
                </a>

                <a
                    href="<?= page_url('about') ?>"
                    class="home-compact-secondary"
                >
                    About me
                </a>

                <a
                    href="<?= page_url('contact') ?>"
                    class="home-compact-link"
                >
                    Contact
                </a>
            </div>

            <div class="home-compact-focus">
                <span>Machine Learning Engineer</span>
                <span>Computer Vision Engineer</span>
                <span>Image Processing Engineer</span>
            </div>

        </div>

        <aside class="home-compact-profile reveal">

            <div class="home-compact-photo">
                <?php if (is_file($profilePhoto)): ?>
                    <img
                        src="<?= asset(
                            'images/profile/denos-formal.jpg'
                        ) ?>"
                        alt="Formal portrait of Denos Kume"
                    >
                <?php else: ?>
                    <div class="home-compact-placeholder">
                        DK
                    </div>
                <?php endif; ?>
            </div>

            <div class="home-compact-card-content">
                <p>Featured achievement</p>

                <strong>91.15%</strong>

                <span>
                    Top-1 accuracy on ESC-50 using CLAP
                    and prompt engineering
                </span>

                <a href="<?= page_url('projects') ?>">
                    View project →
                </a>
            </div>

        </aside>

    </div>
</section>

<section class="home-compact-bottom">
    <div class="container home-compact-bottom-grid">

        <div>
            <span>Education</span>
            <strong>École Centrale de Nantes</strong>
        </div>

        <div>
            <span>Programme</span>
            <strong>
                Data Science, Signal and Image Processing
            </strong>
        </div>

        <div>
            <span>Location</span>
            <strong>France</strong>
        </div>

    </div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
