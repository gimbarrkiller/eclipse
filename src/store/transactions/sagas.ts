import { call, put, takeLeading } from 'redux-saga/effects';

import { callApi, Endpoint } from 'api';
import { sagaExceptionHandler } from 'utils';
import { TransactionsType } from 'types';
import { getProfileSaga } from 'store/profile/sagas';

import { TransactionsActionType } from './actionsTypes';
import { transactionsSetState, withdrawTransactions } from './actionCreators';

export function* getTransactionsDataSaga() {
  try {
    const transactionsList:TransactionsType[] = yield call(callApi, {
      endpoint: Endpoint.Transactions,
    });

    yield put(transactionsSetState({
      transactionsList,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getTransactionsRatesSaga() {
  try {
    const { USDEUR }:{ USDEUR: string } = yield call(callApi, {
      endpoint: Endpoint.TransactionsRates,
    });

    yield put(transactionsSetState({
      rate: USDEUR,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* withdrawDepositSaga({
  payload: {
    onCallback,
    amount,
    ...data
  },
}: ReturnType<typeof withdrawTransactions>) {
  try {
    yield put(transactionsSetState({ isLoading: true }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.Withdraw,
      payload: {
        withdraw: amount,
        ...data,
      },
    });

    yield put(transactionsSetState({
      isLoading: false,
    }));

    yield call(getProfileSaga);

    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(transactionsSetState({ isLoading: false }));
  }
}

export const TransactionsEffects = [
  takeLeading(TransactionsActionType.GET_TRANSACTIONS, getTransactionsDataSaga),
  takeLeading(TransactionsActionType.GET_TRANSACTIONS_RATES, getTransactionsRatesSaga),
  takeLeading(TransactionsActionType.WITHDRAW_DEPOSIT, withdrawDepositSaga),
];
