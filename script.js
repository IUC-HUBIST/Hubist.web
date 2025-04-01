document.addEventListener('DOMContentLoaded', () => {
    // Yarışma tarihleri
    const competitions = [
        { name: 'Robolig', date: new Date('2025-07-18') },
        { name: 'Savaşan İHA', date: new Date('2025-07-25') }, // Tarih burada güncellendi
    ];

    // Bugünün tarihi
    const today = new Date();

    // En yakın yarışmanın gün sayısını hesapla
    let closestCompetition = null;
    let minDays = Infinity;
    competitions.forEach(comp => {
        const timeDiff = comp.date - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (daysDiff >= 0 && daysDiff < minDays) {
            minDays = daysDiff;
            closestCompetition = comp;
        }
    });

    // Geriye kalan gün sayısını göster
    const daysLeftElement = document.getElementById('days-left');
    if (closestCompetition) {
        daysLeftElement.textContent = `En yakın yarışma: ${closestCompetition.name} - ${minDays} gün kaldı.`;
    } else {
        daysLeftElement.textContent = 'Yaklaşan bir yarışma bulunmamaktadır.';
    }

    // Zaman çizgisini güncelleme
    const robokigItem = document.getElementById('robokig-timeline-item');
    const ihaItem = document.getElementById('iha-timeline-item');
    const progressBar = document.getElementById('progress-bar');

    competitions.forEach((comp, index) => {
        const timeDiff = comp.date - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        // Eğer geçmişteki yarışma ise, past sınıfı ver
        if (daysDiff < 0) {
            if (index === 0) {
                robokigItem.classList.add('past');
            } else {
                ihaItem.classList.add('past');
            }
        }
        // Eğer yakındaki yarışma ise, upcoming sınıfı ver
        else if (daysDiff > 0) {
            if (index === 0) {
                robokigItem.classList.add('upcoming');
            } else {
                ihaItem.classList.add('upcoming');
            }

            // Progress bar'ı güncelle
            const totalDuration = comp.date - today;
            const progress = 1 - (timeDiff / totalDuration);
            progressBar.style.width = `${progress * 100}%`;
        }
    });
});
