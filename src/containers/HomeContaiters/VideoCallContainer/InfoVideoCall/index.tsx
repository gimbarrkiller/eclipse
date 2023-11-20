import React, { memo } from 'react';

import { dashboardImage, dashboardMobileImage } from 'assets/images';
import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';

import { Image } from 'components';

import styles from './styles.module.scss';

export const InfoVideoCall = memo(() => {
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
        В Eclipce доступны все сотрудники компании
        а данные о них автоматически синхронизируются с Active Directory или другой службой каталога
      </div>
    </div>
  );
});
