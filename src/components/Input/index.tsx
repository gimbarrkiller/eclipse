import React, { ChangeEvent, memo, useCallback } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type InputProps = {
  value: string;
  defaultValue?: string;
  classNameInput?: string;
  classNameContainer?: string;
  classNameInputBox?: string;
  disabled?: boolean;
  onChangeValue?: (text: string) => void;
  placeholder?: string;
  isNumberOnly?: boolean;
  isTextarea?: boolean;
  rows?: number;
  error?: string | undefined;
};

export const Input = memo<InputProps>(({
  value,
  defaultValue,
  classNameInput,
  classNameContainer,
  classNameInputBox,
  disabled = false,
  onChangeValue,
  placeholder = '',
  isNumberOnly,
  isTextarea,
  rows = 1,
  error,
}) => {
  const formatInputToNumber = (input: string) => {
    let index = 0;
    let inputNext = input
      .replace(/[^\d.,]+/g, '')
      .replace(',', '.')
      /* eslint-disable no-plusplus */
      .replace(/\./g, (item) => (!index++ ? item : ''));

    if (inputNext.startsWith('.')) {
      inputNext = `0${inputNext}`;
    }
    if (inputNext.startsWith('00')) {
      inputNext = inputNext.replace('00', '0');
    }

    return inputNext;
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue !== undefined) {
      const nextValue = isNumberOnly ? formatInputToNumber(e.target.value) : e.target.value;
      onChangeValue(nextValue);
    }
  }, [onChangeValue, isNumberOnly]);

  const pattern = isNumberOnly ? '[0-9]*' : undefined;
  const Comp = isTextarea ? 'textarea' : 'input';

  return (
    <div
      className={cx(styles.input__container, classNameContainer)}
    >
      <div
        className={cx(styles.input__box, classNameInputBox, {
          [styles.textarea__box]: isTextarea,
          [styles.input__box_error]: error,
        })}
      >
        <Comp
          pattern={pattern}
          value={value}
          className={classNameInput}
          disabled={disabled}
          defaultValue={defaultValue}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={handleChange}
          placeholder={placeholder}
          row={rows}
        />
      </div>
      {error && (
        <span className={styles.input__error}>
          {error}
        </span>
      )}
    </div>
  );
});
