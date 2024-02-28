import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Element } from 'react-scroll';

import { programIcon } from 'assets/images';
import { PathName } from 'appConstants';

import { Image, TitleBorderBottom } from 'components';

import { data } from './data';

import styles from './styles.module.scss';

export const ReferralBonusContainer = memo(() => {
  const { t } = useTranslation('welcome');
  const cards = useMemo(() => (
    <div className={styles.referral_cards}>
      {data.map(({ percent, lvl }) => (
        <div
          key={`${lvl}`}
          className={styles.referral_cards_item}
        >
          <div className={styles.referral_cards_item_title}>
            {percent}
            %
          </div>
          <div className={styles.referral_cards_item_subtitle}>
            {lvl}
            {' '}
            {t('Level_')}
          </div>
        </div>
      ))}
    </div>
  ), [t]);

  return (
    <Element
      className={styles.referral_container}
      name={PathName.WhatWeOffer}
    >
      <div className={styles.referral_title}>
        {t('Referral_title_')}
        <TitleBorderBottom isCenter />
        <Image
          url={programIcon}
          className={styles.referral_title_bg}
        />
      </div>
      <ul className={styles.referral_subtitle}>
        <li>{t('Referral_li_1_')}</li>
        <li>{t('Referral_li_2_')}</li>
      </ul>
      {cards}
    </Element>
  );
});
