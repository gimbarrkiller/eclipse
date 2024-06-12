import { ActionFn, ProfileState } from 'types';
import { ProfileActionType } from './actionsTypes';
import { profileSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<ProfileState, ReturnType<F>>;

const setState: HandlerFn<typeof profileSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const profileHandlers = {
  [ProfileActionType.SetState]: setState,
};
