import { LocaleKey, localeNames } from 'utils';
import {
  flagUnitedKingdomIcon,
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
    label: localeNames.en,
    icon: flagUnitedKingdomIcon,
    value: LocaleKey.en,
  },
  {
    label: localeNames.it,
    icon: flagItalyIcon,
    value: LocaleKey.it,
  },
  {
    label: localeNames.hy,
    icon: flagPortugalIcon,
    value: LocaleKey.hy,
  },
];
