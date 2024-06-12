import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { dateFormat } from 'utils';
import { profileSelectors } from 'store/profile/selectors';

import { WhiteContainer } from 'containers';

import styles from './styles.module.scss';

const hubURL = process.env.REACT_APP_HUB_URL;

export const DateActiveContainer = () => {
  const { t } = useTranslation('partner');
  const {
    isLicense,
    dataActive,
    dataDeActive,
    referralCode,
  } = useSelector(profileSelectors.getState);
  const link = `${hubURL}/?ref=${referralCode}&self=true`;

  return (
    <div className={styles.partner_container}>

      <WhiteContainer className={styles.partner_content}>
        {isLicense && dataActive ? (
          <div className={styles.partner_container_text}>
            {t('Date_active_', { date: dateFormat(dataActive) })}
          </div>
        ) : (
          <div className={styles.partner_container_text_error}>
            {t('Your_activation_has_expired_')}
          </div>
        )}
      </WhiteContainer>
      <WhiteContainer className={styles.partner_content}>
        {isLicense && dataDeActive ? (
          <div className={styles.partner_container_text_error}>
            {t('Date_expiration_', { date: dateFormat(dataDeActive) })}
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {t('Referral_code_3_')}
          </a>
        )}
      </WhiteContainer>
    </div>
  );
};
