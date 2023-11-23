import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LocaleKey } from 'utils';

import { ru } from './ru';
import { en } from './en';
import { it } from './it';
import { hy } from './hy';

const resources = {
  en,
  it,
  hy,
  ru,
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
