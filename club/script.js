// DOM Yüklendikten Sonra Çalışacak Kodlar
document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobil Menü Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Mobil menüyü kapat
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    });

    // 3. Etkinlik Takvimi Dinamik Yüklenmesi
    const loadCalendar = () => {
        const calendar = document.querySelector('.calendar');
        if (!calendar) return;
        
        // Burada API'den veri çekebilirsiniz (örnek: Google Calendar API)
        // Şimdilik placeholder'ı değiştirelim
        calendar.innerHTML = `
            <div class="calendar-grid">
                ${Array.from({length: 12}, (_, i) => `
                    <div class="month">
                        <h4>${['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran',
                               'Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'][i]}</h4>
                        <div class="days">
                            ${Array.from({length: 30}, (_, d) => `
                                <div class="day ${d % 7 === 0 ? 'event-day' : ''}">
                                    ${d + 1}
                                    ${d % 7 === 0 ? '<span class="event-tooltip">Workshop</span>' : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    // 4. Kartlara Hover Efekti
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        });
    });

    // 5. Form Gönderimi (İletişim formu eklerseniz)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajınız alındı! En kısa sürede dönüş yapacağız.');
            this.reset();
        });
    }

    // 6. Sayfa Scroll Animasyonları
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Navbar'a scroll'da gölge ekle
        if (scrollPosition > 50) {
            document.querySelector('.navbar').style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            document.querySelector('.navbar').style.boxShadow = 'none';
        }
    });

    // Takvimi yükle
    loadCalendar();
});

// AOS Animasyon Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out-quad'
    });
}
// Google Calendar API entegrasyonu örneği
async function loadRealCalendar() {
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/[CALENDAR_ID]/events?key=[API_KEY]');
    const data = await response.json();
    console.log(data.items); // Etkinlikleri işle
}
// Tema değiştirme butonu ekleyin
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '🌙';
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
