import { ReduxState, TicketState } from 'types';

export const ticketSelectors = {
  getProp: <T extends keyof TicketState>(propKey: T) => (
    state: ReduxState,
  ) => state.ticket[propKey],
  getState: (state: ReduxState) => state.ticket,
};
