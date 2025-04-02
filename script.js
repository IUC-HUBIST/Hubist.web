document.addEventListener('DOMContentLoaded', function() {
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
    const now = new Date();
    let nextRace = null;
    let minDaysLeft = Infinity;

    races.forEach(race => {
      const timeLeft = race.date - now;
      const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      const progress = Math.min(
        ((now - new Date(race.date.getFullYear(), 0, 1)) / (race.date - new Date(race.date.getFullYear(), 0, 1)) * 100, 
        100
      );

      race.elements.progress.style.width = `${progress}%`;
      race.elements.countdown.textContent = `${daysLeft}g ${hoursLeft}s`;

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

  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const details = this.closest('.competition-card').querySelector('.card-details');
      details.classList.toggle('active');
      this.textContent = details.classList.contains('active') 
        ? 'Detayları Gizle' 
        : 'Detayları Göster';
    });
  });

  document.querySelectorAll('.competition-photos img').forEach(img => {
    img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.1)');
    img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
  });

  updateCountdown();
  setInterval(updateCountdown, 60000);
});
