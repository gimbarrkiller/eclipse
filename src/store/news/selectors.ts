import { ReduxState, NewsState } from 'types';

export const newsSelectors = {
  getProp: <T extends keyof NewsState>(propKey: T) => (
    state: ReduxState,
  ) => state.news[propKey],
  getState: (state: ReduxState) => state.news,
};
