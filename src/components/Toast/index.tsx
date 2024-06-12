import React from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';

import { toastSuccessIcon, toastErrorIcon } from 'assets/images';

import { Image } from 'components';

import 'react-toastify/dist/ReactToastify.css';
import './styles.module.scss';

const delay = 3000;

const ToastPortal = () => (
  <ToastContainer
    position="top-right"
    closeOnClick
    pauseOnFocusLoss
    hideProgressBar
    draggable
    pauseOnHover
    closeButton={false}
    limit={1}
  />
);

const toastClose = () => {
  toast.dismiss();
  toast.clearWaitingQueue();
};

const toastSuccess = (title: string, options?: ToastOptions) => {
  toast.success(<div className="toast_title">{title}</div>, {
    ...options,
    icon: <Image url={toastSuccessIcon} />,
    autoClose: delay,
  });
};

const toastError = (msg: string, options?: ToastOptions) => {
  toast.error(msg, {
    ...options,
    icon: <Image url={toastErrorIcon} />,
    autoClose: delay,
  });
};

const toastInfo = (msg: string, options?: ToastOptions) => {
  toast.info(msg, { ...options });
};

export {
  ToastPortal, toast, toastSuccess, toastClose, toastError, toastInfo,
};
