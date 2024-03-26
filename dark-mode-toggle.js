document.addEventListener("DOMContentLoaded", function() {
  function updateVisibilityBasedOnMode() {
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    const elementsToShowInDark = document.querySelectorAll('.show-in-dark');
    const elementsToShowInLight = document.querySelectorAll('.show-in-light');

    elementsToShowInDark.forEach(element => {
      element.classList.toggle('active', isDarkMode);
    });

    elementsToShowInLight.forEach(element => {
      element.classList.toggle('active', !isDarkMode);
    });
  }

  // Initial uppdatering och uppdatering vid klick
  updateVisibilityBasedOnMode();
  const toggleButtons = document.querySelectorAll("[tr-color-toggle]");
  toggleButtons.forEach(toggleButton => {
    toggleButton.addEventListener('click', function () {
      setTimeout(updateVisibilityBasedOnMode, 100); // Lägg till lite fördröjning om nödvändigt
    });
  });

  // Lägg till hover-effektfunktionalitet
  const hoverTargets = document.querySelectorAll('.hover-target');

  hoverTargets.forEach(target => {
    target.addEventListener('mouseover', function() {
      const hoverImgSrc = target.getAttribute('data-hover-image');
      const hoverImg = document.createElement('img');
      hoverImg.setAttribute('src', hoverImgSrc);
      hoverImg.classList.add('hover-image');
      document.body.appendChild(hoverImg);
      
      // Spara referensen till bilden i elementets dataset för enkel åtkomst vid mouseout
      target.dataset.hoverImgEl = document.body.appendChild(hoverImg);
    });

    target.addEventListener('mouseout', function() {
      // Använd den sparade referensen för att ta bort bilden
      const hoverImg = target.dataset.hoverImgEl;
      hoverImg && document.body.removeChild(hoverImg);
    });
  });
});
