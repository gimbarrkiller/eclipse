import React, { FC, ReactNode } from 'react';
import Slider2 from 'react-slick';

import { arrowDownIcon } from 'assets/images';
import { ScreenWidth } from 'appConstants';
import { useScreenWidth } from 'hooks';

import { ButtonIcon } from 'components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles.css';
import styles from './styles.module.scss';

interface ISlider {
  items: ReactNode,
}

export const Slider:FC<ISlider> = ({ items }) => {
  const isTablet = useScreenWidth(ScreenWidth.tablet);
  const settings = {
    slidesToShow: isTablet ? 1 : 3,
    slidesToScroll: 1,
    prevArrow: <ButtonIcon
      imageURL={arrowDownIcon}
      classNameImage={styles.slick_prev}
    />,
    nextArrow: <ButtonIcon
      imageURL={arrowDownIcon}
      classNameImage={styles.slick_next}
    />,
  };

  return (
    <div className={styles.slick_container}>
      <Slider2 {...settings}>
        {items}
      </Slider2>
    </div>
  );
};
