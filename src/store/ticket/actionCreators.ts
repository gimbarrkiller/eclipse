import { MessTicketData, TicketData, TicketState } from 'types';
import { TicketActionType } from './actionsTypes';

export const ticketSetState = (payload: Partial<TicketState>) => ({
  type: TicketActionType.SetState,
  payload,
});

export const getTicketsData = () => ({
  type: TicketActionType.GET_TICKETS,
});

export const createTicket = (
  payload: TicketData,
) => ({
  type: TicketActionType.CREATE_TICKET,
  payload,
});

export const sendMessTicket = (
  payload: MessTicketData,
) => ({
  type: TicketActionType.SEND_MESS_TICKET,
  payload,
});

export const getTicketData = (
  payload: { ticket_id: number | string },
) => ({
  type: TicketActionType.GET_TICKET,
  payload,
});
