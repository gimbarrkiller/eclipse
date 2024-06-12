import React, { FC, memo, useEffect } from 'react';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';

import { Sidebar } from 'components';

import styles from './styles.module.scss';

interface IBurgerMenu {
  onBurgerChange?: () => void;
}

export const BurgerMenu:FC<IBurgerMenu> = memo(({ onBurgerChange }) => {
  const isLaptop = useScreenWidth(ScreenWidth.laptop);

  useEffect(() => {
    if (isLaptop) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLaptop]);

  return (
    <div className={styles.burger}>
      <Sidebar onBurgerChange={onBurgerChange} />
    </div>
  );
});
