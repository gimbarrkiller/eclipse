import React, { memo } from 'react';

import styles from './styles.module.scss';

export const GlobalHub = memo(() => (
  <div className={styles.global}>
    <div className={styles.global_first} />
    <div className={styles.global_second}>
      <div className={styles.global_item_title}>
        Global Hub
      </div>
      <div className={styles.global_item_subtitle}>
        Избавьтесь от переключения между приложениями.
        Переписывайтесь в чатах, отправляйте голосовые сообщения,
        расшифровывайте голосовые сообщения в тексты, организуйте видеоконференции,
        планируйте встречи  и ставьте задачи в одном приложении.
      </div>
    </div>
  </div>
));
