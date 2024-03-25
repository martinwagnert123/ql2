document.addEventListener("DOMContentLoaded", function() {
  function updateVisibilityBasedOnMode() {
    const isDarkMode = document.body.classList.contains('dark-mode'); // Antag att du använder en klass på <body> för att indikera läge
    const elementsToShowInDark = document.querySelectorAll('.show-in-dark');
    const elementsToShowInLight = document.querySelectorAll('.show-in-light');

    elementsToShowInDark.forEach(element => {
      element.classList.toggle('hidden', !isDarkMode);
    });

    elementsToShowInLight.forEach(element => {
      element.classList.toggle('hidden', isDarkMode);
    });
  }

  // Kör funktionen en gång vid laddning
  updateVisibilityBasedOnMode();

  // Antag att du har en toggle-knapp för att växla mellan lägena, koppla en eventlyssnare till den här
  const modeToggleButton = document.querySelector('#mode-toggle'); // Ersätt med din toggle-knapps selector
  modeToggleButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode'); // Växlar mörkt läge
    updateVisibilityBasedOnMode(); // Uppdatera elementens visibilitet baserat på det nya läget
  });
});
