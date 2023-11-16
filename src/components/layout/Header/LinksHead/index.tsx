import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { links } from '../constants';

import styles from './styles.module.scss';

export const LinksHead = memo(() => {
  const { pathname: currentPath } = useLocation();
  return (
    <div className={styles.header_navigation}>
      {links.map(({ pathName, title }) => (
        <NavLink
          key={title}
          to={pathName}
          className={cn(styles.header_navigation_link, {
            [styles.active]: currentPath === pathName,
          })}
        >
          {title}
        </NavLink>
      ))}
    </div>
  );
});
