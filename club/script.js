// Preloader
window.addEventListener('load', function() {
    document.querySelector('.preloader').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 500);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hubist-theme', newTheme);
    
    // İkon değişimi
    themeToggle.innerHTML = newTheme === 'light' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
    
    // Buton animasyonu
    themeToggle.style.transform = 'scale(1.1)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 200);
});

// FullCalendar Initialization
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'tr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        events: 'https://www.googleapis.com/calendar/v3/calendars/[CALENDAR_ID]/events?key=[YOUR_API_KEY]',
        eventClick: function(info) {
            const modal = createEventModal(info.event);
            document.body.appendChild(modal);
        },
        eventDisplay: 'block',
        eventColor: 'var(--primary)'
    });
    calendar.render();
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Body scroll lock
    document.body.style.overflow = navLinks.classList.contains('active') 
        ? 'hidden' 
        : 'auto';
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-in-out-quad'
});
