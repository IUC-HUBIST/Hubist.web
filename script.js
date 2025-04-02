document.addEventListener('DOMContentLoaded', () => {
    // Yarışma verileri
    const competitions = [
        { 
            name: '2024 RoboLig Yarışması', 
            date: new Date('2024-07-28T00:00:00'),
            elements: {
                progress: document.getElementById('robolig-progress'),
                days: document.getElementById('robolig-days'),
                countdown: document.getElementById('robolig-countdown')
            }
        },
        { 
            name: 'SAVASAH IHA', 
            date: new Date('2024-08-22T00:00:00'),
            elements: {
                progress: document.getElementById('savasah-progress'),
                days: document.getElementById('savasah-days'),
                countdown: document.getElementById('savasah-countdown')
            }
        }
    ];

    // Ana sayaç elementleri
    const mainTimer = document.getElementById('timer');

    // Tarih formatlama fonksiyonu
    function formatDate(date) {
        return new Intl.DateTimeFormat('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        }).format(date);
    }

    // Sayaç güncelleme fonksiyonu
    function updateCountdown() {
        const now = new Date();
        let nextCompetition = null;
        let minDaysLeft = Infinity;

        competitions.forEach(comp => {
            const timeLeft = comp.date - now;
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            // Progress bar güncelleme
            if (comp.elements.progress) {
                const yearStart = new Date(comp.date.getFullYear(), 0, 1);
                const progress = Math.min(
                    ((now - yearStart) / (comp.date - yearStart)) * 100, 
                    100
                );
                comp.elements.progress.style.width = `${progress}%`;
            }

            // Sayaç metinleri
            if (comp.elements.countdown) {
                comp.elements.countdown.textContent = `${daysLeft}g ${hoursLeft}s`;
            }

            if (comp.elements.days) {
                comp.elements.days.textContent = daysLeft > 0 
                    ? `Son ${daysLeft} gün` 
                    : 'Yarışma tamamlandı';
            }

            // En yakın yarışmayı belirle
            if (daysLeft > 0 && daysLeft < minDaysLeft) {
                minDaysLeft = daysLeft;
                nextCompetition = comp;
            }
        });

        // Ana sayaç güncelleme
        if (mainTimer && nextCompetition) {
            const days = Math.floor((nextCompetition.date - now) / (1000 * 60 * 60 * 24));
            const hours = Math.floor(((nextCompetition.date - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            mainTimer.innerHTML = `${days}<small>gün</small> ${hours}<small>saat</small>`;
        }
    }

    // Yarışma kartları yönetimi
    function setupCompetitionCards() {
        document.querySelectorAll('.competition-card').forEach(card => {
            const expandBtn = card.querySelector('.expand-btn');
            const collapseBtn = card.querySelector('.collapse-btn');
            const details = card.querySelector('.card-details');

            if (expandBtn && details) {
                expandBtn.addEventListener('click', () => {
                    details.classList.add('active');
                    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            }

            if (collapseBtn && details) {
                collapseBtn.addEventListener('click', () => {
                    details.classList.remove('active');
                });
            }
        });
    }

    // Sayfa yüklendiğinde çalıştır
    updateCountdown();
    setupCompetitionCards();
    
    // 1 dakikada bir güncelle
    setInterval(updateCountdown, 60000);

    // Ekstra: Yarışma detaylarına otomatik tarih ekleme
    document.querySelectorAll('.competition-info li[data-date]').forEach(item => {
        const dateStr = item.getAttribute('data-date');
        const date = new Date(dateStr);
        if (!isNaN(date)) {
            item.textContent += formatDate(date);
        }
    });
});
