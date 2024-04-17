import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import DataAR from "./data/ar.json";
import DataEN from "./data/en.json";
import { getLocales } from "expo-localization";

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: DataAR,
  ar: DataEN,
};
export const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;