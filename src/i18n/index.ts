import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LocaleKey } from 'utils';

import { ru } from './ru';
import { en } from './en';

const resources = {
  ru,
  en,
};

i18n
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('lng') || LocaleKey.ru,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
