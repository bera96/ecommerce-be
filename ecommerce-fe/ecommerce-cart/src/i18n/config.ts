import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en.json";
import translationTR from "./locales/tr.json";

const savedLanguage = localStorage.getItem("language") || "tr";

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: lng }));
});

window.addEventListener("languageChanged", (e: any) => {
  if (e.detail !== i18n.language) {
    i18n.changeLanguage(e.detail);
  }
});

export default i18n;
