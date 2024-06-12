import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ellipse1Icon, ellipse2Icon } from 'assets/images';
import { PathName, ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';

import { Image, toastSuccess } from 'components';
import { ForgotPassword } from 'containers';

import styles from './styles.module.scss';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation('welcome');
  const isLaptop = useScreenWidth(ScreenWidth.laptop);

  const onFormChange = useCallback(() => {
    toastSuccess(t('Sign_in_password_send_email_', { email }));
    navigate(PathName.SignIn);
  }, [t, email, navigate]);

  return (
    <div className={styles.main_container}>
      <div className={styles.main_content}>
        <Image
          className={styles.ellipse_1}
          url={ellipse1Icon}
        />
        <ForgotPassword
          onChange={onFormChange}
          email={email}
          setEmail={setEmail}
        />
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
