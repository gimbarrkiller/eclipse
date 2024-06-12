import { ActionFn, TransactionsState } from 'types';
import { TransactionsActionType } from './actionsTypes';
import { transactionsSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<TransactionsState, ReturnType<F>>;

const setState: HandlerFn<typeof transactionsSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const transactionsHandlers = {
  [TransactionsActionType.SetState]: setState,
};
