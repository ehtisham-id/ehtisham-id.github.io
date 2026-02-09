// Particle Canvas Animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.5)' : 'rgba(124, 58, 237, 0.5)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const particle of particles) {
        particle.update();
        particle.draw();
    }
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Navigation Scroll Effect
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Project Category Expand/Collapse
const expandBtns = document.querySelectorAll('.expand-btn');

expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const projectsGrid = document.getElementById(targetId);
        
        btn.classList.toggle('active');
        projectsGrid.classList.toggle('expanded');
        
        const btnText = btn.querySelector('span');
        if (projectsGrid.classList.contains('expanded')) {
            btnText.textContent = 'Hide Projects';
        } else {
            btnText.textContent = 'View Projects';
        }
    });
});

// Terminal Typing Animation
const commands = [
    'ls -la projects/',
    'cat security-audit.log',
    'docker-compose up -d',
    'npm run build',
    'git push origin main'
];

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeCommand() {
    const cursor = document.querySelector('.typing-cursor');
    if (!cursor) return;
    
    const currentCommand = commands[commandIndex];
    
    if (!isDeleting && charIndex < currentCommand.length) {
        cursor.textContent = currentCommand.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        cursor.textContent = currentCommand.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else if (!isDeleting && charIndex === currentCommand.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        commandIndex = (commandIndex + 1) % commands.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeCommand, typingSpeed);
}

setTimeout(typeCommand, 1000);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .tech-category, .stat-item, .contact-link').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-visual');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Copy to Clipboard (for contact info)
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.href || link.href.startsWith('mailto:')) return;
        
        const value = link.querySelector('.contact-value')?.textContent;
        if (value && !link.href.startsWith('http')) {
            e.preventDefault();
            navigator.clipboard.writeText(value).then(() => {
                const originalText = link.querySelector('.contact-label').textContent;
                link.querySelector('.contact-label').textContent = 'Copied!';
                
                setTimeout(() => {
                    link.querySelector('.contact-label').textContent = originalText;
                }, 2000);
            });
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cursor Trail Effect (optional, performance-intensive)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', throttle((e) => {
    if (window.innerWidth < 768) return; // Disable on mobile
    
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
}, 50));

// Add loading animation complete
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('%c👋 Hey there!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cLooking at the code? I like your style.', 'font-size: 14px; color: #7c3aed;');
console.log('%cLet\'s connect: https://github.com/ehtisham-id', 'font-size: 12px; color: #a0a0b0;');