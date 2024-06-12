import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { PathName } from 'appConstants';
import { IAutontificationComponent } from 'types';
import { authSelectors } from 'store/auth/selectors';
import { authResetPassword } from 'store/auth/actionCreators';

import { Button, Input } from 'components';

import styles from '../../styles.module.scss';

export const ForgotPassword:FC<IAutontificationComponent> = ({
  onChange,
  email = '',
  setEmail,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('welcome');
  const trans = useTranslation('main').t;

  const isLoading = useSelector(authSelectors.getProp('isLoading'));

  const onChangeForm = useCallback(() => {
    onChange('success');
  }, [onChange]);

  const onClickBack = useCallback(() => {
    navigate(PathName.SignIn);
  }, [navigate]);

  const onClickResetPassword = useCallback(() => {
    dispatch(authResetPassword({
      email,
      onCallback: onChangeForm,
    }));
  }, [dispatch, email, onChangeForm]);

  return (
    <div className={cn(styles.main_half_first, styles.main_half_first_forger)}>
      <div className={styles.main_title}>
        {t('Sign_in_forgot_password_')}
      </div>
      <div className={cn(styles.main_subtitle, styles.main_subtitle_big)}>
        {t('Sign_in_forgot_password_subtitle_')}
      </div>
      <div className={styles.main_form}>
        <Input
          value={email}
          onChangeValue={setEmail}
          placeholder={t('Registration_form_email_')}
        />
        <Button
          onClick={onClickResetPassword}
          className={styles.main_btn}
          isBigHeight
          isLoading={isLoading}
          disabled={!email}
        >
          {trans('Send_')}
        </Button>
      </div>
      <div className={styles.main_subtitle}>
        <button onClick={onClickBack}>
          {t('Sign_in_forgot_password_back_')}
        </button>
      </div>
    </div>
  );
};
