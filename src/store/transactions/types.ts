import { TransactionsType } from 'types';

export interface TransactionsState {
  transactionsList: TransactionsType[],
  rate: string,
  isLoading: boolean,
}
