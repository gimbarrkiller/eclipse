import React, {
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { flagBrazilIcon } from 'assets/images';
import { LocaleKey, localeNames } from 'utils';

import { Image } from 'components';

import { LanguageType, selectLanguage } from './menu';

import styles from './styles.module.scss';

interface ILangMenu {
  isLabel?: boolean;
  classNameBox?: string;
  classNameMenu?: string;
  classNameContainer?: string;
  langBanner?: string;
  onChangeLangBanner?: (v: string) => void;
  isBrazil?: boolean;
}

export const LangMenu: FC<ILangMenu> = memo(({
  isLabel,
  classNameBox,
  classNameMenu,
  classNameContainer,
  langBanner,
  onChangeLangBanner,
  isBrazil,
}) => {
  const { i18n } = useTranslation();

  const languageAdditional = useMemo(() => (
    isBrazil ? [
      ...selectLanguage.slice(0, selectLanguage.length - 1),
      {
        label: localeNames.br,
        icon: flagBrazilIcon,
        value: LocaleKey.br,
      },
      selectLanguage[selectLanguage.length - 1],
    ] : selectLanguage
  ), [isBrazil]);

  const currentLanguage = languageAdditional.find(({ value }) => value === i18n.language);
  const bannerLang = languageAdditional.find(({ value }) => value === langBanner);
  const [language, setLanguage] = useState(bannerLang || currentLanguage || languageAdditional[0]);
  const [isOpenLang, setIsOpenLang] = useState(false);

  const changeLanguage = useCallback((lang?: LanguageType) => {
    if (onChangeLangBanner && lang?.value) {
      onChangeLangBanner(lang.value);
      setLanguage(lang);
    }
    if (!onChangeLangBanner && lang?.value) {
      setLanguage(lang);
      i18n.changeLanguage(lang.value);
      localStorage.setItem('lng', lang.value);
    }
    setIsOpenLang(!isOpenLang);
  }, [isOpenLang, i18n, onChangeLangBanner]);

  return (
    <div
      className={cn(styles.lang_controls_lang, {
        [styles.lang_controls_lang_label]: isLabel,
      }, classNameContainer)}
    >
      <button
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onClick={changeLanguage}
        className={cn(styles.lang_controls, {
          [styles.lang_controls_label]: isLabel,
        }, classNameBox)}
      >
        <Image url={language.icon} />
        {isLabel && (
          <div className={styles.lang_label}>
            {language.label}
          </div>
        )}
      </button>
      {isOpenLang && (
        <div
          className={cn(styles.lang_controls_menu, {
            [styles.lang_controls_menu_label]: isLabel,
          }, classNameMenu)}
        >
          {languageAdditional.map((lang) => (
            <button
              key={lang.value}
              onClick={() => changeLanguage(lang)}
              className={cn(styles.lang_controls, {
                [styles.lang_controls_label]: isLabel,
                [styles.lang_controls_active]: lang.label === language.label,
              }, classNameBox)}
            >
              <Image url={lang.icon} />
              {isLabel && (
                <div className={styles.lang_label}>
                  {lang.label}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});
