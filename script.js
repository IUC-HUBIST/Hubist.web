document.addEventListener('DOMContentLoaded', function() {
  // Yarışma verileri
  const races = [
    {
      id: "robolig",
      date: new Date("2025-07-28T00:00:00"),
      elements: {
        progress: document.getElementById("robolig-progress"),
        days: document.getElementById("robolig-days"),
        countdown: document.getElementById("robolig-countdown")
      }
    },
    {
      id: "savasah",
      date: new Date("2025-08-22T00:00:00"),
      elements: {
        progress: document.getElementById("savasah-progress"),
        days: document.getElementById("savasah-days"),
        countdown: document.getElementById("savasah-countdown")
      }
    }
  ];

  function updateAll() {
    const now = new Date();
    
    races.forEach(race => {
      const timeLeft = race.date - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      // Progress hesaplama
      const startDate = new Date(race.date.getFullYear(), 0, 1);
      const progress = Math.min(
        ((now - startDate) / (race.date - startDate)) * 100, 
        100
      );

      // Element güncellemeleri
      if(race.elements.progress) {
        race.elements.progress.style.width = `${progress}%`;
        race.elements.days.textContent = `Son ${days} gün`;
        race.elements.countdown.textContent = `${days}g ${hours}s`;
      }
    });
  }

  // Detay butonu fonksiyonu
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.closest('.competition-card').querySelector('.card-details');
      if (details.classList.contains('active')) {
        details.classList.remove('active');
        this.textContent = 'Detayları Göster';
      } else {
        details.classList.add('active');
        this.textContent = 'Detayları Gizle';
      }
    });
  });

  // Görsel hover efekti
  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.zIndex = '10';
      this.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.zIndex = '1';
    });
  });

  // İlk çalıştırma ve güncelleme aralığı
  updateAll();
  setInterval(updateAll, 60000);
});
