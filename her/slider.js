document.addEventListener('DOMContentLoaded', () => {
    const slideImg = document.getElementById('active-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('indicators');
    const sliderFrame = document.querySelector('.slider-frame');

    let currentIndex = 0;
    let autoPlayInterval;

    // Zoom and Pan State
    let scale = 1;
    let lastScale = 1;
    let posX = 0;
    let posY = 0;
    let lastPosX = 0;
    let lastPosY = 0;
    let startX = 0;
    let startY = 0;
    let initialDistance = 0;
    let isZooming = false;

    // Initialize Indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => updateSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    function resetZoom() {
        scale = 1;
        lastScale = 1;
        posX = 0;
        posY = 0;
        lastPosX = 0;
        lastPosY = 0;
        applyTransform();
    }

    function applyTransform(transition = true) {
        slideImg.style.transition = transition ? 'transform 0.3s ease' : 'none';
        slideImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    function updateSlide(index, direction = 'next') {
        if (index === currentIndex) return;

        resetZoom();

        // Apply animation class
        slideImg.className = direction === 'next' ? 'slide-in-right' : 'slide-in-left';

        // Force reflow
        void slideImg.offsetWidth;

        currentIndex = (index + images.length) % images.length;
        slideImg.src = images[currentIndex];

        // Update indicators
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });

        resetAutoPlay();
    }

    // Touch Handling
    sliderFrame.addEventListener('touchstart', (e) => {
        clearInterval(autoPlayInterval);

        if (e.touches.length === 2) {
            isZooming = true;
            initialDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
        } else if (e.touches.length === 1) {
            startX = e.touches[0].pageX - lastPosX;
            startY = e.touches[0].pageY - lastPosY;
        }
    }, { passive: false });

    sliderFrame.addEventListener('touchmove', (e) => {
        e.preventDefault();

        if (e.touches.length === 2 && isZooming) {
            const currentDistance = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );

            const deltaScale = currentDistance / initialDistance;
            scale = Math.min(Math.max(lastScale * deltaScale, 1), 5);
            applyTransform(false);
        } else if (e.touches.length === 1 && !isZooming) {
            if (scale > 1) {
                // Panning
                posX = e.touches[0].pageX - startX;
                posY = e.touches[0].pageY - startY;
                applyTransform(false);
            } else {
                // Horizontal Swipe detection (we'll handle end)
                posX = e.touches[0].pageX - startX;
                applyTransform(false);
            }
        }
    }, { passive: false });

    sliderFrame.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
            if (isZooming) {
                lastScale = scale;
                isZooming = false;
            }

            if (scale === 1) {
                // Handle Swipe
                const deltaX = posX;
                if (Math.abs(deltaX) > 100) {
                    updateSlide(currentIndex + (deltaX > 0 ? -1 : 1), deltaX > 0 ? 'prev' : 'next');
                } else {
                    resetZoom();
                }
            } else {
                lastPosX = posX;
                lastPosY = posY;
            }
        }
        startAutoPlay();
    });

    // Navigation Buttons
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1, 'next'));
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1, 'prev'));

    // Auto Play
    function startAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (scale === 1) { // Only auto-slide if not zoomed
                updateSlide(currentIndex + 1, 'next');
            }
        }, 5000);
    }

    function resetAutoPlay() {
        startAutoPlay();
    }

    // Preloading images for performance
    function preloadImages() {
        if (typeof images !== 'undefined') {
            images.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }
    }

    // Init
    if (typeof images !== 'undefined' && images.length > 0) {
        slideImg.src = images[0];
        createIndicators();
        preloadImages();
        startAutoPlay();
    }
});
