// script.js

document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    /* --- Navbar Scroll Effect & Active Link Highlighting --- */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Navbar styling on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting based on section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* --- Typing Effect --- */
    const roles = ["Front-End Developer", "Tech Enthusiast", "Public Speaker", "Problem Solver"];
    const typingText = document.getElementById("typing-text");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect slightly after load
    setTimeout(typeEffect, 1000);


    /* --- Intersection Observer for Scroll Animations --- */
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-right, .fade-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Optional: Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    /* --- Form Submission Logic --- */
    const contactForm = document.querySelector('.contact-form');
    let submitted = false;
    const hiddenIframe = document.getElementById('hidden_iframe');
    const modal = document.getElementById('submission-modal');
    const closeBtns = document.querySelectorAll('.close-modal, .close-btn');

    if(contactForm && hiddenIframe) {
        contactForm.addEventListener('submit', () => {
            submitted = true;
            const btn = contactForm.querySelector('.submit-btn');
            btn.textContent = 'Sending...';
        });

        hiddenIframe.addEventListener('load', () => {
            if(submitted) {
                // Show modal
                modal.classList.add('show');
                
                // Reset form and button
                contactForm.reset();
                submitted = false;
                const btn = contactForm.querySelector('.submit-btn');
                btn.textContent = 'Send Message';
            }
        });
    }

    if (modal) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        });

        // Close when clicking outside of modal
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    /* --- Resume Modal Logic --- */
    const resumeModal = document.getElementById('resume-modal');
    const viewResumeBtn = document.getElementById('view-resume-btn');
    const closeResumeBtn = document.querySelector('.close-resume-modal');

    if(viewResumeBtn && resumeModal) {
        viewResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resumeModal.classList.add('show');
        });
        
        closeResumeBtn.addEventListener('click', () => {
            resumeModal.classList.remove('show');
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('show');
            }
        });
    }
});
