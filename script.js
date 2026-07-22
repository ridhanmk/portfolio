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
    const roles = ["Frontend Developer", "Web Developer", "BCA Student", "AI + Web Developer"];
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

    /* --- Hero Scroll Animation & Canvas --- */
    const canvas = document.getElementById("hero-canvas");
    if (canvas) {
        const context = canvas.getContext("2d");
        const scrollSection = document.querySelector(".scroll-hero-section");
        const features = document.querySelectorAll(".hero-feature");
        const scrollIndicator = document.querySelector(".scroll-indicator");
        
        const frameCount = 240;
        const currentFrame = index => (`assets/images/herosection/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`);
        const images = [];

        // Set canvas dimensions based on typical aspect ratio, but we can make it resize
        canvas.width = 1920;
        canvas.height = 1080;

        // Preload all images and ensure smooth rendering
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        // Paint the first frame as soon as possible
        if (images[0].complete) {
            context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
        } else {
            images[0].addEventListener('load', () => {
                // Check if user is still at the top before drawing
                if (window.scrollY - scrollSection.offsetTop <= 0) {
                    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
                }
            });
        }

        // Scroll Logic
        window.addEventListener('scroll', () => {
            if (!scrollSection) return;
            
            const scrollTop = window.scrollY - scrollSection.offsetTop;
            const maxScrollTop = scrollSection.scrollHeight - window.innerHeight;
            
            if (scrollTop < 0) {
                requestAnimationFrame(() => updateCanvas(0));
                updateFeatures(0);
                if (scrollIndicator) scrollIndicator.classList.remove('hidden');
                return;
            }
            if (scrollTop > maxScrollTop) {
                requestAnimationFrame(() => updateCanvas(frameCount - 1));
                updateFeatures(1);
                if (scrollIndicator) scrollIndicator.classList.add('hidden');
                return;
            }

            const scrollFraction = scrollTop / maxScrollTop;
            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );

            requestAnimationFrame(() => updateCanvas(frameIndex));
            
            // Hide scroll indicator once scrolling starts
            if (scrollIndicator) {
                if (scrollFraction > 0.02) {
                    scrollIndicator.classList.add('hidden');
                } else {
                    scrollIndicator.classList.remove('hidden');
                }
            }

            // Feature Text Animations
            updateFeatures(scrollFraction);
        });

        function updateCanvas(index) {
            if(images[index]) {
                context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
            }
        }

        function updateFeatures(fraction) {
            // Divide the scroll space into 4 chunks (0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0)
            let activeIndex = 0;
            if (fraction < 0.25) activeIndex = 0;
            else if (fraction < 0.5) activeIndex = 1;
            else if (fraction < 0.75) activeIndex = 2;
            else activeIndex = 3;

            features.forEach((feature, index) => {
                if (index === activeIndex) {
                    feature.classList.add('active');
                    feature.classList.remove('inactive-up', 'inactive-down');
                } else if (index < activeIndex) {
                    feature.classList.remove('active', 'inactive-down');
                    feature.classList.add('inactive-up');
                } else {
                    feature.classList.remove('active', 'inactive-up');
                    feature.classList.add('inactive-down');
                }
            });
        }
    }
});
