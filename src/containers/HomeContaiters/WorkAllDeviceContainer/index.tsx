import React, { memo, useMemo } from 'react';

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
            {name}
          </div>
        </div>
      ))}
    </div>
  ), []);

  const soonTags = useMemo(() => (
    <div className={styles.soon_container}>
      <div className={styles.soon_container_title}>
        Скоро
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
              {text}
            </div>
          </div>
        ))}
      </div>
      <Image
        url={afterBgIcon}
        className={styles.soon_container_bg}
      />
    </div>
  ), []);

  return (
    <div className={styles.work_container}>
      <div className={styles.work_title}>
        Работайте с любых устройств и операционных систем:
        <TitleBorderBottom />
      </div>
      {cardsDevices}
      <div className={styles.work_container_end}>
        <div className={styles.work_container_end_item}>
          <div className={styles.work_container_end_text}>
            Обеспечьте защиту конфиденциальности данных
          </div>
        </div>
        <div className={styles.work_container_end_item}>
          <Image url={lockIcon} />
          <div className={styles.work_container_end_text}>
            TLS Шифрование
          </div>
        </div>
        <div className={styles.work_container_end_item}>
          <Image url={cloudIcon} />
          <div className={styles.work_container_end_text}>
            Интеграция с DLP
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
