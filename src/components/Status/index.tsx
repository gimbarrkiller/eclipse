import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { OnlyStatusType } from 'types';

import styles from './styles.module.scss';

export const Status = ({ status }: { status: OnlyStatusType | string }) => {
  const { t } = useTranslation('transactions');

  return (
    <div
      className={cn(styles.status, {
        [styles.status_processed]: status === OnlyStatusType.Pending,
        [styles.status_rejected]:
          status === OnlyStatusType.Closed || status === OnlyStatusType.Decline,
      })}
    >
      {t(status)}
    </div>
  );
};
