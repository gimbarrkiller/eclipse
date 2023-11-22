import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { comfortIcon, autosImage } from 'assets/images';

import { Image, TitleBorderBottom } from 'components';

import { CardsComfort } from './CardsComfort';
import { GlobalHub } from './GlobalHub';

import styles from './styles.module.scss';

export const ComfortBonusContainer = memo(() => {
  const { t } = useTranslation('welcome');
  return (
    <div>
      <div className={styles.comfort_container}>
        <div className={styles.comfort_title}>
          {t('Comfort_title_')}
          <Image
            url={comfortIcon}
            className={styles.comfort_title_bg}
          />
        </div>
        <Image
          url={autosImage}
          className={styles.comfort_title_subbg}
        />
      </div>
      <div className={styles.comfort_container_second}>
        <div className={cn(styles.comfort_title, styles.comfort_title_second)}>
          {t('Comfort_info_')}
          <TitleBorderBottom />
        </div>
        <div className={cn(styles.comfort_subtitle, styles.comfort_subtitle_second)}>
          {t('Comfort_subinfo_')}
        </div>
      </div>
      <CardsComfort />
      <GlobalHub />
    </div>
  );
});
