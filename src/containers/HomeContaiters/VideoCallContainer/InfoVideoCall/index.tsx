import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { dashboardImage, dashboardMobileImage } from 'assets/images';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';

import { Image } from 'components';

import styles from './styles.module.scss';

export const InfoVideoCall = memo(() => {
  const { t } = useTranslation('welcome');
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  return (
    <div className={styles.card_info}>
      <div className={styles.cards_item_img_container}>
        <Image
          url={isLaptop ? dashboardMobileImage : dashboardImage}
          className={styles.cards_item_img}
        />
      </div>
      <div className={styles.cards_item_text}>
        {t('Video_call_info_')}
      </div>
    </div>
  );
});
