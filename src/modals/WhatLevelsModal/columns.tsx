import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { WhatLvlTypeRowProps, WhatLvlType } from './types';

import styles from './styles.module.scss';

export const useColumns = () => {
  const { t } = useTranslation('partner');
  const trans = useTranslation('welcome').t;

  return useMemo(() => [
    {
      Header: t('license_sales'),
      accessor: 'licensesSold',
      Cell: ({
        row: {
          original: { licensesSold },
        },
      }: WhatLvlTypeRowProps<WhatLvlType>) => (
        <div className={styles.what_lvl_table_text}>
          {licensesSold}
          {' '}
          {trans('Level_')}
        </div>
      ),
    },
    {
      Header: t('Reward_'),
      accessor: 'reward',
      Cell: ({
        row: {
          original: { percent },
        },
      }: WhatLvlTypeRowProps<WhatLvlType>) => (
        <div className={styles.what_lvl_table_text_big}>
          {percent}
          %
        </div>
      ),
    },
  ], [t, trans]);
};
