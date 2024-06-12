import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LocaleKey } from 'utils';

import {
  Image,
  LangMenu,
  Slider,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import { instruments } from '../instruments';

import styles from '../styles.module.scss';

export const VideoContainer = () => {
  const { t } = useTranslation('news');
  const language = localStorage.getItem('lng') || LocaleKey.en;

  const [langBanner, setLangBanner] = useState(language);

  const items = useMemo(() => (
    instruments.map(({
      icon,
      title,
      video,
      videoFile,
    }) => (
      <WhiteContainer
        className={styles.instruments_item}
      >
        <a
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          href={video[langBanner]}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            url={icon}
            className={styles.instruments_img}
          />
        </a>
        <div className={styles.instruments_title}>
          {t(title)}
          {' '}
          {langBanner === LocaleKey.br && '(Brazil)'}
        </div>
        <a
          href={`/videos/${videoFile}${langBanner || language}.mp4`}
          download
          target="_blank"
          rel="noreferrer"
          className={styles.instruments_btn}
        >
          {t('Instruments_saved_')}
        </a>
      </WhiteContainer>
    ))
  ), [t, langBanner, language]);

  return (
    <div className={styles.instruments_content}>
      <div className={styles.instruments_content_top}>
        <TitleText
          className={styles.instruments_content_title}
          text={t('Instruments_video_')}
        />

        <LangMenu
          langBanner={langBanner}
          onChangeLangBanner={setLangBanner}
          classNameMenu={styles.instruments_lang}
          isBrazil
        />
      </div>
      <Slider items={items} />
    </div>
  );
};
