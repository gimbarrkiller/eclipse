import React, {
  FC,
  memo,
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import CopyToClipboard from 'react-copy-to-clipboard';

import { LocaleKey } from 'utils';

import {
  Image,
  LangMenu,
  Slider,
  TitleText,
  toastSuccess,
} from 'components';
import { WhiteContainer } from 'containers';

import { banners } from '../instruments';

import styles from '../styles.module.scss';
import { PathName } from '../../../appConstants';

interface ILangMenu {
  pack: number;
  href: string;
}

export const BannerContainer: FC<ILangMenu> = memo(({
  pack,
  href,
}) => {
  const isHost = window.location.host.includes('test');
  const baseURL = isHost ? PathName.AppUrlTest : PathName.AppUrl;

  const { t } = useTranslation('news');
  const language = localStorage.getItem('lng') || LocaleKey.en;

  const [langBanner, setLangBanner] = useState(language);

  const onCodeCopied = useCallback(() => {
    toastSuccess(t('Code copied'));
  }, [t]);

  const bannerMap = useCallback((packNumber: number) => (
    banners.map(({ title, imgLink }) => {
      const code = `<a
              href="${href}"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="${baseURL}/banners/pack${packNumber}/${langBanner || language}/${imgLink}.png"
                alt="banner"
              />
            </a>`;

      return (
        <WhiteContainer className={styles.instruments_item}>
          <Image
            url={`${baseURL}/banners/pack${packNumber}/preview/banner_${langBanner || language}.png`}
            className={styles.instruments_img}
          />
          <div className={styles.instruments_title}>
            {t('Instruments_banner_')}
            {' '}
            {title}
          </div>
          <CopyToClipboard text={code || ''}>
            <button
              className={styles.instruments_btn}
              onClick={onCodeCopied}
            >
              {t('Instruments_show_code_')}
            </button>
          </CopyToClipboard>
        </WhiteContainer>
      );
    })
  ), [
    href,
    langBanner,
    language,
    t,
    onCodeCopied,
    baseURL,
  ]);

  return (
    <div className={styles.instruments_content}>
      <div className={styles.instruments_content_top}>
        <TitleText
          className={styles.instruments_content_title}
          text={t('Instruments_banners_')}
        />

        <LangMenu
          langBanner={langBanner}
          onChangeLangBanner={setLangBanner}
          classNameMenu={styles.instruments_lang}
        />
      </div>
      <Slider items={bannerMap(pack)} />
    </div>
  );
});
