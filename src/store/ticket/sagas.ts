import {
  all,
  call,
  put,
  select,
  takeLeading,
} from 'redux-saga/effects';

import {
  callApi,
  Endpoint,
} from 'api';
import { sagaExceptionHandler } from 'utils';
import { profileSelectors } from 'store/profile/selectors';

import { TicketActionType } from './actionsTypes';
import {
  ticketSetState,
  createTicket,
  getTicketData,
  sendMessTicket,
} from './actionCreators';
import { DialogFilesData, DialogMessageData, MyTicketData } from './types';

export function* getTicketsSaga() {
  try {
    const myTicketsList:[] = yield call(callApi, {
      endpoint: Endpoint.Tickets,
    });

    yield put(ticketSetState({
      myTicketsList,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export function* createTicketSaga({
  payload: {
    theme,
    title,
    text,
    file,
    onCallback,
  },
}: ReturnType<typeof createTicket>) {
  try {
    yield put(ticketSetState({ isLoading: true }));
    const { id, lastName, firstName } = yield select(profileSelectors.getState);

    const { ticket }:{ ticket: number } = yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.Tickets,
      payload: {
        user_id: id,
        status: 'New',
        theme,
        title,
        file,
      },
    });
    yield put(ticketSetState({
      createdTicketId: ticket,
    }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.TicketsDialog,
      payload: {
        user_id: id,
        ticket_id: ticket,
        status: 'New',
        text,
        author: firstName || lastName || 'user',
      },
    });

    yield put(ticketSetState({
      isLoading: false,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(ticketSetState({
      isLoading: false,
      createdTicketId: undefined,
    }));
  } finally {
    yield put(ticketSetState({
      isLoading: false,
      createdTicketId: undefined,
    }));
  }
}

export function* sendMessTicketSaga({
  payload: {
    ticket_id,
    status,
    text,
    file,
    onCallback,
  },
}: ReturnType<typeof sendMessTicket>) {
  try {
    yield put(ticketSetState({ isLoading: true }));
    const { id, lastName, firstName } = yield select(profileSelectors.getState);

    yield put(ticketSetState({
      createdTicketId: ticket_id,
    }));
    yield call(callApi, {
      method: 'POST',
      endpoint: Endpoint.TicketsDialog,
      payload: {
        user_id: id,
        ticket_id,
        file,
        status,
        text,
        author: firstName || lastName || 'user',
      },
    });

    yield put(ticketSetState({
      isLoading: false,
      createdTicketId: undefined,
    }));
    const files: DialogFilesData[] = yield call(callApi, {
      endpoint: Endpoint.TicketsFiles,
    });
    yield put(ticketSetState({
      files,
    }));
    yield onCallback();
  } catch (exception) {
    sagaExceptionHandler(exception);
    yield put(ticketSetState({
      isLoading: false,
      createdTicketId: undefined,
    }));
  }
}

export function* getTicketSaga({
  payload: { ticket_id },
}: ReturnType<typeof getTicketData>) {
  try {
    const [ticketData, messages]: [MyTicketData, DialogMessageData[]] = yield all([
      call(callApi, {
        endpoint: `${Endpoint.Tickets}${ticket_id}`,
      }),
      call(callApi, {
        endpoint: Endpoint.TicketsDialog,
      }),
    ]);
    yield put(ticketSetState({
      ticketData,
    }));

    yield put(ticketSetState({
      dialogMessagesList: messages
        .filter((mess) => mess?.ticket_id === ticket_id)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .sort((a, b) => new Date(a.created) - new Date(b.created)),
    }));
    const files: DialogFilesData[] = yield call(callApi, {
      endpoint: Endpoint.TicketsFiles,
    });
    yield put(ticketSetState({
      files,
    }));
  } catch (exception) {
    sagaExceptionHandler(exception);
  }
}

export const TicketEffects = [
  takeLeading(TicketActionType.GET_TICKETS, getTicketsSaga),
  takeLeading(TicketActionType.CREATE_TICKET, createTicketSaga),
  takeLeading(TicketActionType.SEND_MESS_TICKET, sendMessTicketSaga),
  takeLeading(TicketActionType.GET_TICKET, getTicketSaga),
];
