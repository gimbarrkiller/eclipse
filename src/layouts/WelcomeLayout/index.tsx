import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from 'components';

import styles from './styles.module.scss';

export const WelcomeLayout = () => (
  <div>
    <Header />
    <div className={styles.layout_wrapper}>
      <Outlet />
    </div>
    <Footer />
  </div>
);
