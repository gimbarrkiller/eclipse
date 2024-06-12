import { OnlyStatusType, TicketState } from 'types';
import { createReducer } from 'utils';

import { ticketHandlers } from './handlers';

export const ticketInitialState: Readonly<TicketState> = {
  myTicketsList: [],
  ticketData: {
    created: '2023-12-27T16:42:07.558786Z',
    id: 0,
    modified: '2023-12-27T16:42:07.558786Z',
    status: OnlyStatusType.New,
    theme: 'Theme',
    title: '',
    user_id: 0,
  },
  createdTicketId: undefined,
  dialogMessagesList: [],
  isLoading: false,
  files: undefined,
};

export default createReducer(ticketInitialState, ticketHandlers);
