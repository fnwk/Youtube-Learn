import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common from "../locales/en/common.json";
import welcome from "../locales/en/welcome.json";
import home from "../locales/en/home.json";
import search from "../locales/en/search.json";
import video from "../locales/en/video.json";

export type AppLanguage = "en";

export const resources = {
  en: {
    common,
    welcome,
    home,
    search,
    video,
  },
};

export const defaultNS = "common";

const ns = ["common"] as const;

i18n.use(initReactI18next).init({
  debug: true,
  compatibilityJSON: "v4",
  ns: ns,
  resources,
  defaultNS: defaultNS,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});
