import {
  call, put,
  takeLeading,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler, transformName } from 'utils';
import { StatusRankType, StatusRequestType, StatusStatisticType } from 'types';

import { StatusActionType } from './actionsTypes';
import {
  getStatusStatisticData,
  statusSetState,
} from './actionCreators';

export function* getStatusStatisticSaga({
  payload: {
    rankName,
  },
}: ReturnType<typeof getStatusStatisticData>) {
  try {
    const statisticData: StatusStatisticType = yield call(callApi, {
      endpoint: `${Endpoint.StatusStatistic}${rankName}`,
    });
    yield put(statusSetState({
      statisticData,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getStatusRankSaga() {
  try {
    const rankList:StatusRankType[] = yield call(callApi, {
      endpoint: Endpoint.StatusRank,
    });

    yield put(statusSetState({
      rankList,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getStatusReferralsSaga() {
  try {
    const { referrals }:StatusRequestType = yield call(callApi, {
      endpoint: Endpoint.StatusReferrals,
    });

    yield put(statusSetState({
      referralsList: referrals.map(({
        first_name,
        last_name,
        licenses_sold,
        active_referrals_count,
        total_sales,
        id,
        ...arg
      }) => ({
        referral: transformName(first_name, last_name),
        numberLicensesSold: licenses_sold,
        numberActiveLicenses: active_referrals_count,
        turnover: total_sales,
        id: id - 1,
        ...arg,
      })),
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const StatusEffects = [
  takeLeading(StatusActionType.GET_STATUS_STATISTIC, getStatusStatisticSaga),
  takeLeading(StatusActionType.GET_STATUS_RANK, getStatusRankSaga),
  takeLeading(StatusActionType.GET_STATUS_REFERRALS, getStatusReferralsSaga),
];
