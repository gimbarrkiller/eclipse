import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getPoolListData, getPoolStatisticData, getPoolUsers } from 'store/pool/actionCreators';
import { poolSelectors } from 'store/pool/selectors';

import {
  SelectTabs,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import { TabContentTopSeller } from './tabContentTopSeller';

import styles from './styles.module.scss';

const pool = [
  {
    title: ['advanced_seller', 'premium_seller', 'top_seller'],
    id: 3,
    name: 'advanced_seller',
    sales: 5000,
  },
  {
    title: ['top_seller'],
    id: 5,
    name: 'top_seller',
    sales: 10000,
  },
];

export const PoolSellersContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('status');
  const trans = useTranslation('main').t;
  const list = useSelector(poolSelectors.getProp('poolList'));

  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(getPoolListData());
  }, [dispatch]);

  useEffect(() => {
    if (list[tab]?.id) {
      dispatch(getPoolStatisticData({ rankName: list[tab]?.name }));
      dispatch(getPoolUsers({ rankName: list[tab]?.name }));
    }
  }, [
    dispatch,
    list,
    tab,
  ]);

  const listStr = useMemo(() => list?.map(({ name }) => trans(name)), [list, trans]);

  const onSelectTab = useCallback((n: number) => {
    setTab(n);
  }, [setTab]);

  return (
    <div className={styles.status_container}>
      <div className={styles.status_top}>
        <TitleText
          text={t('Pools_')}
          className={styles.status_top_title}
        />
        <div className={styles.status_top_info}>
          <SelectTabs
            tabTitles={listStr}
            onSelect={onSelectTab}
          />
        </div>
      </div>
      <WhiteContainer>
        <TabContentTopSeller data={pool[tab]} />
      </WhiteContainer>
    </div>
  );
};
