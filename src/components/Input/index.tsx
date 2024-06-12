import React, {
  ChangeEvent,
  memo,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import cn from 'classnames';

import { viewIcon } from 'assets/images';

import { ButtonIcon } from '../ButtonIcon';
import { Image } from '../Image';

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
  isPassword?: boolean;
  label?: string;
  classNameLabel?: string;
  suffix?: ReactNode;
  icon?: string;
  type?: string;
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
  isPassword,
  isNumberOnly,
  isTextarea,
  rows = 1,
  error,
  label,
  classNameLabel,
  type,
  suffix,
  icon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onPasswordToggleClick = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  const inputType = (!isPassword || isPasswordVisible) ? type || 'text' : 'password';
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
      className={cn(styles.input__container, classNameContainer)}
    >
      <div
        className={cn(styles.input__box, classNameInputBox, {
          [styles.textarea__box]: isTextarea,
          [styles.input__box_error]: error,
        })}
      >
        {label && (
          <div
            className={cn(styles.input_label, classNameLabel, {
              [styles.input_label_focus]: !!value,
            })}
          >
            {label}
          </div>
        )}
        {icon && (
          <Image
            className={styles.input__box_icon}
            url={icon}
          />
        )}
        <Comp
          pattern={pattern}
          value={value}
          className={cn(classNameInput, {
            [styles.input_and_label]: label,
            [styles.input_and_icon]: icon,
          })}
          disabled={disabled}
          defaultValue={defaultValue}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={handleChange}
          type={inputType}
          placeholder={placeholder}
          row={rows}
        />

        {suffix && (
          <div className={styles.input__suffix}>
            {suffix}
          </div>
        )}
        {isPassword && (
          <ButtonIcon
            imageURL={viewIcon}
            className={cn(styles.input_icon)}
            onClick={onPasswordToggleClick}
          />
        )}
      </div>
      {error && (
        <span className={styles.input__error}>
          {error}
        </span>
      )}
    </div>
  );
});
