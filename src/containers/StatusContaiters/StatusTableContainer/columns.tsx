import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { avatarImage } from 'assets/images';

import { CopyText, Image } from 'components';

import { StatusRowProps, StatusType } from './types';

import styles from './styles.module.scss';

export const useColumns = () => {
  const { t } = useTranslation('status');

  return useMemo(() => [
    {
      Header: t('Referral_'),
      accessor: 'referral',
      Cell: ({
        row: {
          original: { avatar, referral, id },
        },
      }: StatusRowProps<StatusType>) => (
        <div className={styles.status_table_avatar_name}>
          <Image
            url={avatar || avatarImage}
            className={styles.status_table_avatar}
          />
          <div className={styles.status_table_name_id}>
            <div className={styles.status_table_name}>
              {referral}
            </div>
            <div className={styles.status_table_id}>
              ID:
              {' '}
              <CopyText
                classNameText={styles.status_table_id}
                text={`${id}`}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      Header: t('Active_status_'),
      accessor: 'active',
      Cell: ({
        row: {
          original: { active },
        },
      }: StatusRowProps<StatusType>) => (
        <div className={styles.status_table_trial}>
          {active && t('Active_')}
        </div>
      ),
    },
    {
      Header: t('Number_license_sales_'),
      accessor: 'numberLicensesSold',
      Cell: ({
        row: {
          original: { numberLicensesSold },
        },
      }: StatusRowProps<StatusType>) => (
        <div className={styles.status_table_number_sold}>
          {numberLicensesSold}
        </div>
      ),
    },
    {
      Header: t('Number_referrals_active_'),
      accessor: 'numberActiveLicenses',
      Cell: ({
        row: {
          original: { numberActiveLicenses },
        },
      }: StatusRowProps<StatusType>) => (
        <div
          className={cn(styles.status_table_number_sold, styles.status_table_number_active)}
        >
          {numberActiveLicenses}
        </div>
      ),
    },
    {
      Header: t('Sales_amount_'),
      accessor: 'turnover',
      Cell: ({
        row: {
          original: { turnover },
        },
      }: StatusRowProps<StatusType>) => (
        <div className={styles.status_table_turnover}>
          {turnover}
          {' '}
          $
        </div>
      ),
    },
  ], [t]);
};
