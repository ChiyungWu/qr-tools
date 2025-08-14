import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES, type WorkLang } from '@/config/workLang';

const checkPathLang = {
  name: 'checkPath',
  lookup() {
    const path = window.location.pathname || '';
    const firstParam = path.split('/')[1] || '';
    if (SUPPORTED_LANGUAGES.includes(firstParam as WorkLang)) {
      return firstParam;
    }
    return null;
  },
};

const detectLang = new LanguageDetector();
detectLang.addDetector(checkPathLang as never);

i18n
  .use(detectLang)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {},
    detection: {
      order: ['querystring', 'checkPath', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'webLang',
      lookupLocalStorage: 'webLang',
      lookupCookie: 'webLang',
    },
  });

export default i18n;
