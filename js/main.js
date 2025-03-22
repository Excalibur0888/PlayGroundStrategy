/**
 * PlayGroundStrategy - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Add active class to current nav item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.click();
                }
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let hasError = false;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                // Remove existing error messages
                const existingError = field.nextElementSibling;
                if (existingError && existingError.classList.contains('error-message')) {
                    existingError.remove();
                }
                
                if (!field.value.trim()) {
                    e.preventDefault();
                    hasError = true;
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'This field is required';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    field.classList.add('error');
                } else if (field.type === 'email' && !isValidEmail(field.value.trim())) {
                    e.preventDefault();
                    hasError = true;
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please enter a valid email address';
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // If no errors and it's a contact form, redirect to thanks page
            if (!hasError && form.classList.contains('contact-form')) {
                e.preventDefault();
                window.location.href = 'thanks.html';
            }
        });
    });
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) {
        const newBackToTopButton = document.createElement('button');
        newBackToTopButton.className = 'back-to-top';
        newBackToTopButton.innerHTML = '<img src="images/icons/arrow-up.svg" alt="Back to top" class="icon">';
        document.body.appendChild(newBackToTopButton);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                newBackToTopButton.classList.add('visible');
            } else {
                newBackToTopButton.classList.remove('visible');
            }
        });
        
        newBackToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // FAQ Accordion (if present)
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        
        if (question) {
            question.addEventListener('click', function() {
                const answer = item.querySelector('.faq__answer');
                const isOpen = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    const faqAnswer = faqItem.querySelector('.faq__answer');
                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = null;
                    }
                });
                
                // Open clicked item if it was closed
                if (!isOpen) {
                    item.classList.add('active');
                    if (answer) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                }
            });
        }
    });
    
    // Table of contents for legal pages (if present)
    const tocLinks = document.querySelectorAll('.toc-link');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active TOC link
                tocLinks.forEach(tocLink => tocLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section in legal pages table of contents
    const legalSections = document.querySelectorAll('.legal-section');
    
    if (legalSections.length > 0) {
        window.addEventListener('scroll', function() {
            let currentSectionId = '';
            const scrollPosition = window.scrollY;
            
            legalSections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = '#' + section.getAttribute('id');
                }
            });
            
            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSectionId) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial');
    const testimonialDots = document.querySelectorAll('.testimonials__dot');
    const prevButton = document.querySelector('.testimonials__prev');
    const nextButton = document.querySelector('.testimonials__next');
    
    if (testimonialItems.length > 0) {
        let currentIndex = 0;
        
        // Set initial active dot and show first testimonial
        if (testimonialDots.length > 0) {
            testimonialDots[0].classList.add('active');
        }
        
        // Hide all testimonials except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        function showTestimonial(index) {
            // Hide all testimonials
            testimonialItems.forEach(item => {
                item.style.display = 'none';
            });
            
            // Show the selected testimonial
            testimonialItems[index].style.display = 'block';
            
            // Update dots
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }
        
        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        }
        
        // Add click handlers for navigation buttons
        if (nextButton) {
            nextButton.addEventListener('click', nextTestimonial);
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', prevTestimonial);
        }
        
        // Add click handlers for dots
        testimonialDots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showTestimonial(i);
            });
        });
        
        // Auto rotate testimonials
        let testimonialInterval = setInterval(nextTestimonial, 6000);
        
        // Pause rotation on hover
        const testimonialSection = document.querySelector('.testimonials');
        if (testimonialSection) {
            testimonialSection.addEventListener('mouseenter', () => {
                clearInterval(testimonialInterval);
            });
            
            testimonialSection.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 6000);
            });
        }
    }
});

// Animate elements when they come into view
window.addEventListener('load', function() {
    // Add animation classes to elements when they enter the viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkPosition() {
        animateElements.forEach(element => {
            const positionFromTop = element.getBoundingClientRect().top;
            
            if (positionFromTop - window.innerHeight <= 0) {
                element.classList.add('animate');
            }
        });
    }
    
    // Check positions initially
    checkPosition();
    
    // Check positions on scroll
    window.addEventListener('scroll', checkPosition);
});

// Premium Features Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.premium__tab-btn');
    const tabContents = document.querySelectorAll('.premium__tab-pane');
    
    if (tabs.length > 0 && tabContents.length > 0) {
        // Activate first tab by default
        tabs[0].classList.add('active');
        tabContents[0].classList.add('active');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and its content
                tab.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
});

// Dynamic event dates
document.addEventListener('DOMContentLoaded', function() {
    // Generate dates for upcoming events based on current date
    const currentDate = new Date();
    
    // Event dates data - can be configured as needed
    const eventDates = [
        { 
            dayOffset: 7, // First event: current date + 7 days
            title: "NFL Season Kickoff",
            description: "The NFL season begins with the defending champions taking on a top contender. Make sure your fantasy lineups are ready!",
            time: "8:20 PM ET",
            location: "Kansas City, MO",
            buttonText: null
        },
        { 
            dayOffset: 14, // Second event: current date + 14 days
            title: "Fantasy Strategy Webinar",
            description: "Join our team of experts as they break down the first week of action and provide strategic insights for Week 2 and beyond.",
            time: "7:00 PM ET",
            location: "Virtual Event",
            buttonText: "Register Now"
        },
        { 
            dayOffset: 30, // Third event: current date + 30 days
            title: "Trade Deadline Strategy Session",
            description: "Learn how to maximize your team's potential before your league's trade deadline with our expert-led strategy session.",
            time: "8:00 PM ET",
            location: "Virtual Event",
            buttonText: "Coming Soon"
        },
        { 
            dayOffset: 60, // Fourth event: current date + 60 days
            title: "Playoff Preparation Workshop",
            description: "Everything you need to know to prepare for your fantasy playoffs and bring home the championship trophy.",
            time: "7:30 PM ET",
            location: "Virtual Event",
            buttonText: "Remind Me"
        }
    ];
    
    const eventItems = document.querySelectorAll('.events__item');
    
    // If there are events on the page, update their dates
    if (eventItems.length > 0) {
        eventItems.forEach((item, index) => {
            if (index < eventDates.length) {
                const eventData = eventDates[index];
                
                // Calculate event date
                const eventDate = new Date(currentDate);
                eventDate.setDate(currentDate.getDate() + eventData.dayOffset);
                
                // Get month abbreviation
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                const monthAbbr = monthNames[eventDate.getMonth()];
                
                // Get day of month
                const day = eventDate.getDate();
                
                // Update the DOM
                const monthElem = item.querySelector('.events__month');
                const dayElem = item.querySelector('.events__day');
                
                if (monthElem) monthElem.textContent = monthAbbr;
                if (dayElem) dayElem.textContent = day;
                
                // Update title, description, time, location if needed
                const titleElem = item.querySelector('.events__title');
                const descriptionElem = item.querySelector('.events__description');
                const timeElem = item.querySelector('.events__time');
                const locationElem = item.querySelector('.events__location');
                const buttonElem = item.querySelector('.events__button');
                
                if (titleElem) titleElem.textContent = eventData.title;
                if (descriptionElem) descriptionElem.textContent = eventData.description;
                if (timeElem) timeElem.textContent = eventData.time;
                if (locationElem) locationElem.textContent = eventData.location;
                
                if (buttonElem && eventData.buttonText) {
                    buttonElem.textContent = eventData.buttonText;
                } else if (buttonElem && !eventData.buttonText) {
                    buttonElem.remove();
                }
            }
        });
    }
}); 