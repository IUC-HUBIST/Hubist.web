document.addEventListener('DOMContentLoaded', function() {
  // Mobil menü ve diğer mevcut fonksiyonlar burada aynen kalacak...

  // Typed.js ile gelişmiş yazı animasyonu
  const initTypedEffect = () => {
    const roboligBox = document.getElementById("robolig-box");
    const savasanBox = document.getElementById("savasaniha-box");
    
    if (!roboligBox || !savasanBox) return;

    // Açıklama alanlarını oluştur
    const roboligDesc = document.createElement("div");
    roboligDesc.className = "race-description";
    roboligBox.appendChild(roboligDesc);

    const savasanDesc = document.createElement("div");
    savasanDesc.className = "race-description";
    savasanBox.appendChild(savasanDesc);

    const roboligText = "RoboLig, Türkiye'nin en prestijli robotik yarışmasıdır. Otonom robotların görevleri tamamlaması üzerine kurulu bir ligdir.";
    const savasanText = "Savaşan İHA, insansız hava araçlarının simüle edilmiş savaş senaryolarında yarıştığı bir teknoloji yarışmasıdır.";

    let roboligTyped, savasanTyped;
    let roboligTyping = false, savasanTyping = false;
    let roboligBackspacing = false, savasanBackspacing = false;

    const startTyping = (element, text, typedInstance) => {
      return new Typed(element, {
        strings: [text],
        typeSpeed: 30,
        startDelay: 0,
        showCursor: false,
        onComplete: () => {
          if (element === roboligDesc) {
            roboligTyping = false;
            if (!roboligBox.matches(':hover')) startBackspacing(roboligDesc, roboligTyped);
          }
          if (element === savasanDesc) {
            savasanTyping = false;
            if (!savasanBox.matches(':hover')) startBackspacing(savasanDesc, savasanTyped);
          }
        }
      });
    };

    const startBackspacing = (element, typedInstance) => {
      if (!typedInstance) return;
      
      typedInstance.strings = [''];
      typedInstance.start();
      typedInstance.options.typeSpeed = 15;
      typedInstance.options.backSpeed = 30;
      typedInstance.options.loop = false;
      typedInstance.reset();
    };

    // RoboLig için olay dinleyicileri
    roboligBox.addEventListener("mouseenter", () => {
      if (!roboligTyping && !roboligBackspacing) {
        roboligTyping = true;
        roboligBackspacing = false;
        if (roboligTyped) roboligTyped.destroy();
        roboligDesc.textContent = '';
        roboligTyped = startTyping(roboligDesc, roboligText, roboligTyped);
      }
    });

    roboligBox.addEventListener("mouseleave", () => {
      if (roboligTyped && !roboligBackspacing && roboligDesc.textContent.length === roboligText.length) {
        roboligBackspacing = true;
        startBackspacing(roboligDesc, roboligTyped);
      }
    });

    // Savaşan İHA için olay dinleyicileri
    savasanBox.addEventListener("mouseenter", () => {
      if (!savasanTyping && !savasanBackspacing) {
        savasanTyping = true;
        savasanBackspacing = false;
        if (savasanTyped) savasanTyped.destroy();
        savasanDesc.textContent = '';
        savasanTyped = startTyping(savasanDesc, savasanText, savasanTyped);
      }
    });

    savasanBox.addEventListener("mouseleave", () => {
      if (savasanTyped && !savasanBackspacing && savasanDesc.textContent.length === savasanText.length) {
        savasanBackspacing = true;
        startBackspacing(savasanDesc, savasanTyped);
      }
    });
  };

  // Typed.js kütüphanesini yükle
  if (typeof Typed === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
    script.onload = initTypedEffect;
    document.head.appendChild(script);
  } else {
    initTypedEffect();
  }

  // Diğer mevcut kodlarınız...
});
