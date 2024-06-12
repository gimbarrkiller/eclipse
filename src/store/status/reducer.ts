import { StatusState } from 'types';
import { createReducer } from 'utils';

import { statusHandlers } from './handlers';

export const statusInitialState: Readonly<StatusState> = {
  statisticData: undefined,
  rankList: [],
  referralsList: [],
  isLoading: false,
};

export default createReducer(statusInitialState, statusHandlers);
