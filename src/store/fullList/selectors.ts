import { ReduxState, FullListState } from 'types';

export const fullListSelectors = {
  getProp: <T extends keyof FullListState>(propKey: T) => (
    state: ReduxState,
  ) => state.fullList[propKey],
  getState: (state: ReduxState) => state.fullList,
};
