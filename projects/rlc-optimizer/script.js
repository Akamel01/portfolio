/* =============================================================================
   RLC OPTIMIZATION PORTFOLIO - JAVASCRIPT
   Apple Keynote-style navigation, carousels, and interactions
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // SECTIONS & NAVIGATION
    // -------------------------------------------------------------------------
    const sections = document.querySelectorAll('.section, .hero');
    const carousels = document.querySelectorAll('.carousel');
    let currentSectionIndex = 0;
    let currentCarousel = null;

    // Create section navigation dots
    const createSectionNav = () => {
        const nav = document.createElement('nav');
        nav.className = 'section-nav';
        sections.forEach((section, index) => {
            const dot = document.createElement('button');
            dot.className = 'section-dot' + (index === 0 ? ' active' : '');
            dot.dataset.index = index;
            dot.addEventListener('click', () => scrollToSection(index));
            nav.appendChild(dot);
        });
        document.body.appendChild(nav);
    };

    // Create keyboard hint
    const createKeyboardHint = () => {
        const hint = document.createElement('div');
        hint.className = 'keyboard-hint';
        hint.innerHTML = '<span><kbd>↑</kbd><kbd>↓</kbd> Sections</span><span><kbd>←</kbd><kbd>→</kbd> Cards</span>';
        document.body.appendChild(hint);
    };

    createSectionNav();
    createKeyboardHint();

    // -------------------------------------------------------------------------
    // SECTION NAVIGATION
    // -------------------------------------------------------------------------
    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            currentSectionIndex = index;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            updateSectionDots();
        }
    };

    const scrollToNextSection = () => scrollToSection(currentSectionIndex + 1);
    const scrollToPrevSection = () => scrollToSection(currentSectionIndex - 1);

    const updateSectionDots = () => {
        document.querySelectorAll('.section-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSectionIndex);
        });
    };

    // Detect current section on scroll
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const index = Array.from(sections).indexOf(entry.target);
                if (index !== -1) {
                    currentSectionIndex = index;
                    updateSectionDots();

                    // Check if section has carousel
                    currentCarousel = entry.target.querySelector('.carousel');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // -------------------------------------------------------------------------
    // CAROUSEL CONTROLS
    // -------------------------------------------------------------------------
    const setupCarousels = () => {
        carousels.forEach(carousel => {
            const wrapper = carousel.closest('.carousel-wrapper');
            const prevBtn = wrapper?.querySelector('.carousel-nav.prev');
            const nextBtn = wrapper?.querySelector('.carousel-nav.next');
            const dots = document.querySelector(`.carousel-dots[data-carousel="${carousel.id}"]`);
            const items = carousel.querySelectorAll('.carousel-item');

            let currentIndex = 0;

            const scrollToItem = (index) => {
                if (index >= 0 && index < items.length) {
                    currentIndex = index;
                    items[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    updateDots();
                }
            };

            const updateDots = () => {
                if (dots) {
                    dots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentIndex);
                    });
                }
            };

            // Button handlers
            if (prevBtn) prevBtn.addEventListener('click', () => scrollToItem(currentIndex - 1));
            if (nextBtn) nextBtn.addEventListener('click', () => scrollToItem(currentIndex + 1));

            // Dot handlers
            if (dots) {
                dots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                    dot.addEventListener('click', () => scrollToItem(index));
                });
            }

            // Detect scroll position
            carousel.addEventListener('scroll', () => {
                const scrollLeft = carousel.scrollLeft;
                const itemWidth = items[0]?.offsetWidth || 1;
                currentIndex = Math.round(scrollLeft / itemWidth);
                updateDots();
            });

            // Store methods on carousel element
            carousel._scrollToItem = scrollToItem;
            carousel._currentIndex = () => currentIndex;
            carousel._itemCount = items.length;
        });
    };

    setupCarousels();

    // -------------------------------------------------------------------------
    // KEYBOARD NAVIGATION
    // -------------------------------------------------------------------------
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                scrollToNextSection();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                scrollToPrevSection();
                break;
            case 'ArrowRight':
                if (currentCarousel) {
                    e.preventDefault();
                    const idx = currentCarousel._currentIndex();
                    if (idx < currentCarousel._itemCount - 1) {
                        currentCarousel._scrollToItem(idx + 1);
                    }
                }
                break;
            case 'ArrowLeft':
                if (currentCarousel) {
                    e.preventDefault();
                    const idx = currentCarousel._currentIndex();
                    if (idx > 0) {
                        currentCarousel._scrollToItem(idx - 1);
                    }
                }
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;
        }
    });

    // -------------------------------------------------------------------------
    // MOBILE MENU
    // -------------------------------------------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // -------------------------------------------------------------------------
    // NAV LINK CLICK
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const index = Array.from(sections).indexOf(target);
                if (index !== -1) {
                    scrollToSection(index);
                } else {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // -------------------------------------------------------------------------
    // SCROLL REVEAL ANIMATIONS
    // -------------------------------------------------------------------------
    const autoRevealElements = document.querySelectorAll(
        '.problem-card, .flow-step, .tech-card, .challenge-card, ' +
        '.gallery-item, .skill-category, .section-header, .result-metric'
    );

    autoRevealElements.forEach(el => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-scale')) {
            el.classList.add('reveal');
        }
    });

    const allRevealElements = document.querySelectorAll('.reveal, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    allRevealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------------------
    // NAVBAR SCROLL EFFECT
    // -------------------------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // -------------------------------------------------------------------------
    // LIGHTBOX (Full-Screen Image Viewer)
    // -------------------------------------------------------------------------
    const createLightbox = () => {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <img class="lightbox-image" src="" alt="Full size image">
        `;
        document.body.appendChild(overlay);

        const lightboxImg = overlay.querySelector('.lightbox-image');
        const closeBtn = overlay.querySelector('.lightbox-close');

        // Open lightbox
        const openLightbox = (src, alt) => {
            lightboxImg.src = src;
            lightboxImg.alt = alt || 'Full size image';
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        // Close lightbox
        const closeLightbox = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Close handlers
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Attach to all images
        const clickableImages = document.querySelectorAll(
            '.framework-image, .gallery-item img, .carousel-item img, img[data-lightbox]'
        );
        clickableImages.forEach(img => {
            img.addEventListener('click', () => {
                openLightbox(img.src, img.alt);
            });
        });
    };

    createLightbox();

    console.log('🚦 RLC Portfolio (Apple Keynote-Style) loaded!');
});
