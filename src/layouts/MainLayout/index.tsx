import React from 'react';
import cx from 'classnames';
import { Outlet } from 'react-router-dom';

import { Header } from 'components';

import styles from './styles.module.scss';

export const MainLayout = () => (
  <div>
    <Header />
    <div
      className={cx(
        styles.layout_wrapper,
      )}
    >
      <Outlet />
    </div>
  </div>
);
