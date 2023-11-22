import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { linksApp } from '../constants';

import styles from './styles.module.scss';

export const LinksFooter = memo(() => {
  const { t } = useTranslation('footer');
  return (
    <div className={styles.footer_navigation}>
      {linksApp.map(({ pathName, title }) => (
        <NavLink
          key={title}
          to={pathName}
          className={styles.footer_navigation_link}
        >
          {t(title)}
        </NavLink>
      ))}
    </div>
  );
});
