import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { ellipse1Icon, ellipse2Icon, mainLaptopImage } from 'assets/images';
import { PathName, ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';

import { Button, Image } from 'components';

import styles from './styles.module.scss';

export const MainContainer = memo(() => {
  const navigate = useNavigate();
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  const { t } = useTranslation('welcome');
  const trans = useTranslation('main').t;

  const onClickRegistration = useCallback(() => {
    navigate(PathName.Registration);
  }, [navigate]);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
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
            onClick={onClickRegistration}
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
          {isTablet && (
            <Image
              url={mainLaptopImage}
              className={styles.main_half_second_img}
            />
          )}
        </div>
      </div>
    </div>
  );
});
