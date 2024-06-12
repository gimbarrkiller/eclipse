import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { searchIcon } from 'assets/images';
import { ReferralData } from 'types';
import { partnerSelectors } from 'store/partner/selectors';
import { getPartnerReferralsData } from 'store/partner/actionCreators';

import {
  Input,
  TitleText,
} from 'components';
import { LevelsContainer } from './Levels';

import styles from './styles.module.scss';

export const StructureContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('partner');
  const list = useSelector(partnerSelectors.getProp('referralsList'));

  useEffect(() => {
    dispatch(getPartnerReferralsData({}));
  }, [dispatch]);

  const [id, setId] = useState('');
  const [listState, setListState] = useState<ReferralData>();

  useEffect(() => {
    if (list) {
      setListState(Object.fromEntries(
        Object.entries(list).map(([key, value]) => [key, {
          ...value,
          referrals: value.referrals.filter((i) => (
            (i.id - 1).toString().includes(id) || i.referral?.toLocaleLowerCase().includes(id)
          )),
        }]),
      ));
    }
  }, [id, list]);

  const onChangeId = useCallback((str: string) => {
    setId(str.toLocaleLowerCase());
  }, [setId]);

  return (
    <div className={styles.structure_container}>
      <div className={styles.structure_top}>
        <TitleText
          text={t('Structure_')}
          className={styles.structure_top_title}
        />
      </div>

      <Input
        icon={searchIcon}
        classNameInputBox={styles.structure_top_controls_second}
        value={id}
        onChangeValue={onChangeId}
        placeholder={t('Search_by_name_or_ID_')}
      />
      <LevelsContainer list={listState} />

    </div>
  );
};
