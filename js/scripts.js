// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95))';
        header.style.backdropFilter = 'blur(20px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.3)';
        header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
        header.querySelectorAll('a, .logo').forEach(el => {
            el.style.color = 'white';
        });
    } else {
        header.style.background = 'linear-gradient(135deg, rgba(26, 26, 46, 0.3), rgba(22, 33, 62, 0.3))';
        header.style.backdropFilter = 'blur(15px)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        header.querySelectorAll('a, .logo').forEach(el => {
            el.style.color = 'white';
        });
    }
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Configuring screenshots for each project
const projectScreenshots = {
    'notes-app': {
        // title: 'App de Notas - Screenshots',
        images: [
            {
                src: 'downloads/screenshots/main-screen.png',
                alt: 'Pantalla principal'
            },
            {
                src: 'downloads/screenshots/create-note.png',
                alt: 'Crear nota'
            },
            {
                src: 'downloads/screenshots/note-view.png',
                alt: 'Detalle de nota'
            },
            {
                src: 'downloads/screenshots/drawer-menu.png',
                alt: 'Menú lateral'
            },
            {
                src: 'downloads/screenshots/reminders.png',
                alt: 'Menú lateral'
            },
            {
                src: 'downloads/screenshots/archived-notes.png',
                alt: 'Menú lateral'
            },
            {
                src: 'downloads/screenshots/favorite-notes.png',
                alt: 'Menú lateral'
            }
        ]
    }
    // More projects can be added here
};

function openScreenshots(projectId) {
    const modal = document.getElementById('screenshot-modal');
    const content = document.getElementById('screenshot-content');
    const titleElement = document.querySelector('.screenshot-title');
    
    const project = projectScreenshots[projectId];
    if (!project) return;
    
    // Update title
    titleElement.textContent = project.title;
    
    // Clear previous content
    content.innerHTML = '';
    
    // Add images
    project.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'screenshot-img';
        img.title = image.alt;
        content.appendChild(img);
    });
    
    // Show modal (without blocking scroll)
    modal.style.display = 'block';
}

function closeScreenshots() {
    const modal = document.getElementById('screenshot-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside images
document.getElementById('screenshot-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeScreenshots();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeScreenshots();
    }
});
