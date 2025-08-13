export const SUPPORTED_LANGUAGES = [
  'en',
  'tw',
  'cn',
  'ja',
  'ko',
  'de',
  'es',
  'fr',
  'pt',
  'ru',
  'ar',
] as const;
export type WorkLang = (typeof SUPPORTED_LANGUAGES)[number];
