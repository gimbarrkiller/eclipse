import React, { memo, useMemo } from 'react';

import { programIcon } from 'assets/images';

import { Image, TitleBorderBottom } from 'components';

import { data } from './data';

import styles from './styles.module.scss';

export const ReferralBonusContainer = memo(() => {
  const cards = useMemo(() => (
    <div className={styles.referral_cards}>
      {data.map(({ percent, lvl }) => (
        <div className={styles.referral_cards_item}>
          <div className={styles.referral_cards_item_title}>
            {percent}
            %
          </div>
          <div className={styles.referral_cards_item_subtitle}>
            {lvl}
            {' '}
            уровень
          </div>
        </div>
      ))}
    </div>
  ), []);

  return (
    <div className={styles.referral_container}>
      <div className={styles.referral_title}>
        Реферальный бонус
        <TitleBorderBottom isCenter />
        <Image
          url={programIcon}
          className={styles.referral_title_bg}
        />
      </div>
      <ul className={styles.referral_subtitle}>
        <li>Иметь годовую лицензию.</li>
        <li>Быть активным 5 уровнях</li>
      </ul>
      {cards}
    </div>
  );
});
