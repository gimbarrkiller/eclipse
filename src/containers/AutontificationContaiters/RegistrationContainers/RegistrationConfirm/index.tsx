import React, {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { IAutontificationComponent } from 'types';
import { authRegistrationActive } from 'store/auth/actionCreators';
import { authSelectors } from 'store/auth/selectors';

import styles from '../../styles.module.scss';

export const RegistrationConfirm:FC<IAutontificationComponent> = ({ onChange }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('welcome');
  const { search } = useLocation();
  const codeUrl = search.split('?code=')[1];

  const { email } = useSelector(authSelectors.getState);

  const [code, setCode] = useState('');
  const [time, setTime] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const onChangeForm = useCallback(() => {
    onChange('success');
  }, [onChange]);

  const onClickRegistration = useCallback((str?: string) => {
    dispatch(authRegistrationActive({
      code: typeof str === 'string' ? str : code,
      onCallback: onChangeForm,
    }));
  }, [
    code,
    onChangeForm,
    dispatch,
  ]);

  useEffect(() => {
    if (codeUrl) {
      setCode(codeUrl);
      onClickRegistration(codeUrl);
    }
  }, [codeUrl, setCode, onClickRegistration]);

  return (
    <div className={styles.main_half_first}>
      <div className={styles.main_title}>
        {t('Registration_confirm_title_')}
      </div>
      <div className={cn(styles.main_subtitle, styles.main_subtitle_big)}>
        {t('Registration_confirm_subtitle_', { email })}
      </div>
    </div>
  );
};
