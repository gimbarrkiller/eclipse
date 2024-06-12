import React from 'react';
import { TFunction } from 'i18next';
import cn from 'classnames';

import { checkGreenIcon } from 'assets/images';
import { AutoBonusType } from 'types';

import { Image } from 'components';

import styles from './styles.module.scss';

export const MobileTable = ({
  active,
  model,
  personalSales,
  refSales,
  reward,
}: AutoBonusType, t: TFunction) => (
  <div className={styles.auto_bonus_table_subrow}>
    <div className={styles.auto_bonus_table_subrow_item}>
      <div className={styles.auto_bonus_table_subrow_item_first}>
        {t('Car_make_')}
      </div>
      <div className={styles.auto_bonus_table_car}>
        {model}
      </div>
    </div>

    <div className={styles.auto_bonus_table_subrow_item}>
      <div className={styles.auto_bonus_table_subrow_item_first}>
        {t('Execution_status_')}
      </div>
      {active && <Image url={checkGreenIcon} />}
    </div>

    <div className={styles.auto_bonus_table_subrow_item}>
      <div className={styles.auto_bonus_table_subrow_item_first}>
        {t('Personal_sales_')}
      </div>
      <div className={styles.auto_bonus_table_number_sold}>
        {personalSales}
      </div>
    </div>

    <div className={styles.auto_bonus_table_subrow_item}>
      <div className={styles.auto_bonus_table_subrow_item_first}>
        {t('Ref_sales_')}
      </div>
      <div
        className={cn(styles.auto_bonus_table_number_sold, styles.auto_bonus_table_number_ref)}
      >
        {refSales}
      </div>
    </div>

    <div className={styles.auto_bonus_table_subrow_item}>
      <div className={styles.auto_bonus_table_subrow_item_first}>
        {t('Rewards_')}
      </div>
      <div
        className={cn(styles.auto_bonus_table_number_sold, styles.auto_bonus_table_number_reward)}
      >
        {reward}
        $
      </div>
    </div>
  </div>
);
