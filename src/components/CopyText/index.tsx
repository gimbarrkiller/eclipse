import React, { FC, memo } from 'react';
import cx from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Image } from 'components';
import { copyIcon } from 'assets/images';

import styles from './styles.module.scss';

type Props = {
  text?: string | number;
  disabled?: boolean;
  classname?: string;
  classNameText?: string;
  classNameButton?: string;
};

export const CopyText: FC<Props> = memo(({
  text = '',
  disabled,
  classname,
  classNameButton,
  classNameText,
}) => (
  <div
    className={cx(
      styles.container__copy_text,
      classname,
      { [styles.disabled]: disabled },
    )}
  >
    <div className={cx(styles.text, classNameText)}>
      {text}
    </div>
    <CopyToClipboard text={text.toString()}>
      <button
        type="button"
        disabled={disabled}
        className={cx(styles.button, classNameButton)}
      >
        <Image
          url={copyIcon}
        />
      </button>
    </CopyToClipboard>
  </div>
));
