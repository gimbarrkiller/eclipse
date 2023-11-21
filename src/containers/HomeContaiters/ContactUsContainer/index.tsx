import React, { memo, useState } from 'react';

import { contactsIcon, ellipse3Icon, illustrationTgImage } from 'assets/images';

import {
  Input,
  Image,
  TitleBorderBottom,
  Button,
} from 'components';

import styles from './styles.module.scss';

export const ContactUsContainer = memo(() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className={styles.contact_container}>
      <div className={styles.contact_title}>
        Cвязаться с нами
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
              placeholder="Имя"
            />
            <Input
              value={email}
              onChangeValue={setEmail}
              placeholder="Электронный адрес"
            />
          </div>
          <Input
            value={theme}
            onChangeValue={setTheme}
            placeholder="Тема сообщения"
          />
          <Input
            value={message}
            onChangeValue={setMessage}
            placeholder="Сообщение"
            isTextarea
            rows={5}
          />
          <Button className={styles.form_btn}>
            Отправить
          </Button>
        </form>
        <div className={styles.contact_info}>
          <Image
            url={illustrationTgImage}
            className={styles.contact_info_icon}
          />
          <div className={styles.contact_info_bottom}>
            <div className={styles.contact_info_title}>
              Электронная почта:
              <div className={styles.contact_info_subtitle}>
                support@eclipce.io
              </div>
            </div>
            <div className={styles.contact_info_title}>
              Telegram:
              <div className={styles.contact_info_subtitle}>
                @eclipce_agency
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
