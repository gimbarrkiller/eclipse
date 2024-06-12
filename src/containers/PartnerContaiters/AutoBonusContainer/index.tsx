import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'react-table';

import { dateFormat } from 'utils';
import { partnerSelectors } from 'store/partner/selectors';
import { getPartnerAutoBonusData } from 'store/partner/actionCreators';

import {
  Table,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import { useColumns } from './columns';
import { MobileTable } from './mobileTable';

import styles from './styles.module.scss';

export const AutoBonusContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('partner');
  const columns = useColumns();

  const { autoBonusList, autoTimeNextUpdate } = useSelector(partnerSelectors.getState);

  useEffect(() => {
    dispatch(getPartnerAutoBonusData());
  }, [dispatch]);

  return (
    <div className={styles.auto_bonus_container}>
      <div className={styles.auto_bonus_top}>
        <TitleText
          text={t('Auto_bonus_')}
          className={styles.auto_bonus_top_title}
        />
        {autoTimeNextUpdate && (
          <div className={styles.auto_bonus_top_info}>
            {t('Updated_once_every_', { time: dateFormat(autoTimeNextUpdate, 'dd.MM.yy') || '01.01.2025' })}
          </div>
        )}
      </div>
      <WhiteContainer className={styles.auto_bonus_container_white}>
        <Table
          columns={columns as Column<object>[]}
          data={autoBonusList}
          className={styles.auto_bonus_table}
          mobileTable={(e) => MobileTable(e, t)}
        />
      </WhiteContainer>
    </div>
  );
};
