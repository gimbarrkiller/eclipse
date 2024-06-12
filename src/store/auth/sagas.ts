import {
  call, put,
  takeLeading,
} from 'redux-saga/effects';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Countries from 'countries-api';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler } from 'utils';

import { AuthActionType } from './actionsTypes';
import {
  authSetState,
  authRegistration,
  authRegistrationActive,
  authResetPassword,
  authSignIn,
  authSignOut,
} from './actionCreators';
import { authInitialState } from './reducer';
import { profileSetState } from '../profile/actionCreators';
import { profileInitialState } from '../profile/reducer';
import { CountryRequest } from './types';

export function* clearReducer() {
  yield put(authSetState(authInitialState));
  yield put(profileSetState(profileInitialState));
}

export function* authRegistrationSaga({
  payload: {
    email,
    password,
    passwordRepeat,
    country,
    // telegram,
    // skype,
    ref,
    onCallback,
  },
}: ReturnType<typeof authRegistration>) {
  try {
    yield put(authSetState({
      isLoading: true,
      email,
    }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.Registration,
      payload: {
        email,
        password,
        country,
        password_confirm: passwordRepeat,
        referral: ref,
      },
    });

    yield put(authSetState({
      isLoading: false,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(authSetState({ isLoading: false }));
  }
}

export function* authRegistrationActiveSaga({
  payload: {
    code,
    onCallback,
  },
}: ReturnType<typeof authRegistrationActive>) {
  try {
    yield put(authSetState({ isLoading: true }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.RegistrationActive,
      payload: { code },
    });

    yield put(authSetState({
      isLoading: false,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(authSetState({ isLoading: false }));
  }
}

export function* authResetPasswordSaga({
  payload: {
    email,
    onCallback,
  },
}: ReturnType<typeof authResetPassword>) {
  try {
    yield put(authSetState({ isLoading: true }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.ResetPassword,
      payload: { email },
    });

    yield put(authSetState({
      isLoading: false,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(authSetState({ isLoading: false }));
  }
}

export function* authSignInSaga({
  payload: {
    email,
    password,
    onCallback,
  },
}: ReturnType<typeof authSignIn>) {
  try {
    yield put(authSetState({ isLoading: true }));
    const { token }: { token: string } = yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.SignIn,
      payload: { email, password },
    });

    yield call(clearReducer);
    yield put(authSetState({
      accessToken: token,
      isLoading: false,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(authSetState({ isLoading: false }));
  }
}

export function* authSignOutSaga({
  payload: { onCallback },
}: ReturnType<typeof authSignOut>) {
  try {
    yield put(authSetState({ isLoading: true }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.SignOut,
    });

    yield call(clearReducer);
    yield onCallback && onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(authSetState({ isLoading: false }));
  }
}
const forbiddenCountries = ['Russia', 'Ukraine', 'Belarus', 'Turkmenistan', 'Tajikistan', 'Kyrgyzstan', 'Kazakhstan', 'Uzbekistan', 'Georgia', 'Armenia', 'Moldova', 'Azerbaijan'];
export function* getCountrySaga() {
  try {
    const country: CountryRequest[] = Countries.findAll()?.data || [];
    yield put(authSetState({
      country: [{ value: '', label: 'Country' }, ...country
        .filter((c) => !forbiddenCountries.includes(c.name.common))
        .map((i) => ({
          value: i.name.common, label: i.name.common,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))],
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const AuthEffects = [
  takeLeading(AuthActionType.REGISTRATION, authRegistrationSaga),
  takeLeading(AuthActionType.REGISTRATION_ACTIVE, authRegistrationActiveSaga),
  takeLeading(AuthActionType.RESET_PASSWORD, authResetPasswordSaga),
  takeLeading(AuthActionType.SIGN_IN, authSignInSaga),
  takeLeading(AuthActionType.SIGN_OUT, authSignOutSaga),
  takeLeading(AuthActionType.GET_COUNTRY, getCountrySaga),
];
