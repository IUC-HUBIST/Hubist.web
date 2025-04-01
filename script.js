document.addEventListener('DOMContentLoaded', () => {
  // Menü linklerine tıklayınca yumuşak kaydırma efekti sağla
  document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      // Eğer iç link ise
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Scroll reveal efekti: İçerik bölümleri kaydırıldıkça belirginleşsin
  const revealSections = document.querySelectorAll('.content');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight - 100) {
        section.style.opacity = 1;
        section.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Sayfa yüklendiğinde çalıştır
});
