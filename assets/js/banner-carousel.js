document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.banner-carousel');

    if (!carousel) {
        return;
    }

    const slides = Array.from(
        carousel.querySelectorAll('.banner-slide')
    );
    const previousButton = carousel.querySelector(
        '.banner-previous'
    );
    const nextButton = carousel.querySelector(
        '.banner-next'
    );
    const pagination = carousel.querySelector(
        '.banner-pagination'
    );

    if (slides.length === 0) {
        return;
    }

    let currentIndex = 0;
    let autoPlayTimer = null;
    const autoPlayDelay = 5000;

    slides.forEach((slide, index) => {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className = 'banner-pagination-dot';
        dot.setAttribute(
            'aria-label',
            `Show banner ${index + 1}`
        );

        dot.addEventListener('click', () => {
            showSlide(index);
            restartAutoPlay();
        });

        pagination.appendChild(dot);
    });

    const dots = Array.from(
        pagination.querySelectorAll(
            '.banner-pagination-dot'
        )
    );

    function showSlide(index) {
        currentIndex = (
            index + slides.length
        ) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentIndex;

            slide.classList.toggle(
                'is-active',
                isActive
            );

            slide.setAttribute(
                'aria-hidden',
                String(!isActive)
            );
        });

        dots.forEach((dot, dotIndex) => {
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

    function stopAutoPlay() {
        if (autoPlayTimer !== null) {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function startAutoPlay() {
        stopAutoPlay();

        if (
            slides.length > 1
            && !window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
        ) {
            autoPlayTimer = window.setInterval(
                nextSlide,
                autoPlayDelay
            );
        }
    }

    function restartAutoPlay() {
        startAutoPlay();
    }

    previousButton?.addEventListener('click', () => {
        previousSlide();
        restartAutoPlay();
    });

    nextButton?.addEventListener('click', () => {
        nextSlide();
        restartAutoPlay();
    });

    carousel.addEventListener(
        'mouseenter',
        stopAutoPlay
    );

    carousel.addEventListener(
        'mouseleave',
        startAutoPlay
    );

    carousel.addEventListener(
        'focusin',
        stopAutoPlay
    );

    carousel.addEventListener(
        'focusout',
        startAutoPlay
    );

    showSlide(0);
    startAutoPlay();
});
