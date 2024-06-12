import { ActionFn, StatusState } from 'types';
import { StatusActionType } from './actionsTypes';
import { statusSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<StatusState, ReturnType<F>>;

const setState: HandlerFn<typeof statusSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const statusHandlers = {
  [StatusActionType.SetState]: setState,
};
