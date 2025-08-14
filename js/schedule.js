/**
 * TechSummit 2024 - Schedule Page JavaScript
 * Schedule.html specific functionality
 */

$(document).ready(function() {
    'use strict';

    // ==========================================
    // DAY NAVIGATION FUNCTIONALITY
    // ==========================================
    
    const dayTabs = $('.day-tab');
    const daySchedules = $('.day-schedule');
    
    // Handle day tab clicks
    dayTabs.on('click', function() {
        const selectedDay = $(this).data('day');
        
        // Update active tab
        dayTabs.removeClass('active');
        $(this).addClass('active');
        
        // Show corresponding schedule
        daySchedules.removeClass('active');
        $(`#${selectedDay}`).addClass('active');
        
        // Scroll to schedule content
        $('html, body').animate({
            scrollTop: $('.schedule-content').offset().top - 100
        }, 500, 'easeInOutQuart');
        
        // Analytics tracking
        console.log(`Day tab switched to: ${selectedDay}`);
    });

    // ==========================================
    // SESSION INTERACTIONS
    // ==========================================
    
    const addToCalendarBtns = $('.add-to-calendar');
    const sessionDetailsBtns = $('.session-details');
    const downloadScheduleBtn = $('.download-schedule');
    
    // Add to Calendar functionality
    addToCalendarBtns.on('click', function(e) {
        e.preventDefault();
        const sessionItem = $(this).closest('.session-item');
        const sessionTitle = sessionItem.find('.session-title').text();
        const sessionTime = sessionItem.closest('.session-block').find('.session-time').text();
        
        showCalendarModal(sessionTitle, sessionTime);
        
        // Add loading animation
        $(this).addClass('loading');
        setTimeout(() => {
            $(this).removeClass('loading');
        }, 1000);
        
        console.log('Add to calendar clicked:', sessionTitle);
    });
    
    // Session Details functionality
    sessionDetailsBtns.on('click', function(e) {
        e.preventDefault();
        const sessionItem = $(this).closest('.session-item');
        const sessionTitle = sessionItem.find('.session-title').text();
        const sessionDescription = sessionItem.find('.session-description').text();
        const speakerName = sessionItem.find('.speaker-name').text();
        
        showSessionDetailsModal(sessionTitle, sessionDescription, speakerName);
        console.log('Session details clicked:', sessionTitle);
    });
    
    // Download Schedule functionality
    downloadScheduleBtn.on('click', function(e) {
        e.preventDefault();
        showDownloadModal();
        console.log('Download schedule clicked');
    });

    // ==========================================
    // MODAL FUNCTIONALITY
    // ==========================================
    
    function showCalendarModal(sessionTitle, sessionTime) {
        const modal = $(`
            <div class="schedule-modal" style="
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
                    <div class="modal-icon" style="
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #6366f1, #8b5cf6);
                        border-radius: 50%;
                        margin: 0 auto 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">📅</div>
                    <h2 style="color: #6366f1; margin-bottom: 20px;">Add to Calendar</h2>
                    <h3 style="margin-bottom: 10px; color: #1f2937;">${sessionTitle}</h3>
                    <p style="color: #6b7280; margin-bottom: 30px;">Time: ${sessionTime}</p>
                    <div class="calendar-options" style="display: grid; gap: 10px; margin-bottom: 20px;">
                        <button class="btn btn-primary calendar-option" data-type="google">Add to Google Calendar</button>
                        <button class="btn btn-secondary calendar-option" data-type="outlook">Add to Outlook</button>
                        <button class="btn btn-secondary calendar-option" data-type="apple">Add to Apple Calendar</button>
                        <button class="btn btn-secondary calendar-option" data-type="ics">Download ICS File</button>
                    </div>
                    <button class="btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `);

        $('body').append(modal);
        
        // Animate in
        setTimeout(() => {
            modal.css('opacity', '1');
            modal.find('.modal-content').css('transform', 'scale(1)');
        }, 50);

        // Handle calendar options
        modal.find('.calendar-option').on('click', function() {
            const calendarType = $(this).data('type');
            handleCalendarAdd(calendarType, sessionTitle, sessionTime);
            closeModal(modal);
        });

        // Close modal functionality
        modal.on('click', function(e) {
            if (e.target === this || $(e.target).hasClass('close-modal')) {
                closeModal(modal);
            }
        });
    }
    
    function showSessionDetailsModal(sessionTitle, sessionDescription, speakerName) {
        const modal = $(`
            <div class="schedule-modal" style="
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
                overflow-y: auto;
            ">
                <div class="modal-content" style="
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    max-width: 600px;
                    width: 90%;
                    margin: 20px;
                    transform: scale(0.9);
                    transition: transform 0.3s ease;
                ">
                    <div class="modal-icon" style="
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #14b8a6, #06b6d4);
                        border-radius: 50%;
                        margin: 0 auto 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">ℹ️</div>
                    <h2 style="color: #6366f1; margin-bottom: 20px;">Session Details</h2>
                    <h3 style="margin-bottom: 15px; color: #1f2937; line-height: 1.4;">${sessionTitle}</h3>
                    ${speakerName ? `<p style="color: #6366f1; font-weight: 600; margin-bottom: 20px;">Speaker: ${speakerName}</p>` : ''}
                    <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px; text-align: left;">${sessionDescription}</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button class="btn btn-primary notify-me">Notify Me</button>
                        <button class="btn btn-secondary close-modal">Close</button>
                    </div>
                </div>
            </div>
        `);

        $('body').append(modal);
        
        // Animate in
        setTimeout(() => {
            modal.css('opacity', '1');
            modal.find('.modal-content').css('transform', 'scale(1)');
        }, 50);

        // Handle notify me
        modal.find('.notify-me').on('click', function() {
            showNotification('✅ You will be notified about this session!', 'success');
            closeModal(modal);
        });

        // Close modal functionality
        modal.on('click', function(e) {
            if (e.target === this || $(e.target).hasClass('close-modal')) {
                closeModal(modal);
            }
        });
    }
    
    function showDownloadModal() {
        const modal = $(`
            <div class="schedule-modal" style="
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
                    <div class="modal-icon" style="
                        width: 60px;
                        height: 60px;
                        background: linear-gradient(135deg, #f59e0b, #f97316);
                        border-radius: 50%;
                        margin: 0 auto 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                    ">📄</div>
                    <h2 style="color: #6366f1; margin-bottom: 20px;">Download Schedule</h2>
                    <p style="color: #6b7280; margin-bottom: 30px;">Choose your preferred format to download the complete TechSummit 2024 schedule</p>
                    <div class="download-options" style="display: grid; gap: 10px; margin-bottom: 20px;">
                        <button class="btn btn-primary download-option" data-format="pdf">Download PDF</button>
                        <button class="btn btn-secondary download-option" data-format="ics">Download Calendar File</button>
                        <button class="btn btn-secondary download-option" data-format="json">Download JSON</button>
                    </div>
                    <button class="btn btn-secondary close-modal">Cancel</button>
                </div>
            </div>
        `);

        $('body').append(modal);
        
        // Animate in
        setTimeout(() => {
            modal.css('opacity', '1');
            modal.find('.modal-content').css('transform', 'scale(1)');
        }, 50);

        // Handle download options
        modal.find('.download-option').on('click', function() {
            const format = $(this).data('format');
            handleDownload(format);
            closeModal(modal);
        });

        // Close modal functionality
        modal.on('click', function(e) {
            if (e.target === this || $(e.target).hasClass('close-modal')) {
                closeModal(modal);
            }
        });
    }
    
    function closeModal(modal) {
        modal.css('opacity', '0');
        modal.find('.modal-content').css('transform', 'scale(0.9)');
        setTimeout(() => modal.remove(), 300);
    }

    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================
    
    function handleCalendarAdd(calendarType, sessionTitle, sessionTime) {
        // Simulate calendar integration
        const calendarNames = {
            google: 'Google Calendar',
            outlook: 'Outlook Calendar',
            apple: 'Apple Calendar',
            ics: 'ICS File'
        };
        
        showNotification(`✅ "${sessionTitle}" added to ${calendarNames[calendarType]}!`, 'success');
        console.log(`Added to ${calendarType} calendar:`, sessionTitle, sessionTime);
    }
    
    function handleDownload(format) {
        // Simulate download
        const formatNames = {
            pdf: 'PDF document',
            ics: 'Calendar file',
            json: 'JSON data'
        };
        
        showNotification(`📥 Schedule ${formatNames[format]} downloaded!`, 'success');
        console.log(`Downloaded schedule in ${format} format`);
    }
    
    function showNotification(message, type = 'info') {
        const notification = $(`
            <div class="schedule-notification" style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : '#6366f1'};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                z-index: 10001;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
                font-size: 14px;
                line-height: 1.4;
            ">${message}</div>
        `);
        
        $('body').append(notification);
        
        // Animate in
        setTimeout(() => {
            notification.css('transform', 'translateX(0)');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.css('transform', 'translateX(100%)');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // OVERVIEW CARDS ANIMATIONS
    // ==========================================
    
    const overviewCards = $('.overview-card');
    
    // Add staggered animation to overview cards
    const observeOverviewCards = () => {
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

        overviewCards.each(function() {
            observer.observe(this);
        });
    };

    // Add CSS for overview cards animation
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .overview-card {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .overview-card.animate-in {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        `)
        .appendTo('head');

    if (overviewCards.length > 0) {
        observeOverviewCards();
    }

    // ==========================================
    // SESSION HOVER EFFECTS
    // ==========================================
    
    const sessionItems = $('.session-item');
    
    // Add enhanced hover effects to session items
    sessionItems.on('mouseenter', function() {
        $(this).addClass('session-hovered');
        
        // Add ripple effect for keynote sessions
        if ($(this).hasClass('keynote')) {
            createRippleEffect($(this));
        }
    }).on('mouseleave', function() {
        $(this).removeClass('session-hovered');
    });
    
    function createRippleEffect(element) {
        const ripple = $('<div class="ripple-effect"></div>');
        element.append(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add CSS for session hover effects
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .session-item.session-hovered {
                z-index: 5;
            }
            .ripple-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');

    // ==========================================
    // SCHEDULE FILTER FUNCTIONALITY
    // ==========================================
    
    // Add filter buttons dynamically
    const filterContainer = $(`
        <div class="schedule-filters" style="
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        ">
            <button class="filter-btn active" data-filter="all">All Sessions</button>
            <button class="filter-btn" data-filter="keynote">Keynotes</button>
            <button class="filter-btn" data-filter="workshop">Workshops</button>
            <button class="filter-btn" data-filter="panel">Panels</button>
            <button class="filter-btn" data-filter="networking">Networking</button>
        </div>
    `);
    
    // Insert filter before schedule content
    $('.schedule-content .container').prepend(filterContainer);
    
    // Filter functionality
    $('.filter-btn').on('click', function() {
        const filterType = $(this).data('filter');
        
        // Update active filter button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter sessions
        if (filterType === 'all') {
            $('.session-item').fadeIn(300);
        } else {
            $('.session-item').fadeOut(200);
            setTimeout(() => {
                $(`.session-item.${filterType}`).fadeIn(300);
            }, 200);
        }
        
        console.log('Filter applied:', filterType);
    });
    
    // Add CSS for filter buttons
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .filter-btn {
                padding: 8px 16px;
                border: 2px solid #e5e7eb;
                background: white;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #6b7280;
            }
            .filter-btn:hover {
                border-color: #6366f1;
                color: #6366f1;
                transform: translateY(-2px);
            }
            .filter-btn.active {
                background: #6366f1;
                border-color: #6366f1;
                color: white;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
        `)
        .appendTo('head');

    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================
    
    $(document).on('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            $('.schedule-modal').trigger('click');
        }
        
        // Arrow keys for day navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = $('.day-tab.active');
            const tabs = $('.day-tab');
            const currentIndex = tabs.index(activeTab);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs.eq(newIndex).trigger('click');
        }
    });

    // ==========================================
    // SCHEDULE PAGE INITIALIZATION
    // ==========================================
    
    // Auto-scroll to current day (if today is within conference dates)
    const today = new Date();
    const conferenceStart = new Date('2024-09-15');
    const conferenceEnd = new Date('2024-09-17');
    
    if (today >= conferenceStart && today <= conferenceEnd) {
        const dayIndex = Math.floor((today - conferenceStart) / (1000 * 60 * 60 * 24));
        const targetTab = $('.day-tab').eq(dayIndex);
        if (targetTab.length) {
            targetTab.trigger('click');
        }
    }
    
    // Add smooth scroll behavior for all internal links
    $('a[href*="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800, 'easeInOutQuart');
        }
    });
    
    console.log('Schedule.js - Schedule page functionality loaded!');
    
});