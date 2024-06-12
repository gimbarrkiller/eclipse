import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PathName, ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { authSelectors } from 'store/auth/selectors';
import { getProfileData } from 'store/profile/actionCreators';

import { HeaderMain, Sidebar } from 'components';
import { ModalLayer } from 'layouts';

import styles from './styles.module.scss';

export const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  const accessToken = useSelector(authSelectors.getProp('accessToken'));
  const { pathname } = useLocation();
  const layoutDiv = document.querySelector('#layout');

  useEffect(() => {
    if (!accessToken) {
      navigate(PathName.Home);
      return;
    }
    dispatch(getProfileData());
  }, [accessToken, navigate, dispatch]);

  useEffect(() => {
    if (layoutDiv && pathname) {
      layoutDiv.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [layoutDiv, pathname]);

  useEffect(() => {
    document.body.style.backgroundColor = isLaptop ? '#F1F4F7' : 'white';
    document.body.style.color = '#051655';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [isLaptop]);

  return (
    <div className={styles.layout}>
      {isLaptop && <HeaderMain />}
      {!isLaptop && <Sidebar />}
      <div className={styles.layout_wrapper}>
        <div
          id="layout"
          className={styles.layout_top}
        />
        <div className={styles.layout_wrapper_container}>
          <Outlet />
        </div>
      </div>
      <ModalLayer />
    </div>
  );
};
