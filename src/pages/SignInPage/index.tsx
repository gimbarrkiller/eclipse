import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ellipse1Icon, ellipse2Icon } from 'assets/images';
import { PathName, ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { emailValidator, passwordValidator } from 'utils';
import { authSelectors } from 'store/auth/selectors';
import { authSignIn } from 'store/auth/actionCreators';

import {
  Button,
  Image,
  Input,
  toastError,
} from 'components';

import styles from './styles.module.scss';

export const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('welcome');
  const trans = useTranslation('main').t;
  const isLaptop = useScreenWidth(ScreenWidth.laptop);

  const isLoading = useSelector(authSelectors.getProp('isLoading'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickRegister = useCallback(() => {
    navigate(PathName.Registration);
  }, [navigate]);

  const onClickForgotPassword = useCallback(() => {
    navigate(PathName.ForgotPassword);
  }, [navigate]);

  const onClickProfile = useCallback(() => {
    navigate(PathName.Profile);
  }, [navigate]);

  const onClickSignIn = useCallback(() => {
    const currentEmailError = emailValidator(email);
    if (currentEmailError) {
      toastError(t('Invalid Email'));
      return;
    }
    const currentPasswordError = passwordValidator(password);
    if (currentPasswordError) {
      toastError(t('Invalid password'));
      return;
    }
    dispatch(authSignIn({
      email,
      password,
      onCallback: onClickProfile,
    }));
  }, [
    t,
    dispatch,
    email,
    password,
    onClickProfile,
  ]);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <Image
          className={styles.ellipse_1}
          url={ellipse1Icon}
        />
        <div className={styles.main_half_first}>
          <div className={styles.main_title}>
            {t('Sign_in_title_')}
          </div>
          <div className={styles.main_subtitle}>
            {t('Sign_in_subtitle_')}
            {' '}
            <button
              onClick={onClickRegister}
              className={styles.main_subtitle_btn}
            >
              {t('Sign_in_subtitle_enter_')}
            </button>
          </div>
          <div className={styles.main_form}>
            <Input
              value={email}
              onChangeValue={setEmail}
              placeholder={t('Registration_form_email_')}
            />
            <Input
              value={password}
              onChangeValue={setPassword}
              placeholder={t('Registration_form_password_')}
              isPassword
            />
            <Button
              onClick={onClickSignIn}
              className={styles.main_btn}
              isBigHeight
              isLoading={isLoading}
              disabled={!email || !password}
            >
              {trans('Enter_')}
            </Button>
          </div>
          <div className={styles.main_subtitle}>
            <button onClick={onClickForgotPassword}>
              {t('Sign_in_forgot_password_')}
            </button>
          </div>
        </div>
        {!isLaptop && (
          <div className={styles.main_half_second}>
            <Image
              className={styles.ellipse_2}
              url={ellipse2Icon}
            />
          </div>
        )}
      </div>
    </div>
  );
};
