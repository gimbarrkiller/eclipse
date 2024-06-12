import { ReduxState, PoolState } from 'types';

export const poolSelectors = {
  getProp: <T extends keyof PoolState>(propKey: T) => (
    state: ReduxState,
  ) => state.pool[propKey],
  getState: (state: ReduxState) => state.pool,
};
