import {
  call, put,
  takeLatest,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler } from 'utils';

import { ConnectUsActionType } from './actionsTypes';
import {
  connectUsSetState, postConnectUs,
} from './actionCreators';

export function* postConnectUsSaga({
  payload: {
    name,
    email,
    theme,
    message,
    onSuccessCallback,
  },
}: ReturnType<typeof postConnectUs>) {
  try {
    yield put(connectUsSetState({ isLoading: true }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.ConnectUs,
      payload: {
        name,
        email,
        subject: theme,
        feedback: message,
      },
    });
    yield onSuccessCallback();
    yield put(connectUsSetState({ isLoading: false }));
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(connectUsSetState({ isLoading: false }));
  }
}

export const ConnectUsEffects = [
  takeLatest(ConnectUsActionType.POST_DATA, postConnectUsSaga),
];
