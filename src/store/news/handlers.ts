import { ActionFn, NewsState } from 'types';
import { NewsActionType } from './actionsTypes';
import { newsSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<NewsState, ReturnType<F>>;

const setState: HandlerFn<typeof newsSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const newsHandlers = {
  [NewsActionType.SetState]: setState,
};
