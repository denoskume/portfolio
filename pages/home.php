<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$bannerPath = BASE_PATH
    . '/assets/images/branding/home-banner.png';
?>

<section class="home-banner">

    <?php if (is_file($bannerPath)): ?>
        <img
            class="home-banner-image"
            src="<?= asset('images/branding/home-banner.png') ?>"
            alt="Denos Kume presenting an artificial intelligence project"
        >
    <?php else: ?>
        <div class="home-banner-placeholder">
            <strong>Home banner missing</strong>
            <span>
                Add home-banner.png to
                assets/images/branding/
            </span>
        </div>
    <?php endif; ?>

    <div class="home-banner-overlay"></div>

    <div class="container home-banner-content">

        <p class="home-banner-kicker">
            AI Engineering Portfolio
        </p>

        <h1>
            Engineering intelligent systems
            from data, signals and images.
        </h1>

        <p class="home-banner-description">
            Denos Kume · Master's Student at
            École Centrale de Nantes
        </p>

    </div>

    <div class="home-banner-caption">
        <span>Machine Learning</span>
        <span>Computer Vision</span>
        <span>Image Processing</span>
    </div>

</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
