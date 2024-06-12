import { TransactionsState } from 'types';
import { createReducer } from 'utils';

import { transactionsHandlers } from './handlers';

export const transactionsInitialState: Readonly<TransactionsState> = {
  transactionsList: [],
  rate: '0',
  isLoading: false,
};

export default createReducer(transactionsInitialState, transactionsHandlers);
