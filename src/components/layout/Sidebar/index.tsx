import React, {
  FC,
  memo,
  useCallback,
  useContext, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { logoImage, logoutIcon } from 'assets/images';
import { PathName, ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { ModalContext } from 'context';
import { profileSelectors } from 'store/profile/selectors';
import { authSignOut } from 'store/auth/actionCreators';

import { TermsWithdrawModal } from 'modals';
import {
  Image,
  Button,
  CopyText,
  LangMenu,
} from 'components';

import { LinksSidebar } from './LinksSidebar';

import styles from './styles.module.scss';

interface ISidebar {
  onBurgerChange?: () => void;
}

export const Sidebar:FC<ISidebar> = memo(({ onBurgerChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openJsxModal } = useContext(ModalContext);
  const trans = useTranslation('main').t;
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  const { balance, id } = useSelector(profileSelectors.getState);
  const [height, setHeight] = useState('');

  const handleWithdrawClick = useCallback(() => {
    openJsxModal(<TermsWithdrawModal />);
  }, [openJsxModal]);

  const onNavigateHome = useCallback(() => {
    navigate(PathName.Home);
  }, [navigate]);

  const onClickSignOut = useCallback(() => {
    dispatch(authSignOut({
      onCallback: onNavigateHome,
    }));
  }, [
    dispatch,
    onNavigateHome,
  ]);

  const set100vhVar = () => {
    setHeight(`${window.innerHeight - 120}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      set100vhVar();
    });

    window.addEventListener('orientationchange', () => {
      set100vhVar();
    });

    setTimeout(set100vhVar, 50);
  }, []);

  return (
    <div className={styles.sidebar}>
      <Link
        to={PathName.Profile}
        className={styles.header_logo_container}
      >
        <Image
          url={logoImage}
          className={cn(styles.sidebar_logo, {
            [styles.sidebar_logo_laptop]: isLaptop,
          })}
        />
      </Link>
      <div
        className={styles.sidebar_content}
        style={{ height }}
      >
        <div>
          <div className={styles.sidebar_balance}>
            <div className={styles.sidebar_balance_text}>
              $
              {' '}
              {balance}
            </div>
            <Button onClick={handleWithdrawClick}>
              {trans('Withdraw_')}
            </Button>
          </div>
          <div className={styles.sidebar_id}>
            ID:
            {' '}
            <CopyText
              text={`${id - 1}`}
            />
          </div>
          <LinksSidebar onBurgerChange={onBurgerChange} />
        </div>
        <div className={styles.sidebar_bottom}>
          {!isLaptop && (
            <LangMenu
              classNameBox={styles.sidebar_lang_hover}
              isLabel
            />
          )}
          <button
            onClick={onClickSignOut}
            className={styles.sidebar_menu}
          >
            <Image url={logoutIcon} />
            <div className={styles.sidebar_menu_text}>
              {trans('Logout_')}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});
