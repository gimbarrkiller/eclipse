import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { fileSupIcon } from 'assets/images';
import { dateFormat } from 'utils';
import { ticketSelectors } from 'store/ticket/selectors';

import {
  Image,
  TitleText,
} from 'components';

import styles from './styles.module.scss';

interface IDetailsTicketContainer {
  id: number;
  ticketId: number;
  date: string,
  dateLast: string,
  theme: string,
  classNameContainer: string,
}

export const DetailsTicketContainer: FC<IDetailsTicketContainer> = ({
  id,
  date,
  dateLast,
  theme,
  classNameContainer,
  ticketId,
}) => {
  const { t } = useTranslation('support');
  const { files } = useSelector(ticketSelectors.getState);

  const filesDiv = useMemo(() => {
    if (files) {
      return (
        <>
          <TitleText text={t('Files_')} />
          <div className={styles.detail_rows}>
            {files?.filter((i) => i.ticket_id === ticketId).map(({ file, created }) => (
              <div className={styles.detail_row_file}>
                <Image url={fileSupIcon} />
                <div className={styles.detail_row_file_info}>
                  <div className={styles.detail_row_file_info_name}>
                    {file}
                  </div>
                  <div className={styles.detail_row_file_info_date}>
                    {dateFormat(created, 'dd.MM hh:mm')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
  }, [files, t, ticketId]);

  return (
    <div className={cn(styles.detail, classNameContainer)}>
      <TitleText text={t('Details_')} />

      <div className={styles.detail_rows}>
        <div className={styles.detail_row}>
          <div className={styles.detail_row_key}>
            {t('Number_')}
            :
          </div>
          <div className={styles.detail_row_value}>
            {id}
          </div>
        </div>

        <div className={styles.detail_row}>
          <div className={styles.detail_row_key}>
            {t('Subject_')}
            :
          </div>
          <div className={styles.detail_row_value}>
            {theme}
          </div>
        </div>

        <div className={styles.detail_row}>
          <div className={styles.detail_row_key}>
            {t('Submitted_')}
            :
          </div>
          <div className={styles.detail_row_value}>
            {dateFormat(date)}
          </div>
        </div>

        <div className={styles.detail_row}>
          <div className={styles.detail_row_key}>
            {t('Last_update_')}
            :
          </div>
          <div className={styles.detail_row_value}>
            {dateFormat(dateLast)}
          </div>
        </div>
      </div>

      <div className={styles.detail_line} />

      {filesDiv}
    </div>
  );
};
