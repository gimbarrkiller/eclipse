import { StatusType } from 'types';

export interface StatusState {
  statisticData?: StatusStatisticType,
  rankList: StatusRankType[],
  referralsList: StatusType[],
  isLoading: boolean,
}

export interface StatusRankType {
  id: number,
  name: string,
  title: string,
}

export interface StatusStatisticType {
  count_active_licenses: number
  licenses_sold_best_team: number
  next_update_date: string
  number_of_branches: number
  reward: number
  team_licenses_sold: number
}
