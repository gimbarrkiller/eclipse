import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { disconnectImage } from 'assets/images';
import { PathName } from 'appConstants';

import { Button, Image } from 'components';

import styles from './styles.module.scss';

export const NotFoundPage = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation('main');

  const onClickBlack = useCallback(() => {
    navigate(PathName.Profile);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.container_first}>
        <div className={styles.container_title}>
          {t('Oops_')}
        </div>
        <div className={styles.container_subtitle}>
          {t('Something_wrong_')}
        </div>
        <Button
          onClick={onClickBlack}
          isBigHeight
        >
          {t('Go_back_')}
        </Button>
      </div>
      <Image
        className={styles.container_img}
        url={disconnectImage}
      />
    </div>
  );
});
