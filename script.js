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
        
        // En yakın yarışma için
        let closest = { days: Infinity };
        
        competitions.forEach(comp => {
            const timeLeft = comp.date - now;
            const days = Math.floor(timeLeft / (1000 * 3600 * 24));
            const hours = Math.floor((timeLeft % (1000 * 3600 * 24)) / (1000 * 3600));
            
            // Progress hesaplama
            const progress = Math.min(
                Math.max(((now - new Date('2025-01-01')) / (comp.date - new Date('2025-01-01'))) * 100, 
                100
            );
            
            // Element güncellemeleri
            comp.element.progress.style.width = `${progress}%`;
            // script.js'de updateAll() fonksiyonu içine ekleyin
function updateAll() {
  // ... mevcut kodlar ...
  
  races.forEach(comp => {
    // ... mevcut hesaplamalar ...
    
    // Tooltip ekleme (yeni satır)
    comp.element.countdownElement.title = `${hours} saat ${minutes} dakika`;
  });
}
            comp.element.days.textContent = `Son ${days} gün`;
            comp.element.countdown.textContent = `${days}g ${hours}s`;
            
            // Marker durumu
            comp.element.marker.classList.toggle('active', days >= 0);
            comp.element.marker.classList.toggle('past', days < 0);
            
            // En yakın yarışmayı bul
            if(days >= 0 && days < closest.days) {
                closest = { name: comp.name, days: days };
            }
        });

        // Ana sayaç ve bilgi güncelleme
        if(closest.days !== Infinity) {
            mainTimer.innerHTML = `${closest.days}<small>gün</small>`;
            daysLeftElement.textContent = `En yakın yarışma: ${closest.name} - ${closest.days} gün kaldı`;
        } else {
            daysLeftElement.textContent = 'Yaklaşan yarışma bulunmamaktadır';
        }
    }

    // İlk çalıştırma ve güncelleme aralığı
    updateAll();
    setInterval(updateAll, 60000); // 1 dakikada bir güncelle
});
