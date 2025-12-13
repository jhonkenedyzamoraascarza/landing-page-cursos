// ===================================
// CAROUSEL - MULTI-CAROUSEL VERSION
// ===================================

(function () {
    'use strict';

    console.log('🎠 Carousel script loaded');

    function initCarousel(carouselId, dotsId, interval) {
        const carousel = document.getElementById(carouselId);
        const dotsContainer = document.getElementById(dotsId);

        if (!carousel || !dotsContainer) {
            console.error('❌ Carousel not found:', carouselId);
            return;
        }

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-item'));

        if (!track || slides.length === 0) {
            console.error('❌ Track or slides not found for:', carouselId);
            return;
        }

        console.log(`✅ ${carouselId}: Found ${slides.length} slides`);

        let currentIndex = 0;
        let isPaused = false;
        let intervalId = null;

        // Determine slides per view based on carousel type and screen size
        function getSlidesPerView() {
            if (carouselId === 'docentesCarousel') {
                // Teachers: 4 on desktop, 2 on tablet, 1 on mobile
                if (window.innerWidth >= 1024) return 4;
                if (window.innerWidth >= 640) return 2;
                return 1;
            } else {
                // Courses and Testimonials: 3 on desktop, 1 on mobile
                return window.innerWidth >= 768 ? 3 : 1;
            }
        }

        let slidesPerView = getSlidesPerView();
        const totalPages = Math.ceil(slides.length / slidesPerView);

        console.log(`📊 ${carouselId}: ${slidesPerView} per view | ${totalPages} pages`);

        // Create dots
        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot';
                dot.style.cssText = 'width: 12px; height: 12px; border-radius: 50%; background: #d1d5db; cursor: pointer; transition: all 0.3s;';
                dot.addEventListener('click', () => goToPage(i));
                dotsContainer.appendChild(dot);
            }
            updateDots();
        }

        // Update dots
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.style.background = '#2563eb';
                    dot.style.width = '12px';
                } else {
                    dot.style.background = '#d1d5db';
                    dot.style.width = '12px';
                }
            });
        }

        // Move carousel
        function moveCarousel() {
            const percentage = -(currentIndex * 100);
            track.style.transform = `translateX(${percentage}%)`;
            track.style.transition = 'transform 0.5s ease-in-out';
            updateDots();
            console.log(`🔄 ${carouselId}: Page ${currentIndex} | ${percentage}%`);
        }

        // Go to specific page
        function goToPage(pageIndex) {
            currentIndex = pageIndex % totalPages;
            moveCarousel();
        }

        // Next page
        function nextPage() {
            currentIndex = (currentIndex + 1) % totalPages;
            moveCarousel();
        }

        // Start autoplay
        function startAutoplay() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
                if (!isPaused) {
                    nextPage();
                }
            }, interval);
            console.log(`▶️ ${carouselId}: Autoplay started (${interval}ms)`);
        }

        // Pause/Resume handlers
        carousel.addEventListener('mouseenter', () => {
            isPaused = true;
            console.log(`⏸️ ${carouselId}: Paused`);
        });

        carousel.addEventListener('mouseleave', () => {
            isPaused = false;
            console.log(`▶️ ${carouselId}: Resumed`);
        });

        // Initialize
        createDots();
        moveCarousel();
        startAutoplay();

        console.log(`✅ ${carouselId}: Initialized successfully!`);
    }

    // Initialize all carousels when DOM is ready
    function initAllCarousels() {
        console.log('🚀 Initializing all carousels...');

        setTimeout(() => {
            // Courses carousel - 4 seconds
            initCarousel('cursosCarousel', 'cursosDots', 4000);

            // Teachers carousel - 5 seconds
            initCarousel('docentesCarousel', 'docentesDots', 5000);

            // Testimonials carousel - 6 seconds
            initCarousel('recomendacionesCarousel', 'recomendacionesDots', 6000);
        }, 300);
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCarousels);
    } else {
        initAllCarousels();
    }

})();
