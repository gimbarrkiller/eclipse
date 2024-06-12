import { ReduxState, TransactionsState } from 'types';

export const transactionsSelectors = {
  getProp: <T extends keyof TransactionsState>(propKey: T) => (
    state: ReduxState,
  ) => state.transactions[propKey],
  getState: (state: ReduxState) => state.transactions,
};
