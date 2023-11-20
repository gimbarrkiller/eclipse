import React, { memo, useMemo } from 'react';

import {
  cloudIcon,
  lockIcon,
  ellipse5Icon,
  ellipse3Icon,
} from 'assets/images';

import { Image, TitleBorderBottom } from 'components';

import { after, devices } from './devices';

import styles from './styles.module.scss';

export const WorkAllDeviceContainer = memo(() => {
  const cardsDevices = useMemo(() => (
    <div className={styles.work_cards}>
      {devices.map(({ name, icon }) => (
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

  const afterTags = useMemo(() => (
    <div className={styles.work_cards}>
      {after.map((col) => (
        <div>
          {col.map((text) => (
            <div
              key={col.toString()}
              className={styles.work2_cards_item}
            >
              <Image url={cloudIcon} />
              <div className={styles.work_cards_item_subtitle}>
                {text}
              </div>
            </div>
          ))}

        </div>
      ))}
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
      {afterTags}
    </div>
  );
});
