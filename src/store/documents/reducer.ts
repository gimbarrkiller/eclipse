import { DocumentsState } from 'types';
import { createReducer } from 'utils';

import { documentsHandlers } from './handlers';

export const documentsInitialState: Readonly<DocumentsState> = {
  documents: [],
  documentsItem: undefined,
  isLoading: false,
};

export default createReducer(documentsInitialState, documentsHandlers);
