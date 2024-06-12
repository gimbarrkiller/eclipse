import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import { PathName } from 'appConstants';
import { profileSelectors } from 'store/profile/selectors';

import {
  Button,
  Input,
  TitleText, toastSuccess,
} from 'components';
import { WhiteContainer } from 'containers';

import styles from './styles.module.scss';

export const ReferralCodeContainer = () => {
  const isHost = window.location.host.includes('test');

  const baseURL = isHost ? PathName.AppUrlTest : PathName.AppUrl;
  const hubURL = isHost ? PathName.AppHubUrlTest : PathName.AppHubUrl;
  const mainURL = isHost ? PathName.AppMainUrlTest : PathName.AppMainUrl;

  const { t } = useTranslation('partner');
  const { referralCode } = useSelector(profileSelectors.getState);

  const referralLink = `${baseURL}${PathName.Registration}?ref=${referralCode}`;
  const referralLink2 = `${mainURL}/?ref=${referralCode}`;
  const referralLink3 = `${hubURL}/?ref=${referralCode}&self=true`;

  const onCopy = useCallback(() => {
    toastSuccess(t('Copy_code_'));
  }, [t]);

  return (
    <div className={styles.partner_container}>
      <TitleText text={t('My_referral_code_')} />
      <WhiteContainer className={styles.partner_content}>
        <div className={styles.partner_copy}>
          <Input
            value={referralLink || ''}
            label={t('Referral_code_1_')}
            classNameLabel={styles.partner_copy_label}
            disabled
          />
          <CopyToClipboard
            text={referralLink || ''}
            onCopy={onCopy}
          >
            <Button className={styles.partner_copy_btn}>
              {t('Copy_')}
            </Button>
          </CopyToClipboard>
        </div>

        <div className={styles.partner_copy}>
          <Input
            value={referralLink2 || ''}
            label={t('Referral_code_2_')}
            classNameLabel={styles.partner_copy_label}
            disabled
          />
          <CopyToClipboard
            text={referralLink2 || ''}
            onCopy={onCopy}
          >
            <Button className={styles.partner_copy_btn}>
              {t('Copy_')}
            </Button>
          </CopyToClipboard>
        </div>
        <div className={styles.partner_copy}>
          <Input
            value={referralLink3 || ''}
            label={t('Referral_code_3_')}
            classNameLabel={styles.partner_copy_label}
            disabled
          />
          <CopyToClipboard
            text={referralLink3 || ''}
            onCopy={onCopy}
          >
            <Button className={styles.partner_copy_btn}>
              {t('Copy_')}
            </Button>
          </CopyToClipboard>
        </div>
      </WhiteContainer>
    </div>
  );
};
