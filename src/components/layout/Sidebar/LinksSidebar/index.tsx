import React, { FC, memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { Image } from 'components';

import { linksSidebar } from '../constants';

import styles from './styles.module.scss';

interface ILinksSidebar {
  onBurgerChange?: () => void;
}

export const LinksSidebar:FC<ILinksSidebar> = memo(({ onBurgerChange }) => {
  const { t } = useTranslation('sidebar');
  const { pathname: currentPath } = useLocation();
  return (
    <div className={styles.sidebar_navigation}>
      {linksSidebar.map(({
        pathName,
        title,
        icon,
        iconActive,
      }) => (
        <NavLink
          onClick={onBurgerChange}
          key={title}
          to={pathName}
          className={cn(styles.sidebar_navigation_link, {
            [styles.active]: currentPath === pathName,
          })}
        >
          <Image url={currentPath === pathName ? iconActive : icon} />
          <div className={styles.sidebar_navigation_link_text}>
            {t(title)}
          </div>
        </NavLink>
      ))}
    </div>
  );
});
