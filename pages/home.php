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
    aria-label="Portfolio presentation gallery"
>
    <div class="banner-carousel-viewport">

        <div class="banner-carousel-track">

            <?php foreach ($banners as $index => $banner): ?>
                <?php
                $absolutePath = BASE_PATH
                    . '/assets/'
                    . $banner;
                ?>

                <?php if (is_file($absolutePath)): ?>
                    <figure class="banner-slide">
                        <img
                            src="<?= asset($banner) ?>"
                            alt="Denos Kume professional presentation <?= $index + 1 ?>"
                            loading="<?= $index === 0 ? 'eager' : 'lazy' ?>"
                        >
                    </figure>
                <?php endif; ?>
            <?php endforeach; ?>

        </div>

    </div>

    <button
        class="banner-control banner-control-previous"
        type="button"
        aria-label="Previous banners"
    >
        ‹
    </button>

    <button
        class="banner-control banner-control-next"
        type="button"
        aria-label="Next banners"
    >
        ›
    </button>

    <div class="banner-pagination" aria-hidden="true"></div>
</section>

<?php require BASE_PATH . '/includes/footer.php'; ?>
