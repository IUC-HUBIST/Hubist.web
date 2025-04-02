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

  // Form validation fonksiyonu
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;

      // Input validation
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Lütfen adınızı giriniz');
        isValid = false;
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
        showError(emailInput, 'Lütfen geçerli bir e-posta adresi giriniz');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        showError(messageInput, 'Lütfen mesajınızı giriniz');
        isValid = false;
      }

      if (isValid) {
        // Form gönderim işlemi (AJAX veya başka bir yöntem eklenebilir)
        alert('Mesajınız başarıyla gönderildi!');
        this.reset();
      }
    });

    function showError(input, message) {
      const formGroup = input.parentElement;
      const errorText = formGroup.querySelector('.error-text') || document.createElement('span');
      errorText.className = 'error-text';
      errorText.textContent = message;
      
      if (!formGroup.querySelector('.error-text')) {
        formGroup.appendChild(errorText);
      }
      
      input.classList.add('error');
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
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
        
        // Geçmiş tarihleri kontrol et
        if (timeLeft < 0) {
          race.elements.progress.style.width = '100%';
          race.elements.countdown.textContent = 'Yarışma sona erdi';
          return;
        }

        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        // Progress hesaplama (yıl başından itibaren)
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

  // Resim hover efekti
  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.05)';
      img.style.transition = 'transform 0.3s ease';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
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
    setInterval(updateCountdown, 60000); // Her dakika güncelle
  }
});
