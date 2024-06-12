import { ReduxState, ProfileState } from 'types';

export const profileSelectors = {
  getProp: <T extends keyof ProfileState>(propKey: T) => (
    state: ReduxState,
  ) => state.profile[propKey],
  getState: (state: ReduxState) => state.profile,
};
