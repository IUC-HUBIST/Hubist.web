document.addEventListener('DOMContentLoaded', () => {
    // Yarışma verileri (2025 yılına güncellendi)
    const competitions = [
        { 
            name: '2025 RoboLig Yarışması', 
            date: new Date('2025-07-28T00:00:00'),
            elements: {
                progress: document.getElementById('robolig-progress'),
                days: document.getElementById('robolig-days'),
                countdown: document.getElementById('robolig-countdown')
            }
        },
        { 
            name: 'SAVASAH IHA', 
            date: new Date('2025-08-22T00:00:00'),
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

    // Sayaç güncelleme fonksiyonu (optimize edildi)
    function updateCountdown() {
        const now = new Date();
        let nextCompetition = null;
        let minDaysLeft = Infinity;

        competitions.forEach(comp => {
            const timeLeft = comp.date - now;
            const daysLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
            const hoursLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            
            // Progress bar güncelleme (daha hassas hesaplama)
            if (comp.elements.progress) {
                const preparationStart = new Date(comp.date);
                preparationStart.setMonth(preparationStart.getMonth() - 6); // 6 aylık hazırlık süresi
                const progress = Math.min(
                    ((now - preparationStart) / (comp.date - preparationStart)) * 100, 
                    100
                );
                comp.elements.progress.style.width = `${progress}%`;
                comp.elements.progress.setAttribute('aria-valuenow', Math.round(progress));
            }

            // Sayaç metinleri
            if (comp.elements.countdown) {
                comp.elements.countdown.textContent = 
                    daysLeft > 0 ? `${daysLeft}g ${hoursLeft}s` : 'Tamamlandı ✓';
                comp.elements.countdown.title = `Bitiş: ${formatDate(comp.date)}`;
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
            const timeLeft = nextCompetition.date - new Date();
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            mainTimer.innerHTML = `${days}<small>gün</small> ${hours}<small>saat</small>`;
            mainTimer.title = `${nextCompetition.name} - ${formatDate(nextCompetition.date)}`;
        } else if (mainTimer) {
            mainTimer.textContent = 'Yaklaşan yarışma bulunamadı';
        }
    }

    // Yarışma kartları yönetimi (geliştirildi)
    function setupCompetitionCards() {
        document.querySelectorAll('.competition-card').forEach(card => {
            const expandBtn = card.querySelector('.expand-btn');
            const collapseBtn = card.querySelector('.collapse-btn');
            const details = card.querySelector('.card-details');
            const previewImg = card.querySelector('.card-preview img');

            // Görsel yüklenirken yükseklik ayarı
            if (previewImg) {
                previewImg.style.objectPosition = 'center 30%';
                previewImg.addEventListener('load', () => {
                    previewImg.style.height = 'auto';
                });
            }

            // Detayları aç/kapa
            if (expandBtn && details) {
                expandBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    details.classList.add('active');
                    
                    // Animasyon için
                    details.style.display = 'block';
                    details.style.height = '0';
                    setTimeout(() => {
                        details.style.height = `${details.scrollHeight}px`;
                    }, 10);
                    
                    // Sayfayı kaydırma (daha yumuşak)
                    setTimeout(() => {
                        details.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                });
            }

            if (collapseBtn && details) {
                collapseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Animasyon için
                    details.style.height = '0';
                    setTimeout(() => {
                        details.classList.remove('active');
                        details.style.display = '';
                        details.style.height = '';
                    }, 300);
                });
            }
        });
    }

    // Sayfa yüklendiğinde çalıştır
    updateCountdown();
    setupCompetitionCards();
    
    // 1 dakikada bir güncelle (performans için requestAnimationFrame kullanımı)
    let lastUpdate = 0;
    function efficientUpdate(timestamp) {
        if (!lastUpdate || timestamp - lastUpdate >= 60000) {
            updateCountdown();
            lastUpdate = timestamp;
        }
        requestAnimationFrame(efficientUpdate);
    }
    requestAnimationFrame(efficientUpdate);

    // Ekstra: Yarışma detaylarını otomatik doldurma
    function populateCompetitionDetails() {
        const roboligInfo = document.querySelector('.competition-info');
        if (roboligInfo) {
            roboligInfo.innerHTML = `
                <h4>Yarışma Detayları</h4>
                <p><strong>Tarih:</strong> 28 Temmuz 2024</p>
                <p><strong>Yer:</strong> İstanbul</p>
                <p><strong>Takım Üyeleri:</strong> [Takım bilgileriniz buraya]</p>
                <p><strong>Ödül:</strong> 4.lük</p>
            `;
        }
    }
    populateCompetitionDetails();
});
