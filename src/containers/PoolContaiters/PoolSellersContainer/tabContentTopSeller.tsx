import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { dateFormat, formatBalance } from 'utils';
import { poolSelectors } from 'store/pool/selectors';

import {
  TitleText,
} from 'components';

import styles from './styles.module.scss';

interface ITabContentTopSeller {
  data: {
    title: string[];
    id: number,
    name: string,
    sales: number,
  }
}

export const TabContentTopSeller:FC<ITabContentTopSeller> = ({
  data,
}) => {
  const { t } = useTranslation('status');
  const trans = useTranslation('main').t;
  const statistic = useSelector(poolSelectors.getProp('poolStatistic'));

  const amountLine = useMemo(() => (
    <div className={styles.seller_amount_list}>
      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_participants_current_pool_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{ width: `${statistic?.count_of_participants}%` }}
          />
        </div>
        <div className={styles.seller_amount_numbs}>
          <div className={styles.seller_amount_numb}>
            {statistic?.count_of_participants || 0}
          </div>
          <div className={styles.seller_amount_numb}>
            {statistic?.count_of_participants}
            %
          </div>
        </div>
      </div>

      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_active_personal_licenses_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{
              width: `${statistic?.count_active_licenses}%`,
            }}
          />
        </div>
        <div className={styles.seller_amount_numbs}>
          <div className={styles.seller_amount_numb}>
            {statistic?.count_active_licenses || 0}
          </div>
          <div className={styles.seller_amount_numb}>
            {statistic?.count_active_licenses}
            %
          </div>
        </div>
      </div>

      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_active_referral_licenses_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{ width: `${statistic?.count_of_participants}%` }}
          />
        </div>
        <div className={styles.seller_amount_numbs}>
          <div className={styles.seller_amount_numb}>
            {statistic?.count_of_participants || 0}
          </div>
          <div className={styles.seller_amount_numb}>
            {statistic?.count_of_participants}
            %
          </div>
        </div>
      </div>

      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_branches_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{ width: `${statistic?.number_of_branches}%` }}
          />
        </div>
        <div className={styles.seller_amount_numbs}>
          <div className={styles.seller_amount_numb}>
            {statistic?.number_of_branches || 0}
          </div>
          <div className={styles.seller_amount_numb}>
            {statistic?.number_of_branches}
            %
          </div>
        </div>
      </div>
    </div>
  ), [t, statistic]);

  return (
    <div className={styles.seller}>
      <div className={styles.seller_top}>
        <div className={styles.seller_top_title_container}>
          {data.title.map((item) => (
            <TitleText
              text={trans(item)}
              className={styles.seller_top_title}
            />
          ))}
        </div>
        <div className={styles.seller_top_info}>
          {statistic?.next_update_date && (
            t('Updated_once_every_', { time: dateFormat(statistic?.next_update_date, 'dd.MM.yy') })
          )}
        </div>
      </div>
      <div className={styles.seller_content}>
        {amountLine}
        <div className={styles.seller_right}>
          <div className={styles.seller_right_content}>
            <div className={styles.seller_right_subtitle}>
              {t('Balance_within_pool_')}
            </div>
            <div
              className={cn(styles.seller_right_title, {
                [styles.seller_right_title_small]:
                statistic?.pool_balance && statistic?.pool_balance.toString().length > 7,
              })}
            >
              {formatBalance(statistic?.pool_balance)}
              {' '}
              $
            </div>
          </div>
          <div className={styles.seller_line} />
          <div>
            <div className={styles.seller_right_subtitle}>
              {t('Reward_')}
            </div>
            <div
              className={cn(styles.seller_right_title, {
                [styles.seller_right_title_small]:
                  statistic?.reward && statistic?.reward.toString().length > 7,
              })}
            >
              {formatBalance(statistic?.reward)}
              {' '}
              $
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
