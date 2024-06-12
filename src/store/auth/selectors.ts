import { ReduxState, AuthState } from 'types';

export const authSelectors = {
  getProp: <T extends keyof AuthState>(propKey: T) => (
    state: ReduxState,
  ) => state.auth[propKey],
  getState: (state: ReduxState) => state.auth,
};
