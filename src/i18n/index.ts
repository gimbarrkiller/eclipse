import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LocaleKey } from 'utils';

import { ru } from './ru';
import { en } from './en';
import { it } from './it';
import { hy } from './hy';
import { pt } from './pt';
import { es } from './es';
import { de } from './de';
import { fr } from './fr';

const resources = {
  en,
  it,
  hy,
  ru,
  pt,
  es,
  de,
  fr,
};

i18n
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('lng') || LocaleKey.en,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
