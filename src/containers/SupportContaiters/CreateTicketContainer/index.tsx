import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { loadIcon } from 'assets/images';
import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';
import { FileObjectType, SelectOption } from 'types';
import { createTicket } from 'store/ticket/actionCreators';

import {
  Button,
  Dropzone,
  Image,
  Input, Select,
  TitleText,
  toastSuccess,
} from 'components';
import { WhiteContainer } from 'containers';

import { createTicketCustomStyles } from './createTicketCustomStyles';

import styles from './styles.module.scss';

export const CreateTicketContainer = () => {
  const dispatch = useDispatch();
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  const { t } = useTranslation('support');

  const themeOptions: SelectOption<string | null>[] = useMemo(() => (
    [
      { value: t('Question_1_'), label: t('Question_1_') },
      { value: t('Question_2_'), label: t('Question_2_') },
      { value: t('Question_3_'), label: t('Question_3_') },
    ]
  ), [t]);

  const [themeSelect, setThemeSelect] = useState<SelectOption<string | null> | null>(null);
  const [themeTitle, setThemeTitle] = useState('');
  const [themeComment, setThemeComment] = useState('');
  const [file, setFile] = useState<FileObjectType | undefined>();

  const isDisableBnt = !themeTitle || !themeComment || !themeSelect;

  const onChangeTheme = useCallback((value: SelectOption<string | null> | null) => {
    setThemeSelect(value);
  }, [setThemeSelect]);

  const onChangeThemeTitle = useCallback((value: string) => {
    setThemeTitle(value);
  }, [setThemeTitle]);

  const onChangeThemeComment = useCallback((value: string) => {
    setThemeComment(value);
  }, [setThemeComment]);

  const onChangeFile = useCallback((f?: FileObjectType) => {
    setFile(f);
  }, [setFile]);

  const onCallbackRequest = useCallback(() => {
    toastSuccess(t('Created_ticket_'));
    onChangeTheme(null);
    onChangeThemeTitle('');
    onChangeThemeComment('');
    onChangeFile(undefined);
  }, [
    t,
    onChangeTheme,
    onChangeThemeTitle,
    onChangeThemeComment,
    onChangeFile,
  ]);

  const onSubmitForm = useCallback(() => {
    dispatch(createTicket({
      theme: themeSelect?.value,
      title: themeTitle,
      text: themeComment,
      file,
      onCallback: onCallbackRequest,
    }));
  }, [
    dispatch,
    themeSelect,
    themeTitle,
    themeComment,
    file,
    onCallbackRequest,
  ]);

  return (
    <div>
      <TitleText text={t('Create_ticket_')} />

      <WhiteContainer className={styles.ticket_container}>
        <div className={styles.ticket_form}>
          <Select
            className={styles.ticket_form_select}
            options={themeOptions}
            onChange={onChangeTheme}
            value={themeSelect}
            style={{ ...createTicketCustomStyles }}
            placeholder={t('Choose_your_question_')}
          />
          <Input
            value={themeTitle}
            onChangeValue={onChangeThemeTitle}
            placeholder={t('Enter_question_title_')}
          />
          <Input
            value={themeComment}
            onChangeValue={onChangeThemeComment}
            placeholder={t('Enter_question_comment_')}
            isTextarea
            rows={5}
          />
          <Dropzone
            data={file}
            onChange={onChangeFile}
            isTicket
            textInfo={file?.path || t('Choose_file_or_drag_here_')}
            classNameContainer={styles.dropzone_avatar_ticket}
            textBtn={(
              <Image
                url={loadIcon}
                className={styles.ticket_btn}
              />
            )}
          />
          <div className={styles.ticket_form_drop_text}>
            {t('Supported_formats_')}
          </div>
        </div>
        <Button
          onClick={onSubmitForm}
          isBigHeight
          isFullWidth={isTablet}
          disabled={isDisableBnt}
        >
          {t('Create_ticket_')}
        </Button>
      </WhiteContainer>

    </div>
  );
};
