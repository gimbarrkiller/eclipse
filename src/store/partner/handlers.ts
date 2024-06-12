import { ActionFn, PartnerState } from 'types';
import { PartnerActionType } from './actionsTypes';
import { partnerSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<PartnerState, ReturnType<F>>;

const setState: HandlerFn<typeof partnerSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const partnerHandlers = {
  [PartnerActionType.SetState]: setState,
};
