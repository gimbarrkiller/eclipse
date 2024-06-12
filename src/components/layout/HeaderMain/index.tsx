import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { PathName } from 'appConstants';
import {
  burgerBlackIcon,
  closeBlackIcon,
  logoImage,
} from 'assets/images';

import { Image, ButtonIcon, LangMenu } from 'components';

import { BurgerMenu } from './BurgerMenu';

import styles from './styles.module.scss';

export const HeaderMain = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const onBurgerChange = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const burgerControl = useMemo(() => (
    <ButtonIcon
      imageURL={isOpen ? closeBlackIcon : burgerBlackIcon}
      className={cn(styles.header_controls_burger, {
        [styles.header_controls_burger_open]: isOpen,
      })}
      onClick={onBurgerChange}
    />
  ), [isOpen, onBurgerChange]);

  return (
    <div className={styles.header}>
      <div
        className={cn(styles.header_container, {
          [styles.header_burger_open]: isOpen,
        })}
      >
        <Link
          to={PathName.Profile}
          onClick={isOpen ? onBurgerChange : () => {}}
          className={styles.header_logo_container}
        >
          <Image
            url={logoImage}
            className={styles.header_logo}
          />
        </Link>
        <div className={styles.header_controls}>
          <LangMenu
            classNameContainer={cn(styles.header_controls_lang, {
              [styles.header_controls_lang_open]: isOpen,
            })}
          />
          {burgerControl}
        </div>
      </div>
      {isOpen && <BurgerMenu onBurgerChange={onBurgerChange} />}
    </div>
  );
});
