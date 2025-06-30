// DOM Hazır
document.addEventListener('DOMContentLoaded', function() {
    // 1. Tema Değiştirme
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', newTheme);
    });

    // 2. Canlı Takvim
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'tr',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        events: [
            {
                title: 'Robotik Workshop',
                start: new Date().toISOString().split('T')[0],
                color: '#4361ee'
            },
            {
                title: 'Kodlama Kampı',
                start: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
                color: '#7209b7'
            }
        ],
        eventClick: function(info) {
            alert('Etkinlik: ' + info.event.title);
        }
    });
    calendar.render();

    // 3. Mobil Menü
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 4. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // 5. Etkinlik Kartlarını Dinamik Yükle
    const events = [
        {
            title: "Robotik Workshop",
            date: "15 Ekim 2023",
            desc: "Temel robotik ve Arduino eğitimi",
            icon: "fas fa-robot"
        },
        {
            title: "Web Geliştirme Bootcamp",
            date: "22 Ekim 2023",
            desc: "HTML, CSS ve JS temelleri",
            icon: "fas fa-code"
        }
    ];

    const eventGrid = document.querySelector('.event-grid');
    events.forEach(event => {
        eventGrid.innerHTML += `
            <div class="event-card">
                <div class="event-icon">
                    <i class="${event.icon}"></i>
                </div>
                <h3>${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p>${event.desc}</p>
                <a href="#calendar" class="event-button">Detaylar</a>
            </div>
        `;
    });

    // 6. Sayfa Yüklendiğinde Tema Kontrolü
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});
