import {
  call, put, takeLatest,
  takeLeading,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler, transformName } from 'utils';
import { PartnerStatisticData, AutoBonusRequestType, ReferralData } from 'types';

import { PartnerActionType } from './actionsTypes';
import {
  getPartnerReferralsData,
  getPartnerStatisticData,
  partnerSetState,
} from './actionCreators';

export function* getPartnerStatisticSaga({
  payload: {
    period,
  },
}: ReturnType<typeof getPartnerStatisticData>) {
  try {
    const statisticList:PartnerStatisticData = yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.Statistic,
      payload: { period },
    });

    yield put(partnerSetState({
      qualificationsList: statisticList.qualifications,
      rewardsList: statisticList.rewards,
      statsList: statisticList.stats,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getPartnerReferralsSaga({
  payload: {
    period,
  },
}: ReturnType<typeof getPartnerReferralsData>) {
  try {
    const referrals:ReferralData | undefined = yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.Referrals,
      payload: { period },
    });

    const refData = referrals && Object.keys(referrals).length > 0 ? Object.fromEntries(
      Object.entries(referrals).map(([key, value]) => [
        key,
        {
          ...value,
          referrals: value.referrals.map((referral) => ({
            ...referral,
            referral: transformName(referral.first_name, referral.last_name),
          })),
        },
      ]),
    ) : undefined;
    yield put(partnerSetState({
      referralsList: refData ? {
        0: refData[1],
        ...refData,
      } : undefined,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* getPartnerAutoBonusSaga() {
  try {
    const data:AutoBonusRequestType = yield call(callApi, {
      endpoint: Endpoint.AutoBonus,
    });

    yield put(partnerSetState({
      autoBonusList: data.autobonus.map(({ personal_sales, referral_sales, ...arg }) => ({
        personalSales: personal_sales,
        refSales: referral_sales,
        ...arg,
      })),
      autoTimeNextUpdate: data.next_update,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const PartnerEffects = [
  takeLeading(PartnerActionType.GET_STATISTIC, getPartnerStatisticSaga),
  takeLatest(PartnerActionType.GET_REFERRAL_LIST, getPartnerReferralsSaga),
  takeLeading(PartnerActionType.GET_AUTO_BONUS, getPartnerAutoBonusSaga),
];
