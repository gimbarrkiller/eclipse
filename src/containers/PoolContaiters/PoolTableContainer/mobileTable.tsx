import React from 'react';
import { TFunction } from 'i18next';
import cn from 'classnames';

import { avatarImage } from 'assets/images';
import { PoolType } from 'types';

import { CopyText, Image } from 'components';

import styles from './styles.module.scss';

export const MobileTable = ({
  avatar,
  referral,
  id,
  numberLicensesSold,
  numberActiveLicenses,
  turnover,
}: PoolType, t: TFunction) => (
  <div className={styles.status_table_subrow}>
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
    <div className={styles.status_table_subrow_item}>
      <div className={styles.status_table_subrow_item_first}>
        {t('Pool_participant_')}
      </div>
      <div className={styles.status_table_number_sold}>
        {numberLicensesSold}
      </div>
    </div>
    <div className={styles.status_table_subrow_item}>
      <div className={styles.status_table_subrow_item_first}>
        {t('Total_licenses_sold_personally_referrals_')}
      </div>
      <div
        className={cn(styles.status_table_number_sold, styles.status_table_number_active)}
      >
        {numberActiveLicenses}
      </div>
    </div>
    <div className={styles.status_table_subrow_item}>
      <div className={styles.status_table_subrow_item_first}>
        {t('Sales_amount_')}
      </div>
      <div className={styles.status_table_turnover}>
        {turnover}
        {' '}
        $
      </div>
    </div>
  </div>
);
