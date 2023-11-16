import React, { memo } from 'react';

import { dashboardImage, ellipseColor2Icon } from 'assets/images';

import { Image } from 'components';

import styles from './styles.module.scss';

export const InfoVideoCall = memo(() => (
  <div className={styles.card_info}>
    <div className={styles.cards_item_img_container}>
      <Image
        url={dashboardImage}
        className={styles.cards_item_img}
      />
    </div>
    <div className={styles.cards_item_text}>
      В Eclipce доступны все сотрудники компании
      а данные о них автоматически синхронизируются с Active Directory или другой службой каталога
    </div>
    <Image
      url={ellipseColor2Icon}
      className={styles.cards_item_img_bg}
    />

  </div>
));
