document.addEventListener('DOMContentLoaded', () => {
    // Yarışma verileri
    const competitions = [
        { 
            name: 'ROBOLIG', 
            date: new Date('2025-07-28T00:00:00'),
            element: {
                progress: document.getElementById('robolig-progress'),
                days: document.getElementById('robolig-days'),
                countdown: document.getElementById('robolig-countdown'),
                marker: document.querySelector('[data-date="2025-07-28"]')
            }
        },
        { 
            name: 'SAVASAH IHA', 
            date: new Date('2025-08-22T00:00:00'),
            element: {
                progress: document.getElementById('savasah-progress'),
                days: document.getElementById('savasah-days'),
                countdown: document.getElementById('savasah-countdown'),
                marker: document.querySelector('[data-date="2025-08-22"]')
            }
        }
    ];

    // Ana sayaç elementleri
    const mainTimer = document.getElementById('timer');
    const daysLeftElement = document.getElementById('days-left');

    function updateAll() {
        const now = new Date();
        let closest = { days: Infinity };
        
        competitions.forEach(comp => {
            if (!comp.element.progress || !comp.element.countdown) return;

            const timeLeft = comp.date - now;
            const days = Math.floor(timeLeft / (1000 * 3600 * 24));
            const hours = Math.floor((timeLeft % (1000 * 3600 * 24)) / (1000 * 3600));
            const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
            
            // Progress hesaplama
            const startDate = new Date(comp.date.getFullYear(), 0, 1);
            const progress = Math.min(
                ((now - startDate) / (comp.date - startDate)) * 100, 
                100
            );
            
            // Element güncellemeleri
            comp.element.progress.style.width = `${progress}%`;
            comp.element.countdown.textContent = `${days}g ${hours}s`;
            comp.element.countdown.setAttribute('title', `${hours} saat ${minutes} dakika`);
            
            if (comp.element.days) {
                comp.element.days.textContent = `Son ${days} gün`;
            }

            // Marker durumu
            if (comp.element.marker) {
                comp.element.marker.classList.toggle('active', days >= 0);
                comp.element.marker.classList.toggle('past', days < 0);
            }
            
            // En yakın yarışmayı bul
            if (days >= 0 && days < closest.days) {
                closest = { name: comp.name, days: days };
            }
        });

        // Ana sayaç ve bilgi güncelleme
        if (mainTimer && closest.days !== Infinity) {
            mainTimer.innerHTML = `${closest.days}<small>gün</small>`;
        }
        
        if (daysLeftElement) {
            daysLeftElement.textContent = closest.days !== Infinity 
                ? `En yakın yarışma: ${closest.name} - ${closest.days} gün kaldı`
                : 'Yaklaşan yarışma bulunmamaktadır';
        }
    }

    // Kart işlevleri
    function setupCompetitionCards() {
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.competition-card');
                if (card) {
                    card.querySelector('.card-details')?.classList.add('active');
                }
            });
        });

        document.querySelectorAll('.collapse-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.competition-card');
                if (card) {
                    card.querySelector('.card-details')?.classList.remove('active');
                }
            });
        });
    }

    // İlk çalıştırma
    updateAll();
    setupCompetitionCards();
    
    // Güncelleme aralığı
    setInterval(updateAll, 60000); // 1 dakikada bir güncelle
});
