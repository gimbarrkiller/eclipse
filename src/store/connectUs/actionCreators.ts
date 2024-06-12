import { ConnectUsState } from 'types';
import { ConnectUsActionType } from './actionsTypes';

export const connectUsSetState = (payload: Partial<ConnectUsState>) => ({
  type: ConnectUsActionType.SetState,
  payload,
});

export const postConnectUs = (
  payload: {
    name: string,
    email: string,
    theme: string,
    message: string,
    onSuccessCallback: () => void,
  },
) => ({
  type: ConnectUsActionType.POST_DATA,
  payload,
});
