// Lightbox sistemi
function initLightbox() {
  const images = document.querySelectorAll('.competition-photos img');
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = '<div class="lightbox-content"></div>';
  document.body.appendChild(lightbox);

  images.forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault();
      lightbox.classList.add('active');
      lightbox.querySelector('.lightbox-content').innerHTML = `
        <img src="${img.src}" alt="${img.alt}">
        <div class="lightbox-caption">${img.alt}</div>
      `;
    });
  });

  // Kapatma fonksiyonları
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('active');
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
    
    races.forEach(race => {
      const diff = race.date - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      // Progress hesaplama
      const startDate = new Date(race.date.getFullYear(), 0, 1);
      const total = race.date - startDate;
      const elapsed = now - startDate;
      const progress = Math.min((elapsed / total) * 100, 100);
      
      // DOM güncelleme
      race.elements.progress.style.width = `${progress}%`;
      race.elements.countdown.textContent = `${days}g ${hours}s`;
    });
  }

  update();
  setInterval(update, 3600000); // Saatlik güncelleme
}

// Dokunmatik optimizasyon
function initTouchSupport() {
  let tapTimer;
  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('touchstart', () => {
      tapTimer = setTimeout(() => {
        img.classList.add('long-tap');
      }, 300);
    });
    
    img.addEventListener('touchend', () => {
      clearTimeout(tapTimer);
      img.classList.remove('long-tap');
    });
  });
}

// Başlatıcı
document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initRaceTimers();
  initTouchSupport();
});
