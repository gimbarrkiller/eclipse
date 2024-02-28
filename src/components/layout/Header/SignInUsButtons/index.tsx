import React, { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { PathName } from 'appConstants';

import { Button } from 'components';

import styles from './styles.module.scss';

interface ISignInUsButtons {
  onBurgerChange?: () => void;
}

export const SignInUsButtons:FC<ISignInUsButtons> = memo(({ onBurgerChange }) => {
  const navigate = useNavigate();

  const onClickSignIn = useCallback(() => {
    if (onBurgerChange) {
      onBurgerChange();
    }
    navigate(PathName.SignIn);
  }, [navigate, onBurgerChange]);

  const onClickRegistration = useCallback(() => {
    if (onBurgerChange) {
      onBurgerChange();
    }
    navigate(PathName.Registration);
  }, [navigate, onBurgerChange]);

  const { t } = useTranslation('main');
  return (
    <div className={styles.buttons}>
      <Button
        onClick={onClickSignIn}
        isBgTransparent
      >
        {t('Entrance_')}
      </Button>
      <Button onClick={onClickRegistration}>
        {t('Register_')}
      </Button>
    </div>
  );
});
