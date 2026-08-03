<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$banners = [
    'images/branding/banner-01.png',
    'images/branding/banner-02.png',
    'images/branding/banner-03.png',
];
?>

<section
    class="banner-carousel"
    aria-label="Professional portfolio banners"
>
    <div class="banner-carousel-track">

        <?php foreach ($banners as $index => $banner): ?>
            <?php
            $absolutePath = BASE_PATH
                . '/assets/'
                . $banner;
            ?>

            <?php if (is_file($absolutePath)): ?>
                <figure
                    class="banner-slide <?= $index === 0 ? 'is-active' : '' ?>"
                    aria-hidden="<?= $index === 0 ? 'false' : 'true' ?>"
                >
                    <img
                        src="<?= asset($banner) ?>"
                        alt="Denos Kume professional banner <?= $index + 1 ?>"
                        loading="<?= $index === 0 ? 'eager' : 'lazy' ?>"
                    >
                </figure>
            <?php endif; ?>
        <?php endforeach; ?>

    </div>

    <button
        class="banner-control banner-previous"
        type="button"
        aria-label="Previous banner"
    >
        ‹
    </button>

    <button
        class="banner-control banner-next"
        type="button"
        aria-label="Next banner"
    >
        ›
    </button>

    <div
        class="banner-pagination"
        aria-label="Banner navigation"
    ></div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
