import React, { memo } from 'react';
import cn from 'classnames';

import { comfortIcon, autosImage } from 'assets/images';

import { Image, TitleBorderBottom } from 'components';

import { CardsComfort } from './CardsComfort';
import { GlobalHub } from './GlobalHub';

import styles from './styles.module.scss';

export const ComfortBonusContainer = memo(() => (
  <div>
    <div className={styles.comfort_container}>
      <div className={styles.comfort_title}>
        Комфорт бонус
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
        Eclipce — Global Hub одно приложение, одна экосистема,
        множество функций супер приложение для командной работы
        <TitleBorderBottom />
      </div>
      <div className={cn(styles.comfort_subtitle, styles.comfort_subtitle_second)}>
        Укладывайтесь в дедлайны, согласовывайте работы,
        формируйте проектные команды — когда все на одной платформе,
        вы можете работать откуда угодно. Настраивайте интеграции Eclipce
        со всеми привычными сервисами и создавайте собственную рабочую экосистему
      </div>
    </div>
    <CardsComfort />
    <GlobalHub />
  </div>
));
