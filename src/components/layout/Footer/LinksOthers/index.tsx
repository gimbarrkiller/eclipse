import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.scss';

interface ILinksOthers {
  links: { link: string, title: string }[];
  classNameContainer: string;
}

export const LinksOthers:FC<ILinksOthers> = memo(({
  links,
  classNameContainer,
}) => (
  <div className={cn(styles.footer_others, classNameContainer)}>
    {links.map(({ link, title }) => (
      <NavLink
        key={title}
        to={link}
        className={styles.footer_navigation_link}
      >
        {title}
      </NavLink>
    ))}
  </div>
));
