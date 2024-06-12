import React from 'react';
import { TFunction } from 'i18next';

import { depositIcon, withdrawalIcon } from 'assets/images';
import { TransactionsType } from 'types';
import { dateFormat } from 'utils';

import { Image, Status } from 'components';

import styles from './styles.module.scss';

export const MobileTable = ({
  type,
  id,
  sum,
  date,
  status,
  from_user,
}: TransactionsType, t: TFunction) => (
  <div className={styles.transactions_table_subrow}>
    <div className={styles.transactions_table_subrow_item}>
      <div className={styles.transactions_table_subrow_item_first}>
        {t('Transactions_type_')}
      </div>
      <div className={styles.transactions_table_type}>
        <Image
          url={type === 'outgoing' ? withdrawalIcon : depositIcon}
          className={styles.transactions_table_avatar}
        />
        <div>
          {t(type === 'outgoing' ? 'Transactions_withdrawal_' : 'Transactions_affiliate_reward_')}
        </div>
      </div>
    </div>

    <div className={styles.transactions_table_subrow_item}>
      <div className={styles.transactions_table_subrow_item_first}>
        ID
      </div>
      <div className={styles.transactions_table_number_sold}>
        {from_user ? from_user - 1 : ''}
      </div>
    </div>

    <div className={styles.transactions_table_subrow_item}>
      <div className={styles.transactions_table_subrow_item_first}>
        {t('Transactions_number_pay_')}
      </div>
      <div className={styles.transactions_table_number_sold}>
        {id}
      </div>
    </div>

    <div className={styles.transactions_table_subrow_item}>
      <div className={styles.transactions_table_subrow_item_first}>
        {t('Transactions_sum_')}
      </div>
      <div className={styles.transactions_table_sum}>
        {sum}
        {' '}
        $
      </div>
    </div>

    <div className={styles.transactions_table_subrow_item}>
      <div className={styles.transactions_table_subrow_item_first}>
        {t('Transactions_date_')}
      </div>
      {date && (
        <div className={styles.transactions_table_time}>
          {dateFormat(date)}
          {' '}
          <span className={styles.transactions_table_subtime}>
            {dateFormat(date, 'hh:mm:ss')}
          </span>
        </div>
      )}
    </div>

    <div className={styles.transactions_table_subrow_item}>
      <div className={styles.transactions_table_subrow_item_first}>
        {t('Transactions_status_')}
      </div>
      <Status status={status} />
    </div>
  </div>
);
