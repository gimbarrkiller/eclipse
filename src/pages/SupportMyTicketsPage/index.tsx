import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { illustrationNoTickets } from 'assets/images';
import { itemsOnPageQuantity, PathName } from 'appConstants';
import { usePageCount } from 'hooks';
import { SelectOption } from 'types';
import { dateFormat } from 'utils';
import { getTicketsData } from 'store/ticket/actionCreators';
import { ticketSelectors } from 'store/ticket/selectors';

import {
  Image,
  Pagination,
  Select,
  Status,
  TitleText,
} from 'components';
import { WhiteContainer } from 'containers';

import styles from './styles.module.scss';

export const SupportMyTicketsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('support');

  const list = useSelector(ticketSelectors.getProp('myTicketsList'));
  const pageCount = usePageCount(list.length, itemsOnPageQuantity);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const timeOptions = [
    { value: '', label: t('All_') },
  ];

  useEffect(() => {
    dispatch(getTicketsData());
  }, [dispatch]);

  const [timeSelect, setTimeSelect] = useState<SelectOption<string>>(timeOptions[0]);

  useEffect(() => {
    // Обновляем timeSelect при изменении языка
    setTimeSelect((prevTimeSelect) => ({
      ...prevTimeSelect,
      label: t('All_'),
    }));
  }, [t]);

  const onChangeTime = useCallback((value: SelectOption<string>) => {
    setTimeSelect(value);
  }, [setTimeSelect]);

  const onClickOpeTicket = useCallback((id: number) => {
    navigate(`${PathName.Support}/${id}`);
  }, [navigate]);

  const tableData = useMemo(() => {
    const sliceStart = currentPageIndex * itemsOnPageQuantity;
    const sliceEnd = sliceStart + itemsOnPageQuantity;
    return list.slice(sliceStart, sliceEnd);
  }, [list, currentPageIndex]);

  const questionsCards = useMemo(() => {
    if (!list.length) {
      return (
        <div className={styles.no_data}>
          <div className={styles.no_data_div}>
            <Image url={illustrationNoTickets} />
            <div>
              {t('List_ticket_no_')}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.my_tickets_cards}>
        {tableData.map(({
          id,
          created,
          theme,
          status,
          title,
        }) => (
          <WhiteContainer
            className={styles.my_tickets_card}
            key={id}
          >
            <div className={styles.my_tickets_card_top}>
              <div className={styles.my_tickets_card_top_id}>
                №
                {' '}
                {id}
              </div>
              <div className={styles.my_tickets_card_top_date}>
                {dateFormat(created, 'yyyy-MM-dd')}
              </div>
            </div>
            <div className={styles.my_tickets_card_theme}>
              {theme}
            </div>
            <div className={styles.my_tickets_card_question}>
              {title}
            </div>
            <div>
              <button
                onClick={() => onClickOpeTicket(id)}
                className={styles.my_tickets_card_btn}
              >
                {t('Open_ticket_')}
              </button>
              <Status status={status} />
            </div>
          </WhiteContainer>
        ))}
      </div>
    );
  }, [
    t,
    onClickOpeTicket,
    tableData,
    list,
  ]);

  return (
    <div>
      <div className={styles.my_tickets_container}>
        <div className={styles.my_tickets_top}>
          <TitleText
            text={t('My_tickets_')}
            className={styles.my_tickets_top_title}
          />
          <div className={styles.my_tickets_top_select}>
            <Select
              options={timeOptions}
              onChange={onChangeTime}
              value={timeSelect}
            />
          </div>
        </div>
        {questionsCards}
      </div>
      {pageCount > 1 && (
        <Pagination
          page={currentPageIndex}
          onChange={setCurrentPageIndex}
          pageCount={pageCount}
          className={styles.pagination}
        />
      )}
    </div>
  );
};
