import { FileObjectType, OnlyStatusType } from 'types';

export interface TicketState {
  myTicketsList: MyTicketData[],
  ticketData: MyTicketData,
  createdTicketId?: number,
  dialogMessagesList: DialogMessageData[],
  isLoading: boolean,
  files?: DialogFilesData[],
}

export interface MyTicketData {
  id: number,
  created: string,
  modified: string,
  theme: string,
  title: string,
  status: OnlyStatusType,
  user_id : 0,
}

export interface DialogMessageData {
  author: string,
  created: string,
  id: number,
  modified: string,
  status: OnlyStatusType,
  text: string,
  ticket_id: number,
  user_id: number,
}

export interface DialogFilesData {
  created: string,
  file: string,
  id: number,
  name: string,
  ticket_id: number,
  user_id: number,
}

export interface TicketData {
  file?: FileObjectType,
  theme?: string | null,
  title: string,
  text: string,
  onCallback: () => void,
}

export interface MessTicketData {
  ticket_id: number,
  status: string,
  file?: FileObjectType,
  text: string,
  onCallback: () => void,
}
