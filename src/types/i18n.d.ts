import i18n from "i18next";

import type en from "../../public/locales/en/en.json";
import type nl from "../../public/locales/en/nl.json";

interface I18nNamespaces {
  en: typeof en;
  nl: typeof nl;
}

declare module "i18next" {
  interface CustomTypeOptions {
    resources: I18nNamespaces;
  }
}
