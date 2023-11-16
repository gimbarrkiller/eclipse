import { FullListState } from 'types';
import { createReducer } from 'utils';
import { fullListHandlers } from './handlers';

export const fullListInitialState: Readonly<FullListState> = {
  list: [],
};

export default createReducer(fullListInitialState, fullListHandlers);
