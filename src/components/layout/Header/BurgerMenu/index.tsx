import React, { memo, useEffect } from 'react';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';

import { LinksHead } from '../LinksHead';
import { SignInUsButtons } from '../SignInUsButtons';

import styles from './styles.module.scss';

export const BurgerMenu = memo(() => {
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isTablet]);
  return (
    <div className={styles.burger}>
      <LinksHead />
      {isTablet && <SignInUsButtons />}
    </div>
  );
});
