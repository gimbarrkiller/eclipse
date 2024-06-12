import { ReduxState, StatusState } from 'types';

export const statusSelectors = {
  getProp: <T extends keyof StatusState>(propKey: T) => (
    state: ReduxState,
  ) => state.status[propKey],
  getState: (state: ReduxState) => state.status,
};
