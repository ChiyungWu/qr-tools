import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detectLang from 'i18next-browser-languagedetector';

import { SUPPORTED_LANGUAGES, type WorkLang } from '@/config/workLang';

i18n
  .use(detectLang)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {},
    detection: {
      order: ['path', 'querystring', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'webLang',
      lookupLocalStorage: 'webLang',
      lookupCookie: 'webLang',
    },
  });

const detectLang_selfPath = {
  name: 'path',
  lookup() {
    const path = window.location.pathname;
    const firstParam = path.split('/')[1];
    if (SUPPORTED_LANGUAGES.includes(firstParam as WorkLang)) {
      return firstParam;
    }
    return null;
  },
};

i18n.services.languageDetector.addDetector(detectLang_selfPath);

export default i18n;
