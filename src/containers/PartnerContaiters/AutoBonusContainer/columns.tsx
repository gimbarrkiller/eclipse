import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { checkGreenIcon } from 'assets/images';

import { Image } from 'components';

import { AutoBonusRowProps, AutoBonusType } from './types';

import styles from './styles.module.scss';

export const useColumns = () => {
  const { t } = useTranslation('partner');

  return useMemo(() => [
    {
      Header: '',
      accessor: 'active',
      Cell: ({ row: { original: { active } } }: AutoBonusRowProps<AutoBonusType>) => (
        active && <Image url={checkGreenIcon} />
      ),
    },
    {
      Header: t('Car_make_'),
      accessor: 'model',
      Cell: ({ row: { original: { model } } }: AutoBonusRowProps<AutoBonusType>) => (
        <div className={styles.auto_bonus_table_car}>
          {model}
        </div>
      ),
    },
    {
      Header: t('Personal_sales_'),
      accessor: 'personalSales',
      Cell: ({ row: { original: { personalSales } } }: AutoBonusRowProps<AutoBonusType>) => (
        <div className={styles.auto_bonus_table_number_sold}>
          {personalSales}
        </div>
      ),
    },
    {
      Header: t('Ref_sales_'),
      accessor: 'refSales',
      Cell: ({ row: { original: { refSales } } }: AutoBonusRowProps<AutoBonusType>) => (
        <div
          className={cn(styles.auto_bonus_table_number_sold, styles.auto_bonus_table_number_ref)}
        >
          {refSales}
        </div>
      ),
    },
    {
      Header: t('Rewards_'),
      accessor: 'reward',
      Cell: ({ row: { original: { reward } } }: AutoBonusRowProps<AutoBonusType>) => (
        <div
          className={cn(styles.auto_bonus_table_number_sold, styles.auto_bonus_table_number_reward)}
        >
          {reward}
          $
        </div>
      ),
    },
  ], [t]);
};
