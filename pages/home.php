<?php

$pageTitle = SITE_TITLE;
$currentPage = 'home';

require BASE_PATH . '/includes/header.php';

$bannerCandidates = [
    'images/branding/banner-01.png',
    'images/branding/banner-02.png',
    'images/branding/banner-03.png',
];

$banners = array_values(
    array_filter(
        $bannerCandidates,
        static function (string $banner): bool {
            return is_file(
                BASE_PATH . '/assets/' . $banner
            );
        }
    )
);
?>

<section
    class="banner-carousel"
    data-banner-carousel
    aria-roledescription="carousel"
    aria-label="Professional portfolio banners"
>
    <?php if ($banners !== []): ?>

        <div class="banner-carousel-track">

            <?php foreach ($banners as $index => $banner): ?>
                <figure
                    class="banner-slide<?= $index === 0 ? ' is-active' : '' ?>"
                    data-banner-slide
                    aria-hidden="<?= $index === 0 ? 'false' : 'true' ?>"
                >
                    <img
                        src="<?= asset($banner) ?>"
                        alt="Denos Kume professional banner <?= $index + 1 ?>"
                        loading="<?= $index === 0 ? 'eager' : 'lazy' ?>"
                    >
                </figure>
            <?php endforeach; ?>

        </div>

        <?php if (count($banners) > 1): ?>
            <button
                class="banner-control banner-previous"
                data-banner-previous
                type="button"
                aria-label="Previous banner"
            >
                ‹
            </button>

            <button
                class="banner-control banner-next"
                data-banner-next
                type="button"
                aria-label="Next banner"
            >
                ›
            </button>

            <div
                class="banner-pagination"
                data-banner-pagination
                aria-label="Choose a banner"
            ></div>
        <?php endif; ?>

    <?php else: ?>

        <div class="banner-empty">
            <strong>No banner found</strong>

            <span>
                Add banner-01.png, banner-02.png and banner-03.png
                to assets/images/branding/
            </span>
        </div>

    <?php endif; ?>
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector(
        '[data-banner-carousel]'
    );

    if (!carousel) {
        return;
    }

    const slides = Array.from(
        carousel.querySelectorAll('[data-banner-slide]')
    );

    if (slides.length < 2) {
        return;
    }

    const previousButton = carousel.querySelector(
        '[data-banner-previous]'
    );

    const nextButton = carousel.querySelector(
        '[data-banner-next]'
    );

    const pagination = carousel.querySelector(
        '[data-banner-pagination]'
    );

    let currentIndex = 0;
    let timerId = null;
    const delay = 4000;

    const dots = slides.map(function (_, index) {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className = 'banner-pagination-dot';
        dot.setAttribute(
            'aria-label',
            'Display banner ' + (index + 1)
        );

        dot.addEventListener('click', function () {
            showSlide(index);
            restart();
        });

        pagination.appendChild(dot);

        return dot;
    });

    function showSlide(index) {
        currentIndex = (
            index + slides.length
        ) % slides.length;

        slides.forEach(function (slide, slideIndex) {
            const active = slideIndex === currentIndex;

            slide.classList.toggle('is-active', active);
            slide.setAttribute(
                'aria-hidden',
                active ? 'false' : 'true'
            );
        });

        dots.forEach(function (dot, dotIndex) {
            dot.classList.toggle(
                'is-active',
                dotIndex === currentIndex
            );
        });
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    function stop() {
        if (timerId !== null) {
            window.clearInterval(timerId);
            timerId = null;
        }
    }

    function start() {
        stop();

        timerId = window.setInterval(
            nextSlide,
            delay
        );
    }

    function restart() {
        start();
    }

    previousButton.addEventListener(
        'click',
        function () {
            previousSlide();
            restart();
        }
    );

    nextButton.addEventListener(
        'click',
        function () {
            nextSlide();
            restart();
        }
    );

    document.addEventListener(
        'visibilitychange',
        function () {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        }
    );

    showSlide(0);
    start();

    console.info(
        'Banner carousel started with',
        slides.length,
        'images.'
    );
});
</script>

<?php require BASE_PATH . '/includes/footer.php'; ?>
