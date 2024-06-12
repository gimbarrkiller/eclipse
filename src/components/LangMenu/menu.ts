import { LocaleKey, localeNames } from 'utils';
import {
  flagUnitedKingdomIcon,
  flagItalyIcon,
  flagPortugalIcon,
  flagSpainIcon,
  flagGermanyIcon,
  flagArmeniaIcon,
  flagFranceIcon,
} from 'assets/images';

export type LanguageType = {
  value: LocaleKey;
  label: string;
  icon: string;
};

export const selectLanguage: LanguageType[] = [
  {
    label: localeNames.en,
    icon: flagUnitedKingdomIcon,
    value: LocaleKey.en,
  },
  {
    label: localeNames.de,
    icon: flagGermanyIcon,
    value: LocaleKey.de,
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
  {
    label: localeNames.hy,
    icon: flagArmeniaIcon,
    value: LocaleKey.hy,
  },
];
