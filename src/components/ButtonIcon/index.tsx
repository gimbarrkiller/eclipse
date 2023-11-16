import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type ButtonIconProps = {
  imageURL: string;
  className?: string;
  classNameImage?: string;
  onClick?: () => void;
  alt?: string;
  disabled?: boolean
};

export const ButtonIcon:FC<ButtonIconProps> = memo(({
  imageURL,
  className,
  classNameImage,
  onClick,
  disabled,
  alt = '',
}) => (
  <button
    className={cn(styles.buttonIcon, className)}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    <img
      src={imageURL}
      alt={alt}
      className={classNameImage}
    />
  </button>
));
