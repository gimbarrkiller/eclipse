import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

export type ButtonProps = PropsWithChildren<DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  isFullWidth?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  isLoading?: boolean,
  isBgTransparent?: boolean,
  isBigHeight?: boolean,
  isGrayBg?: boolean,
}>;
