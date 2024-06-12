import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface ITitleText {
  text: string;
  className?: string;
}

export const TitleText: FC<ITitleText> = memo(({
  text,
  className,
}) => (
  <div className={cn(styles.title, className)}>
    {text}
  </div>
));
