import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

import { ellipse1Icon, ellipse2Icon } from 'assets/images';
import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { FormStateType } from 'types';

import {
  RegistrationConfirm,
  RegistrationForm,
  RegistrationSuccess,
} from 'containers';
import { Image } from 'components';

import styles from './styles.module.scss';

export const RegistrationPage = () => {
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  const { search } = useLocation();

  const [stateForm, setStateForm] = useState<FormStateType>('form');

  const onFormChange = useCallback((n: FormStateType) => {
    setStateForm(n);
  }, [setStateForm]);

  useEffect(() => {
    if (search.includes('code')) {
      onFormChange('confirm');
    }
  }, [search, onFormChange]);

  const component = useMemo(() => ({
    form: <RegistrationForm onChange={onFormChange} />,
    confirm: <RegistrationConfirm onChange={onFormChange} />,
    success: <RegistrationSuccess onChange={onFormChange} />,
  }), [onFormChange]);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <Image
          className={styles.ellipse_1}
          url={ellipse1Icon}
        />
        {component[stateForm]}
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
