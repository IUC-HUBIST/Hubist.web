document.addEventListener('DOMContentLoaded', function() {
  // Yarışma verileri
  const races = [
    {
      id: "robolig",
      name: "ROBOLİG",
      date: new Date("2025-07-28T00:00:00"),
      elements: {
        progress: document.getElementById("robolig-progress"),
        countdown: document.getElementById("robolig-countdown")
      }
    },
    {
      id: "savasah",
      name: "SAVAŞAN İHA",
      date: new Date("2025-08-22T00:00:00"),
      elements: {
        progress: document.getElementById("savasah-progress"),
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
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      const progress = Math.min(
        ((now - new Date(race.date.getFullYear(), 0, 1)) / (race.date - new Date(race.date.getFullYear(), 0, 1))) * 100, 
        100
      );

      if(race.elements.progress) {
        race.elements.progress.style.width = `${progress}%`;
        race.elements.countdown.textContent = `${daysLeft}g ${hoursLeft}s`;
      }

      if (daysLeft > 0 && daysLeft < minDaysLeft) {
        minDaysLeft = daysLeft;
        nextRace = race;
      }
    });

    if (nextRace) {
      document.getElementById('next-race-countdown').textContent = 
        races.find(r => r.id === nextRace.id).elements.countdown.textContent;
    }
  }

  // Detay butonu fonksiyonu
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.closest('.competition-card').querySelector('.card-details');
      details.classList.toggle('active');
      this.textContent = details.classList.contains('active') 
        ? 'Detayları Gizle' 
        : 'Detayları Göster';
    });
  });

  // Lightbox fonksiyonu
  function initLightbox() {
    const images = document.querySelectorAll('.competition-photos img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    images.forEach(image => {
      image.addEventListener('click', (e) => {
        e.stopPropagation();
        lightbox.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
        lightbox.classList.add('active');
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }

  // Lightbox'ı başlat
  if(document.querySelector('.competition-photos img')) {
    initLightbox();
  }

  // Sayaçları başlat
  updateCountdown();
  setInterval(updateCountdown, 60000);
});
