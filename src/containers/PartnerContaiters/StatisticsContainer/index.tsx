import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { statisticsRefIcon } from 'assets/images';
import { getPartnerStatisticData } from 'store/partner/actionCreators';
import { partnerSelectors } from 'store/partner/selectors';
import { SelectOption } from 'types';

import {
  Image,
  Select,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import { icons } from './data';

import styles from './styles.module.scss';

export const StatisticsContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('partner');

  const timeOptions = [
    { value: '', label: t('All_time_') },
  ];

  const [timeSelect, setTimeSelect] = useState<SelectOption<string>>(timeOptions[0]);

  useEffect(() => {
    // Обновляем timeSelect при изменении языка
    setTimeSelect((prevTimeSelect) => ({
      ...prevTimeSelect,
      label: t('All_time_'),
    }));
  }, [t]);

  const list = useSelector(partnerSelectors.getProp('statsList'));
  const referralsList = useSelector(partnerSelectors.getProp('referralsList'));

  const allReferralsCount = useMemo(() => ({
    title: 'Total_number_referrals_',
    icon: statisticsRefIcon,
    count: referralsList ? referralsList[1]?.count || 0 : 0,
  }), [referralsList]);

  const resultArray = useMemo(() => {
    /* eslint-disable */
    const {
      license_sales,
      referrals_license_sales,
      personal_sales_profit,
      referrals_sales_profit,
      auto_bonus_profit,
      pools_profit,
    } = list;

    const newList = {
      license_sales,
      referrals_license_sales,
      personal_sales_profit,
      referrals_sales_profit,
      pools_profit,
      auto_bonus_profit,
    };
    /* eslint-enable */

    return (
      Object.keys(newList).map((key) => ({
        title: key,
        icon: icons[key],
        count: list[key],
      }))
    );
  }, [list]);

  useEffect(() => {
    dispatch(getPartnerStatisticData({ period: timeSelect.value }));
  }, [dispatch, timeSelect]);

  const onChangeTime = useCallback((value: SelectOption<string>) => {
    setTimeSelect(value);
  }, [setTimeSelect]);

  const cards = useMemo(() => (
    <div className={styles.statistics_cards_list}>
      {[allReferralsCount, ...resultArray].map(({
        title,
        icon,
        count,
      }) => (
        <WhiteContainer
          key={title}
          className={styles.statistics_cards_item}
        >
          <Image
            className={styles.statistics_cards_item_img}
            url={icon}
          />
          <div className={styles.statistics_cards_item_title}>
            {t(title)}
          </div>
          <div className={styles.statistics_cards_item_bottom}>
            <div className={styles.statistics_cards_item_count}>
              {count}
              {' '}
              {title.includes('profit') && !title.includes('packages_sales_profit') && '$'}
            </div>
          </div>
        </WhiteContainer>
      ))}
    </div>
  ), [
    t,
    resultArray,
    allReferralsCount,
  ]);

  return (
    <div className={styles.statistics_container}>
      <div className={styles.statistics_top}>
        <TitleText
          text={t('Statistics_')}
          className={styles.statistics_top_title}
        />
        <div>
          <Select
            className={styles.statistics_top_control}
            options={timeOptions}
            onChange={onChangeTime}
            value={timeSelect}
          />
        </div>
      </div>
      {cards}
    </div>
  );
};
