document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Yarışma kartı toggle
    const expandBtn = document.querySelector('.expand-btn');
    const collapseBtn = document.querySelector('.collapse-btn');
    const cardDetails = document.querySelector('.card-details');
    
    expandBtn.addEventListener('click', function() {
        cardDetails.classList.add('active');
    });
    
    collapseBtn.addEventListener('click', function() {
        cardDetails.classList.remove('active');
    });

    // Geri sayım fonksiyonu
    function updateCountdown() {
        const endDate = new Date('2024-07-28T00:00:00'); // Yarışma tarihini güncelleyin
        const now = new Date();
        
        const diff = endDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        // Progress hesaplama
        const startDate = new Date('2024-01-01T00:00:00'); // Hazırlık başlangıcı
        const total = endDate - startDate;
        const elapsed = now - startDate;
        const progress = Math.min((elapsed / total) * 100, 100);
        
        // DOM güncelleme
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('progress').style.width = `${progress}%`;
    }

    // Sayfa yüklendiğinde ve her dakika çalıştır
    updateCountdown();
    setInterval(updateCountdown, 60000);
});
