import { PoolState } from 'types';
import { createReducer } from 'utils';

import { poolHandlers } from './handlers';

export const poolInitialState: Readonly<PoolState> = {
  poolList: [],
  poolStatistic: undefined,
  usersList: [],
  isLoading: false,
};

export default createReducer(poolInitialState, poolHandlers);
