import React, { memo } from 'react';

import { Button } from 'components';

import styles from './styles.module.scss';

export const SignInUsButtons = memo(() => (
  <div className={styles.buttons}>
    <Button isBgTransparent>
      Вход
    </Button>
    <Button>
      Зарегистрироваться
    </Button>
  </div>
));
