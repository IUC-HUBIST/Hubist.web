document.addEventListener('DOMContentLoaded', function() {
  // Yarışma verileri
  const races = [
    {
      id: "robolig",
      name: "ROBOLİG",
      date: new Date("2025-07-28T00:00:00"),
      elements: {
        progress: document.getElementById("robolig-progress"),
        days: document.getElementById("robolig-days"),
        countdown: document.getElementById("robolig-countdown")
      }
    },
    {
      id: "savasah",
      name: "SAVAŞAN İHA",
      date: new Date("2025-08-22T00:00:00"),
      elements: {
        progress: document.getElementById("savasah-progress"),
        days: document.getElementById("savasah-days"),
        countdown: document.getElementById("savasah-countdown")
      }
    }
  ];

  // Sayaç güncelleme fonksiyonu
  function updateCountdown() {
    const now = new Date();
    let nextRace = null;
    let minDaysLeft = Infinity;

    races.forEach(race => {
      const timeLeft = race.date - now;
      const daysLeft = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
      const hoursLeft = Math.max(0, Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      
      // Progress bar güncelleme
      if (race.elements.progress) {
        const preparationStart = new Date(race.date);
        preparationStart.setMonth(preparationStart.getMonth() - 6); // 6 aylık hazırlık süresi
        const progress = Math.min(
          ((now - preparationStart) / (race.date - preparationStart)) * 100, 
          100
        );
        race.elements.progress.style.width = `${progress}%`;
      }

      // Sayaç metinleri
      if (race.elements.countdown) {
        race.elements.countdown.textContent = 
          daysLeft > 0 ? `${daysLeft}g ${hoursLeft}s` : 'Tamamlandı';
      }

      if (race.elements.days) {
        race.elements.days.textContent = daysLeft > 0 
          ? `Son ${daysLeft} gün` 
          : 'Yarışma tamamlandı';
      }

      // En yakın yarışmayı belirle
      if (daysLeft > 0 && daysLeft < minDaysLeft) {
        minDaysLeft = daysLeft;
        nextRace = race;
      }
    });

    // Bir sonraki yarışmayı göster
    if (nextRace) {
      const nextRaceTimer = document.getElementById('next-race-timer');
      if (nextRaceTimer) {
        nextRaceTimer.innerHTML = `
          <h3>Bir Sonraki Yarışma: ${nextRace.name}</h3>
          <div id="next-race-countdown">${nextRace.elements.countdown.textContent}</div>
        `;
      }
    }
  }

  // Detay butonu fonksiyonu (tek butonla aç/kapa)
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.competition-card');
      const details = card.querySelector('.card-details');
      
      details.classList.toggle('active');
      this.textContent = details.classList.contains('active') 
        ? 'Detayları Gizle' 
        : 'Detayları Göster';
      
      // Smooth scroll efekti
      if (details.classList.contains('active')) {
        setTimeout(() => {
          details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });

  // Görsel hover efekti
  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
      this.style.zIndex = '10';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
      this.style.zIndex = '1';
    });
  });

  // Sayfa yüklendiğinde çalıştır
  updateCountdown();
  
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
});
