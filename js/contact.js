/**
 * TechSummit 2024 - Contact Page JavaScript
 * Contact.html specific functionality
 */

$(document).ready(function() {
    'use strict';

    // ==========================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ==========================================
    
    const contactForm = $('#contact-form');
    const submitBtn = $('#submit-btn');
    const formSuccess = $('#form-success');
    
    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be at least 2 characters and contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: false,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        inquiryType: {
            required: true,
            message: 'Please select an inquiry type'
        },
        subject: {
            required: true,
            minLength: 5,
            message: 'Subject must be at least 5 characters long'
        },
        message: {
            required: true,
            minLength: 20,
            message: 'Message must be at least 20 characters long'
        },
        privacy: {
            required: true,
            message: 'You must agree to the Privacy Policy and Terms of Service'
        }
    };

    // Validate individual field
    function validateField(fieldName, value) {
        const rule = validationRules[fieldName];
        if (!rule) return { isValid: true };

        // Check required
        if (rule.required && (!value || value.trim() === '')) {
            return { isValid: false, message: `${fieldName} is required` };
        }

        // Skip other validations if field is empty and not required
        if (!rule.required && (!value || value.trim() === '')) {
            return { isValid: true };
        }

        // Check minimum length
        if (rule.minLength && value.length < rule.minLength) {
            return { isValid: false, message: rule.message };
        }

        // Check pattern
        if (rule.pattern && !rule.pattern.test(value)) {
            return { isValid: false, message: rule.message };
        }

        return { isValid: true };
    }

    // Show field error
    function showFieldError(fieldName, message) {
        const errorElement = $(`#${fieldName}-error`);
        const inputElement = $(`#${fieldName}`);
        
        errorElement.text(message).show();
        inputElement.addClass('error');
    }

    // Clear field error
    function clearFieldError(fieldName) {
        const errorElement = $(`#${fieldName}-error`);
        const inputElement = $(`#${fieldName}`);
        
        errorElement.hide();
        inputElement.removeClass('error');
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = $(`#${fieldName}`);
        
        field.on('blur', function() {
            const validation = validateField(fieldName, $(this).val());
            
            if (!validation.isValid) {
                showFieldError(fieldName, validation.message);
            } else {
                clearFieldError(fieldName);
            }
        });

        field.on('input change', function() {
            if ($(this).hasClass('error')) {
                const validation = validateField(fieldName, $(this).val());
                if (validation.isValid) {
                    clearFieldError(fieldName);
                }
            }
        });
    });

    // Form submission
    contactForm.on('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        const formData = {};

        // Validate all fields
        Object.keys(validationRules).forEach(fieldName => {
            const field = $(`#${fieldName}`);
            let value;
            
            if (field.attr('type') === 'checkbox') {
                value = field.is(':checked');
            } else {
                value = field.val();
            }
            
            formData[fieldName] = value;
            
            const validation = validateField(fieldName, value);
            
            if (!validation.isValid) {
                showFieldError(fieldName, validation.message);
                isFormValid = false;
            } else {
                clearFieldError(fieldName);
            }
        });

        if (isFormValid) {
            // Show loading state
            submitBtn.addClass('loading');
            submitBtn.find('.btn-text').hide();
            submitBtn.find('.btn-loading').show();
            
            // Simulate form submission
            setTimeout(() => {
                // Hide form and show success message
                contactForm.parent().fadeOut(300, function() {
                    formSuccess.fadeIn(300);
                });
                
                console.log('Contact form submitted:', formData);
            }, 2000);
        }
    });

    // Add CSS for form validation states
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .form-input.error,
            .form-select.error,
            .form-textarea.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            .form-error {
                display: none;
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.5rem;
            }
            .btn.loading {
                pointer-events: none;
                opacity: 0.7;
            }
        `)
        .appendTo('head');

    // ==========================================
    // FAQ ACCORDION FUNCTIONALITY
    // ==========================================
    
    const faqItems = $('.faq-item');
    
    faqItems.each(function() {
        const question = $(this).find('.faq-question');
        const answer = $(this).find('.faq-answer');
        const icon = $(this).find('.faq-icon');
        
        question.on('click', function() {
            const isOpen = $(this).parent().hasClass('open');
            
            // Close all other FAQ items
            faqItems.removeClass('open');
            faqItems.find('.faq-answer').slideUp(300);
            faqItems.find('.faq-icon').text('+');
            
            // Toggle current item
            if (!isOpen) {
                $(this).parent().addClass('open');
                answer.slideDown(300);
                icon.text('−');
            }
        });
    });

    // Add CSS for FAQ animations
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .faq-answer {
                display: none;
                padding: 1rem 0;
            }
            .faq-question {
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                border-radius: 0.5rem;
            }
            .faq-question:hover {
                background-color: rgba(99, 102, 241, 0.05);
            }
            .faq-item.open .faq-question {
                background-color: rgba(99, 102, 241, 0.1);
            }
            .faq-icon {
                transition: all 0.3s ease;
                font-weight: bold;
                font-size: 1.2rem;
            }
        `)
        .appendTo('head');

    // ==========================================
    // CONTACT INFO CARD ANIMATIONS
    // ==========================================
    
    const contactInfoCards = $('.contact-info-card');
    
    // Add staggered animation to contact info cards
    const observeContactCards = () => {
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

        contactInfoCards.each(function() {
            observer.observe(this);
        });
    };

    // Add CSS for contact cards animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .contact-info-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .contact-info-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            .contact-info-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }
        `)
        .appendTo('head');

    if (contactInfoCards.length > 0) {
        observeContactCards();
    }

    // ==========================================
    // MAP FUNCTIONALITY
    // ==========================================
    
    const mapContainer = $('.map-container');
    const mapActions = $('.map-actions .btn');
    
    // Map action handlers
    mapActions.on('click', function(e) {
        e.preventDefault();
        const action = $(this).text().toLowerCase();
        
        if (action.includes('directions')) {
            // Simulate opening directions
            console.log('Opening directions to Moscone Center...');
            showMapNotification('Opening directions in your default maps app...');
        } else if (action.includes('google')) {
            // Simulate opening Google Maps
            console.log('Opening Google Maps...');
            showMapNotification('Opening location in Google Maps...');
        }
    });
    
    function showMapNotification(message) {
        const notification = $(`
            <div class="map-notification">
                ${message}
            </div>
        `);
        
        mapContainer.append(notification);
        
        setTimeout(() => {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // Add CSS for map notifications
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .map-notification {
                position: absolute;
                top: 1rem;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(99, 102, 241, 0.9);
                color: white;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                z-index: 10;
                animation: slideInDown 0.3s ease;
            }
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `)
        .appendTo('head');

    // ==========================================
    // TRANSPORT OPTIONS ANIMATIONS
    // ==========================================
    
    const transportItems = $('.transport-item');
    
    // Add hover effects to transport items
    transportItems.on('mouseenter', function() {
        $(this).addClass('highlighted');
    }).on('mouseleave', function() {
        $(this).removeClass('highlighted');
    });

    // Add CSS for transport animations
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .transport-item {
                transition: all 0.3s ease;
                padding: 1rem;
                border-radius: 0.5rem;
                cursor: pointer;
            }
            .transport-item.highlighted {
                background-color: rgba(99, 102, 241, 0.05);
                transform: translateX(10px);
            }
        `)
        .appendTo('head');

    // ==========================================
    // CONTACT PAGE INITIALIZATION
    // ==========================================
    
    console.log('Contact.js - Contact page functionality loaded! 📞');
    
});