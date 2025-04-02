// DOM Elements
const detailsBtn = document.querySelector('.details-btn');
const cardDetails = document.querySelector('.card-details');
const competitionPhotos = document.querySelectorAll('.competition-photo');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.close-btn');

// Toggle Competition Details
detailsBtn.addEventListener('click', function() {
    cardDetails.classList.toggle('active');
    
    // Update button text
    this.textContent = cardDetails.classList.contains('active') 
        ? 'Detayları Gizle' 
        : 'Detayları Göster';
    
    // Smooth scroll to expanded section
    if (cardDetails.classList.contains('active')) {
        cardDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

// Lightbox Functionality
competitionPhotos.forEach(photo => {
    photo.addEventListener('click', () => {
        lightboxImg.src = photo.src;
        lightboxCaption.textContent = photo.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    });
});

// Close Lightbox
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Photo Hover Effect Enhancement
competitionPhotos.forEach(photo => {
    const container = photo.closest('.photo-container');
    
    container.addEventListener('mouseenter', () => {
        container.style.transform = 'scale(1.03)';
        container.style.zIndex = '10';
        container.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        container.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    container.addEventListener('mouseleave', () => {
        container.style.transform = 'scale(1)';
        container.style.zIndex = '1';
        container.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
    });
});

// Countdown Timer Functionality (Example for ROBOLIG)
function updateCountdown() {
    const now = new Date();
    const eventDate = new Date('2024-07-28'); // Set your competition date here
    const diff = eventDate - now;
    
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('robolig-countdown').textContent = 
            `${days}g ${hours}s ${minutes}d`;
        
        // Update progress bar (example)
        const totalDays = Math.ceil((eventDate - new Date('2024-01-01')) / (1000 * 60 * 60 * 24));
        const progress = ((totalDays - days) / totalDays) * 100;
        document.getElementById('robolig-progress').style.width = `${progress}%`;
    } else {
        document.getElementById('robolig-countdown').textContent = 'Yarışma Tamamlandı';
        document.getElementById('robolig-progress').style.width = '100%';
    }
}

// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 60000); // Update every minute

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});
