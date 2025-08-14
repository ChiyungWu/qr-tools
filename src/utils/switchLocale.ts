import i18n from '@/i18n';
import { SUPPORTED_LANGUAGES, type WorkLang } from '@/config/workLang';

function updateHtmlPath(nextLang: WorkLang) {
  const { pathname, search, hash } = window.location;
  const segments = pathname.split('/').filter(Boolean);

  if (
    segments.length > 0 &&
    SUPPORTED_LANGUAGES.includes(segments[0] as WorkLang)
  ) {
    segments[0] = nextLang;
  } else {
    segments.unshift(nextLang);
  }

  const newPath = '/' + segments.join('/');
  const newUrl = `${newPath}${search}${hash}`;
  window.history.replaceState({}, '', newUrl);
}

function updateHtmlLang(nextLang: WorkLang) {
  let propLang: string = nextLang;

  switch (nextLang) {
    case 'cn':
      propLang = 'zh-Hans';
      break;
    case 'tw':
      propLang = 'zh-Hant';
      break;
  }
  document.documentElement.lang = propLang;
}

async function dynamicLocale(nextLang: WorkLang) {
  if (!i18n.hasResourceBundle(nextLang, 'translation')) {
    const [allData, langData] = await Promise.all([
      import(`@/locales/all.json`).then((m) => m.default),
      import(`@/locales/${nextLang}.json`).then((m) => m.default),
    ]);

    const mergedData = {
      ...allData,
      ...langData,
    };

    i18n.addResourceBundle(nextLang, 'translation', mergedData, true, true);
  }
}

export async function initLocale() {
  const findLang = (i18n.language || 'en').split('-')[0] as string;
  const nextLang = SUPPORTED_LANGUAGES.includes(findLang as WorkLang)
    ? (findLang as WorkLang)
    : 'en';
  if (!i18n.hasResourceBundle(nextLang, 'translation')) {
    await switchLocale(nextLang);
  }
}

export async function switchLocale(nextLang: WorkLang) {
  updateHtmlPath(nextLang);
  updateHtmlLang(nextLang);
  await dynamicLocale(nextLang);
  await i18n.changeLanguage(nextLang);
}
