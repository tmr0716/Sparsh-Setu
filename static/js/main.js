/**
 * Sparsh Setu - Master Interactive JavaScript Suite
 * Handles Theme Toggling, Sticky Navbar, Scroll Progress, Mobile Menu,
 * Scroll Animations, Counter Animations, Testimonial Slider, FAQ Accordion,
 * Form Validation, and Toast Notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize feature modules
    initThemeToggle();
    initStickyNavbar();
    initScrollProgress();
    initMobileNav();
    initScrollReveal();
    initAnimatedCounters();
    initTestimonialSlider();
    initFaqAccordion();
    initBackToTop();
    initFormValidators();
    initGalleryFilterAndLightbox();
});

/* --------------------------------------------------------------------------
 * 1. Theme Toggle (Dark / Light Mode)
 * -------------------------------------------------------------------------- */
function initThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('sparsh_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeBtn, savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sparsh_theme', newTheme);
        updateThemeIcon(themeBtn, newTheme);
        
        showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* --------------------------------------------------------------------------
 * 2. Sticky Navbar Blur Effect
 * -------------------------------------------------------------------------- */
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
 * 3. Scroll Progress Bar
 * -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* --------------------------------------------------------------------------
 * 4. Mobile Navigation Menu Toggle
 * -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!toggleBtn || !navMenu) return;

    toggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close mobile nav when clicking any link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

/* --------------------------------------------------------------------------
 * 5. Intersection Observer Scroll Reveal
 * -------------------------------------------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
 * 6. Animated Counter Numbers
 * -------------------------------------------------------------------------- */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-number');
    if (!counters.length) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.innerText = Math.ceil(current) + '+';
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
 * 7. Testimonials Carousel Slider
 * -------------------------------------------------------------------------- */
function initTestimonialSlider() {
    const track = document.getElementById('testimonial-track');
    const dots = document.querySelectorAll('.slider-dot');
    if (!track || !dots.length) return;

    let currentIndex = 0;

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Auto rotate every 6 seconds
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % dots.length;
        goToSlide(nextIndex);
    }, 6000);
}

/* --------------------------------------------------------------------------
 * 8. FAQ Accordion Toggle
 * -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
 * 9. Back To Top Button Handler
 * -------------------------------------------------------------------------- */
function initBackToTop() {
    const topBtn = document.getElementById('back-to-top');
    if (!topBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --------------------------------------------------------------------------
 * 10. Client-Side Form Validation & Toast Feedback
 * -------------------------------------------------------------------------- */
function initFormValidators() {
    const forms = document.querySelectorAll('.js-validate-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const requiredInputs = form.querySelectorAll('[required]');

            requiredInputs.forEach(input => {
                const errorMsg = input.nextElementSibling;
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.innerText = 'This field is required.';
                        errorMsg.classList.add('visible');
                    }
                } else {
                    input.classList.remove('error');
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.classList.remove('visible');
                    }
                }

                // Email validation regex check
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.innerText = 'Please enter a valid email address.';
                            errorMsg.classList.add('visible');
                        }
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                showToast('Please fix the errors in the form before submitting.', 'danger');
            }
        });
    });
}

/* --------------------------------------------------------------------------
 * 11. Toast Notification System
 * -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'danger') iconClass = 'fa-exclamation-triangle';

    toast.innerHTML = `<i class="fas ${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* --------------------------------------------------------------------------
 * 12. Gallery Filter & Lightbox Functionality
 * -------------------------------------------------------------------------- */
function initGalleryFilterAndLightbox() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');

    if (filterBtns.length && items.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    if (lightbox) {
        const lightboxImg = lightbox.querySelector('.lightbox-content img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-overlay h4');
                if (img && lightboxImg) {
                    lightboxImg.src = img.src;
                    lightboxCaption.innerText = caption ? caption.innerText : '';
                    lightbox.classList.add('active');
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
}