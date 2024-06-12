import { PoolState } from 'types';
import { PoolActionType } from './actionsTypes';

export const poolSetState = (payload: Partial<PoolState>) => ({
  type: PoolActionType.SetState,
  payload,
});

export const getPoolListData = () => ({
  type: PoolActionType.GET_POOL_LIST,
});

export const getPoolStatisticData = (
  payload: { rankName: string },
) => ({
  type: PoolActionType.GET_POOL_STATISTIC,
  payload,
});

export const getPoolUsers = (
  payload: { rankName: string },
) => ({
  type: PoolActionType.GET_POOL_USERS,
  payload,
});
