import { AuthData, AuthState } from 'types';
import { AuthActionType } from './actionsTypes';

export const authSetState = (payload: Partial<AuthState>) => ({
  type: AuthActionType.SetState,
  payload,
});

export const authRegistration = (
  payload: AuthData,
) => ({
  type: AuthActionType.REGISTRATION,
  payload,
});

export const authRegistrationActive = (
  payload: {
    code: string,
    onCallback: () => void,
  },
) => ({
  type: AuthActionType.REGISTRATION_ACTIVE,
  payload,
});

export const authResetPassword = (
  payload: {
    email: string,
    onCallback: () => void,
  },
) => ({
  type: AuthActionType.RESET_PASSWORD,
  payload,
});

export const authSignIn = (
  payload: {
    email: string,
    password: string,
    onCallback: () => void,
  },
) => ({
  type: AuthActionType.SIGN_IN,
  payload,
});

export const authSignOut = (
  payload: { onCallback?: () => void } = {},
) => ({
  type: AuthActionType.SIGN_OUT,
  payload,
});

export const getCountry = () => ({
  type: AuthActionType.GET_COUNTRY,
});
