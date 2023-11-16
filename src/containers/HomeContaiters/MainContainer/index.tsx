import React, { memo } from 'react';

import { ellipse1Icon, ellipse2Icon } from 'assets/images';

import { Button, Image } from 'components';

import styles from './styles.module.scss';

export const MainContainer = memo(() => (
  <div className={styles.main_container}>
    <Image
      className={styles.ellipse_1}
      url={ellipse1Icon}
    />
    <div className={styles.main_half_first}>
      <div className={styles.main_after_title}>
        ECLIPSE THE WORLD WITH OUR IDEA
      </div>
      <div className={styles.main_title}>
        16% бонус
        <br />
        прямой продажи
      </div>
      <div className={styles.main_subtitle}>
        Вы получаете за каждого клиента
        <br />
        от стоимости лицензии
      </div>
      <Button
        className={styles.main_btn}
        isBigHeight
      >
        Зарегистрироваться
      </Button>
    </div>
    <div className={styles.main_half_second}>
      <Image
        className={styles.ellipse_2}
        url={ellipse2Icon}
      />
    </div>
  </div>
));
