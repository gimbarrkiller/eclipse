import { ReduxState, DocumentsState } from 'types';

export const documentsSelectors = {
  getProp: <T extends keyof DocumentsState>(propKey: T) => (
    state: ReduxState,
  ) => state.documents[propKey],
  getState: (state: ReduxState) => state.documents,
};
