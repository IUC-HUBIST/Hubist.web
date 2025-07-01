document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('hubist-theme', newTheme);
    });

    // Load Events
    const events = [
        {
            title: "Robotik Workshop",
            date: "15 Ekim 2023",
            desc: "Temel robotik ve Arduino eğitimi",
            img: "assets/img/events/workshop.jpg"
        }
    ];

    const eventContainer = document.getElementById('event-container');
    events.forEach(event => {
        eventContainer.innerHTML += `
            <div class="event-card">
                <img src="${event.img}" alt="${event.title}" loading="lazy">
                <h3>${event.title}</h3>
                <p class="date">${event.date}</p>
                <p>${event.desc}</p>
            </div>
        `;
    });

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
