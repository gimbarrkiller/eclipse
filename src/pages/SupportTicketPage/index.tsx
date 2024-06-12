import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { arrowDownIcon, closeBlackIcon, detailsDarkIcon } from 'assets/images';
import { PathName, ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { getTicketData } from 'store/ticket/actionCreators';
import { ticketSelectors } from 'store/ticket/selectors';

import {
  ButtonIcon,
  Image,
  Status,
  TitleText,
} from 'components';
import { DetailsTicketContainer, MessagesTicketContainer, WhiteContainer } from 'containers';

import styles from './styles.module.scss';

export const SupportTicketPage = () => {
  const dispatch = useDispatch();
  const { pathname: currentPath } = useLocation();
  const isLaptop = useScreenWidth(ScreenWidth.laptop);
  const navigate = useNavigate();
  const parts = currentPath.split('/');
  const ticketNumber = Number(parts[parts.length - 1]) || 0;

  const { t } = useTranslation('support');
  const ticket = useSelector(ticketSelectors.getProp('ticketData'));

  useEffect(() => {
    dispatch(getTicketData({ ticket_id: ticketNumber }));
  }, [dispatch, ticketNumber]);

  const [openDetails, setOpenDetails] = useState(false);

  const {
    created,
    id,
    modified,
    status,
    theme,
    title,
  } = ticket;

  const onClickBlack = useCallback(() => {
    navigate(PathName.Support);
  }, [navigate]);

  const onOpenDetails = useCallback(() => {
    setOpenDetails(!openDetails);
  }, [openDetails]);

  return (
    <div>
      <div className={styles.ticket_container}>
        <button
          onClick={onClickBlack}
          className={styles.ticket_back}
        >
          <Image
            url={arrowDownIcon}
            className={styles.ticket_back_img}
          />
          <div className={styles.ticket_back_text}>
            {t('Go_back_')}
          </div>
        </button>
        <div className={styles.ticket_top}>
          <TitleText
            text={title}
            className={styles.ticket_top_title}
          />
          <div className={styles.ticket_top_left}>
            <Status status={status} />
            {isLaptop && (
              <button
                onClick={onOpenDetails}
                className={styles.ticket_img_container}
              >
                <Image url={detailsDarkIcon} />
              </button>
            )}
          </div>
        </div>
        <WhiteContainer className={styles.ticket_content}>
          {(!isLaptop || openDetails) && (
            <div>
              <DetailsTicketContainer
                id={id}
                date={created}
                dateLast={modified}
                theme={theme}
                classNameContainer={styles.ticket_details}
                ticketId={ticketNumber}
              />
              {isLaptop && (
                <ButtonIcon
                  imageURL={closeBlackIcon}
                  onClick={onOpenDetails}
                  className={styles.ticket_details_close}
                />
              )}
            </div>
          )}

          {!isLaptop && <div className={styles.line} />}

          <MessagesTicketContainer />
        </WhiteContainer>
      </div>
    </div>
  );
};
