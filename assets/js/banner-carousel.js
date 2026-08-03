document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.banner-carousel');

    if (!carousel) {
        return;
    }

    const track = carousel.querySelector('.banner-carousel-track');
    const slides = Array.from(
        carousel.querySelectorAll('.banner-slide')
    );
    const previousButton = carousel.querySelector(
        '.banner-control-previous'
    );
    const nextButton = carousel.querySelector(
        '.banner-control-next'
    );
    const pagination = carousel.querySelector(
        '.banner-pagination'
    );

    if (!track || slides.length === 0) {
        return;
    }

    let currentIndex = 0;
    let autoPlayTimer = null;
    const autoPlayDelay = 4500;

    const visibleSlides = () => {
        if (window.innerWidth <= 620) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;
    };

    const maximumIndex = () => {
        return Math.max(0, slides.length - visibleSlides());
    };

    const slideStep = () => {
        if (slides.length < 2) {
            return 0;
        }

        const firstSlide = slides[0];
        const secondSlide = slides[1];

        return secondSlide.offsetLeft - firstSlide.offsetLeft;
    };

    const createPagination = () => {
        pagination.innerHTML = '';

        const pageCount = maximumIndex() + 1;

        for (let index = 0; index < pageCount; index += 1) {
            const dot = document.createElement('button');

            dot.type = 'button';
            dot.className = 'banner-pagination-dot';
            dot.setAttribute(
                'aria-label',
                `Show banner group ${index + 1}`
            );

            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                restartAutoPlay();
            });

            pagination.appendChild(dot);
        }
    };

    const updateCarousel = () => {
        const maxIndex = maximumIndex();

        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        const offset = currentIndex * slideStep();

        track.style.transform = `translateX(-${offset}px)`;

        const dots = pagination.querySelectorAll(
            '.banner-pagination-dot'
        );

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                'is-active',
                index === currentIndex
            );
        });
    };

    const next = () => {
        const maxIndex = maximumIndex();

        currentIndex =
            currentIndex >= maxIndex
                ? 0
                : currentIndex + 1;

        updateCarousel();
    };

    const previous = () => {
        const maxIndex = maximumIndex();

        currentIndex =
            currentIndex <= 0
                ? maxIndex
                : currentIndex - 1;

        updateCarousel();
    };

    const stopAutoPlay = () => {
        if (autoPlayTimer !== null) {
            window.clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    };

    const startAutoPlay = () => {
        stopAutoPlay();

        if (
            slides.length > visibleSlides()
            && !window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches
        ) {
            autoPlayTimer = window.setInterval(
                next,
                autoPlayDelay
            );
        }
    };

    const restartAutoPlay = () => {
        startAutoPlay();
    };

    previousButton?.addEventListener('click', () => {
        previous();
        restartAutoPlay();
    });

    nextButton?.addEventListener('click', () => {
        next();
        restartAutoPlay();
    });

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('focusin', stopAutoPlay);
    carousel.addEventListener('focusout', startAutoPlay);

    window.addEventListener('resize', () => {
        currentIndex = 0;
        createPagination();
        updateCarousel();
        restartAutoPlay();
    });

    createPagination();
    updateCarousel();
    startAutoPlay();
});
