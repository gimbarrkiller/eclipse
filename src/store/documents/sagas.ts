import {
  call, put, takeLatest,
  takeLeading,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler } from 'utils';
import { DocumentsRequestType } from 'types';

import { DocumentsActionType } from './actionsTypes';
import {
  getDocumentsItemData,
  documentsSetState,
} from './actionCreators';

export function* getDocumentsSaga() {
  try {
    const documents: DocumentsRequestType[] = yield call(callApi, {
      endpoint: Endpoint.Documents,
    });
    yield put(documentsSetState({
      documents,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getDocumentsItemSaga({
  payload: { id },
}: ReturnType<typeof getDocumentsItemData>) {
  try {
    const documents: DocumentsRequestType = yield call(callApi, {
      endpoint: `${Endpoint.Documents}${id}`,
    });
    yield put(documentsSetState({
      documentsItem: documents,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const DocumentsEffects = [
  takeLeading(DocumentsActionType.GET_DOCS, getDocumentsSaga),
  takeLatest(DocumentsActionType.GET_DOCS_ITEM, getDocumentsItemSaga),
];
