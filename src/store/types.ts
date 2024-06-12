import { ConnectUsState } from 'store/connectUs/types';
import { ProfileState } from 'store/profile/types';
import { PartnerState } from 'store/partner/types';
import { TransactionsState } from 'store/transactions/types';
import { TicketState } from 'store/ticket/types';
import { StatusState } from 'store/status/types';
import { PoolState } from 'store/pool/types';
import { AuthState } from 'store/auth/types';
import { NewsState } from 'store/news/types';
import { DocumentsState } from 'store/documents/types';

export type ReduxState = {
  connectUs: ConnectUsState,
  profile: ProfileState,
  partner: PartnerState,
  transactions: TransactionsState,
  ticket: TicketState,
  status: StatusState,
  pool: PoolState,
  auth: AuthState,
  news: NewsState,
  documents: DocumentsState,
};
