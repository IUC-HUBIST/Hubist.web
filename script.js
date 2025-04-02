// Lightbox sistemi
function initLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-content">
      <span class="close-btn">&times;</span>
      <img class="lightbox-image">
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.close-btn');

  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightboxCaption.textContent = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Sayfa kaydırmayı engelle
    });
  });

  // Kapatma fonksiyonları
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Yarışma sayaçları
function initRaceTimers() {
  const races = [
    {
      id: "robolig",
      date: new Date("2025-07-28"),
      elements: {
        progress: document.getElementById("robolig-progress"),
        countdown: document.getElementById("robolig-countdown")
      }
    },
    {
      id: "savasah",
      date: new Date("2025-08-22"),
      elements: {
        progress: document.getElementById("savasah-progress"),
        countdown: document.getElementById("savasah-countdown")
      }
    }
  ];

  function update() {
    const now = new Date();
    let nextRace = null;
    let minDays = Infinity;
    
    races.forEach(race => {
      const diff = race.date - now;
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      
      // Progress hesaplama (6 aylık hazırlık süresi varsayarak)
      const prepStart = new Date(race.date);
      prepStart.setMonth(prepStart.getMonth() - 6);
      const progress = Math.min(((now - prepStart) / (race.date - prepStart)) * 100, 100);
      
      race.elements.progress.style.width = `${progress}%`;
      race.elements.countdown.textContent = `${days}g ${hours}s`;
      
      // Bir sonraki yarışmayı belirle
      if (days > 0 && days < minDays) {
        minDays = days;
        nextRace = race;
      }
    });

    if (nextRace) {
      document.getElementById('next-race-countdown').textContent = 
        races.find(r => r.id === nextRace.id).elements.countdown.textContent;
    }
  }

  update();
  setInterval(update, 60000); // Dakikalık güncelleme
}

// Dokunmatik optimizasyon
function initTouchSupport() {
  let tapTimer;
  
  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('touchstart', (e) => {
      e.preventDefault();
      tapTimer = setTimeout(() => {
        img.classList.add('long-tap');
      }, 300);
    }, {passive: false});
    
    img.addEventListener('touchend', () => {
      clearTimeout(tapTimer);
      img.classList.remove('long-tap');
    });
    
    img.addEventListener('touchmove', () => {
      clearTimeout(tapTimer);
      img.classList.remove('long-tap');
    });
  });
}

// Başlatıcı
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.competition-photos img')) {
    initLightbox();
    initTouchSupport();
  }
  if (document.getElementById('robolig-progress')) {
    initRaceTimers();
  }
});
