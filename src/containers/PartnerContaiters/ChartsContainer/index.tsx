import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { partnerSelectors } from 'store/partner/selectors';

import {
  ChartLine,
  ChartBar,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import styles from './styles.module.scss';

export const ChartsContainer = () => {
  const { t } = useTranslation('partner');

  const list = useSelector(partnerSelectors.getProp('rewardsList'));
  const qualificationsList = useSelector(partnerSelectors.getProp('qualificationsList'));
  const total = useMemo(() => list.map(({ total_sales }) => total_sales), [list]);
  const personal = useMemo(() => list.map(({ personal_sales }) => personal_sales), [list]);
  const referral = useMemo(() => list.map(({ referral_sales }) => referral_sales), [list]);

  const qualifications = useMemo(() => (
    qualificationsList.map(({ value }) => value)
  ), [qualificationsList]);

  return (
    <div className={styles.charts_container}>
      <div className={styles.charts_item}>
        <TitleText
          text={t('Rewards_')}
          className={styles.title}
        />
        <WhiteContainer className={styles.charts_item_graph}>
          <ChartBar
            total={total}
            personal={personal}
            referral={referral}
          />
        </WhiteContainer>
      </div>

      <div className={styles.charts_item}>
        <TitleText
          text={t('Qualification_level_')}
          className={styles.title}
        />
        <WhiteContainer className={styles.charts_item_graph}>
          <ChartLine dataLvl={qualifications} />
        </WhiteContainer>
      </div>
    </div>
  );
};
