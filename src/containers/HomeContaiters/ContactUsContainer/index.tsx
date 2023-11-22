import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { contactsIcon, ellipse3Icon, illustrationTgImage } from 'assets/images';
import { emailApp, telegramApp } from 'appConstants';

import {
  Input,
  Image,
  TitleBorderBottom,
  Button,
} from 'components';

import styles from './styles.module.scss';

export const ContactUsContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className={styles.contact_container}>
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
              onChangeValue={setName}
              placeholder={t('Contact_title_')}
            />
            <Input
              value={email}
              onChangeValue={setEmail}
              placeholder={t('Contact_form_email_')}
            />
          </div>
          <Input
            value={theme}
            onChangeValue={setTheme}
            placeholder={t('Contact_form_theme_')}
          />
          <Input
            value={message}
            onChangeValue={setMessage}
            placeholder={t('Contact_form_message_')}
            isTextarea
            rows={5}
          />
          <Button className={styles.form_btn}>
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
              <div className={styles.contact_info_subtitle}>
                {emailApp}
              </div>
            </div>
            <div className={styles.contact_info_title}>
              {t('Contact_telegram_')}
              <div className={styles.contact_info_subtitle}>
                {telegramApp}
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
    </div>
  );
});
