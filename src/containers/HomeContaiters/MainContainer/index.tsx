import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ellipse1Icon, ellipse2Icon } from 'assets/images';

import { Button, Image } from 'components';

import styles from './styles.module.scss';

export const MainContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const trans = useTranslation('main').t;
  return (
    <div className={styles.main_container}>
      <Image
        className={styles.ellipse_1}
        url={ellipse1Icon}
      />
      <div className={styles.main_half_first}>
        <div className={styles.main_title}>
          {t('Title_')}
        </div>
        <div className={styles.main_subtitle}>
          {t('Subtitle_')}
        </div>
        <Button
          className={styles.main_btn}
          isBigHeight
        >
          {trans('Register_')}
        </Button>
      </div>
      <div className={styles.main_half_second}>
        <Image
          className={styles.ellipse_2}
          url={ellipse2Icon}
        />
      </div>
    </div>
  );
});
