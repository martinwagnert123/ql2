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
});
