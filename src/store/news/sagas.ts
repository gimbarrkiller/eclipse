import {
  call, put, takeLatest,
  takeLeading,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler } from 'utils';
import { NewsRequestType } from 'types';

import { NewsActionType } from './actionsTypes';
import {
  getNewsItemData,
  newsSetState,
} from './actionCreators';

export function* getNewsSaga() {
  try {
    const news: NewsRequestType[] = yield call(callApi, {
      endpoint: Endpoint.News,
    });
    yield put(newsSetState({
      news,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getNewsItemSaga({
  payload: { id },
}: ReturnType<typeof getNewsItemData>) {
  try {
    const news: NewsRequestType = yield call(callApi, {
      endpoint: `${Endpoint.News}${id}`,
    });
    yield put(newsSetState({
      newsItem: news,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const NewsEffects = [
  takeLeading(NewsActionType.GET_NEWS, getNewsSaga),
  takeLatest(NewsActionType.GET_NEWS_ITEM, getNewsItemSaga),
];
