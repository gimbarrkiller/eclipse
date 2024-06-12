import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { SelectOption } from 'types';
import { getStatusRankData, getStatusStatisticData } from 'store/status/actionCreators';
import { statusSelectors } from 'store/status/selectors';
import { profileSelectors } from 'store/profile/selectors';

import {
  Select,
  SelectTabs,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import { TabContentSeller } from './tabContentSeller';

import styles from './styles.module.scss';

const status = [
  {
    title: 'None',
    id: 1,
    name: 'None',
    sales: 2500,
    isNoStatus: true,
  },
  {
    title: 'seller',
    id: 2,
    name: 'seller',
    sales: 2500,
  },
  {
    title: 'advanced_seller',
    id: 3,
    name: 'advanced_seller',
    sales: 5000,
  },
  {
    title: 'premium_seller',
    id: 4,
    name: 'premium_seller',
    sales: 7500,
  },
  {
    title: 'top_seller',
    id: 5,
    name: 'top_seller',
    sales: 10000,
  },
];

export const StatusSellersContainer = () => {
  const dispatch = useDispatch();
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  const { t } = useTranslation('status');
  const trans = useTranslation('main').t;
  const list = useSelector(statusSelectors.getProp('rankList'));
  const { rank } = useSelector(profileSelectors.getState);

  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(getStatusRankData());
  }, [dispatch]);

  useEffect(() => {
    if (list[tab]?.id) {
      dispatch(getStatusStatisticData({ rankName: list[tab]?.name }));
    }
  }, [
    dispatch,
    list,
    tab,
  ]);

  const listStr = useMemo(() => list.map(({ name }) => trans(name)), [list, trans]);

  const listSelectOptions = useMemo(() => list.map(({ id, name }) => ({
    value: id - 1,
    label: trans(name),
  })), [list, trans]);

  const myRankIndex = useMemo(() => list.findIndex(({ name }) => name === rank), [list, rank]);

  const onSelectTab = useCallback((n: number) => {
    setTab(n);
  }, [setTab]);

  const onSelect = useCallback((value: SelectOption<number>) => {
    setTab(value.value);
  }, [setTab]);

  return (
    <div className={styles.status_container}>
      <div className={styles.status_top}>
        <TitleText
          text={t('Statuses_')}
          className={styles.status_top_title}
        />
        <div className={styles.status_top_info}>
          {isTablet ? (
            <Select
              options={listSelectOptions}
              onChange={onSelect}
              value={listSelectOptions[tab]}
            />
          ) : (
            <SelectTabs
              tabTitles={listStr}
              onSelect={onSelectTab}
              defaultActiveTab={myRankIndex}
            />
          )}
        </div>
      </div>
      <WhiteContainer>
        <TabContentSeller data={status[tab]} />
      </WhiteContainer>
    </div>
  );
};
