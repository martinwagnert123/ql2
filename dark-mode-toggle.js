document.addEventListener("DOMContentLoaded", function() {
  function updateVisibilityBasedOnMode() {
    // Använder 'dark-mode' klassen på <html> elementet för att avgöra läget
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    const elementsToShowInDark = document.querySelectorAll('.show-in-dark');
    const elementsToShowInLight = document.querySelectorAll('.show-in-light');

    elementsToShowInDark.forEach(element => {
      element.classList.toggle('hidden', !isDarkMode);
    });

    elementsToShowInLight.forEach(element => {
      element.classList.toggle('hidden', isDarkMode);
    });
  }

  // Initial uppdatering baserat på det aktuella läget när sidan laddas
  updateVisibilityBasedOnMode();

  // Uppdatera visningen varje gång någon av toggle-knapparna klickas
  const toggleButtons = document.querySelectorAll("[tr-color-toggle]");
  toggleButtons.forEach(toggleButton => {
    toggleButton.addEventListener('click', function () {
      // Väntar en liten stund för att säkerställa att klassen har uppdaterats
      setTimeout(updateVisibilityBasedOnMode, 100);
    });
  });
});
