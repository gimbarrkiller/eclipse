import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { emailSuccessImage } from 'assets/images';
import { PathName } from 'appConstants';
import { IAutontificationComponent } from 'types';

import { Button, Image } from 'components';

import styles from '../../styles.module.scss';

export const RegistrationSuccess:FC<IAutontificationComponent> = ({ onChange }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('welcome');

  const onChangeForm = useCallback(() => {
    navigate(PathName.SignIn);
    onChange('form');
  }, [onChange, navigate]);

  return (
    <div className={styles.main_half_first}>
      <Image
        className={styles.main_image}
        url={emailSuccessImage}
      />
      <div className={styles.main_title}>
        {t('Registration_success_congratulations_')}
      </div>
      <div className={styles.main_subtitle}>
        {t('Registration_success_verified_')}
      </div>
      <Button
        onClick={onChangeForm}
        isBigHeight
      >
        {t('Registration_success_go_lk_')}
      </Button>
    </div>
  );
};
