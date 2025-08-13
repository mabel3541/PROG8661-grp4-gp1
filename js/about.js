/**
 * TechSummit 2024 - About Page JavaScript
 * About.html specific functionality
 */

$(document).ready(function() {
    'use strict';

    // ==========================================
    // TIMELINE ANIMATIONS
    // ==========================================
    
    const timelineItems = $('.timeline-item');
    
    // Animate timeline items on scroll
    const observeTimelineItems = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.each(function() {
            observer.observe(this);
        });
    };

    // Add CSS for timeline animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .timeline-item {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .timeline-item.animate-in {
                opacity: 1;
                transform: translateX(0);
            }
            .timeline-item:nth-child(even) {
                transform: translateX(50px);
            }
            .timeline-item:nth-child(even).animate-in {
                transform: translateX(0);
            }
        `)
        .appendTo('head');

    if (timelineItems.length > 0) {
        observeTimelineItems();
    }

    // ==========================================
    // MISSION CARDS ANIMATIONS
    // ==========================================
    
    const missionCards = $('.mission-card');
    
    // Add staggered animation to mission cards
    const observeMissionCards = () => {
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

        missionCards.each(function() {
            observer.observe(this);
        });
    };

    // Add CSS for mission cards animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .mission-card {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .mission-card.animate-in {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        `)
        .appendTo('head');

    if (missionCards.length > 0) {
        observeMissionCards();
    }

    // ==========================================
    // TEAM MEMBER INTERACTIONS
    // ==========================================
    
    const teamMembers = $('.team-member');
    
    // Add hover effects to team members
    teamMembers.on('mouseenter', function() {
        $(this).find('.member-social').addClass('show');
        $(this).addClass('hovered');
    }).on('mouseleave', function() {
        $(this).find('.member-social').removeClass('show');
        $(this).removeClass('hovered');
    });

    // Add CSS for team hover effects
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .team-member {
                transition: all 0.3s ease;
            }
            .team-member.hovered {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }
            .member-social {
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.3s ease;
            }
            .member-social.show {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    // ==========================================
    // VALUES SECTION COUNTER ANIMATION
    // ==========================================
    
    const valueItems = $('.value-item');
    
    // Animate value items on scroll
    const observeValueItems = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        // Animate the number
                        const numberElement = entry.target.querySelector('.value-number');
                        if (numberElement) {
                            numberElement.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                numberElement.style.transform = 'scale(1)';
                            }, 200);
                        }
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        valueItems.each(function() {
            observer.observe(this);
        });
    };

    // Add CSS for values animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .value-item {
                opacity: 0;
                transform: translateY(40px);
                transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .value-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            .value-number {
                transition: all 0.3s ease;
            }
        `)
        .appendTo('head');

    if (valueItems.length > 0) {
        observeValueItems();
    }

    // ==========================================
    // PARTNERS LOGO HOVER EFFECTS
    // ==========================================
    
    const partnerLogos = $('.partner-logo');
    
    // Add hover animations to partner logos
    partnerLogos.on('mouseenter', function() {
        $(this).addClass('hovered');
    }).on('mouseleave', function() {
        $(this).removeClass('hovered');
    });

    // Add CSS for partner hover effects
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .partner-logo {
                transition: all 0.3s ease;
                cursor: pointer;
            }
            .partner-logo.hovered {
                transform: scale(1.05);
                filter: brightness(1.1);
            }
        `)
        .appendTo('head');

    // ==========================================
    // STORY SECTION PARALLAX
    // ==========================================
    
    const storyVisual = $('.story-visual');
    
    // Add subtle parallax effect to story visual
    const handleStoryParallax = throttle(function() {
        const scrollTop = $(window).scrollTop();
        const storyOffset = storyVisual.offset();
        
        if (storyOffset && storyOffset.top < window.innerHeight + scrollTop) {
            const parallaxSpeed = (scrollTop - storyOffset.top) * 0.1;
            storyVisual.css('transform', `translateY(${parallaxSpeed}px)`);
        }
    }, 16);

    if (storyVisual.length > 0) {
        $(window).on('scroll', handleStoryParallax);
    }

    // ==========================================
    // ABOUT PAGE INITIALIZATION
    // ==========================================
    
    console.log('About.js - About page functionality loaded! 📖');
    
});