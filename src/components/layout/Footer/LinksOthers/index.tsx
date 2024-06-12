import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import styles from './styles.module.scss';

interface ILinksOthers {
  links: { link: string, title: string }[];
  classNameContainer: string;
}

export const LinksOthers:FC<ILinksOthers> = memo(({
  links,
  classNameContainer,
}) => {
  const { t } = useTranslation('footer');

  return (
    <div className={cn(styles.footer_others, classNameContainer)}>
      {links.map(({ link, title }) => (
        <a
          key={title}
          href={link}
          target="_blank"
          rel="noreferrer"
          className={styles.footer_navigation_link}
        >
          {t(title)}
        </a>
      ))}
    </div>
  );
});
