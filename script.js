document.addEventListener('DOMContentLoaded', function() {
  // Mobil menü toggle fonksiyonu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Yarışma geri sayım fonksiyonları
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

  function updateCountdown() {
    try {
      const now = new Date();
      let nextRace = null;
      let minDaysLeft = Infinity;

      races.forEach(race => {
        if (!race.elements.progress || !race.elements.countdown) return;

        const timeLeft = race.date - now;
        
        if (timeLeft < 0) {
          race.elements.progress.style.width = '100%';
          race.elements.countdown.textContent = 'Yarışma sona erdi';
          return;
        }

        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        const yearStart = new Date(race.date.getFullYear(), 0, 1);
        const yearEnd = new Date(race.date.getFullYear() + 1, 0, 1);
        const progress = ((now - yearStart) / (yearEnd - yearStart)) * 100;

        race.elements.progress.style.width = `${Math.min(progress, 100)}%`;
        race.elements.countdown.textContent = `${daysLeft}g ${hoursLeft}s`;

        if (daysLeft < minDaysLeft) {
          minDaysLeft = daysLeft;
          nextRace = race;
        }
      });

      if (nextRace) {
        const nextRaceElement = document.getElementById('next-race-countdown');
        if (nextRaceElement) {
          nextRaceElement.textContent = 
            races.find(r => r.id === nextRace.id).elements.countdown.textContent;
        }
      }
    } catch (error) {
      console.error('Geri sayım güncelleme hatası:', error);
    }
  }

  // Detay butonları için toggle fonksiyonu
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.competition-card');
      if (!card) return;
      
      const details = card.querySelector('.card-details');
      if (details) {
        details.classList.toggle('active');
        this.textContent = details.classList.contains('active') 
          ? 'Detayları Gizle' 
          : 'Detayları Göster';
        
        if (!details.classList.contains('active')) {
          details.querySelectorAll('img').forEach(img => {
            img.style.objectFit = 'cover';
          });
        }
      }
    });
  });

  // Resim hover efekti
  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.objectFit = 'contain';
      img.style.transform = 'scale(1.05)';
      img.style.zIndex = '10';
      img.style.background = '#f5f5f5';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.objectFit = 'cover';
      img.style.transform = 'scale(1)';
      img.style.zIndex = '1';
      img.style.background = 'transparent';
    });
  });

  // Smooth scroll fonksiyonu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // İlk yüklemede geri sayımı güncelle
  if (races.length > 0) {
    updateCountdown();
    setInterval(updateCountdown, 60000);
  }
});
