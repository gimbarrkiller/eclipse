import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { dateFormat } from 'utils';
import { statusSelectors } from 'store/status/selectors';

import {
  TitleText,
} from 'components';

import styles from './styles.module.scss';

interface ITabContentSeller {
  data: {
    title: string;
    id: number,
    name: string,
    sales: number,
    isNoStatus?: boolean,
  }
}

export const TabContentSeller:FC<ITabContentSeller> = ({
  data,
}) => {
  const { t } = useTranslation('status');
  const trans = useTranslation('main').t;
  const statistic = useSelector(statusSelectors.getProp('statisticData'));

  const amountLine = useMemo(() => (
    <div className={styles.seller_amount_list}>
      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_active_personal_licenses_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{ width: `${statistic?.count_active_licenses}%` }}
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
          {t('Number_vertical_branches_')}
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

      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_team_license_sales_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{ width: `${statistic?.team_licenses_sold}%` }}
          />
        </div>
        <div className={styles.seller_amount_numbs}>
          <div className={styles.seller_amount_numb}>
            {statistic?.team_licenses_sold || 0}
          </div>
          <div className={styles.seller_amount_numb}>
            {statistic?.team_licenses_sold}
            %
          </div>
        </div>
      </div>

      <div className={styles.seller_amount_card}>
        <div className={styles.seller_amount_title}>
          {t('Number_license_sales_top_team_')}
        </div>
        <div className={styles.seller_amount_line_full}>
          <div
            className={styles.seller_amount_line}
            style={{ width: `${statistic?.licenses_sold_best_team}%` }}
          />
        </div>
        <div className={styles.seller_amount_numbs}>
          <div className={styles.seller_amount_numb}>
            {statistic?.licenses_sold_best_team || 0}
          </div>
          <div className={styles.seller_amount_numb}>
            {statistic?.licenses_sold_best_team}
            %
          </div>
        </div>
      </div>
    </div>
  ), [statistic, t]);

  return (
    <div className={styles.seller}>
      <div className={styles.seller_top}>
        <TitleText
          text={trans(data.title)}
          className={styles.seller_top_title}
        />
        <div className={styles.seller_top_info}>
          {statistic?.next_update_date && (
            t('Updated_once_every_', { time: dateFormat(statistic?.next_update_date, 'dd.MM.yy') })
          )}
        </div>
      </div>
      <div className={styles.seller_content}>
        <div>
          <div className={styles.seller_title}>
            {t('Status_conditions_')}
            :
          </div>
          <ul className={styles.seller_ul}>
            <li>{t('Have_purchased_annual_license_')}</li>
            <li>
              {t(data?.isNoStatus ? 'Personal_sales_' : 'Personal_sales2_', { amount: 100 })}
            </li>
            <li>
              {t(data?.isNoStatus ? 'Team_license_sales_' : 'Team_license_sales2_', { amount: data.sales })}
            </li>
          </ul>
          {amountLine}
        </div>
        <div className={styles.seller_right}>
          <div className={styles.seller_right_subtitle}>
            {t('Reward_')}
          </div>

          <div
            className={cn(styles.seller_right_title, {
              [styles.seller_right_title_small]:
              statistic?.reward && statistic?.reward.toString().length > 7,
            })}
          >
            {statistic?.reward}
            {' '}
            $
          </div>
        </div>
      </div>
    </div>
  );
};
