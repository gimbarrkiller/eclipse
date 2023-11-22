import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

export const GlobalHub = memo(() => {
  const { t } = useTranslation('welcome');
  return (
    <div className={styles.global}>
      <div className={styles.global_first} />
      <div className={styles.global_second}>
        <div className={styles.global_item_title}>
          {t('Global_hub_title_')}
        </div>
        <div className={styles.global_item_subtitle}>
          {t('Global_hub_subtitle_')}
        </div>
      </div>
    </div>
  );
});
