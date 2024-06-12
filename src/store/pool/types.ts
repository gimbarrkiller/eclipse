import { PoolType, StatusRankType } from 'types';

export interface PoolState {
  poolList: StatusRankType[],
  poolStatistic?: PoolStatisticType,
  usersList: PoolType[],
  isLoading: boolean,
}

export interface PoolStatisticType {
  count_active_licenses: number,
  count_of_participants: number,
  count_referrals_active_licenses: number,
  next_update_date: string,
  number_of_branches: number,
  pool_balance: number,
  pool_name: number,
  reward: number,
}

export type PoolRequestType = {
  participants: {
    id: number,
    first_name: string,
    last_name: string,
    avatar: string,
    active: true,
    total_sales: number,
    all_licenses_count: number,
    referrals_count: number,
  }[],
};
