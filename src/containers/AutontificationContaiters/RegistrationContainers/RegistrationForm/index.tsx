import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation, Trans } from 'react-i18next';

import { PathName } from 'appConstants';
import { IAutontificationComponent, SelectOption } from 'types';
import { emailValidator, LocaleKey, passwordValidator } from 'utils';
import { authRegistration, getCountry } from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';

import {
  Button, Checkbox,
  Input, Select,
  toastError,
  toastSuccess,
} from 'components';

import { registrationCustomStyles } from './registrationCustomStyles';

import styles from '../../styles.module.scss';

export const RegistrationForm:FC<IAutontificationComponent> = ({ onChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('welcome');
  const trans = useTranslation('main').t;
  const transDep = useTranslation('deposit').t;

  const searchParams = new URLSearchParams(window.location.search);
  const ref = searchParams.get('ref') || '';

  const { country, isLoading } = useSelector(authSelectors.getState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [countrySelect, setCountrySelect] = useState<SelectOption<string>>();
  const [check, setCheck] = useState(false);

  const isDisableBnt = !email || !password || !passwordRepeat || !check;

  const onClickSignIn = useCallback(() => {
    navigate(PathName.SignIn);
  }, [navigate]);

  const onChangeCountry = useCallback((value: SelectOption<string>) => {
    setCountrySelect(value);
  }, [setCountrySelect]);

  const onChangeForm = useCallback(() => {
    onChange('confirm');
    toastSuccess(t('Sign_in_code_send_email_', { email }));
  }, [onChange, email, t]);

  const onClickRegistration = useCallback(() => {
    const currentEmailError = emailValidator(email);
    if (currentEmailError) {
      toastError(t('Invalid Email'));
      return;
    }
    const currentPasswordError = passwordValidator(password);
    if (currentPasswordError) {
      toastError(t(currentPasswordError));
      return;
    }
    if (password !== passwordRepeat) {
      toastError(t('Sign_in_password_mismatch_'));
      return;
    }
    dispatch(authRegistration({
      email,
      password,
      passwordRepeat,
      country: countrySelect?.value,
      ref,
      onCallback: onChangeForm,
    }));
  }, [
    dispatch,
    email,
    password,
    passwordRepeat,
    ref,
    countrySelect,
    onChangeForm,
    t,
  ]);

  const labelCheck = useMemo(() => (
    <Trans
      t={t}
      i18nKey="Accept_the_terms_"
    >
      I accept the terms
      <a
        href={`/files/agency-agreement-${localStorage.getItem('lng') || LocaleKey.en}.pdf`}
        target="_blank"
        rel="noreferrer"
        className={styles.label_check}
      >
        Agency agreement
      </a>
    </Trans>
  ), [t]);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  return (
    <div className={styles.main_half_first}>
      <div className={styles.main_title}>
        {t('Registration_title_')}
      </div>
      <div className={styles.main_subtitle}>
        {t('Registration_subtitle_')}
        {' '}
        <button
          className={styles.main_subtitle_btn}
          onClick={onClickSignIn}
        >
          {t('Registration_subtitle_enter_')}
        </button>
      </div>
      <div className={styles.main_form}>
        <Input
          type="login"
          value={email}
          onChangeValue={setEmail}
          placeholder={t('Registration_form_email_')}
        />
        <Input
          isPassword
          value={password}
          onChangeValue={setPassword}
          placeholder={t('Registration_form_password_')}
        />
        <Input
          value={passwordRepeat}
          onChangeValue={setPasswordRepeat}
          placeholder={t('Registration_form_password_repeat_')}
          isPassword
        />
        <Select
          options={country}
          onChange={onChangeCountry}
          value={countrySelect || null}
          style={{ ...registrationCustomStyles }}
          placeholder={transDep('Country_')}
          isSearchable
        />
        <Checkbox
          isChecked={check}
          onChange={setCheck}
          label={labelCheck}
        />
        <Button
          onClick={onClickRegistration}
          className={styles.main_btn}
          isBigHeight
          disabled={isDisableBnt}
          isLoading={isLoading}
        >
          {trans('Create_acc_')}
        </Button>
      </div>
      <div className={styles.main_subtitle}>
        {t('Registration_form_subtitle_')}
      </div>
    </div>
  );
};
