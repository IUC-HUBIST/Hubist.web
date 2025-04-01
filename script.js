document.addEventListener('DOMContentLoaded', () => {
    // Yarışma tarihleri
    const competitions = [
        { name: 'Robolig', date: new Date('2025-07-18') },
        { name: 'Savaşan İHA', date: new Date('2025-08-15') },
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
});
