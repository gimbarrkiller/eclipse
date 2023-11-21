import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { useScreenWidth } from 'hooks';
import { ScreenWidth } from 'appConstants';

import { Image } from 'components';

import styles from './styles.module.scss';

interface ILinksSocialFooter {
  links: { link: string, icon: string, title?: string }[];
  classNameContainer: string;
}

export const LinksSocialFooter:FC<ILinksSocialFooter> = memo(({
  links,
  classNameContainer,
}) => {
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  return (
    <div className={cn(styles.footer_social, classNameContainer)}>
      {links.map(({ icon, link, title }) => (
        <NavLink
          key={link}
          to={link}
          className={styles.footer_social_link}
        >
          <Image
            url={icon}
            className={styles.footer_social_link_icon}
          />
          {title && !isLaptop && (
            <div className={styles.footer_social_link_text}>
              {title}
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
});
