import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import fa from './locales/fa';
import ps from './locales/ps';

export const STORAGE_KEY = 'lang';

/** `fa` is Afghan Dari (fa-AF) — `da` would be Danish, so the codes stay explicit. */
export const languages = [
  { code: 'en', htmlLang: 'en', dir: 'ltr', native: 'English', english: 'English' },
  { code: 'fa', htmlLang: 'fa-AF', dir: 'rtl', native: 'دری', english: 'Dari' },
  { code: 'ps', htmlLang: 'ps-AF', dir: 'rtl', native: 'پښتو', english: 'Pashto' },
];

export const languageByCode = (code) => languages.find((l) => l.code === code) || languages[0];

function storedLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && languages.some((l) => l.code === saved)) return saved;
  } catch {
    /* private mode: fall through to English */
  }
  return 'en';
}

/** The <html> tag carries direction and language; the head strings follow it. */
export function applyDocumentLanguage(code) {
  const { htmlLang, dir } = languageByCode(code);
  const root = document.documentElement;
  root.lang = htmlLang;
  root.dir = dir;
  root.dataset.lang = code;
  document.title = i18n.t('meta.title');
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', i18n.t('meta.description'));
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, fa: { translation: fa }, ps: { translation: ps } },
  lng: storedLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

applyDocumentLanguage(i18n.language);
i18n.on('languageChanged', applyDocumentLanguage);

export function changeLanguage(code) {
  i18n.changeLanguage(code);
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* nothing to persist to */
  }
}

export default i18n;
