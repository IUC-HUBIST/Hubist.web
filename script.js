document.addEventListener('DOMContentLoaded', function() {
  // Lightbox kütüphanesi dinamik yükleme (fallback)
  if (typeof FsLightbox === 'undefined') {
    const lightboxScript = document.createElement('script');
    lightboxScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/fslightbox/3.3.1/index.min.js';
    document.head.appendChild(lightboxScript);
  }

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
        race.elements.countdown.textContent = `${daysLeft}g ${hoursLeft}s ${minutesLeft}d`;

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
      }
    });
  });

  // LIGHTBOX ÖZELLİKLİ GÖRSEL YÖNETİMİ
  document.querySelectorAll('.competition-photos img').forEach(img => {
    // Lightbox için <a> wrapper ekleme
    const wrapper = document.createElement('a');
    wrapper.href = img.src;
    wrapper.setAttribute('data-fslightbox', 'gallery');
    wrapper.style.display = 'contents'; // Stil bozulmasını engeller
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // Hover efekti
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.zIndex = '10';
      img.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
      img.style.cursor = 'zoom-in';
    });
    
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.zIndex = '1';
      img.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
    });
  });

  // Sosyal medya ikonları hover efekti
  document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = 'translateY(0) scale(1)';
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
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // İlk yüklemede geri sayımı güncelle
  if (races.length > 0) {
    updateCountdown();
    setInterval(updateCountdown, 60000);
  }

  // Lightbox'ı yeniden başlat (dinamik yüklenirse)
  if (typeof refreshFsLightbox === 'function') {
    refreshFsLightbox();
  }
});
