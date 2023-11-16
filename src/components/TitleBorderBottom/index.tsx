import React, { FC, memo } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface IProps {
  isCenter?: boolean;
}

export const TitleBorderBottom:FC<IProps> = memo(({ isCenter }) => (
  <div className={cn(styles.title_border, { [styles.center]: isCenter })} />
));
