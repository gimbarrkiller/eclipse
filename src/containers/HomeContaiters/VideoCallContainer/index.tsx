import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ellipse3Icon, ellipse5Icon } from 'assets/images';
import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';

import { Image, TitleBorderBottom } from 'components';

import { CardsVideoCall } from './CardsVideoCall';
import { InfoVideoCall } from './InfoVideoCall';

import styles from './styles.module.scss';

export const VideoCallContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const isTablet = useScreenWidth(ScreenWidth.tablet);

  return (
    <div className={styles.video_call_container}>
      <div className={styles.video_call_title}>
        {t('Video_call_title_')}
        <TitleBorderBottom />
        {!isTablet && (
          <Image
            url={ellipse3Icon}
            className={styles.video_call_bg_left}
          />
        )}
        <Image
          url={ellipse3Icon}
          className={styles.video_call_bg_right}
        />
        <Image
          url={ellipse5Icon}
          className={styles.video_call_bg_center}
        />
      </div>
      <CardsVideoCall />
      <InfoVideoCall />
    </div>
  );
});
