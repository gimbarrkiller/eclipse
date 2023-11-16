import React, { memo } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type ImageProps = {
  className?: string;
  url: string;
  alt?: string;
};

export const Image = memo(({
  className,
  url,
  alt = 'fox',
}: ImageProps) => (
  <img
    loading="lazy"
    src={url}
    alt={alt}
    className={cn(styles.image, className)}
  />
));
