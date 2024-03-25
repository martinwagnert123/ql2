function colorModeToggle() {
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    if (defaultValType === "string") return attrVal;
    return defaultVal;
  }

  const htmlElement = document.documentElement;
  const computed = getComputedStyle(htmlElement);
  let toggleEl;

  const scriptTag = document.querySelector("[tr-color-vars]");
  if (!scriptTag) {
    console.warn("Script tag with tr-color-vars attribute not found");
    return;
  }

  let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));
  let colorModeEase = attr("ease-out", scriptTag.getAttribute("ease"));

  const cssVariables = scriptTag.getAttribute("tr-color-vars");
  if (!cssVariables) {
    console.warn("Value of tr-color-vars attribute not found");
    return;
  }

  let lightColors = {}, darkColors = {};
  cssVariables.split(",").forEach(function(item) {
    let lightValue = computed.getPropertyValue(`--color-${item}`).trim();
    let darkValue = computed.getPropertyValue(`--dark-${item}`).trim();
    lightColors[`--color-${item}`] = lightValue || darkValue;
    darkColors[`--dark-${item}`] = darkValue || lightValue;
  });

  function setColors(colorObject, animate) {
    Object.keys(colorObject).forEach(function(key) {
      htmlElement.style.setProperty(key, colorObject[key]);
    });
  }

  function toggleVisibilityBasedOnColorMode(dark) {
    const elementsToShowInDark = document.querySelectorAll(".show-in-dark");
    const elementsToShowInLight = document.querySelectorAll(".show-in-light");

    elementsToShowInDark.forEach(element => {
      element.classList.toggle("hidden", !dark);
    });

    elementsToShowInLight.forEach(element => {
      element.classList.toggle("hidden", dark);
    });
  }

  function goDark(dark, animate = false) {
    const mode = dark ? "dark" : "light";
    localStorage.setItem("dark-mode", dark ? "true" : "false");
    htmlElement.classList.toggle("dark-mode", dark);
    setColors(dark ? darkColors : lightColors, animate);
    toggleVisibilityBasedOnColorMode(dark);
    [...(toggleEl || [])].forEach(element => {
      element.setAttribute("aria-pressed", dark.toString());
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    toggleEl = document.querySelectorAll("[tr-color-toggle]");
    toggleEl.forEach(element => {
      element.addEventListener("click", () => {
        const darkModeIsActive = htmlElement.classList.contains("dark-mode");
        goDark(!darkModeIsActive, true);
      });
    });

    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedPreference = localStorage.getItem("dark-mode");
    if (storedPreference) {
      goDark(storedPreference === "true", false);
    } else {
      goDark(preferredDark, false);
    }
  });
}

colorModeToggle();
