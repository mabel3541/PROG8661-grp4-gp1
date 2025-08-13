/**
 * TechSummit 2024 - Main JavaScript File
 * Shared functionality across all pages
 */

// ==========================================
// GLOBAL UTILITY FUNCTIONS
// ==========================================

/**
 * Utility function to throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Animate counter numbers
 * @param {jQuery} element - Element containing the number
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in milliseconds
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            clearInterval(timer);
            start = target;
        }
        element.text(Math.floor(start).toLocaleString());
    }, 16);
}

/**
 * Check if element is in viewport
 * @param {jQuery} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element) {
    const rect = element[0].getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

$(document).ready(function() {
    'use strict';

    // ==========================================
    // NAVIGATION FUNCTIONALITY
    // ==========================================
    
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const navMenu = $('#nav-menu');
    const navLinks = $('.nav-link');

    // Mobile navigation toggle
    hamburger.on('click', function() {
        $(this).toggleClass('active');
        navMenu.toggleClass('active');
        $('body').toggleClass('nav-open');
    });

    // Close mobile nav when clicking on link
    navLinks.on('click', function() {
        hamburger.removeClass('active');
        navMenu.removeClass('active');
        $('body').removeClass('nav-open');
        
        // Update active link
        navLinks.removeClass('active');
        $(this).addClass('active');
    });

    // Navbar scroll effect
    const handleNavbarScroll = throttle(function() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 100) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    }, 16);

    $(window).on('scroll', handleNavbarScroll);

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'easeInOutQuart');
        }
    });


    // ==========================================
    // SHARED BUTTON INTERACTIONS
    // ==========================================
    
    const buttons = $('.btn');
    const registerBtns = $('.register-btn');

    // Enhanced button hover effects
    buttons.on('mouseenter', function() {
        $(this).addClass('hovered');
    }).on('mouseleave', function() {
        $(this).removeClass('hovered');
    });

    // Register button functionality (shared across pages)
    registerBtns.on('click', function(e) {
        e.preventDefault();
        showRegistrationModal();
    });

    // ==========================================
    // SHARED MODAL FUNCTIONALITY
    // ==========================================
    
    function showRegistrationModal() {
        const modal = $(`
            <div class="registration-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div class="modal-content" style="
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 90%;
                    text-align: center;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                ">
                    <h2 style="color: #6366f1; margin-bottom: 20px;">Registration</h2>
                    <p style="color: #64748b; margin-bottom: 30px;">
                        Thank you for your interest in TechSummit 2024! 
                        Registration opens soon. Stay tuned for updates!
                    </p>
                    <button class="btn btn-primary close-modal">Got it!</button>
                </div>
            </div>
        `);

        $('body').append(modal);
        
        // Animate in
        setTimeout(() => {
            modal.css('opacity', '1');
            modal.find('.modal-content').css('transform', 'scale(1)');
        }, 50);

        // Close modal functionality
        modal.on('click', function(e) {
            if (e.target === this || $(e.target).hasClass('close-modal')) {
                modal.css('opacity', '0');
                modal.find('.modal-content').css('transform', 'scale(0.9)');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    // ==========================================
    // SCROLL EFFECTS
    // ==========================================
    
    // Add scroll progress indicator
    const scrollProgress = $('<div class="scroll-progress"></div>');
    $('body').append(scrollProgress);
    
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .scroll-progress {
                position: fixed;
                top: 80px;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #6366f1, #14b8a6);
                z-index: 999;
                transition: width 0.1s ease;
            }
        `)
        .appendTo('head');

    const updateScrollProgress = throttle(function() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.css('width', scrollPercent + '%');
    }, 16);

    $(window).on('scroll', updateScrollProgress);

    // ==========================================
    // FORM ENHANCEMENTS
    // ==========================================
    
    // Add floating label effect to all inputs
    const inputs = $('input, textarea, select');
    
    inputs.each(function() {
        const $input = $(this);
        const $parent = $input.parent();
        
        if (!$parent.hasClass('form-group')) {
            $input.wrap('<div class="form-group"></div>');
        }
        
        // Add focus/blur handlers
        $input.on('focus', function() {
            $(this).parent().addClass('focused');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).parent().removeClass('focused');
            }
        });
        
        // Check if input has value on page load
        if ($input.val()) {
            $input.parent().addClass('focused');
        }
    });

    // ==========================================
    // PERFORMANCE OPTIMIZATIONS
    // ==========================================
    
    // Lazy load images when they come into viewport
    const lazyImages = $('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.each(function() {
            imageObserver.observe(this);
        });
    }

    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    
    // Keyboard navigation support
    $(document).on('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            $('.registration-modal').trigger('click');
        }
        
        // Enter key on buttons
        if (e.key === 'Enter' && $(e.target).hasClass('btn')) {
            $(e.target).trigger('click');
        }
    });

    // Focus management for mobile navigation
    hamburger.on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).trigger('click');
        }
    });


    // ==========================================
    // INITIALIZATION COMPLETE
    // ==========================================
    
    console.log('TechSummit 2024 - JavaScript loaded successfully! 🚀');
    
    // Trigger initial scroll events
    $(window).trigger('scroll');
    
});