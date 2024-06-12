import React, { memo, useCallback } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type CheckboxProps = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  label?: string | JSX.Element;
  classNameContainer?: string;
};

export const Checkbox = memo<CheckboxProps>(({
  onChange,
  label,
  isChecked,
  classNameContainer,
}) => {
  const onChangeHandler = useCallback(() => {
    onChange(!isChecked);
  }, [onChange, isChecked]);

  return (
    <div className={cn(styles.checkbox_container, classNameContainer)}>
      <button
        className={cn(
          styles.checkbox,
          { [styles.checkbox_checked]: isChecked },
        )}
        onClick={onChangeHandler}
        type="button"
      >
        <div className={cn(styles.checkbox_icon, { [styles.checkbox_icon_checked]: isChecked })} />
      </button>

      {label !== undefined && <div className={styles.label}>{label}</div>}
    </div>
  );
});
