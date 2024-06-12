import { ReduxState, ConnectUsState } from 'types';

export const connectUsSelectors = {
  getProp: <T extends keyof ConnectUsState>(propKey: T) => (
    state: ReduxState,
  ) => state.connectUs[propKey],
  getState: (state: ReduxState) => state.connectUs,
};
