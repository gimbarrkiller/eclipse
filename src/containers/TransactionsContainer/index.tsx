import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'react-table';

import { itemsOnPageQuantity } from 'appConstants';
import { illustrationNoTransaction, searchIcon } from 'assets/images';
import { usePageCount } from 'hooks';
import { transactionsSelectors } from 'store/transactions/selectors';
import { getTransactionsData } from 'store/transactions/actionCreators';

import {
  Input,
  Pagination,
  Table,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers/index';

import { useColumns } from './columns';
import { MobileTable } from './mobileTable';
import { TransactionsType } from './types';

import styles from './styles.module.scss';

export const TransactionsContainer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('transactions');

  const columns = useColumns();

  const list = useSelector(transactionsSelectors.getProp('transactionsList'));
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [id, setId] = useState('');
  const [listState, setListState] = useState<TransactionsType[]>([]);
  const pageCount = usePageCount(listState.length, itemsOnPageQuantity);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;
    return listState.slice(sliceStart, sliceEnd);
  }, [listState, currentPageIndex]);

  useEffect(() => {
    dispatch(getTransactionsData());
  }, [dispatch]);

  useEffect(() => {
    if (list) {
      setListState(list.filter((i) => (
        i.id.toString().includes(id) || (i.from_user - 1).toString().includes(id)
      )));
    }
  }, [id, list]);

  const onChangeId = useCallback((str: string) => {
    setId(str.toLocaleLowerCase());
  }, [setId]);

  return (
    <div className={styles.transactions_container}>
      <TitleText text={t('Transactions_')} />
      <Input
        icon={searchIcon}
        classNameInputBox={styles.structure_top_controls_second}
        value={id}
        onChangeValue={onChangeId}
        placeholder={t('Search_by_ID_')}
      />
      <WhiteContainer className={styles.transactions_container_white}>

        <Table
          columns={columns as Column<object>[]}
          data={tableData}
          className={styles.transactions_table}
          mobileTable={(e) => MobileTable(e, t)}
          imageNotData={illustrationNoTransaction}
          textNotData={t('Transactions_list_is_empty_')}
        />
        <div className={styles.transactions_container_white_bottom}>
          <div className={styles.transactions_container_showing}>
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
