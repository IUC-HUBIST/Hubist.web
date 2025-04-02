document.addEventListener('DOMContentLoaded', function() {
  // Diğer mevcut kodlarınız burada kalacak...

  // Daktilo efekti için geliştirilmiş versiyon
  const roboligBox = document.getElementById("robolig-box");
  const savasanBox = document.getElementById("savasaniha-box");
  
  if (roboligBox && savasanBox) {
    const roboligDesc = document.createElement("div");
    roboligDesc.className = "race-description";
    roboligBox.appendChild(roboligDesc);

    const savasanDesc = document.createElement("div");
    savasanDesc.className = "race-description";
    savasanBox.appendChild(savasanDesc);

    const roboligText = "RoboLig, Türkiye'nin en prestijli robotik yarışmasıdır. Otonom robotların görevleri tamamlaması üzerine kurulu bir ligdir.";
    const savasanText = "Savaşan İHA, insansız hava araçlarının simüle edilmiş savaş senaryolarında yarıştığı bir teknoloji yarışmasıdır.";

    // Yazı durumlarını takip etmek için
    let roboligTyped, savasanTyped;
    let roboligPosition = 0, savasanPosition = 0;
    let roboligTyping = false, savasanTyping = false;

    function startTyping(element, text, position, typedInstance) {
      return new Typed(element, {
        strings: [text.substring(position)],
        typeSpeed: 30,
        startDelay: 0,
        showCursor: false,
        onComplete: () => {
          if (element === roboligDesc) roboligTyping = false;
          if (element === savasanDesc) savasanTyping = false;
        }
      });
    }

    function stopTyping(typedInstance, element) {
      if (typedInstance) {
        const currentText = element.textContent;
        typedInstance.destroy();
        element.textContent = currentText; // Mevcut metni koru
      }
    }

    // RoboLig için
    roboligBox.addEventListener("mouseenter", () => {
      if (!roboligTyping) {
        roboligTyping = true;
        roboligTyped = startTyping(roboligDesc, roboligText, roboligPosition, roboligTyped);
      }
    });

    roboligBox.addEventListener("mouseleave", () => {
      if (roboligTyped) {
        roboligPosition = roboligDesc.textContent.length;
        stopTyping(roboligTyped, roboligDesc);
      }
    });

    // Savaşan İHA için
    savasanBox.addEventListener("mouseenter", () => {
      if (!savasanTyping) {
        savasanTyping = true;
        savasanTyped = startTyping(savasanDesc, savasanText, savasanPosition, savasanTyped);
      }
    });

    savasanBox.addEventListener("mouseleave", () => {
      if (savasanTyped) {
        savasanPosition = savasanDesc.textContent.length;
        stopTyping(savasanTyped, savasanDesc);
      }
    });

    // Kutuya tekrar girildiğinde temizleme
    const resetOnClick = (box, desc, positionVar) => {
      box.addEventListener('click', () => {
        desc.textContent = '';
        positionVar = 0;
        if (box === roboligBox) roboligPosition = 0;
        if (box === savasanBox) savasanPosition = 0;
      });
    };

    resetOnClick(roboligBox, roboligDesc, roboligPosition);
    resetOnClick(savasanBox, savasanDesc, savasanPosition);
  }
});
