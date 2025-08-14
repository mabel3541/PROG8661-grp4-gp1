/**
 * TechSummit 2024 - Login Page JavaScript
 * Login.html specific functionality
 */

$(document).ready(function() {
    'use strict';

    // ==========================================
    // FORM SWITCHING FUNCTIONALITY
    // ==========================================
    
    const loginFormContainer = $('#login-form-container');
    const signupFormContainer = $('#signup-form-container');
    const forgotFormContainer = $('#forgot-form-container');
    const formSuccess = $('#form-success');
    
    const signupLink = $('#signup-link');
    const signinLink = $('#signin-link');
    const forgotLink = $('#forgot-link');
    const backToLoginLink = $('#back-to-login');
    const successOkBtn = $('#success-ok');

    // Switch to signup form
    signupLink.on('click', function(e) {
        e.preventDefault();
        switchForm(loginFormContainer, signupFormContainer);
    });

    // Switch to signin form
    signinLink.on('click', function(e) {
        e.preventDefault();
        switchForm(signupFormContainer, loginFormContainer);
    });

    // Switch to forgot password form
    forgotLink.on('click', function(e) {
        e.preventDefault();
        switchForm(loginFormContainer, forgotFormContainer);
    });

    // Back to login form
    backToLoginLink.on('click', function(e) {
        e.preventDefault();
        switchForm(forgotFormContainer, loginFormContainer);
    });

    // Success OK button
    successOkBtn.on('click', function() {
        switchForm(formSuccess, loginFormContainer);
    });

    function switchForm(fromForm, toForm) {
        fromForm.fadeOut(300, function() {
            toForm.fadeIn(300);
        });
    }

    // ==========================================
    // PASSWORD TOGGLE FUNCTIONALITY
    // ==========================================
    
    const passwordToggles = $('.password-toggle');
    
    passwordToggles.on('click', function(e) {
        e.preventDefault();
        const passwordInput = $(this).siblings('input[type="password"], input[type="text"]');
        const toggleIcon = $(this).find('.toggle-icon');
        
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            toggleIcon.text('🙈');
        } else {
            passwordInput.attr('type', 'password');
            toggleIcon.text('👁');
        }
    });

    // ==========================================
    // LOGIN FORM VALIDATION & SUBMISSION
    // ==========================================
    
    const loginForm = $('#login-form');
    const loginSubmit = $('#login-submit');
    
    // Login validation rules
    const loginValidationRules = {
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        password: {
            required: true,
            minLength: 6,
            message: 'Password must be at least 6 characters long'
        }
    };

    // Login form submission
    loginForm.on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#email').val();
        const password = $('#password').val();
        const remember = $('#remember').is(':checked');
        
        if (validateLoginForm(email, password)) {
            // Show loading state
            loginSubmit.addClass('loading');
            loginSubmit.find('.btn-text').hide();
            loginSubmit.find('.btn-loading').show();
            
            // Simulate login process
            setTimeout(() => {
                showSuccessMessage('Welcome Back!', 'You have successfully signed in to your account.');
                console.log('Login attempt:', { email, remember });
            }, 2000);
        }
    });

    function validateLoginForm(email, password) {
        let isValid = true;
        
        // Validate email
        if (!email || !loginValidationRules.email.pattern.test(email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearFieldError('email');
        }
        
        // Validate password
        if (!password || password.length < loginValidationRules.password.minLength) {
            showFieldError('password', loginValidationRules.password.message);
            isValid = false;
        } else {
            clearFieldError('password');
        }
        
        return isValid;
    }

    // ==========================================
    // SIGNUP FORM VALIDATION & SUBMISSION
    // ==========================================
    
    const signupForm = $('#signup-form');
    const signupSubmit = $('#signup-submit');
    
    // Signup validation rules
    const signupValidationRules = {
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
        signupEmail: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        signupPassword: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
        },
        confirmPassword: {
            required: true,
            message: 'Please confirm your password'
        },
        terms: {
            required: true,
            message: 'You must agree to the Terms of Service and Privacy Policy'
        }
    };

    // Signup form submission
    signupForm.on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#signupEmail').val(),
            password: $('#signupPassword').val(),
            confirmPassword: $('#confirmPassword').val(),
            company: $('#company').val(),
            terms: $('#terms').is(':checked'),
            newsletter: $('#newsletter').is(':checked')
        };
        
        if (validateSignupForm(formData)) {
            // Show loading state
            signupSubmit.addClass('loading');
            signupSubmit.find('.btn-text').hide();
            signupSubmit.find('.btn-loading').show();
            
            // Simulate signup process
            setTimeout(() => {
                showSuccessMessage('Account Created!', 'Your account has been created successfully. You can now sign in.');
                console.log('Signup attempt:', formData);
            }, 2000);
        }
    });

    function validateSignupForm(formData) {
        let isValid = true;
        
        // Validate each field
        Object.keys(signupValidationRules).forEach(fieldName => {
            const rule = signupValidationRules[fieldName];
            let value = formData[fieldName];
            
            if (fieldName === 'terms') {
                value = formData.terms;
            } else if (fieldName === 'confirmPassword') {
                value = formData.confirmPassword;
            }
            
            if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
                showFieldError(fieldName, `${getFieldLabel(fieldName)} is required`);
                isValid = false;
            } else if (value && rule.pattern && !rule.pattern.test(value)) {
                showFieldError(fieldName, rule.message);
                isValid = false;
            } else if (value && rule.minLength && value.length < rule.minLength) {
                showFieldError(fieldName, rule.message);
                isValid = false;
            } else {
                clearFieldError(fieldName);
            }
        });
        
        // Special validation for password confirmation
        if (formData.password !== formData.confirmPassword) {
            showFieldError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }
        
        return isValid;
    }

    // ==========================================
    // FORGOT PASSWORD FORM
    // ==========================================
    
    const forgotForm = $('#forgot-form');
    const forgotSubmit = $('#forgot-submit');
    
    forgotForm.on('submit', function(e) {
        e.preventDefault();
        
        const email = $('#resetEmail').val();
        
        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            // Show loading state
            forgotSubmit.addClass('loading');
            forgotSubmit.find('.btn-text').hide();
            forgotSubmit.find('.btn-loading').show();
            
            // Simulate reset process
            setTimeout(() => {
                showSuccessMessage('Reset Link Sent!', `Password reset instructions have been sent to ${email}`);
                console.log('Password reset requested for:', email);
            }, 2000);
        } else {
            showFieldError('resetEmail', 'Please enter a valid email address');
        }
    });

    // ==========================================
    // SOCIAL LOGIN FUNCTIONALITY
    // ==========================================
    
    const socialBtns = $('.social-btn');
    
    socialBtns.on('click', function(e) {
        e.preventDefault();
        const provider = $(this).find('span').text().toLowerCase();
        
        // Add loading animation
        $(this).addClass('loading');
        
        // Simulate social login
        setTimeout(() => {
            $(this).removeClass('loading');
            showSocialLoginNotification(`${provider} login is not available in this demo`);
            console.log(`${provider} login attempted`);
        }, 1500);
    });

    function showSocialLoginNotification(message) {
        const notification = $(`
            <div class="social-notification">
                ${message}
            </div>
        `);
        
        $('.login-content').prepend(notification);
        
        setTimeout(() => {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    function showFieldError(fieldName, message) {
        const errorElement = $(`#${fieldName}-error`);
        const inputElement = $(`#${fieldName}`);
        
        if (errorElement.length) {
            errorElement.text(message).show();
        }
        if (inputElement.length) {
            inputElement.addClass('error');
        }
    }

    function clearFieldError(fieldName) {
        const errorElement = $(`#${fieldName}-error`);
        const inputElement = $(`#${fieldName}`);
        
        if (errorElement.length) {
            errorElement.hide();
        }
        if (inputElement.length) {
            inputElement.removeClass('error');
        }
    }

    function getFieldLabel(fieldName) {
        const labels = {
            firstName: 'First name',
            lastName: 'Last name',
            signupEmail: 'Email',
            signupPassword: 'Password',
            confirmPassword: 'Confirm password',
            terms: 'Terms agreement'
        };
        return labels[fieldName] || fieldName;
    }

    function showSuccessMessage(title, message) {
        $('#success-title').text(title);
        $('#success-message').text(message);
        
        // Hide current form and show success
        $('.login-form-container:visible').fadeOut(300, function() {
            formSuccess.fadeIn(300);
        });
        
        // Reset loading states
        $('.login-submit').removeClass('loading');
        $('.login-submit .btn-text').show();
        $('.login-submit .btn-loading').hide();
    }

    // ==========================================
    // FLOATING SHAPES ANIMATION
    // ==========================================
    
    const shapes = $('.shape');
    
    // Add random movement to floating shapes
    shapes.each(function(index) {
        const shape = $(this);
        const animationDelay = index * 2000;
        
        setInterval(() => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            const randomRotation = Math.random() * 360;
            
            shape.css({
                'transform': `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`,
                'transition': 'transform 3s ease-in-out'
            });
        }, 6000 + animationDelay);
    });

    // ==========================================
    // FORM INPUT ENHANCEMENTS
    // ==========================================
    
    // Add floating label effect
    const formInputs = $('.form-input');
    
    formInputs.on('focus', function() {
        $(this).closest('.form-group').addClass('focused');
    });
    
    formInputs.on('blur', function() {
        if (!$(this).val()) {
            $(this).closest('.form-group').removeClass('focused');
        }
    });
    
    // Check for pre-filled inputs
    formInputs.each(function() {
        if ($(this).val()) {
            $(this).closest('.form-group').addClass('focused');
        }
    });

    // Add CSS for login page specific styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .form-input.error {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            .social-btn.loading {
                opacity: 0.7;
                pointer-events: none;
            }
            .social-notification {
                background: rgba(239, 68, 68, 0.9);
                color: white;
                padding: 0.75rem 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                font-size: 0.875rem;
                text-align: center;
                animation: slideInDown 0.3s ease;
            }
            .form-group.focused .form-label {
                color: var(--primary-color);
            }
        `)
        .appendTo('head');

    // ==========================================
    // LOGIN PAGE INITIALIZATION
    // ==========================================
    
    console.log('Login.js - Login page functionality loaded!');
    
});