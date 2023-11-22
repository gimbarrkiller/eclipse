import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'components';

import styles from './styles.module.scss';

export const SignInUsButtons = memo(() => {
  const { t } = useTranslation('main');
  return (
    <div className={styles.buttons}>
      <Button isBgTransparent>
        {t('Entrance_')}
      </Button>
      <Button>
        {t('Register_')}
      </Button>
    </div>
  );
});
