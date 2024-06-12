import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { depositIcon, withdrawalIcon } from 'assets/images';
import { CurrencySymbol } from 'appConstants';
import { dateFormat } from 'utils';

import { Image, Status } from 'components';

import { TransactionsRowProps, TransactionsType } from './types';

import styles from './styles.module.scss';

export const useColumns = () => {
  const { t } = useTranslation('transactions');

  return useMemo(() => [
    {
      Header: t('Transactions_type_'),
      accessor: 'type',
      Cell: ({
        row: {
          original: { type },
        },
      }: TransactionsRowProps<TransactionsType>) => (
        <div className={styles.transactions_table_type}>
          <Image
            url={type === 'outgoing' ? withdrawalIcon : depositIcon}
            className={styles.transactions_table_avatar}
          />
          <div>
            {t(type === 'outgoing' ? 'Transactions_withdrawal_' : 'Transactions_affiliate_reward_')}
          </div>
        </div>
      ),
    },
    {
      Header: 'ID',
      accessor: 'from_user',
      Cell: ({ row: { original: { from_user } } }: TransactionsRowProps<TransactionsType>) => (
        from_user ? from_user - 1 : ''
      ),
    },
    {
      Header: t('Transactions_number_pay_'),
      accessor: 'id',
    },
    {
      Header: t('Transactions_sum_'),
      accessor: 'sum',
      Cell: ({ row: { original: { sum, currency } } }: TransactionsRowProps<TransactionsType>) => (
        <div className={styles.transactions_table_sum}>
          {sum}
          {' '}
          {CurrencySymbol[currency] || '$'}
        </div>
      ),
    },
    {
      Header: t('Transactions_date_'),
      accessor: 'date',
      Cell: ({ row: { original: { date } } }: TransactionsRowProps<TransactionsType>) => (
        date && (
          <div className={styles.transactions_table_time}>
            {dateFormat(date)}
            {' '}
            <span className={styles.transactions_table_subtime}>
              {dateFormat(date, 'hh:mm:ss')}
            </span>
          </div>
        )
      ),
    },
    {
      Header: t('Transactions_status_'),
      accessor: 'status',
      Cell: ({ row: { original: { status } } }: TransactionsRowProps<TransactionsType>) => (
        <Status status={status} />
      ),
    },
  ], [t]);
};
