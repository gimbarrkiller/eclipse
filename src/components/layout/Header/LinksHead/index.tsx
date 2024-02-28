import React, { FC, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link } from 'react-scroll';
import cn from 'classnames';

import { PathName } from 'appConstants';

import { links } from '../constants';

import styles from './styles.module.scss';

interface ILinksHead {
  onBurgerChange: () => void;
}

export const LinksHead:FC<ILinksHead> = memo(({ onBurgerChange }) => {
  const { t } = useTranslation('header');
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  const handleScrollToMainPage = useCallback(() => {
    onBurgerChange();
    if (currentPath !== PathName.Home) {
      navigate(PathName.Home);
    }
  }, [navigate, onBurgerChange, currentPath]);

  return (
    <div className={styles.header_navigation}>
      {links.map(({ pathName, title }) => (
        <Link
          key={title}
          smooth
          offset={-100}
          to={pathName}
          onClick={handleScrollToMainPage}
          className={cn(styles.header_navigation_link, {
            [styles.active]: currentPath === pathName,
          })}
        >
          {t(title)}
        </Link>
      ))}
    </div>
  );
});
