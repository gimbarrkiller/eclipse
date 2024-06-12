import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { avatarImage, loadBlackIcon, sendIcon } from 'assets/images';
import { dateFormat } from 'utils';
import { profileSelectors } from 'store/profile/selectors';
import { ticketSelectors } from 'store/ticket/selectors';
import { getTicketData, sendMessTicket } from 'store/ticket/actionCreators';
import { FileObjectType, OnlyStatusType } from 'types';

import {
  Button, Dropzone,
  Image,
  Input,
} from 'components';

import styles from './styles.module.scss';

export const MessagesTicketContainer = () => {
  const dispatch = useDispatch();
  const { pathname: currentPath } = useLocation();
  const { t } = useTranslation('support');
  const { dialogMessagesList, ticketData } = useSelector(ticketSelectors.getState);
  const { firstName, avatar } = useSelector(profileSelectors.getState);
  const parts = currentPath.split('/');
  const [mess, setMess] = useState('');
  const [file, setFile] = useState<FileObjectType | undefined>();

  const myMessage = useCallback((author: string) => (
    author === firstName || author === 'User' || author === 'user'
  ), [firstName]);

  const messagesDiv = document.querySelector('#messages');
  const ticketNumber = Number(parts[parts.length - 1]) || 0;

  const onSetMess = useCallback((str: string) => {
    setMess(str);
  }, [setMess]);

  const onChangeFile = useCallback((f?: FileObjectType) => {
    setFile(f);
  }, [setFile]);

  const onSuccess = useCallback(() => {
    dispatch(getTicketData({ ticket_id: ticketNumber }));
    onSetMess('');
    onChangeFile(undefined);
  }, [
    dispatch,
    ticketNumber,
    onSetMess,
    onChangeFile,
  ]);

  useEffect(() => {
    if (dialogMessagesList && messagesDiv) {
      messagesDiv.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messagesDiv, dialogMessagesList]);

  const onSubmitForm = useCallback(() => {
    dispatch(sendMessTicket({
      ticket_id: ticketData.id,
      status: ticketData.status,
      text: mess,
      file,
      onCallback: onSuccess,

    }));
  }, [
    dispatch,
    ticketData,
    mess,
    file,
    onSuccess,
  ]);

  const suffix = useMemo(() => (
    <div className={styles.message_suffix}>
      <Dropzone
        data={file}
        onChange={onChangeFile}
        isTicket
        classNameContainer={styles.dropzone_ticket}
        textBtn={(
          <Image
            url={loadBlackIcon}
            className={styles.message_suffix_btn}
          />
        )}
      />
      <Button
        isBigHeight
        className={styles.message_suffix_btn}
        disabled={ticketData?.status === OnlyStatusType.Closed || !mess}
        onClick={onSubmitForm}
      >
        <Image url={sendIcon} />
      </Button>
    </div>
  ), [
    ticketData,
    onSubmitForm,
    mess,
    file,
    onChangeFile,
  ]);

  const messages = useMemo(() => (
    !dialogMessagesList.length ? (
      <div>
        Диалог пуст
      </div>
    ) : (
      dialogMessagesList.map(({
        author,
        created,
        text,
      }) => (
        <div
          className={cn(styles.message_info, {
            [styles.message_info_my]: myMessage(author),
          })}
        >
          <Image
            url={myMessage(author) ? avatar || avatarImage : avatarImage}
            className={styles.message_avatar}
          />
          <div
            className={cn(styles.message_container, {
              [styles.message_container_my]: myMessage(author),
            })}
          >
            <div className={styles.message_name_time}>
              <div className={styles.message_name}>
                {author}
              </div>
              <div className={styles.message_time}>
                {dateFormat(created, 'dd.MM hh:mm')}
              </div>
            </div>
            <div
              className={cn(styles.message_text, {
                [styles.message_text_my]: myMessage(author),
              })}
            >
              {text}
            </div>
          </div>
        </div>
      ))
    )
  ), [dialogMessagesList, myMessage, avatar]);

  return (
    <div className={styles.messages_container}>
      <div className={styles.messages}>
        {messages}
        <div id="messages" />
      </div>

      <Input
        value={mess}
        onChangeValue={onSetMess}
        placeholder={t('Write_response_')}
        suffix={suffix}
        disabled={ticketData?.status === OnlyStatusType.Closed}
      />
    </div>
  );
};
