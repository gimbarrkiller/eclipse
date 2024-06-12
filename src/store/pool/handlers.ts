import { ActionFn, PoolState } from 'types';
import { PoolActionType } from './actionsTypes';
import { poolSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<PoolState, ReturnType<F>>;

const setState: HandlerFn<typeof poolSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const poolHandlers = {
  [PoolActionType.SetState]: setState,
};
