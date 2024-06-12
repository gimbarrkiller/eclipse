import React, {
  FC, memo, ReactNode,
} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface IWhiteContainer {
  children: ReactNode;
  className?: string;
}

export const WhiteContainer: FC<IWhiteContainer> = memo(({
  children,
  className,
}) => (
  <div className={cn(styles.container, className)}>
    {children}
  </div>
));
