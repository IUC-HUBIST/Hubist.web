document.addEventListener('DOMContentLoaded', function() {
  // Mobil menü toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  // Fancybox başlatma
  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
  });

  // Detay butonları
  document.querySelectorAll('.competition-card').forEach(card => {
    const preview = card.querySelector('.card-preview');
    const details = card.querySelector('.card-details');
    
    preview.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        details.classList.toggle('active');
      }
    });
  });
});
