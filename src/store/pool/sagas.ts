import {
  call, put,
  takeLeading,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler, transformName } from 'utils';
import { PoolRequestType, PoolStatisticType } from 'types';

import { PoolActionType } from './actionsTypes';
import {
  poolSetState,
  getPoolStatisticData,
} from './actionCreators';

export function* getPoolListSaga() {
  try {
    const poolList:[] = yield call(callApi, {
      endpoint: Endpoint.PoolList,
    });

    yield put(poolSetState({
      poolList,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getPoolStatisticSaga({
  payload: {
    rankName,
  },
}: ReturnType<typeof getPoolStatisticData>) {
  try {
    const poolStatistic: PoolStatisticType = yield call(callApi, {
      endpoint: `${Endpoint.PoolStatistic}/${rankName}`,
    });

    yield put(poolSetState({
      poolStatistic,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getPoolReferralsSaga({
  payload: {
    rankName,
  },
}: ReturnType<typeof getPoolStatisticData>) {
  try {
    const { participants }:PoolRequestType = yield call(callApi, {
      endpoint: `${Endpoint.PoolUsers}${rankName}`,
    });

    yield put(poolSetState({
      usersList: participants.map(({
        first_name,
        last_name,
        total_sales,
        id,
        all_licenses_count,
        referrals_count,
        ...arg
      }) => ({
        referral: transformName(first_name, last_name),
        numberLicensesSold: referrals_count,
        numberActiveLicenses: all_licenses_count,
        turnover: total_sales,
        id: id - 1,
        ...arg,
      })),
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const PoolEffects = [
  takeLeading(PoolActionType.GET_POOL_LIST, getPoolListSaga),
  takeLeading(PoolActionType.GET_POOL_STATISTIC, getPoolStatisticSaga),
  takeLeading(PoolActionType.GET_POOL_USERS, getPoolReferralsSaga),
];
