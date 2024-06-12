import { ActionFn, TicketState } from 'types';
import { TicketActionType } from './actionsTypes';
import { ticketSetState } from './actionCreators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HandlerFn<F extends (...args: any[]) => any> = ActionFn<TicketState, ReturnType<F>>;

const setState: HandlerFn<typeof ticketSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const ticketHandlers = {
  [TicketActionType.SetState]: setState,
};
