import React, {
  memo,
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonIcon } from 'components';

import { LanguageType, selectLanguage } from './menu';

import styles from './styles.module.scss';

export const LangMenu = memo(() => {
  const { i18n } = useTranslation();

  const currentLanguage = selectLanguage.find(({ value }) => value === i18n.language);
  const [language, setLanguage] = useState(currentLanguage || selectLanguage[0]);
  const [isOpenLang, setIsOpenLang] = useState(false);

  const changeLanguage = useCallback((lang?: LanguageType) => {
    if (lang?.value) {
      setLanguage(lang);
      i18n.changeLanguage(lang.value);
      localStorage.setItem('lng', lang.value);
    }
    setIsOpenLang(!isOpenLang);
  }, [isOpenLang]);

  return (
    <div className={styles.header_controls_lang}>
      <ButtonIcon
        imageURL={language.icon}
        className={styles.header_controls_flag}
        onClick={changeLanguage}
      />
      {isOpenLang && (
        <div className={styles.lang}>
          {selectLanguage.map((lang) => (
            <ButtonIcon
              key={lang.value}
              imageURL={lang.icon}
              className={styles.header_controls_flag}
              onClick={() => changeLanguage(lang)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
