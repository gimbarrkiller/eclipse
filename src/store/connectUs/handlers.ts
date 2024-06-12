import { ActionFn, ConnectUsState } from 'types';
import { ConnectUsActionType } from './actionsTypes';
import { connectUsSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<ConnectUsState, ReturnType<F>>;

const setState: HandlerFn<typeof connectUsSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const connectUsHandlers = {
  [ConnectUsActionType.SetState]: setState,
};
