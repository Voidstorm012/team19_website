// Enhanced Interactive Website Features
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Expandable solution features
    const expandableFeatures = document.querySelectorAll('.expandable-feature');
    expandableFeatures.forEach(feature => {
        const header = feature.querySelector('.feature-header');
        header.addEventListener('click', () => {
            const isExpanded = feature.classList.contains('expanded');
            
            // Close all other features
            expandableFeatures.forEach(f => f.classList.remove('expanded'));
            
            // Toggle current feature
            if (!isExpanded) {
                feature.classList.add('expanded');
            }
        });
    });
    
    // Progress indicator for weekly journey
    function updateProgressIndicator() {
        const sections = ['week1', 'week2', 'week3'];
        const steps = document.querySelectorAll('.progress-step');
        const progressLine = document.querySelector('.progress-line::after') || document.querySelector('.progress-line');
        
        let activeWeek = 1;
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                
                if (isVisible) {
                    activeWeek = index + 1;
                }
            }
        });
        
        // Update active step
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 <= activeWeek);
        });
        
        // Update progress line
        if (progressLine) {
            const progressPercentage = (activeWeek / 3) * 100;
            progressLine.style.setProperty('--progress-width', `${progressPercentage}%`);
        }
    }
    
    // Progress step click handlers
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const weekId = `week${index + 1}`;
            const targetSection = document.getElementById(weekId);
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced scroll tracking
    function enhancedScrollTracking() {
        updateActiveNavLink();
        updateProgressIndicator();
    }
    
    window.addEventListener('scroll', enhancedScrollTracking);
    
    // Initialize on load
    updateProgressIndicator();
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
        const sections = document.querySelectorAll('.section');
        const navHeight = document.querySelector('.nav').offsetHeight;
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update active link styling
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
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
    
    const observer = new IntersectionObserver(function(entries) {
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
    
    // Add hover effects for interactive elements
    const cards = document.querySelectorAll('.insight-card, .feature, .challenge-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click handlers for placeholder buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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