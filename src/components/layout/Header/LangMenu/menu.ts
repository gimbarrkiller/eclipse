import { LocaleKey, localeNames } from 'utils';
import {
  flagGermanyIcon,
  flagUnitedKingdomIcon,
  flagSpainIcon,
  flagFranceIcon,
  flagItalyIcon,
  flagPortugalIcon,
} from 'assets/images';

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
  {
    label: localeNames.es,
    icon: flagSpainIcon,
    value: LocaleKey.es,
  },
  {
    label: localeNames.fr,
    icon: flagFranceIcon,
    value: LocaleKey.fr,
  },
  {
    label: localeNames.it,
    icon: flagItalyIcon,
    value: LocaleKey.it,
  },
  {
    label: localeNames.pt,
    icon: flagPortugalIcon,
    value: LocaleKey.pt,
  },
];
