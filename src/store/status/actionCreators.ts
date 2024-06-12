import { StatusState } from 'types';
import { StatusActionType } from './actionsTypes';

export const statusSetState = (payload: Partial<StatusState>) => ({
  type: StatusActionType.SetState,
  payload,
});

export const getStatusRankData = () => ({
  type: StatusActionType.GET_STATUS_RANK,
});

export const getStatusStatisticData = (
  payload: { rankName: string | number },
) => ({
  type: StatusActionType.GET_STATUS_STATISTIC,
  payload,
});

export const getStatusReferralsData = () => ({
  type: StatusActionType.GET_STATUS_REFERRALS,
});
