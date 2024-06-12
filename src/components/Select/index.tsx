import React, { useCallback } from 'react';
import SelectInput, { OnChangeValue } from 'react-select';
import cx from 'classnames';

import { customStyles } from './customStyles';
import { SelectProps, SelectOption } from './types';

import styles from './styles.module.scss';

export const Select = <T extends number | string | null>({
  className,
  onChange,
  value,
  placeholder,
  options,
  style,
  isSearchable = false,
}:SelectProps<T>) => {
  const onHandlerChange = useCallback(
    (option: OnChangeValue<SelectOption<T>, false>) => {
      if (option !== null) {
        onChange(option);
      }
    },
    [onChange],
  );
  return (
    <div className={cx(styles.select_container, className)}>
      <SelectInput
        onChange={onHandlerChange}
        options={options}
        isSearchable={isSearchable}
        placeholder={placeholder}
        pageSize={100}
        styles={style ? { ...customStyles, ...style } : customStyles}
        value={value}
      />
    </div>
  );
};
