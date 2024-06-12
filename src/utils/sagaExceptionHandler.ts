import { ApiError } from 'utils';

import { toastError } from 'components';

function isApiError(obj: unknown): obj is ApiError {
  return (
    typeof obj === 'object'
     && obj !== null
     && 'status' in obj
      && 'error' in obj
      && 'message' in obj
  );
}

export const getDataFromException = (exception: unknown) => {
  if (isApiError(exception)) {
    const { message, status, error } = exception;
    return { message, status, error };
  }

  let message = '';

  if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === 'string') {
    message = exception;
  } else if (typeof exception === 'object') {
    const exc = exception as { message: string };
    message = exc?.message || 'Something went wrong';
  }
  return { message };
};

export const sagaExceptionHandler = (exception: unknown) => {
  const data = getDataFromException(exception);
  const { message, error } = data;
  toastError(error || message);
  return message;
};
