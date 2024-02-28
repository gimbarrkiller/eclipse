import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';

import { contactsIcon, ellipse3Icon, illustrationTgImage } from 'assets/images';
import { emailApp, PathName } from 'appConstants';
import { postConnectUs } from 'store/connectUs/actionCreators';
import { connectUsSelectors } from 'store/connectUs/selectors';

import {
  Input,
  Image,
  TitleBorderBottom,
  Button,
  toastSuccess,
} from 'components';

import styles from './styles.module.scss';

export const ContactUsContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const dispatch = useDispatch();

  const isLoading = useSelector(connectUsSelectors.getProp('isLoading'));

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');

  const onChangeName = useCallback((str: string) => {
    setName(str);
  }, [setName]);

  const onChangeEmail = useCallback((str: string) => {
    setEmail(str);
  }, [setEmail]);

  const onChangeTheme = useCallback((str: string) => {
    setTheme(str);
  }, [setTheme]);

  const onChangeMessage = useCallback((str: string) => {
    setMessage(str);
  }, [setMessage]);

  const onSuccessCallback = useCallback(() => {
    onChangeName('');
    onChangeEmail('');
    onChangeTheme('');
    onChangeMessage('');
    toastSuccess(t('Contact_form_end_'));
  }, [
    onChangeName,
    onChangeEmail,
    onChangeTheme,
    onChangeMessage,
    t,
  ]);

  const onSubmitForm = useCallback(() => {
    dispatch(postConnectUs({
      name,
      email,
      theme,
      message,
      onSuccessCallback,
    }));
  }, [
    dispatch,
    name,
    email,
    theme,
    message,
    onSuccessCallback,
  ]);

  return (
    <Element
      className={styles.contact_container}
      name={PathName.ConnectUs}
    >
      <div className={styles.contact_title}>
        {t('Contact_title_')}
        <TitleBorderBottom />
        <Image
          url={contactsIcon}
          className={styles.contact_title_bg}
        />
      </div>
      <div className={styles.contact_content}>
        <form className={styles.form}>
          <div className={styles.form_halfs}>
            <Input
              value={name}
              onChangeValue={onChangeName}
              placeholder={t('Contact_title_')}
            />
            <Input
              value={email}
              onChangeValue={onChangeEmail}
              placeholder={t('Contact_form_email_')}
            />
          </div>
          <Input
            value={theme}
            onChangeValue={onChangeTheme}
            placeholder={t('Contact_form_theme_')}
          />
          <Input
            value={message}
            onChangeValue={onChangeMessage}
            placeholder={t('Contact_form_message_')}
            isTextarea
            rows={5}
          />
          <Button
            onClick={onSubmitForm}
            className={styles.form_btn}
            isLoading={isLoading}
          >
            {t('Contact_form_send_')}
          </Button>
        </form>
        <div className={styles.contact_info}>
          <Image
            url={illustrationTgImage}
            className={styles.contact_info_icon}
          />
          <div className={styles.contact_info_bottom}>
            <div className={styles.contact_info_title}>
              {t('Contact_email_')}
              :
              <div>
                <a
                  href={`mailto:${emailApp}`}
                  className={styles.contact_info_subtitle}
                >
                  {emailApp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        url={ellipse3Icon}
        className={styles.contact_info_bg_right}
      />
      <Image
        url={ellipse3Icon}
        className={styles.contact_info_bg_left}
      />
    </Element>
  );
});
