import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';

import { itemsOnPageQuantity } from 'appConstants';
import { illustrationNoRef } from 'assets/images';
import { usePageCount } from 'hooks';
import { statusSelectors } from 'store/status/selectors';
import { getStatusReferralsData } from 'store/status/actionCreators';

import {
  Pagination,
  Table,
} from 'components';
import { WhiteContainer } from 'containers';

import { useColumns } from './columns';
import { MobileTable } from './mobileTable';

import styles from './styles.module.scss';

export const StatusTableContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('status');

  const columns = useColumns();
  const list = useSelector(statusSelectors.getProp('referralsList'));
  const pageCount = usePageCount(list.length, itemsOnPageQuantity);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;
    return list.slice(sliceStart, sliceEnd);
  }, [list, currentPageIndex]);

  useEffect(() => {
    dispatch(getStatusReferralsData());
  }, [dispatch]);

  return (
    <div>
      <WhiteContainer className={styles.status_container_white}>
        <Table
          columns={columns as Column<object>[]}
          data={tableData}
          className={styles.status_table}
          mobileTable={(e) => MobileTable(e, t)}
          imageNotData={illustrationNoRef}
          textNotData={t('Referral_list_is_empty_')}
        />
        <div className={styles.status_container_white_bottom}>
          <div className={styles.status_container_showing}>
            {t('Showing_out_of_profiles_', {
              count: tableData.length,
              totalCount: list.length,
            })}
          </div>
          {pageCount > 1 && (
            <Pagination
              page={currentPageIndex}
              onChange={setCurrentPageIndex}
              pageCount={pageCount}
            />
          )}
        </div>
      </WhiteContainer>
    </div>
  );
};
