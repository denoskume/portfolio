<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$bannerPath = BASE_PATH . '/assets/images/branding/home-banner.png';
?>

<section class="home-banner">

    <?php if (is_file($bannerPath)): ?>
        <img
            class="home-banner-image"
            src="<?= asset('images/branding/home-banner.png') ?>"
            alt="Denos Kume presenting an artificial intelligence project"
        >
    <?php else: ?>
        <div class="home-banner-missing">
            Banner image missing
        </div>
    <?php endif; ?>

</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
