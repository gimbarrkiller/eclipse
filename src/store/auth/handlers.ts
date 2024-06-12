import { ActionFn, AuthState } from 'types';
import { AuthActionType } from './actionsTypes';
import { authSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<AuthState, ReturnType<F>>;

const setState: HandlerFn<typeof authSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const authHandlers = {
  [AuthActionType.SetState]: setState,
};
