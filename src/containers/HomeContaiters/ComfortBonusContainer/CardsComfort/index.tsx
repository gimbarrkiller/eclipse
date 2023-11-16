import React, { memo, useMemo } from 'react';

import { checkIcon } from 'assets/images';

import { Image } from 'components';

import { cardsData } from './data';

import styles from './styles.module.scss';

export const CardsComfort = memo(() => {
  const cards = useMemo(() => (
    cardsData.map(({ title, img, list }) => (
      <div className={styles.cards_item}>
        <Image
          url={img}
          className={styles.cards_item_img}
        />
        <div>
          <div className={styles.cards_item_title}>
            {title}
          </div>
          <div className={styles.cards_item_ul}>
            {list.map((text) => (
              <div className={styles.cards_item_li}>
                <Image
                  url={checkIcon}
                  className={styles.cards_item_li_img}
                />
                <div className={styles.cards_item_subtitle}>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))
  ), []);

  return (
    <div className={styles.cards}>
      {cards}
    </div>
  );
});
