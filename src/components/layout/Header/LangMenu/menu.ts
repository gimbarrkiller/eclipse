import { LocaleKey, localeNames } from 'utils';
import { flagGermanyIcon, flagUnitedKingdomIcon } from 'assets/images';

export type LanguageType = {
  value: LocaleKey;
  label: string;
  icon: string;
};

export const selectLanguage: LanguageType[] = [
  {
    label: localeNames.ru,
    icon: flagGermanyIcon,
    value: LocaleKey.ru,
  },
  {
    label: localeNames.en,
    icon: flagUnitedKingdomIcon,
    value: LocaleKey.en,
  },
];
