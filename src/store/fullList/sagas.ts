/* eslint-disable no-console */
import {
  call, put,
  takeLatest,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';

import { FullListActionType } from './actionsTypes';
import { FullListResponse } from './types';
import {
  fullListSetState,
} from './actionCreators';

export function* getFullListSaga() {
  try {
    const { list }:FullListResponse = yield call(callApi, {
      endpoint: Endpoint.GetFullList,
    });

    yield put(fullListSetState({ list }));
  } catch (exception) {
    console.log(exception);
  }
}

export const FullListEffects = [
  takeLatest(FullListActionType.GET_FULL_LIST, getFullListSaga),
];
