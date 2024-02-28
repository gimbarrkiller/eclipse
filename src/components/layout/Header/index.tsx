import React, {
  memo,
  useCallback, useEffect,
  useMemo,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { PathName, ScreenWidth } from 'appConstants';
import {
  logoImage,
  burgerIcon,
  closeIcon,
} from 'assets/images';
import { useScreenWidth } from 'hooks';

import { Image, ButtonIcon, LangMenu } from 'components';

import { LinksHead } from './LinksHead';

import { BurgerMenu } from './BurgerMenu';
import { SignInUsButtons } from './SignInUsButtons';

import styles from './styles.module.scss';

export const Header = memo(() => {
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  const isTablet = useScreenWidth(ScreenWidth.tablet);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const onBurgerChange = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const onScrollChange = useCallback(() => {
    setIsScrolling(window.scrollY >= 10);
  }, [setIsScrolling]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollChange);
    return () => {
      window.removeEventListener('scroll', onScrollChange);
    };
  }, [onScrollChange]);

  const burgerControl = useMemo(() => (
    <ButtonIcon
      imageURL={isOpen ? closeIcon : burgerIcon}
      classNameImage={styles.header_controls_burger_icon}
      className={styles.header_controls_burger}
      onClick={onBurgerChange}
    />
  ), [isOpen, onBurgerChange]);

  return (
    <div
      className={cn(styles.header, {
        [styles.header_fixed]: isScrolling,
      })}
    >
      <div
        className={cn(styles.header_container, {
          [styles.header_burger_open]: isOpen,
          [styles.header_container_fixed]: isScrolling,
        })}
      >
        <div className={styles.header_content}>
          <Link to={PathName.Home}>
            <Image url={logoImage} />
          </Link>
          {!isLaptop && <LinksHead onBurgerChange={onBurgerChange} />}
          {isLaptop && !isTablet && <LangMenu />}
        </div>
        <div className={styles.header_controls}>
          {(!isLaptop || isTablet) && <LangMenu />}
          {isLaptop && burgerControl}
          {!isTablet && <SignInUsButtons />}
        </div>
      </div>
      {isLaptop && isOpen && <BurgerMenu onBurgerChange={onBurgerChange} />}
    </div>
  );
});
