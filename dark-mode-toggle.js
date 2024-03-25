/**
 * Dark Mode Toggle 1.0.2
 * Copyright 2023 Timothy Ricks
 * Released under the MIT License
 * Released on: November 28, 2023
 */

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

  const scriptTag = document.querySelector("[tr-color-vars]");
  if (!scriptTag) {
    console.warn("Script tag with tr-color-vars attribute not found");
    return;
  }

  let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));
  let colorModeEase = attr("power1.out", scriptTag.getAttribute("ease"));

  const cssVariables = scriptTag.getAttribute("tr-color-vars");
  if (!cssVariables) {
    console.warn("Value of tr-color-vars attribute not found");
    return;
  }

  let lightColors = {};
  let darkColors = {};
  cssVariables.split(",").forEach(function (item) {
    let lightValue = computed.getPropertyValue(`--color--${item}`).trim();
    let darkValue = computed.getPropertyValue(`--dark--${item}`).trim();
    lightColors[`--color--${item}`] = lightValue;
    darkColors[`--dark--${item}`] = darkValue;
  });

  function setColors(colorObject, animate) {
    Object.keys(colorObject).forEach(function (key) {
      htmlElement.style.setProperty(key, colorObject[key]);
    });
  }

  function toggleVisibilityBasedOnMode(isDarkMode) {
    const elementsToShowInDark = document.querySelectorAll('.show-in-dark');
    const elementsToShowInLight = document.querySelectorAll('.show-in-light');

    elementsToShowInDark.forEach(element => {
      element.classList.toggle('hidden', !isDarkMode);
    });

    elementsToShowInLight.forEach(element => {
      element.classList.toggle('hidden', isDarkMode);
    });
  }

  function goDark(dark, animate) {
    localStorage.setItem("dark-mode", dark ? "true" : "false");
    htmlElement.classList.toggle("dark-mode", dark);
    setColors(dark ? darkColors : lightColors, animate);
    toggleVisibilityBasedOnMode(dark);

    const toggleEl = document.querySelectorAll("[tr-color-toggle]");
    toggleEl.forEach(function (element) {
      element.setAttribute("aria-pressed", dark.toString());
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const storagePreference = localStorage.getItem("dark-mode");
    const preferDark = storagePreference ? storagePreference === "true" : colorPreference.matches;
    goDark(preferDark, false);

    const toggleEl = document.querySelectorAll("[tr-color-toggle]");
    toggleEl.forEach(element => {
      element.addEventListener("click", () => {
        const isDarkMode = htmlElement.classList.contains("dark-mode");
        goDark(!isDarkMode, true);
      });
    });

    colorPreference.addEventListener("change", e => goDark(e.matches, false));
  });
}

colorModeToggle();
