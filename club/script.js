// ===== TEMEL FONKSİYONLAR =====
// 1. Tema Değiştirme
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// 2. Mobil Menü Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) navLinks.style.display = 'flex';
});

// ===== SONRADAN EKLENENLER =====
// 3. Scroll Animasyonu (Section'ları belirginleştirir)
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// 4. Etkinlik Takvimi (JSON'dan veri çeker)
fetch('events/data.json')
    .then(response => response.json())
    .then(data => {
        const eventsContainer = document.getElementById('events-container');
        if (eventsContainer) {
            data.forEach(event => {
                eventsContainer.innerHTML += `
                    <div class="event-card">
                        <h3>${event.title}</h3>
                        <p>${event.date}</p>
                    </div>
                `;
            });
        }
    })
    .catch(error => console.error('JSON yüklenirken hata:', error));

// 5. Custom Cursor Efekti (Fareyi takip eden daire)
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.backgroundColor = 'var(--primary)';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transform = 'translate(-50%, -50%)';
cursor.style.opacity = '0.7';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// 6. Butonlara Tıklama Efekti (Ripple efekti)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 1000);
    });
});
