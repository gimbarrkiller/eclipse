import React, {
  FC,
} from 'react';
import classNames from 'classnames/bind';
import RModal, { Props as RModalProps } from 'react-modal';

import { closeBlackIcon } from 'assets/images';

import { ButtonIcon } from 'components';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const ROOT = document.getElementById('root');

type ModalProps = {
  onClose: () => void;
  closeButtonClassName?: string;
} & RModalProps;

export const Modal: FC<ModalProps> = ({
  onClose,
  isOpen,
  portalClassName,
  className,
  overlayClassName,
  children,
  shouldCloseOnOverlayClick = true,
  closeButtonClassName,
}) => (
  <RModal
    isOpen={isOpen}
    portalClassName={portalClassName}
    bodyOpenClassName={styles.body}
    className={cx(
      styles.modal,
      className,
    )}
    overlayClassName={cx(styles.overlay, overlayClassName)}
    onRequestClose={onClose}
    shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    shouldCloseOnEsc
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parentSelector={() => ROOT!}
  >
    {children}
    <ButtonIcon
      onClick={onClose}
      imageURL={closeBlackIcon}
      className={cx(styles.modal_close_button, closeButtonClassName)}
    />
  </RModal>
);
