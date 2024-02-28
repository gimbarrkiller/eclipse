import React, {
  FC,
  memo,
  useEffect,
  useState,
} from 'react';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';

import { LinksHead } from '../LinksHead';
import { SignInUsButtons } from '../SignInUsButtons';

import styles from './styles.module.scss';

interface IBurgerMenu {
  onBurgerChange: () => void;
}

export const BurgerMenu:FC<IBurgerMenu> = memo(({ onBurgerChange }) => {
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  const [height, setHeight] = useState('');

  const set100vhVar = () => {
    setHeight(`${window.innerHeight - 64}px`);
  };

  useEffect(() => {
    if (isTablet) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('resize', () => {
        set100vhVar();
      });

      window.addEventListener('orientationchange', () => {
        set100vhVar();
      });

      setTimeout(set100vhVar, 50);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isTablet]);

  return (
    <div
      className={styles.burger}
      style={{ height }}
    >
      <LinksHead onBurgerChange={onBurgerChange} />
      {isTablet && <SignInUsButtons onBurgerChange={onBurgerChange} />}
    </div>
  );
});
