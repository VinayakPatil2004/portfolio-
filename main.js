// DOM Elements
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-links a');

// 1. Sticky Navbar & Active Link Update on Scroll
window.addEventListener('scroll', () => {
    // Navbar Background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update Active Link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === current) {
            a.classList.add('active');
        }
    });
});

// 2. Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// 3. Scroll Reveal Animation using Intersection Observer
const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

// Add 'hidden' class to elements we want to animate, then observe
const animatedElements = document.querySelectorAll('.section-title, .glass-panel, .timeline-item, .skill-category, .project-card, .contact-container, .cert-column');

animatedElements.forEach(el => {
    el.classList.add('hidden');
    revealObserver.observe(el);
});

// 4. Custom Mouse Tracker for Globs (Optional subtle interactive background)
const blobs = document.querySelectorAll('.blob');
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Very subtle tracking for the background blobs
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * -0.05;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// 5. Initialize Vanilla Tilt explicitly if not auto-loaded (though data-tilt auto initializes, it's safe to have here)
if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}
