import i18next from "../i18n/i18next";

export function changeLanguage(lng: string) {
  i18next.changeLanguage(lng);
}

export function getLanguage() {
  return i18next.language || window.localStorage.i18nextLng;
}
