// Enhanced Interactive Website Features
document.addEventListener('DOMContentLoaded', function () {

    // Animated counter for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;
                const time = value / speed;

                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value;
                }
            };
            animate();
        });
    }

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 1000);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Expandable solution features (multi-expand)
    const expandableFeatures = document.querySelectorAll('.expandable-feature');
    expandableFeatures.forEach(feature => {
        const header = feature.querySelector('.feature-header');
        header.addEventListener('click', () => {
            feature.classList.toggle('expanded');
        });
    });
    // Dual Progress Bar System (Large + Floating)
    function initProgressBars() {
        const largeProgressBar = document.querySelector('.journey-progress');
        const floatingProgressBar = document.querySelector('.journey-progress-floating');
        const navbar = document.querySelector('.nav');
        const sections = ['ideation', 'creation', 'implementation'];

        // Get both sets of progress steps
        const largeSteps = largeProgressBar.querySelectorAll('.progress-step');
        const floatingSteps = floatingProgressBar.querySelectorAll('.progress-step');
        const largeProgressLine = largeProgressBar.querySelector('.progress-line');
        const floatingProgressLine = floatingProgressBar.querySelector('.progress-line');

        // Get section elements
        const sectionElements = sections.map(id => document.getElementById(id));

        // Debouncing variables
        let scrollTimeout;
        let lastScrollY = window.scrollY;
        let isInJourneyArea = false;

        // Set navbar height CSS custom property
        function updateNavbarHeight() {
            if (navbar) {
                const navHeight = navbar.offsetHeight;
                document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
            }
        }

        updateNavbarHeight();

        function updateProgressBars() {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;

            // Check if we're within the design process section area
            const designProcessSection = document.getElementById('design-process');

            if (!designProcessSection) return;

            const designProcessTop = designProcessSection.offsetTop - 200;
            const designProcessBottom = designProcessSection.offsetTop + designProcessSection.offsetHeight;
            const wasInJourneyArea = isInJourneyArea;
            isInJourneyArea = scrollPosition >= designProcessTop && scrollPosition <= designProcessBottom;

            // Handle visibility transitions only when state changes
            if (isInJourneyArea !== wasInJourneyArea) {
                if (isInJourneyArea) {
                    // Hide large progress bar and show floating
                    largeProgressBar.classList.add('hidden');
                    floatingProgressBar.classList.add('visible');
                } else {
                    // Show large progress bar and hide floating
                    largeProgressBar.classList.remove('hidden');
                    floatingProgressBar.classList.remove('visible');
                }
            }

            // Update step highlighting (cumulative) for both bars
            let activeSteps = 0;

            sectionElements.forEach((section, index) => {
                if (section) {
                    const rect = section.getBoundingClientRect();

                    // Check if section has been scrolled past (cumulative activation)
                    if (rect.top <= viewportHeight / 2) {
                        activeSteps = index + 1;
                    }
                }
            });

            // Apply active state to both sets of steps
            [largeSteps, floatingSteps].forEach(stepSet => {
                stepSet.forEach((step, index) => {
                    const isActive = index < activeSteps;
                    step.classList.toggle('active', isActive);
                });
            });

            // Update both progress lines
            [largeProgressLine, floatingProgressLine].forEach(progressLine => {
                if (progressLine && activeSteps > 0) {
                    const progressPercentage = (activeSteps / sections.length) * 100;
                    progressLine.style.setProperty('--progress-width', `${progressPercentage}%`);
                }
            });
        }

        // Debounced scroll handler
        function handleScroll() {
            // Cancel previous timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Only update if scroll direction changed or significant movement
            const currentScrollY = window.scrollY;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);

            if (scrollDelta > 10) {
                updateProgressBars();
                lastScrollY = currentScrollY;
            }

            // Set timeout for final update
            scrollTimeout = setTimeout(() => {
                updateProgressBars();
                lastScrollY = window.scrollY;
            }, 50);
        }

        // Progress step click handlers for both bars
        function addClickHandlers(stepSet) {
            stepSet.forEach((step, index) => {
                step.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const sectionId = sections[index];
                    const targetSection = document.getElementById(sectionId);

                    if (targetSection) {
                        const navHeight = navbar ? navbar.offsetHeight : 0;
                        const targetPosition = targetSection.offsetTop - navHeight - 20;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        addClickHandlers(largeSteps);
        addClickHandlers(floatingSteps);

        // Initialize with proper state
        floatingProgressBar.classList.remove('visible'); // Ensure floating starts hidden
        largeProgressBar.classList.remove('hidden'); // Ensure large starts visible

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            updateNavbarHeight();
            updateProgressBars();
        });
        updateProgressBars();
    }

    // Initialize the dual progress bar system
    initProgressBars();

    // Enhanced scroll tracking
    function enhancedScrollTracking() {
        updateActiveNavLink();
    }

    window.addEventListener('scroll', enhancedScrollTracking);
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate offset for sticky navigation
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation link based on scroll position
    function updateActiveNavLink() {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        let currentSectionId = '';

        // Define all main sections in order
        const mainSections = [
            'overview',
            'challenge',
            'solution',
            'insights',
            'design-process',
            'future',
            'prototype',
            'reflections',
            'team'
        ];

        // Check each main section
        for (const sectionId of mainSections) {
            const section = document.getElementById(sectionId);
            if (!section) continue;

            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;

            // Check if we're in this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = sectionId;

                // Special handling for design-process section
                // Check if we're in a specific inner phase
                if (sectionId === 'design-process') {
                    const innerPhases = ['ideation', 'creation', 'implementation'];

                    for (const phaseId of innerPhases) {
                        const phaseElement = document.getElementById(phaseId);
                        if (!phaseElement) continue;

                        const phaseTop = phaseElement.offsetTop - navHeight - 50;
                        const phaseBottom = phaseTop + phaseElement.offsetHeight;

                        // If we're specifically in this phase area, keep design-process active
                        // but we could extend this logic if we wanted phase-specific highlighting
                        if (scrollPosition >= phaseTop && scrollPosition < phaseBottom) {
                            // Stay with design-process as the active section
                            break;
                        }
                    }
                }
                break;
            }
        }

        // Update active link styling
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize active link on page load
    updateActiveNavLink();

    // Add fade-in animation for sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards for animation
    const elementsToAnimate = document.querySelectorAll('.section, .insight-card, .feature, .challenge-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Design Process Phase Animation Observer
    const phaseObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe design process phases
    const phaseElements = document.querySelectorAll('.phase-content, .phase-image');
    phaseElements.forEach(element => {
        phaseObserver.observe(element);
    });

    // Add hover effects for interactive elements
    const cards = document.querySelectorAll('.insight-card, .feature, .challenge-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for placeholder buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // Show a placeholder message for demo buttons
                const message = document.createElement('div');
                message.textContent = 'Prototype link placeholder - replace with actual URL';
                message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #667eea;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    z-index: 9999;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                `;
                document.body.appendChild(message);

                setTimeout(() => {
                    document.body.removeChild(message);
                }, 2000);
            }
        });
    });
});