import {
  call, put, select,
  takeLeading,
  delay,
  all,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler } from 'utils';
import { AvatarType } from 'types';

import { authSelectors } from 'store/auth/selectors';

import { ProfileActionType } from './actionsTypes';
import {
  profileSetState,
  saveProfileData,
} from './actionCreators';
import { ProfileData, ProfileDataRequest } from './types';

export function* getProfileSaga() {
  try {
    const {
      user: {
        last_name: lastName,
        first_name: firstName,
        third_name: fatherName,
        referral_code: referralCode,
        email,
        phone,
        telegram,
        balance,
        id,
        rank,
        country,
        license: isLicense,
        license_purchase_date: dataActive,
        license_expiration: dataDeActive,
      },
    }:ProfileDataRequest = yield call(callApi, {
      endpoint: Endpoint.Profile,
    });

    const { avatar }:AvatarType = yield call(callApi, {
      endpoint: Endpoint.ProfileEditAvatar,
    });
    yield put(profileSetState({
      avatar,
      lastName,
      firstName,
      fatherName,
      email,
      phone,
      telegram,
      balance,
      referralCode,
      id,
      rank,
      countryProfile: country,
      isLicense,
      dataActive,
      dataDeActive,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* saveAvatarSaga() {
  try {
    yield put(profileSetState({ isSavingAvatar: true }));
    // Костыль от которого надо будет избавиться
    yield delay(700);
    const { avatar }:AvatarType = yield call(callApi, {
      endpoint: Endpoint.ProfileEditAvatar,
    });
    yield put(profileSetState({
      avatar,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(profileSetState({ isSavingAvatar: false }));
  } finally {
    yield put(profileSetState({ isSavingAvatar: false }));
  }
}

export function* saveProfileSaga({
  payload: {
    password,
    password_confirm,
    onCallback,
  },
}: ReturnType<typeof saveProfileData>) {
  try {
    const {
      lastName,
      firstName,
      fatherName,
      email,
      phone,
      telegram,
      countryProfile,
    }:ProfileData = yield select(authSelectors.getState);
    yield put(profileSetState({ isLoading: true }));
    yield all([
      call(callApi, {
        method: 'PUT',
        endpoint: Endpoint.ProfileEdit,
        payload: {
          last_name: lastName,
          first_name: firstName,
          third_name: fatherName,
          email,
          phone,
          telegram,
          country: countryProfile,
        },
      }),
      call(saveAvatarSaga),
      password && password_confirm && call(callApi, {
        method: 'POST',
        endpoint: Endpoint.ChangePassword,
        payload: {
          password,
          password_confirm,
        },
      }),
    ]);

    yield put(profileSetState({
      isLoading: false,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(profileSetState({ isLoading: false }));
  }
}

export const ProfileEffects = [
  takeLeading(ProfileActionType.GET_DATA, getProfileSaga),
  takeLeading(ProfileActionType.SAVE_DATA, saveProfileSaga),
  takeLeading(ProfileActionType.SAVE_AVATAR, saveAvatarSaga),
];
