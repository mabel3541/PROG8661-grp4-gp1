/**
 * TechSummit 2024 - Index Page JavaScript
 * Index.html specific functionality
 */

$(document).ready(function() {
    'use strict';

    // ==========================================
    // HERO SECTION ANIMATIONS
    // ==========================================
    
    const heroContent = $('.hero-content');
    const heroLines = $('.hero-line');
    const scrollIndicator = $('.scroll-indicator');

    // Parallax effect for hero background
    const handleHeroParallax = throttle(function() {
        const scrollTop = $(window).scrollTop();
        const heroHeight = $('.hero').outerHeight();
        
        if (scrollTop < heroHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            $('.hero-background').css('transform', `translateY(${parallaxSpeed}px)`);
        }
    }, 16);

    $(window).on('scroll', handleHeroParallax);

    // Hide scroll indicator on scroll
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 100) {
            scrollIndicator.fadeOut(300);
        } else {
            scrollIndicator.fadeIn(300);
        }
    });

    // ==========================================
    // STATS COUNTER ANIMATION
    // ==========================================
    
    const statsSection = $('.stats-section');
    const statNumbers = $('.stat-number');
    let statsAnimated = false;

    const handleStatsAnimation = throttle(function() {
        if (!statsAnimated && isElementInViewport(statsSection[0])) {
            statsAnimated = true;
            
            statNumbers.each(function() {
                const $this = $(this);
                const target = parseInt($this.data('target'));
                animateCounter($this, target, 2500);
            });
        }
    }, 100);

    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    $(window).on('scroll', handleStatsAnimation);
    
    // Check if stats are in viewport on page load
    handleStatsAnimation();

    // ==========================================
    // FEATURE CARDS ANIMATIONS
    // ==========================================
    
    const featureCards = $('.feature-card');
    
    // Add staggered animation to feature cards
    const observeFeatureCards = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        featureCards.each(function() {
            observer.observe(this);
        });
    };

    // Add CSS class for animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .feature-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .feature-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    observeFeatureCards();

    // ==========================================
    // SPEAKERS CAROUSEL
    // ==========================================
    
    const speakersCarousel = $('.speakers-carousel');
    let isAutoPlaying = true;

    // Auto-rotate speakers (subtle effect)
    setInterval(function() {
        if (isAutoPlaying) {
            const speakers = speakersCarousel.find('.speaker-card');
            speakers.each(function(index) {
                setTimeout(() => {
                    $(this).addClass('highlight');
                    setTimeout(() => {
                        $(this).removeClass('highlight');
                    }, 1000);
                }, index * 500);
            });
        }
    }, 8000);

    // Add highlight effect CSS
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .speaker-card.highlight {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
            }
        `)
        .appendTo('head');

    // Pause auto-play on hover
    speakersCarousel.on('mouseenter', () => isAutoPlaying = false);
    speakersCarousel.on('mouseleave', () => isAutoPlaying = true);

    // ==========================================
    // INDEX-SPECIFIC BUTTON INTERACTIONS
    // ==========================================
    
    const learnMoreBtn = $('.learn-more-btn');

    // Learn more button functionality
    learnMoreBtn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('.features-section').offset().top - 80
        }, 1000, 'easeInOutQuart');
    });

    // ==========================================
    // INDEX PAGE INITIALIZATION
    // ==========================================
    
    console.log('Index.js - Index page functionality loaded!');
    
});