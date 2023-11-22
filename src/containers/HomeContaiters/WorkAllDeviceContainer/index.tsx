import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  cloudIcon,
  lockIcon,
  ellipse5Icon,
  ellipse3Icon,
  arrowRightIcon, afterBgIcon,
} from 'assets/images';

import { Image, TitleBorderBottom } from 'components';

import { soon, data } from './data';

import styles from './styles.module.scss';

export const WorkAllDeviceContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const cardsDevices = useMemo(() => (
    <div className={styles.work_cards}>
      {data.map(({ name, icon }) => (
        <div
          key={name}
          className={styles.work_cards_item}
        >
          <div className={styles.work_cards_item_title}>
            <Image url={icon} />
          </div>
          <div className={styles.work_cards_item_subtitle}>
            {t(name)}
          </div>
        </div>
      ))}
    </div>
  ), [t]);

  const soonTags = useMemo(() => (
    <div className={styles.soon_container}>
      <div className={styles.soon_container_title}>
        {t('Soon_title_')}
      </div>
      <div className={styles.soon_cards}>
        {soon.map((text) => (
          <div
            key={text}
            className={styles.soon_cards_item}
          >
            <Image
              className={styles.soon_cards_item_icon}
              url={arrowRightIcon}
            />
            <div className={styles.soon_cards_item_title}>
              {t(text)}
            </div>
          </div>
        ))}
      </div>
      <Image
        url={afterBgIcon}
        className={styles.soon_container_bg}
      />
    </div>
  ), [t]);

  return (
    <div className={styles.work_container}>
      <div className={styles.work_title}>
        {t('Work_all_title_')}
        <TitleBorderBottom />
      </div>
      {cardsDevices}
      <div className={styles.work_container_end}>
        <div className={styles.work_container_end_item}>
          <div className={styles.work_container_end_text}>
            {t('Work_all_subcard_1_')}
          </div>
        </div>
        <div className={styles.work_container_end_item}>
          <Image url={lockIcon} />
          <div className={styles.work_container_end_text}>
            {t('Work_all_subcard_2_')}
          </div>
        </div>
        <div className={styles.work_container_end_item}>
          <Image url={cloudIcon} />
          <div className={styles.work_container_end_text}>
            {t('Work_all_subcard_3_')}
          </div>
        </div>

        <Image
          url={ellipse3Icon}
          className={styles.work_bg_right}
        />
        <Image
          url={ellipse5Icon}
          className={styles.work_bg_left}
        />
      </div>
      {soonTags}
    </div>
  );
});
