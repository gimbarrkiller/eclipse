import { ActionFn, FullListState } from 'types';
import { FullListActionType } from './actionsTypes';
import { fullListSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<FullListState, ReturnType<F>>;

const setState: HandlerFn<typeof fullListSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const fullListHandlers = {
  [FullListActionType.SetState]: setState,
};
