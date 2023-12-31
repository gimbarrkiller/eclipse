import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { cardsTexts } from './data';

import styles from './styles.module.scss';

export const CardsVideoCall = memo(() => {
  const { t } = useTranslation('welcome');
  const cards = useMemo(() => (
    cardsTexts.map(({ text, id }) => (
      <div
        key={id}
        style={{ gridArea: `card${id}` }}
        className={cn(styles.cards_item, { [styles.cards_item_bg]: id % 2 !== 0 })}
      >
        {t(text)}
      </div>
    ))
  ), [t]);

  return (
    <div className={styles.cards}>
      {cards}
    </div>
  );
});
